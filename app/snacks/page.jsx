"use client";
import React, { useState, useEffect } from 'react';
import { X, BarChart3, Share2 } from 'lucide-react';

// Benched Mini Puzzles Data
const puzzles = [
  { word: "TAFFY", category: "Candy", hint: "A chewy candy often sold at boardwalks and beaches" },
  { word: "GUMMY", category: "Candy", hint: "Soft chewy candy often shaped like bears or worms" },
  { word: "APPLE", category: "Autumn", hint: "Round fruit often picked at orchards in fall" },
  { word: "TRAIL", category: "Hiking", hint: "A marked path through nature for walking" },
  { word: "FUDGE", category: "Dessert", hint: "Rich creamy chocolate confection" },
  { word: "PHONE", category: "In the Bag", hint: "Mobile device for calls texts and apps" },
  { word: "MANGO", category: "Fruits", hint: "Tropical stone fruit with orange flesh" },
  { word: "TIGER", category: "Animals", hint: "Large striped cat native to Asia" },
  { word: "NURSE", category: "Occupations", hint: "Healthcare worker who cares for patients" },
  { word: "RUGBY", category: "Sports", hint: "Contact team sport played with an oval ball" },
  { word: "TEXAS", category: "US States", hint: "The Lone Star State second largest by area" },
  { word: "LUNCH", category: "Meals", hint: "Midday meal eaten around noon" },
  { word: "MAPLE", category: "Trees", hint: "Deciduous tree known for colorful fall foliage and sweet sap" },
  { word: "ALIEN", category: "Movies", hint: "Sci-fi horror classic with Sigourney Weaver fighting extraterrestrials" },
  { word: "BEIGE", category: "Colors", hint: "A neutral sandy or tan shade often used in interior design" },
  { word: "SUSHI", category: "Foods", hint: "Japanese dish of vinegared rice with raw fish or vegetables" },
  { word: "CHESS", category: "Games", hint: "Ancient strategy game with kings queens and checkmate" },
  { word: "PARIS", category: "Cities", hint: "French capital famous for the Eiffel Tower and the Louvre" },
  { word: "SCARF", category: "Clothing", hint: "A piece of fabric worn around the neck for warmth or style" },
];

// Achievements
const achievements = [
  { id: 'first_bite', name: 'First Bite', icon: '🍪', description: 'Complete your first snack', requirement: (stats) => stats.snacksCompleted >= 1 },
  { id: 'midnight_snacker', name: 'Midnight Snacker', icon: '🌙', description: 'Come back for seconds', requirement: (stats) => stats.snacksCompleted >= 2 },
  { id: 'snack_attack', name: 'Snack Attack', icon: '🥨', description: 'Complete 5 snacks', requirement: (stats) => stats.snacksCompleted >= 5 },
  { id: 'pantry_raider', name: 'Pantry Raider', icon: '🍫', description: 'Complete 10 snacks', requirement: (stats) => stats.snacksCompleted >= 10 },
  { id: 'speed_snacker', name: 'Speed Snacker', icon: '⚡', description: 'Finish under 2 minutes', requirement: (stats) => stats.fastestTime && stats.fastestTime < 120 },
  { id: 'crumb_free', name: 'Crumb Free', icon: '✨', description: '3-day streak', requirement: (stats) => stats.currentStreak >= 3 },
  { id: 'snack_master', name: 'Snack Master', icon: '👑', description: '7-day streak', requirement: (stats) => stats.currentStreak >= 7 },
];

// Helper to scramble letters
const scrambleWord = (word) => {
  const letters = word.split('');
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  if (letters.join('') === word && word.length > 1) {
    return scrambleWord(word);
  }
  return letters;
};

// Helper to chunk hint into bigger pieces
const chunkHint = (hint) => {
  const words = hint.split(' ');
  const chunks = [];
  
  let i = 0;
  while (i < words.length) {
    const chunkSize = (i + 3 <= words.length && Math.random() > 0.6) ? 3 : 
                      (i + 2 <= words.length) ? 2 : 1;
    chunks.push(words.slice(i, i + chunkSize).join(' '));
    i += chunkSize;
  }
  
  const scrambled = [...chunks];
  for (let i = scrambled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]];
  }
  
  return { original: chunks, scrambled };
};

// Get today's puzzle index based on EST midnight rotation
const getTodaysPuzzleIndex = () => {
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  
  // Anchor date: January 10, 2026 at midnight EST (first puzzle after launch)
  const anchorDate = new Date('2026-01-10T00:00:00');
  const anchorEST = new Date(anchorDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  
  // Calculate days since anchor
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysSinceAnchor = Math.floor((estTime - anchorEST) / msPerDay);
  
  // Rotate through puzzles (19 total)
  const index = ((daysSinceAnchor % 19) + 19) % 19; // Handle negative values
  return index;
};

const SnacksGame = () => {
  const [puzzleIndex] = useState(() => getTodaysPuzzleIndex());
  const puzzle = puzzles[puzzleIndex];
  
  // Word unscramble state
  const [scrambledWord] = useState(() => scrambleWord(puzzle.word));
  const [wordSlots, setWordSlots] = useState(Array(puzzle.word.length).fill(''));
  const [availableWordLetters, setAvailableWordLetters] = useState([...scrambledWord]);
  const [wordComplete, setWordComplete] = useState(false);
  
  // Category unscramble state
  const [scrambledCategory] = useState(() => scrambleWord(puzzle.category.toUpperCase()));
  const [categorySlots, setCategorySlots] = useState(Array(puzzle.category.length).fill(''));
  const [availableCategoryLetters, setAvailableCategoryLetters] = useState([...scrambledCategory]);
  const [categoryComplete, setCategoryComplete] = useState(false);
  
  // Hint chunk state
  const [hintChunks] = useState(() => chunkHint(puzzle.hint));
  const [arrangedHint, setArrangedHint] = useState([]);
  const [availableChunks, setAvailableChunks] = useState([...hintChunks.scrambled]);
  const [hintComplete, setHintComplete] = useState(false);
  
  // Game state
  const [showConfetti, setShowConfetti] = useState(false);
  const [allComplete, setAllComplete] = useState(false);
  const [startTime] = useState(Date.now());
  const [completionTime, setCompletionTime] = useState(null);
  
  // Selection states
  const [selectedWordLetter, setSelectedWordLetter] = useState(null);
  const [selectedCategoryLetter, setSelectedCategoryLetter] = useState(null);
  
  // Modal states
  const [showShareModal, setShowShareModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [newAchievements, setNewAchievements] = useState([]);
  
  // Stats
  const [stats, setStats] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('snacksStats');
        return saved ? JSON.parse(saved) : {
          snacksCompleted: 0,
          currentStreak: 0,
          maxStreak: 0,
          fastestTime: null,
          lastPlayedDate: null,
          unlockedAchievements: []
        };
      } catch {
        return {
          snacksCompleted: 0,
          currentStreak: 0,
          maxStreak: 0,
          fastestTime: null,
          lastPlayedDate: null,
          unlockedAchievements: []
        };
      }
    }
    return {
      snacksCompleted: 0,
      currentStreak: 0,
      maxStreak: 0,
      fastestTime: null,
      lastPlayedDate: null,
      unlockedAchievements: []
    };
  });
  
  // Shuffle functions
  const shuffleWordLetters = () => {
    setAvailableWordLetters(prev => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    setSelectedWordLetter(null);
  };
  
  const shuffleCategoryLetters = () => {
    setAvailableCategoryLetters(prev => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    setSelectedCategoryLetter(null);
  };
  
  // Check completions
  useEffect(() => {
    if (wordSlots.join('') === puzzle.word) setWordComplete(true);
  }, [wordSlots, puzzle.word]);
  
  useEffect(() => {
    if (categorySlots.join('') === puzzle.category.toUpperCase()) setCategoryComplete(true);
  }, [categorySlots, puzzle.category]);
  
  useEffect(() => {
    if (arrangedHint.join(' ') === hintChunks.original.join(' ')) setHintComplete(true);
  }, [arrangedHint, hintChunks.original]);
  
  // Check achievements
  const checkAchievements = (newStats) => {
    const newlyUnlocked = [];
    achievements.forEach(achievement => {
      const unlocked = newStats.unlockedAchievements || [];
      if (!unlocked.includes(achievement.id) && achievement.requirement(newStats)) {
        newlyUnlocked.push(achievement);
      }
    });
    
    if (newlyUnlocked.length > 0) {
      setNewAchievements(newlyUnlocked);
      setTimeout(() => setNewAchievements([]), 4000);
      return [...(newStats.unlockedAchievements || []), ...newlyUnlocked.map(a => a.id)];
    }
    return newStats.unlockedAchievements || [];
  };
  
  useEffect(() => {
    if (wordComplete && categoryComplete && hintComplete && !allComplete) {
      const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
      setCompletionTime(timeInSeconds);
      setAllComplete(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
      
      // Update stats
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const lastPlayed = stats.lastPlayedDate;
      
      const newStats = {
        snacksCompleted: stats.snacksCompleted + 1,
        currentStreak: lastPlayed === yesterday || lastPlayed === today ? stats.currentStreak + 1 : 1,
        maxStreak: Math.max(stats.maxStreak, lastPlayed === yesterday || lastPlayed === today ? stats.currentStreak + 1 : 1),
        fastestTime: stats.fastestTime ? Math.min(stats.fastestTime, timeInSeconds) : timeInSeconds,
        lastPlayedDate: today,
        unlockedAchievements: stats.unlockedAchievements || []
      };
      
      newStats.unlockedAchievements = checkAchievements(newStats);
      setStats(newStats);
      
      try {
        localStorage.setItem('snacksStats', JSON.stringify(newStats));
      } catch (e) {
        console.error('Could not save stats', e);
      }
    }
  }, [wordComplete, categoryComplete, hintComplete, allComplete]);
  
  // Word handlers
  const handleWordLetterClick = (letter, index) => {
    if (selectedWordLetter?.index === index) {
      setSelectedWordLetter(null);
    } else {
      setSelectedWordLetter({ letter, index });
    }
  };
  
  const handleWordSlotClick = (slotIndex) => {
    if (wordComplete) return;
    if (wordSlots[slotIndex]) {
      const letter = wordSlots[slotIndex];
      setAvailableWordLetters(prev => [...prev, letter]);
      setWordSlots(prev => {
        const newSlots = [...prev];
        newSlots[slotIndex] = '';
        return newSlots;
      });
      return;
    }
    if (selectedWordLetter !== null) {
      setWordSlots(prev => {
        const newSlots = [...prev];
        newSlots[slotIndex] = selectedWordLetter.letter;
        return newSlots;
      });
      setAvailableWordLetters(prev => {
        const newAvailable = [...prev];
        newAvailable.splice(selectedWordLetter.index, 1);
        return newAvailable;
      });
      setSelectedWordLetter(null);
    }
  };
  
  // Category handlers
  const handleCategoryLetterClick = (letter, index) => {
    if (selectedCategoryLetter?.index === index) {
      setSelectedCategoryLetter(null);
    } else {
      setSelectedCategoryLetter({ letter, index });
    }
  };
  
  const handleCategorySlotClick = (slotIndex) => {
    if (categoryComplete) return;
    if (categorySlots[slotIndex]) {
      const letter = categorySlots[slotIndex];
      setAvailableCategoryLetters(prev => [...prev, letter]);
      setCategorySlots(prev => {
        const newSlots = [...prev];
        newSlots[slotIndex] = '';
        return newSlots;
      });
      return;
    }
    if (selectedCategoryLetter !== null) {
      setCategorySlots(prev => {
        const newSlots = [...prev];
        newSlots[slotIndex] = selectedCategoryLetter.letter;
        return newSlots;
      });
      setAvailableCategoryLetters(prev => {
        const newAvailable = [...prev];
        newAvailable.splice(selectedCategoryLetter.index, 1);
        return newAvailable;
      });
      setSelectedCategoryLetter(null);
    }
  };
  
  // Hint chunk handlers
  const handleChunkClick = (chunk, isArranged) => {
    if (hintComplete) return;
    if (isArranged) {
      setArrangedHint(prev => prev.filter(c => c !== chunk));
      setAvailableChunks(prev => [...prev, chunk]);
    } else {
      setArrangedHint(prev => [...prev, chunk]);
      setAvailableChunks(prev => prev.filter(c => c !== chunk));
    }
  };
  
  // Share handler
  const handleShare = async () => {
    const minutes = Math.floor(completionTime / 60);
    const seconds = completionTime % 60;
    const timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    
    const shareText = `🍪 Snacks #${puzzleIndex + 1}
${puzzle.category}
🧊✓ 🍫✓ 🍪✓
No crumbs left!
Time: ${timeStr}
🥞 Play more games at lettergriddle.com
Play at lettergriddle.com/snacks`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch (e) {
        navigator.clipboard.writeText(shareText).then(() => {
          setShareCopied(true);
          setTimeout(() => setShareCopied(false), 2000);
        });
      }
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      });
    }
  };
  
  const formatTime = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };
  
  const snackEmojis = ['🍪', '🥨', '🍿', '🧁', '🍩', '🍫', '🥜', '🍬'];
  const unlockedList = stats.unlockedAchievements || [];
  const currentYear = new Date().getFullYear();
  const copyrightYear = currentYear > 2025 ? `2025-${currentYear}` : '2025';
  
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #4a3728 70%, #8b4513 100%)'
    }}>
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${(i * 7) % 100}%`,
                top: '-40px',
                animation: `fall 3s ease-in ${(i % 10) * 0.15}s forwards`
              }}
            >
              {snackEmojis[i % snackEmojis.length]}
            </div>
          ))}
        </div>
      )}
      
      {/* Achievement Popup */}
      {newAchievements.length > 0 && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
            <span className="text-2xl">{newAchievements[0].icon}</span>
            <div>
              <div className="font-bold text-sm">Achievement Unlocked!</div>
              <div className="text-xs">{newAchievements[0].name}</div>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(255, 200, 100, 0.5); }
          50% { box-shadow: 0 0 20px rgba(255, 200, 100, 0.8); }
        }
        
        /* Chocolate Square Tiles */
        .chocolate-tile {
          background: linear-gradient(145deg, #5d4037 0%, #4e342e 30%, #3e2723 70%, #2d1f1a 100%);
          box-shadow: 
            inset 1px 1px 2px rgba(255,255,255,0.15),
            inset -1px -1px 2px rgba(0,0,0,0.3),
            2px 2px 4px rgba(0,0,0,0.4),
            0 0 0 1px rgba(78,52,46,0.5);
          border-radius: 3px;
          position: relative;
        }
        .chocolate-tile::before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          pointer-events: none;
        }
        .chocolate-tile::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%);
          border-radius: 3px 3px 0 0;
          pointer-events: none;
        }
        .chocolate-tile-selected {
          background: linear-gradient(145deg, #7b5544 0%, #6d4c41 30%, #5d4037 70%, #4e342e 100%);
          box-shadow: 
            inset 1px 1px 2px rgba(255,255,255,0.2),
            inset -1px -1px 2px rgba(0,0,0,0.2),
            0 0 15px rgba(139, 90, 43, 0.8),
            0 0 0 2px rgba(205, 133, 63, 0.6);
        }
        .chocolate-slot {
          background: linear-gradient(145deg, #2a1f1a 0%, #1a1210 100%);
          box-shadow: inset 2px 2px 6px rgba(0,0,0,0.6);
          border: 2px dashed rgba(139, 90, 43, 0.3);
          border-radius: 3px;
        }
        .chocolate-slot-filled {
          background: linear-gradient(145deg, #5d4037 0%, #4e342e 30%, #3e2723 70%, #2d1f1a 100%);
          box-shadow: 
            inset 1px 1px 2px rgba(255,255,255,0.1),
            inset -1px -1px 2px rgba(0,0,0,0.2),
            1px 1px 3px rgba(0,0,0,0.3);
          border: none;
          border-radius: 3px;
        }
        
        /* Cookie Tiles */
        .cookie-tile {
          background: radial-gradient(ellipse at 30% 30%, #e8b87a 0%, #d4a056 40%, #c4863e 70%, #a86e30 100%);
          box-shadow: 
            2px 3px 6px rgba(0,0,0,0.4),
            inset 0 2px 4px rgba(255,255,255,0.3),
            inset 0 -2px 4px rgba(0,0,0,0.2);
          border-radius: 50%;
          position: relative;
        }
        .cookie-tile::before {
          content: '';
          position: absolute;
          top: 15%;
          left: 20%;
          width: 15%;
          height: 15%;
          background: #5d3a1a;
          border-radius: 50%;
          box-shadow: 
            12px 8px 0 #5d3a1a,
            -4px 14px 0 #5d3a1a,
            8px 18px 0 #5d3a1a;
        }
        .cookie-tile-selected {
          background: radial-gradient(ellipse at 30% 30%, #f5d49a 0%, #e8b87a 40%, #d4a056 70%, #c4863e 100%);
          box-shadow: 
            0 0 15px rgba(255, 200, 100, 0.8),
            2px 3px 6px rgba(0,0,0,0.4),
            inset 0 2px 4px rgba(255,255,255,0.4);
        }
        .cookie-slot {
          background: linear-gradient(145deg, #3d3028 0%, #2d2018 100%);
          box-shadow: inset 2px 2px 6px rgba(0,0,0,0.5);
          border: 2px dashed rgba(200, 160, 100, 0.3);
          border-radius: 50%;
        }
        .cookie-slot-filled {
          background: radial-gradient(ellipse at 30% 30%, #e8b87a 0%, #d4a056 40%, #c4863e 70%, #a86e30 100%);
          box-shadow: 
            1px 2px 4px rgba(0,0,0,0.3),
            inset 0 1px 3px rgba(255,255,255,0.2);
          border: none;
          border-radius: 50%;
        }
        
        /* Fridge Magnets */
        .fridge-magnet {
          background: linear-gradient(180deg, #f5f5f5 0%, #e8e8e8 50%, #d5d5d5 100%);
          box-shadow: 
            2px 2px 4px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.8),
            inset 0 -1px 0 rgba(0,0,0,0.1);
          border-radius: 6px;
        }
        .fridge-magnet-orange {
          background: linear-gradient(180deg, #ffb366 0%, #ff9933 50%, #e68a2e 100%);
          box-shadow: 
            2px 2px 4px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.4),
            inset 0 -1px 0 rgba(0,0,0,0.2);
          border-radius: 6px;
        }
        .fridge-surface {
          background: linear-gradient(180deg, #4a5568 0%, #3d4654 50%, #2d3748 100%);
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.3);
        }
      `}</style>
      
      <div className="max-w-lg mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-10"></div>
          <div className="text-center">
            <div className="text-5xl mb-1">🍪</div>
            <p className="text-amber-400/80 text-sm font-medium tracking-wide">Letter Griddle</p>
            <h1 className="text-3xl font-bold text-amber-200" style={{ fontFamily: 'Georgia, serif' }}>
              Snacks
            </h1>
            <p className="text-amber-300/80 text-sm mt-1">Make a snack without leaving any crumbs!</p>
          </div>
          <button
            onClick={() => setShowStatsModal(true)}
            className="bg-amber-800/60 hover:bg-amber-700/60 text-amber-200 p-2 rounded-full transition-all relative"
            title="View Statistics"
          >
            <BarChart3 size={20} />
            {unlockedList.length > 0 && (
              <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">
                {unlockedList.length}
              </div>
            )}
          </button>
        </div>
        
        {/* Win Banner */}
        {allComplete && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 mb-4 text-center shadow-2xl">
            <p className="text-2xl font-bold text-white mb-1">🎉 No Crumbs Left! 🎉</p>
            <p className="text-white/90 text-sm mb-3">Time: {formatTime(completionTime)}</p>
            <button
              onClick={() => setShowShareModal(true)}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full font-bold text-sm transition-all inline-flex items-center gap-2"
            >
              <Share2 size={16} />
              Share Results
            </button>
          </div>
        )}
        
        {/* FRIDGE - HINT (at top) */}
        <div className={`rounded-2xl p-4 mb-4 transition-all ${
          hintComplete 
            ? 'bg-gradient-to-br from-green-700/80 to-green-800/80 border-2 border-green-400' 
            : 'bg-gradient-to-br from-slate-600/90 to-slate-700/90 border-2 border-slate-500/50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧊</span>
              <div>
                <span className="text-slate-200 font-semibold text-sm">The Fridge</span>
                <span className="text-slate-400 text-xs ml-2">• HINT</span>
              </div>
            </div>
            {hintComplete && <span className="text-green-300 font-bold text-sm">✓ Complete!</span>}
          </div>
          
          <p className="text-slate-400 text-xs text-center mb-3">
            🧲 Arrange the magnets to reveal the hint
          </p>
          
          {/* Fridge Door Surface */}
          <div className="fridge-surface rounded-xl p-4 mb-4 min-h-[80px]">
            <div className="flex flex-wrap gap-2 justify-center">
              {arrangedHint.map((chunk, i) => (
                <button
                  key={i}
                  onClick={() => handleChunkClick(chunk, true)}
                  className={`px-4 py-2.5 text-base font-medium transition-all cursor-pointer ${
                    hintComplete 
                      ? 'bg-green-500 text-white rounded-lg shadow-lg' 
                      : 'fridge-magnet text-slate-700 hover:scale-105'
                  }`}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {chunk}
                </button>
              ))}
              {arrangedHint.length === 0 && (
                <span className="text-slate-500 italic text-sm">Tap magnets below to build the hint...</span>
              )}
            </div>
          </div>
          
          {/* Scrambled Chunks */}
          {!hintComplete && (
            <div className="flex flex-wrap gap-2.5 justify-center">
              {availableChunks.map((chunk, i) => (
                <button
                  key={i}
                  onClick={() => handleChunkClick(chunk, false)}
                  className="fridge-magnet-orange px-4 py-2.5 text-base font-medium text-orange-900 hover:scale-105 transition-all cursor-pointer"
                  style={{ 
                    fontFamily: 'Georgia, serif',
                    transform: `rotate(${(i % 5 - 2) * 2}deg)`
                  }}
                >
                  {chunk}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* PANTRY - WORD (Chocolate Squares) */}
        <div className={`rounded-2xl p-4 mb-4 transition-all ${
          wordComplete 
            ? 'bg-gradient-to-br from-green-700/80 to-green-800/80 border-2 border-green-400' 
            : 'bg-gradient-to-br from-amber-900/80 to-stone-900/80 border-2 border-amber-700/50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍫</span>
              <div>
                <span className="text-amber-200 font-semibold text-sm">The Candy Jar</span>
                <span className="text-amber-400/70 text-xs ml-2">• WORD</span>
              </div>
            </div>
            {wordComplete && <span className="text-green-300 font-bold text-sm">✓ Complete!</span>}
          </div>
          
          {/* Word Slots - Chocolate squares */}
          <div className="flex gap-2 justify-center mb-3">
            {wordSlots.map((letter, i) => (
              <button
                key={i}
                onClick={() => handleWordSlotClick(i)}
                className={`w-12 h-12 flex items-center justify-center text-xl font-bold transition-all ${
                  wordComplete
                    ? 'bg-green-500 text-white rounded-lg shadow-lg'
                    : letter 
                      ? 'chocolate-slot-filled text-amber-100 hover:scale-105 cursor-pointer' 
                      : 'chocolate-slot text-transparent hover:border-amber-500'
                }`}
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {letter || '·'}
              </button>
            ))}
          </div>
          
          {/* Available Letters - Chocolate squares */}
          {!wordComplete && (
            <div className="flex gap-2 justify-center flex-wrap">
              {availableWordLetters.map((letter, i) => (
                <button
                  key={i}
                  onClick={() => handleWordLetterClick(letter, i)}
                  className={`w-11 h-11 flex items-center justify-center text-lg font-bold transition-all cursor-pointer ${
                    selectedWordLetter?.index === i
                      ? 'chocolate-tile-selected text-amber-100 scale-110'
                      : 'chocolate-tile text-amber-100 hover:scale-105'
                  }`}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {letter}
                </button>
              ))}
            </div>
          )}
          
          {/* Shuffle button for Candy Jar */}
          {!wordComplete && availableWordLetters.length > 1 && (
            <div className="flex justify-center mt-3">
              <button
                onClick={shuffleWordLetters}
                className="px-4 py-1.5 bg-gradient-to-r from-amber-700/80 to-orange-800/80 hover:from-amber-600/80 hover:to-orange-700/80 text-amber-200 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 shadow-md border border-amber-600/30"
              >
                <span>✨</span> Shuffle
              </button>
            </div>
          )}
        </div>
        
        {/* COUNTERTOP - CATEGORY (Cookie tiles) */}
        <div className={`rounded-2xl p-4 mb-4 transition-all ${
          categoryComplete 
            ? 'bg-gradient-to-br from-green-700/80 to-green-800/80 border-2 border-green-400' 
            : 'bg-gradient-to-br from-stone-700/80 to-stone-800/80 border-2 border-stone-500/50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍪</span>
              <div>
                <span className="text-stone-200 font-semibold text-sm">The Cookie Jar</span>
                <span className="text-stone-400 text-xs ml-2">• CATEGORY</span>
              </div>
            </div>
            {categoryComplete && <span className="text-green-300 font-bold text-sm">✓ Complete!</span>}
          </div>
          
          {/* Category Slots - Cookie shaped */}
          <div className="flex gap-2 justify-center mb-3 flex-wrap">
            {categorySlots.map((letter, i) => (
              <button
                key={i}
                onClick={() => handleCategorySlotClick(i)}
                className={`w-10 h-10 flex items-center justify-center text-base font-bold transition-all ${
                  categoryComplete
                    ? 'bg-green-500 text-white rounded-full shadow-lg'
                    : letter 
                      ? 'cookie-slot-filled text-amber-900 hover:scale-105 cursor-pointer' 
                      : 'cookie-slot text-transparent hover:border-amber-400'
                }`}
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {letter || '·'}
              </button>
            ))}
          </div>
          
          {/* Available Letters - Cookie shaped */}
          {!categoryComplete && (
            <div className="flex gap-2 justify-center flex-wrap">
              {availableCategoryLetters.map((letter, i) => (
                <button
                  key={i}
                  onClick={() => handleCategoryLetterClick(letter, i)}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-bold transition-all cursor-pointer ${
                    selectedCategoryLetter?.index === i
                      ? 'cookie-tile-selected text-amber-900 scale-110'
                      : 'cookie-tile text-amber-900 hover:scale-105'
                  }`}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {letter}
                </button>
              ))}
            </div>
          )}
          
          {/* Shuffle button for Cookie Jar */}
          {!categoryComplete && availableCategoryLetters.length > 1 && (
            <div className="flex justify-center mt-3">
              <button
                onClick={shuffleCategoryLetters}
                className="px-4 py-1.5 bg-gradient-to-r from-stone-600/80 to-stone-700/80 hover:from-stone-500/80 hover:to-stone-600/80 text-amber-200 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 shadow-md border border-stone-500/30"
              >
                <span>✨</span> Shuffle
              </button>
            </div>
          )}
        </div>
        
        {/* Instructions */}
        <div className="text-center text-amber-300/60 text-xs mb-4">
          <p>🍫 Tap a chocolate or cookie, then tap an empty slot</p>
          <p className="mt-1">🧲 Tap magnets to arrange the hint on the fridge!</p>
        </div>
        
        {/* Footer */}
        <div className="text-center text-amber-200/50 text-xs mt-6">
          <p className="mb-2">New snack drops at midnight EST</p>
          <p>
            © {copyrightYear} Snacks by Letter Griddle
            {' | '}
            <a href="/privacy" className="hover:text-amber-300 underline">Privacy</a>
            {' | '}
            <a href="/terms" className="hover:text-amber-300 underline">Terms</a>
          </p>
          <p className="mt-2">
            <a href="https://lettergriddle.com" className="hover:text-amber-300 underline">
              🥞 More games at lettergriddle.com
            </a>
          </p>
        </div>
      </div>
      
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-amber-200" style={{ fontFamily: 'Georgia, serif' }}>
                Share Results 🍪
              </h2>
              <button onClick={() => setShowShareModal(false)} className="text-slate-400 hover:text-slate-200">
                <X size={24} />
              </button>
            </div>
            
            <div className="bg-slate-700/50 rounded-xl p-4 mb-4 font-mono text-sm text-amber-100">
              <div className="whitespace-pre-wrap">
{`🍪 Snacks #${puzzleIndex + 1}
${puzzle.category}
🧊✓ 🍫✓ 🍪✓
No crumbs left!
Time: ${formatTime(completionTime)}
🥞 Play more games at lettergriddle.com
Play at lettergriddle.com/snacks`}
              </div>
            </div>
            
            <button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              {shareCopied ? '✓ Copied!' : <><Share2 size={18} /> Share</>}
            </button>
          </div>
        </div>
      )}
      
      {/* Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowStatsModal(false)}>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-amber-200" style={{ fontFamily: 'Georgia, serif' }}>
                Statistics 📊
              </h2>
              <button onClick={() => setShowStatsModal(false)} className="text-slate-400 hover:text-slate-200">
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-amber-200">{stats.snacksCompleted}</div>
                <div className="text-xs text-slate-400">Snacks Made</div>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-amber-200">{stats.currentStreak}</div>
                <div className="text-xs text-slate-400">Current Streak 🔥</div>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-amber-200">{stats.maxStreak}</div>
                <div className="text-xs text-slate-400">Max Streak</div>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-amber-200">{formatTime(stats.fastestTime)}</div>
                <div className="text-xs text-slate-400">Fastest ⚡</div>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-amber-200 mb-3 flex items-center gap-2">
              🏆 Achievements
            </h3>
            
            <div className="space-y-2">
              {achievements.map(achievement => {
                const isUnlocked = unlockedList.includes(achievement.id);
                return (
                  <div
                    key={achievement.id}
                    className={`rounded-xl p-3 flex items-center gap-3 ${
                      isUnlocked 
                        ? 'bg-gradient-to-r from-amber-700/50 to-orange-700/50 border border-amber-500' 
                        : 'bg-slate-800/50 border border-slate-700 opacity-50'
                    }`}
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className={`font-bold text-sm ${isUnlocked ? 'text-amber-100' : 'text-slate-400'}`}>
                        {achievement.name}
                      </div>
                      <div className={`text-xs ${isUnlocked ? 'text-amber-300' : 'text-slate-500'}`}>
                        {achievement.description}
                      </div>
                    </div>
                    {isUnlocked && <div className="text-green-400">✓</div>}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 text-center text-xs text-slate-500">
              Stats saved locally on your device
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnacksGame;
