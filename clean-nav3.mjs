import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

// Find and remove Fan Favorites button
const fanStart = content.indexOf(`onClick={() => scrollToSection('grand-opening')}`);
if (fanStart !== -1) {
  const buttonStart = content.lastIndexOf('<button', fanStart);
  const buttonEnd = content.indexOf('</button>', fanStart) + '</button>'.length;
  content = content.slice(0, buttonStart) + content.slice(buttonEnd);
}

// Find and remove Espresso Lane button
const espressoStart = content.indexOf(`onClick={() => scrollToSection('espresso-lane')}`);
if (espressoStart !== -1) {
  const buttonStart = content.lastIndexOf('<button', espressoStart);
  const buttonEnd = content.indexOf('</button>', espressoStart) + '</button>'.length;
  content = content.slice(0, buttonStart) + content.slice(buttonEnd);
}

writeFileSync('app/page.js', content);
console.log('Done!');
