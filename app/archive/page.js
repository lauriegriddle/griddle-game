"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import archivePuzzles from './puzzles';

export default function ArchivePage() {
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);

  if (selectedPuzzle) {
    return <PuzzleGame puzzle={selectedPuzzle} onBack={() => setSelectedPuzzle(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-8">
          <a href="/play" className="text-amber-600 hover:text-amber-800 text-sm font-semibold mb-4 inline-block">
            ← Back to Letter Griddle
          </a>
          <div className="text-5xl mb-3">🥞</div>
          <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Puzzle Archive
          </h1>
          <p className="text-amber-600 italic" style={{ fontFamily: 'Georgia, serif' }}>
            A curated collection 🥞 Replay anytime!
          </p>
        </div>

        {/* Puzzle Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-12">
          {archivePuzzles.map((puzzle) => (
            <button
              key={puzzle.id}
              onClick={() => setSelectedPuzzle(puzzle)}
              className="group bg-white rounded-2xl shadow-md overflow-hidden border-2 border-amber-200 hover:border-amber-400 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-left"
            >
              {/* Card Top */}
              <div
                className="h-32 flex flex-col items-center justify-center relative"
                style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #EA580C 100%)' }}
              >
                <div className="text-5xl mb-2">{puzzle.emoji}</div>
                <p className="text-white text-xs font-bold tracking-widest uppercase opacity-80">
                  Puzzle {puzzle.puzzleNumber}
                </p>
                <div className="absolute inset-0 bg-amber-900/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl">
                  <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                    Play Now →
                  </span>
                </div>
              </div>

              {/* Card Bottom */}
              <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50">
                <h2 className="text-base font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                  {puzzle.category}
                </h2>
                <p className="text-amber-600 text-xs">5 words • Replayable</p>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pb-8 text-xs text-amber-600">
          <p>New puzzles added regularly! 🍯</p>
          <div className="mt-3">
            <a href="/" className="hover:text-amber-800 underline">← Letter Griddle Home</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function PuzzleGame({ puzzle, onBack }) {
  const [selectedLetters, setSelectedLetters] = useState(() => {
    return puzzle.words.map(w => {
      const letters = Array(w.word.length).fill('');
      letters[w.revealedIndex] = w.word[w.revealedIndex];
      return letters;
    });
  });

  const initialLetters = puzzle.words.flatMap((w, wordIdx) =>
    w.word.split('').filter((_, idx) => idx !== w.revealedIndex)
  ).sort();

  const [availableLetters, setAvailableLetters] = useState([...initialLetters]);
  const [hintsRevealed, setHintsRevealed] = useState(Array(5).fill(false));
  const [completedWords, setCompletedWords] = useState(Array(5).fill(false));
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedLetterIndex, setSelectedLetterIndex] = useState(null);
  const [celebratingWord, setCelebratingWord] = useState(null);
  const [wrongPlacements, setWrongPlacements] = useState({});
  const [startTime] = useState(Date.now());
  const [completionTime, setCompletionTime] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [focusedWordIndex, setFocusedWordIndex] = useState(0);
const [selectedSlotWord, setSelectedSlotWord] = useState(null);
const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);

  const allComplete = completedWords.every(c => c);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (allComplete) return;
      const key = e.key.toUpperCase();

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
      if (e.key === 'Backspace') {
        e.preventDefault();
        const wordIdx = focusedWordIndex;
        const wordData = puzzle.words[wordIdx];
        const currentWordLetters = selectedLetters[wordIdx];
        for (let i = currentWordLetters.length - 1; i >= 0; i--) {
          if (currentWordLetters[i] && i !== wordData.revealedIndex) {
            const letterToReturn = currentWordLetters[i];
            setAvailableLetters(prev => [...prev, letterToReturn].sort());
            setSelectedLetters(prev => {
              const next = [...prev];
              next[wordIdx] = [...next[wordIdx]];
              next[wordIdx][i] = '';
              return next;
            });
            break;
          }
        }
        return;
      }
      if (/^[A-Z]$/.test(key)) {
        const letterIndex = availableLetters.findIndex(l => l === key);
        if (letterIndex === -1) return;
        const wordIdx = focusedWordIndex;
        const wordData = puzzle.words[wordIdx];
        const currentWordLetters = selectedLetters[wordIdx];
        let targetSlot = -1;
        for (let i = 0; i < currentWordLetters.length; i++) {
          if (!currentWordLetters[i] && i !== wordData.revealedIndex) {
            targetSlot = i;
            break;
          }
        }
        if (targetSlot === -1) return;
        setAvailableLetters(prev => {
          const next = [...prev];
          const idx = next.indexOf(key);
          if (idx !== -1) next.splice(idx, 1);
          return next;
        });
        const newLetters = [...currentWordLetters];
        newLetters[targetSlot] = key;
        setSelectedLetters(prev => {
          const next = [...prev];
          next[wordIdx] = newLetters;
          return next;
        });
        if (key !== wordData.word[targetSlot]) {
          setWrongPlacements(prev => ({ ...prev, [`${wordIdx}-${targetSlot}`]: true }));
          setTimeout(() => {
            setWrongPlacements(prev => {
              const next = { ...prev };
              delete next[`${wordIdx}-${targetSlot}`];
              return next;
            });
          }, 1000);
        }
        checkWordComplete(wordIdx, newLetters);

        // Auto-advance to next incomplete word when current word is full
        const isNowFull = newLetters.every((l, i) => l || i === wordData.revealedIndex);
        if (isNowFull) {
          for (let i = 1; i <= 5; i++) {
            const nextIdx = (wordIdx + i) % 5;
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
  }, [availableLetters, selectedLetters, focusedWordIndex, completedWords, allComplete, puzzle.words]);

  const formatTime = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
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

  const checkWordComplete = (wordIdx, letters) => {
    const word = puzzle.words[wordIdx].word;
    if (letters.join('') === word && !completedWords[wordIdx]) {
      setCompletedWords(prev => {
        const next = [...prev];
        next[wordIdx] = true;
        return next;
      });
      setCelebratingWord(wordIdx);
      setTimeout(() => setCelebratingWord(null), 2000);

      const newCompleted = [...completedWords];
      newCompleted[wordIdx] = true;
      if (newCompleted.every(c => c)) {
        const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
        setCompletionTime(timeInSeconds);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 6000);
      }
    }
  };

  const handleLetterClick = (letter, letterIndex) => {
    if (selectedSlotWord !== null && selectedSlotIndex !== null) {
      const wordIdx = selectedSlotWord;
      const slotIdx = selectedSlotIndex;
      setSelectedSlotWord(null);
      setSelectedSlotIndex(null);
      setAvailableLetters(prev => { const next = [...prev]; const idx = next.indexOf(letter); if (idx !== -1) next.splice(idx, 1); return next; });
      const newLetters = [...selectedLetters[wordIdx]];
      newLetters[slotIdx] = letter;
      setSelectedLetters(prev => { const next = [...prev]; next[wordIdx] = newLetters; return next; });
      if (letter !== puzzle.words[wordIdx].word[slotIdx]) {
        setWrongPlacements(prev => ({ ...prev, [`${wordIdx}-${slotIdx}`]: true }));
        setTimeout(() => { setWrongPlacements(prev => { const next = { ...prev }; delete next[`${wordIdx}-${slotIdx}`]; return next; }); }, 1000);
      }
      checkWordComplete(wordIdx, newLetters);
    } else {
      setSelectedLetter(letter);
      setSelectedLetterIndex(letterIndex);
    }
  };

  const handleSlotClick = (wordIdx, slotIdx) => {
    const wordData = puzzle.words[wordIdx];
    if (completedWords[wordIdx]) return;
    if (slotIdx === wordData.revealedIndex) return;
    const currentLetter = selectedLetters[wordIdx][slotIdx];
    if (currentLetter) {
      setAvailableLetters(prev => [...prev, currentLetter].sort());
      setSelectedLetters(prev => { const next = [...prev]; next[wordIdx] = [...next[wordIdx]]; next[wordIdx][slotIdx] = ''; return next; });
      setWrongPlacements(prev => { const next = { ...prev }; delete next[`${wordIdx}-${slotIdx}`]; return next; });
      setSelectedSlotWord(null);
      setSelectedSlotIndex(null);
    } else if (selectedLetter !== null) {
      setAvailableLetters(prev => { const next = [...prev]; const idx = next.indexOf(selectedLetter); if (idx !== -1) next.splice(idx, 1); return next; });
      const newLetters = [...selectedLetters[wordIdx]];
      newLetters[slotIdx] = selectedLetter;
      setSelectedLetters(prev => { const next = [...prev]; next[wordIdx] = newLetters; return next; });
      setSelectedLetter(null);
      setSelectedLetterIndex(null);
      setSelectedSlotWord(null);
      setSelectedSlotIndex(null);
      if (selectedLetter !== wordData.word[slotIdx]) {
        setWrongPlacements(prev => ({ ...prev, [`${wordIdx}-${slotIdx}`]: true }));
        setTimeout(() => { setWrongPlacements(prev => { const next = { ...prev }; delete next[`${wordIdx}-${slotIdx}`]; return next; }); }, 1000);
      } else {
        setWrongPlacements(prev => { const next = { ...prev }; delete next[`${wordIdx}-${slotIdx}`]; return next; });
      }
      checkWordComplete(wordIdx, newLetters);
    } else {
      setSelectedSlotWord(wordIdx);
      setSelectedSlotIndex(slotIdx);
    }
  };

  const handleShare = () => {
    const honeyEmojis = '🍯'.repeat(completedWords.filter(c => c).length);
    const shareText = `Letter Griddle Archive\n${puzzle.category} ${puzzle.emoji}\n${honeyEmojis}\n${completedWords.filter(c => c).length}/5 words\n\nPlay at lettergriddle.com/archive`;
    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const resetPuzzle = () => {
    setSelectedLetters(puzzle.words.map(w => {
      const letters = Array(w.word.length).fill('');
      letters[w.revealedIndex] = w.word[w.revealedIndex];
      return letters;
    }));
    setAvailableLetters([...initialLetters]);
    setHintsRevealed(Array(5).fill(false));
    setCompletedWords(Array(5).fill(false));
    setSelectedLetter(null);
    setSelectedLetterIndex(null);
    setCompletionTime(null);
    setShowConfetti(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-2 relative">
      <style>{`
        @keyframes fall {
          to { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="absolute text-4xl"
              style={{ left: `${(i * 7) % 100}%`, top: '-50px', animation: `fall 6s ease-in ${(i % 10) * 0.1}s forwards` }}>
              {['🥞', '🍯', '🧈', '🍓', '🧇'][i % 5]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-2 px-1">
          <button onClick={onBack} className="text-amber-700 hover:text-amber-900 text-sm font-semibold flex items-center gap-1">
            ← Archive
          </button>
          <h1 className="text-lg font-bold text-amber-800" style={{ fontFamily: 'Georgia, serif' }}>
            Puzzle Archive
          </h1>
          <span className="text-xl">🥞</span>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-2 border-2 border-amber-200">
          {/* Category Banner */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg p-1 mb-2 shadow-lg">
            <p className="text-center text-xs md:text-sm font-bold" style={{ fontFamily: 'Georgia, serif' }}>
              {puzzle.category} {puzzle.emoji}
            </p>
          </div>

          {/* Completion Banner */}
          {allComplete && (
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-amber-400 rounded-lg p-2 mb-2 text-center shadow-lg">
              <p className="text-base font-bold text-amber-800 mb-0.5">Complete! 🎉</p>
              <p className="text-xs text-amber-700 mb-2">You savored this puzzle for {formatTime(completionTime)}</p>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-3 mb-2 border-2 border-amber-300">
                <p className="text-sm font-bold text-amber-800 mb-1">🍯 Did You Know?</p>
                <p className="text-xs text-amber-700 leading-relaxed">{puzzle.funFact}</p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={handleShare}
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg transition-all"
                >
                  {shareCopied ? '✓ Copied!' : 'Share'}
                </button>
                <button
                  onClick={resetPuzzle}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 px-3 py-1 rounded-full font-bold text-xs transition-all"
                >
                  🔄 Play Again
                </button>
                <button
                  onClick={onBack}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 px-3 py-1 rounded-full font-bold text-xs transition-all"
                >
                  ← More Puzzles
                </button>
              </div>
            </div>
          )}

          {/* Game Layout */}
          <div className="grid md:grid-cols-[1fr,240px] gap-2">
            {/* Words */}
            <div className="space-y-1.5">
              {puzzle.words.map((wordData, wordIdx) => {
                const revealed = selectedLetters[wordIdx];
                const isComplete = completedWords[wordIdx];
                const isCelebrating = celebratingWord === wordIdx;
                return (
                  <div key={wordIdx} className="relative">
                    <div className={`bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-1.5 border shadow-sm ${isComplete ? 'border-amber-400' : focusedWordIndex === wordIdx ? 'border-amber-500 ring-2 ring-amber-300' : 'border-amber-200'}`}>
                      {isCelebrating && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-2xl animate-bounce">
                            {['Great start! 🍯', "You're cooking! 🍯", 'On a roll! 🍯', 'Almost there! 🍯', 'Amazing! 🍯'][wordIdx]}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-0.5">
                          <span className="text-base">🥞</span>
                          <span className="text-[10px] font-bold text-amber-800">{wordData.word.length} Letters</span>
                        </div>
                        <button
                          onClick={() => setHintsRevealed(prev => { const next = [...prev]; next[wordIdx] = !next[wordIdx]; return next; })}
                          className="flex items-center gap-0.5 text-[10px] bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-1.5 py-0.5 rounded-full transition-all shadow-sm font-semibold"
                        >
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
                          const isRevealed = letterIdx === wordData.revealedIndex && !isComplete;
                          const currentLetter = revealed[letterIdx] || '';
                          const isWrong = wrongPlacements[`${wordIdx}-${letterIdx}`];
                          return (
                            <div key={letterIdx} onClick={() => handleSlotClick(wordIdx, letterIdx)}
                              className={`w-8 h-8 flex items-center justify-center text-base font-bold rounded-full border-2 transition-all duration-300 shadow-sm cursor-pointer
                                ${isCelebrating ? 'animate-bounce scale-110' : ''}
                                ${isWrong ? 'bg-gradient-to-br from-red-200 to-red-300 border-red-500 text-red-900 animate-pulse' : ''}
                                ${!isWrong && isRevealed ? 'bg-gradient-to-br from-blue-200 to-blue-300 border-blue-400 text-blue-900' : ''}
                                ${!isWrong && !isRevealed && isComplete ? 'bg-gradient-to-br from-yellow-200 to-amber-300 border-amber-500 text-amber-900 shadow-md' : ''}
                                ${!isWrong && !isRevealed && !isComplete && currentLetter ? 'bg-gradient-to-br from-amber-100 to-yellow-100 border-amber-400 text-amber-900 hover:scale-105' : ''}
                                ${selectedSlotWord === wordIdx && selectedSlotIndex === letterIdx && !currentLetter ? 'bg-gradient-to-br from-amber-200 to-yellow-200 border-amber-500 border-4 text-transparent cursor-pointer scale-105' : ''}
${!isWrong && !isRevealed && !isComplete && !currentLetter && !(selectedSlotWord === wordIdx && selectedSlotIndex === letterIdx) ? 'bg-white border-amber-300 text-transparent hover:border-amber-400 hover:scale-105' : ''}`}
                              style={{ fontFamily: 'Georgia, serif' }}>
                              {currentLetter}
                            </div>
                          );
                        })}
                      </div>
                      {isComplete && !isCelebrating && (
                        <div className="mt-0.5 text-center"><span className="text-base">🍯</span></div>
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
                  <h3 className="text-sm font-bold text-amber-200" style={{ fontFamily: 'Georgia, serif' }}>Letter Griddle</h3>
                  <span className="text-base">🍳</span>
                </div>
                <div className="flex flex-wrap gap-1 justify-center mb-2">
                  {availableLetters.map((letter, idx) => (
                    <button key={idx} onClick={() => handleLetterClick(letter, idx)}
                      className={`w-8 h-8 rounded-full text-sm font-bold transition-all duration-200 shadow-md
                        ${selectedLetter === letter && selectedLetterIndex === idx
                          ? 'bg-gradient-to-br from-yellow-300 to-amber-400 border-2 border-amber-600 text-amber-900 scale-110 shadow-lg'
                          : 'bg-gradient-to-br from-yellow-200 to-amber-300 border border-amber-400 text-amber-900 hover:scale-105'}`}
                      style={{ fontFamily: 'Georgia, serif' }}>
                      {letter}
                    </button>
                  ))}
                </div>
                {availableLetters.length === 0 ? (
                  <div className="text-center"><p className="text-amber-200 font-bold text-xs">✨ Clean! ✨</p></div>
                ) : (
                  <div className="text-center">
                    <button onClick={shuffleLetters}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold transition-all">
                      🔀 Shuffle
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-2 text-center text-amber-700 bg-amber-50 rounded-lg p-1.5">
                <p className="text-sm text-amber-700">• Click a spot then a letter, or click a letter then a spot!</p>
<p className="text-sm text-amber-700 mt-0.5">• Desktop? Type letters directly!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}