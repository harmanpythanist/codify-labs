/**
 * Opens a camera session on behalf of the browser.
 *
 * WHY THIS EXISTS
 * ---------------
 * The camera's address, username and password, and the relay's access token,
 * must never reach the browser. Anything the page holds is readable: this repo
 * is public, and the JavaScript bundle is served to every visitor regardless.
 * Putting those values in the site's code would publish the camera's password
 * to the internet.
 *
 * So the secrets live here, as environment variables on Vercel, and the
 * browser never sees them. It sends the Labs password; this function checks it
 * SERVER-side (the gate in the page is cosmetic -- it runs in the visitor's
 * browser and cannot be trusted), then opens the session on the relay and
 * returns nothing but an opaque, short-lived session id.
 *
 * The video itself does not pass through here. The browser streams it straight
 * from the relay using that id, which keeps this function fast and avoids the
 * execution time limit a proxied video stream would hit.
 *
 * Required environment variables (Vercel > Settings > Environment Variables):
 *   LABS_PASSWORD     the password that unlocks the Labs section
 *   RELAY_URL         public address of the relay, e.g. https://pc.tailnet.ts.net
 *   RELAY_TOKEN       the relay's access token
 *   CAMERA_IP         the camera's address on the home network
 *   CAMERA_USERNAME   camera login
 *   CAMERA_PASSWORD   camera password
 *   CAMERA_PATH       optional, defaults to the EZVIZ main stream
 *   CAMERA_WIDTH      optional, defaults to 640
 */

const crypto = require('crypto');
const https = require('https');

const DEFAULT_PATH = '/h264/ch1/main/av_stream';

/**
 * POSTs JSON, and works around a name this deployment cannot resolve.
 *
 * Tailscale's *.ts.net records are not visible to every resolver: Google's
 * returns the Funnel address while Cloudflare's returns NXDOMAIN for the same
 * name, and Vercel's behaves like Cloudflare's, so the ordinary request fails
 * with ENOTFOUND however long you wait.
 *
 * So: try normally first, and only if the name cannot be resolved, look it up
 * over DNS-over-HTTPS and connect straight to the address. TLS still verifies
 * the certificate against the original hostname, because `servername` sets SNI
 * -- this bypasses the broken lookup, not the encryption.
 */
async function postJson(url, headers, body, signal) {
  try {
    const res = await fetch(url, { method: 'POST', headers, body, signal });
    return { status: res.status, json: await res.json().catch(() => ({})) };
  } catch (err) {
    const dnsFailed = /ENOTFOUND|EAI_AGAIN/.test(
      `${err.message} ${err.cause && err.cause.message ? err.cause.message : ''}`
    );
    if (!dnsFailed) throw err;

    const target = new URL(url);
    const address = await resolveOverHttps(target.hostname);
    if (!address) throw err;

    return requestByAddress(target, address, headers, body, signal);
  }
}

/** First A record for `hostname`, via Google's DoH endpoint, or null. */
async function resolveOverHttps(hostname) {
  const res = await fetch(
    `https://dns.google/resolve?name=${encodeURIComponent(hostname)}&type=A`,
    { headers: { accept: 'application/dns-json' } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  const answer = (data.Answer || []).find(a => a.type === 1 && a.data);
  return answer ? answer.data : null;
}

/** The same POST, but aimed at a known address with SNI set to the hostname. */
function requestByAddress(target, address, headers, body, signal) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        host: address,
        servername: target.hostname, // SNI, and what the certificate is checked against
        port: target.port || 443,
        path: target.pathname + target.search,
        method: 'POST',
        headers: { ...headers, Host: target.hostname },
        timeout: 15000,
      },
      (res) => {
        let raw = '';
        res.setEncoding('utf8');
        res.on('data', chunk => { raw += chunk; });
        res.on('end', () => {
          let json = {};
          try { json = JSON.parse(raw); } catch { /* leave empty */ }
          resolve({ status: res.statusCode, json });
        });
      }
    );

    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('the relay did not answer in time')));
    if (signal) signal.addEventListener('abort', () => req.destroy(new Error('aborted')), { once: true });
    req.end(body);
  });
}

/**
 * Crude brute-force brake.
 *
 * Serverless instances are short-lived and there may be several at once, so
 * this counter is per-instance and easily sidestepped by a determined attacker.
 * It is here to blunt casual guessing; the real protection is a long password.
 */
let failures = 0;
let lockedUntil = 0;
const MAX_FAILURES = 10;
const LOCKOUT_MS = 5 * 60 * 1000;

function passwordMatches(given, expected) {
  const a = Buffer.from(String(given || ''), 'utf8');
  const b = Buffer.from(String(expected), 'utf8');
  // timingSafeEqual throws unless the lengths match, so compare hashes of the
  // two instead: equal length always, and still constant time.
  const ha = crypto.createHash('sha256').update(a).digest();
  const hb = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const {
    LABS_PASSWORD, RELAY_URL, RELAY_TOKEN,
    CAMERA_IP, CAMERA_USERNAME, CAMERA_PASSWORD,
    CAMERA_PATH, CAMERA_WIDTH,
  } = process.env;

  // Not configured yet: say so plainly, so the page can fall back to asking
  // for the details by hand instead of showing a mysterious failure.
  const missing = ['LABS_PASSWORD', 'RELAY_URL', 'RELAY_TOKEN', 'CAMERA_IP']
    .filter(name => !process.env[name]);
  if (missing.length) {
    return res.status(501).json({
      error: 'The camera is not configured on the server.',
      missing,
      configured: false,
    });
  }

  if (Date.now() < lockedUntil) {
    const seconds = Math.ceil((lockedUntil - Date.now()) / 1000);
    return res.status(429).json({ error: `Too many attempts. Try again in ${seconds}s.` });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Malformed request.' });
    }
  }

  if (!passwordMatches(body && body.password, LABS_PASSWORD)) {
    failures += 1;
    if (failures >= MAX_FAILURES) {
      lockedUntil = Date.now() + LOCKOUT_MS;
      failures = 0;
    }
    // Slow down guessing a little.
    await new Promise(resolve => setTimeout(resolve, 400));
    return res.status(401).json({ error: 'Wrong password.' });
  }
  failures = 0;

  const relay = RELAY_URL.replace(/\/$/, '');

  // Catch a malformed RELAY_URL here, where we can say so, rather than letting
  // fetch fail with something that reads like the relay being switched off.
  let relayHost;
  try {
    relayHost = new URL(relay).host;
  } catch {
    return res.status(500).json({
      error: `RELAY_URL is not a valid address: "${relay}". It needs the https:// prefix and no path.`,
    });
  }

  if (typeof fetch !== 'function') {
    return res.status(500).json({
      error: 'This deployment runs a Node version older than 18, which has no fetch(). '
           + 'Raise the Node.js version in Vercel > Settings > General and redeploy.',
    });
  }

  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), 15000);

  let response;
  try {
    response = await postJson(
      `${relay}/session`,
      {
        'Content-Type': 'application/json',
        'X-Relay-Token': RELAY_TOKEN,
      },
      JSON.stringify({
        ip: CAMERA_IP,
        username: CAMERA_USERNAME || '',
        password: CAMERA_PASSWORD || '',
        path: CAMERA_PATH || DEFAULT_PATH,
        width: Number(CAMERA_WIDTH) || 640,
      }),
      abort.signal,
    );
  } catch (err) {
    if (err.name === 'AbortError') {
      return res.status(502).json({
        error: 'The camera relay did not answer in time. Is the laptop awake and the tunnel running?',
      });
    }
    // Say what actually went wrong. "It may be switched off" covers a dead
    // laptop, a wrong address and a TLS failure alike, which makes it useless
    // for working out which one you have. The cause carries no secret -- the
    // relay's address reaches the browser on success anyway.
    const cause = err.cause && err.cause.message ? `${err.message} (${err.cause.message})` : err.message;
    return res.status(502).json({
      error: `Could not reach the camera relay at ${relayHost}: ${cause}`,
    });
  } finally {
    clearTimeout(timer);
  }

  const data = response.json || {};

  if (response.status < 200 || response.status >= 300) {
    // Pass the relay's own message through -- it distinguishes "camera
    // unreachable" from "wrong relay token" -- but never leak the token.
    return res.status(502).json({ error: data.error || 'The relay refused the connection.' });
  }

  return res.status(200).json({ relayUrl: relay, id: data.id });
};
