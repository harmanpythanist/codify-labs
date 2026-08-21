// ============================================================
// THE BOOK
//
// Details taken from your promotional poster. Change anything
// here — price, order number, feature list — and the Courses
// page updates itself.
//
// NOTE: `orderWhatsapp` below is the number printed on your
// poster (0328 4884150), which is DIFFERENT from the main site
// number in site.js (0332 9555307). If book orders should go to
// the main number instead, change it here.
// ============================================================

export const BOOK = {
  title: 'Machine Learning with Python',
  subtitle: 'From Concepts to Real-World Applications',
  author: 'Harman Abdul Waheed',
  cover: '/book/master-machine-learning.jpg',
  blurb: 'A complete practical guide for students and beginners — built around the idea that Pakistan does not just need users of technology, it needs creators.',
  features: [
    { title: 'Clear Concepts', desc: 'Explained in simple language, without assuming a maths background.' },
    { title: 'Practical Examples', desc: 'Every concept comes with a working Python implementation.' },
    { title: 'Built for Beginners', desc: 'Starts from the fundamentals and builds up to real applications.' },
  ],
  price: '1,000',
  currency: 'PKR',
  format: 'Hard copy, delivered to your doorstep',

  // Digits only, with country code.
  orderWhatsapp: '923284884150',
  orderWhatsappDisplay: '0328 4884150',
};

export const bookOrderLink = () =>
  `https://wa.me/${BOOK.orderWhatsapp}?text=` +
  encodeURIComponent(
    `Hi! I'd like to order a copy of "${BOOK.title}" by ${BOOK.author} (${BOOK.currency} ${BOOK.price}). Please let me know the next steps.`
  );
