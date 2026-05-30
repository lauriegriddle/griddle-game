import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `<h2 className="text-3xl font-bold text-amber-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>Letter Griddle is off-line too!</h2>
            <p className="text-amber-600 italic" style={{ fontFamily: 'Georgia, serif' }}>Letter Griddle now offers screen-free options</p>`,
  `<h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.2)' }}>Letter Griddle is off-line too!</h2>
            <p className="italic" style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.9)' }}>Letter Griddle now offers screen-free options</p>`
);

writeFileSync('app/page.js', content);
console.log('Done!');
