# Codify Labs Website — Setup Guide

React site with real URLs, a gallery, certificate verification, and SEO.

---

## Quick start

```bash
npm install
npm start
```

Opens at http://localhost:3000

---

## The things you need to do

### 1. Your logo — done

Your uploaded logo is in place and used everywhere: header, footer, browser tab,
home-screen icon, and the preview card shown when someone shares your link.

It was cropped tight (your original had 31% empty space above and 28% below) and
given a transparent background, so it sits cleanly on both the white header and
the navy footer. See **`public/LOGO.md`** for every generated file and how to
adjust the size.

To swap it later, replace `public/logo.png` and check `logo` in `src/data/site.js`.

---

### 2. Add your gallery photos

1. Put your image files in **`public/gallery/`**
   e.g. `public/gallery/team-2025.jpg`

2. Open **`src/data/gallery.js`** and add one line per photo:

   ```js
   export const GALLERY = [
     { src: '/gallery/team-2025.jpg', alt: 'The Codify Labs team', category: 'Team' },
     { src: '/gallery/office.jpg',    alt: 'Our workspace',        category: 'Workspace' },
   ];
   ```

3. Save. The grid, the category filters, and the lightbox all update themselves.

**Fields:**

| Field | Required | Notes |
|---|---|---|
| `src` | yes | Path inside `public/`, always starting with `/gallery/` |
| `alt` | yes | Describe the photo — read by screen readers, indexed by Google |
| `category` | yes | One of: Team, Workspace, Events, Projects, Certificates |
| `caption` | no | Shown on hover and in the lightbox |

**Tips**
- Landscape, ~1600px wide. Keep files under ~400KB (use tinypng.com).
- Lowercase filenames with dashes: `team-workshop-2025.jpg`
- Filters only appear for categories that actually have photos.
- Until you add any, the page shows a tidy "coming soon" message — safe to deploy now.

---

### 3. Turn on the forms

There are **two separate forms**, and both behave the same way:

| Form | Page | For |
|---|---|---|
| Project request | `/contact` | Clients enquiring about work |
| Internship application | `/internship/apply` | People applying to the programme |

Right now both open **WhatsApp** with every field pre-filled. That always works,
so you will never silently lose a lead or an application. If you'd rather have
submissions land in your inbox instead:

1. Go to https://web3forms.com, enter `codifylabs.pk@gmail.com`, get a free access key
2. Copy `.env.example` to `.env`
3. Set `REACT_APP_FORM_ENDPOINT=https://formspree.io/f/YOUR_ID` (or your Web3Forms URL)
4. Restart `npm start`

One endpoint serves both forms — each submission is labelled so you can tell them
apart. If the endpoint ever fails, the form shows an error with your WhatsApp and
email as fallbacks rather than pretending it sent.

**Neither form asks about money.** The project form has no budget field, and the
internship application has no fee or cost field — deliberately.

---

### 4. Add certificates

Open **`src/data/certificates.js`**. Both lists start **empty on purpose** — a
verification page that confirms a person who doesn't exist is worse than one that
returns nothing.

```js
export const students = [
  {
    code: 'STU-001',
    name: 'Real Full Name',
    course: 'AI & Machine Learning',
    date: 'December 2024',
    pdfUrl: 'https://drive.google.com/file/d/FILE_ID/preview',
  },
];
```

**Getting the Google Drive link:**
Upload the PDF → right-click → Share → "Anyone with the link" → Copy link →
change the ending from `/view?usp=sharing` to `/preview`.

> ⚠️ Everything in this file is public — it ships inside the JavaScript bundle, so
> anyone can read it with browser devtools. Don't put anything here you wouldn't put
> on a public page. To keep records private, move them behind an API route.

---

## QR codes on printed certificates

Point them at:
- Students: `https://codifylabspk.com/certificates/students`
- Interns: `https://codifylabspk.com/certificates/interns`

**Old QR codes still work.** Anything already printed with `?verify=students` or
`?verify=interns` redirects automatically to the new URLs.

---

## Where everything lives

```
public/
  gallery/            ← your gallery photos go here
  projects/           ← case-study screenshots go here
  index.html          meta tags, fonts, structured data
  logo.png            your logo — see LOGO.md for all the variants
  favicon.png         browser tab icon
  og-image.png        link-preview card
  robots.txt
  sitemap.xml         auto-generated, don't edit by hand

src/
  data/               ← EDIT THESE. Plain content, no code.
    site.js             email, WhatsApp, social links, stats
    services.js         the 10 services
    projects.js         case studies
    gallery.js          gallery photos
    certificates.js     certificate records
  pages/              one file per page
    Contact.js          project request form
    InternshipApply.js  internship application form
  components/         header, footer, logo, icons, shared UI
  hooks/useSeo.js     per-page titles and meta tags
  index.css           the design system — all colours live here
```

**To change contact details anywhere on the site**, edit `src/data/site.js` only.
Every page reads from it.

**To change the brand colours**, edit the `:root` block at the top of `src/index.css`.
Nothing is hardcoded elsewhere.

---

## Deploying to Vercel

```bash
git add .
git commit -m "Update site"
git push
```

Vercel redeploys in ~30 seconds.

`vercel.json` is already set up so that refreshing a deep link like
`/services/computer-vision` works instead of 404ing.

**First-time setup:** vercel.com → New Project → import the GitHub repo → Deploy.
If you set `REACT_APP_FORM_ENDPOINT` locally, add it under
Project Settings → Environment Variables too.

---

## Still to do

- [ ] Add gallery photos (`public/gallery/` + `src/data/gallery.js`)
- [ ] Add case-study screenshots (`public/projects/` + `image:` field in `projects.js`)
- [ ] Add real testimonials — the single highest-converting thing missing
- [ ] Point `SITE.url` in `src/data/site.js` at your real domain if it isn't codifylabs.pk
- [ ] Add analytics (Vercel Analytics is one click and needs no cookie banner)
- [ ] Add a privacy policy page — you collect names and emails from EU/UK visitors

---

## Handy commands

```bash
npm start      # dev server
npm run build  # production build (regenerates the sitemap first)
npm run sitemap # regenerate sitemap.xml only
```
