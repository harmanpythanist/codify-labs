# Camera relay

Shows an EZVIZ (or any RTSP) camera live on the private `/labs` page.

> **Setting this up permanently?** See [SETUP.md](SETUP.md) — a fixed address,
> auto-start at logon, and the camera's credentials held on the server so the
> page needs nothing typed into it. This file covers running the relay by hand.

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

It listens on `http://127.0.0.1:8477`, **this machine only**, and prints an
access token:

```
  ACCESS TOKEN:  7Kd2pQx9RtLm
```

Then open `/labs`, paste that token, enter the camera's IP, username and
password, and press Connect.

Options:

| Flag | Default | Meaning |
| --- | --- | --- |
| `--port` | `8477` | Port to listen on. |
| `--host` | `127.0.0.1` | Bind address. `0.0.0.0` exposes the relay to your whole network — see the warning below. |
| `--token` | generated | Access token required to open a session. Pass one to keep it stable across restarts. |
| `--allow-origin` | — | Extra website origin allowed to use the relay. Repeatable. |

## Watching from anywhere (public tunnel)

A camera on your home network cannot be reached from the internet, and the
website's own servers cannot see it either. To watch from outside, the relay
needs a public address, which a tunnel provides without any port forwarding.

**This puts your camera on the internet.** The access token becomes the only
thing protecting it, so use a long one and treat it like a password.

Install the tunnel client once:

```bash
winget install --id Cloudflare.cloudflared
```

Then run the relay and the tunnel side by side, in two terminals:

```bash
python tools/camera-relay/relay.py --token CHOOSE-A-LONG-RANDOM-TOKEN
```

```bash
cloudflared tunnel --url http://127.0.0.1:8477
```

`cloudflared` prints a public HTTPS address like
`https://random-words-here.trycloudflare.com`. On the Labs page, open **Show
advanced settings** and put that address in *Relay address*. It works from any
network, including mobile data.

Two things to know about quick tunnels: the address changes every time you
restart `cloudflared`, and anyone who has both the address and the token can
watch the camera. For a fixed address like `camera.codifylabspk.com` you need a
named tunnel, which requires the domain to be on Cloudflare:

```bash
cloudflared tunnel login
cloudflared tunnel create camera-relay
cloudflared tunnel route dns camera-relay camera.codifylabspk.com
cloudflared tunnel run --url http://127.0.0.1:8477 camera-relay
```

Add the site's own origin if it is not already allowed:
`--allow-origin https://your-site`.

Bandwidth: the feed is continuous JPEG, roughly 1–2 Mbit/s at 640 px. It runs
for as long as the page is open, so on mobile data, use a smaller frame width
or the camera's sub-stream.

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

- **The access token is the real protection.** CORS and the Labs password are
  not: CORS only restrains browsers, and the Labs gate runs in the visitor's
  browser, so neither stops a plain HTTP request from a script. Anyone holding
  the token and the relay's address can watch the camera.
- After 8 wrong tokens the relay refuses new sessions for 5 minutes. That
  locks you out too — restart the relay to clear it.
- At most 4 cameras can be open at once, so a stolen token cannot be used to
  exhaust the machine.
- The relay binds to `127.0.0.1` on purpose. `--host 0.0.0.0` opens it to your
  whole network; a tunnel is the better way to reach it from outside, because
  the tunnel gives you HTTPS and the relay itself stays on localhost.
- Only the origins listed in `DEFAULT_ORIGINS` may call the relay from a
  browser. Add your own with `--allow-origin`.
- The token is sent as a header, never in a URL, so it stays out of logs and
  browser history. The stream URL carries only a short-lived session id.
- If you think the token has leaked, restart the relay with a new one. Every
  open session dies with it.

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
