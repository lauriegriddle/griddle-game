import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `        <button
          onClick={() => scrollToSection('books')}
          className="px-4 py-2 text-white rounded-full text-sm font-semibold hover:opacity-90 transition-colors shadow-md"
          style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)' }}
        >
          🍳 Screen-Free ✏️
        </button>`,
  ``
);

content = content.replace(
  `</nav>`,
  `</nav>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => scrollToSection('books')}
            className="px-6 py-2 text-white rounded-full text-sm font-semibold hover:opacity-90 transition-colors shadow-md"
            style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)', fontFamily: 'Georgia, serif' }}
          >
            🍳 Screen-Free ✏️
          </button>
        </div>`
);

writeFileSync('app/page.js', content);
console.log('Done!');
