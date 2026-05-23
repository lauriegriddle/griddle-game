import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `import { useState } from 'react';`,
  `import { useState } from 'react';
import { track } from '@vercel/analytics';`
);

content = content.replace(
  `onClick={() => scrollToSection('books')}`,
  `onClick={() => { track('screen_free_books_clicked'); scrollToSection('books'); }}`
);

writeFileSync('app/page.js', content);
console.log('Done!');
