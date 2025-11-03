"use client";
import React, { useState, useEffect } from 'react';
import { ChefHat, Share2, BarChart3, X, Award } from 'lucide-react';
import { getTodaysPuzzle } from './puzzles';
const PancakeWordGame = () => {
     const gameData = getTodaysPuzzle();

     


  const achievements = [
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

  const allLetters = gameData.words.flatMap(w =>
    w.word.split('').filter((_, idx) => idx !== w.revealedIndex)
  ).sort();

  const [selectedLetters, setSelectedLetters] = useState(initializeWords());
  const [availableLetters, setAvailableLetters] = useState([...allLetters]);
  const [hintsRevealed, setHintsRevealed] = useState(Array(5).fill(false));
  const [completedWords, setCompletedWords] = useState(Array(5).fill(false));
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedLetterIndex, setSelectedLetterIndex] = useState(null);
  const [celebratingWord, setCelebratingWord] = useState(null);
  const [wrongPlacements, setWrongPlacements] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [startTime] = useState(Date.now());
  const [completionTime, setCompletionTime] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newAchievements, setNewAchievements] = useState([]);

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

  const allComplete = completedWords.every(c => c);

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
      setTimeout(() => setShowConfetti(false), 6000);

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
      }
    }
  }, [allComplete, completionTime, startTime, stats]);

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
    setSelectedLetter(letter);
    setSelectedLetterIndex(letterIndex);
  };

  const handleSlotClick = (wordIdx, slotIdx) => {
    if (slotIdx === gameData.words[wordIdx].revealedIndex) return;

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
    } else if (selectedLetter !== null) {
      setAvailableLetters(prev => {
        const newAvailable = [...prev];
        newAvailable.splice(selectedLetterIndex, 1);
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

    const shareText = `Griddle #${gameData.puzzleNumber} 🥞\n${gameData.category}\n${honeyEmojis}\n${completedWords.filter(c => c).length}/5 words | ${timeStr}\nPlay at lettergriddle.com`;

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
                  animation: `fall 3s ease-in ${(i % 10) * 0.1}s forwards`
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
          <div className="text-xl">🥞</div>
          <h1 className="text-lg md:text-xl font-bold text-amber-800" style={{fontFamily: 'Georgia, serif'}}>
            Griddle
          </h1>
          <div className="flex items-center gap-2">
            <div className="text-xl">🥞</div>
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
              <p className="text-base font-bold text-amber-800 mb-0.5">🎉 Complete! 🎉</p>
              <p className="text-xs text-amber-700 mb-1.5">Time: {formatTime(completionTime)}</p>
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
                            🍯 Delicious! 🍯
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
                          <p className="text-[10px] text-gray-700 leading-tight">{wordData.hint}</p>
                        </div>
                      )}
                      
                      <div className="flex gap-1 justify-center flex-wrap">
                        {wordData.word.split('').map((letter, letterIdx) => {
                          const isRevealed = letterIdx === wordData.revealedIndex;
                          const currentLetter = revealed[letterIdx] || '';
                          const isWrong = wrongPlacements[`${wordIdx}-${letterIdx}`];
                          
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
                <div className="flex flex-wrap gap-1 justify-center">
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
                {availableLetters.length === 0 && (
                  <div className="text-center mt-1.5">
                    <p className="text-amber-200 font-bold text-xs">✨ Clean! ✨</p>
                  </div>
                )}
              </div>
              
              {/* Instructions */}
              <div className="mt-2 text-center text-[10px] text-amber-700 bg-amber-50 rounded-lg p-1.5">
                <p className="font-semibold">🥞 Click a letter, then click an empty spot to place it</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
${completedWords.filter(c => c).length}/5 words | ${formatTime(completionTime)}
Play at lettergriddle.com`}
              </div>
            </div>

            <button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-4 rounded-full font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {shareCopied ? '✓ Copied!' : <><Share2 size={20} /> Copy to Clipboard</>}
            </button>
          </div>
        </div>
      )}

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
        © 2025 Letter Griddle. All rights reserved.
      </div>  
    </div>
    );
};

export default PancakeWordGame;