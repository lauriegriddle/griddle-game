import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `className="relative flex flex-col items-center justify-center h-24"`,
  `className="relative flex flex-col items-center justify-center h-36"`
);

content = content.replace(
  `<div className="text-3xl mb-1">{game.thumbnail.icon || game.emoji}</div>`,
  `<div className="text-4xl mb-2">{game.thumbnail.icon || game.emoji}</div>`
);

content = content.replace(
  `className="text-white font-bold text-xs text-center px-2 leading-tight"`,
  `className="text-white font-bold text-sm text-center px-3 leading-tight"`
);

writeFileSync('app/page.js', content);
console.log('Done!');
