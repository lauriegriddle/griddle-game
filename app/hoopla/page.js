"use client";

import React, { useState, useCallback, useEffect, useMemo } from 'react';

// ============================================
// 10 PUZZLES WITH FUN FACTS
// (No hardcoded box positions - they'll be randomized!)
// ============================================
const puzzles = [
  {
    category: "Game Day Snacks",
    puzzleNumber: 1,
    funFact: "The first Super Bowl in 1967 wasn't even called the 'Super Bowl' - it was the 'AFL-NFL World Championship Game.' The name 'Super Bowl' came from a bouncy ball toy!",
    gridSize: 8,
    words: [
      { word: "WING", hint: "Buffalo-style chicken piece 🍗", revealed: [0] },
      { word: "SODA", hint: "Fizzy sweet beverage 🥤", revealed: [1] },
      { word: "CHIP", hint: "Crunchy thin potato slice 🥔", revealed: [2] },
      { word: "DIPS", hint: "Creamy sauces for dunking", revealed: [0] },
      { word: "NACHOS", hint: "Cheesy topped tortilla chips 🧀", revealed: [0, 4] }
    ]
  },
  {
    category: "Team Spirit",
    puzzleNumber: 2,
    funFact: "Cheerleading started in 1898 at the University of Minnesota - and the first cheerleaders were all men! Women didn't join until the 1920s.",
    gridSize: 8,
    words: [
      { word: "TEAM", hint: "Group playing together 🤝", revealed: [0] },
      { word: "FLAG", hint: "Colorful banner waved by fans 🚩", revealed: [2] },
      { word: "ROAR", hint: "Loud crowd cheer 🦁", revealed: [1] },
      { word: "WINS", hint: "Victories for the scoreboard", revealed: [0] },
      { word: "MASCOT", hint: "Costumed team character 🐻", revealed: [0, 3] }
    ]
  },
  {
    category: "Sports Equipment",
    puzzleNumber: 3,
    funFact: "The first basketballs were brown! They didn't become orange until the 1950s so players and fans could see them better.",
    gridSize: 8,
    words: [
      { word: "BALL", hint: "Round object used in many sports ⚽", revealed: [0] },
      { word: "GOAL", hint: "Target area to score points", revealed: [1] },
      { word: "NETS", hint: "Mesh attached to hoops or goals", revealed: [2] },
      { word: "PADS", hint: "Protective gear for players", revealed: [0] },
      { word: "HELMET", hint: "Head protection for safety 🪖", revealed: [0, 4] }
    ]
  },
  {
    category: "Halftime Show",
    puzzleNumber: 4,
    funFact: "The first Super Bowl halftime show featured marching bands and trained pigeons! Celebrity performances didn't start until the 1990s.",
    gridSize: 8,
    words: [
      { word: "BAND", hint: "Musical group that marches 🎺", revealed: [0] },
      { word: "SONG", hint: "Musical performance piece 🎵", revealed: [1] },
      { word: "DRUM", hint: "Percussion instrument 🥁", revealed: [2] },
      { word: "SHOW", hint: "Entertainment performance", revealed: [0] },
      { word: "DANCER", hint: "Performer who moves to music 💃", revealed: [0, 4] }
    ]
  },
  {
    category: "Pep Rally",
    puzzleNumber: 5,
    funFact: "The 'wave' (where fans stand up in sequence) was invented in 1981 at a University of Washington football game. It spread worldwide within just a few years!",
    gridSize: 8,
    words: [
      { word: "YELL", hint: "Loud shout of support 📢", revealed: [0] },
      { word: "PUMP", hint: "Get excited, ___ up!", revealed: [1] },
      { word: "WAVE", hint: "Fan motion around stadium 👋", revealed: [2] },
      { word: "LOUD", hint: "Not quiet at all!", revealed: [0] },
      { word: "SPIRIT", hint: "Enthusiasm and energy ✨", revealed: [0, 4] }
    ]
  },
  {
    category: "Victory Celebration",
    puzzleNumber: 6,
    funFact: "Gatorade was invented in 1965 for the Florida Gators football team - and the tradition of dumping it on winning coaches started in 1984!",
    gridSize: 8,
    words: [
      { word: "GOLD", hint: "Color of first place medals 🥇", revealed: [0] },
      { word: "FANS", hint: "Cheering supporters in stands", revealed: [1] },
      { word: "CUPS", hint: "Containers for drinks or trophies 🏆", revealed: [2] },
      { word: "FOAM", hint: "Material for #1 fingers ☝️", revealed: [0] },
      { word: "TROPHY", hint: "Award for winning teams 🏆", revealed: [0, 4] }
    ]
  },
  {
    category: "Game Night Classics",
    puzzleNumber: 7,
    funFact: "The board game Monopoly was originally designed to teach people about the dangers of wealth concentration - but became a celebration of capitalism instead!",
    gridSize: 8,
    words: [
      { word: "DICE", hint: "Cubes rolled for random numbers 🎲", revealed: [0] },
      { word: "CARD", hint: "Part of a playing deck 🃏", revealed: [1] },
      { word: "TURN", hint: "Your chance to play", revealed: [2] },
      { word: "WINS", hint: "Victories to celebrate", revealed: [0] },
      { word: "TOKENS", hint: "Game pieces you move around", revealed: [0, 4] }
    ]
  },
  {
    category: "Stadium Food",
    puzzleNumber: 8,
    funFact: "Hot dogs became stadium food in the 1890s because they were easy to eat while watching the game. Americans now eat about 20 billion hot dogs per year!",
    gridSize: 8,
    words: [
      { word: "DOGS", hint: "Hot ___ with mustard 🌭", revealed: [0] },
      { word: "CORN", hint: "Buttered ___ on the cob 🌽", revealed: [1] },
      { word: "BEER", hint: "Popular stadium beverage 🍺", revealed: [2] },
      { word: "NUTS", hint: "Pea___ or cashews", revealed: [0] },
      { word: "PRETZEL", hint: "Twisted salted bread snack 🥨", revealed: [0, 5] }
    ]
  },
  {
    category: "Sports Actions",
    puzzleNumber: 9,
    funFact: "High-fives were invented in 1977 during a baseball game between the LA Dodgers' Dusty Baker and Glenn Burke. Now it's a universal celebration!",
    gridSize: 8,
    words: [
      { word: "KICK", hint: "Strike with your foot ⚽", revealed: [0] },
      { word: "PASS", hint: "Throw to a teammate 🏈", revealed: [1] },
      { word: "JUMP", hint: "Leap into the air 🏀", revealed: [2] },
      { word: "RUNS", hint: "Fast movement or baseball scores", revealed: [0] },
      { word: "TACKLE", hint: "Bring down the ball carrier", revealed: [0, 4] }
    ]
  },
  {
    category: "Championship Night",
    puzzleNumber: 10,
    funFact: "The tradition of wearing your team's jersey to games started in the 1970s. Before that, fans just wore regular clothes - even suits and ties!",
    gridSize: 8,
    words: [
      { word: "HERO", hint: "Star player of the game ⭐", revealed: [0] },
      { word: "RING", hint: "Championship jewelry 💍", revealed: [1] },
      { word: "EPIC", hint: "Legendary or amazing", revealed: [2] },
      { word: "BEST", hint: "Number one, top tier", revealed: [0] },
      { word: "CHAMPS", hint: "The winning team! 🏆", revealed: [0, 4] }
    ]
  },
  {
    category: "Tailgate Party",
    puzzleNumber: 11,
    funFact: "Tailgating started in the 1860s at college football games! Fans would arrive by horse and wagon, setting up picnics behind their vehicles.",
    gridSize: 8,
    words: [
      { word: "GRILL", hint: "Cooking burgers outdoors 🍔", revealed: [0] },
      { word: "TENT", hint: "Portable shelter for shade", revealed: [1] },
      { word: "PARK", hint: "Where you leave your car 🚗", revealed: [2] },
      { word: "COOL", hint: "Kept cold in a cooler", revealed: [0] },
      { word: "CHAIRS", hint: "Folding seats for the party 🪑", revealed: [0, 4] }
    ]
  },
  {
    category: "Basketball",
    puzzleNumber: 12,
    funFact: "The first basketball hoops were actually peach baskets! Someone had to climb a ladder to get the ball out after every score until they cut the bottom out.",
    gridSize: 8,
    words: [
      { word: "DUNK", hint: "Slam it through the hoop! 🏀", revealed: [0] },
      { word: "HOOP", hint: "The ring you shoot through", revealed: [1] },
      { word: "FOUL", hint: "Illegal contact penalty", revealed: [2] },
      { word: "SLAM", hint: "Powerful basket score", revealed: [0] },
      { word: "COURTS", hint: "Where the game is played", revealed: [0, 4] }
    ]
  },
  {
    category: "Football Frenzy",
    puzzleNumber: 13,
    funFact: "The huddle was invented by a deaf quarterback at Gallaudet University in the 1890s so opposing teams couldn't read his sign language plays!",
    gridSize: 8,
    words: [
      { word: "PUNT", hint: "Kick it to the other team 🏈", revealed: [0] },
      { word: "RUSH", hint: "Running play or defensive charge", revealed: [1] },
      { word: "ZONE", hint: "End ___ or defensive coverage", revealed: [2] },
      { word: "DOWN", hint: "First and ten, second and ___", revealed: [0] },
      { word: "HUDDLE", hint: "Team circle to call plays", revealed: [0, 4] }
    ]
  },
  {
    category: "Baseball Basics",
    puzzleNumber: 14,
    funFact: "The seventh-inning stretch became popular when President Taft stood up to stretch at a game in 1910 - everyone else stood too, thinking he was leaving!",
    gridSize: 8,
    words: [
      { word: "BASE", hint: "First, second, third, or home", revealed: [0] },
      { word: "MITT", hint: "Leather glove for catching ⚾", revealed: [1] },
      { word: "BATS", hint: "Wooden hitting tools", revealed: [2] },
      { word: "SAFE", hint: "Made it! Not out!", revealed: [0] },
      { word: "INNING", hint: "One of nine game segments", revealed: [0, 4] }
    ]
  },
  {
    category: "Soccer Star",
    puzzleNumber: 15,
    funFact: "A soccer ball is made of 32 panels - 12 pentagons and 20 hexagons. This design was created for the 1970 World Cup so it would show up better on TV!",
    gridSize: 8,
    words: [
      { word: "GOAL", hint: "Score! Into the net! ⚽", revealed: [0] },
      { word: "SHIN", hint: "___ guards protect your legs", revealed: [1] },
      { word: "TURF", hint: "Grass or artificial field surface", revealed: [2] },
      { word: "CLUB", hint: "Your team organization", revealed: [0] },
      { word: "KEEPER", hint: "Goalie who guards the net 🧤", revealed: [0, 4] }
    ]
  },
  {
    category: "Olympic Glory",
    puzzleNumber: 16,
    funFact: "The Olympic torch relay was actually invented for the 1936 Berlin Olympics. The flame travels from Greece to the host city, sometimes even going underwater!",
    gridSize: 8,
    words: [
      { word: "GOLD", hint: "First place medal color 🥇", revealed: [0] },
      { word: "RACE", hint: "Competition of speed 🏃", revealed: [1] },
      { word: "SWIM", hint: "Pool events 🏊", revealed: [2] },
      { word: "LEAP", hint: "Long jump or high jump", revealed: [0] },
      { word: "MEDALS", hint: "Awards for top three finishers", revealed: [0, 4] }
    ]
  },
  {
    category: "Tennis Match",
    puzzleNumber: 17,
    funFact: "Tennis players used to wear all white because sweat stains were less visible. Wimbledon still requires players to wear almost entirely white today!",
    gridSize: 8,
    words: [
      { word: "LOVE", hint: "Zero points in tennis 🎾", revealed: [0] },
      { word: "SETS", hint: "Groups of games to win", revealed: [1] },
      { word: "ACES", hint: "Unreturnable serves", revealed: [2] },
      { word: "LOBS", hint: "High arcing shots", revealed: [0] },
      { word: "VOLLEY", hint: "Hit before it bounces", revealed: [0, 4] }
    ]
  },
  {
    category: "Hockey Night",
    puzzleNumber: 18,
    funFact: "The Stanley Cup is the only major sports trophy where every winning player gets their name engraved on it. It now has over 2,000 names!",
    gridSize: 8,
    words: [
      { word: "PUCK", hint: "Hard rubber disk 🏒", revealed: [0] },
      { word: "RINK", hint: "Ice surface for playing", revealed: [1] },
      { word: "GOAL", hint: "Score! Red light!", revealed: [2] },
      { word: "SKATE", hint: "Bladed footwear ⛸️", revealed: [0] },
      { word: "PERIOD", hint: "One of three game segments", revealed: [0, 4] }
    ]
  },
  {
    category: "Track & Field",
    puzzleNumber: 19,
    funFact: "Usain Bolt's top speed was 27.8 mph - he could outrun a city bus! His stride was so long he took only 41 steps to complete the 100m dash.",
    gridSize: 8,
    words: [
      { word: "DASH", hint: "Short sprint race 🏃", revealed: [0] },
      { word: "LANE", hint: "Marked running path", revealed: [1] },
      { word: "SHOT", hint: "___ put throwing event", revealed: [2] },
      { word: "POLE", hint: "___ vault jumping event", revealed: [0] },
      { word: "HURDLE", hint: "Barrier to jump over", revealed: [0, 4] }
    ]
  },
  {
    category: "Golf Course",
    puzzleNumber: 20,
    funFact: "Golf balls have 300-500 dimples! The dimples create turbulence that helps the ball fly farther - a smooth ball would only go half as far.",
    gridSize: 8,
    words: [
      { word: "PUTT", hint: "Gentle roll toward the hole ⛳", revealed: [0] },
      { word: "CLUB", hint: "Iron, wood, or driver", revealed: [1] },
      { word: "FORE", hint: "Warning shout on the course!", revealed: [2] },
      { word: "HOLE", hint: "Where the ball goes in", revealed: [0] },
      { word: "BIRDIE", hint: "One under par 🐦", revealed: [0, 4] }
    ]
  }
];

// ============================================
// RANDOMIZED POSITION GENERATOR
// ============================================
const generateRandomPositions = (gridSize) => {
  // All possible positions for 2x2 boxes (4-letter words)
  // We'll use positions that don't go off the grid
  const possible2x2 = [];
  for (let row = 0; row <= gridSize - 2; row++) {
    for (let col = 0; col <= gridSize - 2; col++) {
      possible2x2.push({ row, col, height: 2, width: 2 });
    }
  }
  
  // All possible positions for 2x3 boxes (6-letter words)
  const possible2x3 = [];
  for (let row = 0; row <= gridSize - 2; row++) {
    for (let col = 0; col <= gridSize - 3; col++) {
      possible2x3.push({ row, col, height: 2, width: 3 });
    }
  }
  
  // Check if two boxes overlap
  const boxesOverlap = (box1, box2) => {
    const r1 = { 
      left: box1.col, 
      right: box1.col + box1.width, 
      top: box1.row, 
      bottom: box1.row + box1.height 
    };
    const r2 = { 
      left: box2.col, 
      right: box2.col + box2.width, 
      top: box2.row, 
      bottom: box2.row + box2.height 
    };
    
    return !(r1.right <= r2.left || r2.right <= r1.left || 
             r1.bottom <= r2.top || r2.bottom <= r1.top);
  };
  
  // Shuffle array helper
  const shuffle = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  
  // Try to place all 5 words (4 four-letter + 1 six-letter)
  const maxAttempts = 100;
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const placedBoxes = [];
    
    // Shuffle possible positions
    const shuffled2x3 = shuffle(possible2x3);
    const shuffled2x2 = shuffle(possible2x2);
    
    // First, place the 6-letter word (2x3 box)
    let sixLetterBox = null;
    for (const box of shuffled2x3) {
      sixLetterBox = box;
      break;
    }
    
    if (!sixLetterBox) continue;
    placedBoxes.push(sixLetterBox);
    
    // Now place 4 four-letter words (2x2 boxes)
    let fourLetterBoxes = [];
    for (const box of shuffled2x2) {
      // Check if this box overlaps with any already placed
      const hasOverlap = placedBoxes.some(placed => boxesOverlap(placed, box));
      if (!hasOverlap) {
        fourLetterBoxes.push(box);
        placedBoxes.push(box);
        if (fourLetterBoxes.length === 4) break;
      }
    }
    
    // If we successfully placed all 5 boxes, return them
    if (fourLetterBoxes.length === 4) {
      return {
        fourLetterBoxes,
        sixLetterBox
      };
    }
  }
  
  // Fallback to default positions if random fails (shouldn't happen)
  console.warn('Random placement failed, using fallback positions');
  return {
    fourLetterBoxes: [
      { row: 0, col: 0, height: 2, width: 2 },
      { row: 0, col: 6, height: 2, width: 2 },
      { row: 6, col: 0, height: 2, width: 2 },
      { row: 6, col: 6, height: 2, width: 2 }
    ],
    sixLetterBox: { row: 3, col: 2, height: 2, width: 3 }
  };
};

// ============================================
// MAIN COMPONENT
// ============================================
const LetterGriddleHoopla = () => {
  // Start at puzzle 1 (index 0) - players can cycle through all puzzles freely
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  
  // Generate random positions - this changes on every mount/reset
  const [positionSeed, setPositionSeed] = useState(0);
  
  const puzzle = puzzles[currentPuzzleIndex];

  // Generate randomized positions for current puzzle
  const randomPositions = useMemo(() => {
    return generateRandomPositions(puzzle.gridSize);
  }, [currentPuzzleIndex, positionSeed, puzzle.gridSize]);

  // Assign boxes to words based on word length
  const wordsWithBoxes = useMemo(() => {
    const fourLetterWords = puzzle.words.filter(w => w.word.length === 4);
    const sixLetterWords = puzzle.words.filter(w => w.word.length >= 5);
    
    // Shuffle the four-letter words to randomize which goes where
    const shuffledFourLetter = [...fourLetterWords].sort(() => Math.random() - 0.5);
    
    return puzzle.words.map(wordData => {
      if (wordData.word.length >= 5) {
        // 6-letter word gets the 2x3 box
        return { ...wordData, box: randomPositions.sixLetterBox };
      } else {
        // 4-letter words get 2x2 boxes
        const idx = shuffledFourLetter.indexOf(wordData);
        return { ...wordData, box: randomPositions.fourLetterBoxes[idx] || randomPositions.fourLetterBoxes[0] };
      }
    });
  }, [puzzle.words, randomPositions]);

  // Hidden tile icons - megaphones on edges, pennants in the middle
  const getHiddenIcon = useCallback((row, col, gridSize) => {
    const isEdge = row === 0 || row === gridSize - 1 || col === 0 || col === gridSize - 1;
    return isEdge ? '📣' : '🚩';
  }, []);

  // Build the grid with words placed in their boxes (SNAKE PATTERN)
  const buildGrid = useCallback(() => {
    const gridSize = puzzle.gridSize;
    
    const grid = Array(gridSize).fill(null).map((_, rowIdx) =>
      Array(gridSize).fill(null).map((_, colIdx) => ({
        letter: '',
        wordIndex: -1,
        letterIndex: -1,
        isRevealed: false,
        isFound: false,
        hiddenIcon: getHiddenIcon(rowIdx, colIdx, gridSize)
      }))
    );

    wordsWithBoxes.forEach((wordData, wordIdx) => {
      const { word, box, revealed } = wordData;
      
      if (box.height === 2 && box.width === 2) {
        // 4-letter word: snake pattern [0][1] / [3][2]
        const positions = [
          { r: 0, c: 0, idx: 0 },
          { r: 0, c: 1, idx: 1 },
          { r: 1, c: 1, idx: 2 },
          { r: 1, c: 0, idx: 3 },
        ];
        
        positions.forEach(({ r, c, idx }) => {
          if (idx < word.length) {
            const gridRow = box.row + r;
            const gridCol = box.col + c;
            grid[gridRow][gridCol] = {
              letter: word[idx],
              wordIndex: wordIdx,
              letterIndex: idx,
              isRevealed: revealed.includes(idx),
              isFound: false,
              hiddenIcon: getHiddenIcon(gridRow, gridCol, gridSize)
            };
          }
        });
      } else if (box.height === 2 && box.width === 3) {
        // 6-letter word: snake pattern [0][1][2] / [5][4][3]
        const positions = [
          { r: 0, c: 0, idx: 0 },
          { r: 0, c: 1, idx: 1 },
          { r: 0, c: 2, idx: 2 },
          { r: 1, c: 2, idx: 3 },
          { r: 1, c: 1, idx: 4 },
          { r: 1, c: 0, idx: 5 },
        ];
        
        positions.forEach(({ r, c, idx }) => {
          if (idx < word.length) {
            const gridRow = box.row + r;
            const gridCol = box.col + c;
            grid[gridRow][gridCol] = {
              letter: word[idx],
              wordIndex: wordIdx,
              letterIndex: idx,
              isRevealed: revealed.includes(idx),
              isFound: false,
              hiddenIcon: getHiddenIcon(gridRow, gridCol, gridSize)
            };
          }
        });
      }
    });

    // Fill empty cells with filler letters
    const fillers = 'QXZKVBMFJLRYTUEPGHW';
    let fillerIdx = 0;
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (grid[r][c].letter === '') {
          grid[r][c] = {
            letter: fillers[fillerIdx % fillers.length],
            wordIndex: -1,
            letterIndex: -1,
            isRevealed: false,
            isFound: false,
            hiddenIcon: getHiddenIcon(r, c, gridSize)
          };
          fillerIdx++;
        }
      }
    }

    return grid;
  }, [puzzle.gridSize, wordsWithBoxes, getHiddenIcon]);

  const [grid, setGrid] = useState(() => buildGrid());
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [showCelebration, setShowCelebration] = useState(null);
  const [showHowToPlay, setShowHowToPlay] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [message, setMessage] = useState('');
  const [startTime, setStartTime] = useState(Date.now());
  const [completionTime, setCompletionTime] = useState(null);
  const [revealedHints, setRevealedHints] = useState([]); // Track which word hints are revealed

  const celebrationIcons = ['📣', '🎉', '🏆', '⭐', '🎊'];
  const cheerPhrases = ["SCORE!", "NICE PLAY!", "BOOM!", "YES!", "NAILED IT!"];

  // Hoopla confetti items
  const confettiItems = ['📣', '🚩', '🏆', '⭐', '🎉', '🎊', '📣', '🚩', '✨', '🥇'];

  const getCurrentGuess = () => {
    return selectedCells.map(c => grid[c.row][c.col].letter).join('');
  };

  const handleCellClick = (row, col) => {
    const cell = grid[row][col];
    if (cell.isFound) return;

    const existingIndex = selectedCells.findIndex(c => c.row === row && c.col === col);
    if (existingIndex >= 0) {
      setSelectedCells(prev => prev.filter((_, i) => i !== existingIndex));
    } else {
      setSelectedCells(prev => [...prev, { row, col }]);
    }
    setMessage('');
  };

  const clearSelection = () => {
    setSelectedCells([]);
    setMessage('');
  };

  // Reset current puzzle (start over with NEW random positions)
  const resetGame = () => {
    setPositionSeed(prev => prev + 1); // This triggers new random positions
    setSelectedCells([]);
    setFoundWords([]);
    setShowCelebration(null);
    setShowConfetti(false);
    setMessage('');
    setStartTime(Date.now());
    setCompletionTime(null);
    setShareCopied(false);
    setRevealedHints([]); // Clear revealed hints
  };

  // Rebuild grid when positions change
  useEffect(() => {
    setGrid(buildGrid());
  }, [buildGrid]);

  // Play again (same as reset, for after winning)
  const playAgain = () => {
    resetGame();
  };

  // Go to next puzzle
  const nextPuzzle = () => {
    const nextIndex = (currentPuzzleIndex + 1) % puzzles.length;
    setCurrentPuzzleIndex(nextIndex);
    setPositionSeed(prev => prev + 1);
  };

  // Go to previous puzzle
  const prevPuzzle = () => {
    const prevIndex = (currentPuzzleIndex - 1 + puzzles.length) % puzzles.length;
    setCurrentPuzzleIndex(prevIndex);
    setPositionSeed(prev => prev + 1);
  };

  // When puzzle changes, reset game state
  const isInitialMount = React.useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setSelectedCells([]);
      setFoundWords([]);
      setShowCelebration(null);
      setShowConfetti(false);
      setMessage('');
      setStartTime(Date.now());
      setCompletionTime(null);
      setShareCopied(false);
      setRevealedHints([]); // Clear revealed hints
    }
  }, [currentPuzzleIndex]);

  const checkWord = () => {
    const guess = getCurrentGuess();
    
    const matchedWordIndex = puzzle.words.findIndex((w, idx) => 
      w.word === guess && !foundWords.includes(idx)
    );

    if (matchedWordIndex >= 0) {
      setFoundWords(prev => [...prev, matchedWordIndex]);
      
      setGrid(prev => {
        const newGrid = prev.map(row => row.map(cell => ({ ...cell })));
        selectedCells.forEach(({ row, col }) => {
          if (newGrid[row][col].wordIndex === matchedWordIndex) {
            newGrid[row][col].isFound = true;
          }
        });
        return newGrid;
      });

      setShowCelebration({
        icon: celebrationIcons[Math.floor(Math.random() * celebrationIcons.length)],
        phrase: cheerPhrases[Math.floor(Math.random() * cheerPhrases.length)]
      });
      setTimeout(() => setShowCelebration(null), 1500);

      setSelectedCells([]);
      setMessage('');
    } else {
      setMessage('Not quite - try again! 🤔');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const allWordsFound = foundWords.length === puzzle.words.length;

  // Victory effects
  useEffect(() => {
    if (allWordsFound && !completionTime) {
      const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
      setCompletionTime(timeInSeconds);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);
    }
  }, [allWordsFound, completionTime, startTime]);

  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Native Share
  const handleShare = async () => {
    const hintsUsed = revealedHints.length;
    const hintText = hintsUsed === 0 ? '🎯 No hints!' : `💡 ${hintsUsed} hint${hintsUsed > 1 ? 's' : ''} used`;
    
    const shareText = `📣 Letter Griddle Hoopla #${puzzle.puzzleNumber}
${puzzle.category}
${'🏆'.repeat(foundWords.length)} ${foundWords.length}/5
⏱️ ${formatTime(completionTime)} | ${hintText}

Play at lettergriddle.com/hoopla
🥞 More games at lettergriddle.com`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch (err) {
        if (err.name !== 'AbortError') {
          fallbackCopy(shareText);
        }
      }
    } else {
      fallbackCopy(shareText);
    }
  };

  const fallbackCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 p-2 sm:p-4 relative overflow-hidden">
      
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 60 }).map((_, i) => {
            const item = confettiItems[i % confettiItems.length];
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = 3 + Math.random() * 2;
            
            return (
              <div
                key={i}
                className="absolute text-3xl sm:text-4xl"
                style={{
                  left: `${left}%`,
                  top: '-50px',
                  animation: `confettiFall ${duration}s ease-in ${delay}s forwards`
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}

      {/* Word celebration popup */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
          <div className="bg-white rounded-full px-8 py-4 shadow-2xl animate-bounce flex items-center gap-3">
            <span className="text-4xl">{showCelebration.icon}</span>
            <span className="text-2xl font-bold text-red-600">{showCelebration.phrase}</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>

      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-3">
          <div className="inline-block bg-red-800 text-yellow-300 px-4 py-1 rounded-t-lg text-xs font-bold tracking-wider">
            🚩 GAME NIGHT AT THE CAFE 🚩
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-3 border-4 border-yellow-400">
            <h1 className="text-2xl sm:text-3xl font-bold text-red-700 flex items-center justify-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
              <span>📣</span> Letter Griddle Hoopla <span>📣</span>
            </h1>
            <p className="text-orange-600 text-xs mt-1">Find words hiding in random spots - every game is different!</p>
          </div>
        </div>

        {/* Tonight's Theme Banner with Puzzle Navigation */}
        <div className="bg-gradient-to-r from-red-700 to-red-800 rounded-xl p-2 mb-3 shadow-lg border-2 border-yellow-400">
          <div className="flex items-center justify-between">
            <button
              onClick={prevPuzzle}
              className="text-yellow-300 hover:text-white text-xl px-2 transition-all"
              title="Previous puzzle"
            >
              ◀
            </button>
            <div className="text-center">
              <p className="text-yellow-300 text-[10px] font-semibold tracking-wider">PUZZLE {puzzle.puzzleNumber} OF {puzzles.length}</p>
              <p className="text-white text-lg font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                {puzzle.category}
              </p>
            </div>
            <button
              onClick={nextPuzzle}
              className="text-yellow-300 hover:text-white text-xl px-2 transition-all"
              title="Next puzzle"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Team Playbook (Word List) */}
        <div className="bg-white/90 rounded-xl p-3 mb-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-red-800">🏈 Team Playbook</h3>
            <div className="flex gap-1">
              <button
                onClick={resetGame}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-200 transition-all"
                title="Shuffle positions & start over"
              >
                🔀
              </button>
              <button
                onClick={() => setShowHowToPlay(true)}
                className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full hover:bg-red-200 transition-all"
              >
                ❓
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {puzzle.words.map((wordData, idx) => (
              <div
                key={idx}
                className={`text-xs p-2 rounded-lg transition-all flex items-center justify-between ${
                  foundWords.includes(idx)
                    ? 'bg-green-100 text-green-800'
                    : 'bg-orange-50 text-orange-800'
                }`}
              >
                <span>
                  {foundWords.includes(idx) 
                    ? `✅ ${wordData.word}` 
                    : revealedHints.includes(idx)
                      ? `${wordData.word.length} letters: ${wordData.hint}`
                      : `${wordData.word.length} letters`
                  }
                </span>
                {!foundWords.includes(idx) && !revealedHints.includes(idx) && (
                  <button
                    onClick={() => setRevealedHints(prev => [...prev, idx])}
                    className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all ml-2"
                    title="Reveal hint for this word"
                  >
                    💡
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {/* Current selection */}
          <div className="mt-2 pt-2 border-t border-orange-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Your guess:</span>
              <span className="font-bold text-red-700 text-lg tracking-widest min-w-[80px] text-right">
                {getCurrentGuess() || '—'}
              </span>
            </div>
            {message && (
              <p className="text-center text-orange-600 text-xs mt-1 animate-pulse">{message}</p>
            )}
          </div>
          <div className="flex justify-center gap-2 mt-2">
            <button
              onClick={checkWord}
              disabled={selectedCells.length < 4}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-full font-bold text-sm transition-all shadow-md"
            >
              ✓ Check
            </button>
            <button
              onClick={clearSelection}
              disabled={selectedCells.length === 0}
              className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-full font-bold text-sm transition-all shadow-md"
            >
              ✕ Clear
            </button>
          </div>
        </div>

        {/* Game Grid */}
        <div className="bg-gradient-to-br from-red-800 to-red-900 rounded-2xl p-2 sm:p-3 shadow-2xl border-4 border-yellow-400">
          <div className="grid grid-cols-8 gap-0.5 sm:gap-1">
            {grid.map((row, rowIdx) =>
              row.map((cell, colIdx) => {
                const isSelected = selectedCells.some(c => c.row === rowIdx && c.col === colIdx);
                const selectionOrder = selectedCells.findIndex(c => c.row === rowIdx && c.col === colIdx);

                return (
                  <button
                    key={`${rowIdx}-${colIdx}`}
                    onClick={() => handleCellClick(rowIdx, colIdx)}
                    disabled={cell.isFound}
                    className={`
                      relative w-9 h-9 sm:w-11 sm:h-11 rounded-lg font-bold text-base sm:text-lg
                      transition-all duration-150 shadow-sm flex items-center justify-center
                      ${cell.isFound
                        ? 'bg-gradient-to-br from-green-400 to-green-500 text-white border-2 border-green-300'
                        : cell.isRevealed
                          ? 'bg-gradient-to-br from-yellow-200 to-yellow-300 text-red-800 border-2 border-yellow-500 shadow-md'
                          : isSelected
                            ? 'bg-gradient-to-br from-white to-yellow-100 text-red-700 border-2 border-red-500 scale-110 shadow-lg z-10'
                            : 'bg-gradient-to-br from-orange-200 to-orange-300 text-orange-800 border border-orange-400 hover:scale-105 hover:shadow-md'
                      }
                    `}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {cell.isRevealed || cell.isFound || isSelected ? (
                      cell.letter
                    ) : (
                      <span className="text-lg sm:text-xl">{cell.hiddenIcon}</span>
                    )}
                    {isSelected && selectionOrder >= 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {selectionOrder + 1}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          <p className="text-center text-yellow-200/80 text-[10px] sm:text-xs mt-2">
            💡 Words hide in boxes (2×2 or 2×3). Yellow tiles are hints! Positions shuffle each game.
          </p>
        </div>

        {/* Victory Banner with Fun Fact */}
        {allWordsFound && (
          <div className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-5 text-center shadow-2xl border-4 border-white">
            <div className="text-5xl mb-2">🏆</div>
            <h2 className="text-2xl font-bold text-white mb-1">CHAMPION!</h2>
            <p className="text-white/90 text-sm mb-2">You cleared all the tables in {formatTime(completionTime)}!</p>
            
            {/* Did You Know? Fun Fact */}
            <div className="bg-white/20 rounded-xl p-3 mb-3 text-left">
              <p className="text-white font-bold text-xs mb-1">🎯 Did You Know?</p>
              <p className="text-white/90 text-xs leading-relaxed">{puzzle.funFact}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-2">
              <button 
                onClick={handleShare}
                className="bg-white text-red-600 px-5 py-2 rounded-full font-bold hover:bg-yellow-100 transition-all shadow-md flex items-center gap-2 mx-auto"
              >
                {shareCopied ? '✓ Copied!' : 'Share Results'} <span>📣</span>
              </button>
              
              <div className="flex justify-center gap-2 pt-2">
                <button
                  onClick={playAgain}
                  className="bg-white/30 hover:bg-white/50 text-white px-4 py-1.5 rounded-full font-bold text-xs transition-all flex items-center gap-1"
                >
                  🔀 Play Again (New Layout)
                </button>
                <button
                  onClick={nextPuzzle}
                  className="bg-white/30 hover:bg-white/50 text-white px-4 py-1.5 rounded-full font-bold text-xs transition-all flex items-center gap-1"
                >
                  ➡️ Next Puzzle
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer with Privacy/Terms */}
        <div className="text-center mt-4 text-white/70 text-xs space-y-1">
          <p>© 2026 Letter Griddle. All rights reserved.</p>
          <div className="flex justify-center gap-3">
            <a href="/privacy" className="hover:text-white underline">Privacy Policy</a>
            <span>|</span>
            <a href="/terms" className="hover:text-white underline">Terms of Service</a>
          </div>
          <p className="text-white/50 text-[10px] mt-2">
            Part of the Letter Griddle Family 🥞
          </p>
        </div>
      </div>

      {/* Share Modal (fallback for non-native share) */}
      {showShareModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-red-700 mb-3 text-center">Share Your Results! 📣</h2>
            <div className="bg-gray-100 rounded-lg p-3 text-sm font-mono mb-4">
              📣 Letter Griddle Hoopla #{puzzle.puzzleNumber}<br/>
              {puzzle.category}<br/>
              {'🏆'.repeat(foundWords.length)} {foundWords.length}/5<br/>
              ⏱️ {formatTime(completionTime)} | {revealedHints.length === 0 ? '🎯 No hints!' : `💡 ${revealedHints.length} hint${revealedHints.length > 1 ? 's' : ''}`}<br/><br/>
              Play at lettergriddle.com/hoopla
            </div>
            <button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-full font-bold"
            >
              {shareCopied ? '✓ Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
        </div>
      )}

      {/* How to Play Modal */}
      {showHowToPlay && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowHowToPlay(false)}
        >
          <div
            className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <span className="text-4xl">📣</span>
              <h2 className="text-xl font-bold text-red-700 mt-1">How to Play</h2>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Find the Words</p>
                  <p className="text-xs text-gray-600">Words hide in rectangular boxes - 2×2 boxes (4 letters) or 2×3 boxes (6 letters). <strong>Positions are random each game!</strong></p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Follow Yellow Hints</p>
                  <p className="text-xs text-gray-600">Yellow tiles reveal letters to help you locate where words are hidden!</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Tap in Snake Order</p>
                  <p className="text-xs text-gray-600">Top row left→right, then bottom row right→left. Then tap Check!</p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                <p className="text-xs text-yellow-800">
                  <strong>🎯 Tip:</strong> Not all tiles contain word letters - some are decoys! Use the 🔀 button to shuffle positions and play again.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                <p className="text-xs text-gray-700 mb-2">
                  <strong>📐 Box Examples (snake pattern):</strong>
                </p>
                <div className="flex gap-4 justify-center">
                  <div className="text-center">
                    <div className="grid grid-cols-2 gap-0.5 mx-auto w-fit">
                      <div className="w-7 h-7 bg-yellow-200 rounded text-xs flex items-center justify-center font-bold border border-yellow-400">W<span className="text-[8px] text-red-500 ml-0.5">1</span></div>
                      <div className="w-7 h-7 bg-orange-200 rounded text-xs flex items-center justify-center font-bold border border-orange-300">I<span className="text-[8px] text-red-500 ml-0.5">2</span></div>
                      <div className="w-7 h-7 bg-orange-200 rounded text-xs flex items-center justify-center font-bold border border-orange-300">G<span className="text-[8px] text-red-500 ml-0.5">4</span></div>
                      <div className="w-7 h-7 bg-orange-200 rounded text-xs flex items-center justify-center font-bold border border-orange-300">N<span className="text-[8px] text-red-500 ml-0.5">3</span></div>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">2×2 = WING</p>
                  </div>
                  <div className="text-center">
                    <div className="grid grid-cols-3 gap-0.5 mx-auto w-fit">
                      <div className="w-7 h-7 bg-yellow-200 rounded text-xs flex items-center justify-center font-bold border border-yellow-400">N<span className="text-[8px] text-red-500 ml-0.5">1</span></div>
                      <div className="w-7 h-7 bg-orange-200 rounded text-xs flex items-center justify-center font-bold border border-orange-300">A<span className="text-[8px] text-red-500 ml-0.5">2</span></div>
                      <div className="w-7 h-7 bg-orange-200 rounded text-xs flex items-center justify-center font-bold border border-orange-300">C<span className="text-[8px] text-red-500 ml-0.5">3</span></div>
                      <div className="w-7 h-7 bg-orange-200 rounded text-xs flex items-center justify-center font-bold border border-orange-300">S<span className="text-[8px] text-red-500 ml-0.5">6</span></div>
                      <div className="w-7 h-7 bg-yellow-200 rounded text-xs flex items-center justify-center font-bold border border-yellow-400">O<span className="text-[8px] text-red-500 ml-0.5">5</span></div>
                      <div className="w-7 h-7 bg-orange-200 rounded text-xs flex items-center justify-center font-bold border border-orange-300">H<span className="text-[8px] text-red-500 ml-0.5">4</span></div>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">2×3 = NACHOS</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowHowToPlay(false)}
              className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-full font-bold hover:from-red-600 hover:to-red-700 transition-all shadow-md"
            >
              Let's Go! 📣
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LetterGriddleHoopla;
