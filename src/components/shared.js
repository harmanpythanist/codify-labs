import React from 'react';

export const WHATSAPP = 'https://wa.me/923329555307';

export const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function BackButton({ onClick, label = '← Back' }) {
  if (!onClick) return null;
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      marginBottom: 18, background: 'none', border: '1px solid rgba(26,110,252,0.2)',
      color: '#1a6efc', padding: '9px 18px', borderRadius: 10, fontSize: 13.5, fontWeight: 600,
    }}>{label}</button>
  );
}

export function PageHero({ eyebrow, title, subtitle, onBack }) {
  return (
    <section style={{
      padding: '56px 28px 44px',
      background: 'linear-gradient(160deg, #f0f6ff 0%, #e8f1fd 100%)',
      borderBottom: '1px solid rgba(26,110,252,0.08)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {onBack && <div><BackButton onClick={onBack} /></div>}
        {eyebrow && (
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1a6efc', letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 14 }}>
            {eyebrow}
          </div>
        )}
        <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 800, color: '#0a1628', marginBottom: 14, lineHeight: 1.15 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 16.5, color: '#4a6080', maxWidth: 680, lineHeight: 1.75 }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 700, color: '#1a6efc', letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 14 }}>
      {children}
    </div>
  );
}

export function StartProjectBanner({ goTo, title = 'Ready to Build Something Great?', subtitle = "Tell us about your project and we'll get back within a day." }) {
  return (
    <section style={{
      padding: '56px 28px', background: 'linear-gradient(135deg, #1a6efc, #0050d8)',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: 220, height: 220, background: 'rgba(255,255,255,0.07)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: 280, height: 280, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
      <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, color: 'white', marginBottom: 12 }}>{title}</h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 28, fontSize: 15.5, lineHeight: 1.7 }}>{subtitle}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => goTo && goTo('contact')} style={{
            background: 'white', color: '#1a6efc', padding: '13px 28px', borderRadius: 12,
            fontWeight: 700, fontSize: 15, boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
          }}>Start a Project</button>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.4)',
            color: 'white', padding: '13px 26px', borderRadius: 12, fontWeight: 600, fontSize: 15,
          }}><WhatsAppIcon size={17} /> Chat on WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(26,110,252,0.1)', padding: '30px 28px',
      textAlign: 'center', color: '#4a6080', fontSize: 13, background: 'white',
    }}>
      <p>© {new Date().getFullYear()} Codify Labs · Clean solutions. Real results.</p>
    </footer>
  );
}
