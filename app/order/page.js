"use client";
import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

// ============================================================
// LETTER GRIDDLE ORDER UP!
// A timed poetry magnet puzzle game
// Assemble café orders before time runs out!
// ============================================================

const OrderUpGame = () => {
  // ============================================================
  // PUZZLE DATA - 10 Café Orders to Assemble
  // ============================================================
  const puzzles = [
    {
      id: 1,
      category: "Classic Order",
      order: "I'll have the scrambled eggs with toast and a side of bacon please",
      magnets: ["I'll have", "the scrambled eggs", "with toast", "and a side of", "bacon please"],
      funFact: "The phrase 'sunny side up' for eggs dates back to the 1880s, describing how the yellow yolk looks like a cheerful sun!"
    },
    {
      id: 2,
      category: "Sweet Tooth",
      order: "Could I get the Belgian waffles with fresh strawberries and whipped cream",
      magnets: ["Could I get", "the Belgian waffles", "with fresh strawberries", "and whipped cream"],
      funFact: "Belgian waffles were introduced to America at the 1964 World's Fair in New York and became an instant sensation!"
    },
    {
      id: 3,
      category: "Coffee Culture",
      order: "One large oat milk latte with an extra shot of espresso to go",
      magnets: ["One large", "oat milk latte", "with an extra shot", "of espresso", "to go"],
      funFact: "The word 'espresso' comes from Italian meaning 'pressed out,' referring to the brewing method!"
    },
    {
      id: 4,
      category: "Brunch Vibes",
      order: "Table for two by the window with mimosas to start please",
      magnets: ["Table for two", "by the window", "with mimosas", "to start please"],
      funFact: "The mimosa cocktail was invented in 1925 at the Ritz Hotel in Paris and remains the perfect brunch companion!"
    },
    {
      id: 5,
      category: "Pancake Stack",
      order: "A tall stack of buttermilk pancakes with maple syrup and butter",
      magnets: ["A tall stack of", "buttermilk pancakes", "with maple syrup", "and butter"],
      funFact: "Americans consume over 75 million pounds of maple syrup each year. That's a lot of pancakes!"
    },
    {
      id: 6,
      category: "Healthy Start",
      order: "The avocado toast with poached eggs and everything bagel seasoning",
      magnets: ["The avocado toast", "with poached eggs", "and everything bagel", "seasoning"],
      funFact: "Avocado toast became a cultural phenomenon in the 2010s, though Australians claim they invented it in the 1990s!"
    },
    {
      id: 7,
      category: "Diner Classic",
      order: "Two eggs over easy with hash browns and crispy bacon on the side",
      magnets: ["Two eggs", "over easy", "with hash browns", "and crispy bacon", "on the side"],
      funFact: "The classic American diner originated from horse-drawn lunch wagons in the 1870s!"
    },
    {
      id: 8,
      category: "Sweet Morning",
      order: "French toast with powdered sugar and a drizzle of honey please",
      magnets: ["French toast", "with powdered sugar", "and a drizzle of", "honey please"],
      funFact: "French toast isn't actually French! Recipes date back to the Roman Empire around the 5th century."
    },
    {
      id: 9,
      category: "Café Wisdom",
      order: "The secret ingredient is always love and a little extra butter",
      magnets: ["The secret ingredient", "is always love", "and a little", "extra butter"],
      funFact: "Julia Child famously said 'With enough butter, anything is good.' Words to cook by!"
    },
    {
      id: 10,
      category: "To Go Order",
      order: "Can I get that wrapped up to go with extra napkins thanks",
      magnets: ["Can I get that", "wrapped up", "to go", "with extra napkins", "thanks"],
      funFact: "The phrase 'to go' for takeout food became popular in American diners during the 1940s!"
    }
  ];

  // ============================================================
  // ACHIEVEMENTS
  // ============================================================
  const achievements = [
    { id: 'first_order', name: 'First Order', icon: '🍳', description: 'Complete your first order', requirement: (s) => s.ordersCompleted >= 1 },
    { id: 'speed_server', name: 'Speed Server', icon: '⚡', description: 'Complete in under 30 seconds', requirement: (s) => s.fastestTime && s.fastestTime < 30 },
    { id: 'efficiency_expert', name: 'Efficiency Expert', icon: '🥞', description: 'Complete with no mistakes', requirement: (s) => s.perfectOrders >= 1 },
    { id: 'regular_customer', name: 'Regular Customer', icon: '☕', description: 'Complete 5 orders', requirement: (s) => s.ordersCompleted >= 5 },
    { id: 'head_chef', name: 'Head Chef', icon: '👨‍🍳', description: 'Complete all 10 puzzles', requirement: (s) => s.ordersCompleted >= 10 },
    { id: 'hot_streak', name: 'Hot Streak', icon: '🔥', description: '3-day streak', requirement: (s) => s.currentStreak >= 3 },
    { id: 'breakfast_club', name: 'Breakfast Club', icon: '🥞', description: '7-day streak', requirement: (s) => s.currentStreak >= 7 },
    { id: 'time_crunch', name: 'Time Crunch', icon: '⏱️', description: 'Beat 1-minute mode', requirement: (s) => s.oneMinuteWins >= 1 },
    { id: 'night_owl', name: 'Night Owl', icon: '🌙', description: 'Play in dinner mode', requirement: (s) => s.dinnerModePlays >= 1 },
    { id: 'jukebox_hero', name: 'Jukebox Hero', icon: '🎵', description: 'Play all 3 tracks', requirement: (s) => s.tracksPlayed >= 3 },
  ];

  // ============================================================
  // STATE
  // ============================================================
  const [gameState, setGameState] = useState('landing');
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [placedMagnets, setPlacedMagnets] = useState([]);
  const [availableMagnets, setAvailableMagnets] = useState([]);
  const [selectedTime, setSelectedTime] = useState(120);
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [shakingMagnet, setShakingMagnet] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [showJukebox, setShowJukebox] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false); // NEW: Share modal state
  const [ambiance, setAmbiance] = useState('breakfast');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newAchievement, setNewAchievement] = useState(null);
  const [completionTime, setCompletionTime] = useState(null);
  
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const [stats, setStats] = useState(() => {
    if (typeof window === 'undefined') return getDefaultStats();
    try {
      const saved = localStorage.getItem('orderUpStats');
      return saved ? JSON.parse(saved) : getDefaultStats();
    } catch {
      return getDefaultStats();
    }
  });

  function getDefaultStats() {
    return {
      ordersCompleted: 0,
      perfectOrders: 0,
      totalMistakes: 0,
      fastestTime: null,
      currentStreak: 0,
      maxStreak: 0,
      lastPlayedDate: null,
      oneMinuteWins: 0,
      dinnerModePlays: 0,
      tracksPlayed: 0,
      tracksPlayedList: [],
      unlockedAchievements: [],
      puzzlesCompleted: []
    };
  }

  // ============================================================
  // JUKEBOX TRACKS
  // ============================================================
  const tracks = [
    { id: 'brunch', name: 'Brunch Magic', file: '/brunch-magic.mp3' },
    { id: 'syrup', name: 'Syrup and Butter', file: '/syrup-and-butter.mp3' },
    { id: 'strawberries', name: 'Strawberries and Cream', file: '/strawberries-and-cream.mp3' }
  ];

  // ============================================================
  // EFFECTS
  // ============================================================
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('orderUpStats', JSON.stringify(stats));
      } catch (e) {
        console.error('Could not save stats', e);
      }
    }
  }, [stats]);

  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimerRunning(false);
            setGameState('timeout');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  useEffect(() => {
    if (gameState === 'playing' && placedMagnets.length === puzzles[currentPuzzleIndex].magnets.length) {
      const correctOrder = puzzles[currentPuzzleIndex].magnets;
      const isCorrect = placedMagnets.every((m, i) => m === correctOrder[i]);
      
      if (isCorrect) {
        handleWin();
      }
    }
  }, [placedMagnets, gameState, currentPuzzleIndex]);

  // ============================================================
  // GAME LOGIC
  // ============================================================

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = (puzzleIndex = currentPuzzleIndex) => {
    const puzzle = puzzles[puzzleIndex];
    setCurrentPuzzleIndex(puzzleIndex);
    setAvailableMagnets(shuffleArray([...puzzle.magnets]));
    setPlacedMagnets([]);
    setTimeRemaining(selectedTime);
    setMistakes(0);
    setGameState('playing');
    setIsTimerRunning(true);
    setCompletionTime(null);
    
    if (ambiance === 'dinner') {
      setStats(prev => ({
        ...prev,
        dinnerModePlays: (prev.dinnerModePlays || 0) + 1
      }));
    }
  };

  const handleMagnetClick = (magnet, fromPlaced = false) => {
    if (gameState !== 'playing') return;

    if (fromPlaced) {
      const index = placedMagnets.indexOf(magnet);
      if (index > -1) {
        setPlacedMagnets(prev => prev.filter((_, i) => i !== index));
        setAvailableMagnets(prev => [...prev, magnet]);
      }
    } else {
      setPlacedMagnets(prev => [...prev, magnet]);
      setAvailableMagnets(prev => prev.filter((m, i) => {
        if (m === magnet) {
          const firstIndex = prev.indexOf(magnet);
          return i !== firstIndex;
        }
        return true;
      }));
    }
  };

  const checkOrder = () => {
    const correctOrder = puzzles[currentPuzzleIndex].magnets;
    const isCorrect = placedMagnets.length === correctOrder.length && 
                      placedMagnets.every((m, i) => m === correctOrder[i]);
    
    if (!isCorrect) {
      for (let i = 0; i < placedMagnets.length; i++) {
        if (placedMagnets[i] !== correctOrder[i]) {
          setShakingMagnet(i);
          setMistakes(prev => prev + 1);
          setTimeout(() => setShakingMagnet(null), 600);
          break;
        }
      }
    }
  };

  const handleWin = () => {
    clearInterval(timerRef.current);
    setIsTimerRunning(false);
    const timeTaken = selectedTime - timeRemaining;
    setCompletionTime(timeTaken);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const isPerfect = mistakes === 0;
    const isOneMinuteWin = selectedTime === 60;

    setStats(prev => {
      const newStats = {
        ...prev,
        ordersCompleted: prev.ordersCompleted + 1,
        perfectOrders: isPerfect ? prev.perfectOrders + 1 : prev.perfectOrders,
        totalMistakes: prev.totalMistakes + mistakes,
        fastestTime: prev.fastestTime ? Math.min(prev.fastestTime, timeTaken) : timeTaken,
        currentStreak: prev.lastPlayedDate === yesterday || prev.lastPlayedDate === today ? prev.currentStreak + 1 : 1,
        lastPlayedDate: today,
        oneMinuteWins: isOneMinuteWin ? (prev.oneMinuteWins || 0) + 1 : (prev.oneMinuteWins || 0),
        puzzlesCompleted: [...new Set([...(prev.puzzlesCompleted || []), currentPuzzleIndex])]
      };
      newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
      
      const newlyUnlocked = checkAchievements(newStats);
      if (newlyUnlocked.length > 0) {
        newStats.unlockedAchievements = [...(prev.unlockedAchievements || []), ...newlyUnlocked.map(a => a.id)];
        setNewAchievement(newlyUnlocked[0]);
        setTimeout(() => setNewAchievement(null), 4000);
      }
      
      return newStats;
    });

    setGameState('complete');
  };

  const checkAchievements = (newStats) => {
    const newlyUnlocked = [];
    achievements.forEach(achievement => {
      const unlocked = newStats.unlockedAchievements || [];
      if (!unlocked.includes(achievement.id) && achievement.requirement(newStats)) {
        newlyUnlocked.push(achievement);
      }
    });
    return newlyUnlocked;
  };

  const clearPlaced = () => {
    setAvailableMagnets(prev => [...prev, ...placedMagnets]);
    setPlacedMagnets([]);
  };

  const resetCurrentGame = () => {
    startGame(currentPuzzleIndex);
  };

  const resetAllProgress = () => {
    setStats(getDefaultStats());
    setShowResetConfirm(false);
    setGameState('landing');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('orderUpStats');
    }
  };

  const nextPuzzle = () => {
    const nextIndex = (currentPuzzleIndex + 1) % puzzles.length;
    setCurrentPuzzleIndex(nextIndex);
    setGameState('landing');
  };

  // ============================================================
  // AUDIO CONTROLS
  // ============================================================

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    
    setStats(prev => {
      const playedList = prev.tracksPlayedList || [];
      if (!playedList.includes(track.id)) {
        const newList = [...playedList, track.id];
        return {
          ...prev,
          tracksPlayedList: newList,
          tracksPlayed: newList.length
        };
      }
      return prev;
    });
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // ============================================================
  // FORMATTERS
  // ============================================================

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ============================================================
  // SHARE FUNCTIONALITY - UPDATED!
  // ============================================================

  const handleShare = () => {
    setShowShareModal(true);
  };

  // ============================================================
  // BACKGROUND STYLES
  // ============================================================

  const getBgStyle = () => {
    if (ambiance === 'dinner') {
      return 'bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900';
    }
    return 'bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100';
  };

  const getCardBg = () => {
    return 'bg-gradient-to-b from-slate-800 to-slate-900';
  };

  // ============================================================
  // FOOTER COMPONENT - Reusable
  // ============================================================
  const Footer = ({ className = "" }) => (
    <footer className={`text-center py-4 text-xs ${className}`}>
      <p className="text-stone-500">© {new Date().getFullYear()} Letter Griddle. All rights reserved.</p>
      <div className="flex justify-center gap-2 mt-1">
        <a href="/privacy" className="text-stone-500 hover:text-stone-400 underline">Privacy Policy</a>
        <span className="text-stone-600">•</span>
        <a href="/terms" className="text-stone-500 hover:text-stone-400 underline">Terms of Service</a>
      </div>
      <p className="mt-1 text-stone-600">lettergriddle.com/order</p>
    </footer>
  );

  // ============================================================
  // RENDER: LANDING PAGE
  // ============================================================

  if (gameState === 'landing') {
    return (
      <div className={`min-h-screen ${getBgStyle()} flex flex-col`}>
        {/* Background decorations */}
        <div className="fixed top-4 left-4 text-4xl opacity-20">🍳</div>
        <div className="fixed top-4 right-4 text-4xl opacity-20">☕</div>
        <div className="fixed bottom-4 left-4 text-4xl opacity-20">🥞</div>
        <div className="fixed bottom-4 right-4 text-4xl opacity-20">🧈</div>

        {/* Main content - flex-1 to push footer down */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className={`${getCardBg()} rounded-3xl border-4 border-amber-600 shadow-2xl p-8 max-w-md w-full`}>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">🍳</div>
              <h1 className="text-4xl font-bold text-amber-100 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Order Up!
              </h1>
              <p className="text-amber-400 text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                A Letter Griddle Game
              </p>
              <div className="w-32 h-0.5 bg-amber-600 mx-auto my-4"></div>
              <p className="text-amber-200 text-sm">
                ~ Assemble the order before time runs out! ~
              </p>
            </div>

            {/* Today's Order */}
            <div className="bg-gradient-to-r from-amber-900 to-amber-800 rounded-xl p-4 mb-6 border-2 border-amber-600">
              <p className="text-amber-400 text-xs font-semibold tracking-wider uppercase">TODAY'S ORDER</p>
              <p className="text-amber-100 text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                {puzzles[currentPuzzleIndex].category}
              </p>
              <p className="text-amber-300 text-sm">Puzzle #{currentPuzzleIndex + 1} of {puzzles.length}</p>
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <p className="text-amber-300 text-sm mb-3 text-center">⏱️ Choose your time:</p>
              <div className="flex gap-2 justify-center">
                {[60, 120, 180].map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all ${
                      selectedTime === time
                        ? 'bg-amber-500 text-slate-900'
                        : 'bg-slate-700 text-amber-200 hover:bg-slate-600'
                    }`}
                  >
                    {time / 60} min
                  </button>
                ))}
              </div>
            </div>

            {/* Ambiance Toggle */}
            <div className="mb-6">
              <p className="text-amber-300 text-sm mb-3 text-center">🌅 Ambiance:</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setAmbiance('breakfast')}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    ambiance === 'breakfast'
                      ? 'bg-amber-500 text-slate-900'
                      : 'bg-slate-700 text-amber-200 hover:bg-slate-600'
                  }`}
                >
                  ☀️ Breakfast
                </button>
                <button
                  onClick={() => setAmbiance('dinner')}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    ambiance === 'dinner'
                      ? 'bg-purple-500 text-white'
                      : 'bg-slate-700 text-amber-200 hover:bg-slate-600'
                  }`}
                >
                  🌙 Dinner
                </button>
              </div>
            </div>

            {/* Play Button */}
            <button
              onClick={() => startGame()}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-900 py-4 rounded-full font-bold text-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              🍳 Start Order!
            </button>

            {/* Footer Links */}
            <div className="flex justify-center gap-4 mt-6 text-sm">
              <button
                onClick={() => setShowHowToPlay(true)}
                className="text-amber-400 hover:text-amber-200 underline"
              >
                How to Play
              </button>
              <span className="text-amber-600">•</span>
              <button
                onClick={() => setShowStats(true)}
                className="text-amber-400 hover:text-amber-200 underline"
              >
                Stats
              </button>
              <span className="text-amber-600">•</span>
              <a href="/beta" className="text-amber-400 hover:text-amber-200 underline">
                More Games
              </a>
            </div>
          </div>
        </div>

        {/* Footer - INSIDE the min-h-screen div */}
        <Footer />

        {/* Modals */}
        {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
        {showStats && <StatsModal stats={stats} achievements={achievements} onClose={() => setShowStats(false)} onReset={() => setShowResetConfirm(true)} />}
        {showResetConfirm && <ResetConfirmModal onConfirm={resetAllProgress} onCancel={() => setShowResetConfirm(false)} />}
      </div>
    );
  }

  // ============================================================
  // RENDER: GAME PLAYING
  // ============================================================

  if (gameState === 'playing' || gameState === 'timeout') {
    const puzzle = puzzles[currentPuzzleIndex];
    const timerColor = timeRemaining <= 10 ? 'text-red-400' : timeRemaining <= 30 ? 'text-amber-400' : 'text-green-400';

    return (
      <div className={`min-h-screen ${getBgStyle()} flex flex-col`}>
        {/* Main content */}
        <div className="flex-1 p-4">
          {/* Header Bar */}
          <div className="max-w-2xl mx-auto mb-4">
            <div className="flex justify-between items-center">
              <a href="/order" className="text-amber-400 hover:text-amber-200 text-sm flex items-center gap-1">
                ← Back
              </a>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowJukebox(true)}
                  className="text-2xl hover:scale-110 transition-transform"
                  title="Jukebox"
                >
                  🎵
                </button>
                <button
                  onClick={() => setShowStats(true)}
                  className="text-2xl hover:scale-110 transition-transform"
                  title="Stats"
                >
                  📊
                </button>
              </div>
            </div>
          </div>

          {/* Game Card */}
          <div className="max-w-2xl mx-auto">
            <div className={`${getCardBg()} rounded-3xl border-4 border-amber-600 shadow-2xl p-6`}>
              {/* Title & Timer */}
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-amber-100 flex items-center justify-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
                  🍳 Order Up!
                </h1>
                <div className={`text-4xl font-mono font-bold ${timerColor} mt-2`}>
                  {formatTime(timeRemaining)}
                </div>
                <p className="text-amber-400 text-sm mt-1">{puzzle.category}</p>
              </div>

              {/* Order Assembly Area */}
              <div className="bg-slate-700/50 rounded-xl p-4 mb-4 min-h-[120px] border-2 border-dashed border-amber-600/50">
                <p className="text-amber-400 text-xs mb-3 text-center">📋 Build the order:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {placedMagnets.length === 0 ? (
                    <p className="text-slate-500 italic">Tap magnets below to build the order...</p>
                  ) : (
                    placedMagnets.map((magnet, index) => (
                      <button
                        key={`placed-${index}`}
                        onClick={() => handleMagnetClick(magnet, true)}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all
                          ${shakingMagnet === index 
                            ? 'bg-red-500 text-white animate-shake' 
                            : 'bg-amber-500 text-slate-900 hover:bg-amber-400'
                          }`}
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {magnet}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-3 mb-4">
                <button
                  onClick={checkOrder}
                  disabled={placedMagnets.length === 0}
                  className="bg-green-600 hover:bg-green-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full font-semibold transition-all"
                >
                  ✓ Check
                </button>
                <button
                  onClick={clearPlaced}
                  disabled={placedMagnets.length === 0}
                  className="bg-slate-600 hover:bg-slate-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full font-semibold transition-all"
                >
                  ✕ Clear
                </button>
              </div>

              {/* Available Magnets */}
              <div className="bg-gradient-to-b from-amber-800 to-amber-900 rounded-xl p-4 border-2 border-amber-600">
                <p className="text-amber-300 text-xs mb-3 text-center">🧲 Order Magnets:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {availableMagnets.map((magnet, index) => (
                    <button
                      key={`available-${index}`}
                      onClick={() => handleMagnetClick(magnet, false)}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {magnet}
                    </button>
                  ))}
                  {availableMagnets.length === 0 && (
                    <p className="text-amber-300 italic">All magnets placed! Check your order.</p>
                  )}
                </div>
              </div>

              {/* Reset Current Game */}
              <div className="text-center mt-4">
                <button
                  onClick={resetCurrentGame}
                  className="text-amber-400 hover:text-amber-200 text-sm underline"
                >
                  ↻ Reset this order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - INSIDE the flex container */}
        <Footer />

        {/* Timeout Overlay */}
        {gameState === 'timeout' && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className={`${getCardBg()} rounded-3xl border-4 border-red-500 p-8 max-w-md w-full text-center`}>
              <div className="text-6xl mb-4">⏰</div>
              <h2 className="text-3xl font-bold text-red-400 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Time's Up!
              </h2>
              <p className="text-amber-200 mb-6">The order got cold! Try again?</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => startGame(currentPuzzleIndex)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-3 rounded-full font-bold"
                >
                  🔄 Try Again
                </button>
                <button
                  onClick={() => setGameState('landing')}
                  className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-full font-bold"
                >
                  Back to Menu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Jukebox Modal */}
        {showJukebox && (
          <JukeboxModal
            tracks={tracks}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            volume={volume}
            onSelectTrack={playTrack}
            onTogglePlay={togglePlay}
            onVolumeChange={setVolume}
            onClose={() => setShowJukebox(false)}
          />
        )}

        {/* Stats Modal */}
        {showStats && (
          <StatsModal
            stats={stats}
            achievements={achievements}
            onClose={() => setShowStats(false)}
            onReset={() => setShowResetConfirm(true)}
          />
        )}

        {/* Audio Element */}
        {currentTrack && (
          <audio
            ref={audioRef}
            src={currentTrack.file}
            loop
            autoPlay={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}

        {/* Shake Animation */}
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
          }
          .animate-shake {
            animation: shake 0.3s ease-in-out 2;
          }
        `}</style>
      </div>
    );
  }

  // ============================================================
  // RENDER: COMPLETION
  // ============================================================

  if (gameState === 'complete') {
    const puzzle = puzzles[currentPuzzleIndex];

    return (
      <div className={`min-h-screen ${getBgStyle()} flex flex-col relative overflow-hidden`}>
        {/* Confetti */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {Array.from({ length: 50 }).map((_, i) => {
              const emojis = ['🍳', '🥞', '☕', '🧈', '🍯', '🥓'];
              const emoji = emojis[i % emojis.length];
              const left = (i * 7) % 100;
              return (
                <div
                  key={i}
                  className="absolute text-3xl"
                  style={{
                    left: `${left}%`,
                    top: '-50px',
                    animation: `confetti-fall 3s ease-in ${(i % 10) * 0.1}s forwards`
                  }}
                >
                  {emoji}
                </div>
              );
            })}
          </div>
        )}

        {/* Achievement Popup */}
        {newAchievement && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
              <span className="text-2xl">{newAchievement.icon}</span>
              <div>
                <p className="font-bold">Achievement Unlocked!</p>
                <p className="text-sm">{newAchievement.name}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className={`${getCardBg()} rounded-3xl border-4 border-green-500 shadow-2xl p-8 max-w-md w-full text-center`}>
            <div className="text-6xl mb-4">🥞</div>
            <h2 className="text-3xl font-bold text-green-400 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Order Complete!
            </h2>
            <p className="text-amber-200 mb-4">"{puzzle.order}"</p>
            
            {/* Stats */}
            <div className="bg-slate-700/50 rounded-xl p-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-3xl font-bold text-amber-400">{formatTime(completionTime)}</p>
                  <p className="text-amber-200 text-sm">Time</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-amber-400">{mistakes}</p>
                  <p className="text-amber-200 text-sm">Retries</p>
                </div>
              </div>
              {mistakes === 0 && (
                <p className="text-green-400 mt-2 font-semibold">✨ Perfect Order!</p>
              )}
            </div>

            {/* Fun Fact */}
            <div className="bg-amber-900/50 rounded-xl p-4 mb-6 border border-amber-600">
              <p className="text-amber-400 text-xs font-semibold mb-2">🍯 Did You Know?</p>
              <p className="text-amber-200 text-sm italic">{puzzle.funFact}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleShare}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-900 py-3 rounded-full font-bold flex items-center justify-center gap-2"
              >
                Share Results
              </button>
              <button
                onClick={nextPuzzle}
                className="bg-slate-600 hover:bg-slate-500 text-white py-3 rounded-full font-bold"
              >
                Next Order →
              </button>
              <button
                onClick={() => setGameState('landing')}
                className="text-amber-400 hover:text-amber-200 underline text-sm"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>

        {/* Footer - INSIDE the flex container */}
        <Footer />

        {/* Share Modal - NEW! */}
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          puzzleName={puzzle.category}
          timeElapsed={completionTime}
          mistakes={mistakes}
          completedSentence={puzzle.order}
        />

        {/* Confetti Animation */}
        <style>{`
          @keyframes confetti-fall {
            to {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  }

  return null;
};

// ============================================================
// SHARE MODAL COMPONENT - NEW!
// ============================================================

const ShareModal = ({ isOpen, onClose, puzzleName, timeElapsed, mistakes, completedSentence }) => {
  const [copied, setCopied] = useState(false);
  const [canShare] = useState(typeof navigator !== 'undefined' && !!navigator.share);
  
  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const shareText = `🍳 Order Up! - A Letter Griddle Game
🏆 Completed "${puzzleName}" in ${formatTime(timeElapsed)}!
${mistakes === 0 ? '✨ Perfect Order!' : `📝 ${mistakes} retries`}
🥞🥞🥞🥞🥞

Play at lettergriddle.com/order
More games at lettergriddle.com`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Order Up! - A Letter Griddle Game',
          text: shareText,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border-2 border-amber-500/30 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-400 hover:text-amber-200 transition-colors"
        >
          <X size={24} />
        </button>
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🍳</div>
          <h2 className="text-2xl font-bold text-amber-400" style={{fontFamily: 'Georgia, serif'}}>
            Share Your Results!
          </h2>
          <p className="text-amber-200/70 text-sm mt-1">Order Up! - A Letter Griddle Game</p>
        </div>
        
        {/* Preview Card */}
        <div className="bg-slate-700/50 rounded-xl p-4 mb-6 border border-amber-500/20">
          <pre className="text-amber-100 text-sm whitespace-pre-wrap font-mono leading-relaxed">
            {shareText}
          </pre>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Native Share (shows on mobile/supported browsers) */}
          {canShare && (
            <button
              onClick={handleNativeShare}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-3"
            >
              Share
            </button>
          )}
          
          {/* Copy to Clipboard */}
          <button
            onClick={handleCopy}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-3 ${
              copied 
                ? 'bg-green-500 text-white' 
                : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white'
            }`}
          >
            {copied ? (
              <>
                <span className="text-xl">✓</span>
                Copied to Clipboard!
              </>
            ) : (
              <>
                <span className="text-xl">📋</span>
                Copy to Clipboard
              </>
            )}
          </button>
        </div>
        
        {/* Footer */}
        <p className="text-center text-amber-400/50 text-xs mt-4">
          🥞 Part of The Letter Griddle Cafe
        </p>
      </div>
    </div>
  );
};

// ============================================================
// MODAL COMPONENTS
// ============================================================

const HowToPlayModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
    <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-4 border-amber-600 p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-amber-100" style={{ fontFamily: 'Georgia, serif' }}>
          How to Play
        </h2>
        <button onClick={onClose} className="text-amber-400 hover:text-amber-200 text-2xl">✕</button>
      </div>
      
      <div className="space-y-4 text-amber-200">
        <div className="flex gap-3">
          <span className="text-2xl">1️⃣</span>
          <p>Tap the word magnets to build the café order in the correct sequence.</p>
        </div>
        <div className="flex gap-3">
          <span className="text-2xl">2️⃣</span>
          <p>Tap a placed magnet to remove it and try a different order.</p>
        </div>
        <div className="flex gap-3">
          <span className="text-2xl">3️⃣</span>
          <p>Press "Check" to verify your order. Wrong magnets will shake red!</p>
        </div>
        <div className="flex gap-3">
          <span className="text-2xl">4️⃣</span>
          <p>Complete the order before time runs out!</p>
        </div>
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <p className="italic">Tip: Read the order out loud - café orders have a natural rhythm!</p>
        </div>
      </div>
      
      <button
        onClick={onClose}
        className="w-full mt-6 bg-amber-500 hover:bg-amber-400 text-slate-900 py-3 rounded-full font-bold"
      >
        Got it!
      </button>
    </div>
  </div>
);

const StatsModal = ({ stats, achievements, onClose, onReset }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={onClose}>
    <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-4 border-amber-600 p-6 max-w-md w-full my-8" onClick={e => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-amber-100" style={{ fontFamily: 'Georgia, serif' }}>
          📊 Your Stats
        </h2>
        <button onClick={onClose} className="text-amber-400 hover:text-amber-200 text-2xl">✕</button>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-700/50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-amber-400">{stats.ordersCompleted}</p>
          <p className="text-amber-200 text-xs">Orders Completed</p>
        </div>
        <div className="bg-slate-700/50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-amber-400">{stats.perfectOrders}</p>
          <p className="text-amber-200 text-xs">Perfect Orders</p>
        </div>
        <div className="bg-slate-700/50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-amber-400">{stats.currentStreak}</p>
          <p className="text-amber-200 text-xs">Current Streak 🔥</p>
        </div>
        <div className="bg-slate-700/50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-amber-400">
            {stats.fastestTime ? `${Math.floor(stats.fastestTime / 60)}:${(stats.fastestTime % 60).toString().padStart(2, '0')}` : '--'}
          </p>
          <p className="text-amber-200 text-xs">Fastest Time ⚡</p>
        </div>
      </div>

      {/* Achievements */}
      <h3 className="text-lg font-bold text-amber-100 mb-3">🏆 Achievements</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
        {achievements.map(achievement => {
          const isUnlocked = (stats.unlockedAchievements || []).includes(achievement.id);
          return (
            <div
              key={achievement.id}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                isUnlocked ? 'bg-amber-900/50' : 'bg-slate-700/30 opacity-50'
              }`}
            >
              <span className="text-2xl">{achievement.icon}</span>
              <div className="flex-1">
                <p className={`font-semibold ${isUnlocked ? 'text-amber-200' : 'text-slate-400'}`}>
                  {achievement.name}
                </p>
                <p className={`text-xs ${isUnlocked ? 'text-amber-400' : 'text-slate-500'}`}>
                  {achievement.description}
                </p>
              </div>
              {isUnlocked && <span className="text-green-400">✓</span>}
            </div>
          );
        })}
      </div>

      <button
        onClick={onReset}
        className="w-full text-red-400 hover:text-red-300 text-sm underline"
      >
        Reset All Progress
      </button>
    </div>
  </div>
);

const ResetConfirmModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4" onClick={onCancel}>
    <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-4 border-red-500 p-6 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
      <div className="text-5xl mb-4">🍳</div>
      <h3 className="text-xl font-bold text-red-400 mb-2">Reset All Progress?</h3>
      <p className="text-amber-200 text-sm mb-6">This will clear all stats and achievements. This cannot be undone!</p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={onCancel}
          className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-2 rounded-full font-semibold"
        >
          Keep Stats
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full font-semibold"
        >
          Reset Everything
        </button>
      </div>
    </div>
  </div>
);

const JukeboxModal = ({ tracks, currentTrack, isPlaying, volume, onSelectTrack, onTogglePlay, onVolumeChange, onClose }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
    <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-4 border-amber-600 p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-amber-100 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
          🎵 Jukebox
        </h2>
        <button onClick={onClose} className="text-amber-400 hover:text-amber-200 text-2xl">✕</button>
      </div>
      
      <div className="space-y-2 mb-4">
        {tracks.map(track => (
          <button
            key={track.id}
            onClick={() => onSelectTrack(track)}
            className={`w-full p-3 rounded-lg text-left flex items-center gap-3 transition-all ${
              currentTrack?.id === track.id
                ? 'bg-amber-600 text-slate-900'
                : 'bg-slate-700 text-amber-200 hover:bg-slate-600'
            }`}
          >
            <span className="text-xl">🎵</span>
            <span className="font-semibold">{track.name}</span>
            {currentTrack?.id === track.id && isPlaying && (
              <span className="ml-auto">▶️</span>
            )}
          </button>
        ))}
      </div>

      {currentTrack && (
        <div className="border-t border-amber-600/50 pt-4">
          <p className="text-amber-400 text-xs mb-2">Now Playing: {currentTrack.name}</p>
          <div className="flex items-center gap-3">
            <button
              onClick={onTogglePlay}
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 w-10 h-10 rounded-full font-bold"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="flex-1 accent-amber-500"
            />
            <span className="text-amber-400">🔊</span>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default OrderUpGame;