import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `{/* SECTION: Books */}
        <section id="books" className="mb-16 scroll-mt-8">`,
  `{/* SECTION: Books */}
        <section id="books" className="mb-16 scroll-mt-8 rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #BE123C 0%, #EA580C 25%, #D97706 55%, #FCD34D 80%, #FEF9C3 100%)' }}>`
);

writeFileSync('app/page.js', content);
console.log('Done!');
