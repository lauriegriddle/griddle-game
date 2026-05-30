import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)', fontFamily: 'Georgia, serif' }}`,
  `background: 'linear-gradient(135deg, #BE123C 0%, #EA580C 50%, #B45309 100%)', fontFamily: 'Georgia, serif' }}`
);

writeFileSync('app/page.js', content);
console.log('Done!');
