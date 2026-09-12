import React, { useState, useRef, useEffect, useCallback } from 'react';
import { LABS } from '../data/labs';
import {
  IconVideo, IconLock, IconAlert, IconSpinner, IconClose, IconEye,
} from './Icons';

/**
 * Live view of an RTSP camera (EZVIZ and anything else that speaks RTSP).
 *
 * Browsers cannot open rtsp:// at all, so the feed comes via the small local
 * relay in tools/camera-relay. The relay does the same thing the OpenCV
 * notebook does and re-publishes the frames as MJPEG, which an <img> can show.
 *
 * Credentials are held in React state for exactly as long as the form is on
 * screen. They are POSTed once to the relay, which keeps them in memory only.
 * Nothing is written to localStorage, sessionStorage, the URL, or the relay's
 * log, and no frame is recorded anywhere.
 */
export default function CameraFeed() {
  const [form, setForm] = useState({
    relay: LABS.relayUrl,
    token: '',
    ip: '',
    username: '',
    password: '',
    path: LABS.streamPath,
    width: '640',
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [mode, setMode] = useState('color'); // color | gray | both
  const [status, setStatus] = useState('idle'); // idle | connecting | live | error
  const [error, setError] = useState('');
  const [session, setSession] = useState(null); // { id, relay, cacheBust }

  const sessionRef = useRef(null);
  sessionRef.current = session;

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  /** Tell the relay to release the camera. Best effort — never blocks the UI. */
  const closeSession = useCallback((current) => {
    if (!current) return;
    const url = `${current.relay.replace(/\/$/, '')}/session/${current.id}`;
    try {
      fetch(url, { method: 'DELETE', keepalive: true }).catch(() => {});
    } catch {
      /* the relay may already be gone; nothing to do */
    }
  }, []);

  // Leaving the page must not leave the camera streaming.
  useEffect(() => () => closeSession(sessionRef.current), [closeSession]);

  const connect = async (e) => {
    e.preventDefault();
    if (status === 'connecting') return;

    closeSession(sessionRef.current);
    setSession(null);
    setError('');
    setStatus('connecting');

    const relay = form.relay.trim().replace(/\/$/, '');

    // The relay gives the camera 8s to answer; allow a little more than that
    // before giving up, so a dead relay cannot leave the page spinning.
    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), 20000);

    let res;
    try {
      res = await fetch(`${relay}/session`, {
        signal: abort.signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Sent as a header, never in the URL, so it cannot end up in a log
          // or in browser history.
          'X-Relay-Token': form.token,
        },
        body: JSON.stringify({
          ip: form.ip.trim(),
          username: form.username,
          password: form.password,
          path: form.path.trim() || LABS.streamPath,
          width: Number(form.width),
        }),
      });
    } catch (err) {
      setStatus('error');
      setError(
        err.name === 'AbortError'
          ? `The relay at ${relay} did not answer in time. It may be starting up, or the tunnel may be down.`
          : `Could not reach the relay at ${relay}. Start it on the computer that ` +
            'can see the camera: python tools/camera-relay/relay.py'
      );
      return;
    } finally {
      clearTimeout(timer);
    }

    let data = {};
    try {
      data = await res.json();
    } catch {
      /* fall through to the status check below */
    }

    if (!res.ok) {
      setStatus('error');
      setError(data.error || `The relay refused the connection (HTTP ${res.status}).`);
      return;
    }

    setSession({ id: data.id, relay, cacheBust: Date.now() });
    setStatus('live');

    // The password has done its job. Drop it from component state so it is
    // not sitting in memory behind a visible form for the rest of the session.
    setForm(f => ({ ...f, password: '' }));
  };

  const disconnect = () => {
    closeSession(sessionRef.current);
    setSession(null);
    setStatus('idle');
    setError('');
  };

  const streamSrc = (which) =>
    `${session.relay}/stream/${session.id}?mode=${which}&t=${session.cacheBust}`;

  const connecting = status === 'connecting';

  return (
    <div className="cam">
      <div className="cam-grid">
        {/* ------------------------------------------------------- form -- */}
        <form className="cam-form card" onSubmit={connect}>
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <IconVideo size={19} /> Camera
          </h3>

          <label className="field">
            <span className="field-label">Relay access token</span>
            <input
              className="input"
              type="password"
              value={form.token}
              onChange={set('token')}
              placeholder="Printed by relay.py"
              autoComplete="off"
              spellCheck="false"
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Camera IP address</span>
            <input
              className="input"
              value={form.ip}
              onChange={set('ip')}
              placeholder="192.168.1.64"
              autoComplete="off"
              spellCheck="false"
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Username</span>
            <input
              className="input"
              value={form.username}
              onChange={set('username')}
              placeholder="admin"
              autoComplete="off"
              spellCheck="false"
            />
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <input
              className="input"
              type="password"
              value={form.password}
              onChange={set('password')}
              placeholder="Camera password"
              autoComplete="new-password"
            />
          </label>

          <button
            type="button"
            className="cam-advanced-toggle"
            onClick={() => setShowAdvanced(v => !v)}
            aria-expanded={showAdvanced}
          >
            {showAdvanced ? 'Hide' : 'Show'} advanced settings
          </button>

          {showAdvanced && (
            <div className="cam-advanced">
              <label className="field">
                <span className="field-label">RTSP path</span>
                <input
                  className="input"
                  value={form.path}
                  onChange={set('path')}
                  spellCheck="false"
                />
                <span className="cam-hint">
                  EZVIZ main stream by default. Some models use
                  <code> /h264/ch1/sub/av_stream </code> for the lighter sub-stream.
                </span>
              </label>

              <label className="field">
                <span className="field-label">Relay address</span>
                <input
                  className="input"
                  value={form.relay}
                  onChange={set('relay')}
                  spellCheck="false"
                />
                <span className="cam-hint">
                  Where <code>relay.py</code> is running.
                </span>
              </label>

              <label className="field" style={{ marginBottom: 0 }}>
                <span className="field-label">Frame width</span>
                <select className="input" value={form.width} onChange={set('width')}>
                  <option value="480">480 px</option>
                  <option value="640">640 px</option>
                  <option value="960">960 px</option>
                  <option value="1280">1280 px</option>
                </select>
              </label>
            </div>
          )}

          {error && (
            <p className="cam-error" role="alert">
              <IconAlert size={15} /> <span>{error}</span>
            </p>
          )}

          <div className="cam-actions">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={connecting || !form.ip.trim() || !form.token}
            >
              {connecting
                ? <><IconSpinner size={16} className="spin" /> Connecting…</>
                : <><IconVideo size={16} /> {session ? 'Reconnect' : 'Connect'}</>}
            </button>
            {session && (
              <button type="button" className="btn btn-secondary btn-block" onClick={disconnect}>
                <IconClose size={16} /> Disconnect
              </button>
            )}
          </div>

          <p className="cam-privacy">
            <IconLock size={13} />
            <span>
              Credentials go only to your relay and are kept in memory there.
              Nothing is recorded, and no video leaves your network.
            </span>
          </p>
        </form>

        {/* ------------------------------------------------------ viewer -- */}
        <div className="cam-viewer">
          <div className="cam-viewer-bar">
            <span className={`cam-dot ${status}`} aria-hidden="true" />
            <span className="cam-state">
              {status === 'live' ? 'Live' : status === 'connecting' ? 'Connecting' : status === 'error' ? 'Not connected' : 'Idle'}
            </span>

            <div className="cam-modes" role="group" aria-label="View mode">
              {[['color', 'Colour'], ['gray', 'Grayscale'], ['both', 'Both']].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={`cam-mode ${mode === value ? 'is-on' : ''}`}
                  onClick={() => setMode(value)}
                  aria-pressed={mode === value}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className={`cam-stage ${mode === 'both' ? 'is-split' : ''}`}>
            {session ? (
              <>
                {(mode === 'color' || mode === 'both') && (
                  <img
                    className="cam-img"
                    src={streamSrc('color')}
                    alt="Live camera feed"
                    onError={() => {
                      setStatus('error');
                      setError('The stream stopped. The camera or the relay may have gone away — try Reconnect.');
                    }}
                  />
                )}
                {(mode === 'gray' || mode === 'both') && (
                  <img
                    className="cam-img"
                    src={streamSrc('gray')}
                    alt="Live camera feed, grayscale"
                    onError={() => {
                      setStatus('error');
                      setError('The stream stopped. The camera or the relay may have gone away — try Reconnect.');
                    }}
                  />
                )}
              </>
            ) : (
              <div className="cam-empty">
                <IconEye size={26} />
                <p>Enter the camera details and press Connect.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .cam-grid { display: grid; grid-template-columns: 340px 1fr; gap: 22px; align-items: start; }
        .cam-form { padding: 24px; }
        .cam-form .card-title { margin-bottom: 20px; }

        .cam-advanced-toggle {
          font-family: var(--font-head); font-size: var(--text-xs); font-weight: 700;
          color: var(--blue-700); padding: 4px 0; margin-bottom: 14px;
        }
        .cam-advanced-toggle:hover { text-decoration: underline; }
        .cam-advanced {
          padding: 16px; margin-bottom: 16px;
          background: var(--bg-soft); border: 1px solid var(--line);
          border-radius: var(--r-sm);
        }
        .cam-hint {
          display: block; margin-top: 6px;
          font-size: var(--text-xs); color: var(--ink-3); line-height: 1.55;
        }
        .cam-hint code, .cam-advanced code { font-size: 0.92em; }

        .cam-error {
          display: flex; align-items: flex-start; gap: 8px;
          margin-bottom: 14px; padding: 11px 13px;
          background: #FDF0EF; border: 1px solid #F3C9C5; border-radius: var(--r-sm);
          font-size: var(--text-xs); line-height: 1.55; color: var(--error);
        }
        .cam-error svg { flex-shrink: 0; margin-top: 1px; }

        .cam-actions { display: flex; flex-direction: column; gap: 9px; }

        .cam-privacy {
          display: flex; align-items: flex-start; gap: 8px;
          margin: 18px 0 0; padding-top: 16px;
          border-top: 1px solid var(--line);
          font-size: var(--text-xs); color: var(--ink-3); line-height: 1.6;
        }
        .cam-privacy svg { flex-shrink: 0; margin-top: 2px; }

        .cam-viewer {
          background: var(--surface); border: 1px solid var(--line);
          border-radius: var(--r-lg); overflow: hidden; box-shadow: var(--shadow-sm);
        }
        .cam-viewer-bar {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px; border-bottom: 1px solid var(--line);
          background: var(--bg-soft);
        }
        .cam-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--ink-3); flex-shrink: 0; }
        .cam-dot.live { background: #18A957; box-shadow: 0 0 0 3px rgba(24,169,87,0.18); }
        .cam-dot.connecting { background: #E0A300; }
        .cam-dot.error { background: var(--error); }
        .cam-state {
          font-family: var(--font-head); font-size: var(--text-xs);
          font-weight: 700; color: var(--ink-2); letter-spacing: 0.02em;
        }
        .cam-modes { display: flex; gap: 2px; margin-left: auto; }
        .cam-mode {
          padding: 6px 12px; border-radius: var(--r-sm);
          font-family: var(--font-head); font-size: var(--text-xs); font-weight: 600;
          color: var(--ink-3);
        }
        .cam-mode:hover { background: var(--bg-tint); color: var(--blue-700); }
        .cam-mode.is-on { background: var(--bg-tint); color: var(--blue-700); }

        .cam-stage {
          display: flex; align-items: center; justify-content: center;
          min-height: 380px; padding: 16px; gap: 12px;
          background: #0B1430;
        }
        .cam-stage.is-split { flex-wrap: wrap; }
        .cam-img {
          display: block; max-width: 100%; height: auto;
          border-radius: var(--r-sm); background: #000;
        }
        .cam-stage.is-split .cam-img { flex: 1 1 300px; min-width: 0; }
        .cam-empty {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          color: rgba(255,255,255,0.5); text-align: center;
          font-size: var(--text-sm);
        }
        .cam-empty p { margin: 0; }

        @media (max-width: 900px) {
          .cam-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
