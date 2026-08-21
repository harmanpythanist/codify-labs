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
} from '../components/Icons';

const HIGHLIGHTS = [
  { label: 'Published Author', desc: 'Our founder wrote the practical Python machine learning guide', icon: IconBookOpen },
  { label: 'Udemy Courses', desc: '8,000+ students enrolled, positive global reviews', icon: IconVideo },
  { label: 'Internship Program', desc: 'Hands-on internship with real project experience', icon: IconGraduationCap },
  { label: 'Client Retention', desc: 'Many clients across 6+ countries continue to return', icon: IconMapPin },
];

// The five services we lead with on the homepage.
const FEATURED = ['ai-machine-learning', 'computer-vision', 'ai-chatbots-nlp', 'website-development', 'data-analytics']
  .map(slug => SERVICES.find(s => s.slug === slug));

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
              We Turn Ideas Into<br />
              <span className="grad-text">Practical Software</span>
            </h1>

            <p className="lede" data-reveal data-reveal-delay="160" style={{ marginTop: 20 }}>
              At Codify Labs, we build AI-powered desktop applications, websites, and custom
              AI solutions — for clients across {SITE.countries.slice(0, -1).join(', ')}, {SITE.countries.slice(-1)}, and more.
            </p>

            <div className="hero-actions" data-reveal data-reveal-delay="240">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <IconWhatsapp size={17} /> Get in Touch
              </a>
              <Link to="/projects" className="btn btn-secondary">
                Explore Our Work <IconArrowRight size={16} />
              </Link>
            </div>

            <p className="hero-note" data-reveal data-reveal-delay="300">
              Trusted by clients in {SITE.countries.length}+ countries · Usually replies within a day
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- stats -- */}
      <section className="section-sm">
        <div className="container">
          <div className="grid grid-4">
            {STATS.map((s, i) => (
              <div key={s.label} className="stat" data-reveal data-reveal-delay={i * 70}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
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
                Before starting Codify Labs, our founder and team worked on 50+ projects in data science,
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
        </div>
      </section>

      <CTABanner
        subtitle="Let's talk about your project. Reach out on WhatsApp and let's turn your vision into reality."
      />

      <style>{`
        .hero {
          position: relative; overflow: hidden;
          display: flex; align-items: center;
          min-height: min(86vh, 760px);
          padding: 72px 0 64px;
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
        .hero-inner { position: relative; }
        .hero-copy { max-width: 760px; }

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
        .hero-actions { display: flex; gap: 13px; flex-wrap: wrap; margin-top: 36px; }
        .hero-note { margin-top: 22px; font-size: var(--text-xs); color: var(--ink-3); }

        .stat {
          background: linear-gradient(150deg, var(--bg-soft), var(--bg-tint));
          border: 1px solid var(--line);
          border-radius: var(--r-lg);
          padding: 28px 22px; text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .stat:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
        .stat-value {
          display: block;
          font-family: var(--font-head); font-size: 2.4rem; font-weight: 800;
          color: var(--blue-700); line-height: 1; margin-bottom: 8px;
          font-variant-numeric: tabular-nums; letter-spacing: -0.03em;
        }
        .stat-label { font-size: var(--text-xs); color: var(--ink-2); font-weight: 600; }

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

        .project-preview .kicker { margin-top: 2px; }

        @media (max-width: 860px) {
          .about-split { grid-template-columns: 1fr; gap: 36px; }
        }
        @media (max-width: 640px) {
          .hero { min-height: auto; padding: 48px 0 52px; }
          .hero-actions .btn { flex: 1 1 100%; }
          .stat-value { font-size: 2rem; }
        }
      `}</style>
    </>
  );
}
