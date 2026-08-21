import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import useReveal from '../components/Reveal';
import { PageHero, CTABanner } from '../components/ui';
import { getProject } from '../data/projects';
import { IconCheck } from '../components/Icons';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  useSeo({
    title: project ? project.name : 'Project',
    description: project ? project.summary : undefined,
    path: `/projects/${slug}`,
    image: project && project.image ? project.image : undefined,
  });
  useReveal([slug]);

  if (!project) return <Navigate to="/projects" replace />;

  const Icon = project.icon;

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span className="icon-tile" style={{ marginBottom: 0, width: 58, height: 58 }}>
              <Icon size={28} />
            </span>
            {project.name}
          </span>
        }
        backTo="/projects"
        backLabel="All Projects"
      />

      <section className="section">
        <div className="container-narrow">
          {project.image && (
            <img className="case-shot" src={project.image} alt={`${project.name} screenshot`} data-reveal />
          )}

          <div className="case-block" data-reveal>
            <span className="eyebrow">The Problem</span>
            <p className="body-text">{project.problem}</p>
          </div>

          <div className="case-block" data-reveal>
            <span className="eyebrow">Our Solution</span>
            <p className="body-text">{project.solution}</p>
          </div>

          <div className="case-block" data-reveal>
            <span className="eyebrow">Key Features</span>
            <ul className="feature-list">
              {project.features.map(f => (
                <li key={f} className="check-row"><IconCheck size={16} /> {f}</li>
              ))}
            </ul>
          </div>

          <div className="case-block" data-reveal>
            <span className="eyebrow">Technologies</span>
            <div className="tag-row">
              {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>

          <div className="case-cta" data-reveal>
            <h2 className="card-title" style={{ color: '#fff', fontSize: 'var(--text-xl)' }}>
              Want something like this built?
            </h2>
            <p>Tell us what you're trying to solve and we'll map out an approach.</p>
            <Link to="/contact" className="btn btn-primary">Start a Project</Link>
          </div>
        </div>
      </section>

      <CTABanner />

      <style>{`
        .case-shot {
          width: 100%; border-radius: var(--r-lg);
          border: 1px solid var(--line); margin-bottom: 40px;
          box-shadow: var(--shadow-md);
        }
        .case-block { margin-bottom: 36px; }
        .feature-list { display: flex; flex-direction: column; gap: 12px; }
        .case-cta {
          text-align: center; margin-top: 48px;
          background: linear-gradient(158deg, var(--navy-800), var(--navy-700));
          border-radius: var(--r-lg); padding: 38px 30px;
        }
        .case-cta p {
          color: rgba(255,255,255,0.74); font-size: var(--text-sm);
          margin: 10px auto 24px; max-width: 44ch;
        }
      `}</style>
    </>
  );
}
