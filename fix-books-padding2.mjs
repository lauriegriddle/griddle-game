import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `<section id="books" className="mb-16 scroll-mt-8 rounded-3xl overflow-hidden"`,
  `<section id="books" className="mb-16 scroll-mt-8 rounded-3xl overflow-hidden" `
);

content = content.replace(
  `{/* SECTION: Books */}
        <section id="books" className="mb-16 scroll-mt-8 rounded-3xl overflow-hidden" style={{ background:`,
  `{/* SECTION: Books */}
        <section id="books" className="mb-16 scroll-mt-8 rounded-3xl overflow-hidden px-4 pt-8 pb-10" style={{ background:`
);

writeFileSync('app/page.js', content);
console.log('Done!');
