import React from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import { PenguinMark } from '../components/Logo';

export default function NotFound() {
  useSeo({
    title: 'Page Not Found',
    description: 'That page does not exist. Head back to the Codify Labs homepage.',
    path: '/404',
  });

  return (
    <section className="section notfound">
      <div className="container-narrow" style={{ textAlign: 'center' }}>
        <span className="notfound-mark"><PenguinMark size={64} /></span>
        <p className="eyebrow">Error 404</p>
        <h1 className="h-page">This page wandered off</h1>
        <p className="lede" style={{ margin: '16px auto 32px' }}>
          The link may be out of date, or the page may have moved. Everything else is still where you left it.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
          <Link to="/services" className="btn btn-secondary">Browse Services</Link>
        </div>
      </div>

      <style>{`
        .notfound { padding: 96px 0; }
        .notfound-mark {
          display: inline-block; color: var(--navy-700);
          --logo-cut: #fff;
          margin-bottom: 28px;
        }
        .notfound-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
      `}</style>
    </section>
  );
}
