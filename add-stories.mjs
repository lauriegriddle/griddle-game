import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `        {/* SECTION: Summer Days */}`,
  `        {/* SECTION: Stories & More */}
        <section id="stories-more" className="mb-16 scroll-mt-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-amber-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Recipes, Stories, Puzzles & More
            </h2>
            <p className="text-amber-600">From the Letter Griddle world</p>
          </div>
          <GameGrid games={storiesAndMore} />
        </section>

        {/* SECTION: Summer Days */}`
);

writeFileSync('app/page.js', content);
console.log('Done!');
