import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

const oldSection = `        {/* SECTION: Summer Days */}
        <section id="summer-days" className="mb-16 scroll-mt-8">
          <div className="text-center mb-8">
            <div
              className="inline-block px-6 py-2 rounded-full text-white font-bold mb-4"
              style={{ background: 'linear-gradient(160deg, #0c4a6e 0%, #0369a1 40%, #0ea5e9 75%, #38bdf8 100%)', fontFamily: 'Georgia, serif' }}
            >
              ☀️ Summer Days ☀️
            </div>
            <h2 className="text-3xl font-bold text-amber-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Summer Days
            </h2>
            <p className="text-amber-600">Fresh summer fun from the Letter Griddle family!</p>
          </div>
          <GameGrid games={summerDaysGames} />
        </section>`;

const newSection = `        {/* SECTION: Summer Days */}
        <section id="summer-days" className="mb-16 scroll-mt-8 rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #0c4a6e 0%, #0369a1 15%, #38bdf8 30%, #fef9c3 50%, #fbbf24 65%, #38bdf8 80%, #0369a1 90%, #0c4a6e 100%)' }}>
          <div className="text-center pt-10 pb-4 px-4">
            <div
              className="inline-block px-6 py-2 rounded-full text-white font-bold mb-4"
              style={{ background: 'linear-gradient(160deg, #0c4a6e 0%, #0369a1 40%, #0ea5e9 75%, #38bdf8 100%)', fontFamily: 'Georgia, serif' }}
            >
              ☀️ Summer Days ☀️
            </div>
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.2)' }}>
              Summer Days
            </h2>
            <p className="text-sky-100 italic mb-4" style={{ fontFamily: 'Georgia, serif' }}>Fresh summer fun from the Letter Griddle family!</p>
            <div className="text-3xl" style={{ animation: 'spin 8s linear infinite', display: 'inline-block' }}>☀️</div>
          </div>

          <style>{
            \`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .summer-card { min-width: 220px; background: white; border-radius: 16px; overflow: hidden; border: 2px solid #7dd3fc; flex-shrink: 0; transform: scale(0.92); transition: transform 0.3s, opacity 0.3s; opacity: 0.7; }
            .summer-card.active { transform: scale(1); opacity: 1; border-color: #0369a1; }
            .summer-track { display: flex; gap: 16px; transition: transform 0.4s cubic-bezier(.4,0,.2,1); padding: 12px 0 20px; }\`
          }</style>

          <div className="px-4 overflow-hidden">
            <div className="summer-track" id="summer-track">
              {summerDaysGames.map((game, i) => (
                <div key={game.name} className={\`summer-card \${i === 0 ? 'active' : ''}\`} id={\`summer-card-\${i}\`}>
                  <div className="relative h-36 flex flex-col items-center justify-center" style={{ background: game.thumbnail.gradient }}>
                    <div className="text-4xl mb-1">{game.thumbnail.icon}</div>
                    <p className="text-white font-bold text-sm text-center px-3" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                      {game.thumbnail.title.join(' ')}
                    </p>
                    <p className="text-xs uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.85)' }}>{game.thumbnail.subtitle}</p>
                    <div className="absolute inset-0 bg-sky-800/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-bold">Play Now →</span>
                    </div>
                  </div>
                  <div className="p-3" style={{ background: 'linear-gradient(to bottom, #e0f2fe, #bae6fd)' }}>
                    <p className="font-bold text-sky-900 text-sm mb-1" style={{ fontFamily: 'Georgia, serif' }}>{game.name}</p>
                    <p className="text-sky-700 text-xs italic" style={{ fontFamily: 'Georgia, serif' }}>{game.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 pb-6 px-4">
            <button
              onClick={() => {
                const track = document.getElementById('summer-track');
                const cards = track.querySelectorAll('.summer-card');
                const current = Array.from(cards).findIndex(c => c.classList.contains('active'));
                const prev = (current - 1 + cards.length) % cards.length;
                cards[current].classList.remove('active');
                cards[prev].classList.add('active');
                const offset = prev * (220 + 16) - (track.parentElement.offsetWidth / 2 - 110);
                track.style.transform = \`translateX(\${-Math.max(0, offset)}px)\`;
              }}
              className="w-14 h-14 rounded-full text-sky-800 font-bold text-2xl shadow-lg hover:shadow-xl transition-all hover:scale-110"
              style={{ background: 'white', border: '3px solid #0369a1' }}
            >
              ←
            </button>
            <div className="text-center text-sky-100 text-xs italic" style={{ fontFamily: 'Georgia, serif' }}>
              🌊🌊🌊🌊🌊
            </div>
            <button
              onClick={() => {
                const track = document.getElementById('summer-track');
                const cards = track.querySelectorAll('.summer-card');
                const current = Array.from(cards).findIndex(c => c.classList.contains('active'));
                const next = (current + 1) % cards.length;
                cards[current].classList.remove('active');
                cards[next].classList.add('active');
                const offset = next * (220 + 16) - (track.parentElement.offsetWidth / 2 - 110);
                track.style.transform = \`translateX(\${-Math.max(0, offset)}px)\`;
              }}
              className="w-14 h-14 rounded-full text-sky-800 font-bold text-2xl shadow-lg hover:shadow-xl transition-all hover:scale-110"
              style={{ background: 'white', border: '3px solid #0369a1' }}
            >
              →
            </button>
          </div>
        </section>`;

content = content.replace(oldSection, newSection);
writeFileSync('app/page.js', content);
console.log('Done!');
