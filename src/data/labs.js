/**
 * Configuration for the private /labs area.
 *
 * IMPORTANT — what this gate is and is not.
 * This is a static React site: everything in this file ships to the browser,
 * so the gate only hides the section from casual visitors. It is not real
 * security. The password is stored as a SHA-256 hash rather than plain text
 * purely so the phrase cannot be found by searching the built JS bundle —
 * anyone determined can still read the bundle, or read this file on GitHub if
 * the repo is public.
 *
 * Nothing genuinely confidential (client data, credentials, unreleased
 * contracts) should live behind this gate. When that is needed, the content
 * has to move behind a server that checks the password — an API route, a
 * Vercel middleware with an env-var password, or a real login.
 *
 * To change the password, run:
 *   node -e "console.log(require('crypto').createHash('sha256').update('NEW PASSWORD').digest('hex'))"
 * and paste the result into PASSWORD_HASH below.
 */
export const LABS = {
  label: 'LABS',
  path: '/labs',

  // sha256('earthisroundnotflat')
  passwordHash: '02475c1f027422cac823c4b4a62e01c9840d6d5fd5134e3cdff69b0500ff84bd',

  // Unlock lasts for the browser tab's session only; closing the tab re-locks.
  storageKey: 'codifylabs.labs.unlocked',

  // Where tools/camera-relay/relay.py listens. Browsers cannot open rtsp://,
  // so the camera feed has to come through that relay; see its docstring.
  relayUrl: 'http://127.0.0.1:8477',

  // EZVIZ main stream, the same path the OpenCV notebook used.
  streamPath: '/h264/ch1/main/av_stream',
};

const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

/**
 * Pure-JS SHA-256, used only when crypto.subtle is unavailable.
 *
 * The Web Crypto API needs a secure context, so it is missing when the dev
 * server is opened over plain http from another device on the LAN
 * (http://192.168.x.x:3000) — exactly how phone testing happens. Without this
 * fallback the gate would be impossible to unlock there.
 */
function sha256Fallback(bytes) {
  const H = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ];
  const bitLen = bytes.length * 8;
  const padded = new Uint8Array((((bytes.length + 8) >> 6) + 1) << 6);
  padded.set(bytes);
  padded[bytes.length] = 0x80;
  new DataView(padded.buffer).setUint32(padded.length - 4, bitLen >>> 0);

  const w = new Uint32Array(64);
  const rotr = (x, n) => (x >>> n) | (x << (32 - n));

  for (let off = 0; off < padded.length; off += 64) {
    const view = new DataView(padded.buffer, off, 64);
    for (let i = 0; i < 16; i++) w[i] = view.getUint32(i * 4);
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }

    let [a, b, c, d, e, f, g, h] = H;
    for (let i = 0; i < 64; i++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const t1 = (h + S1 + ch + K[i] + w[i]) >>> 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + maj) >>> 0;
      h = g; g = f; f = e; e = (d + t1) >>> 0;
      d = c; c = b; b = a; a = (t1 + t2) >>> 0;
    }
    [a, b, c, d, e, f, g, h].forEach((v, i) => { H[i] = (H[i] + v) >>> 0; });
  }

  return H.map(v => v.toString(16).padStart(8, '0')).join('');
}

/** SHA-256 of a string, as lowercase hex. */
export async function hashPassword(value) {
  const bytes = new TextEncoder().encode(value);
  if (window.crypto && window.crypto.subtle) {
    const digest = await window.crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
  }
  return sha256Fallback(bytes);
}
