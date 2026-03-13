"use client";
import React, { useState, useEffect } from 'react';

export default function JukeboxGame() {
  // Puzzle Data
  const puzzles = [
    {
      category: "Compound Chaos",
      words: ["LIGHT", "HOUSE", "WORK", "OUT"],
      hints: ["The opposite of dark", "A place where people live", "What you do at a job", "The opposite of in"]
    },
    {
      category: "Animal Kingdom",
      words: ["CAT", "FISH", "TANK", "TOP"],
      hints: ["A furry feline pet", "Creature with gills and fins", "A large container or military vehicle", "The highest point"]
    },
    {
      category: "Weather Report",
      words: ["SUN", "FLOWER", "POWER", "HOUSE"],
      hints: ["The star at the center of our solar system", "The colorful part of a plant", "Strength or energy", "A place where people live"]
    },
    {
      category: "Color Wheel",
      words: ["BLUE", "BERRY", "PIE", "CHART"],
      hints: ["The color of the sky", "A small round fruit", "A baked dessert with filling", "A visual diagram of data"]
    },
    {
      category: "Time Warp",
      words: ["DAY", "DREAM", "CATCHER", "MITT"],
      hints: ["24 hours", "What happens when you sleep", "Someone who catches things", "A glove for baseball"]
    },
    {
      category: "Sweet Treats",
      words: ["FROZEN", "YOGURT", "SHOP", "TALK"],
      hints: ["Turned to ice", "A cultured dairy product", "A store", "To speak with someone"]
    },
    {
      category: "Action Heroes",
      words: ["DIE", "HARD", "ROCK", "BOTTOM"],
      hints: ["To cease living", "Not soft", "A stone or music genre", "The lowest part"]
    },
    {
      category: "Cafe Recipe",
      words: ["CINNAMON", "ROLL", "CALL", "BACK"],
      hints: ["A warm spice from tree bark", "To rotate or a bread type", "To phone someone", "The rear or to return"]
    },
    {
      category: "Morning Rush",
      words: ["COFFEE", "BREAK", "FAST", "FOOD"],
      hints: ["A caffeinated drink", "A pause or to shatter", "Quick or to not eat", "What you eat"]
    },
    {
      category: "Bedtime Stories",
      words: ["SWEET", "TOOTH", "FAIRY", "TALE"],
      hints: ["Sugary or kind", "Found in your mouth", "A magical creature", "A story"]
    }
  ];

  // Game state
  const [currentView, setCurrentView] = useState('menu');
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(-1);
  const [guesses, setGuesses] = useState([]);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [completedWords, setCompletedWords] = useState([false, false, false, false]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [hintsRevealed, setHintsRevealed] = useState([false, false, false, false]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [shakeWord, setShakeWord] = useState(-1);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedLetterIndex, setSelectedLetterIndex] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [shareStatus, setShareStatus] = useState(null);

  // Stats state
  const [stats, setStats] = useState({
    totalPlays: 0,
    tracksCompleted: 0,
    lastPlayed: null
  });
  const [completedPuzzles, setCompletedPuzzles] = useState([]);

  // Load stats from localStorage on mount
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem('jukeboxStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
      const savedCompleted = localStorage.getItem('jukeboxCompleted');
      if (savedCompleted) {
        setCompletedPuzzles(JSON.parse(savedCompleted));
      }
    } catch (e) {
      console.error('Error loading stats:', e);
    }
  }, []);

  // Save stats to localStorage
  const saveStats = (newStats) => {
    try {
      localStorage.setItem('jukeboxStats', JSON.stringify(newStats));
    } catch (e) {
      console.error('Error saving stats:', e);
    }
  };

  const saveCompletedPuzzles = (completed) => {
    try {
      localStorage.setItem('jukeboxCompleted', JSON.stringify(completed));
    } catch (e) {
      console.error('Error saving completed puzzles:', e);
    }
  };

  // Get current puzzle
  const currentPuzzle = currentPuzzleIndex >= 0 ? puzzles[currentPuzzleIndex] : null;

  // Start a puzzle
  const startPuzzle = (index) => {
    const puzzle = puzzles[index];
    setCurrentPuzzleIndex(index);

    const newGuesses = puzzle.words.map((word) => {
      const arr = Array(word.length).fill('');
      arr[0] = word[0];
      return arr;
    });
    setGuesses(newGuesses);

    const letters = [];
    puzzle.words.forEach((word) => {
      for (let i = 1; i < word.length; i++) {
        letters.push(word[i]);
      }
    });
    letters.sort();
    setAvailableLetters(letters);

    setCompletedWords([false, false, false, false]);
    setHintsRevealed([false, false, false, false]);
    setCurrentWordIndex(0);
    setCurrentView('game');

    const newStats = {
      ...stats,
      totalPlays: stats.totalPlays + 1,
      lastPlayed: new Date().toISOString()
    };
    setStats(newStats);
    saveStats(newStats);
  };

  // Handle keyboard input
  useEffect(() => {
    if (currentView !== 'game') return;

    const handleKeyPress = (e) => {
      if (completedWords[currentWordIndex]) return;

      const key = e.key.toUpperCase();

      if (key === 'BACKSPACE') {
        e.preventDefault();
        setSelectedLetter(null);
        setSelectedLetterIndex(null);
        const newGuesses = [...guesses];
        const newAvailable = [...availableLetters];
        for (let i = newGuesses[currentWordIndex].length - 1; i >= 1; i--) {
          if (newGuesses[currentWordIndex][i] !== '') {
            const letter = newGuesses[currentWordIndex][i];
            newGuesses[currentWordIndex][i] = '';
            newAvailable.push(letter);
            newAvailable.sort();
            setGuesses(newGuesses);
            setAvailableLetters(newAvailable);
            break;
          }
        }
      } else if (key === 'ENTER') {
        e.preventDefault();
        setSelectedLetter(null);
        setSelectedLetterIndex(null);
        checkWord();
      } else if (/^[A-Z]$/.test(key)) {
        setSelectedLetter(null);
        setSelectedLetterIndex(null);
        const letterIdx = availableLetters.indexOf(key);
        if (letterIdx !== -1) {
          for (let i = 1; i < guesses[currentWordIndex].length; i++) {
            if (guesses[currentWordIndex][i] === '') {
              const newGuesses = [...guesses];
              newGuesses[currentWordIndex][i] = key;
              const newAvailable = [...availableLetters];
              newAvailable.splice(letterIdx, 1);
              setGuesses(newGuesses);
              setAvailableLetters(newAvailable);
              break;
            }
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentView, currentWordIndex, guesses, availableLetters, completedWords]);

  // Handle tapping a letter in the pool
  const handlePoolLetterClick = (letter, index) => {
    if (selectedSlot) {
      // Slot-first mode: place letter in the selected slot
      const { wordIdx, slotIdx } = selectedSlot;
      const newGuesses = [...guesses];
      newGuesses[wordIdx] = [...newGuesses[wordIdx]];
      newGuesses[wordIdx][slotIdx] = letter;
      
      const newAvailable = [...availableLetters];
      newAvailable.splice(index, 1);
      
      setGuesses(newGuesses);
      setAvailableLetters(newAvailable);
      setSelectedSlot(null);
      setSelectedLetter(null);
      setSelectedLetterIndex(null);
    } else if (selectedLetter === letter && selectedLetterIndex === index) {
      // Tapping same letter deselects it
      setSelectedLetter(null);
      setSelectedLetterIndex(null);
    } else {
      // Select this letter
      setSelectedLetter(letter);
      setSelectedLetterIndex(index);
      setSelectedSlot(null);
    }
  };

  // Handle tapping a slot in a word
  const handleSlotClick = (wordIdx, slotIdx) => {
    // Can't tap the first letter (revealed)
    if (slotIdx === 0) return;
    // Can't interact with completed words
    if (completedWords[wordIdx]) return;
    
    // Set this word as current if it's not
    if (currentWordIndex !== wordIdx) {
      setCurrentWordIndex(wordIdx);
    }

    const currentLetter = guesses[wordIdx][slotIdx];

    if (currentLetter) {
      // Slot has a letter - return it to the pool
      const newGuesses = [...guesses];
      newGuesses[wordIdx] = [...newGuesses[wordIdx]];
      newGuesses[wordIdx][slotIdx] = '';
      
      const newAvailable = [...availableLetters, currentLetter];
      newAvailable.sort();
      
      setGuesses(newGuesses);
      setAvailableLetters(newAvailable);
      setSelectedLetter(null);
      setSelectedLetterIndex(null);
      setSelectedSlot(null);
    } else if (selectedLetter !== null) {
      // Slot is empty and we have a selected letter - place it
      const newGuesses = [...guesses];
      newGuesses[wordIdx] = [...newGuesses[wordIdx]];
      newGuesses[wordIdx][slotIdx] = selectedLetter;
      
      const newAvailable = [...availableLetters];
      newAvailable.splice(selectedLetterIndex, 1);
      
      setGuesses(newGuesses);
      setAvailableLetters(newAvailable);
      setSelectedLetter(null);
      setSelectedLetterIndex(null);
      setSelectedSlot(null);
    } else {
      // No letter selected - select this slot (slot-first mode)
      setSelectedSlot({ wordIdx, slotIdx });
      setSelectedLetter(null);
      setSelectedLetterIndex(null);
    }
  };

  // Shuffle available letters
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
  // Check if current word is correct
  const checkWord = () => {
    const guess = guesses[currentWordIndex];
    if (guess.some(l => l === '')) return;

    const guessedWord = guess.join('');
    if (guessedWord === currentPuzzle.words[currentWordIndex]) {
      const newCompleted = [...completedWords];
      newCompleted[currentWordIndex] = true;
      setCompletedWords(newCompleted);

      if (newCompleted.every(c => c)) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);

        const newStats = { ...stats, tracksCompleted: stats.tracksCompleted + 1 };
        setStats(newStats);
        saveStats(newStats);

        if (!completedPuzzles.includes(currentPuzzleIndex)) {
          const newCompletedPuzzles = [...completedPuzzles, currentPuzzleIndex];
          setCompletedPuzzles(newCompletedPuzzles);
          saveCompletedPuzzles(newCompletedPuzzles);
        }
      } else {
        for (let i = 0; i < 4; i++) {
          const nextIdx = (currentWordIndex + 1 + i) % 4;
          if (!newCompleted[nextIdx]) {
            setCurrentWordIndex(nextIdx);
            break;
          }
        }
      }
    } else {
      setShakeWord(currentWordIndex);
      setTimeout(() => setShakeWord(-1), 500);
      
      const newAvailable = [...availableLetters];
      const newGuesses = [...guesses];
      for (let i = 1; i < newGuesses[currentWordIndex].length; i++) {
        if (newGuesses[currentWordIndex][i] !== '') {
          newAvailable.push(newGuesses[currentWordIndex][i]);
        }
        newGuesses[currentWordIndex][i] = '';
      }
      newAvailable.sort();
      setGuesses(newGuesses);
      setAvailableLetters(newAvailable);
    }
  };

  const confirmReset = () => {
    const resetStats = { totalPlays: 0, tracksCompleted: 0, lastPlayed: null };
    setStats(resetStats);
    setCompletedPuzzles([]);
    saveStats(resetStats);
    saveCompletedPuzzles([]);
    setShowResetModal(false);
    setShowStatsModal(false);
  };

  // Share function
  const handleShare = async () => {
    const shareText = `I completed the ${currentPuzzle.category} track on Letter Griddle Jukebox! 🎵☕🥞\nlettergriddle.com/jukebox\nMore games at lettergriddle.com`;
    
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
      setShareStatus('copied');
      setTimeout(() => setShareStatus(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const confettiEmojis = ['🎵', '🎶', '💿', '⭐', '✨', '🎸', '🎤', '🎹'];
  const allComplete = completedWords.every(c => c);
  const progressPct = puzzles.length > 0 ? Math.round((completedPuzzles.length / puzzles.length) * 100) : 0;
  return (
    <>
      <style jsx>{`
        .jukebox-container {
          min-height: 100vh;
          background: linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
          padding: 16px;
          position: relative;
          overflow-x: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .glow-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
          animation: pulse 4s ease-in-out infinite;
        }
        .glow-pink { background: #ec4899; width: 250px; height: 250px; top: 20%; left: 20%; opacity: 0.2; }
        .glow-cyan { background: #06b6d4; width: 250px; height: 250px; bottom: 20%; right: 20%; opacity: 0.2; animation-delay: 1s; }
        .glow-amber { background: #f59e0b; width: 200px; height: 200px; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.15; animation-delay: 2s; }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        .music-note {
          position: fixed;
          opacity: 0.2;
          animation: float 3s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .jukebox-content {
          max-width: 500px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }
        .jukebox-header {
          text-align: center;
          margin-bottom: 24px;
        }
        .jukebox-title {
          font-size: 28px;
          font-weight: bold;
          color: #fde68a;
          letter-spacing: 2px;
          margin: 0;
        }
        .jukebox-subtitle {
          font-size: 42px;
          font-weight: 900;
          letter-spacing: 4px;
          background: linear-gradient(90deg, #f472b6, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 4px 0 0 0;
        }
        .stats-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #fde68a;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .stats-btn:hover {
          background: rgba(51, 65, 85, 0.7);
        }
        .track-list-header {
          text-align: center;
          margin-bottom: 16px;
          color: #fde68a;
          font-weight: bold;
          letter-spacing: 2px;
        }
        .track-list-header span {
          font-size: 24px;
          margin-right: 8px;
        }
        .track-item {
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .track-item:hover {
          background: rgba(51, 65, 85, 0.7);
          border-color: rgba(244, 114, 182, 0.5);
        }
        .track-item-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .track-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
          background: #334155;
          color: #94a3b8;
          transition: all 0.2s;
        }
        .track-item:hover .track-number {
          background: #ec4899;
          color: white;
        }
        .track-number.completed {
          background: #22c55e;
          color: white;
        }
        .track-info h3 {
          color: white;
          margin: 0 0 4px 0;
          font-size: 16px;
        }
        .track-info p {
          color: #64748b;
          margin: 0;
          font-size: 12px;
        }
        .track-play {
          color: #f472b6;
          opacity: 0;
          transition: opacity 0.2s;
          font-size: 18px;
        }
        .track-item:hover .track-play {
          opacity: 1;
        }
        .track-play.completed {
          color: #22c55e;
          opacity: 1;
        }
        .progress-counter {
          text-align: center;
          margin-top: 24px;
        }
        .progress-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(30, 41, 59, 0.5);
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }
        .progress-badge strong {
          color: #fbbf24;
        }
        .progress-badge span {
          color: #94a3b8;
          font-size: 14px;
        }
        .jukebox-footer {
          text-align: center;
          margin-top: 32px;
          font-size: 12px;
          color: #64748b;
        }
        .jukebox-footer a {
          color: #64748b;
          text-decoration: none;
          transition: color 0.2s;
        }
        .jukebox-footer a:hover {
          color: #fbbf24;
        }
        .jukebox-footer .cafe-name {
          color: #fbbf24;
        }
        .game-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .back-btn {
          color: #94a3b8;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          padding: 8px;
        }
        .back-btn:hover {
          color: white;
        }
        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1e293b;
          padding: 6px 16px;
          border-radius: 20px;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        .category-badge span:first-child {
          font-size: 18px;
        }
        .category-badge span:last-child {
          color: #fde68a;
          font-weight: bold;
          font-size: 14px;
        }
        .game-card-wrapper {
          position: relative;
        }
        .game-card-glow {
          position: absolute;
          inset: -4px;
          background: linear-gradient(90deg, #ec4899, #a78bfa, #06b6d4);
          border-radius: 24px;
          filter: blur(8px);
          opacity: 0.3;
        }
        .game-card {
          position: relative;
          background: linear-gradient(180deg, #1e293b, #0f172a);
          border-radius: 24px;
          padding: 20px;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }
        .game-instructions {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 16px;
          border: 1px solid rgba(139, 92, 246, 0.2);
          text-align: center;
        }
        .game-instructions p {
          margin: 0;
          color: #c4b5fd;
          font-size: 14px;
        }
        .game-instructions p:last-child {
          color: #94a3b8;
          font-size: 12px;
          margin-top: 4px;
        }
        .word-rows {
          margin-bottom: 20px;
        }
        .connector {
          text-align: center;
          margin: -4px 0;
          color: rgba(139, 92, 246, 0.5);
          font-size: 18px;
        }
        .connector.connected {
          color: #22c55e;
        }
        .word-row {
          border-radius: 12px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s;
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(51, 65, 85, 0.5);
          margin-bottom: 8px;
        }
        .word-row:hover {
          border-color: rgba(139, 92, 246, 0.3);
        }
        .word-row.active {
          background: rgba(88, 28, 135, 0.4);
          border: 2px solid rgba(244, 114, 182, 0.5);
        }
        .word-row.complete {
          background: rgba(22, 101, 52, 0.3);
          border: 1px solid rgba(34, 197, 94, 0.3);
        }
        .word-row.shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .word-row-header {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          width: 100%;
        }
        .word-row-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .word-number {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          background: #334155;
          color: #94a3b8;
        }
        .word-number.active {
          background: #ec4899;
          color: white;
        }
        .word-number.complete {
          background: #22c55e;
          color: white;
        }
        .track-label {
          color: #64748b;
          font-size: 12px;
        }
        .hint-btn {
          background: rgba(245, 158, 11, 0.2);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #fcd34d;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .hint-btn:hover {
          background: rgba(245, 158, 11, 0.3);
        }
        .hint-box {
          background: rgba(15, 23, 42, 0.7);
          border-radius: 8px;
          padding: 8px;
          margin-bottom: 8px;
          border: 1px solid rgba(245, 158, 11, 0.2);
          color: rgba(253, 230, 138, 0.8);
          font-size: 12px;
        }
        .letter-tiles {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .letter-tile {
          width: 36px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: bold;
          border-radius: 8px;
          border: 2px solid;
          transition: all 0.2s;
        }
        .letter-tile.revealed {
          background: #0e7490;
          border-color: #22d3ee;
          color: white;
        }
        .letter-tile.filled {
          background: #9d174d;
          border-color: #f472b6;
          color: white;
        }
        .letter-tile.empty {
          background: #1e293b;
          border-color: #475569;
          border-style: dashed;
        }
        .letter-tile.empty.active {
          border-color: rgba(244, 114, 182, 0.5);
        }
        .letter-tile.empty.selected {
              border-color: #f472b6;
              border-width: 3px;
              box-shadow: 0 0 12px rgba(244, 114, 182, 0.6);
              animation: pulse 1s infinite;
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }  
        .letter-tile.complete {
          background: #166534;
          border-color: #4ade80;
          color: white;
        }
        .letter-pool {
          background: #0f172a;
          border-radius: 12px;
          padding: 16px;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        .letter-pool-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        .letter-pool-header span:first-child {
          font-size: 20px;
        }
        .letter-pool-header span:last-child {
          font-size: 14px;
          font-weight: bold;
          color: #fde68a;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
          .shuffle-btn {
              background: transparent;
              border: 1px solid rgba(245, 158, 11, 0.5);
              border-radius: 8px;
              padding: 4px 8px;
              font-size: 16px;
              cursor: pointer;
              transition: all 0.2s;
            }
            .shuffle-btn:hover {
              background: rgba(245, 158, 11, 0.2);
              transform: scale(1.1);
            }
        .letter-pool-tiles {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          margin-bottom: 8px;
        }
        .pool-tile {
          width: 32px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          background: linear-gradient(180deg, #fbbf24, #d97706);
          border: 2px solid #fcd34d;
          color: #1e293b;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
          .pool-tile.selected {
              background: linear-gradient(180deg, #f472b6, #db2777);
              border-color: #f9a8d4;
              color: white;
              transform: scale(1.15);
              box-shadow: 0 0 20px rgba(244, 114, 182, 0.6);
            }
            .pool-tile:hover {
              transform: scale(1.05);
              cursor: pointer;
            }
            .pool-tile.selected:hover {
              transform: scale(1.15);
            }
            .check-btn {
              display: block;
              width: 100%;
              margin-top: 12px;
              padding: 12px;
              background: linear-gradient(90deg, #ec4899, #a78bfa);
              border: none;
              border-radius: 12px;
              color: white;
              font-size: 16px;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.2s;
            }
            .check-btn:hover {
              opacity: 0.9;
              transform: scale(1.02);
            }
        .letter-pool-hint {
          text-align: center;
          color: #64748b;
          font-size: 12px;
        }
        .all-used {
          color: #fde68a;
          font-size: 14px;
        }
        .completion-banner {
          margin-top: 20px;
          background: #0f172a;
          border: 1px solid rgba(34, 197, 94, 0.5);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
        }
        .completion-banner h3 {
          color: #4ade80;
          font-size: 24px;
          margin: 0 0 8px 0;
        }
        .completion-banner p {
          color: #86efac;
          font-size: 14px;
          margin: 0 0 16px 0;
        }
        .chain-display {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 16px;
          color: #fde68a;
          font-size: 14px;
        }
        .completion-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .btn-secondary {
          background: #334155;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-secondary:hover {
          background: #475569;
        }
        .btn-primary {
          background: linear-gradient(90deg, #ec4899, #a78bfa);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-primary:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 16px;
        }
        .modal {
          background: linear-gradient(180deg, #1e293b, #0f172a);
          border-radius: 24px;
          padding: 24px;
          max-width: 380px;
          width: 100%;
          position: relative;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 20px;
          cursor: pointer;
        }
        .modal-close:hover {
          color: white;
        }
        .modal-header {
          text-align: center;
          margin-bottom: 24px;
        }
        .modal-header .emoji {
          font-size: 40px;
        }
        .modal-header h3 {
          color: #fde68a;
          font-size: 24px;
          margin: 8px 0 0 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        .stat-box {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }
        .stat-box.pink { border: 1px solid rgba(236, 72, 153, 0.3); }
        .stat-box.cyan { border: 1px solid rgba(6, 182, 212, 0.3); }
        .stat-box.amber { border: 1px solid rgba(245, 158, 11, 0.3); }
        .stat-box.green { border: 1px solid rgba(34, 197, 94, 0.3); }
        .stat-box .value {
          font-size: 28px;
          font-weight: bold;
        }
        .stat-box.pink .value { color: #f472b6; }
        .stat-box.cyan .value { color: #22d3ee; }
        .stat-box.amber .value { color: #fbbf24; }
        .stat-box.green .value { color: #4ade80; }
        .stat-box .label {
          color: #94a3b8;
          font-size: 12px;
          margin-top: 4px;
        }
        .progress-section {
          margin-bottom: 24px;
        }
        .progress-label {
          color: #94a3b8;
          font-size: 12px;
          text-align: center;
          margin-bottom: 4px;
        }
        .progress-bar {
          height: 12px;
          background: #334155;
          border-radius: 6px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ec4899, #a78bfa);
          transition: width 0.3s;
        }
        .all-complete-msg {
          text-align: center;
          color: #4ade80;
          font-weight: bold;
          margin-bottom: 24px;
        }
        .reset-section {
          border-top: 1px solid #334155;
          padding-top: 16px;
          margin-top: 16px;
        }
        .reset-btn {
          width: 100%;
          background: #1e293b;
          border: 1px solid #475569;
          color: #94a3b8;
          padding: 10px;
          border-radius: 20px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .reset-btn:hover {
          background: rgba(127, 29, 29, 0.5);
          border-color: rgba(239, 68, 68, 0.5);
          color: #f87171;
        }
        .reset-hint {
          text-align: center;
          color: #475569;
          font-size: 12px;
          margin-top: 8px;
        }
        .modal.reset {
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .reset-warning {
          color: #94a3b8;
          font-size: 14px;
          text-align: center;
          margin-bottom: 24px;
        }
        .btn-danger {
          background: #dc2626;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-danger:hover {
          background: #b91c1c;
        }
        .confetti-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 100;
        }
        @keyframes confetti-fall {
          from {
            transform: translateY(-10px);
          }
          to {
            transform: translateY(calc(100vh + 50px));
          }
        }
        .confetti {
          position: absolute;
          font-size: 28px;
          opacity: 0.9;
          animation: confetti-fall 1.5s linear forwards;
          pointer-events: none;
        }
          /* Tablet and Mobile Responsive Styles */
            @media (max-width: 1024px) {
              .game-card {
                padding: 12px;
              }
              .game-instructions p {
                font-size: 11px;
                margin: 4px 0;
              }
              .word-row {
                padding: 6px;
                margin-bottom: 2px;
              }
              .word-row-header {
                margin-bottom: 4px;
              }
              .letter-tiles {
                gap: 4px;
              }
              .letter-tile {
                width: 28px;
                height: 32px;
                font-size: 14px;
              }
              .connector {
                height: 6px;
                margin: 1px 0;
              }
              .letter-pool {
                padding: 10px;
              }
              .letter-pool-header {
                margin-bottom: 8px;
              }
              .pool-tile {
                width: 36px;
                height: 40px;
                font-size: 16px;
              }
              .check-btn {
                padding: 10px;
                font-size: 14px;
              }
            }

            /* Phone Responsive Styles */
            @media (max-width: 480px) {
              .game-instructions p {
                font-size: 10px;
              }
              .word-row {
                padding: 6px;
              }
              .letter-tile {
                width: 28px;
                height: 34px;
                font-size: 14px;
              }
              .pool-tile {
                width: 32px;
                height: 36px;
                font-size: 14px;
              }
              .connector {
                height: 8px;
              }
            }
         
      `}</style>
      <div className="jukebox-container" style={{ touchAction: 'manipulation', overscrollBehavior: 'none', WebkitOverflowScrolling: 'touch' }}>
        <div className="glow-orb glow-pink"></div>
        <div className="glow-orb glow-cyan"></div>
        <div className="glow-orb glow-amber"></div>

        <div className="music-note" style={{ top: '80px', left: '40px', fontSize: '32px' }}>🎵</div>
        <div className="music-note" style={{ top: '160px', right: '64px', fontSize: '24px', animationDelay: '0.5s' }}>🎶</div>
        <div className="music-note" style={{ bottom: '128px', left: '80px', fontSize: '24px', animationDelay: '1s' }}>♪</div>
        <div className="music-note" style={{ bottom: '80px', right: '40px', fontSize: '32px', animationDelay: '1.5s' }}>♫</div>

        {showConfetti && (
          <div className="confetti-container">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="confetti" style={{ left: `${Math.random() * 100}%`, top: `top: '-30px'`, animationDelay: `${Math.random() * 0.3}s` }}>
                {confettiEmojis[i % confettiEmojis.length]}
              </div>
            ))}
          </div>
        )}

        {currentView === 'menu' && (
          <div className="jukebox-content">
            <div className="jukebox-header">
              <h1 className="jukebox-title">Letter Griddle</h1>
              <h2 className="jukebox-subtitle">JUKEBOX</h2>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <button className="stats-btn" onClick={() => setShowStatsModal(true)}>
                <span>📊</span>
                <span>Your Stats</span>
              </button>
            </div>

            <div className="track-list-header">
              <span>💿</span>SELECT A TRACK
            </div>

            <div className="track-list">
              {puzzles.map((puzzle, i) => {
                const isCompleted = completedPuzzles.includes(i);
                return (
                  <div key={i} className="track-item" onClick={() => startPuzzle(i)}>
                    <div className="track-item-left">
                      <div className={`track-number ${isCompleted ? 'completed' : ''}`}>
                        {isCompleted ? '✓' : i + 1}
                      </div>
                      <div className="track-info">
                        <h3>{puzzle.category}</h3>
                        <p>{isCompleted ? 'Completed • Play again?' : '4 words'}</p>
                      </div>
                    </div>
                    <div className={`track-play ${isCompleted ? 'completed' : ''}`}>
                      {isCompleted ? '🔄' : '▶'}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="progress-counter">
              <div className="progress-badge">
                <strong>{completedPuzzles.length}</strong>
                <span>/ {puzzles.length} tracks completed</span>
              </div>
            </div>

            <div className="jukebox-footer">
             <p><a href="https://lettergriddle.com" className="cafe-name" style={{ textDecoration: 'none' }}>Letter Griddle Games</a></p>
              <p style={{ marginTop: '4px' }}><a href="/">← Back to Letter Griddle</a></p>
              <p style={{ marginTop: '4px', fontSize: '10px', opacity: 0.6 }}>© {new Date().getFullYear()} Letter Griddle. All rights reserved.</p>
              <p style={{ marginTop: '4px', fontSize: '10px', opacity: 0.6 }}><a href="https://www.lettergriddle.com/privacy" style={{ color: '#9ca3af', textDecoration: 'underline' }}>Privacy</a> • <a href="https://www.lettergriddle.com/terms" style={{ color: '#9ca3af', textDecoration: 'underline' }}>Terms</a></p>
            </div>
          </div>
        )}

        {currentView === 'game' && currentPuzzle && (
          <div className="jukebox-content">
            <div className="jukebox-header" style={{ marginBottom: '16px' }}>
              <h1 className="jukebox-title" style={{ fontSize: '22px' }}>Letter Griddle</h1>
              <h2 className="jukebox-subtitle" style={{ fontSize: '32px' }}>JUKEBOX</h2>
            </div>

            <div className="game-header">
              <button className="back-btn" onClick={() => setCurrentView('menu')}>← Back</button>
              <div className="category-badge">
                <span>💿</span>
                <span>{currentPuzzle.category}</span>
              </div>
              <div style={{ width: '48px' }}></div>
            </div>

            <div className="game-card-wrapper">
              <div className="game-card-glow"></div>
              <div className="game-card">
                <div className="game-instructions">
                  <p>🎵 Each word connects to the next 🎵</p>
                  <p>Tap a spot then a letter, or tap a letter then a spot! Tap ✓ CHECK ANSWER for feedback.</p>
                </div>

                <div className="word-rows">
                  {currentPuzzle.words.map((word, wordIdx) => {
                    const isActive = currentWordIndex === wordIdx && !completedWords[wordIdx];
                    const isComplete = completedWords[wordIdx];

                    return (
                      <React.Fragment key={wordIdx}>
                        {wordIdx > 0 && (
                          <div className={`connector ${completedWords[wordIdx - 1] && completedWords[wordIdx] ? 'connected' : ''}`}>⟡</div>
                        )}
                        <div className={`word-row ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''} ${shakeWord === wordIdx ? 'shake' : ''}`} onClick={() => !completedWords[wordIdx] && setCurrentWordIndex(wordIdx)}>
                          <div className="word-row-header">
                            <div className="word-row-left">
                              <div className={`word-number ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}>
                                {isComplete ? '✓' : wordIdx + 1}
                              </div>
                              <span className="track-label">Track {wordIdx + 1}</span>
                            </div>
                            {!isComplete && (
                              <button className="hint-btn" onClick={(e) => { e.stopPropagation(); const newHints = [...hintsRevealed]; newHints[wordIdx] = !newHints[wordIdx]; setHintsRevealed(newHints); }}>Hint</button>
                            )}
                          </div>
                          {hintsRevealed[wordIdx] && !isComplete && (
                            <div className="hint-box">{currentPuzzle.hints[wordIdx]}</div>
                          )}
                          <div className="letter-tiles">
                            {guesses[wordIdx]?.map((letter, letterIdx) => {
                              let tileClass = 'letter-tile';
                              if (isComplete) { tileClass += ' complete'; }
                              else if (letterIdx === 0) { tileClass += ' revealed'; }
                              else if (letter) { tileClass += ' filled'; }
                              else { tileClass += ' empty'; if (isActive) tileClass += ' active'; if (selectedSlot && selectedSlot.wordIdx === wordIdx && selectedSlot.slotIdx === letterIdx) tileClass += ' selected'; }
                              return (
                      <div 
                        key={letterIdx} 
                        className={tileClass}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSlotClick(wordIdx, letterIdx);
                        }}
                        style={{ cursor: letterIdx === 0 || isComplete ? 'default' : 'pointer', touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent', userSelect: 'none' }}
                      >
                        {letter}
                      </div>
                    );
                            })}
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>

                <div className="letter-pool">
                  <div className="letter-pool-header">
                    <span>🎹</span>
                    <span>Available Letters</span>
                    <button className="shuffle-btn" onClick={shuffleLetters} style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}>🔀</button>
                  </div>
                  <div className="letter-pool-tiles">
                    {availableLetters.length > 0 ? (
                      availableLetters.map((letter, i) => (
                      <div
  key={i}
  className={`pool-tile ${selectedLetter === letter && selectedLetterIndex === i ? 'selected' : ''}`}
  onClick={() => handlePoolLetterClick(letter, i)}
  style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent', userSelect: 'none' }}
>
                        {letter}
                      </div>
                    ))
                    ) : (
                      <p className="all-used">✨ All letters used!</p>
                    )}
                  </div>
                  <p className="letter-pool-hint">Tap a letter, then tap where to place it • Or type on keyboard</p>
                  {!allComplete && (
                <button className="check-btn" onClick={checkWord} style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}>
  ✓ Check Answer
</button>
              )}
                </div>
              </div>
            </div>

            {allComplete && (
              <div className="completion-banner">
                <h3>Track Complete!</h3>
                <div className="chain-display">{currentPuzzle.words.join(' → ')}</div>
                <div className="completion-buttons">
  <button className="btn-secondary" onClick={handleShare} style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}>
  {shareStatus === 'copied' ? '✓ Copied!' : 'Share'}
</button>
  <button className="btn-secondary" onClick={() => startPuzzle(currentPuzzleIndex)} style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}>Play Again</button>
  <button className="btn-primary" onClick={() => setCurrentView('menu')} style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}>🎵 More Tracks</button>
</div>
              </div>
            )}

            <div className="jukebox-footer">
             <p><a href="https://lettergriddle.com" className="cafe-name" style={{ textDecoration: 'none' }}>Letter Griddle Games</a></p>
             <p style={{ marginTop: '4px', fontSize: '10px', opacity: 0.6 }}>© {new Date().getFullYear()} Letter Griddle. All rights reserved.</p>
              <p style={{ marginTop: '4px', fontSize: '10px', opacity: 0.6 }}><a href="https://www.lettergriddle.com/privacy" style={{ color: '#9ca3af', textDecoration: 'underline' }}>Privacy</a> • <a href="https://www.lettergriddle.com/terms" style={{ color: '#9ca3af', textDecoration: 'underline' }}>Terms</a></p> 
            </div>
          </div>
        )}

        {showStatsModal && (
          <div className="modal-overlay" onClick={() => setShowStatsModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowStatsModal(false)}>✕</button>
              <div className="modal-header">
                <div className="emoji">📊</div>
                <h3>Your Stats</h3>
              </div>
              <div className="stats-grid">
                <div className="stat-box pink"><div className="value">{stats.tracksCompleted}</div><div className="label">Tracks Completed</div></div>
                <div className="stat-box cyan"><div className="value">{stats.totalPlays}</div><div className="label">Total Plays</div></div>
                <div className="stat-box amber"><div className="value">{completedPuzzles.length}/{puzzles.length}</div><div className="label">Unique Tracks</div></div>
                <div className="stat-box green"><div className="value">{progressPct}%</div><div className="label">Playlist Progress</div></div>
              </div>
              <div className="progress-section">
                <div className="progress-label">Playlist Progress</div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${progressPct}%` }}></div></div>
              </div>
              {completedPuzzles.length === puzzles.length && <div className="all-complete-msg">🎉 All tracks completed! 🎉</div>}
              <div className="reset-section">
                <button className="reset-btn" onClick={() => setShowResetModal(true)}>🔄 Reset All Progress</button>
                <p className="reset-hint">Start fresh from the beginning</p>
              </div>
            </div>
          </div>
        )}

        {showResetModal && (
          <div className="modal-overlay" onClick={() => setShowResetModal(false)}>
            <div className="modal reset" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="emoji">⚠️</div>
                <h3 style={{ color: 'white' }}>Reset All Progress?</h3>
              </div>
              <p className="reset-warning">This will clear all your stats and completed tracks. This cannot be undone!</p>
              <div className="completion-buttons">
                <button className="btn-secondary" onClick={() => setShowResetModal(false)}>Cancel</button>
                <button className="btn-danger" onClick={confirmReset}>Reset Everything</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}