import React from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import { SITE } from '../data/site';

export default function NotFound() {
  useSeo({
    title: 'Page Not Found',
    description: 'That page does not exist. Head back to the Codify Labs homepage.',
    path: '/404',
  });

  return (
    <section className="section notfound">
      <div className="container-narrow" style={{ textAlign: 'center' }}>
        {/* The real penguin from the brand mark — never a drawn stand-in. */}
        <img
          className="notfound-mark"
          src="/logo-mark.png"
          alt=""
          width="183"
          height="286"
          aria-hidden="true"
        />
        <p className="eyebrow">Error 404</p>
        <h1 className="h-page">This page wandered off</h1>
        <p className="lede" style={{ margin: '16px auto 32px' }}>
          The link may be out of date, or the page may have moved. Everything else is still where you left it.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
          <Link to="/services" className="btn btn-secondary">Browse Services</Link>
        </div>
        <p className="muted" style={{ marginTop: 28 }}>
          Still stuck? Email <a href={`mailto:${SITE.email}`} style={{ color: 'var(--blue-700)', fontWeight: 600 }}>{SITE.email}</a>.
        </p>
      </div>

      <style>{`
        .notfound { padding: 96px 0; }
        /* Width is set explicitly and height derived from it. The reverse
           (width: auto with a fixed height) collapses the box to 0 here. */
        .notfound-mark {
          width: 62px; height: auto;
          margin: 0 auto 28px;
          opacity: 0.9;
        }
        .notfound-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
      `}</style>
    </section>
  );
}
