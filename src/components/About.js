import React from 'react';
import { PageHero, SectionLabel, StartProjectBanner, Footer } from './shared';
import { IconTarget, IconHandshake, IconTrendingUp } from './Icons';

const VALUES = [
  { icon: IconTarget, title: 'Practical Over Flashy', desc: 'We build things that solve a real problem — not tech for the sake of tech.' },
  { icon: IconHandshake, title: 'Honest Communication', desc: "We tell clients what's realistic, on timeline, budget, and scope." },
  { icon: IconTrendingUp, title: 'Long-Term Relationships', desc: 'Many of our clients keep coming back — that matters more to us than one-off deals.' },
];

const JOURNEY = [
  { year: 'Start', text: 'Founded by a team who had already shipped 50+ projects in AI, data science, and GUI application development.' },
  { year: 'Growth', text: 'Took on clients across Canada, Germany, the UK, Malaysia, Kuwait, and more.' },
  { year: 'Education', text: 'Launched Udemy courses and a structured internship program, now serving 8,000+ students.' },
  { year: 'Today', text: 'Codify Labs builds AI-powered software for businesses while continuing to train the next generation of AI/software talent.' },
];

export default function About({ goTo, goBack }) {
  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title="Who We Are"
        subtitle="Codify Labs builds AI-powered software for real businesses — and trains the next generation of AI and software talent along the way."
        onBack={goBack}
      />

      <section style={{ padding: '10px 28px 60px', background: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionLabel>Our Mission</SectionLabel>
          <p style={{ fontSize: 16.5, color: '#4a6080', lineHeight: 1.85, marginBottom: 44 }}>
            To turn practical business problems into working AI and software solutions — and to make AI/software skills accessible to people who want to build a career in the field.
          </p>

          <SectionLabel>What We Believe</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, marginBottom: 50 }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ background: '#f0f6ff', border: '1px solid rgba(26,110,252,0.1)', borderRadius: 16, padding: '24px 20px' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, marginBottom: 14, color: '#1a6efc',
                  background: 'linear-gradient(135deg, #e8f0fe, #ddeaf9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><v.icon size={21} /></div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#0a1628' }}>{v.title}</div>
                <div style={{ fontSize: 13, color: '#4a6080', lineHeight: 1.65 }}>{v.desc}</div>
              </div>
            ))}
          </div>

          <SectionLabel>Our Journey</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {JOURNEY.map((j, i) => (
              <div key={j.year} style={{
                display: 'flex', gap: 20, padding: '18px 0',
                borderBottom: i < JOURNEY.length - 1 ? '1px solid rgba(26,110,252,0.1)' : 'none',
              }}>
                <div style={{ width: 90, flexShrink: 0, fontWeight: 800, color: '#1a6efc', fontFamily: 'var(--font-head)', fontSize: 14 }}>{j.year}</div>
                <div style={{ fontSize: 14.5, color: '#4a6080', lineHeight: 1.75 }}>{j.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StartProjectBanner goTo={goTo} title="Want to Work With Us?" subtitle="Whether it's a project or a learning opportunity, we'd love to hear from you." />
      <Footer />
    </div>
  );
}
