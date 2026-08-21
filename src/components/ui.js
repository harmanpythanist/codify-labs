import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { SITE, WHATSAPP } from '../data/site';
import { IconArrowLeft, IconWhatsapp, IconRocket, IconInstagram, IconLinkedin, IconMail } from './Icons';

export function BackLink({ to, label = 'Back' }) {
  return (
    <Link to={to} className="back-link">
      <IconArrowLeft size={15} /> {label}
      <style>{`
        .back-link {
          display: inline-flex; align-items: center; gap: 7px;
          margin-bottom: 22px;
          padding: 9px 16px; border-radius: var(--r-sm);
          border: 1px solid var(--line-2); background: var(--surface);
          color: var(--blue-700);
          font-family: var(--font-head); font-size: var(--text-xs); font-weight: 700;
          transition: background-color 0.16s ease, border-color 0.16s ease, transform 0.16s ease;
        }
        .back-link:hover { background: var(--bg-tint); border-color: var(--blue-500); transform: translateX(-2px); }
      `}</style>
    </Link>
  );
}

export function PageHero({ eyebrow, title, subtitle, backTo, backLabel, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        {backTo && <BackLink to={backTo} label={backLabel} />}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="h-page">{title}</h1>
        {subtitle && <p className="lede" style={{ marginTop: 16 }}>{subtitle}</p>}
        {children}
      </div>
      <style>{`
        .page-hero {
          padding: 60px 0 52px;
          background: linear-gradient(168deg, var(--bg-tint) 0%, var(--bg-soft) 62%, var(--bg) 100%);
          border-bottom: 1px solid var(--line);
        }
        @media (max-width: 640px) { .page-hero { padding: 40px 0 38px; } }
      `}</style>
    </section>
  );
}

export function SectionHead({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <div className="section-head" style={align === 'left' ? { textAlign: 'left', margin: '0 0 40px' } : undefined}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="h-section">{title}</h2>
      {subtitle && <p className="lede" style={align === 'left' ? { margin: '14px 0 0' } : undefined}>{subtitle}</p>}
    </div>
  );
}

export function CTABanner({
  title = 'Ready to Build Something Great?',
  subtitle = "Tell us about your project and we'll get back within a day.",
  primaryLabel = 'Start a Project',
  // Where the primary button goes. Defaults to the project enquiry form;
  // the internship pages point this at the application form instead.
  primaryTo = '/contact',
}) {
  return (
    <section className="cta-banner">
      <span className="cta-orb cta-orb-1" aria-hidden="true" />
      <span className="cta-orb cta-orb-2" aria-hidden="true" />
      <div className="container cta-inner">
        <h2 className="h-section" style={{ color: '#fff' }}>{title}</h2>
        <p>{subtitle}</p>
        <div className="cta-actions">
          <Link to={primaryTo} className="btn btn-secondary">
            <IconRocket size={16} /> {primaryLabel}
          </Link>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
            <IconWhatsapp size={17} /> Chat on WhatsApp
          </a>
        </div>
      </div>
      <style>{`
        .cta-banner {
          position: relative; overflow: hidden;
          padding: 76px 0;
          background: linear-gradient(135deg, var(--navy-800) 0%, var(--navy-700) 45%, var(--blue-800) 100%);
          text-align: center;
        }
        .cta-orb { position: absolute; border-radius: 50%; pointer-events: none; }
        .cta-orb-1 { top: -90px; right: -60px; width: 280px; height: 280px; background: rgba(255,255,255,0.07); }
        .cta-orb-2 { bottom: -120px; left: -80px; width: 340px; height: 340px; background: rgba(74,141,253,0.16); }
        .cta-inner { position: relative; max-width: 640px; }
        .cta-banner p {
          color: rgba(255,255,255,0.82); font-size: var(--text-base);
          margin: 14px auto 30px; max-width: 52ch; line-height: 1.72;
        }
        .cta-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        @media (max-width: 640px) { .cta-banner { padding: 56px 0; } }
      `}</style>
    </section>
  );
}

export function EmptyState({ icon: Icon, title, children }) {
  return (
    <div className="empty-state">
      {Icon && <span className="empty-icon"><Icon size={30} /></span>}
      <h3 className="h-card">{title}</h3>
      <div>{children}</div>
      <style>{`
        .empty-state {
          text-align: center; padding: 64px 28px;
          border: 1.5px dashed var(--line-2); border-radius: var(--r-xl);
          background: var(--bg-soft);
        }
        .empty-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 68px; height: 68px; border-radius: 50%;
          background: var(--bg-tint); color: var(--blue-700);
          border: 1px solid rgba(26,110,252,0.16);
          margin-bottom: 18px;
        }
        .empty-state h3 { margin-bottom: 10px; }
        .empty-state div { color: var(--ink-2); font-size: var(--text-sm); max-width: 46ch; margin: 0 auto; line-height: 1.7; }
      `}</style>
    </div>
  );
}

const FOOTER_LINKS = [
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/projects', label: 'Projects' },
      { to: '/gallery', label: 'Gallery' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { to: '/courses', label: 'Courses' },
      { to: '/internship', label: 'Internship' },
      { to: '/internship/apply', label: 'Apply for an Internship' },
      { to: '/certificates', label: 'Verify Certificate' },
    ],
  },
  {
    title: 'Services',
    links: [
      { to: '/services/ai-machine-learning', label: 'AI & Machine Learning' },
      { to: '/services/computer-vision', label: 'Computer Vision' },
      { to: '/services/website-development', label: 'Website Development' },
      { to: '/services', label: 'All Services' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" aria-label="Codify Labs — home">
              <Logo size={30} tone="light" />
            </Link>
            <p className="footer-blurb">
              AI-powered software, websites, and custom applications for businesses worldwide — plus courses and internships for the next generation of AI talent.
            </p>
            <div className="footer-socials">
              <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Codify Labs on Instagram"><IconInstagram size={18} /></a>
              <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Codify Labs on LinkedIn"><IconLinkedin size={18} /></a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="Chat with Codify Labs on WhatsApp"><IconWhatsapp size={18} /></a>
              <a href={`mailto:${SITE.email}`} aria-label={`Email Codify Labs at ${SITE.email}`}><IconMail size={18} /></a>
            </div>
          </div>

          {FOOTER_LINKS.map(col => (
            <div key={col.title} className="footer-col">
              <h3 className="footer-col-title">{col.title}</h3>
              <ul>
                {col.links.map(l => (
                  <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Codify Labs · {SITE.tagline}</p>
          <p className="footer-contact">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span aria-hidden="true">·</span>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">{SITE.whatsappDisplay}</a>
          </p>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: linear-gradient(180deg, var(--navy-900), #060D20);
          color: rgba(255,255,255,0.72);
          padding: 68px 0 30px;
          font-size: var(--text-sm);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.7fr repeat(3, 1fr);
          gap: 44px 32px;
          padding-bottom: 44px;
          border-bottom: 1px solid rgba(255,255,255,0.11);
        }
        .footer-blurb {
          margin: 18px 0 20px; max-width: 40ch;
          color: rgba(255,255,255,0.64); line-height: 1.72;
        }
        .footer-socials { display: flex; gap: 10px; }
        .footer-socials a {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 10px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.82);
          transition: background-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
        }
        .footer-socials a:hover {
          background: var(--blue-600); color: #fff; transform: translateY(-2px);
          border-color: var(--blue-600);
        }
        .footer-col-title {
          font-family: var(--font-head); font-size: var(--text-xs); font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.13em;
          color: #fff; margin-bottom: 16px;
        }
        .footer-col ul { display: flex; flex-direction: column; gap: 11px; }
        .footer-col a { color: rgba(255,255,255,0.66); transition: color 0.16s ease; }
        .footer-col a:hover { color: #fff; }
        .footer-bottom {
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 12px;
          padding-top: 26px;
          color: rgba(255,255,255,0.5); font-size: var(--text-xs);
        }
        .footer-contact { display: flex; gap: 10px; flex-wrap: wrap; }
        .footer-contact a { color: rgba(255,255,255,0.66); }
        .footer-contact a:hover { color: #fff; text-decoration: underline; }
        .site-footer :focus-visible { outline-color: var(--blue-500); }

        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px 28px; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  );
}
