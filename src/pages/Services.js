import React from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import useReveal from '../components/Reveal';
import { PageHero, SectionHead, CTABanner } from '../components/ui';
import { SERVICES, PROCESS, TIERS } from '../data/services';
import { IconCheck, IconArrowRight } from '../components/Icons';

export default function Services() {
  useSeo({
    title: 'Services',
    description: 'AI and machine learning, computer vision, chatbots, web development, data analytics, automation and custom software — built for real businesses by Codify Labs.',
    path: '/services',
  });
  useReveal();

  return (
    <>
      <PageHero
        eyebrow="What Can We Build For You?"
        title="Services for Real Businesses"
        subtitle="From AI and automation to websites and custom software, we turn business ideas into practical digital solutions."
      />

      <section className="section-tight" style={{ paddingTop: 44 }}>
        <div className="container">
          <div className="grid grid-3">
            {SERVICES.map((s, i) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="card card-link" data-reveal data-reveal-delay={Math.min(i, 6) * 55}>
                <span className="icon-tile"><s.icon size={24} /></span>
                <h2 className="card-title">{s.label}</h2>
                <p className="card-text">{s.short}</p>
                <span className="link-arrow" style={{ marginTop: 16 }}>
                  Learn more <IconArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container">
          <SectionHead
            eyebrow="How We Build"
            title="Our Process, Start to Finish"
            subtitle="Six stages, in order. You know what's happening at every one."
          />
          {/* Numbered because this genuinely is a sequence — each stage depends
              on the one before it. */}
          <ol className="grid grid-3 process-list">
            {PROCESS.map((p, i) => (
              <li key={p.n} className="card process-step" data-reveal data-reveal-delay={i * 55}>
                <span className="process-n">{p.n}</span>
                <h3 className="card-title" style={{ fontSize: 'var(--text-base)' }}>{p.t}</h3>
                <p className="card-text">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Pricing"
            title="Sized to Your Project"
            subtitle="Every project is different, so we quote based on scope rather than a fixed price list."
          />
          <div className="grid grid-3">
            {TIERS.map((t, i) => (
              <div
                key={t.name}
                className={`card tier ${t.highlight ? 'tier-featured' : ''}`}
                data-reveal
                data-reveal-delay={i * 70}
              >
                {t.highlight && <span className="tier-flag">Most Popular</span>}
                <h3 className="card-title" style={{ fontSize: 'var(--text-xl)' }}>{t.name}</h3>
                <p className="card-text" style={{ marginBottom: 22 }}>{t.desc}</p>
                <ul className="tier-items">
                  {t.items.map(item => (
                    <li key={item} className="check-row">
                      <IconCheck size={15} /> {item}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`btn btn-block ${t.highlight ? 'btn-primary' : 'btn-secondary'}`}>
                  Get a Custom Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />

      <style>{`
        .process-list { list-style: none; }
        .process-step { position: relative; }
        .process-n {
          display: block;
          font-family: var(--font-head); font-size: var(--text-sm); font-weight: 800;
          color: var(--ink-3); letter-spacing: 0.08em;
          margin-bottom: 12px; font-variant-numeric: tabular-nums;
        }
        .tier { display: flex; flex-direction: column; position: relative; }
        .tier-items { display: flex; flex-direction: column; gap: 11px; margin-bottom: 26px; flex: 1; }
        .tier-featured {
          background: linear-gradient(158deg, var(--navy-800), var(--navy-700));
          border-color: transparent; color: #fff;
          box-shadow: var(--shadow-lg);
        }
        .tier-featured .card-title { color: #fff; }
        .tier-featured .card-text { color: rgba(255,255,255,0.74); }
        .tier-featured .check-row { color: rgba(255,255,255,0.92); }
        .tier-featured .check-row svg { color: var(--blue-500); }
        .tier-flag {
          position: absolute; top: 18px; right: 18px;
          background: var(--amber-500); color: var(--navy-900);
          font-family: var(--font-head); font-size: 11px; font-weight: 800;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 5px 11px; border-radius: var(--r-pill);
        }
      `}</style>
    </>
  );
}
