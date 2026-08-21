import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import useFormSubmit from '../hooks/useFormSubmit';
import { PageHero } from '../components/ui';
import { SITE, WHATSAPP } from '../data/site';
import { TRACKS } from '../data/internship';
import {
  IconWhatsapp, IconCheck, IconAlert, IconGraduationCap,
} from '../components/Icons';

const TRACK_NAMES = TRACKS.map(t => t.title);

const LEVELS = [
  'Complete beginner',
  'Some coursework or self-study',
  'Built a few personal projects',
  'Professional or freelance experience',
];

const AVAILABILITY = ['Full-time', 'Part-time', 'Flexible'];

const EMPTY = {
  name: '', email: '', whatsapp: '', location: '',
  track: TRACK_NAMES[0], education: '', level: LEVELS[0],
  portfolio: '', start: '', availability: AVAILABILITY[0], motivation: '',
  website: '', // honeypot — real people never fill this
};

// Note: no budget, cost, or fee field. An internship application should never
// ask an applicant about money.
function buildMessage(f) {
  return [
    'New internship application from the Codify Labs website',
    '',
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `WhatsApp: ${f.whatsapp}`,
    f.location ? `Location: ${f.location}` : null,
    `Track: ${f.track}`,
    `Experience level: ${f.level}`,
    f.education ? `Education: ${f.education}` : null,
    f.portfolio ? `Portfolio/GitHub: ${f.portfolio}` : null,
    f.start ? `Earliest start: ${f.start}` : null,
    `Availability: ${f.availability}`,
    '',
    'Why they want to join:',
    f.motivation,
  ].filter(Boolean).join('\n');
}

const buildPayload = (f) => ({
  form: 'Internship application',
  name: f.name,
  email: f.email,
  whatsapp: f.whatsapp,
  location: f.location,
  track: f.track,
  experience_level: f.level,
  education: f.education,
  portfolio: f.portfolio,
  earliest_start: f.start,
  availability: f.availability,
  message: f.motivation,
});

function Field({ label, htmlFor, required, children, hint }) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={htmlFor}>
        {label} {required && <span aria-hidden="true" style={{ color: 'var(--error)' }}>*</span>}
      </label>
      {children}
      {hint && <span className="muted" style={{ fontSize: 12, marginTop: 5, display: 'block' }}>{hint}</span>}
    </div>
  );
}

export default function InternshipApply() {
  const [params] = useSearchParams();
  const preset = TRACK_NAMES.find(t => t === params.get('track'));
  const [form, setForm] = useState({ ...EMPTY, track: preset || EMPTY.track });

  const { state, setState, error, submit, hasEndpoint } = useFormSubmit({
    buildMessage,
    buildPayload,
    subject: (f) => `Internship application — ${f.name || 'New applicant'} (${f.track})`,
  });

  useSeo({
    title: 'Apply for an Internship',
    description: 'Apply for the Codify Labs internship — hands-on, project-based training across computer vision, AI, web development, full stack, and data science.',
    path: '/internship/apply',
  });

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => { e.preventDefault(); submit(form); };

  return (
    <>
      <PageHero
        eyebrow="Internship Program"
        title="Apply for an Internship"
        subtitle="Tell us where you're starting from and which track interests you. There's no fee — this is a working internship, not a paid course."
        backTo="/internship"
        backLabel="Internship Program"
      />

      <section className="section-tight" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="contact-split">
            <aside className="contact-aside">
              <h2 className="card-title" style={{ fontSize: 'var(--text-lg)' }}>Before you apply</h2>
              <p className="card-text" style={{ marginBottom: 22 }}>
                A few things worth knowing about how the programme runs.
              </p>

              <ul className="apply-notes">
                <li className="check-row"><IconCheck size={16} /> Three months, working on real client and product projects</li>
                <li className="check-row"><IconCheck size={16} /> Mentored by the engineers who built them</li>
                <li className="check-row"><IconCheck size={16} /> Code review on everything you ship</li>
                <li className="check-row"><IconCheck size={16} /> A verifiable certificate on completion</li>
                <li className="check-row"><IconCheck size={16} /> No application fee, and no course fee</li>
              </ul>

              <div className="apply-tracks">
                <span className="kicker" style={{ marginBottom: 12 }}>Tracks available</span>
                {TRACKS.map(t => (
                  <span key={t.title} className="apply-track">
                    <t.icon size={15} /> {t.title}
                  </span>
                ))}
              </div>

              <p className="muted" style={{ marginTop: 24 }}>
                Questions first? Message us on{' '}
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-700)', fontWeight: 600 }}>WhatsApp</a>{' '}
                or email <a href={`mailto:${SITE.email}`} style={{ color: 'var(--blue-700)', fontWeight: 600 }}>{SITE.email}</a>.
              </p>
            </aside>

            <div className="card contact-form-card">
              {state === 'sent' ? (
                <div className="form-result">
                  <span className="result-icon result-ok"><IconCheck size={28} /></span>
                  <h2 className="card-title" style={{ fontSize: 'var(--text-xl)' }}>Application received</h2>
                  <p className="card-text">
                    Thanks for applying. We review applications in batches and will get back to you
                    about next steps — keep an eye on your email and WhatsApp.
                  </p>
                  <div className="result-actions">
                    <Link to="/internship" className="btn btn-secondary">Back to the programme</Link>
                  </div>
                </div>
              ) : state === 'handoff' ? (
                <div className="form-result">
                  <span className="result-icon result-ok"><IconWhatsapp size={26} /></span>
                  <h2 className="card-title" style={{ fontSize: 'var(--text-xl)' }}>WhatsApp is open</h2>
                  <p className="card-text">
                    We've opened WhatsApp with your application already filled in — just press send.
                    If nothing opened, email it to{' '}
                    <a href={`mailto:${SITE.email}`} style={{ color: 'var(--blue-700)', fontWeight: 600 }}>{SITE.email}</a> instead.
                  </p>
                  <div className="result-actions">
                    <button onClick={() => { setForm(EMPTY); setState('idle'); }} className="btn btn-secondary">
                      Start over
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <span className="eyebrow">Internship Application</span>

                  <div className="field-row">
                    <Field label="Full name" htmlFor="i-name" required>
                      <input id="i-name" className="input" required value={form.name} onChange={update('name')} placeholder="Your full name" autoComplete="name" />
                    </Field>
                    <Field label="Email" htmlFor="i-email" required>
                      <input id="i-email" type="email" className="input" required value={form.email} onChange={update('email')} placeholder="you@example.com" autoComplete="email" />
                    </Field>
                  </div>

                  <div className="field-row">
                    <Field label="WhatsApp" htmlFor="i-wa" required hint="How we'll usually reach you">
                      <input id="i-wa" className="input" required value={form.whatsapp} onChange={update('whatsapp')} placeholder="+92 300 0000000" autoComplete="tel" />
                    </Field>
                    <Field label="City & country" htmlFor="i-loc">
                      <input id="i-loc" className="input" value={form.location} onChange={update('location')} placeholder="e.g. Lahore, Pakistan" />
                    </Field>
                  </div>

                  <Field label="Which track?" htmlFor="i-track" required>
                    <select id="i-track" className="input" value={form.track} onChange={update('track')}>
                      {TRACK_NAMES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>

                  <Field label="Where are you starting from?" htmlFor="i-level" required>
                    <select id="i-level" className="input" value={form.level} onChange={update('level')}>
                      {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </Field>

                  <Field label="Education" htmlFor="i-edu" hint="University, degree, and year — or self-taught">
                    <input id="i-edu" className="input" value={form.education} onChange={update('education')} placeholder="e.g. BSCS, 6th semester" />
                  </Field>

                  <Field label="Portfolio, GitHub or LinkedIn" htmlFor="i-portfolio" hint="Optional, but it helps us a lot">
                    <input id="i-portfolio" type="url" className="input" value={form.portfolio} onChange={update('portfolio')} placeholder="https://github.com/yourname" />
                  </Field>

                  <div className="field-row">
                    <Field label="Earliest start date" htmlFor="i-start">
                      <input id="i-start" className="input" value={form.start} onChange={update('start')} placeholder="e.g. next month" />
                    </Field>
                    <Field label="Availability" htmlFor="i-avail">
                      <select id="i-avail" className="input" value={form.availability} onChange={update('availability')}>
                        {AVAILABILITY.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </Field>
                  </div>

                  <Field label="Why do you want to join?" htmlFor="i-why" required hint="What you want to learn, and anything you've already built">
                    <textarea
                      id="i-why"
                      className="input"
                      required
                      rows={5}
                      value={form.motivation}
                      onChange={update('motivation')}
                      placeholder="Tell us what draws you to this track and what you're hoping to get out of it..."
                    />
                  </Field>

                  {/* Honeypot — hidden from people, tempting to bots. */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="i-website">Leave this blank</label>
                    <input id="i-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} />
                  </div>

                  {state === 'error' && (
                    <div className="alert alert-error" style={{ marginBottom: 16 }} role="alert">
                      <IconAlert size={16} />
                      <span>
                        We couldn't send that ({error}). Please message us on{' '}
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>WhatsApp</a>{' '}
                        or email <a href={`mailto:${SITE.email}`} style={{ color: 'inherit', textDecoration: 'underline' }}>{SITE.email}</a> instead.
                      </span>
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary btn-block" disabled={state === 'sending'}>
                    {state === 'sending'
                      ? 'Sending…'
                      : hasEndpoint
                        ? <><IconGraduationCap size={17} /> Submit Application</>
                        : <><IconWhatsapp size={16} /> Send Application via WhatsApp</>}
                  </button>

                  {!hasEndpoint && (
                    <p className="muted" style={{ marginTop: 12, textAlign: 'center', fontSize: 12 }}>
                      Opens WhatsApp with your application filled in. Prefer email?{' '}
                      <a href={`mailto:${SITE.email}`} style={{ color: 'var(--blue-700)', fontWeight: 600 }}>{SITE.email}</a>
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .apply-notes {
          display: flex; flex-direction: column; gap: 12px;
          padding: 20px 22px; margin-bottom: 22px;
          background: var(--surface); border: 1px solid var(--line);
          border-radius: var(--r-md); box-shadow: var(--shadow-sm);
        }
        .apply-tracks { display: flex; flex-direction: column; gap: 8px; }
        .apply-track {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 10px 14px; border-radius: var(--r-sm);
          background: var(--bg-tint); border: 1px solid rgba(26,110,252,0.14);
          font-family: var(--font-head); font-size: var(--text-xs); font-weight: 700;
          color: var(--ink);
        }
        .apply-track svg { color: var(--blue-700); flex-shrink: 0; }
      `}</style>
    </>
  );
}
