# Logo files

**These were all generated from the logo you uploaded.** Nothing here is redrawn
or approximated — the artwork is your original file, cropped and recoloured.

| File | Size | Where it's used |
|---|---|---|
| `logo.png` | 615×286 | Header, and anywhere on a light background |
| `logo-white.png` | 615×286 | The dark navy footer |
| `logo-mark.png` | 183×286 | The penguin on its own, no wordmark |
| `logo-icon.png` | 314×314 | Square tile, navy background |
| `favicon.png` | 64×64 | The icon in the browser tab |
| `apple-touch-icon.png` | 180×180 | Home-screen icon on iOS |
| `og-image.png` | 1200×630 | The preview card when your link is shared |

All of them have **transparent backgrounds** (except the tile and preview card,
which are deliberately navy), so they sit cleanly on any colour.

---

## What was done to your original

Your file was a 640×640 square with the artwork floating in the middle:

- **31% empty space at the top, 28% at the bottom.** At header size that left
  your artwork only ~24px tall, with the two text lines around 11px — too small
  to read. It's now cropped tight to the artwork.
- **The white background was removed.** Each pixel's transparency is set from how
  dark it is, so the anti-aliased edges stay smooth rather than showing a white
  fringe. That's what makes the white version possible for the navy footer.
- Your brand navy measured **#1a2a57**, which is within a hair of the site's
  `--navy-700` (#1E2D5E) — so the logo and the site palette already match.

---

## Changing how it appears

Everything is controlled from `src/data/site.js`:

```js
logo: {
  src: '/logo.png',
  includesWordmark: true,        // the file already says "Codify Labs"
  srcOnDark: '/logo-white.png',  // used on the navy footer
  alt: 'Codify Labs',
  scale: 1,                      // raise to 1.2 to make it bigger
}
```

**If you'd rather the header showed just the penguin** with "Codify Labs" set in
the site's heading font beside it:

```js
src: '/logo-mark.png',
includesWordmark: false,
```

**If it looks too small or too large**, change `scale` — nothing else.

---

## Regenerating these

If you ever replace the source logo, the script that built these lives in the
scratchpad and can be rebuilt on request. Or supply an `.svg` from your designer
and set `src: '/logo.svg'` — a vector stays perfectly sharp at every size and
would be a small upgrade over these PNGs.
