"use client";
import React, { useState, useEffect, useCallback } from 'react';

// Character Avatar Component - Matching Letter Griddle style
const CharacterAvatar = ({ character, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };
  
  const characters = {
    laurel: {
      skinTone: '#F5DEB3',
      hairColor: '#4A3728',
      hairStyle: 'long',
      shirtColor: '#D4A574',
      accessory: 'apron'
    },
    mr_lindsay: {
      skinTone: '#F5DEB3',
      hairColor: '#E8E8E8',
      hairStyle: 'balding',
      shirtColor: '#2D5A4A',
      accessory: null
    },
    mrs_lindsay: {
      skinTone: '#F5DEB3',
      hairColor: '#E8E8E8',
      hairStyle: 'curly',
      shirtColor: '#8B4A6B',
      accessory: 'glasses'
    },
    sarah: {
      skinTone: '#F5DEB3',
      hairColor: '#8B4513',
      hairStyle: 'wavy',
      shirtColor: '#4A7C59',
      accessory: null
    },
    taylor: {
      skinTone: '#D2956A',
      hairColor: '#2C1810',
      hairStyle: 'short',
      shirtColor: '#4A6FA5',
      accessory: null
    },
    josephine: {
      skinTone: '#F5DEB3',
      hairColor: '#6B4423',
      hairStyle: 'medium',
      shirtColor: '#9B7BB8',
      accessory: null
    },
    josie: {
      skinTone: '#F5DEB3',
      hairColor: '#6B4423',
      hairStyle: 'pigtails',
      shirtColor: '#E8A0BF',
      accessory: null
    },
    jennie_isaac: {
      type: 'duo'
    },
    hank: {
      skinTone: '#E8C4A0',
      hairColor: '#8B8B8B',
      hairStyle: 'short_gray',
      shirtColor: '#5D7B6F',
      accessory: 'cap'
    }
  };
  
  const char = characters[character?.id] || characters.josie;
  
  // Special rendering for Jennie & Isaac duo
  if (char.type === 'duo') {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="#B8D4E8" />
          <ellipse cx="42" cy="85" rx="22" ry="18" fill="#4A7C59" />
          <ellipse cx="42" cy="45" rx="18" ry="20" fill="#F5DEB3" />
          <path d="M 24 38 Q 24 18 42 18 Q 60 18 60 38 Q 52 32 42 32 Q 32 32 24 38" fill="#A0522D" />
          <ellipse cx="22" cy="52" rx="4" ry="14" fill="#A0522D" />
          <ellipse cx="62" cy="52" rx="4" ry="14" fill="#A0522D" />
          <ellipse cx="36" cy="44" rx="2.5" ry="3" fill="#4A3728" />
          <ellipse cx="48" cy="44" rx="2.5" ry="3" fill="#4A3728" />
          <path d="M 36 52 Q 42 57 48 52" stroke="#4A3728" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <circle cx="72" cy="55" r="14" fill="#D2B48C" />
          <ellipse cx="64" cy="44" rx="5" ry="8" fill="#D2B48C" transform="rotate(-15 64 44)" />
          <ellipse cx="80" cy="44" rx="5" ry="8" fill="#D2B48C" transform="rotate(15 80 44)" />
          <circle cx="68" cy="53" r="3" fill="#2C1810" />
          <circle cx="76" cy="53" r="3" fill="#2C1810" />
          <ellipse cx="72" cy="60" rx="3" ry="2.5" fill="#2C1810" />
        </svg>
      </div>
    );
  }
  
  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="#B8D4E8" />
        
        {(char.hairStyle === 'long' || char.hairStyle === 'wavy' || char.hairStyle === 'medium') && (
          <ellipse cx="50" cy="40" rx="28" ry="35" fill={char.hairColor} />
        )}
        
        <ellipse cx="50" cy="90" rx="30" ry="25" fill={char.shirtColor} />
        
        {char.accessory === 'apron' && (
          <path d="M 35 75 L 35 95 L 65 95 L 65 75 Q 50 80 35 75" fill="#F5F5DC" />
        )}
        
        <ellipse cx="50" cy="45" rx="22" ry="25" fill={char.skinTone} />
        
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
        
        {char.hairStyle === 'pigtails' && (
          <>
            <path d="M 32 38 Q 32 22 50 22 Q 68 22 68 38 Q 58 34 50 34 Q 42 34 32 38" fill={char.hairColor} />
            <circle cx="25" cy="40" r="10" fill={char.hairColor} />
            <circle cx="75" cy="40" r="10" fill={char.hairColor} />
          </>
        )}
        
        {char.hairStyle === 'short_gray' && (
          <path d="M 30 38 Q 30 22 50 22 Q 70 22 70 38 Q 60 35 50 35 Q 40 35 30 38" fill={char.hairColor} />
        )}
        
        {char.accessory === 'cap' && (
          <>
            <ellipse cx="50" cy="24" rx="26" ry="8" fill="#5D4E37" />
            <path d="M 24 24 Q 24 12 50 12 Q 76 12 76 24" fill="#5D4E37" />
            <rect x="24" y="22" width="52" height="4" fill="#3D3225" />
          </>
        )}
        
        {char.accessory === 'glasses' && (
          <>
            <circle cx="40" cy="45" r="8" fill="none" stroke="#8B4513" strokeWidth="2" />
            <circle cx="60" cy="45" r="8" fill="none" stroke="#8B4513" strokeWidth="2" />
            <path d="M 48 45 L 52 45" stroke="#8B4513" strokeWidth="2" />
          </>
        )}
        
        <ellipse cx="40" cy="45" rx="3" ry="4" fill="#4A3728" />
        <ellipse cx="60" cy="45" rx="3" ry="4" fill="#4A3728" />
        <circle cx="41" cy="44" r="1" fill="white" />
        <circle cx="61" cy="44" r="1" fill="white" />
        
        <path d="M 42 55 Q 50 62 58 55" stroke="#4A3728" strokeWidth="2" fill="none" strokeLinecap="round" />
        
        <circle cx="35" cy="52" r="4" fill="#E8A0A0" opacity="0.5" />
        <circle cx="65" cy="52" r="4" fill="#E8A0A0" opacity="0.5" />
      </svg>
    </div>
  );
};

// Character data
const CHARACTERS = {
  josie: {
    id: 'josie',
    name: 'Josie',
    description: "Josephine's daughter",
    startPosition: { row: 0, col: 0 },
    route: ['ski_rental', 'warming_hut', 'festival_grounds'],
    personality: 'Excited about her first ski lesson!'
  },
  jennie_isaac: {
    id: 'jennie_isaac',
    name: 'Jennie & Isaac',
    description: 'Inseparable duo',
    startPosition: { row: 6, col: 5 },
    route: ['frozen_pond', 'sledding_hill', 'festival_grounds'],
    personality: 'Isaac loves playing in the snow!'
  },
  taylor: {
    id: 'taylor',
    name: 'Taylor B.',
    description: 'Smart and efficient',
    startPosition: { row: 2, col: 7 },
    route: ['main_lodge', 'festival_grounds'],
    personality: 'Already checked the schedule twice'
  },
  josephine: {
    id: 'josephine',
    name: 'Josephine',
    description: 'Sweet & supportive',
    startPosition: { row: 2, col: 0 },
    route: ['hot_cocoa_stand', 'warming_hut', 'festival_grounds'],
    personality: 'Bringing homemade treats for everyone'
  },
  sarah: {
    id: 'sarah',
    name: 'Sarah',
    description: 'Encouraging and wise',
    startPosition: { row: 5, col: 7 },
    route: ['ice_sculpture', 'main_lodge', 'festival_grounds'],
    personality: 'Loves the artistic side of winter'
  },
  mr_mrs_lindsay: {
    id: 'mr_lindsay',
    name: 'The Lindsays',
    description: 'Mr. & Mrs. Lindsay',
    startPosition: { row: 5, col: 0 },
    route: ['hot_cocoa_stand', 'main_lodge', 'warming_hut', 'festival_grounds'],
    personality: 'He tells stories about winters past'
  },
  hank: {
    id: 'hank',
    name: 'Hank',
    description: 'Dependable regular',
    startPosition: { row: 0, col: 7 },
    route: ['ice_sculpture', 'warming_hut', 'festival_grounds'],
    personality: 'Remembers every Winter Festival since 1982'
  },
  laurel: {
    id: 'laurel',
    name: 'Laurel',
    description: 'Cafe owner',
    isHost: true
  }
};

// Map tile types
const TILE_TYPES = {
  path: { emoji: '', name: 'Snowy Path', walkable: true, color: 'bg-blue-100' },
  home_josie: { emoji: '🏠', name: "Josie's Home", walkable: true, color: 'bg-blue-50', isStart: 'josie' },
  home_josephine: { emoji: '🏠', name: "Josephine's Home", walkable: true, color: 'bg-blue-50', isStart: 'josephine' },
  home_taylor: { emoji: '🏠', name: "Taylor's Home", walkable: true, color: 'bg-blue-50', isStart: 'taylor' },
  home_sarah: { emoji: '🏠', name: "Sarah's Home", walkable: true, color: 'bg-blue-50', isStart: 'sarah' },
  home_lindsays: { emoji: '🏠', name: "Lindsays' Home", walkable: true, color: 'bg-blue-50', isStart: 'mr_mrs_lindsay' },
  home_jennie: { emoji: '🏠', name: "Jennie's Home", walkable: true, color: 'bg-blue-50', isStart: 'jennie_isaac' },
  home_hank: { emoji: '🏡', name: "Hank's Home", walkable: true, color: 'bg-blue-50', isStart: 'hank' },
  ski_rental: { emoji: '🎿', name: 'Ski Rental', walkable: true, color: 'bg-cyan-100', landmark: true },
  hot_cocoa_stand: { emoji: '☕', name: 'Hot Cocoa Stand', walkable: true, color: 'bg-amber-100', landmark: true },
  ice_sculpture: { emoji: '🧊', name: 'Ice Sculptures', walkable: true, color: 'bg-cyan-200', landmark: true },
  frozen_pond: { emoji: '⛸️', name: 'Frozen Pond', walkable: true, color: 'bg-sky-200', landmark: true },
  warming_hut: { emoji: '🛖', name: 'Warming Hut', walkable: true, color: 'bg-orange-100', landmark: true },
  main_lodge: { emoji: '🏔️', name: 'Main Lodge', walkable: true, color: 'bg-stone-100', landmark: true },
  sledding_hill: { emoji: '🛷', name: 'Sledding Hill', walkable: true, color: 'bg-indigo-100', landmark: true },
  festival_grounds: { emoji: '🎪', name: 'Festival Grounds', walkable: true, color: 'bg-purple-200', isDestination: true },
  snowbank: { emoji: '❄️', name: 'Snowbank', walkable: false, color: 'bg-white' },
  trees: { emoji: '🌲', name: 'Pine Trees', walkable: false, color: 'bg-emerald-200' }
};

// Create the Winter Sports Festival map
const createMap = () => {
  const map = [
    ['home_josie', 'path', 'ski_rental', 'path', 'ice_sculpture', 'path', 'path', 'home_hank'],
    ['path', 'path', 'path', 'path', 'path', 'path', 'path', 'path'],
    ['home_josephine', 'path', 'warming_hut', 'path', 'path', 'path', 'path', 'home_taylor'],
    ['path', 'path', 'path', 'festival_grounds', 'festival_grounds', 'path', 'path', 'path'],
    ['path', 'main_lodge', 'main_lodge', 'main_lodge', 'main_lodge', 'path', 'path', 'path'],
    ['home_lindsays', 'path', 'hot_cocoa_stand', 'path', 'path', 'path', 'path', 'home_sarah'],
    ['path', 'path', 'path', 'path', 'path', 'home_jennie', 'path', 'path'],
    ['path', 'path', 'sledding_hill', 'path', 'frozen_pond', 'path', 'path', 'path']
  ];
  return map;
};

// Puzzle data for encounters with winter sports trivia
const PUZZLES = {
  ski_rental: {
    npc: 'Coach Erik',
    npcEmoji: '🎿',
    greeting: "Ready for your first lesson, Josie? Here are your skis!",
    puzzle: {
      type: 'unscramble',
      prompt: "Did you know? Skiing originated in this Scandinavian country over 5,000 years ago:",
      scrambled: "YAWNOR",
      answer: "NORWAY",
      hint: "Land of the fjords and Vikings!"
    },
    funFact: "Ancient rock carvings in Norway show people on skis hunting reindeer! Skiing was essential for winter survival and transportation.",
    success: "Perfect! Norway is where skiing began. Now head to the Warming Hut to warm up!"
  },
  warming_hut: {
    npc: 'Ranger Pines',
    npcEmoji: '🛖',
    greeting: "Come in, come in! Warm yourself by the fire!",
    puzzle: {
      type: 'unscramble',
      prompt: "The Winter Olympics first included this sliding sport in 1924:",
      scrambled: "EDBOLBS",
      answer: "BOBSLED",
      hint: "A team sport where athletes race down an icy track in a sled!"
    },
    funFact: "The first bobsleds were made by connecting two sleds together! The sport got its name because early riders would 'bob' their heads to go faster.",
    success: "That's right! Bobsled has been thrilling audiences for 100 years! The Festival Grounds are just ahead!"
  },
  hot_cocoa_stand: {
    npc: 'Mrs. Maple',
    npcEmoji: '☕',
    greeting: "Hot cocoa to warm your mittens? On the house today!",
    puzzle: {
      type: 'unscramble',
      prompt: "This winter sport combines cross-country skiing and rifle shooting:",
      scrambled: "TLONIBHA",
      answer: "BIATHLON",
      hint: "Athletes ski fast, then must calm down to hit targets!"
    },
    funFact: "Biathlon began as training for Scandinavian military ski patrols. Athletes must control their breathing after skiing hard to shoot accurately!",
    success: "Wonderful! Biathlon is one of the most demanding winter sports. Take this cocoa to the Warming Hut!"
  },
  frozen_pond: {
    npc: 'Skater Sam',
    npcEmoji: '⛸️',
    greeting: "The ice is perfect today! Want to try some spins?",
    puzzle: {
      type: 'unscramble',
      prompt: "Figure skaters perform jumps, spins, and this graceful movement:",
      scrambled: "RILPS",
      answer: "SPIRL",
      hint: "Oops, try again! It's actually...",
      altAnswer: "SPIRAL"
    },
    funFact: "A spiral in figure skating is when the skater glides on one foot with the free leg extended high behind them. It requires incredible balance and flexibility!",
    success: "Beautiful! Spirals showcase a skater's grace. Now check out the Sledding Hill!"
  },
  sledding_hill: {
    npc: 'Kids Playing',
    npcEmoji: '🛷',
    greeting: "WHEEEE! This hill is so fast today!",
    puzzle: {
      type: 'unscramble',
      prompt: "The luge is a sliding sport where athletes go feet-first on a small:",
      scrambled: "LDES",
      answer: "SLED",
      hint: "What you ride down a snowy hill!"
    },
    funFact: "Luge athletes can reach speeds over 90 miles per hour! They steer using only their calf muscles and subtle shoulder movements.",
    success: "That's it! Luge sleds are tiny but super fast! Head to the Festival Grounds!"
  },
  ice_sculpture: {
    npc: 'Artist Yuki',
    npcEmoji: '🧊',
    greeting: "Welcome to my winter gallery! Each sculpture tells a story.",
    puzzle: {
      type: 'unscramble',
      prompt: "Ice sculptors use special tools including chainsaws and this sharp instrument:",
      scrambled: "LIHECS",
      answer: "CHISEL",
      hint: "A pointed tool for carving fine details!"
    },
    funFact: "Professional ice sculptors work with blocks weighing 300 pounds or more! The ice must be very clear, so it is often specially frozen.",
    success: "Exactly! Chisels create the delicate details. The Main Lodge has more art to see!"
  },
  main_lodge: {
    npc: 'Lodge Host',
    npcEmoji: '🏔️',
    greeting: "Welcome to Pine Peak Lodge! The festival is almost ready!",
    puzzle: {
      type: 'unscramble',
      prompt: "Curling players slide heavy stones toward a target called the:",
      scrambled: "OESUH",
      answer: "HOUSE",
      hint: "Not where you live, but where you score points in curling!"
    },
    funFact: "Curling is called 'chess on ice' because of its strategy! The sweeping helps control the stone's speed and direction by slightly melting the ice.",
    success: "Perfect! The house is the bullseye in curling. The Festival Grounds await!"
  }
};

// Updated text messages for winter theme
const TEXT_MESSAGES = {
  josie: {
    start: [
      { from: 'josephine', text: "Josie honey, stop at the Ski Rental first! Coach Erik has your skis ready!" }
    ],
    ski_rental: [
      { from: 'laurel', text: "Can not wait to see you at the festival! Hot cocoa is waiting!" }
    ],
    warming_hut: [
      { from: 'sarah', text: "You are doing great! Almost there!" }
    ],
    finish: [
      { from: 'laurel', text: "Josie! You made it! Ready to try some winter treats?" }
    ]
  },
  jennie_isaac: {
    start: [
      { from: 'taylor', text: "Jennie! The frozen pond is clear for skating, then hit the sledding hill!" }
    ],
    frozen_pond: [
      { from: 'sarah', text: "Let Isaac run on the ice a bit, then keep moving!" }
    ],
    finish: [
      { from: 'laurel', text: "Jennie! Isaac! Over here! I have treats for both of you!" }
    ]
  },
  taylor: {
    start: [
      { from: 'sarah', text: "Taylor, the main lodge has the schedule posted. Quickest route!" }
    ],
    finish: [
      { from: 'laurel', text: "Taylor! Perfect timing as always! Your seat is ready!" }
    ]
  },
  josephine: {
    start: [
      { from: 'josie', text: "Mom! Get some cocoa for everyone on your way!" }
    ],
    hot_cocoa_stand: [
      { from: 'laurel', text: "Josephine, Mrs. Maple makes the best cocoa in town!" }
    ],
    finish: [
      { from: 'laurel', text: "Josephine! Those treats smell amazing! Come sit by Josie!" }
    ]
  },
  sarah: {
    start: [
      { from: 'taylor', text: "Sarah, check out the ice sculptures! They are stunning this year!" }
    ],
    finish: [
      { from: 'laurel', text: "Sarah! I saved your favorite spot by the fire!" }
    ]
  },
  mr_mrs_lindsay: {
    start: [
      { from: 'sarah', text: "Mr. and Mrs. Lindsay, take your time! The festival will be here all day!" }
    ],
    hot_cocoa_stand: [
      { from: 'laurel', text: "Tell Mrs. Maple I said hello!" }
    ],
    finish: [
      { from: 'laurel', text: "Mr. and Mrs. Lindsay! Your booth is all set up and cozy!" }
    ]
  },
  hank: {
    start: [
      { from: 'mr_lindsay', text: "Hank! Remember the shortcut through the sculpture garden?" }
    ],
    finish: [
      { from: 'laurel', text: "Hank! Your coffee is already brewing, extra strong!" }
    ]
  }
};

// Main Game Component
const WinterLand = () => {
  // Game state
  const [screen, setScreen] = useState('welcome');
  const [currentChapter, setCurrentChapter] = useState(null);
  const [completedChapters, setCompletedChapters] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });
  const [map] = useState(createMap);
  const [visitedLandmarks, setVisitedLandmarks] = useState([]);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [puzzleInput, setPuzzleInput] = useState('');
  const [puzzleError, setPuzzleError] = useState(false);
  const [showFunFact, setShowFunFact] = useState(false);
  const [currentFunFact, setCurrentFunFact] = useState('');
  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  
  // Chapter definitions
  const chapters = [
    { id: 'josie', character: CHARACTERS.josie, unlocked: true },
    { id: 'jennie_isaac', character: CHARACTERS.jennie_isaac, unlocked: false },
    { id: 'taylor', character: CHARACTERS.taylor, unlocked: false },
    { id: 'josephine', character: CHARACTERS.josephine, unlocked: false },
    { id: 'sarah', character: CHARACTERS.sarah, unlocked: false },
    { id: 'mr_mrs_lindsay', character: CHARACTERS.mr_mrs_lindsay, unlocked: false },
    { id: 'hank', character: CHARACTERS.hank, unlocked: false }
  ];
  
  // Get unlocked chapters based on completion
  const getUnlockedChapters = () => {
    return chapters.map((chapter, index) => ({
      ...chapter,
      unlocked: index === 0 || completedChapters.includes(chapters[index - 1].id)
    }));
  };
  
  // Start a chapter
  const startChapter = (chapterId) => {
    const character = CHARACTERS[chapterId];
    setCurrentChapter(chapterId);
    setPlayerPosition(character.startPosition);
    setVisitedLandmarks([]);
    setMessages(TEXT_MESSAGES[chapterId]?.start || []);
    setShowMessages(true);
    setScreen('playing');
  };
  
  // Check if a move is valid
  const isValidMove = (row, col) => {
    if (row < 0 || row >= 8 || col < 0 || col >= 8) return false;
    const tileType = map[row][col];
    return TILE_TYPES[tileType]?.walkable !== false;
  };
  
  // Check if adjacent to current position
  const isAdjacent = (row, col) => {
    const rowDiff = Math.abs(row - playerPosition.row);
    const colDiff = Math.abs(col - playerPosition.col);
    return (rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 0 && colDiff === 0);
  };
  
  // Handle tile click
  const handleTileClick = (row, col) => {
    if (currentPuzzle || showFunFact) return;
    
    if (isAdjacent(row, col) && isValidMove(row, col)) {
      setPlayerPosition({ row, col });
      
      const tileType = map[row][col];
      const tile = TILE_TYPES[tileType];
      
      if (tile.isDestination) {
        handleArrival();
        return;
      }
      
      if (tile.landmark && PUZZLES[tileType] && !visitedLandmarks.includes(tileType)) {
        setTimeout(() => {
          setCurrentPuzzle({ type: tileType, ...PUZZLES[tileType] });
        }, 300);
      }
    }
  };
  
  // Handle puzzle submission
  const handlePuzzleSubmit = () => {
    const answer = puzzleInput.toUpperCase().trim();
    const correctAnswer = currentPuzzle.puzzle.answer;
    const altAnswer = currentPuzzle.puzzle.altAnswer;
    
    if (answer === correctAnswer || (altAnswer && answer === altAnswer)) {
      setVisitedLandmarks([...visitedLandmarks, currentPuzzle.type]);
      
      // Show fun fact
      setCurrentFunFact(currentPuzzle.funFact);
      setShowFunFact(true);
      
      const newMessages = TEXT_MESSAGES[currentChapter]?.[currentPuzzle.type] || [];
      if (newMessages.length > 0) {
        setMessages(prev => [...prev, ...newMessages]);
      }
      
      setPuzzleInput('');
      setPuzzleError(false);
    } else {
      setPuzzleError(true);
      setTimeout(() => setPuzzleError(false), 1000);
    }
  };
  
  // Close fun fact and puzzle
  const closeFunFact = () => {
    setShowFunFact(false);
    setCurrentFunFact('');
    setCurrentPuzzle(null);
  };
  
  // Handle arrival at destination
  const handleArrival = () => {
    setShowConfetti(true);
    setCompletedChapters([...completedChapters, currentChapter]);
    
    const finishMessages = TEXT_MESSAGES[currentChapter]?.finish || [];
    setMessages(finishMessages);
    setShowMessages(true);
    
    setTimeout(() => {
      setScreen('arrived');
      setShowConfetti(false);
    }, 2000);
  };
  
  // Share chapter completion
  const handleShareChapter = () => {
    const character = CHARACTERS[currentChapter];
    const chapterNum = chapters.findIndex(c => c.id === currentChapter) + 1;
    
    const shareText = `Winter Sports Festival
Griddle Falls

Chapter ${chapterNum}: ${character.name} arrived!
${completedChapters.length}/${chapters.length} friends at the festival

Play at lettergriddle.com/winter-land
More games at lettergriddle.com`;

    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };
  
  // Share final completion
  const handleShareFinal = () => {
    const shareText = `Winter Sports Festival
Griddle Falls

COMPLETE!
All 7 friends arrived at the Festival Grounds!
The whole Trivia Crew is celebrating!

Play at lettergriddle.com/winter-land
More games at lettergriddle.com`;

    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };
  
  const allChaptersComplete = completedChapters.length >= chapters.length;
  const confettiEmojis = ['❄️', '⛷️', '🎿', '✨', '🥞', '☕', '💙'];
  
  // ============================================
  // WELCOME SCREEN
  // ============================================
  if (screen === 'welcome') {
    return (
      <div 
        className="min-h-screen p-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1E3A5F 0%, #2D5A87 15%, #4A90B8 30%, #7BB8D9 50%, #A8D4EA 70%, #D4EAF5 85%, #E8F4FA 100%)'
        }}
      >
        {/* Falling snowflakes animation */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-xl md:text-2xl"
              style={{
                left: `${(i * 11) % 100}%`,
                top: '-50px',
                animation: `snowFall ${8 + (i % 6)}s ease-in-out ${i * 0.4}s infinite`
              }}
            >
              {['❄️', '✨', '🌨️'][i % 3]}
            </div>
          ))}
        </div>
        
        <div className="max-w-lg mx-auto pt-8 relative z-10">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">⛷️</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg" style={{fontFamily: 'Georgia, serif'}}>
              Winter Land
            </h1>
            <p className="text-xl text-blue-100 mb-2" style={{fontFamily: 'Georgia, serif'}}>
              Winter Sports Festival
            </p>
            <p className="text-blue-200/90 text-sm">Guide the Trivia Crew to the Festival Grounds!</p>
          </div>
          
          {/* Main Card */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl p-6 border-2 border-blue-200/50 mb-6">
            {/* Story intro */}
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-4 mb-6 border border-blue-200">
              <p className="text-blue-900 text-center leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
                It is the annual <strong>Winter Sports Festival</strong> in Griddle Falls! ⛷️
                <br /><br />
                Laurel is at the Festival Grounds setting up the Letter Griddle Cafe booth. 
                Help guide each member of the Trivia Crew through the snowy town while learning fun facts about winter sports!
              </p>
            </div>
            
            {/* How to play */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 mb-3 text-center" style={{fontFamily: 'Georgia, serif'}}>
                How to Play
              </h2>
              <div className="space-y-2">
                <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
                  <span className="text-2xl">👆</span>
                  <p className="text-blue-800 text-sm">Tap adjacent tiles to move through snowy Griddle Falls</p>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
                  <span className="text-2xl">🎿</span>
                  <p className="text-blue-800 text-sm">Visit landmarks and solve winter sports word puzzles</p>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
                  <span className="text-2xl">❄️</span>
                  <p className="text-blue-800 text-sm">Learn fun facts about winter sporting traditions!</p>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
                  <span className="text-2xl">🎪</span>
                  <p className="text-blue-800 text-sm">Reach the Festival Grounds for winter fun!</p>
                </div>
              </div>
            </div>
            
            {/* Characters preview */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-blue-800 mb-3 text-center" style={{fontFamily: 'Georgia, serif'}}>
                The Trivia Crew Needs Your Help!
              </h3>
              <div className="flex justify-center gap-2 flex-wrap">
                {Object.values(CHARACTERS).filter(c => !c.isHost).slice(0, 6).map(char => (
                  <CharacterAvatar key={char.id} character={char} size="md" />
                ))}
              </div>
            </div>
            
            {/* Start button */}
            <button
              onClick={() => setScreen('chapter_select')}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 rounded-2xl font-bold text-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
              style={{fontFamily: 'Georgia, serif'}}
            >
              ❄️ Start Adventure!
            </button>
          </div>
          
          {/* Footer with Privacy & Terms */}
          <div className="text-center text-sm">
            <a href="/" className="text-white/90 hover:text-white underline" style={{fontFamily: 'Georgia, serif'}}>
              Part of The Letter Griddle Cafe
            </a>
            <p className="mt-2 text-white/60 text-xs">© 2026 Letter Griddle Cafe</p>
            <div className="mt-2 flex justify-center gap-4 text-xs">
              <a href="/privacy" className="text-white/70 hover:text-white underline">Privacy Policy</a>
              <span className="text-white/40">|</span>
              <a href="/terms" className="text-white/70 hover:text-white underline">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes snowFall {
            0% {
              transform: translateY(-50px) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0.3;
            }
          }
        `}</style>
      </div>
    );
  }
  
  // ============================================
  // CHAPTER SELECT SCREEN
  // ============================================
  if (screen === 'chapter_select') {
    const unlockedChapters = getUnlockedChapters();
    
    return (
      <div 
        className="min-h-screen p-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1E3A5F 0%, #2D5A87 15%, #4A90B8 30%, #7BB8D9 50%, #A8D4EA 70%, #D4EAF5 85%, #E8F4FA 100%)'
        }}
      >
        {/* Falling snowflakes */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-xl"
              style={{
                left: `${(i * 17) % 100}%`,
                top: '-30px',
                animation: `snowFall ${10 + (i % 4)}s ease-in-out ${i * 0.7}s infinite`
              }}
            >
              {['❄️', '✨'][i % 2]}
            </div>
          ))}
        </div>
        
        <div className="max-w-lg mx-auto pt-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1" style={{fontFamily: 'Georgia, serif'}}>
              ❄️ Winter Sports Festival ❄️
            </h1>
            <p className="text-blue-200 text-sm">Choose who to guide to the Festival Grounds!</p>
          </div>
          
          {/* Progress */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 mb-4 border border-blue-200/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-800 font-medium" style={{fontFamily: 'Georgia, serif'}}>Progress</span>
              <span className="text-blue-600 text-sm">{completedChapters.length} / {chapters.length} arrived</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedChapters.length / chapters.length) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Chapter list */}
          <div className="space-y-3 mb-6">
            {unlockedChapters.map((chapter, index) => {
              const isComplete = completedChapters.includes(chapter.id);
              const isLocked = !chapter.unlocked;
              
              return (
                <button
                  key={chapter.id}
                  onClick={() => !isLocked && !isComplete && startChapter(chapter.id)}
                  disabled={isLocked}
                  className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${
                    isComplete
                      ? 'bg-green-100/80 border-2 border-green-400'
                      : isLocked
                        ? 'bg-gray-200/60 border-2 border-gray-300 opacity-60'
                        : 'bg-white/80 border-2 border-blue-300 hover:border-blue-500 hover:scale-102 active:scale-98'
                  }`}
                >
                  <div className="relative">
                    <CharacterAvatar character={chapter.character} size="lg" />
                    {isComplete && (
                      <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                        ✓
                      </div>
                    )}
                    {isLocked && (
                      <div className="absolute -top-1 -right-1 bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                        🔒
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-blue-900" style={{fontFamily: 'Georgia, serif'}}>
                      Chapter {index + 1}: {chapter.character.name}
                    </div>
                    <div className="text-sm text-blue-700">{chapter.character.description}</div>
                    {isComplete && (
                      <div className="text-xs text-green-600 mt-1">✨ Arrived at the festival!</div>
                    )}
                    {isLocked && (
                      <div className="text-xs text-gray-500 mt-1">Complete previous chapter to unlock</div>
                    )}
                  </div>
                  {!isLocked && !isComplete && (
                    <div className="text-2xl">▶️</div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* All complete button */}
          {allChaptersComplete && (
            <button
              onClick={() => setScreen('finale')}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 rounded-2xl font-bold text-xl shadow-lg transition-all transform hover:scale-105 mb-4"
              style={{fontFamily: 'Georgia, serif'}}
            >
              ❄️ Everyone is Here! View Celebration!
            </button>
          )}
          
          {/* Back button */}
          <button
            onClick={() => setScreen('welcome')}
            className="w-full bg-white/60 backdrop-blur-sm text-blue-800 py-3 rounded-xl font-medium transition-all hover:bg-white/80"
            style={{fontFamily: 'Georgia, serif'}}
          >
            ← Back to Title
          </button>
          
          {/* Footer */}
          <div className="text-center mt-6 text-xs">
            <div className="flex justify-center gap-4">
              <a href="/privacy" className="text-white/70 hover:text-white underline">Privacy</a>
              <span className="text-white/40">|</span>
              <a href="/terms" className="text-white/70 hover:text-white underline">Terms</a>
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes snowFall {
            0% { transform: translateY(-30px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0.3; }
          }
        `}</style>
      </div>
    );
  }
  
  // ============================================
  // PLAYING SCREEN (MAP)
  // ============================================
  if (screen === 'playing') {
    const character = CHARACTERS[currentChapter];
    
    return (
      <div 
        className="min-h-screen p-2 md:p-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1E3A5F 0%, #2D5A87 15%, #4A90B8 30%, #7BB8D9 50%, #A8D4EA 70%, #D4EAF5 85%, #E8F4FA 100%)'
        }}
      >
        {/* Confetti */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${(i * 7) % 100}%`,
                  top: '-40px',
                  animation: `confettiFall ${2 + (i % 3)}s ease-in ${(i % 10) * 0.1}s forwards`
                }}
              >
                {confettiEmojis[i % confettiEmojis.length]}
              </div>
            ))}
          </div>
        )}
        
        <div className="max-w-2xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={() => setScreen('chapter_select')}
              className="bg-white/60 backdrop-blur-sm text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white/80 transition-all"
            >
              ← Back
            </button>
            <div className="text-center">
              <h2 className="text-lg md:text-xl font-bold text-white" style={{fontFamily: 'Georgia, serif'}}>
                Guide {character.name}
              </h2>
              <p className="text-blue-200 text-xs">to Festival Grounds 🎪</p>
            </div>
            <button
              onClick={() => setShowMessages(true)}
              className="bg-white/60 backdrop-blur-sm text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white/80 transition-all relative"
            >
              💬
              {messages.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {messages.length}
                </span>
              )}
            </button>
          </div>
          
          {/* Character info */}
          <div className="bg-white/70 backdrop-blur-md rounded-xl p-3 mb-3 flex items-center gap-3 border border-blue-200/50">
            <CharacterAvatar character={character} size="md" />
            <div className="flex-1">
              <div className="font-bold text-blue-800" style={{fontFamily: 'Georgia, serif'}}>{character.name}</div>
              <div className="text-xs text-blue-600">{character.personality}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-blue-600">Landmarks visited</div>
              <div className="font-bold text-blue-800">{visitedLandmarks.length}</div>
            </div>
          </div>
          
          {/* Map grid */}
          <div className="bg-gradient-to-br from-blue-800 to-blue-900 p-2 rounded-2xl shadow-2xl mb-3">
            <div className="grid grid-cols-8 gap-0.5">
              {map.map((row, rowIdx) => (
                row.map((tileType, colIdx) => {
                  const tile = TILE_TYPES[tileType];
                  const isPlayer = playerPosition.row === rowIdx && playerPosition.col === colIdx;
                  const isAdjacentTile = isAdjacent(rowIdx, colIdx);
                  const isWalkable = isValidMove(rowIdx, colIdx);
                  const isVisited = visitedLandmarks.includes(tileType);
                  const isDestination = tile.isDestination;
                  
                  return (
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      onClick={() => handleTileClick(rowIdx, colIdx)}
                      className={`
                        aspect-square flex items-center justify-center text-lg md:text-xl rounded-sm cursor-pointer transition-all relative
                        ${tile.color}
                        ${isPlayer ? 'ring-2 ring-yellow-400 ring-offset-1' : ''}
                        ${isAdjacentTile && isWalkable && !isPlayer ? 'ring-2 ring-green-400/50 hover:ring-green-400' : ''}
                        ${isDestination ? 'animate-pulse' : ''}
                        ${isVisited ? 'opacity-70' : ''}
                      `}
                    >
                      {isPlayer ? (
                        <div className="transform scale-110">
                          <CharacterAvatar character={character} size="sm" />
                        </div>
                      ) : (
                        <span className={isDestination ? 'animate-bounce' : ''}>
                          {tile.emoji}
                        </span>
                      )}
                      {isVisited && !isPlayer && (
                        <div className="absolute top-0 right-0 text-xs">✓</div>
                      )}
                    </div>
                  );
                })
              ))}
            </div>
          </div>
          
          {/* Legend */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2 text-xs text-blue-800">
            <div className="flex flex-wrap justify-center gap-2">
              <span>🎪 Festival</span>
              <span>🎿 Ski Rental</span>
              <span>☕ Hot Cocoa</span>
              <span>🛖 Warming Hut</span>
              <span>⛸️ Pond</span>
              <span>🛷 Sledding</span>
            </div>
          </div>
        </div>
        
        {/* Puzzle Modal */}
        {currentPuzzle && !showFunFact && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-blue-200">
              {/* NPC */}
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">{currentPuzzle.npcEmoji}</div>
                <div className="font-bold text-blue-800" style={{fontFamily: 'Georgia, serif'}}>{currentPuzzle.npc}</div>
              </div>
              
              {/* Greeting */}
              <div className="bg-blue-100 rounded-xl p-3 mb-4">
                <p className="text-blue-800 text-center" style={{fontFamily: 'Georgia, serif'}}>
                  "{currentPuzzle.greeting}"
                </p>
              </div>
              
              {/* Puzzle */}
              <div className="mb-4">
                <p className="text-blue-700 text-sm mb-2 text-center">{currentPuzzle.puzzle.prompt}</p>
                <div className="bg-blue-50 rounded-xl p-4 text-center mb-3">
                  <span className="text-2xl font-bold text-blue-900 tracking-widest">
                    {currentPuzzle.puzzle.scrambled}
                  </span>
                </div>
                <input
                  type="text"
                  value={puzzleInput}
                  onChange={(e) => setPuzzleInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handlePuzzleSubmit()}
                  placeholder="Type your answer..."
                  className={`w-full p-3 rounded-xl border-2 text-center font-bold uppercase ${
                    puzzleError 
                      ? 'border-red-400 bg-red-50 animate-shake' 
                      : 'border-blue-300 focus:border-blue-500'
                  } outline-none transition-all`}
                  style={{fontFamily: 'Georgia, serif'}}
                  autoFocus
                />
                <p className="text-xs text-blue-600 text-center mt-2">
                  ❄️ Hint: {currentPuzzle.puzzle.hint}
                </p>
              </div>
              
              {/* Submit button */}
              <button
                onClick={handlePuzzleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
                style={{fontFamily: 'Georgia, serif'}}
              >
                Submit Answer
              </button>
            </div>
          </div>
        )}
        
        {/* Fun Fact Modal */}
        {showFunFact && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-blue-200">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">❄️</div>
                <div className="font-bold text-blue-800 text-xl" style={{fontFamily: 'Georgia, serif'}}>Did You Know?</div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 mb-4 border border-blue-200">
                <p className="text-blue-800 text-center leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
                  {currentFunFact}
                </p>
              </div>
              
              <div className="bg-green-100 rounded-xl p-3 mb-4">
                <p className="text-green-800 text-center text-sm" style={{fontFamily: 'Georgia, serif'}}>
                  ✨ {currentPuzzle?.success}
                </p>
              </div>
              
              <button
                onClick={closeFunFact}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
                style={{fontFamily: 'Georgia, serif'}}
              >
                Continue Journey ❄️
              </button>
            </div>
          </div>
        )}
        
        {/* Messages Modal */}
        {showMessages && messages.length > 0 && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-40 p-4"
            onClick={() => setShowMessages(false)}
          >
            <div 
              className="bg-white/95 backdrop-blur-md rounded-t-3xl p-4 max-w-sm w-full shadow-2xl border border-blue-200 max-h-[60vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-blue-800" style={{fontFamily: 'Georgia, serif'}}>💬 Messages</h3>
                <button onClick={() => setShowMessages(false)} className="text-blue-400 hover:text-blue-600 text-xl">×</button>
              </div>
              <div className="space-y-2">
                {messages.map((msg, i) => (
                  <div key={i} className="bg-blue-50 rounded-xl p-3 flex gap-3 items-start">
                    <CharacterAvatar character={CHARACTERS[msg.from]} size="sm" />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-blue-800 capitalize">{CHARACTERS[msg.from]?.name || msg.from}</div>
                      <div className="text-sm text-blue-700">{msg.text}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowMessages(false)}
                className="w-full mt-3 bg-blue-100 text-blue-800 py-2 rounded-xl font-medium hover:bg-blue-200 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
        
        <style>{`
          @keyframes confettiFall {
            0% { transform: translateY(-40px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          .animate-shake { animation: shake 0.3s ease-in-out; }
        `}</style>
      </div>
    );
  }
  
  // ============================================
  // ARRIVED SCREEN (with Share)
  // ============================================
  if (screen === 'arrived') {
    const character = CHARACTERS[currentChapter];
    const chapterNum = chapters.findIndex(c => c.id === currentChapter) + 1;
    
    return (
      <div 
        className="min-h-screen p-4 relative overflow-hidden flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #1E3A5F 0%, #2D5A87 15%, #4A90B8 30%, #7BB8D9 50%, #A8D4EA 70%, #D4EAF5 85%, #E8F4FA 100%)'
        }}
      >
        {/* Celebration confetti */}
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${(i * 11) % 100}%`,
                top: '-40px',
                animation: `celebrateFall ${3 + (i % 3)}s ease-in ${(i % 15) * 0.2}s infinite`
              }}
            >
              {['🎉', '✨', '❄️', '🥞', '☕', '💙'][i % 6]}
            </div>
          ))}
        </div>
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-blue-300 text-center">
            {/* Character arrived */}
            <div className="mb-4">
              <CharacterAvatar character={character} size="xl" />
            </div>
            
            <div className="text-5xl mb-4">❄️</div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2" style={{fontFamily: 'Georgia, serif'}}>
              {character.name} Arrived!
            </h2>
            
            <p className="text-blue-700 mb-4" style={{fontFamily: 'Georgia, serif'}}>
              Welcome to the Winter Sports Festival! ⛷️
            </p>
            
            {/* Laurel greeting */}
            <div className="bg-blue-100 rounded-xl p-4 mb-4 flex items-center gap-3">
              <CharacterAvatar character={CHARACTERS.laurel} size="md" />
              <div className="text-left">
                <div className="font-bold text-blue-800 text-sm">Laurel</div>
                <div className="text-blue-700 text-sm italic">
                  "Welcome, {character.name}! Warm up with some hot cocoa!" ☕
                </div>
              </div>
            </div>
            
            {/* Progress */}
            <div className="bg-blue-50 rounded-xl p-3 mb-4">
              <div className="text-sm text-blue-700 mb-1">Festival Arrivals</div>
              <div className="font-bold text-blue-800 text-lg">
                {completedChapters.length} / {chapters.length} friends arrived
              </div>
            </div>
            
            {/* Share Preview */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 mb-4 border border-blue-200">
              <p className="text-xs text-blue-600 mb-2">Share your progress:</p>
              <div className="text-left text-sm text-blue-800 font-mono whitespace-pre-line bg-white/50 rounded-lg p-3">
{`❄️Winter Sports Festival
Griddle Falls

Chapter ${chapterNum}: ${character.name} arrived!
${completedChapters.length}/${chapters.length} friends at the festival

Play at lettergriddle.com/winter-land`}
              </div>
            </div>
            
            {/* Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleShareChapter}
                className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                style={{fontFamily: 'Georgia, serif'}}
              >
                {shareCopied ? '✓ Copied!' : 'Share Results'}
              </button>
              
              <button
                onClick={() => setScreen('chapter_select')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
                style={{fontFamily: 'Georgia, serif'}}
              >
                {completedChapters.length < chapters.length ? '❄️ Guide Next Friend!' : '❄️  View Celebration!'}
              </button>
            </div>
            
            {/* Footer links */}
            <div className="mt-4 pt-4 border-t border-blue-200 flex justify-center gap-4 text-xs">
              <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">Privacy</a>
              <span className="text-blue-300">|</span>
              <a href="/terms" className="text-blue-600 hover:text-blue-800 underline">Terms</a>
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes celebrateFall {
            0% { transform: translateY(-40px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }
  
  // ============================================
  // FINALE SCREEN (with Share)
  // ============================================
  if (screen === 'finale') {
    return (
      <div 
        className="min-h-screen p-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1E3A5F 0%, #2D5A87 15%, #4A90B8 30%, #7BB8D9 50%, #A8D4EA 70%, #D4EAF5 85%, #E8F4FA 100%)'
        }}
      >
        {/* Lots of celebration */}
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl md:text-3xl"
              style={{
                left: `${(i * 7) % 100}%`,
                top: '-50px',
                animation: `grandCelebrate ${4 + (i % 4)}s ease-in ${(i % 20) * 0.15}s infinite`
              }}
            >
              {['🎉', '✨', '❄️', '🥞', '☕', '💙', '⛷️', '🎿'][i % 8]}
            </div>
          ))}
        </div>
        
        <div className="max-w-lg mx-auto pt-6 relative z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-blue-300 text-center">
            <div className="text-6xl mb-4">⛷️</div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2" style={{fontFamily: 'Georgia, serif'}}>
              Winter Sports Festival!
            </h1>
            
            <p className="text-blue-700 mb-6" style={{fontFamily: 'Georgia, serif'}}>
              Everyone made it to the Festival Grounds!
            </p>
            
            {/* All characters together */}
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-4 mb-6">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {Object.values(CHARACTERS).filter(c => c.id).map(char => (
                  <CharacterAvatar key={char.id} character={char} size="md" />
                ))}
              </div>
              <p className="text-blue-800 font-medium" style={{fontFamily: 'Georgia, serif'}}>
                The whole Trivia Crew is here! 💙
              </p>
            </div>
            
            {/* Laurel's message */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <CharacterAvatar character={CHARACTERS.laurel} size="lg" />
                <div className="text-left">
                  <div className="font-bold text-blue-800">Laurel</div>
                  <div className="text-xs text-blue-600">Cafe Owner & Festival Host</div>
                </div>
              </div>
              <p className="text-blue-800 italic" style={{fontFamily: 'Georgia, serif'}}>
                "Thank you for helping everyone get here! The Winter Sports Festival would not be the same without our whole crew together. Now, who wants hot cocoa and pancakes?" 🥞✨
              </p>
            </div>
            
            {/* Share Preview */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 mb-4 border border-blue-200">
              <p className="text-xs text-blue-600 mb-2">Share your achievement:</p>
              <div className="text-left text-sm text-blue-800 font-mono whitespace-pre-line bg-white/50 rounded-lg p-3">
{`Winter Sports Festival
Griddle Falls

COMPLETE!
All 7 friends arrived at the Festival Grounds!
The whole Trivia Crew is celebrating!

Play at lettergriddle.com/winter-land`}
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-blue-100 rounded-xl p-3">
                <div className="text-2xl font-bold text-blue-800">{chapters.length}</div>
                <div className="text-xs text-blue-600">Friends Guided</div>
              </div>
              <div className="bg-blue-100 rounded-xl p-3">
                <div className="text-2xl font-bold text-blue-800">❄️</div>
                <div className="text-xs text-blue-600">Festival Complete!</div>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleShareFinal}
                className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                style={{fontFamily: 'Georgia, serif'}}
              >
                {shareCopied ? '✓ Copied!' : 'Share Results'}
              </button>
              
              <button
                onClick={() => {
                  setCompletedChapters([]);
                  setScreen('welcome');
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
                style={{fontFamily: 'Georgia, serif'}}
              >
                ❄️ Play Again
              </button>
              
              <a
                href="/"
                className="block w-full bg-white/60 text-blue-800 py-3 rounded-xl font-medium hover:bg-white/80 transition-all"
                style={{fontFamily: 'Georgia, serif'}}
              >
                Back to Letter Griddle
              </a>
            </div>
            
            {/* More games link */}
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-sm text-blue-700 mb-2">More from Letter Griddle:</p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <a href="https://lettergriddle.com" className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200">🥞 Letter Griddle</a>
                <a href="https://griddlefalls.com" className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200">☕ Griddle Falls</a>
                <a href="https://lettergriddlebuffet.com" className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200">🍽️ Buffet</a>
              </div>
            </div>
            
            {/* Footer links */}
            <div className="mt-4 pt-4 border-t border-blue-200 flex justify-center gap-4 text-xs">
              <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a>
              <span className="text-blue-300">|</span>
              <a href="/terms" className="text-blue-600 hover:text-blue-800 underline">Terms of Service</a>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center py-6 text-sm">
            <p className="text-white/80" style={{fontFamily: 'Georgia, serif'}}>
              Thank you for visiting Griddle Falls! ❄️
            </p>
            <p className="text-white/60 text-xs mt-2">© 2026 Letter Griddle Cafe</p>
          </div>
        </div>
        
        <style>{`
          @keyframes grandCelebrate {
            0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }
  
  return null;
};

export default WinterLand;