"use client";
import React, { useState, useEffect } from 'react';
import { X, Plane, RotateCcw, Share2, Shuffle } from 'lucide-react';

const LetterGriddleTravels = () => {
  // Sample puzzles - 10 countries across difficulty tiers
  const allPuzzles = [
    // Tier 1: Popular Destinations
    {
      country: "FRANCE",
      hints: {
        geography: "This Western European country is known as 'The Hexagon' due to its shape, and shares borders with Spain, Italy, and Germany.",
        language: "French is spoken here - the language of love! 'Bonjour' means hello.",
        flag: "Three vertical stripes: blue, white, and red - the famous Tricolore!",
        pancake: "Thin pancakes here are called 'crêpes' - often filled with Nutella or ham and cheese!"
      },
      funFact: "The Eiffel Tower was originally intended to be a temporary structure and was almost torn down in 1909!",
      confettiItems: ["🗼", "🥐", "🧀", "🍷", "🥖"],
      difficulty: 1
    },
    {
      country: "JAPAN",
      hints: {
        geography: "This island nation in East Asia is home to Mount Fuji and sits along the Pacific Ring of Fire.",
        language: "Japanese is spoken here, using three writing systems: hiragana, katakana, and kanji.",
        flag: "A simple but striking design: a red circle (the sun) on a white background.",
        pancake: "Fluffy 'hotcakes' and savory 'okonomiyaki' (cabbage pancakes) are beloved here!"
      },
      funFact: "Japan has more than 6,800 islands, but only about 430 are inhabited!",
      confettiItems: ["🗻", "🍣", "🌸", "🎌", "🏯"],
      difficulty: 1
    },
    {
      country: "MEXICO",
      hints: {
        geography: "This country shares its northern border with the United States and has both Pacific and Gulf coastlines.",
        language: "Spanish is the official language, though over 60 indigenous languages are also spoken.",
        flag: "Green, white, and red vertical stripes with an eagle eating a snake on a cactus!",
        pancake: "Thin sweet 'hotcakes' are popular here, often served with cajeta (goat milk caramel)!"
      },
      funFact: "Mexico City was built on the ruins of the Aztec capital Tenochtitlan, founded on an island in 1325!",
      confettiItems: ["🌮", "🇲🇽", "🌵", "🎸", "🦅"],
      difficulty: 1
    },
    {
      country: "ITALY",
      hints: {
        geography: "This boot-shaped peninsula extends into the Mediterranean Sea and includes Sicily and Sardinia.",
        language: "Italian is spoken here - a Romance language descended from Latin. 'Ciao' means both hello and goodbye!",
        flag: "Three vertical stripes of green, white, and red - inspired by the French flag.",
        pancake: "Thin 'crespelle' are enjoyed here, similar to French crêpes but often filled with ricotta!"
      },
      funFact: "Italy has more UNESCO World Heritage Sites than any other country in the world - over 50!",
      confettiItems: ["🍕", "🍝", "🏛️", "⛪", "🛵"],
      difficulty: 1
    },
    {
      country: "BRAZIL",
      hints: {
        geography: "The largest country in South America, home to the Amazon rainforest and famous beaches like Copacabana.",
        language: "Portuguese is the official language - the only Portuguese-speaking country in the Americas!",
        flag: "A green field with a large yellow diamond and a blue globe with stars and a white banner.",
        pancake: "Tapioca crepes called 'beiju' are popular, made from cassava flour - naturally gluten-free!"
      },
      funFact: "Brazil's Amazon River releases so much fresh water that you can drink from the ocean 100+ miles offshore!",
      confettiItems: ["⚽", "🎭", "🦜", "☕", "🏖️"],
      difficulty: 1
    },
    // Tier 2: Well-Known Countries
    {
      country: "THAILAND",
      hints: {
        geography: "This Southeast Asian kingdom is known as the 'Land of Smiles' and was never colonized by Europeans.",
        language: "Thai is spoken here, using a unique script with 44 consonants and 15 vowel symbols!",
        flag: "Five horizontal stripes: red, white, blue, white, and red - the blue represents the monarchy.",
        pancake: "Crispy 'roti' pancakes are a popular street food, often served with sweetened condensed milk and banana!"
      },
      funFact: "Thailand is the world's largest exporter of rice and is home to the world's largest gold Buddha statue!",
      confettiItems: ["🐘", "🛕", "🍜", "🌺", "👑"],
      difficulty: 2
    },
    {
      country: "GREECE",
      hints: {
        geography: "This Mediterranean country includes thousands of islands and is considered the cradle of Western civilization.",
        language: "Greek is one of the oldest recorded languages, with a history spanning 3,400 years!",
        flag: "Nine horizontal stripes of blue and white with a white cross on blue in the upper left corner.",
        pancake: "Thin 'tiganites' are traditional Greek pancakes, often drizzled with honey and walnuts!"
      },
      funFact: "Greece has more archaeological museums than any other country in the world!",
      confettiItems: ["🏛️", "🫒", "🧿", "⚱️", "🏺"],
      difficulty: 2
    },
    {
      country: "KENYA",
      hints: {
        geography: "This East African nation straddles the equator and is famous for its savannas and wildlife reserves.",
        language: "Swahili and English are official languages. 'Jambo' is a friendly Swahili greeting!",
        flag: "Black, red, and green horizontal stripes with white edges and a Maasai shield and spears.",
        pancake: "Fermented 'chapati' flatbreads and sweet 'mandazi' (like doughnuts) are breakfast favorites!"
      },
      funFact: "Kenya is home to the Great Wildebeest Migration, where over 1.5 million animals cross the Mara River!",
      confettiItems: ["🦁", "🦒", "🐘", "🌅", "☕"],
      difficulty: 2
    },
    // Tier 3: Getting Trickier
    {
      country: "PORTUGAL",
      hints: {
        geography: "This country occupies the western coast of the Iberian Peninsula and was once a major maritime empire.",
        language: "Portuguese originated here before spreading to Brazil and other colonies worldwide.",
        flag: "Vertical bands of green and red with the national coat of arms at the center.",
        pancake: "Sweet 'filhós' are traditional fried dough treats, especially popular at Christmas!"
      },
      funFact: "Portugal is the world's largest cork producer, providing about 50% of the world's cork supply!",
      confettiItems: ["⛵", "🐓", "🍷", "🎸", "🏰"],
      difficulty: 3
    },
    {
      country: "VIETNAM",
      hints: {
        geography: "This S-shaped country in Southeast Asia stretches along the eastern coast of the Indochinese Peninsula.",
        language: "Vietnamese uses Latin script with diacritics, thanks to 17th-century Portuguese missionaries.",
        flag: "A large yellow star centered on a red background - simple but iconic.",
        pancake: "Crispy 'bánh xèo' are sizzling rice flour crepes filled with pork, shrimp, and bean sprouts!"
      },
      funFact: "Vietnam is the world's second-largest coffee exporter, known for unique egg coffee and iced coffee!",
      confettiItems: ["🍜", "🛵", "🌾", "🏮", "⛵"],
      difficulty: 3
    }
  ];

  // Game state
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [revealedHints, setRevealedHints] = useState({
    geography: false,
    language: false,
    flag: false,
    pancake: false
  });
  const [availableLetters, setAvailableLetters] = useState([]);
  const [playerAnswer, setPlayerAnswer] = useState([]);
  const [selectedLetterIndex, setSelectedLetterIndex] = useState(null);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [countriesVisited, setCountriesVisited] = useState([]);
  const [showHintModal, setShowHintModal] = useState(null);
  const [showCountrySelect, setShowCountrySelect] = useState(true);
  const [shareCopied, setShareCopied] = useState(false);

  const currentPuzzle = allPuzzles[currentPuzzleIndex];
  const hintsRevealedCount = Object.values(revealedHints).filter(Boolean).length;

  // Calculate which letters to show based on hints revealed - PROGRESSIVE REVEAL
  const getLettersToReveal = () => {
    const country = currentPuzzle.country;
    const totalLetters = country.length;
    const lettersToShow = Math.ceil((hintsRevealedCount / 4) * totalLetters);
    
    // Create a deterministic shuffle based on the country name
    const indices = [];
    for (let i = 0; i < totalLetters; i++) {
      indices.push(i);
    }
    const shuffled = indices.sort((a, b) => {
      const seedA = country.charCodeAt(a % country.length);
      const seedB = country.charCodeAt(b % country.length);
      return seedA - seedB;
    });
    
    return shuffled.slice(0, lettersToShow).map(i => country[i]);
  };

  // Update available letters when hints are revealed - PROGRESSIVE
  useEffect(() => {
    if (!isComplete) {
      const letters = getLettersToReveal();
      const shuffled = [...letters].sort(() => Math.random() - 0.5);
      setAvailableLetters(shuffled);
    }
  }, [hintsRevealedCount, currentPuzzleIndex]);

  // Initialize player answer slots
  useEffect(() => {
    setPlayerAnswer(Array(currentPuzzle.country.length).fill(''));
  }, [currentPuzzleIndex]);

  // Check for completion
  useEffect(() => {
    if (playerAnswer.join('') === currentPuzzle.country && !isComplete) {
      setIsComplete(true);
      setShowConfetti(true);
      if (!countriesVisited.includes(currentPuzzleIndex)) {
        setCountriesVisited([...countriesVisited, currentPuzzleIndex]);
      }
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [playerAnswer]);

  // Keyboard support - only works for letters that are AVAILABLE in the griddle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isComplete || showCountrySelect || showHintModal) return;
      if (availableLetters.length === 0) return;
      
      const key = e.key.toUpperCase();
      
      const letterIndex = availableLetters.findIndex(l => l === key);
      if (letterIndex !== -1) {
        const emptySlotIndex = playerAnswer.findIndex(l => l === '');
        if (emptySlotIndex !== -1) {
          const newAnswer = [...playerAnswer];
          newAnswer[emptySlotIndex] = key;
          setPlayerAnswer(newAnswer);
          
          const newAvailable = [...availableLetters];
          newAvailable.splice(letterIndex, 1);
          setAvailableLetters(newAvailable);
        }
      }
      
      if (e.key === 'Backspace') {
        for (let i = playerAnswer.length - 1; i >= 0; i--) {
          if (playerAnswer[i] !== '') {
            const letter = playerAnswer[i];
            setAvailableLetters(prev => [...prev, letter]);
            const newAnswer = [...playerAnswer];
            newAnswer[i] = '';
            setPlayerAnswer(newAnswer);
            break;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [availableLetters, playerAnswer, isComplete, showCountrySelect, showHintModal]);

  const revealHint = (hintType) => {
    if (!revealedHints[hintType]) {
      setRevealedHints({ ...revealedHints, [hintType]: true });
    }
    setShowHintModal(hintType);
  };

  const handleLetterClick = (letter, index) => {
    if (selectedSlotIndex !== null) {
      if (playerAnswer[selectedSlotIndex] === '') {
        const newAnswer = [...playerAnswer];
        newAnswer[selectedSlotIndex] = letter;
        setPlayerAnswer(newAnswer);
        
        const newAvailable = [...availableLetters];
        newAvailable.splice(index, 1);
        setAvailableLetters(newAvailable);
      }
      setSelectedSlotIndex(null);
      setSelectedLetterIndex(null);
    } else if (selectedLetterIndex === index) {
      setSelectedLetterIndex(null);
    } else {
      setSelectedLetterIndex(index);
    }
  };

  const handleSlotClick = (slotIndex) => {
    const currentLetter = playerAnswer[slotIndex];
    
    if (currentLetter) {
      setAvailableLetters(prev => [...prev, currentLetter]);
      const newAnswer = [...playerAnswer];
      newAnswer[slotIndex] = '';
      setPlayerAnswer(newAnswer);
      setSelectedLetterIndex(null);
      setSelectedSlotIndex(null);
    } else if (selectedLetterIndex !== null) {
      const newAnswer = [...playerAnswer];
      newAnswer[slotIndex] = availableLetters[selectedLetterIndex];
      setPlayerAnswer(newAnswer);
      
      const newAvailable = [...availableLetters];
      newAvailable.splice(selectedLetterIndex, 1);
      setAvailableLetters(newAvailable);
      
      setSelectedLetterIndex(null);
      setSelectedSlotIndex(null);
    } else if (selectedSlotIndex === slotIndex) {
      setSelectedSlotIndex(null);
    } else {
      setSelectedSlotIndex(slotIndex);
    }
  };

  const shuffleLetters = () => {
    setAvailableLetters(prev => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  const resetPuzzle = () => {
    setRevealedHints({
      geography: false,
      language: false,
      flag: false,
      pancake: false
    });
    setAvailableLetters([]);
    setPlayerAnswer(Array(currentPuzzle.country.length).fill(''));
    setSelectedLetterIndex(null);
    setSelectedSlotIndex(null);
    setIsComplete(false);
  };

  const selectCountry = (index) => {
    setCurrentPuzzleIndex(index);
    setShowCountrySelect(false);
    resetPuzzle();
  };

  const nextCountry = () => {
    if (currentPuzzleIndex < allPuzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
      resetPuzzle();
    } else {
      setShowCountrySelect(true);
    }
  };

  const handleShare = () => {
    const shareText = `🌍 Letter Griddle Travels ✈️
I visited ${currentPuzzle.country}!
${currentPuzzle.confettiItems.join(' ')}
Countries visited: ${countriesVisited.length}/${allPuzzles.length}
Play at www.lettergriddle.com/travels
🥞 Part of the Letter Griddle Family`;

    if (navigator.share) {
      navigator.share({
        title: 'Letter Griddle Travels',
        text: shareText,
      }).catch(() => {
        navigator.clipboard.writeText(shareText);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      });
    } else {
      navigator.clipboard.writeText(shareText);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const characters = {
    geography: { name: "Mr. Lindsay", role: "Geography Buff", emoji: "🗺️" },
    language: { name: "Sarah", role: "Language Expert", emoji: "💬" },
    flag: { name: "Taylor B.", role: "Flag Spotter", emoji: "🎌" },
    pancake: { name: "Laurel", role: "Pancake Expert", emoji: "🥞" }
  };

  const currentYear = new Date().getFullYear();

  if (showCountrySelect) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-100 via-amber-50 to-orange-100 p-4 relative overflow-hidden">
        {/* Home Link */}
        <a 
          href="/"
          className="fixed top-3 left-3 flex items-center gap-1 text-amber-700 hover:text-amber-900 transition-colors text-sm font-medium z-10"
        >
          <span className="text-lg">🥞</span>
          <span className="underline">Letter Griddle</span>
        </a>

        <div className="fixed top-2 right-2 text-3xl opacity-20">✈️</div>
        <div className="fixed bottom-20 left-2 text-3xl opacity-20">🥞</div>
        <div className="fixed bottom-20 right-2 text-3xl opacity-20">☕</div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 mt-8">
            <div className="text-5xl mb-2">🌍 ✈️</div>
            <h1 className="text-3xl font-bold text-amber-950" style={{ fontFamily: 'Georgia, serif' }}>
              Letter Griddle Travels
            </h1>
            <p className="text-amber-900 italic">Evening at the Cafe</p>
          </div>

          <div className="bg-amber-100 rounded-2xl p-4 mb-6 shadow-xl border-2 border-amber-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-800 font-semibold">🛂 Countries Visited</span>
              <span className="text-amber-700 font-bold">{countriesVisited.length}/{allPuzzles.length}</span>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all"
                style={{ width: `${(countriesVisited.length / allPuzzles.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-amber-100 rounded-2xl p-4 shadow-xl border-2 border-amber-300">
            <h2 className="text-xl font-bold text-amber-800 mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>
              Choose Your Destination
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {allPuzzles.map((puzzle, index) => {
                const visited = countriesVisited.includes(index);
                return (
                  <button
                    key={index}
                    onClick={() => selectCountry(index)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      visited 
                        ? 'bg-gradient-to-br from-amber-300 to-yellow-300 border-amber-400 hover:border-amber-500' 
                        : 'bg-amber-50 border-amber-200 hover:border-amber-400 hover:bg-amber-100'
                    }`}
                  >
                    <div className="text-2xl mb-1">{visited ? '✅' : '🌍'}</div>
                    <div className="font-semibold text-amber-900">
                      {visited ? puzzle.country : `${puzzle.country.length} letters`}
                    </div>
                    <div className="text-xs text-amber-700">
                      {['⭐', '⭐⭐', '⭐⭐⭐'][puzzle.difficulty - 1]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-center py-6 text-xs text-amber-950 mt-4">
            <div>
              © {currentYear} Letter Griddle. All rights reserved.
              {' | '}
              <a href="/privacy" className="hover:text-amber-700 underline">Privacy Policy</a>
              {' | '}
              <a href="/terms" className="hover:text-amber-700 underline">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-amber-50 to-orange-100 p-4 relative overflow-hidden">
      {/* Home Link */}
      <a 
        href="/"
        className="fixed top-3 left-3 flex items-center gap-1 text-amber-700 hover:text-amber-900 transition-colors text-sm font-medium z-10"
      >
        <span className="text-lg">🥞</span>
        <span className="underline">Letter Griddle</span>
      </a>

      <div className="fixed top-2 right-2 text-3xl opacity-20">✈️</div>
      <div className="fixed bottom-20 left-2 text-3xl opacity-20">🥞</div>
      <div className="fixed bottom-20 right-2 text-3xl opacity-20">☕</div>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 40 }).map((_, i) => {
            const item = currentPuzzle.confettiItems[i % currentPuzzle.confettiItems.length];
            const left = (i * 7 + 10) % 100;
            return (
              <div
                key={i}
                className="absolute text-3xl"
                style={{
                  left: `${left}%`,
                  top: '-50px',
                  animation: `fall 3s ease-in ${(i % 10) * 0.15}s forwards`
                }}
              >
                {item}
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

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-3xl">🌍</span>
            <h1 className="text-2xl font-bold text-amber-950" style={{ fontFamily: 'Georgia, serif' }}>
              Letter Griddle Travels
            </h1>
            <span className="text-3xl">✈️</span>
          </div>
          <p className="text-amber-900 text-sm italic">Evening at the Cafe</p>
        </div>

        <button
          onClick={() => setShowCountrySelect(true)}
          className="mb-4 text-amber-950 hover:text-amber-800 flex items-center gap-1 text-sm font-medium"
        >
          ← Back to destinations
        </button>

        <div className="bg-amber-100 rounded-2xl p-4 shadow-xl border-2 border-amber-300">
          <div className="text-center mb-4">
            <p className="text-amber-700 text-sm mb-2 font-semibold">
              {hintsRevealedCount === 0 
                ? "Tap a character to reveal hints and letters!" 
                : `${hintsRevealedCount}/4 hints revealed`}
            </p>
            
            <div className="flex justify-center gap-2 mb-2 flex-wrap">
              {playerAnswer.map((letter, index) => (
                <button
                  key={index}
                  onClick={() => handleSlotClick(index)}
                  className={`w-10 h-12 rounded-lg border-2 flex items-center justify-center text-xl font-bold transition-all
                    ${letter 
                      ? 'bg-gradient-to-br from-amber-300 to-yellow-300 border-amber-400 text-amber-900 hover:border-amber-500' 
                      : selectedSlotIndex === index
                        ? 'bg-amber-200 border-amber-500 text-amber-500 scale-105'
                        : 'bg-amber-50 border-amber-300 text-amber-400 hover:border-amber-400'
                    }
                    ${isComplete ? 'bg-gradient-to-br from-green-300 to-emerald-300 border-green-400 text-green-900' : ''}
                  `}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {letter || '_'}
                </button>
              ))}
            </div>

            <p className="text-amber-800 font-semibold mb-4">
              {currentPuzzle.country.length} letters
            </p>
          </div>

          {!isComplete && (
            <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl p-4 mb-4 border-2 border-slate-500">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-xl">🍳</span>
                <p className="text-amber-200 text-sm font-semibold">Letter Griddle</p>
                <span className="text-xl">🍳</span>
              </div>
              
              {availableLetters.length > 0 ? (
                <>
                  <div className="flex justify-center gap-2 flex-wrap mb-3">
                    {availableLetters.map((letter, index) => (
                      <button
                        key={index}
                        onClick={() => handleLetterClick(letter, index)}
                        className={`w-10 h-10 rounded-full text-lg font-bold transition-all shadow-md
                          ${selectedLetterIndex === index
                            ? 'bg-gradient-to-br from-yellow-300 to-amber-400 border-2 border-yellow-500 text-amber-900 scale-110'
                            : 'bg-gradient-to-br from-amber-200 to-yellow-300 border border-amber-400 text-amber-900 hover:scale-105'
                          }`}
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={shuffleLetters}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-5 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg transition-all"
                    >
                      <Shuffle size={16} />
                      Shuffle
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-amber-200 text-center text-sm">
                  Tap a character below to reveal letters!
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-4">
            {Object.entries(characters).map(([hintType, char]) => {
              const isRevealed = revealedHints[hintType];
              return (
                <button
                  key={hintType}
                  onClick={() => revealHint(hintType)}
                  disabled={isComplete}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    isRevealed 
                      ? 'bg-gradient-to-br from-amber-300 to-yellow-300 border-amber-400' 
                      : 'bg-amber-50 border-amber-200 hover:border-amber-400 hover:bg-amber-100'
                  } ${isComplete ? 'opacity-75' : ''}`}
                >
                  <div className="text-3xl mb-1">{char.emoji}</div>
                  <div className="font-bold text-amber-900">{char.name}</div>
                  <div className="text-xs text-amber-700">{char.role}</div>
                  {isRevealed && (
                    <div className="mt-1 text-amber-800 text-sm font-semibold">✓ Revealed</div>
                  )}
                </button>
              );
            })}
          </div>

          {isComplete && (
            <div className="bg-gradient-to-br from-amber-200 to-yellow-200 rounded-xl p-4 border-2 border-amber-400 mb-4">
              <div className="text-center mb-3">
                <div className="text-4xl mb-2">🎉</div>
                <h3 className="text-xl font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
                  Welcome to {currentPuzzle.country}!
                </h3>
              </div>
              
              <div className="bg-amber-100 rounded-lg p-3 mb-3 border border-amber-300">
                <p className="text-amber-800 font-semibold text-sm mb-1">🍯 Did You Know?</p>
                <p className="text-amber-900 text-sm leading-relaxed">{currentPuzzle.funFact}</p>
              </div>

              <div className="flex gap-2 mb-2">
                <button
                  onClick={resetPuzzle}
                  className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-800 py-2 px-4 rounded-full font-semibold text-sm flex items-center justify-center gap-1 border border-amber-300"
                >
                  <RotateCcw size={16} /> Replay
                </button>
                <button
                  onClick={nextCountry}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-2 px-4 rounded-full font-semibold text-sm flex items-center justify-center gap-1"
                >
                  Next <Plane size={16} />
                </button>
              </div>

              <button
                onClick={handleShare}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 px-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <Share2 size={18} />
                {shareCopied ? '✓ Copied!' : 'Share Your Trip!'}
              </button>
            </div>
          )}

          {!isComplete && (
            <div className="text-center text-sm text-amber-800 bg-amber-50 rounded-lg p-2 border border-amber-200">
              <p className="font-semibold">🌍 Tap characters to reveal hints and unlock letters!</p>
              {availableLetters.length > 0 && (
                <p className="text-xs text-amber-600 mt-1">Desktop: Type letters or use backspace</p>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-amber-950 text-sm font-medium">
          🛂 Countries Visited: {countriesVisited.length}/{allPuzzles.length}
        </div>

        <div className="text-center py-6 text-xs text-amber-950 mt-4">
          <div>
            © {currentYear} Letter Griddle. All rights reserved.
            {' | '}
            <a href="/privacy" className="hover:text-amber-700 underline">Privacy Policy</a>
            {' | '}
            <a href="/terms" className="hover:text-amber-700 underline">Terms of Service</a>
          </div>
        </div>
      </div>

      {showHintModal && (
        <div 
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-40 p-4"
          onClick={() => setShowHintModal(null)}
        >
          <div 
            className="bg-amber-100 rounded-2xl p-6 max-w-sm w-full shadow-2xl border-2 border-amber-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowHintModal(null)}
              className="absolute top-4 right-4 text-amber-600 hover:text-amber-800"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">{characters[showHintModal].emoji}</div>
              <h3 className="text-xl font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
                {characters[showHintModal].name}
              </h3>
              <p className="text-amber-700 text-sm">{characters[showHintModal].role}</p>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
              <p className="text-amber-900 leading-relaxed text-base" style={{ fontFamily: 'Georgia, serif' }}>
                "{currentPuzzle.hints[showHintModal]}"
              </p>
            </div>
            
            <button
              onClick={() => setShowHintModal(null)}
              className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 rounded-full font-semibold"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LetterGriddleTravels;