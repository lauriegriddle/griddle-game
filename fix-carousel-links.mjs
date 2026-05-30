import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `              {summerDaysGames.map((game, i) => (
                <div key={game.name} className={\`summer-card \${i === 0 ? 'active' : ''}\`}>`,
  `              {summerDaysGames.map((game, i) => (
                <a key={game.name} href={game.href} target={game.external ? '_blank' : '_self'} rel="noopener noreferrer" className={\`summer-card \${i === 0 ? 'active' : ''}\`} style={{ textDecoration: 'none', cursor: 'pointer' }}>`
);

content = content.replace(
  `                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 pb-8`,
  `                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 pb-8`
);

writeFileSync('app/page.js', content);
console.log('Done!');
