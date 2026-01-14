"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';

// Letter Griddle Pancakes - A cozy word-finding game

const PancakesGame = () => {
  // 10 Puzzles for beta testers!
  const allPuzzles = [
    {
      category: "Breakfast Favorites",
      puzzleNumber: 1,
      words: ["WAFFLE", "SYRUP", "BACON", "TOAST", "EGGS"],
      funFact: {
        title: "Dutch Baby Pancake",
        text: "Despite its name, the Dutch Baby pancake is actually American! It originated in Seattle in the early 1900s at Manca's Cafe. It's a large, puffy oven-baked pancake that dramatically deflates after coming out of the oven."
      }
    },
    {
      category: "Morning Drinks",
      puzzleNumber: 2,
      words: ["COFFEE", "JUICE", "LATTE", "MOCHA", "TEA"],
      funFact: {
        title: "Swedish Pancakes (Pannkakor)",
        text: "Swedish pancakes are thin and crepe-like, traditionally served rolled up with lingonberry jam. Unlike American pancakes, they're made without baking powder, resulting in a delicate, eggy texture perfect for sweet or savory fillings."
      }
    },
    {
      category: "Pancake Toppings",
      puzzleNumber: 3,
      words: ["MAPLE", "HONEY", "CREAM", "FRUIT", "NUTS"],
      funFact: {
        title: "Japanese Soufflé Pancakes",
        text: "These incredibly fluffy, jiggly pancakes became a viral sensation! Made by folding whipped meringue into the batter, they're cooked slowly in ring molds, resulting in tall, cloud-like pancakes that literally wobble on the plate."
      }
    },
    {
      category: "Brunch Menu",
      puzzleNumber: 4,
      words: ["CREPE", "BAGEL", "OMELET", "MUFFIN", "HASH"],
      funFact: {
        title: "Ethiopian Injera",
        text: "Injera is a sourdough flatbread with a unique, spongy texture made from teff flour. It serves as both plate and utensil in Ethiopian cuisine - diners tear off pieces to scoop up stews and salads placed on top!"
      }
    },
    {
      category: "Kitchen Tools",
      puzzleNumber: 5,
      words: ["SPATULA", "WHISK", "BOWL", "PAN", "LADLE"],
      funFact: {
        title: "Russian Blini",
        text: "These small, yeasted pancakes are a beloved Russian tradition, especially during Maslenitsa (Butter Week) before Lent. Traditionally served with smetana (sour cream), caviar, or smoked salmon, blini symbolize the sun with their round, golden shape."
      }
    },
    {
      category: "Cozy Morning",
      puzzleNumber: 6,
      words: ["BLANKET", "PILLOW", "WARM", "COZY", "REST"],
      funFact: {
        title: "Korean Hotteok",
        text: "Hotteok are sweet Korean pancakes filled with a gooey mixture of brown sugar, honey, cinnamon, and chopped nuts. Popular as street food, they're cooked on a griddle and pressed flat, creating a crispy exterior with a warm, melty center perfect for cold mornings!"
      }
    },
    {
      category: "Coffee Shop",
      puzzleNumber: 7,
      words: ["ESPRESSO", "BEANS", "ROAST", "BREW", "CUP"],
      funFact: {
        title: "French Crêpes",
        text: "Crêpes originated in Brittany, France, in the 13th century. The word comes from the Latin 'crispa' meaning curled. In France, February 2nd is 'La Chandeleur' (Crêpe Day), where tradition says if you can flip a crêpe while holding a coin in your other hand, you'll have prosperity all year!"
      }
    },
    {
      category: "Farmer's Market",
      puzzleNumber: 8,
      words: ["FRESH", "LOCAL", "ORGANIC", "FRUIT", "VENDOR"],
      funFact: {
        title: "German Pfannkuchen",
        text: "German pancakes vary by region - in Berlin, 'Pfannkuchen' actually refers to jelly doughnuts! The flat pancakes are called 'Eierkuchen' (egg cakes) there. Traditionally served rolled up with sugar or jam, they're thinner than American pancakes but thicker than French crêpes."
      }
    },
    {
      category: "Sweet Treats",
      puzzleNumber: 9,
      words: ["CARAMEL", "CHOCOLATE", "VANILLA", "SUGAR", "CANDY"],
      funFact: {
        title: "Indian Dosa",
        text: "Dosa is a thin, crispy South Indian pancake made from fermented rice and lentil batter. Dating back over 2,000 years, it's naturally gluten-free and probiotic-rich from fermentation. The batter ferments overnight, creating that signature tangy flavor and helping the dosa achieve its famous crispiness!"
      }
    },
    {
      category: "Weekend Vibes",
      puzzleNumber: 10,
      words: ["RELAX", "BRUNCH", "LAZY", "SLEEP", "CHILL"],
      funFact: {
        title: "Scottish Pancakes",
        text: "Scottish pancakes (also called Scotch pancakes or drop scones) are small, thick, and fluffy - perfect for afternoon tea! Queen Elizabeth II reportedly shared her personal recipe with President Eisenhower in 1960. They're traditionally served warm with butter and jam, or cold as a teatime treat."
      }
    }
  ];

  // Achievements system
  const allAchievements = [
    { id: 'first_stack', name: 'First Stack', icon: '🥞', description: 'Complete your first puzzle', requirement: (stats) => stats.gamesWon >= 1 },
    { id: 'five_stack', name: 'Short Stack', icon: '🥞🥞', description: 'Complete 5 puzzles', requirement: (stats) => stats.gamesWon >= 5 },
    { id: 'ten_stack', name: 'Tall Stack', icon: '🥞🥞🥞', description: 'Complete 10 puzzles', requirement: (stats) => stats.gamesWon >= 10 },
    { id: 'speed_flipper', name: 'Speed Flipper', icon: '⚡', description: 'Complete a puzzle in under 30 flips', requirement: (stats) => stats.fewestFlips !== null && stats.fewestFlips < 30 },
    { id: 'efficient_chef', name: 'Efficient Chef', icon: '👨‍🍳', description: 'Complete a puzzle in under 25 flips', requirement: (stats) => stats.fewestFlips !== null && stats.fewestFlips < 25 },
    { id: 'pancake_master', name: 'Pancake Master', icon: '🏆', description: 'Complete a puzzle in under 20 flips', requirement: (stats) => stats.fewestFlips !== null && stats.fewestFlips < 20 },
    { id: 'word_hunter', name: 'Word Hunter', icon: '🔍', description: 'Find 25 total words', requirement: (stats) => stats.totalWordsFound >= 25 },
    { id: 'word_champion', name: 'Word Champion', icon: '📚', description: 'Find 50 total words', requirement: (stats) => stats.totalWordsFound >= 50 },
    { id: 'hot_streak', name: 'Hot Griddle', icon: '🔥', description: '3 puzzle streak', requirement: (stats) => stats.maxStreak >= 3 },
    { id: 'on_fire', name: 'On Fire!', icon: '🌟', description: '5 puzzle streak', requirement: (stats) => stats.maxStreak >= 5 },
    { id: 'syrup_lover', name: 'Syrup Lover', icon: '🍯', description: 'Earn all toppings 3 times', requirement: (stats) => stats.gamesWon >= 3 },
    { id: 'breakfast_regular', name: 'Breakfast Regular', icon: '☕', description: 'Play 15 games', requirement: (stats) => stats.gamesPlayed >= 15 },
  ];

  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const puzzleData = allPuzzles[currentPuzzleIndex];

  // Toppings progression
  const toppings = [
    { name: "Butter", emoji: "🧈" },
    { name: "Syrup", emoji: "🍯" },
    { name: "Strawberries", emoji: "🍓" },
    { name: "Blueberries", emoji: "🫐" },
    { name: "Honey Drizzle", emoji: "🍯" }
  ];

  // Music tracks
  const musicTracks = [
    { name: 'Crepe Suzette', file: '/audio/crepe-suzette.mp3' },
    { name: 'Dinner Hour', file: '/audio/dinner-hour.mp3' },
    { name: 'Pancakes at Sunset', file: '/audio/pancakes-at-sunset.mp3' }
  ];

  const GRID_SIZE = 8;

  const directions = [
    { dr: 0, dc: 1 },  // horizontal
    { dr: 1, dc: 0 },  // vertical
    { dr: 1, dc: 1 }   // diagonal
  ];

  // Audio ref
  const audioRef = useRef(null);

  // Generate grid
  const generateGrid = useCallback((words) => {
    const grid = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        grid.push({
          id: r * GRID_SIZE + c,
          row: r,
          col: c,
          letter: '',
          isHint: false,
          isFlipped: false,
          isSelected: false,
          isFound: false
        });
      }
    }

    const getCell = (r, c) => grid[r * GRID_SIZE + c];
    const setCell = (r, c, data) => {
      const idx = r * GRID_SIZE + c;
      grid[idx] = { ...grid[idx], ...data };
    };

    for (const word of words) {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 200) {
        attempts++;
        
        const dir = directions[Math.floor(Math.random() * directions.length)];
        const maxRow = GRID_SIZE - (dir.dr * word.length);
        const maxCol = GRID_SIZE - (dir.dc * word.length);
        
        if (maxRow <= 0 || maxCol <= 0) continue;
        
        const startRow = Math.floor(Math.random() * maxRow);
        const startCol = Math.floor(Math.random() * maxCol);

        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
          const r = startRow + (dir.dr * i);
          const c = startCol + (dir.dc * i);
          const cell = getCell(r, c);
          
          if (cell.letter !== '' && cell.letter !== word[i]) {
            canPlace = false;
            break;
          }
        }

        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            const r = startRow + (dir.dr * i);
            const c = startCol + (dir.dc * i);
            setCell(r, c, { letter: word[i] });
          }

          const firstR = startRow;
          const firstC = startCol;
          setCell(firstR, firstC, { isHint: true, isFlipped: true });

          if (word.length >= 5) {
            const midIdx = Math.floor(word.length / 2);
            const midR = startRow + (dir.dr * midIdx);
            const midC = startCol + (dir.dc * midIdx);
            setCell(midR, midC, { isHint: true, isFlipped: true });
          }

          placed = true;
        }
      }
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].letter === '') {
        grid[i].letter = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }

    return grid;
  }, []);

  // Initialize game state
  const [tiles, setTiles] = useState(() => generateGrid(puzzleData.words));
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState([]);
  const [earnedToppings, setEarnedToppings] = useState([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showJukebox, setShowJukebox] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [message, setMessage] = useState('');
  const [flipCount, setFlipCount] = useState(0);
  const [newAchievement, setNewAchievement] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);

  // Music state
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // Stats
  const [stats, setStats] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pancakesStats');
        return saved ? JSON.parse(saved) : {
          gamesPlayed: 0,
          gamesWon: 0,
          totalWordsFound: 0,
          fewestFlips: null,
          currentStreak: 0,
          maxStreak: 0,
          unlockedAchievements: []
        };
      } catch {
        return { gamesPlayed: 0, gamesWon: 0, totalWordsFound: 0, fewestFlips: null, currentStreak: 0, maxStreak: 0, unlockedAchievements: [] };
      }
    }
    return { gamesPlayed: 0, gamesWon: 0, totalWordsFound: 0, fewestFlips: null, currentStreak: 0, maxStreak: 0, unlockedAchievements: [] };
  });

  // Save stats
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('pancakesStats', JSON.stringify(stats));
      } catch (e) {
        console.error('Could not save stats', e);
      }
    }
  }, [stats]);

  // Check for new achievements
  const checkAchievements = (newStats) => {
    const newlyUnlocked = [];
    allAchievements.forEach(achievement => {
      const unlocked = newStats.unlockedAchievements || [];
      if (!unlocked.includes(achievement.id) && achievement.requirement(newStats)) {
        newlyUnlocked.push(achievement);
      }
    });

    if (newlyUnlocked.length > 0) {
      setNewAchievement(newlyUnlocked[0]);
      setTimeout(() => setNewAchievement(null), 3000);
      const currentUnlocked = newStats.unlockedAchievements || [];
      return [...currentUnlocked, ...newlyUnlocked.map(a => a.id)];
    }
    return newStats.unlockedAchievements || [];
  };

  // Music controls
  const playTrack = (track) => {
    if (audioRef.current) {
      audioRef.current.src = track.file;
      audioRef.current.volume = volume;
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        setIsPlaying(true);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Check adjacency
  const areAdjacent = (tile1, tile2) => {
    const rowDiff = Math.abs(tile1.row - tile2.row);
    const colDiff = Math.abs(tile1.col - tile2.col);
    return rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0);
  };

  // Handle tile click
  const handleTileClick = (tileId) => {
    const tile = tiles.find(t => t.id === tileId);
    if (!tile || tile.isFound) return;

    if (!tile.isFlipped) {
      setTiles(prev => prev.map(t => 
        t.id === tileId ? { ...t, isFlipped: true } : t
      ));
      setFlipCount(prev => prev + 1);
      return;
    }

    if (tile.isSelected) {
      const idx = selectedTiles.findIndex(t => t.id === tileId);
      if (idx === selectedTiles.length - 1) {
        setTiles(prev => prev.map(t => 
          t.id === tileId ? { ...t, isSelected: false } : t
        ));
        setSelectedTiles(prev => prev.slice(0, -1));
        setCurrentWord(prev => prev.slice(0, -1));
      }
      return;
    }

    if (selectedTiles.length > 0) {
      const lastTile = selectedTiles[selectedTiles.length - 1];
      if (!areAdjacent(lastTile, tile)) {
        setMessage('Select an adjacent pancake! 🥞');
        setTimeout(() => setMessage(''), 1500);
        return;
      }
    }

    setTiles(prev => prev.map(t => 
      t.id === tileId ? { ...t, isSelected: true } : t
    ));
    setSelectedTiles(prev => [...prev, tile]);
    setCurrentWord(prev => prev + tile.letter);
  };

  // Check word
  const checkWord = () => {
    if (puzzleData.words.includes(currentWord) && !foundWords.includes(currentWord)) {
      const newFoundWords = [...foundWords, currentWord];
      setFoundWords(newFoundWords);
      setEarnedToppings(prev => [...prev, toppings[prev.length]]);
      
      const selectedIds = selectedTiles.map(t => t.id);
      setTiles(prev => prev.map(t => 
        selectedIds.includes(t.id) ? { ...t, isFound: true, isSelected: false } : t
      ));
      
      setMessage('Delicious! 🍯');
      setTimeout(() => setMessage(''), 1500);
      
      setSelectedTiles([]);
      setCurrentWord('');

      if (newFoundWords.length === puzzleData.words.length) {
        const newStats = {
          ...stats,
          gamesPlayed: stats.gamesPlayed + 1,
          gamesWon: stats.gamesWon + 1,
          totalWordsFound: stats.totalWordsFound + puzzleData.words.length,
          fewestFlips: stats.fewestFlips === null ? flipCount : Math.min(stats.fewestFlips, flipCount),
          currentStreak: stats.currentStreak + 1,
          maxStreak: Math.max(stats.maxStreak, stats.currentStreak + 1),
          unlockedAchievements: stats.unlockedAchievements || []
        };
        newStats.unlockedAchievements = checkAchievements(newStats);
        setStats(newStats);
        setTimeout(() => setShowCompletion(true), 800);
      }
    } else if (foundWords.includes(currentWord)) {
      setMessage('Already found that one! 🥞');
      setTimeout(() => setMessage(''), 1500);
    } else {
      setMessage('Not on today\'s menu... 🤔');
      setTimeout(() => setMessage(''), 1500);
    }
  };

  // Clear selection
  const clearSelection = () => {
    setTiles(prev => prev.map(t => ({ ...t, isSelected: false })));
    setSelectedTiles([]);
    setCurrentWord('');
  };

  // Native sharing
  const handleShare = async () => {
    const shareText = `🥞 Letter Griddle Pancakes
${puzzleData.category} - Puzzle #${puzzleData.puzzleNumber}
${'🍯'.repeat(foundWords.length)} ${foundWords.length}/5 words
Completed in ${flipCount} flips!
${stats.fewestFlips && flipCount <= stats.fewestFlips ? '🏆 New personal best!' : ''}
Play at lettergriddle.com/pancakes`;

    // Try native share first
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Letter Griddle Pancakes',
          text: shareText,
        });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log('Share failed, falling back to clipboard');
        }
      }
    }
    
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareText);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch (err) {
      console.error('Could not copy to clipboard', err);
    }
  };

  // Reset game
  const resetGame = () => {
    setTiles(generateGrid(puzzleData.words));
    setSelectedTiles([]);
    setCurrentWord('');
    setFoundWords([]);
    setEarnedToppings([]);
    setShowCompletion(false);
    setMessage('');
    setFlipCount(0);
  };

  // Next puzzle
  const nextPuzzle = () => {
    const nextIdx = (currentPuzzleIndex + 1) % allPuzzles.length;
    setCurrentPuzzleIndex(nextIdx);
    setTiles(generateGrid(allPuzzles[nextIdx].words));
    setSelectedTiles([]);
    setCurrentWord('');
    setFoundWords([]);
    setEarnedToppings([]);
    setShowCompletion(false);
    setMessage('');
    setFlipCount(0);
  };

  // Reset stats
  const resetAllStats = () => {
    const emptyStats = { gamesPlayed: 0, gamesWon: 0, totalWordsFound: 0, fewestFlips: null, currentStreak: 0, maxStreak: 0, unlockedAchievements: [] };
    setStats(emptyStats);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pancakesStats');
    }
    setShowResetConfirm(false);
    setShowStats(false);
  };

  const currentYear = new Date().getFullYear();
  const unlockedList = stats.unlockedAchievements || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl opacity-10">🥞</div>
        <div className="absolute top-20 right-20 text-5xl opacity-10">☕</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-10">🧇</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-10">🍳</div>
      </div>

      {/* Audio element */}
      <audio ref={audioRef} loop />

      {/* Achievement popup */}
      {newAchievement && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
            <span className="text-2xl">{newAchievement.icon}</span>
            <div>
              <div className="font-bold text-sm">Achievement Unlocked!</div>
              <div className="text-xs">{newAchievement.name}</div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto p-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-4">
          <a 
            href="https://lettergriddle.com" 
            className="text-amber-600 hover:text-amber-800 text-sm font-medium inline-flex items-center gap-1 mb-2 transition-colors"
          >
            ← Back to Letter Griddle
          </a>
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
            🥞 Letter Griddle Pancakes
          </h1>
          <p className="text-amber-700 text-sm">Find the words, earn the toppings!</p>
        </div>

        {/* Category Chalkboard */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-3 mb-4 shadow-xl border-4 border-amber-700 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-600 px-4 py-1 rounded-full text-white text-xs font-bold shadow-lg">
            TODAY'S MENU
          </div>
          <p className="text-center text-xl md:text-2xl text-white font-bold mt-2" style={{ fontFamily: 'Georgia, serif' }}>
            {puzzleData.category}
          </p>
          <p className="text-center text-amber-300 text-xs mt-1">Puzzle #{puzzleData.puzzleNumber} of {allPuzzles.length}</p>
        </div>

        {/* Toppings Progress */}
        <div className="bg-white/80 backdrop-blur rounded-xl p-3 mb-4 shadow-lg border-2 border-amber-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-amber-800">Toppings Earned:</span>
            <span className="text-xs text-amber-600">{foundWords.length}/5 words • {flipCount} flips</span>
          </div>
          <div className="flex justify-center gap-3 md:gap-4">
            {toppings.map((topping, idx) => (
              <div
                key={topping.name}
                className={`flex flex-col items-center transition-all duration-300 ${
                  idx < earnedToppings.length 
                    ? 'scale-110 opacity-100' 
                    : 'scale-90 opacity-30 grayscale'
                }`}
              >
                <span className="text-2xl md:text-3xl">{topping.emoji}</span>
                <span className="text-[10px] md:text-xs text-amber-700 mt-1">{topping.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Word Display */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl p-3 mb-4 shadow-lg">
          <div className="bg-white/90 rounded-lg p-2 min-h-[44px] flex items-center justify-center mb-2">
            {currentWord ? (
              <span className="text-xl md:text-2xl font-bold text-amber-900 tracking-widest" style={{ fontFamily: 'Georgia, serif' }}>
                {currentWord}
              </span>
            ) : (
              <span className="text-amber-400 italic text-sm">Tap pancakes to spell a word...</span>
            )}
          </div>
          
          {message && (
            <div className="text-center text-white font-bold text-sm mb-2">
              {message}
            </div>
          )}
          
          <div className="flex justify-center gap-3">
            <button
              onClick={checkWord}
              disabled={currentWord.length < 3}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-400 text-white disabled:text-gray-500 px-5 py-2 rounded-full font-bold transition-all shadow-lg disabled:cursor-not-allowed text-sm"
            >
              ✓ Check
            </button>
            <button
              onClick={clearSelection}
              disabled={!currentWord}
              className="bg-white/90 hover:bg-white disabled:bg-gray-200 text-amber-700 disabled:text-gray-400 px-5 py-2 rounded-full font-bold transition-all shadow-lg disabled:cursor-not-allowed text-sm border-2 border-amber-400 disabled:border-gray-300"
            >
              ✕ Clear
            </button>
          </div>
        </div>

        {/* Pancake Grid */}
        <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-xl p-2 md:p-3 shadow-2xl border-4 border-amber-600">
          <div className="grid grid-cols-8 gap-1">
            {tiles.map((tile) => {
              const isLightSquare = (tile.row + tile.col) % 2 === 0;
              
              return (
                <div
                  key={tile.id}
                  className={`aspect-square rounded ${isLightSquare ? 'bg-amber-100' : 'bg-amber-300'}`}
                >
                  <button
                    onClick={() => handleTileClick(tile.id)}
                    disabled={tile.isFound}
                    className={`w-full h-full rounded flex items-center justify-center transition-all duration-200
                      ${tile.isFound 
                        ? 'opacity-40 cursor-default' 
                        : 'hover:scale-105 cursor-pointer active:scale-95'
                      }
                      ${tile.isSelected 
                        ? 'ring-2 ring-green-500 ring-offset-1 scale-105' 
                        : ''
                      }
                      ${tile.isHint && !tile.isFound && tile.isFlipped
                        ? 'ring-2 ring-yellow-400'
                        : ''
                      }
                      ${tile.isFlipped
                        ? tile.isFound
                          ? 'bg-gradient-to-br from-green-200 to-green-300 border-2 border-green-400'
                          : tile.isHint
                            ? 'bg-gradient-to-br from-yellow-100 to-amber-200 border-2 border-amber-500'
                            : 'bg-gradient-to-br from-yellow-200 to-amber-300 border-2 border-amber-400'
                        : 'bg-gradient-to-br from-amber-400 to-amber-600'
                      }
                    `}
                  >
                    {tile.isFlipped ? (
                      <span 
                        className={`text-sm md:text-lg font-bold ${tile.isFound ? 'text-green-800' : 'text-amber-900'}`}
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {tile.letter}
                      </span>
                    ) : (
                      <span className="text-lg md:text-xl">🥞</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tip */}
        <div className="mt-3 text-center text-xs text-amber-700 bg-amber-50 rounded-lg p-2">
          <p>💡 <strong>Tip:</strong> Words are placed in a line (→ ↓ ↘). Follow the revealed letters!</p>
        </div>

        {/* Words to Find */}
        <div className="mt-4 bg-white/80 backdrop-blur rounded-xl p-3 shadow-lg border-2 border-amber-200">
          <h3 className="text-xs font-bold text-amber-800 mb-2">Words to Find:</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {puzzleData.words.map((word) => (
              <span
                key={word}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  foundWords.includes(word)
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {foundWords.includes(word) ? word : '?' + '•'.repeat(word.length - 2) + '?'}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Controls */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setShowHowToPlay(true)}
            className="bg-amber-100 hover:bg-amber-200 text-amber-800 p-3 rounded-full transition-all shadow-md"
            title="How to Play"
          >
            ❓
          </button>
          <button
            onClick={() => setShowStats(true)}
            className="bg-amber-100 hover:bg-amber-200 text-amber-800 p-3 rounded-full transition-all shadow-md"
            title="Stats"
          >
            📊
          </button>
          <button
            onClick={() => setShowAchievements(true)}
            className="bg-amber-100 hover:bg-amber-200 text-amber-800 p-3 rounded-full transition-all shadow-md relative"
            title="Achievements"
          >
            🏆
            {unlockedList.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {unlockedList.length}
              </span>
            )}
          </button>
          <button
            onClick={resetGame}
            className="bg-amber-100 hover:bg-amber-200 text-amber-800 p-3 rounded-full transition-all shadow-md"
            title="Restart Puzzle"
          >
            🔄
          </button>
          <button
            onClick={nextPuzzle}
            className="bg-amber-100 hover:bg-amber-200 text-amber-800 p-3 rounded-full transition-all shadow-md"
            title="Next Puzzle"
          >
            ⏭️
          </button>
          <button
            onClick={() => setShowJukebox(true)}
            className={`p-3 rounded-full transition-all shadow-md ${
              isPlaying 
                ? 'bg-amber-500 text-white' 
                : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
            }`}
            title="Jukebox"
          >
            🎵
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-3 text-center text-xs text-amber-600">
          <p>🥞 Tap pancakes to flip • Trace adjacent letters • Find all 5 words!</p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-amber-600">
          <p>© {currentYear} Letter Griddle. All rights reserved.</p>
          <div className="mt-1 flex justify-center gap-2">
            <a href="/privacy" className="hover:text-amber-800 underline">Privacy Policy</a>
            <span>•</span>
            <a href="/terms" className="hover:text-amber-800 underline">Terms of Service</a>
          </div>
          <p className="mt-1 text-amber-500">lettergriddle.com/pancakes</p>
        </div>
      </div>

      {/* Completion Modal */}
      {showCompletion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-4 border-amber-300 max-h-[90vh] overflow-y-auto">
            <div className="text-center">
              <div className="text-5xl md:text-6xl mb-3">🥞</div>
              <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Order Up!
              </h2>
              <p className="text-amber-700 mb-2 text-sm">You've completed your pancake stack!</p>
              <p className="text-amber-600 mb-4 text-xs">Completed in <strong>{flipCount} flips</strong>!</p>
              
              {/* Pancake Stack */}
              <div className="bg-white rounded-xl p-4 md:p-6 mb-4 shadow-inner">
                <div className="flex justify-center text-3xl md:text-4xl mb-2 gap-1">
                  {earnedToppings.map((t, i) => (
                    <span key={i}>{t.emoji}</span>
                  ))}
                </div>
                <div className="text-5xl md:text-6xl">🥞</div>
              </div>

              {/* Fun Fact */}
              <div className="bg-amber-100 rounded-xl p-3 md:p-4 mb-4 text-left border-2 border-amber-200">
                <h4 className="font-bold text-amber-900 mb-1 text-sm">🍳 {puzzleData.funFact.title}</h4>
                <p className="text-xs text-amber-800">{puzzleData.funFact.text}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleShare}
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-3 rounded-full font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {shareCopied ? '✓ Copied!' : '🥞 Share Results'}
                </button>
                <button
                  onClick={() => {
                    setShowCompletion(false);
                    nextPuzzle();
                  }}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-full font-bold text-base shadow-lg transition-all"
                >
                  Next Puzzle! ⏭️
                </button>
                <button
                  onClick={() => {
                    setShowCompletion(false);
                    resetGame();
                  }}
                  className="text-amber-600 hover:text-amber-800 text-sm underline"
                >
                  Play this one again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Modal */}
      {showStats && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowStats(false)}>
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-4 border-amber-300" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold text-amber-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                📊 Your Stats
              </h2>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white rounded-xl p-3 shadow-inner">
                  <div className="text-2xl font-bold text-amber-800">{stats.gamesPlayed}</div>
                  <div className="text-xs text-amber-600">Games Played</div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-inner">
                  <div className="text-2xl font-bold text-amber-800">{stats.gamesWon}</div>
                  <div className="text-xs text-amber-600">Stacks Completed</div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-inner">
                  <div className="text-2xl font-bold text-amber-800">{stats.totalWordsFound}</div>
                  <div className="text-xs text-amber-600">Words Found</div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-inner">
                  <div className="text-2xl font-bold text-amber-800">{stats.fewestFlips ?? '--'}</div>
                  <div className="text-xs text-amber-600">Fewest Flips 🏆</div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-inner">
                  <div className="text-2xl font-bold text-amber-800">{stats.currentStreak}</div>
                  <div className="text-xs text-amber-600">Current Streak 🔥</div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-inner">
                  <div className="text-2xl font-bold text-amber-800">{stats.maxStreak}</div>
                  <div className="text-xs text-amber-600">Max Streak</div>
                </div>
              </div>

              <button
                onClick={() => setShowResetConfirm(true)}
                className="text-red-500 hover:text-red-600 text-xs underline"
              >
                Reset All Progress
              </button>
              
              <div className="mt-4">
                <button
                  onClick={() => setShowStats(false)}
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements Modal */}
      {showAchievements && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAchievements(false)}>
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-4 border-amber-300 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold text-amber-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                🏆 Achievements
              </h2>
              <p className="text-amber-600 text-xs mb-4">{unlockedList.length}/{allAchievements.length} unlocked</p>
              
              <div className="space-y-2">
                {allAchievements.map(achievement => {
                  const isUnlocked = unlockedList.includes(achievement.id);
                  return (
                    <div
                      key={achievement.id}
                      className={`rounded-xl p-3 flex items-center gap-3 ${
                        isUnlocked 
                          ? 'bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-400' 
                          : 'bg-gray-100 border-2 border-gray-200 opacity-50'
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1 text-left">
                        <div className={`font-bold text-sm ${isUnlocked ? 'text-amber-800' : 'text-gray-500'}`}>
                          {achievement.name}
                        </div>
                        <div className={`text-xs ${isUnlocked ? 'text-amber-600' : 'text-gray-400'}`}>
                          {achievement.description}
                        </div>
                      </div>
                      {isUnlocked && <div className="text-green-500 text-lg">✓</div>}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4">
                <button
                  onClick={() => setShowAchievements(false)}
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-amber-300">
            <div className="text-center">
              <div className="text-4xl mb-3">🥞</div>
              <h3 className="text-xl font-bold text-amber-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Reset All Progress?
              </h3>
              <p className="text-amber-700 text-sm mb-4">
                This will clear all your stats and achievements. This cannot be undone!
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="bg-white hover:bg-gray-100 text-amber-700 px-5 py-2 rounded-full font-bold text-sm border-2 border-amber-400"
                >
                  Keep Stats
                </button>
                <button
                  onClick={resetAllStats}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg"
                >
                  Reset Everything
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Jukebox Modal */}
      {showJukebox && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowJukebox(false)}>
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-4 border-amber-300" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-4xl mb-2">🎵</div>
              <h2 className="text-xl md:text-2xl font-bold text-amber-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Jukebox
              </h2>
              
              {currentTrack && (
                <div className="bg-white rounded-xl p-3 mb-4 shadow-inner">
                  <p className="text-amber-800 font-medium text-sm">Now Playing:</p>
                  <p className="text-amber-600 text-lg font-bold">{currentTrack.name}</p>
                  
                  <div className="flex items-center justify-center gap-3 mt-3">
                    <button
                      onClick={togglePlayPause}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg"
                    >
                      {isPlaying ? '⏸' : '▶'}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs text-amber-600">🔈</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="flex-1 h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-amber-600">🔊</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-2 mb-4">
                {musicTracks.map((track) => (
                  <button
                    key={track.name}
                    onClick={() => playTrack(track)}
                    className={`w-full rounded-lg p-3 text-left transition-all border-2 flex items-center gap-3 ${
                      currentTrack?.name === track.name
                        ? 'bg-amber-200 border-amber-500'
                        : 'bg-white hover:bg-amber-100 border-amber-200 hover:border-amber-400'
                    }`}
                  >
                    <span className="text-xl">{currentTrack?.name === track.name && isPlaying ? '🎶' : '🎵'}</span>
                    <span className="text-amber-800 font-medium">{track.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-4">
                <button
                  onClick={() => setShowJukebox(false)}
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How to Play Modal */}
      {showHowToPlay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowHowToPlay(false)}>
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-4 border-amber-300 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-4xl mb-2">🥞</div>
              <h2 className="text-xl md:text-2xl font-bold text-amber-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                How to Play
              </h2>
              
              <div className="space-y-4 text-left">
                {/* Step 1 */}
                <div className="bg-white rounded-xl p-4 shadow-inner border-2 border-amber-200">
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
                    <div>
                      <h4 className="font-bold text-amber-900 text-sm">Flip the Pancakes</h4>
                      <p className="text-xs text-amber-700 mt-1">Tap any 🥞 to flip it over and reveal the letter underneath. Some letters are already revealed as hints!</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white rounded-xl p-4 shadow-inner border-2 border-amber-200">
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
                    <div>
                      <h4 className="font-bold text-amber-900 text-sm">Trace Adjacent Letters</h4>
                      <p className="text-xs text-amber-700 mt-1">Tap revealed letters in order to spell a word. Each letter must be <strong>adjacent</strong> (next to) the previous one — horizontally, vertically, or diagonally.</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white rounded-xl p-4 shadow-inner border-2 border-amber-200">
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
                    <div>
                      <h4 className="font-bold text-amber-900 text-sm">Check Your Word</h4>
                      <p className="text-xs text-amber-700 mt-1">Tap <strong>✓ Check</strong> to see if your word is on today's menu. Find all 5 words to complete your pancake stack!</p>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-amber-100 rounded-xl p-4 border-2 border-amber-300">
                  <h4 className="font-bold text-amber-900 text-sm mb-2">💡 Tips</h4>
                  <ul className="text-xs text-amber-800 space-y-1">
                    <li>• Words are placed in straight lines (→ ↓ ↘)</li>
                    <li>• Golden-ringed letters are hints — start there!</li>
                    <li>• Tap a selected letter again to deselect it</li>
                    <li>• Try to complete puzzles in the fewest flips!</li>
                  </ul>
                </div>

                {/* Legend */}
                <div className="bg-white rounded-xl p-4 shadow-inner border-2 border-amber-200">
                  <h4 className="font-bold text-amber-900 text-sm mb-2">🎨 Tile Colors</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🥞</span>
                      <span className="text-amber-700">Face-down</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-yellow-100 to-amber-200 border-2 border-amber-500 rounded flex items-center justify-center text-xs font-bold">A</div>
                      <span className="text-amber-700">Hint letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-yellow-200 to-amber-300 border-2 border-amber-400 rounded flex items-center justify-center text-xs font-bold">B</div>
                      <span className="text-amber-700">Flipped</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-200 to-green-300 border-2 border-green-400 rounded flex items-center justify-center text-xs font-bold text-green-800">C</div>
                      <span className="text-amber-700">Found</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => setShowHowToPlay(false)}
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg"
                >
                  Let's Play! 🥞
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PancakesGame;