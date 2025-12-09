"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChefHat, Share2, BarChart3, X, Award, Shuffle, Info, Bookmark, HelpCircle, Instagram } from 'lucide-react';
import { getTodaysPuzzle } from './puzzles';
import { track } from '@vercel/analytics';

const PancakeWordGame = () => {
  const gameData = getTodaysPuzzle();

  const achievements = [
    { id: 'first_pancake', name: 'First Pancake', icon: '🥞', description: 'Complete your first puzzle', requirement: (stats) => stats.puzzlesCompleted >= 1 },
    { id: 'sweet_tooth', name: 'Sweet Tooth', icon: '🍯', description: 'Complete 15 puzzles', requirement: (stats) => stats.puzzlesCompleted >= 15 },
    { id: 'second_cup', name: 'Second Cup of Coffee', icon: '☕', description: 'You came back for more fun at the Letter Griddle. We saved you a seat.', requirement: (stats) => stats.puzzlesCompleted >= 2 },
    { id: 'single_stack', name: 'Single Stack', icon: '🥞', description: '3-day streak', requirement: (stats) => stats.currentStreak >= 3 },
    { id: 'double_stack', name: 'Double Stack', icon: '🥞🥞', description: '7-day streak', requirement: (stats) => stats.currentStreak >= 7 },
    { id: 'chefs_hat', name: "Chef's Hat", icon: '👨‍🍳', description: 'Complete 10 puzzles', requirement: (stats) => stats.puzzlesCompleted >= 10 },
    { id: 'fresh_berry', name: 'Fresh Berry', icon: '🍓', description: 'Complete under 5 minutes', requirement: (stats) => stats.fastestTime && stats.fastestTime < 300 },
    { id: 'butter_pat', name: 'Butter Pat', icon: '🧈', description: 'Complete under 3 minutes', requirement: (stats) => stats.fastestTime && stats.fastestTime < 180 },
  ];

  const initializeWords = () => {
    return gameData.words.map(w => {
      const letters = Array(w.word.length).fill('');
      letters[w.revealedIndex] = w.word[w.revealedIndex];
      return letters;
    });
  };

  const initializedWords = initializeWords();
  const allLetters = gameData.words.flatMap((w, wordIdx) =>
    w.word.split('').filter((_, idx) => initializedWords[wordIdx][idx] === '')
  ).sort();

  const [selectedLetters, setSelectedLetters] = useState(initializedWords);
  const [availableLetters, setAvailableLetters] = useState([...allLetters]);
  const [hintsRevealed, setHintsRevealed] = useState(Array(5).fill(false));
  const [completedWords, setCompletedWords] = useState(Array(5).fill(false));
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedLetterIndex, setSelectedLetterIndex] = useState(null);
  const [selectedSlotWord, setSelectedSlotWord] = useState(null);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [celebratingWord, setCelebratingWord] = useState(null);
  const [wrongPlacements, setWrongPlacements] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [showKitchenModal, setShowKitchenModal] = useState(false);
  const [showBookmarkPrompt, setShowBookmarkPrompt] = useState(false);
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false);
  const [showChristmasModal, setShowChristmasModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [shareCopied, setShareCopied] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const audioRef = useRef(null);
  const [startTime] = useState(Date.now());
  const [completionTime, setCompletionTime] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newAchievements, setNewAchievements] = useState([]);
  const [timeUntilNext, setTimeUntilNext] = useState('');

  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('griddleStats');
      return saved ? JSON.parse(saved) : {
        puzzlesCompleted: 0,
        currentStreak: 0,
        maxStreak: 0,
        fastestTime: null,
        lastPlayedDate: null,
        unlockedAchievements: []
      };
    } catch {
      return {
        puzzlesCompleted: 0,
        currentStreak: 0,
        maxStreak: 0,
        fastestTime: null,
        lastPlayedDate: null,
        unlockedAchievements: []
      };
    }
  });

  // Track bookmark prompt views
  const [bookmarkPromptCount, setBookmarkPromptCount] = useState(() => {
    try {
      const saved = localStorage.getItem('griddleBookmarkPromptCount');
      return saved ? parseInt(saved) : 0;
    } catch {
      return 0;
    }
  });
  
  const allComplete = completedWords.every(c => c);

  // Calculate time until next puzzle (7 PM EST)
  const calculateTimeUntilNext = () => {
    const now = new Date();
    const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    
    const nextPuzzleTime = new Date(estTime);
    nextPuzzleTime.setHours(19, 0, 0, 0); // 7 PM
    
    if (estTime.getHours() >= 19) {
      nextPuzzleTime.setDate(nextPuzzleTime.getDate() + 1);
    }
    
    const diff = nextPuzzleTime - estTime;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  // Update countdown timer every minute
  useEffect(() => {
    if (allComplete) {
      setTimeUntilNext(calculateTimeUntilNext());
      const interval = setInterval(() => {
        setTimeUntilNext(calculateTimeUntilNext());
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [allComplete]);

  // Load music preference from localStorage after mount
useEffect(() => {
  const saved = localStorage.getItem('griddleMusicEnabled');
  if (saved === 'true') {
    setMusicEnabled(true);
  }
}, []);

// Check for first visit of the day and show welcome modal
  useEffect(() => {
    const today = new Date().toDateString();
    const lastWelcome = localStorage.getItem('griddleLastWelcome');
    
    if (lastWelcome !== today) {
      // Pick a message based on the day
      const messages = [
        "The coffee's ready.",
        "Pull up a chair.",
        "Your table is waiting.",
        "We've saved you a seat."
      ];
      const dayIndex = new Date().getDay(); // 0-6 for Sun-Sat
      setWelcomeMessage(messages[dayIndex % messages.length]);
      setShowWelcomeModal(true);
      localStorage.setItem('griddleLastWelcome', today);
    }
  }, []);

  // Music control effect
  useEffect(() => {
    if (audioRef.current) {
      if (musicEnabled) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        setIsMusicPlaying(true);
      } else {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      }
    }
  }, [musicEnabled]);

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
      const currentUnlocked = newStats.unlockedAchievements || [];
      return [...currentUnlocked, ...newlyUnlocked.map(a => a.id)];
    }
    return newStats.unlockedAchievements || [];
  };

  useEffect(() => {
    if (allComplete && !completionTime) {
      const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
      setCompletionTime(timeInSeconds);
      setShowConfetti(true);
      // Track puzzle completion in Vercel Analytics
      track('puzzle_completed', {
        puzzleNumber: gameData.puzzleNumber,
        category: gameData.category,
        completionTimeSeconds: timeInSeconds,
        hintsUsed: hintsRevealed.filter(h => h).length
      });
      setTimeout(() => setShowConfetti(false), 10000);

      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const lastPlayed = stats.lastPlayedDate;
      
      const newStats = {
        puzzlesCompleted: stats.puzzlesCompleted + 1,
        currentStreak: lastPlayed === yesterday || lastPlayed === today ? stats.currentStreak + 1 : 1,
        maxStreak: Math.max(stats.maxStreak, lastPlayed === yesterday || lastPlayed === today ? stats.currentStreak + 1 : 1),
        fastestTime: stats.fastestTime ? Math.min(stats.fastestTime, timeInSeconds) : timeInSeconds,
        lastPlayedDate: today,
        unlockedAchievements: stats.unlockedAchievements || []
      };
      
      newStats.unlockedAchievements = checkAchievements(newStats);
      
      setStats(newStats);
      try {
        localStorage.setItem('griddleStats', JSON.stringify(newStats));
      } catch (e) {
        console.error('Could not save stats', e);
      }// Show bookmark prompt (first 3 completions only)
      // Wait for confetti to finish (10 seconds), then show prompt
      if (bookmarkPromptCount < 3) {
        setTimeout(() => {
          setShowBookmarkPrompt(true);
          const newCount = bookmarkPromptCount + 1;
          setBookmarkPromptCount(newCount);
          try {
            localStorage.setItem('griddleBookmarkPromptCount', newCount.toString());
          } catch (e) {
            console.error('Could not save bookmark count', e);
          }
        }, 10500); // Show 0.5s after confetti ends
      }
    }
  }, [allComplete, completionTime, startTime, stats, bookmarkPromptCount]);

  const checkWordComplete = (wordIdx, letters) => {
    const word = gameData.words[wordIdx].word;
    const filledWord = letters.join('');

    if (filledWord === word && !completedWords[wordIdx]) {
      setCompletedWords(prev => {
        const newCompleted = [...prev];
        newCompleted[wordIdx] = true;
        return newCompleted;
      });
      
      setCelebratingWord(wordIdx);
      setTimeout(() => setCelebratingWord(null), 2000);
    }
  };

  const handleLetterClick = (letter, letterIndex) => {
    // If a slot is already selected, place the letter there
    if (selectedSlotWord !== null && selectedSlotIndex !== null) {
      const wordIdx = selectedSlotWord;
      const slotIdx = selectedSlotIndex;
      
      // Clear the slot selection
      setSelectedSlotWord(null);
      setSelectedSlotIndex(null);
      
      // Place the letter
      setAvailableLetters(prev => {
        const newAvailable = [...prev];
        newAvailable.splice(letterIndex, 1);
        return newAvailable;
      });
      
      const newLetters = [...selectedLetters[wordIdx]];
      newLetters[slotIdx] = letter;
      
      setSelectedLetters(prev => {
        const newSelected = [...prev];
        newSelected[wordIdx] = newLetters;
        return newSelected;
      });
      
      // Check if correct
      const correctLetter = gameData.words[wordIdx].word[slotIdx];
      if (letter !== correctLetter) {
        setWrongPlacements(prev => ({
          ...prev,
          [`${wordIdx}-${slotIdx}`]: true
        }));
        
        setTimeout(() => {
          setWrongPlacements(prev => {
            const newWrong = {...prev};
            delete newWrong[`${wordIdx}-${slotIdx}`];
            return newWrong;
          });
        }, 1000);
      }
      
      checkWordComplete(wordIdx, newLetters);
    } else {
      // Normal behavior: just select the letter
      setSelectedLetter(letter);
      setSelectedLetterIndex(letterIndex);
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

  const handleSlotClick = (wordIdx, slotIdx) => {
    const wordData = gameData.words[wordIdx];
    
    if (slotIdx === wordData.revealedIndex) {
      return;
    }

    const currentLetter = selectedLetters[wordIdx][slotIdx];

    if (currentLetter) {
      setAvailableLetters(prev => [...prev, currentLetter].sort());
      setSelectedLetters(prev => {
        const newSelected = [...prev];
        newSelected[wordIdx] = [...newSelected[wordIdx]];
        newSelected[wordIdx][slotIdx] = '';
        return newSelected;
      });
      
      setWrongPlacements(prev => {
        const newWrong = {...prev};
        delete newWrong[`${wordIdx}-${slotIdx}`];
        return newWrong;
      });
      setSelectedSlotWord(null);
      setSelectedSlotIndex(null);
    } else if (selectedLetter !== null) {
      setAvailableLetters(prev => {
        const newAvailable = [...prev];
        // FIX: Find letter by VALUE, not index (prevents bug when tray is re-sorted)
        const indexToRemove = newAvailable.indexOf(selectedLetter);
        if (indexToRemove !== -1) {
          newAvailable.splice(indexToRemove, 1);
        }
        return newAvailable;
      });
      
      const newLetters = [...selectedLetters[wordIdx]];
      newLetters[slotIdx] = selectedLetter;
      
      setSelectedLetters(prev => {
        const newSelected = [...prev];
        newSelected[wordIdx] = newLetters;
        return newSelected;
      });
      
      setSelectedLetter(null);
      setSelectedLetterIndex(null);

      const correctLetter = gameData.words[wordIdx].word[slotIdx];
      if (selectedLetter !== correctLetter) {
        setWrongPlacements(prev => ({
          ...prev,
          [`${wordIdx}-${slotIdx}`]: true
        }));
        
        setTimeout(() => {
          setWrongPlacements(prev => {
            const newWrong = {...prev};
            delete newWrong[`${wordIdx}-${slotIdx}`];
            return newWrong;
          });
        }, 1000);
      } else {
        setWrongPlacements(prev => {
          const newWrong = {...prev};
          delete newWrong[`${wordIdx}-${slotIdx}`];
          return newWrong;
        });
      }

      checkWordComplete(wordIdx, newLetters);
    }
    else {
      // No letter selected - select this slot instead
      setSelectedSlotWord(wordIdx);
      setSelectedSlotIndex(slotIdx);
    }
  };

  const toggleMusic = () => {
    const newState = !musicEnabled;
    setMusicEnabled(newState);
    localStorage.setItem('griddleMusicEnabled', newState.toString());
  };

  const toggleHint = (idx) => {
    setHintsRevealed(prev => {
      const newHints = [...prev];
      newHints[idx] = !newHints[idx];
      return newHints;
    });
  };

  const handleShare = () => {
    const honeyEmojis = '🍯'.repeat(completedWords.filter(c => c).length);
    const minutes = Math.floor(completionTime / 60);
    const seconds = completionTime % 60;
    const timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

    const shareText = `Griddle #${gameData.puzzleNumber} 🥞\n${gameData.category}\n${honeyEmojis}\n${completedWords.filter(c => c).length}/5 words\n⏰ New puzzle daily at 7 PM EST\n💬 Share with friends to play together daily!\nPlay at www.lettergriddle.com`;

    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const formatTime = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const unlockedList = stats.unlockedAchievements || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-2 relative overflow-hidden">
      <div className="fixed top-2 left-2 text-3xl opacity-20">🧈</div>
      <div className="fixed top-2 right-2 text-3xl opacity-20">🥞</div>
      <div className="fixed bottom-2 left-2 text-3xl opacity-20">🍯</div>
      <div className="fixed bottom-2 right-2 text-3xl opacity-20">🧇</div>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => {
            const emojis = ['🥞', '🍯', '🧈', '🍓', '🧇'];
            const emoji = emojis[i % emojis.length];
            const left = (i * 7) % 100;
            
            return (
              <div
                key={i}
                className="absolute text-4xl"
                style={{
                  left: `${left}%`,
                  top: '-50px',
                  animation: `fall 6s ease-in ${(i % 10) * 0.1}s forwards`
                }}
              >
                {emoji}
              </div>
            );
          })}
        </div>
      )}

      {newAchievements.length > 0 && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
            <Award size={24} />
            <div>
              <div className="font-bold">Achievement Unlocked!</div>
              <div className="text-sm">{newAchievements[0].icon} {newAchievements[0].name}</div>
            </div>
          </div>
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

      <div className="max-w-5xl mx-auto relative">
        {/* Compact Header */}
        <div className="flex justify-between items-center mb-1.5 px-1">
          <div className="text-xl invisible">🥞🥞</div>
          <h1 className="text-lg md:text-xl font-bold text-amber-800" style={{fontFamily: 'Georgia, serif'}}>
            Welcome back for Today's Special
          </h1>
          <div className="flex items-center gap-2">
            <div className="text-xl">🥞</div>
            {/* MUSIC BUTTON */}
            <button
              onClick={toggleMusic}
              className={`p-1.5 rounded-full transition-all shadow-md ${
                musicEnabled 
                  ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
              }`}
              title={musicEnabled ? "Turn off music" : "Turn on music"}
            >
              <span className="text-sm">{musicEnabled ? '🔊' : '🎵'}</span>
            </button>
            {/* 12 Days of Christmas Button */}
            <button
              onClick={() => setShowChristmasModal(true)}
              className="bg-red-100 hover:bg-red-200 text-red-800 p-1.5 rounded-full transition-all shadow-md"
              title="12 Days of Christmas"
            >
              <span className="text-lg">🎄</span>
            </button>
            <button
              onClick={() => setShowHowToPlayModal(true)}
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 p-1.5 rounded-full transition-all shadow-md"
              title="How to Play"
            >
              <HelpCircle size={18} />
            </button>

            <button
              onClick={() => setShowKitchenModal(true)}
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 p-1.5 rounded-full transition-all shadow-md"
              title="Kitchen & Recipes"
            >
              
  <ChefHat size={18} />
  

            </button>
            <button
              onClick={() => setShowMissionModal(true)}
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 p-1.5 rounded-full transition-all shadow-md"
              title="About Letter Griddle"
            >
              <Info size={18} />
            </button>
            <button
              onClick={() => setShowStatsModal(true)}
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 p-1.5 rounded-full transition-all shadow-md relative"
              title="View Statistics"
            >
              <BarChart3 size={18} />
              {unlockedList.length > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">
                  {unlockedList.length}
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm text-amber-700 italic text-center mb-2" style={{fontFamily: 'Georgia, serif'}}>
          Letter Griddle is a cozy word game that sometimes teaches but it's always  fun! 🥞
        </p>

        <div className="bg-white rounded-xl shadow-2xl p-2 border-2 border-amber-200">
          {/* Thin Category */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg p-1 mb-2 shadow-lg">
            <p className="text-center text-xs md:text-sm font-bold" style={{fontFamily: 'Georgia, serif'}}>{gameData.category}</p>
          </div>
          
          {allComplete && (
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-amber-400 rounded-lg p-2 mb-2 text-center shadow-lg">
              <p className="text-base font-bold text-amber-800 mb-0.5">🎉 Complete! 🎉</p>
              <p className="text-xs text-amber-700 mb-1.5">☕ You savored this puzzle for {formatTime(completionTime)}</p>
              <p className="text-xs text-amber-600 mb-1">🥞 Next puzzle served in: {timeUntilNext} 🍯</p>
              {/* Did You Know */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-3 mb-2 border-2 border-amber-300">
                <p className="text-sm font-bold text-amber-800 mb-1 flex items-center justify-center gap-1">
                  <span className="text-lg">🍯</span> Did You Know?
                </p>
                <p className="text-xs text-amber-700 leading-relaxed text-center">
                  {gameData.funFact || gameData.words[gameData.words.length - 1].hint}
                  {!gameData.funFact && (
                    <span className="block text-amber-600 font-semibold mt-1">- {gameData.words[gameData.words.length - 1].word}</span>
                  )}
                </p>
              </div>
              <button
                onClick={() => setShowShareModal(true)}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg transition-all flex items-center gap-1 mx-auto"
              >
                <Share2 size={14} />
                Share
              </button>
            </div>
          )}

          {/* Words and Letters Side by Side */}
          <div className="grid md:grid-cols-[1fr,240px] gap-2">
            {/* Words */}
            <div className="space-y-1.5">
              {gameData.words.map((wordData, wordIdx) => {
                const revealed = selectedLetters[wordIdx];
                const isComplete = completedWords[wordIdx];
                const isCelebrating = celebratingWord === wordIdx;
                
                return (
                  <div key={wordIdx} className="relative">
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-1.5 border border-amber-200 shadow-sm">
                      {isCelebrating && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-2xl animate-bounce">
                            {wordIdx === 0 ? '🎉 Great start! 🎉 🍯 Delicious! 🍯' : wordIdx === 1 ? '🔥 You\'re cooking! 🔥 🍯 Delicious! 🍯' : wordIdx === 2 ? '⭐ You\'re on a roll! ⭐ 🍯 Delicious! 🍯' : wordIdx === 3 ? '🍓 Almost there! 🍓 🍯 Delicious! 🍯' : '⭐ Amazing! ⭐ 🍯 Delicious! 🍯'}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-0.5">
                          <span className="text-base">🥞</span>
                          <span className="text-[10px] font-bold text-amber-800">
                            {wordData.word.length} Letters
                          </span>
                        </div>
                        <button
                          onClick={() => toggleHint(wordIdx)}
                          className="flex items-center gap-0.5 text-[10px] bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-1.5 py-0.5 rounded-full transition-all shadow-sm font-semibold"
                        >
                          <ChefHat size={10} />
                          Hint
                        </button>
                      </div>
                      
                      {hintsRevealed[wordIdx] && (
                        <div className="bg-white border border-amber-300 rounded p-1 mb-1 shadow-inner">
                          <p className="text-lg text-gray-700 leading-tight">{wordData.hint}</p>
                        </div>
                      )}
                      
                      <div className="flex gap-1 justify-center flex-wrap">
                        {wordData.word.split('').map((letter, letterIdx) => {
                          const isRevealed = (letterIdx === wordData.revealedIndex) && !isComplete;
                          const currentLetter = revealed[letterIdx] || '';
                          const isWrong = wrongPlacements[`${wordIdx}-${letterIdx}`];
                          const isSlotSelected = selectedSlotWord === wordIdx && selectedSlotIndex === letterIdx;
                          
                          return (
                            <div
                              key={letterIdx}
                              onClick={() => handleSlotClick(wordIdx, letterIdx)}
                              className={`w-8 h-8 flex items-center justify-center text-base font-bold rounded-full border-2 transition-all duration-300 shadow-sm
                                ${isCelebrating ? 'animate-bounce scale-110' : ''}
                                ${isWrong ? 'bg-gradient-to-br from-red-200 to-red-300 border-red-500 text-red-900 animate-pulse' : ''}
                                ${!isWrong && isRevealed ? 'bg-gradient-to-br from-blue-200 to-blue-300 border-blue-400 text-blue-900' : ''}
                                ${!isWrong && !isRevealed && isComplete ? 'bg-gradient-to-br from-yellow-200 to-amber-300 border-amber-500 text-amber-900 shadow-md' : ''}
                                ${!isWrong && !isRevealed && !isComplete && currentLetter ? 'bg-gradient-to-br from-amber-100 to-yellow-100 border-amber-400 text-amber-900 cursor-pointer hover:scale-105' : ''}
                                ${isSlotSelected && !currentLetter ? 'bg-gradient-to-br from-amber-200 to-yellow-200 border-amber-500 border-4 text-transparent cursor-pointer scale-105' : ''}
                                ${!isWrong && !isRevealed && !isComplete && !currentLetter ? 'bg-white border-amber-300 text-transparent cursor-pointer hover:border-amber-400 hover:scale-105' : ''}`}
                              style={{fontFamily: 'Georgia, serif'}}
                            >
                              {currentLetter}
                            </div>
                          );
                        })}
                      </div>
                      
                      {isComplete && !isCelebrating && (
                        <div className="mt-0.5 text-center">
                          <span className="text-base">🍯</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Letter Griddle */}
            <div className="md:sticky md:top-1">
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-2 shadow-xl border-2 border-gray-600">
                <div className="flex items-center justify-center gap-1 mb-1.5">
                  <span className="text-base">🍳</span>
                  <h3 className="text-sm font-bold text-amber-200" style={{fontFamily: 'Georgia, serif'}}>
                    Letter Griddle
                  </h3>
                  <span className="text-base">🍳</span>
                </div>
                <div className="flex flex-wrap gap-1 justify-center mb-2">
                  {availableLetters.map((letter, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLetterClick(letter, idx)}
                      className={`w-8 h-8 rounded-full text-sm font-bold transition-all duration-200 shadow-md
                        ${selectedLetter === letter && selectedLetterIndex === idx
                          ? 'bg-gradient-to-br from-yellow-300 to-amber-400 border-2 border-amber-600 text-amber-900 scale-110 shadow-lg'
                          : 'bg-gradient-to-br from-yellow-200 to-amber-300 border border-amber-400 text-amber-900 hover:scale-105'}`}
                      style={{fontFamily: 'Georgia, serif'}}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
                {availableLetters.length === 0 ? (
                  <div className="text-center mt-1.5">
                    <p className="text-amber-200 font-bold text-xs">✨ Clean! ✨</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <button
                      onClick={shuffleLetters}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold transition-all inline-flex items-center gap-1"
                    >
                      <Shuffle size={12} />
                      Shuffle
                    </button>
                  </div>
                )}
              </div>
              
              {/* Instructions - ALL THREE LINES */}
              <div className="mt-2 text-center text-[10px] text-amber-700 bg-amber-50 rounded-lg p-1.5">
                <p className="text-lg font-semibold">🥞 ✨ 🥞 ✨ NEW: Click a spot 🥞 then a letter, or click a letter then a spot! 🥞 ✨ 🥞 ✨</p>
                <p className="text-sm text-amber-600 mt-0.5">🍯 Hints reveal fun facts! 🍯 Give them a try! 🍯</p>
                <p className="text-sm text-amber-600 mt-0.5">☕ Enjoy the puzzle!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
{/* BOOKMARK PROMPT MODAL */}
      {showBookmarkPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[110] p-4" onClick={() => setShowBookmarkPrompt(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-[slideUp_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowBookmarkPrompt(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1 hover:bg-gray-100"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">🔖</div>
              <h2 className="text-3xl font-bold text-amber-800 mb-2" style={{fontFamily: 'Georgia, serif'}}>
                Never Miss a Puzzle!
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200">
                <p className="text-lg text-gray-700 leading-relaxed text-center" style={{fontFamily: 'Georgia, serif'}}>
                  Bookmark <span className="font-bold text-amber-800">www.lettergriddle.com</span> to make your daily puzzle just a click away! 🥞
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border-2 border-amber-200">
                <div className="flex items-start gap-3">
                  <Bookmark size={24} className="text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="font-bold text-amber-800">Quick tip:</span> Press{' '}
                      <kbd className="px-2 py-1 bg-white rounded border border-amber-300 text-xs font-mono">Ctrl+D</kbd>{' '}
                      (or <kbd className="px-2 py-1 bg-white rounded border border-amber-300 text-xs font-mono">⌘+D</kbd> on Mac) to bookmark now!
                    </p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowBookmarkPrompt(false)}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-4 rounded-full font-bold text-lg shadow-lg transition-all"
              >
                Got it! 👍
              </button>
              
              <p className="text-center text-xs text-gray-500">
                New puzzle daily at 7 PM EST
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Animation for bookmark prompt slide-up */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Kitchen Modal */}
      {showKitchenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowKitchenModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowKitchenModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1 hover:bg-gray-100"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">🧑‍🍳</div>
              <h2 className="text-3xl font-bold text-amber-800 mb-2" style={{fontFamily: 'Georgia, serif'}}>
                From the Kitchen
              </h2>
            </div>
            {/* Table of Contents */}
              <div className="bg-amber-50 rounded-lg p-3 mb-4 border border-amber-200">
                <p className="text-sm font-bold text-amber-800 mb-2">📋 What's Cooking:</p>
                <ul className="text-sm text-amber-700 space-y-1 ml-4">
                  <li>• 🥞 Favorite Pancakes</li>
                  <li>• ☕ Coffee Tip</li>
                  <li>• 🍳 Breakfast Casserole</li>
                  <li>• 🍊 Honey Citrus Fruit Salad</li>
                </ul>
              </div>
            <div className="space-y-6">
              {/* Pancake Recipe */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200">
                <h3 className="text-2xl font-bold text-amber-800 mb-4 flex items-center gap-2" style={{fontFamily: 'Georgia, serif'}}>
                  🥞 Favorite Pancakes
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-amber-800 mb-2">Ingredients:</h4>
                    <ul className="text-gray-700 space-y-1 ml-4">
                      <li>• 1¼ cups sifted all-purpose flour</li>
                      <li>• 3 teaspoons baking powder</li>
                      <li>• 1 tablespoon sugar</li>
                      <li>• ½ teaspoon salt</li>
                      <li>• 1 beaten egg</li>
                      <li>• 1 cup milk*</li>
                      <li>• 2 tablespoons salad oil</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-amber-800 mb-2">Instructions:</h4>
                    <ol className="text-gray-700 space-y-1 ml-4">
                      <li>1. Sift together dry ingredients</li>
                      <li>2. Combine egg, milk, and salad oil</li>
                      <li>3. Add to dry ingredients, stirring just till moistened</li>
                      <li>4. Bake on hot griddle</li>
                    </ol>
                  </div>
                  
                  <div className="text-sm text-gray-600 italic">
                    <p>Makes about 12 dollar-size, or eight 4-inch pancakes</p>
                    <p className="mt-1">*For thinner pancakes, add 2 tablespoons milk to batter</p>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-amber-200">
                    Recipe from Better Homes and Gardens New Cookbook
                  </div>
                </div>
              </div>
              {/* Coffee Tip */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-amber-200">
                <h3 className="text-2xl font-bold text-amber-800 mb-3 flex items-center gap-2" style={{fontFamily: 'Georgia, serif'}}>
                  ☕ Coffee Tip
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
                  Freshly ground beans make for an excellent cup of coffee.
                </p>
              </div>
              {/* Breakfast Casserole Recipe */}
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200">
                  <h3 className="text-2xl font-bold text-amber-800 mb-4 flex items-center gap-2" style={{fontFamily: 'Georgia, serif'}}>
                    🍳 Breakfast Casserole
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-amber-800 mb-2">Ingredients:</h4>
                      <ul className="text-gray-700 space-y-1 ml-4">
                        <li>• 1 lb. turkey sausage</li>
                        <li>• 6 eggs</li>
                        <li>• 2 C. milk</li>
                        <li>• 1 tsp. dry mustard</li>
                        <li>• 1 tsp. salt</li>
                        <li>• 2 C. cubed bread crusts</li>
                        <li>• 8 oz. Cheddar cheese, shredded</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-amber-800 mb-2">Instructions:</h4>
                      <ol className="text-gray-700 space-y-1 ml-4">
                        <li>1. Brown turkey sausage in a medium skillet. Drain fat and set aside to cool.</li>
                        <li>2. Lightly beat eggs in a large mixing bowl. Add milk, mustard and salt. Blend well.</li>
                        <li>3. Stir in bread crust, sausage and cheese, mixing well.</li>
                        <li>4. Pour into a shallow 2-quart glass baking dish and refrigerate overnight.</li>
                        <li>5. Preheat oven to 350° and bake for 40-45 minutes or until edges are brown.</li>
                        <li>6. Cut into wedges and serve hot or room temperature.</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 italic">
                    <p>Serves 6 to 8</p>
                    <p className="mt-1">*The secret: Mix all ingredients, refrigerate overnight, then bake in the morning!</p>
                  </div>
                </div>
            </div>
            {/* Honey Citrus Fruit Salad Recipe */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200">
                <h3 className="text-2xl font-bold text-amber-800 mb-4 flex items-center gap-2" style={{fontFamily: 'Georgia, serif'}}>
                  🍊 Honey Citrus Fruit Salad
                </h3>
                <p className="text-sm text-amber-600 mb-3">Prep time: 15 minutes | Serves: 4-6</p>
                <p className="text-gray-700 mb-4 italic">This refreshing fruit salad combines sweet and tangy flavors, topped with crunchy walnuts and coconut flakes.</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-amber-800 mb-2">Ingredients:</h4>
                    <ul className="text-gray-700 space-y-1 ml-4">
                      <li>• 1 Apple, cored and chunked</li>
                      <li>• 1 Banana, sliced</li>
                      <li>• 1/4 cup Blueberries</li>
                      <li>• 1 cup Grapes (white or red)</li>
                      <li>• 1 can (approx. 8 oz) Mandarin oranges, drained</li>
                      <li>• 1 small can (approx. 8 oz) Pineapple tidbits, drained</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-amber-800 mb-2">For the Dressing:</h4>
                    <ul className="text-gray-700 space-y-1 ml-4">
                      <li>• 1/4 cup Orange juice</li>
                      <li>• 2 tbsp Honey</li>
                      <li>• Pinch of Cinnamon</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-amber-800 mb-2">For the Garnish:</h4>
                    <ul className="text-gray-700 space-y-1 ml-4">
                      <li>• Shredded coconut (to taste)</li>
                      <li>• Chopped walnuts (to taste)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-amber-800 mb-2">Instructions:</h4>
                    <ol className="text-gray-700 space-y-2 ml-4 list-decimal list-inside">
                      <li><strong>Prepare the fruit:</strong> In a large mixing bowl, gently combine the chunked apple, sliced banana, blueberries, grapes, drained mandarin oranges, and drained pineapple tidbits.</li>
                      <li><strong>Make the dressing:</strong> In a small bowl, whisk together the orange juice, honey, and pinch of cinnamon until well blended.</li>
                      <li><strong>Combine:</strong> Pour the dressing over the fruit mixture. Toss gently to ensure all the fruit is lightly coated.</li>
                      <li><strong>Garnish and serve:</strong> Just before serving, top the salad with shredded coconut and chopped walnuts.</li>
                    </ol>
                  </div>
                  
                  <div className="bg-amber-100 rounded-lg p-3 mt-4">
                    <h4 className="font-bold text-amber-800 mb-2">💡 Tips for the Best Salad:</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• <strong>Prevent browning:</strong> The orange juice in the dressing helps prevent the apples and bananas from browning.</li>
                      <li>• <strong>Chill:</strong> This salad tastes best when chilled for at least 30 minutes before serving.</li>
                      <li>• <strong>Serve immediately after adding banana:</strong> Bananas can become mushy if left too long. Add them just before serving.</li>
                    </ul>
                  </div>
                </div>
              </div>
          </div>
        </div>
      )}
      {/* 12 Days of Christmas Modal */}
      {showChristmasModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowChristmasModal(false)}>
          <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border-4 border-amber-300 my-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowChristmasModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1 hover:bg-gray-100"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            
            <div className="absolute top-4 left-4 text-3xl opacity-30">🥞</div>
            <div className="absolute top-12 right-12 text-2xl opacity-30">🧈</div>
            
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">🥞</div>
              <h1 className="text-3xl font-bold text-amber-800 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                Letter Griddle
              </h1>
              
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full px-6 py-2 inline-block shadow-lg mb-3">
                <span className="text-lg font-bold flex items-center gap-2">
                  🎄 12 DAYS OF CHRISTMAS
                </span>
              </div>
              
              <p className="text-amber-700 text-base font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
                December 14 - 25, 2025
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {[
                { day: 14, dayName: 'SUN', category: 'Musical Instruments', emoji: '🎵' },
                { day: 15, dayName: 'MON', category: 'Soup', emoji: '🍲' },
                { day: 16, dayName: 'TUES', category: 'Ways to Go', emoji: '🚗' },
                { day: 17, dayName: 'WED', category: 'Pasta', emoji: '🍝' },
                { day: 18, dayName: 'THURS', category: 'Breakfast', emoji: '🍳' },
                { day: 19, dayName: 'FRI', category: 'Cooking', emoji: '👨‍🍳' },
                { day: 20, dayName: 'SAT', category: 'Antlers', emoji: '🦌' },
                { day: 21, dayName: 'SUN', category: 'Snow', emoji: '❄️' },
                { day: 22, dayName: 'MON', category: 'A Dish to Pass', emoji: '🥧' },
                { day: 23, dayName: 'TUES', category: 'Brunch', emoji: '🥐' },
                { day: 24, dayName: 'WED', category: "'Tis the Season", emoji: '🎄', isChristmas: true },
                { day: 25, dayName: 'THURS', category: 'Christmas Tree', emoji: '🎄', isChristmas: true },
              ].map((puzzle) => (
                <div 
                  key={puzzle.day}
                  className="bg-white rounded-lg p-2 shadow-sm border border-amber-200 flex items-center gap-2"
                >
                  <div className={`${puzzle.isChristmas ? 'bg-red-600' : 'bg-amber-500'} text-white rounded-md px-2 py-1 text-center min-w-[50px]`}>
                    <div className="text-[10px] font-bold">{puzzle.dayName}</div>
                    <div className="text-xl font-bold">{puzzle.day}</div>
                  </div>
                  
                  <div className="flex-1 text-sm">
                    <span className="text-amber-800 font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
                      {puzzle.category}
                    </span>
                  </div>
                  
                  <div className="text-xl">{puzzle.emoji}</div>
                </div>
              ))}
            </div>
            
            <div className="relative pt-2">
              <div className="absolute left-0 bottom-0 text-2xl">🎄</div>
              <div className="absolute right-0 bottom-0 text-2xl">🎄</div>
              
              <div className="border-t-2 border-dashed border-amber-400 mx-10 mb-3"></div>
              
              <div className="text-center">
                <p className="text-amber-700 font-semibold text-sm mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                  🥞 New puzzle daily at 7 PM EST 🥞
                </p>
                <p className="text-amber-800 font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                  www.lettergriddle.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-amber-50 rounded-2xl p-10 max-w-sm w-full shadow-xl text-center">
            <div className="text-4xl mb-4">🥞</div>
            <p className="text-sm text-stone-400 mb-2" style={{fontFamily: 'Georgia, serif'}}>
              Welcome to Letter Griddle
            </p>
            <p className="text-xl text-stone-600 mb-8" style={{fontFamily: 'Georgia, serif'}}>
              {welcomeMessage}
            </p>
            <button
              onClick={() => setShowWelcomeModal(false)}
              className="text-stone-500 hover:text-stone-700 text-lg font-medium transition-colors underline"
              style={{fontFamily: 'Georgia, serif'}}
            >
              Today's Special awaits.
            </button>
          </div>
        </div>
      )}
      {/* Mission Modal */}
      {showMissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowMissionModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowMissionModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1 hover:bg-gray-100"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">🥞</div>
              <h2 className="text-3xl font-bold text-amber-800 mb-2" style={{fontFamily: 'Georgia, serif'}}>
                Letter Griddle Mission
              </h2>
            </div>
            
            <div className="space-y-4 text-center">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200">
                <p className="text-lg text-gray-700 leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
                  At the Letter Griddle, we <span className="font-bold text-amber-800">serve up joy and creativity</span> through our sweet, pancake-inspired word game, sparking cozy connections with every puzzle, warming hearts worldwide.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-amber-200">
                <p className="text-lg text-gray-700 leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
                  We're committed to <span className="font-bold text-amber-800">nourishing minds</span> with our game, building a sweeter, smarter world, one puzzle at a time.
                </p>
              </div>
              
              <div className="flex justify-center gap-3 mt-6 text-4xl">
                🍯 🧈 🍓 🧇
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How to Play Modal */}
      {showHowToPlayModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowHowToPlayModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowHowToPlayModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1 hover:bg-gray-100"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">🥞</div>
              <h2 className="text-3xl font-bold text-amber-800 mb-2" style={{fontFamily: 'Georgia, serif'}}>
                How to Play
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border-2 border-amber-200">
                <h3 className="font-bold text-amber-800 mb-2">🥞 Goal</h3>
                <p className="text-gray-700">Fill in all 5 words using the available letters!</p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border-2 border-amber-200">
                <h3 className="font-bold text-amber-800 mb-2">🍯 How to Play</h3>
                <ol className="text-gray-700 space-y-2 list-decimal list-inside">
                  <li>Click a letter, then click an empty spot to place it</li>
                    <li>Or click an empty spot first, then choose your letter!</li>
                  <li>Blue letters are already revealed to help you!</li>
                  <li>Wrong letter? Click it to remove and try again</li>
                </ol>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border-2 border-amber-200">
                <h3 className="font-bold text-amber-800 mb-2">🧈 Tips</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Use the <strong>Shuffle</strong> button to rearrange letters</li>
                  <li>• Click <strong>Hint</strong> for clues about each word</li>
                  <li>• New puzzle every day at 7 PM EST!</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border-2 border-amber-200">
                <h3 className="font-bold text-amber-800 mb-2">☕ Enjoy the Puzzle!</h3>
                <p className="text-gray-700">Have fun and enjoy your favorite daily pancake-inspired word game! ☕🥞</p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border-2 border-amber-200">
                <h3 className="font-bold text-amber-800 mb-2">📧 Questions or Feedback?</h3>
                <p className="text-gray-700">We'd love to hear from you! Email us at <a href="mailto:lettergriddle@gmail.com" className="text-amber-600 hover:text-amber-700 font-semibold underline">lettergriddle@gmail.com</a></p>
              </div>
            </div>
            
            <div className="flex justify-center gap-3 mt-6 text-4xl">
              🍯 🧈 🍓 🧇
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1 hover:bg-gray-100"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-3xl font-bold text-amber-800 mb-4 text-center" style={{fontFamily: 'Georgia, serif'}}>
              Share Your Results! 🥞
            </h2>
            
            <div className="bg-amber-50 rounded-xl p-6 mb-6 font-mono text-sm">
              <div className="whitespace-pre-wrap">
                {`Griddle #${gameData.puzzleNumber} 🥞
${gameData.category}
${'🍯'.repeat(completedWords.filter(c => c).length)}
${completedWords.filter(c => c).length}/5 words
Play at www.lettergriddle.com`}
              </div>
            </div>

            <button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-4 rounded-full font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {shareCopied ? '✓ Copied!' : <><Share2 size={20} /> Copy to Clipboard</>}
            </button>
            {/* Instagram Follow */}
            <div className="mt-4 text-center">
              <a 
                href="https://instagram.com/letter_griddle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-800 text-sm font-semibold inline-flex items-center gap-1"
              >
                <Instagram size={14} /> Follow us @letter_griddle
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4 overflow-y-auto" onClick={() => setShowStatsModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative my-8" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowStatsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1 hover:bg-gray-100"
              aria-label="Close statistics"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-3xl font-bold text-amber-800 mb-6 text-center pr-8" style={{fontFamily: 'Georgia, serif'}}>
              Your Statistics 📊
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-amber-800">{stats.puzzlesCompleted}</div>
                <div className="text-sm text-amber-600 mt-1">Puzzles Completed</div>
              </div>
              
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-amber-800">{stats.currentStreak}</div>
                <div className="text-sm text-amber-600 mt-1">Current Streak 🔥</div>
              </div>
              
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-amber-800">{stats.maxStreak}</div>
                <div className="text-sm text-amber-600 mt-1">Max Streak</div>
              </div>
              
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-amber-800">{formatTime(stats.fastestTime)}</div>
                <div className="text-sm text-amber-600 mt-1">Fastest Time ⚡</div>
              </div>
            </div>

            <div className="border-t-2 border-amber-200 pt-6">
              <h3 className="text-2xl font-bold text-amber-800 mb-4 text-center flex items-center justify-center gap-2">
                <Award size={24} />
                Achievements
              </h3>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {achievements.map(achievement => {
                  const isUnlocked = unlockedList.includes(achievement.id);
                  return (
                    <div
                      key={achievement.id}
                      className={`rounded-xl p-4 flex items-center gap-3 ${
                        isUnlocked 
                          ? 'bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-400' 
                          : 'bg-gray-100 border-2 border-gray-300 opacity-50'
                      }`}
                    >
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className={`font-bold ${isUnlocked ? 'text-amber-800' : 'text-gray-600'}`}>
                          {achievement.name}
                        </div>
                        <div className={`text-sm ${isUnlocked ? 'text-amber-600' : 'text-gray-500'}`}>
                          {achievement.description}
                        </div>
                      </div>
                      {isUnlocked && <div className="text-green-500 text-xl">✓</div>}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              Stats saved locally on your device
            </div>
          </div>
        </div>
      )}

      {/* Copyright Footer */}
<div className="text-center py-6 text-xs text-amber-700 mt-8">
  <div>
    © {new Date().getFullYear()} Letter Griddle. All rights reserved.
    {' | '}
    <a href="/privacy" className="hover:text-amber-600 underline">Privacy Policy</a>
    {' | '}
    <a href="/terms" className="hover:text-amber-600 underline">Terms of Service</a>
    {' | '}
    <a href="https://instagram.com/letter_griddle" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 underline">
<Instagram size={14} className="inline" /> @letter_griddle</a>
  </div>
</div>

{/* Background Music */}
      <audio
        ref={audioRef}
        src="/cafe-music.mp3"
        loop
        preload="none"
      /> 
    </div>
  );
};

export default PancakeWordGame;