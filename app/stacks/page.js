"use client";
import React, { useState, useCallback } from 'react';

const LETTER_DISTRIBUTION = {
  'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2, 'I': 9,
  'J': 1, 'K': 1, 'L': 4, 'M': 2, 'N': 6, 'O': 8, 'P': 2, 'Q': 1, 'R': 6,
  'S': 4, 'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1
};

// Common English words for validation
const VALID_WORDS = new Set([
  'AA','AB','AD','AE','AG','AH','AI','AL','AM','AN','AR','AS','AT','AW','AX','AY',
  'BA','BE','BI','BO','BY','DA','DE','DO','ED','EF','EH','EL','EM','EN','ER','ES',
  'ET','EX','FA','FE','GI','GO','HA','HE','HI','HM','HO','ID','IF','IN','IS','IT',
  'JO','KA','KI','LA','LI','LO','MA','ME','MI','MM','MO','MU','MY','NA','NE','NO',
  'NU','OD','OE','OF','OH','OI','OK','OM','ON','OP','OR','OS','OU','OW','OX','OY',
  'PA','PE','PI','PO','QI','RE','SH','SI','SO','TA','TI','TO','UH','UM','UN','UP',
  'US','UT','WE','WO','XI','XU','YA','YE','YO','ZA',
  'THE','AND','FOR','ARE','BUT','NOT','YOU','ALL','CAN','HAD','HER','WAS','ONE',
  'OUR','OUT','DAY','GET','HAS','HIM','HIS','HOW','ITS','LET','MAY','NEW','NOW',
  'OLD','SEE','WAY','WHO','BOY','DID','SAY','SHE','TOO','USE','CAT','DOG','BAT',
  'HAT','SAT','RAT','MAT','PAT','FAT','EAT','RUN','SUN','FUN','PAN','CUP','MUG',
  'POT','TEA','EGG','PIE','JAM','TOP','HOT','SET','BET','JET','MET','NET','PET',
  'WET','YET','BIG','DIG','FIG','PIG','WIG','BAD','DAD','MAD','SAD','BED','RED',
  'BAG','RAG','TAG','BEG','LEG','BUG','HUG','JUG','MUG','RUG','ACE','ICE','AGE',
  'OWL','ARM','ART','BOX','FOX','MIX','SIX','WAX','BOW','COW','HOW','NOW','ROW',
  'BAY','DAY','HAY','JAY','LAY','MAY','PAY','RAY','SAY','WAY','BUY','GUY','SKY',
  'TRY','WHY','CRY','DRY','FLY','CAKE','BAKE','MAKE','TAKE','LAKE','WAKE','BOOK',
  'LOOK','COOK','HOOK','TOOK','FOOD','GOOD','MOOD','WOOD','WORD','WORK','GAME',
  'PLAY','TILE','TURN','HOME','COME','SOME','BONE','DONE','GONE','TONE','FINE',
  'LINE','MINE','NINE','TIME','DIME','FIRE','HIRE','TIRE','WIRE','CAFE','MENU',
  'CHEF','DISH','MEAL','WARM','FARM','FORM','BEST','NEST','REST','TEST','WEST',
  'CAST','FAST','LAST','PAST','COST','LOST','MOST','POST','JUST','MUST','BACK',
  'PACK','JACK','LACK','KICK','PICK','SICK','TICK','DUCK','LUCK','BANK','TANK',
  'PINK','SINK','ALSO','AREA','AWAY','BEEN','BOTH','CALL','CAME','CASE','CITY',
  'DAYS','DOES','EACH','EVEN','FACT','FEEL','FIND','FROM','GAVE','GIVE','GOES',
  'HAND','HAVE','HEAD','HELP','HERE','HIGH','INTO','KIND','KNOW','LEFT','LESS',
  'LIFE','LIKE','LONG','MADE','MANY','MEAN','MORE','MUCH','NAME','NEED','NEXT',
  'ONLY','OVER','PART','SAID','SAME','SEEM','SHOW','SIDE','SUCH','SURE','TELL',
  'THAN','THEM','THEN','THEY','THIS','TOLD','TRUE','UPON','USED','VERY','WANT',
  'WEEK','WELL','WENT','WERE','WILL','WITH','YEAR','YOUR','BLUE','WHITE','BLACK',
  'GREEN','BROWN','STACK','SNACK','TRACK','CRACK','ABOUT','AFTER','AGAIN','BEING',
  'BELOW','BRING','COULD','EVERY','FIRST','FOUND','GIVEN','GOING','GREAT','GROUP',
  'HOUSE','LARGE','LATER','LEARN','LEVEL','LIGHT','MIGHT','MONEY','NEVER','NIGHT',
  'ORDER','OTHER','PLACE','POINT','POWER','RIGHT','SHALL','SINCE','SMALL','SOUND',
  'STAND','STILL','STUDY','TAKEN','THERE','THESE','THING','THINK','THREE','TODAY',
  'UNDER','UNTIL','USING','WATER','WHERE','WHICH','WHILE','WORLD','WOULD','WRITE',
  'YOUNG','GRIDDLE','PANCAKE','WAFFLE','BREAKFAST','SYRUP','BUTTER','HELLO','HAPPY'
]);

const wordCache = new Map();

const validateWord = async (word) => {
  const upper = word.toUpperCase();
  if (wordCache.has(upper)) return wordCache.get(upper);
  if (VALID_WORDS.has(upper)) {
    wordCache.set(upper, true);
    return true;
  }
  
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
    const isValid = response.ok;
    wordCache.set(upper, isValid);
    return isValid;
  } catch {
    wordCache.set(upper, false);
    return false;
  }
};

function PancakeTile({ letter, stackHeight = 1, selected = false, onClick, disabled = false, isNew = false }) {
  return (
    <div className={`relative ${disabled ? 'opacity-50' : 'cursor-pointer'}`} onClick={disabled ? undefined : onClick}>
      {stackHeight > 1 && Array.from({ length: Math.min(stackHeight, 5) - 1 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-amber-600 border border-amber-700 w-10 h-10"
          style={{ top: `${(Math.min(stackHeight, 5) - 1 - i) * 3}px`, left: '0px', zIndex: i }} />
      ))}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold relative transition-all
        ${selected ? 'bg-gradient-to-br from-yellow-300 to-amber-400 ring-4 ring-amber-500 scale-110 shadow-lg z-30' 
                   : 'bg-gradient-to-br from-amber-200 to-amber-400 hover:from-amber-300 hover:to-amber-500'}
        ${isNew ? 'ring-2 ring-green-500' : ''} border-2 border-amber-500 shadow-md`}
        style={{ zIndex: 20, marginTop: stackHeight > 1 ? `${(Math.min(stackHeight, 5) - 1) * 3}px` : '0' }}>
        <span className="text-amber-900 text-sm">{letter}</span>
      </div>
      {stackHeight > 1 && (
        <div className="absolute bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold"
          style={{ top: '-4px', right: '-4px', zIndex: 25 }}>{stackHeight}</div>
      )}
    </div>
  );
}

function BoardCell({ onClick, isCenter, isHighlighted, hasLetter, children }) {
  return (
    <div onClick={onClick}
      className={`w-8 h-8 md:w-9 md:h-9 border border-amber-400 flex items-center justify-center cursor-pointer transition-all
        ${isCenter && !hasLetter ? 'bg-amber-300' : 'bg-amber-100'}
        ${isHighlighted ? 'bg-green-200 ring-2 ring-green-500' : ''}
        ${!hasLetter && !isCenter ? 'hover:bg-amber-200' : ''}`}>
      {children}
      {isCenter && !hasLetter && <span className="text-amber-600 text-lg">⭐</span>}
    </div>
  );
}

function GriddleStacks() {
  const BOARD_SIZE = 11;
  const HAND_SIZE = 7;
  const CENTER = Math.floor(BOARD_SIZE / 2);
  
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState(() => 
    Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null).map(() => ({ letter: null, stackHeight: 0 })))
  );
  const [letterPool, setLetterPool] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [opponentHand, setOpponentHand] = useState([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState(null);
  const [placedTiles, setPlacedTiles] = useState([]);
  const [currentTurn, setCurrentTurn] = useState('player');
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isFirstMove, setIsFirstMove] = useState(true);
  const [isValidating, setIsValidating] = useState(false);
  const [lastPlayedWord, setLastPlayedWord] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passCount, setPassCount] = useState(0);

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

  const drawTiles = useCallback((pool, count) => {
    return { drawn: pool.slice(0, count), remaining: pool.slice(count) };
  }, []);

  const shuffleHand = () => {
    setPlayerHand(prev => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    setSelectedTileIndex(null);
  };

  const startGame = () => {
    const pool = initializeLetterPool();
    const { drawn: playerTiles, remaining: pool1 } = drawTiles(pool, HAND_SIZE);
    const { drawn: opponentTiles, remaining: pool2 } = drawTiles(pool1, HAND_SIZE);
    
    setLetterPool(pool2);
    setPlayerHand(playerTiles);
    setOpponentHand(opponentTiles);
    setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null).map(() => ({ letter: null, stackHeight: 0 }))));
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
    setPassCount(0);
    setGameStarted(true);
  };

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

  const getHorizontalWord = (boardState, row, col) => {
    let startCol = col;
    while (startCol > 0 && boardState[row][startCol - 1].letter) startCol--;
    let word = '', score = 0, c = startCol;
    while (c < BOARD_SIZE && boardState[row][c].letter) {
      word += boardState[row][c].letter;
      score += boardState[row][c].stackHeight;
      c++;
    }
    return { word, score, startCol };
  };

  const getVerticalWord = (boardState, row, col) => {
    let startRow = row;
    while (startRow > 0 && boardState[startRow - 1][col].letter) startRow--;
    let word = '', score = 0, r = startRow;
    while (r < BOARD_SIZE && boardState[r][col].letter) {
      word += boardState[r][col].letter;
      score += boardState[r][col].stackHeight;
      r++;
    }
    return { word, score, startRow };
  };

  const validateAndScorePlay = async () => {
    if (placedTiles.length === 0) return { valid: false, error: 'Place at least one tile!' };
    
    const rows = [...new Set(placedTiles.map(t => t.row))];
    const cols = [...new Set(placedTiles.map(t => t.col))];
    
    if (rows.length > 1 && cols.length > 1) return { valid: false, error: 'Tiles must be in a straight line!' };
    
    if (isFirstMove && !placedTiles.some(t => t.row === CENTER && t.col === CENTER)) {
      return { valid: false, error: 'First word must touch the center star! ⭐' };
    }
    
    const wordsFormed = [];
    const checked = new Set();
    
    for (const tile of placedTiles) {
      const hWord = getHorizontalWord(board, tile.row, tile.col);
      const hKey = `H${tile.row}-${hWord.startCol}`;
      if (hWord.word.length >= 2 && !checked.has(hKey)) {
        checked.add(hKey);
        wordsFormed.push(hWord);
      }
      
      const vWord = getVerticalWord(board, tile.row, tile.col);
      const vKey = `V${vWord.startRow}-${tile.col}`;
      if (vWord.word.length >= 2 && !checked.has(vKey)) {
        checked.add(vKey);
        wordsFormed.push(vWord);
      }
    }
    
    if (wordsFormed.length === 0) return { valid: false, error: 'Must form a word (2+ letters)!' };
    
    for (const w of wordsFormed) {
      const isValid = await validateWord(w.word);
      if (!isValid) return { valid: false, error: `"${w.word}" is not a valid word!` };
    }
    
    if (!isFirstMove) {
      const connects = placedTiles.some(tile => {
        if (tile.previousLetter) return true;
        const adj = [[tile.row-1,tile.col],[tile.row+1,tile.col],[tile.row,tile.col-1],[tile.row,tile.col+1]];
        return adj.some(([r, c]) => r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c].letter && !placedTiles.some(t => t.row === r && t.col === c));
      });
      if (!connects) return { valid: false, error: 'Must connect to existing words!' };
    }
    
    const totalScore = wordsFormed.reduce((sum, w) => sum + w.score, 0);
    return { valid: true, score: totalScore, mainWord: wordsFormed[0].word };
  };

  const submitPlay = async () => {
    setIsValidating(true);
    setErrorMessage('Checking...');
    
    const result = await validateAndScorePlay();
    
    if (!result.valid) {
      setErrorMessage(result.error);
      setIsValidating(false);
      return;
    }
    
    setPlayerScore(prev => prev + result.score);
    setLastPlayedWord(result.mainWord);
    
    const { drawn, remaining } = drawTiles(letterPool, Math.min(placedTiles.length, letterPool.length));
    setPlayerHand(prev => [...prev, ...drawn]);
    setLetterPool(remaining);
    
    setPlacedTiles([]);
    setIsFirstMove(false);
    setErrorMessage('');
    setPassCount(0);
    setIsValidating(false);
    
    if (remaining.length === 0 && playerHand.length + drawn.length === 0) {
      setGameOver(true);
      setWinner(playerScore > opponentScore ? 'player' : 'opponent');
    } else {
      setTimeout(() => aiTurn(), 500);
    }
  };

  const undoPlacement = () => {
    if (placedTiles.length === 0 || isValidating) return;
    
    const newBoard = board.map(r => r.map(c => ({...c})));
    const returned = [];
    
    placedTiles.forEach(({ row, col, letter, previousLetter, previousHeight }) => {
      newBoard[row][col] = { letter: previousLetter, stackHeight: previousHeight };
      returned.push(letter);
    });
    
    setBoard(newBoard);
    setPlayerHand(prev => [...prev, ...returned]);
    setPlacedTiles([]);
    setErrorMessage('');
  };

  const passTurn = () => {
    if (isValidating) return;
    undoPlacement();
    if (passCount >= 1) {
      setGameOver(true);
      setWinner(playerScore > opponentScore ? 'player' : playerScore < opponentScore ? 'opponent' : 'tie');
    } else {
      setPassCount(prev => prev + 1);
      setTimeout(() => aiTurn(), 500);
    }
  };

  const aiTurn = () => {
    setCurrentTurn('opponent');
    
    setTimeout(() => {
      const words = ['CAT','DOG','HAT','THE','AND','PAN','CUP','TEA'];
      let played = false;
      
      if (isFirstMove) {
        for (const word of words) {
          const letters = word.split('');
          const handCounts = {};
          opponentHand.forEach(l => handCounts[l] = (handCounts[l] || 0) + 1);
          
          if (letters.every(l => handCounts[l] && handCounts[l]-- > 0)) {
            const newBoard = board.map(r => r.map(c => ({...c})));
            const startCol = CENTER - Math.floor(letters.length / 2);
            
            letters.forEach((letter, i) => {
              newBoard[CENTER][startCol + i] = { letter, stackHeight: 1 };
            });
            
            setBoard(newBoard);
            setOpponentScore(prev => prev + letters.length);
            setLastPlayedWord(word);
            
            const newHand = [...opponentHand];
            letters.forEach(l => { const i = newHand.indexOf(l); if (i > -1) newHand.splice(i, 1); });
            
            const { drawn, remaining } = drawTiles(letterPool, letters.length);
            setOpponentHand([...newHand, ...drawn]);
            setLetterPool(remaining);
            setIsFirstMove(false);
            played = true;
            setPassCount(0);
            break;
          }
        }
      }
      
      if (!played) {
        if (passCount >= 1) {
          setGameOver(true);
          setWinner(playerScore > opponentScore ? 'player' : playerScore < opponentScore ? 'opponent' : 'tie');
        } else {
          setPassCount(prev => prev + 1);
        }
      }
      
      setCurrentTurn('player');
    }, 1000);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 p-4">
        <div className="max-w-lg mx-auto pt-8 text-center">
          <div className="text-6xl mb-4">🥞📚</div>
          <h1 className="text-4xl font-bold text-amber-800 mb-2">Griddle Stacks</h1>
          <p className="text-xl text-amber-600 mb-8">A Letter Griddle Word Game</p>
          
          <div className="bg-white/90 rounded-3xl shadow-2xl p-6 border-2 border-amber-200 mb-6">
            <h2 className="text-2xl font-bold text-amber-800 mb-4">📖 How to Play</h2>
            <div className="space-y-3 text-left mb-6">
              <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-3">
                <span className="text-2xl">🥞</span>
                <div><p className="font-semibold text-amber-800">Spell Words</p><p className="text-sm text-amber-600">Place letters to form valid English words</p></div>
              </div>
              <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-3">
                <span className="text-2xl">➕</span>
                <div><p className="font-semibold text-amber-800">Build Crosswords</p><p className="text-sm text-amber-600">Connect new words to existing ones</p></div>
              </div>
              <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-3">
                <span className="text-2xl">📚</span>
                <div><p className="font-semibold text-amber-800">Stack for Bonus!</p><p className="text-sm text-amber-600">Place on existing letters for extra points</p></div>
              </div>
            </div>
            <button onClick={startGame} className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-4 rounded-2xl font-bold text-xl shadow-lg">
              🥞 Start Stacking!
            </button>
          </div>
          
          <p className="text-amber-600 text-sm">Part of the Letter Griddle Family 🥞</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-2">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold text-amber-800 text-center mb-2">🥞 Griddle Stacks</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-3 mb-3 border-2 border-amber-200">
          <div className="flex justify-between items-center">
            <div className={`text-center p-2 rounded-lg ${currentTurn === 'player' ? 'bg-amber-100 ring-2 ring-amber-400' : ''}`}>
              <div className="text-2xl">🥞</div>
              <div className="text-xs font-bold">You</div>
              <div className="text-xl font-bold text-amber-600">{playerScore}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-amber-700">{isValidating ? 'Checking...' : currentTurn === 'player' ? 'Your Turn' : 'CPU Turn'}</div>
              <div className="text-xs text-amber-500">{letterPool.length} tiles left</div>
              {lastPlayedWord && <div className="text-sm text-green-600 font-bold">{lastPlayedWord}</div>}
            </div>
            <div className={`text-center p-2 rounded-lg ${currentTurn === 'opponent' ? 'bg-amber-100 ring-2 ring-amber-400' : ''}`}>
              <div className="text-2xl">🤖</div>
              <div className="text-xs font-bold">CPU</div>
              <div className="text-xl font-bold text-amber-600">{opponentScore}</div>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className={`${errorMessage === 'Checking...' ? 'bg-blue-100' : 'bg-red-100'} rounded-lg p-2 mb-3 text-center`}>
            <span className={`text-sm font-medium ${errorMessage === 'Checking...' ? 'text-blue-700' : 'text-red-700'}`}>{errorMessage}</span>
          </div>
        )}

        <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-2 rounded-xl shadow-xl mb-3 overflow-x-auto">
          <div className="grid gap-0.5 mx-auto" style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 2rem)`, width: 'fit-content' }}>
            {board.map((row, ri) => row.map((cell, ci) => (
              <BoardCell key={`${ri}-${ci}`} onClick={() => handleCellClick(ri, ci)} isCenter={ri === CENTER && ci === CENTER}
                isHighlighted={placedTiles.some(t => t.row === ri && t.col === ci)} hasLetter={!!cell.letter}>
                {cell.letter && <PancakeTile letter={cell.letter} stackHeight={cell.stackHeight} isNew={placedTiles.some(t => t.row === ri && t.col === ci)} />}
              </BoardCell>
            )))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-3 mb-3 border-2 border-amber-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-amber-700 font-medium">Your Pancakes</span>
            <button onClick={shuffleHand} disabled={currentTurn !== 'player'} className="bg-amber-200 hover:bg-amber-300 disabled:opacity-50 px-3 py-1 rounded-full text-xs">🔀 Shuffle</button>
          </div>
          <div className="flex justify-center gap-2 flex-wrap">
            {playerHand.map((letter, i) => (
              <PancakeTile key={i} letter={letter} selected={selectedTileIndex === i} onClick={() => handleHandTileClick(i)} disabled={currentTurn !== 'player' || isValidating} />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 flex-wrap mb-3">
          <button onClick={undoPlacement} disabled={placedTiles.length === 0 || isValidating} className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 px-4 py-2 rounded-full text-sm">↩️ Undo</button>
          <button onClick={submitPlay} disabled={placedTiles.length === 0 || currentTurn !== 'player' || isValidating} className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-6 py-2 rounded-full font-bold text-sm">✓ Submit</button>
          <button onClick={passTurn} disabled={currentTurn !== 'player' || isValidating} className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 px-4 py-2 rounded-full text-sm">⏭️ Pass</button>
          <button onClick={startGame} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-sm">🔄 New</button>
        </div>

        {gameOver && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center">
              <div className="text-6xl mb-4">{winner === 'player' ? '🎉' : winner === 'tie' ? '🤝' : '🥞'}</div>
              <h2 className="text-3xl font-bold text-amber-800 mb-2">{winner === 'player' ? 'You Won!' : winner === 'tie' ? 'Tie!' : 'CPU Wins!'}</h2>
              <p className="text-xl text-amber-700 mb-4">You: {playerScore} | CPU: {opponentScore}</p>
              <button onClick={startGame} className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-bold text-lg">🥞 Play Again</button>
            </div>
          </div>
        )}

        <div className="text-center py-4 text-xs text-amber-600">
          <a href="/" className="underline hover:text-amber-800">← Back to Letter Griddle</a>
        </div>
      </div>
    </div>
  );
}

export default GriddleStacks;