import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `style={{ background: 'linear-gradient(180deg, #BE123C 0%, #EA580C 25%, #D97706 55%, #FCD34D 80%, #FEF9C3 100%)', borderRadius: '24px', padding: '2rem 0' }}>
          <div className="text-center mb-8">`,
  `style={{ background: 'linear-gradient(180deg, #BE123C 0%, #EA580C 25%, #D97706 55%, #FCD34D 80%, #FEF9C3 100%)', borderRadius: '24px', padding: '2rem 1.5rem' }}>
          <div className="text-center mb-8">`
);

writeFileSync('app/page.js', content);
console.log('Done!');
