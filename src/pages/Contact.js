import React, { useState } from 'react';
import useSeo from '../hooks/useSeo';
import { PageHero } from '../components/ui';
import { SITE, WHATSAPP, whatsappLink } from '../data/site';
import { SERVICE_NAMES } from '../data/services';
import {
  IconWhatsapp, IconMail, IconCheck, IconAlert, IconInstagram, IconLinkedin,
} from '../components/Icons';

/**
 * Where the form posts.
 *
 * Set REACT_APP_FORM_ENDPOINT in a .env file (see .env.example) to a Formspree,
 * Web3Forms, or Getform URL and submissions land in your inbox directly.
 *
 * If it is not set, the form falls back to opening WhatsApp with every field
 * pre-filled. That is deliberately NOT a mailto: link — the old version used
 * one, and on phones without a mail app configured, in webmail-only setups, and
 * inside many corporate environments, clicking it did nothing at all and the
 * lead was lost silently.
 */
const FORM_ENDPOINT = process.env.REACT_APP_FORM_ENDPOINT || '';

const SERVICE_OPTIONS = [...SERVICE_NAMES, 'Not sure yet'];

const EMPTY = {
  name: '', email: '', whatsapp: '', company: '',
  service: SERVICE_OPTIONS[0], description: '', deadline: '',
  website: '', // honeypot — real people never fill this
};

function buildMessage(f) {
  return [
    'New project request from the Codify Labs website',
    '',
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    f.whatsapp ? `WhatsApp: ${f.whatsapp}` : null,
    f.company ? `Company: ${f.company}` : null,
    `Service: ${f.service}`,
    f.deadline ? `Deadline: ${f.deadline}` : null,
    '',
    'Project description:',
    f.description,
  ].filter(Boolean).join('\n');
}

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

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState('idle'); // idle | sending | sent | handoff | error
  const [error, setError] = useState('');

  useSeo({
    title: 'Contact',
    description: `Start a project with Codify Labs. Tell us what you're building and we'll come back with a plan and a quote. Email ${SITE.email} or message us on WhatsApp.`,
    path: '/contact',
  });

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.website) return; // honeypot tripped — silently drop

    setError('');

    // No endpoint configured: hand off to WhatsApp with everything pre-filled.
    if (!FORM_ENDPOINT) {
      window.open(whatsappLink(buildMessage(form)), '_blank', 'noopener');
      setState('handoff');
      return;
    }

    setState('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          company: form.company,
          service: form.service,
          deadline: form.deadline,
          message: form.description,
          _subject: `Project request — ${form.name || 'New inquiry'}`,
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setState('sent');
      setForm(EMPTY);
    } catch (err) {
      setState('error');
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Start a Project"
        title="Let's Build Something Together"
        subtitle="Tell us about your project and we'll come back with a plan and a quote — usually within a day."
      />

      <section className="section-tight" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="contact-split">
            {/* ------------------------------------------------ direct -- */}
            <aside className="contact-aside">
              <h2 className="card-title" style={{ fontSize: 'var(--text-lg)' }}>Reach us directly</h2>
              <p className="card-text" style={{ marginBottom: 22 }}>
                Prefer to skip the form? Either of these reaches us just as fast.
              </p>

              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="contact-method">
                <span className="contact-icon contact-icon-wa"><IconWhatsapp size={19} /></span>
                <span>
                  <strong>WhatsApp</strong>
                  <span>{SITE.whatsappDisplay}</span>
                </span>
              </a>

              <a href={`mailto:${SITE.email}`} className="contact-method">
                <span className="contact-icon"><IconMail size={19} /></span>
                <span>
                  <strong>Email</strong>
                  <span>{SITE.email}</span>
                </span>
              </a>

              <div className="contact-socials">
                <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Codify Labs on Instagram">
                  <IconInstagram size={17} /> Instagram
                </a>
                <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Codify Labs on LinkedIn">
                  <IconLinkedin size={17} /> LinkedIn
                </a>
              </div>

              <p className="muted" style={{ marginTop: 24 }}>
                We work remotely with clients across {SITE.countries.join(', ')} and beyond.
              </p>
            </aside>

            {/* -------------------------------------------------- form -- */}
            <div className="card contact-form-card">
              {state === 'sent' ? (
                <div className="form-result">
                  <span className="result-icon result-ok"><IconCheck size={28} /></span>
                  <h2 className="card-title" style={{ fontSize: 'var(--text-xl)' }}>Request received</h2>
                  <p className="card-text">
                    Thanks — we've got your details and we'll get back to you within a day.
                    If it's urgent, message us on WhatsApp and we'll pick it up faster.
                  </p>
                  <div className="result-actions">
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                      <IconWhatsapp size={16} /> Chat on WhatsApp
                    </a>
                    <button onClick={() => setState('idle')} className="btn btn-secondary">Send another</button>
                  </div>
                </div>
              ) : state === 'handoff' ? (
                <div className="form-result">
                  <span className="result-icon result-ok"><IconWhatsapp size={26} /></span>
                  <h2 className="card-title" style={{ fontSize: 'var(--text-xl)' }}>WhatsApp is open</h2>
                  <p className="card-text">
                    We've opened WhatsApp with your project details already filled in — just press send.
                    If nothing opened, copy your details to{' '}
                    <a href={`mailto:${SITE.email}`} style={{ color: 'var(--blue-700)', fontWeight: 600 }}>{SITE.email}</a> instead.
                  </p>
                  <div className="result-actions">
                    <a
                      href={whatsappLink(buildMessage(form))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                    >
                      <IconWhatsapp size={16} /> Open WhatsApp again
                    </a>
                    <button onClick={() => { setForm(EMPTY); setState('idle'); }} className="btn btn-secondary">
                      Start over
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate={false}>
                  <span className="eyebrow">Project Request</span>

                  <div className="field-row">
                    <Field label="Name" htmlFor="c-name" required>
                      <input id="c-name" className="input" required value={form.name} onChange={update('name')} placeholder="Your full name" autoComplete="name" />
                    </Field>
                    <Field label="Email" htmlFor="c-email" required>
                      <input id="c-email" type="email" className="input" required value={form.email} onChange={update('email')} placeholder="you@company.com" autoComplete="email" />
                    </Field>
                  </div>

                  <div className="field-row">
                    <Field label="WhatsApp" htmlFor="c-wa" hint="Optional — fastest way for us to reply">
                      <input id="c-wa" className="input" value={form.whatsapp} onChange={update('whatsapp')} placeholder="+92 300 0000000" autoComplete="tel" />
                    </Field>
                    <Field label="Company" htmlFor="c-company">
                      <input id="c-company" className="input" value={form.company} onChange={update('company')} placeholder="Optional" autoComplete="organization" />
                    </Field>
                  </div>

                  <Field label="What do you need?" htmlFor="c-service" required>
                    <select id="c-service" className="input" value={form.service} onChange={update('service')}>
                      {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>

                  <Field label="Project description" htmlFor="c-desc" required>
                    <textarea
                      id="c-desc"
                      className="input"
                      required
                      rows={5}
                      value={form.description}
                      onChange={update('description')}
                      placeholder="What are you trying to build, and what problem should it solve?"
                    />
                  </Field>

                  <Field label="Deadline" htmlFor="c-deadline" hint="Roughly when you need it live">
                    <input id="c-deadline" className="input" value={form.deadline} onChange={update('deadline')} placeholder="e.g. 4 weeks" />
                  </Field>

                  {/* Honeypot — hidden from people, tempting to bots. */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="c-website">Leave this blank</label>
                    <input id="c-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} />
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
                      : FORM_ENDPOINT
                        ? 'Send Project Request'
                        : <><IconWhatsapp size={16} /> Send via WhatsApp</>}
                  </button>

                  {!FORM_ENDPOINT && (
                    <p className="muted" style={{ marginTop: 12, textAlign: 'center', fontSize: 12 }}>
                      Opens WhatsApp with your details filled in. Prefer email?{' '}
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
        .contact-split { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 40px; align-items: start; }
        .contact-aside { position: sticky; top: calc(var(--header-h) + 24px); }
        .contact-method {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 18px; margin-bottom: 12px;
          background: var(--surface); border: 1px solid var(--line);
          border-radius: var(--r-md); box-shadow: var(--shadow-sm);
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }
        .contact-method:hover { transform: translateX(4px); border-color: var(--blue-500); box-shadow: var(--shadow-md); }
        .contact-method > span:last-child { display: flex; flex-direction: column; min-width: 0; }
        .contact-method strong {
          font-family: var(--font-head); font-size: var(--text-sm); color: var(--ink); font-weight: 700;
        }
        .contact-method span span { font-size: var(--text-xs); color: var(--ink-2); word-break: break-word; }
        .contact-icon {
          display: flex; align-items: center; justify-content: center;
          width: 42px; height: 42px; flex-shrink: 0; border-radius: 11px;
          background: var(--bg-tint); color: var(--blue-700);
          border: 1px solid rgba(26,110,252,0.14);
        }
        .contact-icon-wa { background: #E7F7EE; color: #17803D; border-color: rgba(23,128,61,0.18); }

        .contact-socials { display: flex; gap: 10px; margin-top: 18px; flex-wrap: wrap; }
        .contact-socials a {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 9px 15px; border-radius: var(--r-pill);
          border: 1px solid var(--line-2); background: var(--surface);
          font-family: var(--font-head); font-size: var(--text-xs); font-weight: 700; color: var(--ink-2);
          transition: color 0.16s ease, border-color 0.16s ease;
        }
        .contact-socials a:hover { color: var(--blue-700); border-color: var(--blue-500); }

        .contact-form-card { padding: 34px 32px; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0 18px; }

        .form-result { text-align: center; padding: 24px 8px; }
        .result-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 66px; height: 66px; border-radius: 50%; margin-bottom: 18px;
        }
        .result-ok { background: #E7F7EE; color: #17803D; }
        .form-result .card-text { max-width: 44ch; margin: 0 auto 24px; }
        .result-actions { display: flex; gap: 11px; justify-content: center; flex-wrap: wrap; }

        @media (max-width: 900px) {
          .contact-split { grid-template-columns: 1fr; gap: 28px; }
          .contact-aside { position: static; }
        }
        @media (max-width: 560px) {
          .field-row { grid-template-columns: 1fr; }
          .contact-form-card { padding: 26px 20px; }
        }
      `}</style>
    </>
  );
}
