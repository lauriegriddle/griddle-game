"use client";
import React, { useState, useEffect } from 'react';
import { X, Plane, Share2, Shuffle, HelpCircle } from 'lucide-react';

const LetterGriddleTravels = () => {
  // 20 countries across difficulty tiers
  const allPuzzles = [
    // Tier 1: Easy (5-6 letters)
    {
      country: "FRANCE",
      hints: {
        geography: "This Western European country is known as 'The Hexagon' due to its shape, and shares borders with Spain, Italy, and Germany.",
        language: "French is spoken here, the language of love! 'Bonjour' means hello.",
        flag: "Three vertical stripes of blue, white, and red form the famous Tricolore!",
        pancake: "Thin pancakes here are called 'crêpes' and are often filled with Nutella or ham and cheese!"
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
        flag: "A simple but striking design features a red circle (the sun) on a white background.",
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
        flag: "Green, white, and red vertical stripes feature an eagle eating a snake on a cactus!",
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
        language: "Italian is spoken here, a Romance language descended from Latin. 'Ciao' means both hello and goodbye!",
        flag: "Three vertical stripes of green, white, and red were inspired by the French flag.",
        pancake: "Thin 'crespelle' are enjoyed here, similar to French crêpes but often filled with ricotta!"
      },
      funFact: "Italy has more UNESCO World Heritage Sites than any other country in the world with over 50!",
      confettiItems: ["🍕", "🍝", "🏛️", "⛪", "🛵"],
      difficulty: 1
    },
    {
      country: "BRAZIL",
      hints: {
        geography: "The largest country in South America, home to the Amazon rainforest and famous beaches like Copacabana.",
        language: "Portuguese is the official language, making it the only Portuguese-speaking country in the Americas!",
        flag: "A green field with a large yellow diamond and a blue globe with stars and a white banner.",
        pancake: "Tapioca crepes called 'beiju' are popular, made from cassava flour and naturally gluten-free!"
      },
      funFact: "Brazil's Amazon River releases so much fresh water that you can drink from the ocean 100+ miles offshore!",
      confettiItems: ["⚽", "🎭", "🦜", "☕", "🏖️"],
      difficulty: 1
    },
    {
      country: "SPAIN",
      hints: {
        geography: "This country occupies most of the Iberian Peninsula and includes the Canary and Balearic Islands.",
        language: "Spanish (Castilian) is spoken here, along with Catalan, Basque, and Galician in various regions.",
        flag: "Horizontal stripes of red, yellow, and red feature the royal coat of arms.",
        pancake: "Sweet 'filloas' from Galicia are thin crepes often filled with cream or honey!"
      },
      funFact: "Spain has the second-highest number of bars per capita in the world, after Cyprus!",
      confettiItems: ["💃", "🎸", "🏰", "🐂", "🥘"],
      difficulty: 1
    },
    {
      country: "EGYPT",
      hints: {
        geography: "This North African country is home to the Nile River and borders the Mediterranean and Red Seas.",
        language: "Arabic is the official language, and hieroglyphics were used in ancient times.",
        flag: "Three horizontal stripes of red, white, and black feature a golden eagle in the center.",
        pancake: "Thin 'feteer meshaltet' pastries are layered and flaky, often served with honey or cheese!"
      },
      funFact: "The Great Pyramid of Giza was the tallest man-made structure for over 3,800 years!",
      confettiItems: ["🏜️", "🐪", "👁️", "🔺", "⭐"],
      difficulty: 1
    },
    {
      country: "INDIA",
      hints: {
        geography: "This South Asian country is the world's seventh-largest by area and shares borders with Pakistan, China, and Nepal.",
        language: "Hindi and English are official languages, but over 20 languages are recognized!",
        flag: "Orange, white, and green horizontal stripes feature a blue wheel (Ashoka Chakra) in the center.",
        pancake: "Thin 'dosa' are crispy fermented rice crepes, while 'cheela' are savory gram flour pancakes!"
      },
      funFact: "India has the world's largest postal network with over 150,000 post offices!",
      confettiItems: ["🕌", "🐘", "🪷", "🍛", "🎭"],
      difficulty: 1
    },
    {
      country: "CHINA",
      hints: {
        geography: "The world's most populous country spans East Asia and has the third-largest land area.",
        language: "Mandarin Chinese is the most spoken language in the world by number of native speakers.",
        flag: "A red field features one large yellow star and four smaller stars in the corner.",
        pancake: "Savory 'jianbing' are popular breakfast crepes filled with egg, crispy wonton, and hoisin sauce!"
      },
      funFact: "The Great Wall of China is not visible from space with the naked eye, despite the popular myth!",
      confettiItems: ["🐉", "🏯", "🥢", "🧧", "🐼"],
      difficulty: 1
    },
    {
      country: "KENYA",
      hints: {
        geography: "This East African nation straddles the equator and is famous for its savannas and wildlife reserves.",
        language: "Swahili and English are official languages. 'Jambo' is a friendly Swahili greeting!",
        flag: "Black, red, and green horizontal stripes with white edges feature a Maasai shield and spears.",
        pancake: "Fermented 'chapati' flatbreads and sweet 'mandazi' (like doughnuts) are breakfast favorites!"
      },
      funFact: "Kenya is home to the Great Wildebeest Migration, where over 1.5 million animals cross the Mara River!",
      confettiItems: ["🦁", "🦒", "🐘", "🌅", "☕"],
      difficulty: 1
    },
    // Tier 2: Medium (6-8 letters)
    {
      country: "THAILAND",
      hints: {
        geography: "This Southeast Asian kingdom is known as the 'Land of Smiles' and was never colonized by Europeans.",
        language: "Thai is spoken here, using a unique script with 44 consonants and 15 vowel symbols!",
        flag: "Five horizontal stripes of red, white, blue, white, and red represent the nation, religion, and monarchy.",
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
      country: "GERMANY",
      hints: {
        geography: "This Central European country is the EU's largest economy and borders nine different nations.",
        language: "German is spoken here, known for its long compound words like 'Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz'!",
        flag: "Three horizontal stripes of black, red, and gold represent unity and freedom.",
        pancake: "Thin 'pfannkuchen' are enjoyed sweet or savory, while Berliners call their jelly doughnuts by this name too!"
      },
      funFact: "Germany has over 20,000 castles, more than any other country in the world!",
      confettiItems: ["🏰", "🍺", "🥨", "🚗", "⚽"],
      difficulty: 2
    },
    {
      country: "MOROCCO",
      hints: {
        geography: "This North African kingdom has coastlines on both the Atlantic Ocean and Mediterranean Sea.",
        language: "Arabic and Berber are official languages, with French widely spoken as well.",
        flag: "A red field features a green five-pointed star known as Solomon's Seal.",
        pancake: "'Msemen' are square-shaped layered flatbreads, crispy outside and soft inside!"
      },
      funFact: "Morocco is home to the world's oldest university still in operation, founded in 859 AD!",
      confettiItems: ["🐪", "🏜️", "🫖", "🧿", "🌙"],
      difficulty: 2
    },
    {
      country: "VIETNAM",
      hints: {
        geography: "This S-shaped country in Southeast Asia stretches along the eastern coast of the Indochinese Peninsula.",
        language: "Vietnamese uses Latin script with diacritics, thanks to 17th-century Portuguese missionaries.",
        flag: "A large yellow star centered on a red background creates a simple but iconic design.",
        pancake: "Crispy 'bánh xèo' are sizzling rice flour crepes filled with pork, shrimp, and bean sprouts!"
      },
      funFact: "Vietnam is the world's second-largest coffee exporter, known for unique egg coffee and iced coffee!",
      confettiItems: ["🍜", "🛵", "🌾", "🏮", "⛵"],
      difficulty: 2
    },
    {
      country: "IRELAND",
      hints: {
        geography: "This island nation in the North Atlantic is known as the Emerald Isle for its lush green countryside.",
        language: "English and Irish (Gaelic) are official languages. 'Sláinte' means cheers!",
        flag: "Three vertical stripes of green, white, and orange represent different traditions on the island.",
        pancake: "'Boxty' are traditional potato pancakes, made with both mashed and grated potatoes!"
      },
      funFact: "Ireland has no native snakes, and legend credits St. Patrick with driving them out!",
      confettiItems: ["☘️", "🍀", "🏰", "🎻", "🍺"],
      difficulty: 2
    },
    // Tier 3: Hard (8+ letters)
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
      country: "AUSTRALIA",
      hints: {
        geography: "This country is both a continent and a nation, surrounded by the Indian and Pacific Oceans.",
        language: "English is the official language, with unique slang like 'arvo' (afternoon) and 'brekkie' (breakfast)!",
        flag: "A blue field features the Union Jack, the Commonwealth Star, and the Southern Cross constellation.",
        pancake: "'Pikelets' are small fluffy pancakes, while 'lamingtons' are beloved sponge cake squares!"
      },
      funFact: "Australia has over 10,000 beaches, so you could visit a new beach every day for over 27 years!",
      confettiItems: ["🦘", "🐨", "🏄", "🌊", "🪃"],
      difficulty: 3
    },
    {
      country: "ARGENTINA",
      hints: {
        geography: "This South American country stretches from the Andes Mountains to the Atlantic Ocean and includes Patagonia.",
        language: "Spanish is spoken here with a distinctive accent, using 'vos' instead of 'tú' for 'you'.",
        flag: "Light blue and white horizontal stripes feature a golden Sun of May in the center.",
        pancake: "'Panqueques' are thin crepes often filled with dulce de leche and rolled up for dessert!"
      },
      funFact: "Argentina has won the FIFA World Cup three times and produced legends like Maradona and Messi!",
      confettiItems: ["⚽", "🥩", "🍷", "💃", "🏔️"],
      difficulty: 3
    },
    {
      country: "INDONESIA",
      hints: {
        geography: "This Southeast Asian archipelago consists of over 17,000 islands, making it the world's largest island country.",
        language: "Bahasa Indonesia is the official language, unifying over 700 local languages!",
        flag: "Two horizontal bands of red (top) and white form a simple but historic design.",
        pancake: "Sweet 'serabi' are coconut milk rice flour pancakes, often topped with chocolate or banana!"
      },
      funFact: "Indonesia is home to the Komodo dragon, the world's largest living lizard species!",
      confettiItems: ["🐉", "🌴", "🛕", "🌺", "🦜"],
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
  const [countriesVisited, setCountriesVisited] = useState(() => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('griddleTravelsProgress');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
  return [];
});
  const [showHintModal, setShowHintModal] = useState(null);
  const [showCountrySelect, setShowCountrySelect] = useState(true);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showPassport, setShowPassport] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Passport Achievements
  const passportAchievements = [
    { id: 'first_stamp', name: 'First Stamp', icon: '🛂', description: 'Visit your first country', requirement: (visited) => visited.length >= 1 },
    { id: 'frequent_flyer', name: 'Frequent Flyer', icon: '✈️', description: 'Visit 5 countries', requirement: (visited) => visited.length >= 5 },
    { id: 'world_traveler', name: 'World Traveler', icon: '🌍', description: 'Visit 10 countries', requirement: (visited) => visited.length >= 10 },
    { id: 'globetrotter', name: 'Globetrotter', icon: '🧳', description: 'Visit 15 countries', requirement: (visited) => visited.length >= 15 },
    { id: 'world_tour', name: 'World Tour Complete', icon: '🏆', description: 'Visit all 20 countries', requirement: (visited) => visited.length >= 20 },
    { id: 'easy_explorer', name: 'Easy Explorer', icon: '⭐', description: 'Complete all easy countries', requirement: (visited) => {
      const easyCountries = allPuzzles.filter(p => p.difficulty === 1).map((_, i) => i);
      return easyCountries.every(i => visited.includes(i));
    }},
    { id: 'medium_voyager', name: 'Medium Voyager', icon: '⭐⭐', description: 'Complete all medium countries', requirement: (visited) => {
      const mediumIndices = allPuzzles.map((p, i) => p.difficulty === 2 ? i : -1).filter(i => i !== -1);
      return mediumIndices.every(i => visited.includes(i));
    }},
    { id: 'hard_adventurer', name: 'Hard Adventurer', icon: '⭐⭐⭐', description: 'Complete all hard countries', requirement: (visited) => {
      const hardIndices = allPuzzles.map((p, i) => p.difficulty === 3 ? i : -1).filter(i => i !== -1);
      return hardIndices.every(i => visited.includes(i));
    }},
  ];

  const currentPuzzle = allPuzzles[currentPuzzleIndex];
  const hintsRevealedCount = Object.values(revealedHints).filter(Boolean).length;

  const getLettersToReveal = () => {
    const country = currentPuzzle.country;
    const totalLetters = country.length;
    const lettersToShow = Math.ceil((hintsRevealedCount / 4) * totalLetters);
    
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

  useEffect(() => {
    if (!isComplete) {
      const letters = getLettersToReveal();
      const shuffled = [...letters].sort(() => Math.random() - 0.5);
      setAvailableLetters(shuffled);
    }
  }, [hintsRevealedCount, currentPuzzleIndex]);

  useEffect(() => {
    setPlayerAnswer(Array(currentPuzzle.country.length).fill(''));
  }, [currentPuzzleIndex]);

  useEffect(() => {
    if (playerAnswer.join('') === currentPuzzle.country && !isComplete) {
      setIsComplete(true);
      setShowConfetti(true);
      setConfettiKey(prev => prev + 1);
      if (!countriesVisited.includes(currentPuzzleIndex)) {
        setCountriesVisited([...countriesVisited, currentPuzzleIndex]);
      }
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [playerAnswer]);

  useEffect(() => {
if (playerAnswer.join('') === currentPuzzle.country && !isComplete) {
setIsComplete(true);
setShowConfetti(true);
setConfettiKey(prev => prev + 1);
if (!countriesVisited.includes(currentPuzzleIndex)) {
setCountriesVisited([...countriesVisited, currentPuzzleIndex]);
      }
setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [playerAnswer]);

// Save progress to localStorage whenever countriesVisited changes
useEffect(() => {
  if (typeof window !== 'undefined' && countriesVisited.length > 0) {
    try {
      localStorage.setItem('griddleTravelsProgress', JSON.stringify(countriesVisited));
    } catch (e) {
      console.error('Could not save progress', e);
    }
  }
}, [countriesVisited]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showCountrySelect || isComplete || showHintModal || showHowToPlay) return;
      
      const key = e.key.toUpperCase();
      
      if (/^[A-Z]$/.test(key)) {
        const letterIndex = availableLetters.findIndex(l => l === key);
        if (letterIndex !== -1) {
          const emptySlotIndex = playerAnswer.findIndex(slot => slot === '');
          if (emptySlotIndex !== -1) {
            const newAnswer = [...playerAnswer];
            newAnswer[emptySlotIndex] = key;
            setPlayerAnswer(newAnswer);
            
            const newAvailable = [...availableLetters];
            newAvailable.splice(letterIndex, 1);
            setAvailableLetters(newAvailable);
          }
        }
      }
      
      if (e.key === 'Backspace') {
        for (let i = playerAnswer.length - 1; i >= 0; i--) {
          if (playerAnswer[i] !== '') {
            const letter = playerAnswer[i];
            const newAnswer = [...playerAnswer];
            newAnswer[i] = '';
            setPlayerAnswer(newAnswer);
            setAvailableLetters(prev => [...prev, letter]);
            break;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [availableLetters, playerAnswer, showCountrySelect, isComplete, showHintModal, showHowToPlay]);

  // Reset all progress
const resetAllProgress = () => {
  if (window.confirm('Reset all progress? This will clear all visited countries and cannot be undone!')) {
    setCountriesVisited([]);
    localStorage.removeItem('griddleTravelsProgress');
    setShowPassport(false);
  }
};

const confirmReset = () => {
  setCountriesVisited([]);
  localStorage.removeItem('griddleTravelsProgress');
  setShowResetConfirm(false);
  setShowPassport(false);
};

const cancelReset = () => {
  setShowResetConfirm(false);
};

  const revealHint = (hintType) => {
    if (!revealedHints[hintType]) {
      setRevealedHints(prev => ({ ...prev, [hintType]: true }));
      setShowHintModal(hintType);
    } else {
      setShowHintModal(hintType);
    }
  };

  const handleLetterTap = (index) => {
    if (selectedSlotIndex !== null) {
      const letter = availableLetters[index];
      const newAnswer = [...playerAnswer];
      newAnswer[selectedSlotIndex] = letter;
      setPlayerAnswer(newAnswer);
      
      const newAvailable = [...availableLetters];
      newAvailable.splice(index, 1);
      setAvailableLetters(newAvailable);
      
      setSelectedSlotIndex(null);
      setSelectedLetterIndex(null);
    } else if (selectedLetterIndex === index) {
      setSelectedLetterIndex(null);
    } else {
      setSelectedLetterIndex(index);
    }
  };

  const handleSlotTap = (index) => {
    if (playerAnswer[index] !== '') {
      const letter = playerAnswer[index];
      setAvailableLetters(prev => [...prev, letter]);
      const newAnswer = [...playerAnswer];
      newAnswer[index] = '';
      setPlayerAnswer(newAnswer);
      setSelectedLetterIndex(null);
      setSelectedSlotIndex(null);
    } else if (selectedLetterIndex !== null) {
      const letter = availableLetters[selectedLetterIndex];
      const newAnswer = [...playerAnswer];
      newAnswer[index] = letter;
      setPlayerAnswer(newAnswer);
      
      const newAvailable = [...availableLetters];
      newAvailable.splice(selectedLetterIndex, 1);
      setAvailableLetters(newAvailable);
      
      setSelectedLetterIndex(null);
    } else if (selectedSlotIndex === index) {
      setSelectedSlotIndex(null);
    } else {
      setSelectedSlotIndex(index);
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
    setRevealedHints({ geography: false, language: false, flag: false, pancake: false });
    setAvailableLetters([]);
    setPlayerAnswer(Array(currentPuzzle.country.length).fill(''));
    setSelectedLetterIndex(null);
    setSelectedSlotIndex(null);
    setIsComplete(false);
    setShowConfetti(false);
  };

  const selectCountry = (index) => {
    setCurrentPuzzleIndex(index);
    resetPuzzle();
    setShowCountrySelect(false);
  };

  const nextCountry = () => {
    if (currentPuzzleIndex < allPuzzles.length - 1) {
      selectCountry(currentPuzzleIndex + 1);
    } else {
      setShowCountrySelect(true);
    }
  };

  const handleShare = async () => {
    const shareText = `🌍 Letter Griddle Travels ✈️
I visited ${currentPuzzle.country}!
${currentPuzzle.confettiItems.join(' ')}
Countries visited: ${countriesVisited.length}/${allPuzzles.length}
Play at www.lettergriddle.com/travels
🥞 Part of the Letter Griddle Family`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch (err) {
        if (err.name !== 'AbortError') {
          await navigator.clipboard.writeText(shareText);
          setShareCopied(true);
          setTimeout(() => setShareCopied(false), 2000);
        }
      }
    } else {
      await navigator.clipboard.writeText(shareText);
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

  const getDifficultyStars = (level) => {
    const stars = ['★', '★★', '★★★'][level - 1];
    return (
      <span className="text-sm font-bold text-amber-500 drop-shadow-sm">
        {stars}
      </span>
    );
  };

  const currentYear = new Date().getFullYear();

  // How to Play Modal
  const HowToPlayModal = () => (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowHowToPlay(false)}
    >
      <div 
        className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-6 max-w-md w-full shadow-2xl border-2 border-amber-400 max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowHowToPlay(false)}
          className="absolute top-3 right-3 text-amber-800 hover:text-amber-950 bg-amber-200 hover:bg-amber-300 rounded-full p-1"
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-5">
          <div className="text-4xl mb-2">🌍 ✈️ 🥞</div>
          <h3 className="text-2xl font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
            How to Play
          </h3>
          <p className="text-amber-700 text-sm italic">Pack your bags for word puzzles!</p>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white/80 rounded-xl p-4 border border-amber-300">
            <h4 className="font-bold text-amber-900 mb-1">Your Mission</h4>
            <p className="text-amber-800 text-sm">Guess the mystery country by gathering clues from the Trivia Crew!</p>
          </div>

          <div className="bg-white/80 rounded-xl p-4 border border-amber-300">
            <h4 className="font-bold text-amber-900 mb-1">Meet the Crew</h4>
            <p className="text-amber-800 text-sm mb-2">Tap each character to reveal their hint AND unlock more letters:</p>
            <div className="grid grid-cols-2 gap-1 text-xs text-amber-800">
              <div className="flex items-center gap-1">🗺️ Mr. Lindsay (Geography)</div>
              <div className="flex items-center gap-1">💬 Sarah (Language)</div>
              <div className="flex items-center gap-1">🎌 Taylor B. (Flags)</div>
              <div className="flex items-center gap-1">🥞 Laurel (Pancakes!)</div>
            </div>
          </div>

          <div className="bg-white/80 rounded-xl p-4 border border-amber-300">
            <h4 className="font-bold text-amber-900 mb-1">Spell It Out</h4>
            <p className="text-amber-800 text-sm">Each hint reveals ~25% of the letters. Tap letters from the griddle, then tap a slot to place them. You can also type on your keyboard!</p>
          </div>

          <div className="bg-white/80 rounded-xl p-4 border border-amber-300">
            <h4 className="font-bold text-amber-900 mb-1">Difficulty Levels</h4>
            <p className="text-amber-800 text-sm">
              ★ Easy (5-6 letters)<br/>
              ★★ Medium (6-8 letters)<br/>
              ★★★ Hard (8+ letters)
            </p>
          </div>

          <div className="bg-amber-200/80 rounded-xl p-4 border border-amber-400 text-center">
            <p className="text-amber-900 font-semibold">🎉 Visit all {allPuzzles.length} countries to complete your world tour!</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowHowToPlay(false)}
          className="w-full mt-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-full font-semibold shadow-lg"
        >
          Let's Travel! ✈️
        </button>
      </div>
    </div>
  );

  // Passport Modal
  const PassportModal = () => (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowPassport(false)}
    >
      <div 
        className="bg-gradient-to-br from-amber-900 to-yellow-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border-4 border-amber-700 max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowPassport(false)}
          className="absolute top-3 right-3 text-amber-200 hover:text-white bg-amber-800 hover:bg-amber-700 rounded-full p-1"
        >
          <X size={20} />
        </button>
        
        {/* Passport Header */}
        <div className="text-center mb-5">
          <div className="text-5xl mb-2">🛂</div>
          <h3 className="text-2xl font-bold text-amber-100" style={{ fontFamily: 'Georgia, serif' }}>
            Travel Passport
          </h3>
          <p className="text-amber-300 text-sm italic">Your journey around the world</p>
        </div>
        
        {/* Stats Section */}
        <div className="bg-amber-50 rounded-xl p-4 mb-4 border-2 border-amber-400">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-900">{countriesVisited.length}</div>
              <div className="text-sm text-amber-700">Countries Visited</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-900">{allPuzzles.length - countriesVisited.length}</div>
              <div className="text-sm text-amber-700">Still to Explore</div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3">
            <div className="w-full bg-amber-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-amber-500 to-yellow-500 h-3 rounded-full transition-all"
                style={{ width: `${(countriesVisited.length / allPuzzles.length) * 100}%` }}
              />
            </div>
            <p className="text-center text-xs text-amber-600 mt-1">
              {Math.round((countriesVisited.length / allPuzzles.length) * 100)}% Complete
            </p>
          </div>
        </div>

        {/* Stamps/Achievements Section */}
        <div className="mb-4">
          <h4 className="text-lg font-bold text-amber-100 mb-3 text-center flex items-center justify-center gap-2">
            Passport Stamps
          </h4>
          <div className="space-y-2">
            {passportAchievements.map(achievement => {
              const isUnlocked = achievement.requirement(countriesVisited);
              return (
                <div
                  key={achievement.id}
                  className={`rounded-xl p-3 flex items-center gap-3 ${
                    isUnlocked 
                      ? 'bg-gradient-to-r from-amber-200 to-yellow-200 border-2 border-amber-400' 
                      : 'bg-amber-800/50 border-2 border-amber-700 opacity-60'
                  }`}
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className={`font-bold text-sm ${isUnlocked ? 'text-amber-900' : 'text-amber-300'}`}>
                      {achievement.name}
                    </div>
                    <div className={`text-xs ${isUnlocked ? 'text-amber-700' : 'text-amber-400'}`}>
                      {achievement.description}
                    </div>
                  </div>
                  {isUnlocked && <div className="text-green-600 text-xl">✓</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Countries visited list */}
        {countriesVisited.length > 0 && (
          <div className="bg-amber-800/30 rounded-xl p-4 border border-amber-700">
            <h4 className="text-sm font-bold text-amber-200 mb-2 text-center">🍯 Countries Visited</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {countriesVisited.map(index => (
                <span key={index} className="bg-amber-100 text-amber-900 px-2 py-1 rounded-full text-xs font-medium">
                  {allPuzzles[index].country}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <button
          onClick={() => setShowPassport(false)}
          className="w-full mt-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-full font-semibold shadow-lg"
        >
          Keep Traveling! ✈️
        </button>
        <button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    resetAllProgress();
  }}
  className="w-full mt-2 py-2 bg-amber-200 hover:bg-amber-300 text-amber-800 rounded-full text-sm font-semibold"
>
  🔄 Reset All Progress
</button>
      </div>
    </div>
  );

  

  // COUNTRY SELECT SCREEN - Letter Griddle Evening Palette
  if (showCountrySelect) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-200 via-orange-100 to-amber-100 p-4 relative overflow-hidden">
        {/* Home Link */}
        <a 
          href="/"
          className="fixed top-3 left-3 flex items-center gap-1 text-amber-800 hover:text-amber-950 transition-colors text-sm font-medium z-10"
        >
          <span className="text-lg">🥞</span>
          <span className="underline">Letter Griddle</span>
        </a>

        <div className="max-w-2xl mx-auto pt-12">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">🥞 ✈️</div>
            <h1 className="text-3xl font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
              Letter Griddle Travels
            </h1>
            <p className="text-amber-700 italic mb-3">Evening at the Cafe</p>
            
            {/* How to Play Button - centered under subheading */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setShowHowToPlay(true)}
                className="inline-flex items-center gap-1.5 text-amber-800 hover:text-amber-950 text-sm font-medium bg-white/70 hover:bg-white px-4 py-2 rounded-full transition-all border border-amber-400 shadow-sm"
              >
                <HelpCircle size={16} />
                How to Play
              </button>
              <button
                onClick={() => setShowPassport(true)}
                className="inline-flex items-center gap-1.5 text-amber-800 hover:text-amber-950 text-sm font-medium bg-white/70 hover:bg-white px-4 py-2 rounded-full transition-all border border-amber-400 shadow-sm"
              >
                🛂 Passport
              </button>
            </div>
          </div>

          {/* Progress Card - Dark brown like other games */}
          <div className="bg-gradient-to-br from-amber-900 to-yellow-900 rounded-2xl p-4 mb-6 shadow-xl border-4 border-amber-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-200 font-semibold">🛂 Countries Visited</span>
              <span className="text-amber-100 font-bold">{countriesVisited.length}/{allPuzzles.length}</span>
            </div>
            <div className="w-full bg-amber-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-amber-400 to-yellow-400 h-3 rounded-full transition-all"
                style={{ width: `${(countriesVisited.length / allPuzzles.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Destination Cards Container - Dark brown */}
          <div className="bg-gradient-to-br from-amber-900 to-yellow-900 rounded-2xl p-4 shadow-xl border-4 border-amber-800">
            <h2 className="text-xl font-bold text-amber-100 mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>
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
                        ? 'bg-gradient-to-br from-amber-200 to-yellow-200 border-amber-400 hover:border-amber-500' 
                        : 'bg-amber-50 border-amber-300 hover:border-amber-400 hover:bg-amber-100'
                    }`}
                  >
                    <div className="text-2xl mb-1">{visited ? '🍯' : '🌍'}</div>
                    <div className="font-semibold text-amber-900">
                      {visited ? puzzle.country : `${puzzle.country.length} letters`}
                    </div>
                    {getDifficultyStars(puzzle.difficulty)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-6 text-xs text-amber-700 mt-4">
            <div>
              © {currentYear} Letter Griddle. All rights reserved.
              {' | '}
              <a href="/privacy" className="hover:text-amber-900 underline">Privacy Policy</a>
              {' | '}
              <a href="/terms" className="hover:text-amber-900 underline">Terms of Service</a>
            </div>
          </div>
        </div>

        {showHowToPlay && <HowToPlayModal />}
        {showPassport && <PassportModal />}
      </div>
    );
  }

  // GAME SCREEN - Letter Griddle Evening Palette
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 via-orange-100 to-amber-100 p-4 relative overflow-hidden">
      {/* Home Link */}
      <a 
        href="/"
        className="fixed top-3 left-3 flex items-center gap-1 text-amber-800 hover:text-amber-950 transition-colors text-sm font-medium z-10"
      >
        <span className="text-lg">🥞</span>
        <span className="underline">Letter Griddle</span>
      </a>

      {/* Confetti */}
      {showConfetti && (
        <div key={confettiKey} className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <style>{`
            @keyframes confettiFall {
              0% { 
                transform: translateY(0) rotate(0deg) scale(1); 
                opacity: 1; 
              }
              75% {
                opacity: 1;
              }
              100% { 
                transform: translateY(100vh) rotate(360deg) scale(1); 
                opacity: 0; 
              }
            }
          `}</style>
          {Array.from({ length: 50 }).map((_, i) => {
            // Use a seeded random based on confettiKey to get consistent but random positions
            const randomLeft = ((i * 17 + confettiKey * 7) * 2654435761 % 100);
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${randomLeft}%`,
                  top: '-60px',
                  fontSize: '2.5rem',
                  animation: `confettiFall 3.5s ease-out ${(i % 12) * 0.12}s forwards`
                }}
              >
                {currentPuzzle.confettiItems[i % currentPuzzle.confettiItems.length]}
              </div>
            );
          })}
        </div>
      )}

      <div className="max-w-lg mx-auto pt-10">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl">🥞</span>
            <h1 className="text-2xl font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
              Letter Griddle Travels
            </h1>
            <span className="text-2xl">✈️</span>
          </div>
          <p className="text-amber-700 text-sm italic">Evening at the Cafe</p>
        </div>

        {/* Back button */}
        <button
          onClick={() => setShowCountrySelect(true)}
          className="text-amber-700 hover:text-amber-900 text-sm mb-4 flex items-center gap-1"
        >
          ← Back to destinations
        </button>

        {/* Main Game Card - Dark brown */}
        <div className="bg-gradient-to-br from-amber-900 to-yellow-900 rounded-2xl p-4 shadow-xl border-4 border-amber-800">
          {!isComplete ? (
            <>
              {/* Prompt */}
              <p className="text-center text-amber-200 font-medium mb-3">
                Tap a character to reveal hints and letters!
              </p>

              {/* Answer slots - cream colored inside dark card */}
              <div className="bg-amber-50 rounded-xl p-4 mb-4">
                <div className="flex justify-center gap-2 mb-2 flex-wrap">
                  {playerAnswer.map((letter, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlotTap(index)}
                      className={`w-10 h-12 rounded-lg border-2 flex items-center justify-center text-xl font-bold transition-all ${
                        letter 
                          ? 'bg-gradient-to-br from-amber-300 to-yellow-300 border-amber-500 text-amber-900' 
                          : selectedSlotIndex === index
                            ? 'bg-amber-200 border-amber-500'
                            : 'bg-white border-amber-300 hover:border-amber-400'
                      }`}
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {letter || ''}
                    </button>
                  ))}
                </div>
                <p className="text-center text-amber-700 text-sm">{currentPuzzle.country.length} letters</p>
              </div>

              {/* Letter Griddle - slightly darker section */}
              <div className="bg-amber-950/50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-amber-300">🍳</span>
                  <span className="text-amber-200 font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Letter Griddle</span>
                  <span className="text-amber-300">🍳</span>
                </div>
                
                {availableLetters.length > 0 ? (
                  <>
                    <div className="flex flex-wrap justify-center gap-2 mb-3">
                      {availableLetters.map((letter, index) => (
                        <button
                          key={index}
                          onClick={() => handleLetterTap(index)}
                          className={`w-10 h-10 rounded-full text-lg font-bold transition-all shadow-md ${
                            selectedLetterIndex === index
                              ? 'bg-gradient-to-br from-yellow-300 to-amber-400 border-2 border-amber-600 scale-110 text-amber-900'
                              : 'bg-gradient-to-br from-yellow-200 to-amber-300 border-2 border-amber-400 hover:scale-105 text-amber-900'
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
                        className="flex items-center gap-1 text-amber-200 hover:text-white text-sm bg-amber-800/50 hover:bg-amber-800/70 px-3 py-1 rounded-full transition-all"
                      >
                        <Shuffle size={14} />
                        Shuffle
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-amber-200 py-4">Tap a character below to reveal letters!</p>
                )}
              </div>

              {/* Trivia Crew - cream cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {Object.entries(characters).map(([key, char]) => (
                  <button
                    key={key}
                    onClick={() => revealHint(key)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      revealedHints[key]
                        ? 'bg-gradient-to-br from-amber-200 to-yellow-200 border-amber-400'
                        : 'bg-amber-50 border-amber-300 hover:border-amber-400 hover:bg-amber-100'
                    }`}
                  >
                    <div className="text-2xl mb-1">{char.emoji}</div>
                    <div className="font-semibold text-amber-900 text-sm">{char.name}</div>
                    <div className="text-xs text-amber-700">{char.role}</div>
                  </button>
                ))}
              </div>

              {/* Instruction */}
              <p className="text-center text-amber-300 text-sm">
                🌍 Tap characters to reveal hints and unlock letters!
              </p>
            </>
          ) : (
            /* Completion Screen */
            <div className="text-center py-4">
              <div className="text-5xl mb-3">{currentPuzzle.confettiItems.join(' ')}</div>
              <h2 className="text-2xl font-bold text-amber-100 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                You visited {currentPuzzle.country}! 🎉
              </h2>
              
              <div className="bg-amber-50 rounded-xl p-4 mb-4 border border-amber-300">
                <p className="text-amber-800 font-medium mb-1">🌍 Fun Fact:</p>
                <p className="text-amber-700 text-sm italic">"{currentPuzzle.funFact}"</p>
              </div>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleShare}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Share2 size={18} />
                  {shareCopied ? 'Copied!' : 'Share'}
                </button>
                <button
                  onClick={nextCountry}
                  className="w-full bg-amber-50 hover:bg-amber-100 text-amber-800 py-3 rounded-full font-semibold border-2 border-amber-300"
                >
                  Next Destination ✈️
                </button>
                <button
                  onClick={() => setShowCountrySelect(true)}
                  className="text-amber-300 hover:text-amber-100 text-sm underline"
                >
                  Back to all destinations
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="text-center text-amber-700 text-sm mt-4">
          🛂 Countries Visited: {countriesVisited.length}/{allPuzzles.length}
        </div>

        {/* Footer */}
        <div className="text-center py-6 text-xs text-amber-700 mt-4">
          <div>
            © {currentYear} Letter Griddle. All rights reserved.
            {' | '}
            <a href="/privacy" className="hover:text-amber-900 underline">Privacy Policy</a>
            {' | '}
            <a href="/terms" className="hover:text-amber-900 underline">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Hint Modal */}
      {showHintModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowHintModal(null)}
        >
          <div 
            className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-6 max-w-sm w-full shadow-2xl border-2 border-amber-400 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowHintModal(null)}
              className="absolute top-3 right-3 text-amber-700 hover:text-amber-900"
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
            
            <div className="bg-white rounded-xl p-4 border border-amber-300">
              <p className="text-amber-900 leading-relaxed text-base" style={{ fontFamily: 'Georgia, serif' }}>
                "{currentPuzzle.hints[showHintModal]}"
              </p>
            </div>
            
            <button
              onClick={() => setShowHintModal(null)}
              className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-full font-semibold"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {showHowToPlay && <HowToPlayModal />}
      {showPassport && <PassportModal />}

      {/* Reset Confirmation Modal */}
    {showResetConfirm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
        <div className="bg-gradient-to-b from-amber-50 to-orange-100 rounded-2xl p-6 max-w-sm w-full shadow-2xl border-4 border-amber-400">
          <div className="text-center">
            <div className="text-5xl mb-3">🧳</div>
            <h3 className="text-xl font-bold text-amber-900 mb-2" style={{fontFamily: 'Georgia, serif'}}>
              Reset All Progress?
            </h3>
            <p className="text-amber-700 text-sm mb-4">
              This will clear all visited countries and passport stamps. This cannot be undone!
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={cancelReset}
                className="px-5 py-2 bg-amber-200 hover:bg-amber-300 text-amber-800 rounded-full font-semibold"
              >
                Keep Exploring
              </button>
              <button
                onClick={confirmReset}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default LetterGriddleTravels;