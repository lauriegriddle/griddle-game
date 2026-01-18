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
          <circle cx="50" cy="50" r="48" fill="#FEF3E2" />
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
        <circle cx="50" cy="50" r="48" fill="#FEF3E2" />
        
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

// Character data - Coffee themed tasks
const CHARACTERS = {
  josie: {
    id: 'josie',
    name: 'Josie',
    description: "Josephine's daughter",
    startPosition: { row: 0, col: 0 },
    route: ['jukebox', 'cake_safe', 'trivia_station'],
    task: "Queue up coffeehouse music!",
    textToLaurel: "Hey Laurel! I found the perfect jazz and acoustic playlist for coffee night! 🎵☕"
  },
  jennie_isaac: {
    id: 'jennie_isaac',
    name: 'Jennie & Isaac',
    description: 'Inseparable duo',
    startPosition: { row: 4, col: 7 },
    route: ['cafe_door', 'corner_booth', 'trivia_station'],
    task: "Welcome coffee lovers!",
    textToLaurel: "Hey Laurel! Isaac and I are greeting everyone with the aroma of fresh brew! 🐕☕"
  },
  taylor: {
    id: 'taylor',
    name: 'Taylor B.',
    description: 'Smart and efficient',
    startPosition: { row: 0, col: 7 },
    route: ['laurels_office', 'breakfast_counter', 'trivia_station'],
    task: "Review coffee trivia!",
    textToLaurel: "Hey Laurel! These coffee questions are amazing! Did you know about Ethiopian origins? 📋☕"
  },
  josephine: {
    id: 'josephine',
    name: 'Josephine',
    description: 'Sweet & supportive',
    startPosition: { row: 4, col: 0 },
    route: ['kitchen_oven', 'cake_safe', 'trivia_station'],
    task: "Bake coffee cake!",
    textToLaurel: "Hey Laurel! The coffee cake with cinnamon streusel is in the oven! 🍰☕"
  },
  sarah: {
    id: 'sarah',
    name: 'Sarah',
    description: 'Encouraging and wise',
    startPosition: { row: 2, col: 0 },
    route: ['coffee_bar', 'front_table', 'trivia_station'],
    task: "Master the espresso!",
    textToLaurel: "Hey Laurel! I'm pulling perfect espresso shots for everyone! ☕✨"
  },
  mr_mrs_lindsay: {
    id: 'mr_lindsay',
    name: 'The Lindsays',
    description: 'Mr. & Mrs. Lindsay',
    startPosition: { row: 2, col: 7 },
    route: ['corner_booth', 'coffee_bar', 'trivia_station'],
    task: "Share coffee memories!",
    textToLaurel: "Hey Laurel! We're telling everyone about the coffee plantations in Colombia! 🌿☕"
  },
  hank: {
    id: 'hank',
    name: 'Hank',
    description: 'Dependable regular',
    startPosition: { row: 4, col: 4 },
    route: ['breakfast_counter', 'front_table', 'trivia_station'],
    task: "Set up coffee bar!",
    textToLaurel: "Hey Laurel! Got the French press and pour-over stations all ready! ☕🫖"
  },
  laurel: {
    id: 'laurel',
    name: 'Laurel',
    description: 'Cafe owner',
    isHost: true
  }
};

// Map tile types - Cafe interior with Coffee theme
const TILE_TYPES = {
  floor: { emoji: '', name: 'Cafe Floor', walkable: true, color: 'bg-amber-50' },
  start_josie: { emoji: '🪑', name: "Josie's Seat", walkable: true, color: 'bg-amber-100', isStart: 'josie' },
  start_josephine: { emoji: '🪑', name: "Josephine's Seat", walkable: true, color: 'bg-amber-100', isStart: 'josephine' },
  start_taylor: { emoji: '🪑', name: "Taylor's Seat", walkable: true, color: 'bg-amber-100', isStart: 'taylor' },
  start_sarah: { emoji: '🪑', name: "Sarah's Seat", walkable: true, color: 'bg-amber-100', isStart: 'sarah' },
  start_lindsays: { emoji: '🪑', name: "Lindsays' Seat", walkable: true, color: 'bg-amber-100', isStart: 'mr_mrs_lindsay' },
  start_jennie: { emoji: '🪑', name: "Jennie's Seat", walkable: true, color: 'bg-amber-100', isStart: 'jennie_isaac' },
  start_hank: { emoji: '🪑', name: "Hank's Seat", walkable: true, color: 'bg-amber-100', isStart: 'hank' },
  coffee_bar: { emoji: '☕', name: 'Coffee Bar', walkable: true, color: 'bg-amber-300', landmark: true },
  breakfast_counter: { emoji: '🍳', name: 'Breakfast Counter', walkable: true, color: 'bg-yellow-200', landmark: true },
  corner_booth: { emoji: '🛋️', name: 'Corner Booth', walkable: true, color: 'bg-orange-200', landmark: true },
  front_table: { emoji: '🪑', name: 'Front Table', walkable: true, color: 'bg-amber-100', landmark: true },
  cake_safe: { emoji: '🍰', name: 'Cake Safe', walkable: true, color: 'bg-orange-100', landmark: true },
  kitchen_oven: { emoji: '🍪', name: 'Kitchen Oven', walkable: true, color: 'bg-orange-100', landmark: true },
  cafe_door: { emoji: '🚪', name: 'Cafe Door', walkable: true, color: 'bg-amber-300', landmark: true },
  laurels_office: { emoji: '📋', name: "Laurel's Office", walkable: true, color: 'bg-orange-200', landmark: true },
  jukebox: { emoji: '🎵', name: 'Jukebox', walkable: true, color: 'bg-purple-100', landmark: true },
  trivia_station: { emoji: '☕', name: 'Trivia Station', walkable: true, color: 'bg-amber-400', isDestination: true },
  counter: { emoji: '▬', name: 'Counter', walkable: false, color: 'bg-amber-800' },
  wall: { emoji: '', name: 'Wall', walkable: false, color: 'bg-amber-900' }
};

// Create the Cafe map (6x8 grid)
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

// Puzzle data for Coffee-themed encounters
const PUZZLES = {
  jukebox: {
    npc: 'The Jukebox',
    npcEmoji: '🎵',
    greeting: "Time for coffeehouse vibes! Jazz, acoustic, or bossa nova?",
    puzzle: {
      type: 'unscramble',
      prompt: "This Italian word means 'pressed out' and describes a strong coffee:",
      scrambled: "SSEPEROS",
      answer: "ESPRESSO",
      hint: "The base for lattes, cappuccinos, and americanos!"
    },
    funFact: "Espresso was invented in Italy in the early 1900s. The word means 'pressed out' in Italian, referring to how hot water is forced through finely ground coffee. A proper espresso shot takes only 25-30 seconds to pull!",
    success: "Perfect shot! The coffeehouse playlist is ready. Check the Cake Safe for treats!"
  },
  cake_safe: {
    npc: 'The Cake Safe',
    npcEmoji: '🍰',
    greeting: "Coffee cake, tiramisu, and biscotti, oh my!",
    puzzle: {
      type: 'unscramble',
      prompt: "This Italian dessert with coffee-soaked ladyfingers means 'pick me up':",
      scrambled: "MATIRSIU",
      answer: "TIRAMISU",
      hint: "Layers of mascarpone, cocoa, and espresso-soaked cookies!"
    },
    funFact: "Tiramisu was invented in the Veneto region of Italy in the 1960s. The name literally means 'pick me up' or 'cheer me up' in Italian, likely referring to the caffeine and sugar boost it provides!",
    success: "Delizioso! The dessert case is stocked. Head to the Trivia Station!"
  },
  cafe_door: {
    npc: 'The Welcome Mat',
    npcEmoji: '🚪',
    greeting: "Welcome! Come in and smell the fresh roast!",
    puzzle: {
      type: 'unscramble',
      prompt: "This African country is considered the birthplace of coffee:",
      scrambled: "HAPOIETI",
      answer: "ETHIOPIA",
      hint: "Legend says a goat herder named Kaldi discovered coffee here!"
    },
    funFact: "Coffee was discovered in Ethiopia around the 9th century! Legend says a goat herder named Kaldi noticed his goats became energetic after eating berries from a certain tree. Ethiopia still grows some of the world's finest arabica beans.",
    success: "Welcome to Coffee Trivia Night! Check on the Corner Booth!"
  },
  corner_booth: {
    npc: 'The Cozy Corner',
    npcEmoji: '🛋️',
    greeting: "The perfect spot to enjoy a warm cup and good company!",
    puzzle: {
      type: 'unscramble',
      prompt: "This coffee drink is named after Italian monks' brown robes:",
      scrambled: "NUCCAPOICP",
      answer: "CAPPUCCINO",
      hint: "Equal parts espresso, steamed milk, and milk foam!"
    },
    funFact: "Cappuccino is named after the Capuchin friars because the color of the drink resembles the brown robes they wear. In Italy, cappuccino is traditionally only consumed in the morning, never after a meal!",
    success: "Perfectly foamed! Head to the Trivia Station!"
  },
  coffee_bar: {
    npc: 'The Coffee Station',
    npcEmoji: '☕',
    greeting: "From light roast to dark roast, we've got it all!",
    puzzle: {
      type: 'unscramble',
      prompt: "This smooth, less acidic coffee is made by steeping grounds in cold water:",
      scrambled: "DLCO RBWE",
      answer: "COLD BREW",
      altAnswer: "COLDBREW",
      hint: "Brewed without heat for 12-24 hours!"
    },
    funFact: "Cold brew coffee is made by steeping coarse grounds in cold water for 12-24 hours. This slow process produces a smooth, sweet concentrate with about 67% less acidity than hot-brewed coffee. It can be stored in the fridge for up to two weeks!",
    success: "Smooth and refreshing! Check the Front Table next!"
  },
  front_table: {
    npc: 'Table Number One',
    npcEmoji: '🪑',
    greeting: "Best seat in the house, right by the coffee aroma!",
    puzzle: {
      type: 'unscramble',
      prompt: "A trained professional who specializes in making coffee drinks:",
      scrambled: "TABISAR",
      answer: "BARISTA",
      hint: "They craft your latte art and know their beans!"
    },
    funFact: "The word 'barista' comes from Italian and simply means 'bartender.' Professional baristas can take years to master skills like latte art, proper extraction, and milk texturing. World Barista Championships have been held annually since 2000!",
    success: "Like a pro! Head to the Trivia Station!"
  },
  laurels_office: {
    npc: "Laurel's Desk",
    npcEmoji: '📋',
    greeting: "Coffee trivia questions are ready! Let's review.",
    puzzle: {
      type: 'unscramble',
      prompt: "The two main species of coffee beans are Robusta and:",
      scrambled: "CABRAAI",
      answer: "ARABICA",
      hint: "This variety is known for its smooth, complex flavor!"
    },
    funFact: "Arabica beans make up about 60-70% of world coffee production. They're grown at higher altitudes and have a sweeter, more complex flavor than Robusta beans. Robusta has more caffeine but a harsher taste, making it popular for espresso blends and instant coffee.",
    success: "Bean there, done that! Check the Breakfast Counter!"
  },
  breakfast_counter: {
    npc: 'The Counter',
    npcEmoji: '🍳',
    greeting: "Nothing beats breakfast with a fresh cup of joe!",
    puzzle: {
      type: 'unscramble',
      prompt: "This brewing method uses a paper filter and slow pouring technique:",
      scrambled: "RUOP VROE",
      answer: "POUR OVER",
      altAnswer: "POUROVER",
      hint: "Baristas slowly pour hot water in circles over the grounds!"
    },
    funFact: "Pour over coffee was invented in Germany in 1908 by Melitta Bentz, who used blotting paper from her son's school notebook as a filter! This method allows precise control over brewing time and water temperature, bringing out subtle flavors in the beans.",
    success: "Perfectly extracted! Make your way to the Trivia Station!"
  },
  kitchen_oven: {
    npc: 'The Warm Oven',
    npcEmoji: '🍪',
    greeting: "The coffee cake is baking and the kitchen smells amazing!",
    puzzle: {
      type: 'unscramble',
      prompt: "The process of heating green coffee beans to develop their flavor:",
      scrambled: "GNTASRIO",
      answer: "ROASTING",
      hint: "Light, medium, or dark describes this process level!"
    },
    funFact: "Coffee beans start out green and are transformed through roasting! Light roasts retain more caffeine and origin flavors, while dark roasts have bolder, smokier tastes with slightly less caffeine. The 'first crack' sound during roasting indicates light roast level.",
    success: "Roasted to perfection! Check the Cake Safe next!"
  }
};

// Text messages for each character's journey
const TEXT_MESSAGES = {
  josie: {
    start: [
      { from: 'josephine', text: "Josie honey, start with the jukebox! Find some cozy coffeehouse music!" }
    ],
    jukebox: [
      { from: 'laurel', text: "Jazz AND bossa nova? Perfect coffee vibes, Josie! 🎵☕" }
    ],
    cake_safe: [
      { from: 'sarah', text: "Save me a slice of tiramisu!" }
    ],
    finish: [
      { from: 'laurel', text: "Josie! The music is perfect! Ready for Coffee trivia!" }
    ]
  },
  jennie_isaac: {
    start: [
      { from: 'taylor', text: "Jennie! Welcome everyone with the wonderful smell of fresh coffee! Isaac can wear his little coffee bean bandana!" }
    ],
    cafe_door: [
      { from: 'sarah', text: "Everyone loves the warm welcome! The cafe smells amazing! 🐕☕" }
    ],
    corner_booth: [
      { from: 'laurel', text: "The Lindsays will love sharing their coffee plantation stories there!" }
    ],
    finish: [
      { from: 'laurel', text: "Jennie and Isaac! Best coffee welcome ever! Come join us!" }
    ]
  },
  taylor: {
    start: [
      { from: 'sarah', text: "Taylor, can you review the coffee trivia questions? Some are really interesting!" }
    ],
    laurels_office: [
      { from: 'laurel', text: "Great work, Taylor! The Ethiopia question is fascinating!" }
    ],
    breakfast_counter: [
      { from: 'hank', text: "Taylor! Did you know pour over was invented in 1908?" }
    ],
    finish: [
      { from: 'laurel', text: "Taylor! The trivia is perfectly brewed! You're a star!" }
    ]
  },
  josephine: {
    start: [
      { from: 'josie', text: "Mom! Is the coffee cake almost ready?" }
    ],
    kitchen_oven: [
      { from: 'laurel', text: "Josephine, that smells INCREDIBLE! Cinnamon streusel?" }
    ],
    cake_safe: [
      { from: 'sarah', text: "The tiramisu looks perfect next to your coffee cake!" }
    ],
    finish: [
      { from: 'laurel', text: "Josephine! These treats are amazing! Perfect with coffee! ☕" }
    ]
  },
  sarah: {
    start: [
      { from: 'taylor', text: "Sarah, can you work the espresso machine? You pull the best shots!" }
    ],
    coffee_bar: [
      { from: 'hank', text: "Is that a perfect crema I see? Beautiful work, Sarah! ☕" }
    ],
    front_table: [
      { from: 'laurel', text: "Front table looks cozy with the coffee menu display!" }
    ],
    finish: [
      { from: 'laurel', text: "Sarah! That espresso is perfection! Ready for trivia!" }
    ]
  },
  mr_mrs_lindsay: {
    start: [
      { from: 'sarah', text: "Mr. and Mrs. Lindsay! We'd love to hear about your trip to the coffee farms!" }
    ],
    corner_booth: [
      { from: 'laurel', text: "Your corner booth has the best view of the coffee bar! ☕" }
    ],
    coffee_bar: [
      { from: 'hank', text: "Mr. Lindsay, what was your favorite coffee region in Colombia?" }
    ],
    finish: [
      { from: 'laurel', text: "Mr. and Mrs. Lindsay! Your Colombia stories are wonderful! Welcome!" }
    ]
  },
  hank: {
    start: [
      { from: 'mr_mrs_lindsay', text: "Hank! Can you set up the brewing stations? You know your equipment!" }
    ],
    breakfast_counter: [
      { from: 'taylor', text: "Hank, the pour-over station looks professional!" }
    ],
    front_table: [
      { from: 'laurel', text: "Perfect spot, Hank! You can see the trivia board AND the coffee bar!" }
    ],
    finish: [
      { from: 'laurel', text: "Hank! The coffee bar is perfectly set up! Ready for trivia?" }
    ]
  }
};

// Main Game Component
const AdventuresInCoffee = () => {
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
      localStorage.setItem('coffeeAdventureProgress', JSON.stringify(progress));
    } catch (e) {
      console.error('Could not save progress', e);
    }
  }, [completedChapters, currentChapter, playerPosition, visitedLandmarks, screen]);
  
  const loadProgress = useCallback(() => {
    if (typeof window === 'undefined') return null;
    
    try {
      const saved = localStorage.getItem('coffeeAdventureProgress');
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
      localStorage.removeItem('coffeeAdventureProgress');
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
    const answer = puzzleInput.toUpperCase().trim().replace(/\s+/g, ' ');
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
    
    const shareText = `☕ Adventures in Coffee
Letter Griddle Cafe

Chapter ${chapterNum}: ${character.name} is ready!
"${character.textToLaurel}"
${completedChapters.length}/${chapters.length} crew ready for trivia

Play at lettergriddle.com/adventures-in-coffee
More games at lettergriddle.com`;

    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };
  
  // Share final completion
  const handleShareFinal = () => {
    const shareText = `☕ Adventures in Coffee
Letter Griddle Cafe

🫘 COFFEE TRIVIA NIGHT IS READY! 🫘
All 7 crew members are at the Trivia Station!
The Letter Griddle Cafe is brewing up fun!

Play at lettergriddle.com/adventures-in-coffee
More games at lettergriddle.com`;

    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };
  
  const allChaptersComplete = completedChapters.length >= chapters.length;
  const confettiEmojis = ['☕', '🫘', '🍰', '✨', '🥞', '🤎', '💛'];
  
  // ============================================
  // WELCOME SCREEN
  // ============================================
  if (screen === 'welcome') {
    return (
      <div 
        className="min-h-screen p-4 relative overflow-hidden"
        style={{
  background: 'linear-gradient(180deg, #FEF3E2 0%, #D97706 35%, #92400E 65%, #451A03 100%)'
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
              {['☕', '🫘', '🍰', '✨'][i % 4]}
            </div>
          ))}
        </div>
        
        <div className="max-w-lg mx-auto pt-8 relative z-10">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">☕</div>
            <h1 className="text-4xl md:text-5xl font-bold text-amber mb-2 drop-shadow-lg" style={{fontFamily: 'Georgia, serif'}}>
              Adventures in Coffee
            </h1>
            <p className="text-xl text-white-100 mb-2" style={{fontFamily: 'Georgia, serif'}}>
              at the Letter Griddle Cafe
            </p>
            <p className="text-amber-200/90 text-sm">Coffee Trivia Night in Griddle Falls!</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 border-2 border-amber-300/50 mb-6">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-4 mb-6 border border-amber-200">
              <p className="text-amber-900 text-center leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
                It's <strong>Coffee Trivia Night</strong> at the Letter Griddle Cafe! ☕
                <br /><br />
                Help the Trivia Crew set up the espresso bar, bake coffee cake, and learn about beans from around the world!
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
                  <p className="text-amber-800 text-sm">Visit cafe spots and solve coffee word puzzles</p>
                </div>
                <div className="flex items-center gap-3 bg-amber-50 rounded-xl p-3">
                  <span className="text-2xl">🫘</span>
                  <p className="text-amber-800 text-sm">Learn fun facts about coffee!</p>
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
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-4 rounded-2xl font-bold text-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
              style={{fontFamily: 'Georgia, serif'}}
            >
              ☕ Start Adventure!
            </button>
          </div>
          
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
  background: 'linear-gradient(180deg, #FEF3E2 0%, #D97706 35%, #92400E 65%, #451A03 100%)'
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
              {['☕', '🫘'][i % 2]}
            </div>
          ))}
        </div>
        
        <div className="max-w-lg mx-auto pt-6 relative z-10">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-amber mb-1" style={{fontFamily: 'Georgia, serif'}}>
              ☕ Adventures in Coffee ☕
            </h1>
            <p className="text-brown-100 text-sm">Choose who to guide to the Trivia Station!</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 mb-4 border border-amber-200/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-amber-800 font-medium" style={{fontFamily: 'Georgia, serif'}}>Progress</span>
              <span className="text-amber-600 text-sm">{completedChapters.length} / {chapters.length} ready</span>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedChapters.length / chapters.length) * 100}%` }}
              />
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-amber-700 text-xs" style={{fontFamily: 'Georgia, serif'}}>
                ☕️ Your progress saves automatically! 🫘{' '}
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
                      ? 'bg-orange-100/90 border-2 border-orange-400'
                      : isLocked
                        ? 'bg-gray-200/60 border-2 border-gray-300 opacity-60'
                        : 'bg-white/90 border-2 border-amber-300 hover:border-amber-500 hover:scale-102 active:scale-98'
                  }`}
                >
                  <div className="relative">
                    <CharacterAvatar character={chapter.character} size="lg" />
                    {isComplete && (
                      <div className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
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
                      <div className="text-xs text-orange-600 mt-1">✨ Ready for Coffee trivia!</div>
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
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-4 rounded-2xl font-bold text-xl shadow-lg transition-all transform hover:scale-105 mb-4"
              style={{fontFamily: 'Georgia, serif'}}
            >
              🫘 Everyone's Ready! Start Coffee Trivia!
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
              <a href="/privacy" className="text-white/70 hover:text-white underline">Privacy</a>
              <span className="text-white/40">|</span>
              <a href="/terms" className="text-white/70 hover:text-white underline">Terms</a>
            </div>
          </div>
        </div>
        
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 max-w-sm w-full shadow-2xl border-2 border-amber-300">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">☕</div>
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
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
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
  background: 'linear-gradient(180deg, #FEF3E2 0%, #D97706 35%, #92400E 65%, #451A03 100%)'
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
              <h2 className="text-lg md:text-xl font-bold text-white" style={{fontFamily: 'Georgia, serif'}}>
                Guide {character.name}
              </h2>
              <p className="text-amber-100 text-xs">to Trivia Station ☕</p>
            </div>
            <button
              onClick={() => setShowMessages(true)}
              className="bg-white/60 backdrop-blur-sm text-amber-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white/80 transition-all relative"
            >
              💬
              {messages.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
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
          
          {/* Cafe Map - Coffee themed */}
          <div className="bg-gradient-to-br from-amber-800 to-amber-900 p-2 rounded-2xl shadow-2xl mb-3">
            <div className="text-center text-amber-200 text-xs mb-1" style={{fontFamily: 'Georgia, serif'}}>
              ☕ The Letter Griddle Cafe - Coffee Night ☕
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
                        ${isAdjacentTile && isWalkable && !isPlayer ? 'ring-2 ring-orange-400/50 hover:ring-orange-400' : ''}
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
              <span>☕ Trivia/Coffee</span>
              <span>🍳 Counter</span>
              <span>🎵 Jukebox</span>
              <span>🍪 Oven</span>
              <span>🍰 Treats</span>
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
                  ☕ Hint: {currentPuzzle.puzzle.hint}
                </p>
              </div>
              
              <button
                onClick={handlePuzzleSubmit}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
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
                <div className="text-5xl mb-2">🫘</div>
                <div className="font-bold text-amber-800 text-xl" style={{fontFamily: 'Georgia, serif'}}>Coffee Fact!</div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 mb-4 border border-amber-200">
                <p className="text-amber-800 text-center leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
                  {currentFunFact}
                </p>
              </div>
              
              <div className="bg-orange-100 rounded-xl p-3 mb-4">
                <p className="text-orange-800 text-center text-sm" style={{fontFamily: 'Georgia, serif'}}>
                  ✨ {currentPuzzle?.success}
                </p>
              </div>
              
              <button
                onClick={closeFunFact}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
                style={{fontFamily: 'Georgia, serif'}}
              >
                Continue! ☕
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
  background: 'linear-gradient(180deg, #FEF3E2 0%, #D97706 35%, #92400E 65%, #451A03 100%)'
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
              {['🎉', '✨', '☕', '🫘', '🤎'][i % 5]}
            </div>
          ))}
        </div>
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-amber-300 text-center">
            <div className="mb-4">
              <CharacterAvatar character={character} size="xl" />
            </div>
            
            <div className="text-5xl mb-4">☕</div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-amber-800 mb-2" style={{fontFamily: 'Georgia, serif'}}>
              {character.name} is Ready!
            </h2>
            
            <p className="text-amber-700 mb-4" style={{fontFamily: 'Georgia, serif'}}>
              Task complete! Ready for Coffee Trivia Night! 🫘
            </p>
            
            <div className="bg-amber-100 rounded-xl p-4 mb-4 flex items-center gap-3">
              <CharacterAvatar character={CHARACTERS.laurel} size="md" />
              <div className="text-left">
                <div className="font-bold text-amber-800 text-sm">Laurel</div>
                <div className="text-amber-700 text-sm italic">
                  "Wonderful, {character.name}! Grab a fresh cup! Trivia starts soon!" ☕✨
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-3 mb-4">
              <div className="text-sm text-amber-700 mb-1">Crew Ready</div>
              <div className="font-bold text-amber-800 text-lg">
                {completedChapters.length} / {chapters.length} at the Trivia Station
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 mb-4 border border-amber-200">
              <p className="text-xs text-amber-600 mb-2">Share your progress:</p>
              <div className="text-left text-sm text-amber-800 font-mono whitespace-pre-line bg-white/50 rounded-lg p-3">
{`☕ Adventures in Coffee
Letter Griddle Cafe

Chapter ${chapterNum}: ${character.name} is ready!
${completedChapters.length}/${chapters.length} crew ready for trivia

Play at lettergriddle.com/adventures-in-coffee`}
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
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
                style={{fontFamily: 'Georgia, serif'}}
              >
                {completedChapters.length < chapters.length ? '☕ Help Next Crew Member!' : '🫘 Start Coffee Trivia!'}
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
  background: 'linear-gradient(180deg, #FEF3E2 0%, #D97706 35%, #92400E 65%, #451A03 100%)'
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
              {['🎉', '✨', '☕', '🫘', '🍰', '🤎', '💛'][i % 7]}
            </div>
          ))}
        </div>
        
        <div className="max-w-lg mx-auto pt-6 relative z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-amber-300 text-center">
            <div className="text-6xl mb-4">☕</div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-2" style={{fontFamily: 'Georgia, serif'}}>
              Coffee Trivia Night!
            </h1>
            
            <p className="text-amber-700 mb-6" style={{fontFamily: 'Georgia, serif'}}>
              The whole Trivia Crew is here!
            </p>
            
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-4 mb-6">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {Object.values(CHARACTERS).filter(c => c.id).map(char => (
                  <CharacterAvatar key={char.id} character={char} size="md" />
                ))}
              </div>
              <p className="text-amber-800 font-medium" style={{fontFamily: 'Georgia, serif'}}>
                Ready for some coffee trivia! 🫘
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
                "Welcome to Coffee Trivia Night at the Letter Griddle Cafe! We've got fresh espresso, tiramisu, and questions about beans from around the world. First question... but first, who needs a refill?" ☕🥞
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 mb-4 border border-amber-200">
              <p className="text-xs text-amber-600 mb-2">Share your achievement:</p>
              <div className="text-left text-sm text-amber-800 font-mono whitespace-pre-line bg-white/50 rounded-lg p-3">
{`☕ Adventures in Coffee
Letter Griddle Cafe

🫘 COFFEE TRIVIA NIGHT IS READY! 🫘
All 7 crew members are here!
The cafe is brewing up fun!

Play at lettergriddle.com/adventures-in-coffee`}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-amber-100 rounded-xl p-3">
                <div className="text-2xl font-bold text-amber-800">{chapters.length}</div>
                <div className="text-xs text-amber-600">Crew Ready</div>
              </div>
              <div className="bg-amber-100 rounded-xl p-3">
                <div className="text-2xl font-bold text-amber-800">☕</div>
                <div className="text-xs text-amber-600">Freshly Brewed!</div>
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
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
                style={{fontFamily: 'Georgia, serif'}}
              >
                ☕ Play Again!
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
            <p className="text-white/80" style={{fontFamily: 'Georgia, serif'}}>
              Thank you for enjoying coffee with us! ☕
            </p>
            <p className="text-white/60 text-xs mt-2">© 2026 Letter Griddle Cafe</p>
          </div>
        </div>
        
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 max-w-sm w-full shadow-2xl border-2 border-amber-300">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">☕</div>
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
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
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

export default AdventuresInCoffee;
