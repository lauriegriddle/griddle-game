import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `.daily-card { min-width: 220px; background: white; border-radius: 14px; overflow: hidden; border: 2px solid #FCD34D; flex-shrink: 0; transform: scale(0.88); transition: transform 0.3s, opacity 0.3s; opacity: 0.65;`,
  `.daily-card { min-width: 220px; background: white; border-radius: 14px; overflow: hidden; border: 2px solid #FCD34D; flex-shrink: 0; transform: scale(0.88); transition: transform 0.3s, opacity 0.3s; opacity: 0.85;`
);

content = content.replace(
  `style={{ background: 'linear-gradient(to bottom, #fef3c7, #fde68a)' }}>
                      <p className="font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif', fontSize: '11px' }}>{game.name}</p>
                      <p className="text-amber-600 font-semibold" style={{ fontSize: '9px' }}>🕖 {game.dropTime}</p>
                    </div>
                  </a>
                ) : (`,
  `style={{ background: 'linear-gradient(to bottom, #fef3c7, #fde68a)', minHeight: '70px' }}>
                      <p className="font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif', fontSize: '11px' }}>{game.name}</p>
                      <p className="text-amber-600 font-semibold" style={{ fontSize: '9px' }}>🕖 {game.dropTime}</p>
                    </div>
                  </a>
                ) : (`
);

content = content.replace(
  `style={{ background: 'linear-gradient(to bottom, #fef3c7, #fde68a)' }}>
                      <p className="font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif', fontSize: '11px' }}>{game.name}</p>
                      <p className="text-amber-600 font-semibold" style={{ fontSize: '9px' }}>🕖 {game.dropTime}</p>
                    </div>
                  </a>
                )`,
  `style={{ background: 'linear-gradient(to bottom, #fef3c7, #fde68a)', minHeight: '70px' }}>
                      <p className="font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif', fontSize: '11px' }}>{game.name}</p>
                      <p className="text-amber-600 font-semibold" style={{ fontSize: '9px' }}>🕖 {game.dropTime}</p>
                    </div>
                  </a>
                )`
);

writeFileSync('app/page.js', content);
console.log('Done!');
