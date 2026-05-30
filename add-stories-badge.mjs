import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `        {/* SECTION: Stories & More */}
        <section id="stories-more" className="mb-16 scroll-mt-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-amber-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Recipes, Stories, Puzzles & More
            </h2>
            <p className="text-amber-600">From the Letter Griddle world</p>
          </div>`,
  `        {/* SECTION: Stories & More */}
        <section id="stories-more" className="mb-16 scroll-mt-8">
          <div className="text-center mb-8">
            <div
              className="inline-block px-6 py-2 rounded-full text-white font-bold mb-4"
              style={{ background: 'linear-gradient(160deg, #0c4a6e 0%, #312e81 50%, #c2410c 80%, #fbbf24 100%)', fontFamily: 'Georgia, serif' }}
            >
              ✨ Stories, Recipes, & More
            </div>
            <h2 className="text-3xl font-bold text-amber-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Recipes, Stories, Puzzles & More
            </h2>
            <p className="text-amber-600">From the Letter Griddle world</p>
          </div>`
);

writeFileSync('app/page.js', content);
console.log('Done!');
