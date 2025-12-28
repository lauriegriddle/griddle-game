"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

// Mini puzzles drawn from existing Letter Griddle 5-letter words
const miniPuzzles = [
  { word: "TAFFY", category: "Candy", hint: "A chewy candy often sold at boardwalks and beaches" },
  { word: "GUMMY", category: "Candy", hint: "Soft, chewy candy often shaped like bears or worms" },
  { word: "APPLE", category: "Autumn", hint: "Round fruit often picked at orchards in fall" },
  { word: "TRAIL", category: "Hiking", hint: "A marked path through nature for walking" },
  { word: "FUDGE", category: "Dessert", hint: "Rich, creamy chocolate confection" },
  { word: "PHONE", category: "What's in the bag?", hint: "Mobile device for calls, texts, and apps" },
  { word: "MANGO", category: "Fruits", hint: "Tropical stone fruit with orange flesh" },
  { word: "TIGER", category: "Animals", hint: "Large striped cat native to Asia" },
  { word: "NURSE", category: "Occupations", hint: "Healthcare worker who cares for patients" },
  { word: "RUGBY", category: "Sports", hint: "Contact team sport played with an oval ball" },
  { word: "TEXAS", category: "U.S. States", hint: "The Lone Star State, second largest by area" },
  { word: "LUNCH", category: "School Days", hint: "Midday meal eaten in the cafeteria" },
  { word: "MAPLE", category: "Trees and Shrubs", hint: "Deciduous tree known for its colorful fall foliage" },
  { word: "ALIEN", category: "Movie Titles", hint: "1979 sci-fi horror classic with Sigourney Weaver" },
  { word: "BEIGE", category: "Colors", hint: "A neutral sandy or tan shade" },
  { word: "SUSHI", category: "International Foods", hint: "Japanese dish of vinegared rice with raw fish" },
  { word: "CHESS", category: "Games", hint: "Ancient strategy game with kings, queens, and checkmate" },
  { word: "PARIS", category: "Cities", hint: "French capital famous for the Eiffel Tower" },
  { word: "SCARF", category: "Cool Weather Clothing", hint: "Fabric worn around the neck for warmth or style" },
];

// Generate decoy letters that aren't in the word
const generateDecoys = (word, count = 6) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const wordLetters = new Set(word.split(''));
  const available = alphabet.split('').filter(l => !wordLetters.has(l));
  const shuffled = available.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Get a random position that's NOT the correct position for the yellow letter
const getYellowPosition = (word, letterIndex) => {
  const positions = [0, 1, 2, 3, 4].filter(p => p !== letterIndex);
  return positions[Math.floor(Math.random() * positions.length)];
};

// Anchor date for puzzle rotation
const ANCHOR_DATE = new Date('2025-12-28T19:15:00-05:00');

// Get puzzle number and index based on date
const getPuzzleInfo = () => {
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  
  const hour = estTime.getHours();
  const minutes = estTime.getMinutes();
  const puzzleDate = new Date(estTime);
  
  if (hour < 19 || (hour === 19 && minutes < 15)) {
    puzzleDate.setDate(puzzleDate.getDate() - 1);
  }
  puzzleDate.setHours(19, 15, 0, 0);
  
  const daysSinceAnchor = Math.floor((puzzleDate.getTime() - ANCHOR_DATE.getTime()) / (1000 * 60 * 60 * 24));
  const puzzleIndex = ((daysSinceAnchor % miniPuzzles.length) + miniPuzzles.length) % miniPuzzles.length;
  const puzzleNumber = Math.max(1, daysSinceAnchor + 1);
  
  return { puzzleIndex, puzzleNumber };
};

const LetterGriddleMini = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const { puzzleIndex, puzzleNumber } = getPuzzleInfo();
  const puzzle = miniPuzzles[puzzleIndex];
  
  const [mode, setMode] = useState('plain');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(['', '', '', '', '']);
  const [gameStatus, setGameStatus] = useState('playing');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  
  const [yellowLetter] = useState(() => {
    const seedIndex = puzzle.word.charCodeAt(0) % 5;
    const letter = puzzle.word[seedIndex];
    const wrongPosition = getYellowPosition(puzzle.word, seedIndex);
    return { letter, correctIndex: seedIndex, shownAt: wrongPosition };
  });

  const [letterPool] = useState(() => {
    const correctLetters = puzzle.word.split('');
    const decoys = generateDecoys(puzzle.word, 6);
    const allLetters = [...correctLetters, ...decoys];
    return allLetters.sort(() => Math.random() - 0.5);
  });

  const [shuffledPool, setShuffledPool] = useState(letterPool);
  const maxGuesses = 5;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleLetterClick = useCallback((letter) => {
    if (gameStatus !== 'playing') return;
    
    setCurrentGuess(prev => {
      const emptyIndex = prev.findIndex(l => l === '');
      if (emptyIndex !== -1) {
        const newGuess = [...prev];
        newGuess[emptyIndex] = letter;
        return newGuess;
      }
      return prev;
    });
    setSelectedSlot(null);
  }, [gameStatus]);

  const handleSlotClick = (index) => {
    if (gameStatus !== 'playing') return;
    
    if (currentGuess[index]) {
      const newGuess = [...currentGuess];
      newGuess[index] = '';
      setCurrentGuess(newGuess);
      setSelectedSlot(null);
    } else {
      setSelectedSlot(selectedSlot === index ? null : index);
    }
  };

  const handleSubmit = useCallback(() => {
    if (currentGuess.some(l => l === '')) return;
    if (gameStatus !== 'playing') return;
    
    const guessWord = currentGuess.join('');
    const newGuess = {
      letters: [...currentGuess],
      result: currentGuess.map((letter, index) => {
        if (letter === puzzle.word[index]) return 'correct';
        if (puzzle.word.includes(letter)) return 'wrong-position';
        return 'not-in-word';
      })
    };
    
    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);
    
    if (guessWord === puzzle.word) {
      setGameStatus('won');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    } else if (newGuesses.length >= maxGuesses) {
      setGameStatus('lost');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
    
    setCurrentGuess(['', '', '', '', '']);
    setSelectedSlot(null);
  }, [currentGuess, gameStatus, guesses, puzzle.word]);

  const handleClear = useCallback(() => {
    setCurrentGuess(['', '', '', '', '']);
    setSelectedSlot(null);
  }, []);

  const handleBackspace = useCallback(() => {
    setCurrentGuess(prev => {
      const newGuess = [...prev];
      for (let i = 4; i >= 0; i--) {
        if (newGuess[i] !== '') {
          newGuess[i] = '';
          break;
        }
      }
      return newGuess;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStatus !== 'playing') return;
      
      const key = e.key.toUpperCase();
      
      if (/^[A-Z]$/.test(key)) {
        if (letterPool.includes(key)) {
          handleLetterClick(key);
        }
      }
      else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      }
      else if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, letterPool, handleLetterClick, handleBackspace, handleSubmit]);

  const handleShuffle = () => {
    setShuffledPool([...shuffledPool].sort(() => Math.random() - 0.5));
  };

  const generateShareText = () => {
    const modeText = mode === 'syrup' ? 'With Syrup 🍯' : 'Plain Stack 🥞';
    const won = gameStatus === 'won';
    
    const grid = guesses.map(guess => 
      guess.result.map(r => {
        if (r === 'correct') return '🟩';
        if (r === 'wrong-position') return '🟨';
        return '⬜';
      }).join('')
    ).join('\n');
    
    const pancakes = won 
      ? '🥞'.repeat(Math.max(1, 6 - guesses.length))
      : '🥞';
    
    const resultText = won 
      ? `Solved in ${guesses.length}/${maxGuesses}! ${pancakes}`
      : `Finished! ${pancakes}`;
    
    return `🍯 Letter Griddle Mini #${puzzleNumber} 🍯
${modeText}

${grid}

${resultText}

Play at lettergriddle.com/mini`;
  };

  const handleShare = () => {
    const shareText = generateShareText();
    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const getTileStyle = (result) => {
    switch (result) {
      case 'correct':
        return 'bg-gradient-to-br from-green-400 to-green-500 border-green-600 text-white';
      case 'wrong-position':
        return 'bg-gradient-to-br from-yellow-400 to-amber-500 border-amber-600 text-amber-900';
      case 'not-in-word':
        return 'bg-gradient-to-br from-gray-300 to-gray-400 border-gray-500 text-gray-700';
      default:
        return 'bg-white border-amber-300';
    }
  };

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 p-4 flex items-center justify-center">
        <div className="text-amber-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 p-4 relative overflow-hidden">
      <div className="fixed top-4 left-4 text-4xl opacity-20">🍯</div>
      <div className="fixed top-4 right-4 text-4xl opacity-20">🥞</div>
      <div className="fixed bottom-4 left-4 text-4xl opacity-20">🧈</div>
      <div className="fixed bottom-4 right-4 text-4xl opacity-20">🍯</div>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => {
            const emojis = ['🥞', '🍯', '🧈', '🍓', '☕', '✨'];
            const emoji = emojis[i % emojis.length];
            const left = (i * 7) % 100;
            
            return (
              <div
                key={i}
                className="absolute text-3xl"
                style={{
                  left: `${left}%`,
                  top: '-50px',
                  animation: `fall 3s ease-in ${(i % 10) * 0.1}s forwards`
                }}
              >
                {emoji}
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

      <div className="max-w-md mx-auto">
        <div className="text-center mb-4">
          <div className="text-5xl mb-2">🍯</div>
          <h1 className="text-3xl font-bold text-amber-800" style={{ fontFamily: 'Georgia, serif' }}>
            Letter Griddle Mini
          </h1>
          <p className="text-amber-600 text-sm mt-1">A bite-sized word puzzle • #{puzzleNumber}</p>
        </div>

        <div className="flex flex-col items-center mb-4">
          <div className="bg-amber-200 rounded-full p-1 flex shadow-inner">
            <button
              onClick={() => setMode('plain')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                mode === 'plain'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md'
                  : 'text-amber-700 hover:text-amber-900'
              }`}
            >
              🥞 Plain Stack
            </button>
            <button
              onClick={() => setMode('syrup')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                mode === 'syrup'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md'
                  : 'text-amber-700 hover:text-amber-900'
              }`}
            >
              🍯 With Syrup
            </button>
          </div>
          <p className="text-amber-500 text-xs mt-1">
            {mode === 'plain' ? 'No hints — pure word deduction!' : 'Theme revealed for a little help'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-4 border-2 border-amber-200">
          
          {mode === 'syrup' && (
            <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl p-3 mb-4 shadow-lg text-center">
              <p className="text-xs uppercase tracking-wider opacity-90">Today's Theme</p>
              <p className="text-lg font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                {puzzle.category}
              </p>
            </div>
          )}

          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 mb-4 border-2 border-amber-200">
            <p className="text-center text-amber-700 text-sm mb-2 font-semibold">
              This letter is in the word, but NOT here:
            </p>
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-lg font-bold ${
                    index === yellowLetter.shownAt
                      ? 'bg-gradient-to-br from-yellow-300 to-amber-400 border-amber-500 text-amber-900'
                      : 'bg-amber-50 border-amber-200 text-transparent'
                  }`}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {index === yellowLetter.shownAt ? yellowLetter.letter : '•'}
                </div>
              ))}
            </div>
          </div>

          {guesses.length > 0 && (
            <div className="space-y-2 mb-4">
              {guesses.map((guess, guessIndex) => (
                <div key={guessIndex} className="flex justify-center gap-2">
                  {guess.letters.map((letter, letterIndex) => (
                    <div
                      key={letterIndex}
                      className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xl font-bold shadow-md transition-all ${getTileStyle(guess.result[letterIndex])}`}
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {gameStatus === 'playing' && (
            <div className="mb-4">
              <p className="text-center text-amber-600 text-xs mb-2">
                Guess {guesses.length + 1} of {maxGuesses}
              </p>
              <div className="flex justify-center gap-2">
                {currentGuess.map((letter, index) => (
                  <div
                    key={index}
                    onClick={() => handleSlotClick(index)}
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xl font-bold cursor-pointer transition-all shadow-sm ${
                      selectedSlot === index
                        ? 'border-amber-500 bg-amber-100 scale-110'
                        : letter
                        ? 'border-amber-400 bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-900'
                        : 'border-amber-300 bg-white hover:border-amber-400 hover:bg-amber-50'
                    }`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          )}

          {gameStatus === 'won' && (
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-400 rounded-xl p-4 mb-4 text-center">
              <p className="text-2xl mb-2">🎉</p>
              <p className="text-amber-800 font-bold text-lg">Delicious!</p>
              <p className="text-amber-700 text-sm">
                You got it in {guesses.length} {guesses.length === 1 ? 'guess' : 'guesses'}!
              </p>
              <p className="text-2xl mt-2">{'🥞'.repeat(Math.max(1, 6 - guesses.length))}</p>
            </div>
          )}

          {gameStatus === 'lost' && (
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-400 rounded-xl p-4 mb-4 text-center">
              <p className="text-2xl mb-2">🥞</p>
              <p className="text-amber-800 font-bold text-lg">Nice effort!</p>
              <p className="text-amber-700 text-sm">
                The word was: <span className="font-bold">{puzzle.word}</span>
              </p>
              <p className="text-amber-600 text-xs mt-2">Every puzzle makes you stronger! 💪</p>
            </div>
          )}

          {mode === 'syrup' && gameStatus === 'playing' && (
            <div className="text-center mb-4">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-amber-600 text-sm hover:text-amber-800 underline"
              >
                {showHint ? 'Hide hint' : 'Need a hint?'}
              </button>
              {showHint && (
                <div className="bg-amber-50 rounded-lg p-3 mt-2 border border-amber-200">
                  <p className="text-amber-800 text-sm">{puzzle.hint}</p>
                </div>
              )}
            </div>
          )}

          {gameStatus === 'playing' && (
            <div className="bg-gradient-to-br from-amber-700 to-amber-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-xl">🍳</span>
                <h3 className="text-amber-200 font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                  Letter Pool
                </h3>
                <span className="text-xl">🍳</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mb-3">
                {shuffledPool.map((letter, index) => (
                  <button
                    key={index}
                    onClick={() => handleLetterClick(letter)}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 border-2 border-amber-500 text-amber-900 font-bold text-lg shadow-md hover:scale-110 hover:shadow-lg transition-all"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {letter}
                  </button>
                ))}
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={handleShuffle}
                  className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold transition-all"
                >
                  🔀 Shuffle
                </button>
                <button
                  onClick={handleBackspace}
                  className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold transition-all"
                >
                  ⌫ Back
                </button>
                <button
                  onClick={handleClear}
                  className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold transition-all"
                >
                  ✕ Clear
                </button>
              </div>
              <p className="text-amber-300 text-xs text-center mt-2">
                💡 You can also type on your keyboard!
              </p>
            </div>
          )}

          {gameStatus === 'playing' && (
            <button
              onClick={handleSubmit}
              disabled={currentGuess.some(l => l === '')}
              className={`w-full mt-4 py-3 rounded-full font-bold text-lg shadow-lg transition-all ${
                currentGuess.some(l => l === '')
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white'
              }`}
            >
              Check Answer
            </button>
          )}

          {gameStatus !== 'playing' && (
            <div className="space-y-3">
              <button
                onClick={() => setShowShareModal(true)}
                className="w-full py-3 rounded-full font-bold text-lg shadow-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white transition-all flex items-center justify-center gap-2"
              >
                Share Results
              </button>
              <div className="text-center">
                <p className="text-amber-600 text-sm mb-2">New puzzle daily at 7:15 PM EST!</p>
                <a 
                  href="https://lettergriddle.com" 
                  className="inline-block bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white px-6 py-2 rounded-full font-bold shadow-lg transition-all"
                >
                  🥞 Play Letter Griddle
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-amber-700 text-sm bg-amber-50 rounded-xl p-3 border border-amber-200">
          <p className="font-semibold mb-1">🍯 How to Play</p>
          <p>The yellow letter IS in the word, but NOT in that position.</p>
          <p>Use the letter pool to guess the 5-letter word!</p>
          <p className="mt-2 text-xs text-amber-600">
            🟩 Correct spot • 🟨 Wrong spot • ⬜ Not in word
          </p>
          <p className="mt-1 text-xs text-amber-500">
            ⌨️ Type letters • Backspace to delete • Enter to submit
          </p>
        </div>

        <div className="text-center mt-4 text-xs text-amber-600">
          <p>Part of The Letter Griddle Games 🥞</p>
          <p className="mt-1">
            <a href="https://lettergriddle.com" className="underline hover:text-amber-800">lettergriddle.com</a>
            {' • '}
            <a href="https://instagram.com/letter_griddle" className="underline hover:text-amber-800">@letter_griddle</a>
          </p>
        </div>

        <div className="text-center py-4 text-xs text-amber-500 mt-4">
          <div>
            © 2025 Letter Griddle. All rights reserved.
            {' | '}
            <a href="/privacy" className="hover:text-amber-600 underline">Privacy Policy</a>
            {' | '}
            <a href="/terms" className="hover:text-amber-600 underline">Terms of Service</a>
          </div>
        </div>
      </div>

      {showShareModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowShareModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-4">
              <p className="text-3xl mb-2">🍯</p>
              <h2 className="text-xl font-bold text-amber-800" style={{ fontFamily: 'Georgia, serif' }}>
                Share Your Results!
              </h2>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre-wrap text-amber-900 border border-amber-200">
              {generateShareText()}
            </div>
            
            <button
              onClick={handleShare}
              className="w-full py-3 rounded-full font-bold text-lg shadow-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white transition-all"
            >
              {shareCopied ? '✓ Copied!' : 'Copy to Clipboard'}
            </button>
            
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-2 py-2 text-amber-600 hover:text-amber-800 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LetterGriddleMini;