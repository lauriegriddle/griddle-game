import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `className="relative flex flex-col items-center justify-center h-36"`,
  `className="relative flex flex-col items-center justify-center h-44"`
);

writeFileSync('app/page.js', content);
console.log('Done!');
