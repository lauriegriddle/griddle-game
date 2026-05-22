import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  /className="p-4 bg-gradient-to-br from-amber-50 to-yellow-100"/g,
  'className="p-4 bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col justify-between" style={{ minHeight: "140px" }}'
);

writeFileSync('app/page.js', content);
console.log('Done!');
