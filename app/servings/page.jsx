"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { X, Award } from 'lucide-react';
import Link from 'next/link';

const Avatar = ({ character, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };

  const colors = {
    laurel: { bg: '#FEF3C7', skin: '#FECACA', hair: '#78350F', shirt: '#FEF3C7', accent: '#D97706' },
    mrlindsay: { bg: '#D1FAE5', skin: '#FED7AA', hair: '#9CA3AF', shirt: '#059669', accent: '#065F46' },
    sarah: { bg: '#D1FAE5', skin: '#FECACA', hair: '#78350F', shirt: '#4ADE80', accent: '#166534' },
    taylorb: { bg: '#DBEAFE', skin: '#FED7AA', hair: '#6B7280', shirt: '#3B82F6', accent: '#1D4ED8' }
  };

  const c = colors[character] || colors.laurel;

  return (
    <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center relative overflow-hidden`} style={{ backgroundColor: c.bg }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {character === 'laurel' && <ellipse cx="50" cy="35" rx="28" ry="25" fill={c.hair} />}
        {character === 'mrlindsay' && <ellipse cx="50" cy="30" rx="22" ry="15" fill={c.hair} />}
        {character === 'sarah' && <ellipse cx="50" cy="35" rx="26" ry="22" fill={c.hair} />}
        {character === 'taylorb' && <ellipse cx="50" cy="32" rx="24" ry="18" fill={c.hair} />}
        <ellipse cx="50" cy="42" rx="22" ry="24" fill={c.skin} />
        {character === 'laurel' && (
          <>
            <path d="M28 35 Q35 25 50 28 Q65 25 72 35 Q70 20 50 18 Q30 20 28 35" fill={c.hair} />
            <ellipse cx="30" cy="45" rx="8" ry="15" fill={c.hair} />
            <ellipse cx="70" cy="45" rx="8" ry="15" fill={c.hair} />
          </>
        )}
        <circle cx="40" cy="40" r="3" fill="#1F2937" />
        <circle cx="60" cy="40" r="3" fill="#1F2937" />
        <circle cx="41" cy="39" r="1" fill="white" />
        <circle cx="61" cy="39" r="1" fill="white" />
        <path d="M40 52 Q50 58 60 52" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="50" cy="85" rx="30" ry="20" fill={c.shirt} />
        {character === 'laurel' && (
          <path d="M35 75 L35 95 L65 95 L65 75 Q50 80 35 75" fill="white" stroke={c.accent} strokeWidth="1" />
        )}
      </svg>
    </div>
  );
};

const ServingsGame = () => {
  const [gamePhase, setGamePhase] = useState('selectOpponent');
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [board, setBoard] = useState(Array(5).fill(null).map(() => Array(6).fill(null)));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [opponentMessage, setOpponentMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const [stats, setStats] = useState({
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    currentStreak: 0,
    bestStreak: 0,
    opponentStats: {},
    themeStats: {},
    achievements: []
  });

  useEffect(() => {
    setHasMounted(true);
    try {
      const saved = localStorage.getItem('servingsStats');
      if (saved) {
        setStats(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Could not load stats', e);
    }
  }, []);

  const opponents = [
    {
      id: 'laurel',
      name: 'Laurel',
      title: 'Cafe owner & trivia host',
      difficulty: 'hard',
      avatar: 'laurel',
      messages: {
        start: "Welcome to my griddle! Let's see what you've got.",
        thinking: ["Hmm, interesting move...", "Let me think about this...", "The griddle's heating up!"],
        playerGood: ["Ooh, nice placement!", "You're making this interesting...", "Well played!"],
        opponentMove: ["Here's my move!", "Watch this...", "How about here?"],
        winning: "Great game! You really know your way around a griddle!",
        losing: "I run this kitchen! Better luck next time."
      }
    },
    {
      id: 'mrlindsay',
      name: 'Mr. Lindsay',
      title: 'Friendly regular',
      difficulty: 'easy',
      avatar: 'mrlindsay',
      messages: {
        start: "Oh wonderful! I love a good game with friends.",
        thinking: ["Let me see here...", "Oh my, where should I go?", "This is fun!"],
        playerGood: ["Well played, friend!", "You're quite good at this!", "Excellent move!"],
        opponentMove: ["I'll try here!", "How's this?", "Here we go!"],
        winning: "Congratulations! That was delightful!",
        losing: "Oh my, I won! What a lovely surprise!"
      }
    },
    {
      id: 'sarah',
      name: 'Sarah',
      title: 'Encouraging and wise',
      difficulty: 'medium',
      avatar: 'sarah',
      messages: {
        start: "This is going to be such a good game!",
        thinking: ["I see what you're doing there...", "Great minds think alike!", "Ooh, let me think..."],
        playerGood: ["That was clever!", "You've got good instincts!", "Nice strategy!"],
        opponentMove: ["How about this?", "Here's my thought...", "Let's try this!"],
        winning: "You played beautifully! I knew you could do it!",
        losing: "I got lucky! You played so well."
      }
    },
    {
      id: 'taylorb',
      name: 'Taylor B.',
      title: 'Smart and helpful',
      difficulty: 'medium-hard',
      avatar: 'taylorb',
      messages: {
        start: "Alright, let's see some strategy!",
        thinking: ["Hmm, calculating options...", "Interesting position...", "Let me analyze this..."],
        playerGood: ["Oh, that was clever!", "You're keeping me on my toes!", "Smart move!"],
        opponentMove: ["Strategically speaking...", "I'll place here!", "This should work!"],
        winning: "Impressive strategy! Well deserved win!",
        losing: "My analysis paid off! Good game though!"
      }
    }
  ];

  const themes = [
    { id: 'breakfast', name: 'Breakfast', icon: '☕', playerPiece: '🥞', opponentPiece: '🧇', playerName: 'Pancakes', opponentName: 'Waffles', bgGradient: 'from-amber-100 to-orange-100' },
    { id: 'sweets', name: 'Sweet Treats', icon: '🍰', playerPiece: '🍪', opponentPiece: '🍩', playerName: 'Cookies', opponentName: 'Donuts', bgGradient: 'from-pink-100 to-rose-100' },
    { id: 'comfort', name: 'Comfort Food', icon: '🍕', playerPiece: '🍕', opponentPiece: '🍔', playerName: 'Pizza', opponentName: 'Burgers', bgGradient: 'from-red-100 to-orange-100' },
    { id: 'drinks', name: 'Coffee Shop', icon: '☕', playerPiece: '☕', opponentPiece: '🍵', playerName: 'Coffee', opponentName: 'Tea', bgGradient: 'from-amber-100 to-yellow-100' }
  ];

  const achievements = [
    { id: 'first_serving', name: 'First Serving', icon: '🍽️', description: 'Win your first game', requirement: (s) => s.wins >= 1 },
    { id: 'on_fire', name: 'On Fire', icon: '🔥', description: '3-game win streak', requirement: (s) => s.currentStreak >= 3 },
    { id: 'regular', name: 'Regular', icon: '👑', description: 'Play 10 games', requirement: (s) => s.gamesPlayed >= 10 },
    { id: 'crew_champion', name: 'Crew Champion', icon: '🏆', description: 'Beat every crew member', requirement: (s) => {
      const beaten = Object.keys(s.opponentStats || {}).filter(k => (s.opponentStats[k]?.wins || 0) > 0);
      return beaten.length >= 4;
    }},
    { id: 'speed_server', name: 'Speed Server', icon: '⚡', description: 'Win in under 8 moves', requirement: (s) => s.fastestWin && s.fastestWin < 8 },
    { id: 'breakfast_club', name: 'Breakfast Club', icon: '🧇', description: 'Win 5 games with Breakfast theme', requirement: (s) => (s.themeStats?.breakfast?.wins || 0) >= 5 },
  ];

  const checkWinner = useCallback((boardState) => {
    const rows = 5;
    const cols = 6;
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = boardState[row][col];
        if (!cell) continue;

        for (const [dr, dc] of directions) {
          const cells = [[row, col]];
          let r = row + dr;
          let c = col + dc;
          
          while (r >= 0 && r < rows && c >= 0 && c < cols && boardState[r][c] === cell) {
            cells.push([r, c]);
            r += dr;
            c += dc;
          }

          if (cells.length >= 4) {
            return { winner: cell, cells: cells.slice(0, 4) };
          }
        }
      }
    }

    const isDraw = boardState.every(row => row.every(cell => cell !== null));
    if (isDraw) return { winner: 'draw', cells: [] };
    return null;
  }, []);

  const getAIMove = useCallback((boardState, difficulty) => {
    const rows = 5;
    const cols = 6;
    const emptyCells = [];
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!boardState[r][c]) emptyCells.push([r, c]);
      }
    }

    if (emptyCells.length === 0) return null;

    for (const [r, c] of emptyCells) {
      const testBoard = boardState.map(row => [...row]);
      testBoard[r][c] = 'opponent';
      if (checkWinner(testBoard)?.winner === 'opponent') return [r, c];
    }

    for (const [r, c] of emptyCells) {
      const testBoard = boardState.map(row => [...row]);
      testBoard[r][c] = 'player';
      if (checkWinner(testBoard)?.winner === 'player') {
        if (difficulty === 'easy' && Math.random() > 0.5) continue;
        if (difficulty === 'medium' && Math.random() > 0.8) continue;
        return [r, c];
      }
    }

    if (difficulty === 'hard' || difficulty === 'medium-hard') {
      let bestMove = null;
      let bestScore = -1;

      for (const [r, c] of emptyCells) {
        let score = 0;
        const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
        
        for (const [dr, dc] of directions) {
          let count = 1;
          for (const mult of [1, -1]) {
            let nr = r + dr * mult;
            let nc = c + dc * mult;
            while (nr >= 0 && nr < rows && nc >= 0 && nc < cols && boardState[nr][nc] === 'opponent') {
              count++;
              nr += dr * mult;
              nc += dc * mult;
            }
          }
          score += count * count;
        }

        const centerBonus = (3 - Math.abs(c - 2.5)) + (2.5 - Math.abs(r - 2));
        score += centerBonus;

        if (score > bestScore) {
          bestScore = score;
          bestMove = [r, c];
        }
      }

      if (bestMove && (difficulty === 'hard' || Math.random() > 0.3)) return bestMove;
    }

    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }, [checkWinner]);

  const handleGameEnd = (result) => {
    setWinner(result.winner);
    setWinningCells(result.cells);
    setGamePhase('gameOver');

    if (result.winner === 'player') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
      setOpponentMessage(selectedOpponent.messages.winning);
    } else if (result.winner === 'opponent') {
      setOpponentMessage(selectedOpponent.messages.losing);
    }

    const newStats = { ...stats };
    newStats.gamesPlayed = (newStats.gamesPlayed || 0) + 1;
    
    if (result.winner === 'player') {
      newStats.wins = (newStats.wins || 0) + 1;
      newStats.currentStreak = (newStats.currentStreak || 0) + 1;
      newStats.bestStreak = Math.max(newStats.bestStreak || 0, newStats.currentStreak);
      if (!newStats.fastestWin || moveCount < newStats.fastestWin) newStats.fastestWin = moveCount;
    } else if (result.winner === 'opponent') {
      newStats.losses = (newStats.losses || 0) + 1;
      newStats.currentStreak = 0;
    }

    if (!newStats.opponentStats) newStats.opponentStats = {};
    if (!newStats.opponentStats[selectedOpponent.id]) newStats.opponentStats[selectedOpponent.id] = { wins: 0, losses: 0, games: 0 };
    newStats.opponentStats[selectedOpponent.id].games++;
    if (result.winner === 'player') newStats.opponentStats[selectedOpponent.id].wins++;
    else if (result.winner === 'opponent') newStats.opponentStats[selectedOpponent.id].losses++;

    if (!newStats.themeStats) newStats.themeStats = {};
    if (!newStats.themeStats[selectedTheme.id]) newStats.themeStats[selectedTheme.id] = { wins: 0, losses: 0, games: 0 };
    newStats.themeStats[selectedTheme.id].games++;
    if (result.winner === 'player') newStats.themeStats[selectedTheme.id].wins++;
    else if (result.winner === 'opponent') newStats.themeStats[selectedTheme.id].losses++;

    const newAchievements = [];
    achievements.forEach(achievement => {
      if (!newStats.achievements?.includes(achievement.id) && achievement.requirement(newStats)) {
        newAchievements.push(achievement.id);
      }
    });
    if (newAchievements.length > 0) newStats.achievements = [...(newStats.achievements || []), ...newAchievements];

    setStats(newStats);
    try { localStorage.setItem('servingsStats', JSON.stringify(newStats)); } catch (e) { console.error('Could not save stats', e); }
  };

  const handleCellClick = (row, col) => {
    if (!isPlayerTurn || winner || board[row][col] || gamePhase !== 'playing') return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = 'player';
    setBoard(newBoard);
    setMoveCount(prev => prev + 1);

    if (Math.random() > 0.6 && selectedOpponent) {
      const messages = selectedOpponent.messages.playerGood;
      setOpponentMessage(messages[Math.floor(Math.random() * messages.length)]);
    }

    const result = checkWinner(newBoard);
    if (result) {
      handleGameEnd(result);
    } else {
      setIsPlayerTurn(false);
      setTimeout(() => {
        if (Math.random() > 0.5 && selectedOpponent) {
          const messages = selectedOpponent.messages.thinking;
          setOpponentMessage(messages[Math.floor(Math.random() * messages.length)]);
        }
      }, 300);
    }
  };

  useEffect(() => {
    if (!isPlayerTurn && !winner && gamePhase === 'playing' && selectedOpponent) {
      const timer = setTimeout(() => {
        const move = getAIMove(board, selectedOpponent.difficulty);
        if (move) {
          const [row, col] = move;
          const newBoard = board.map(r => [...r]);
          newBoard[row][col] = 'opponent';
          setBoard(newBoard);
          setMoveCount(prev => prev + 1);

          if (Math.random() > 0.4) {
            const messages = selectedOpponent.messages.opponentMove;
            setOpponentMessage(messages[Math.floor(Math.random() * messages.length)]);
          }

          const result = checkWinner(newBoard);
          if (result) handleGameEnd(result);
          else setIsPlayerTurn(true);
        }
      }, 800 + Math.random() * 600);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, gamePhase, board, selectedOpponent, getAIMove, checkWinner]);

  const startGame = () => {
    setBoard(Array(5).fill(null).map(() => Array(6).fill(null)));
    setIsPlayerTurn(true);
    setWinner(null);
    setWinningCells([]);
    setMoveCount(0);
    setGamePhase('playing');
    setOpponentMessage(selectedOpponent.messages.start);
  };

  const resetGame = () => {
    setGamePhase('selectOpponent');
    setSelectedOpponent(null);
    setSelectedTheme(null);
    setBoard(Array(5).fill(null).map(() => Array(6).fill(null)));
    setWinner(null);
    setWinningCells([]);
    setMoveCount(0);
    setOpponentMessage('');
  };

  const getShareText = () => {
    const resultText = winner === 'player' ? `Beat ${selectedOpponent.name}!` : winner === 'opponent' ? `Lost to ${selectedOpponent.name}` : `Drew with ${selectedOpponent.name}`;
    return `🍽️ Servings at the Letter Griddle

${selectedTheme.icon} ${selectedTheme.name} Theme
${winner === 'player' ? '🏆' : '🎮'} ${resultText}
${selectedTheme.playerPiece} vs ${selectedTheme.opponentPiece} in ${moveCount} moves

Play at lettergriddle.com/servings
🥞 Play more games at lettergriddle.com`;
  };

  const handleShare = async () => {
    const shareText = getShareText();
    
    // Try native sharing first
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Servings at the Letter Griddle',
          text: shareText
        });
        return;
      } catch (e) {
        // User cancelled or error - fall back to clipboard
        if (e.name !== 'AbortError') {
          console.log('Native share failed, using clipboard');
        }
      }
    }
    
    // Fallback to clipboard
    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const handleRematch = () => {
    setBoard(Array(5).fill(null).map(() => Array(6).fill(null)));
    setIsPlayerTurn(true);
    setWinner(null);
    setWinningCells([]);
    setMoveCount(0);
    setGamePhase('playing');
    setOpponentMessage(selectedOpponent.messages.start);
  };

  const isWinningCell = (row, col) => winningCells.some(([r, c]) => r === row && c === col);

  if (!hasMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #92400E 0%, #B45309 15%, #D97706 30%, #F59E0B 50%, #FBBF24 70%, #FCD34D 85%, #FDE68A 100%)' }}>
        <div className="text-5xl animate-pulse">🍽️</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #92400E 0%, #B45309 15%, #D97706 30%, #F59E0B 50%, #FBBF24 70%, #FCD34D 85%, #FDE68A 100%)' }}>
      <div className="fixed top-4 left-4 text-5xl opacity-25">🍳</div>
      <div className="fixed top-4 right-4 text-5xl opacity-25">🥞</div>
      <div className="fixed bottom-4 left-4 text-5xl opacity-25">🧇</div>
      <div className="fixed bottom-4 right-4 text-5xl opacity-25">☕</div>
      <div className="fixed top-1/3 left-8 text-4xl opacity-15">🧈</div>
      <div className="fixed top-1/2 right-8 text-4xl opacity-15">🍯</div>
      <div className="fixed bottom-1/3 left-12 text-3xl opacity-15">🥄</div>
      
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top center, rgba(251, 146, 60, 0.4) 0%, transparent 50%)' }}></div>
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(245, 158, 11, 0.3) 0%, transparent 40%)' }}></div>
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top right, rgba(217, 119, 6, 0.2) 0%, transparent 35%)' }}></div>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => {
            const pieces = selectedTheme ? [selectedTheme.playerPiece, selectedTheme.opponentPiece, '🎉', '⭐', '✨'] : ['🥞', '🧇', '🍪', '🍩', '🎉'];
            const piece = pieces[i % pieces.length];
            const left = (i * 7 + Math.random() * 10) % 100;
            return (
              <div key={i} className="absolute text-3xl" style={{ left: `${left}%`, top: '-50px', animation: `confettiFall 3s ease-in ${(i % 10) * 0.1}s forwards` }}>
                {piece}
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes confettiFall { to { transform: translateY(100vh) rotate(360deg); opacity: 0; } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 10px rgba(251, 191, 36, 0.5); } 50% { box-shadow: 0 0 25px rgba(251, 191, 36, 0.8); } }
      `}</style>

      <div className="max-w-lg mx-auto p-4 relative">
        {/* Letter Griddle Games Link - Top Left */}
        <div className="absolute top-4 left-4">
          <Link href="/" className="flex items-center gap-2 text-amber-100 hover:text-white transition-colors">
            <span className="text-xl">🥞</span>
            <span className="text-sm font-semibold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Letter Griddle Games</span>
          </Link>
        </div>

        <div className="text-center pt-12 pb-4">
          <div className="flex justify-center items-center gap-3 mb-2">
            <span className="text-5xl" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>🥞</span>
            <span className="text-3xl text-amber-200 font-light">|</span>
            <span className="text-5xl" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>🍽️</span>
          </div>
          <h1 className="text-5xl font-bold" style={{ fontFamily: 'Georgia, serif', color: '#FFFBEB', textShadow: '3px 3px 6px rgba(120, 53, 15, 0.5), 0 0 30px rgba(251, 191, 36, 0.3)' }}>Servings</h1>
          <p className="text-amber-200 italic text-lg mt-1" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>At the Letter Griddle</p>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          <button onClick={() => setShowStatsModal(true)} className="bg-white/90 hover:bg-white text-amber-800 px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg border-2 border-amber-300 hover:scale-105">📊 Stats</button>
          <button onClick={() => setShowHowToPlay(true)} className="bg-white/90 hover:bg-white text-amber-800 px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg border-2 border-amber-300 hover:scale-105">How to Play</button>
        </div>

        <div className="bg-gradient-to-b from-white to-amber-50 rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(251, 191, 36, 0.1)' }}>
          
          {gamePhase === 'selectOpponent' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-amber-900 text-center mb-2" style={{ fontFamily: 'Georgia, serif' }}>Choose Your Opponent</h2>
              <p className="text-amber-700 text-center mb-6 text-sm">Play against a member of the Trivia Crew!</p>
              <div className="grid grid-cols-2 gap-4">
                {opponents.map(opponent => (
                  <button key={opponent.id} onClick={() => { setSelectedOpponent(opponent); setGamePhase('selectTheme'); }} className="bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl p-4 border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all text-center group">
                    <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform"><Avatar character={opponent.avatar} size="lg" /></div>
                    <div className="font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>{opponent.name}</div>
                    <div className="text-xs text-amber-600 mt-1">{opponent.title}</div>
                    <div className="text-xs text-amber-500 mt-1">{opponent.difficulty === 'medium-hard' ? '⭐⭐⭐' : opponent.difficulty === 'hard' ? '⭐⭐⭐⭐' : opponent.difficulty === 'medium' ? '⭐⭐' : '⭐'}</div>
                  </button>
                ))}
              </div>
              <p className="text-center text-amber-600 text-xs mt-6">🥞 Get four in a row to win! • Beat all crew members for an achievement 🍯</p>
            </div>
          )}

          {gamePhase === 'selectTheme' && selectedOpponent && (
            <div className="p-6">
              <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar character={selectedOpponent.avatar} size="md" />
                  <div>
                    <div className="font-bold text-amber-900">vs {selectedOpponent.name}</div>
                    <div className="text-xs text-amber-600">{selectedOpponent.title}</div>
                  </div>
                </div>
                <button onClick={() => setGamePhase('selectOpponent')} className="text-amber-600 hover:text-amber-800 text-sm font-semibold px-3 py-1 rounded-full border border-amber-300 hover:bg-amber-100 transition-all">Change</button>
              </div>
              <h2 className="text-2xl font-bold text-amber-900 text-center mb-6" style={{ fontFamily: 'Georgia, serif' }}>Pick Your Theme</h2>
              <div className="space-y-3">
                {themes.map(theme => (
                  <button key={theme.id} onClick={() => { setSelectedTheme(theme); setTimeout(startGame, 100); }} className={`w-full bg-gradient-to-r ${theme.bgGradient} rounded-2xl p-4 border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all text-left group`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{theme.playerPiece}</span>
                        <span className="text-amber-400">vs</span>
                        <span className="text-3xl">{theme.opponentPiece}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>{theme.name}</div>
                        <div className="text-xs text-amber-600">{theme.playerName} vs {theme.opponentName}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-center text-amber-600 text-xs mt-6">🍳 Match emoji tiles • First to get four in a row wins! 🧇</p>
            </div>
          )}

          {(gamePhase === 'playing' || gamePhase === 'gameOver') && selectedOpponent && selectedTheme && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <button onClick={resetGame} className="text-amber-600 hover:text-amber-800 text-sm font-semibold flex items-center gap-1">← Menu</button>
                <div className="text-center">
                  <div className="font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>{selectedTheme.name}</div>
                  <div className="text-xs text-amber-600">{selectedTheme.playerPiece} You vs {selectedOpponent.name} {selectedTheme.opponentPiece}</div>
                </div>
                <div className="text-xs text-amber-600">Move {moveCount}</div>
              </div>

              {opponentMessage && (
                <div className="bg-amber-100 rounded-2xl p-3 mb-4 border-2 border-amber-200 flex items-start gap-3">
                  <Avatar character={selectedOpponent.avatar} size="sm" />
                  <div>
                    <div className="font-semibold text-amber-900 text-sm">{selectedOpponent.name}</div>
                    <div className="text-amber-700 text-sm italic">"{opponentMessage}"</div>
                  </div>
                </div>
              )}

              {!winner && (
                <div className={`text-center mb-3 py-2 rounded-full font-semibold text-sm ${isPlayerTurn ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-amber-100 text-amber-800 border-2 border-amber-300'}`}>
                  {isPlayerTurn ? `Your turn! Place a ${selectedTheme.playerPiece}` : `${selectedOpponent.name} is thinking...`}
                </div>
              )}

              {winner && (
                <div className={`text-center mb-3 py-3 rounded-2xl font-bold ${winner === 'player' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-400' : winner === 'opponent' ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-2 border-amber-400' : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-2 border-gray-400'}`}>
                  {winner === 'player' && '🏆 You Won! 🏆'}
                  {winner === 'opponent' && `${selectedOpponent.name} Wins!`}
                  {winner === 'draw' && "It's a Draw!"}
                </div>
              )}

              <div className="bg-gradient-to-b from-amber-800 to-amber-900 rounded-2xl p-3 shadow-inner mb-4">
                <div className="grid grid-cols-6 gap-2">
                  {board.map((row, rowIdx) => (
                    row.map((cell, colIdx) => (
                      <button key={`${rowIdx}-${colIdx}`} onClick={() => handleCellClick(rowIdx, colIdx)} disabled={!isPlayerTurn || winner || cell} className={`aspect-square rounded-full flex items-center justify-center text-2xl transition-all duration-200 ${cell ? isWinningCell(rowIdx, colIdx) ? 'bg-gradient-to-b from-yellow-300 to-amber-400 shadow-lg' : 'bg-gradient-to-b from-amber-100 to-amber-200' : isPlayerTurn && !winner ? 'bg-gradient-to-b from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 cursor-pointer hover:scale-105' : 'bg-gradient-to-b from-amber-600 to-amber-700'}`} style={isWinningCell(rowIdx, colIdx) ? { animation: 'pulse-glow 1s infinite' } : {}}>
                        {cell === 'player' && selectedTheme.playerPiece}
                        {cell === 'opponent' && selectedTheme.opponentPiece}
                      </button>
                    ))
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-6 text-sm text-amber-700 mb-4">
                <div className="flex items-center gap-2"><span className="text-xl">{selectedTheme.playerPiece}</span><span>You</span></div>
                <div className="flex items-center gap-2"><span className="text-xl">{selectedTheme.opponentPiece}</span><span>{selectedOpponent.name}</span></div>
              </div>

              {winner && (
                <div className="flex gap-3 justify-center">
                  <button onClick={handleRematch} className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all">🔄 Rematch</button>
                  <button onClick={() => setShowShareModal(true)} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all">📤 Share</button>
                </div>
              )}

              {!winner && <p className="text-center text-amber-600 text-xs">🥞 Tap an empty spot to place your {selectedTheme.playerPiece} • Get 4 in a row to win! 🍯</p>}
            </div>
          )}
        </div>

        {/* Footer with Dynamic Copyright, Privacy, Terms */}
        <div className="text-center py-6 text-sm">
          <p className="text-amber-100 font-medium" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Part of the Letter Griddle Family</p>
          <p className="mt-1">
            <Link href="/" className="text-amber-200 hover:text-white transition-colors">🥞 lettergriddle.com</Link>
          </p>
          <div className="mt-3 text-xs text-amber-200/80">
            <span>© {new Date().getFullYear()} Letter Griddle. All rights reserved.</span>
            <span className="mx-2">|</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="mx-2">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
            <h2 className="text-2xl font-bold text-amber-800 mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>Share Your Results! 🍽️</h2>
            <div className="bg-amber-50 rounded-xl p-4 mb-4 font-mono text-sm border-2 border-amber-200">
              <div className="whitespace-pre-wrap text-amber-900">{getShareText()}</div>
            </div>
            <button onClick={handleShare} className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg transition-all">{shareCopied ? '✓ Copied!' : '📤 Share Results'}</button>
          </div>
        </div>
      )}

      {showStatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowStatsModal(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative my-8" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowStatsModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
            <h2 className="text-2xl font-bold text-amber-800 mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>Your Statistics 📊</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-amber-50 rounded-xl p-3 text-center border-2 border-amber-200"><div className="text-2xl font-bold text-amber-800">{stats.gamesPlayed || 0}</div><div className="text-xs text-amber-600">Games Played</div></div>
              <div className="bg-green-50 rounded-xl p-3 text-center border-2 border-green-200"><div className="text-2xl font-bold text-green-800">{stats.wins || 0}</div><div className="text-xs text-green-600">Wins</div></div>
              <div className="bg-amber-50 rounded-xl p-3 text-center border-2 border-amber-200"><div className="text-2xl font-bold text-amber-800">{stats.currentStreak || 0} 🔥</div><div className="text-xs text-amber-600">Current Streak</div></div>
              <div className="bg-amber-50 rounded-xl p-3 text-center border-2 border-amber-200"><div className="text-2xl font-bold text-amber-800">{stats.bestStreak || 0}</div><div className="text-xs text-amber-600">Best Streak</div></div>
            </div>
            <div className="border-t-2 border-amber-200 pt-4 mb-4">
              <h3 className="font-bold text-amber-800 mb-3 text-center">vs Trivia Crew</h3>
              <div className="space-y-2">
                {opponents.map(opp => {
                  const oppStats = stats.opponentStats?.[opp.id] || { wins: 0, losses: 0 };
                  return (
                    <div key={opp.id} className="flex items-center justify-between bg-amber-50 rounded-lg p-2 border border-amber-200">
                      <div className="flex items-center gap-2"><Avatar character={opp.avatar} size="sm" /><span className="text-sm font-semibold text-amber-800">{opp.name}</span></div>
                      <div className="text-sm text-amber-700">{oppStats.wins}W - {oppStats.losses}L</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="border-t-2 border-amber-200 pt-4">
              <h3 className="font-bold text-amber-800 mb-3 text-center flex items-center justify-center gap-2"><Award size={20} />Achievements</h3>
              <div className="space-y-2">
                {achievements.map(achievement => {
                  const unlocked = stats.achievements?.includes(achievement.id);
                  return (
                    <div key={achievement.id} className={`flex items-center gap-3 rounded-lg p-2 border ${unlocked ? 'bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-400' : 'bg-gray-100 border-gray-300 opacity-50'}`}>
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <div className={`font-semibold text-sm ${unlocked ? 'text-amber-800' : 'text-gray-600'}`}>{achievement.name}</div>
                        <div className={`text-xs ${unlocked ? 'text-amber-600' : 'text-gray-500'}`}>{achievement.description}</div>
                      </div>
                      {unlocked && <span className="text-green-500">✓</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {showHowToPlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowHowToPlay(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowHowToPlay(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
            <div className="text-center mb-4"><div className="text-4xl mb-2">🍽️</div><h2 className="text-2xl font-bold text-amber-800" style={{ fontFamily: 'Georgia, serif' }}>How to Play</h2></div>
            <div className="space-y-4">
              <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200"><div className="font-bold text-amber-800 mb-1">🥞 Goal</div><p className="text-sm text-amber-700">Get four of your pieces in a row - horizontally, vertically, or diagonally!</p></div>
              <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200"><div className="font-bold text-amber-800 mb-1">🍳 How to Play</div><ul className="text-sm text-amber-700 space-y-1"><li>• Choose an opponent from the Trivia Crew</li><li>• Pick a fun theme for your pieces</li><li>• Tap any empty spot to place your piece</li><li>• Take turns with your opponent</li><li>• First to get 4 in a row wins!</li></ul></div>
              <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200"><div className="font-bold text-amber-800 mb-1">🧇 Tips</div><ul className="text-sm text-amber-700 space-y-1"><li>• Watch for your opponent's lines!</li><li>• The center is a powerful position</li><li>• Try to create two winning threats at once</li></ul></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServingsGame;