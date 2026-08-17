import React from 'react';
import { PageHero, SectionLabel, StartProjectBanner, Footer } from './shared';
import { IconLaptop, IconBrain, IconGlobe, IconLayers, IconBarChart } from './Icons';

const TRACKS = [
  { icon: IconBrain, title: 'Computer Vision, AI & ML' },
  { icon: IconGlobe, title: 'Website Development' },
  { icon: IconLayers, title: 'Full Stack Development' },
  { icon: IconBarChart, title: 'Data Science' },
];

export default function Internship({ goTo, goBack }) {
  return (
    <div>
      <PageHero
        eyebrow="Internship Program"
        title="Learn by Building Real Projects"
        subtitle="A hands-on internship designed to give you real, practical project experience."
        onBack={goBack}
      />

      <section style={{ padding: '10px 28px 60px', background: 'white' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionLabel>Program</SectionLabel>
          <div style={{ marginBottom: 60 }}>
            <div style={{
              background: '#f0f6ff', border: '1px solid rgba(26,110,252,0.1)', borderRadius: 16,
              padding: '30px 26px', display: 'flex', alignItems: 'center', gap: 20, maxWidth: 480,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, flexShrink: 0, color: '#1a6efc',
                background: 'linear-gradient(135deg, #e8f0fe, #ddeaf9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><IconLaptop size={26} /></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8, color: '#0a1628' }}>Internship (3 Months)</div>
                <div style={{ fontSize: 13.5, color: '#4a6080', lineHeight: 1.7 }}>Work on real Codify Labs projects under mentorship, applying practical skills to actual client and product work.</div>
              </div>
            </div>
          </div>

          <SectionLabel>Internships Available In</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {TRACKS.map(t => (
              <div key={t.title} style={{
                display: 'flex', alignItems: 'center', gap: 12, background: 'white', border: '1px solid rgba(26,110,252,0.12)',
                borderRadius: 14, padding: '18px 20px', boxShadow: '0 2px 12px rgba(26,110,252,0.06)',
              }}>
                <span style={{ color: '#1a6efc', display: 'flex' }}><t.icon size={22} /></span>
                <span style={{ fontWeight: 700, fontSize: 14.5, color: '#0a1628' }}>{t.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StartProjectBanner
        goTo={goTo}
        title="Ready to Apply?"
        subtitle="Reach out and tell us which track interests you — we'll walk you through the next steps."
      />
      <Footer />
    </div>
  );
}
