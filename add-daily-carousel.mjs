import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

const oldSection = content.slice(
  content.indexOf('{/* SECTION 1: Daily Favorites */}'),
  content.indexOf('{/* SECTION: Books */}')
);

const newSection = `{/* SECTION 1: Daily Favorites */}
        <section id="daily-favorites" className="mb-16 scroll-mt-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-amber-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>Daily Favorites</h2>
            <p className="text-amber-600">Our daily puzzles</p>
          </div>
          <style>{\`
            @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
            .daily-card { min-width: 120px; background: white; border-radius: 14px; overflow: hidden; border: 2px solid #FCD34D; flex-shrink: 0; transform: scale(0.88); transition: transform 0.3s, opacity 0.3s; opacity: 0.65; cursor: pointer; text-decoration: none; display: block; }
            .daily-card.active { transform: scale(1); opacity: 1; border-color: #D97706; box-shadow: 0 6px 20px rgba(217,119,6,0.2); }
            .daily-track { display: flex; gap: 10px; transition: transform 0.4s cubic-bezier(.4,0,.2,1); padding: 12px 0 16px; }
          \`}</style>
          <div className="overflow-hidden">
            <div className="daily-track" id="daily-track">
              {dailyFavorites.map((game, i) => (
                game.external ? (
                  <a key={game.name} href={game.href} target="_blank" rel="noopener noreferrer" className={\`daily-card \${i === 0 ? 'active' : ''}\`}>
                    <div className="relative flex flex-col items-center justify-center h-24" style={{ background: game.thumbnail.gradient }}>
                      <div className="text-3xl mb-1">{game.thumbnail.icon || game.emoji}</div>
                      <p className="text-white font-bold text-xs text-center px-2 leading-tight" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>{game.name}</p>
                      <p className="text-xs uppercase tracking-wider mt-1" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '8px' }}>{game.thumbnail.subtitle}</p>
                    </div>
                    <div className="p-2" style={{ background: 'linear-gradient(to bottom, #fef3c7, #fde68a)' }}>
                      <p className="font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif', fontSize: '11px' }}>{game.name}</p>
                      <p className="text-amber-600 font-semibold" style={{ fontSize: '9px' }}>🕖 {game.dropTime}</p>
                    </div>
                  </a>
                ) : (
                  <a key={game.name} href={game.href} className={\`daily-card \${i === 0 ? 'active' : ''}\`}>
                    <div className="relative flex flex-col items-center justify-center h-24" style={{ background: game.thumbnail.gradient }}>
                      {game.thumbnail.tiles ? (
                        <div className="flex gap-1 mb-1">
                          {game.thumbnail.tiles.split('').map((letter, j) => (
                            <div key={j} className="w-6 h-7 bg-white rounded flex items-center justify-center shadow">
                              <span className="text-xs font-bold" style={{ color: '#D97706', fontFamily: 'Georgia, serif' }}>{letter}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-3xl mb-1">{game.thumbnail.icon || game.emoji}</div>
                      )}
                      <p className="text-white font-bold text-xs text-center px-2 leading-tight" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>{game.name}</p>
                      <p className="text-xs uppercase tracking-wider mt-1" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '8px' }}>{game.thumbnail.subtitle}</p>
                    </div>
                    <div className="p-2" style={{ background: 'linear-gradient(to bottom, #fef3c7, #fde68a)' }}>
                      <p className="font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif', fontSize: '11px' }}>{game.name}</p>
                      <p className="text-amber-600 font-semibold" style={{ fontSize: '9px' }}>🕖 {game.dropTime}</p>
                    </div>
                  </a>
                )
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <button
              onClick={() => {
                const track = document.getElementById('daily-track');
                const cards = track.querySelectorAll('.daily-card');
                const current = Array.from(cards).findIndex(c => c.classList.contains('active'));
                const prev = (current - 1 + cards.length) % cards.length;
                cards[current].classList.remove('active');
                cards[prev].classList.add('active');
                const offset = prev * (120 + 10) - (track.parentElement.offsetWidth / 2 - 60);
                track.style.transform = \`translateX(\${-Math.max(0, offset)}px)\`;
              }}
              className="w-12 h-12 rounded-full font-bold text-xl transition-all hover:scale-110"
              style={{ background: 'white', border: '3px solid #D97706', color: '#D97706' }}
            >
              ←
            </button>
            <p className="text-amber-400 text-sm">🥞🥞🥞🥞🥞🥞</p>
            <button
              onClick={() => {
                const track = document.getElementById('daily-track');
                const cards = track.querySelectorAll('.daily-card');
                const current = Array.from(cards).findIndex(c => c.classList.contains('active'));
                const next = (current + 1) % cards.length;
                cards[current].classList.remove('active');
                cards[next].classList.add('active');
                const offset = next * (120 + 10) - (track.parentElement.offsetWidth / 2 - 60);
                track.style.transform = \`translateX(\${-Math.max(0, offset)}px)\`;
              }}
              className="w-12 h-12 rounded-full font-bold text-xl transition-all hover:scale-110"
              style={{ background: 'white', border: '3px solid #D97706', color: '#D97706' }}
            >
              →
            </button>
          </div>
          <p className="text-center text-amber-600 text-xs italic mt-2" style={{ fontFamily: 'Georgia, serif' }}>Click any card to play!</p>
        </section>

        `;

content = content.replace(oldSection, newSection);
writeFileSync('app/page.js', content);
console.log('Done!');
