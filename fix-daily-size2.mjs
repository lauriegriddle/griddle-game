import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `.daily-card { min-width: 160px;`,
  `.daily-card { min-width: 220px;`
);

content = content.replace(
  `const offset = prev * (160 + 10)`,
  `const offset = prev * (220 + 16)`
);

content = content.replace(
  `const offset = next * (160 + 10)`,
  `const offset = next * (220 + 16)`
);

content = content.replace(
  `.daily-track { display: flex; gap: 10px;`,
  `.daily-track { display: flex; gap: 16px;`
);

content = content.replace(
  `track.parentElement.offsetWidth / 2 - 80);
                track.style.transform = \`translateX(\${-Math.max(0, offset)}px)\`;
              }}
              className="w-12 h-12 rounded-full font-bold text-xl transition-all hover:scale-110"
              style={{ background: 'white', border: '3px solid #D97706', color: '#D97706' }}
            >
              ←`,
  `track.parentElement.offsetWidth / 2 - 110);
                track.style.transform = \`translateX(\${-Math.max(0, offset)}px)\`;
              }}
              className="w-12 h-12 rounded-full font-bold text-xl transition-all hover:scale-110"
              style={{ background: 'white', border: '3px solid #D97706', color: '#D97706' }}
            >
              ←`
);

content = content.replace(
  `track.parentElement.offsetWidth / 2 - 80);
                track.style.transform = \`translateX(\${-Math.max(0, offset)}px)\`;
              }}
              className="w-12 h-12 rounded-full font-bold text-xl transition-all hover:scale-110"
              style={{ background: 'white', border: '3px solid #D97706', color: '#D97706' }}
            >
              →`,
  `track.parentElement.offsetWidth / 2 - 110);
                track.style.transform = \`translateX(\${-Math.max(0, offset)}px)\`;
              }}
              className="w-12 h-12 rounded-full font-bold text-xl transition-all hover:scale-110"
              style={{ background: 'white', border: '3px solid #D97706', color: '#D97706' }}
            >
              →`
);

writeFileSync('app/page.js', content);
console.log('Done!');
