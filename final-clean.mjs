import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

const fanFavStart = `        {/* SECTION 2: Fan Favorites */}`;
const summerDaysStart = `        {/* SECTION: Summer Days */}`;
const fanFavIndex = content.indexOf(fanFavStart);
const summerDaysIndex = content.indexOf(summerDaysStart);
content = content.slice(0, fanFavIndex) + content.slice(summerDaysIndex);

writeFileSync('app/page.js', content);
console.log('Done!');
