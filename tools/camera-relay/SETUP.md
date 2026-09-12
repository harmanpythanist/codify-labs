# Permanent setup — feed on the website, nothing to type

Goal: you turn on the laptop, and anyone who knows the Labs password can watch
the camera at codifylabspk.com/labs. No addresses or tokens to re-enter, ever.

Do steps 1–5 once. After that, step 6 is the whole routine.

---

## How it fits together

```
  Viewer's browser                 Vercel (your site)            Your laptop
  ────────────────                 ──────────────────            ───────────
  Labs password  ───────────────►  /api/labs/session
                                   holds camera details
                                   and the relay token  ──────►  relay.py ──► camera
                 ◄───────────────  just a session id
  stream the session id ────────────────────────────────────────────────►  tunnel
```

The camera's address and password, and the relay's token, live only in
Vercel's environment variables. They are never in the repo (which is public)
and never sent to the browser. The video goes straight from your laptop to the
viewer — it does not pass through Vercel, so there is no size or time limit.

The password check happens **on the server**. The gate in the page is only
there to hide the section; it runs in the visitor's browser and protects
nothing on its own.

---

## 1. Give the relay a permanent address

The relay is on your home network, so the internet cannot reach it without a
tunnel. The tunnel needs a **fixed** address, otherwise you are back to
re-typing it every restart.

### Tailscale Funnel (recommended — no DNS changes)

```bash
winget install --id tailscale.tailscale
```

```bash
tailscale up
```

That opens a browser to sign in — do it with whichever account you want to own
this. Then publish the relay's port:

```bash
tailscale funnel 8477
```

The first run may tell you to enable Funnel and HTTPS in the Tailscale admin
console; follow the link it prints, then run it again. It will then show your
permanent address:

```
Available on the internet:
https://your-laptop.tailXXXX.ts.net
```

**Write that address down — it is your `RELAY_URL`.** It never changes.

One caveat: Tailscale intends Funnel for light traffic, and a camera feed is
continuous. If it ever throttles, switch to the Cloudflare option below.

### Cloudflare named tunnel (alternative — nicer URL, but moves your DNS)

This gives `camera.codifylabspk.com`, but it requires codifylabspk.com's
nameservers to move from GoDaddy to Cloudflare. **Copy every existing DNS
record into Cloudflare first**, or the live site goes down when the
nameservers switch. Then:

```bash
cloudflared tunnel login
cloudflared tunnel create camera-relay
cloudflared tunnel route dns camera-relay camera.codifylabspk.com
```

`RELAY_URL` is then `https://camera.codifylabspk.com`, and the tunnel argument
for step 2 is `tunnel run --url http://127.0.0.1:8477 camera-relay`.

---

## 2. Start the relay and tunnel automatically at logon

Pick a long random token first. This one line will make one:

```bash
python -c "import secrets; print(secrets.token_urlsafe(24))"
```

Keep it — you need the same value in step 3. Then, in PowerShell:

```bash
cd C:\project\codify-labs\tools\camera-relay
```

```bash
.\install-autostart.ps1 -Token 'PASTE-YOUR-TOKEN'
```

With Tailscale Funnel that is all: Funnel's own configuration is kept by the
Tailscale service and comes back after a reboot, so only the relay needs a
task. (For cloudflared, which must be relaunched each time, add
`-TunnelCommand` and `-TunnelArgs` — see `Get-Help .\install-autostart.ps1`.)

It registers the task, starts it, and confirms the relay is answering. It
restarts itself if it crashes, and comes back at every logon.

Logs land in `%LOCALAPPDATA%\CodifyLabs\`. To undo it all:
`.\install-autostart.ps1 -Uninstall`

---

## 3. Put the secrets in Vercel

In the Vercel dashboard: **your project → Settings → Environment Variables**.
Add these for the Production environment:

| Name | Value |
| --- | --- |
| `LABS_PASSWORD` | the password that unlocks /labs |
| `RELAY_URL` | the permanent address from step 1, no trailing slash |
| `RELAY_TOKEN` | the token from step 2 |
| `CAMERA_IP` | the camera's address on your home network |
| `CAMERA_USERNAME` | camera login |
| `CAMERA_PASSWORD` | camera password |
| `CAMERA_PATH` | optional — defaults to `/h264/ch1/main/av_stream` |
| `CAMERA_WIDTH` | optional — defaults to `640` |

These are the only place the camera's credentials exist. Never move them into
the code: this repo is public, and the JavaScript bundle is served to every
visitor, so either route publishes your camera password to the world.

## 4. Redeploy

Environment variables only take effect on a new deployment. Push anything, or
hit **Redeploy** in the Vercel dashboard.

## 5. Check it

Open `https://codifylabspk.com/labs`, enter the Labs password, and the feed
should appear by itself within a few seconds.

---

## 6. From then on

Turn the laptop on and log in. That is all. The relay and tunnel start by
themselves; the website finds them.

The camera has to be reachable from the laptop, so the laptop must be on the
same network as the camera and **awake** — sleep stops the feed. If you want it
to serve overnight, set that machine's power plan to never sleep.

---

## When something is wrong

Open `/labs` and read the message; each one points at a different piece.

| Message | What it means |
| --- | --- |
| "not configured on the server" | Environment variables missing, or you have not redeployed since adding them. |
| "Wrong password" | `LABS_PASSWORD` on Vercel does not match what you typed. |
| "Could not reach the camera relay" | The laptop is off, asleep, or the tunnel is not running. Check `%LOCALAPPDATA%\CodifyLabs\tunnel.log`. |
| "Wrong or missing relay access token" | `RELAY_TOKEN` on Vercel does not match the `-Token` you installed with. |
| "Could not open the camera stream" | The relay is fine but the camera is not answering — check `CAMERA_IP`, or whether the camera is on. |

To check the relay by hand from the laptop:

```bash
curl http://127.0.0.1:8477/health
```

And to check it from the outside, replacing the address with your own:

```bash
curl https://your-laptop.tailXXXX.ts.net/health
```

Both should print `{"ok": true, "service": "camera-relay"}`.

## If the token leaks

Anyone with the relay's address and token can watch the camera. To cut them
off: re-run `install-autostart.ps1` with a new `-Token`, update `RELAY_TOKEN`
on Vercel, and redeploy. Every open session dies immediately.
