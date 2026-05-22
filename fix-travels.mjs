import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  'A WORLD TOUR OF WORD PUZZLES',
  'WORLD TOUR'
);

writeFileSync('app/page.js', content);
console.log('Done!');
