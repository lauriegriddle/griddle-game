"use client";
import React, { useState, useEffect } from 'react';

// Achievements
const achievements = [
  { id: 'first_sort', name: 'First Sort', icon: '🧲', description: 'Complete your first puzzle' },
  { id: 'speed_demon', name: 'Speed Demon', icon: '⚡', description: 'Complete a puzzle with 30+ seconds left' },
  { id: 'inventory_pro', name: 'Inventory Pro', icon: '📋', description: 'Complete 5 puzzles' },
  { id: 'master_stocker', name: 'Master Stocker', icon: '🏆', description: 'Complete all 16 puzzles' },
  { id: 'one_minute_wonder', name: 'One Minute Wonder', icon: '⏱️', description: 'Win on 1-minute mode' },
  { id: 'no_mistakes', name: 'Perfect Sort', icon: '✨', description: 'Complete without any wrong placements' },
];

// Puzzle data - 10 puzzles to start
const puzzles = [
  {
    id: 1,
    categories: ["Cereal Bowl", "Pancake Stack"],
    categoryEmojis: ["🥣", "🥞"],
    words: [
      { text: "Flakes", category: 0 },
      { text: "Syrup", category: 1 },
      { text: "Granola", category: 0 },
      { text: "Whipped Cream", category: 1 },
      { text: "Crunchy", category: 0 },
      { text: "Blueberries", category: 1 },
      { text: "Spoon", category: 0 },
      { text: "Spatula", category: 1 },
      { text: "Milk", category: 0 },
      { text: "Maple", category: 1 },
    ],
    emojis: [
      { text: "🥛", category: 0 },
      { text: "🧈", category: 1 },
    ]
  },
  {
    id: 2,
    categories: ["Hot Drinks", "Cold Drinks"],
    categoryEmojis: ["☕", "🧊"],
    words: [
      { text: "Coffee", category: 0 },
      { text: "Lemonade", category: 1 },
      { text: "Hot Tea", category: 0 },
      { text: "Smoothie", category: 1 },
      { text: "Hot Cocoa", category: 0 },
      { text: "Iced Tea", category: 1 },
      { text: "Latte", category: 0 },
      { text: "Milkshake", category: 1 },
      { text: "Espresso", category: 0 },
      { text: "Slushie", category: 1 },
    ],
    emojis: [
      { text: "🫖", category: 0 },
      { text: "🥤", category: 1 },
    ]
  },
  {
    id: 3,
    categories: ["Breakfast", "Lunch"],
    categoryEmojis: ["🌅", "☀️"],
    words: [
      { text: "Eggs", category: 0 },
      { text: "Sandwich", category: 1 },
      { text: "Toast", category: 0 },
      { text: "Salad", category: 1 },
      { text: "Bacon", category: 0 },
      { text: "Burger", category: 1 },
      { text: "Waffles", category: 0 },
      { text: "Wrap", category: 1 },
      { text: "Omelette", category: 0 },
      { text: "Soup", category: 1 },
    ],
    emojis: [
      { text: "🍳", category: 0 },
      { text: "🥗", category: 1 },
    ]
  },
  {
    id: 4,
    categories: ["Fruits", "Vegetables"],
    categoryEmojis: ["🍎", "🥕"],
    words: [
      { text: "Apple", category: 0 },
      { text: "Carrot", category: 1 },
      { text: "Banana", category: 0 },
      { text: "Broccoli", category: 1 },
      { text: "Orange", category: 0 },
      { text: "Spinach", category: 1 },
      { text: "Grape", category: 0 },
      { text: "Pepper", category: 1 },
      { text: "Mango", category: 0 },
      { text: "Celery", category: 1 },
    ],
    emojis: [
      { text: "🍇", category: 0 },
      { text: "🥬", category: 1 },
    ]
  },
  {
    id: 5,
    categories: ["Sweet", "Savory"],
    categoryEmojis: ["🍰", "🧀"],
    words: [
      { text: "Cake", category: 0 },
      { text: "Cheese", category: 1 },
      { text: "Cookie", category: 0 },
      { text: "Pretzel", category: 1 },
      { text: "Candy", category: 0 },
      { text: "Crackers", category: 1 },
      { text: "Brownie", category: 0 },
      { text: "Chips", category: 1 },
      { text: "Donut", category: 0 },
      { text: "Popcorn", category: 1 },
    ],
    emojis: [
      { text: "🍬", category: 0 },
      { text: "🥨", category: 1 },
    ]
  },
  {
    id: 6,
    categories: ["Baked", "Fried"],
    categoryEmojis: ["🥖", "🍟"],
    words: [
      { text: "Bread", category: 0 },
      { text: "Nuggets", category: 1 },
      { text: "Muffin", category: 0 },
      { text: "Wings", category: 1 },
      { text: "Croissant", category: 0 },
      { text: "Tempura", category: 1 },
      { text: "Scone", category: 0 },
      { text: "Fritters", category: 1 },
      { text: "Biscuit", category: 0 },
      { text: "Croquette", category: 1 },
    ],
    emojis: [
      { text: "🥐", category: 0 },
      { text: "🍗", category: 1 },
    ]
  },
  {
    id: 7,
    categories: ["From a Cow", "From a Plant"],
    categoryEmojis: ["🐄", "🌱"],
    words: [
      { text: "Whole Milk", category: 0 },
      { text: "Almond Milk", category: 1 },
      { text: "Yogurt", category: 0 },
      { text: "Oat Milk", category: 1 },
      { text: "Heavy Cream", category: 0 },
      { text: "Coconut Milk", category: 1 },
      { text: "Butter", category: 0 },
      { text: "Soy Milk", category: 1 },
      { text: "Cheddar", category: 0 },
      { text: "Cashew Cream", category: 1 },
    ],
    emojis: [
      { text: "🧈", category: 0 },
      { text: "🥥", category: 1 },
    ]
  },
  {
    id: 8,
    categories: ["Italian", "Mexican"],
    categoryEmojis: ["🇮🇹", "🇲🇽"],
    words: [
      { text: "Pasta", category: 0 },
      { text: "Taco", category: 1 },
      { text: "Pizza", category: 0 },
      { text: "Burrito", category: 1 },
      { text: "Risotto", category: 0 },
      { text: "Salsa", category: 1 },
      { text: "Gelato", category: 0 },
      { text: "Guac", category: 1 },
      { text: "Tiramisu", category: 0 },
      { text: "Churro", category: 1 },
    ],
    emojis: [
      { text: "🍝", category: 0 },
      { text: "🌮", category: 1 },
    ]
  },
  {
    id: 9,
    categories: ["Spicy", "Mild"],
    categoryEmojis: ["🌶️", "🧊"],
    words: [
      { text: "Jalapeño", category: 0 },
      { text: "Vanilla", category: 1 },
      { text: "Wasabi", category: 0 },
      { text: "Honey", category: 1 },
      { text: "Cayenne", category: 0 },
      { text: "Cream", category: 1 },
      { text: "Habanero", category: 0 },
      { text: "Butter", category: 1 },
      { text: "Sriracha", category: 0 },
      { text: "Sugar", category: 1 },
    ],
    emojis: [
      { text: "🔥", category: 0 },
      { text: "🍦", category: 1 },
    ]
  },
  {
    id: 10,
    categories: ["Coffee Shop", "Bakery"],
    categoryEmojis: ["☕", "🥧"],
    words: [
      { text: "Latte", category: 0 },
      { text: "Pie", category: 1 },
      { text: "Mocha", category: 0 },
      { text: "Tart", category: 1 },
      { text: "Brew", category: 0 },
      { text: "Pastry", category: 1 },
      { text: "Espresso", category: 0 },
      { text: "Strudel", category: 1 },
      { text: "Drip", category: 0 },
      { text: "Eclair", category: 1 },
    ],
    emojis: [
      { text: "☕", category: 0 },
      { text: "🧁", category: 1 },
    ]
  },
  // CULINARY CHALLENGE PUZZLES (11-15) - For the food-savvy!
  {
    id: 11,
    categories: ["French Cuisine", "Japanese Cuisine"],
    categoryEmojis: ["🇫🇷", "🇯🇵"],
    difficulty: "challenge",
    words: [
      { text: "Croissant", category: 0 },
      { text: "Ramen", category: 1 },
      { text: "Baguette", category: 0 },
      { text: "Tempura", category: 1 },
      { text: "Soufflé", category: 0 },
      { text: "Miso", category: 1 },
      { text: "Crêpe", category: 0 },
      { text: "Sashimi", category: 1 },
      { text: "Quiche", category: 0 },
      { text: "Edamame", category: 1 },
    ],
    emojis: [
      { text: "🥐", category: 0 },
      { text: "🍱", category: 1 },
    ]
  },
  {
    id: 12,
    categories: ["Herbs", "Spices"],
    categoryEmojis: ["🌿", "🫚"],
    difficulty: "challenge",
    words: [
      { text: "Basil", category: 0 },
      { text: "Cumin", category: 1 },
      { text: "Cilantro", category: 0 },
      { text: "Paprika", category: 1 },
      { text: "Parsley", category: 0 },
      { text: "Turmeric", category: 1 },
      { text: "Oregano", category: 0 },
      { text: "Coriander", category: 1 },
      { text: "Thyme", category: 0 },
      { text: "Cardamom", category: 1 },
    ],
    emojis: [
      { text: "🌱", category: 0 },
      { text: "🌶️", category: 1 },
    ]
  },
  {
    id: 13,
    categories: ["Grilled", "Smoked"],
    categoryEmojis: ["🔥", "💨"],
    difficulty: "challenge",
    words: [
      { text: "Kebab", category: 0 },
      { text: "Brisket", category: 1 },
      { text: "Steak", category: 0 },
      { text: "Salmon Lox", category: 1 },
      { text: "Burger", category: 0 },
      { text: "Bacon", category: 1 },
      { text: "Vegetables", category: 0 },
      { text: "Ribs", category: 1 },
      { text: "Corn", category: 0 },
      { text: "Ham", category: 1 },
    ],
    emojis: [
      { text: "🍖", category: 0 },
      { text: "🥓", category: 1 },
    ]
  },
  {
    id: 14,
    categories: ["Sauté", "Braise"],
    categoryEmojis: ["🍳", "🫕"],
    difficulty: "challenge",
    words: [
      { text: "Stir Fry", category: 0 },
      { text: "Pot Roast", category: 1 },
      { text: "Quick", category: 0 },
      { text: "Low and Slow", category: 1 },
      { text: "High Heat", category: 0 },
      { text: "Tender", category: 1 },
      { text: "Toss", category: 0 },
      { text: "Simmer", category: 1 },
      { text: "Crispy", category: 0 },
      { text: "Fall Apart", category: 1 },
    ],
    emojis: [
      { text: "⚡", category: 0 },
      { text: "🕐", category: 1 },
    ]
  },
  {
    id: 15,
    categories: ["Mother Sauces", "Dessert Sauces"],
    categoryEmojis: ["👨‍🍳", "🍫"],
    difficulty: "challenge",
    words: [
      { text: "Béchamel", category: 0 },
      { text: "Caramel", category: 1 },
      { text: "Hollandaise", category: 0 },
      { text: "Chocolate", category: 1 },
      { text: "Velouté", category: 0 },
      { text: "Butterscotch", category: 1 },
      { text: "Espagnole", category: 0 },
      { text: "Berry Coulis", category: 1 },
      { text: "Tomato", category: 0 },
      { text: "Crème Anglaise", category: 1 },
    ],
    emojis: [
      { text: "🥄", category: 0 },
      { text: "🍨", category: 1 },
    ]
  },
  {
    id: 16,
    categories: ["Fancy Knife Cuts", "Basic Prep"],
    categoryEmojis: ["🔪", "🥄"],
    difficulty: "challenge",
    words: [
      { text: "Julienne", category: 0 },
      { text: "Chopped", category: 1 },
      { text: "Brunoise", category: 0 },
      { text: "Diced", category: 1 },
      { text: "Chiffonade", category: 0 },
      { text: "Sliced", category: 1 },
      { text: "Batonnet", category: 0 },
      { text: "Minced", category: 1 },
      { text: "Tournée", category: 0 },
      { text: "Cubed", category: 1 },
    ],
    emojis: [
      { text: "✨", category: 0 },
      { text: "🔪", category: 1 },
    ]
  },
];

const HasTheGoods = () => {
  // Game state
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'won', 'lost'
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [selectedTime, setSelectedTime] = useState(120); // Default 2 minutes
  const [timeLeft, setTimeLeft] = useState(0);
  const [fridgeItems, setFridgeItems] = useState([]);
  const [category1Items, setCategory1Items] = useState([]);
  const [category2Items, setCategory2Items] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [wrongPlacements, setWrongPlacements] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [mistakesMade, setMistakesMade] = useState(0);
  
  // Stats and modals
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showAchievementToast, setShowAchievementToast] = useState(null);

  // Load stats from localStorage
  const [stats, setStats] = useState(() => {
    if (typeof window === 'undefined') return {
      puzzlesCompleted: 0,
      totalPlays: 0,
      completedPuzzleIds: [],
      fastestTime: null,
      totalTimeSpent: 0,
      perfectSorts: 0,
      unlockedAchievements: []
    };
    try {
      const saved = localStorage.getItem('hasTheGoodsStats');
      return saved ? JSON.parse(saved) : {
        puzzlesCompleted: 0,
        totalPlays: 0,
        completedPuzzleIds: [],
        fastestTime: null,
        totalTimeSpent: 0,
        perfectSorts: 0,
        unlockedAchievements: []
      };
    } catch {
      return {
        puzzlesCompleted: 0,
        totalPlays: 0,
        completedPuzzleIds: [],
        fastestTime: null,
        totalTimeSpent: 0,
        perfectSorts: 0,
        unlockedAchievements: []
      };
    }
  });

  // Save stats to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('hasTheGoodsStats', JSON.stringify(stats));
      } catch (e) {
        console.error('Could not save stats', e);
      }
    }
  }, [stats]);

  // Check and unlock achievements
  const checkAchievements = (newStats, extraData = {}) => {
    const newlyUnlocked = [];
    const currentUnlocked = newStats.unlockedAchievements || [];

    achievements.forEach(achievement => {
      if (currentUnlocked.includes(achievement.id)) return;

      let shouldUnlock = false;
      switch (achievement.id) {
        case 'first_sort':
          shouldUnlock = newStats.puzzlesCompleted >= 1;
          break;
        case 'speed_demon':
          shouldUnlock = extraData.timeLeft >= 30;
          break;
        case 'inventory_pro':
          shouldUnlock = newStats.puzzlesCompleted >= 5;
          break;
        case 'master_stocker':
          shouldUnlock = (newStats.completedPuzzleIds || []).length >= 16;
          break;
        case 'one_minute_wonder':
          shouldUnlock = extraData.wasOneMinuteMode && extraData.won;
          break;
        case 'no_mistakes':
          shouldUnlock = extraData.perfectSort;
          break;
      }

      if (shouldUnlock) {
        newlyUnlocked.push(achievement);
      }
    });

    if (newlyUnlocked.length > 0) {
      setShowAchievementToast(newlyUnlocked[0]);
      setTimeout(() => setShowAchievementToast(null), 3000);
      return [...currentUnlocked, ...newlyUnlocked.map(a => a.id)];
    }
    return currentUnlocked;
  };

  // Shuffle function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Start a new game
  const startGame = (puzzle) => {
    const allItems = [
      ...puzzle.words.map((w, i) => ({ ...w, id: `word-${i}`, type: 'word' })),
      ...puzzle.emojis.map((e, i) => ({ ...e, id: `emoji-${i}`, type: 'emoji' }))
    ];
    
    setCurrentPuzzle(puzzle);
    setFridgeItems(shuffleArray(allItems));
    setCategory1Items([]);
    setCategory2Items([]);
    setSelectedItem(null);
    setWrongPlacements({});
    setMistakesMade(0);
    setTimeLeft(selectedTime);
    setGameState('playing');
    
    // Track total plays
    setStats(prev => ({
      ...prev,
      totalPlays: prev.totalPlays + 1
    }));
  };

  // Timer effect
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    if (timeLeft <= 0) {
      setGameState('lost');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // Check for win condition
  useEffect(() => {
    if (gameState !== 'playing' || !currentPuzzle) return;
    
    const totalItems = currentPuzzle.words.length + currentPuzzle.emojis.length;
    const placedItems = category1Items.length + category2Items.length;
    
    if (placedItems === totalItems) {
      // All items placed correctly - we already validated on placement
      setGameState('won');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
      
      const timeUsed = selectedTime - timeLeft;
      const isPerfect = mistakesMade === 0;
      const isOneMinute = selectedTime === 60;
      
      // Update stats
      setStats(prev => {
        const newCompletedIds = prev.completedPuzzleIds.includes(currentPuzzle.id)
          ? prev.completedPuzzleIds
          : [...prev.completedPuzzleIds, currentPuzzle.id];
        
        const newStats = {
          ...prev,
          puzzlesCompleted: prev.puzzlesCompleted + 1,
          completedPuzzleIds: newCompletedIds,
          fastestTime: prev.fastestTime ? Math.min(prev.fastestTime, timeUsed) : timeUsed,
          totalTimeSpent: prev.totalTimeSpent + timeUsed,
          perfectSorts: isPerfect ? prev.perfectSorts + 1 : prev.perfectSorts,
        };
        
        // Check achievements
        newStats.unlockedAchievements = checkAchievements(newStats, {
          timeLeft: timeLeft,
          wasOneMinuteMode: isOneMinute,
          won: true,
          perfectSort: isPerfect
        });
        
        return newStats;
      });
    }
  }, [category1Items, category2Items, currentPuzzle, gameState, selectedTime, timeLeft, mistakesMade]);

  // Handle item selection from fridge
  const handleFridgeItemClick = (item) => {
    setSelectedItem(item);
  };

  // Handle category click
  const handleCategoryClick = (categoryIndex) => {
    if (!selectedItem) return;
    
    const isCorrect = selectedItem.category === categoryIndex;
    
    if (isCorrect) {
      // Remove from fridge
      setFridgeItems(prev => prev.filter(i => i.id !== selectedItem.id));
      
      // Add to correct category
      if (categoryIndex === 0) {
        setCategory1Items(prev => [...prev, selectedItem]);
      } else {
        setCategory2Items(prev => [...prev, selectedItem]);
      }
      
      setSelectedItem(null);
    } else {
      // Track mistake
      setMistakesMade(prev => prev + 1);
      
      // Show wrong feedback
      setWrongPlacements(prev => ({ ...prev, [selectedItem.id]: true }));
      
      // Remove wrong indicator after animation
      setTimeout(() => {
        setWrongPlacements(prev => {
          const newWrong = { ...prev };
          delete newWrong[selectedItem.id];
          return newWrong;
        });
      }, 600);
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Shuffle fridge items
  const shuffleFridge = () => {
    setFridgeItems(prev => shuffleArray([...prev]));
  };

  // Handle share
  const handleShare = () => {
    if (!currentPuzzle) return;
    
    const timeUsed = selectedTime - timeLeft;
    const mins = Math.floor(timeUsed / 60);
    const secs = timeUsed % 60;
    const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    
    const shareText = `🧲 Letter Griddle Has the Goods!
${currentPuzzle.categoryEmojis[0]} ${currentPuzzle.categories[0]} vs ${currentPuzzle.categoryEmojis[1]} ${currentPuzzle.categories[1]}
✅ Sorted in ${timeStr}!
${mistakesMade === 0 ? '✨ Perfect Sort!' : ''}
Play at lettergriddle.com/goods`;

    if (navigator.share) {
      navigator.share({
        title: 'Letter Griddle Has the Goods!',
        text: shareText,
        url: 'https://lettergriddle.com/goods'
      }).catch(() => {
        // Fallback to clipboard
        copyToClipboard(shareText);
      });
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  // Reset all progress
  const resetAllProgress = () => {
    setStats({
      puzzlesCompleted: 0,
      totalPlays: 0,
      completedPuzzleIds: [],
      fastestTime: null,
      totalTimeSpent: 0,
      perfectSorts: 0,
      unlockedAchievements: []
    });
    setShowResetConfirm(false);
    setShowStatsModal(false);
  };

  // Get results for end screen
  const getResults = () => {
    if (!currentPuzzle) return { correct: [], wrong: [] };
    
    const allItems = [
      ...currentPuzzle.words,
      ...currentPuzzle.emojis
    ];
    
    const placed = [...category1Items, ...category2Items];
    const placedIds = placed.map(p => p.id);
    
    const correct = placed;
    const wrong = allItems.filter((item, i) => {
      const id = i < currentPuzzle.words.length ? `word-${i}` : `emoji-${i - currentPuzzle.words.length}`;
      return !placedIds.includes(id);
    });
    
    return { correct, wrong };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-400 via-amber-500 to-orange-500 p-4 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 60 }).map((_, i) => {
            const emojis = currentPuzzle ? 
              [currentPuzzle.categoryEmojis[0], currentPuzzle.categoryEmojis[1], '🧲', '⭐', '🎉'] :
              ['🧲', '⭐', '🎉', '✨', '🏆'];
            const emoji = emojis[i % emojis.length];
            // Randomize position using a seeded-ish approach for variety
            const left = (i * 17 + (i % 7) * 13 + (i % 3) * 29) % 100;
            const delay = (i * 0.07) % 1.2;
            const duration = 2.5 + (i % 5) * 0.3;
            
            return (
              <div
                key={i}
                className="absolute text-3xl"
                style={{
                  left: `${left}%`,
                  top: '-40px',
                  animation: `confettiFall ${duration}s ease-in ${delay}s forwards`
                }}
              >
                {emoji}
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes confettiFall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px) rotate(-5deg); }
          75% { transform: translateX(8px) rotate(5deg); }
        }
        .shake {
          animation: shake 0.3s ease-in-out 2;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.5); }
          50% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.8); }
        }
        .selected-glow {
          animation: pulse-glow 1s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex justify-center items-center gap-3 mb-2">
            <div className="text-5xl">🧲</div>
            <button
              onClick={() => setShowStatsModal(true)}
              className="bg-slate-700 hover:bg-slate-600 text-amber-300 p-2 rounded-full transition-all shadow-lg"
              title="Your Stats"
            >
              <span className="text-xl">📊</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-white drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
            Letter Griddle
          </h1>
          <h2 className="text-2xl font-bold text-amber-100" style={{ fontFamily: 'Georgia, serif' }}>
            Has the Goods!
          </h2>
          <p className="text-amber-100 text-sm mt-1">Help Laurel take inventory at the cafe!</p>
        </div>

        {/* Achievement Toast */}
        {showAchievementToast && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
              <span className="text-2xl">{showAchievementToast.icon}</span>
              <div>
                <div className="font-bold text-sm">Achievement Unlocked!</div>
                <div className="text-xs">{showAchievementToast.name}</div>
              </div>
            </div>
          </div>
        )}

        {/* Menu State */}
        {gameState === 'menu' && (
          <div className="bg-slate-700 rounded-2xl p-6 shadow-2xl border-4 border-slate-600">
            <h3 className="text-xl font-bold text-amber-300 text-center mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Choose Your Time
            </h3>
            
            <div className="flex justify-center gap-3 mb-6">
              {[60, 120, 180].map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-6 py-3 rounded-full font-bold text-lg transition-all ${
                    selectedTime === time
                      ? 'bg-amber-500 text-white scale-110 shadow-lg'
                      : 'bg-slate-600 text-amber-200 hover:bg-slate-500'
                  }`}
                >
                  {time / 60} min
                </button>
              ))}
            </div>

            <h3 className="text-xl font-bold text-amber-300 text-center mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Select a Puzzle
            </h3>

            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2 mb-4">
              {puzzles.filter(p => !p.difficulty).map((puzzle) => (
                <button
                  key={puzzle.id}
                  onClick={() => startGame(puzzle)}
                  className={`p-4 rounded-xl text-left transition-all hover:scale-105 ${
                    stats.completedPuzzleIds.includes(puzzle.id)
                      ? 'bg-green-700 border-2 border-green-500'
                      : 'bg-slate-600 hover:bg-slate-500 border-2 border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{puzzle.categoryEmojis[0]}</span>
                    <span className="text-amber-200 font-semibold">{puzzle.categories[0]}</span>
                  </div>
                  <div className="text-amber-400 text-sm">vs</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{puzzle.categoryEmojis[1]}</span>
                    <span className="text-amber-200 font-semibold">{puzzle.categories[1]}</span>
                  </div>
                  {stats.completedPuzzleIds.includes(puzzle.id) && (
                    <div className="text-green-400 text-xs mt-1">✓ Completed</div>
                  )}
                </button>
              ))}
            </div>

            {/* Culinary Challenge Section */}
            <div className="border-t-2 border-slate-600 pt-4">
              <h3 className="text-lg font-bold text-amber-300 text-center mb-3 flex items-center justify-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
                👨‍🍳 Culinary Challenge
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">Advanced</span>
              </h3>
              <p className="text-amber-200/70 text-xs text-center mb-3">For the food-savvy! Test your culinary knowledge.</p>
              
              <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2">
                {puzzles.filter(p => p.difficulty === 'challenge').map((puzzle) => (
                  <button
                    key={puzzle.id}
                    onClick={() => startGame(puzzle)}
                    className={`p-3 rounded-xl text-left transition-all hover:scale-105 ${
                      stats.completedPuzzleIds.includes(puzzle.id)
                        ? 'bg-green-700 border-2 border-green-500'
                        : 'bg-slate-700 hover:bg-slate-600 border-2 border-amber-600'
                    }`}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-lg">{puzzle.categoryEmojis[0]}</span>
                      <span className="text-amber-200 font-semibold text-sm">{puzzle.categories[0]}</span>
                    </div>
                    <div className="text-amber-400 text-xs">vs</div>
                    <div className="flex items-center gap-1">
                      <span className="text-lg">{puzzle.categoryEmojis[1]}</span>
                      <span className="text-amber-200 font-semibold text-sm">{puzzle.categories[1]}</span>
                    </div>
                    {stats.completedPuzzleIds.includes(puzzle.id) && (
                      <div className="text-green-400 text-xs mt-1">✓ Completed</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Playing State */}
        {gameState === 'playing' && currentPuzzle && (
          <>
            {/* Timer */}
            <div className="flex justify-center mb-4">
              <div className={`px-6 py-2 rounded-full font-bold text-2xl ${
                timeLeft <= 10 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : timeLeft <= 30 
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-700 text-amber-300'
              }`}>
                ⏱️ {formatTime(timeLeft)}
              </div>
            </div>

            {/* The Fridge */}
            <div className="bg-slate-700 rounded-2xl p-4 shadow-2xl border-4 border-slate-600 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧊</span>
                  <h3 className="text-lg font-bold text-amber-300" style={{ fontFamily: 'Georgia, serif' }}>
                    The Fridge
                  </h3>
                </div>
                <button
                  onClick={shuffleFridge}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold transition-all flex items-center gap-1"
                >
                  ✨ Shuffle
                </button>
              </div>
              
              <p className="text-amber-200 text-xs mb-3 text-center">🧲 Tap a magnet to select it</p>
              
              <div className="bg-slate-800 rounded-xl p-3 min-h-24 flex flex-wrap gap-2 justify-center items-start">
                {fridgeItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleFridgeItemClick(item)}
                    className={`px-3 py-2 rounded-lg font-semibold transition-all text-sm
                      ${wrongPlacements[item.id] 
                        ? 'bg-red-500 text-white shake' 
                        : selectedItem?.id === item.id
                          ? 'bg-amber-400 text-slate-900 scale-110 selected-glow'
                          : 'bg-slate-600 text-amber-100 hover:bg-slate-500 hover:scale-105'
                      }
                      ${item.type === 'emoji' ? 'text-xl' : ''}
                    `}
                    style={{ fontFamily: item.type === 'word' ? 'Georgia, serif' : 'inherit' }}
                  >
                    {item.text}
                  </button>
                ))}
                {fridgeItems.length === 0 && (
                  <p className="text-amber-300 text-sm">All items sorted! 🎉</p>
                )}
              </div>
            </div>

            {/* Category Areas */}
            <div className="grid grid-cols-2 gap-3">
              {/* Category 1 - The Table */}
              <button
                onClick={() => handleCategoryClick(0)}
                className={`bg-slate-700 rounded-2xl p-4 shadow-xl border-4 transition-all ${
                  selectedItem 
                    ? 'border-amber-400 hover:border-amber-300 cursor-pointer hover:scale-102' 
                    : 'border-slate-600'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">{currentPuzzle.categoryEmojis[0]}</span>
                  <h3 className="text-base font-bold text-amber-300" style={{ fontFamily: 'Georgia, serif' }}>
                    {currentPuzzle.categories[0]}
                  </h3>
                </div>
                <p className="text-amber-200 text-xs mb-2">The Table</p>
                
                <div className="bg-slate-800 rounded-xl p-2 min-h-32 flex flex-wrap gap-1 justify-center items-start">
                  {category1Items.map((item) => (
                    <div
                      key={item.id}
                      className={`px-2 py-1 bg-green-600 text-white rounded-lg font-semibold text-xs
                        ${item.type === 'emoji' ? 'text-lg' : ''}`}
                      style={{ fontFamily: item.type === 'word' ? 'Georgia, serif' : 'inherit' }}
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              </button>

              {/* Category 2 - The Counter */}
              <button
                onClick={() => handleCategoryClick(1)}
                className={`bg-slate-700 rounded-2xl p-4 shadow-xl border-4 transition-all ${
                  selectedItem 
                    ? 'border-amber-400 hover:border-amber-300 cursor-pointer hover:scale-102' 
                    : 'border-slate-600'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">{currentPuzzle.categoryEmojis[1]}</span>
                  <h3 className="text-base font-bold text-amber-300" style={{ fontFamily: 'Georgia, serif' }}>
                    {currentPuzzle.categories[1]}
                  </h3>
                </div>
                <p className="text-amber-200 text-xs mb-2">The Counter</p>
                
                <div className="bg-slate-800 rounded-xl p-2 min-h-32 flex flex-wrap gap-1 justify-center items-start">
                  {category2Items.map((item) => (
                    <div
                      key={item.id}
                      className={`px-2 py-1 bg-green-600 text-white rounded-lg font-semibold text-xs
                        ${item.type === 'emoji' ? 'text-lg' : ''}`}
                      style={{ fontFamily: item.type === 'word' ? 'Georgia, serif' : 'inherit' }}
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              </button>
            </div>

            {/* Instructions */}
            <div className="mt-4 text-center text-amber-100 text-sm bg-slate-700/50 rounded-xl p-2">
              <p>🧲 Tap a magnet, then tap the correct category!</p>
            </div>

            {/* Back to Menu */}
            <div className="mt-4 text-center">
              <button
                onClick={() => setGameState('menu')}
                className="text-amber-200 hover:text-white text-sm underline"
              >
                ← Back to Puzzles
              </button>
            </div>
          </>
        )}

        {/* Won State */}
        {gameState === 'won' && currentPuzzle && (
          <div className="bg-slate-700 rounded-2xl p-6 shadow-2xl border-4 border-green-500">
            <div className="text-center">
              <div className="text-6xl mb-3">🎉</div>
              <h3 className="text-2xl font-bold text-green-400 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                You've Got the Goods!
              </h3>
              <p className="text-amber-200 mb-4">
                All items sorted with {formatTime(timeLeft)} to spare!
              </p>
              
              {/* Results */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-800 rounded-xl p-3">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xl">{currentPuzzle.categoryEmojis[0]}</span>
                    <span className="text-amber-300 font-bold">{currentPuzzle.categories[0]}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {category1Items.map((item) => (
                      <span key={item.id} className="text-green-400 text-sm">
                        {item.text}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-800 rounded-xl p-3">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xl">{currentPuzzle.categoryEmojis[1]}</span>
                    <span className="text-amber-300 font-bold">{currentPuzzle.categories[1]}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {category2Items.map((item) => (
                      <span key={item.id} className="text-green-400 text-sm">
                        {item.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2"
                >
                  🎉 Share
                </button>
                <button
                  onClick={() => startGame(currentPuzzle)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-bold transition-all"
                >
                  🔄 Play Again
                </button>
                <button
                  onClick={() => setGameState('menu')}
                  className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-full font-bold transition-all"
                >
                  🧲 More
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lost State */}
        {gameState === 'lost' && currentPuzzle && (
          <div className="bg-slate-700 rounded-2xl p-6 shadow-2xl border-4 border-red-500">
            <div className="text-center">
              <div className="text-6xl mb-3">⏰</div>
              <h3 className="text-2xl font-bold text-red-400 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Time's Up!
              </h3>
              <p className="text-amber-200 mb-4">
                You'll get the goods next time! 🧲
              </p>
              
              {/* Show what was needed */}
              <div className="bg-slate-800 rounded-xl p-4 mb-6">
                <h4 className="text-amber-300 font-bold mb-3">Here's how the items sort:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span>{currentPuzzle.categoryEmojis[0]}</span>
                      <span className="text-amber-200 font-semibold text-sm">{currentPuzzle.categories[0]}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {[...currentPuzzle.words, ...currentPuzzle.emojis]
                        .filter(item => item.category === 0)
                        .map((item, i) => (
                          <span key={i} className="text-amber-100 text-xs bg-slate-700 px-2 py-1 rounded">
                            {item.text}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span>{currentPuzzle.categoryEmojis[1]}</span>
                      <span className="text-amber-200 font-semibold text-sm">{currentPuzzle.categories[1]}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {[...currentPuzzle.words, ...currentPuzzle.emojis]
                        .filter(item => item.category === 1)
                        .map((item, i) => (
                          <span key={i} className="text-amber-100 text-xs bg-slate-700 px-2 py-1 rounded">
                            {item.text}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => startGame(currentPuzzle)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-bold transition-all"
                >
                  💪 Try Again
                </button>
                <button
                  onClick={() => setGameState('menu')}
                  className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-full font-bold transition-all"
                >
                  🧲 Other Puzzles
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-6 text-amber-200/80 text-xs">
          <p>Part of the Letter Griddle Cafe ☕</p>
          <p className="mt-1">
            <a href="/privacy" className="hover:text-white underline">Privacy</a>
            {' | '}
            <a href="/terms" className="hover:text-white underline">Terms</a>
            {' | '}
            <a href="/" className="hover:text-white underline">Back to Cafe</a>
          </p>
          <p className="mt-1 text-amber-300/60">© 2026 Letter Griddle</p>
        </div>
      </div>

      {/* Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => { setShowStatsModal(false); setShowResetConfirm(false); }}>
          <div className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => { setShowStatsModal(false); setShowResetConfirm(false); }}
              className="absolute top-3 right-3 text-slate-400 hover:text-white text-xl"
            >
              ✕
            </button>
            
            <div className="text-center mb-4">
              <span className="text-3xl">📊</span>
              <h3 className="text-xl font-bold text-white mt-2">Your Stats</h3>
            </div>

            {!showResetConfirm ? (
              <>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-700 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-amber-400">{stats.puzzlesCompleted}</div>
                    <div className="text-xs text-slate-300">Sorts Completed</div>
                  </div>
                  <div className="bg-slate-700 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-amber-400">{stats.totalPlays}</div>
                    <div className="text-xs text-slate-300">Total Plays</div>
                  </div>
                  <div className="bg-slate-700 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-amber-400">{stats.completedPuzzleIds.length}/16</div>
                    <div className="text-xs text-slate-300">Unique Puzzles</div>
                  </div>
                  <div className="bg-slate-700 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-amber-400">
                      {Math.round((stats.completedPuzzleIds.length / 16) * 100)}%
                    </div>
                    <div className="text-xs text-slate-300">Progress</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="text-xs text-slate-400 text-center mb-1">Inventory Progress</div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-green-500 transition-all"
                      style={{ width: `${(stats.completedPuzzleIds.length / 16) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Culinary Expert Section */}
                {(() => {
                  const culinaryPuzzleIds = [11, 12, 13, 14, 15, 16];
                  const completedCulinary = stats.completedPuzzleIds.filter(id => culinaryPuzzleIds.includes(id)).length;
                  const isCulinaryExpert = completedCulinary === 6;
                  
                  return (
                    <div className={`mb-4 p-3 rounded-xl border-2 ${
                      isCulinaryExpert 
                        ? 'bg-gradient-to-r from-amber-900/50 to-red-900/50 border-amber-400' 
                        : 'bg-slate-700/50 border-slate-600'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">👨‍🍳</span>
                          <span className="text-sm font-bold text-amber-300">Culinary Challenge</span>
                        </div>
                        <span className={`text-sm font-bold ${completedCulinary === 6 ? 'text-green-400' : 'text-amber-400'}`}>
                          {completedCulinary}/6
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden mb-2">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 to-amber-400 transition-all"
                          style={{ width: `${(completedCulinary / 6) * 100}%` }}
                        />
                      </div>
                      {isCulinaryExpert ? (
                        <div className="text-center">
                          <span className="text-xs bg-gradient-to-r from-amber-400 to-red-400 text-slate-900 px-3 py-1 rounded-full font-bold">
                            🏅 Culinary Expert!
                          </span>
                        </div>
                      ) : (
                        <p className="text-[10px] text-slate-400 text-center">
                          Complete all 6 advanced puzzles to become a Culinary Expert!
                        </p>
                      )}
                    </div>
                  );
                })()}

                {/* Achievements */}
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-amber-300 mb-2 text-center">Achievements</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {achievements.map(achievement => {
                      const isUnlocked = stats.unlockedAchievements.includes(achievement.id);
                      return (
                        <div
                          key={achievement.id}
                          className={`p-2 rounded-lg text-center transition-all ${
                            isUnlocked 
                              ? 'bg-amber-600/30 border border-amber-500' 
                              : 'bg-slate-700/50 opacity-40'
                          }`}
                          title={achievement.description}
                        >
                          <div className="text-xl">{achievement.icon}</div>
                          <div className="text-[10px] text-slate-300 mt-1">{achievement.name}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2"
                >
                  🔄 Reset All Progress
                </button>
                <p className="text-xs text-slate-500 text-center mt-1">Start fresh from the beginning</p>
              </>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-3">⚠️</div>
                <h4 className="text-lg font-bold text-white mb-2">Reset All Progress?</h4>
                <p className="text-sm text-slate-400 mb-4">
                  This will clear all your stats and completed tracks. This cannot be undone!
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={resetAllProgress}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
                  >
                    Reset Everything
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && currentPuzzle && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white text-xl"
            >
              ✕
            </button>
            
            <h3 className="text-xl font-bold text-white text-center mb-4">Share Your Results! 🧲</h3>
            
            <div className="bg-slate-700 rounded-xl p-4 mb-4 font-mono text-sm text-slate-200">
              <div className="whitespace-pre-wrap">
{`🧲 Letter Griddle Has the Goods!
${currentPuzzle.categoryEmojis[0]} ${currentPuzzle.categories[0]} vs ${currentPuzzle.categoryEmojis[1]} ${currentPuzzle.categories[1]}
✅ Sorted in ${formatTime(selectedTime - timeLeft)}!
${mistakesMade === 0 ? '✨ Perfect Sort!' : ''}
Play at lettergriddle.com/goods`}
              </div>
            </div>

            <button
              onClick={handleShare}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-full font-bold transition-all flex items-center justify-center gap-2"
            >
              {shareCopied ? '✓ Copied!' : '📋 Copy to Clipboard'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HasTheGoods;