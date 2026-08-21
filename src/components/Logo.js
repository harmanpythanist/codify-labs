import React, { useState } from 'react';
import { SITE } from '../data/site';

/**
 * The built-in vector penguin.
 *
 * This is a FALLBACK only. It is used when no logo file is present in
 * `public/`, and on dark backgrounds when no light version of your logo has
 * been supplied — because it recolours itself, which a navy-on-white PNG
 * cannot do.
 *
 * To use your real logo everywhere, drop the file into `public/` and point
 * `SITE.logo.src` at it in `src/data/site.js`.
 */
export function PenguinMark({ size = 34, className = '' }) {
  return (
    <svg
      width={size}
      height={size * (88 / 50)}
      viewBox="0 -2 50 88"
      className={className}
      role="img"
      aria-label="Codify Labs penguin"
      style={{ flexShrink: 0, overflow: 'visible' }}
    >
      {/* Head, beak, slender body and the wide flat feet as one silhouette */}
      <path
        fill="currentColor"
        d="M25.5 1.8c5 0 8.9 3.4 9.3 7.4l12 3c1 .3 1 1.5 0 1.8l-12.9 3.4c-.8 8.6-1.4 15.6-1.2 23.6.2 11 1 22 2.8 32 2 3 4.4 5.6 6.9 7.6 1.5 1.2.6 2.9-1.2 2.6-9-1.4-21-1.2-31 1.4-2.2.6-3.2-1.4-1.4-2.8 4.2-3.2 9-5.8 13.6-7.4-1.2-11-1.8-23-1.4-34 .3-9 .9-18 1.7-24.4-2.9-2.2-4.7-5.4-4.7-8.6 0-4.6 4.3-8.6 9.5-8.6z"
      />
      {/* Flipper, knocked out of the body */}
      <path
        fill="var(--logo-cut, #fff)"
        d="M27.5 22c-3 8-4.3 17-3.9 26 .3 7 1.6 14 3.8 20-3.8-6-6-14-6.4-22-.4-9 1.8-18 6.5-24z"
      />
      {/* Eye */}
      <circle cx="24" cy="8.6" r="2" fill="var(--logo-cut, #fff)" />
      {/* The small companion drop that sits to the left in the brand mark */}
      <path
        fill="currentColor"
        d="M6.2 55c2.4 4.5 3.8 8.6 3.8 11.6 0 3.8-1.7 6.2-4.2 6.2s-4.2-2.4-4.2-6.2c0-3 1.8-7.4 4.6-11.6z"
      />
    </svg>
  );
}

/**
 * The brand lockup used in the header, footer and 404 page.
 *
 * Order of preference:
 *   1. Your real logo file from `SITE.logo` (exact, untouched)
 *   2. The built-in vector penguin, if that file is missing or fails to load
 *
 * `tone="light"` is for dark backgrounds.
 */
export default function Logo({ size = 30, tone = 'dark', showText = true }) {
  const [failed, setFailed] = useState(false);
  const isLight = tone === 'light';

  const { src, srcOnDark, includesWordmark, alt, scale = 1 } = SITE.logo || {};
  // On a dark background, only use an image if a light version exists.
  const file = isLight ? srcOnDark : src;
  const useFile = Boolean(file) && !failed;

  // A file containing the wordmark has to carry the whole lockup, so it needs
  // more height than a bare mark sitting next to live text. `scale` in
  // src/data/site.js nudges this if your file has a lot of padding around the
  // artwork.
  const imgHeight = (includesWordmark ? size * 1.55 : size * 1.35) * scale;

  if (useFile) {
    return (
      <img
        src={file}
        alt={alt || SITE.name}
        height={imgHeight}
        style={{ height: imgHeight, width: 'auto', objectFit: 'contain', flexShrink: 0 }}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 11,
        color: isLight ? '#FFFFFF' : 'var(--navy-700)',
        // The flipper and eye are knocked out in the background colour.
        '--logo-cut': isLight ? 'var(--navy-900)' : '#FFFFFF',
      }}
    >
      <PenguinMark size={size} />
      {showText && (
        <span
          style={{
            fontFamily: 'var(--font-head)',
            fontWeight: 800,
            fontSize: size * 0.62,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {SITE.name}
        </span>
      )}
    </span>
  );
}
