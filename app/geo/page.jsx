"use client";

import { useState, useCallback, useEffect } from "react";

// ── Puzzle Data ──────────────────────────────────────────────────────────────
const PUZZLES = [
  {
    country: "Barbados", flag: "🇧🇧",
    funFact: "Barbados is a vibrant Caribbean island famous for its white sandy beaches created by coral limestone. Known for its high quality of life, the island is a top destination for centenarians.",
    words: [
      { word: "CAVE",     hint: "Natural underground chamber in limestone rock", revealedIndex: 0 },
      { word: "SUGAR",    hint: "Barbados built its economy on this sweet crop", revealedIndex: 0 },
      { word: "TURTLE",   hint: "Sea creature that nests on Barbadian beaches", revealedIndex: 0 },
      { word: "CRICKET",  hint: "The most beloved sport on the island", revealedIndex: 0 },
      { word: "TRANQUIL", hint: "Peacefully calm; a word that suits island life", revealedIndex: 2 },
    ],
  },
  {
    country: "India", flag: "🇮🇳",
    funFact: "India is known as the birthplace of chess, yoga, and shampoo. It is home to the world's largest movie industry, the oldest city in Varanasi, and 70% of the world's tigers.",
    words: [
      { word: "YOGA",     hint: "Ancient practice of movement and breath born in India", revealedIndex: 0 },
      { word: "SPICE",    hint: "India is the world's largest producer of these flavor-makers", revealedIndex: 0 },
      { word: "MARKET",   hint: "Bustling bazaar where traders sell goods", revealedIndex: 0 },
      { word: "DIVERSE",  hint: "India has 22 official languages and hundreds of dialects", revealedIndex: 3 },
      { word: "MYSTICAL", hint: "Spiritual and mysterious; a quality India is famous for", revealedIndex: 2 },
    ],
  },
  {
    country: "Sweden", flag: "🇸🇪",
    funFact: "As a global leader in innovation and recycling, Sweden is almost entirely cashless, with only 1% of GDP circulating as cash. It is a top music exporter, the birthplace of Nobel Prizes, and holds legal coffee breaks.",
    words: [
      { word: "LAKE",     hint: "Sweden has nearly 100,000 of these freshwater bodies", revealedIndex: 0 },
      { word: "LARGE",    hint: "Sweden is the third largest country in the EU by area", revealedIndex: 0 },
      { word: "FOREST",   hint: "Over 60% of Sweden is covered in these trees", revealedIndex: 0 },
      { word: "BALANCE",  hint: "Sweden's work-life philosophy is world-famous", revealedIndex: 2 },
      { word: "HIGHTECH", hint: "Sweden gave us Spotify, IKEA, and Minecraft", revealedIndex: 0 },
    ],
  },
  {
    country: "United Kingdom", flag: "🇬🇧",
    funFact: "The United Kingdom is composed of England, Scotland, Wales, and Northern Ireland. Stonehenge is older than the Egyptian pyramids, and Wales has more castles per square mile than anywhere else.",
    words: [
      { word: "FISH",     hint: "Half of Britain's most iconic takeaway dish", revealedIndex: 0 },
      { word: "CHIPS",    hint: "The other half of Britain's most iconic takeaway dish", revealedIndex: 0 },
      { word: "CASTLE",   hint: "Wales has more of these per square mile than anywhere", revealedIndex: 0 },
      { word: "ROYALTY",  hint: "The UK's monarchy is one of the oldest in the world", revealedIndex: 2 },
      { word: "MANNERLY", hint: "The British are famous for politeness and queuing", revealedIndex: 3 },
    ],
  },
  {
    country: "Norway", flag: "🇳🇴",
    funFact: "Norway boasts the world's longest road tunnel, over 1,000 fjords, and 24-hour summer daylight called the Midnight Sun. It is the birthplace of skiing, has won the most Winter Olympic medals, and introduced salmon sushi to Japan.",
    words: [
      { word: "OSLO",     hint: "Norway's capital and most populous city", revealedIndex: 0 },
      { word: "CLIFF",    hint: "Dramatic rock face found along Norway's fjord edges", revealedIndex: 0 },
      { word: "VIKING",   hint: "Norway's legendary seafaring warriors of the past", revealedIndex: 0 },
      { word: "GLACIER",  hint: "Massive slow-moving river of ice covering Norway's peaks", revealedIndex: 2 },
      { word: "MIDNIGHT", hint: "Norway's famous summer sun that never fully sets", revealedIndex: 3 },
    ],
  },
  {
    country: "Portugal", flag: "🇵🇹",
    funFact: "Portugal is the oldest nation-state in Europe with nearly unchanged borders since 1297. It produces over 50% of the world's cork, holds the world record for the largest wave ever surfed, and is home to the world's oldest operating bookshop.",
    words: [
      { word: "CORK",     hint: "Portugal produces over half the world's supply of this", revealedIndex: 0 },
      { word: "TILES",    hint: "Beautiful hand-painted azulejo ceramics cover Portuguese walls", revealedIndex: 0 },
      { word: "OLDEST",   hint: "Portugal holds this title as Europe's oldest nation-state", revealedIndex: 0 },
      { word: "WESTERN",  hint: "Portugal is Europe's most _____ point on the mainland", revealedIndex: 2 },
      { word: "BOOKSHOP", hint: "Lisbon is home to the world's oldest operating one", revealedIndex: 4 },
    ],
  },
  {
    country: "Italy", flag: "🇮🇹",
    funFact: "Italy is a boot-shaped peninsula boasting the most UNESCO World Heritage sites globally. Famous for inventing pizza, espresso machines, and pianos, it surrounds two independent microstates, Vatican City and San Marino, and produces 20% of the world's olive oil.",
    words: [
      { word: "ROME",     hint: "The Eternal City and capital of Italy", revealedIndex: 0 },
      { word: "PASTA",    hint: "Italy has over 350 shapes of this beloved staple", revealedIndex: 0 },
      { word: "GELATO",   hint: "Italian frozen dessert, denser and richer than ice cream", revealedIndex: 2 },
      { word: "GONDOLA",  hint: "Traditional flat-bottomed boat gliding through Venice", revealedIndex: 0 },
      { word: "TIRAMISU", hint: "Coffee-soaked Italian dessert whose name means 'lift me up'", revealedIndex: 3 },
    ],
  },
  {
    country: "France", flag: "🇫🇷",
    funFact: "France is the world's most visited country, attracting over 90 million tourists annually. Known as L'Hexagone due to its six-sided shape, it has over 1,600 varieties of cheese, consumes 25,000 tons of snails yearly, and the Eiffel Tower was originally intended as a temporary 20-year structure.",
    words: [
      { word: "COCO",     hint: "First name of legendary French fashion designer Chanel", revealedIndex: 0 },
      { word: "CREPE",    hint: "Thin French pancake, sweet or savory", revealedIndex: 0 },
      { word: "LOUVRE",   hint: "Paris museum and home to the Mona Lisa", revealedIndex: 0 },
      { word: "PERFUME",  hint: "France's Grasse region is the world capital of this", revealedIndex: 3 },
      { word: "BAGUETTE", hint: "Long crusty French bread, a national symbol", revealedIndex: 2 },
    ],
  },
  {
    country: "Ireland", flag: "🇮🇪",
    funFact: "Ireland, known as the Emerald Isle, is the only country with a musical instrument, the harp, as its national symbol, has no wild snakes, and features the world's oldest pub, Sean's Bar, operating since 900 AD.",
    words: [
      { word: "HARP",     hint: "Ireland's national symbol and musical instrument", revealedIndex: 0 },
      { word: "CLIFF",    hint: "The dramatic Cliffs of Moher rise 700 feet above the sea", revealedIndex: 0 },
      { word: "BROGUE",   hint: "The distinctive Irish accent, or a sturdy leather shoe", revealedIndex: 0 },
      { word: "EMERALD",  hint: "The color of Ireland's rolling hills gives it its nickname", revealedIndex: 3 },
      { word: "SHAMROCK", hint: "Three-leafed clover, symbol of Ireland and St. Patrick", revealedIndex: 2 },
    ],
  },
  {
    country: "Canada", flag: "🇨🇦",
    funFact: "Canada has more than two million lakes, holding 60% of the world's lakes. Nearly 40% of Canada is covered by forests containing 25% of the planet's boreal forests. Churchill, Manitoba, is famously known as the Polar Bear Capital of the World.",
    words: [
      { word: "LEAF",     hint: "The maple one appears on Canada's flag", revealedIndex: 0 },
      { word: "SYRUP",    hint: "Canada produces 70% of the world's maple version", revealedIndex: 0 },
      { word: "HOCKEY",   hint: "Canada's beloved national winter sport", revealedIndex: 0 },
      { word: "OTTAWA",   hint: "Canada's capital city, often mistaken for Toronto", revealedIndex: 2 },
      { word: "MOUNTIES", hint: "Canada's iconic red-coated Royal Mounted Police", revealedIndex: 3 },
    ],
  },
  {
    country: "Japan", flag: "🇯🇵",
    funFact: "Japan features a network of musical roads (Melody Roads) where grooves cut into the asphalt play a perfectly tuned tune through your car tires as you drive over them at the correct speed limit!",
    words: [
      { word: "FUJI",    hint: "Japan's most iconic and sacred snow-capped mountain", revealedIndex: 0 },
      { word: "TOKYO",   hint: "Japan's bustling capital and the world's most populous city", revealedIndex: 0 },
      { word: "KIMONO",  hint: "Traditional Japanese robe worn at festivals and ceremonies", revealedIndex: 2 },
      { word: "SAMURAI", hint: "Japan's legendary warrior class, skilled in the art of the sword", revealedIndex: 3 },
      { word: "ORIGAMI", hint: "The ancient Japanese art of folding paper into beautiful shapes", revealedIndex: 0 },
    ],
  },
  {
    country: "Egypt", flag: "🇪🇬",
    funFact: "Cairo features 1,000-year-old market streets where traditional weight measures are still checked by a government official using an ancient set of master scales!",
    words: [
      { word: "NILE",     hint: "The world's longest river, flowing through the heart of Egypt", revealedIndex: 0 },
      { word: "CAIRO",    hint: "Egypt's ancient capital and the largest city in Africa", revealedIndex: 0 },
      { word: "SPHINX",   hint: "Mythical limestone statue with a human head and lion's body", revealedIndex: 0 },
      { word: "PYRAMID",  hint: "Massive royal tomb built by ancient Egyptians for their pharaohs", revealedIndex: 3 },
      { word: "PHARAOHS", hint: "The all-powerful rulers of ancient Egypt, considered living gods", revealedIndex: 2 },
    ],
  },
  {
    country: "Australia", flag: "🇦🇺",
    funFact: "Australia is the only nation that covers an entire continent, known for being the driest inhabited land, housing unique wildlife like kangaroos and koalas, and having 90% of its population living on the coast.",
    words: [
      { word: "MATE",     hint: "Australian slang for a friend or companion", revealedIndex: 0 },
      { word: "KOALA",    hint: "Marsupial that sleeps up to 22 hours a day in eucalyptus trees", revealedIndex: 0 },
      { word: "WOMBAT",   hint: "Burrowing marsupial known for cube-shaped droppings", revealedIndex: 0 },
      { word: "BARRIER",  hint: "The Great ___ Reef is the world's largest coral system", revealedIndex: 2 },
      { word: "KANGAROO", hint: "Marsupial with a pouch that can hop at 35 mph", revealedIndex: 1 },
    ],
  },
  {
    country: "United States", flag: "🇺🇸",
    funFact: "The United States spans six time zones and contains every climate on Earth. It invented the internet, jazz, and the chocolate chip cookie, is home to the world's oldest national park (Yellowstone, 1872), and its Library of Congress is the largest library in the world with over 170 million items.",
    words: [
      { word: "JAZZ",      hint: "Uniquely American music born in New Orleans in the early 1900s", revealedIndex: 0 },
      { word: "EAGLE",     hint: "The bald version of this bird is America's national symbol", revealedIndex: 0 },
      { word: "CANYON",    hint: "The Grand one in Arizona is a mile deep and 277 miles long", revealedIndex: 2 },
      { word: "FREEDOM",   hint: "The core ideal enshrined in the Bill of Rights", revealedIndex: 0 },
      { word: "BARBECUE",  hint: "Beloved American tradition of slow-cooking meat over fire", revealedIndex: 4 },
    ],
  },
];

// ── Storage helpers ───────────────────────────────────────────────────────────
const COMPLETED_KEY = "lgworld_completed";
const PROGRESS_KEY  = "lgworld_progress";
const HTP_KEY       = "lgworld_htp_seen";

function loadCompleted() {
  try { return JSON.parse(localStorage.getItem(COMPLETED_KEY) || "[]"); } catch { return []; }
}
function saveCompleted(arr) { localStorage.setItem(COMPLETED_KEY, JSON.stringify(arr)); }

function loadProgress(country) {
  try {
    const all = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
    return all[country] || null;
  } catch { return null; }
}
function saveProgress(country, data) {
  try {
    const all = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
    all[country] = data;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
  } catch {}
}
function clearProgress(country) {
  try {
    const all = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
    delete all[country];
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
  } catch {}
}

// ── Game helpers ──────────────────────────────────────────────────────────────
function buildTray(words) {
  // Tray = every letter from every word, EXCEPT the one revealed letter per word.
  // Duplicates are intentional — if two words share a letter, both copies go in.
  const pool = [];
  words.forEach(w => {
    w.word.split("").forEach((letter, idx) => {
      if (idx !== w.revealedIndex) pool.push(letter);
    });
  });
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

function initSlots(words) {
  return words.map(w => {
    const slots = Array(w.word.length).fill("");
    slots[w.revealedIndex] = w.word[w.revealedIndex];
    return slots;
  });
}

// ── Postcard Modal ────────────────────────────────────────────────────────────
function PostcardModal({ puzzle, elapsed, onClose }) {
  const [copied, setCopied] = useState(false);
  const fmt = (s) => { if (!s) return ""; const m = Math.floor(s/60), sec = s%60; return m>0?`${m}m ${sec}s`:`${sec}s`; };
  const shareText = `${puzzle.flag} Letter Griddle Geo — ${puzzle.country}\n⏱ Solved in ${fmt(elapsed)}\n\n${puzzle.words.map(()=>"🟩").join("")}\n\n🌍 Play at lettergriddle.com/geo\n🥞 More games at lettergriddle.com`;
  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <div className="postcard-overlay" onClick={onClose}>
      <div className="postcard" onClick={e => e.stopPropagation()}>
        <div className="postcard-stamp"><span className="stamp-flag">{puzzle.flag}</span><span className="stamp-text">VISITED</span></div>
        <div className="postcard-header">
          <p className="postcard-from">✈️ Greetings from</p>
          <h2 className="postcard-country">{puzzle.country}</h2>
          {elapsed && <p className="postcard-time">Solved in {fmt(elapsed)}</p>}
        </div>
        <div className="postcard-words">
          {puzzle.words.map((w, i) => <span key={i} className="postcard-word">🟩 {w.word}</span>)}
        </div>
        <div className="postcard-divider"><span>✦</span><span>✦</span><span>✦</span></div>
        <div className="postcard-fact">
          <p className="postcard-fact-label">🌍 Did You Know?</p>
          <p className="postcard-fact-text">{puzzle.funFact}</p>
        </div>
        <div className="postcard-footer">
          <button className="postcard-share-btn" onClick={handleCopy}>{copied ? "✓ Copied!" : "📋 Copy & Share"}</button>
          <button className="postcard-next-btn" onClick={onClose}>Choose Next Country →</button>
        </div>
      </div>
      <style>{postcardStyles}</style>
    </div>
  );
}

// ── Suggest Banner ────────────────────────────────────────────────────────────
function SuggestBanner({ onClose }) {
  return (
    <div className="suggest-banner" onClick={onClose}>
      <button className="suggest-close" onClick={onClose}>×</button>
      <div className="suggest-card" onClick={e => e.stopPropagation()}>
        <div className="suggest-icon">🌍</div>
        <p className="suggest-title">Have an idea for a great Letter Griddle Geo puzzle?</p>
        <p className="suggest-text">We're building Letter Griddle Geo one puzzle at a time. We'd love your ideas! Email us your country, city, or landmark suggestion along with 5 words having 4, 5, 6, 7, and 8 letters that capture it to get your puzzle published with credit!</p>
        <a className="suggest-link" href="mailto:lettergriddle@gmail.com?subject=Letter%20Griddle%20Geo%20Puzzle%20Suggestion&body=Country%2FCity%2FLandmark%3A%20%0A%0AMy%205%20words%3A%0A4-letter%3A%20%0A5-letter%3A%20%0A6-letter%3A%20%0A7-letter%3A%20%0A8-letter%3A%20%0A%0AHint%20for%20each%20word%20(optional)%3A%20%0A%0AMy%20name%20for%20the%20credit%3A%20">lettergriddle@gmail.com</a>
      </div>
    </div>
  );
}

// ── How To Play Modal ─────────────────────────────────────────────────────────
function HowToPlayModal({ onClose }) {
  return (
    <div className="htp-overlay" onClick={onClose}>
      <div className="htp-card" onClick={e => e.stopPropagation()}>
        <button className="htp-close" onClick={onClose}>×</button>

        <div className="htp-header">
          <div className="htp-logo">🥞</div>
          <h2 className="htp-title">Letter Griddle Geo</h2>
          <p className="htp-tagline">Pick a country. Solve the words. Collect the stamps.</p>
        </div>

        <div className="htp-steps">
          <div className="htp-step">
            <span className="htp-step-icon">🌍</span>
            <div>
              <p className="htp-step-title">Choose a Country</p>
              <p className="htp-step-text">Pick any country from the grid to start your puzzle. Play them in any order!</p>
            </div>
          </div>
          <div className="htp-step">
            <span className="htp-step-icon">🍳</span>
            <div>
              <p className="htp-step-title">Solve 5 Words</p>
              <p className="htp-step-text">Each puzzle has 5 words about that country that are 4, 5, 6, 7, and 8 letters long. One letter is revealed in each word to get you started.</p>
            </div>
          </div>
          <div className="htp-step">
            <span className="htp-step-icon">🔤</span>
            <div>
              <p className="htp-step-title">Place the Letters</p>
              <p className="htp-step-text">Tap a letter from the tray, then tap an empty slot to place it. On a computer, just type! Solve words in any order — tap a word row to focus it.</p>
            </div>
          </div>
          <div className="htp-step">
            <span className="htp-step-icon">💡</span>
            <div>
              <p className="htp-step-title">Use Hints</p>
              <p className="htp-step-text">Stuck? Each word has a hint button. No penalty for using them!  Hints are there to help!</p>
            </div>
          </div>
          <div className="htp-step">
            <span className="htp-step-icon">📬</span>
            <div>
              <p className="htp-step-title">Collect Your Stamp & Share</p>
              <p className="htp-step-text">Finish a country and earn a passport stamp! A postcard pops up with a fun fact and a share card to send to friends.</p>
            </div>
          </div>
          <div className="htp-step">
            <span className="htp-step-icon">⏳</span>
            <div>
              <p className="htp-step-title">Pick Up Where You Left Off</p>
              <p className="htp-step-text">Your progress saves automatically. Come back anytime and resume right where you stopped.</p>
            </div>
          </div>
        </div>

        <button className="htp-start-btn" onClick={onClose}>
          Start Exploring 🌍
        </button>

        <p className="htp-footer-note">Part of the <a href="https://lettergriddle.com" className="htp-link">Letter Griddle</a> family of games 🥞</p>
      </div>
      <style>{htpStyles}</style>
    </div>
  );
}

// ── Country Selection Screen ──────────────────────────────────────────────────
function SelectionScreen({ completed, onSelect, mounted, onHowToPlay, onReset }) {
  const [showSuggest, setShowSuggest] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const inProgress = mounted ? PUZZLES.filter(p => loadProgress(p.country) && !completed.includes(p.country)) : [];

  const handleReset = () => {
    // Clear all localStorage keys
    localStorage.removeItem(COMPLETED_KEY);
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(HTP_KEY);
    setShowReset(false);
    onReset();
  };
  return (
    <div className="screen selection-screen">
      <header className="sel-header">
        <div className="sel-logo">🥞</div>
        <h1 className="sel-title">Letter Griddle Geo</h1>
        <p className="sel-sub">Pick a country. Solve the words. 🌍</p>
        <button className="htp-trigger-btn" onClick={onHowToPlay}>❓ How to Play</button>
      </header>
      <div className="progress-bar-wrap">
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${(completed.length / PUZZLES.length) * 100}%` }} />
        </div>
        <span className="progress-label">{completed.length}/{PUZZLES.length} countries visited</span>
      </div>
      {inProgress.length > 0 && (
        <div className="resume-section">
          <p className="resume-label">⏳ In progress</p>
          <div className="resume-grid">
            {inProgress.map(p => (
              <button key={p.country} className="resume-card" onClick={() => onSelect(p)}>
                <span className="resume-flag">{p.flag}</span>
                <span className="resume-name">{p.country}</span>
                <span className="resume-badge">Resume →</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="country-grid">
        {[...PUZZLES].sort((a, b) => a.country.localeCompare(b.country)).map((p) => {
          const done = completed.includes(p.country);
          const wip  = mounted && !done && !!loadProgress(p.country);
          return (
            <button key={p.country} className={`country-card ${done?"done":""} ${wip?"wip":""}`} onClick={() => onSelect(p)}>
              <span className="card-flag">{p.flag}</span>
              <span className="card-name">{p.country}</span>
              {done && (
                <div className="card-stamp">
                  <svg viewBox="0 0 44 44" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="40" height="40" rx="3"
                      fill="none" stroke="rgba(96,165,250,0.8)" strokeWidth="1.5"
                      strokeDasharray="3,2.5" />
                    <rect x="6" y="6" width="32" height="32" rx="2"
                      fill="rgba(30,58,138,0.88)" stroke="rgba(96,165,250,0.55)" strokeWidth="1" />
                    <path id="arc-top2" d="M 11,22 a 11,11 0 0,1 22,0" fill="none" />
                    <text fontSize="5" fontWeight="800" letterSpacing="1.2"
                      fill="rgba(147,197,253,0.95)" fontFamily="sans-serif">
                      <textPath href="#arc-top2" startOffset="8%">VISITED</textPath>
                    </text>
                    <text x="22" y="28" textAnchor="middle" fontSize="12">⭐</text>
                    <line x1="11" y1="32" x2="33" y2="32" stroke="rgba(96,165,250,0.5)" strokeWidth="0.8" />
                    <text x="22" y="37" textAnchor="middle" fontSize="4" fontWeight="700"
                      fill="rgba(147,197,253,0.75)" fontFamily="sans-serif" letterSpacing="0.3">GEO</text>
                  </svg>
                </div>
              )}
              {wip  && <span className="card-wip">…</span>}
            </button>
          );
        })}
      </div>
      <button className="suggest-trigger" onClick={() => setShowSuggest(true)}>🌐 Suggest a puzzle</button>
      {showSuggest && <SuggestBanner onClose={() => setShowSuggest(false)} />}

      {showReset && (
        <div className="reset-overlay" onClick={() => setShowReset(false)}>
          <div className="reset-card" onClick={e => e.stopPropagation()}>
            <p className="reset-icon">🗺️</p>
            <h3 className="reset-title">Reset All Travels?</h3>
            <p className="reset-text">This will clear all your stamps, progress, and saved games. Your passport will be blank again. This cannot be undone.</p>
            <div className="reset-btns">
              <button className="reset-confirm-btn" onClick={handleReset}>Yes, start over</button>
              <button className="reset-cancel-btn" onClick={() => setShowReset(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <button className="reset-trigger" onClick={() => setShowReset(true)}>↺ Reset all travels</button>

      <footer className="geo-footer">
        <a className="footer-home" href="https://lettergriddle.com">🥞 lettergriddle.com</a>
        <div className="footer-links">
          <a href="https://lettergriddle.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          <span className="footer-dot">·</span>
          <a href="https://lettergriddle.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Letter Griddle Geo. All rights reserved.</p>
      </footer>

      <style>{selectionStyles}</style>
    </div>
  );
}

// ── Game Screen ───────────────────────────────────────────────────────────────
function GameScreen({ puzzle, onBack, onComplete, alreadyDone }) {
  // Restore saved progress or start fresh
  const saved = !alreadyDone ? loadProgress(puzzle.country) : null;

  const [slots, setSlots]         = useState(() => saved?.slots   || initSlots(puzzle.words));
  const [completed, setCompleted] = useState(() => saved?.completed || puzzle.words.map(() => false));
  const [tray, setTray]           = useState(() => {
    if (saved?.tray) return saved.tray;
    // Fresh game: full tray minus revealed letters
    return buildTray(puzzle.words);
  });
  const [selected, setSelected]   = useState(null);
  const [hints, setHints]         = useState(() => puzzle.words.map(() => false));
  const [wrong, setWrong]         = useState({});
  const [celebrating, setCelebrating] = useState(null);
  const [allDone, setAllDone]     = useState(alreadyDone);
  const [showPostcard, setShowPostcard] = useState(alreadyDone);
  const [confetti, setConfetti]   = useState([]);
  const [startTime]               = useState(() => saved?.startTime || Date.now());
  const [elapsed, setElapsed]     = useState(saved?.elapsed || null);
  const [activeWord, setActiveWord] = useState(0); // which word keyboard types into

  // ── Auto-save progress ──────────────────────────────────────────────────────
  useEffect(() => {
    if (allDone) return;
    saveProgress(puzzle.country, { slots, tray, completed, startTime, elapsed });
  }, [slots, tray, completed]);

  const placeIntoSlot = useCallback((wIdx, sIdx, letter, trayIdx) => {
    const cur = slots[wIdx][sIdx]; // letter already in this slot (if any)

    // Build new slots with the letter placed
    const newSlots = slots.map(r => [...r]);
    newSlots[wIdx][sIdx] = letter;

    // Build new tray: remove the placed letter, add back displaced letter if any
    const newTray = [...tray];
    newTray.splice(trayIdx, 1);       // remove the letter we just placed
    if (cur) newTray.push(cur);       // return displaced letter in one atomic update

    // Apply both state updates together so nothing gets lost
    setSlots(newSlots);
    setTray(newTray);
    setSelected(null);

    if (letter !== puzzle.words[wIdx].word[sIdx]) flashWrong(`${wIdx}-${sIdx}`);
    checkWord(wIdx, newSlots[wIdx]);
  }, [slots, tray, puzzle]);

  // ── Auto-advance activeWord when a word is completed ──────────────────────
  useEffect(() => {
    if (completed[activeWord]) {
      // Move to the next incomplete word
      const next = puzzle.words.findIndex((_, i) => !completed[i] && i !== activeWord);
      if (next !== -1) setActiveWord(next);
    }
  }, [completed]);

  // ── Keyboard support ────────────────────────────────────────────────────────
  // Typing fills the ACTIVE word. Click any word row to make it active.
  // Backspace removes the last placed letter from the active word.
  useEffect(() => {
    if (allDone) return;
    const handleKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key.toUpperCase();

      // ── Letter typed → place into active word's next empty slot ───────────
      if (/^[A-Z]$/.test(key)) {
        e.preventDefault();
        const trayIdx = tray.findIndex(l => l === key);
        if (trayIdx === -1) return;

        // Try active word first, then fall through to any other incomplete word
        const order = [
          activeWord,
          ...puzzle.words.map((_, i) => i).filter(i => i !== activeWord)
        ];

        for (const wIdx of order) {
          if (completed[wIdx]) continue;
          const row = slots[wIdx];
          for (let sIdx = 0; sIdx < row.length; sIdx++) {
            if (sIdx === puzzle.words[wIdx].revealedIndex) continue;
            if (!row[sIdx]) {
              placeIntoSlot(wIdx, sIdx, key, trayIdx);
              setActiveWord(wIdx);
              return;
            }
          }
        }
        return;
      }

      // ── Backspace → remove last letter from active word ────────────────────
      if (e.key === "Backspace") {
        e.preventDefault();
        // Try active word first, then scan backwards
        const order = [
          activeWord,
          ...Array.from({length: puzzle.words.length}, (_, i) => puzzle.words.length - 1 - i)
            .filter(i => i !== activeWord)
        ];
        for (const wIdx of order) {
          if (completed[wIdx]) continue;
          const row = slots[wIdx];
          for (let sIdx = row.length - 1; sIdx >= 0; sIdx--) {
            if (sIdx === puzzle.words[wIdx].revealedIndex) continue;
            if (row[sIdx]) {
              const letter = row[sIdx];
              setTray(p => [...p, letter]);
              setSlots(p => { const n = p.map(r => [...r]); n[wIdx][sIdx] = ""; return n; });
              return;
            }
          }
        }
        return;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [tray, slots, completed, allDone, activeWord, placeIntoSlot]);


  const flashWrong = useCallback((key) => {
    setWrong(p => ({ ...p, [key]: true }));
    setTimeout(() => setWrong(p => { const n={...p}; delete n[key]; return n; }), 800);
  }, []);

  const checkWord = useCallback((wordIdx, newSlots) => {
    if (newSlots.join("") === puzzle.words[wordIdx].word) {
      setCompleted(prev => {
        const n = [...prev]; n[wordIdx] = true;
        if (n.every(Boolean)) {
          const t = Math.round((Date.now() - startTime) / 1000);
          setElapsed(t);
          setAllDone(true);
          clearProgress(puzzle.country);
          setConfetti(Array.from({ length: 45 }, (_, i) => ({
            id: i, x: Math.random() * 100, delay: Math.random() * 2,
            color: ["#60a5fa","#93c5fd","#fbbf24","#34d399","#a78bfa","#fde68a","#38bdf8"][i%7],
            size: 6 + Math.random() * 8,
          })));
          onComplete(puzzle.country);
          setTimeout(() => setShowPostcard(true), 900);
        }
        setCelebrating(wordIdx);
        setTimeout(() => setCelebrating(null), 1000);
        return n;
      });
    }
  }, [puzzle, startTime, onComplete]);

  const handleTrayClick = (letter, idx) => {
    if (selected?.trayIdx === idx) { setSelected(null); return; }
    setSelected({ letter, trayIdx: idx });
  };

  const handleSlotClick = (wIdx, sIdx) => {
    const isRevealed = sIdx === puzzle.words[wIdx].revealedIndex;
    if (isRevealed || completed[wIdx]) return;
    const cur = slots[wIdx][sIdx];
    if (cur && !selected) {
      // Return letter to tray atomically
      const newSlots = slots.map(r => [...r]);
      newSlots[wIdx][sIdx] = "";
      setSlots(newSlots);
      setTray(p => [...p, cur]);
      return;
    }
    if (!selected) return;
    placeIntoSlot(wIdx, sIdx, selected.letter, selected.trayIdx);
  };

  const shuffle = () => {
    setTray(p => {
      const t=[...p];
      for (let i=t.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[t[i],t[j]]=[t[j],t[i]];}
      return t;
    });
  };

  return (
    <div className="screen game-screen">
      {confetti.map(c => (
        <div key={c.id} className="confetti-piece" style={{ left:`${c.x}%`, background:c.color, animationDelay:`${c.delay}s`, width:`${c.size}px`, height:`${c.size}px` }} />
      ))}

      {showPostcard && <PostcardModal puzzle={puzzle} elapsed={elapsed} onClose={() => { setShowPostcard(false); onBack(); }} />}

      <div className="game-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="game-title-wrap">
          <span className="game-flag">{puzzle.flag}</span>
          <h2 className="game-country">{puzzle.country}</h2>
        </div>
        {allDone ? <button className="show-postcard-btn" onClick={() => setShowPostcard(true)}>📬</button>
                 : <div style={{width:40}} />}
      </div>

      <div className="keyboard-hint">⌨️ Click a word to focus it · Type to fill · Backspace to remove</div>

      <div className="words-area">
        {puzzle.words.map((w, wIdx) => (
          <div key={wIdx}
            className={`word-row ${completed[wIdx]?"word-done":""} ${celebrating===wIdx?"word-celebrating":""} ${!completed[wIdx]&&activeWord===wIdx?"word-active":""}`}
            onClick={() => { if (!completed[wIdx]) setActiveWord(wIdx); }}>
            <div className="word-meta">
              <span className="word-num">Word {wIdx+1}</span>
              <span className="word-len">{w.word.length} letters</span>
              <button className="hint-btn" onClick={() => setHints(p=>{const n=[...p];n[wIdx]=!n[wIdx];return n;})}>
                {hints[wIdx]?"Hide hint":"Hint"}
              </button>
            </div>
            {hints[wIdx] && <p className="hint-text">💡 {w.hint}</p>}
            <div className="slots">
              {w.word.split("").map((_, sIdx) => {
                const isRevealed = sIdx === w.revealedIndex;
                const letter = slots[wIdx][sIdx];
                const isWrong = wrong[`${wIdx}-${sIdx}`];
                return (
                  <div key={sIdx}
                    className={`slot ${isRevealed?"slot-revealed":""} ${completed[wIdx]?"slot-complete":""} ${isWrong?"slot-wrong":""} ${letter&&!isRevealed&&!completed[wIdx]?"slot-filled":""}`}
                    onClick={() => handleSlotClick(wIdx, sIdx)}>
                    {letter}
                  </div>
                );
              })}
            </div>
            {completed[wIdx] && <span className="word-honey">🍯</span>}
          </div>
        ))}
      </div>

      {!allDone && (
        <div className="tray-area">
          <div className="tray-header">
            <span className="tray-label">🍳 Letters</span>
            <button className="shuffle-btn" onClick={shuffle}>Shuffle ↺</button>
          </div>
          <div className="tray">
            {tray.map((letter, idx) => (
              <button key={idx} className={`tile ${selected?.trayIdx===idx?"tile-selected":""}`} onClick={() => handleTrayClick(letter, idx)}>
                {letter}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{gameStyles}</style>
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [completed, setCompleted] = useState([]);  // always start empty on server
  const [activePuzzle, setActivePuzzle] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [showHtp, setShowHtp] = useState(false);

  // Load localStorage only after mount (client-side only)
  useEffect(() => {
    setCompleted(loadCompleted());
    setMounted(true);
    // Show How to Play for first-time visitors
    if (!localStorage.getItem(HTP_KEY)) {
      setShowHtp(true);
      localStorage.setItem(HTP_KEY, "true");
    }
  }, []);

  const closeHtp = () => setShowHtp(false);

  const handleComplete = (country) => {
    setCompleted(prev => {
      if (prev.includes(country)) return prev;
      const next = [...prev, country];
      saveCompleted(next);
      return next;
    });
  };

  return (
    <div className="app-root">
      {activePuzzle
        ? <GameScreen puzzle={activePuzzle} onBack={() => setActivePuzzle(null)}
            onComplete={handleComplete} alreadyDone={completed.includes(activePuzzle.country)} />
        : <SelectionScreen completed={completed} onSelect={setActivePuzzle} mounted={mounted} onHowToPlay={() => setShowHtp(true)} onReset={() => setCompleted([])} />}
      {showHtp && <HowToPlayModal onClose={closeHtp} />}
      <style>{globalStyles}</style>
    </div>
  );
}


const htpStyles = `
  .htp-overlay { position: fixed; inset: 0; z-index: 400; background: rgba(0,0,20,0.85); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 16px; animation: fadeIn 0.3s ease; overflow-y: auto; }
  .htp-card { width: 100%; max-width: 420px; background: linear-gradient(160deg, #0a0f2e 0%, #0d1540 50%, #0a1028 100%); border: 1px solid rgba(96,165,250,0.25); border-radius: 24px; padding: 28px 24px 24px; position: relative; box-shadow: 0 0 60px rgba(59,130,246,0.15), 0 30px 60px rgba(0,0,0,0.6); animation: postcardSlideUp 0.45s cubic-bezier(0.34,1.56,0.64,1); }
  .htp-close { position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15); color: #93c5fd; font-size: 20px; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
  .htp-close:hover { background: rgba(255,255,255,0.14); }
  .htp-header { text-align: center; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid rgba(96,165,250,0.15); }
  .htp-logo { font-size: 40px; margin-bottom: 6px; filter: drop-shadow(0 0 12px rgba(96,165,250,0.4)); }
  .htp-title { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 900; color: #bfdbfe; margin-bottom: 6px; }
  .htp-tagline { font-size: 13px; color: #93c5fd; font-weight: 600; opacity: 0.8; }
  .htp-steps { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
  .htp-step { display: flex; gap: 14px; align-items: flex-start; }
  .htp-step-icon { font-size: 22px; flex-shrink: 0; margin-top: 1px; }
  .htp-step-title { font-size: 13px; font-weight: 800; color: #bfdbfe; margin-bottom: 3px; }
  .htp-step-text { font-size: 12px; color: #93c5fd; line-height: 1.55; opacity: 0.85; }
  .htp-start-btn { width: 100%; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none; border-radius: 12px; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 15px; padding: 14px; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 16px rgba(29,78,216,0.4); margin-bottom: 14px; }
  .htp-start-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(29,78,216,0.55); }
  .htp-footer-note { text-align: center; font-size: 12px; color: #93c5fd; opacity: 0.5; }
  .htp-link { color: #60a5fa; text-decoration: none; font-weight: 700; }
  .htp-link:hover { opacity: 0.8; }
`;
// ── Styles ────────────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Nunito:wght@400;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .app-root {
    min-height: 100vh;
    background:
      /* Sapphire bloom — top left */
      radial-gradient(ellipse 70% 50% at 8% 5%,  rgba(59,130,246,0.22) 0%, transparent 60%),
      /* Midnight indigo — top right */
      radial-gradient(ellipse 65% 55% at 93% 6%,  rgba(49,46,129,0.75) 0%, transparent 62%),
      /* Deep navy — bottom left */
      radial-gradient(ellipse 65% 65% at 4% 93%,  rgba(15,23,80,0.80)  0%, transparent 60%),
      /* Cobalt center-left depth */
      radial-gradient(ellipse 45% 60% at 8% 50%,  rgba(29,78,216,0.35) 0%, transparent 58%),
      /* Ocean abyss — bottom right */
      radial-gradient(ellipse 55% 50% at 95% 95%,  rgba(7,15,60,0.80)   0%, transparent 58%),
      /* Indigo drift — center */
      radial-gradient(ellipse 65% 45% at 52% 58%, rgba(55,48,163,0.30) 0%, transparent 65%),
      /* Warm gold coastline band */
      radial-gradient(ellipse 80% 7%  at 50% 52%, rgba(210,155,30,0.18) 0%, rgba(180,120,15,0.09) 40%, transparent 70%),
      /* Sandy shore — soft warm */
      radial-gradient(ellipse 55% 10% at 38% 60%, rgba(196,130,15,0.12) 0%, transparent 70%),
      /* Royal blue upper warmth */
      radial-gradient(ellipse 50% 40% at 60% 12%, rgba(30,64,175,0.25) 0%, transparent 52%),
      /* Deep base — navy to midnight indigo */
      linear-gradient(155deg,
        #020410 0%,  #050726 10%, #030518 20%, #08093a 32%,
        #020315 42%, #0a0a3a 48%, #120d40 51%, #0a0a3a 54%,
        #030520 64%, #060830 74%, #020415 85%, #060826 100%
      );
    font-family: 'Nunito', sans-serif;
    position: relative;
  }

  /* Cartographic latitude/longitude grid */
  .app-root::before {
    content: '';
    position: fixed; inset: 0;
    background-image:
      linear-gradient(rgba(96,165,250,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px),
      linear-gradient(45deg,  rgba(147,197,253,0.015) 1px, transparent 1px),
      linear-gradient(-45deg, rgba(147,197,253,0.015) 1px, transparent 1px);
    background-size: 40px 40px, 40px 40px, 56px 56px, 56px 56px;
    pointer-events: none; z-index: 0;
  }

  /* Deep vignette */
  .app-root::after {
    content: '';
    position: fixed; inset: 0;
    background:
      radial-gradient(ellipse at center, transparent 30%, rgba(2,2,20,0.5) 70%, rgba(1,1,12,0.80) 100%),
      linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.4) 100%);
    pointer-events: none; z-index: 0;
  }

  .screen { min-height: 100vh; padding: 16px; max-width: 480px; margin: 0 auto; position: relative; z-index: 1; }
`;

const postcardStyles = `
  .postcard-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(0,0,10,0.80); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.3s ease; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .postcard { width: 100%; max-width: 380px; background: linear-gradient(145deg, #fdf6e3 0%, #fef0c4 40%, #fde8a8 70%, #fdf0d0 100%); border-radius: 12px; border: 1px solid rgba(200,160,60,0.5); box-shadow: 0 0 0 4px rgba(180,140,40,0.12), 0 30px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.8); padding: 24px 22px 20px; position: relative; animation: postcardSlideUp 0.5s cubic-bezier(0.34,1.56,0.64,1); background-image: repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(180,140,40,0.04) 28px, rgba(180,140,40,0.04) 29px), linear-gradient(145deg, #fdf6e3 0%, #fef0c4 40%, #fde8a8 70%, #fdf0d0 100%); }
  @keyframes postcardSlideUp { from { transform: translateY(40px) scale(0.92) rotate(-1deg); opacity: 0; } to { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; } }
  .postcard::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: repeating-linear-gradient(180deg, #3b82f6 0px, #3b82f6 12px, #1d4ed8 12px, #1d4ed8 24px, #6366f1 24px, #6366f1 36px); border-radius: 12px 0 0 12px; }
  .postcard-stamp { position: absolute; top: 14px; right: 14px; width: 52px; height: 62px; background: linear-gradient(135deg, #dbeafe, #bfdbfe); border: 2px solid #3b82f6; border-radius: 4px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; box-shadow: 2px 2px 6px rgba(0,0,0,0.2); outline: 3px dotted rgba(59,130,246,0.3); outline-offset: 2px; }
  .stamp-flag { font-size: 22px; line-height: 1; }
  .stamp-text { font-size: 7px; font-weight: 900; color: #1d4ed8; letter-spacing: 1px; }
  .postcard-header { padding-left: 10px; margin-bottom: 12px; padding-right: 60px; }
  .postcard-from { font-size: 11px; color: #b45309; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 2px; }
  .postcard-country { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 900; color: #78350f; line-height: 1.1; }
  .postcard-time { font-size: 12px; color: #b45309; font-weight: 700; margin-top: 3px; }
  .postcard-words { padding-left: 10px; display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
  .postcard-word { font-size: 12px; font-weight: 800; color: #1d4ed8; background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.25); border-radius: 99px; padding: 2px 9px; }
  .postcard-divider { display: flex; justify-content: center; gap: 8px; color: #d97706; font-size: 10px; margin-bottom: 14px; opacity: 0.6; }
  .postcard-fact { background: rgba(59,130,246,0.06); border: 1px solid rgba(59,130,246,0.18); border-radius: 8px; padding: 12px 14px; margin: 0 0 16px 0; }
  .postcard-fact-label { font-size: 11px; font-weight: 900; color: #1e40af; letter-spacing: 0.5px; margin-bottom: 6px; text-transform: uppercase; }
  .postcard-fact-text { font-size: 12.5px; color: #78350f; line-height: 1.6; font-family: Georgia, serif; }
  .postcard-footer { display: flex; gap: 8px; padding-left: 10px; }
  .postcard-share-btn { flex: 1; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none; border-radius: 8px; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 13px; padding: 10px 12px; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(29,78,216,0.35); }
  .postcard-share-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(29,78,216,0.5); }
  .postcard-next-btn { flex: 1; background: rgba(30,64,175,0.08); color: #1e40af; border: 1px solid rgba(30,64,175,0.22); border-radius: 8px; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 13px; padding: 10px 12px; cursor: pointer; transition: all 0.2s; }
  .postcard-next-btn:hover { background: rgba(30,64,175,0.15); }
`;

const selectionStyles = `
  .selection-screen { display: flex; flex-direction: column; align-items: center; gap: 18px; padding-bottom: 40px; }
  .sel-header { text-align: center; }
  .sel-logo { font-size: 48px; margin-bottom: 4px; filter: drop-shadow(0 0 16px rgba(96,165,250,0.6)); }
  .sel-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: #bfdbfe; letter-spacing: -0.5px; text-shadow: 0 0 30px rgba(96,165,250,0.4); }
  .sel-sub { color: #93c5fd; font-size: 14px; font-weight: 600; margin-top: 4px; opacity: 0.8; }
  .progress-bar-wrap { width: 100%; }
  .progress-bar-track { width: 100%; height: 8px; background: rgba(96,165,250,0.12); border: 1px solid rgba(96,165,250,0.2); border-radius: 99px; overflow: hidden; }
  .progress-bar-fill { height: 100%; background: linear-gradient(90deg, #60a5fa, #3b82f6); border-radius: 99px; transition: width 0.5s ease; box-shadow: 0 0 10px rgba(96,165,250,0.6); }
  .progress-label { display: block; text-align: right; font-size: 11px; color: #93c5fd; margin-top: 4px; font-weight: 700; opacity: 0.7; }

  .resume-section { width: 100%; }
  .resume-label { font-size: 11px; font-weight: 800; color: #93c5fd; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; opacity: 0.7; }
  .resume-grid { display: flex; flex-direction: column; gap: 6px; }
  .resume-card { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: rgba(59,130,246,0.10); border: 1px solid rgba(96,165,250,0.3); border-radius: 12px; cursor: pointer; transition: all 0.2s; }
  .resume-card:hover { background: rgba(59,130,246,0.18); }
  .resume-flag { font-size: 22px; }
  .resume-name { font-size: 14px; font-weight: 700; color: #bfdbfe; flex: 1; text-align: left; }
  .resume-badge { font-size: 11px; font-weight: 800; color: #60a5fa; }

  .country-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; width: 100%; }
  .country-card { position: relative; display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 16px 8px; background: rgba(255,255,255,0.04); border: 1px solid rgba(96,165,250,0.18); border-radius: 16px; cursor: pointer; transition: all 0.25s; box-shadow: 0 2px 12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06); backdrop-filter: blur(6px); }
  .country-card:hover { transform: translateY(-3px); background: rgba(59,130,246,0.10); border-color: rgba(96,165,250,0.50); box-shadow: 0 8px 24px rgba(0,0,0,0.45), 0 0 18px rgba(59,130,246,0.15); }
  .country-card.done { background: rgba(59,130,246,0.10); border-color: rgba(96,165,250,0.40); }
  .country-card.wip  { border-color: rgba(251,191,36,0.35); background: rgba(251,191,36,0.06); }
  .card-flag { font-size: 36px; }
  .card-name { font-size: 13px; font-weight: 700; color: #bfdbfe; text-align: center; }
  .card-stamp {
    position: absolute; top: 4px; right: 4px;
    animation: stampIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes stampIn {
    from { transform: scale(1.4) rotate(-18deg); opacity: 0; }
    to   { transform: scale(1)   rotate(-15deg); opacity: 1; }
  }
  .card-stamp svg { transform: rotate(-15deg); filter: drop-shadow(0 0 6px rgba(96,165,250,0.5)); }
  .card-wip   { position: absolute; top: 6px; right: 8px; background: #d97706; color: white; font-size: 11px; font-weight: 800; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

  .suggest-trigger { background: rgba(96,165,250,0.07); border: 1px dashed rgba(96,165,250,0.35); color: #93c5fd; font-family: 'Nunito', sans-serif; font-size: 13px; font-weight: 700; padding: 10px 20px; border-radius: 99px; cursor: pointer; transition: all 0.2s; }
  .suggest-trigger:hover { background: rgba(96,165,250,0.14); border-style: solid; }

  .suggest-banner { position: fixed; inset: 0; background: rgba(0,0,20,0.75); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 24px; z-index: 100; }
  .suggest-close { position: absolute; top: 24px; right: 24px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #bfdbfe; font-size: 20px; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }
  .suggest-card { background: linear-gradient(145deg, #0f172a, #1e1b4b); border: 1px solid rgba(96,165,250,0.3); border-radius: 20px; padding: 28px 24px; max-width: 360px; width: 100%; text-align: center; position: relative; box-shadow: 0 0 40px rgba(59,130,246,0.15); }
  .suggest-icon { font-size: 44px; margin-bottom: 10px; }
  .suggest-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 900; color: #bfdbfe; margin-bottom: 12px; }
  .suggest-text { font-size: 13px; color: #93c5fd; line-height: 1.7; margin-bottom: 16px; }
  .suggest-link { display: inline-block; color: #60a5fa; font-weight: 800; font-size: 14px; text-decoration: none; border-bottom: 1px solid rgba(96,165,250,0.4); padding-bottom: 2px; }
  .htp-trigger-btn { margin-top: 10px; background: rgba(96,165,250,0.10); border: 1px solid rgba(96,165,250,0.30); color: #93c5fd; font-family: 'Nunito', sans-serif; font-size: 13px; font-weight: 700; padding: 7px 16px; border-radius: 99px; cursor: pointer; transition: all 0.2s; }
  .htp-trigger-btn:hover { background: rgba(96,165,250,0.20); border-color: rgba(96,165,250,0.55); }

  .geo-footer { width: 100%; text-align: center; padding: 16px 0 8px; display: flex; flex-direction: column; align-items: center; gap: 8px; border-top: 1px solid rgba(96,165,250,0.12); margin-top: 4px; }
  .footer-home { color: #fbbf24; font-weight: 800; font-size: 14px; text-decoration: none; letter-spacing: 0.3px; transition: opacity 0.2s; }
  .footer-home:hover { opacity: 0.75; }
  .footer-links { display: flex; align-items: center; gap: 8px; }
  .footer-links a { color: #93c5fd; font-size: 12px; font-weight: 600; text-decoration: none; opacity: 0.7; transition: opacity 0.2s; }
  .footer-links a:hover { opacity: 1; }
  .footer-dot { color: #93c5fd; opacity: 0.4; font-size: 12px; }
  .footer-copy { color: #93c5fd; font-size: 11px; opacity: 0.4; font-weight: 600; }

  .reset-trigger { background: none; border: none; color: #93c5fd; font-family: 'Nunito', sans-serif; font-size: 12px; font-weight: 600; opacity: 0.35; cursor: pointer; padding: 4px 8px; transition: opacity 0.2s; }
  .reset-trigger:hover { opacity: 0.65; }

  .reset-overlay { position: fixed; inset: 0; z-index: 400; background: rgba(0,0,20,0.85); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn 0.2s ease; }
  .reset-card { background: linear-gradient(160deg, #0a0f2e, #0d1540); border: 1px solid rgba(239,68,68,0.3); border-radius: 20px; padding: 28px 24px; max-width: 340px; width: 100%; text-align: center; box-shadow: 0 0 40px rgba(239,68,68,0.1), 0 20px 40px rgba(0,0,0,0.5); }
  .reset-icon { font-size: 40px; margin-bottom: 10px; }
  .reset-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 900; color: #bfdbfe; margin-bottom: 10px; }
  .reset-text { font-size: 13px; color: #93c5fd; line-height: 1.6; opacity: 0.8; margin-bottom: 20px; }
  .reset-btns { display: flex; flex-direction: column; gap: 10px; }
  .reset-confirm-btn { background: linear-gradient(135deg, #dc2626, #991b1b); color: white; border: none; border-radius: 10px; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 14px; padding: 12px; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(220,38,38,0.3); }
  .reset-confirm-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(220,38,38,0.4); }
  .reset-cancel-btn { background: rgba(255,255,255,0.06); color: #93c5fd; border: 1px solid rgba(96,165,250,0.2); border-radius: 10px; font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 14px; padding: 12px; cursor: pointer; transition: all 0.2s; }
  .reset-cancel-btn:hover { background: rgba(255,255,255,0.10); }
`;

const gameStyles = `
  .game-screen { display: flex; flex-direction: column; gap: 12px; position: relative; overflow: hidden; }
  .confetti-piece { position: fixed; top: -10px; border-radius: 2px; animation: confettiFall 2.8s ease-in forwards; z-index: 200; }
  @keyframes confettiFall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }

  .game-header { display: flex; align-items: center; justify-content: space-between; padding: 4px 0; }
  .back-btn { background: rgba(255,255,255,0.07); border: 1px solid rgba(96,165,250,0.3); color: #bfdbfe; font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 13px; padding: 6px 12px; border-radius: 99px; cursor: pointer; transition: all 0.2s; }
  .back-btn:hover { background: rgba(59,130,246,0.15); border-color: rgba(96,165,250,0.6); }
  .game-title-wrap { display: flex; align-items: center; gap: 8px; }
  .game-flag { font-size: 28px; }
  .game-country { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; color: #bfdbfe; text-shadow: 0 0 20px rgba(96,165,250,0.3); }
  .show-postcard-btn { background: rgba(96,165,250,0.15); border: 1px solid rgba(96,165,250,0.4); border-radius: 99px; font-size: 18px; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
  .show-postcard-btn:hover { background: rgba(96,165,250,0.28); }

  .keyboard-hint { text-align: center; font-size: 11px; color: #93c5fd; opacity: 0.5; font-weight: 600; letter-spacing: 0.3px; }

  .words-area { display: flex; flex-direction: column; gap: 9px; }
  .word-row { background: rgba(255,255,255,0.05); border: 1px solid rgba(96,165,250,0.18); border-radius: 16px; padding: 11px 12px; transition: all 0.3s; position: relative; backdrop-filter: blur(4px); box-shadow: 0 2px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05); }
  .word-row.word-done { border-color: rgba(96,165,250,0.45); background: rgba(59,130,246,0.10); box-shadow: 0 2px 10px rgba(0,0,0,0.3), 0 0 14px rgba(59,130,246,0.10); }
  .word-row.word-active { border-color: rgba(96,165,250,0.70); box-shadow: 0 2px 10px rgba(0,0,0,0.3), 0 0 0 2px rgba(96,165,250,0.35); cursor: default; }
  .word-row.word-celebrating { animation: bounce 0.5s ease; }
  @keyframes bounce { 0%,100% { transform: scale(1); } 50% { transform: scale(1.03); } }

  .word-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 7px; }
  .word-num  { font-size: 10px; font-weight: 900; color: #60a5fa; opacity: 0.6; letter-spacing: 0.5px; text-transform: uppercase; }
  .word-len  { font-size: 11px; font-weight: 700; color: #93c5fd; opacity: 0.6; flex: 1; }
  .hint-btn  { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none; border-radius: 99px; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 11px; padding: 3px 10px; cursor: pointer; }
  .hint-text { font-size: 12px; color: #bfdbfe; opacity: 0.85; margin-bottom: 7px; line-height: 1.4; }

  .slots { display: flex; gap: 5px; flex-wrap: wrap; }
  .slot { width: 34px; height: 34px; border: 2px solid rgba(96,165,250,0.28); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.15s; color: #bfdbfe; background: rgba(255,255,255,0.04); user-select: none; }
  .slot:hover { border-color: rgba(96,165,250,0.65); transform: scale(1.05); }
  .slot-revealed { background: rgba(251,191,36,0.20); border-color: rgba(251,191,36,0.50); color: #fde68a; cursor: default; }
  .slot-revealed:hover { transform: none; }
  .slot-filled   { background: rgba(96,165,250,0.18); border-color: rgba(96,165,250,0.55); }
  .slot-complete { background: linear-gradient(135deg, rgba(96,165,250,0.35), rgba(59,130,246,0.45)); border-color: rgba(96,165,250,0.75); cursor: default; }
  .slot-complete:hover { transform: none; }
  .slot-wrong    { background: rgba(239,68,68,0.20); border-color: rgba(239,68,68,0.55); animation: shake 0.4s ease; }
  @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
  .word-honey { position: absolute; right: 12px; bottom: 10px; font-size: 18px; }

  .tray-area { background: linear-gradient(135deg, #030520, #06083a); border: 1px solid rgba(96,165,250,0.15); border-radius: 20px; padding: 14px; box-shadow: 0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04); }
  .tray-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .tray-label  { color: #bfdbfe; font-size: 14px; font-weight: 800; }
  .shuffle-btn { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15); color: #93c5fd; font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 12px; padding: 4px 10px; border-radius: 99px; cursor: pointer; transition: all 0.2s; }
  .shuffle-btn:hover { background: rgba(59,130,246,0.18); }
  .tray { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
  .tile { width: 38px; height: 38px; background: linear-gradient(135deg, #bfdbfe, #93c5fd); border: 2px solid #60a5fa; border-radius: 50%; font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: #1e3a8a; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.35); }
  .tile:hover { transform: scale(1.1); box-shadow: 0 4px 14px rgba(0,0,0,0.45); }
  .tile-selected { background: linear-gradient(135deg, #93c5fd, #60a5fa); border-color: #3b82f6; transform: scale(1.15); box-shadow: 0 6px 18px rgba(59,130,246,0.5); }
`;
