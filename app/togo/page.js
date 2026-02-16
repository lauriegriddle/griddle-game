"use client";
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// ============================================================
// LETTER GRIDDLE TO GO! 🥡
// A quick-play fill-in-the-blank café order game
// Pick the right magnet(s) to complete the order!
// ============================================================

const ToGoGame = () => {
  // ============================================================
  // PUZZLE DATA - Same orders from Order Up!
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

  // Decoy magnets for wrong answers
  const decoyMagnets = [
    "on the side", "with extra cheese", "to stay", "no rush", "when ready",
    "with a smile", "hold the onions", "extra crispy", "lightly toasted",
    "with honey", "and a coffee", "for here", "make it quick", "surprise me",
    "the usual", "something sweet", "nice and hot", "fresh from", "just like",
    "a little bit of", "on top", "with love", "the special", "right away"
  ];

  // ============================================================
  // STATE
  // ============================================================
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'correct', 'wrong', 'complete'
  const [difficulty, setDifficulty] = useState('easy'); // 'easy' or 'challenge'
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [missingIndices, setMissingIndices] = useState([]);
  const [choices, setChoices] = useState([]);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [ordersThisSession, setOrdersThisSession] = useState(0);

  const [stats, setStats] = useState(() => {
    if (typeof window === 'undefined') return getDefaultStats();
    try {
      const saved = localStorage.getItem('toGoStats');
      return saved ? JSON.parse(saved) : getDefaultStats();
    } catch {
      return getDefaultStats();
    }
  });

  function getDefaultStats() {
    return {
      ordersCompleted: 0,
      currentStreak: 0,
      bestStreak: 0,
      easyCompleted: 0,
      challengeCompleted: 0,
      lastPlayedDate: null
    };
  }

  // ============================================================
  // EFFECTS
  // ============================================================

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('toGoStats', JSON.stringify(stats));
      } catch (e) {
        console.error('Could not save stats', e);
      }
    }
  }, [stats]);

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

  const generatePuzzle = () => {
    // Pick a random puzzle
    const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    setCurrentPuzzle(puzzle);

    // Determine how many blanks based on difficulty
    const numBlanks = difficulty === 'easy' ? 1 : 2;
    const numChoices = difficulty === 'easy' ? 2 : 3;

    // Pick random indices to blank out
    const indices = [];
    const availableIndices = [...Array(puzzle.magnets.length).keys()];
    
    for (let i = 0; i < numBlanks; i++) {
      const randomIdx = Math.floor(Math.random() * availableIndices.length);
      indices.push(availableIndices[randomIdx]);
      availableIndices.splice(randomIdx, 1);
    }
    indices.sort((a, b) => a - b);
    setMissingIndices(indices);

    // Create choices: correct answers + decoys
    const correctAnswers = indices.map(i => puzzle.magnets[i]);
    const availableDecoys = decoyMagnets.filter(d => !puzzle.magnets.includes(d));
    const shuffledDecoys = shuffleArray(availableDecoys);
    const selectedDecoys = shuffledDecoys.slice(0, numChoices - numBlanks);
    
    const allChoices = shuffleArray([...correctAnswers, ...selectedDecoys]);
    setChoices(allChoices);
    setSelectedChoices([]);
    setGameState('playing');
  };

  const handleChoiceClick = (choice) => {
    if (gameState !== 'playing') return;
    
    // Toggle selection
    if (selectedChoices.includes(choice)) {
      setSelectedChoices(prev => prev.filter(c => c !== choice));
    } else {
      const maxSelections = difficulty === 'easy' ? 1 : 2;
      if (selectedChoices.length < maxSelections) {
        setSelectedChoices(prev => [...prev, choice]);
      }
    }
  };

  const checkAnswer = () => {
    const correctAnswers = missingIndices.map(i => currentPuzzle.magnets[i]);
    const isCorrect = correctAnswers.length === selectedChoices.length &&
                      correctAnswers.every(ans => selectedChoices.includes(ans));

    if (isCorrect) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      setOrdersThisSession(prev => prev + 1);
      
      setStats(prev => ({
        ...prev,
        ordersCompleted: prev.ordersCompleted + 1,
        currentStreak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        easyCompleted: difficulty === 'easy' ? prev.easyCompleted + 1 : prev.easyCompleted,
        challengeCompleted: difficulty === 'challenge' ? prev.challengeCompleted + 1 : prev.challengeCompleted,
        lastPlayedDate: new Date().toDateString()
      }));
      
      setGameState('correct');
    } else {
      setCurrentStreak(0);
      setStats(prev => ({
        ...prev,
        currentStreak: 0
      }));
      setGameState('wrong');
    }
  };

  const nextOrder = () => {
    generatePuzzle();
  };

  const backToMenu = () => {
    setGameState('menu');
    setCurrentPuzzle(null);
    setSelectedChoices([]);
  };

  const resetAllProgress = () => {
    setStats(getDefaultStats());
    setCurrentStreak(0);
    setShowResetConfirm(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('toGoStats');
    }
  };

  // ============================================================
  // FOOTER COMPONENT
  // ============================================================
  const Footer = () => (
    <footer className="text-center py-4 text-xs">
      <p className="text-stone-500">© {new Date().getFullYear()} Letter Griddle. All rights reserved.</p>
      <div className="flex justify-center gap-2 mt-1">
        <a href="/privacy" className="text-stone-500 hover:text-stone-400 underline">Privacy Policy</a>
        <span className="text-stone-600">•</span>
        <a href="/terms" className="text-stone-500 hover:text-stone-400 underline">Terms of Service</a>
      </div>
      <p className="mt-1 text-stone-600">lettergriddle.com/togo</p>
    </footer>
  );

  // ============================================================
  // RENDER: MENU
  // ============================================================

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex flex-col">
        {/* Background decorations */}
        <div className="fixed top-4 left-4 text-4xl opacity-20">🥡</div>
        <div className="fixed top-4 right-4 text-4xl opacity-20">☕</div>
        <div className="fixed bottom-4 left-4 text-4xl opacity-20">🥞</div>
        <div className="fixed bottom-4 right-4 text-4xl opacity-20">🍳</div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-4 border-amber-600 shadow-2xl p-8 max-w-md w-full">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">🥡</div>
              <h1 className="text-4xl font-bold text-amber-100 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                To Go!
              </h1>
              <p className="text-amber-400 text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                A Letter Griddle Game
              </p>
              <div className="w-32 h-0.5 bg-amber-600 mx-auto my-4"></div>
              <p className="text-amber-200 text-sm">
                ~ Pick the right magnet to complete the order! ~
              </p>
            </div>

            {/* Current Streak */}
            {stats.currentStreak > 0 && (
              <div className="bg-amber-900/50 rounded-xl p-3 mb-6 text-center border border-amber-600">
                <p className="text-amber-400 text-sm">🔥 Current Streak</p>
                <p className="text-3xl font-bold text-amber-100">{stats.currentStreak}</p>
              </div>
            )}

            {/* Difficulty Selection */}
            <div className="mb-6">
              <p className="text-amber-300 text-sm mb-3 text-center">Choose your challenge:</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setDifficulty('easy')}
                  className={`px-5 py-3 rounded-xl font-semibold transition-all flex-1 ${
                    difficulty === 'easy'
                      ? 'bg-green-500 text-slate-900'
                      : 'bg-slate-700 text-amber-200 hover:bg-slate-600'
                  }`}
                >
                  <div className="text-lg">☕</div>
                  <div className="text-sm">Easy</div>
                  <div className="text-xs opacity-70">1 blank</div>
                </button>
                <button
                  onClick={() => setDifficulty('challenge')}
                  className={`px-5 py-3 rounded-xl font-semibold transition-all flex-1 ${
                    difficulty === 'challenge'
                      ? 'bg-orange-500 text-slate-900'
                      : 'bg-slate-700 text-amber-200 hover:bg-slate-600'
                  }`}
                >
                  <div className="text-lg">🔥</div>
                  <div className="text-sm">Challenge</div>
                  <div className="text-xs opacity-70">2 blanks</div>
                </button>
              </div>
            </div>

            {/* Play Button */}
            <button
              onClick={generatePuzzle}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-900 py-4 rounded-full font-bold text-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              🥡 Grab & Go!
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
              <a href="/" className="text-amber-400 hover:text-amber-200 underline">
                More Games
              </a>
            </div>
          </div>
        </div>

        <Footer />

        {/* Modals */}
        {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
        {showStats && (
          <StatsModal 
            stats={stats} 
            onClose={() => setShowStats(false)} 
            onReset={() => setShowResetConfirm(true)} 
          />
        )}
        {showResetConfirm && (
          <ResetConfirmModal 
            onConfirm={resetAllProgress} 
            onCancel={() => setShowResetConfirm(false)} 
          />
        )}
      </div>
    );
  }

  // ============================================================
  // RENDER: PLAYING
  // ============================================================

  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex flex-col">
        <div className="flex-1 p-4">
          {/* Header */}
          <div className="max-w-2xl mx-auto mb-4">
            <div className="flex justify-between items-center">
              <button
                onClick={backToMenu}
                className="text-amber-700 hover:text-amber-900 text-sm"
              >
                ← Menu
              </button>
              <div className="flex items-center gap-2">
                <span className="text-amber-700 text-sm">🔥 Streak: {currentStreak}</span>
              </div>
            </div>
          </div>

          {/* Game Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-4 border-amber-600 shadow-2xl p-6">
              {/* Title */}
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-amber-100 flex items-center justify-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
                  🥡 To Go!
                </h1>
                <p className="text-amber-400 text-sm mt-1">{currentPuzzle.category}</p>
                <div className={`inline-block px-3 py-1 rounded-full text-xs mt-2 ${
                  difficulty === 'easy' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-orange-500/20 text-orange-400'
                }`}>
                  {difficulty === 'easy' ? '☕ Easy' : '🔥 Challenge'}
                </div>
              </div>

              {/* Order Display */}
              <div className="bg-slate-700/50 rounded-xl p-4 mb-4 border-2 border-amber-600/50">
                <p className="text-amber-400 text-xs mb-3 text-center">📋 Complete the order:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {currentPuzzle.magnets.map((magnet, index) => {
                    const isMissing = missingIndices.includes(index);
                    const filledChoice = isMissing ? selectedChoices[missingIndices.indexOf(index)] : null;
                    
                    return (
                      <div
                        key={index}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                          isMissing
                            ? filledChoice
                              ? 'bg-amber-500 text-slate-900 border-2 border-amber-300'
                              : 'bg-slate-600 text-slate-400 border-2 border-dashed border-amber-500'
                            : 'bg-slate-600 text-amber-200'
                        }`}
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {isMissing ? (filledChoice || '???') : magnet}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Choices */}
              <div className="bg-gradient-to-b from-amber-800 to-amber-900 rounded-xl p-4 mb-4 border-2 border-amber-600">
                <p className="text-amber-300 text-xs mb-3 text-center">
                  🧲 Pick {difficulty === 'easy' ? '1' : '2'}:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {choices.map((choice, index) => {
                    const isSelected = selectedChoices.includes(choice);
                    return (
                      <button
                        key={index}
                        onClick={() => handleChoiceClick(choice)}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                          isSelected
                            ? 'bg-amber-400 text-slate-900 scale-105 shadow-lg'
                            : 'bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-md'
                        }`}
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {choice}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={checkAnswer}
                disabled={selectedChoices.length !== (difficulty === 'easy' ? 1 : 2)}
                className="w-full bg-green-600 hover:bg-green-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 rounded-full font-bold transition-all"
              >
                ✓ That's My Order!
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // ============================================================
  // RENDER: CORRECT
  // ============================================================

  if (gameState === 'correct') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-4 border-green-500 shadow-2xl p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-green-400 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Order Up!
            </h2>
            <p className="text-amber-200 mb-4">"{currentPuzzle.order}"</p>
            
            {/* Streak */}
            <div className="bg-amber-900/50 rounded-xl p-4 mb-4 border border-amber-600">
              <p className="text-amber-400 text-sm">🔥 Streak</p>
              <p className="text-4xl font-bold text-amber-100">{currentStreak}</p>
              {currentStreak === stats.bestStreak && currentStreak > 1 && (
                <p className="text-yellow-400 text-sm mt-1">🏆 Best Streak!</p>
              )}
            </div>

            {/* Fun Fact */}
            <div className="bg-slate-700/50 rounded-xl p-4 mb-6 border border-amber-600/50">
              <p className="text-amber-400 text-xs font-semibold mb-2">🍯 Did You Know?</p>
              <p className="text-amber-200 text-sm italic">{currentPuzzle.funFact}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={nextOrder}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-900 py-3 rounded-full font-bold"
              >
                Next Order →
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="bg-slate-600 hover:bg-slate-500 text-white py-3 rounded-full font-bold"
              >
                Share Results
              </button>
              <button
                onClick={backToMenu}
                className="text-amber-400 hover:text-amber-200 underline text-sm"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>

        <Footer />

        {/* Share Modal */}
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          streak={currentStreak}
          difficulty={difficulty}
          ordersThisSession={ordersThisSession}
        />
      </div>
    );
  }

  // ============================================================
  // RENDER: WRONG
  // ============================================================

  if (gameState === 'wrong') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-4 border-red-500 shadow-2xl p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-3xl font-bold text-red-400 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Wrong Order!
            </h2>
            <p className="text-amber-200 mb-4">The correct order was:</p>
            <p className="text-amber-100 mb-6 italic">"{currentPuzzle.order}"</p>
            
            {/* Streak Lost */}
            {currentStreak === 0 && stats.bestStreak > 0 && (
              <div className="bg-slate-700/50 rounded-xl p-3 mb-4 border border-red-500/50">
                <p className="text-red-400 text-sm">Streak lost! Best: {stats.bestStreak} 🔥</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={nextOrder}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-900 py-3 rounded-full font-bold"
              >
                Try Another →
              </button>
              <button
                onClick={backToMenu}
                className="text-amber-400 hover:text-amber-200 underline text-sm"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return null;
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
          <p>You'll see a café order with one or two blanks (marked with ???)</p>
        </div>
        <div className="flex gap-3">
          <span className="text-2xl">2️⃣</span>
          <p>Pick the correct magnet(s) from the choices to complete the order!</p>
        </div>
        <div className="flex gap-3">
          <span className="text-2xl">3️⃣</span>
          <p>Build your streak by getting orders right in a row!</p>
        </div>
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <p className="italic">Easy mode has 1 blank, Challenge mode has 2!</p>
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

const StatsModal = ({ stats, onClose, onReset }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
    <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-4 border-amber-600 p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
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
          <p className="text-2xl font-bold text-amber-400">{stats.bestStreak}</p>
          <p className="text-amber-200 text-xs">Best Streak 🔥</p>
        </div>
        <div className="bg-slate-700/50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-green-400">{stats.easyCompleted}</p>
          <p className="text-amber-200 text-xs">Easy ☕</p>
        </div>
        <div className="bg-slate-700/50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-orange-400">{stats.challengeCompleted}</p>
          <p className="text-amber-200 text-xs">Challenge 🔥</p>
        </div>
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
      <div className="text-5xl mb-4">🥡</div>
      <h3 className="text-xl font-bold text-red-400 mb-2">Reset All Progress?</h3>
      <p className="text-amber-200 text-sm mb-6">This will clear all stats and streaks. This cannot be undone!</p>
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
          Reset
        </button>
      </div>
    </div>
  </div>
);

const ShareModal = ({ isOpen, onClose, streak, difficulty, ordersThisSession }) => {
  const [copied, setCopied] = useState(false);
  const [canShare] = useState(typeof navigator !== 'undefined' && !!navigator.share);

  const shareText = `🥡 Letter Griddle To Go!
🔥 ${streak} order streak!
${difficulty === 'challenge' ? '💪 Challenge Mode' : '☕ Easy Mode'}
🥞🥞🥞🥞🥞

Play at lettergriddle.com/togo
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
          title: 'Letter Griddle To Go!',
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border-2 border-amber-500/30 relative" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-400 hover:text-amber-200 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🥡</div>
          <h2 className="text-2xl font-bold text-amber-400" style={{fontFamily: 'Georgia, serif'}}>
            Share Your Results!
          </h2>
        </div>
        
        <div className="bg-slate-700/50 rounded-xl p-4 mb-6 border border-amber-500/20">
          <pre className="text-amber-100 text-sm whitespace-pre-wrap font-mono leading-relaxed">
            {shareText}
          </pre>
        </div>
        
        <div className="space-y-3">
          {canShare && (
            <button
              onClick={handleNativeShare}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 py-4 rounded-xl font-bold text-lg shadow-lg transition-all"
            >
              Share
            </button>
          )}
          
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
      </div>
    </div>
  );
};

export default ToGoGame;