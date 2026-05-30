"use client";
import { useState } from 'react';
import Link from 'next/link';

const CORRECT_PASSWORD = 'pancakes2026';

const classicGames = [
  {
    name: "Maze",
    tagline: "Reveal the secret message!",
    emoji: "☀️",
    href: "/maze",
    thumbnail: {
      gradient: "linear-gradient(160deg, #0c4a6e 0%, #312e81 50%, #c2410c 80%, #fbbf24 100%)",
      icon: "\u2600\uFE0F",
      iconSize: "text-5xl",
      title: ["Letter Griddle", "Maze"],
      subtitle: "A SUMMER ADVENTURE",
      subtitleColor: "text-emerald-200"
    },
    borderColor: "border-amber-400",
    bgColor: "from-amber-100 to-orange-100",
    textColor: "text-amber-900",
    subTextColor: "text-amber-700",
    hoverBg: "bg-amber-600/80"
  },
  {
    name: "Has the Goods",
    tagline: "Sort goods before time runs out!",
    emoji: "🧲",
    href: "/goods",
    thumbnail: {
      gradient: "linear-gradient(160deg, #3a1a7e 0%, #a02070 45%, #c27a1c 80%, #eaa020 100%)",
      icon: "🧲",
      iconSize: "text-4xl",
      title: ["Has the", "Goods!"],
      subtitle: "SORT THE ITEMS",
      subtitleColor: "text-amber-100"
    },
    borderColor: "border-amber-400",
    bgColor: "from-amber-100 to-orange-100",
    textColor: "text-amber-800",
    subTextColor: "text-amber-700",
    hoverBg: "bg-amber-600/80"
  },
  {
    name: "Ambiance",
    tagline: "Music for your puzzle sessions",
    emoji: "🎹",
    href: "/ambiance",
    thumbnail: {
      gradient: "linear-gradient(160deg, #4a0a6e 0%, #b01060 45%, #c28a2c 80%, #e49018 100%)",
      icon: "🎹",
      iconSize: "text-4xl",
      title: ["Letter Griddle", "Ambiance"],
      subtitle: "DAY & EVENING MUSIC",
      subtitleColor: "text-amber-300/70"
    },
    borderColor: "border-amber-700",
    bgColor: "from-amber-50 to-stone-50",
    textColor: "text-amber-900",
    subTextColor: "text-amber-700",
    hoverBg: "bg-amber-900/80"
  },
  {
    name: "Snacks",
    tagline: "Don't leave any crumbs!",
    emoji: "\uD83C\uDF6A",
    href: "/snacks",
    thumbnail: {
      gradient: "linear-gradient(135deg, #78350F 0%, #92400E 50%, #451A03 100%)",
      icon: "\uD83C\uDF6A",
      iconSize: "text-5xl",
      title: ["Letter Griddle", "Snacks"],
      subtitle: "Midnight Puzzle",
      subtitleColor: "text-white/80"
    },
    borderColor: "border-amber-700",
    bgColor: "from-amber-100 to-orange-100",
    textColor: "text-amber-900",
    subTextColor: "text-amber-700",
    hoverBg: "bg-amber-800/80"
  },
  {
    name: "Pancakes",
    tagline: "Earn the toppings! 30 Puzzles!",
    emoji: "\uD83E\uDD5E",
    href: "/pancakes",
    thumbnail: {
      gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #92400E 100%)",
      icon: "\uD83E\uDD5E",
      iconSize: "text-5xl",
      title: ["Letter Griddle", "Pancakes"],
      subtitle: "Word Search Game",
      subtitleColor: "text-amber-100"
    },
    borderColor: "border-amber-400",
    bgColor: "from-amber-100 to-orange-100",
    textColor: "text-amber-800",
    subTextColor: "text-amber-700",
    hoverBg: "bg-amber-600/80"
  },
  {
    name: "Griddle Logic",
    tagline: "Choose your challenge!",
    emoji: "\uD83E\uDDE9",
    href: "/logic",
    thumbnail: {
      gradient: "linear-gradient(135deg, #6366F1 0%, #4F46E5 50%, #4338CA 100%)",
      icon: "\uD83E\uDDE9",
      iconSize: "text-5xl",
      title: ["Griddle", "Logic"],
      subtitle: "Logic Puzzle",
      subtitleColor: "text-indigo-100"
    },
    borderColor: "border-indigo-400",
    bgColor: "from-indigo-100 to-purple-100",
    textColor: "text-indigo-800",
    subTextColor: "text-indigo-700",
    hoverBg: "bg-indigo-500/80"
  },
  {
    name: "Griddle Falls",
    tagline: "With the Letter Griddle Cafe Crew",
    emoji: "\u2615",
    href: "https://griddlefalls.com",
    external: true,
    thumbnail: {
      gradient: "linear-gradient(135deg, #D4833A 0%, #C2632A 50%, #8B3A1A 100%)",
      icon: "\u2615",
      iconSize: "text-4xl",
      title: ["Griddle", "Falls"],
      subtitle: "Cozy Cafe Trivia",
      subtitleColor: "text-orange-100"
    },
    borderColor: "border-orange-300",
    bgColor: "from-orange-100 to-amber-100",
    textColor: "text-orange-800",
    subTextColor: "text-orange-700",
    hoverBg: "bg-orange-500/80"
  },
  {
    name: "Spins",
    tagline: "Complete the song titles to reveal links to songs",
    emoji: "\uD83D\uDCBF",
    href: "/spins",
    thumbnail: {
      gradient: "linear-gradient(135deg, #A855F7 0%, #7C3AED 50%, #6D28D9 100%)",
      icon: "\uD83D\uDCBF",
      iconSize: "text-5xl",
      title: ["Letter Griddle", "Spins"],
      subtitle: "Music Word Game",
      subtitleColor: "text-purple-200",
      hasStars: true
    },
    borderColor: "border-purple-400",
    bgColor: "from-purple-100 to-violet-100",
    textColor: "text-purple-800",
    subTextColor: "text-purple-700",
    hoverBg: "bg-purple-500/80"
  },
  {
    name: "Hoopla",
    tagline: "Word-Finding Challenge! 20 Puzzles!",
    emoji: "\uD83D\uDCE3",
    href: "/hoopla",
    thumbnail: {
      gradient: "linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)",
      icon: "\uD83D\uDCE3",
      iconSize: "text-5xl",
      title: ["Letter Griddle", "Hoopla"],
      subtitle: "Game Night Pep Rally",
      subtitleColor: "text-red-100"
    },
    borderColor: "border-red-400",
    bgColor: "from-red-100 to-orange-100",
    textColor: "text-red-800",
    subTextColor: "text-red-700",
    hoverBg: "bg-red-500/80"
  },
  {
    name: "Jukebox",
    tagline: "One word leads to the next",
    emoji: "\uD83C\uDFB5",
    href: "https://lettergriddlecafe.com/jukebox",
    external: true,
    thumbnail: {
      gradient: "linear-gradient(135deg, #115e59 0%, #0f4c4c 50%, #0a3939 100%)",
      icon: "\uD83D\uDCBF",
      iconSize: "text-4xl",
      title: ["Jukebox"],
      subtitle: "Word Chain",
      subtitleColor: "text-teal-200"
    },
    borderColor: "border-teal-700",
    bgColor: "from-teal-100 to-cyan-100",
    textColor: "text-teal-900",
    subTextColor: "text-teal-700",
    hoverBg: "bg-teal-800/80"
  },
  {
    name: "Griddle Shake",
    tagline: "A Letter Griddle Word Hunt Game",
    emoji: "\uD83D\uDD0D",
    href: "/griddleshake",
    thumbnail: {
      gradient: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 25%, #f5d0fe 50%, #a5f3fc 75%, #c4b5fd 100%)",
      icon: "\uD83D\uDD0D",
      iconSize: "text-4xl",
      title: ["Griddle", "Shake"],
      subtitle: "WORD HUNT",
      subtitleColor: "text-purple-100"
    },
    borderColor: "border-purple-300",
    bgColor: "from-purple-50 to-pink-50",
    textColor: "text-purple-800",
    subTextColor: "text-purple-600",
    hoverBg: "bg-purple-400/80"
  },
  {
    name: "Kerflufflegrid",
    tagline: "Reveal the theme before Kerflufflegrid",
    emoji: "\u231B",
    href: "https://kerflufflegrid.com",
    external: true,
    thumbnail: {
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
      icon: "\u231B",
      iconSize: "text-4xl",
      title: ["Kerfluffle", "grid"],
      subtitle: "Beat the Clock",
      subtitleColor: "text-amber-100"
    },
    borderColor: "border-amber-300",
    bgColor: "from-amber-100 to-yellow-100",
    textColor: "text-amber-800",
    subTextColor: "text-amber-700",
    hoverBg: "bg-amber-600/80"
  },
  {
    name: "Saddle Shoes",
    tagline: "A retro memory matching game",
    emoji: "\uD83D\uDC5F",
    href: "/saddleshoes",
    thumbnail: {
      gradient: "linear-gradient(135deg, #78350f 0%, #44403c 50%, #451a03 100%)",
      icon: "\uD83C\uDF68",
      iconSize: "text-4xl",
      title: ["Saddle", "Shoes"],
      subtitle: "Memory Match Game",
      subtitleColor: "text-amber-100"
    },
    borderColor: "border-amber-800",
    bgColor: "from-amber-100 to-stone-100",
    textColor: "text-amber-900",
    subTextColor: "text-amber-700",
    hoverBg: "bg-amber-800/80"
  },
  {
    name: "Tile Griddle",
    tagline: "A domino game with the Trivia Crew",
    emoji: "\uD83E\uDD5E",
    href: "/tilegriddle",
    thumbnail: {
      gradient: "linear-gradient(135deg, #f6ad55 0%, #ed8936 50%, #dd6b20 100%)",
      icon: "\uD83E\uDD5E",
      iconSize: "text-3xl",
      title: ["Tile", "Griddle"],
      subtitle: "MATCH GAME",
      subtitleColor: "text-orange-100"
    },
    borderColor: "border-orange-300",
    bgColor: "from-orange-50 to-amber-50",
    textColor: "text-orange-800",
    subTextColor: "text-orange-700",
    hoverBg: "bg-orange-500/80"
  },
  {
    name: "Scoops",
    tagline: "Get the scoop!",
    emoji: "\u2615",
    href: "/scoops",
    thumbnail: {
      gradient: "linear-gradient(135deg, #F97316 0%, #EA580C 50%, #C2410C 100%)",
      icon: "\u2615",
      iconSize: "text-5xl",
      title: ["Letter Griddle", "Scoops"],
      subtitle: "Trivia Challenge",
      subtitleColor: "text-orange-100"
    },
    borderColor: "border-orange-400",
    bgColor: "from-orange-100 to-amber-100",
    textColor: "text-orange-800",
    subTextColor: "text-orange-700",
    hoverBg: "bg-orange-500/80"
  },
  {
    name: "The Cafe Synth",
    tagline: "Play a musical keyboard.",
    emoji: "\uD83C\uDFB9",
    href: "/synth",
    thumbnail: {
      gradient: "linear-gradient(135deg, #D4833A 0%, #C2632A 50%, #8B3A1A 100%)",
      icon: "\uD83C\uDFB9",
      iconSize: "text-4xl",
      title: ["The Cafe", "Synth"],
      subtitle: "PLAY THE SYNTH",
      subtitleColor: "text-amber-200"
    },
    borderColor: "border-amber-700",
    bgColor: "from-amber-100 to-orange-100",
    textColor: "text-amber-900",
    subTextColor: "text-amber-700",
    hoverBg: "bg-amber-800/80"
  },
  {
    name: "Griddlelogue",
    tagline: "Set your timer and preserve the lore!",
    emoji: "\uD83D\uDD70\uFE0F",
    href: "/griddlelogue",
    thumbnail: {
      gradient: "linear-gradient(135deg, #92400e 0%, #78350f 50%, #451a03 100%)",
      icon: "\uD83D\uDD70\uFE0F",
      iconSize: "text-4xl",
      title: ["Griddle", "logue"],
      subtitle: "CAFE TRIVIA TRAVELOGUE",
      subtitleColor: "text-amber-200"
    },
    borderColor: "border-amber-700",
    bgColor: "from-amber-50 to-stone-100",
    textColor: "text-amber-900",
    subTextColor: "text-amber-700",
    hoverBg: "bg-amber-900/80"
  },
  {
    name: "Griddle Rush",
    tagline: "Drag emoji tiles, match 3 to clear, beat your best!",
    emoji: "\uD83C\uDF73",
    href: "/rush",
    thumbnail: {
      gradient: "linear-gradient(135deg, #b45309 0%, #92400e 50%, #451a03 100%)",
      icon: "\uD83C\uDF73",
      iconSize: "text-4xl",
      title: ["Griddle", "Rush"],
      subtitle: "MATCH 3 TILE GAME",
      subtitleColor: "text-amber-200"
    },
    borderColor: "border-amber-700",
    bgColor: "from-amber-50 to-orange-100",
    textColor: "text-amber-900",
    subTextColor: "text-amber-700",
    hoverBg: "bg-amber-800/80"
  },
  {
    name: "Glow",
    tagline: "Flip pancakes to reveal your activity",
    emoji: "\u2728",
    href: "/glow",
    thumbnail: {
      gradient: "linear-gradient(135deg, #2d1b0e 0%, #1a0f05 50%, #0d0803 100%)",
      icon: "\u2728",
      iconSize: "text-5xl",
      title: ["Letter Griddle", "Glow"],
      subtitle: "Daily Activity",
      subtitleColor: "text-amber-300/70"
    },
    borderColor: "border-amber-700",
    bgColor: "from-amber-50 to-orange-50",
    textColor: "text-amber-900",
    subTextColor: "text-amber-700",
    hoverBg: "bg-amber-900/80"
  },
  {
    name: "Sizzle",
    tagline: "Beat the 30-second clock",
    emoji: "\uD83E\uDD53",
    href: "/sizzle",
    thumbnail: {
      gradient: "linear-gradient(135deg, #3d2216 0%, #2a1610 50%, #1a0e08 100%)",
      icon: "\uD83E\uDD53",
      iconSize: "text-5xl",
      title: ["Letter Griddle", "Sizzle"],
      subtitle: "Speed Game",
      subtitleColor: "text-orange-300/70"
    },
    borderColor: "border-orange-700",
    bgColor: "from-orange-50 to-amber-50",
    textColor: "text-orange-900",
    subTextColor: "text-orange-700",
    hoverBg: "bg-orange-900/80"
  },
  {
    name: "Top That!",
    tagline: "Pick the pancake topping quickly!",
    emoji: "\uD83E\uDD5E",
    href: "/topthat",
    thumbnail: {
      gradient: "linear-gradient(135deg, #352418 0%, #261810 50%, #180e08 100%)",
      icon: "\uD83E\uDD5E",
      iconSize: "text-5xl",
      title: ["Letter Griddle", "Top That!"],
      subtitle: "Quick Decisions",
      subtitleColor: "text-amber-300/60"
    },
    borderColor: "border-amber-600",
    bgColor: "from-amber-50 to-yellow-50",
    textColor: "text-amber-900",
    subTextColor: "text-amber-700",
    hoverBg: "bg-amber-800/80"
  },
  {
    name: "Lattes",
    tagline: "Spot the coffee item. Cortado or Canoe?",
    emoji: "\u2615",
    href: "/lattes",
    thumbnail: {
      gradient: "linear-gradient(135deg, #2c2018 0%, #221810 50%, #0e0806 100%)",
      icon: "\u2615",
      iconSize: "text-5xl",
      title: ["Letter Griddle", "Lattes"],
      subtitle: "Coffee Game",
      subtitleColor: "text-amber-200/60"
    },
    borderColor: "border-amber-800",
    bgColor: "from-amber-50 to-stone-50",
    textColor: "text-amber-900",
    subTextColor: "text-amber-800",
    hoverBg: "bg-amber-900/80"
  },
  {
    name: "Order Up!",
    tagline: "Assemble the order quickly!",
    emoji: "\uD83C\uDF73",
    href: "/order",
    thumbnail: {
      gradient: "linear-gradient(135deg, #2a1a0e 0%, #1c1008 50%, #100a04 100%)",
      icon: "\uD83C\uDF73",
      iconSize: "text-5xl",
      title: ["Letter Griddle", "Order Up!"],
      subtitle: "Timed Challenge",
      subtitleColor: "text-amber-300/60"
    },
    borderColor: "border-amber-700",
    bgColor: "from-amber-50 to-orange-50",
    textColor: "text-amber-900",
    subTextColor: "text-amber-700",
    hoverBg: "bg-amber-900/80"
  },
  {
    name: "To Go!",
    tagline: "Complete the order",
    emoji: "\uD83E\uDD61",
    href: "/togo",
    thumbnail: {
      gradient: "linear-gradient(135deg, #261a12 0%, #1a1008 50%, #0e0804 100%)",
      icon: "\uD83E\uDD61",
      iconSize: "text-5xl",
      title: ["Letter Griddle", "To Go!"],
      subtitle: "Coffee Orders",
      subtitleColor: "text-amber-200/60"
    },
    borderColor: "border-amber-800",
    bgColor: "from-amber-50 to-stone-50",
    textColor: "text-amber-900",
    subTextColor: "text-amber-800",
    hoverBg: "bg-amber-900/80"
  },
];

export default function Classics() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const renderThumbnail = (game) => {
    const { thumbnail } = game;
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden"
        style={{ background: thumbnail.gradient }}
      >
        {thumbnail.hasStars && (
          <>
            <div className="absolute top-3 left-5 text-white/40 text-sm">✦</div>
            <div className="absolute top-6 right-6 text-white/30 text-xs">✦</div>
            <div className="absolute bottom-8 left-8 text-white/25 text-sm">✦</div>
          </>
        )}
        {thumbnail.icon && (
          <div className={`${thumbnail.iconSize} mb-2`}>{thumbnail.icon}</div>
        )}
        <div className="text-center">
          {thumbnail.title.map((line, i) => (
            <div
              key={i}
              className={`font-bold text-white leading-tight ${i === 0 && thumbnail.title.length > 1 ? 'text-xl' : 'text-2xl'}`}
              style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.25)' }}
            >
              {line}
            </div>
          ))}
        </div>
        <div className={`text-xs tracking-widest uppercase mt-2 font-medium ${thumbnail.subtitleColor}`}>
          {thumbnail.subtitle}
        </div>
      </div>
    );
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm w-full">
          <div className="text-7xl mb-6">🥞</div>
          <h1 className="text-3xl font-bold text-amber-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Letter Griddle Classics
          </h1>
          <p className="text-amber-600 italic mb-8 text-sm" style={{ fontFamily: 'Georgia, serif' }}>
            A collection of beloved Letter Griddle games
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-full border-2 border-amber-300 bg-white text-amber-900 text-center focus:outline-none focus:border-amber-500 text-lg"
              style={{ fontFamily: 'Georgia, serif' }}
            />
            {error && (
              <p className="text-red-500 text-sm italic" style={{ fontFamily: 'Georgia, serif' }}>
                Not quite — try again! 🥞
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 text-white font-bold rounded-full text-lg transition-all shadow-lg hover:shadow-xl hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)', fontFamily: 'Georgia, serif' }}
            >
              Enter
            </button>
          </form>
          <div className="mt-8">
            <Link href="/" className="text-amber-600 text-sm hover:text-amber-800 transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
              ← Back to Letter Griddle
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <header className="text-center py-12 px-4">
        <div className="text-6xl mb-4">🥞</div>
        <h1 className="text-4xl font-bold text-amber-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Letter Griddle Classics
        </h1>
        <p className="text-amber-600 italic text-sm mb-6" style={{ fontFamily: 'Georgia, serif' }}>
          A collection of beloved Letter Griddle games
        </p>
        <Link href="/" className="text-amber-600 text-sm hover:text-amber-800 transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
          ← Back to Letter Griddle
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex flex-wrap justify-center gap-6">
          {classicGames.map((game) => (
            <div key={game.name} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              {game.external ? (
                <a href={game.href} target="_blank" rel="noopener noreferrer"
                  className={`group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${game.borderColor} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}>
                  <div className="relative h-48">
                    {renderThumbnail(game)}
                    <div className={`absolute inset-0 ${game.hoverBg} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <span className="text-white font-bold text-lg">Play Now →</span>
                    </div>
                  </div>
                  <div className={`p-5 bg-gradient-to-br ${game.bgColor}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{game.emoji}</span>
                      <h2 className={`text-xl font-bold ${game.textColor}`} style={{ fontFamily: 'Georgia, serif' }}>{game.name}</h2>
                    </div>
                    <p className={`${game.subTextColor} text-sm`}>{game.tagline}</p>
                  </div>
                </a>
              ) : (
                <Link href={game.href}
                  className={`group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${game.borderColor} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}>
                  <div className="relative h-48">
                    {renderThumbnail(game)}
                    <div className={`absolute inset-0 ${game.hoverBg} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <span className="text-white font-bold text-lg">Play Now →</span>
                    </div>
                  </div>
                  <div className={`p-5 bg-gradient-to-br ${game.bgColor}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{game.emoji}</span>
                      <h2 className={`text-xl font-bold ${game.textColor}`} style={{ fontFamily: 'Georgia, serif' }}>{game.name}</h2>
                    </div>
                    <p className={`${game.subTextColor} text-sm`}>{game.tagline}</p>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-amber-800 text-amber-100 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-2xl">🥞</span>
            <span className="text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>Letter Griddle</span>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Letter Griddle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
