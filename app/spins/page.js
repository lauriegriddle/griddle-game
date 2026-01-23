"use client";
import React, { useState, useEffect } from 'react';
import { Disc3, Music, HelpCircle, Share2, X, Shuffle, BarChart3, Award } from 'lucide-react';

const SpinsGame = () => {
  // All puzzles - songs with food in the title!
  const puzzles = [
    {
      puzzleNumber: 1,
      word: "STRAWBERRY",
      songTitle: "_____ Fields Forever",
      artist: "The Beatles",
      year: "1967",
      hint: "This psychedelic classic was inspired by a Salvation Army children's home in Liverpool where John Lennon played as a child.",
      didYouKnow: "The song was recorded during the Sgt. Pepper sessions but released as a double A-side single with 'Penny Lane' instead of appearing on the album.",
      revealedIndex: 4
    },
    {
      puzzleNumber: 2,
      word: "EAT",
      songTitle: "Just _____ It",
      artist: "Weird Al Yankovic",
      year: "1984",
      hint: "This parody king turned Michael Jackson's 'Beat It' into a hilarious anthem about overeating and picky eaters.",
      didYouKnow: "Michael Jackson personally approved this parody and even let Weird Al use the same set from the original 'Beat It' music video.",
      revealedIndex: 1
    },
    {
      puzzleNumber: 3,
      word: "CHERRY",
      songTitle: "_____ Bomb",
      artist: "The Runaways",
      year: "1976",
      hint: "This explosive rock anthem was performed by an all-female band and later covered in the Guardians of the Galaxy soundtrack.",
      didYouKnow: "Joan Jett was only 15 years old when The Runaways formed, making them pioneers for young women in rock music.",
      revealedIndex: 2
    },
    {
      puzzleNumber: 4,
      word: "PEACHES",
      songTitle: "_____",
      artist: "Justin Bieber ft. Daniel Caesar & Giveon",
      year: "2021",
      hint: "This smooth R&B track references a fruit from Georgia and features two guest vocalists known for their silky voices.",
      didYouKnow: "The song debuted at #1 on the Billboard Hot 100, becoming Justin Bieber's sixth chart-topper.",
      revealedIndex: 3
    },
    {
      puzzleNumber: 5,
      word: "SUGAR",
      songTitle: "_____, _____",
      artist: "The Archies",
      year: "1969",
      hint: "This bubblegum pop hit was performed by a fictional cartoon band and became the #1 song of the entire year.",
      didYouKnow: "The Archies never performed live because they were animated characters! The vocals were actually sung by Ron Dante, who also sang the jingle for Domino's Pizza.",
      revealedIndex: 2
    },
    {
      puzzleNumber: 6,
      word: "HONEY",
      songTitle: "_____ Pie",
      artist: "The Beatles",
      year: "1968",
      hint: "This upbeat track from the White Album is a playful tribute to British music hall style.",
      didYouKnow: "Paul McCartney wrote this as a parody of old-fashioned music hall songs his father used to enjoy.",
      revealedIndex: 2
    },
    {
      puzzleNumber: 7,
      word: "SUGAR",
      songTitle: "Pour Some _____ on Me",
      artist: "Def Leppard",
      year: "1987",
      hint: "This rock anthem from the Hysteria album became one of the defining songs of the hair metal era.",
      didYouKnow: "The song almost didn't make the album.  It was written in just two days during the final recording sessions.",
      revealedIndex: 0
    },
    {
      puzzleNumber: 8,
      word: "MARGARITA",
      songTitle: "_____ville",
      artist: "Jimmy Buffett",
      year: "1977",
      hint: "This island-loving singer created an entire lifestyle brand around beach vibes and this famous cocktail destination.",
      didYouKnow: "Jimmy Buffett's fans call themselves 'Parrotheads' and have raised millions for charity through their fan clubs.",
      revealedIndex: 4
    },
    {
      puzzleNumber: 9,
      word: "CHAMPAGNE",
      songTitle: "_____ Supernova",
      artist: "Oasis",
      year: "1996",
      hint: "This Britpop anthem features nonsensical lyrics that songwriter Noel Gallagher admitted don't mean anything specific.",
      didYouKnow: "Despite being over 7 minutes long, the song became one of Oasis's biggest hits and a concert staple.",
      revealedIndex: 5
    },
    {
      puzzleNumber: 10,
      word: "RASPBERRY",
      songTitle: "_____ Beret",
      artist: "Prince",
      year: "1985",
      hint: "The Purple One sang about a distinctive hat worn by a girl he met at a secondhand store.",
      didYouKnow: "Prince reportedly wrote this song in just one day, and it became one of his signature hits from the Around the World in a Day album.",
      revealedIndex: 3
    },
    {
      puzzleNumber: 11,
      word: "COCONUT",
      songTitle: "_____",
      artist: "Harry Nilsson",
      year: "1971",
      hint: "This quirky novelty song advises putting lime in a tropical fruit and features a doctor's unusual prescription.",
      didYouKnow: "The entire song uses only one chord (C7) throughout, making it one of the most harmonically simple hit songs ever.",
      revealedIndex: 4
    },
    {
      puzzleNumber: 12,
      word: "ONIONS",
      songTitle: "Green _____",
      artist: "Booker T. and the M.G.'s",
      year: "1962",
      hint: "This iconic instrumental became one of the most recognizable organ riffs in music history, recorded by a Memphis house band.",
      didYouKnow: "The song was recorded in just one take as a B-side throwaway, but radio DJs flipped the record and made it a #1 hit. The band name 'M.G.'s' stands for 'Memphis Group.'",
      revealedIndex: 3
    },
    {
      puzzleNumber: 13,
      word: "SUGARPIE",
      songTitle: "I Can't Help Myself (_____ _____bunch)",
      artist: "The Four Tops",
      year: "1965",
      hint: "This Motown classic features one of the most irresistible hooks in music history and was recorded in the legendary Studio A in Detroit.",
      didYouKnow: "The Four Tops kept the same lineup for over 40 years - Levi Stubbs, Abdul 'Duke' Fakir, Renaldo 'Obie' Benson, and Lawrence Payton never had a single member change!",
      revealedIndex: 5
    },
    {
      puzzleNumber: 14,
      word: "BLUEBERRY",
      songTitle: "_____ Hill",
      artist: "Fats Domino",
      year: "1956",
      hint: "This rock and roll pioneer from New Orleans turned this 1940 song into a massive hit that helped define early rock music.",
      didYouKnow: "Fats Domino's version sold over 5 million copies, but the song was originally written in 1940 and recorded by Gene Autry. The 'hill' in the song refers to a real place in Washington, D.C.",
      revealedIndex: 4
    },
    {
      puzzleNumber: 15,
      word: "PIE",
      songTitle: "American _____",
      artist: "Don McLean",
      year: "1971",
      hint: "This epic 8-minute song chronicles the history of rock and roll, famously referring to 'the day the music died.'",
      didYouKnow: "Don McLean has never fully explained all the lyrics, but 'the day the music died' refers to February 3, 1959, when Buddy Holly, Ritchie Valens, and The Big Bopper died in a plane crash.",
      revealedIndex: 1
    },
    {
      puzzleNumber: 16,
      word: "CHEESEBURGER",
      songTitle: "_____ in Paradise",
      artist: "Jimmy Buffett",
      year: "1978",
      hint: "This island-loving singer wrote this ode to his favorite food while dreaming of beach life and simple pleasures.",
      didYouKnow: "Jimmy Buffett actually opened a restaurant chain called 'Cheeseburger in Paradise' based on this song! The chain had locations across the United States.",
      revealedIndex: 6
    },
    {
      puzzleNumber: 17,
      word: "GRAPEVINE",
      songTitle: "I Heard It Through the _____",
      artist: "Marvin Gaye",
      year: "1968",
      hint: "This Motown masterpiece about rumors and heartbreak became one of the label's biggest hits and showcased this singer's incredible vocal range.",
      didYouKnow: "Gladys Knight & the Pips actually recorded this song first in 1967, but Marvin Gaye's version became the more famous one and was the best-selling Motown single of the 1960s.",
      revealedIndex: 5
    },
    {
      puzzleNumber: 18,
      word: "BUTTERCUP",
      songTitle: "Build Me Up _____",
      artist: "The Foundations",
      year: "1968",
      hint: "This British soul band created one of the catchiest songs of the '60s about a girl who keeps letting the singer down.",
      didYouKnow: "The song was featured in the opening scene of 'There's Something About Mary' and experienced a huge revival in popularity thanks to the 1998 film.",
      revealedIndex: 4
    },
    {
      puzzleNumber: 19,
      word: "BREAD",
      songTitle: "_____ and Butter",
      artist: "The Newbeats",
      year: "1964",
      hint: "This trio from Georgia had a unique sound thanks to Larry Henley's distinctive falsetto voice on this catchy hit.",
      didYouKnow: "Larry Henley, who sang the high parts, later co-wrote 'Wind Beneath My Wings' which became a massive hit for Bette Midler in 1989.",
      revealedIndex: 2
    },
    {
      puzzleNumber: 20,
      word: "MILK",
      songTitle: "No _____ Today",
      artist: "Herman's Hermits",
      year: "1966",
      hint: "This British Invasion band sang about a lonely man whose empty doorstep symbolizes his lost love.",
      didYouKnow: "In 1960s Britain, milk was delivered daily to homes in glass bottles. An empty doorstep with no milk delivery meant the house was empty, a powerful metaphor for loneliness.",
      revealedIndex: 2
    }
  ];

  // Get a random puzzle for unlimited play
  const getRandomPuzzle = () => {
    const randomIndex = Math.floor(Math.random() * puzzles.length);
    return puzzles[randomIndex];
  };

  const [gameData, setGameData] = useState(() => getRandomPuzzle());

  // Achievements
  const achievements = [
    { id: 'first_spin', name: 'First Spin', icon: '💿', description: 'Complete your first puzzle', requirement: (stats) => stats.puzzlesCompleted >= 1 },
    { id: 'vinyl_collector', name: 'Vinyl Collector', icon: '📀', description: 'Complete 5 puzzles', requirement: (stats) => stats.puzzlesCompleted >= 5 },
    { id: 'record_store_regular', name: 'Record Store Regular', icon: '🎸', description: 'Complete 10 puzzles', requirement: (stats) => stats.puzzlesCompleted >= 10 },
    { id: 'speed_demon', name: 'Speed Demon', icon: '⚡', description: 'Complete under 30 seconds', requirement: (stats) => stats.fastestTime && stats.fastestTime < 30 },
    { id: 'no_hints', name: 'Perfect Pitch', icon: '🎯', description: 'Complete without hints', requirement: (stats) => stats.noHintPuzzles >= 1 },
    { id: 'three_day_streak', name: 'On a Roll', icon: '🔥', description: '3-day streak', requirement: (stats) => stats.currentStreak >= 3 },
    { id: 'week_streak', name: 'Chart Topper', icon: '🏆', description: '7-day streak', requirement: (stats) => stats.currentStreak >= 7 },
  ];

  const initializeWord = () => {
    const letters = Array(gameData.word.length).fill('');
    letters[gameData.revealedIndex] = gameData.word[gameData.revealedIndex];
    return letters;
  };

  const getAvailableLetters = () => {
    return gameData.word
      .split('')
      .filter((_, idx) => idx !== gameData.revealedIndex)
      .sort();
  };

  const [placedLetters, setPlacedLetters] = useState(initializeWord());
  const [availableLetters, setAvailableLetters] = useState(getAvailableLetters());
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedLetterIndex, setSelectedLetterIndex] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [wrongPlacements, setWrongPlacements] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [completionTime, setCompletionTime] = useState(null);
  const [newAchievements, setNewAchievements] = useState([]);

  // Stats state
  const [stats, setStats] = useState(() => {
    if (typeof window === 'undefined') return {
      puzzlesCompleted: 0,
      currentStreak: 0,
      maxStreak: 0,
      fastestTime: null,
      lastPlayedDate: null,
      noHintPuzzles: 0,
      unlockedAchievements: []
    };
    try {
      const saved = localStorage.getItem('spinsStats');
      return saved ? JSON.parse(saved) : {
        puzzlesCompleted: 0,
        currentStreak: 0,
        maxStreak: 0,
        fastestTime: null,
        lastPlayedDate: null,
        noHintPuzzles: 0,
        unlockedAchievements: []
      };
    } catch {
      return {
        puzzlesCompleted: 0,
        currentStreak: 0,
        maxStreak: 0,
        fastestTime: null,
        lastPlayedDate: null,
        noHintPuzzles: 0,
        unlockedAchievements: []
      };
    }
  });

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

  // Check if word is complete
  useEffect(() => {
    const filledWord = placedLetters.join('');
    if (filledWord === gameData.word && !isComplete) {
      const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
      setCompletionTime(timeInSeconds);
      setIsComplete(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);

      // Update stats
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const lastPlayed = stats.lastPlayedDate;

      const newStats = {
        puzzlesCompleted: stats.puzzlesCompleted + 1,
        currentStreak: lastPlayed === yesterday || lastPlayed === today ? stats.currentStreak + 1 : 1,
        maxStreak: Math.max(stats.maxStreak, lastPlayed === yesterday || lastPlayed === today ? stats.currentStreak + 1 : 1),
        fastestTime: stats.fastestTime ? Math.min(stats.fastestTime, timeInSeconds) : timeInSeconds,
        lastPlayedDate: today,
        noHintPuzzles: !hintRevealed ? (stats.noHintPuzzles || 0) + 1 : (stats.noHintPuzzles || 0),
        unlockedAchievements: stats.unlockedAchievements || []
      };

      newStats.unlockedAchievements = checkAchievements(newStats);

      setStats(newStats);
      try {
        localStorage.setItem('spinsStats', JSON.stringify(newStats));
      } catch (e) {
        console.error('Could not save stats', e);
      }
    }
  }, [placedLetters, gameData.word, isComplete, startTime, stats, hintRevealed]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isComplete) return;
      
      const key = e.key.toUpperCase();
      
      // Check if the pressed key is an available letter
      const letterIndex = availableLetters.findIndex(letter => letter === key);
      
      if (letterIndex !== -1) {
        // If a slot is selected, place the letter there
        if (selectedSlot !== null) {
          placeLetter(selectedSlot, key, letterIndex);
          setSelectedSlot(null);
        } else {
          // Find first empty slot and place the letter there
          const emptySlotIndex = placedLetters.findIndex((letter, idx) => 
            letter === '' && idx !== gameData.revealedIndex
          );
          if (emptySlotIndex !== -1) {
            placeLetter(emptySlotIndex, key, letterIndex);
          }
        }
      }
      
      // Backspace to remove last placed letter
      if (e.key === 'Backspace') {
        // Find the last filled slot (excluding revealed)
        for (let i = placedLetters.length - 1; i >= 0; i--) {
          if (placedLetters[i] && i !== gameData.revealedIndex) {
            const letterToReturn = placedLetters[i];
            setAvailableLetters(prev => [...prev, letterToReturn].sort());
            setPlacedLetters(prev => {
              const newPlaced = [...prev];
              newPlaced[i] = '';
              return newPlaced;
            });
            break;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [availableLetters, selectedSlot, placedLetters, isComplete, gameData.revealedIndex]);

  const handleLetterClick = (letter, index) => {
    // If a slot is already selected, place the letter there
    if (selectedSlot !== null) {
      placeLetter(selectedSlot, letter, index);
      setSelectedSlot(null);
    } else {
      // Otherwise, select this letter
      setSelectedLetter(letter);
      setSelectedLetterIndex(index);
    }
  };

  // Helper function to place a letter in a slot
  const placeLetter = (slotIdx, letter, letterIdx) => {
    setAvailableLetters(prev => {
      const newAvailable = [...prev];
      newAvailable.splice(letterIdx, 1);
      return newAvailable;
    });

    setPlacedLetters(prev => {
      const newPlaced = [...prev];
      newPlaced[slotIdx] = letter;
      return newPlaced;
    });

    const correctLetter = gameData.word[slotIdx];
    if (letter !== correctLetter) {
      setWrongPlacements(prev => ({ ...prev, [slotIdx]: true }));
      setTimeout(() => {
        setWrongPlacements(prev => {
          const newWrong = { ...prev };
          delete newWrong[slotIdx];
          return newWrong;
        });
      }, 1000);
    }

    setSelectedLetter(null);
    setSelectedLetterIndex(null);
  };

  const handleSlotClick = (slotIdx) => {
    if (slotIdx === gameData.revealedIndex) return;

    const currentLetter = placedLetters[slotIdx];

    if (currentLetter) {
      // Remove letter and return to pool
      setAvailableLetters(prev => [...prev, currentLetter].sort());
      setPlacedLetters(prev => {
        const newPlaced = [...prev];
        newPlaced[slotIdx] = '';
        return newPlaced;
      });
      setWrongPlacements(prev => {
        const newWrong = { ...prev };
        delete newWrong[slotIdx];
        return newWrong;
      });
      setSelectedSlot(null);
      setSelectedLetter(null);
      setSelectedLetterIndex(null);
    } else if (selectedLetter !== null) {
      // A letter is selected, place it here
      placeLetter(slotIdx, selectedLetter, selectedLetterIndex);
      setSelectedSlot(null);
    } else {
      // No letter selected, select this slot (tap slot first, then letter)
      setSelectedSlot(slotIdx);
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

  // Play again function for unlimited play
  const playAgain = () => {
    const newPuzzle = getRandomPuzzle();
    setGameData(newPuzzle);
    
    // Reset all game state
    const newLetters = Array(newPuzzle.word.length).fill('');
    newLetters[newPuzzle.revealedIndex] = newPuzzle.word[newPuzzle.revealedIndex];
    setPlacedLetters(newLetters);
    
    const newAvailable = newPuzzle.word
      .split('')
      .filter((_, idx) => idx !== newPuzzle.revealedIndex)
      .sort();
    setAvailableLetters(newAvailable);
    
    setSelectedLetter(null);
    setSelectedLetterIndex(null);
    setSelectedSlot(null);
    setHintRevealed(false);
    setIsComplete(false);
    setWrongPlacements({});
    setCompletionTime(null);
    setStartTime(Date.now());
  };

  const handleShare = async () => {
    const minutes = Math.floor(completionTime / 60);
    const seconds = completionTime % 60;
    const timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

    const shareText = `🎵 Spins #${gameData.puzzleNumber} 💿
"${gameData.songTitle}" by ${gameData.artist}
✅ Solved in ${timeStr}!
${hintRevealed ? '💡 Used hint' : '🌟 No hints!'}
Play at lettergriddle.com/spins

Free & ad-free!
Part of the Letter Griddle Games 🥞
More games: lettergriddle.com`;

    // Try native sharing first (works on mobile!)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Spins #${gameData.puzzleNumber}`,
          text: shareText,
        });
        return; // Success - exit function
      } catch (err) {
        // User cancelled or error - fall through to clipboard
        if (err.name === 'AbortError') return; // User cancelled, don't show copied message
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

  const formatTime = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const unlockedList = stats.unlockedAchievements || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed top-4 left-4 text-6xl opacity-10">💿</div>
      <div className="fixed top-4 right-4 text-6xl opacity-10">🎵</div>
      <div className="fixed bottom-4 left-4 text-6xl opacity-10">🎸</div>
      <div className="fixed bottom-4 right-4 text-6xl opacity-10">🎧</div>

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 40 }).map((_, i) => {
            const emojis = ['🎵', '🎶', '🎸', '🎤', '🎹', '💿', '🎧', '🎷', '🎺'];
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

      {/* Achievement Popup */}
      {newAchievements.length > 0 && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
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
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-purple-300 text-sm mb-1 tracking-wider">Letter Griddle</p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Disc3 
              className="text-purple-400 w-10 h-10" 
              style={{ animation: 'spin 4s linear infinite' }}
            />
            <h1 className="text-4xl font-bold text-white tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
              Spins
            </h1>
            <Disc3 
              className="text-purple-400 w-10 h-10" 
              style={{ animation: 'spin 4s linear infinite' }}
            />
            <button
              onClick={() => setShowStatsModal(true)}
              className="ml-2 bg-purple-600/50 hover:bg-purple-600 text-white p-2 rounded-full transition-all relative"
              title="View Statistics"
            >
              <BarChart3 size={20} />
              {unlockedList.length > 0 && (
                <div className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">
                  {unlockedList.length}
                </div>
              )}
            </button>
          </div>
          <p className="text-purple-300 text-sm">Spell the food hidden in the song title</p>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-purple-500/30 shadow-2xl">
          {/* Song Title Display */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4 mb-6 border border-purple-500/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Music className="text-purple-400 w-5 h-5" />
              <span className="text-purple-300 text-xs uppercase tracking-wider">Now Playing</span>
              <Music className="text-purple-400 w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-white text-center" style={{ fontFamily: 'Georgia, serif' }}>
              "{gameData.songTitle}"
            </p>
            <p className="text-purple-300 text-center mt-1">by {gameData.artist} ({gameData.year})</p>
          </div>

          {/* Hint Section */}
          <div className="mb-6">
            <button
              onClick={() => setHintRevealed(!hintRevealed)}
              className="w-full flex items-center justify-center gap-2 text-sm bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 px-4 py-2 rounded-full transition-all border border-purple-500/30"
            >
              <HelpCircle size={16} />
              {hintRevealed ? 'Hide Hint' : 'Need a Hint?'}
            </button>
            {hintRevealed && (
              <div className="mt-3 bg-slate-700/50 rounded-xl p-4 border border-purple-500/20">
                <p className="text-purple-100 text-sm leading-relaxed">{gameData.hint}</p>
              </div>
            )}
          </div>

          {/* Letter Slots */}
          <div className="flex gap-2 justify-center flex-wrap mb-8">
            {gameData.word.split('').map((letter, idx) => {
              const isRevealed = idx === gameData.revealedIndex;
              const currentLetter = placedLetters[idx];
              const isWrong = wrongPlacements[idx];
              const isSlotSelected = selectedSlot === idx;

              return (
                <div
                  key={idx}
                  onClick={() => !isComplete && handleSlotClick(idx)}
                  className={`w-10 h-12 flex items-center justify-center text-xl font-bold rounded-lg border-2 transition-all duration-300 shadow-lg
                    ${isComplete ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 text-white scale-105' : ''}
                    ${isWrong ? 'bg-gradient-to-br from-red-500 to-red-600 border-red-400 text-white animate-pulse' : ''}
                    ${!isWrong && !isComplete && isRevealed ? 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400 text-white' : ''}
                    ${!isWrong && !isComplete && !isRevealed && currentLetter ? 'bg-gradient-to-br from-purple-500 to-purple-600 border-purple-400 text-white cursor-pointer hover:scale-105' : ''}
                    ${!isWrong && !isComplete && !isRevealed && !currentLetter && isSlotSelected ? 'bg-gradient-to-br from-pink-500 to-purple-600 border-pink-400 text-white scale-110 ring-2 ring-pink-300' : ''}
                    ${!isWrong && !isComplete && !isRevealed && !currentLetter && !isSlotSelected ? 'bg-slate-700 border-slate-600 text-transparent cursor-pointer hover:border-purple-400 hover:scale-105' : ''}`}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {currentLetter}
                </div>
              );
            })}
          </div>

          {/* Completion Section */}
          {isComplete ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-4 border border-green-500/30 text-center">
                <p className="text-2xl font-bold text-white mb-1">🎉 You Got It! 🎉</p>
                <p className="text-green-300">Solved in {formatTime(completionTime)}</p>
              </div>

              {/* Did You Know */}
              <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-xl p-4 border border-amber-500/30">
                <p className="text-amber-300 font-bold mb-2 flex items-center justify-center gap-2">
                  <span>💿</span> Did You Know?
                </p>
                <p className="text-amber-100 text-sm leading-relaxed text-center">
                  {gameData.didYouKnow}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={playAgain}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  🎵 Another Spin
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Share2 size={20} />
                  Share
                </button>
              </div>
            </div>
          ) : (
            /* Letter Pool */
            <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl">🎧</span>
                <h3 className="text-lg font-bold text-purple-200" style={{ fontFamily: 'Georgia, serif' }}>
                  Pick Your Letters
                </h3>
                <span className="text-2xl">🎧</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mb-3">
                {availableLetters.map((letter, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLetterClick(letter, idx)}
                    className={`w-10 h-10 rounded-lg text-lg font-bold transition-all duration-200 shadow-md
                      ${selectedLetter === letter && selectedLetterIndex === idx
                        ? 'bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-pink-300 text-white scale-110 shadow-lg'
                        : 'bg-gradient-to-br from-purple-600 to-purple-700 border border-purple-500 text-white hover:scale-105'}`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {letter}
                  </button>
                ))}
              </div>
              {availableLetters.length > 0 && (
                <div className="text-center">
                  <button
                    onClick={shuffleLetters}
                    className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition-all inline-flex items-center gap-1"
                  >
                    <Shuffle size={14} />
                    Shuffle
                  </button>
                </div>
              )}
              {availableLetters.length === 0 && !isComplete && (
                <p className="text-purple-300 text-center text-sm">All letters placed! Check your answer above.</p>
              )}
            </div>
          )}

          {/* Instructions */}
          {!isComplete && (
            <div className="mt-4 text-center text-purple-300 text-sm space-y-1">
              <p>🎵 Click a letter, then click a slot — or vice versa!</p>
              <p className="text-purple-400 text-xs">⌨️ Or just type letters on your keyboard</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-purple-400 text-xs">
          <a 
            href="https://lettergriddle.com" 
            className="inline-flex items-center gap-1 text-purple-300 hover:text-white transition-colors mb-2"
          >
            <span className="text-lg">🥞</span>
            <span className="underline">More Letter Griddle Games</span>
            <span className="text-lg">🥞</span>
          </a>
          <p className="mt-2">
            © {new Date().getFullYear()} Letter Griddle. All rights reserved.
          </p>
          <p className="mt-1">
            <a href="/privacy" className="hover:text-purple-300 underline">Privacy Policy</a>
            {' | '}
            <a href="/terms" className="hover:text-purple-300 underline">Terms of Service</a>
          </p>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-purple-500/30 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>
              Share Your Score! 🎵
            </h2>

            <div className="bg-slate-700 rounded-xl p-4 mb-4 font-mono text-sm text-purple-100">
              <div className="whitespace-pre-wrap">
{`🎵 Spins #${gameData.puzzleNumber} 💿
"${gameData.songTitle}" by ${gameData.artist}
✅ Solved in ${formatTime(completionTime)}!
${hintRevealed ? '💡 Used hint' : '🌟 No hints!'}
Play at lettergriddle.com/spins

Free & ad-free!
Part of the Letter Griddle Games 🥞
More games: lettergriddle.com`}
              </div>
            </div>

            <button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {shareCopied ? '✓ Copied!' : <><Share2 size={20} /> Copy to Clipboard</>}
            </button>
          </div>
        </div>
      )}

      {/* Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4 overflow-y-auto" onClick={() => setShowStatsModal(false)}>
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-purple-500/30 relative my-8" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowStatsModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6 text-center" style={{ fontFamily: 'Georgia, serif' }}>
              Your Statistics 📊
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-900/50 rounded-xl p-4 text-center border border-purple-500/30">
                <div className="text-3xl font-bold text-white">{stats.puzzlesCompleted}</div>
                <div className="text-sm text-purple-300 mt-1">Puzzles Solved</div>
              </div>

              <div className="bg-purple-900/50 rounded-xl p-4 text-center border border-purple-500/30">
                <div className="text-3xl font-bold text-white">{stats.currentStreak}</div>
                <div className="text-sm text-purple-300 mt-1">Current Streak 🔥</div>
              </div>

              <div className="bg-purple-900/50 rounded-xl p-4 text-center border border-purple-500/30">
                <div className="text-3xl font-bold text-white">{stats.maxStreak}</div>
                <div className="text-sm text-purple-300 mt-1">Max Streak</div>
              </div>

              <div className="bg-purple-900/50 rounded-xl p-4 text-center border border-purple-500/30">
                <div className="text-3xl font-bold text-white">{formatTime(stats.fastestTime)}</div>
                <div className="text-sm text-purple-300 mt-1">Fastest Time ⚡</div>
              </div>
            </div>

            <div className="border-t border-purple-500/30 pt-6">
              <h3 className="text-xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
                <Award size={20} />
                Achievements
              </h3>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {achievements.map(achievement => {
                  const isUnlocked = unlockedList.includes(achievement.id);
                  return (
                    <div
                      key={achievement.id}
                      className={`rounded-xl p-3 flex items-center gap-3 ${
                        isUnlocked
                          ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50'
                          : 'bg-slate-700/50 border border-slate-600 opacity-50'
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className={`font-bold ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                          {achievement.name}
                        </div>
                        <div className={`text-xs ${isUnlocked ? 'text-purple-300' : 'text-slate-500'}`}>
                          {achievement.description}
                        </div>
                      </div>
                      {isUnlocked && <div className="text-green-400 text-xl">✓</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-slate-500">
              Stats saved locally on your device
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinsGame;