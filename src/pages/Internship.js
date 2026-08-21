import React from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import useReveal from '../components/Reveal';
import { PageHero, SectionHead, CTABanner } from '../components/ui';
import { TRACKS, WHAT_YOU_GET } from '../data/internship';
import { IconLaptop, IconCheck, IconArrowRight } from '../components/Icons';

export default function Internship() {
  useSeo({
    title: 'Internship Program',
    description: 'A hands-on 3-month internship at Codify Labs across AI, computer vision, web development, full stack, and data science — working on real client projects with mentorship.',
    path: '/internship',
  });
  useReveal();

  return (
    <>
      <PageHero
        eyebrow="Internship Program"
        title="Learn by Building Real Projects"
        subtitle="A hands-on internship designed to give you real, practical project experience — not tutorial exercises."
      >
        <Link to="/internship/apply" className="btn btn-primary" style={{ marginTop: 28 }}>
          Apply for an Internship <IconArrowRight size={16} />
        </Link>
      </PageHero>

      <section className="section-tight" style={{ paddingTop: 44 }}>
        <div className="container">
          <div className="intern-split">
            <div className="card intern-card" data-reveal="left">
              <span className="icon-tile" style={{ width: 58, height: 58 }}><IconLaptop size={27} /></span>
              <h2 className="card-title" style={{ fontSize: 'var(--text-xl)' }}>Internship — 3 Months</h2>
              <p className="card-text" style={{ marginBottom: 22 }}>
                Work on real Codify Labs projects under mentorship, applying practical skills to actual
                client and product work.
              </p>
              <ul className="intern-list">
                {WHAT_YOU_GET.map(item => (
                  <li key={item} className="check-row"><IconCheck size={15} /> {item}</li>
                ))}
              </ul>
            </div>

            <div data-reveal data-reveal-delay="100">
              <span className="eyebrow">Internships Available In</span>
              <div className="track-grid">
                {TRACKS.map(t => (
                  <Link
                    key={t.title}
                    to={`/internship/apply?track=${encodeURIComponent(t.title)}`}
                    className="track"
                  >
                    <span className="icon-tile icon-tile-sm"><t.icon size={20} /></span>
                    <span className="track-title">{t.title}</span>
                  </Link>
                ))}
              </div>
              <p className="muted" style={{ marginTop: 16 }}>
                Pick a track to start an application with it already selected.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container">
          <SectionHead
            eyebrow="Already Completed One?"
            title="Verify your internship certificate"
            subtitle="Employers can confirm any Codify Labs certificate using the code printed on it."
          />
          <div style={{ textAlign: 'center' }}>
            <Link to="/certificates/interns" className="btn btn-secondary">Verify a Certificate</Link>
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Apply?"
        subtitle="Tell us which track interests you and where you're starting from — there's no application fee."
        primaryLabel="Apply for an Internship"
        primaryTo="/internship/apply"
      />

      <style>{`
        .intern-split { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        .intern-card { background: linear-gradient(158deg, var(--bg-soft), var(--bg-tint)); }
        .intern-list { display: flex; flex-direction: column; gap: 11px; }
        .track-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .track {
          display: flex; align-items: center; gap: 13px;
          background: var(--surface); border: 1px solid var(--line);
          border-radius: var(--r-md); padding: 17px 18px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .track:hover { transform: translateY(-3px); border-color: var(--blue-500); box-shadow: var(--shadow-md); }
        .track:active { transform: translateY(0); }
        .track-title { font-family: var(--font-head); font-weight: 700; font-size: var(--text-sm); }
        @media (max-width: 860px) {
          .intern-split { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 520px) { .track-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
