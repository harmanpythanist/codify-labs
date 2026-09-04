import React from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import useReveal from '../components/Reveal';
import { SectionHead, CTABanner } from '../components/ui';
import { SITE, WHATSAPP, STATS } from '../data/site';
import { SERVICES } from '../data/services';
import { PROJECTS } from '../data/projects';
import {
  IconWhatsapp, IconArrowRight, IconGraduationCap, IconVideo, IconMapPin, IconBookOpen,
  IconCheck,
} from '../components/Icons';

const HIGHLIGHTS = [
  { label: 'Published Author', desc: 'Our founder wrote the practical Python machine learning guide', icon: IconBookOpen },
  { label: 'Udemy Courses', desc: '8,000+ students enrolled, positive global reviews', icon: IconVideo },
  { label: 'Internship Program', desc: 'Hands-on internship with real project experience', icon: IconGraduationCap },
  { label: 'Client Retention', desc: 'Many clients across 9+ countries continue to return', icon: IconMapPin },
];

// The five services we lead with on the homepage.
const FEATURED = ['ai-machine-learning', 'computer-vision', 'ai-chatbots-nlp', 'website-development', 'data-analytics']
  .map(slug => SERVICES.find(s => s.slug === slug));

// The project count gets its own hero badge, so the panel carries the rest.
const HERO_PROOF = STATS.filter(s => s.label !== 'Projects Delivered');

// How an engagement actually runs — the thing serious clients look for.
const PROCESS = [
  { step: '01', title: 'Discovery', text: 'We start with your problem, your data, and your constraints — never a template.' },
  { step: '02', title: 'Scope & Plan', text: 'A written scope, architecture, and timeline you approve before a line of code is written.' },
  { step: '03', title: 'Build & Review', text: 'Short build cycles with working demos, so you see real software instead of status reports.' },
  { step: '04', title: 'Deliver & Support', text: 'Deployment, handover documentation, and continued support once you are live.' },
];

export default function Home() {
  useSeo({
    title: null,
    description: SITE.description,
    path: '/',
  });
  useReveal();

  return (
    <>
      {/* ---------------------------------------------------------- hero -- */}
      <section className="hero">
        <span className="hero-blob hero-blob-1" aria-hidden="true" />
        <span className="hero-blob hero-blob-2" aria-hidden="true" />
        <span className="hero-dots" aria-hidden="true" />

        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="hero-badge" data-reveal>
              <span className="hero-dot" aria-hidden="true" />
              AI-Powered Software Solutions
            </span>

            <h1 className="h-display" data-reveal data-reveal-delay="80">
              We provide<br />
              <span className="grad-text">reliable solutions</span>
            </h1>

            <p className="lede hero-lede" data-reveal data-reveal-delay="150">
              AI and machine learning, websites, computer vision, chatbots,
              image processing, data science.
            </p>

            <p className="proof-badge" data-reveal data-reveal-delay="210">
              <span className="proof-pre">over</span>
              <span className="proof-num">70+</span>
              <span className="proof-text">projects done</span>
            </p>

            <div className="hero-actions" data-reveal data-reveal-delay="270">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <IconWhatsapp size={17} /> Get in Touch
              </a>
              <Link to="/projects" className="btn btn-secondary">
                Explore Our Work <IconArrowRight size={16} />
              </Link>
            </div>

            <p className="hero-note" data-reveal data-reveal-delay="320">
              Usually replies within a day · No obligation, no sales pressure
            </p>
          </div>

          <aside className="hero-panel" data-reveal data-reveal-delay="200" aria-label="Codify Labs at a glance">
            <div className="panel-head">
              <span className="panel-dot" aria-hidden="true" />
              At a glance
            </div>

            <dl className="panel-stats">
              {HERO_PROOF.map(s => (
                <div key={s.label} className="panel-stat">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="panel-divider" aria-hidden="true" />

            <div className="panel-countries">
              <span className="panel-label">Trusted by clients in</span>
              <ul>
                {SITE.countries.map(c => (
                  <li key={c}><IconCheck size={13} /> {c}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* --------------------------------------------------------- about -- */}
      <section className="section bg-soft">
        <div className="container">
          <div className="about-split">
            <div data-reveal="left">
              <span className="eyebrow">About Us</span>
              <h2 className="h-section">Built by People Who've Shipped Real Products</h2>
              <p className="body-text" style={{ marginTop: 20 }}>
                Before starting Codify Labs, our founder and team worked on 70+ projects in data science,
                AI, and GUI application development for clients from Canada, Germany, the UK, Malaysia,
                Kuwait, and other countries.
              </p>
              <p className="body-text" style={{ marginTop: 14 }}>
                Many clients continue to work with us — which reflects the quality and reliability of our work.
              </p>
              <p className="body-text" style={{ marginTop: 14 }}>
                We also help students grow through hands-on training and internship programs, and have
                published multiple Udemy courses with 8,000+ enrolled students.
              </p>
              <Link to="/about" className="link-arrow" style={{ marginTop: 24 }}>
                More about us <IconArrowRight size={15} />
              </Link>
            </div>

            <div className="highlight-stack" data-reveal data-reveal-delay="120">
              {HIGHLIGHTS.map(item => (
                <div key={item.label} className="highlight">
                  <span className="icon-tile icon-tile-sm"><item.icon size={19} /></span>
                  <div>
                    <div className="card-title" style={{ fontSize: 'var(--text-base)', marginBottom: 4 }}>{item.label}</div>
                    <div className="card-text">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ services -- */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What We Do"
            title="Tech Services We Offer"
            subtitle="Ten specialisms, one team. Each one has its own page with what's included and the stack we use."
          />
          <div className="grid grid-3">
            {FEATURED.map((s, i) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="card card-link" data-reveal data-reveal-delay={i * 60}>
                <span className="icon-tile"><s.icon size={24} /></span>
                <h3 className="card-title">{s.label}</h3>
                <p className="card-text">{s.short}</p>
                <span className="link-arrow" style={{ marginTop: 16 }}>
                  Learn more <IconArrowRight size={15} />
                </span>
              </Link>
            ))}

            <Link to="/services" className="card card-link card-all" data-reveal data-reveal-delay="300">
              <h3 className="card-title">All {SERVICES.length} Services</h3>
              <p className="card-text">Automation, custom software, UI/UX, support and more.</p>
              <span className="link-arrow" style={{ marginTop: 16 }}>
                View everything <IconArrowRight size={15} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- process -- */}
      <section className="section bg-navy process">
        <span className="process-glow" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="section-head">
            <span className="eyebrow">How We Work</span>
            <h2 className="h-section" style={{ color: '#fff' }}>A Process You Can Plan Around</h2>
            <p className="lede process-lede">
              Every engagement runs the same four steps, so you always know what happens next — and what it costs.
            </p>
          </div>

          <ol className="process-grid">
            {PROCESS.map((p, i) => (
              <li key={p.step} className="process-step" data-reveal data-reveal-delay={i * 70}>
                <span className="process-num">{p.step}</span>
                <h3 className="process-title">{p.title}</h3>
                <p className="process-text">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------ projects -- */}
      <section className="section bg-soft">
        <div className="container">
          <SectionHead
            eyebrow="Selected Work"
            title="Real Projects, Real Problems"
            subtitle="A few of the systems we've designed, built, and shipped."
          />
          <div className="grid grid-2">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <Link key={p.slug} to={`/projects/${p.slug}`} className="card card-link project-preview" data-reveal data-reveal-delay={i * 70}>
                <span className="icon-tile"><p.icon size={24} /></span>
                <span className="kicker">{p.category}</span>
                <h3 className="card-title">{p.name}</h3>
                <p className="card-text">{p.summary}</p>
                <span className="link-arrow" style={{ marginTop: 16 }}>
                  Read case study <IconArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>

          <div className="projects-more" data-reveal>
            <Link to="/projects" className="btn btn-secondary">
              View all projects <IconArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        subtitle="Let's talk about your project. Reach out on WhatsApp and let's turn your vision into reality."
      />

      <style>{`
        .hero {
          position: relative; overflow: hidden;
          display: flex; align-items: center;
          min-height: min(88vh, 780px);
          padding: 76px 0 72px;
          background: linear-gradient(168deg, var(--bg-tint) 0%, var(--bg-soft) 55%, var(--bg) 100%);
        }
        .hero-blob { position: absolute; pointer-events: none; }
        .hero-blob-1 {
          top: -140px; right: -120px; width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(26,110,252,0.20) 0%, transparent 68%);
          animation: drift 14s ease-in-out infinite;
        }
        .hero-blob-2 {
          bottom: -160px; left: -140px; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(227,154,43,0.14) 0%, transparent 68%);
          animation: drift 18s ease-in-out infinite reverse;
        }
        .hero-dots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(30,45,94,0.11) 1px, transparent 1px);
          background-size: 30px 30px;
          -webkit-mask-image: radial-gradient(ellipse 74% 74% at 50% 46%, #000, transparent);
          mask-image: radial-gradient(ellipse 74% 74% at 50% 46%, #000, transparent);
        }
        .hero-inner {
          position: relative;
          display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
          gap: 60px; align-items: center;
        }
        .hero-copy { max-width: 640px; }
        .hero-lede { margin-top: 20px; max-width: 46ch; }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 9px;
          background: var(--surface); border: 1px solid var(--line-2);
          border-radius: var(--r-pill); padding: 7px 17px 7px 14px;
          font-size: var(--text-xs); font-weight: 600; color: var(--blue-700);
          font-family: var(--font-head);
          box-shadow: var(--shadow-sm);
          margin-bottom: 26px;
        }
        .hero-dot {
          width: 8px; height: 8px; border-radius: 50%; background: var(--blue-600);
          animation: soft-pulse 2.4s ease-in-out infinite;
        }
        .grad-text {
          background: linear-gradient(96deg, var(--blue-600) 10%, var(--navy-700) 92%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
        }

        /* --- project-count badge: serif italic on a navy plate --- */
        .proof-badge {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: baseline; gap: 13px;
          margin-top: 30px;
          padding: 15px 32px 17px;
          border-radius: var(--r-pill);
          background: linear-gradient(132deg, var(--navy-800) 0%, var(--navy-700) 58%, var(--blue-800) 100%);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 10px 26px rgba(19,32,72,0.28);
          font-family: var(--font-accent);
          font-style: italic;
          color: #fff;
          line-height: 1;
          cursor: default;
          transition: transform 0.28s cubic-bezier(0.22,0.8,0.3,1), box-shadow 0.28s ease, border-color 0.28s ease;
        }
        /* A slow sheen that drifts across the plate on its own, then rests. */
        .proof-badge::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.10) 50%, transparent 60%);
          transform: translateX(-130%);
          animation: badge-sheen 7s ease-in-out infinite;
          pointer-events: none;
        }
        /* A light sweep that runs across the plate on hover. */
        .proof-badge::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.16) 50%, transparent 62%);
          transform: translateX(-120%);
          transition: transform 0.7s cubic-bezier(0.22,0.8,0.3,1);
          pointer-events: none;
        }
        .proof-badge:hover {
          transform: translateY(-4px);
          border-color: rgba(227,154,43,0.5);
          box-shadow: 0 18px 40px rgba(19,32,72,0.36), 0 0 0 1px rgba(227,154,43,0.18);
        }
        .proof-badge:hover::after { transform: translateX(120%); }
        .proof-pre {
          font-size: var(--text-base); color: rgba(255,255,255,0.7);
          letter-spacing: 0.01em;
        }
        .proof-num {
          font-size: 2.7rem; font-weight: 700; letter-spacing: -0.015em;
          color: var(--amber-500);
          animation: num-glow 3.6s ease-in-out infinite;
          transition: color 0.28s ease;
        }
        .proof-badge:hover .proof-num { color: #F3B75E; }

        @keyframes badge-sheen {
          0%        { transform: translateX(-130%); }
          22%, 100% { transform: translateX(130%); }
        }
        @keyframes num-glow {
          0%, 100% { text-shadow: 0 1px 14px rgba(227,154,43,0.34); }
          50%      { text-shadow: 0 1px 22px rgba(227,154,43,0.60); }
        }
        .proof-text { font-size: 1.4rem; font-weight: 500; color: #fff; }

        .hero-actions { display: flex; gap: 13px; flex-wrap: wrap; margin-top: 32px; }
        .hero-note { margin-top: 20px; font-size: var(--text-xs); color: var(--ink-3); }

        /* ------------------------------------------------- hero panel -- */
        .hero-panel {
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid var(--line-2);
          border-radius: var(--r-xl);
          padding: 26px 28px 24px;
          box-shadow: var(--shadow-lg);
          transition: transform 0.28s cubic-bezier(0.22,0.8,0.3,1), box-shadow 0.28s ease, border-color 0.28s ease;
        }
        .hero-panel:hover {
          transform: translateY(-5px);
          border-color: var(--blue-500);
          box-shadow: 0 22px 48px rgba(15,23,41,0.14), 0 6px 12px rgba(15,23,41,0.05);
        }
        .panel-head {
          display: flex; align-items: center; gap: 9px;
          font-family: var(--font-head); font-size: var(--text-xs); font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3);
          padding-bottom: 16px;
        }
        .panel-dot {
          width: 7px; height: 7px; border-radius: 50%; background: var(--success);
          box-shadow: 0 0 0 3px rgba(23,128,61,0.14);
        }
        .panel-stats { display: flex; flex-direction: column; }
        .panel-stat {
          display: flex; align-items: baseline; justify-content: space-between; gap: 16px;
          padding: 13px 10px 13px 12px;
          margin: 0 -10px 0 -12px;
          border-top: 1px solid var(--line);
          border-radius: 10px;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .panel-stat:hover { background: var(--bg-tint); transform: translateX(3px); }
        .panel-stat dt { font-size: var(--text-sm); color: var(--ink-2); font-weight: 500; transition: color 0.2s ease; }
        .panel-stat:hover dt { color: var(--ink); }
        .panel-stat dd {
          font-family: var(--font-head); font-size: 1.6rem; font-weight: 800;
          color: var(--navy-700); letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums; line-height: 1;
          transition: color 0.2s ease;
        }
        .panel-stat:hover dd { color: var(--blue-700); }
        .panel-divider { height: 1px; background: var(--line); margin: 18px 0 16px; }
        .panel-label {
          display: block;
          font-family: var(--font-head); font-size: var(--text-xs); font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-3);
          margin-bottom: 12px;
        }
        .panel-countries ul { display: flex; flex-wrap: wrap; gap: 8px 18px; }
        .panel-countries li {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: var(--text-sm); font-weight: 600; color: var(--ink);
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .panel-countries li:hover { color: var(--blue-700); transform: translateY(-2px); }
        .panel-countries svg { color: var(--blue-700); flex-shrink: 0; }

        .about-split {
          display: grid; grid-template-columns: 1.15fr 1fr; gap: 56px; align-items: start;
        }
        .highlight-stack { display: flex; flex-direction: column; gap: 14px; }
        .highlight {
          display: flex; gap: 16px; align-items: flex-start;
          background: var(--surface); border: 1px solid var(--line);
          border-radius: var(--r-md); padding: 20px 22px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .highlight:hover { transform: translateX(5px); border-color: var(--blue-500); box-shadow: var(--shadow-md); }

        .card-all {
          display: flex; flex-direction: column; justify-content: center;
          background: linear-gradient(150deg, var(--navy-800), var(--navy-700));
          border-color: transparent; color: #fff;
        }
        .card-all .card-title { color: #fff; }
        .card-all .card-text { color: rgba(255,255,255,0.72); }
        .card-all .link-arrow { color: var(--blue-500); }
        .card-all:hover { border-color: var(--blue-500); }

        /* ---------------------------------------------------- process -- */
        .process { position: relative; overflow: hidden; }
        .process-glow {
          position: absolute; top: -180px; right: -140px;
          width: 520px; height: 520px; border-radius: 50%;
          background: radial-gradient(circle, rgba(74,141,253,0.22) 0%, transparent 68%);
          pointer-events: none;
        }
        .process-lede { color: rgba(255,255,255,0.74); }
        .process-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 20px;
        }
        .process-step {
          position: relative;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--r-lg);
          padding: 26px 24px 28px;
          transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
        }
        .process-step:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.09);
          border-color: var(--blue-500);
        }
        .process-num {
          display: block;
          font-family: var(--font-accent); font-style: italic;
          font-size: 2.1rem; font-weight: 600; line-height: 1;
          color: var(--blue-500); margin-bottom: 16px;
        }
        .process-title {
          font-family: var(--font-head); font-size: var(--text-lg); font-weight: 700;
          color: #fff; margin-bottom: 9px; letter-spacing: -0.01em;
        }
        .process-text { font-size: var(--text-sm); color: rgba(255,255,255,0.7); line-height: 1.7; }

        .project-preview .kicker { margin-top: 2px; }
        .projects-more { display: flex; justify-content: center; margin-top: 36px; }

        @media (max-width: 1000px) {
          .hero-inner { grid-template-columns: 1fr; gap: 40px; }
          .hero-copy { max-width: 720px; }
          .hero-panel { max-width: 520px; }
        }
        @media (max-width: 860px) {
          .about-split { grid-template-columns: 1fr; gap: 36px; }
        }
        @media (max-width: 640px) {
          .hero { min-height: auto; padding: 48px 0 52px; }
          .hero-actions .btn { flex: 1 1 100%; }
          .proof-badge { padding: 12px 22px 14px; gap: 10px; }
          .proof-pre { font-size: var(--text-sm); }
          .proof-num { font-size: 2.05rem; }
          .proof-text { font-size: 1.12rem; }
          .hero-panel { padding: 22px 20px 20px; }
          .panel-stat dd { font-size: 1.4rem; }
        }
      `}</style>
    </>
  );
}
