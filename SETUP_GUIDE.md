# Codify Labs Website — Setup Guide

## What's in this project
- **Home** — Company info, services, stats
- **Students** — Certificate verification by code
- **Interns** — Certificate verification by code
- QR code on certificates → scan → enter code → PDF opens

---

## STEP 1: Install Required Tools

1. Download and install **Node.js** from https://nodejs.org (choose LTS version)
2. Download and install **VS Code** from https://code.visualstudio.com
3. Create a free account at **https://vercel.com** (sign up with GitHub)
4. Create a free account at **https://github.com**

---

## STEP 2: Set Up the Project

1. Open VS Code
2. Open the terminal in VS Code: **Terminal → New Terminal**
3. Navigate to the project folder:
   ```
   cd path/to/codify-labs
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Run locally to test:
   ```
   npm start
   ```
   → Opens at http://localhost:3000

---

## STEP 3: Add Certificates

Open the file: `src/certificates.js`

For each student or intern, add an entry like this:

### For Students:
```js
{
  code: "STU-001",          // ← code printed on certificate
  name: "Ali Hassan",       // ← full name
  course: "AI & Machine Learning",
  date: "December 2024",
  pdfUrl: "https://drive.google.com/file/d/FILE_ID/preview",
},
```

### For Interns:
```js
{
  code: "INT-001",
  name: "Umar Ahmed",
  role: "AI Engineer Intern",
  date: "December 2024",
  pdfUrl: "https://drive.google.com/file/d/FILE_ID/preview",
},
```

### How to get a Google Drive PDF link:
1. Upload the PDF to Google Drive
2. Right-click the file → **Share** → **Anyone with the link**
3. Click **Copy link** — you get something like:
   `https://drive.google.com/file/d/1aBcD.../view?usp=sharing`
4. Change the end from `/view?usp=sharing` to `/preview`:
   `https://drive.google.com/file/d/1aBcD.../preview`
5. Paste that as the `pdfUrl`

---

## STEP 4: Deploy to Vercel (Free)

### First time:
1. Push your project to GitHub:
   - Go to github.com → New Repository → name it `codify-labs`
   - In VS Code terminal:
     ```
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/codify-labs.git
     git push -u origin main
     ```

2. Go to **vercel.com** → **New Project** → Import from GitHub
3. Select your `codify-labs` repo
4. Click **Deploy** — done! You get a URL like `codify-labs.vercel.app`

### Every time you add a new certificate:
1. Edit `src/certificates.js`
2. In terminal:
   ```
   git add .
   git commit -m "Added new certificate"
   git push
   ```
3. Vercel auto-deploys in ~30 seconds ✓

---

## STEP 5: Make the QR Code

1. Go to **qr-code-generator.com** or **qrcode-monkey.com**
2. Paste your verify URL:
   - For students: `https://YOUR-SITE.vercel.app?verify=students`
   - For interns:  `https://YOUR-SITE.vercel.app?verify=interns`
3. Download as PNG
4. Add this QR code image to your certificate design (in Canva, Word, etc.)

---

## STEP 6: Certificate Codes

You decide the codes. Recommended format:
- Students: `STU-001`, `STU-002`, `STU-003`...
- Interns:  `INT-001`, `INT-002`, `INT-003`...

Print the code visibly on each certificate (e.g. bottom corner).
The person scans the QR → lands on verify page → types their code → PDF opens.

---

## Updating Company Info

To update text on the Home page, edit: `src/components/Home.js`
To update contact email, search for `contact@codifylabs.com` and replace it.

---

## Summary of Files to Know

| File | What it does |
|------|-------------|
| `src/certificates.js` | Add/edit student & intern certificates here |
| `src/components/Home.js` | Company info, services, stats |
| `src/components/CertificatePage.js` | Verify page (same for students & interns) |
| `src/components/Navbar.js` | Top navigation bar |
| `src/App.js` | Main app, handles navigation |
