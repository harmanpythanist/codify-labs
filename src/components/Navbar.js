import React, { useState, useEffect } from 'react';

const PenguinLogo = () => (
  <svg width="38" height="42" viewBox="0 0 38 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="19" cy="26" rx="13" ry="15" fill="#1a2540"/>
    {/* White belly */}
    <ellipse cx="19" cy="27" rx="7.5" ry="10" fill="white"/>
    {/* Head */}
    <ellipse cx="19" cy="12" rx="10" ry="10" fill="#1a2540"/>
    {/* White face */}
    <ellipse cx="19" cy="13" rx="6" ry="6.5" fill="white"/>
    {/* Eyes */}
    <circle cx="16.5" cy="11" r="1.8" fill="#1a2540"/>
    <circle cx="21.5" cy="11" r="1.8" fill="#1a2540"/>
    <circle cx="16.8" cy="10.5" r="0.7" fill="white"/>
    <circle cx="21.8" cy="10.5" r="0.7" fill="white"/>
    {/* Beak */}
    <ellipse cx="19" cy="15" rx="2.2" ry="1.3" fill="#f59e0b"/>
    {/* Wings */}
    <ellipse cx="7" cy="26" rx="4" ry="9" fill="#1a2540" transform="rotate(-10 7 26)"/>
    <ellipse cx="31" cy="26" rx="4" ry="9" fill="#1a2540" transform="rotate(10 31 26)"/>
    {/* Feet */}
    <ellipse cx="15" cy="40" rx="4.5" ry="1.8" fill="#f59e0b"/>
    <ellipse cx="23" cy="40" rx="4.5" ry="1.8" fill="#f59e0b"/>
    {/* Blue accent on head/scarf effect */}
    <ellipse cx="19" cy="17.5" rx="8" ry="2" fill="#1a6efc" opacity="0.7"/>
  </svg>
);

export default function Navbar({ active, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    { id: 'home', label: 'Home' },
    { id: 'students', label: 'Students' },
    { id: 'interns', label: 'Interns' },
  ];

  const handleNav = (id) => {
    setPage(id);
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(240,246,255,0.94)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(26,110,252,0.1)' : '1px solid transparent',
      boxShadow: scrolled ? '0 2px 20px rgba(26,110,252,0.07)' : 'none',
      transition: 'all 0.35s ease',
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 68,
      }}>
        {/* Logo */}
        <button onClick={() => handleNav('home')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 10,
          transition: 'transform 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <PenguinLogo />
          <span style={{
            fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 20,
            color: 'var(--accent2)', letterSpacing: '-0.3px',
          }}>
            Codify Labs
          </span>
        </button>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
          {nav.map(n => (
            <button key={n.id} onClick={() => handleNav(n.id)} style={{
              background: active === n.id ? 'rgba(26,110,252,0.1)' : 'none',
              border: active === n.id ? '1px solid rgba(26,110,252,0.25)' : '1px solid transparent',
              color: active === n.id ? '#1a6efc' : '#4a6080',
              padding: '7px 20px', borderRadius: 10,
              fontSize: 14, fontWeight: 600,
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
              onMouseEnter={e => { if (active !== n.id) e.currentTarget.style.color = '#1a6efc'; }}
              onMouseLeave={e => { if (active !== n.id) e.currentTarget.style.color = '#4a6080'; }}
            >{n.label}</button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: 'none', background: 'none', border: 'none',
          color: 'var(--text)', fontSize: 22, cursor: 'pointer',
        }} className="hamburger">☰</button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(240,246,255,0.98)', borderTop: '1px solid rgba(26,110,252,0.1)',
          padding: '12px 24px 20px',
          boxShadow: '0 8px 24px rgba(26,110,252,0.1)',
        }}>
          {nav.map(n => (
            <button key={n.id} onClick={() => handleNav(n.id)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              background: 'none', border: 'none',
              color: active === n.id ? '#1a6efc' : 'var(--text)',
              padding: '12px 0', fontSize: 16, fontWeight: 600,
              borderBottom: '1px solid rgba(26,110,252,0.07)',
              cursor: 'pointer',
            }}>{n.label}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 600px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
