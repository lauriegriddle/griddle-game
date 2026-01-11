"use client";
import React, { useState, useEffect, useRef } from 'react';

const SaddleShoesGame = () => {
  // Puzzle sets - each set has 6 pairs of items
  const puzzleSets = [
    {
      name: "Soda Shop Classics",
      items: [
        { id: 'sundae', emoji: '🍨', name: 'Sundae' },
        { id: 'milkshake', emoji: '🥛', name: 'Milkshake' },
        { id: 'radio', emoji: '📻', name: 'Radio' },
        { id: 'car', emoji: '🚗', name: 'Convertible' },
        { id: 'hat', emoji: '🎩', name: 'Fedora' },
        { id: 'glasses', emoji: '🕶️', name: 'Shades' },
      ]
    },
    {
      name: "Retro Vibes",
      items: [
        { id: 'record', emoji: '💿', name: 'Record' },
        { id: 'skates', emoji: '⛸️', name: 'Roller Skates' },
        { id: 'diner', emoji: '🍽️', name: 'Diner' },
        { id: 'phone', emoji: '📞', name: 'Rotary Phone' },
        { id: 'camera', emoji: '📷', name: 'Camera' },
        { id: 'tv', emoji: '📺', name: 'Television' },
      ]
    },
    {
      name: "Sweet Memories",
      items: [
        { id: 'candy', emoji: '🍬', name: 'Candy' },
        { id: 'popcorn', emoji: '🍿', name: 'Popcorn' },
        { id: 'hotdog', emoji: '🌭', name: 'Hot Dog' },
        { id: 'fries', emoji: '🍟', name: 'Fries' },
        { id: 'pie', emoji: '🥧', name: 'Pie' },
        { id: 'donut', emoji: '🍩', name: 'Donut' },
      ]
    },
    {
      name: "Drive-In Dreams",
      items: [
        { id: 'movie', emoji: '🎬', name: 'Movies' },
        { id: 'star', emoji: '⭐', name: 'Star' },
        { id: 'moon', emoji: '🌙', name: 'Moon' },
        { id: 'guitar', emoji: '🎸', name: 'Guitar' },
        { id: 'microphone', emoji: '🎤', name: 'Microphone' },
        { id: 'icecream', emoji: '🍦', name: 'Ice Cream' },
      ]
    },
    {
      name: "Malt Shop Memories",
      items: [
        { id: 'cherry', emoji: '🍒', name: 'Cherry' },
        { id: 'banana', emoji: '🍌', name: 'Banana Split' },
        { id: 'cookie', emoji: '🍪', name: 'Cookie' },
        { id: 'coffee', emoji: '☕', name: 'Coffee' },
        { id: 'cake', emoji: '🎂', name: 'Cake' },
        { id: 'lollipop', emoji: '🍭', name: 'Lollipop' },
      ]
    },
    {
      name: "Vintage Finds",
      items: [
        { id: 'bicycle', emoji: '🚲', name: 'Bicycle' },
        { id: 'watch', emoji: '⌚', name: 'Watch' },
        { id: 'ribbon', emoji: '🎀', name: 'Ribbon' },
        { id: 'rose', emoji: '🌹', name: 'Rose' },
        { id: 'heart', emoji: '❤️', name: 'Heart' },
        { id: 'bow', emoji: '🎁', name: 'Gift' },
      ]
    },
  ];

  // Jukebox tracks
  const jukeboxTracks = [
    { id: 'surfhop', name: 'Surf Hop', file: 'SurfHop.mp3' },
    { id: 'sockhop', name: 'Sock Hop', file: 'Sockhop.mp3' },
    { id: 'beebop', name: 'Bee Bop', file: 'Beebop.mp3' },
    { id: 'saddleshoes', name: 'Saddle Shoes', file: 'SaddleShoes.mp3' },
  ];

  // Game states
  const [gameState, setGameState] = useState('menu');
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedTime, setSelectedTime] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [moves, setMoves] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [totalPuzzlesCompleted, setTotalPuzzlesCompleted] = useState(0);
  const [darkMode, setDarkMode] = useState(true); // Dark mode DEFAULT
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [totalMoves, setTotalMoves] = useState(0);
  
  // Jukebox states
  const [showJukebox, setShowJukebox] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  // Dynamic year for copyright
  const currentYear = new Date().getFullYear();

  const initializeCards = (puzzleIndex) => {
    const puzzle = puzzleSets[puzzleIndex % puzzleSets.length];
    const cardPairs = puzzle.items.flatMap((item) => [
      { ...item, uniqueId: `${item.id}-a`, pairId: item.id },
      { ...item, uniqueId: `${item.id}-b`, pairId: item.id },
    ]);
    const shuffled = [...cardPairs].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
  };

  const startGame = (time) => {
    setSelectedTime(time);
    setTimeLeft(time);
    setCurrentPuzzleIndex(0);
    setTotalPuzzlesCompleted(0);
    setTotalMoves(0);
    initializeCards(0);
    setGameState('playing');
  };

  const handleCardClick = (card) => {
    if (flippedCards.length >= 2) return;
    if (flippedCards.find(c => c.uniqueId === card.uniqueId)) return;
    if (matchedPairs.includes(card.pairId)) return;

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setTotalMoves(m => m + 1);
      
      if (newFlipped[0].pairId === newFlipped[1].pairId) {
        setTimeout(() => {
          setMatchedPairs(prev => [...prev, card.pairId]);
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && matchedPairs.length === 6) {
      setShowCelebration(true);
      setGameState('celebrating');
      
      setTimeout(() => {
        setShowCelebration(false);
        const nextIndex = currentPuzzleIndex + 1;
        setCurrentPuzzleIndex(nextIndex);
        setTotalPuzzlesCompleted(prev => prev + 1);
        initializeCards(nextIndex);
        setGameState('playing');
      }, 2000);
    }
  }, [matchedPairs, gameState, currentPuzzleIndex]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timeLeft <= 0) {
      setGameState('complete');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // Audio control for jukebox
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (musicPlaying) {
        // Load and play - needed when track changes
        audioRef.current.load();
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicPlaying, currentTrack, volume]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShare = async () => {
    const timeLabel = selectedTime === 60 ? '1 minute' : selectedTime === 120 ? '2 minutes' : '3 minutes';
    const rating = totalPuzzlesCompleted >= 5 ? '🏆' : totalPuzzlesCompleted >= 3 ? '⭐⭐⭐' : totalPuzzlesCompleted >= 1 ? '⭐' : '👟';
    
    const shareText = `👟 Saddle Shoes 👟
A Memory Matching Game

🍨 ${totalPuzzlesCompleted} ${totalPuzzlesCompleted === 1 ? 'puzzle' : 'puzzles'} completed!
⏱️ Time: ${timeLabel}
🎯 Moves: ${totalMoves}
${rating}

Free & ad-free!
Part of the Letter Griddle Games 🥞
Play Saddle Shoes: lettergriddle.com/saddleshoes
More games: lettergriddle.com`;

    // Try native sharing first (works on mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          text: shareText
        });
      } catch (err) {
        // User cancelled or share failed, fall back to clipboard
        if (err.name !== 'AbortError') {
          copyToClipboard(shareText);
        }
      }
    } else {
      // Fallback to clipboard for desktop
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const currentPuzzle = puzzleSets[currentPuzzleIndex % puzzleSets.length];

  // Color schemes - Classic saddle shoe color combinations
  // Dark mode: Midnight blue & burnished orange (50s diner at night)
  // Light mode: Tan/cream & burgundy (preppy vintage saddle shoes)
  const colors = darkMode ? {
    bg: 'from-blue-950 via-indigo-950 to-slate-950',
    card: 'bg-slate-900/80 border-blue-900',
    cardBack: 'from-amber-700 to-orange-800 border-amber-500',
    text: 'text-blue-100',
    textMuted: 'text-blue-200/70',
    accent: 'from-amber-600 to-orange-600',
    button: 'bg-blue-950 hover:bg-blue-900 text-amber-100',
    matched: 'from-emerald-800 to-emerald-900 border-emerald-500',
    flipped: 'from-amber-200 to-orange-200 border-amber-400',
    footerBg: 'bg-slate-950/50',
    headerAccent: 'text-amber-400',
  } : {
    bg: 'from-amber-100 via-orange-100 to-stone-200',
    card: 'bg-white border-stone-300',
    cardBack: 'from-rose-900 to-red-950 border-rose-800',
    text: 'text-stone-800',
    textMuted: 'text-stone-600',
    accent: 'from-rose-800 to-red-900',
    button: 'bg-stone-100 hover:bg-stone-200 text-rose-900',
    matched: 'from-green-200 to-green-300 border-green-400',
    flipped: 'from-amber-100 to-orange-100 border-rose-300',
    footerBg: 'bg-stone-100/50',
    headerAccent: 'text-rose-800',
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} p-4 relative overflow-hidden transition-colors duration-300 flex flex-col`}>
      {/* Background decorations */}
      <div className="fixed top-4 left-4 text-4xl opacity-10">👟</div>
      <div className="fixed top-4 right-4 text-4xl opacity-10">🍨</div>
      <div className="fixed bottom-20 left-4 text-4xl opacity-10">📻</div>
      <div className="fixed bottom-20 right-4 text-4xl opacity-10">🎶</div>

      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className={`bg-gradient-to-r ${colors.accent} text-white px-8 py-4 rounded-full shadow-2xl animate-bounce text-xl font-bold`}>
            🍨 Sweet Match! 🍨
          </div>
          {Array.from({ length: 20 }).map((_, i) => {
            const emojis = ['👟', '🍨', '📻', '🎶', '⭐', '🍦'];
            return (
              <div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${(i * 13) % 100}%`,
                  top: '-30px',
                  animation: `fall 2s ease-in ${(i % 6) * 0.15}s forwards`
                }}
              >
                {emojis[i % emojis.length]}
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Top Navigation Bar */}
      <div className="max-w-md mx-auto w-full mb-2">
        <div className="flex justify-between items-center">
          {/* Letter Griddle Games Link */}
          <a 
            href="https://lettergriddle.com" 
            className={`flex items-center gap-1 ${colors.textMuted} hover:opacity-80 transition-colors text-sm`}
          >
            <span className="text-lg">🥞</span>
            <span className="font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Letter Griddle Games</span>
          </a>
          
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-all ${colors.button} text-lg`}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Main Content - flex-grow to push footer down */}
      <div className="max-w-md mx-auto w-full flex-grow">
        
        {/* Game Header */}
        <div className="text-center mb-3">
          <h1 className={`text-2xl font-bold ${colors.text}`} style={{ fontFamily: 'Georgia, serif' }}>
            Saddle Shoes
          </h1>
          <p className={`text-xs ${colors.textMuted} italic`}>A Memory Matching Game</p>
        </div>

        {/* Menu Screen */}
        {gameState === 'menu' && (
          <div className={`${colors.card} rounded-2xl shadow-xl p-6 border-4 transition-colors duration-300`}>
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🍨</div>
              <h2 className={`text-xl font-bold ${colors.text} mb-1`} style={{ fontFamily: 'Georgia, serif' }}>
                Welcome to the Malt Shop!
              </h2>
              <p className={`text-sm ${colors.textMuted}`}>Match pairs before time runs out</p>
            </div>

            <div className="space-y-2 mb-6">
              <p className={`text-center ${colors.text} font-semibold mb-3 text-sm`}>Choose your time:</p>
              
              <button
                onClick={() => startGame(60)}
                className={`w-full bg-gradient-to-r ${colors.accent} hover:opacity-90 text-white py-3 rounded-full font-bold shadow-lg transition-all flex items-center justify-center gap-2`}
              >
                ⏱️ 1 Minute - Quick
              </button>
              
              <button
                onClick={() => startGame(120)}
                className="w-full bg-gradient-to-r from-amber-700 to-orange-700 hover:opacity-90 text-white py-3 rounded-full font-bold shadow-lg transition-all flex items-center justify-center gap-2"
              >
                ⏱️ 2 Minutes - Classic
              </button>
              
              <button
                onClick={() => startGame(180)}
                className="w-full bg-gradient-to-r from-amber-800 to-orange-800 hover:opacity-90 text-white py-3 rounded-full font-bold shadow-lg transition-all flex items-center justify-center gap-2"
              >
                ⏱️ 3 Minutes - Relaxed
              </button>
            </div>

            {/* Jukebox Button */}
            <div className="text-center mb-4">
              <button
                onClick={() => setShowJukebox(true)}
                className={`${colors.button} px-4 py-2 rounded-full font-semibold transition-all flex items-center justify-center gap-2 mx-auto`}
              >
                🎵 Jukebox {musicPlaying && '• Playing'}
              </button>
            </div>

            <div className={`text-center ${colors.textMuted} text-xs`}>
              <p>✨ Ad-free • Play free • No downloads ✨</p>
            </div>
          </div>
        )}

        {/* Playing Screen */}
        {(gameState === 'playing' || gameState === 'celebrating') && (
          <div className={`${colors.card} rounded-2xl shadow-xl p-3 border-4 transition-colors duration-300`}>
            <div className="flex justify-between items-center mb-3">
              <button
                onClick={() => setShowJukebox(true)}
                className={`p-2 rounded-full transition-all text-lg ${
                  musicPlaying ? `bg-gradient-to-r ${colors.accent} text-white` : colors.button
                }`}
                title="Jukebox"
              >
                🎵
              </button>
              
              <div className="text-center">
                <div className={`text-xl font-bold ${colors.text}`}>
                  {formatTime(timeLeft)}
                </div>
                <div className={`text-xs ${colors.textMuted}`}>Time Left</div>
              </div>
              
              <button
                onClick={shuffleCards}
                className={`${colors.button} p-2 rounded-full transition-all text-lg`}
                title="Shuffle"
              >
                🔀
              </button>
            </div>

            <div className={`bg-gradient-to-r ${colors.accent} text-white rounded-lg p-2 mb-3 text-center`}>
              <p className="font-bold text-sm" style={{ fontFamily: 'Georgia, serif' }}>
                {currentPuzzle.name}
              </p>
              <p className="text-xs opacity-80">
                Puzzles: {totalPuzzlesCompleted} | Moves: {moves}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              {cards.map((card) => {
                const isFlipped = flippedCards.find(c => c.uniqueId === card.uniqueId);
                const isMatched = matchedPairs.includes(card.pairId);
                
                return (
                  <button
                    key={card.uniqueId}
                    onClick={() => handleCardClick(card)}
                    disabled={isMatched || gameState === 'celebrating'}
                    className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all duration-300 shadow-md border-2
                      ${isMatched 
                        ? `bg-gradient-to-br ${colors.matched} scale-95` 
                        : isFlipped
                          ? `bg-gradient-to-br ${colors.flipped}`
                          : `bg-gradient-to-br ${colors.cardBack} hover:scale-105 cursor-pointer active:scale-95`
                      }`}
                  >
                    {(isFlipped || isMatched) ? (
                      <span className={isMatched ? 'opacity-50' : ''}>{card.emoji}</span>
                    ) : (
                      <span className="text-amber-200/40 text-xl">👟</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center gap-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i < matchedPairs.length
                      ? `bg-gradient-to-r ${colors.accent}`
                      : darkMode ? 'bg-amber-800' : 'bg-amber-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Game Complete Screen */}
        {gameState === 'complete' && (
          <div className={`${colors.card} rounded-2xl shadow-xl p-6 border-4 transition-colors duration-300`}>
            <div className="text-center">
              <div className="text-5xl mb-3">
                {totalPuzzlesCompleted >= 5 ? '🏆' : totalPuzzlesCompleted >= 3 ? '⭐' : totalPuzzlesCompleted >= 1 ? '🍨' : '👟'}
              </div>
              <h2 className={`text-2xl font-bold ${colors.text} mb-2`} style={{ fontFamily: 'Georgia, serif' }}>
                Time's Up!
              </h2>
              
              <div className={`${darkMode ? 'bg-amber-800/50' : 'bg-gradient-to-br from-amber-50 to-orange-50'} rounded-xl p-4 mb-4 border-2 ${darkMode ? 'border-amber-700' : 'border-amber-200'}`}>
                <div className={`text-4xl font-bold ${colors.text} mb-1`}>
                  {totalPuzzlesCompleted}
                </div>
                <div className={`text-sm ${colors.textMuted}`}>
                  {totalPuzzlesCompleted === 1 ? 'Puzzle' : 'Puzzles'} Completed
                </div>
                <div className={`text-xs ${colors.textMuted} mt-1`}>
                  in {selectedTime === 60 ? '1 minute' : selectedTime === 120 ? '2 minutes' : '3 minutes'} • {totalMoves} moves
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setShowShareModal(true)}
                  className={`w-full bg-gradient-to-r ${colors.accent} hover:opacity-90 text-white py-3 rounded-full font-bold shadow-lg transition-all flex items-center justify-center gap-2`}
                >
                  Share Results
                </button>
                
                <button
                  onClick={() => startGame(selectedTime)}
                  className={`w-full ${colors.button} py-2 rounded-full font-semibold transition-all`}
                >
                  Play Again
                </button>
                
                <button
                  onClick={() => setGameState('menu')}
                  className={`w-full ${darkMode ? 'text-amber-200/60' : 'text-amber-600'} py-2 font-semibold transition-all text-sm`}
                >
                  Back to Menu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`max-w-md mx-auto w-full mt-4 ${colors.footerBg} rounded-lg p-3`}>
        <div className="flex flex-col items-center gap-2">
          {/* Pancake stack link */}
          <a 
            href="https://lettergriddle.com" 
            className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">🥞</span>
            <span className={`text-xs ${colors.textMuted} underline`}>Part of The Letter Griddle Games</span>
          </a>
          
          {/* Copyright and links */}
          <div className={`text-xs ${colors.textMuted} text-center`}>
            <p>© {currentYear} Letter Griddle. All rights reserved.</p>
            <p className="mt-1">
              <a href="https://lettergriddle.com/privacy" className="underline hover:opacity-70">Privacy</a>
              {' • '}
              <a href="https://lettergriddle.com/terms" className="underline hover:opacity-70">Terms</a>
            </p>
          </div>
        </div>
      </div>

      {/* Jukebox Modal */}
      {showJukebox && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowJukebox(false)}>
          <div className={`${darkMode ? 'bg-amber-900' : 'bg-white'} rounded-2xl p-6 max-w-sm w-full shadow-2xl relative border-4 ${darkMode ? 'border-amber-700' : 'border-amber-200'}`} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowJukebox(false)}
              className={`absolute top-3 right-3 ${colors.textMuted} hover:opacity-70 text-xl`}
            >
              ✕
            </button>
            
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🎵</div>
              <h2 className={`text-xl font-bold ${colors.text}`} style={{ fontFamily: 'Georgia, serif' }}>
                Jukebox
              </h2>
              <p className={`text-xs ${colors.textMuted}`}>Pick your tune!</p>
            </div>
            
            <div className="space-y-2 mb-4">
              {jukeboxTracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setCurrentTrack(index);
                    setMusicPlaying(true);
                  }}
                  className={`w-full py-3 px-4 rounded-full font-semibold transition-all flex items-center justify-between
                    ${currentTrack === index && musicPlaying
                      ? `bg-gradient-to-r ${colors.accent} text-white`
                      : colors.button
                    }`}
                >
                  <span>🎶 {track.name}</span>
                  {currentTrack === index && musicPlaying && <span>♪ Playing</span>}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setMusicPlaying(!musicPlaying)}
                className={`flex-1 py-2 rounded-full font-semibold transition-all ${colors.button}`}
              >
                {musicPlaying ? '⏸️ Pause' : '▶️ Play'}
              </button>
              <button
                onClick={() => {
                  setMusicPlaying(false);
                  setShowJukebox(false);
                }}
                className={`flex-1 py-2 rounded-full font-semibold transition-all ${colors.button}`}
              >
                🔇 Stop
              </button>
            </div>

            {/* Volume slider */}
            <div className="mt-3">
              <label className={`text-xs ${colors.textMuted} flex items-center justify-between`}>
                <span>🔊 Volume</span>
                <span>{Math.round(volume * 100)}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full mt-1 accent-amber-500"
              />
            </div>
            
            {musicPlaying && (
              <p className={`text-center text-xs ${colors.textMuted} mt-3`}>
                🎵 Now Playing: {jukeboxTracks[currentTrack].name}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className={`${darkMode ? 'bg-amber-900' : 'bg-white'} rounded-2xl p-6 max-w-sm w-full shadow-2xl relative border-4 ${darkMode ? 'border-amber-700' : 'border-amber-200'}`} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowShareModal(false)}
              className={`absolute top-3 right-3 ${colors.textMuted} hover:opacity-70 text-xl`}
            >
              ✕
            </button>
            
            <h2 className={`text-xl font-bold ${colors.text} mb-3 text-center`} style={{ fontFamily: 'Georgia, serif' }}>
              ✉️ Share Your Score!
            </h2>
            
            <div className={`${darkMode ? 'bg-amber-800/50' : 'bg-gradient-to-br from-amber-50 to-orange-50'} rounded-xl p-4 mb-4 border-2 ${darkMode ? 'border-amber-700' : 'border-amber-200'} text-xs`}>
              <pre className={`whitespace-pre-wrap ${colors.text} font-mono`}>
{`👟 Saddle Shoes 👟
A Memory Matching Game

🍨 ${totalPuzzlesCompleted} ${totalPuzzlesCompleted === 1 ? 'puzzle' : 'puzzles'} completed!
⏱️ Time: ${selectedTime === 60 ? '1 minute' : selectedTime === 120 ? '2 minutes' : '3 minutes'}
🎯 Moves: ${totalMoves}
${totalPuzzlesCompleted >= 5 ? '🏆' : totalPuzzlesCompleted >= 3 ? '⭐⭐⭐' : totalPuzzlesCompleted >= 1 ? '⭐' : '👟'}

Free & ad-free!
Part of the Letter Griddle Games 🥞
Play at lettergriddle.com/saddleshoes`}
              </pre>
            </div>

            <button
              onClick={handleShare}
              className={`w-full bg-gradient-to-r ${colors.accent} hover:opacity-90 text-white py-3 rounded-full font-bold shadow-lg transition-all`}
            >
              {shareCopied ? '✓ Copied!' : '📋 Copy to Clipboard'}
            </button>
          </div>
        </div>
      )}

      {/* Audio element for jukebox */}
      <audio
        ref={audioRef}
        src={`/${jukeboxTracks[currentTrack].file}`}
        loop
        preload="none"
      />
    </div>
  );
};

export default SaddleShoesGame;