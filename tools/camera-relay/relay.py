"""
EZVIZ / RTSP -> MJPEG relay for the private /labs page.

WHY THIS EXISTS
---------------
Browsers cannot play RTSP. There is no rtsp:// support in Chrome, Firefox or
Safari, and no JavaScript library can add it, because the page is not allowed
to open the raw TCP/UDP sockets RTSP needs. So the camera cannot be shown by
the website on its own.

This relay closes that gap. It does exactly what the OpenCV notebook does --
cv2.VideoCapture on the RTSP URL -- and re-publishes the frames as MJPEG over
HTTP, which every browser can render in a plain <img> tag.

It must run on a machine that can reach the camera, which normally means your
own PC on the same network as the camera.

By default it listens on 127.0.0.1 and only that machine can see the feed. To
reach it from anywhere, put a tunnel in front of it (see README) -- at which
point it is on the public internet, and the access token is the only thing
standing between a stranger and your camera. A token is required to open a
session, always.

NOTHING IS SAVED
----------------
No frame is ever written to disk. Credentials live in memory only, for as long
as the session is open, and are overwritten when it stops. There is no log of
the password: the RTSP URL is never printed, and the stream URL the browser
requests carries only an opaque session id.

RUN IT
------
    python relay.py

Requires only Python 3.8+ and opencv-python, which the notebook already uses.
Listens on 127.0.0.1:8477 by default. An access token is generated and printed
at startup unless you pass --token. See --help for options.
"""

from __future__ import annotations

import argparse
import hmac
import json
import secrets
import sys
import threading
import time
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs, quote

import os

# Force RTSP over TCP and give FFmpeg a socket timeout. UDP is the default and
# it shreds the picture over anything lossy -- which now includes watching from
# outside the network. This must be set before cv2 opens a capture.
os.environ.setdefault(
    'OPENCV_FFMPEG_CAPTURE_OPTIONS',
    'rtsp_transport;tcp|stimeout;8000000',
)

import cv2  # noqa: E402  (import order matters: the env var above comes first)

# How long to wait for the camera to answer before giving up. Without this,
# OpenCV can sit on an unreachable address for minutes and the page just spins.
OPEN_TIMEOUT_MS = 8000
READ_TIMEOUT_MS = 8000

# Origins allowed to talk to this relay. It is deliberately a short list and
# not "*": the relay sits on localhost, so any web page you happen to have
# open could otherwise ask it to start streaming your camera.
DEFAULT_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:3002',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3002',
    'https://codifylabspk.com',
    'https://www.codifylabspk.com',
]

# Default RTSP path for EZVIZ main stream, same as the notebook.
DEFAULT_STREAM_PATH = '/h264/ch1/main/av_stream'

JPEG_QUALITY = 80
TARGET_FPS = 15

# A session with no viewer for this long releases the camera by itself, so a
# closed browser tab never leaves the stream open.
IDLE_TIMEOUT_SECONDS = 30

# Cap on simultaneous open cameras, so that someone who obtains the token
# cannot exhaust the machine by opening sessions in a loop.
MAX_SESSIONS = 4

# Brute-force guard on the access token. After this many bad tokens the relay
# refuses new sessions for a while. Counted globally rather than per client:
# behind a tunnel every request arrives from the tunnel, so per-IP counting
# would be trivially defeated.
MAX_TOKEN_FAILURES = 8
TOKEN_LOCKOUT_SECONDS = 300


class CameraSession:
    """
    One open camera. A background thread keeps reading frames so the RTSP
    buffer never backs up -- if you only read when a viewer asks for a frame,
    OpenCV hands you older and older images and the feed drifts minutes behind.
    Only the most recent frame is kept, in memory.
    """

    def __init__(self, rtsp_url: str, width: int):
        self.width = width
        self._capture = cv2.VideoCapture(rtsp_url, cv2.CAP_FFMPEG, [
            cv2.CAP_PROP_OPEN_TIMEOUT_MSEC, OPEN_TIMEOUT_MS,
            cv2.CAP_PROP_READ_TIMEOUT_MSEC, READ_TIMEOUT_MS,
        ])
        # Keep OpenCV's own buffer at one frame where the backend supports it.
        try:
            self._capture.set(cv2.CAP_PROP_BUFFERSIZE, 1)
        except Exception:
            pass

        self._frame = None
        self._frame_id = 0
        self._lock = threading.Lock()
        self._stop = threading.Event()
        self._error: str | None = None
        self.last_seen = time.time()

        if not self._capture.isOpened():
            self._capture.release()
            raise ConnectionError(
                'Could not open the camera stream. Check the IP address, the '
                'username and password, and that this computer is on the same '
                'network as the camera.'
            )

        self._thread = threading.Thread(target=self._read_loop, daemon=True)
        self._thread.start()

    def _read_loop(self) -> None:
        misses = 0
        while not self._stop.is_set():
            ok, frame = self._capture.read()
            if not ok:
                # A few dropped reads are normal on RTSP; a long run of them
                # means the camera or the network has gone away.
                misses += 1
                if misses > 60:
                    with self._lock:
                        self._error = 'Lost the connection to the camera.'
                    break
                time.sleep(0.05)
                continue

            misses = 0
            height = int(frame.shape[0] * (self.width / frame.shape[1]))
            resized = cv2.resize(frame, (self.width, height))
            with self._lock:
                self._frame = resized
                self._frame_id += 1

        self._capture.release()

    def latest(self, after_id: int):
        """The newest frame, with its id, or (None, id) if none is new yet."""
        with self._lock:
            if self._error:
                raise ConnectionError(self._error)
            if self._frame is None or self._frame_id == after_id:
                return None, self._frame_id
            return self._frame.copy(), self._frame_id

    @property
    def alive(self) -> bool:
        return self._thread.is_alive() and not self._stop.is_set()

    def touch(self) -> None:
        self.last_seen = time.time()

    def close(self) -> None:
        self._stop.set()
        self._thread.join(timeout=2.0)
        with self._lock:
            self._frame = None


class SessionStore:
    def __init__(self):
        self._sessions: dict[str, CameraSession] = {}
        self._lock = threading.Lock()

    def create(self, rtsp_url: str, width: int) -> str:
        session = CameraSession(rtsp_url, width)
        session_id = secrets.token_urlsafe(18)
        with self._lock:
            self._sessions[session_id] = session
        return session_id

    def get(self, session_id: str):
        with self._lock:
            return self._sessions.get(session_id)

    def count(self) -> int:
        with self._lock:
            return len(self._sessions)

    def close(self, session_id: str) -> bool:
        with self._lock:
            session = self._sessions.pop(session_id, None)
        if session is None:
            return False
        session.close()
        return True

    def sweep(self) -> None:
        """Drop sessions nobody is watching, and ones whose camera died."""
        now = time.time()
        with self._lock:
            stale = [
                sid for sid, s in self._sessions.items()
                if now - s.last_seen > IDLE_TIMEOUT_SECONDS or not s.alive
            ]
            sessions = [self._sessions.pop(sid) for sid in stale]
        for session in sessions:
            session.close()

    def close_all(self) -> None:
        with self._lock:
            sessions = list(self._sessions.values())
            self._sessions.clear()
        for session in sessions:
            session.close()


STORE = SessionStore()


class TokenGuard:
    """
    Checks the access token, and stops answering after too many wrong ones.

    The token is what protects the camera once the relay is published through
    a tunnel. CORS does not: it only restrains browsers, and anyone can send a
    plain HTTP request from a script.
    """

    def __init__(self, token: str):
        self._token = token
        self._failures = 0
        self._locked_until = 0.0
        self._lock = threading.Lock()

    @property
    def locked_for(self) -> int:
        """Seconds left on the lockout, 0 if not locked."""
        with self._lock:
            return max(0, int(self._locked_until - time.time()))

    def check(self, presented: str) -> bool:
        if self.locked_for:
            return False

        # Constant-time comparison: a plain == leaks the token one character
        # at a time to anyone who can measure the response.
        ok = hmac.compare_digest(presented or '', self._token)

        with self._lock:
            if ok:
                self._failures = 0
            else:
                self._failures += 1
                if self._failures >= MAX_TOKEN_FAILURES:
                    self._locked_until = time.time() + TOKEN_LOCKOUT_SECONDS
                    self._failures = 0
                    print(
                        f'!! {MAX_TOKEN_FAILURES} bad access tokens -- refusing new '
                        f'sessions for {TOKEN_LOCKOUT_SECONDS // 60} minutes.',
                        flush=True,
                    )
        if not ok:
            # Slow down guessing. Cheap here, expensive for an attacker.
            time.sleep(0.5)
        return ok


GUARD: TokenGuard | None = None


def build_rtsp_url(ip: str, username: str, password: str, path: str) -> str:
    """
    Assemble the RTSP URL, percent-escaping the credentials.

    The notebook interpolated them raw, which breaks on any password holding
    an @ : / or # -- the @ in particular makes the URL parse with the wrong
    host, and the camera answers with a bare authentication failure that looks
    exactly like a wrong password.
    """
    user = quote(username, safe='')
    secret = quote(password, safe='')
    host = ip.strip()
    if not path.startswith('/'):
        path = '/' + path
    credentials = f'{user}:{secret}@' if username or password else ''
    return f'rtsp://{credentials}{host}{path}'


class RelayHandler(BaseHTTPRequestHandler):
    server_version = 'CamRelay/1.0'
    allowed_origins: list[str] = []

    # ------------------------------------------------------------ helpers --

    def _origin_header(self) -> None:
        origin = self.headers.get('Origin')
        if origin and origin in self.allowed_origins:
            self.send_header('Access-Control-Allow-Origin', origin)
            self.send_header('Vary', 'Origin')

    def _send_json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self._origin_header()
        self.end_headers()
        self.wfile.write(body)

    def _read_json(self) -> dict:
        length = int(self.headers.get('Content-Length') or 0)
        if not length:
            return {}
        return json.loads(self.rfile.read(length).decode('utf-8'))

    def log_message(self, fmt, *args):
        """
        Log the path only, never the query string or a request body.

        Credentials are sent in a POST body and never appear in a URL, but the
        default handler logs whole request lines, so this stays narrow on
        purpose. The base class also calls this for its own errors with a
        varying number of arguments, hence the careful unpacking.
        """
        detail = args[1] if len(args) > 1 else (args[0] if args else '')
        path = urlparse(self.path or '').path
        print(
            f'{self.log_date_time_string()}  {self.command or "-"} {path}  {detail}',
            flush=True,
        )

    # ------------------------------------------------------------ routing --

    def do_OPTIONS(self):
        self.send_response(HTTPStatus.NO_CONTENT)
        self._origin_header()
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, X-Relay-Token')
        # Chrome's Private Network Access check: a page served from a public
        # origin needs this before it may call a server on localhost.
        self.send_header('Access-Control-Allow-Private-Network', 'true')
        self.send_header('Access-Control-Max-Age', '600')
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)

        if parsed.path == '/health':
            self._send_json(HTTPStatus.OK, {'ok': True, 'service': 'camera-relay'})
            return

        if parsed.path.startswith('/stream/'):
            session_id = parsed.path[len('/stream/'):]
            mode = (parse_qs(parsed.query).get('mode') or ['color'])[0]
            self._stream(session_id, mode)
            return

        self._send_json(HTTPStatus.NOT_FOUND, {'error': 'Not found'})

    def do_POST(self):
        parsed = urlparse(self.path)

        if parsed.path == '/session':
            self._open_session()
            return

        self._send_json(HTTPStatus.NOT_FOUND, {'error': 'Not found'})

    def do_DELETE(self):
        parsed = urlparse(self.path)

        if parsed.path.startswith('/session/'):
            session_id = parsed.path[len('/session/'):]
            closed = STORE.close(session_id)
            self._send_json(HTTPStatus.OK, {'closed': closed})
            return

        self._send_json(HTTPStatus.NOT_FOUND, {'error': 'Not found'})

    # ----------------------------------------------------------- handlers --

    def _open_session(self):
        locked = GUARD.locked_for
        if locked:
            self._send_json(HTTPStatus.TOO_MANY_REQUESTS, {
                'error': f'Too many bad access tokens. Locked for {locked} more seconds.',
            })
            return

        if not GUARD.check(self.headers.get('X-Relay-Token', '')):
            self._send_json(HTTPStatus.UNAUTHORIZED, {
                'error': 'Wrong or missing relay access token. It is printed in the '
                         'terminal where the relay is running.',
            })
            return

        try:
            data = self._read_json()
        except (ValueError, json.JSONDecodeError):
            self._send_json(HTTPStatus.BAD_REQUEST, {'error': 'Malformed request body.'})
            return

        if STORE.count() >= MAX_SESSIONS:
            self._send_json(HTTPStatus.SERVICE_UNAVAILABLE, {
                'error': f'The relay already has {MAX_SESSIONS} cameras open.',
            })
            return

        ip = (data.get('ip') or '').strip()
        if not ip:
            self._send_json(HTTPStatus.BAD_REQUEST, {'error': 'Camera IP address is required.'})
            return

        width = int(data.get('width') or 640)
        width = max(160, min(width, 1920))

        rtsp_url = build_rtsp_url(
            ip,
            data.get('username') or '',
            data.get('password') or '',
            data.get('path') or DEFAULT_STREAM_PATH,
        )

        try:
            session_id = STORE.create(rtsp_url, width)
        except ConnectionError as exc:
            self._send_json(HTTPStatus.BAD_GATEWAY, {'error': str(exc)})
            return
        except Exception as exc:  # pragma: no cover - defensive
            self._send_json(HTTPStatus.BAD_GATEWAY, {'error': f'Could not start the stream: {exc}'})
            return
        finally:
            # Do not leave the assembled URL (and so the password) sitting in
            # a local variable for the lifetime of the request thread.
            rtsp_url = ''
            data = {}

        self._send_json(HTTPStatus.OK, {'id': session_id})

    def _stream(self, session_id: str, mode: str):
        session = STORE.get(session_id)
        if session is None:
            self._send_json(HTTPStatus.NOT_FOUND, {'error': 'That session is not open. Connect again.'})
            return

        boundary = 'frameboundary'
        self.send_response(HTTPStatus.OK)
        self.send_header('Content-Type', f'multipart/x-mixed-replace; boundary={boundary}')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Connection', 'close')
        self._origin_header()
        self.end_headers()

        encode_params = [int(cv2.IMWRITE_JPEG_QUALITY), JPEG_QUALITY]
        frame_interval = 1.0 / TARGET_FPS
        last_id = 0

        try:
            while True:
                session.touch()
                started = time.monotonic()

                try:
                    frame, last_id = session.latest(last_id)
                except ConnectionError:
                    break

                if frame is None:
                    # Nothing new yet: wait briefly rather than spin.
                    time.sleep(0.01)
                    if time.monotonic() - started > 10:
                        break
                    continue

                if mode == 'gray':
                    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

                ok, buffer = cv2.imencode('.jpg', frame, encode_params)
                if not ok:
                    continue

                chunk = buffer.tobytes()
                self.wfile.write(f'--{boundary}\r\n'.encode('ascii'))
                self.wfile.write(b'Content-Type: image/jpeg\r\n')
                self.wfile.write(f'Content-Length: {len(chunk)}\r\n\r\n'.encode('ascii'))
                self.wfile.write(chunk)
                self.wfile.write(b'\r\n')
                self.wfile.flush()

                elapsed = time.monotonic() - started
                if elapsed < frame_interval:
                    time.sleep(frame_interval - elapsed)
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError):
            # The viewer closed the tab or hit Disconnect. Normal.
            pass


def sweeper() -> None:
    while True:
        time.sleep(5)
        STORE.sweep()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--host', default='127.0.0.1',
                        help='Interface to bind. Defaults to 127.0.0.1 (this machine only).')
    parser.add_argument('--port', type=int, default=8477, help='Port to listen on. Default 8477.')
    parser.add_argument('--allow-origin', action='append', default=[],
                        help='Extra website origin allowed to use this relay. Repeatable.')
    parser.add_argument('--token', default=None,
                        help='Access token required to open a session. Generated and '
                             'printed if omitted. Pass one to keep it stable across restarts.')
    args = parser.parse_args()

    # Line-buffer stdout. Python block-buffers it whenever output is not a
    # terminal, so when the relay is started with its output redirected to a
    # file or a service manager, the access token below would otherwise sit
    # invisible in the buffer.
    try:
        sys.stdout.reconfigure(line_buffering=True)
    except AttributeError:  # pragma: no cover - Python < 3.7
        pass

    global GUARD
    token = args.token or secrets.token_urlsafe(12)
    GUARD = TokenGuard(token)

    RelayHandler.allowed_origins = DEFAULT_ORIGINS + args.allow_origin

    threading.Thread(target=sweeper, daemon=True).start()

    server = ThreadingHTTPServer((args.host, args.port), RelayHandler)
    server.daemon_threads = True

    print(f'Camera relay listening on http://{args.host}:{args.port}')
    print('\n  ACCESS TOKEN:  ' + token)
    print('  Paste this into the Labs page. Anyone who has it, plus the address')
    print('  of this relay, can watch the camera -- treat it like a password.\n')
    print('Allowed website origins:')
    for origin in RelayHandler.allowed_origins:
        print(f'  {origin}')
    if args.host not in ('127.0.0.1', 'localhost'):
        print(f'\n!! Bound to {args.host}: reachable from the network, not just this machine.')
    print('\nOpen the Labs page and enter this relay address. Ctrl+C to stop.\n')

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nStopping...')
    finally:
        STORE.close_all()
        server.server_close()


if __name__ == '__main__':
    main()
