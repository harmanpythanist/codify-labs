import React, { useState, useEffect, useCallback, useMemo } from 'react';
import useSeo from '../hooks/useSeo';
import useReveal from '../components/Reveal';
import { PageHero, CTABanner, EmptyState } from '../components/ui';
import { GALLERY, activeCategories } from '../data/gallery';
import { IconImage, IconClose, IconArrowLeft, IconArrowRight } from '../components/Icons';

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={item.alt}>
      <button className="lb-backdrop" onClick={onClose} aria-label="Close image viewer" />

      <button className="lb-btn lb-close" onClick={onClose} aria-label="Close">
        <IconClose size={22} />
      </button>

      {items.length > 1 && (
        <button className="lb-btn lb-prev" onClick={onPrev} aria-label="Previous image">
          <IconArrowLeft size={22} />
        </button>
      )}

      <figure className="lb-figure">
        <img src={item.src} alt={item.alt} />
        <figcaption>
          <span>{item.caption || item.alt}</span>
          <span className="lb-count">{index + 1} / {items.length}</span>
        </figcaption>
      </figure>

      {items.length > 1 && (
        <button className="lb-btn lb-next" onClick={onNext} aria-label="Next image">
          <IconArrowRight size={22} />
        </button>
      )}

      <style>{`
        .lb {
          position: fixed; inset: 0; z-index: 300;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: rise 0.22s ease both;
        }
        .lb-backdrop {
          position: absolute; inset: 0;
          background: rgba(6,13,32,0.92);
          backdrop-filter: blur(6px);
          border: none; cursor: zoom-out;
        }
        .lb-figure {
          position: relative; z-index: 1;
          max-width: min(1100px, 92vw); max-height: 86vh;
          display: flex; flex-direction: column; gap: 14px;
        }
        .lb-figure img {
          max-width: 100%; max-height: 76vh;
          object-fit: contain;
          border-radius: var(--r-md);
          box-shadow: 0 24px 70px rgba(0,0,0,0.5);
          margin: 0 auto;
        }
        .lb-figure figcaption {
          display: flex; justify-content: space-between; align-items: center;
          gap: 16px; flex-wrap: wrap;
          color: rgba(255,255,255,0.86); font-size: var(--text-sm);
        }
        .lb-count { color: rgba(255,255,255,0.55); font-size: var(--text-xs); font-variant-numeric: tabular-nums; }
        .lb-btn {
          position: absolute; z-index: 2;
          display: flex; align-items: center; justify-content: center;
          width: 46px; height: 46px; border-radius: 50%;
          background: rgba(255,255,255,0.12); color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          transition: background-color 0.18s ease, transform 0.18s ease;
        }
        .lb-btn:hover { background: rgba(255,255,255,0.24); transform: scale(1.06); }
        .lb-close { top: 20px; right: 20px; }
        .lb-prev { left: 20px; }
        .lb-next { right: 20px; }
        .lb :focus-visible { outline-color: #fff; }
        @media (max-width: 640px) {
          .lb { padding: 12px; }
          .lb-prev { left: 8px; } .lb-next { right: 8px; }
          .lb-btn { width: 40px; height: 40px; }
        }
      `}</style>
    </div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  useSeo({
    title: 'Gallery',
    description: 'Photos from inside Codify Labs — the team, the workspace, events, and the projects we build.',
    path: '/gallery',
  });
  useReveal([filter]);

  const categories = useMemo(() => activeCategories(), []);
  const shown = useMemo(
    () => (filter === 'All' ? GALLERY : GALLERY.filter(g => g.category === filter)),
    [filter]
  );

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(() => setOpenIndex(i => (i - 1 + shown.length) % shown.length), [shown.length]);
  const next = useCallback(() => setOpenIndex(i => (i + 1) % shown.length), [shown.length]);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Inside Codify Labs"
        subtitle="The team, the workspace, our events, and the work we ship. A look at who you'd be working with."
      />

      <section className="section-tight" style={{ paddingTop: 44 }}>
        <div className="container">
          {GALLERY.length === 0 ? (
            <EmptyState icon={IconImage} title="Photos coming soon">
              We're putting this gallery together right now. In the meantime, have a look at
              our <a href="/projects" style={{ color: 'var(--blue-700)', fontWeight: 600 }}>case studies</a> to
              see what we build.
            </EmptyState>
          ) : (
            <>
              {categories.length > 2 && (
                <div className="filter-row" role="group" aria-label="Filter gallery by category">
                  {categories.map(c => (
                    <button
                      key={c}
                      onClick={() => { setFilter(c); setOpenIndex(null); }}
                      className={`filter-chip ${filter === c ? 'is-active' : ''}`}
                      aria-pressed={filter === c}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}

              <div className="gallery-grid">
                {shown.map((item, i) => (
                  <button
                    key={item.src}
                    className="gallery-tile"
                    onClick={() => setOpenIndex(i)}
                    data-reveal
                    data-reveal-delay={Math.min(i, 8) * 55}
                    aria-label={`Open image: ${item.alt}`}
                  >
                    <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                    <span className="gallery-overlay">
                      <span className="gallery-caption">{item.caption || item.alt}</span>
                      <span className="gallery-cat">{item.category}</span>
                    </span>
                  </button>
                ))}
              </div>

              <p className="muted" style={{ marginTop: 26, textAlign: 'center' }}>
                Showing {shown.length} of {GALLERY.length} {GALLERY.length === 1 ? 'photo' : 'photos'}
              </p>
            </>
          )}
        </div>
      </section>

      {openIndex !== null && (
        <Lightbox items={shown} index={openIndex} onClose={close} onPrev={prev} onNext={next} />
      )}

      <CTABanner
        title="Want to Join the Team?"
        subtitle="We take on interns across AI, web, and data every few months. Tell us which track interests you."
        primaryLabel="Apply for an Internship"
        primaryTo="/internship/apply"
      />

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
        .filter-chip.is-active {
          background: var(--blue-700); color: #fff; border-color: var(--blue-700);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(258px, 1fr));
          gap: 16px;
        }
        .gallery-tile {
          position: relative; display: block; padding: 0;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: var(--r-md);
          border: 1px solid var(--line);
          background: var(--bg-soft);
          cursor: zoom-in;
          transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
        }
        .gallery-tile img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.42s cubic-bezier(0.22,0.8,0.3,1);
        }
        .gallery-tile:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--blue-500); }
        .gallery-tile:hover img { transform: scale(1.06); }

        .gallery-overlay {
          position: absolute; inset: auto 0 0 0;
          display: flex; flex-direction: column; align-items: flex-start; gap: 5px;
          padding: 34px 16px 14px;
          background: linear-gradient(to top, rgba(6,13,32,0.9), rgba(6,13,32,0));
          opacity: 0; transition: opacity 0.24s ease;
          text-align: left;
        }
        .gallery-tile:hover .gallery-overlay,
        .gallery-tile:focus-visible .gallery-overlay { opacity: 1; }
        .gallery-caption {
          color: #fff; font-family: var(--font-head);
          font-size: var(--text-sm); font-weight: 700; line-height: 1.35;
        }
        .gallery-cat {
          color: rgba(255,255,255,0.7); font-size: 11px;
          text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;
        }

        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 11px; }
          .gallery-overlay { opacity: 1; padding: 26px 11px 10px; }
          .gallery-caption { font-size: var(--text-xs); }
        }
      `}</style>
    </>
  );
}
