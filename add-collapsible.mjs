import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

// 1. Add toggle state
content = content.replace(
  `export default function Home() {
  `,
  `export default function Home() {
  const [showStories, setShowStories] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [showSummer, setShowSummer] = useState(false);
  `
);

// 2. Update nav buttons to toggle
content = content.replace(
  `onClick={() => scrollToSection('stories-more')}`,
  `onClick={() => setShowStories(!showStories)}`
);
content = content.replace(
  `onClick={() => scrollToSection('summer-days')}`,
  `onClick={() => setShowSummer(!showSummer)}`
);
content = content.replace(
  `onClick={() => scrollToSection('books')}`,
  `onClick={() => setShowBooks(!showBooks)}`
);

// 3. Wrap Books section
let idx = content.indexOf('<section id="books"');
let endIdx = content.indexOf('</section>', idx) + '</section>'.length;
content = content.slice(0, idx) + '{showBooks && (\n' + content.slice(idx, endIdx) + '\n)}' + content.slice(endIdx);

// 4. Wrap Stories section
idx = content.indexOf('<section id="stories-more"');
endIdx = content.indexOf('</section>', idx) + '</section>'.length;
content = content.slice(0, idx) + '{showStories && (\n' + content.slice(idx, endIdx) + '\n)}' + content.slice(endIdx);

// 5. Wrap Summer Days section
idx = content.indexOf('<section id="summer-days"');
endIdx = content.indexOf('</section>', idx) + '</section>'.length;
content = content.slice(0, idx) + '{showSummer && (\n' + content.slice(idx, endIdx) + '\n)}' + content.slice(endIdx);

writeFileSync('app/page.js', content);
console.log('Done!');
