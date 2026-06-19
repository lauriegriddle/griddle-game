import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `onClick={() => setShowStories(!showStories)}`,
  `onClick={() => { setShowStories(!showStories); if (!showStories) setTimeout(() => scrollToSection('stories-more'), 100); }}`
);
content = content.replace(
  `onClick={() => setShowSummer(!showSummer)}`,
  `onClick={() => { setShowSummer(!showSummer); if (!showSummer) setTimeout(() => scrollToSection('summer-days'), 100); }}`
);
content = content.replace(
  `onClick={() => setShowBooks(!showBooks)}`,
  `onClick={() => { setShowBooks(!showBooks); if (!showBooks) setTimeout(() => scrollToSection('books'), 100); }}`
);

writeFileSync('app/page.js', content);
console.log('Done!');
