// ============================================================
// GALLERY — HOW TO ADD YOUR IMAGES
//
// 1. Put your image files in:  public/gallery/
//    e.g.  public/gallery/team-workshop.jpg
//
// 2. Add one entry to the GALLERY list below:
//
//      {
//        src: '/gallery/team-workshop.jpg',   // path inside public/
//        alt: 'The team running a workshop',  // describe the photo
//        category: 'Team',                    // must match a CATEGORIES entry
//        caption: 'Weekly internal workshop', // optional, shown in lightbox
//      },
//
// 3. Save. That's it — the grid, filters, and lightbox update themselves.
//
// TIPS
// - Landscape images around 1600px wide look best. Keep files under ~400KB.
// - `alt` matters: it is read aloud by screen readers and indexed by Google.
// - To add a new filter, add the name to CATEGORIES and use it on an item.
// - Until you add entries, the page shows a friendly "coming soon" state
//   instead of an empty grid, so it is safe to deploy right now.
// ============================================================

export const CATEGORIES = ['All', 'Team', 'Workspace', 'Events', 'Projects', 'Certificates'];

export const GALLERY = [
  {
    src: '/gallery/meet-the-team.jpg',
    alt: 'The Codify Labs team: computer vision lead, machine learning, Python development, and web development',
    category: 'Team',
    caption: 'Meet the team behind your software',
  },
  {
    src: '/gallery/crafting-solutions.jpg',
    alt: 'Two Codify Labs developers reviewing code together on a laptop',
    category: 'Workspace',
    caption: 'Build, experiment, fail, improve',
  },

  // Add more images here, one line each:
  // { src: '/gallery/your-file.jpg', alt: 'Describe the photo', category: 'Events', caption: 'Optional caption' },
];

/** Categories that actually have at least one image, so empty filters never show. */
export function activeCategories() {
  const used = new Set(GALLERY.map(g => g.category));
  return CATEGORIES.filter(c => c === 'All' || used.has(c));
}
