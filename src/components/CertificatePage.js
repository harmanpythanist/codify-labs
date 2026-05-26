import React, { useState } from 'react';

export default function CertificatePage({ type, data }) {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null); // null | 'found' | 'notfound'
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);

  const isStudent = type === 'students';
  const label = isStudent ? 'Student' : 'Intern';
  const color = isStudent ? '#4f8ef7' : '#7c5cfc';
  const colorBg = isStudent ? 'rgba(79,142,247,0.1)' : 'rgba(124,92,252,0.1)';
  const colorBorder = isStudent ? 'rgba(79,142,247,0.25)' : 'rgba(124,92,252,0.25)';

  const handleVerify = () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    setLoading(true);

    setTimeout(() => {
      const found = data.find(d => d.code.toUpperCase() === trimmed);
      if (found) {
        setCertificate(found);
        setResult('found');
      } else {
        setCertificate(null);
        setResult('notfound');
      }
      setLoading(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleVerify();
  };

  const handleReset = () => {
    setCode('');
    setResult(null);
    setCertificate(null);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '100px 24px 60px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: colorBg, border: `1px solid ${colorBorder}`,
            borderRadius: 100, padding: '6px 16px', marginBottom: 20,
          }}>
            <span style={{ fontSize: 13, color, fontWeight: 500 }}>
              {label} Certificate Verification
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, marginBottom: 12 }}>
            Verify Your Certificate
          </h1>
          <p style={{ color: '#4a6080', fontSize: 16, lineHeight: 1.7 }}>
            Enter the unique code printed on your Codify Labs {label.toLowerCase()} certificate to view and download your PDF.
          </p>
        </div>

        {/* Input Box */}
        {result !== 'found' && (
          <div style={{
            background: 'white', border: '1px solid rgba(26,110,252,0.12)',
            borderRadius: 16, padding: '32px',
          }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4a6080', marginBottom: 10, letterSpacing: 0.5 }}>
              CERTIFICATE CODE
            </label>
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                value={code}
                onChange={e => { setCode(e.target.value); setResult(null); }}
                onKeyDown={handleKeyDown}
                placeholder={isStudent ? 'e.g. STU-001' : 'e.g. INT-001'}
                style={{
                  flex: 1, background: 'rgba(26,110,252,0.05)',
                  border: result === 'notfound' ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, padding: '13px 16px',
                  color: '#0a1628', fontSize: 16,
                  fontFamily: 'var(--font-head)', letterSpacing: 1,
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = color}
                onBlur={e => e.target.style.borderColor = result === 'notfound' ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}
              />
              <button
                onClick={handleVerify}
                disabled={loading || !code.trim()}
                style={{
                  background: `linear-gradient(135deg, ${color}, #7c5cfc)`,
                  color: '#fff', padding: '13px 24px', borderRadius: 10,
                  fontWeight: 600, fontSize: 15, whiteSpace: 'nowrap',
                  opacity: loading || !code.trim() ? 0.5 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                {loading ? '...' : 'Verify'}
              </button>
            </div>

            {result === 'notfound' && (
              <div style={{
                marginTop: 16, padding: '12px 16px',
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 8, color: '#ef4444', fontSize: 14,
              }}>
                ✗ No certificate found for this code. Please check the code on your certificate and try again.
              </div>
            )}

            <p style={{ marginTop: 16, fontSize: 12, color: '#4a6080' }}>
              The code is printed on your certificate, e.g. <span style={{ color, fontFamily: 'var(--font-head)' }}>{isStudent ? 'STU-001' : 'INT-001'}</span>
            </p>
          </div>
        )}

        {/* Certificate Found */}
        {result === 'found' && certificate && (
          <div>
            {/* Success Badge */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 20, flexWrap: 'wrap', gap: 12,
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
                borderRadius: 100, padding: '8px 18px',
              }}>
                <span style={{ color: '#22c55e', fontSize: 14, fontWeight: 600 }}>✓ Certificate Verified</span>
              </div>
              <button onClick={handleReset} style={{
                background: 'rgba(26,110,252,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#4a6080', padding: '8px 16px', borderRadius: 8, fontSize: 13,
              }}>← Search Again</button>
            </div>

            {/* Info Card */}
            <div style={{
              background: 'white', border: '1px solid rgba(26,110,252,0.12)',
              borderRadius: 16, padding: '24px 28px', marginBottom: 20,
              display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                background: `linear-gradient(135deg, ${color}, #7c5cfc)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>🎓</div>
              <div style={{ flex: 1, minWidth: 180 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{certificate.name}</h2>
                <p style={{ color: '#4a6080', fontSize: 14 }}>
                  {isStudent ? certificate.course : certificate.role} · {certificate.date}
                </p>
                <p style={{ color, fontSize: 13, fontWeight: 600, marginTop: 4, fontFamily: 'var(--font-head)' }}>
                  {certificate.code}
                </p>
              </div>
            </div>

            {/* PDF Viewer */}
            <div style={{
              background: 'white', border: '1px solid rgba(26,110,252,0.12)',
              borderRadius: 16, overflow: 'hidden',
            }}>
              <div style={{
                padding: '16px 22px', borderBottom: '1px solid rgba(26,110,252,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>Certificate PDF</span>
                <a
                  href={certificate.pdfUrl.replace('/preview', '/view')}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: `linear-gradient(135deg, ${color}, #7c5cfc)`,
                    color: '#fff', padding: '7px 16px', borderRadius: 8,
                    fontSize: 13, fontWeight: 600,
                  }}
                >
                  Open / Download ↗
                </a>
              </div>
              <iframe
                src={certificate.pdfUrl}
                title="Certificate"
                style={{ width: '100%', height: 520, border: 'none', background: '#fff' }}
                allow="autoplay"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
