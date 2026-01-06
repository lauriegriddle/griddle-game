"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';

// Character Avatar Component - SVG illustrations matching Letter Griddle style
const CharacterAvatar = ({ character, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };
  
  const avatarSize = size === 'sm' ? 40 : size === 'md' ? 64 : 96;
  
  // Character-specific colors and features
  const characters = {
    laurel: {
      skinTone: '#F5DEB3',
      hairColor: '#4A3728',
      hairStyle: 'long',
      shirtColor: '#D4A574',
      accessory: 'apron',
      expression: 'warm'
    },
    mr_lindsay: {
      skinTone: '#F5DEB3',
      hairColor: '#E8E8E8',
      hairStyle: 'balding',
      shirtColor: '#2D5A4A',
      accessory: null,
      expression: 'friendly'
    },
    mrs_lindsay: {
      skinTone: '#F5DEB3',
      hairColor: '#E8E8E8',
      hairStyle: 'curly',
      shirtColor: '#8B4A6B',
      accessory: 'glasses',
      expression: 'kind'
    },
    sarah: {
      skinTone: '#F5DEB3',
      hairColor: '#8B4513',
      hairStyle: 'wavy',
      shirtColor: '#4A7C59',
      accessory: null,
      expression: 'wise'
    },
    taylor: {
      skinTone: '#D2956A',
      hairColor: '#2C1810',
      hairStyle: 'short',
      shirtColor: '#4A6FA5',
      accessory: null,
      expression: 'friendly'
    },
    josephine: {
      skinTone: '#F5DEB3',
      hairColor: '#6B4423',
      hairStyle: 'medium',
      shirtColor: '#9B7BB8',
      accessory: null,
      expression: 'warm'
    },
    josie: {
      skinTone: '#F5DEB3',
      hairColor: '#6B4423',
      hairStyle: 'pigtails',
      shirtColor: '#E8A0BF',
      accessory: null,
      expression: 'playful'
    },
    jennie_isaac: {
      type: 'duo',
      skinTone: '#F5DEB3',
      hairColor: '#A0522D',
      hairStyle: 'braids',
      shirtColor: '#4A7C59',
      accessory: 'dog',
      expression: 'cheerful'
    },
    hank: {
      skinTone: '#E8C4A0',
      hairColor: '#8B8B8B',
      hairStyle: 'short_gray',
      shirtColor: '#5D7B6F',
      accessory: 'cap',
      expression: 'friendly'
    }
  };
  
  const char = characters[character.id] || characters.laurel;
  
  // Special rendering for Jennie & Isaac duo
  if (char.type === 'duo') {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Background */}
          <circle cx="50" cy="50" r="48" fill="#C9B896" />
          {/* Jennie - slightly to the left */}
          <ellipse cx="42" cy="85" rx="22" ry="18" fill={char.shirtColor} />
          <ellipse cx="42" cy="45" rx="18" ry="20" fill={char.skinTone} />
          {/* Jennie's braids */}
          <path d="M 24 38 Q 24 18 42 18 Q 60 18 60 38 Q 52 32 42 32 Q 32 32 24 38" fill={char.hairColor} />
          <ellipse cx="22" cy="52" rx="4" ry="14" fill={char.hairColor} />
          <ellipse cx="62" cy="52" rx="4" ry="14" fill={char.hairColor} />
          {/* Jennie's face */}
          <ellipse cx="36" cy="44" rx="2.5" ry="3" fill="#4A3728" />
          <ellipse cx="48" cy="44" rx="2.5" ry="3" fill="#4A3728" />
          <path d="M 36 52 Q 42 57 48 52" stroke="#4A3728" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Isaac the chihuahua - on the right */}
          <circle cx="72" cy="55" r="14" fill="#D2B48C" />
          <ellipse cx="64" cy="44" rx="5" ry="8" fill="#D2B48C" transform="rotate(-15 64 44)" />
          <ellipse cx="80" cy="44" rx="5" ry="8" fill="#D2B48C" transform="rotate(15 80 44)" />
          <ellipse cx="64" cy="44" rx="3" ry="5" fill="#E8C8A8" transform="rotate(-15 64 44)" />
          <ellipse cx="80" cy="44" rx="3" ry="5" fill="#E8C8A8" transform="rotate(15 80 44)" />
          <circle cx="68" cy="53" r="3" fill="#2C1810" />
          <circle cx="76" cy="53" r="3" fill="#2C1810" />
          <circle cx="69" cy="52" r="1" fill="white" />
          <circle cx="77" cy="52" r="1" fill="white" />
          <ellipse cx="72" cy="60" rx="3" ry="2.5" fill="#2C1810" />
          <ellipse cx="72" cy="68" rx="10" ry="3" fill="#C41E3A" />
        </svg>
      </div>
    );
  }
  
  // Human characters
  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background circle */}
        <circle cx="50" cy="50" r="48" fill="#C9B896" />
        
        {/* Hair behind head for long styles */}
        {(char.hairStyle === 'long' || char.hairStyle === 'wavy' || char.hairStyle === 'medium') && (
          <ellipse cx="50" cy="40" rx="28" ry="35" fill={char.hairColor} />
        )}
        
        {/* Shirt/Body */}
        <ellipse cx="50" cy="90" rx="30" ry="25" fill={char.shirtColor} />
        
        {/* Apron for Laurel */}
        {char.accessory === 'apron' && (
          <path d="M 35 75 L 35 95 L 65 95 L 65 75 Q 50 80 35 75" fill="#F5F5DC" />
        )}
        
        {/* Face/Head */}
        <ellipse cx="50" cy="45" rx="22" ry="25" fill={char.skinTone} />
        
        {/* Hair styles */}
        {char.hairStyle === 'long' && (
          <>
            <path d="M 28 35 Q 28 15 50 15 Q 72 15 72 35 L 72 55 Q 72 40 50 38 Q 28 40 28 55 Z" fill={char.hairColor} />
            <ellipse cx="30" cy="50" rx="5" ry="20" fill={char.hairColor} />
            <ellipse cx="70" cy="50" rx="5" ry="20" fill={char.hairColor} />
          </>
        )}
        
        {char.hairStyle === 'wavy' && (
          <>
            <path d="M 28 38 Q 28 15 50 15 Q 72 15 72 38 Q 65 35 50 35 Q 35 35 28 38" fill={char.hairColor} />
            <ellipse cx="32" cy="45" rx="6" ry="15" fill={char.hairColor} />
            <ellipse cx="68" cy="45" rx="6" ry="15" fill={char.hairColor} />
          </>
        )}
        
        {char.hairStyle === 'medium' && (
          <path d="M 28 40 Q 28 18 50 18 Q 72 18 72 40 Q 65 35 50 33 Q 35 35 28 40" fill={char.hairColor} />
        )}
        
        {char.hairStyle === 'short' && (
          <path d="M 30 38 Q 30 20 50 20 Q 70 20 70 38 Q 60 35 50 35 Q 40 35 30 38" fill={char.hairColor} />
        )}
        
        {char.hairStyle === 'balding' && (
          <>
            <ellipse cx="32" cy="38" rx="8" ry="6" fill={char.hairColor} />
            <ellipse cx="68" cy="38" rx="8" ry="6" fill={char.hairColor} />
          </>
        )}
        
        {char.hairStyle === 'curly' && (
          <>
            <circle cx="35" cy="28" r="8" fill={char.hairColor} />
            <circle cx="50" cy="22" r="8" fill={char.hairColor} />
            <circle cx="65" cy="28" r="8" fill={char.hairColor} />
            <circle cx="30" cy="38" r="7" fill={char.hairColor} />
            <circle cx="70" cy="38" r="7" fill={char.hairColor} />
          </>
        )}
        
        {char.hairStyle === 'braids' && (
          <>
            <path d="M 30 38 Q 30 18 50 18 Q 70 18 70 38 Q 60 32 50 32 Q 40 32 30 38" fill={char.hairColor} />
            <ellipse cx="28" cy="55" rx="5" ry="18" fill={char.hairColor} />
            <ellipse cx="72" cy="55" rx="5" ry="18" fill={char.hairColor} />
          </>
        )}
        
        {char.hairStyle === 'pigtails' && (
          <>
            <path d="M 32 38 Q 32 22 50 22 Q 68 22 68 38 Q 58 34 50 34 Q 42 34 32 38" fill={char.hairColor} />
            <circle cx="25" cy="40" r="10" fill={char.hairColor} />
            <circle cx="75" cy="40" r="10" fill={char.hairColor} />
          </>
        )}
        
        {char.hairStyle === 'short_gray' && (
          <>
            <path d="M 30 38 Q 30 22 50 22 Q 70 22 70 38 Q 60 35 50 35 Q 40 35 30 38" fill={char.hairColor} />
          </>
        )}
        
        {/* Cap for Hank */}
        {char.accessory === 'cap' && (
          <>
            <ellipse cx="50" cy="24" rx="26" ry="8" fill="#5D4E37" />
            <path d="M 24 24 Q 24 12 50 12 Q 76 12 76 24" fill="#5D4E37" />
            <rect x="24" y="22" width="52" height="4" fill="#3D3225" />
          </>
        )}
        
        {/* Glasses for Mrs. Lindsay */}
        {char.accessory === 'glasses' && (
          <>
            <circle cx="40" cy="45" r="8" fill="none" stroke="#8B4513" strokeWidth="2" />
            <circle cx="60" cy="45" r="8" fill="none" stroke="#8B4513" strokeWidth="2" />
            <path d="M 48 45 L 52 45" stroke="#8B4513" strokeWidth="2" />
            <path d="M 32 45 L 26 42" stroke="#8B4513" strokeWidth="2" />
            <path d="M 68 45 L 74 42" stroke="#8B4513" strokeWidth="2" />
          </>
        )}
        
        {/* Eyes */}
        <ellipse cx="40" cy="45" rx="3" ry="4" fill="#4A3728" />
        <ellipse cx="60" cy="45" rx="3" ry="4" fill="#4A3728" />
        <circle cx="41" cy="44" r="1" fill="white" />
        <circle cx="61" cy="44" r="1" fill="white" />
        
        {/* Smile */}
        <path d="M 42 55 Q 50 62 58 55" stroke="#4A3728" strokeWidth="2" fill="none" strokeLinecap="round" />
        
        {/* Rosy cheeks */}
        <circle cx="35" cy="52" r="4" fill="#E8A0A0" opacity="0.5" />
        <circle cx="65" cy="52" r="4" fill="#E8A0A0" opacity="0.5" />
      </svg>
    </div>
  );
};

// Trivia Crew with updated descriptions matching your screenshot
const TRIVIA_CREW = [
  {
    id: 'laurel',
    name: 'Laurel',
    description: 'Cafe owner & trivia host',
    difficulty: 'medium',
    personality: 'warm',
    winQuotes: ["Wonderful game, friend!", "You're always welcome here!", "That was cozy!"],
    loseQuotes: ["Fresh from the griddle!", "Served up a win!", "How about some pancakes to celebrate?"],
    captureQuotes: ["Order up!", "Hot off the griddle!", "Coming through!"],
    thinkingQuotes: ["Let me think while the coffee brews...", "Hmm, like choosing a recipe...", "Stirring up a plan..."]
  },
  {
    id: 'mr_lindsay',
    name: 'Mr. Lindsay',
    description: 'Friendly regular',
    difficulty: 'hard',
    personality: 'wise',
    winQuotes: ["Good effort!", "Close game!", "Well played!"],
    loseQuotes: ["Experience wins again.", "Still got it!", "That's how we did it back in the day."],
    captureQuotes: ["Saw that coming.", "Old tricks work best.", "Patience pays off."],
    thinkingQuotes: ["Hmm, let me consider...", "Back in my day...", "Interesting position..."]
  },
  {
    id: 'sarah',
    name: 'Sarah',
    description: 'Encouraging and wise',
    difficulty: 'hard',
    personality: 'strategic',
    winQuotes: ["Impressive game!", "You've improved!", "That was challenging!"],
    loseQuotes: ["Strategic victory!", "Patience pays off.", "Well played by me!"],
    captureQuotes: ["Anticipated that.", "Part of the plan.", "Expected move."],
    thinkingQuotes: ["Analyzing options...", "Considering possibilities...", "Planning ahead..."]
  },
  {
    id: 'taylor',
    name: 'Taylor B.',
    description: 'Smart and helpful',
    difficulty: 'medium',
    personality: 'competitive',
    winQuotes: ["Great match!", "You played well!", "Rematch?"],
    loseQuotes: ["Yes! Got it!", "Knew that would work!", "Nice strategy paid off!"],
    captureQuotes: ["Gotcha!", "That's mine!", "Saw that coming!"],
    thinkingQuotes: ["Calculating...", "Interesting...", "Let's see here..."]
  },
  {
    id: 'mrs_lindsay',
    name: 'Mrs. Lindsay',
    description: 'Sharp as ever',
    difficulty: 'hard',
    personality: 'clever',
    winQuotes: ["You'll get me next time, dear!", "That was lovely!", "What a game!"],
    loseQuotes: ["Oh, how delightful!", "Still got the touch!", "That's how it's done!"],
    captureQuotes: ["Oh my!", "There we go!", "Gotcha, sweetie!"],
    thinkingQuotes: ["Now let me see...", "Ah, decisions...", "One moment, dear..."]
  },
  {
    id: 'josephine',
    name: 'Josephine',
    description: 'Sweet & supportive',
    difficulty: 'easy',
    personality: 'encouraging',
    winQuotes: ["Great game!", "You're getting better!", "That was close!"],
    loseQuotes: ["Yay, I won!", "Good try though!", "Want to play again?"],
    captureQuotes: ["Oops, got one!", "Sorry, dear!", "My turn!"],
    thinkingQuotes: ["Hmm, let me see...", "Thinking...", "Where should I go?"]
  },
  {
    id: 'josie',
    name: 'Josie',
    description: "Josephine's daughter",
    difficulty: 'easy',
    personality: 'playful',
    winQuotes: ["That was so fun!", "Good game!", "You almost had me!"],
    loseQuotes: ["Yippee!", "I did it!", "Mom, I won!"],
    captureQuotes: ["Got one!", "Boop!", "Hehe!"],
    thinkingQuotes: ["Ummmm...", "Let me think...", "Ooh, what about..."]
  },
  {
    id: 'jennie_isaac',
    name: 'Jennie & Isaac',
    description: 'Inseparable duo who love treats',
    difficulty: 'easy',
    personality: 'cheerful',
    winQuotes: ["So fun! *Isaac wags tail*", "You did great! *yip yip!*", "We loved that game!"],
    loseQuotes: ["Woohoo! *Isaac zooms*", "That was exciting!", "Let's celebrate with treats!"],
    captureQuotes: ["Got one! *arf!*", "Wheee!", "*Isaac pounces* Hop hop!"],
    thinkingQuotes: ["Hmm... *Isaac tilts head*", "What do you think, Isaac?", "*sniff sniff* Ooh, choices!"]
  },
  {
    id: 'hank',
    name: 'Hank',
    description: 'Dependable cafe regular',
    difficulty: 'hard',
    personality: 'thoughtful',
    winQuotes: ["Good game, friend.", "That was a close one!", "Well played."],
    loseQuotes: ["Still got it!", "Experience counts.", "Another win for the old-timer."],
    captureQuotes: ["Saw that coming.", "Steady wins the race.", "There we go."],
    thinkingQuotes: ["Let me think on that...", "Now, if I move here...", "Patience..."]
  }
];

// Theme configurations
const THEMES = {
  breakfast: {
    name: '🍳 Breakfast',
    player: { emoji: '🥞', name: 'Pancakes' },
    opponent: { emoji: '🧇', name: 'Waffles' },
    confetti: ['🥞', '🧇', '🍳', '🧈', '🍯', '☕'],
    boardLight: 'bg-amber-100',
    boardDark: 'bg-amber-700'
  },
  treats: {
    name: '🍬 Treats',
    player: { emoji: '🍪', name: 'Cookies' },
    opponent: { emoji: '🧁', name: 'Cupcakes' },
    confetti: ['🍪', '🧁', '🍬', '🍭', '🎂', '🍫'],
    boardLight: 'bg-pink-100',
    boardDark: 'bg-pink-700'
  },
  cafe: {
    name: '☕ Cafe',
    player: { emoji: '☕', name: 'Coffee' },
    opponent: { emoji: '🍵', name: 'Tea' },
    confetti: ['☕', '🍵', '🥐', '🧋', '🍩', '🥯'],
    boardLight: 'bg-orange-100',
    boardDark: 'bg-orange-800'
  },
  movies: {
    name: '🎬 Movies',
    player: { emoji: '🎬', name: 'Action' },
    opponent: { emoji: '🍿', name: 'Popcorn' },
    confetti: ['🎬', '🍿', '🎥', '🎞️', '⭐', '🎭'],
    boardLight: 'bg-red-100',
    boardDark: 'bg-red-800'
  },
  games: {
    name: '🎮 Games',
    player: { emoji: '🎲', name: 'Dice' },
    opponent: { emoji: '🃏', name: 'Cards' },
    confetti: ['🎲', '🃏', '🎮', '🕹️', '🏆', '🎯'],
    boardLight: 'bg-purple-100',
    boardDark: 'bg-purple-800'
  }
};

// Initialize the board
const createInitialBoard = () => {
  const board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = { player: 'opponent', isKing: false };
      }
    }
  }
  
  for (let row = 5; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = { player: 'player', isKing: false };
      }
    }
  }
  
  return board;
};

const CheckersGame = () => {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState(createInitialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [currentTurn, setCurrentTurn] = useState('player');
  const [gameStatus, setGameStatus] = useState('playing');
  const [theme, setTheme] = useState('breakfast');
  const [opponent, setOpponent] = useState(TRIVIA_CREW[0]);
  const [opponentMessage, setOpponentMessage] = useState('');
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showOpponentModal, setShowOpponentModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [roundsWon, setRoundsWon] = useState({ player: 0, opponent: 0 });
  const [gameMode, setGameMode] = useState('single');
  const [showWinModal, setShowWinModal] = useState(false);
  const [matchWinner, setMatchWinner] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [lastMove, setLastMove] = useState(null);
  const [showHints, setShowHints] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [poofEffects, setPoofEffects] = useState([]);
  const [animatingPiece, setAnimatingPiece] = useState(null);
  const [capturesThisGame, setCapturesThisGame] = useState({ player: 0, opponent: 0 });
  const boardRef = useRef(null);
  
  const [stats, setStats] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('griddleCheckersStats');
        return saved ? JSON.parse(saved) : {
          gamesPlayed: 0,
          wins: 0,
          losses: 0,
          currentStreak: 0,
          maxStreak: 0
        };
      } catch {
        return { gamesPlayed: 0, wins: 0, losses: 0, currentStreak: 0, maxStreak: 0 };
      }
    }
    return { gamesPlayed: 0, wins: 0, losses: 0, currentStreak: 0, maxStreak: 0 };
  });

  const currentTheme = THEMES[theme];

  // Add poof effect at position
  const addPoofEffect = (row, col) => {
    const id = Date.now();
    const squareSize = boardRef.current ? boardRef.current.offsetWidth / 8 : 50;
    setPoofEffects(prev => [...prev, { 
      id, 
      x: col * squareSize + squareSize / 2,
      y: row * squareSize + squareSize / 2
    }]);
    setTimeout(() => {
      setPoofEffects(prev => prev.filter(p => p.id !== id));
    }, 600);
  };

  // Get all valid moves for a piece
  const getValidMoves = useCallback((row, col, boardState, mustCapture = false) => {
    const piece = boardState[row][col];
    if (!piece) return [];
    
    const moves = [];
    const directions = piece.isKing 
      ? [[-1, -1], [-1, 1], [1, -1], [1, 1]] 
      : piece.player === 'player' 
        ? [[-1, -1], [-1, 1]] 
        : [[1, -1], [1, 1]];
    
    directions.forEach(([dr, dc]) => {
      const jumpRow = row + dr * 2;
      const jumpCol = col + dc * 2;
      const midRow = row + dr;
      const midCol = col + dc;
      
      if (jumpRow >= 0 && jumpRow < 8 && jumpCol >= 0 && jumpCol < 8) {
        const midPiece = boardState[midRow][midCol];
        if (midPiece && midPiece.player !== piece.player && !boardState[jumpRow][jumpCol]) {
          moves.push({ row: jumpRow, col: jumpCol, isCapture: true, capturedRow: midRow, capturedCol: midCol });
        }
      }
    });
    
    if (moves.length === 0 && !mustCapture) {
      directions.forEach(([dr, dc]) => {
        const newRow = row + dr;
        const newCol = col + dc;
        
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && !boardState[newRow][newCol]) {
          moves.push({ row: newRow, col: newCol, isCapture: false });
        }
      });
    }
    
    return moves;
  }, []);

  const hasAnyCapture = useCallback((player, boardState) => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = boardState[row][col];
        if (piece && piece.player === player) {
          const moves = getValidMoves(row, col, boardState, true);
          if (moves.length > 0) return true;
        }
      }
    }
    return false;
  }, [getValidMoves]);

  const getAdditionalCaptures = useCallback((row, col, boardState) => {
    return getValidMoves(row, col, boardState, true);
  }, [getValidMoves]);

  const countPieces = useCallback((boardState) => {
    let player = 0, opponent = 0;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = boardState[row][col];
        if (piece) {
          if (piece.player === 'player') player++;
          else opponent++;
        }
      }
    }
    return { player, opponent };
  }, []);

  const checkGameOver = useCallback((boardState, nextPlayer) => {
    const counts = countPieces(boardState);
    
    if (counts.player === 0) return 'opponentWins';
    if (counts.opponent === 0) return 'playerWins';
    
    let hasValidMove = false;
    for (let row = 0; row < 8 && !hasValidMove; row++) {
      for (let col = 0; col < 8 && !hasValidMove; col++) {
        const piece = boardState[row][col];
        if (piece && piece.player === nextPlayer) {
          const moves = getValidMoves(row, col, boardState);
          if (moves.length > 0) hasValidMove = true;
        }
      }
    }
    
    if (!hasValidMove) {
      return nextPlayer === 'player' ? 'opponentWins' : 'playerWins';
    }
    
    return null;
  }, [countPieces, getValidMoves]);

  const handleSquareClick = (row, col) => {
    if (currentTurn !== 'player' || gameStatus !== 'playing' || animatingPiece) return;
    
    const piece = board[row][col];
    
    if (selectedPiece && validMoves.some(m => m.row === row && m.col === col)) {
      const move = validMoves.find(m => m.row === row && m.col === col);
      makeMove(selectedPiece.row, selectedPiece.col, move);
      return;
    }
    
    if (piece && piece.player === 'player') {
      const mustCapture = hasAnyCapture('player', board);
      const moves = getValidMoves(row, col, board);
      
      if (mustCapture && !moves.some(m => m.isCapture)) {
        setOpponentMessage("You must capture if possible! 🎯");
        setTimeout(() => setOpponentMessage(''), 2000);
        return;
      }
      
      setSelectedPiece({ row, col });
      setValidMoves(mustCapture ? moves.filter(m => m.isCapture) : moves);
    } else {
      setSelectedPiece(null);
      setValidMoves([]);
    }
  };

  const makeMove = useCallback((fromRow, fromCol, move) => {
    setAnimatingPiece({
      fromRow, fromCol,
      toRow: move.row, toCol: move.col,
      piece: board[fromRow][fromCol]
    });

    setTimeout(() => {
      const newBoard = board.map(row => row.map(cell => cell ? {...cell} : null));
      const piece = {...newBoard[fromRow][fromCol]};
      
      newBoard[fromRow][fromCol] = null;
      newBoard[move.row][move.col] = piece;
      
      if (move.isCapture) {
        newBoard[move.capturedRow][move.capturedCol] = null;
        addPoofEffect(move.capturedRow, move.capturedCol);
        
        if (piece.player === 'player') {
          setCapturesThisGame(prev => ({ ...prev, player: prev.player + 1 }));
        } else {
          setCapturesThisGame(prev => ({ ...prev, opponent: prev.opponent + 1 }));
          const quotes = opponent.captureQuotes;
          setOpponentMessage(quotes[Math.floor(Math.random() * quotes.length)]);
          setTimeout(() => setOpponentMessage(''), 2000);
        }
      }
      
      if (piece.player === 'player' && move.row === 0) {
        newBoard[move.row][move.col].isKing = true;
      } else if (piece.player === 'opponent' && move.row === 7) {
        newBoard[move.row][move.col].isKing = true;
      }
      
      setBoard(newBoard);
      setLastMove({ from: { row: fromRow, col: fromCol }, to: { row: move.row, col: move.col } });
      setAnimatingPiece(null);
      
      if (move.isCapture) {
        const additionalCaptures = getAdditionalCaptures(move.row, move.col, newBoard);
        if (additionalCaptures.length > 0) {
          setSelectedPiece({ row: move.row, col: move.col });
          setValidMoves(additionalCaptures);
          return;
        }
      }
      
      setSelectedPiece(null);
      setValidMoves([]);
      
      const nextPlayer = piece.player === 'player' ? 'opponent' : 'player';
      const gameResult = checkGameOver(newBoard, nextPlayer);
      
      if (gameResult) {
        handleGameEnd(gameResult);
      } else {
        setCurrentTurn(nextPlayer);
      }
    }, 300);
  }, [board, opponent, getAdditionalCaptures, checkGameOver]);

  const handleGameEnd = useCallback((result) => {
    setGameStatus(result);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
    
    if (gameMode === 'bestOf3') {
      const newRoundsWon = { ...roundsWon };
      if (result === 'playerWins') {
        newRoundsWon.player++;
        setOpponentMessage(opponent.winQuotes[Math.floor(Math.random() * opponent.winQuotes.length)]);
      } else {
        newRoundsWon.opponent++;
        setOpponentMessage(opponent.loseQuotes[Math.floor(Math.random() * opponent.loseQuotes.length)]);
      }
      setRoundsWon(newRoundsWon);
      
      if (newRoundsWon.player >= 2 || newRoundsWon.opponent >= 2) {
        setMatchWinner(newRoundsWon.player >= 2 ? 'player' : 'opponent');
        updateStats(newRoundsWon.player >= 2);
        setShowWinModal(true);
      }
    } else {
      setMatchWinner(result === 'playerWins' ? 'player' : 'opponent');
      updateStats(result === 'playerWins');
      if (result === 'playerWins') {
        setOpponentMessage(opponent.winQuotes[Math.floor(Math.random() * opponent.winQuotes.length)]);
      } else {
        setOpponentMessage(opponent.loseQuotes[Math.floor(Math.random() * opponent.loseQuotes.length)]);
      }
      setShowWinModal(true);
    }
  }, [gameMode, roundsWon, opponent]);

  const updateStats = (playerWon) => {
    const newStats = {
      ...stats,
      gamesPlayed: stats.gamesPlayed + 1,
      wins: playerWon ? stats.wins + 1 : stats.wins,
      losses: playerWon ? stats.losses : stats.losses + 1,
      currentStreak: playerWon ? stats.currentStreak + 1 : 0,
      maxStreak: playerWon ? Math.max(stats.maxStreak, stats.currentStreak + 1) : stats.maxStreak
    };
    setStats(newStats);
    try {
      localStorage.setItem('griddleCheckersStats', JSON.stringify(newStats));
    } catch (e) {
      console.error('Could not save stats', e);
    }
  };

  const handleShare = () => {
    const result = matchWinner === 'player' ? 'Won' : 'Lost';
    const emoji = matchWinner === 'player' ? '🏆' : '🎮';
    const pieceEmoji = currentTheme.player.emoji;
    
    const shareText = `Checkers at the Cafe ${emoji}
${result} vs ${opponent.name}
${pieceEmoji} Theme: ${currentTheme.name}
Captures: ${capturesThisGame.player}
${gameMode === 'bestOf3' ? `Match: ${roundsWon.player}-${roundsWon.opponent}\n` : ''}Play at lettergriddle.com/checkers
Part of the Letter Griddle Family 🥞`;

    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const makeAIMove = useCallback(() => {
    setIsThinking(true);
    const quotes = opponent.thinkingQuotes;
    setOpponentMessage(quotes[Math.floor(Math.random() * quotes.length)]);
    
    setTimeout(() => {
      const allMoves = [];
      const mustCapture = hasAnyCapture('opponent', board);
      
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const piece = board[row][col];
          if (piece && piece.player === 'opponent') {
            const moves = getValidMoves(row, col, board);
            const validMoves = mustCapture ? moves.filter(m => m.isCapture) : moves;
            validMoves.forEach(move => {
              allMoves.push({ fromRow: row, fromCol: col, ...move });
            });
          }
        }
      }
      
      if (allMoves.length > 0) {
        const captures = allMoves.filter(m => m.isCapture);
        let chosenMove;
        
        if (captures.length > 0) {
          const kingCaptures = captures.filter(m => {
            const piece = board[m.fromRow][m.fromCol];
            return piece.isKing || m.row === 7;
          });
          chosenMove = kingCaptures.length > 0 
            ? kingCaptures[Math.floor(Math.random() * kingCaptures.length)]
            : captures[Math.floor(Math.random() * captures.length)];
        } else {
          if (opponent.difficulty === 'hard') {
            const scored = allMoves.map(m => {
              let score = Math.random() * 10;
              if (m.row > m.fromRow) score += 5;
              if (m.col >= 2 && m.col <= 5) score += 3;
              if (m.fromRow === 0) score -= 2;
              return { ...m, score };
            });
            scored.sort((a, b) => b.score - a.score);
            chosenMove = scored[0];
          } else if (opponent.difficulty === 'medium') {
            const scored = allMoves.map(m => ({
              ...m,
              score: Math.random() * 10 + (m.row > m.fromRow ? 2 : 0)
            }));
            scored.sort((a, b) => b.score - a.score);
            chosenMove = scored[Math.floor(Math.random() * Math.min(3, scored.length))];
          } else {
            chosenMove = allMoves[Math.floor(Math.random() * allMoves.length)];
          }
        }
        
        setOpponentMessage('');
        makeMove(chosenMove.fromRow, chosenMove.fromCol, chosenMove);
      }
      
      setIsThinking(false);
    }, 800 + Math.random() * 400);
  }, [board, opponent, hasAnyCapture, getValidMoves, makeMove]);

  useEffect(() => {
    if (currentTurn === 'opponent' && gameStatus === 'playing' && !animatingPiece && gameStarted) {
      makeAIMove();
    }
  }, [currentTurn, gameStatus, animatingPiece, gameStarted, makeAIMove]);

  const resetGame = () => {
    setBoard(createInitialBoard());
    setSelectedPiece(null);
    setValidMoves([]);
    setCurrentTurn('player');
    setGameStatus('playing');
    setLastMove(null);
    setOpponentMessage('');
    setShowWinModal(false);
    setMatchWinner(null);
    setShowConfetti(false);
    setCapturesThisGame({ player: 0, opponent: 0 });
    setAnimatingPiece(null);
  };

  const startNewMatch = () => {
    setRoundsWon({ player: 0, opponent: 0 });
    resetGame();
    setGameStarted(true);
  };

  const pieces = countPieces(board);

  const getAnimationStyle = (fromRow, fromCol, toRow, toCol) => {
    const squareSize = boardRef.current ? boardRef.current.offsetWidth / 8 : 50;
    return {
      transform: `translate(${(toCol - fromCol) * squareSize}px, ${(toRow - fromRow) * squareSize}px)`,
      transition: 'transform 0.3s ease-out'
    };
  };

  // ============================================
  // WELCOME SCREEN
  // ============================================
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 p-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="fixed top-10 left-10 text-6xl opacity-10 animate-pulse">🥞</div>
        <div className="fixed top-20 right-20 text-5xl opacity-10">🥞</div>
        <div className="fixed bottom-20 left-20 text-5xl opacity-10">☕</div>
        <div className="fixed bottom-10 right-10 text-6xl opacity-10 animate-pulse">🧇</div>
        
        <div className="max-w-lg mx-auto pt-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="text-7xl mb-4">☕️</div>
            <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-2" style={{fontFamily: 'Georgia, serif'}}>
              Checkers
            </h1>
            <p className="text-xl text-amber-600 mb-1" style={{fontFamily: 'Georgia, serif'}}>
              at the Letter Griddle Cafe
            </p>
            <p className="text-amber-500 text-sm">A checkers game like no other!</p>
          </div>

          {/* Main Card */}
          <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-6 border-2 border-amber-200 mb-6">
            {/* How to Play */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-4 text-center" style={{fontFamily: 'Georgia, serif'}}>
                📖 How to Play
              </h2>
              
              <div className="space-y-3 text-amber-700">
                <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-3">
                  <span className="text-2xl">👆</span>
                  <div>
                    <p className="font-semibold">Tap to Move</p>
                    <p className="text-sm text-amber-600">Select your piece, then tap where to go</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="font-semibold">Jump to Capture</p>
                    <p className="text-sm text-amber-600">Jump over opponent pieces to capture them</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-3">
                  <span className="text-2xl">👑</span>
                  <div>
                    <p className="font-semibold">King Me!</p>
                    <p className="text-sm text-amber-600">Reach the far side to become a King - move any direction!</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-3">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="font-semibold">Win the Game</p>
                    <p className="text-sm text-amber-600">Capture all opponent pieces or block their moves</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Choose Opponent Preview */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-amber-800 mb-1 text-center" style={{fontFamily: 'Georgia, serif'}}>
                 Play Against the Trivia Crew
              </h3>
              <p className="text-center text-amber-500 text-xs mb-3">Choose your opponent during the game!</p>
              <div className="flex justify-center gap-3 flex-wrap">
                {TRIVIA_CREW.slice(0, 4).map(char => (
                  <div key={char.id} className="text-center">
                    <CharacterAvatar character={char} size="md" />
                    <p className="text-xs text-amber-700 mt-1 font-medium">{char.name}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-amber-500 text-xs mt-2">+ {TRIVIA_CREW.length - 4} more friends!</p>
            </div>

            {/* Theme Preview */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-amber-800 mb-1 text-center" style={{fontFamily: 'Georgia, serif'}}>
                 Fun Themed Pieces
              </h3>
              <p className="text-center text-amber-500 text-xs mb-3">Pick your favorite theme during the game!</p>
              <div className="flex justify-center gap-4">
                {Object.values(THEMES).slice(0, 3).map((t, i) => (
                  <div key={i} className="text-center bg-amber-50 rounded-xl p-2 px-3">
                    <div className="text-2xl">{t.player.emoji} vs {t.opponent.emoji}</div>
                    <p className="text-xs text-amber-600">{t.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Modes */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-amber-800 mb-3 text-center" style={{fontFamily: 'Georgia, serif'}}>
                🎯 Two Ways to Play
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-amber-50 rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">⚡</div>
                  <p className="font-semibold text-amber-800 text-sm">Quick Game</p>
                  <p className="text-xs text-amber-600">Single round - jump right in!</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">🏆</div>
                  <p className="font-semibold text-amber-800 text-sm">Best of 3</p>
                  <p className="text-xs text-amber-600">Win 2 rounds to claim victory!</p>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={() => setGameStarted(true)}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-4 rounded-2xl font-bold text-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
               Start Playing!
            </button>
          </div>

          {/* Stats Preview */}
          {stats.gamesPlayed > 0 && (
            <div className="bg-white/70 rounded-2xl p-4 text-center">
              <p className="text-amber-700 font-medium">
                Welcome back! You've played {stats.gamesPlayed} games with {stats.wins} wins 🏆
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="text-center py-4 text-xs text-amber-600">
            <p>Part of the Letter Griddle Family 🥞</p>
            <p className="mt-1">Free & ad-free!</p>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // MAIN GAME SCREEN
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-4 relative overflow-hidden">
      {/* Decorative background emojis */}
      <div className="fixed top-4 left-4 text-4xl opacity-20">☕️</div>
      <div className="fixed top-4 right-4 text-4xl opacity-20">🥞</div>
      <div className="fixed bottom-4 left-4 text-4xl opacity-20">☕</div>
      <div className="fixed bottom-4 right-4 text-4xl opacity-20">🎲</div>

      {/* Themed Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => {
            const emoji = currentTheme.confetti[i % currentTheme.confetti.length];
            const left = (i * 7 + Math.random() * 10) % 100;
            const delay = (i % 10) * 0.1;
            const duration = 2.5 + Math.random() * 1.5;
            
            return (
              <div
                key={i}
                className="absolute text-3xl"
                style={{
                  left: `${left}%`,
                  top: '-50px',
                  animation: `confettiFall ${duration}s ease-in ${delay}s forwards`
                }}
              >
                {emoji}
              </div>
            );
          })}
        </div>
      )}

      {/* Poof Effects */}
      {poofEffects.map(poof => (
        <div
          key={poof.id}
          className="absolute pointer-events-none z-40"
          style={{
            left: boardRef.current ? boardRef.current.offsetLeft + poof.x : 0,
            top: boardRef.current ? boardRef.current.offsetTop + poof.y : 0,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="poof-effect">
            <span className="text-4xl">💥</span>
          </div>
        </div>
      ))}

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-800" style={{fontFamily: 'Georgia, serif'}}>
             Checkers at the Cafe
          </h1>
          <p className="text-amber-600 text-sm">A Letter Griddle Game</p>
        </div>

        {/* Game controls */}
        <div className="flex justify-center gap-2 mb-2 flex-wrap">
          <button
            onClick={() => setShowThemeModal(true)}
            className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md border-2 border-transparent hover:border-amber-300 flex items-center gap-1"
          >
            {currentTheme.name}
            <span className="text-xs opacity-60">▼</span>
          </button>
          <button
            onClick={() => setShowOpponentModal(true)}
            className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md border-2 border-transparent hover:border-amber-300 flex items-center gap-2"
          >
            <CharacterAvatar character={opponent} size="sm" />
            <span>vs {opponent.name}</span>
            <span className="text-xs opacity-60">▼</span>
          </button>
          <button
            onClick={() => setShowHints(!showHints)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all shadow-sm ${
              showHints ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}
          >
            💡 Hints {showHints ? 'On' : 'Off'}
          </button>
        </div>
        
        {/* Hint text for customization */}
        <p className="text-center text-xs text-amber-500 mb-4">
          Tap buttons above to change theme or opponent!
        </p>

        {/* Score and turn indicator */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-4 border-2 border-amber-200">
          <div className="flex justify-between items-center">
            <div className={`text-center p-2 rounded-xl transition-all ${currentTurn === 'player' ? 'bg-amber-100 ring-2 ring-amber-400' : ''}`}>
              <div className="text-2xl">{currentTheme.player.emoji}</div>
              <div className="text-sm font-bold text-amber-800">You</div>
              <div className="text-lg font-bold text-amber-600">{pieces.player} left</div>
            </div>
            
            <div className="text-center">
              {gameMode === 'bestOf3' && (
                <div className="text-sm text-amber-700 mb-1">
                  Best of 3: {roundsWon.player} - {roundsWon.opponent}
                </div>
              )}
              <div className="text-xl font-bold text-amber-800">
                {currentTurn === 'player' ? 'Your Turn!' : `${opponent.name}'s Turn`}
              </div>
              {isThinking && (
                <div className="text-sm text-amber-600 animate-pulse">Thinking...</div>
              )}
            </div>
            
            <div className={`text-center p-2 rounded-xl transition-all ${currentTurn === 'opponent' ? 'bg-amber-100 ring-2 ring-amber-400' : ''}`}>
              <CharacterAvatar character={opponent} size="sm" />
              <div className="text-sm font-bold text-amber-800">{opponent.name}</div>
              <div className="text-lg font-bold text-amber-600">{pieces.opponent} left</div>
            </div>
          </div>
          
          {opponentMessage && (
            <div className="mt-3 text-center bg-amber-50 rounded-xl p-2 animate-fade-in">
              <CharacterAvatar character={opponent} size="sm" />
              <span className="text-amber-700 ml-2 italic">"{opponentMessage}"</span>
            </div>
          )}
        </div>

        {/* Checkerboard */}
        <div 
          ref={boardRef}
          className="bg-gradient-to-br from-amber-800 to-amber-900 p-3 rounded-2xl shadow-2xl relative"
        >
          <div className="grid grid-cols-8 gap-0.5">
            {board.map((row, rowIdx) => (
              row.map((cell, colIdx) => {
                const isLight = (rowIdx + colIdx) % 2 === 0;
                const isSelected = selectedPiece?.row === rowIdx && selectedPiece?.col === colIdx;
                const isValidMove = validMoves.some(m => m.row === rowIdx && m.col === colIdx);
                const isCapture = validMoves.some(m => m.row === rowIdx && m.col === colIdx && m.isCapture);
                const isLastMoveFrom = lastMove?.from.row === rowIdx && lastMove?.from.col === colIdx;
                const isLastMoveTo = lastMove?.to.row === rowIdx && lastMove?.to.col === colIdx;
                const isAnimatingFrom = animatingPiece?.fromRow === rowIdx && animatingPiece?.fromCol === colIdx;
                
                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    onClick={() => handleSquareClick(rowIdx, colIdx)}
                    className={`
                      aspect-square flex items-center justify-center text-2xl md:text-3xl cursor-pointer transition-all relative
                      ${isLight 
                        ? currentTheme.boardLight
                        : `${currentTheme.boardDark} hover:opacity-90`
                      }
                      ${isSelected ? 'ring-4 ring-yellow-400 ring-inset' : ''}
                      ${isLastMoveFrom ? 'bg-yellow-300' : ''}
                      ${isLastMoveTo ? 'bg-yellow-200' : ''}
                    `}
                  >
                    {showHints && isValidMove && !cell && (
                      <div className={`absolute inset-2 rounded-full ${
                        isCapture 
                          ? 'bg-red-400 opacity-60 animate-pulse' 
                          : 'bg-green-400 opacity-40'
                      }`} />
                    )}
                    
                    {cell && !isAnimatingFrom && (
                      <div className={`
                        transform transition-all duration-200 hover:scale-110
                        ${cell.player === 'player' && currentTurn === 'player' ? 'cursor-pointer' : ''}
                        ${isSelected ? 'scale-110' : ''}
                      `}>
                        {cell.isKing ? (
                          <span className="relative inline-block">
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-base animate-bounce">👑</span>
                            {cell.player === 'player' ? currentTheme.player.emoji : currentTheme.opponent.emoji}
                          </span>
                        ) : (
                          cell.player === 'player' ? currentTheme.player.emoji : currentTheme.opponent.emoji
                        )}
                      </div>
                    )}

                    {isAnimatingFrom && animatingPiece && (
                      <div 
                        className="absolute z-30 text-2xl md:text-3xl"
                        style={getAnimationStyle(
                          animatingPiece.fromRow, animatingPiece.fromCol,
                          animatingPiece.toRow, animatingPiece.toCol
                        )}
                      >
                        {animatingPiece.piece.isKing ? (
                          <span className="relative inline-block">
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-base">👑</span>
                            {animatingPiece.piece.player === 'player' ? currentTheme.player.emoji : currentTheme.opponent.emoji}
                          </span>
                        ) : (
                          animatingPiece.piece.player === 'player' ? currentTheme.player.emoji : currentTheme.opponent.emoji
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center text-sm text-amber-700 bg-amber-50 rounded-xl p-3">
          <p className="font-semibold"> Click your piece, then click where to move!</p>
          {showHints && (
            <p className="text-xs mt-1 text-amber-600">
              🟢 Green = valid move | 🔴 Red = capture (required!)
            </p>
          )}
        </div>

        {/* Game buttons */}
        <div className="flex justify-center gap-3 mt-4 flex-wrap">
          <button
            onClick={startNewMatch}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-4 py-2 rounded-full font-bold shadow-lg transition-all"
          >
            🔄 New Game
          </button>
          <button
            onClick={() => {
              setGameMode(gameMode === 'single' ? 'bestOf3' : 'single');
              startNewMatch();
            }}
            className="bg-white border-2 border-amber-400 text-amber-700 px-4 py-2 rounded-full font-bold shadow-lg transition-all hover:bg-amber-50"
          >
            {gameMode === 'single' ? '🏆 Best of 3' : '⚡ Quick Game'}
          </button>
          <button
            onClick={() => setGameStarted(false)}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-4 py-2 rounded-full font-bold shadow-lg transition-all"
          >
            📖 How to Play
          </button>
        </div>

        {/* Stats */}
        <div className="mt-4 bg-white rounded-xl p-4 shadow-lg border-2 border-amber-200">
          <h3 className="text-lg font-bold text-amber-800 text-center mb-2" style={{fontFamily: 'Georgia, serif'}}>
            📊 Your Stats
          </h3>
          <div className="grid grid-cols-4 gap-2 text-center text-sm">
            <div className="bg-amber-50 rounded-lg p-2">
              <div className="font-bold text-amber-800">{stats.gamesPlayed}</div>
              <div className="text-amber-600 text-xs">Played</div>
            </div>
            <div className="bg-green-50 rounded-lg p-2">
              <div className="font-bold text-green-800">{stats.wins}</div>
              <div className="text-green-600 text-xs">Wins</div>
            </div>
            <div className="bg-red-50 rounded-lg p-2">
              <div className="font-bold text-red-800">{stats.losses}</div>
              <div className="text-red-600 text-xs">Losses</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-2">
              <div className="font-bold text-yellow-800">{stats.maxStreak}🔥</div>
              <div className="text-yellow-600 text-xs">Best Streak</div>
            </div>
          </div>
        </div>

        {/* Copyright Footer */}
        <div className="text-center py-6 text-xs text-amber-700 mt-4">
          <div>
            © 2026 Letter Griddle Games. Free & ad-free!
            {' | '}
            <a href="/privacy" className="hover:text-amber-600 underline">Privacy</a>
            {' | '}
            <a href="/terms" className="hover:text-amber-600 underline">Terms</a>
            {' | '}
            <a href="/" className="hover:text-amber-600 underline">More Games 🥞</a>
          </div>
        </div>
      </div>

      {/* Theme Modal */}
      {showThemeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowThemeModal(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-amber-800 mb-4 text-center" style={{fontFamily: 'Georgia, serif'}}>
              Choose Your Pieces
            </h2>
            <div className="space-y-2">
              {Object.entries(THEMES).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => { setTheme(key); setShowThemeModal(false); }}
                  className={`w-full p-3 rounded-xl flex items-center justify-between transition-all ${
                    theme === key 
                      ? 'bg-amber-200 border-2 border-amber-500' 
                      : 'bg-amber-50 hover:bg-amber-100 border-2 border-transparent'
                  }`}
                >
                  <span className="font-medium text-amber-800">{t.name}</span>
                  <span className="text-2xl">{t.player.emoji} vs {t.opponent.emoji}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Opponent Modal */}
      {showOpponentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowOpponentModal(false)}>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 max-w-md w-full shadow-2xl max-h-[85vh] overflow-y-auto border-4 border-amber-300" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-amber-800 mb-2 text-center" style={{fontFamily: 'Georgia, serif'}}>
              Choose Your Opponent
            </h2>
            <p className="text-amber-600 text-center mb-4 text-sm">Play against a member of the Trivia Crew!</p>
            
            <div className="grid grid-cols-2 gap-3">
              {TRIVIA_CREW.map(o => (
                <button
                  key={o.id}
                  onClick={() => { setOpponent(o); setShowOpponentModal(false); startNewMatch(); }}
                  className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${
                    opponent.id === o.id 
                      ? 'bg-amber-200 border-3 border-amber-500 shadow-lg' 
                      : 'bg-amber-100/80 hover:bg-amber-100 border-2 border-amber-200 hover:border-amber-400'
                  }`}
                >
                  <CharacterAvatar character={o} size="lg" />
                  <div className="text-center">
                    <div className="font-bold text-amber-800">{o.name}</div>
                    <div className="text-xs text-amber-600">{o.description}</div>
                    <div className="text-xs text-amber-500 mt-1">
                      {o.difficulty === 'easy' && '⭐ Easy'}
                      {o.difficulty === 'medium' && '⭐⭐ Medium'}
                      {o.difficulty === 'hard' && '⭐⭐⭐ Hard'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Win Modal */}
      {showWinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="mb-4">
              {matchWinner === 'player' ? (
                <div className="text-6xl">🎉</div>
              ) : (
                <CharacterAvatar character={opponent} size="lg" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-amber-800 mb-2" style={{fontFamily: 'Georgia, serif'}}>
              {matchWinner === 'player' ? 'You Won!' : `${opponent.name} Wins!`}
            </h2>
            <p className="text-amber-600 mb-2">
              {matchWinner === 'player' 
                ? "Great game! You're a checkers champion! 🏆" 
                : `${opponent.name} says: "${opponentMessage}"`
              }
            </p>
            <p className="text-sm text-amber-700 mb-4">
              Captures: You {capturesThisGame.player} - {opponent.name} {capturesThisGame.opponent}
            </p>
            {gameMode === 'bestOf3' && (
              <p className="text-sm text-amber-700 mb-4">
                Final Score: {roundsWon.player} - {roundsWon.opponent}
              </p>
            )}
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => setShowShareModal(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-full font-bold shadow-lg transition-all"
              >
                📤 Share
              </button>
              <button
                onClick={startNewMatch}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-5 py-2.5 rounded-full font-bold shadow-lg transition-all"
              >
                🔄 Play Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
            
            <h2 className="text-2xl font-bold text-amber-800 mb-4 text-center" style={{fontFamily: 'Georgia, serif'}}>
              Share Your Results! 
            </h2>
            
            <div className="bg-amber-50 rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre-wrap">
{`🏆 Checkers at the Cafe ${matchWinner === 'player' ? '🏆' : '🎮'}
${matchWinner === 'player' ? 'Won' : 'Lost'} vs ${opponent.name}
${currentTheme.player.emoji} Theme: ${currentTheme.name}
Captures: ${capturesThisGame.player}
${gameMode === 'bestOf3' ? `Match: ${roundsWon.player}-${roundsWon.opponent}\n` : ''}Play at lettergriddle.com/checkers
Part of the Letter Griddle Family 🥞`}
            </div>

            <button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {shareCopied ? '✓ Copied!' : '📋 Copy to Clipboard'}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes poof {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.8;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .poof-effect {
          animation: poof 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CheckersGame;