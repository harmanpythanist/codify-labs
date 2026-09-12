import React, { useState, useEffect, useRef, useCallback } from 'react';
import useSeo from '../hooks/useSeo';
import { PageHero } from '../components/ui';
import { LABS, hashPassword } from '../data/labs';
import { IconLock, IconUnlock, IconFlask, IconSpinner, IconAlert } from '../components/Icons';

/**
 * Keeps search engines off this route while it is on screen.
 *
 * The tag is removed on unmount so it never leaks onto the public pages —
 * this is a single-page app, so the <head> is shared between routes.
 */
function useNoIndex() {
  useEffect(() => {
    const el = document.createElement('meta');
    el.setAttribute('name', 'robots');
    el.setAttribute('content', 'noindex, nofollow');
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, []);
}

function Gate({ onUnlock }) {
  const [value, setValue] = useState('');
  const [state, setState] = useState('idle'); // idle | checking | wrong
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!value || state === 'checking') return;

    setState('checking');
    let hash;
    try {
      hash = await hashPassword(value);
    } catch {
      setState('wrong');
      return;
    }

    if (hash === LABS.passwordHash) {
      onUnlock();
    } else {
      setState('wrong');
      setValue('');
      inputRef.current?.focus();
    }
  };

  return (
    <section className="gate-wrap">
      <div className="gate">
        <span className="gate-icon"><IconLock size={26} /></span>
        <h1 className="gate-title">Restricted area</h1>
        <p className="gate-sub">This section is private. Enter the password to continue.</p>

        <form onSubmit={submit} noValidate>
          <label className="field" style={{ marginBottom: 14 }}>
            <span className="sr-only">Password</span>
            <input
              ref={inputRef}
              type="password"
              className={`input ${state === 'wrong' ? 'input-error' : ''}`}
              value={value}
              onChange={(e) => { setValue(e.target.value); if (state === 'wrong') setState('idle'); }}
              placeholder="Password"
              autoComplete="current-password"
              aria-invalid={state === 'wrong'}
              aria-describedby={state === 'wrong' ? 'gate-error' : undefined}
            />
          </label>

          {state === 'wrong' && (
            <p className="gate-error" id="gate-error" role="alert">
              <IconAlert size={15} /> That password is not right.
            </p>
          )}

          <button type="submit" className="btn btn-primary btn-block" disabled={!value || state === 'checking'}>
            {state === 'checking'
              ? <><IconSpinner size={16} className="spin" /> Checking…</>
              : <><IconUnlock size={16} /> Unlock</>}
          </button>
        </form>
      </div>

      <style>{`
        .gate-wrap {
          min-height: calc(100vh - var(--header-h) - 80px);
          display: flex; align-items: center; justify-content: center;
          padding: 60px 24px;
          background: linear-gradient(168deg, var(--bg-tint) 0%, var(--bg-soft) 62%, var(--bg) 100%);
        }
        .gate {
          width: 100%; max-width: 400px;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: var(--r-lg);
          box-shadow: var(--shadow-lg);
          padding: 34px 30px;
          text-align: center;
          animation: rise 0.25s ease both;
        }
        .gate-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 54px; height: 54px; margin-bottom: 18px;
          border-radius: 14px;
          color: var(--blue-700); background: var(--bg-tint);
          border: 1px solid rgba(26,110,252,0.16);
        }
        .gate-title {
          font-family: var(--font-head); font-size: var(--text-xl);
          font-weight: 800; letter-spacing: -0.02em; color: var(--ink);
        }
        .gate-sub { margin: 8px 0 24px; font-size: var(--text-sm); color: var(--ink-3); line-height: 1.6; }
        .gate form { text-align: left; }
        .gate-error {
          display: flex; align-items: center; gap: 7px;
          margin: -4px 0 14px;
          font-size: var(--text-xs); font-weight: 600; color: var(--error);
        }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .gate { animation: none; }
          .spin { animation: none; }
        }
      `}</style>
    </section>
  );
}

function LabsContent({ onLock }) {
  return (
    <>
      <PageHero
        eyebrow="Internal"
        title="Labs"
        subtitle="Private workspace for experiments and work in progress. Not linked from anywhere public."
      >
        <button className="btn btn-secondary btn-sm" style={{ marginTop: 22 }} onClick={onLock}>
          <IconLock size={15} /> Lock this section
        </button>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="card" style={{ textAlign: 'center', padding: '52px 28px' }}>
            <span className="icon-tile" style={{ margin: '0 auto 18px' }}><IconFlask size={22} /></span>
            <h2 className="card-title">Nothing here yet</h2>
            <p className="card-text" style={{ maxWidth: '46ch', margin: '0 auto' }}>
              This is the shell for the private section. Drop the experiments,
              demos, or internal tools you want to keep off the public site in
              <code style={{ margin: '0 4px' }}>src/pages/Labs.js</code>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Labs() {
  useSeo({
    title: 'Labs',
    description: 'Private area.',
    path: LABS.path,
  });
  useNoIndex();

  // Read the unlock flag once, synchronously, so an already-unlocked tab does
  // not flash the password form on every navigation back to /labs.
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(LABS.storageKey) === '1';
    } catch {
      return false; // private mode / storage disabled
    }
  });

  const unlock = useCallback(() => {
    try { sessionStorage.setItem(LABS.storageKey, '1'); } catch { /* not fatal */ }
    setUnlocked(true);
  }, []);

  const lock = useCallback(() => {
    try { sessionStorage.removeItem(LABS.storageKey); } catch { /* not fatal */ }
    setUnlocked(false);
  }, []);

  return unlocked ? <LabsContent onLock={lock} /> : <Gate onUnlock={unlock} />;
}
