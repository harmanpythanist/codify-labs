import React, { useState } from 'react';
import { SITE } from '../data/site';

/**
 * The brand lockup used in the header, footer and 404 page.
 *
 * Always renders the real logo file from `SITE.logo` — there is deliberately
 * no drawn stand-in anywhere in this codebase, so a penguin that isn't yours
 * can never appear on the site. If a file ever fails to load, this falls back
 * to the wordmark set in the brand font rather than a substitute mark.
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

  // Text-only fallback. No substitute artwork.
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        color: isLight ? '#FFFFFF' : 'var(--navy-700)',
        fontFamily: 'var(--font-head)',
        fontWeight: 800,
        fontSize: size * 0.66,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {showText ? SITE.name : ''}
    </span>
  );
}
