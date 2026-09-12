# Camera relay

Shows an EZVIZ (or any RTSP) camera live on the private `/labs` page.

## Why a relay is needed

**Browsers cannot play RTSP.** Chrome, Firefox and Safari have no `rtsp://`
support, and no JavaScript library can add it — a web page is not allowed to
open the raw sockets RTSP requires. So the website cannot talk to the camera
on its own, no matter how it is written.

`relay.py` bridges that gap. It does exactly what the OpenCV notebook does:

```python
cap = cv2.VideoCapture(f"rtsp://{username}:{password}@{ip}/h264/ch1/main/av_stream")
```

and re-publishes the frames as MJPEG over HTTP, which a plain `<img>` tag can
display. The Labs page is that `<img>` tag plus a form.

## Running it

The relay has to run on a computer that can reach the camera — normally your
own PC, on the same network as the camera. It needs Python 3.8+ and
`opencv-python`, which the notebook already uses. Nothing else to install.

```bash
python tools/camera-relay/relay.py
```

It listens on `http://127.0.0.1:8477`, **this machine only**. Then open
`/labs`, enter the camera's IP, username and password, and press Connect.

Options:

| Flag | Default | Meaning |
| --- | --- | --- |
| `--port` | `8477` | Port to listen on. |
| `--host` | `127.0.0.1` | Bind address. `0.0.0.0` exposes the relay to your whole network — see the warning below. |
| `--allow-origin` | — | Extra website origin allowed to use the relay. Repeatable. |

## What it does and does not keep

- **No recording.** Frames are decoded, resized, JPEG-encoded and written
  straight to the browser. Nothing is written to disk at any point.
- **Credentials stay in memory.** They are POSTed once, used to build the RTSP
  URL, and held only for the life of the session. They never appear in a URL:
  the browser's stream request carries an opaque session id, so the password
  cannot leak through browser history, a `Referer` header, or the relay's log.
- **The log records paths and status codes only**, never query strings or
  request bodies.
- **The camera is released automatically** when you disconnect, close the tab,
  or navigate away — and after 30 seconds with no viewer, as a backstop.

## Security notes

- The relay binds to `127.0.0.1` on purpose. If you pass `--host 0.0.0.0`,
  anyone on your network can ask it to open a stream, and there is no
  authentication on the relay itself. Only do that on a network you trust.
- Only the origins listed in `DEFAULT_ORIGINS` may call the relay, so a random
  website you have open cannot quietly drive your camera. Add your own with
  `--allow-origin`.
- The relay is **not** meant to be exposed to the public internet. Publishing a
  camera feed to the world needs authentication, TLS, and a rate limit, none of
  which this has.

## If it does not connect

- **"Could not reach the relay"** — the relay is not running, or it is on a
  different port. Check the terminal where you started it.
- **"Could not open the camera stream"** — this is OpenCV failing to open the
  RTSP URL, the same failure as `cap.isOpened()` being false in the notebook.
  Check the IP, the username and password, and that the computer running the
  relay is on the same network as the camera.
- **The path may differ by model.** The default is EZVIZ's main stream,
  `/h264/ch1/main/av_stream`. Some units use `/h264/ch1/sub/av_stream` for a
  lighter sub-stream, or `/Streaming/Channels/101` on Hikvision-derived
  firmware. Change it under "Show advanced settings" on the page.
- **A choppy feed** usually means the main stream is too heavy for the link.
  Try the sub-stream path, or a smaller frame width.
