import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const games = [
    {
      name: "Letter Griddle",
      tagline: "The original daily word puzzle",
      dropTime: "7:00 PM EST",
      emoji: "🥞",
      href: "/play",
      image: "/letter-griddle-thumbnail-512.png",
      color: "amber",
      borderColor: "border-amber-200",
      bgColor: "from-amber-100 to-yellow-100",
      textColor: "text-amber-800",
      subTextColor: "text-amber-700",
      timeColor: "text-amber-600",
      hoverBg: "bg-amber-500/80"
    },
    {
    name: "Letter Griddle Mini",
    tagline: "A bite-sized word puzzle",
    dropTime: "7:15 PM EST",
    emoji: "🍯",
    href: "/mini",
    image: "/letter-griddle-mini-thumbnail-512.png",
    color: "yellow",
    borderColor: "border-yellow-300",
    bgColor: "from-yellow-100 to-amber-100",
    textColor: "text-yellow-800",
    subTextColor: "text-yellow-700",
    timeColor: "text-yellow-600",
    hoverBg: "bg-yellow-500/80"
  },
    {
      name: "Little Letter Griddle",
      tagline: "Moonlit word puzzle",
      dropTime: "7:30 PM EST",
      emoji: "🌙",
      href: "https://littlelettergriddle.com",
      image: "/little-letter-griddle-thumbnail-512.png",
      color: "indigo",
      borderColor: "border-indigo-200",
      bgColor: "from-indigo-100 to-purple-100",
      textColor: "text-indigo-800",
      subTextColor: "text-indigo-700",
      timeColor: "text-indigo-600",
      hoverBg: "bg-indigo-500/80"
    },
    {
    name: "Letter Griddle Flips",
    tagline: "Daily trivia flip",
    dropTime: "7:45 PM EST",
    emoji: "☕",
    href: "/flips",
    image: "/letter-griddle-flips-thumbnail-512.png",
    color: "amber",
    borderColor: "border-amber-300",
    bgColor: "from-amber-100 to-yellow-100",
    textColor: "text-amber-900",
    subTextColor: "text-amber-700",
    timeColor: "text-amber-600",
    hoverBg: "bg-amber-600/80"
  },
    {
      name: "Letter Griddle Buffet",
      tagline: "All-you-can-play fine-dining word feast",
      dropTime: "8:00 PM EST",
      emoji: "🍽️",
      href: "https://lettergriddlebuffet.com",
      image: "/letter-griddle-buffet-thumbnail-512.png",
      color: "orange",
      borderColor: "border-orange-200",
      bgColor: "from-orange-100 to-red-100",
      textColor: "text-orange-800",
      subTextColor: "text-orange-700",
      timeColor: "text-orange-600",
      hoverBg: "bg-orange-500/80"
    },
    {
      name: "Griddle Falls",
      tagline: "Trivia with the Letter Griddle Cafe Crew",
      emoji: "☕",
      href: "https://griddlefalls.com",
      image: "/griddle-falls-thumbnail-512.png",
      color: "teal",
      borderColor: "border-teal-200",
      bgColor: "from-teal-100 to-cyan-100",
      textColor: "text-teal-800",
      subTextColor: "text-teal-700",
      hoverBg: "bg-teal-500/80"
    },
    {
      name: "Kerflufflegrid",
      tagline: "Reveal the theme before Kerflufflegrid",
      emoji: "⏳",
      href: "https://kerflufflegrid.com",
      image: "/kerflufflegrid-thumbnail-512.png",
      color: "pink",
      borderColor: "border-pink-200",
      bgColor: "from-pink-100 to-rose-100",
      textColor: "text-pink-800",
      subTextColor: "text-pink-700",
      hoverBg: "bg-pink-500/80"
    },
    {
    name: "Cookbook",
    tagline: "Recipes paired with word puzzles",
    emoji: "🍊",
    href: "https://lettergriddlecookbook.com",
    image: "/cookbook-thumbnail.svg",
    color: "orange",
    borderColor: "border-orange-200",
    bgColor: "from-orange-100 to-amber-100",
    textColor: "text-orange-800",
    subTextColor: "text-orange-700",
    timeColor: "text-orange-600",
    hoverBg: "bg-orange-500/80"
  },
  {
    name: "The Letter Griddle Cafe",
    tagline: "Stories and Puzzles from the Letter Griddle Cafe",
    emoji: "🧡",
    href: "https://lettergriddlecafe.com",
    image: "/cafe-thumbnail.svg",
    color: "orange",
    borderColor: "border-orange-200",
    bgColor: "from-orange-100 to-amber-100",
    textColor: "text-orange-800",
    subTextColor: "text-orange-700",
    timeColor: "text-orange-600",
    hoverBg: "bg-orange-500/80"
  },
    {
      name: "Letter Griddle Cottage",
      tagline: "A seasonal retreat",
      emoji: "🏔️",
      href: "https://lettergriddlecottage.com",
      image: "/letter-griddle-cottage-thumbnail-512.png",
      color: "sky",
      borderColor: "border-gray-300",
      bgColor: "from-sky-100 to-blue-100",
      textColor: "text-sky-800",
      subTextColor: "text-sky-700",
      hoverBg: "bg-sky-500/80",
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Header */}
      <header className="text-center py-12 px-4">
        <div className="text-6xl mb-4">🥞</div>
        <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          The Letter Griddle Games
        </h1>
        <p className="text-sm text-amber-600 font-medium">
          ✨ Ad-free • Play free • No downloads ✨
        </p>
      </header>

      {/* Games Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Link
              key={game.name}
              href={game.href}
              className={`group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${game.borderColor} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${game.comingSoon ? 'grayscale opacity-70 pointer-events-none' : ''}`}
            >
                          <div className="relative h-48">
              {game.image ? (
                <Image
                  src={game.image}
                  alt={game.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${game.bgColor} flex items-center justify-center`}>
                  <span className="text-8xl">{game.emoji}</span>
                </div>
              )}
                {game.comingSoon ? (
                  <div className="absolute inset-0 bg-gray-800/60 flex items-center justify-center">
                    <div className="text-center text-white">
                      <p className="text-2xl mb-1">❄️</p>
                      <p className="font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Coming February 2026</p>
                    </div>
                  </div>
                ) : (
                  <div className={`absolute inset-0 ${game.hoverBg} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <span className="text-white font-bold text-lg">Play Now →</span>
                  </div>
                )}
              </div>
              <div className={`p-5 bg-gradient-to-br ${game.bgColor}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{game.emoji}</span>
                  <h2 className={`text-xl font-bold ${game.textColor}`} style={{ fontFamily: 'Georgia, serif' }}>{game.name}</h2>
                </div>
                <p className={`${game.subTextColor} text-sm mb-2`}>{game.tagline}</p>
                {game.dropTime && (
                  <p className={`${game.timeColor} text-xs font-semibold`}>🕖 New puzzle daily at {game.dropTime}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>

      

{/* Footer - Full Width */}
<footer className="bg-amber-800 text-amber-100 py-8 px-4">
  <div className="max-w-4xl mx-auto text-center">
    <div className="flex justify-center items-center gap-2 mb-4">
      <span className="text-2xl">🥞</span>
      <span className="text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>Letter Griddle</span>
    </div>
    <div className="flex justify-center gap-6 mb-4 text-sm">
      <a href="https://instagram.com/letter_griddle" className="hover:text-white transition-colors flex items-center gap-1">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        @letter_griddle
      </a>
      <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
      <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
    </div>
    <div className="text-2xl mb-2">🧡</div>
    <p className="text-sm">© 2025 Letter Griddle. All rights reserved.</p>
  </div>
</footer>

      
    </div>
  );
}