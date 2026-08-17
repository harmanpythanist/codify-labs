import React from 'react';
import { SERVICES } from './Sidebar';
import { PageHero, SectionLabel, StartProjectBanner, Footer } from './shared';
import { IconCheck } from './Icons';

const DETAILS = {
  'ai-ml': {
    tagline: 'Custom AI & Machine Learning',
    desc: "We design and train machine learning models around your actual data and business problem — not a generic off-the-shelf model. From predictive analytics to recommendation engines, we build systems that ship to production, not just notebooks.",
    capabilities: ['Predictive models & forecasting', 'Recommendation systems', 'Model training, evaluation & tuning', 'ML pipeline & deployment (API/desktop)'],
    stack: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn'],
  },
  'chatbots-nlp': {
    tagline: 'AI Chatbots & NLP',
    desc: 'Conversational AI that actually understands your customers — support chatbots, internal assistants, and NLP pipelines for text classification, summarization, and information extraction.',
    capabilities: ['Customer support chatbots', 'Internal knowledge assistants', 'Text classification & summarization', 'Integration with WhatsApp, web & apps'],
    stack: ['Python', 'LangChain-style pipelines', 'NLP libraries', 'REST APIs'],
  },
  'computer-vision': {
    tagline: 'Computer Vision',
    desc: 'Image and video-based AI systems for detection, classification, and automated visual inspection — built on modern object detection architectures.',
    capabilities: ['Object detection & classification', 'Automated visual inspection', 'Real-time video analysis', 'Custom dataset training'],
    stack: ['YOLOv8', 'OpenCV', 'CNNs', 'Python'],
  },
  'web-dev': {
    tagline: 'Website Development',
    desc: 'Fast, modern, responsive websites and business web platforms — from marketing sites to client portals — built with clean, maintainable code.',
    capabilities: ['Business & marketing websites', 'Client/admin portals', 'Responsive, mobile-first UI', 'SEO-friendly structure'],
    stack: ['React', 'Next.js', 'JavaScript', 'Flask'],
  },
  'web-ai-apps': {
    tagline: 'Web & AI Applications',
    desc: 'Full-stack applications that combine a modern web front-end with an AI-powered backend — dashboards, SaaS tools, and internal platforms.',
    capabilities: ['Full-stack SaaS & internal tools', 'AI-powered features inside web apps', 'API design & integration', 'Cloud-ready architecture'],
    stack: ['React', 'Python', 'Flask', 'REST APIs'],
  },
  'data-analytics': {
    tagline: 'Data Analytics',
    desc: 'We turn raw, messy data into clear, actionable insight — interactive dashboards, reports, and analysis that support real decisions.',
    capabilities: ['Data cleaning & processing', 'Interactive dashboards', 'Business intelligence reporting', 'Ad-hoc analysis & visualization'],
    stack: ['Pandas', 'NumPy', 'Plotly', 'Streamlit'],
  },
  'custom-software': {
    tagline: 'Custom Software',
    desc: 'Desktop and cross-platform software built around your exact workflow, when off-the-shelf tools do not fit — from internal tools to client-facing products.',
    capabilities: ['Desktop & cross-platform apps', 'Internal business tools', 'System integration', 'Ongoing feature development'],
    stack: ['Python', 'React', 'SQL', 'REST APIs'],
  },
  automation: {
    tagline: 'Business Automation',
    desc: 'We identify repetitive, manual work in your business and automate it — saving hours every week and cutting down on human error.',
    capabilities: ['Workflow & process automation', 'Report & data automation', 'Third-party tool integration', 'Scheduled/triggered pipelines'],
    stack: ['Python', 'APIs', 'Scripting', 'Cloud functions'],
  },
  'ui-ux': {
    tagline: 'UI/UX Design',
    desc: 'Clean, purposeful interface design for web and desktop products — focused on clarity and usability, not just visual polish.',
    capabilities: ['Product & web UI design', 'User flow & wireframing', 'Design systems', 'Usability-focused iteration'],
    stack: ['Figma', 'Design systems', 'Prototyping'],
  },
  support: {
    tagline: 'Maintenance & Support',
    desc: 'Ongoing support for software and AI systems we build — bug fixes, updates, monitoring, and small feature additions after launch.',
    capabilities: ['Bug fixes & updates', 'Performance monitoring', 'Security & dependency updates', 'Small feature additions'],
    stack: ['Ongoing SLAs', 'Version control', 'Monitoring'],
  },
};

function ServiceDetail({ id, goTo }) {
  const meta = SERVICES.find(s => s.id === id);
  const d = DETAILS[id];
  if (!meta || !d) return null;

  return (
    <div>
      <PageHero
        eyebrow={d.tagline}
        title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}><meta.icon size={34} /> {meta.label}</span>}
        subtitle={d.desc}
        onBack={() => goTo('services')}
      />

      <section style={{ padding: '50px 28px', background: 'white' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
          <div>
            <SectionLabel>What's Included</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {d.capabilities.map(c => (
                <div key={c} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  background: '#f0f6ff', border: '1px solid rgba(26,110,252,0.1)',
                  borderRadius: 12, padding: '14px 16px', fontSize: 14.5, color: '#0a1628',
                }}>
                  <span style={{ color: '#1a6efc', flexShrink: 0, marginTop: 2 }}><IconCheck size={15} /></span>{c}
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionLabel>Technologies We Use</SectionLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {d.stack.map(t => (
                <span key={t} style={{
                  background: 'linear-gradient(135deg, #e8f0fe, #ddeaf9)', border: '1px solid rgba(26,110,252,0.15)',
                  color: '#0050d8', padding: '8px 16px', borderRadius: 100, fontSize: 13.5, fontWeight: 600,
                }}>{t}</span>
              ))}
            </div>

            <div style={{ marginTop: 32, background: '#0a1628', borderRadius: 16, padding: '26px 24px' }}>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Need this for your business?</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13.5, marginBottom: 18, lineHeight: 1.6 }}>Tell us about your project and we'll get back with a plan and quote.</div>
              <button onClick={() => goTo('contact')} style={{
                width: '100%', background: 'linear-gradient(135deg, #1a6efc, #0050d8)', color: 'white',
                padding: '12px 16px', borderRadius: 10, fontWeight: 700, fontSize: 14,
              }}>Start a Project</button>
            </div>
          </div>
        </div>

        <button onClick={() => goTo('services')} style={{
          marginTop: 40, background: 'none', border: '1px solid rgba(26,110,252,0.2)', color: '#1a6efc',
          padding: '10px 20px', borderRadius: 10, fontSize: 13.5, fontWeight: 600,
        }}>← All Services</button>
      </section>

      <Footer />
    </div>
  );
}

const PROCESS = [
  { n: '01', t: 'Discover', d: 'We start by understanding your business, the problem, and what success looks like.' },
  { n: '02', t: 'Plan', d: 'We decide the right technology, architecture, and scope for the project.' },
  { n: '03', t: 'Design', d: "We plan the UI/UX and system flow before writing production code." },
  { n: '04', t: 'Develop', d: 'We build the software or AI system in focused, reviewable milestones.' },
  { n: '05', t: 'Test', d: 'We test functionality, performance, and edge cases before handover.' },
  { n: '06', t: 'Deploy', d: 'We deploy, hand over, and stay available for support afterward.' },
];

const TIERS = [
  { name: 'Starter', desc: 'Small business or basic website', items: ['Single-page or small website', 'Basic design & content setup', 'Fast turnaround'] },
  { name: 'Business', desc: 'Advanced website, dashboard or automation', items: ['Multi-page site or web app', 'Dashboards & data integrations', 'Workflow automation'], highlight: true },
  { name: 'Custom', desc: 'AI, custom software or complex applications', items: ['Custom AI/ML models', 'Full-stack or desktop software', 'Ongoing development & support'] },
];

export default function Services({ subpage, goTo, goBack }) {
  if (subpage) return <ServiceDetail id={subpage} goTo={goTo} />;

  return (
    <div>
      <PageHero
        eyebrow="What Can We Build For You?"
        title="Services for Real Businesses"
        subtitle="From AI and automation to websites and custom software, we turn business ideas into practical digital solutions."
        onBack={goBack}
      />

      <section style={{ padding: '10px 28px 70px', background: 'white' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {SERVICES.map(s => (
            <div key={s.id} onClick={() => goTo('services', s.id)} style={{
              background: '#f0f6ff', border: '1px solid rgba(26,110,252,0.1)', borderRadius: 16,
              padding: '28px 22px', cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(26,110,252,0.14)'; e.currentTarget.style.borderColor = 'rgba(26,110,252,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(26,110,252,0.1)'; }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 14, marginBottom: 16,
                background: 'linear-gradient(135deg, #e8f0fe, #ddeaf9)', color: '#1a6efc',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><s.icon size={24} /></div>
              <div style={{ fontWeight: 700, fontSize: 15.5, marginBottom: 8, color: '#0a1628' }}>{s.label}</div>
              <div style={{ fontSize: 13, color: '#1a6efc', fontWeight: 600 }}>Learn more →</div>
            </div>
          ))}
        </div>
      </section>

      {/* How We Build */}
      <section style={{ padding: '70px 28px', background: '#f0f6ff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <SectionLabel>How We Build</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.3rem)', fontWeight: 800, color: '#0a1628' }}>Our Process, Start to Finish</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18 }}>
            {PROCESS.map(p => (
              <div key={p.n} style={{ background: 'white', border: '1px solid rgba(26,110,252,0.1)', borderRadius: 16, padding: '24px 20px' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'rgba(26,110,252,0.35)', marginBottom: 10, fontFamily: 'var(--font-head)' }}>{p.n}</div>
                <div style={{ fontWeight: 700, fontSize: 15.5, marginBottom: 8, color: '#0a1628' }}>{p.t}</div>
                <div style={{ fontSize: 13, color: '#4a6080', lineHeight: 1.6 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '70px 28px', background: 'white' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <SectionLabel>Pricing</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.3rem)', fontWeight: 800, color: '#0a1628', marginBottom: 12 }}>Sized to Your Project</h2>
            <p style={{ color: '#4a6080', maxWidth: 560, margin: '0 auto' }}>Every project is different, so we quote based on scope rather than a fixed price list.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 22 }}>
            {TIERS.map(t => (
              <div key={t.name} style={{
                background: t.highlight ? 'linear-gradient(160deg, #0a1628, #0f2036)' : '#f0f6ff',
                border: t.highlight ? 'none' : '1px solid rgba(26,110,252,0.1)',
                borderRadius: 18, padding: '30px 26px',
                color: t.highlight ? 'white' : '#0a1628',
              }}>
                <div style={{ fontWeight: 800, fontSize: 19, marginBottom: 6 }}>{t.name}</div>
                <div style={{ fontSize: 13.5, marginBottom: 20, opacity: 0.75 }}>{t.desc}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {t.items.map(i => (
                    <div key={i} style={{ fontSize: 13.5, display: 'flex', gap: 8 }}>
                      <span style={{ color: t.highlight ? '#4f8ef7' : '#1a6efc', display: 'flex', alignItems: 'center' }}><IconCheck size={14} /></span>{i}
                    </div>
                  ))}
                </div>
                <button onClick={() => goTo('contact')} style={{
                  width: '100%', padding: '11px 16px', borderRadius: 10, fontWeight: 700, fontSize: 13.5,
                  background: t.highlight ? 'linear-gradient(135deg, #1a6efc, #0050d8)' : 'white',
                  color: t.highlight ? 'white' : '#1a6efc',
                  border: t.highlight ? 'none' : '1.5px solid rgba(26,110,252,0.2)',
                }}>Get a Custom Quote</button>
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
