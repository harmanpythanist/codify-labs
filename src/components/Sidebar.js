import React, { useState, useEffect } from 'react';
import {
  IconHome, IconBriefcase, IconRocket, IconGraduationCap, IconLaptop, IconAward,
  IconUsers, IconPhone, IconBrain, IconMessage, IconEye, IconGlobe, IconZap,
  IconBarChart, IconMonitor, IconSettings, IconPalette, IconWrench,
} from './Icons';

// Real Codify Labs logo. Replace /logo.png in the public folder with the
// actual brand logo file (transparent PNG or SVG works best) and this will
// pick it up automatically.
const Logo = ({ size = 34 }) => (
  <img
    src="/logo.png"
    alt="Codify Labs logo"
    width={size}
    height={size}
    style={{ flexShrink: 0, objectFit: 'contain', borderRadius: 8 }}
    onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
  />
);

const LogoFallback = ({ size = 34 }) => (
  <div style={{
    display: 'none', width: size, height: size, borderRadius: 8, flexShrink: 0,
    background: 'linear-gradient(135deg, #1a6efc, #0050d8)', color: '#fff',
    alignItems: 'center', justifyContent: 'center', fontWeight: 800,
    fontFamily: 'var(--font-head)', fontSize: size * 0.42,
  }}>CL</div>
);

export const SERVICES = [
  { id: 'ai-ml', label: 'AI & Machine Learning', icon: IconBrain },
  { id: 'chatbots-nlp', label: 'AI Chatbots & NLP', icon: IconMessage },
  { id: 'computer-vision', label: 'Computer Vision', icon: IconEye },
  { id: 'web-dev', label: 'Website Development', icon: IconGlobe },
  { id: 'web-ai-apps', label: 'Web & AI Applications', icon: IconZap },
  { id: 'data-analytics', label: 'Data Analytics', icon: IconBarChart },
  { id: 'custom-software', label: 'Custom Software', icon: IconMonitor },
  { id: 'automation', label: 'Business Automation', icon: IconSettings },
  { id: 'ui-ux', label: 'UI/UX Design', icon: IconPalette },
  { id: 'support', label: 'Maintenance & Support', icon: IconWrench },
];

const NAV = [
  { id: 'home', label: 'Home', icon: IconHome },
  { id: 'services', label: 'Services', icon: IconBriefcase, children: SERVICES },
  { id: 'projects', label: 'Projects', icon: IconRocket },
  { id: 'courses', label: 'Courses', icon: IconGraduationCap },
  { id: 'internship', label: 'Internship', icon: IconLaptop },
  { id: 'certificates', label: 'Certificates', icon: IconAward },
  { id: 'about', label: 'About Us', icon: IconUsers },
  { id: 'contact', label: 'Contact', icon: IconPhone },
];

export default function Sidebar({ page, goTo, collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const [servicesOpen, setServicesOpen] = useState(page === 'services');

  useEffect(() => {
    if (page === 'services') setServicesOpen(true);
  }, [page]);

  const handleTopClick = (item) => {
    if (item.children) {
      if (collapsed) setCollapsed(false);
      setServicesOpen(o => !o);
      goTo('services');
    } else {
      goTo(item.id);
    }
    setMobileOpen(false);
  };

  const handleChildClick = (child) => {
    goTo('services', child.id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="mobile-topbar">
        <button className="hamburger-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        </button>
        <button className="mobile-logo" onClick={() => { goTo('home'); setMobileOpen(false); }}>
          <Logo size={26} />
          <LogoFallback size={26} />
          <span>Codify Labs</span>
        </button>
        <div style={{ width: 38 }} />
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-top">
          <button className="sidebar-logo" onClick={() => { goTo('home'); setMobileOpen(false); }}>
            <Logo />
            <LogoFallback />
            {!collapsed && <span className="sidebar-logo-text">Codify Labs</span>}
          </button>
          <button className="sidebar-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </button>
        </div>

        <nav className="sidebar-nav">
          {NAV.map(item => (
            <div key={item.id}>
              <button
                className={`sidebar-link ${page === item.id ? 'active' : ''}`}
                onClick={() => handleTopClick(item)}
                title={collapsed ? item.label : undefined}
              >
                <span className="sidebar-icon"><item.icon size={18} /></span>
                {!collapsed && <span className="sidebar-label">{item.label}</span>}
                {!collapsed && item.children && (
                  <span className={`sidebar-caret ${servicesOpen ? 'open' : ''}`}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                  </span>
                )}
              </button>

              {item.children && !collapsed && servicesOpen && (
                <div className="sidebar-submenu">
                  {item.children.map(child => (
                    <button
                      key={child.id}
                      className="sidebar-sublink"
                      onClick={() => handleChildClick(child)}
                    >
                      <span className="sidebar-sub-icon"><child.icon size={14} /></span>
                      <span>{child.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          {!collapsed && (
            <>
              <div className="sidebar-cta-label">Let's Work Together</div>
              <button className="sidebar-cta" onClick={() => { goTo('contact'); setMobileOpen(false); }}>
                <IconRocket size={15} /> Start a Project
              </button>
              <div className="sidebar-socials">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              </div>
              <div className="sidebar-copy">© {new Date().getFullYear()} Codify Labs</div>
            </>
          )}
          {collapsed && (
            <button className="sidebar-cta-icon" onClick={() => { goTo('contact'); setMobileOpen(false); }} title="Start a Project">
              <IconRocket size={16} />
            </button>
          )}
          <button className="sidebar-collapse-btn" onClick={() => setCollapsed(c => !c)} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              {collapsed ? <path d="M9 5l7 7-7 7" /> : <path d="M15 5l-7 7 7 7" />}
            </svg>
          </button>
        </div>
      </aside>

      {/* Mobile bottom sticky CTA */}
      <button className="mobile-sticky-cta" onClick={() => goTo('contact')}>
        <IconRocket size={16} /> Start a Project
      </button>

      <style>{`
        .sidebar {
          position: fixed; top: 0; left: 0; bottom: 0; z-index: 200;
          width: var(--sidebar-w);
          background: linear-gradient(180deg, var(--sidebar-bg), var(--sidebar-bg2));
          border-right: 1px solid var(--sidebar-border);
          display: flex; flex-direction: column;
          transition: width 0.25s ease, transform 0.3s ease;
        }
        .sidebar.collapsed { width: var(--sidebar-w-collapsed); }

        .sidebar-top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 18px; border-bottom: 1px solid var(--sidebar-border);
          flex-shrink: 0;
        }
        .sidebar-logo {
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 10px; min-width: 0;
        }
        .sidebar-logo-text {
          font-family: var(--font-head); font-weight: 800; font-size: 17px;
          color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .sidebar-close { display: none; background: none; border: none; color: #fff; cursor: pointer; align-items: center; justify-content: center; }

        .sidebar-nav {
          flex: 1; overflow-y: auto; padding: 14px 12px;
        }
        .sidebar-link {
          width: 100%; display: flex; align-items: center; gap: 12px;
          background: none; border: none; cursor: pointer;
          color: var(--sidebar-text); padding: 11px 12px; border-radius: 10px;
          font-size: 14px; font-weight: 600; text-align: left;
          transition: background 0.2s, color 0.2s; margin-bottom: 3px;
        }
        .sidebar-link:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .sidebar-link.active {
          background: rgba(26,110,252,0.18); color: #fff;
          box-shadow: inset 3px 0 0 #1a6efc;
        }
        .sidebar-icon { width: 20px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .sidebar-label { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .sidebar-caret { display: flex; align-items: center; transition: transform 0.2s; opacity: 0.7; }
        .sidebar-caret.open { transform: rotate(180deg); }

        .sidebar-submenu {
          padding: 2px 0 6px 14px; margin-bottom: 4px;
          border-left: 1px solid var(--sidebar-border); margin-left: 22px;
        }
        .sidebar-sublink {
          width: 100%; display: flex; align-items: center; gap: 10px;
          background: none; border: none; cursor: pointer;
          color: var(--sidebar-text); padding: 8px 10px; border-radius: 8px;
          font-size: 12.5px; font-weight: 500; text-align: left;
          transition: background 0.15s, color 0.15s;
        }
        .sidebar-sublink:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .sidebar-sub-icon { display: flex; align-items: center; }

        .sidebar-bottom {
          padding: 16px 18px; border-top: 1px solid var(--sidebar-border);
          flex-shrink: 0; position: relative;
        }
        .sidebar-cta-label { color: rgba(255,255,255,0.5); font-size: 11.5px; margin-bottom: 8px; }
        .sidebar-cta {
          width: 100%; background: linear-gradient(135deg, #1a6efc, #0050d8);
          color: #fff; border: none; padding: 12px 14px; border-radius: 10px;
          font-weight: 700; font-size: 13.5px; cursor: pointer;
          box-shadow: 0 4px 16px rgba(26,110,252,0.4);
          transition: transform 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .sidebar-cta:hover { transform: translateY(-2px); }
        .sidebar-cta-icon {
          width: 100%; background: linear-gradient(135deg, #1a6efc, #0050d8);
          color: #fff; border: none; padding: 10px; border-radius: 10px;
          font-size: 16px; cursor: pointer; margin-bottom: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .sidebar-socials { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px; }
        .sidebar-socials a { font-size: 11px; color: rgba(255,255,255,0.45); transition: color 0.15s; }
        .sidebar-socials a:hover { color: #fff; }
        .sidebar-copy { margin-top: 12px; font-size: 10.5px; color: rgba(255,255,255,0.3); }

        .sidebar-collapse-btn {
          display: none; position: absolute; top: -14px; right: -14px;
          width: 28px; height: 28px; border-radius: 50%;
          background: #1a6efc; color: #fff; border: 2px solid var(--sidebar-bg);
          font-size: 12px; align-items: center; justify-content: center; cursor: pointer;
        }

        .mobile-topbar, .mobile-sticky-cta, .sidebar-backdrop { display: none; }

        @media (min-width: 901px) {
          .sidebar-collapse-btn { display: flex; }
        }

        @media (max-width: 900px) {
          .sidebar {
            width: 78vw; max-width: 300px;
            transform: translateX(-100%);
            top: 0;
          }
          .sidebar.mobile-open { transform: translateX(0); box-shadow: 0 0 40px rgba(0,0,0,0.4); }
          .sidebar.collapsed { width: 78vw; max-width: 300px; }
          .sidebar-close { display: block; }
          .sidebar-collapse-btn { display: none !important; }

          .sidebar-backdrop {
            display: block; position: fixed; inset: 0; z-index: 190;
            background: rgba(6,12,24,0.55); backdrop-filter: blur(2px);
          }

          .mobile-topbar {
            display: flex; align-items: center; justify-content: space-between;
            position: fixed; top: 0; left: 0; right: 0; height: 58px; z-index: 150;
            background: rgba(10,22,40,0.96); backdrop-filter: blur(10px);
            padding: 0 14px; border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .hamburger-btn {
            background: none; border: none; color: #fff; cursor: pointer;
            width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;
          }
          .mobile-logo {
            background: none; border: none; display: flex; align-items: center; gap: 8px;
            color: #fff; font-family: var(--font-head); font-weight: 800; font-size: 15px; cursor: pointer;
          }

          .mobile-sticky-cta {
            display: flex; align-items: center; justify-content: center; gap: 8px;
            position: fixed; left: 14px; right: 14px; bottom: 14px; z-index: 150;
            background: linear-gradient(135deg, #1a6efc, #0050d8); color: #fff; border: none;
            padding: 14px; border-radius: 14px; font-weight: 700; font-size: 14.5px;
            box-shadow: 0 8px 28px rgba(26,110,252,0.45); cursor: pointer;
          }
        }
      `}</style>
    </>
  );
}
