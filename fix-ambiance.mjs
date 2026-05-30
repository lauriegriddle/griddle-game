import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

// Find and remove Ambiance entry
const ambianceStart = content.indexOf(`    {
      name: "Ambiance"`);
const ambianceEnd = content.indexOf(`    },`, ambianceStart) + 6;
content = content.slice(0, ambianceStart) + content.slice(ambianceEnd);

writeFileSync('app/page.js', content);
console.log('Done!');
