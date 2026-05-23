import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

const journalsSection = `
          <div className="text-center my-8">
            <span className="inline-block px-6 py-2 text-amber-800 font-semibold italic border-t-2 border-b-2 border-amber-300 text-sm" style={{ fontFamily: 'Georgia, serif' }}>
              ☀️ Journals & Notebooks for Screen-Free Mornings
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <a href="https://www.amazon.com/dp/B0GM1TNH5B" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-48 flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #7C3AED, #C2410C, #F97316)' }}>
                  <span className="text-5xl mb-2">🌅</span>
                  <p className="text-white font-bold text-lg text-center px-4" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>Just Breakfast</p>
                  <p className="text-orange-100 text-xs tracking-widest uppercase mt-1">A 90-Day Journal</p>
                  <div className="absolute inset-0 bg-amber-900/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon →</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col justify-between" style={{ minHeight: '140px' }}>
                  <h3 className="text-base font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>Just Breakfast Journal</h3>
                  <p className="text-amber-700 text-sm italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>A 90-day guided journal for your breakfast ritual — savor every morning</p>
                  <p className="text-amber-600 text-xs font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon</p>
                </div>
              </a>
            </div>
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <a href="https://www.amazon.com/Breakfast-Nature-Sights-Sounds-Savoring/dp/B0GM1RLYZW/" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-48 flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #14532D, #166534, #4ADE80)' }}>
                  <span className="text-5xl mb-2">🌿</span>
                  <p className="text-white font-bold text-lg text-center px-4" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>Breakfast and Nature</p>
                  <p className="text-green-100 text-xs tracking-widest uppercase mt-1">Sights, Sounds, Savoring</p>
                  <div className="absolute inset-0 bg-green-900/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon →</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col justify-between" style={{ minHeight: '140px' }}>
                  <h3 className="text-base font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>Breakfast and Nature</h3>
                  <p className="text-amber-700 text-sm italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>A 90-day journal where breakfast meets the beauty of nature</p>
                  <p className="text-amber-600 text-xs font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon</p>
                </div>
              </a>
            </div>
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <a href="https://www.amazon.com/Coffee-Notebook-Laurie-Hess/dp/B0GMWTWJK4/" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-48 flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #3C1A00, #6B2D00, #A35200)' }}>
                  <span className="text-5xl mb-2">☕</span>
                  <p className="text-white font-bold text-lg text-center px-4" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>Coffee Coffee Coffee</p>
                  <p className="text-amber-200 text-xs tracking-widest uppercase mt-1">Your Notebook. Your Coffee.</p>
                  <div className="absolute inset-0 bg-amber-900/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon →</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col justify-between" style={{ minHeight: '140px' }}>
                  <h3 className="text-base font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>Coffee Coffee Coffee</h3>
                  <p className="text-amber-700 text-sm italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>A lined notebook for quiet coffee moments — for the love of the brew</p>
                  <p className="text-amber-600 text-xs font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon</p>
                </div>
              </a>
            </div>
          </div>
        </section>`;

content = content.replace(
  `        </section>
        {/* SECTION 2: Fan Favorites */}`,
  journalsSection + `
        {/* SECTION 2: Fan Favorites */}`
);

writeFileSync('app/page.js', content);
console.log('Done!');
