import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `className="mb-16 scroll-mt-8 rounded-3xl overflow-hidden py-8 px-6"`,
  `className="mb-16 scroll-mt-8 rounded-3xl overflow-hidden py-8"`
);

writeFileSync('app/page.js', content);
console.log('Done!');
