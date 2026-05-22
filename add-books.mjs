import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `        </nav>
      </header>`,
  `        </nav>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => scrollToSection('books')}
            className="px-6 py-2 text-white rounded-full text-sm font-semibold hover:opacity-90 transition-colors shadow-md"
            style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)', fontFamily: 'Georgia, serif' }}
          >
            🍳 Screen-Free ✏️
          </button>
        </div>
      </header>`
);

content = content.replace(
  `        {/* SECTION 1: Daily Favorites */}`,
  `        {/* SECTION: Books */}
        <section id="books" className="mb-16 scroll-mt-8">
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-2 rounded-full text-white font-bold mb-4" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)', fontFamily: 'Georgia, serif' }}>
              📚 Also from Letter Griddle
            </div>
            <h2 className="text-3xl font-bold text-amber-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>Take Letter Griddle With You</h2>
            <p className="text-amber-600 italic" style={{ fontFamily: 'Georgia, serif' }}>Letter Griddle now offers screen-free options</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <a href="https://www.amazon.com/Letter-Griddle-Puzzles-Word-Lettergriddle-com/dp/B0GPN9QFRF" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-48 flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706, #92400E)' }}>
                  <span className="text-5xl mb-2">🥞</span>
                  <p className="text-white font-bold text-lg text-center px-4" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>Letter Griddle</p>
                  <p className="text-amber-100 text-xs tracking-widest uppercase mt-1">50 Word Puzzles</p>
                  <div className="absolute inset-0 bg-amber-900/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon →</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-100">
                  <h3 className="text-base font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>Letter Griddle: 50 Word Puzzles</h3>
                  <p className="text-amber-700 text-sm italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>The original collection — cozy puzzles for screen-free downtime</p>
                  <p className="text-amber-600 text-xs font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon</p>
                </div>
              </a>
            </div>
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <a href="https://www.amazon.com/dp/B0H2LCVFY5" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-48 flex flex-col items-center justify-center" style={{ background: 'linear-gradient(160deg, #0c4a6e, #0369a1, #38bdf8)' }}>
                  <span className="text-5xl mb-2">✈️</span>
                  <p className="text-white font-bold text-lg text-center px-4" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>Letter Griddle Travels</p>
                  <p className="text-cyan-100 text-xs tracking-widest uppercase mt-1">A World Tour of Word Puzzles</p>
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">NEW</div>
                  <div className="absolute inset-0 bg-cyan-900/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon →</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-100">
                  <h3 className="text-base font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>Letter Griddle Travels ✈️</h3>
                  <p className="text-amber-700 text-sm italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>40 puzzles across countries, cities and landmarks</p>
                  <p className="text-amber-600 text-xs font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon</p>
                </div>
              </a>
            </div>
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <a href="https://www.amazon.com/Todays-Special-Breakfast-Inspired-Letter-Griddle/dp/B0GN9K7GKC" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-48 flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #FBBF24, #F59E0B, #78350F)' }}>
                  <span className="text-5xl mb-2">📓</span>
                  <p className="text-white font-bold text-lg text-center px-4" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>Today's Special</p>
                  <p className="text-yellow-100 text-xs tracking-widest uppercase mt-1">Breakfast-Inspired Notebook</p>
                  <div className="absolute inset-0 bg-amber-900/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon →</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-100">
                  <h3 className="text-base font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>Today's Special Notebook</h3>
                  <p className="text-amber-700 text-sm italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>A beautiful lined notebook — honey pot design on every page</p>
                  <p className="text-amber-600 text-xs font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 1: Daily Favorites */}`
);

writeFileSync('app/page.js', content);
console.log('Done!');
