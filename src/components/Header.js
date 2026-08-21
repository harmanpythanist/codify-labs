import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { SERVICES } from '../data/services';
import { IconMenu, IconClose, IconChevronDown, IconRocket } from './Icons';

const NAV = [
  { to: '/services', label: 'Services', mega: true },
  { to: '/projects', label: 'Projects' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/courses', label: 'Courses' },
  { to: '/internship', label: 'Internship' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/about', label: 'About' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const location = useLocation();
  const megaRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close every menu whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setMobileServices(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Escape closes whatever is open.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setMegaOpen(false);
      setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Click outside closes the services dropdown.
  useEffect(() => {
    if (!megaOpen) return undefined;
    const onClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [megaOpen]);

  const openMega = () => { clearTimeout(closeTimer.current); setMegaOpen(true); };
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 160); };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner">
          <Link to="/" className="header-logo" aria-label="Codify Labs — home">
            <Logo size={30} />
          </Link>

          <nav className="header-nav" aria-label="Main">
            {NAV.map(item => (
              item.mega ? (
                <div
                  key={item.to}
                  className="mega-wrap"
                  ref={megaRef}
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleClose}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
                    onClick={() => setMegaOpen(false)}
                    aria-expanded={megaOpen}
                  >
                    {item.label}
                    <IconChevronDown size={14} className={`nav-caret ${megaOpen ? 'is-open' : ''}`} />
                  </NavLink>

                  {megaOpen && (
                    <div className="mega" onMouseEnter={openMega} onMouseLeave={scheduleClose}>
                      <div className="mega-grid">
                        {SERVICES.map(s => (
                          <Link key={s.slug} to={`/services/${s.slug}`} className="mega-item">
                            <span className="mega-icon"><s.icon size={19} /></span>
                            <span>
                              <span className="mega-item-label">{s.label}</span>
                              <span className="mega-item-desc">{s.short}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <Link to="/services" className="mega-footer">View all services and pricing →</Link>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
                >
                  {item.label}
                </NavLink>
              )
            ))}
          </nav>

          <div className="header-actions">
            <Link to="/contact" className="btn btn-primary btn-sm header-cta">
              <IconRocket size={15} /> Start a Project
            </Link>
            <button
              className="header-burger"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <IconClose size={22} /> : <IconMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && <div className="drawer-backdrop" onClick={() => setMobileOpen(false)} />}

      <div className={`drawer ${mobileOpen ? 'is-open' : ''}`} aria-hidden={!mobileOpen}>
        <nav className="drawer-nav" aria-label="Mobile">
          <NavLink to="/" end className={({ isActive }) => `drawer-link ${isActive ? 'is-active' : ''}`}>Home</NavLink>

          <button
            className="drawer-link drawer-toggle"
            onClick={() => setMobileServices(v => !v)}
            aria-expanded={mobileServices}
          >
            Services
            <IconChevronDown size={16} className={`nav-caret ${mobileServices ? 'is-open' : ''}`} />
          </button>
          {mobileServices && (
            <div className="drawer-sub">
              <NavLink to="/services" end className="drawer-sublink">All Services</NavLink>
              {SERVICES.map(s => (
                <NavLink key={s.slug} to={`/services/${s.slug}`} className="drawer-sublink">
                  <s.icon size={15} /> {s.label}
                </NavLink>
              ))}
            </div>
          )}

          {NAV.filter(n => !n.mega).map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `drawer-link ${isActive ? 'is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}

          <Link to="/contact" className="btn btn-primary btn-block drawer-cta">
            <IconRocket size={16} /> Start a Project
          </Link>
        </nav>
      </div>

      <style>{`
        .site-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: var(--header-h);
          background: rgba(255,255,255,0.86);
          backdrop-filter: saturate(180%) blur(14px);
          -webkit-backdrop-filter: saturate(180%) blur(14px);
          border-bottom: 1px solid transparent;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
        }
        .site-header.is-scrolled {
          border-bottom-color: var(--line);
          box-shadow: 0 1px 16px rgba(15,23,41,0.06);
          background: rgba(255,255,255,0.94);
        }
        .header-inner {
          height: 100%;
          display: flex; align-items: center; justify-content: space-between; gap: 24px;
        }
        .header-logo { flex-shrink: 0; transition: opacity 0.18s; }
        .header-logo:hover { opacity: 0.82; }

        .header-nav { display: flex; align-items: center; gap: 2px; flex: 1; justify-content: center; }
        .nav-link {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 9px 13px; border-radius: var(--r-sm);
          font-family: var(--font-head);
          font-size: var(--text-sm); font-weight: 600;
          color: var(--ink-2);
          transition: color 0.16s ease, background-color 0.16s ease;
          white-space: nowrap;
        }
        .nav-link:hover { color: var(--blue-700); background: var(--bg-tint); }
        .nav-link.is-active { color: var(--blue-700); background: var(--bg-tint); }
        .nav-caret { transition: transform 0.2s ease; }
        .nav-caret.is-open { transform: rotate(180deg); }

        .mega-wrap { position: relative; }
        .mega {
          position: absolute; top: calc(100% + 12px); left: 50%; transform: translateX(-50%);
          width: min(760px, 90vw);
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: var(--r-lg);
          box-shadow: var(--shadow-lg);
          padding: 16px;
          animation: rise 0.2s ease both;
        }
        .mega-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .mega-item {
          display: flex; gap: 12px; align-items: flex-start;
          padding: 11px 12px; border-radius: var(--r-sm);
          transition: background-color 0.15s ease;
        }
        .mega-item:hover { background: var(--bg-tint); }
        .mega-icon {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; flex-shrink: 0;
          border-radius: 9px; color: var(--blue-700);
          background: var(--bg-tint); border: 1px solid rgba(26,110,252,0.14);
        }
        .mega-item-label {
          display: block; font-family: var(--font-head);
          font-size: var(--text-sm); font-weight: 700; color: var(--ink); margin-bottom: 2px;
        }
        .mega-item-desc {
          display: block; font-size: var(--text-xs); color: var(--ink-3);
          line-height: 1.45;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .mega-footer {
          display: block; margin-top: 10px; padding: 12px;
          border-top: 1px solid var(--line);
          text-align: center; font-size: var(--text-sm); font-weight: 700;
          font-family: var(--font-head); color: var(--blue-700);
        }
        .mega-footer:hover { background: var(--bg-tint); border-radius: var(--r-sm); }

        .header-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .header-burger {
          display: none; align-items: center; justify-content: center;
          width: 42px; height: 42px; border-radius: var(--r-sm);
          color: var(--ink); background: var(--bg-soft); border: 1px solid var(--line);
        }
        .header-burger:hover { background: var(--bg-tint); }

        .drawer-backdrop {
          position: fixed; inset: 0; z-index: 98;
          background: rgba(11,20,48,0.5); backdrop-filter: blur(2px);
        }
        .drawer {
          position: fixed; top: var(--header-h); right: 0; bottom: 0; z-index: 99;
          width: min(86vw, 340px);
          background: var(--surface);
          border-left: 1px solid var(--line);
          box-shadow: -8px 0 32px rgba(15,23,41,0.14);
          transform: translateX(102%);
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
          overflow-y: auto;
          visibility: hidden;
        }
        .drawer.is-open { transform: translateX(0); visibility: visible; }
        .drawer-nav { display: flex; flex-direction: column; padding: 18px; gap: 2px; }
        .drawer-link {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; text-align: left;
          padding: 13px 14px; border-radius: var(--r-sm);
          font-family: var(--font-head); font-size: var(--text-base); font-weight: 600;
          color: var(--ink-2);
        }
        .drawer-link:hover, .drawer-link.is-active { background: var(--bg-tint); color: var(--blue-700); }
        .drawer-sub {
          display: flex; flex-direction: column; gap: 1px;
          margin: 2px 0 6px 14px; padding-left: 12px;
          border-left: 2px solid var(--line);
        }
        .drawer-sublink {
          display: flex; align-items: center; gap: 9px;
          padding: 10px 12px; border-radius: var(--r-sm);
          font-size: var(--text-sm); font-weight: 500; color: var(--ink-2);
        }
        .drawer-sublink:hover, .drawer-sublink.active { background: var(--bg-tint); color: var(--blue-700); }
        .drawer-cta { margin-top: 14px; }

        @media (max-width: 1080px) {
          .header-nav { gap: 0; }
          .nav-link { padding: 9px 10px; }
        }
        @media (max-width: 940px) {
          .header-nav { display: none; }
          .header-burger { display: flex; }
          .header-inner { justify-content: space-between; }
        }
        @media (max-width: 520px) {
          .header-cta { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .drawer { transition: none; }
          .mega { animation: none; }
        }
      `}</style>
    </>
  );
}
