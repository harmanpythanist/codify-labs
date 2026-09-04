// ============================================================
// CERTIFICATE RECORDS
//
// These lists are intentionally EMPTY. Any code that is not listed
// here correctly reports "not found" — which is what a verification
// page must do. Never leave example or placeholder people in here:
// a verification page that confirms someone who does not exist is
// worse than one that returns nothing.
//
// HOW TO ADD A REAL CERTIFICATE
// 1. Upload the PDF to Google Drive
// 2. Right-click -> Share -> "Anyone with the link" -> Copy link
// 3. Change the tail of the link from:
//      https://drive.google.com/file/d/FILE_ID/view?usp=sharing
//    to:
//      https://drive.google.com/file/d/FILE_ID/preview
// 4. Add an entry to the matching list below.
//
// NOTE: everything in this file is public — it ships inside the
// JavaScript bundle. Do not put anything here you would not put on
// a public page. See README for moving this to a private sheet.
// ============================================================

export const students = [
     {
       code: '3520153324000',
       name: 'Zunaira Khalid',
       course: 'AI & Machine Learning',
       date: '5 August 2026',
       pdfUrl: 'https://drive.google.com/file/d/1cJDyy7FCkqzG9Q3hiKDIgTQDQv6zOhPv/view?usp=sharing',
   }
];

export const interns = [
   {
     code: '3520203699331',
     name: 'Yashwa',
     role: 'Website Development & Design',
     date: '25 August 2026',
     pdfUrl: 'https://drive.google.com/file/d/1kQP_BiMiqyNfc2yK3rDf66v-zoP9UIAE/view?usp=sharing',
   },
   {
     code: '3460352356039',
     name: 'Izhaan',
     role: 'Computer Vision, ML, and Management',
     date: '25 August 2026',
     pdfUrl: 'https://drive.google.com/file/d/1bwP9fibjJWT7_S5RD0KDVpT0-wKUp_YX/view?usp=sharing',
   }
];
