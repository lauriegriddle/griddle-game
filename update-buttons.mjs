import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)', animationDuration: '3s' }}`,
  `style={{ background: 'linear-gradient(135deg, #FDBA74 0%, #FB923C 25%, #F59E0B 60%, #D97706 100%)', animationDuration: '3s' }}`
);

content = content.replace(
  `style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)', fontFamily: 'Georgia, serif' }}`,
  `style={{ background: 'linear-gradient(135deg, #FDA4AF 0%, #F97316 50%, #FCD34D 100%)', fontFamily: 'Georgia, serif' }}`
);

writeFileSync('app/page.js', content);
console.log('Done!');
