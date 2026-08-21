import React from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import useReveal from '../components/Reveal';
import { PageHero, SectionHead, CTABanner } from '../components/ui';
import { BOOK, bookOrderLink } from '../data/book';
import { FOUNDER } from '../data/team';
import { IconBrain, IconTarget, IconLayers, IconCheck, IconWhatsapp } from '../components/Icons';

const COURSES = [
  {
    icon: IconBrain,
    title: 'AI & Machine Learning: Foundations',
    level: 'Beginner to Intermediate',
    desc: 'From core ML concepts to training and deploying your own models, taught with practical, real-world projects.',
  },
  {
    icon: IconLayers,
    title: 'Applied AI & Deep Learning',
    level: 'Intermediate to Advanced',
    desc: 'A deeper track that goes beyond the fundamentals into advanced model building, tuning, and deployment.',
  },
  {
    icon: IconTarget,
    title: 'Your Custom Course',
    level: 'Tailored to You',
    desc: 'Tell us your goals and current level, and we’ll put together a course built around exactly what you want to learn.',
  },
];

export default function Courses() {
  useSeo({
    title: 'Courses & Book',
    description: `Practical, job-ready AI and software courses from Codify Labs, plus "${BOOK.title}" by ${BOOK.author} — a complete practical guide for students and beginners.`,
    path: '/courses',
  });
  useReveal();

  return (
    <>
      <PageHero
        eyebrow="Learning"
        title="Learn AI & Software Development"
        subtitle="Our Udemy courses have helped 8,000+ students learn practical, job-ready AI and software skills — and our founder's book covers the fundamentals from scratch."
      />

      {/* ---------------------------------------------------------- book -- */}
      <section className="section-tight" style={{ paddingTop: 48 }}>
        <div className="container">
          <div className="book" data-reveal>
            <div className="book-cover-wrap">
              <img
                className="book-cover"
                src={BOOK.cover}
                alt={`Cover of ${BOOK.title} by ${BOOK.author}`}
                width="1100"
                height="1100"
                loading="eager"
              />
            </div>

            <div className="book-copy">
              <span className="eyebrow">The Book</span>
              <h2 className="h-section">{BOOK.title}</h2>
              <p className="book-sub">{BOOK.subtitle}</p>
              <p className="book-author">by {BOOK.author}, {FOUNDER.role}</p>

              <p className="body-text" style={{ marginTop: 18 }}>{BOOK.blurb}</p>

              <ul className="book-features">
                {BOOK.features.map(f => (
                  <li key={f.title}>
                    <span className="book-feature-icon"><IconCheck size={15} /></span>
                    <span>
                      <strong>{f.title}</strong>
                      <span>{f.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="book-buy">
                <div className="book-price">
                  <span className="book-price-label">Price</span>
                  <span className="book-price-value">
                    {BOOK.price} <span>{BOOK.currency}</span>
                  </span>
                  <span className="book-format">{BOOK.format}</span>
                </div>
                <a
                  href={bookOrderLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <IconWhatsapp size={17} /> Order Your Copy
                </a>
              </div>
              <p className="muted" style={{ marginTop: 12, fontSize: 12 }}>
                Orders go to WhatsApp {BOOK.orderWhatsappDisplay}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- courses -- */}
      <section className="section bg-soft">
        <div className="container">
          <SectionHead
            eyebrow="Online Courses"
            title="Courses on Udemy"
            subtitle="Taken by 8,000+ students worldwide, with positive reviews from across the globe."
          />
          <div className="grid grid-3">
            {COURSES.map((c, i) => (
              <div key={c.title} className="card" data-reveal data-reveal-delay={i * 70}>
                <span className="icon-tile"><c.icon size={24} /></span>
                <span className="kicker">{c.level}</span>
                <h3 className="card-title">{c.title}</h3>
                <p className="card-text">{c.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <p className="body-text" style={{ maxWidth: '52ch', margin: '0 auto 22px' }}>
              All courses are published on Udemy. Reach out and we'll point you to the right one for
              where you're starting from.
            </p>
            <Link to="/contact" className="btn btn-primary">Ask About Courses</Link>
          </div>
        </div>
      </section>

      <CTABanner
        title="Prefer Hands-On Learning?"
        subtitle="Our internship program is structured, project-based training on real client work."
        primaryLabel="Apply for an Internship"
        primaryTo="/internship/apply"
      />

      <style>{`
        .book {
          display: grid; grid-template-columns: 0.9fr 1.1fr;
          gap: 52px; align-items: center;
        }
        .book-cover-wrap { position: relative; }
        .book-cover {
          width: 100%; height: auto; border-radius: var(--r-lg);
          border: 1px solid var(--line);
          box-shadow: var(--shadow-lg);
        }
        .book-sub {
          font-family: var(--font-head); font-weight: 700;
          font-size: var(--text-lg); color: var(--blue-700);
          margin-top: 8px; letter-spacing: -0.01em;
        }
        .book-author { font-size: var(--text-sm); color: var(--ink-3); margin-top: 8px; }

        .book-features {
          display: flex; flex-direction: column; gap: 14px;
          margin: 26px 0; padding: 22px 0;
          border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
        }
        .book-features li { display: flex; gap: 13px; align-items: flex-start; }
        .book-feature-icon {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; flex-shrink: 0; border-radius: 7px;
          background: var(--bg-tint); color: var(--blue-700);
          border: 1px solid rgba(26,110,252,0.16);
        }
        .book-features li > span:last-child { display: flex; flex-direction: column; gap: 2px; }
        .book-features strong {
          font-family: var(--font-head); font-weight: 700;
          font-size: var(--text-sm); color: var(--ink);
        }
        .book-features span span { font-size: var(--text-xs); color: var(--ink-2); line-height: 1.6; }

        .book-buy {
          display: flex; align-items: center; gap: 22px; flex-wrap: wrap;
        }
        .book-price { display: flex; flex-direction: column; gap: 2px; }
        .book-price-label {
          font-family: var(--font-head); font-size: 11px; font-weight: 700;
          letter-spacing: 0.11em; text-transform: uppercase; color: var(--ink-3);
        }
        .book-price-value {
          font-family: var(--font-head); font-size: 2rem; font-weight: 800;
          color: var(--ink); line-height: 1; letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums;
        }
        .book-price-value span { font-size: 0.95rem; color: var(--ink-3); font-weight: 700; }
        .book-format { font-size: var(--text-xs); color: var(--ink-3); margin-top: 4px; }

        @media (max-width: 900px) {
          .book { grid-template-columns: 1fr; gap: 32px; }
          .book-cover-wrap { max-width: 400px; margin: 0 auto; }
        }
      `}</style>
    </>
  );
}
