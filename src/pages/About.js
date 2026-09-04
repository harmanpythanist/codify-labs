import React from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import useReveal from '../components/Reveal';
import { PageHero, CTABanner } from '../components/ui';
import { STATS, SITE } from '../data/site';
import { FOUNDER, TEAM } from '../data/team';
import { BOOK } from '../data/book';
import {
  IconTarget, IconHandshake, IconTrendingUp, IconCheck, IconArrowRight,
} from '../components/Icons';

const VALUES = [
  { icon: IconTarget, title: 'Practical Over Flashy', desc: 'We build things that solve a real problem — not tech for the sake of tech.' },
  { icon: IconHandshake, title: 'Honest Communication', desc: "We tell clients what's realistic, on timeline, budget, and scope." },
  { icon: IconTrendingUp, title: 'Long-Term Relationships', desc: 'Many of our clients keep coming back — that matters more to us than one-off deals.' },
];

const JOURNEY = [
  { year: 'Start', text: 'Founded by a team who had already shipped 70+ projects in AI, data science, and GUI application development.' },
  { year: 'Growth', text: 'Took on clients across Canada, Germany, the UK, Malaysia, Kuwait, and more.' },
  { year: 'Education', text: 'Launched Udemy courses and a structured internship program, now serving 8,000+ students.' },
  { year: 'Today', text: 'Codify Labs builds AI-powered software for businesses while continuing to train the next generation of AI/software talent.' },
];

export default function About() {
  useSeo({
    title: 'About Us',
    description: `Codify Labs is led by ${FOUNDER.name}, and builds AI-powered software for businesses across six countries — while training the next generation of AI and software talent.`,
    path: '/about',
  });
  useReveal();

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Who We Are"
        subtitle="Codify Labs builds AI-powered software for real businesses — and trains the next generation of AI and software talent along the way."
      />

      {/* -------------------------------------------------------- founder -- */}
      <section className="section-tight" style={{ paddingTop: 52 }}>
        <div className="container">
          <div className="founder" data-reveal>
            <div className="founder-media">
              <img
                src={FOUNDER.photo}
                alt={`${FOUNDER.name}, ${FOUNDER.role} of Codify Labs`}
                width="900"
                height="1511"
                loading="eager"
              />
              <span className="founder-badge">
                <strong>{FOUNDER.name}</strong>
                <span>{FOUNDER.role}</span>
              </span>
            </div>

            <div className="founder-copy">
              <span className="eyebrow">Leadership</span>
              <h2 className="h-section">{FOUNDER.name}</h2>
              <p className="founder-role">{FOUNDER.role}</p>
              {FOUNDER.bio.map(p => (
                <p key={p.slice(0, 30)} className="body-text" style={{ marginTop: 16 }}>{p}</p>
              ))}

              <ul className="founder-points">
                {FOUNDER.highlights.map(h => (
                  <li key={h} className="check-row"><IconCheck size={16} /> {h}</li>
                ))}
              </ul>

              <Link to="/courses" className="link-arrow" style={{ marginTop: 26 }}>
                See the book and courses <IconArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- team -- */}
      <section className="section bg-soft">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The Team</span>
            <h2 className="h-section">The People Building Your Software</h2>
            <p className="lede">A small team, each owning a specialism end to end.</p>
          </div>

          <div className="grid grid-4">
            {TEAM.map((m, i) => (
              <div key={m.role} className="card team-card" data-reveal data-reveal-delay={i * 60}>
                {m.photo
                  ? <img className="team-photo" src={m.photo} alt={m.name || m.role} loading="lazy" />
                  : <span className="team-initials" aria-hidden="true">{m.initials}</span>}
                {m.name && <div className="card-title" style={{ fontSize: 'var(--text-base)', marginBottom: 4 }}>{m.name}</div>}
                <div className="team-role">{m.role}</div>
                <span className="team-tag">{m.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- mission -- */}
      <section className="section">
        <div className="container-narrow">
          <div data-reveal>
            <span className="eyebrow">Our Mission</span>
            <p className="lede">
              To turn practical business problems into working AI and software solutions — and to make
              AI and software skills accessible to people who want to build a career in the field.
            </p>
          </div>

          <div className="about-stats" data-reveal>
            {STATS.map(s => (
              <div key={s.label}>
                <span className="about-stat-value">{s.value}</span>
                <span className="muted">{s.label}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 56 }} data-reveal>
            <span className="eyebrow">What We Believe</span>
            <div className="grid grid-3">
              {VALUES.map(v => (
                <div key={v.title} className="card">
                  <span className="icon-tile icon-tile-sm" style={{ marginBottom: 16 }}><v.icon size={20} /></span>
                  <h3 className="card-title" style={{ fontSize: 'var(--text-base)' }}>{v.title}</h3>
                  <p className="card-text">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 56 }} data-reveal>
            <span className="eyebrow">Our Journey</span>
            {/* A timeline, so the ordering carries real meaning. */}
            <ol className="journey">
              {JOURNEY.map(j => (
                <li key={j.year}>
                  <span className="journey-year">{j.year}</span>
                  <span className="journey-text">{j.text}</span>
                </li>
              ))}
            </ol>
          </div>

          <div style={{ marginTop: 56 }} data-reveal>
            <span className="eyebrow">Where We Work</span>
            <p className="body-text">
              We work remotely with clients across {SITE.countries.join(', ')} and beyond. Most projects
              run over WhatsApp and email, with regular check-ins at whatever cadence suits you.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- book -- */}
      <section className="section bg-soft">
        <div className="container">
          <div className="book-strip" data-reveal>
            <img className="book-strip-cover" src={BOOK.cover} alt={`Cover of ${BOOK.title} by ${BOOK.author}`} loading="lazy" />
            <div>
              <span className="eyebrow">Written by our founder</span>
              <h2 className="h-section" style={{ fontSize: 'var(--text-xl)' }}>{BOOK.title}</h2>
              <p className="body-text" style={{ marginTop: 12 }}>{BOOK.blurb}</p>
              <Link to="/courses" className="btn btn-secondary" style={{ marginTop: 22 }}>
                Read more about the book <IconArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Want to Work With Us?"
        subtitle="Whether it's a project or a learning opportunity, we'd love to hear from you."
      />

      <style>{`
        .founder {
          display: grid; grid-template-columns: 0.85fr 1.15fr;
          gap: 48px; align-items: center;
        }
        .founder-media { position: relative; }
        .founder-media img {
          width: 100%; height: auto; border-radius: var(--r-xl);
          background: linear-gradient(160deg, var(--bg-tint), var(--bg-soft));
          border: 1px solid var(--line);
          object-fit: cover; aspect-ratio: 4 / 5;
          object-position: center 12%;
        }
        .founder-badge {
          position: absolute; left: 18px; right: 18px; bottom: 18px;
          display: flex; flex-direction: column; gap: 2px;
          background: rgba(11,20,48,0.86);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: var(--r-md);
          padding: 13px 17px;
        }
        .founder-badge strong {
          font-family: var(--font-head); font-weight: 800;
          font-size: var(--text-base); color: #fff; letter-spacing: -0.01em;
        }
        .founder-badge span { font-size: var(--text-xs); color: rgba(255,255,255,0.7); }
        .founder-role {
          font-family: var(--font-head); font-weight: 700;
          font-size: var(--text-sm); color: var(--blue-700);
          letter-spacing: 0.02em; margin-top: 6px;
        }
        .founder-points {
          display: flex; flex-direction: column; gap: 11px;
          margin-top: 26px; padding-top: 24px;
          border-top: 1px solid var(--line);
        }

        .team-card { text-align: center; display: flex; flex-direction: column; align-items: center; }
        .team-photo {
          width: 84px; height: 84px; border-radius: 50%;
          object-fit: cover; margin-bottom: 16px;
          border: 3px solid var(--bg-tint);
        }
        .team-initials {
          display: flex; align-items: center; justify-content: center;
          width: 84px; height: 84px; border-radius: 50%; margin-bottom: 16px;
          background: linear-gradient(150deg, var(--navy-700), var(--navy-600));
          color: #fff; font-family: var(--font-head); font-weight: 800;
          font-size: 1.35rem; letter-spacing: 0.02em;
        }
        .team-role {
          font-size: var(--text-sm); color: var(--ink-2);
          line-height: 1.55; margin-bottom: 14px; flex: 1;
        }
        .team-tag {
          font-family: var(--font-head); font-size: 11px; font-weight: 700;
          letter-spacing: 0.09em; text-transform: uppercase;
          color: var(--blue-700); background: var(--bg-tint);
          border: 1px solid rgba(26,110,252,0.16);
          padding: 5px 12px; border-radius: var(--r-pill);
        }

        .about-stats {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 24px; margin-top: 40px;
          padding: 28px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
        }
        .about-stat-value {
          display: block; font-family: var(--font-head);
          font-size: 1.9rem; font-weight: 800; color: var(--blue-700);
          line-height: 1; margin-bottom: 6px;
          font-variant-numeric: tabular-nums; letter-spacing: -0.03em;
        }
        .journey { display: flex; flex-direction: column; }
        .journey li {
          display: grid; grid-template-columns: 110px 1fr; gap: 20px;
          padding: 20px 0; border-bottom: 1px solid var(--line);
          align-items: start;
        }
        .journey li:last-child { border-bottom: none; }
        .journey-year {
          font-family: var(--font-head); font-weight: 800; font-size: var(--text-sm);
          color: var(--blue-700); letter-spacing: 0.02em;
        }
        .journey-text { color: var(--ink-2); font-size: var(--text-sm); line-height: 1.75; }

        .book-strip {
          display: grid; grid-template-columns: 240px 1fr;
          gap: 40px; align-items: center;
        }
        .book-strip-cover {
          width: 100%; border-radius: var(--r-lg);
          border: 1px solid var(--line); box-shadow: var(--shadow-md);
        }

        @media (max-width: 900px) {
          .founder { grid-template-columns: 1fr; gap: 32px; }
          .founder-media { max-width: 420px; }
          .book-strip { grid-template-columns: 1fr; gap: 26px; }
          .book-strip-cover { max-width: 300px; }
        }
        @media (max-width: 560px) {
          .journey li { grid-template-columns: 1fr; gap: 6px; }
        }
      `}</style>
    </>
  );
}
