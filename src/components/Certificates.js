import React from 'react';
import { PageHero, Footer } from './shared';
import { IconGraduationCap, IconLaptop } from './Icons';

export default function Certificates({ goTo, goBack }) {
  return (
    <div>
      <PageHero
        eyebrow="Certificate Verification"
        title="Verify a Codify Labs Certificate"
        subtitle="Choose the certificate type below and enter your certificate ID to verify."
        onBack={goBack}
      />
      <section style={{ padding: '10px 28px 80px', background: 'white' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          <button onClick={() => goTo('certificates', 'students')} style={{
            background: '#f0f6ff', border: '1px solid rgba(26,110,252,0.12)', borderRadius: 18, padding: '32px 24px',
            textAlign: 'left', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 26px rgba(26,110,252,0.14)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: 14, marginBottom: 16, color: '#1a6efc',
              background: 'linear-gradient(135deg, #e8f0fe, #ddeaf9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><IconGraduationCap size={24} /></div>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8, color: '#0a1628' }}>Student Certificate</div>
            <div style={{ fontSize: 13.5, color: '#4a6080' }}>For course & training program graduates</div>
          </button>
          <button onClick={() => goTo('certificates', 'interns')} style={{
            background: '#f0f6ff', border: '1px solid rgba(26,110,252,0.12)', borderRadius: 18, padding: '32px 24px',
            textAlign: 'left', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 26px rgba(26,110,252,0.14)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: 14, marginBottom: 16, color: '#1a6efc',
              background: 'linear-gradient(135deg, #e8f0fe, #ddeaf9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><IconLaptop size={24} /></div>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8, color: '#0a1628' }}>Internship Certificate</div>
            <div style={{ fontSize: 13.5, color: '#4a6080' }}>For internship program graduates</div>
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
