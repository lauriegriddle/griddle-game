import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  '🍳 Screen-Free Letter Griddle ✏️',
  '🍳 Screen-Free ✏️'
);

content = content.replace(
  'linear-gradient(135deg, #FDBA74 0%, #FB923C 25%, #F472B6 60%, #C084FC 100%)',
  'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)'
);

writeFileSync('app/page.js', content);
console.log('Done!');
