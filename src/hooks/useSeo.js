import { useEffect } from 'react';
import { SITE } from '../data/site';

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Sets the document title, description, canonical URL and Open Graph tags
 * for the current route.
 *
 * Note: this runs in the browser, so social scrapers (WhatsApp, LinkedIn,
 * Slack) that do not execute JavaScript will fall back to the static tags in
 * public/index.html. Those defaults are set to sensible sitewide values.
 * Server rendering (Next.js) is what would make these per-route for scrapers.
 */
export default function useSeo({ title, description, path = '', image }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
    const desc = description || SITE.description;
    const url = `${SITE.url}${path}`;
    const img = image || `${SITE.url}/og-image.png`;

    document.title = fullTitle;

    upsertMeta('meta[name="description"]', { name: 'description', content: desc });
    upsertLink('canonical', url);

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: desc });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: img });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE.name });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: desc });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: img });
  }, [title, description, path, image]);
}
