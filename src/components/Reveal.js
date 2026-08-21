import { useEffect } from 'react';

/**
 * Scroll-triggered reveal, done safely.
 *
 * The old version set `opacity: 0` inline on every element up front and relied
 * on JavaScript to bring it back. If JS failed — or a crawler never ran it —
 * the page stayed blank.
 *
 * This version is the other way round: content is visible by default, and JS
 * opts in by adding `.reveal-ready` to <html>. Only then does the CSS hide and
 * animate anything. It also bails out entirely when the visitor prefers
 * reduced motion, or when IntersectionObserver is unavailable.
 */

// Once we've had to fall back, stay fallen back for the rest of the session
// rather than re-hiding content on the next route change.
let disabledForSession = false;

export default function useReveal(deps = []) {
  useEffect(() => {
    if (disabledForSession) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') return undefined;

    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll('[data-reveal]:not(.is-visible)'));
    if (els.length === 0) return undefined;

    root.classList.add('reveal-ready');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = entry.target.dataset.revealDelay;
          if (delay) entry.target.style.animationDelay = `${delay}ms`;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => io.observe(el));

    /**
     * Safety net. If anything is still hidden after a beat — a stalled
     * observer, an animation that never ran because the tab was in the
     * background — drop the whole reveal system so the content simply shows.
     * Removing `.reveal-ready` is what makes this bulletproof: it deletes the
     * `opacity: 0` rule outright rather than depending on another animation.
     */
    let timer;
    const armFailsafe = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // A hidden tab pauses animations; wait until the visitor is actually
        // looking before deciding something went wrong.
        if (document.visibilityState !== 'visible') return;
        if (document.querySelector('[data-reveal]:not(.is-visible)')) {
          disabledForSession = true;
          root.classList.remove('reveal-ready');
          io.disconnect();
        }
      }, 2500);
    };

    armFailsafe();
    document.addEventListener('visibilitychange', armFailsafe);

    return () => {
      io.disconnect();
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', armFailsafe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
