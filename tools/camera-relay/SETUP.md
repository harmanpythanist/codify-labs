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

### Tailscale Funnel (quickest, but only reliable for *your own* viewing)

Fine for testing and for watching it yourself. Not suitable if other people
need to watch — see the Cloudflare section below for why.

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

### Cloudflare named tunnel — `camera.codifylabspk.com`

Use this when other people need to watch. Tailscale's `*.ts.net` records are
not visible to every resolver: Cloudflare's public resolver returns NXDOMAIN
for the very name Google's resolves. Vercel's resolver has the same problem
(worked around in `api/labs/session.js`), but **the viewer's browser fetches
the video straight from the relay**, and that lookup cannot be worked around
from here. Anyone whose DNS is 1.1.1.1 gets past the password and then sees no
video. A hostname on your own domain resolves for everybody.

This changes which company answers DNS for codifylabspk.com. The domain stays
registered at GoDaddy — nothing about ownership, billing or renewal moves, and
it is reversible by pasting GoDaddy's nameservers back.

**1. Add the domain to Cloudflare.** Sign up at cloudflare.com, *Add a site*,
enter codifylabspk.com, choose the Free plan. Cloudflare scans the existing
records — check that both of these are present before going further:

| Type | Name | Value | Proxy |
| --- | --- | --- | --- |
| A | `codifylabspk.com` | `216.198.79.1` | **DNS only** (grey cloud) |
| CNAME | `www` | `cname.vercel-dns.com` | **DNS only** (grey cloud) |

Grey cloud matters. Proxying Vercel through Cloudflare causes TLS and redirect
trouble; leave both unproxied.

**2. Change the nameservers at GoDaddy** to the two Cloudflare gives you.
Activation usually takes minutes, sometimes hours. Cloudflare emails you.

**3. Log in from this machine** and pick codifylabspk.com in the browser:

```bash
& 'C:\Program Files (x86)\cloudflared\cloudflared.exe' tunnel login
```

**4. Run the setup script** — as Administrator, because it installs a service:

```bash
.\setup-cloudflare-tunnel.ps1 -Hostname camera.codifylabspk.com
```

It creates the tunnel, adds the DNS record, writes the config, installs
cloudflared as a Windows service so it starts at boot, and checks that the
hostname answers from more than one resolver.

One trap it handles for you: the service runs as LocalSystem and reads its
config from *that* account's profile, not yours. Install the service without
copying the config across and it sits there reporting **Running** while doing
nothing at all — `cloudflared tunnel info` shows no connections and the
hostname simply times out, with nothing in any log to say why.

**5. On Vercel**, set `RELAY_URL` to `https://camera.codifylabspk.com` and
redeploy.

**6. Close the old entrance** once the site works, so there is only one way in:

```bash
tailscale funnel --https=443 off
```

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
