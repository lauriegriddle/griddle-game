import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `.daily-card { min-width: 220px; background: white;`,
  `.daily-card { min-width: 220px; background: linear-gradient(to bottom, #fef3c7, #fde68a);`
);

writeFileSync('app/page.js', content);
console.log('Done!');
