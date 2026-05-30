import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

// Remove Fan Favorites nav button
content = content.replace(
  /\s*<button[^>]*onClick[^>]*grand-opening[^>]*>[\s\S]*?<\/button>/,
  ''
);

// Remove More Games nav button
content = content.replace(
  /\s*<button[^>]*onClick[^>]*more-games[^>]*>[\s\S]*?<\/button>/,
  ''
);

// Remove Cafe Specials nav button
content = content.replace(
  /\s*<button[^>]*onClick[^>]*cafe-specials[^>]*>[\s\S]*?<\/button>/,
  ''
);

// Remove Espresso Lane nav button
content = content.replace(
  /\s*<button[^>]*onClick[^>]*espresso-lane[^>]*>[\s\S]*?<\/button>/,
  ''
);

writeFileSync('app/page.js', content);
console.log('Nav cleaned!');
