"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';

// Letter Griddle Pancakes - A cozy word-finding game

const PancakesGame = () => {
  // 20 Puzzles for beta testers!
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
      words: ["LATTE", "BEANS", "ROAST", "BREW", "CUP"],
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
      words: ["CARAMEL", "FUDGE", "VANILLA", "SUGAR", "CANDY"],
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
    },
    {
      category: "Garden Flowers",
      puzzleNumber: 11,
      words: ["ROSE", "TULIP", "DAISY", "VIOLET", "ORCHID"],
      funFact: {
        title: "Dutch Pannenkoeken",
        text: "Dutch pannenkoeken are large, thin pancakes the size of a dinner plate! They can be sweet or savory, often topped with bacon, cheese, apples, or stroop (syrup). In the Netherlands, pancake houses called 'pannenkoekenhuis' are a beloved family tradition."
      }
    },
    {
      category: "Ocean Life",
      puzzleNumber: 12,
      words: ["WHALE", "DOLPHIN", "SHARK", "CORAL", "TIDE"],
      funFact: {
        title: "Venezuelan Cachapas",
        text: "Cachapas are sweet corn pancakes from Venezuela, made with fresh ground corn instead of flour. They're folded around soft white cheese called 'queso de mano' that melts from the warmth. Street vendors serve them fresh off the griddle, and the natural sweetness of the corn makes them irresistible!"
      }
    },
    {
      category: "Camping Trip",
      puzzleNumber: 13,
      words: ["TENT", "FIRE", "HIKE", "STARS", "MARSH"],
      funFact: {
        title: "Welsh Crempog",
        text: "Welsh crempog are traditional griddle cakes made with buttermilk and sometimes flavored with vinegar, giving them a unique tangy taste. They're stacked in layers with butter between each pancake, creating a beautiful tower. Historically made for Shrove Tuesday celebrations!"
      }
    },
    {
      category: "Music Types",
      puzzleNumber: 14,
      words: ["JAZZ", "ROCK", "BLUES", "FOLK", "COUNTRY"],
      funFact: {
        title: "Chinese Jianbing",
        text: "Jianbing is China's most popular street breakfast - a savory crepe spread with egg, sweet bean sauce, and chili, then topped with crispy wonton crackers and green onions. Over 2.5 billion are sold every year! The skilled vendors cook them on large round griddles in just 2-3 minutes."
      }
    },
    {
      category: "Pet Friends",
      puzzleNumber: 15,
      words: ["PUPPY", "KITTEN", "BUNNY", "HAMSTER", "BIRD"],
      funFact: {
        title: "Moroccan Msemen",
        text: "Msemen are square-shaped Moroccan pancakes with many flaky layers, similar to puff pastry. The dough is stretched thin, folded repeatedly, then cooked on a griddle. They're served for breakfast with honey and butter, or stuffed with spiced meat for a savory snack!"
      }
    },
    {
      category: "Rainy Day",
      puzzleNumber: 16,
      words: ["RAIN", "PUDDLE", "STORM", "CLOUD", "DROP"],
      funFact: {
        title: "Austrian Kaiserschmarrn",
        text: "Kaiserschmarrn means 'Emperor's Mess' - a fluffy shredded pancake created for Emperor Franz Joseph I! The thick batter is cooked, then torn into pieces while still in the pan and caramelized with sugar. Served dusted with powdered sugar alongside apple compote or plum jam."
      }
    },
    {
      category: "Board Games",
      puzzleNumber: 17,
      words: ["CHESS", "CLUE", "RISK", "SORRY", "JENGA"],
      funFact: {
        title: "Hong Kong Egg Waffles",
        text: "Also called 'gai daan jai' (little egg puffs), these iconic street snacks have a distinctive bubble pattern. Each crispy ball has a soft, eggy center. Invented in the 1950s by resourceful vendors using broken eggs, they've become one of Hong Kong's most beloved street foods!"
      }
    },
    {
      category: "Autumn Days",
      puzzleNumber: 18,
      words: ["PUMPKIN", "APPLE", "LEAF", "HARVEST", "CIDER"],
      funFact: {
        title: "Polish Naleśniki",
        text: "Polish naleśniki are thin crepes rolled around sweet or savory fillings. The most popular version is filled with sweetened farmer's cheese (twaróg) and raisins. They're often baked briefly after filling, then topped with sour cream. A beloved comfort food for Polish families!"
      }
    },
    {
      category: "Space Adventure",
      puzzleNumber: 19,
      words: ["ROCKET", "PLANET", "STAR", "MOON", "ORBIT"],
      funFact: {
        title: "Finnish Pannukakku",
        text: "Unlike most pancakes, Finnish pannukakku is baked in the oven! The egg-rich batter puffs up dramatically while baking, then deflates into a custardy texture. Traditionally served straight from the pan with strawberry jam and whipped cream. It's so popular that Thursday is 'pancake day' in Finnish schools!"
      }
    },
    {
      category: "Tropical Paradise",
      puzzleNumber: 20,
      words: ["PALM", "BEACH", "ISLAND", "COCONUT", "WAVE"],
      funFact: {
        title: "Thai Khanom Buang",
        text: "These crispy Thai crepes are an ancient street dessert dating back centuries! Ultra-thin and crispy shells are filled with sweet or savory toppings - the sweet version has meringue and shredded coconut, while savory ones have dried shrimp and cilantro. The batter contains rice flour, creating that signature crunch!"
      }
    },
    {
      category: "Winter Wonderland",
      puzzleNumber: 21,
      words: ["SNOW", "SLED", "MITTEN", "FROST", "COCOA"],
      funFact: {
        title: "Norwegian Svele",
        text: "Svele are thick, fluffy Norwegian pancakes similar to American ones but with a hint of cardamom! They're a beloved ferry snack - practically every Norwegian ferry serves them fresh with butter and sugar. The slightly sweet batter makes them perfect for an afternoon treat with coffee."
      }
    },
    {
      category: "At the Zoo",
      puzzleNumber: 22,
      words: ["LION", "ZEBRA", "GIRAFFE", "MONKEY", "BEAR"],
      funFact: {
        title: "South African Pannekoek",
        text: "South African pannekoek are thin, crepe-like pancakes traditionally spread with cinnamon sugar and rolled up tight. They're a beloved comfort food dating back to Dutch colonial times. Some families add a squeeze of lemon juice for a perfect sweet-tart combination!"
      }
    },
    {
      category: "Birthday Party",
      puzzleNumber: 23,
      words: ["CAKE", "BALLOON", "GIFT", "CANDLE", "PARTY"],
      funFact: {
        title: "Brazilian Tapioca Crepes",
        text: "Brazilian tapioca crepes are naturally gluten-free, made from hydrated tapioca flour! The starch magically binds together on a hot griddle without any eggs or liquid. Filled with cheese, coconut, or chocolate, they're a popular beach snack and breakfast throughout Brazil."
      }
    },
    {
      category: "Movie Night",
      puzzleNumber: 24,
      words: ["POPCORN", "FILM", "SCREEN", "TICKET", "SEAT"],
      funFact: {
        title: "Greek Tiganites",
        text: "Ancient Greeks were eating tiganites over 2,500 years ago, making them one of the oldest known pancakes! The poet Cratinus wrote about them being drizzled with honey. Modern versions are fluffy and often flavored with orange zest or served with Greek yogurt and honey."
      }
    },
    {
      category: "Bakery Fresh",
      puzzleNumber: 25,
      words: ["BREAD", "COOKIE", "PASTRY", "DONUT", "ROLL"],
      funFact: {
        title: "Irish Boxty",
        text: "Boxty is a traditional Irish potato pancake with a unique texture - half mashed potato, half grated raw potato! An old Irish rhyme says 'Boxty on the griddle, boxty on the pan, if you can't make boxty, you'll never get a man.' They're making a comeback in modern Irish restaurants!"
      }
    },
    {
      category: "Sports Day",
      puzzleNumber: 26,
      words: ["SOCCER", "TENNIS", "GOAL", "TEAM", "COACH"],
      funFact: {
        title: "Colombian Arepas",
        text: "While technically a corn cake, arepas are cooked on a griddle just like pancakes and are the national breakfast of Colombia and Venezuela! Made from pre-cooked corn flour, they can be split open like a pita and stuffed with cheese, beans, or shredded meat. Every region has its own style!"
      }
    },
    {
      category: "Art Studio",
      puzzleNumber: 27,
      words: ["PAINT", "BRUSH", "CANVAS", "COLOR", "DRAW"],
      funFact: {
        title: "Japanese Okonomiyaki",
        text: "Okonomiyaki means 'grilled as you like it' - a savory Japanese pancake loaded with cabbage, meat, and toppings! Diners often cook them at their own table griddles. The name reflects unlimited customization possibilities. Osaka and Hiroshima each claim their style is superior!"
      }
    },
    {
      category: "Book Lovers",
      puzzleNumber: 28,
      words: ["NOVEL", "STORY", "CHAPTER", "READ", "PAGE"],
      funFact: {
        title: "Danish Æbleskiver",
        text: "These spherical Danish pancakes are cooked in a special pan with half-sphere molds! The name means 'apple slices' from when they traditionally contained apple pieces. Now typically plain, they're served dusted with powdered sugar and accompanied by raspberry jam for dipping."
      }
    },
    {
      category: "Garden Harvest",
      puzzleNumber: 29,
      words: ["TOMATO", "CARROT", "PEPPER", "ONION", "BEAN"],
      funFact: {
        title: "Vietnamese Bánh Xèo",
        text: "Bánh xèo means 'sizzling cake' - named for the sound the batter makes hitting the hot pan! These crispy yellow crepes get their color from turmeric and are filled with pork, shrimp, and bean sprouts. They're wrapped in lettuce and herbs before being dipped in nuoc cham sauce."
      }
    },
    {
      category: "Fairy Tales",
      puzzleNumber: 30,
      words: ["CASTLE", "DRAGON", "PRINCE", "MAGIC", "CROWN"],
      funFact: {
        title: "Icelandic Pönnukökur",
        text: "Icelandic pancakes are thin, delicate crepes traditionally rolled up with whipped cream and jam or sugar. They're so beloved that Icelanders eat them year-round, not just on special occasions. Many families have recipes passed down for generations, each with their own secret touch!"
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

  // Landing screen state
  const [showLanding, setShowLanding] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

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

  // Confetti emojis for celebration
  const confettiEmojis = ['🥞', '🧈', '🍯', '🍓', '🫐', '☕', '🧇', '🍳', '🥓', '🍌'];

  const GRID_SIZE = 8;

  const directions = [
    { dr: 0, dc: 1, name: 'horizontal' },  // horizontal →
    { dr: 1, dc: 0, name: 'vertical' },    // vertical ↓
    { dr: 1, dc: 1, name: 'diagonal' }     // diagonal ↘
  ];

  // Audio ref
  const audioRef = useRef(null);

  // Generate grid with guaranteed word placement
  const generateGrid = useCallback((words) => {
    // Sort words by length (longest first) for better placement
    const sortedWords = [...words].sort((a, b) => b.length - a.length);
    
    let bestGrid = null;
    let bestPlacedCount = 0;
    
    // Try multiple times to get all words placed
    for (let gridAttempt = 0; gridAttempt < 50; gridAttempt++) {
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

      let placedCount = 0;
      const wordPlacements = [];

      for (const word of sortedWords) {
        let placed = false;
        
        // Shuffle directions for variety
        const shuffledDirs = [...directions].sort(() => Math.random() - 0.5);
        
        // Try each direction
        for (const dir of shuffledDirs) {
          if (placed) break;
          
          // Calculate valid starting positions for this direction
          const maxRow = dir.dr === 0 ? GRID_SIZE : GRID_SIZE - word.length + 1;
          const maxCol = dir.dc === 0 ? GRID_SIZE : GRID_SIZE - word.length + 1;
          
          if (maxRow <= 0 || maxCol <= 0) continue;
          
          // Create list of all valid starting positions
          const positions = [];
          for (let r = 0; r < maxRow; r++) {
            for (let c = 0; c < maxCol; c++) {
              positions.push({ r, c });
            }
          }
          
          // Shuffle positions for randomness
          positions.sort(() => Math.random() - 0.5);
          
          // Try each position
          for (const pos of positions) {
            if (placed) break;
            
            let canPlace = true;
            for (let i = 0; i < word.length; i++) {
              const r = pos.r + (dir.dr * i);
              const c = pos.c + (dir.dc * i);
              const cell = getCell(r, c);
              
              if (cell.letter !== '' && cell.letter !== word[i]) {
                canPlace = false;
                break;
              }
            }

            if (canPlace) {
              // Place the word
              for (let i = 0; i < word.length; i++) {
                const r = pos.r + (dir.dr * i);
                const c = pos.c + (dir.dc * i);
                setCell(r, c, { letter: word[i] });
              }

              // Set first letter as hint
              setCell(pos.r, pos.c, { isHint: true, isFlipped: true });

              // Set middle letter as hint for longer words
              if (word.length >= 5) {
                const midIdx = Math.floor(word.length / 2);
                const midR = pos.r + (dir.dr * midIdx);
                const midC = pos.c + (dir.dc * midIdx);
                setCell(midR, midC, { isHint: true, isFlipped: true });
              }

              wordPlacements.push({ word, pos, dir: dir.name });
              placed = true;
              placedCount++;
            }
          }
        }
      }

      // Keep track of best attempt
      if (placedCount > bestPlacedCount) {
        bestPlacedCount = placedCount;
        bestGrid = grid;
      }
      
      // If all words placed, we're done!
      if (placedCount === sortedWords.length) {
        break;
      }
    }

    // Fill empty cells with random letters
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < bestGrid.length; i++) {
      if (bestGrid[i].letter === '') {
        bestGrid[i].letter = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }

    return bestGrid;
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
  const [showConfetti, setShowConfetti] = useState(false);
  const [ambientMode, setAmbientMode] = useState(false);

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

  // Mark as mounted
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Load saved progress on mount
  useEffect(() => {
    if (hasMounted && typeof window !== 'undefined') {
      try {
        const savedProgress = localStorage.getItem('pancakesProgress');
        if (savedProgress) {
          const progress = JSON.parse(savedProgress);
          if (progress.puzzleIndex !== undefined) {
            setCurrentPuzzleIndex(progress.puzzleIndex);
          }
          if (progress.tiles) {
            setTiles(progress.tiles);
          }
          if (progress.foundWords) {
            setFoundWords(progress.foundWords);
            setEarnedToppings(progress.foundWords.map((_, i) => toppings[i]));
          }
          if (progress.flipCount !== undefined) {
            setFlipCount(progress.flipCount);
          }
          // If there's saved progress, skip landing screen
          if (progress.foundWords && progress.foundWords.length > 0) {
            setShowLanding(false);
          }
        }
      } catch (e) {
        console.error('Could not load progress', e);
      }
    }
  }, [hasMounted]);

  // Save progress whenever game state changes
  useEffect(() => {
    if (hasMounted && typeof window !== 'undefined' && !showCompletion) {
      try {
        const progress = {
          puzzleIndex: currentPuzzleIndex,
          tiles: tiles,
          foundWords: foundWords,
          flipCount: flipCount
        };
        localStorage.setItem('pancakesProgress', JSON.stringify(progress));
      } catch (e) {
        console.error('Could not save progress', e);
      }
    }
  }, [hasMounted, currentPuzzleIndex, tiles, foundWords, flipCount, showCompletion]);

  // Clear progress when puzzle is completed
  const clearProgress = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pancakesProgress');
    }
  };

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
    if (!tile) return;

    // If tile is not flipped yet, flip it (but found tiles are already flipped)
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
        // Show confetti!
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
        
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
        clearProgress(); // Clear saved progress on completion
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
    clearProgress();
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
    clearProgress();
  };

  // Start game from landing
  const startGame = () => {
    setShowLanding(false);
  };

  // Reset stats
  const resetAllStats = () => {
    const emptyStats = { gamesPlayed: 0, gamesWon: 0, totalWordsFound: 0, fewestFlips: null, currentStreak: 0, maxStreak: 0, unlockedAchievements: [] };
    setStats(emptyStats);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pancakesStats');
      localStorage.removeItem('pancakesProgress');
    }
    setShowResetConfirm(false);
    setShowStats(false);
  };

  const currentYear = new Date().getFullYear();
  const unlockedList = stats.unlockedAchievements || [];

  // Landing Screen
  if (showLanding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 relative overflow-hidden flex items-center justify-center p-4">
        {/* Background decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 text-6xl opacity-10">🥞</div>
          <div className="absolute top-20 right-20 text-5xl opacity-10">☕</div>
          <div className="absolute bottom-20 left-20 text-5xl opacity-10">🧇</div>
          <div className="absolute bottom-10 right-10 text-6xl opacity-10">🍳</div>
        </div>

        {/* Chalkboard Menu */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-2xl border-8 border-amber-700 relative">
          {/* Chalk dust effect */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="w-full h-full" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)' }}></div>
          </div>
          
          {/* Menu Header */}
          <div className="text-center mb-8 relative">
            <div className="text-6xl mb-4">🥞</div>
            <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Pancakes
            </h1>
            <p className="text-amber-300 text-lg italic">A Letter Griddle Game</p>
            <div className="mt-4 border-t-2 border-amber-600 pt-4">
              <p className="text-white text-sm">~ Find the words, earn the toppings! ~</p>
            </div>
          </div>

          {/* Today's Special */}
          <div className="bg-amber-900/50 rounded-xl p-4 mb-6 border-2 border-amber-600">
            <p className="text-amber-300 text-xs uppercase tracking-widest mb-1">Today's Special</p>
            <p className="text-white text-2xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
              {puzzleData.category}
            </p>
            <p className="text-amber-400 text-sm mt-1">Puzzle #{puzzleData.puzzleNumber} of {allPuzzles.length}</p>
          </div>

          {/* Menu Items */}
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-amber-100 text-sm">
              <span>🧈 Butter</span>
              <span className="text-amber-500 flex-1 mx-2 border-b border-dotted border-amber-600"></span>
              <span>1st word</span>
            </div>
            <div className="flex justify-between text-amber-100 text-sm">
              <span>🍯 Syrup</span>
              <span className="text-amber-500 flex-1 mx-2 border-b border-dotted border-amber-600"></span>
              <span>2nd word</span>
            </div>
            <div className="flex justify-between text-amber-100 text-sm">
              <span>🍓 Strawberries</span>
              <span className="text-amber-500 flex-1 mx-2 border-b border-dotted border-amber-600"></span>
              <span>3rd word</span>
            </div>
            <div className="flex justify-between text-amber-100 text-sm">
              <span>🫐 Blueberries</span>
              <span className="text-amber-500 flex-1 mx-2 border-b border-dotted border-amber-600"></span>
              <span>4th word</span>
            </div>
            <div className="flex justify-between text-amber-100 text-sm">
              <span>🍯 Honey Drizzle</span>
              <span className="text-amber-500 flex-1 mx-2 border-b border-dotted border-amber-600"></span>
              <span>5th word</span>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-4 rounded-full font-bold text-xl shadow-lg transition-all transform hover:scale-105"
          >
            🥞 Play Pancakes!
          </button>

          {/* Footer links */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => { setShowLanding(false); setShowHowToPlay(true); }}
              className="text-amber-400 hover:text-amber-300 text-sm underline"
            >
              How to Play
            </button>
            <span className="text-amber-600">•</span>
            <a 
              href="https://lettergriddle.com" 
              className="text-amber-400 hover:text-amber-300 text-sm underline"
            >
              Back to Letter Griddle
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
      ambientMode 
        ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900' 
        : 'bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100'
    }`}>
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-10 left-10 text-6xl ${ambientMode ? 'opacity-5' : 'opacity-10'}`}>🥞</div>
        <div className={`absolute top-20 right-20 text-5xl ${ambientMode ? 'opacity-5' : 'opacity-10'}`}>☕</div>
        <div className={`absolute bottom-20 left-20 text-5xl ${ambientMode ? 'opacity-5' : 'opacity-10'}`}>🧇</div>
        <div className={`absolute bottom-10 right-10 text-6xl ${ambientMode ? 'opacity-5' : 'opacity-10'}`}>🍳</div>
        {ambientMode && (
          <>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
          </>
        )}
      </div>

      {/* Themed Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => {
            const emoji = confettiEmojis[i % confettiEmojis.length];
            const left = (i * 7) % 100;
            const delay = (i % 10) * 0.1;
            
            return (
              <div
                key={i}
                className="absolute text-3xl md:text-4xl"
                style={{
                  left: `${left}%`,
                  top: '-50px',
                  animation: `fall 3s ease-in ${delay}s forwards`
                }}
              >
                {emoji}
              </div>
            );
          })}
        </div>
      )}

      {/* Confetti animation styles */}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

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
        <div className="text-center mb-2">
          <a 
            href="https://lettergriddle.com" 
            className={`text-sm font-medium inline-flex items-center gap-1 mb-2 transition-colors ${
              ambientMode 
                ? 'text-amber-400 hover:text-amber-300' 
                : 'text-amber-600 hover:text-amber-800'
            }`}
          >
            ← Back to Letter Griddle
          </a>
          <h1 className={`text-2xl md:text-3xl font-bold mb-1 transition-colors duration-500 ${
            ambientMode ? 'text-amber-200' : 'text-amber-900'
          }`} style={{ fontFamily: 'Georgia, serif' }}>
            🥞 Letter Griddle Pancakes
          </h1>
        </div>

        {/* Control Buttons - NOW AT TOP */}
        <div className="flex justify-center gap-2 mb-3">
          <button
            onClick={() => setShowHowToPlay(true)}
            className={`p-2 rounded-full transition-all shadow-md ${
              ambientMode 
                ? 'bg-slate-700 hover:bg-slate-600 text-amber-300' 
                : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
            }`}
            title="How to Play"
          >
            ❓
          </button>
          <button
            onClick={() => setShowStats(true)}
            className={`p-2 rounded-full transition-all shadow-md ${
              ambientMode 
                ? 'bg-slate-700 hover:bg-slate-600 text-amber-300' 
                : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
            }`}
            title="Stats"
          >
            📊
          </button>
          <button
            onClick={() => setShowAchievements(true)}
            className={`p-2 rounded-full transition-all shadow-md relative ${
              ambientMode 
                ? 'bg-slate-700 hover:bg-slate-600 text-amber-300' 
                : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
            }`}
            title="Achievements"
          >
            🏆
            {unlockedList.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">
                {unlockedList.length}
              </span>
            )}
          </button>
          <button
            onClick={resetGame}
            className={`p-2 rounded-full transition-all shadow-md ${
              ambientMode 
                ? 'bg-slate-700 hover:bg-slate-600 text-amber-300' 
                : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
            }`}
            title="Restart Puzzle"
          >
            🔄
          </button>
          <button
            onClick={nextPuzzle}
            className={`p-2 rounded-full transition-all shadow-md ${
              ambientMode 
                ? 'bg-slate-700 hover:bg-slate-600 text-amber-300' 
                : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
            }`}
            title="Next Puzzle"
          >
            ⏭️
          </button>
          <button
            onClick={() => setShowJukebox(true)}
            className={`p-2 rounded-full transition-all shadow-md ${
              isPlaying 
                ? 'bg-amber-500 text-white' 
                : ambientMode 
                  ? 'bg-slate-700 hover:bg-slate-600 text-amber-300' 
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
            }`}
            title="Jukebox"
          >
            🎵
          </button>
          <button
            onClick={() => setAmbientMode(!ambientMode)}
            className={`p-2 rounded-full transition-all shadow-md ${
              ambientMode 
                ? 'bg-amber-500 text-white' 
                : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
            }`}
            title={ambientMode ? "Day Mode" : "Dinner Hour Mode"}
          >
            {ambientMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Category Chalkboard */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-3 mb-3 shadow-xl border-4 border-amber-700 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-600 px-4 py-1 rounded-full text-white text-xs font-bold shadow-lg">
            TODAY'S MENU
          </div>
          <p className="text-center text-xl md:text-2xl text-white font-bold mt-2" style={{ fontFamily: 'Georgia, serif' }}>
            {puzzleData.category}
          </p>
          <p className="text-center text-amber-300 text-xs mt-1">Puzzle #{puzzleData.puzzleNumber} of {allPuzzles.length}</p>
        </div>

        {/* Toppings Progress */}
        <div className={`backdrop-blur rounded-xl p-3 mb-3 shadow-lg border-2 transition-all duration-500 ${
          ambientMode 
            ? 'bg-slate-800/80 border-slate-600' 
            : 'bg-white/80 border-amber-200'
        }`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-xs font-bold ${ambientMode ? 'text-amber-300' : 'text-amber-800'}`}>Toppings Earned:</span>
            <span className={`text-xs ${ambientMode ? 'text-amber-400' : 'text-amber-600'}`}>{foundWords.length}/5 words • {flipCount} flips</span>
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
                <span className={`text-[10px] md:text-xs mt-1 ${ambientMode ? 'text-amber-400' : 'text-amber-700'}`}>{topping.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Words to Find - MOVED HERE */}
        <div className={`backdrop-blur rounded-xl p-3 mb-3 shadow-lg border-2 transition-all duration-500 ${
          ambientMode 
            ? 'bg-slate-800/80 border-slate-600' 
            : 'bg-white/80 border-amber-200'
        }`}>
          <h3 className={`text-xs font-bold mb-2 text-center ${ambientMode ? 'text-amber-300' : 'text-amber-800'}`}>🔍 Words to Find:</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {puzzleData.words.map((word) => (
              <div
                key={word}
                className={`flex flex-col items-center px-3 py-1.5 rounded-lg transition-all ${
                  foundWords.includes(word)
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
                    : ambientMode 
                      ? 'bg-slate-700 border border-slate-500' 
                      : 'bg-gray-100 border border-gray-200'
                }`}
              >
                <span className={`text-sm font-bold tracking-wider ${
                  foundWords.includes(word) 
                    ? 'text-white' 
                    : ambientMode ? 'text-amber-300' : 'text-amber-800'
                }`} style={{ fontFamily: 'monospace' }}>
                  {foundWords.includes(word) 
                    ? word 
                    : word.split('').map(() => '_').join(' ')
                  }
                </span>
                <span className={`text-[10px] mt-0.5 ${
                  foundWords.includes(word) 
                    ? 'text-amber-100' 
                    : ambientMode ? 'text-slate-400' : 'text-gray-400'
                }`}>
                  {foundWords.includes(word) ? '✓ Found!' : `${word.length} letters`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Word Display */}
        <div className={`rounded-xl p-3 mb-3 shadow-lg transition-all duration-500 ${
          ambientMode 
            ? 'bg-gradient-to-r from-slate-700 to-slate-800' 
            : 'bg-gradient-to-r from-amber-600 to-amber-700'
        }`}>
          <div className={`rounded-lg p-2 min-h-[44px] flex items-center justify-center mb-2 ${
            ambientMode ? 'bg-slate-900/90' : 'bg-white/90'
          }`}>
            {currentWord ? (
              <span className={`text-xl md:text-2xl font-bold tracking-widest ${
                ambientMode ? 'text-amber-300' : 'text-amber-900'
              }`} style={{ fontFamily: 'Georgia, serif' }}>
                {currentWord}
              </span>
            ) : (
              <span className={`italic text-sm ${ambientMode ? 'text-slate-500' : 'text-amber-400'}`}>Tap pancakes to spell a word...</span>
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
                    className={`w-full h-full rounded flex items-center justify-center transition-all duration-200
                      hover:scale-105 cursor-pointer active:scale-95
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
        <div className={`mt-3 text-center text-xs rounded-lg p-2 transition-all duration-500 ${
          ambientMode 
            ? 'text-amber-400 bg-slate-800/50' 
            : 'text-amber-700 bg-amber-50'
        }`}>
          <p>💡 <strong>Tip:</strong> Words are placed in a line (→ ↓ ↘). Follow the revealed letters!</p>
        </div>

        {/* Progress saved indicator */}
        {foundWords.length > 0 && !showCompletion && (
          <div className={`mt-2 text-center text-xs ${ambientMode ? 'text-amber-400' : 'text-amber-600'}`}>
            <p>💾 Progress saved automatically</p>
          </div>
        )}

        {/* Footer */}
        <div className={`mt-6 text-center text-xs ${ambientMode ? 'text-amber-400' : 'text-amber-600'}`}>
          <p>© {currentYear} Letter Griddle. All rights reserved.</p>
          <div className="mt-1 flex justify-center gap-2">
            <a href="/privacy" className={`underline ${ambientMode ? 'hover:text-amber-300' : 'hover:text-amber-800'}`}>Privacy Policy</a>
            <span>•</span>
            <a href="/terms" className={`underline ${ambientMode ? 'hover:text-amber-300' : 'hover:text-amber-800'}`}>Terms of Service</a>
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
                    <li>• Your progress is saved automatically 💾</li>
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