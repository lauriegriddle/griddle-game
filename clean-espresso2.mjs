import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

const espressoText = 'Espresso Lane';
const espressoStart = content.indexOf(espressoText);
if (espressoStart !== -1) {
  const buttonStart = content.lastIndexOf('<button', espressoStart);
  const buttonEnd = content.indexOf('</button>', espressoStart) + '</button>'.length;
  content = content.slice(0, buttonStart) + content.slice(buttonEnd);
  console.log('Done!');
} else {
  console.log('Not found!');
}

writeFileSync('app/page.js', content);
