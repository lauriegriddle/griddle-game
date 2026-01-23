"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Share2, BarChart3, X, Award, Shuffle, Info, Bookmark, HelpCircle, Instagram, RotateCcw, ChefHat } from 'lucide-react';
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
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showBookmarkPrompt, setShowBookmarkPrompt] = useState(false);
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [shareCopied, setShareCopied] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const playlist = ['/cafe-music.mp3', '/cafe-music-2.mp3', '/cafe-music-3.mp3', '/cafe-music-4.mp3'];
  const [startTime, setStartTime] = useState(Date.now());
  const [hasMounted, setHasMounted] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newAchievements, setNewAchievements] = useState([]);

  // Keyboard support state
  const [focusedWordIndex, setFocusedWordIndex] = useState(0);
  const gameContainerRef = useRef(null);

  const [timeUntilNext, setTimeUntilNext] = useState('');

  const [stats, setStats] = useState({
  puzzlesCompleted: 0,
  currentStreak: 0,
  maxStreak: 0,
  fastestTime: null,
  lastPlayedDate: null,
  unlockedAchievements: []
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
      audioRef.current.src = playlist[currentTrackIndex];
      if (musicEnabled) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        setIsMusicPlaying(true);
      } else {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      }
    }
  }, [musicEnabled, currentTrackIndex]);

  // Handle track ended - play next song
  const handleTrackEnded = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    if (audioRef.current && musicEnabled) {
      audioRef.current.src = playlist[nextIndex];
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

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
        clearProgress(); // Clear saved progress on completion
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
  // Mark component as mounted (for hydration safety)
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Load saved progress after mount (prevents hydration mismatch)
  useEffect(() => {
    if (!hasMounted) return;
    
    try {
      const saved = localStorage.getItem('griddleProgress');
      if (saved) {
        const progress = JSON.parse(saved);
        // Only restore if it's the same puzzle
        if (progress.puzzleNumber === gameData.puzzleNumber) {
          setSelectedLetters(progress.selectedLetters);
          setAvailableLetters(progress.availableLetters);
          setHintsRevealed(progress.hintsRevealed);
          setCompletedWords(progress.completedWords);
          setStartTime(progress.startTime);
        } else {
          // Different puzzle, clear old progress
          localStorage.removeItem('griddleProgress');
        }
      }
    } catch (e) {
      console.error('Could not load progress', e);
    }
  }, [hasMounted, gameData.puzzleNumber]);

  // Load stats from localStorage after mount (prevents hydration mismatch)
useEffect(() => {
  if (!hasMounted) return;
  
  try {
    const saved = localStorage.getItem('griddleStats');
    if (saved) {
      setStats(JSON.parse(saved));
    }
  } catch (e) {
    console.error('Could not load stats', e);
  }
}, [hasMounted]);
  // Auto-save progress when game state changes
  useEffect(() => {
    // Don't save if puzzle is complete
    if (allComplete) return;
    
    // Don't save if puzzle hasn't started (all letters still available)
    if (availableLetters.length === allLetters.length) return;
    
    try {
      const progress = {
        puzzleNumber: gameData.puzzleNumber,
        selectedLetters,
        availableLetters,
        hintsRevealed,
        completedWords,
        startTime
      };
      localStorage.setItem('griddleProgress', JSON.stringify(progress));
    } catch (e) {
      console.error('Could not save progress', e);
    }
  }, [selectedLetters, availableLetters, hintsRevealed, completedWords, startTime, allComplete, gameData.puzzleNumber]);

  // Keyboard event handler for desktop typing
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't capture if typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      // Don't capture if any modal is open
      if (showShareModal || showStatsModal || showMissionModal || showLaunchModal || 
          showBookmarkPrompt || showHowToPlayModal || showWelcomeModal) return;
      
      // Don't capture if puzzle is complete
      if (allComplete) return;

      const key = e.key.toUpperCase();
      
      // Arrow keys to navigate between words
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedWordIndex(prev => Math.min(prev + 1, 4));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedWordIndex(prev => Math.max(prev - 1, 0));
        return;
      }
      
      // Tab to go to next incomplete word
      if (e.key === 'Tab') {
        e.preventDefault();
        for (let i = 1; i <= 5; i++) {
          const nextIdx = (focusedWordIndex + i) % 5;
          if (!completedWords[nextIdx]) {
            setFocusedWordIndex(nextIdx);
            break;
          }
        }
        return;
      }
      
      // Backspace to remove last placed letter from focused word
      if (e.key === 'Backspace') {
        e.preventDefault();
        const wordIdx = focusedWordIndex;
        const wordData = gameData.words[wordIdx];
        const currentWordLetters = selectedLetters[wordIdx];
        
        for (let i = currentWordLetters.length - 1; i >= 0; i--) {
          if (currentWordLetters[i] && i !== wordData.revealedIndex) {
            const letterToReturn = currentWordLetters[i];
            
            setAvailableLetters(prev => [...prev, letterToReturn].sort());
            
            setSelectedLetters(prev => {
              const newSelected = [...prev];
              newSelected[wordIdx] = [...newSelected[wordIdx]];
              newSelected[wordIdx][i] = '';
              return newSelected;
            });
            
            setWrongPlacements(prev => {
              const newWrong = {...prev};
              delete newWrong[`${wordIdx}-${i}`];
              return newWrong;
            });
            
            break;
          }
        }
        return;
      }
      
      // Letter keys A-Z to place letters
      if (/^[A-Z]$/.test(key)) {
        const letterIndex = availableLetters.findIndex(l => l === key);
        if (letterIndex === -1) return;
        
        const wordIdx = focusedWordIndex;
        const wordData = gameData.words[wordIdx];
        const currentWordLetters = selectedLetters[wordIdx];
        
        let targetSlot = -1;
        for (let i = 0; i < currentWordLetters.length; i++) {
          if (!currentWordLetters[i] && i !== wordData.revealedIndex) {
            targetSlot = i;
            break;
          }
        }
        
        if (targetSlot === -1) {
          for (let i = 1; i <= 5; i++) {
            const nextIdx = (focusedWordIndex + i) % 5;
            if (!completedWords[nextIdx]) {
              setFocusedWordIndex(nextIdx);
              break;
            }
          }
          return;
        }
        
        setAvailableLetters(prev => {
          const newAvailable = [...prev];
          newAvailable.splice(letterIndex, 1);
          return newAvailable;
        });
        
        const newLetters = [...currentWordLetters];
        newLetters[targetSlot] = key;
        
        setSelectedLetters(prev => {
          const newSelected = [...prev];
          newSelected[wordIdx] = newLetters;
          return newSelected;
        });
        
        const correctLetter = wordData.word[targetSlot];
        if (key !== correctLetter) {
          setWrongPlacements(prev => ({
            ...prev,
            [`${wordIdx}-${targetSlot}`]: true
          }));
          
          setTimeout(() => {
            setWrongPlacements(prev => {
              const newWrong = {...prev};
              delete newWrong[`${wordIdx}-${targetSlot}`];
              return newWrong;
            });
          }, 1000);
        }
        
        checkWordComplete(wordIdx, newLetters);
        
        const isNowFull = newLetters.every((l, i) => l || i === wordData.revealedIndex);
        if (isNowFull) {
          for (let i = 1; i <= 5; i++) {
            const nextIdx = (focusedWordIndex + i) % 5;
            if (!completedWords[nextIdx]) {
              setFocusedWordIndex(nextIdx);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [availableLetters, selectedLetters, focusedWordIndex, completedWords, allComplete, 
      showShareModal, showStatsModal, showMissionModal, showLaunchModal, 
      showBookmarkPrompt, showHowToPlayModal, showWelcomeModal, gameData.words]);

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

    // Don't allow changes to completed words
    if (completedWords[wordIdx]) {
      return;
    }
    setFocusedWordIndex(wordIdx);
    
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
  // Progress saving functions
  const saveProgress = () => {
    try {
      const progress = {
        puzzleNumber: gameData.puzzleNumber,
        selectedLetters,
        availableLetters,
        hintsRevealed,
        completedWords,
        startTime
      };
      localStorage.setItem('griddleProgress', JSON.stringify(progress));
    } catch (e) {
      console.error('Could not save progress', e);
    }
  };

  const clearProgress = () => {
    try {
      localStorage.removeItem('griddleProgress');
    } catch (e) {
      console.error('Could not clear progress', e);
    }
  };

  const resetPuzzle = () => {
    clearProgress();
    setSelectedLetters(initializeWords());
    setAvailableLetters([...allLetters]);
    setHintsRevealed(Array(5).fill(false));
    setCompletedWords(Array(5).fill(false));
    setSelectedLetter(null);
    setSelectedLetterIndex(null);
    setSelectedSlotWord(null);
    setSelectedSlotIndex(null);
    setStartTime(Date.now());
    setCompletionTime(null);
    setFocusedWordIndex(0);
  };

  const handleShare = async () => {
  const honeyEmojis = '🍯'.repeat(completedWords.filter(c => c).length);

  const shareText = `Griddle #${gameData.puzzleNumber} 🥞\n${gameData.category}\n${honeyEmojis}\n${completedWords.filter(c => c).length}/5 words\nPlay at lettergriddle.com/play\nFree & ad-free!\nPart of the Letter Griddle Games 🥞\nMore games: lettergriddle.com`;

  if (navigator.share) {
    try {
      await navigator.share({
        text: shareText
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        copyToClipboard(shareText);
      }
    }
  } else {
    copyToClipboard(shareText);
  }
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

  const formatTime = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const unlockedList = stats.unlockedAchievements || [];

  return (
    <div ref={gameContainerRef} tabIndex={0} className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-2 relative overflow-hidden outline-none" style={{ touchAction: 'manipulation', overscrollBehavior: 'none' }}>
    
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
          <a 
  href="https://lettergriddle.com" 
  className="flex items-center gap-1 text-amber-700 hover:text-amber-900 transition-colors"
  title="Back to Letter Griddle Games"
>
  <span className="text-xl">🥞</span>
  <span className="text-sm font-semibold hidden sm:inline" style={{fontFamily: 'Georgia, serif'}}>Letter Griddle Games</span>
</a>
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
            {/* LAUNCH BUTTON - NEW! */}
            <button
              onClick={() => setShowLaunchModal(true)}
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 p-1.5 rounded-full transition-all shadow-md"
              title="We're Live!"
            >
              <span className="text-lg">⭐️</span>
            </button>
            {/* SCHEDULE BUTTON - NEW! */}
<button
  onClick={() => setShowScheduleModal(true)}
  className="bg-amber-100 hover:bg-amber-200 text-amber-800 p-1.5 rounded-full transition-all shadow-md"
  title="New Year's Week Schedule"
>
  <span className="text-lg">🌠</span>
</button>
            <button
              onClick={() => setShowHowToPlayModal(true)}
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 p-1.5 rounded-full transition-all shadow-md"
              title="How to Play"
            >
              <HelpCircle size={18} />
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


        <div className="bg-white rounded-xl shadow-2xl p-2 border-2 border-amber-200">
          {/* Thin Category */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg p-1 mb-2 shadow-lg">
            <p className="text-center text-xs md:text-sm font-bold" style={{fontFamily: 'Georgia, serif'}}>{gameData.category}</p>
          </div>
          
          {allComplete && (
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-amber-400 rounded-lg p-2 mb-2 text-center shadow-lg">
              <p className="text-base font-bold text-amber-800 mb-0.5">Complete!</p>
              <p className="text-xs text-amber-700 mb-1.5">You savored this puzzle for {formatTime(completionTime)}</p>
              <p className="text-xs text-amber-600 mb-1">Next puzzle served in: {timeUntilNext}</p>
              {/* Did You Know */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-3 mb-2 border-2 border-amber-300">
                <p className="text-sm font-bold text-amber-800 mb-1 flex items-center justify-center gap-1">
                  Did You Know?
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
                   <div className={`bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-1.5 border shadow-sm ${focusedWordIndex === wordIdx && !isComplete ? 'border-amber-500 ring-2 ring-amber-300' : 'border-amber-200'}`}>
                      {isCelebrating && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-2xl animate-bounce">
                            {wordIdx === 0 ? 'Great start! 🍯' : wordIdx === 1 ? 'You\'re cooking! 🍯' : wordIdx === 2 ? 'On a roll! 🍯' : wordIdx === 3 ? 'Almost there! 🍯' : 'Amazing! 🍯'}
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
                              style={{fontFamily: 'Georgia, serif', touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent', userSelect: 'none'}}
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
                      style={{fontFamily: 'Georgia, serif', touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent', userSelect: 'none'}}
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
                <p className="text-sm text-amber-700">• Click a spot then a letter, or click a letter then a spot!</p>
                <p className="text-sm text-amber-700 mt-0.5">• Desktop? Type letters directly! See ❓ for shortcuts.</p>
                <p className="text-sm text-amber-600 mt-0.5 font-semibold">
                  ✨ Your progress saves automatically! Leave and come back anytime to complete puzzle!
                  <button 
                    onClick={resetPuzzle}
                    className="ml-2 text-amber-700 hover:text-amber-900 underline inline-flex items-center gap-1"
                  >
                    <RotateCcw size={12} /> Reset to start fresh
                  </button>
                </p>
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
              Today's Special
            </button>
          </div>
        </div>
      )}

      {/* GRAND OPENING MODAL */}
{showLaunchModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowLaunchModal(false)}>
    <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setShowLaunchModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1 hover:bg-gray-100"
        aria-label="Close"
      >
        <X size={24} />
      </button>
      
      <div className="text-center mb-4">
        <div className="text-6xl mb-3">🥞</div>
        <h2 className="text-3xl font-bold text-amber-800" style={{fontFamily: 'Georgia, serif'}}>
          Letter Griddle
        </h2>
        <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-full text-lg font-bold mt-3 shadow-lg">
          ✨ Grand Opening ✨
        </div>
        <p className="text-purple-600 text-lg mt-2 font-bold">February 2026</p>
      </div>
      
      <div className="space-y-4">
        {/* Thank You Message */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border-2 border-amber-200">
          <p className="text-amber-800 text-center leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
            Thank you for being part of Letter Griddle! 🍯 Because of you, our launch was a success!
          </p>
        </div>
        
        {/* What's Coming */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200">
          <p className="text-center text-blue-800 font-bold text-lg mb-2">🎉 Grand Opening in February 🎉</p>
          <p className="text-center text-blue-700 leading-relaxed">
            Brand new <span className="font-bold">themed games</span> are heading to the Letter Griddle Cafe to celebrate our Grand Opening!
          </p>
        </div>
        
        {/* Teaser */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
          <p className="text-center text-purple-800 font-bold text-lg mb-2">🍯 Hint...</p>
          <p className="text-center text-purple-700 leading-relaxed">
           <span className="font-bold">Winter sports</span>, <span className="font-bold">game night</span>, and <span className="font-bold">adventure</span>. These new Letter Griddle experiences will be free and ad-free <span className="font-bold">in February on our website</span>!
          </p>
        </div>
        
        {/* Stay Tuned */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full">
            <span className="text-xl">🍯</span>
            <span className="text-amber-800 font-semibold">Stay tuned for more details!</span>
            <span className="text-xl">🥞</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Footer */}
      <div className="flex justify-center gap-3 mt-6 text-3xl">
        🥞 🍯 🥞 🍯 🥞
      </div>
      
      <div className="text-center mt-4 pt-3 border-t-2 border-dashed border-amber-300">
        <p className="text-amber-700 text-sm font-semibold">🥞 New puzzle daily at 7 PM EST 🥞</p>
      </div>
    </div>
  </div>
)}

     {/* SCHEDULE MODAL */}
{showScheduleModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowScheduleModal(false)}>
    <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setShowScheduleModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1 hover:bg-gray-100"
        aria-label="Close"
      >
        <X size={24} />
      </button>
      
      <div className="text-center mb-4">
        <div className="text-5xl mb-2">🥞</div>
        <h2 className="text-2xl font-bold text-amber-800" style={{fontFamily: 'Georgia, serif'}}>
          Letter Griddle
        </h2>
        <div className="inline-block bg-gradient-to-r from-purple-500 to-violet-500 text-white px-4 py-2 rounded-full text-sm font-bold mt-2">
          🍯 THIS WEEK'S SCHEDULE 🍯
        </div>
        <p className="text-purple-600 text-sm mt-2 font-semibold">January 23 - 31</p>
      </div>
      
      <div className="space-y-2">
        <div className="bg-amber-50 rounded-xl p-3 flex items-center gap-3 border border-amber-200">
          <div className="bg-gradient-to-b from-amber-500 to-amber-600 text-white rounded-lg px-2 py-1 text-center min-w-[50px]">
            <div className="text-[10px] font-bold">FRI</div>
            <div className="text-lg font-bold">23</div>
          </div>
          <div className="flex-1 font-semibold text-amber-800">Lakehouse</div>
          <div className="text-xl">🏡</div>
        </div>
        
        <div className="bg-amber-50 rounded-xl p-3 flex items-center gap-3 border border-amber-200">
          <div className="bg-gradient-to-b from-purple-500 to-violet-600 text-white rounded-lg px-2 py-1 text-center min-w-[50px]">
            <div className="text-[10px] font-bold">SAT</div>
            <div className="text-lg font-bold">24</div>
          </div>
          <div className="flex-1 font-semibold text-amber-800">Pie</div>
          <div className="text-xl">🥧</div>
        </div>
        
        <div className="bg-amber-50 rounded-xl p-3 flex items-center gap-3 border border-amber-200">
          <div className="bg-gradient-to-b from-amber-500 to-amber-600 text-white rounded-lg px-2 py-1 text-center min-w-[50px]">
            <div className="text-[10px] font-bold">SUN</div>
            <div className="text-lg font-bold">25</div>
          </div>
          <div className="flex-1 font-semibold text-amber-800">Snacking</div>
          <div className="text-xl">🍿</div>
        </div>
        
        <div className="bg-amber-50 rounded-xl p-3 flex items-center gap-3 border border-amber-200">
          <div className="bg-gradient-to-b from-purple-500 to-violet-600 text-white rounded-lg px-2 py-1 text-center min-w-[50px]">
            <div className="text-[10px] font-bold">MON</div>
            <div className="text-lg font-bold">26</div>
          </div>
          <div className="flex-1 font-semibold text-amber-800">Chocolate</div>
          <div className="text-xl">🍫</div>
        </div>
        
        <div className="bg-amber-50 rounded-xl p-3 flex items-center gap-3 border border-amber-200">
          <div className="bg-gradient-to-b from-amber-500 to-amber-600 text-white rounded-lg px-2 py-1 text-center min-w-[50px]">
            <div className="text-[10px] font-bold">TUES</div>
            <div className="text-lg font-bold">27</div>
          </div>
          <div className="flex-1 font-semibold text-amber-800">Tablet</div>
          <div className="text-xl">📱</div>
        </div>
        
        <div className="bg-amber-50 rounded-xl p-3 flex items-center gap-3 border border-amber-200">
          <div className="bg-gradient-to-b from-purple-500 to-violet-600 text-white rounded-lg px-2 py-1 text-center min-w-[50px]">
            <div className="text-[10px] font-bold">WED</div>
            <div className="text-lg font-bold">28</div>
          </div>
          <div className="flex-1 font-semibold text-amber-800">Artwork</div>
          <div className="text-xl">🎨</div>
        </div>
        
        <div className="bg-amber-50 rounded-xl p-3 flex items-center gap-3 border border-amber-200">
          <div className="bg-gradient-to-b from-amber-500 to-amber-600 text-white rounded-lg px-2 py-1 text-center min-w-[50px]">
            <div className="text-[10px] font-bold">THURS</div>
            <div className="text-lg font-bold">29</div>
          </div>
          <div className="flex-1 font-semibold text-amber-800">Run</div>
          <div className="text-xl">🏃</div>
        </div>
        
        <div className="bg-amber-50 rounded-xl p-3 flex items-center gap-3 border border-amber-200">
          <div className="bg-gradient-to-b from-purple-500 to-violet-600 text-white rounded-lg px-2 py-1 text-center min-w-[50px]">
            <div className="text-[10px] font-bold">FRI</div>
            <div className="text-lg font-bold">30</div>
          </div>
          <div className="flex-1 font-semibold text-amber-800">Furnishings</div>
          <div className="text-xl">🛋️</div>
        </div>
        
        <div className="bg-amber-50 rounded-xl p-3 flex items-center gap-3 border border-amber-200">
          <div className="bg-gradient-to-b from-amber-500 to-amber-600 text-white rounded-lg px-2 py-1 text-center min-w-[50px]">
            <div className="text-[10px] font-bold">SAT</div>
            <div className="text-lg font-bold">31</div>
          </div>
          <div className="flex-1 font-semibold text-amber-800">Swimming</div>
          <div className="text-xl">🏊</div>
        </div>
      </div>
      
      {/* Grand Opening Teaser */}
      <div className="mt-4 pt-3 border-t-2 border-dashed border-amber-300">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-3 border-2 border-blue-300">
          <p className="text-center text-blue-800 font-bold text-sm">✨ Coming in February ✨</p>
          <p className="text-center text-blue-600 text-xs mt-1">Grand Opening celebration with new themed games!</p>
        </div>
      </div>
      
      <div className="text-center mt-3">
        <p className="text-amber-700 text-sm font-semibold">🥞 New puzzle daily at 7 PM EST 🥞</p>
      </div>
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
                <h3 className="font-bold text-amber-800 mb-2">⌨️ Keyboard Shortcuts</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Type <strong>A-Z</strong> to place letters</li>
                  <li>• <strong>Arrow Up/Down</strong> to switch words</li>
                  <li>• <strong>Tab</strong> to jump to next word</li>
                  <li>• <strong>Backspace</strong> to remove a letter</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border-2 border-amber-200">
                <h3 className="font-bold text-amber-800 mb-2">☕ Enjoy the Puzzle!</h3>
                <p className="text-gray-700">Have fun and enjoy your favorite daily pancake-inspired word game! ☕🥞</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border-2 border-amber-200">
                <h3 className="font-bold text-amber-800 mb-2">✨ New Feature!</h3>
                <p className="text-gray-700">Your progress saves automatically! You can leave and come back anytime to finish the puzzle. Click <span className="font-bold">Reset to start fresh</span> if you want to start over.</p>
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
              Share Your Results!
            </h2>
            
            <div className="bg-amber-50 rounded-xl p-6 mb-6 font-mono text-sm">
              <div className="whitespace-pre-wrap">
                {`Griddle #${gameData.puzzleNumber} 🥞
${gameData.category}
${'🍯'.repeat(completedWords.filter(c => c).length)}
${completedWords.filter(c => c).length}/5 words
Play at lettergriddle.com/play
Free & ad-free!
Part of the Letter Griddle Games 🥞
More games: lettergriddle.com`}
              </div>
            </div>

            <button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-4 rounded-full font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {shareCopied ? '✓ Copied!' : <><Share2 size={20} /> Copy to Clipboard</>}
            </button>
            {/* Share nudge - visible only in modal, not copied */}
            <p className="mt-4 text-center text-sm text-amber-700" style={{fontFamily: 'Georgia, serif'}}>
              Love the game? Share it with a friend who hasn't played yet! 🥞
            </p>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4" onClick={() => setShowStatsModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative my-8 max-h-[85vh] overflow-y-auto" style={{WebkitOverflowScrolling: 'touch'}} onClick={(e) => e.stopPropagation()}>
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
              
              <div className="space-y-3">
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
{' | '}
            <a href="https://www.littlelettergriddle.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 underline">
              🌙 Little Letter Griddle
            </a>
  </div>
</div>

{/* Background Music */}
      <audio
          ref={audioRef}
          onEnded={handleTrackEnded}
          preload="none"
        /> 
    </div>
  );
};

export default PancakeWordGame;