import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `style={{ background: 'linear-gradient(135deg, #FB923C 0%, #F59E0B 40%, #D97706 70%, #B45309 100%)', animationDuration: '3s' }}`,
  `style={{ background: 'linear-gradient(135deg, #EA580C 0%, #D97706 50%, #92400E 100%)', animationDuration: '3s' }}`
);

content = content.replace(
  `style={{ background: 'linear-gradient(135deg, #F43F5E 0%, #EA580C 50%, #D97706 100%)', fontFamily: 'Georgia, serif' }}`,
  `style={{ background: 'linear-gradient(135deg, #BE123C 0%, #EA580C 50%, #B45309 100%)', fontFamily: 'Georgia, serif' }}`
);

writeFileSync('app/page.js', content);
console.log('Done!');
