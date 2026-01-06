"use client";
import React, { useState, useEffect, useCallback } from 'react';

// ============================================
// GRIDDLE STACKS - A Letter Griddle Word Game
// Deployment Version for lettergriddle.com/stacks
// ============================================

// Character Avatar Component
const CharacterAvatar = ({ character, size = 'md' }) => {
  const sizeClasses = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-16 h-16' };
  
  const characters = {
    laurel: { skinTone: '#F5DEB3', hairColor: '#4A3728', hairStyle: 'long', shirtColor: '#D4A574' },
    mr_lindsay: { skinTone: '#F5DEB3', hairColor: '#E8E8E8', hairStyle: 'balding', shirtColor: '#2D5A4A' },
    sarah: { skinTone: '#F5DEB3', hairColor: '#8B4513', hairStyle: 'wavy', shirtColor: '#4A7C59' },
    taylor: { skinTone: '#D2956A', hairColor: '#2C1810', hairStyle: 'short', shirtColor: '#4A6FA5' },
  };
  
  const char = characters[character.id] || characters.laurel;
  
  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-amber-200 flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="#C9B896" />
        <ellipse cx="50" cy="85" rx="28" ry="20" fill={char.shirtColor} />
        <ellipse cx="50" cy="45" rx="20" ry="22" fill={char.skinTone} />
        <ellipse cx="42" cy="44" rx="3" ry="3.5" fill="#4A3728" />
        <ellipse cx="58" cy="44" rx="3" ry="3.5" fill="#4A3728" />
        <path d="M 44 54 Q 50 59 56 54" stroke="#4A3728" strokeWidth="2" fill="none" />
        {char.hairStyle === 'long' && <path d="M 30 40 Q 30 15 50 15 Q 70 15 70 40 L 70 55 Q 50 45 30 55 Z" fill={char.hairColor} />}
        {char.hairStyle === 'short' && <path d="M 32 38 Q 32 18 50 18 Q 68 18 68 38 Q 58 32 50 32 Q 42 32 32 38" fill={char.hairColor} />}
        {char.hairStyle === 'balding' && <><ellipse cx="32" cy="36" rx="8" ry="5" fill={char.hairColor} /><ellipse cx="68" cy="36" rx="8" ry="5" fill={char.hairColor} /></>}
        {char.hairStyle === 'wavy' && <><path d="M 30 38 Q 30 15 50 15 Q 70 15 70 38" fill={char.hairColor} /><ellipse cx="30" cy="45" rx="5" ry="12" fill={char.hairColor} /><ellipse cx="70" cy="45" rx="5" ry="12" fill={char.hairColor} /></>}
      </svg>
    </div>
  );
};

// Trivia Crew opponents
const TRIVIA_CREW = [
  { id: 'laurel', name: 'Laurel', description: 'Cafe owner',
    thinkingQuotes: ["Hmm, let me think...", "What word could I make?"],
    playQuotes: ["Nice!", "Your turn!"] },
  { id: 'sarah', name: 'Sarah', description: 'Word enthusiast',
    thinkingQuotes: ["Interesting...", "Let me see..."],
    playQuotes: ["Good game!", "Beat that!"] },
  { id: 'taylor', name: 'Taylor B.', description: 'Strategist',
    thinkingQuotes: ["Calculating...", "Hmm..."],
    playQuotes: ["Ha!", "Top that!"] },
  { id: 'mr_lindsay', name: 'Mr. Lindsay', description: 'Retired teacher',
    thinkingQuotes: ["Back in my day...", "Ah yes..."],
    playQuotes: ["Splendid!", "Your move!"] },
];

// Letter distribution (Scrabble-like)
const LETTER_DISTRIBUTION = {
  'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2, 'I': 9,
  'J': 1, 'K': 1, 'L': 4, 'M': 2, 'N': 6, 'O': 8, 'P': 2, 'Q': 1, 'R': 6,
  'S': 4, 'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1
};

// ============================================
// WORD VALIDATION SYSTEM
// Uses Free Dictionary API with local fallback
// ============================================

// Word validation cache
const wordCache = new Map();

// Validate word using API
const validateWord = async (word) => {
  const upper = word.toUpperCase();
  
  // Check cache
  if (wordCache.has(upper)) {
    return wordCache.get(upper);
  }
  
  // All 2-letter Scrabble words
  const twoLetterWords = new Set([
    'AA','AB','AD','AE','AG','AH','AI','AL','AM','AN','AR','AS','AT','AW','AX','AY',
    'BA','BE','BI','BO','BY','DA','DE','DO','ED','EF','EH','EL','EM','EN','ER','ES',
    'ET','EX','FA','FE','GI','GO','HA','HE','HI','HM','HO','ID','IF','IN','IS','IT',
    'JO','KA','KI','LA','LI','LO','MA','ME','MI','MM','MO','MU','MY','NA','NE','NO',
    'NU','OD','OE','OF','OH','OI','OK','OM','ON','OP','OR','OS','OU','OW','OX','OY',
    'PA','PE','PI','PO','QI','RE','SH','SI','SO','TA','TI','TO','UH','UM','UN','UP',
    'US','UT','WE','WO','XI','XU','YA','YE','YO','ZA'
  ]);
  
  // Check 2-letter words locally (API doesn't have all Scrabble words)
  if (word.length === 2) {
    const isValid = twoLetterWords.has(upper);
    wordCache.set(upper, isValid);
    return isValid;
  }
  
  // Use Free Dictionary API for 3+ letter words
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
    );
    const isValid = response.ok;
    wordCache.set(upper, isValid);
    return isValid;
  } catch (error) {
    console.error('Dictionary API error:', error);
    // On network error, give benefit of doubt for common-looking words
    wordCache.set(upper, false);
    return false;
  }
};

// ============================================
// GAME COMPONENTS
// ============================================

// Pancake Tile
const PancakeTile = ({ letter, stackHeight = 1, size = 'md', selected = false, onClick, disabled = false, isNew = false }) => {
  const sizeClasses = { sm: 'w-7 h-7 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' };
  const stackLayers = Math.min(stackHeight, 5);
  
  return (
    <div className={`relative ${disabled ? 'opacity-50' : 'cursor-pointer'}`} onClick={disabled ? undefined : onClick}>
      {stackHeight > 1 && Array.from({ length: stackLayers - 1 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-amber-600 border border-amber-700"
          style={{
            width: size === 'sm' ? '28px' : size === 'md' ? '40px' : '48px',
            height: size === 'sm' ? '28px' : size === 'md' ? '40px' : '48px',
            top: `${(stackLayers - 1 - i) * 3}px`, left: '0px', zIndex: i
          }} />
      ))}
      <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold relative transition-all duration-200
        ${selected ? 'bg-gradient-to-br from-yellow-300 to-amber-400 ring-4 ring-amber-500 scale-110 shadow-lg z-30' 
                   : 'bg-gradient-to-br from-amber-200 to-amber-400 hover:from-amber-300 hover:to-amber-500'}
        ${isNew ? 'ring-2 ring-green-500' : ''} border-2 border-amber-500 shadow-md`}
        style={{ zIndex: 20, marginTop: stackHeight > 1 ? `${(stackLayers - 1) * 3}px` : '0' }}>
        <span className="text-amber-900">{letter}</span>
      </div>
      {stackHeight > 1 && (
        <div className="absolute bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold"
          style={{ top: '-4px', right: '-4px', zIndex: 25 }}>{stackHeight}</div>
      )}
    </div>
  );
};

// Board Cell
const BoardCell = ({ onClick, isCenter, isHighlighted, hasLetter, children }) => (
  <div onClick={onClick}
    className={`w-8 h-8 md:w-9 md:h-9 border border-amber-400 flex items-center justify-center cursor-pointer transition-all
      ${isCenter && !hasLetter ? 'bg-amber-300' : 'bg-amber-100'}
      ${isHighlighted ? 'bg-green-200 ring-2 ring-green-500' : ''}
      ${!hasLetter && !isCenter ? 'hover:bg-amber-200' : ''}`}>
    {children}
    {isCenter && !hasLetter && <span className="text-amber-600 text-lg">⭐</span>}
  </div>
);

// ============================================
// MAIN GAME COMPONENT
// ============================================

const GriddleStacks = () => {
  const BOARD_SIZE = 11;
  const HAND_SIZE = 7;
  const CENTER = Math.floor(BOARD_SIZE / 2);
  
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState(() => 
    Array(BOARD_SIZE).fill(null).map(() => 
      Array(BOARD_SIZE).fill(null).map(() => ({ letter: null, stackHeight: 0 }))
    )
  );
  const [letterPool, setLetterPool] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [opponentHand, setOpponentHand] = useState([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState(null);
  const [placedTiles, setPlacedTiles] = useState([]);
  const [currentTurn, setCurrentTurn] = useState('player');
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [opponent, setOpponent] = useState(TRIVIA_CREW[0]);
  const [opponentMessage, setOpponentMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isFirstMove, setIsFirstMove] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [lastPlayedWord, setLastPlayedWord] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passCount, setPassCount] = useState(0);

  // Initialize letter pool
  const initializeLetterPool = useCallback(() => {
    const pool = [];
    Object.entries(LETTER_DISTRIBUTION).forEach(([letter, count]) => {
      for (let i = 0; i < count; i++) pool.push(letter);
    });
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool;
  }, []);

  // Draw tiles
  const drawTiles = useCallback((pool, count) => {
    const drawn = pool.slice(0, count);
    const remaining = pool.slice(count);
    return { drawn, remaining };
  }, []);

  // Shuffle hand
  const shuffleHand = useCallback(() => {
    setPlayerHand(prev => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    setSelectedTileIndex(null);
  }, []);

  // Start game
  const startGame = useCallback(() => {
    const pool = initializeLetterPool();
    const { drawn: playerTiles, remaining: pool1 } = drawTiles(pool, HAND_SIZE);
    const { drawn: opponentTiles, remaining: pool2 } = drawTiles(pool1, HAND_SIZE);
    
    setLetterPool(pool2);
    setPlayerHand(playerTiles);
    setOpponentHand(opponentTiles);
    setBoard(Array(BOARD_SIZE).fill(null).map(() => 
      Array(BOARD_SIZE).fill(null).map(() => ({ letter: null, stackHeight: 0 }))
    ));
    setPlayerScore(0);
    setOpponentScore(0);
    setCurrentTurn('player');
    setGameOver(false);
    setWinner(null);
    setIsFirstMove(true);
    setPlacedTiles([]);
    setSelectedTileIndex(null);
    setLastPlayedWord('');
    setErrorMessage('');
    setOpponentMessage('');
    setPassCount(0);
    setGameStarted(true);
  }, [initializeLetterPool, drawTiles]);

  // Handle clicks
  const handleHandTileClick = (index) => {
    if (currentTurn !== 'player' || gameOver || isValidating) return;
    setSelectedTileIndex(selectedTileIndex === index ? null : index);
    setErrorMessage('');
  };

  const handleCellClick = (row, col) => {
    if (currentTurn !== 'player' || gameOver || selectedTileIndex === null || isValidating) return;
    
    const letter = playerHand[selectedTileIndex];
    const currentCell = board[row][col];
    
    const newBoard = board.map(r => r.map(c => ({...c})));
    newBoard[row][col] = { letter, stackHeight: currentCell.stackHeight + 1 };
    setBoard(newBoard);
    
    setPlacedTiles(prev => [...prev, { row, col, letter, previousLetter: currentCell.letter, previousHeight: currentCell.stackHeight }]);
    
    const newHand = [...playerHand];
    newHand.splice(selectedTileIndex, 1);
    setPlayerHand(newHand);
    setSelectedTileIndex(null);
    setErrorMessage('');
  };

  // Get words
  const getHorizontalWord = useCallback((boardState, row, col) => {
    let startCol = col;
    while (startCol > 0 && boardState[row][startCol - 1].letter) startCol--;
    let word = '', score = 0, c = startCol;
    while (c < BOARD_SIZE && boardState[row][c].letter) {
      word += boardState[row][c].letter;
      score += boardState[row][c].stackHeight;
      c++;
    }
    return { word, score, startCol, endCol: c - 1, row };
  }, []);

  const getVerticalWord = useCallback((boardState, row, col) => {
    let startRow = row;
    while (startRow > 0 && boardState[startRow - 1][col].letter) startRow--;
    let word = '', score = 0, r = startRow;
    while (r < BOARD_SIZE && boardState[r][col].letter) {
      word += boardState[r][col].letter;
      score += boardState[r][col].stackHeight;
      r++;
    }
    return { word, score, startRow, endRow: r - 1, col };
  }, []);

  // Validate and score - NOW ASYNC with API
  const validateAndScorePlay = useCallback(async () => {
    if (placedTiles.length === 0) {
      return { valid: false, error: 'Place at least one tile!' };
    }
    
    const rows = [...new Set(placedTiles.map(t => t.row))];
    const cols = [...new Set(placedTiles.map(t => t.col))];
    const isHorizontal = rows.length === 1;
    const isVertical = cols.length === 1;
    
    if (!isHorizontal && !isVertical) {
      return { valid: false, error: 'Tiles must be in a straight line!' };
    }
    
    // Check for gaps
    if (isHorizontal && placedTiles.length > 1) {
      const sortedCols = [...cols].sort((a, b) => a - b);
      for (let c = sortedCols[0]; c <= sortedCols[sortedCols.length - 1]; c++) {
        if (!board[rows[0]][c].letter) {
          return { valid: false, error: 'No gaps allowed!' };
        }
      }
    }
    if (isVertical && placedTiles.length > 1) {
      const sortedRows = [...rows].sort((a, b) => a - b);
      for (let r = sortedRows[0]; r <= sortedRows[sortedRows.length - 1]; r++) {
        if (!board[r][cols[0]].letter) {
          return { valid: false, error: 'No gaps allowed!' };
        }
      }
    }
    
    // First move must touch center
    if (isFirstMove) {
      const touchesCenter = placedTiles.some(t => t.row === CENTER && t.col === CENTER);
      if (!touchesCenter) {
        return { valid: false, error: 'First word must touch the center star! ⭐' };
      }
    }
    
    // Get all words formed
    const wordsFormed = [];
    const checkedWords = new Set();
    
    for (const tile of placedTiles) {
      const hWord = getHorizontalWord(board, tile.row, tile.col);
      const hKey = `H${tile.row}-${hWord.startCol}`;
      if (hWord.word.length >= 2 && !checkedWords.has(hKey)) {
        checkedWords.add(hKey);
        wordsFormed.push(hWord);
      }
      
      const vWord = getVerticalWord(board, tile.row, tile.col);
      const vKey = `V${vWord.startRow}-${tile.col}`;
      if (vWord.word.length >= 2 && !checkedWords.has(vKey)) {
        checkedWords.add(vKey);
        wordsFormed.push(vWord);
      }
    }
    
    if (wordsFormed.length === 0) {
      return { valid: false, error: 'Must form at least one word (2+ letters)!' };
    }
    
    // VALIDATE ALL WORDS WITH API
    for (const wordObj of wordsFormed) {
      const isValid = await validateWord(wordObj.word);
      if (!isValid) {
        return { valid: false, error: `"${wordObj.word}" is not a valid word!` };
      }
    }
    
    // Check connection after first move
    if (!isFirstMove) {
      const connects = placedTiles.some(tile => {
        if (tile.previousLetter) return true;
        const { row, col } = tile;
        const adjacents = [[row-1,col],[row+1,col],[row,col-1],[row,col+1]];
        return adjacents.some(([r, c]) => {
          if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) return false;
          if (!board[r][c].letter) return false;
          return !placedTiles.some(t => t.row === r && t.col === c);
        });
      });
      if (!connects) {
        return { valid: false, error: 'Must connect to existing words!' };
      }
    }
    
    const totalScore = wordsFormed.reduce((sum, w) => sum + w.score, 0);
    const mainWord = wordsFormed.reduce((longest, w) => w.word.length > longest.word.length ? w : longest, wordsFormed[0]);
    
    return { valid: true, score: totalScore, words: wordsFormed, mainWord: mainWord.word };
  }, [placedTiles, board, isFirstMove, getHorizontalWord, getVerticalWord, CENTER]);

  // Submit play - NOW ASYNC
  const submitPlay = useCallback(async () => {
    setIsValidating(true);
    setErrorMessage('Checking words...');
    
    try {
      const result = await validateAndScorePlay();
      
      if (!result.valid) {
        setErrorMessage(result.error);
        setIsValidating(false);
        return;
      }
      
      setPlayerScore(prev => prev + result.score);
      setLastPlayedWord(result.mainWord);
      
      const tilesToDraw = Math.min(placedTiles.length, letterPool.length);
      const { drawn, remaining } = drawTiles(letterPool, tilesToDraw);
      setPlayerHand(prev => [...prev, ...drawn]);
      setLetterPool(remaining);
      
      setPlacedTiles([]);
      setIsFirstMove(false);
      setErrorMessage('');
      setPassCount(0);
      
      if (remaining.length === 0 && playerHand.length === 0) {
        endGame();
        setIsValidating(false);
        return;
      }
      
      setCurrentTurn('opponent');
    } finally {
      setIsValidating(false);
    }
  }, [validateAndScorePlay, placedTiles, letterPool, drawTiles, playerHand]);

  // Undo
  const undoPlacement = useCallback(() => {
    if (placedTiles.length === 0 || isValidating) return;
    
    const newBoard = board.map(r => r.map(c => ({...c})));
    const returnedTiles = [];
    
    placedTiles.forEach(({ row, col, letter, previousLetter, previousHeight }) => {
      newBoard[row][col] = { letter: previousLetter, stackHeight: previousHeight };
      returnedTiles.push(letter);
    });
    
    setBoard(newBoard);
    setPlayerHand(prev => [...prev, ...returnedTiles]);
    setPlacedTiles([]);
    setErrorMessage('');
  }, [placedTiles, board, isValidating]);

  // Pass
  const passTurn = useCallback(() => {
    if (isValidating) return;
    setPlacedTiles([]);
    setPassCount(prev => prev + 1);
    if (passCount >= 1) { endGame(); return; }
    setCurrentTurn('opponent');
  }, [passCount, isValidating]);

  // End game
  const endGame = useCallback(() => {
    setGameOver(true);
    setWinner(playerScore > opponentScore ? 'player' : playerScore < opponentScore ? 'opponent' : 'tie');
  }, [playerScore, opponentScore]);

  // Simple AI
  const makeAIMove = useCallback(() => {
    setIsThinking(true);
    setOpponentMessage(opponent.thinkingQuotes[Math.floor(Math.random() * opponent.thinkingQuotes.length)]);
    
    setTimeout(() => {
      let madePlay = false;
      const simpleWords = ['CAT','DOG','HAT','THE','AND','FOR','PAN','CUP','TEA','EGG','PIE','BAT','RAT','SAT','MAT'];
      
      if (isFirstMove) {
        for (const word of simpleWords) {
          const letters = word.split('');
          const handCounts = {};
          opponentHand.forEach(l => { handCounts[l] = (handCounts[l] || 0) + 1; });
          const letterCounts = {};
          letters.forEach(l => { letterCounts[l] = (letterCounts[l] || 0) + 1; });
          
          if (Object.entries(letterCounts).every(([l, c]) => (handCounts[l] || 0) >= c)) {
            const newBoard = board.map(r => r.map(c => ({...c})));
            const startCol = CENTER - Math.floor(letters.length / 2);
            let score = 0;
            const usedLetters = [];
            
            letters.forEach((letter, i) => {
              newBoard[CENTER][startCol + i] = { letter, stackHeight: 1 };
              score += 1;
              usedLetters.push(letter);
            });
            
            setBoard(newBoard);
            setOpponentScore(prev => prev + score);
            setLastPlayedWord(word);
            
            const newHand = [...opponentHand];
            usedLetters.forEach(l => {
              const idx = newHand.indexOf(l);
              if (idx > -1) newHand.splice(idx, 1);
            });
            
            const { drawn, remaining } = drawTiles(letterPool, usedLetters.length);
            setOpponentHand([...newHand, ...drawn]);
            setLetterPool(remaining);
            
            setOpponentMessage(opponent.playQuotes[Math.floor(Math.random() * opponent.playQuotes.length)]);
            setIsFirstMove(false);
            madePlay = true;
            break;
          }
        }
      }
      
      if (!madePlay) {
        setOpponentMessage("I'll pass...");
        setPassCount(prev => {
          if (prev >= 1) setTimeout(() => endGame(), 500);
          return prev + 1;
        });
      } else {
        setPassCount(0);
      }
      
      setIsThinking(false);
      if (letterPool.length === 0 && opponentHand.length === 0) { endGame(); return; }
      setCurrentTurn('player');
    }, 1500);
  }, [opponent, opponentHand, board, isFirstMove, letterPool, drawTiles, endGame, CENTER]);

  // Trigger AI
  useEffect(() => {
    if (currentTurn === 'opponent' && !gameOver && gameStarted) {
      makeAIMove();
    }
  }, [currentTurn, gameOver, gameStarted, makeAIMove]);

  // ============================================
  // RENDER
  // ============================================

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 p-4">
        <div className="max-w-lg mx-auto pt-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🥞📚</div>
            <h1 className="text-4xl font-bold text-amber-800 mb-2" style={{fontFamily: 'Georgia, serif'}}>Griddle Stacks</h1>
            <p className="text-xl text-amber-600">A Letter Griddle Word Game</p>
            <p className="text-amber-500 text-sm mt-1">Stack pancakes, spell words, score big!</p>
          </div>

          <div className="bg-white/90 rounded-3xl shadow-2xl p-6 border-2 border-amber-200 mb-6">
            <h2 className="text-2xl font-bold text-amber-800 mb-4 text-center" style={{fontFamily: 'Georgia, serif'}}>📖 How to Play</h2>
            
            <div className="space-y-3 text-amber-700 mb-6">
              <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-3">
                <span className="text-2xl">🥞</span>
                <div><p className="font-semibold">Spell Words</p><p className="text-sm text-amber-600">Place letters to form valid English words</p></div>
              </div>
              <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-3">
                <span className="text-2xl">➕</span>
                <div><p className="font-semibold">Build Crosswords</p><p className="text-sm text-amber-600">Connect new words to existing ones</p></div>
              </div>
              <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-3">
                <span className="text-2xl">📚</span>
                <div><p className="font-semibold">Stack for Bonus!</p><p className="text-sm text-amber-600">Place on existing letters for extra points</p></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 mb-6 border border-green-300">
              <h3 className="font-bold text-green-800 mb-2 text-center">📖 Real Dictionary!</h3>
              <p className="text-sm text-green-700 text-center">Uses a real English dictionary API - any valid word works!</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-amber-800 mb-3 text-center">🎭 Choose Opponent</h3>
              <div className="flex justify-center gap-3 flex-wrap">
                {TRIVIA_CREW.map(char => (
                  <button key={char.id} onClick={() => setOpponent(char)}
                    className={`text-center p-2 rounded-xl transition-all ${opponent.id === char.id ? 'bg-amber-200 ring-2 ring-amber-500' : 'bg-amber-50 hover:bg-amber-100'}`}>
                    <CharacterAvatar character={char} size="md" />
                    <p className="text-xs text-amber-700 mt-1 font-medium">{char.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={startGame}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-4 rounded-2xl font-bold text-xl shadow-lg transition-all transform hover:scale-105">
              🥞 Start Stacking!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-2 md:p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-2">
          <h1 className="text-xl md:text-2xl font-bold text-amber-800" style={{fontFamily: 'Georgia, serif'}}>🥞 Griddle Stacks</h1>
        </div>

        {/* Scoreboard */}
        <div className="bg-white rounded-xl shadow-lg p-3 mb-3 border-2 border-amber-200">
          <div className="flex justify-between items-center">
            <div className={`text-center p-2 rounded-lg ${currentTurn === 'player' ? 'bg-amber-100 ring-2 ring-amber-400' : ''}`}>
              <div className="text-2xl">🥞</div>
              <div className="text-xs font-bold text-amber-800">You</div>
              <div className="text-xl font-bold text-amber-600">{playerScore}</div>
            </div>
            
            <div className="text-center flex-1 px-2">
              <div className="text-sm text-amber-700 font-medium">
                {isValidating ? 'Checking...' : isThinking ? `${opponent.name} thinking...` : `${currentTurn === 'player' ? 'Your' : opponent.name + "'s"} Turn`}
              </div>
              <div className="text-xs text-amber-500">{letterPool.length} tiles left</div>
              {lastPlayedWord && <div className="text-sm text-green-600 font-bold">Last: {lastPlayedWord}</div>}
            </div>
            
            <div className={`text-center p-2 rounded-lg ${currentTurn === 'opponent' ? 'bg-amber-100 ring-2 ring-amber-400' : ''}`}>
              <CharacterAvatar character={opponent} size="sm" />
              <div className="text-xs font-bold text-amber-800">{opponent.name}</div>
              <div className="text-xl font-bold text-amber-600">{opponentScore}</div>
            </div>
          </div>
          
          {opponentMessage && (
            <div className="mt-2 text-center bg-amber-50 rounded-lg p-2">
              <span className="text-amber-700 text-sm italic">"{opponentMessage}"</span>
            </div>
          )}
        </div>

        {/* Error/Status */}
        {errorMessage && (
          <div className={`${errorMessage === 'Checking words...' ? 'bg-blue-100 border-blue-300' : 'bg-red-100 border-red-300'} border-2 rounded-lg p-2 mb-3 text-center`}>
            <span className={`${errorMessage === 'Checking words...' ? 'text-blue-700' : 'text-red-700'} text-sm font-medium`}>{errorMessage}</span>
          </div>
        )}

        {/* Board */}
        <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-2 rounded-xl shadow-xl mb-3 overflow-x-auto">
          <div className="grid gap-0.5 mx-auto" style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(2rem, 2.25rem))`, width: 'fit-content' }}>
            {board.map((row, rowIdx) => (
              row.map((cell, colIdx) => (
                <BoardCell key={`${rowIdx}-${colIdx}`} onClick={() => handleCellClick(rowIdx, colIdx)}
                  isCenter={rowIdx === CENTER && colIdx === CENTER}
                  isHighlighted={placedTiles.some(t => t.row === rowIdx && t.col === colIdx)}
                  hasLetter={!!cell.letter}>
                  {cell.letter && <PancakeTile letter={cell.letter} stackHeight={cell.stackHeight} size="sm"
                    isNew={placedTiles.some(t => t.row === rowIdx && t.col === colIdx)} />}
                </BoardCell>
              ))
            ))}
          </div>
        </div>

        {/* Hand */}
        <div className="bg-white rounded-xl shadow-lg p-3 mb-3 border-2 border-amber-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-amber-700 font-medium">Your Pancakes</span>
            <button onClick={shuffleHand} disabled={currentTurn !== 'player' || isValidating}
              className="bg-amber-200 hover:bg-amber-300 disabled:opacity-50 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
              🔀 Shuffle
            </button>
          </div>
          <div className="flex justify-center gap-2 flex-wrap">
            {playerHand.map((letter, idx) => (
              <PancakeTile key={idx} letter={letter} size="lg" selected={selectedTileIndex === idx}
                onClick={() => handleHandTileClick(idx)} disabled={currentTurn !== 'player' || isValidating} />
            ))}
          </div>
          <p className="text-xs text-amber-500 text-center mt-2">Tap a pancake, then tap the board</p>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-2 flex-wrap mb-3">
          <button onClick={undoPlacement} disabled={placedTiles.length === 0 || currentTurn !== 'player' || isValidating}
            className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-gray-700 px-4 py-2 rounded-full font-medium text-sm">↩️ Undo</button>
          <button onClick={submitPlay} disabled={placedTiles.length === 0 || currentTurn !== 'player' || isValidating}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white px-6 py-2 rounded-full font-bold text-sm">
            {isValidating ? '⏳ Checking...' : '✓ Submit Word'}
          </button>
          <button onClick={passTurn} disabled={currentTurn !== 'player' || placedTiles.length > 0 || isValidating}
            className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-gray-700 px-4 py-2 rounded-full font-medium text-sm">⏭️ Pass</button>
          <button onClick={startGame}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-4 py-2 rounded-full font-medium text-sm">🔄 New</button>
        </div>

        {/* Game Over */}
        {gameOver && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
              <div className="text-6xl mb-4">{winner === 'player' ? '🎉' : winner === 'tie' ? '🤝' : '🥞'}</div>
              <h2 className="text-3xl font-bold text-amber-800 mb-2">
                {winner === 'player' ? 'You Won!' : winner === 'tie' ? "It's a Tie!" : `${opponent.name} Wins!`}
              </h2>
              <div className="text-xl text-amber-700 mb-4">
                <p>You: {playerScore} pts</p>
                <p>{opponent.name}: {opponentScore} pts</p>
              </div>
              <button onClick={startGame}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-8 py-3 rounded-full font-bold text-lg">
                🥞 Play Again
              </button>
            </div>
          </div>
        )}

        <div className="text-center py-4 text-xs text-amber-600">
          <p>Part of the Letter Griddle Family 🥞</p>
          <p className="mt-1"><a href="/" className="underline hover:text-amber-800">← Back to Letter Griddle</a></p>
        </div>
      </div>
    </div>
  );
};

export default GriddleStacks;