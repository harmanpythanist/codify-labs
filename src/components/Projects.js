import React, { useState } from 'react';
import { PageHero, SectionLabel, StartProjectBanner, Footer } from './shared';
import { IconRecycle, IconBarChart, IconMessage, IconMonitor, IconCheck } from './Icons';

// NOTE: Replace with your real project details, images, and results.
const PROJECTS = [
  {
    id: 'waste-classification',
    name: 'Waste Classification AI',
    category: 'Computer Vision',
    problem: 'Manual waste sorting is slow and inconsistent, making recycling programs harder to scale.',
    solution: 'A computer vision system that automatically detects and classifies waste items from camera input in real time, so sorting can be automated or assisted.',
    tech: ['YOLOv8', 'CNN', 'Python', 'OpenCV'],
    features: ['Real-time object detection', 'Multi-class waste classification', 'Trained on a custom dataset'],
    icon: IconRecycle,
  },
  {
    id: 'business-dashboard',
    name: 'Business Analytics Dashboard',
    category: 'Data Analytics',
    problem: 'Business data was spread across spreadsheets with no easy way to see trends or make decisions quickly.',
    solution: 'An interactive dashboard that pulls together sales and operations data into clear, filterable visualizations.',
    tech: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
    features: ['Live filterable charts', 'Exportable reports', 'Role-based views'],
    icon: IconBarChart,
  },
  {
    id: 'support-chatbot',
    name: 'AI Customer Support Chatbot',
    category: 'AI Chatbots & NLP',
    problem: 'Support requests were repetitive and slow to respond to outside business hours.',
    solution: 'A conversational AI assistant that handles common queries automatically and hands off complex ones to a human.',
    tech: ['Python', 'NLP', 'REST APIs'],
    features: ['24/7 automated responses', 'Human handoff flow', 'Website + WhatsApp integration'],
    icon: IconMessage,
  },
  {
    id: 'client-portal',
    name: 'Client Portal Web App',
    category: 'Web & AI Applications',
    problem: 'Clients had no self-serve way to track project progress or submit requests.',
    solution: 'A full-stack client portal with authentication, project tracking, and request submission built in.',
    tech: ['React', 'Flask', 'REST APIs'],
    features: ['Secure client login', 'Project status tracking', 'Request & file submission'],
    icon: IconMonitor,
  },
];

const CATEGORIES = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];

function ProjectDetail({ project, onBack, goTo }) {
  return (
    <div>
      <PageHero
        eyebrow={project.category}
        title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}><project.icon size={32} /> {project.name}</span>}
      />
      <section style={{ padding: '10px 28px 70px', background: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <button onClick={onBack} style={{
            marginBottom: 32, background: 'none', border: '1px solid rgba(26,110,252,0.2)', color: '#1a6efc',
            padding: '9px 18px', borderRadius: 10, fontSize: 13.5, fontWeight: 600,
          }}>← All Projects</button>

          {[
            { label: 'Problem', text: project.problem },
            { label: 'Our Solution', text: project.solution },
          ].map(block => (
            <div key={block.label} style={{ marginBottom: 30 }}>
              <SectionLabel>{block.label}</SectionLabel>
              <p style={{ color: '#4a6080', fontSize: 15.5, lineHeight: 1.8 }}>{block.text}</p>
            </div>
          ))}

          <div style={{ marginBottom: 30 }}>
            <SectionLabel>Key Features</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {project.features.map(f => (
                <div key={f} style={{ display: 'flex', gap: 10, fontSize: 14.5, color: '#0a1628' }}>
                  <span style={{ color: '#1a6efc', flexShrink: 0, marginTop: 2 }}><IconCheck size={15} /></span>{f}
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Technologies</SectionLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  background: '#f0f6ff', border: '1px solid rgba(26,110,252,0.15)', color: '#0050d8',
                  padding: '8px 16px', borderRadius: 100, fontSize: 13.5, fontWeight: 600,
                }}>{t}</span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 40, background: '#0a1628', borderRadius: 16, padding: '26px 24px', textAlign: 'center' }}>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Want something like this built?</div>
            <button onClick={() => goTo('contact')} style={{
              marginTop: 8, background: 'linear-gradient(135deg, #1a6efc, #0050d8)', color: 'white',
              padding: '12px 26px', borderRadius: 10, fontWeight: 700, fontSize: 14,
            }}>Start a Project</button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default function Projects({ goTo, goBack }) {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(null);

  if (active) return <ProjectDetail project={active} onBack={() => setActive(null)} goTo={goTo} />;

  const shown = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <div>
      <PageHero eyebrow="Our Work" title="Real Projects We've Built" subtitle="A selection of AI, web, and data projects — each one built to solve a real, specific problem." onBack={goBack} />

      <section style={{ padding: '10px 28px 70px', background: 'white' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 34 }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{
                padding: '8px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                background: filter === c ? '#1a6efc' : '#f0f6ff',
                color: filter === c ? 'white' : '#4a6080',
                border: filter === c ? 'none' : '1px solid rgba(26,110,252,0.15)',
              }}>{c}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22 }}>
            {shown.map(p => (
              <div key={p.id} style={{
                background: '#f0f6ff', border: '1px solid rgba(26,110,252,0.1)', borderRadius: 18, padding: '26px 24px',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(26,110,252,0.14)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14, marginBottom: 18, color: '#1a6efc',
                  background: 'linear-gradient(135deg, #e8f0fe, #ddeaf9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><p.icon size={24} /></div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#1a6efc', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{p.category}</div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: '#0a1628' }}>{p.name}</div>
                <div style={{ fontSize: 13.5, color: '#4a6080', lineHeight: 1.7, marginBottom: 18 }}>{p.solution}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontSize: 11.5, background: 'white', border: '1px solid rgba(26,110,252,0.15)', color: '#0050d8', padding: '4px 10px', borderRadius: 100, fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
                <button onClick={() => setActive(p)} style={{ fontSize: 13.5, fontWeight: 700, color: '#1a6efc', background: 'none' }}>View Case Study →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StartProjectBanner goTo={goTo} />
      <Footer />
    </div>
  );
}
