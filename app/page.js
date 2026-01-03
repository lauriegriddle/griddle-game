import Link from 'next/link';

export default function Home() {
  const games = [
    {
      name: "Letter Griddle",
      tagline: "The original daily word puzzle",
      dropTime: "7:00 PM EST",
      emoji: "🥞",
      href: "/play",
      thumbnail: {
        gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #EA580C 100%)",
        tiles: "PLAY",
        tileBg: "bg-white",
        tileText: "#D97706",
        title: ["Letter", "Griddle"],
        subtitle: "Daily Word Puzzle",
        subtitleColor: "text-amber-100"
      },
      borderColor: "border-amber-300",
      bgColor: "from-amber-100 to-yellow-100",
      textColor: "text-amber-800",
      subTextColor: "text-amber-700",
      timeColor: "text-amber-600",
      hoverBg: "bg-amber-600/80"
    },
    {
      name: "Letter Griddle Mini",
      tagline: "A bite-sized word puzzle",
      dropTime: "7:15 PM EST",
      emoji: "🍯",
      href: "/mini",
      thumbnail: {
        gradient: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)",
        title: ["Letter Griddle", "Mini"],
        subtitle: "Bite-Sized Puzzle",
        subtitleColor: "text-yellow-100"
      },
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
      external: true,
      thumbnail: {
        gradient: "linear-gradient(135deg, #818CF8 0%, #6366F1 50%, #4F46E5 100%)",
        icon: "🌙",
        iconSize: "text-5xl",
        title: ["Little Letter", "Griddle"],
        subtitle: "Moonlit Puzzle",
        subtitleColor: "text-indigo-200",
        hasStars: true
      },
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
      thumbnail: {
        gradient: "linear-gradient(135deg, #B45309 0%, #92400E 50%, #78350F 100%)",
        icon: "☕",
        iconSize: "text-4xl",
        title: ["Letter Griddle", "Flips"],
        titleStyle: ["text-xl", "text-3xl italic"],
        subtitle: "Daily Trivia",
        subtitleColor: "text-amber-200"
      },
      borderColor: "border-amber-300",
      bgColor: "from-amber-100 to-yellow-100",
      textColor: "text-amber-900",
      subTextColor: "text-amber-700",
      timeColor: "text-amber-600",
      hoverBg: "bg-amber-700/80"
    },
    {
      name: "Letter Griddle Buffet",
      tagline: "All-you-can-play fine-dining word feast",
      dropTime: "8:00 PM EST",
      emoji: "🍽️",
      href: "https://lettergriddlebuffet.com",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(135deg, #F97316 0%, #EA580C 50%, #DC2626 100%)",
        icon: "🍽️",
        iconSize: "text-4xl",
        title: ["Letter Griddle", "Buffet"],
        subtitle: "All-You-Can-Play",
        subtitleColor: "text-orange-100"
      },
      borderColor: "border-orange-200",
      bgColor: "from-orange-100 to-red-100",
      textColor: "text-orange-800",
      subTextColor: "text-orange-700",
      timeColor: "text-orange-600",
      hoverBg: "bg-orange-500/80"
    },
    {
      name: "Saddle Shoes",
      tagline: "A retro memory matching game",
      dropTime: null,
      emoji: "👟",
      href: "/saddleshoes",
      thumbnail: {
        gradient: "linear-gradient(135deg, #78350f 0%, #44403c 50%, #451a03 100%)",
        icon: "🍨",
        iconSize: "text-4xl",
        title: ["Saddle", "Shoes"],
        subtitle: "Memory Match Game",
        subtitleColor: "text-amber-100"
      },
      borderColor: "border-amber-800",
      bgColor: "from-amber-100 to-stone-100",
      textColor: "text-amber-900",
subTextColor: "text-amber-700",
      timeColor: "text-amber-300",
      hoverBg: "bg-amber-800/80"
    },
    {
      name: "Jukebox",
      tagline: "One word leads to the next",
      dropTime: null,
      emoji: "🎵",
      href: "https://lettergriddlecafe.com/jukebox",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(135deg, #115e59 0%, #0f4c4c 50%, #0a3939 100%)",
        icon: "💿",
        iconSize: "text-4xl",
        title: ["Jukebox"],
        subtitle: "Word Chain",
        subtitleColor: "text-teal-200"
      },
      borderColor: "border-teal-700",
      bgColor: "from-teal-100 to-cyan-100",
      textColor: "text-teal-900",
subTextColor: "text-teal-700",
      timeColor: "text-teal-300",
      hoverBg: "bg-teal-800/80"
    },
    {
      name: "Griddle Falls",
      tagline: "Trivia with the Letter Griddle Cafe Crew",
      emoji: "☕",
      href: "https://griddlefalls.com",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(135deg, #f4a574 0%, #e8956a 50%, #d4825a 100%)",
        icon: "☕",
        iconSize: "text-4xl",
        title: ["Griddle", "Falls"],
        subtitle: "Cafe Crew Trivia",
        subtitleColor: "text-orange-100"
      },
      borderColor: "border-orange-300",
      bgColor: "from-orange-100 to-amber-100",
      textColor: "text-orange-800",
      subTextColor: "text-orange-700",
      hoverBg: "bg-orange-500/80"
    },
    {
      name: "Tile Griddle",
      tagline: "A domino-style matching game with the Trivia Crew",
      emoji: "🥞🧁🍿",
      href: "/tilegriddle",
      thumbnail: {
        gradient: "linear-gradient(135deg, #f6ad55 0%, #ed8936 50%, #dd6b20 100%)",
        icon: "🥞|🥞",
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
      name: "Kerflufflegrid",
      tagline: "Reveal the theme before Kerflufflegrid",
      emoji: "⏳",
      href: "https://kerflufflegrid.com",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
        icon: "⏳",
        iconSize: "text-4xl",
        title: ["Kerfluffle", "grid"],
        subtitle: "Beat the Clock",
        subtitleColor: "text-amber-100"
      },
      borderColor: "text-orange-100",
      bgColor: "from-amber-100 to-yellow-100",
      textColor: "text-amber-800",
      subTextColor: "text-amber-700",
      hoverBg: "bg-amber-600/80"
    },
    {
      name: "Cookbook",
      tagline: "Recipes paired with word puzzles",
      emoji: "🍊",
      href: "https://lettergriddlecookbook.com",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(135deg, #FB923C 0%, #F97316 50%, #EA580C 100%)",
        icon: "🍊",
        iconSize: "text-4xl",
        title: ["Letter Griddle", "Cookbook"],
        subtitle: "Recipes + Puzzles",
        subtitleColor: "text-orange-100"
      },
      borderColor: "border-orange-200",
      bgColor: "from-orange-100 to-amber-100",
      textColor: "text-orange-800",
      subTextColor: "text-orange-700",
      hoverBg: "bg-orange-500/80"
    },
    {
      name: "The Letter Griddle Cafe",
      tagline: "Stories and Puzzles from the Letter Griddle Cafe",
      emoji: "🧡",
      href: "https://lettergriddlecafe.com",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)",
        icon: "🧡",
        iconSize: "text-4xl",
        title: ["The Letter Griddle", "Cafe"],
        titleStyle: ["text-lg", "text-2xl"],
        subtitle: "Stories & Puzzles",
        subtitleColor: "text-amber-100"
      },
      borderColor: "border-orange-200",
      bgColor: "from-orange-100 to-amber-100",
      textColor: "text-orange-800",
      subTextColor: "text-orange-700",
      hoverBg: "bg-amber-600/80"
    },
    {
      name: "Letter Griddle Cottage",
      tagline: "A seasonal retreat",
      emoji: "🏔️",
      href: "https://lettergriddlecottage.com",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #0284C7 100%)",
        icon: "🏔️",
        iconSize: "text-4xl",
        title: ["Letter Griddle", "Cottage"],
        subtitle: "Seasonal Retreat",
        subtitleColor: "text-sky-100"
      },
      borderColor: "border-gray-300",
      bgColor: "from-sky-100 to-blue-100",
      textColor: "text-sky-800",
      subTextColor: "text-sky-700",
      hoverBg: "bg-sky-500/80",
      comingSoon: true
    }
  ];

  // Render thumbnail content based on game config
  const renderThumbnail = (game) => {
    const { thumbnail } = game;
    
    return (
      <div 
        className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden"
        style={{ background: thumbnail.gradient }}
      >
        {/* Stars for Little Letter Griddle */}
        {thumbnail.hasStars && (
          <>
            <div className="absolute top-3 left-5 text-white/40 text-sm">✦</div>
            <div className="absolute top-6 right-6 text-white/30 text-xs">✦</div>
            <div className="absolute bottom-8 left-8 text-white/25 text-sm">✦</div>
            <div className="absolute top-10 left-1/4 text-white/20 text-xs">✦</div>
            <div className="absolute bottom-12 right-10 text-white/35 text-xs">✦</div>
          </>
        )}
        
        {/* Letter tiles (for Letter Griddle and Mini) */}
        {thumbnail.tiles && (
          <div className="flex gap-1.5 mb-3">
            {thumbnail.tiles.split('').map((letter, i) => (
              <div 
                key={i}
                className={`${thumbnail.tiles === 'PLAY' ? 'w-10 h-11' : 'w-9 h-10'} ${thumbnail.tileBg} rounded-lg flex items-center justify-center shadow-md`}
              >
                <span 
                  className={`${thumbnail.tiles === 'PLAY' ? 'text-lg' : 'text-base'} font-bold`}
                  style={{ fontFamily: 'Georgia, serif', color: thumbnail.tileText }}
                >
                  {letter}
                </span>
              </div>
            ))}
          </div>
        )}
        
        {/* Icon (for other games) */}
        {thumbnail.icon && (
          <div className={`${thumbnail.iconSize} mb-2`}>{thumbnail.icon}</div>
        )}
        
        {/* Title */}
        <div className="text-center">
          {thumbnail.title.map((line, i) => (
            <div 
              key={i}
              className={`font-bold text-white leading-tight ${
                thumbnail.titleStyle 
                  ? thumbnail.titleStyle[i] 
                  : i === 0 && thumbnail.title.length > 1 && !thumbnail.tiles
                    ? 'text-xl'
                    : 'text-2xl'
              }`}
              style={{ 
                fontFamily: 'Georgia, serif',
                textShadow: '1px 1px 3px rgba(0,0,0,0.25)'
              }}
            >
              {line}
            </div>
          ))}
        </div>
        
        {/* Subtitle */}
        <div className={`text-xs tracking-widest uppercase mt-2 font-medium ${thumbnail.subtitleColor}`}>
          {thumbnail.subtitle}
        </div>
      </div>
    );
  };

  // Wrapper component that handles internal vs external links
  const GameCard = ({ game, children }) => {
    const baseClasses = `group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${game.borderColor} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${game.comingSoon ? 'opacity-70 pointer-events-none' : ''}`;
    
    if (game.external) {
      return (
        <a href={game.href} className={baseClasses} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    
    return (
      <Link href={game.href} className={baseClasses}>
        {children}
      </Link>
    );
  };

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
            <GameCard key={game.name} game={game}>
              {/* Thumbnail */}
              <div className="relative h-48">
                {renderThumbnail(game)}
                
                {/* Coming Soon Overlay */}
                {game.comingSoon ? (
                  <div className="absolute inset-0 bg-gray-800/60 flex items-center justify-center">
                    <div className="text-center text-white">
                      <p className="text-2xl mb-1">❄️</p>
                      <p className="font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Coming February 2026</p>
                    </div>
                  </div>
                ) : (
                  /* Hover Overlay */
                  <div className={`absolute inset-0 ${game.hoverBg} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <span className="text-white font-bold text-lg">
                      {game.href.includes('cafe') || game.href.includes('cookbook') ? 'Visit →' : 'Play Now →'}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Card Footer */}
              <div className={`p-5 bg-gradient-to-br ${game.bgColor}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{game.emoji}</span>
                  <h2 className={`text-xl font-bold ${game.textColor}`} style={{ fontFamily: 'Georgia, serif' }}>
                    {game.name}
                  </h2>
                </div>
                <p className={`${game.subTextColor} text-sm mb-2`}>{game.tagline}</p>
                {game.dropTime && (
                  <p className={`${game.timeColor} text-xs font-semibold`}>
                    🕖 New puzzle daily at {game.dropTime}
                  </p>
                )}
              </div>
            </GameCard>
          ))}
        </div>
      </main>

      {/* Footer */}
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
          <p className="text-sm">© {new Date().getFullYear()} Letter Griddle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}