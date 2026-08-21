import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import useReveal from '../components/Reveal';
import { PageHero, CTABanner } from '../components/ui';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects';
import { IconArrowRight } from '../components/Icons';

export default function Projects() {
  const [filter, setFilter] = useState('All');

  useSeo({
    title: 'Projects',
    description: 'Case studies from Codify Labs — computer vision, analytics dashboards, AI chatbots, and full-stack client portals, each built to solve a specific problem.',
    path: '/projects',
  });
  useReveal([filter]);

  const shown = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Real Projects We've Built"
        subtitle="A selection of AI, web, and data projects — each one built to solve a real, specific problem."
      />

      <section className="section-tight" style={{ paddingTop: 44 }}>
        <div className="container">
          <div className="filter-row" role="group" aria-label="Filter projects by category">
            {PROJECT_CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`filter-chip ${filter === c ? 'is-active' : ''}`}
                aria-pressed={filter === c}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-2">
            {shown.map((p, i) => (
              <Link key={p.slug} to={`/projects/${p.slug}`} className="card card-link" data-reveal data-reveal-delay={i * 65}>
                {p.image ? (
                  <img className="project-shot" src={p.image} alt={`${p.name} screenshot`} loading="lazy" />
                ) : (
                  <span className="icon-tile"><p.icon size={24} /></span>
                )}
                <span className="kicker">{p.category}</span>
                <h2 className="card-title">{p.name}</h2>
                <p className="card-text" style={{ marginBottom: 18 }}>{p.summary}</p>
                <div className="tag-row" style={{ marginBottom: 18 }}>
                  {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <span className="link-arrow">
                  View case study <IconArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />

      <style>{`
        .filter-row { display: flex; gap: 9px; flex-wrap: wrap; margin-bottom: 30px; }
        .filter-chip {
          padding: 9px 19px; border-radius: var(--r-pill);
          font-family: var(--font-head); font-size: var(--text-xs); font-weight: 700;
          background: var(--bg-soft); color: var(--ink-2);
          border: 1px solid var(--line-2);
          transition: background-color 0.16s ease, color 0.16s ease, border-color 0.16s ease;
        }
        .filter-chip:hover { border-color: var(--blue-500); color: var(--blue-700); }
        .filter-chip.is-active { background: var(--blue-700); color: #fff; border-color: var(--blue-700); }
        .project-shot {
          width: 100%; aspect-ratio: 16 / 9; object-fit: cover;
          border-radius: var(--r-md); border: 1px solid var(--line);
          margin-bottom: 18px;
        }
      `}</style>
    </>
  );
}
