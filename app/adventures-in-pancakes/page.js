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
          <circle cx="50" cy="50" r="48" fill="#FEF3C7" />
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
        <circle cx="50" cy="50" r="48" fill="#FEF3C7" />
        
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
    route: ['jukebox', 'cake_safe', 'trivia_station'],
    task: "Get the playlist ready!",
    textToLaurel: "Hey Laurel! Ready for trivia night! I've got the jukebox playlist ready! 🎵"
  },
  jennie_isaac: {
    id: 'jennie_isaac',
    name: 'Jennie & Isaac',
    description: 'Inseparable duo',
    startPosition: { row: 4, col: 7 },
    route: ['cafe_door', 'corner_booth', 'trivia_station'],
    task: "Welcome guests at the door!",
    textToLaurel: "Hey Laurel! Isaac and I are at the door greeting everyone! 🐕"
  },
  taylor: {
    id: 'taylor',
    name: 'Taylor B.',
    description: 'Smart and efficient',
    startPosition: { row: 0, col: 7 },
    route: ['laurels_office', 'breakfast_counter', 'trivia_station'],
    task: "Check the trivia questions!",
    textToLaurel: "Hey Laurel! Just reviewed the trivia questions - they're perfect! 📋"
  },
  josephine: {
    id: 'josephine',
    name: 'Josephine',
    description: 'Sweet & supportive',
    startPosition: { row: 4, col: 0 },
    route: ['kitchen_oven', 'cake_safe', 'trivia_station'],
    task: "Bake something special!",
    textToLaurel: "Hey Laurel! The pancakes are warming in the oven! 🥞"
  },
  sarah: {
    id: 'sarah',
    name: 'Sarah',
    description: 'Encouraging and wise',
    startPosition: { row: 2, col: 0 },
    route: ['coffee_bar', 'front_table', 'trivia_station'],
    task: "Brew the coffee!",
    textToLaurel: "Hey Laurel! Coffee's brewing and smells amazing! ☕"
  },
  mr_mrs_lindsay: {
    id: 'mr_lindsay',
    name: 'The Lindsays',
    description: 'Mr. & Mrs. Lindsay',
    startPosition: { row: 2, col: 7 },
    route: ['corner_booth', 'coffee_bar', 'trivia_station'],
    task: "Set up the cozy corner!",
    textToLaurel: "Hey Laurel! Our corner booth is all set up! See you soon! 🛋️"
  },
  hank: {
    id: 'hank',
    name: 'Hank',
    description: 'Dependable regular',
    startPosition: { row: 4, col: 4 },
    route: ['breakfast_counter', 'front_table', 'trivia_station'],
    task: "Test the microphone!",
    textToLaurel: "Hey Laurel! Mic check complete - we're ready to roll! 🎤"
  },
  laurel: {
    id: 'laurel',
    name: 'Laurel',
    description: 'Cafe owner',
    isHost: true
  }
};

// Map tile types - Cafe interior
const TILE_TYPES = {
  floor: { emoji: '', name: 'Cafe Floor', walkable: true, color: 'bg-amber-100' },
  start_josie: { emoji: '🪑', name: "Josie's Seat", walkable: true, color: 'bg-amber-50', isStart: 'josie' },
  start_josephine: { emoji: '🪑', name: "Josephine's Seat", walkable: true, color: 'bg-amber-50', isStart: 'josephine' },
  start_taylor: { emoji: '🪑', name: "Taylor's Seat", walkable: true, color: 'bg-amber-50', isStart: 'taylor' },
  start_sarah: { emoji: '🪑', name: "Sarah's Seat", walkable: true, color: 'bg-amber-50', isStart: 'sarah' },
  start_lindsays: { emoji: '🪑', name: "Lindsays' Seat", walkable: true, color: 'bg-amber-50', isStart: 'mr_mrs_lindsay' },
  start_jennie: { emoji: '🪑', name: "Jennie's Seat", walkable: true, color: 'bg-amber-50', isStart: 'jennie_isaac' },
  start_hank: { emoji: '🪑', name: "Hank's Seat", walkable: true, color: 'bg-amber-50', isStart: 'hank' },
  coffee_bar: { emoji: '☕', name: 'Coffee Bar', walkable: true, color: 'bg-amber-200', landmark: true },
  breakfast_counter: { emoji: '🍳', name: 'Breakfast Counter', walkable: true, color: 'bg-yellow-200', landmark: true },
  corner_booth: { emoji: '🛋️', name: 'Corner Booth', walkable: true, color: 'bg-orange-100', landmark: true },
  front_table: { emoji: '🪑', name: 'Front Table', walkable: true, color: 'bg-amber-100', landmark: true },
  cake_safe: { emoji: '🍰', name: 'Cake Safe', walkable: true, color: 'bg-pink-100', landmark: true },
  kitchen_oven: { emoji: '🍪', name: 'Kitchen Oven', walkable: true, color: 'bg-red-100', landmark: true },
  cafe_door: { emoji: '🚪', name: 'Cafe Door', walkable: true, color: 'bg-amber-300', landmark: true },
  laurels_office: { emoji: '📋', name: "Laurel's Office", walkable: true, color: 'bg-amber-200', landmark: true },
  jukebox: { emoji: '🎵', name: 'Jukebox', walkable: true, color: 'bg-purple-100', landmark: true },
  trivia_station: { emoji: '🎤', name: 'Trivia Station', walkable: true, color: 'bg-yellow-300', isDestination: true },
  counter: { emoji: '▬', name: 'Counter', walkable: false, color: 'bg-amber-700' },
  wall: { emoji: '', name: 'Wall', walkable: false, color: 'bg-amber-800' }
};

// Create the Cafe map (8x8 grid)
const createMap = () => {
  const map = [
    ['start_josie', 'floor', 'jukebox', 'floor', 'floor', 'laurels_office', 'floor', 'start_taylor'],
    ['floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor'],
    ['start_sarah', 'coffee_bar', 'floor', 'trivia_station', 'trivia_station', 'floor', 'corner_booth', 'start_lindsays'],
    ['floor', 'floor', 'floor', 'trivia_station', 'trivia_station', 'floor', 'floor', 'floor'],
    ['start_josephine', 'kitchen_oven', 'floor', 'floor', 'start_hank', 'breakfast_counter', 'floor', 'start_jennie'],
    ['floor', 'floor', 'cake_safe', 'floor', 'floor', 'floor', 'front_table', 'cafe_door']
  ];
  return map;
};

// Puzzle data for pancake-themed encounters
const PUZZLES = {
  jukebox: {
    npc: 'The Jukebox',
    npcEmoji: '🎵',
    greeting: "Time to set the mood for trivia night! Pick the perfect playlist!",
    puzzle: {
      type: 'unscramble',
      prompt: "This flat, round breakfast treat is cooked on a hot surface:",
      scrambled: "ACPNEKA",
      answer: "PANCAKE",
      hint: "What the Letter Griddle Cafe is famous for!"
    },
    funFact: "The word 'pancake' dates back to the 15th century! Before that, they were called 'hotcakes' or 'griddle cakes.' Ancient Greeks and Romans made pancakes sweetened with honey.",
    success: "Perfect! The jukebox is playing cozy tunes. Now check the Cake Safe!"
  },
  cake_safe: {
    npc: 'The Cake Safe',
    npcEmoji: '🍰',
    greeting: "The glass display case is gleaming! What sweet treats are inside?",
    puzzle: {
      type: 'unscramble',
      prompt: "A thick, sweet liquid often poured over pancakes:",
      scrambled: "PUSRY",
      answer: "SYRUP",
      hint: "Maple trees give us this golden goodness!"
    },
    funFact: "It takes about 40 gallons of maple sap to make just ONE gallon of maple syrup! That's why pure maple syrup is so precious. Vermont produces the most maple syrup in the United States.",
    success: "Sweet! The desserts are ready for trivia night. Head to the Trivia Station!"
  },
  cafe_door: {
    npc: 'The Welcome Mat',
    npcEmoji: '🚪',
    greeting: "Welcome guests with a warm smile! The cafe door is open!",
    puzzle: {
      type: 'unscramble',
      prompt: "The cooking surface used to make pancakes at a diner:",
      scrambled: "DIRDGLE",
      answer: "GRIDDLE",
      hint: "It's in the name of this cafe!"
    },
    funFact: "A griddle differs from a frying pan because it has a flat surface with no sides. Professional griddles in diners can reach temperatures of 375°F and cook dozens of pancakes at once!",
    success: "Welcome! Guests are arriving. Check on the Corner Booth!"
  },
  corner_booth: {
    npc: 'The Cozy Corner',
    npcEmoji: '🛋️',
    greeting: "The most comfortable spot in the cafe! Perfect for the Lindsays.",
    puzzle: {
      type: 'unscramble',
      prompt: "A creamy dairy product often added to pancake batter:",
      scrambled: "TTRUBE",
      answer: "BUTTER",
      hint: "It makes everything taste better and melts on hot pancakes!"
    },
    funFact: "Butter has been made for over 4,000 years! Adding melted butter to pancake batter makes them more tender and flavorful. In France, crepes are traditionally cooked in butter.",
    success: "Cozy! The booth is ready. Make your way to the Trivia Station!"
  },
  coffee_bar: {
    npc: 'The Espresso Machine',
    npcEmoji: '☕',
    greeting: "The coffee is brewing! Nothing pairs better with pancakes.",
    puzzle: {
      type: 'unscramble',
      prompt: "These small, round pancakes are often topped with powdered sugar:",
      scrambled: "FSFLUF",
      answer: "FLUFFS",
      altAnswer: "PUFFS",
      hint: "Light and airy, like clouds you can eat!"
    },
    funFact: "Japanese soufflé pancakes (known as 'fluffy pancakes') became a global trend! They're made by folding whipped egg whites into the batter, creating pancakes that are 2-3 inches tall!",
    success: "The coffee smells wonderful! Check the Front Table next!"
  },
  front_table: {
    npc: 'Table Number One',
    npcEmoji: '🪑',
    greeting: "The best seat for watching trivia! Right by the action.",
    puzzle: {
      type: 'unscramble',
      prompt: "A breakfast item that's pancakes' best friend, made from pork:",
      scrambled: "ABOCN",
      answer: "BACON",
      hint: "Crispy, salty, and sizzling in the pan!"
    },
    funFact: "Americans consume about 18 pounds of bacon per person each year! The combination of bacon and pancakes became popular in American diners during the 1920s.",
    success: "Table's set! Head to the Trivia Station!"
  },
  laurels_office: {
    npc: "Laurel's Desk",
    npcEmoji: '📋',
    greeting: "Trivia questions are organized and ready! Just need a final check.",
    puzzle: {
      type: 'unscramble',
      prompt: "The main ingredient in pancake batter that comes from wheat:",
      scrambled: "OULRF",
      answer: "FLOUR",
      hint: "A fine powder that's the base of most baked goods!"
    },
    funFact: "All-purpose flour works great for pancakes, but using cake flour makes them even lighter! The lower protein content creates a more tender texture. Some recipes use buckwheat flour for a nuttier flavor.",
    success: "Questions approved! Check the Breakfast Counter!"
  },
  breakfast_counter: {
    npc: 'The Counter',
    npcEmoji: '🍳',
    greeting: "Where the magic happens! Pancakes flip here all day long.",
    puzzle: {
      type: 'unscramble',
      prompt: "You use this tool to flip pancakes in the pan:",
      scrambled: "TASLPUA",
      answer: "SPATULA",
      hint: "A flat utensil with a handle for turning food!"
    },
    funFact: "The perfect pancake flip happens when bubbles form on the surface and the edges look set - usually after 2-3 minutes. Professional cooks can flip pancakes without a spatula by tossing them in the air!",
    success: "Flipping fantastic! Make your way to the Trivia Station!"
  },
  kitchen_oven: {
    npc: 'The Warm Oven',
    npcEmoji: '🍪',
    greeting: "Keeping pancakes warm until everyone arrives! The oven glows softly.",
    puzzle: {
      type: 'unscramble',
      prompt: "Pancakes are often served in a tall pile called a:",
      scrambled: "TKACS",
      answer: "STACK",
      hint: "One on top of another, reaching for the sky!"
    },
    funFact: "The world's largest stack of pancakes was over 3 feet tall with 242 pancakes! In diners, a 'short stack' typically means 2-3 pancakes, while a 'tall stack' is usually 4-5.",
    success: "Warm and ready! Check the Cake Safe next!"
  }
};

// Text messages for each character's journey
const TEXT_MESSAGES = {
  josie: {
    start: [
      { from: 'josephine', text: "Josie honey, start with the jukebox! Pick something fun for trivia night!" }
    ],
    jukebox: [
      { from: 'laurel', text: "Love the music choice, Josie! Perfect trivia vibes! 🎵" }
    ],
    cake_safe: [
      { from: 'sarah', text: "Those desserts look amazing! Save me a slice!" }
    ],
    finish: [
      { from: 'laurel', text: "Josie! The playlist is perfect! Ready for trivia?" }
    ]
  },
  jennie_isaac: {
    start: [
      { from: 'taylor', text: "Jennie! Can you and Isaac greet people at the door? Isaac's tail wags are the best welcome!" }
    ],
    cafe_door: [
      { from: 'sarah', text: "Everyone loves being greeted by Isaac! 🐕" }
    ],
    corner_booth: [
      { from: 'laurel', text: "The Lindsays will love their cozy spot! Thanks for checking on it!" }
    ],
    finish: [
      { from: 'laurel', text: "Jennie and Isaac! Best greeters ever! Come join us!" }
    ]
  },
  taylor: {
    start: [
      { from: 'sarah', text: "Taylor, can you double-check the trivia questions in Laurel's office?" }
    ],
    laurels_office: [
      { from: 'laurel', text: "I knew I could count on you, Taylor! How do they look?" }
    ],
    breakfast_counter: [
      { from: 'hank', text: "Taylor! Save me a seat at the counter!" }
    ],
    finish: [
      { from: 'laurel', text: "Taylor! Everything's organized perfectly! You're amazing!" }
    ]
  },
  josephine: {
    start: [
      { from: 'josie', text: "Mom! Can you check if the pancakes in the oven are ready?" }
    ],
    kitchen_oven: [
      { from: 'laurel', text: "Josephine, you're the best! Those smell incredible!" }
    ],
    cake_safe: [
      { from: 'sarah', text: "Did you add your secret ingredient?" }
    ],
    finish: [
      { from: 'laurel', text: "Josephine! Those pancakes are perfection! Thank you! 🥞" }
    ]
  },
  sarah: {
    start: [
      { from: 'taylor', text: "Sarah, can you get the coffee brewing? You make the best pot!" }
    ],
    coffee_bar: [
      { from: 'hank', text: "Is that the good stuff brewing? I can smell it from here! ☕" }
    ],
    front_table: [
      { from: 'laurel', text: "Front table looks great! Perfect view of the trivia board!" }
    ],
    finish: [
      { from: 'laurel', text: "Sarah! That coffee is divine! Ready for trivia?" }
    ]
  },
  mr_mrs_lindsay: {
    start: [
      { from: 'sarah', text: "Mr. and Mrs. Lindsay! Your corner booth awaits.  I'll bring coffee!" }
    ],
    corner_booth: [
      { from: 'laurel', text: "The coziest spot for our most loyal customers! 💛" }
    ],
    coffee_bar: [
      { from: 'hank', text: "Mr. Lindsay, remember that trivia night in '92? What a comeback!" }
    ],
    finish: [
      { from: 'laurel', text: "Mr. and Mrs. Lindsay! So glad you're here! Your usual booth is ready!" }
    ]
  },
  hank: {
    start: [
      { from: 'mr_mrs_lindsay', text: "Hank! Can you test the microphone at the counter? You've got the voice for it!" }
    ],
    breakfast_counter: [
      { from: 'taylor', text: "Hank, can you hear me in the back? Testing, testing!" }
    ],
    front_table: [
      { from: 'laurel', text: "Perfect spot, Hank! You'll be able to hear every question clearly!" }
    ],
    finish: [
      { from: 'laurel', text: "Hank! Mic sounds great! Ready to win some trivia?" }
    ]
  }
};

// Main Game Component
const AdventuresInPancakes = () => {
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
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  
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
  
  // ============================================
  // PROGRESS SAVE/LOAD FUNCTIONS
  // ============================================
  
  const saveProgress = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const progress = {
      completedChapters,
      currentChapter,
      playerPosition,
      visitedLandmarks,
      screen: screen === 'playing' ? 'playing' : null,
      savedAt: new Date().toISOString()
    };
    
    try {
      localStorage.setItem('pancakeAdventureProgress', JSON.stringify(progress));
    } catch (e) {
      console.error('Could not save progress', e);
    }
  }, [completedChapters, currentChapter, playerPosition, visitedLandmarks, screen]);
  
  const loadProgress = useCallback(() => {
    if (typeof window === 'undefined') return null;
    
    try {
      const saved = localStorage.getItem('pancakeAdventureProgress');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Could not load progress', e);
    }
    return null;
  }, []);
  
  const clearProgress = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem('pancakeAdventureProgress');
    } catch (e) {
      console.error('Could not clear progress', e);
    }
  }, []);
  
  const resetAllProgress = useCallback(() => {
    setCompletedChapters([]);
    setCurrentChapter(null);
    setPlayerPosition({ row: 0, col: 0 });
    setVisitedLandmarks([]);
    setMessages([]);
    clearProgress();
    setShowResetConfirm(false);
    setScreen('welcome');
  }, [clearProgress]);
  
  // ============================================
  // LOAD PROGRESS ON MOUNT
  // ============================================
  useEffect(() => {
    setHasMounted(true);
    
    const savedProgress = loadProgress();
    if (savedProgress) {
      if (savedProgress.completedChapters) {
        setCompletedChapters(savedProgress.completedChapters);
      }
      
      if (savedProgress.screen === 'playing' && savedProgress.currentChapter) {
        setCurrentChapter(savedProgress.currentChapter);
        setPlayerPosition(savedProgress.playerPosition || { row: 0, col: 0 });
        setVisitedLandmarks(savedProgress.visitedLandmarks || []);
      }
    }
  }, [loadProgress]);
  
  // ============================================
  // AUTO-SAVE PROGRESS
  // ============================================
  useEffect(() => {
    if (!hasMounted) return;
    saveProgress();
  }, [completedChapters, currentChapter, playerPosition, visitedLandmarks, screen, hasMounted, saveProgress]);
  
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
    if (row < 0 || row >= map.length || col < 0 || col >= 8) return false;
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
    }, 4000);
  };
  
  // Share chapter completion
  const handleShareChapter = () => {
    const character = CHARACTERS[currentChapter];
    const chapterNum = chapters.findIndex(c => c.id === currentChapter) + 1;
    
    const shareText = `🥞 Adventures in Pancakes
Letter Griddle Cafe

Chapter ${chapterNum}: ${character.name} is ready!
"${character.textToLaurel}"
${completedChapters.length}/${chapters.length} crew ready for trivia

Play at lettergriddle.com/adventures
More games at lettergriddle.com`;

    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };
  
  // Share final completion
  const handleShareFinal = () => {
    const shareText = `🥞 Adventures in Pancakes
Letter Griddle Cafe

🎤 TRIVIA NIGHT IS READY! 🎤
All 7 crew members are at the Trivia Station!
The Letter Griddle Cafe is buzzing!

Play at lettergriddle.com/adventures
More games at lettergriddle.com`;

    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };
  
  const allChaptersComplete = completedChapters.length >= chapters.length;
  const confettiEmojis = ['🥞', '☕', '🍳', '✨', '🎤', '💛', '🧈'];
  
  // ============================================
  // WELCOME SCREEN
  // ============================================
  if (screen === 'welcome') {
    return (
      <div 
        className="min-h-screen p-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 30%, #F59E0B 70%, #D97706 100%)'
        }}
      >
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-xl md:text-2xl"
              style={{
                left: `${(i * 13) % 100}%`,
                top: '-50px',
                animation: `floatDown ${10 + (i % 5)}s ease-in-out ${i * 0.5}s infinite`
              }}
            >
              {['🥞', '☕', '🧈', '🍳'][i % 4]}
            </div>
          ))}
        </div>
        
        <div className="max-w-lg mx-auto pt-8 relative z-10">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🥞</div>
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-2 drop-shadow-lg" style={{fontFamily: 'Georgia, serif'}}>
              Adventures in Pancakes
            </h1>
            <p className="text-xl text-amber-800 mb-2" style={{fontFamily: 'Georgia, serif'}}>
              at the Letter Griddle Cafe
            </p>
            <p className="text-amber-700/90 text-sm">Trivia Night in Griddle Falls!</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 border-2 border-amber-300/50 mb-6">
            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl p-4 mb-6 border border-amber-200">
              <p className="text-amber-900 text-center leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
                It's <strong>Trivia Night</strong> at the Letter Griddle Cafe! 🎤
                <br /><br />
                Laurel needs help getting everything ready. Guide each member of the Trivia Crew through the cafe to complete their tasks before the fun begins!
              </p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-amber-800 mb-3 text-center" style={{fontFamily: 'Georgia, serif'}}>
                How to Play
              </h2>
              <div className="space-y-2">
                <div className="flex items-center gap-3 bg-amber-50 rounded-xl p-3">
                  <span className="text-2xl">👆</span>
                  <p className="text-amber-800 text-sm">Tap adjacent tiles to move through the cafe</p>
                </div>
                <div className="flex items-center gap-3 bg-amber-50 rounded-xl p-3">
                  <span className="text-2xl">☕</span>
                  <p className="text-amber-800 text-sm">Visit cafe spots and solve pancake word puzzles</p>
                </div>
                <div className="flex items-center gap-3 bg-amber-50 rounded-xl p-3">
                  <span className="text-2xl">🥞</span>
                  <p className="text-amber-800 text-sm">Learn fun facts about pancakes and breakfast!</p>
                </div>
                <div className="flex items-center gap-3 bg-amber-50 rounded-xl p-3">
                  <span className="text-2xl">🎤</span>
                  <p className="text-amber-800 text-sm">Reach the Trivia Station when ready!</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold text-amber-800 mb-3 text-center" style={{fontFamily: 'Georgia, serif'}}>
                The Trivia Crew
              </h3>
              <div className="flex justify-center gap-2 flex-wrap">
                {Object.values(CHARACTERS).filter(c => !c.isHost).slice(0, 6).map(char => (
                  <CharacterAvatar key={char.id} character={char} size="md" />
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setScreen('chapter_select')}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-4 rounded-2xl font-bold text-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
              style={{fontFamily: 'Georgia, serif'}}
            >
              🥞 Start Adventure!
            </button>
          </div>
          
          <div className="text-center text-sm">
            <a href="/" className="text-amber-900/90 hover:text-amber-900 underline" style={{fontFamily: 'Georgia, serif'}}>
              Part of The Letter Griddle Cafe
            </a>
            <p className="mt-2 text-amber-800/60 text-xs">© 2026 Letter Griddle Cafe</p>
            <div className="mt-2 flex justify-center gap-4 text-xs">
              <a href="/privacy" className="text-amber-800/70 hover:text-amber-900 underline">Privacy Policy</a>
              <span className="text-amber-800/40">|</span>
              <a href="/terms" className="text-amber-800/70 hover:text-amber-900 underline">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes floatDown {
            0% {
              transform: translateY(-50px) rotate(0deg);
              opacity: 0.8;
            }
            50% {
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
          background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 30%, #F59E0B 70%, #D97706 100%)'
        }}
      >
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-xl"
              style={{
                left: `${(i * 17) % 100}%`,
                top: '-30px',
                animation: `floatDown ${12 + (i % 4)}s ease-in-out ${i * 0.8}s infinite`
              }}
            >
              {['🥞', '☕'][i % 2]}
            </div>
          ))}
        </div>
        
        <div className="max-w-lg mx-auto pt-6 relative z-10">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-900 mb-1" style={{fontFamily: 'Georgia, serif'}}>
              🥞 Adventures in Pancakes 🥞
            </h1>
            <p className="text-amber-800 text-sm">Choose who to guide to the Trivia Station!</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 mb-4 border border-amber-200/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-amber-800 font-medium" style={{fontFamily: 'Georgia, serif'}}>Progress</span>
              <span className="text-amber-600 text-sm">{completedChapters.length} / {chapters.length} ready</span>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-amber-500 to-yellow-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedChapters.length / chapters.length) * 100}%` }}
              />
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-amber-700 text-xs" style={{fontFamily: 'Georgia, serif'}}>
                ✨ Your progress saves automatically!{' '}
                <button 
                  onClick={() => setShowResetConfirm(true)}
                  className="text-amber-500 hover:text-amber-700 underline"
                >
                  Reset to start fresh
                </button>
              </p>
            </div>
          </div>
          
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
                      ? 'bg-green-100/90 border-2 border-green-400'
                      : isLocked
                        ? 'bg-gray-200/60 border-2 border-gray-300 opacity-60'
                        : 'bg-white/90 border-2 border-amber-300 hover:border-amber-500 hover:scale-102 active:scale-98'
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
                    <div className="font-bold text-amber-900" style={{fontFamily: 'Georgia, serif'}}>
                      Chapter {index + 1}: {chapter.character.name}
                    </div>
                    <div className="text-sm text-amber-700">{chapter.character.task}</div>
                    {isComplete && (
                      <div className="text-xs text-green-600 mt-1">✨ Ready for trivia!</div>
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
          
          {allChaptersComplete && (
            <button
              onClick={() => setScreen('finale')}
              className="w-full bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-600 hover:to-amber-600 text-white py-4 rounded-2xl font-bold text-xl shadow-lg transition-all transform hover:scale-105 mb-4"
              style={{fontFamily: 'Georgia, serif'}}
            >
              🎤 Everyone's Ready! Start Trivia Night!
            </button>
          )}
          
          <button
            onClick={() => setScreen('welcome')}
            className="w-full bg-white/60 backdrop-blur-sm text-amber-800 py-3 rounded-xl font-medium transition-all hover:bg-white/80"
            style={{fontFamily: 'Georgia, serif'}}
          >
            ← Back to Title
          </button>
          
          <div className="text-center mt-6 text-xs">
            <div className="flex justify-center gap-4">
              <a href="/privacy" className="text-amber-800/70 hover:text-amber-900 underline">Privacy</a>
              <span className="text-amber-800/40">|</span>
              <a href="/terms" className="text-amber-800/70 hover:text-amber-900 underline">Terms</a>
            </div>
          </div>
        </div>
        
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-6 max-w-sm w-full shadow-2xl border-2 border-amber-300">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">🥞</div>
                <h3 className="text-xl font-bold text-amber-800" style={{fontFamily: 'Georgia, serif'}}>
                  Reset All Progress?
                </h3>
              </div>
              
              <p className="text-amber-700 text-center text-sm mb-6" style={{fontFamily: 'Georgia, serif'}}>
                This will clear all your chapter progress. This cannot be undone!
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 bg-white border-2 border-amber-300 text-amber-800 py-3 rounded-xl font-bold hover:bg-amber-50 transition-all"
                  style={{fontFamily: 'Georgia, serif'}}
                >
                  Keep Progress
                </button>
                <button
                  onClick={resetAllProgress}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
                  style={{fontFamily: 'Georgia, serif'}}
                >
                  Reset Everything
                </button>
              </div>
            </div>
          </div>
        )}
        
        <style>{`
          @keyframes floatDown {
            0% { transform: translateY(-30px) rotate(0deg); opacity: 0.8; }
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
          background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 30%, #F59E0B 70%, #D97706 100%)'
        }}
      >
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
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={() => setScreen('chapter_select')}
              className="bg-white/60 backdrop-blur-sm text-amber-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white/80 transition-all"
            >
              ← Back
            </button>
            <div className="text-center">
              <h2 className="text-lg md:text-xl font-bold text-amber-900" style={{fontFamily: 'Georgia, serif'}}>
                Guide {character.name}
              </h2>
              <p className="text-amber-800 text-xs">to Trivia Station 🎤</p>
            </div>
            <button
              onClick={() => setShowMessages(true)}
              className="bg-white/60 backdrop-blur-sm text-amber-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white/80 transition-all relative"
            >
              💬
              {messages.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {messages.length}
                </span>
              )}
            </button>
          </div>
          
          {/* Character's text to Laurel */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-3 mb-3 border border-amber-200/50">
            <div className="flex items-start gap-3">
              <CharacterAvatar character={character} size="md" />
              <div className="flex-1">
                <div className="font-bold text-amber-800 text-sm" style={{fontFamily: 'Georgia, serif'}}>{character.name} texts Laurel:</div>
                <div className="text-xs text-amber-700 italic">"{character.textToLaurel}"</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-amber-600">Tasks</div>
                <div className="font-bold text-amber-800">{visitedLandmarks.length}</div>
              </div>
            </div>
          </div>
          
          {/* Cafe Map */}
          <div className="bg-gradient-to-br from-amber-800 to-amber-900 p-2 rounded-2xl shadow-2xl mb-3">
            <div className="text-center text-amber-200 text-xs mb-1" style={{fontFamily: 'Georgia, serif'}}>
              ☕ The Letter Griddle Cafe ☕
            </div>
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
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2 text-xs text-amber-800">
            <div className="flex flex-wrap justify-center gap-2">
              <span>🎤 Trivia</span>
              <span>☕ Coffee</span>
              <span>🍳 Counter</span>
              <span>🎵 Jukebox</span>
              <span>🍪 Oven</span>
              <span>🍰 Cake</span>
            </div>
          </div>
        </div>
        
        {/* Puzzle Modal */}
        {currentPuzzle && !showFunFact && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-amber-200">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">{currentPuzzle.npcEmoji}</div>
                <div className="font-bold text-amber-800" style={{fontFamily: 'Georgia, serif'}}>{currentPuzzle.npc}</div>
              </div>
              
              <div className="bg-amber-100 rounded-xl p-3 mb-4">
                <p className="text-amber-800 text-center" style={{fontFamily: 'Georgia, serif'}}>
                  "{currentPuzzle.greeting}"
                </p>
              </div>
              
              <div className="mb-4">
                <p className="text-amber-700 text-sm mb-2 text-center">{currentPuzzle.puzzle.prompt}</p>
                <div className="bg-amber-50 rounded-xl p-4 text-center mb-3">
                  <span className="text-2xl font-bold text-amber-900 tracking-widest">
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
                      : 'border-amber-300 focus:border-amber-500'
                  } outline-none transition-all`}
                  style={{fontFamily: 'Georgia, serif'}}
                  autoFocus
                />
                <p className="text-xs text-amber-600 text-center mt-2">
                  🥞 Hint: {currentPuzzle.puzzle.hint}
                </p>
              </div>
              
              <button
                onClick={handlePuzzleSubmit}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
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
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-amber-200">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">🥞</div>
                <div className="font-bold text-amber-800 text-xl" style={{fontFamily: 'Georgia, serif'}}>Did You Know?</div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 mb-4 border border-amber-200">
                <p className="text-amber-800 text-center leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
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
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
                style={{fontFamily: 'Georgia, serif'}}
              >
                Continue 🥞
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
              className="bg-white/95 backdrop-blur-md rounded-t-3xl p-4 max-w-sm w-full shadow-2xl border border-amber-200 max-h-[60vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-amber-800" style={{fontFamily: 'Georgia, serif'}}>💬 Messages</h3>
                <button onClick={() => setShowMessages(false)} className="text-amber-400 hover:text-amber-600 text-xl">×</button>
              </div>
              <div className="space-y-2">
                {messages.map((msg, i) => (
                  <div key={i} className="bg-amber-50 rounded-xl p-3 flex gap-3 items-start">
                    <CharacterAvatar character={CHARACTERS[msg.from]} size="sm" />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-amber-800 capitalize">{CHARACTERS[msg.from]?.name || msg.from}</div>
                      <div className="text-sm text-amber-700">{msg.text}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowMessages(false)}
                className="w-full mt-3 bg-amber-100 text-amber-800 py-2 rounded-xl font-medium hover:bg-amber-200 transition-all"
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
  // ARRIVED SCREEN
  // ============================================
  if (screen === 'arrived') {
    const character = CHARACTERS[currentChapter];
    const chapterNum = chapters.findIndex(c => c.id === currentChapter) + 1;
    
    return (
      <div 
        className="min-h-screen p-4 relative overflow-hidden flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 30%, #F59E0B 70%, #D97706 100%)'
        }}
      >
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
              {['🎉', '✨', '🥞', '☕', '💛'][i % 5]}
            </div>
          ))}
        </div>
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-amber-300 text-center">
            <div className="mb-4">
              <CharacterAvatar character={character} size="xl" />
            </div>
            
            <div className="text-5xl mb-4">🎤</div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-amber-800 mb-2" style={{fontFamily: 'Georgia, serif'}}>
              {character.name} - Ready!
            </h2>
            
            <p className="text-amber-700 mb-4" style={{fontFamily: 'Georgia, serif'}}>
              Task complete! Ready for Trivia Night! 🥞
            </p>
            
            <div className="bg-amber-100 rounded-xl p-4 mb-4 flex items-center gap-3">
              <CharacterAvatar character={CHARACTERS.laurel} size="md" />
              <div className="text-left">
                <div className="font-bold text-amber-800 text-sm">Laurel</div>
                <div className="text-amber-700 text-sm italic">
                  "Thanks, {character.name}! Grab a seat! Trivia starts soon!" ☕
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-3 mb-4">
              <div className="text-sm text-amber-700 mb-1">Crew Ready</div>
              <div className="font-bold text-amber-800 text-lg">
                {completedChapters.length} / {chapters.length} at the Trivia Station
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 mb-4 border border-amber-200">
              <p className="text-xs text-amber-600 mb-2">Share your progress:</p>
              <div className="text-left text-sm text-amber-800 font-mono whitespace-pre-line bg-white/50 rounded-lg p-3">
{`🥞 Adventures in Pancakes
Letter Griddle Cafe

Chapter ${chapterNum}: ${character.name} is ready!
${completedChapters.length}/${chapters.length} crew ready for trivia

Play at lettergriddle.com/adventures`}
              </div>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={handleShareChapter}
                className="w-full bg-gradient-to-r from-indigo-500 to-amber-600 hover:from-indigo-600 hover:to-amber-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                style={{fontFamily: 'Georgia, serif'}}
              >
                {shareCopied ? '✓ Copied!' : 'Share Results'}
              </button>
              
              <button
                onClick={() => setScreen('chapter_select')}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
                style={{fontFamily: 'Georgia, serif'}}
              >
                {completedChapters.length < chapters.length ? '🥞 Help Next Crew Member!' : '🎤 Start Trivia Night!'}
              </button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-amber-200 flex justify-center gap-4 text-xs">
              <a href="/privacy" className="text-amber-600 hover:text-amber-800 underline">Privacy</a>
              <span className="text-amber-300">|</span>
              <a href="/terms" className="text-amber-600 hover:text-amber-800 underline">Terms</a>
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
  // FINALE SCREEN
  // ============================================
  if (screen === 'finale') {
    return (
      <div 
        className="min-h-screen p-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 30%, #F59E0B 70%, #D97706 100%)'
        }}
      >
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
              {['🎉', '✨', '🥞', '☕', '🎤', '💛', '🧈'][i % 7]}
            </div>
          ))}
        </div>
        
        <div className="max-w-lg mx-auto pt-6 relative z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-amber-300 text-center">
            <div className="text-6xl mb-4">🎤</div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-2" style={{fontFamily: 'Georgia, serif'}}>
              Trivia Night Begins!
            </h1>
            
            <p className="text-amber-700 mb-6" style={{fontFamily: 'Georgia, serif'}}>
              The whole Trivia Crew is here and ready!
            </p>
            
            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl p-4 mb-6">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {Object.values(CHARACTERS).filter(c => c.id).map(char => (
                  <CharacterAvatar key={char.id} character={char} size="md" />
                ))}
              </div>
              <p className="text-amber-800 font-medium" style={{fontFamily: 'Georgia, serif'}}>
                The Letter Griddle Cafe is buzzing! 💛
              </p>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <CharacterAvatar character={CHARACTERS.laurel} size="lg" />
                <div className="text-left">
                  <div className="font-bold text-amber-800">Laurel</div>
                  <div className="text-xs text-amber-600">Cafe Owner & Trivia Host</div>
                </div>
              </div>
              <p className="text-amber-800 italic" style={{fontFamily: 'Georgia, serif'}}>
                "Welcome everyone to Trivia Night at the Letter Griddle Cafe! Thank you for helping get everything ready. First question coming up... but first, who wants pancakes?" 🥞✨
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 mb-4 border border-amber-200">
              <p className="text-xs text-amber-600 mb-2">Share your achievement:</p>
              <div className="text-left text-sm text-amber-800 font-mono whitespace-pre-line bg-white/50 rounded-lg p-3">
{`🥞 Adventures in Pancakes
Letter Griddle Cafe

🎤 TRIVIA NIGHT IS READY! 🎤
All 7 crew members are here!
The cafe is buzzing!

Play at lettergriddle.com/adventures`}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-amber-100 rounded-xl p-3">
                <div className="text-2xl font-bold text-amber-800">{chapters.length}</div>
                <div className="text-xs text-amber-600">Crew Ready</div>
              </div>
              <div className="bg-amber-100 rounded-xl p-3">
                <div className="text-2xl font-bold text-amber-800">🎤</div>
                <div className="text-xs text-amber-600">Trivia Time!</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={handleShareFinal}
                className="w-full bg-gradient-to-r from-indigo-500 to-amber-600 hover:from-indigo-600 hover:to-amber-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                style={{fontFamily: 'Georgia, serif'}}
              >
                {shareCopied ? '✓ Copied!' : 'Share Results'}
              </button>
              
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
                style={{fontFamily: 'Georgia, serif'}}
              >
                🥞 Play Again
              </button>
              
              <a
                href="/"
                className="block w-full bg-white/60 text-amber-800 py-3 rounded-xl font-medium hover:bg-white/80 transition-all"
                style={{fontFamily: 'Georgia, serif'}}
              >
                Back to Letter Griddle
              </a>
            </div>
            
            <div className="mt-4 pt-4 border-t border-amber-200">
              <p className="text-sm text-amber-700 mb-2">More from Letter Griddle:</p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <a href="https://lettergriddle.com" className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full hover:bg-amber-200">🥞 Letter Griddle</a>
                <a href="https://griddlefalls.com" className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full hover:bg-amber-200">☕ Griddle Falls</a>
                <a href="https://lettergriddlebuffet.com" className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full hover:bg-amber-200">🍽️ Buffet</a>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-amber-200 flex justify-center gap-4 text-xs">
              <a href="/privacy" className="text-amber-600 hover:text-amber-800 underline">Privacy Policy</a>
              <span className="text-amber-300">|</span>
              <a href="/terms" className="text-amber-600 hover:text-amber-800 underline">Terms of Service</a>
            </div>
          </div>
          
          <div className="text-center py-6 text-sm">
            <p className="text-amber-900/80" style={{fontFamily: 'Georgia, serif'}}>
              Thank you for visiting the Letter Griddle Cafe! 🥞
            </p>
            <p className="text-amber-800/60 text-xs mt-2">© 2026 Letter Griddle Cafe</p>
          </div>
        </div>
        
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-6 max-w-sm w-full shadow-2xl border-2 border-amber-300">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">🥞</div>
                <h3 className="text-xl font-bold text-amber-800" style={{fontFamily: 'Georgia, serif'}}>
                  Reset All Progress?
                </h3>
              </div>
              
              <p className="text-amber-700 text-center text-sm mb-6" style={{fontFamily: 'Georgia, serif'}}>
                This will clear all your chapter progress. This cannot be undone!
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 bg-white border-2 border-amber-300 text-amber-800 py-3 rounded-xl font-bold hover:bg-amber-50 transition-all"
                  style={{fontFamily: 'Georgia, serif'}}
                >
                  Keep Progress
                </button>
                <button
                  onClick={resetAllProgress}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
                  style={{fontFamily: 'Georgia, serif'}}
                >
                  Reset Everything
                </button>
              </div>
            </div>
          </div>
        )}
        
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

export default AdventuresInPancakes;
