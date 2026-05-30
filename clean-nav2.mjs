import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

// Remove Fan Favorites button
content = content.replace(`          <button
            onClick={() => scrollToSection('grand-opening')}
            className="inline-flex items-center gap-1 px-4 py-2 text-white rounded-full text-sm font-semibold shadow-md hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)' }}
          >
            <span className="text-yellow-300">{"\u2728"}</span>
            Fan Favorites
          </button>`, '');

// Remove More Games button
content = content.replace(`          <button
            onClick={() => { if (!showMoreGames) setShowMoreGames(true); setTimeout(() => scrollToSection('more-games'), 100); }}
            className="px-4 py-2 bg-amber-700 text-white rounded-full text-sm font-semibold hover:bg-amber-800 transition-colors shadow-md"
          >
            More Games
          </button>`, '');

// Remove Cafe Specials button
content = content.replace(`          <button
            onClick={() => { if (!showMoreGames) setShowMoreGames(true); setTimeout(() => scrollToSection('cafe-specials'), 100); }}
            className="px-4 py-2 bg-amber-800 text-white rounded-full text-sm font-semibold hover:bg-amber-900 transition-colors shadow-md"
          >
            🎹 Cafe Specials 🕰️
          </button>`, '');

// Remove Espresso Lane button
content = content.replace(`          <button
            onClick={() => { if (!showMoreGames) setShowMoreGames(true); setTimeout(() => scrollToSection('espresso-lane'), 100); }}
            className="relative px-4 py-2 bg-amber-800 text-white rounded-full text-sm font-semibold hover:bg-amber-900 transition-colors shadow-md"
          >
            {"\u2615"} Espresso Lane
          </button>`, '');

writeFileSync('app/page.js', content);
console.log('Done!');
