import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

content = content.replace(
  `{/* SECTION: Books */}
        <section id="books" className="mb-16 scroll-mt-8">`,
  `{/* SECTION: Books */}
        <section id="books" className="mb-16 scroll-mt-8 rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #BE123C 0%, #EA580C 25%, #D97706 55%, #FCD34D 80%, #FEF9C3 100%)' }}>`
);

content = content.replace(
  `            <div className="inline-block px-6 py-2 rounded-full text-white font-bold mb-4" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)', fontFamily: 'Georgia, serif' }}>
              🍳 Screen-Free Books ✏️
            </div>`,
  `            <div className="inline-block px-6 py-2 rounded-full text-white font-bold mb-4" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.3)', fontFamily: 'Georgia, serif' }}>
              🍳 Screen-Free Books ✏️
            </div>`
);

content = content.replace(
  `            <h2 className="text-3xl font-bold text-amber-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>Letter Griddle is off-line too!</h2>
            <p className="text-amber-600 italic" style={{ fontFamily: 'Georgia, serif' }}>Letter Griddle now offers screen-free options</p>`,
  `            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.2)' }}>Letter Griddle is off-line too!</h2>
            <p className="italic mb-4" style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.9)' }}>Letter Griddle now offers screen-free options</p>`
);

content = content.replace(
  `            <span className="inline-block px-6 py-2 text-amber-800 font-semibold italic border-t-2 border-b-2 border-amber-300 text-sm" style={{ fontFamily: 'Georgia, serif' }}>
              ☀️ Journals & Notebooks for Screen-Free Mornings
            </span>`,
  `            <span className="inline-block px-6 py-2 text-white font-semibold italic text-sm" style={{ fontFamily: 'Georgia, serif', borderTop: '1px solid rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.4)' }}>
              ☀️ Journals & Notebooks for Screen-Free Mornings
            </span>`
);

writeFileSync('app/page.js', content);
console.log('Done!');
