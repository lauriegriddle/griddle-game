import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `<p className="text-center text-amber-600 text-xs italic mt-2" style={{ fontFamily: 'Georgia, serif' }}>Click any card to play!</p>`,
  `<p className="text-center text-amber-600 text-base italic mt-2" style={{ fontFamily: 'Georgia, serif' }}>Click any card to play!</p>`
);

writeFileSync('app/page.js', content);
console.log('Done!');
