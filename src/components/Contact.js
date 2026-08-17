import React, { useState } from 'react';
import { PageHero, SectionLabel, Footer, WHATSAPP, WhatsAppIcon } from './shared';

// NOTE: update to your real inbox
const CONTACT_EMAIL = 'hello@codifylabs.com';

const SERVICE_OPTIONS = [
  'AI & Machine Learning', 'AI Chatbots & NLP', 'Computer Vision', 'Website Development',
  'Web & AI Applications', 'Data Analytics', 'Custom Software', 'Business Automation',
  'UI/UX Design', 'Maintenance & Support', 'Not sure yet',
];

const initialForm = {
  name: '', email: '', whatsapp: '', company: '',
  service: SERVICE_OPTIONS[0], description: '', budget: '', deadline: '',
};

function Field({ label, children }) {
  return (
    <label style={{ display: 'block', marginBottom: 18 }}>
      <span style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#4a6080', marginBottom: 8, letterSpacing: 0.4 }}>{label}</span>
      {children}
    </label>
  );
}

const inputStyle = {
  width: '100%', background: '#f0f6ff', border: '1px solid rgba(26,110,252,0.15)',
  borderRadius: 10, padding: '12px 14px', fontSize: 14.5, color: '#0a1628',
};

export default function Contact({ goTo, goBack }) {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Request — ${form.name || 'New Inquiry'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nWhatsApp: ${form.whatsapp}\nCompany: ${form.company}\n` +
      `Service Required: ${form.service}\nApprox. Budget: ${form.budget}\nDeadline: ${form.deadline}\n\n` +
      `Project Description:\n${form.description}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div>
      <PageHero
        eyebrow="Start a Project"
        title="Let's Build Something Together"
        subtitle="Tell us about your project and we'll get back to you with a plan and quote."
        onBack={goBack}
      />

      <section style={{ padding: '10px 28px 30px', background: 'white' }}>
        <div style={{ maxWidth: 500, margin: '0 auto', display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#16a34a', color: 'white', padding: '13px 24px', borderRadius: 12,
            fontWeight: 700, fontSize: 14.5, boxShadow: '0 4px 16px rgba(22,163,74,0.3)',
          }}>
            <WhatsAppIcon size={17} /> Chat on WhatsApp
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#f0f6ff', border: '1.5px solid rgba(26,110,252,0.2)', color: '#1a6efc',
            padding: '13px 24px', borderRadius: 12, fontWeight: 700, fontSize: 14.5,
          }}>
            📅 Book a Consultation
          </a>
        </div>
      </section>

      <section style={{ padding: '0 28px 80px', background: 'white' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', background: '#f0f6ff', border: '1px solid rgba(26,110,252,0.12)', borderRadius: 20, padding: '36px 32px' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
              <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 10, color: '#0a1628' }}>Request Ready to Send</div>
              <div style={{ color: '#4a6080', fontSize: 14.5, lineHeight: 1.7, marginBottom: 24 }}>
                Your email client should have opened with your project details filled in. If it didn't, email us directly at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#1a6efc', fontWeight: 600 }}>{CONTACT_EMAIL}</a>.
              </div>
              <button onClick={() => { setForm(initialForm); setSent(false); }} style={{
                background: 'white', border: '1.5px solid rgba(26,110,252,0.2)', color: '#1a6efc',
                padding: '10px 22px', borderRadius: 10, fontWeight: 600, fontSize: 13.5,
              }}>Send Another Request</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <SectionLabel>Project Request</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0 }}>
                <Field label="Name"><input required style={inputStyle} value={form.name} onChange={update('name')} placeholder="Your full name" /></Field>
                <Field label="Email"><input required type="email" style={inputStyle} value={form.email} onChange={update('email')} placeholder="you@company.com" /></Field>
                <Field label="WhatsApp"><input style={inputStyle} value={form.whatsapp} onChange={update('whatsapp')} placeholder="+92 ..." /></Field>
                <Field label="Company"><input style={inputStyle} value={form.company} onChange={update('company')} placeholder="Company name (optional)" /></Field>
              </div>

              <Field label="Service Required">
                <select style={inputStyle} value={form.service} onChange={update('service')}>
                  {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>

              <Field label="Project Description">
                <textarea required rows={5} style={{ ...inputStyle, resize: 'vertical' }} value={form.description} onChange={update('description')} placeholder="Tell us what you're trying to build..." />
              </Field>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0 }}>
                <Field label="Approximate Budget"><input style={inputStyle} value={form.budget} onChange={update('budget')} placeholder="e.g. $500 – $1000" /></Field>
                <Field label="Deadline"><input style={inputStyle} value={form.deadline} onChange={update('deadline')} placeholder="e.g. 4 weeks" /></Field>
              </div>

              <button type="submit" style={{
                width: '100%', marginTop: 8, background: 'linear-gradient(135deg, #1a6efc, #0050d8)', color: 'white',
                padding: '14px 16px', borderRadius: 12, fontWeight: 700, fontSize: 15,
                boxShadow: '0 4px 20px rgba(26,110,252,0.3)',
              }}>Send Project Request</button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
