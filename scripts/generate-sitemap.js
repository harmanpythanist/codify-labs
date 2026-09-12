/* eslint-disable */
/**
 * Regenerates public/sitemap.xml from the site's routes.
 *
 * Run it after adding a service, a project, or a new page:
 *   npm run sitemap
 *
 * It also runs automatically before every `npm run build`.
 */
const fs = require('fs');
const path = require('path');

const BASE = 'https://codifylabspk.com';

/** Pull the slugs straight out of the data files so they can never drift. */
function slugsFrom(file) {
  const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', file), 'utf8');
  return [...src.matchAll(/^\s*slug:\s*'([^']+)'/gm)].map(m => m[1]);
}

const serviceSlugs = slugsFrom('services.js');
const projectSlugs = slugsFrom('projects.js');

// /labs is intentionally absent: it is the private, password-gated section
// and is also disallowed in public/robots.txt.
const routes = [
  ['/', '1.0'],
  ['/services', '0.9'],
  ['/projects', '0.9'],
  ['/contact', '0.8'],
  ['/courses', '0.8'],
  ['/internship', '0.8'],
  ['/internship/apply', '0.7'],
  ['/gallery', '0.7'],
  ['/about', '0.7'],
  ['/certificates', '0.6'],
  ['/certificates/students', '0.5'],
  ['/certificates/interns', '0.5'],
  ...serviceSlugs.map(s => [`/services/${s}`, '0.8']),
  ...projectSlugs.map(s => [`/projects/${s}`, '0.7']),
];

const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(([loc, priority]) =>
    `  <url>\n    <loc>${BASE}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), xml);
console.log(
  `sitemap.xml written — ${routes.length} URLs ` +
  `(${serviceSlugs.length} services, ${projectSlugs.length} projects)`
);
