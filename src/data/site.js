// ============================================================
// SITE-WIDE SETTINGS — edit contact details and links here only.
// Every page reads from this file, so you never have to hunt
// through components to change an email or a social link.
// ============================================================

export const SITE = {
  name: 'Codify Labs',
  tagline: 'Clean solutions. Real results.',
  description:
    'Codify Labs builds AI-powered software, websites, and custom applications for businesses worldwide — plus courses and internships for the next generation of AI talent.',

  // Set this to your live domain once deployed. Used for canonical URLs,
  // Open Graph tags, and sitemap.xml.
  url: 'https://codifylabspk.com',

  email: 'codifylabs.pk@gmail.com',

  // Digits only, with country code — used to build the wa.me link.
  whatsappNumber: '923329555307',
  whatsappDisplay: '+92 332 9555307',

  socials: {
    instagram: 'https://www.instagram.com/codifylabs.pk/',
    linkedin: 'https://www.linkedin.com/company/codifyylabs/',
  },

  countries: ['Canada', 'Germany', 'UK', 'Malaysia', 'Kuwait'],

  // ----------------------------------------------------------------
  // YOUR LOGO FILE
  //
  // Save your logo into the `public/` folder and name it here. The site
  // then uses that exact file — no redrawing, no approximation.
  //
  //   public/logo.png   ->   src: '/logo.png'
  //
  // `includesWordmark: true` means the file already has the words
  // "Codify Labs" in it (like your square logo), so the site will NOT
  // print the name again next to it.
  //
  // `srcOnDark` is optional: a white/light version for the dark footer
  // and any navy section. Leave it null and those places fall back to
  // the built-in vector penguin, which recolours itself automatically.
  // (A navy-on-white PNG would be invisible on a navy background.)
  //
  // If the file is missing, nothing breaks — the built-in penguin is
  // used instead.
  // ----------------------------------------------------------------
  logo: {
    src: '/logo.png',
    includesWordmark: true,
    srcOnDark: '/logo-white.png',
    alt: 'Codify Labs',
    scale: 1,               // nudge up/down if the logo reads small or large
  },
};

export const WHATSAPP = `https://wa.me/${SITE.whatsappNumber}`;

/** Build a WhatsApp deep link with a pre-filled message. */
export function whatsappLink(message) {
  return message
    ? `${WHATSAPP}?text=${encodeURIComponent(message)}`
    : WHATSAPP;
}

export const MAILTO = `mailto:${SITE.email}`;

export const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '8K+', label: 'Udemy Students' },
  { value: '6+', label: 'Countries Served' },
  { value: '3+', label: 'Years Experience' },
];
