import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import useReveal from '../components/Reveal';
import { PageHero, CTABanner } from '../components/ui';
import { getService, SERVICES } from '../data/services';
import { IconCheck, IconArrowRight } from '../components/Icons';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);

  useSeo({
    title: service ? service.label : 'Service',
    description: service ? service.desc.slice(0, 155) : undefined,
    path: `/services/${slug}`,
  });
  useReveal([slug]);

  if (!service) return <Navigate to="/services" replace />;

  const related = SERVICES.filter(s => s.slug !== service.slug).slice(0, 3);
  const Icon = service.icon;

  return (
    <>
      <PageHero
        eyebrow={service.tagline}
        title={
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span className="icon-tile" style={{ marginBottom: 0, width: 58, height: 58 }}>
              <Icon size={28} />
            </span>
            {service.label}
          </span>
        }
        subtitle={service.desc}
        backTo="/services"
        backLabel="All Services"
      />

      <section className="section">
        <div className="container">
          <div className="detail-split">
            <div data-reveal="left">
              <span className="eyebrow">What's Included</span>
              <ul className="included-list">
                {service.capabilities.map(c => (
                  <li key={c} className="included-item">
                    <IconCheck size={16} /> {c}
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal data-reveal-delay="100">
              <span className="eyebrow">Technologies We Use</span>
              <div className="tag-row">
                {service.stack.map(t => <span key={t} className="tag">{t}</span>)}
              </div>

              <div className="quote-box">
                <h3 className="card-title" style={{ color: '#fff' }}>Need this for your business?</h3>
                <p>Tell us about your project and we'll come back with a plan and a quote.</p>
                <Link to="/contact" className="btn btn-primary btn-block">Start a Project</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container">
          <h2 className="h-section" style={{ marginBottom: 30 }}>Other services</h2>
          <div className="grid grid-3">
            {related.map(s => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="card card-link">
                <span className="icon-tile"><s.icon size={22} /></span>
                <h3 className="card-title">{s.label}</h3>
                <p className="card-text">{s.short}</p>
                <span className="link-arrow" style={{ marginTop: 14 }}>
                  Learn more <IconArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />

      <style>{`
        .detail-split { display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; align-items: start; }
        .included-list { display: flex; flex-direction: column; gap: 11px; }
        .included-item {
          display: flex; gap: 12px; align-items: flex-start;
          background: var(--bg-soft); border: 1px solid var(--line);
          border-radius: var(--r-md); padding: 15px 18px;
          font-size: var(--text-sm); color: var(--ink); line-height: 1.6;
        }
        .included-item svg { color: var(--blue-700); flex-shrink: 0; margin-top: 2px; }
        .quote-box {
          margin-top: 34px;
          background: linear-gradient(158deg, var(--navy-800), var(--navy-700));
          border-radius: var(--r-lg); padding: 28px 26px;
        }
        .quote-box p {
          color: rgba(255,255,255,0.72); font-size: var(--text-sm);
          margin: 8px 0 22px; line-height: 1.65;
        }
        @media (max-width: 860px) { .detail-split { grid-template-columns: 1fr; gap: 36px; } }
      `}</style>
    </>
  );
}
