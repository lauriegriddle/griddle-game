import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `<p className="text-amber-600">Our daily puzzles</p>`,
  `<p className="text-amber-600">Six daily puzzles — a new one every hour starting at 7 PM EST</p>`
);

writeFileSync('app/page.js', content);
console.log('Done!');
