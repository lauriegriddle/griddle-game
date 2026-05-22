import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  '📚 Also from Letter Griddle',
  '🍳 Screen-Free ✏️'
);

content = content.replace(
  `        {/* SECTION: Books */}`,
  `        BOOKS_PLACEHOLDER`
);

content = content.replace(
  `        {/* SECTION 1: Daily Favorites */}`,
  `        {/* SECTION 1: Daily Favorites */}`
);

const booksSection = content.match(/BOOKS_PLACEHOLDER[\s\S]*?<\/section>\n/)?.[0];

content = content.replace(/BOOKS_PLACEHOLDER[\s\S]*?<\/section>\n/, '');

content = content.replace(
  `        {/* SECTION 2: Fan Favorites */}`,
  booksSection.replace('BOOKS_PLACEHOLDER', '{/* SECTION: Books */}') + `        {/* SECTION 2: Fan Favorites */}`
);

writeFileSync('app/page.js', content);
console.log('Done!');
