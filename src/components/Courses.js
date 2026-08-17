import React from 'react';
import { PageHero, SectionLabel, StartProjectBanner, Footer } from './shared';
import { IconBrain, IconTarget } from './Icons';

const COURSES = [
  { icon: IconBrain, title: 'AI and Machine Learning', desc: 'From core ML concepts to training and deploying your own models, taught with practical, real-world projects.', level: 'Beginner to Intermediate' },
  { icon: IconBrain, title: 'AI and Machine Learning', desc: 'A deeper track that goes beyond the fundamentals into advanced model building, tuning, and deployment.', level: 'Beginner to Advanced' },
  { icon: IconTarget, title: 'Your Custom Course', desc: 'Tell us your goals and current level, and we\u2019ll put together a course built around exactly what you want to learn.', level: 'Tailored to You' },
];

export default function Courses({ goTo, goBack }) {
  return (
    <div>
      <PageHero
        eyebrow="Learning"
        title="Learn AI & Software Development"
        subtitle="Our Udemy courses have helped 8,000+ students learn practical, job-ready AI and software skills."
        onBack={goBack}
      />

      <section style={{ padding: '10px 28px 60px', background: 'white' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {COURSES.map(c => (
            <div key={c.title + c.level} style={{
              background: '#f0f6ff', border: '1px solid rgba(26,110,252,0.1)', borderRadius: 18, padding: '28px 24px',
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, marginBottom: 18, color: '#1a6efc',
                background: 'linear-gradient(135deg, #e8f0fe, #ddeaf9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><c.icon size={24} /></div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: '#1a6efc', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{c.level}</div>
              <div style={{ fontWeight: 700, fontSize: 16.5, marginBottom: 10, color: '#0a1628' }}>{c.title}</div>
              <div style={{ fontSize: 13.5, color: '#4a6080', lineHeight: 1.7 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '20px 28px 70px', background: '#f0f6ff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <SectionLabel>8,000+ Students Worldwide</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#0a1628', marginBottom: 16 }}>
            Want to see our full course list?
          </h2>
          <p style={{ color: '#4a6080', maxWidth: 560, margin: '0 auto 28px', lineHeight: 1.75 }}>
            All courses are published on Udemy. Reach out and we'll point you to the right one for where you're starting from.
          </p>
          <button onClick={() => goTo('contact')} style={{
            background: 'linear-gradient(135deg, #1a6efc, #0050d8)', color: 'white',
            padding: '13px 30px', borderRadius: 12, fontWeight: 700, fontSize: 15,
          }}>Ask About Courses</button>
        </div>
      </section>

      <StartProjectBanner goTo={goTo} title="Prefer Hands-On Learning?" subtitle="Check out our Internship Program for structured, project-based training." />
      <Footer />
    </div>
  );
}
