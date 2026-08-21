import { useState } from 'react';
import { whatsappLink } from '../data/site';

/**
 * Where forms post.
 *
 * Set REACT_APP_FORM_ENDPOINT in .env (see .env.example) to a Formspree or
 * Web3Forms URL and submissions land in your inbox.
 *
 * If it is not set, the form opens WhatsApp with every field pre-filled.
 * That is deliberately NOT a mailto: link — the old site used one, and on
 * phones without a mail app, in webmail-only setups, and inside many corporate
 * environments the click did nothing and the lead was lost silently.
 */
export const FORM_ENDPOINT = process.env.REACT_APP_FORM_ENDPOINT || '';

/**
 * Shared submit behaviour for the project and internship forms.
 *
 * `buildMessage`  -> the plain-text WhatsApp version of the submission
 * `buildPayload`  -> the JSON body sent to the endpoint
 * `subject`       -> email subject line, when the endpoint supports one
 *
 * States: idle | sending | sent | handoff | error
 */
export default function useFormSubmit({ buildMessage, buildPayload, subject }) {
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');

  const submit = async (form) => {
    if (form.website) return;            // honeypot tripped — silently drop
    setError('');

    // No endpoint configured: hand off to WhatsApp, fully pre-filled.
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
        body: JSON.stringify({ ...buildPayload(form), _subject: subject(form) }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setState('sent');
    } catch (err) {
      setState('error');
      setError(err.message || 'Something went wrong.');
    }
  };

  const reset = () => { setState('idle'); setError(''); };

  return { state, setState, error, submit, reset, hasEndpoint: Boolean(FORM_ENDPOINT) };
}
