"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Shuffle, Play, Clock, Trophy, Home, RotateCcw, Share2, X, Flame, ArrowLeft, Copy } from 'lucide-react';

const CELEBRATION_MESSAGES = [
  "🎉 Sizzling!", "🔥 On Fire!", "⭐ Brilliant!", "💫 Amazing!",
  "🌟 Spectacular!", "✨ Dazzling!", "🎯 Perfect!", "💪 Unstoppable!",
  "🏆 Champion!", "👏 Fantastic!", "🥇 Gold Star!", "⚡ Lightning Fast!"
];

const THEMES = {
  breakfast: {
    name: "Breakfast",
    icon: "🍳",
    bgGradient: "from-amber-50 via-yellow-50 to-orange-50",
    confettiEmojis: ["🥞", "🧇", "🥓", "🍳", "☕", "🧈", "🍯", "🥚"],
    words: {
      "EGGS": { emoji: "🥚", hint: "Scrambled, fried, or poached" },
      "BACON": { emoji: "🥓", hint: "Crispy strips of pork" },
      "TOAST": { emoji: "🍞", hint: "Browned bread slices" },
      "JAM": { emoji: "🍇", hint: "Fruity spread for bread" },
      "WAFFLE": { emoji: "🧇", hint: "Grid-patterned breakfast treat" },
      "SYRUP": { emoji: "🍯", hint: "Sweet maple topping" },
      "MILK": { emoji: "🥛", hint: "White dairy drink" },
      "CUP": { emoji: "☕", hint: "Holds your morning coffee" },
      "COFFEE": { emoji: "☕", hint: "Caffeinated morning brew" },
      "CREAM": { emoji: "🥛", hint: "Makes coffee lighter" },
      "SUGAR": { emoji: "🧂", hint: "Sweet granules" },
      "MUG": { emoji: "☕", hint: "Big cup with a handle" },
      "HAM": { emoji: "🍖", hint: "Pink breakfast meat" },
      "CHEESE": { emoji: "🧀", hint: "Melty dairy delight" },
      "BREAD": { emoji: "🍞", hint: "Sliced loaf staple" },
      "BITE": { emoji: "😋", hint: "A small mouthful" },
      "JUICE": { emoji: "🧃", hint: "Squeezed fruit drink" },
      "FRUIT": { emoji: "🍎", hint: "Healthy sweet snack" },
      "BOWL": { emoji: "🥣", hint: "Holds your cereal" },
      "SPOON": { emoji: "🥄", hint: "Scoops up your oatmeal" },
      "BAGEL": { emoji: "🥯", hint: "Round bread with a hole" },
      "BUTTER": { emoji: "🧈", hint: "Creamy yellow spread" },
      "HONEY": { emoji: "🍯", hint: "Golden bee nectar" },
      "TEA": { emoji: "🍵", hint: "Steeped leaf drink" },
      "PANCAKE": { emoji: "🥞", hint: "Flat, round, and stackable" },
      "OAT": { emoji: "🌾", hint: "Healthy grain for porridge" },
      "BERRY": { emoji: "🍓", hint: "Small sweet fruit" },
      "PLATE": { emoji: "🍽️", hint: "Holds your meal" }
    },
    puzzles: [
      { words: ["EGGS", "BACON", "TOAST", "JAM"] },
      { words: ["WAFFLE", "SYRUP", "MILK", "CUP"] },
      { words: ["COFFEE", "CREAM", "SUGAR", "MUG"] },
      { words: ["HAM", "CHEESE", "BREAD", "BITE"] },
      { words: ["JUICE", "FRUIT", "BOWL", "SPOON"] },
      { words: ["BAGEL", "BUTTER", "HONEY", "TEA"] },
      { words: ["PANCAKE", "OAT", "BERRY", "PLATE"] },
    ]
  },
  garden: {
    name: "Garden",
    icon: "🌷",
    bgGradient: "from-green-50 via-lime-50 to-emerald-50",
    confettiEmojis: ["🌷", "🌻", "🌹", "🪻", "🌺", "💐", "🪴", "🌼"],
    words: {
      "ROSE": { emoji: "🌹", hint: "Red flower of love" },
      "THORN": { emoji: "🌹", hint: "Sharp point on stem" },
      "PETAL": { emoji: "🌸", hint: "Soft flower part" },
      "BLOOM": { emoji: "🌺", hint: "When flowers open" },
      "TULIP": { emoji: "🌷", hint: "Cup-shaped spring flower" },
      "BULB": { emoji: "🧅", hint: "Underground flower starter" },
      "STEM": { emoji: "🌱", hint: "Supports the flower" },
      "LEAF": { emoji: "🍃", hint: "Green and grows on plants" },
      "SOIL": { emoji: "🪴", hint: "Dirt for planting" },
      "SEED": { emoji: "🌰", hint: "Plant beginning" },
      "GROW": { emoji: "🌱", hint: "Get bigger" },
      "ROOT": { emoji: "🌿", hint: "Underground plant part" },
      "WATER": { emoji: "💧", hint: "Plants need this to live" },
      "HOSE": { emoji: "🚿", hint: "Garden watering tool" },
      "RAIN": { emoji: "🌧️", hint: "Water from the sky" },
      "DROP": { emoji: "💧", hint: "Single bit of water" },
      "WEED": { emoji: "🌿", hint: "Unwanted garden plant" },
      "PULL": { emoji: "✊", hint: "Remove weeds this way" },
      "DIG": { emoji: "⛏️", hint: "Make a hole in soil" },
      "HOE": { emoji: "🧑‍🌾", hint: "Garden digging tool" },
      "BEE": { emoji: "🐝", hint: "Buzzing pollinator" },
      "BUZZ": { emoji: "🐝", hint: "Sound a bee makes" },
      "HONEY": { emoji: "🍯", hint: "Sweet bee product" },
      "HIVE": { emoji: "🐝", hint: "Bee home" },
      "FENCE": { emoji: "🏡", hint: "Garden boundary" },
      "GATE": { emoji: "🚪", hint: "Garden entrance" },
      "PATH": { emoji: "🛤️", hint: "Walkway through garden" },
      "BENCH": { emoji: "🪑", hint: "Sit and enjoy flowers" },
      "SUN": { emoji: "☀️", hint: "Plants need this light" },
      "SHADE": { emoji: "🌳", hint: "Cool dark area" },
      "POT": { emoji: "🪴", hint: "Container for plants" },
      "HERB": { emoji: "🌿", hint: "Basil, mint, or thyme" }
    },
    puzzles: [
      { words: ["ROSE", "THORN", "PETAL", "BLOOM"] },
      { words: ["TULIP", "BULB", "STEM", "LEAF"] },
      { words: ["SOIL", "SEED", "GROW", "ROOT"] },
      { words: ["WATER", "HOSE", "RAIN", "DROP"] },
      { words: ["WEED", "PULL", "DIG", "HOE"] },
      { words: ["BEE", "BUZZ", "HONEY", "HIVE"] },
      { words: ["FENCE", "GATE", "PATH", "BENCH"] },
      { words: ["SUN", "SHADE", "POT", "HERB"] },
    ]
  },
  games: {
    name: "Games",
    icon: "🎲",
    bgGradient: "from-purple-100 via-indigo-50 to-blue-100",
    confettiEmojis: ["🎲", "🎮", "🃏", "♟️", "🎯", "🎰", "🏆", "⭐"],
    words: {
      "DICE": { emoji: "🎲", hint: "Roll these numbered cubes" },
      "ROLL": { emoji: "🎲", hint: "Toss the dice" },
      "LUCK": { emoji: "🍀", hint: "Good fortune" },
      "WIN": { emoji: "🏆", hint: "Come in first place" },
      "CARD": { emoji: "🃏", hint: "Part of a deck" },
      "DECK": { emoji: "🎴", hint: "52 of these" },
      "DEAL": { emoji: "🃏", hint: "Hand out cards" },
      "SHUFFLE": { emoji: "🔀", hint: "Mix up the cards" },
      "CHESS": { emoji: "♟️", hint: "Strategy game with kings" },
      "KING": { emoji: "👑", hint: "Most important chess piece" },
      "PAWN": { emoji: "♟️", hint: "Smallest chess piece" },
      "MOVE": { emoji: "➡️", hint: "Change position" },
      "BOARD": { emoji: "🎯", hint: "Game surface" },
      "TOKEN": { emoji: "🔘", hint: "Game piece to move" },
      "SPACE": { emoji: "⬜", hint: "Square on a board" },
      "START": { emoji: "▶️", hint: "Beginning spot" },
      "SCORE": { emoji: "💯", hint: "Points earned" },
      "POINT": { emoji: "☝️", hint: "One unit of score" },
      "HIGH": { emoji: "📈", hint: "Top score" },
      "BEAT": { emoji: "💪", hint: "Defeat opponent" },
      "TEAM": { emoji: "👥", hint: "Group playing together" },
      "PLAY": { emoji: "▶️", hint: "Participate in game" },
      "TURN": { emoji: "🔄", hint: "Your chance to go" },
      "PASS": { emoji: "⏭️", hint: "Skip your turn" },
      "RULE": { emoji: "📋", hint: "How to play" },
      "FAIR": { emoji: "⚖️", hint: "Following the rules" },
      "FUN": { emoji: "😄", hint: "Enjoyable feeling" },
      "JOY": { emoji: "🎉", hint: "Happy feeling" },
      "PRIZE": { emoji: "🎁", hint: "Winner's reward" },
      "CHAMP": { emoji: "🏆", hint: "The winner" },
      "LOSS": { emoji: "😢", hint: "Not winning" },
      "TIE": { emoji: "🤝", hint: "Equal score" }
    },
    puzzles: [
      { words: ["DICE", "ROLL", "LUCK", "WIN"] },
      { words: ["CARD", "DECK", "DEAL", "SHUFFLE"] },
      { words: ["CHESS", "KING", "PAWN", "MOVE"] },
      { words: ["BOARD", "TOKEN", "SPACE", "START"] },
      { words: ["SCORE", "POINT", "HIGH", "BEAT"] },
      { words: ["TEAM", "PLAY", "TURN", "PASS"] },
      { words: ["RULE", "FAIR", "FUN", "JOY"] },
      { words: ["PRIZE", "CHAMP", "LOSS", "TIE"] },
    ]
  },
  nature: {
    name: "Nature",
    icon: "🌿",
    bgGradient: "from-green-100 via-emerald-50 to-teal-100",
    confettiEmojis: ["🌿", "🍃", "🌲", "🏔️", "🦋", "🌸", "🍀", "🌈"],
    words: {
      "TREE": { emoji: "🌲", hint: "Tall plant with trunk and branches" },
      "BARK": { emoji: "🌳", hint: "Rough outer covering of tree" },
      "BRANCH": { emoji: "🌿", hint: "Arm of a tree" },
      "TRUNK": { emoji: "🪵", hint: "Main stem of a tree" },
      "RIVER": { emoji: "🏞️", hint: "Flowing body of water" },
      "STREAM": { emoji: "💧", hint: "Small narrow river" },
      "FISH": { emoji: "🐟", hint: "Swims in the water" },
      "ROCK": { emoji: "🪨", hint: "Hard natural stone" },
      "HILL": { emoji: "⛰️", hint: "Small raised land" },
      "PEAK": { emoji: "🏔️", hint: "Top of a mountain" },
      "TRAIL": { emoji: "🥾", hint: "Path through woods" },
      "HIKE": { emoji: "🚶", hint: "Long walk in nature" },
      "BIRD": { emoji: "🐦", hint: "Feathered flyer" },
      "NEST": { emoji: "🪹", hint: "Bird's home" },
      "WING": { emoji: "🪽", hint: "Used for flying" },
      "SONG": { emoji: "🎵", hint: "Bird's melody" },
      "FERN": { emoji: "🌿", hint: "Feathery green plant" },
      "MOSS": { emoji: "🟢", hint: "Soft green ground cover" },
      "POND": { emoji: "🐸", hint: "Small body of still water" },
      "FROG": { emoji: "🐸", hint: "Ribbiting amphibian" },
      "LEAF": { emoji: "🍃", hint: "Green and grows on plants" },
      "WIND": { emoji: "💨", hint: "Moving air" },
      "CLOUD": { emoji: "☁️", hint: "White fluffy sky formation" },
      "SKY": { emoji: "🌤️", hint: "Above us, often blue" }
    },
    puzzles: [
      { words: ["TREE", "BARK", "BRANCH", "TRUNK"] },
      { words: ["RIVER", "STREAM", "FISH", "ROCK"] },
      { words: ["HILL", "PEAK", "TRAIL", "HIKE"] },
      { words: ["BIRD", "NEST", "WING", "SONG"] },
      { words: ["FERN", "MOSS", "POND", "FROG"] },
      { words: ["LEAF", "WIND", "CLOUD", "SKY"] },
      { words: ["TREE", "BIRD", "FROG", "FISH"] },
    ]
  },
  animals: {
    name: "Animals",
    icon: "🦁",
    bgGradient: "from-orange-100 via-amber-50 to-yellow-100",
    confettiEmojis: ["🦁", "🐘", "🦒", "🐵", "🦜", "🦋", "🐢", "🐬"],
    words: {
      "LION": { emoji: "🦁", hint: "King of the jungle" },
      "MANE": { emoji: "🦁", hint: "Fluffy neck fur" },
      "ROAR": { emoji: "🗣️", hint: "Loud lion sound" },
      "PAWS": { emoji: "🐾", hint: "Animal feet" },
      "BIRD": { emoji: "🐦", hint: "Feathered flyer" },
      "WING": { emoji: "🪽", hint: "Used for flying" },
      "NEST": { emoji: "🪹", hint: "Bird home" },
      "BEAK": { emoji: "🐦", hint: "Bird mouth" },
      "FISH": { emoji: "🐟", hint: "Swims in water" },
      "FIN": { emoji: "🦈", hint: "Helps fish swim" },
      "SWIM": { emoji: "🏊", hint: "Move through water" },
      "TANK": { emoji: "🐠", hint: "Fish home" },
      "BEAR": { emoji: "🐻", hint: "Large furry mammal" },
      "FUR": { emoji: "🧸", hint: "Soft animal coat" },
      "CLAW": { emoji: "🐾", hint: "Sharp nail" },
      "DEN": { emoji: "🕳️", hint: "Bear's home" },
      "DOG": { emoji: "🐕", hint: "Man's best friend" },
      "BARK": { emoji: "🐕", hint: "Dog sound" },
      "TAIL": { emoji: "🐕", hint: "Wags when happy" },
      "BONE": { emoji: "🦴", hint: "Dog's favorite treat" },
      "CAT": { emoji: "🐱", hint: "Purring pet" },
      "MEOW": { emoji: "🐱", hint: "Cat sound" },
      "PURR": { emoji: "🐱", hint: "Happy cat sound" },
      "YARN": { emoji: "🧶", hint: "Cat loves to play with this" }
    },
    puzzles: [
      { words: ["LION", "MANE", "ROAR", "PAWS"] },
      { words: ["BIRD", "WING", "NEST", "BEAK"] },
      { words: ["FISH", "FIN", "SWIM", "TANK"] },
      { words: ["BEAR", "FUR", "CLAW", "DEN"] },
      { words: ["DOG", "BARK", "TAIL", "BONE"] },
      { words: ["CAT", "MEOW", "PURR", "YARN"] },
      { words: ["LION", "BEAR", "DOG", "CAT"] },
      { words: ["PAWS", "FUR", "TAIL", "CLAW"] },
    ]
  },
  starry: {
    name: "Starry Sky",
    icon: "🌙",
    bgGradient: "from-indigo-200 via-purple-200 to-slate-300",
    confettiEmojis: ["⭐", "🌙", "✨", "🌟", "💫", "🪐", "🌠", "☄️"],
    words: {
      "STAR": { emoji: "⭐", hint: "Twinkling light in the sky" },
      "GLOW": { emoji: "✨", hint: "Soft shining light" },
      "SHINE": { emoji: "🌟", hint: "Give off bright light" },
      "BRIGHT": { emoji: "💡", hint: "Full of light" },
      "MOON": { emoji: "🌙", hint: "Earth's glowing neighbor" },
      "PHASE": { emoji: "🌓", hint: "Moon's changing shape" },
      "FULL": { emoji: "🌕", hint: "Complete circle moon" },
      "NEW": { emoji: "🌑", hint: "Dark moon phase" },
      "NIGHT": { emoji: "🌃", hint: "Dark time after sunset" },
      "DARK": { emoji: "🌑", hint: "Without light" },
      "SKY": { emoji: "🌌", hint: "Space above us" },
      "VAST": { emoji: "🌠", hint: "Extremely large" },
      "PLANET": { emoji: "🪐", hint: "World orbiting a star" },
      "ORBIT": { emoji: "🔄", hint: "Path around a star" },
      "RING": { emoji: "💍", hint: "Saturn has these" },
      "SPACE": { emoji: "🚀", hint: "The final frontier" },
      "COMET": { emoji: "☄️", hint: "Icy space traveler with tail" },
      "TAIL": { emoji: "💨", hint: "Comet's trailing glow" },
      "WISH": { emoji: "🙏", hint: "Hope on a shooting star" },
      "DREAM": { emoji: "💭", hint: "Nighttime imagination" }
    },
    puzzles: [
      { words: ["STAR", "GLOW", "SHINE", "BRIGHT"] },
      { words: ["MOON", "PHASE", "FULL", "NEW"] },
      { words: ["NIGHT", "DARK", "SKY", "VAST"] },
      { words: ["PLANET", "ORBIT", "RING", "SPACE"] },
      { words: ["COMET", "TAIL", "WISH", "DREAM"] },
      { words: ["STAR", "MOON", "NIGHT", "DREAM"] },
    ]
  },
  treats: {
    name: "Treats",
    icon: "🍬",
    bgGradient: "from-pink-50 via-rose-50 to-red-50",
    confettiEmojis: ["🍪", "🍩", "🧁", "🍰", "🍬", "🍭", "🎂", "🍫"],
    words: {
      "CAKE": { emoji: "🎂", hint: "Birthday dessert with candles" },
      "CANDY": { emoji: "🍬", hint: "Wrapped sweet treat" },
      "SWEET": { emoji: "🍭", hint: "Sugary taste" },
      "ICING": { emoji: "🧁", hint: "Frosting on top" },
      "COOKIE": { emoji: "🍪", hint: "Baked with chocolate chips" },
      "CREAM": { emoji: "🍦", hint: "Frozen dairy dessert" },
      "SUGAR": { emoji: "🍡", hint: "Makes things sweet" },
      "BITE": { emoji: "😋", hint: "Small taste" },
      "DONUT": { emoji: "🍩", hint: "Ring-shaped fried dough" },
      "GLAZE": { emoji: "✨", hint: "Shiny sweet coating" },
      "FROST": { emoji: "❄️", hint: "Sweet topping spread" },
      "ROLL": { emoji: "🥐", hint: "Cinnamon spiral" },
      "MINT": { emoji: "🌿", hint: "Cool refreshing flavor" },
      "CHEW": { emoji: "😋", hint: "Gummy texture" },
      "TREAT": { emoji: "🎁", hint: "Special snack reward" },
      "YUM": { emoji: "😋", hint: "Delicious expression" },
      "PIE": { emoji: "🥧", hint: "Fruit-filled pastry" },
      "FUDGE": { emoji: "🍫", hint: "Rich chocolate square" },
      "TART": { emoji: "🥧", hint: "Small fruit pastry" },
      "SCOOP": { emoji: "🍨", hint: "Ball of ice cream" }
    },
    puzzles: [
      { words: ["CAKE", "CANDY", "SWEET", "ICING"] },
      { words: ["COOKIE", "CREAM", "SUGAR", "BITE"] },
      { words: ["DONUT", "GLAZE", "FROST", "ROLL"] },
      { words: ["MINT", "CHEW", "TREAT", "YUM"] },
      { words: ["PIE", "FUDGE", "TART", "SCOOP"] },
      { words: ["CAKE", "COOKIE", "DONUT", "PIE"] },
    ]
  },
  movies: {
    name: "Movies",
    icon: "🎬",
    bgGradient: "from-red-100 via-rose-50 to-pink-100",
    confettiEmojis: ["🎬", "🎥", "🍿", "🎞️", "⭐", "🏆", "🎭", "📽️"],
    words: {
      "FILM": { emoji: "🎞️", hint: "Another word for movie" },
      "REEL": { emoji: "🎥", hint: "Spool of film" },
      "SCENE": { emoji: "🎬", hint: "Part of a movie" },
      "TAKE": { emoji: "🎬", hint: "One filming attempt" },
      "STAR": { emoji: "⭐", hint: "Famous actor" },
      "ROLE": { emoji: "🎭", hint: "Character an actor plays" },
      "ACT": { emoji: "🎭", hint: "Perform in a movie" },
      "CAST": { emoji: "👥", hint: "All the actors" },
      "PLOT": { emoji: "📖", hint: "Story of the movie" },
      "HERO": { emoji: "🦸", hint: "Main good character" },
      "TWIST": { emoji: "🔄", hint: "Surprising plot turn" },
      "SHOW": { emoji: "🎪", hint: "The movie presentation" },
      "SCREEN": { emoji: "📺", hint: "Where movie is shown" },
      "SEAT": { emoji: "💺", hint: "Where you sit to watch" },
      "DARK": { emoji: "🌑", hint: "Theater lights go this way" },
      "SNACK": { emoji: "🍿", hint: "Popcorn is a movie one" },
      "TICKET": { emoji: "🎟️", hint: "Need this to enter" },
      "WATCH": { emoji: "👀", hint: "View the film" },
      "ENJOY": { emoji: "😊", hint: "Have a good time" },
      "FAN": { emoji: "🎉", hint: "Devoted movie lover" }
    },
    puzzles: [
      { words: ["FILM", "REEL", "SCENE", "TAKE"] },
      { words: ["STAR", "ROLE", "ACT", "CAST"] },
      { words: ["PLOT", "HERO", "TWIST", "SHOW"] },
      { words: ["SCREEN", "SEAT", "DARK", "SNACK"] },
      { words: ["TICKET", "WATCH", "ENJOY", "FAN"] },
      { words: ["FILM", "STAR", "PLOT", "WATCH"] },
    ]
  },
  vacations: {
    name: "Vacations",
    icon: "🏖️",
    bgGradient: "from-cyan-100 via-sky-100 to-blue-100",
    confettiEmojis: ["🏖️", "✈️", "🧳", "🗺️", "⛱️", "🚢", "🏝️", "🎡"],
    words: {
      "BEACH": { emoji: "🏖️", hint: "Sandy shore by the sea" },
      "SAND": { emoji: "🏝️", hint: "Tiny grains on shore" },
      "WAVE": { emoji: "🌊", hint: "Rolling ocean water" },
      "SUN": { emoji: "☀️", hint: "Warm vacation glow" },
      "TRIP": { emoji: "🧳", hint: "Journey away from home" },
      "PACK": { emoji: "🎒", hint: "Fill your suitcase" },
      "MAP": { emoji: "🗺️", hint: "Shows where to go" },
      "TOUR": { emoji: "🚌", hint: "Guided sightseeing" },
      "HOTEL": { emoji: "🏨", hint: "Place to stay overnight" },
      "POOL": { emoji: "🏊", hint: "Swim here" },
      "REST": { emoji: "😴", hint: "Relax and recharge" },
      "STAY": { emoji: "🛏️", hint: "Remain somewhere" },
      "HIKE": { emoji: "🥾", hint: "Walk through nature" },
      "CAMP": { emoji: "🏕️", hint: "Sleep outdoors" },
      "TENT": { emoji: "⛺", hint: "Portable shelter" },
      "TRAIL": { emoji: "🌲", hint: "Path through woods" },
      "FLY": { emoji: "✈️", hint: "Travel by plane" },
      "BOAT": { emoji: "⛵", hint: "Travel by water" },
      "ROAD": { emoji: "🛣️", hint: "Drive on this" },
      "FUN": { emoji: "🎉", hint: "Having a great time" }
    },
    puzzles: [
      { words: ["BEACH", "SAND", "WAVE", "SUN"] },
      { words: ["TRIP", "PACK", "MAP", "TOUR"] },
      { words: ["HOTEL", "POOL", "REST", "STAY"] },
      { words: ["HIKE", "CAMP", "TENT", "TRAIL"] },
      { words: ["FLY", "BOAT", "ROAD", "FUN"] },
      { words: ["BEACH", "TRIP", "HOTEL", "FUN"] },
    ]
  },
  vintage: {
    name: "Vintage",
    icon: "🪞",
    bgGradient: "from-amber-100 via-orange-50 to-yellow-100",
    confettiEmojis: ["🪞", "📻", "☎️", "🕰️", "📷", "🎩", "👒", "🗝️"],
    words: {
      "OLD": { emoji: "🕰️", hint: "From long ago" },
      "ANTIQUE": { emoji: "🏺", hint: "Valuable old item" },
      "RARE": { emoji: "💎", hint: "Hard to find" },
      "CLASSIC": { emoji: "⭐", hint: "Timeless quality" },
      "RECORD": { emoji: "📀", hint: "Vinyl music disc" },
      "RADIO": { emoji: "📻", hint: "Old-time music player" },
      "DIAL": { emoji: "🔘", hint: "Turn to tune in" },
      "TUNE": { emoji: "🎵", hint: "A melody" },
      "CLOCK": { emoji: "🕰️", hint: "Tells the time" },
      "TICK": { emoji: "⏰", hint: "Clock sound" },
      "CHIME": { emoji: "🔔", hint: "Clock's hourly ring" },
      "HAND": { emoji: "👆", hint: "Points to the hour" },
      "LACE": { emoji: "🎀", hint: "Delicate fabric trim" },
      "SILK": { emoji: "🧣", hint: "Smooth fancy fabric" },
      "PEARL": { emoji: "🦪", hint: "Round gem from oyster" },
      "CHARM": { emoji: "✨", hint: "Small decorative trinket" },
      "KEY": { emoji: "🗝️", hint: "Opens old locks" },
      "LOCK": { emoji: "🔒", hint: "Secures a chest" },
      "CHEST": { emoji: "📦", hint: "Old storage box" },
      "TRUNK": { emoji: "🧳", hint: "Large travel chest" }
    },
    puzzles: [
      { words: ["OLD", "ANTIQUE", "RARE", "CLASSIC"] },
      { words: ["RECORD", "RADIO", "DIAL", "TUNE"] },
      { words: ["CLOCK", "TICK", "CHIME", "HAND"] },
      { words: ["LACE", "SILK", "PEARL", "CHARM"] },
      { words: ["KEY", "LOCK", "CHEST", "TRUNK"] },
      { words: ["OLD", "CLOCK", "KEY", "CHARM"] },
    ]
  }
};

const GRID_SIZE = 5;
const STORAGE_KEY = 'griddleShakeStats';

const GriddleShake = () => {
  const [gamePhase, setGamePhase] = useState('menu');
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [countdownValue, setCountdownValue] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [grid, setGrid] = useState([]);
  const [currentWords, setCurrentWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [usedCells, setUsedCells] = useState(new Set());
  const [selectedCells, setSelectedCells] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [targetWord, setTargetWord] = useState(null);
  const [showHint, setShowHint] = useState(true);
  const [screensCleared, setScreensCleared] = useState(0);
  const [totalWordsFound, setTotalWordsFound] = useState(0);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [gameSession, setGameSession] = useState(0); // Forces puzzle refresh on replay
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [missedWords, setMissedWords] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
        gamesPlayed: 0, totalScreensCleared: 0, totalWordsFound: 0,
        bestScreens: 0, bestWords: 0, currentStreak: 0, bestStreak: 0, lastPlayedDate: null
      };
    } catch {
      return {
        gamesPlayed: 0, totalScreensCleared: 0, totalWordsFound: 0,
        bestScreens: 0, bestWords: 0, currentStreak: 0, bestStreak: 0, lastPlayedDate: null
      };
    }
  });

  const generateGrid = useCallback((words) => {
    let allLetters = words.join('').split('');
    const totalCells = GRID_SIZE * GRID_SIZE;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    while (allLetters.length < totalCells) {
      allLetters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }
    for (let i = allLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allLetters[i], allLetters[j]] = [allLetters[j], allLetters[i]];
    }
    const newGrid = [];
    let idx = 0;
    for (let i = 0; i < GRID_SIZE; i++) {
      const row = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        row.push(allLetters[idx++] || 'X');
      }
      newGrid.push(row);
    }
    return newGrid;
  }, []);

  const setupPuzzle = useCallback((overridePuzzleIndex = null) => {
    if (!selectedTheme) return;
    const theme = THEMES[selectedTheme];
    const indexToUse = overridePuzzleIndex !== null ? overridePuzzleIndex : puzzleIndex;
    const puzzle = theme.puzzles[indexToUse % theme.puzzles.length];
    const words = puzzle.words.map(w => w.toUpperCase());
    setCurrentWords(words);
    setFoundWords([]);
    setUsedCells(new Set());
    setSelectedCells([]);
    setCurrentWord('');
    setTargetWord(words[0]);
    setShowHint(true);
    setGrid(generateGrid(words));
  }, [selectedTheme, puzzleIndex, gameSession, generateGrid]);

  useEffect(() => {
    if (gamePhase !== 'countdown') return;
    if (countdownValue > 0) {
      const timer = setTimeout(() => setCountdownValue(prev => prev - 1), 800);
      return () => clearTimeout(timer);
    } else {
      // Calculate random starting puzzle
      let newPuzzleIndex = 0;
      if (selectedTheme) {
        const theme = THEMES[selectedTheme];
        newPuzzleIndex = Math.floor(Math.random() * theme.puzzles.length);
      }
      
      const timer = setTimeout(() => {
        const totalSeconds = selectedTime * 60;
        setTimeLeft(totalSeconds);
        setScreensCleared(0);
        setTotalWordsFound(0);
        setPuzzleIndex(newPuzzleIndex);
        setGameSession(prev => prev + 1);
        setMissedWords([]);
        
        // Setup the puzzle with the new index BEFORE changing game phase
        // This ensures the correct puzzle is loaded
        if (selectedTheme) {
          const theme = THEMES[selectedTheme];
          const puzzle = theme.puzzles[newPuzzleIndex % theme.puzzles.length];
          const words = puzzle.words.map(w => w.toUpperCase());
          setCurrentWords(words);
          setFoundWords([]);
          setUsedCells(new Set());
          setSelectedCells([]);
          setCurrentWord('');
          setTargetWord(words[0]);
          setShowHint(true);
          
          // Generate grid inline
          let allLetters = words.join('').split('');
          const totalCells = 25;
          const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          while (allLetters.length < totalCells) {
            allLetters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
          }
          for (let i = allLetters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allLetters[i], allLetters[j]] = [allLetters[j], allLetters[i]];
          }
          const newGrid = [];
          let idx = 0;
          for (let i = 0; i < 5; i++) {
            const row = [];
            for (let j = 0; j < 5; j++) {
              row.push(allLetters[idx++] || 'X');
            }
            newGrid.push(row);
          }
          setGrid(newGrid);
        }
        
        setGamePhase('playing');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gamePhase, countdownValue, selectedTime, selectedTheme]);

  useEffect(() => {
    if (gamePhase !== 'playing') return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const missed = currentWords.filter(w => !foundWords.includes(w));
      setMissedWords(missed);
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      setStats(prev => {
        const newStats = {
          gamesPlayed: prev.gamesPlayed + 1,
          totalScreensCleared: prev.totalScreensCleared + screensCleared,
          totalWordsFound: prev.totalWordsFound + totalWordsFound,
          bestScreens: Math.max(prev.bestScreens, screensCleared),
          bestWords: Math.max(prev.bestWords, totalWordsFound),
          currentStreak: prev.lastPlayedDate === yesterday || prev.lastPlayedDate === today ? prev.currentStreak + 1 : 1,
          bestStreak: Math.max(prev.bestStreak, prev.lastPlayedDate === yesterday ? prev.currentStreak + 1 : 1),
          lastPlayedDate: today
        };
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats)); } catch {}
        return newStats;
      });
      setGamePhase('gameover');
    }
  }, [gamePhase, timeLeft, currentWords, foundWords, screensCleared, totalWordsFound]);

  // This effect handles puzzle setup when advancing to next screen during gameplay
  // Initial setup is handled in the countdown effect
  const [initialSetupDone, setInitialSetupDone] = useState(false);
  
  useEffect(() => {
    if (gamePhase === 'playing' && initialSetupDone) {
      // Only call setupPuzzle for screen advances, not initial setup
      // Pass the current puzzleIndex directly to avoid stale closure
      setupPuzzle(puzzleIndex);
    } else if (gamePhase === 'playing' && !initialSetupDone) {
      setInitialSetupDone(true);
    } else if (gamePhase === 'countdown') {
      setInitialSetupDone(false);
    }
  }, [puzzleIndex, gamePhase, initialSetupDone, setupPuzzle]);

  const startCountdown = (minutes) => {
    setSelectedTime(minutes);
    setCountdownValue(3);
    setGamePhase('countdown');
  };

  const getWordInfo = (word) => {
    if (!selectedTheme) return { emoji: "❓", hint: "" };
    return THEMES[selectedTheme].words[word] || { emoji: "❓", hint: "" };
  };

  const getTheme = () => selectedTheme ? THEMES[selectedTheme] : null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEmojiClick = (word) => {
    if (foundWords.includes(word)) return;
    if (word === targetWord) {
      setShowHint(!showHint);
    } else {
      setTargetWord(word);
      setShowHint(true);
      setSelectedCells([]);
      setCurrentWord('');
    }
  };

  const handleCellClick = (row, col) => {
    const cellKey = `${row}-${col}`;
    if (usedCells.has(cellKey) || !targetWord) return;
    const existingIndex = selectedCells.findIndex(c => c.key === cellKey);
    if (existingIndex !== -1) {
      const newSelected = selectedCells.slice(0, existingIndex);
      setSelectedCells(newSelected);
      setCurrentWord(newSelected.map(c => grid[c.row][c.col]).join(''));
      return;
    }
    if (selectedCells.length >= targetWord.length) return;
    const newSelected = [...selectedCells, { row, col, key: cellKey }];
    setSelectedCells(newSelected);
    setCurrentWord(newSelected.map(c => grid[c.row][c.col]).join(''));
  };

  const checkWord = () => {
    if (currentWord.toUpperCase() === targetWord) {
      const newFoundWords = [...foundWords, targetWord];
      setFoundWords(newFoundWords);
      setTotalWordsFound(prev => prev + 1);
      const newUsedCells = new Set(usedCells);
      selectedCells.forEach(cell => newUsedCells.add(cell.key));
      setUsedCells(newUsedCells);
      setShowCorrect(true);
      setTimeout(() => setShowCorrect(false), 500);
      setSelectedCells([]);
      setCurrentWord('');
      if (newFoundWords.length === currentWords.length) {
        setCelebrationMessage(CELEBRATION_MESSAGES[Math.floor(Math.random() * CELEBRATION_MESSAGES.length)]);
        const theme = getTheme();
        if (theme) {
          // Create more confetti pieces for a fuller effect
          const pieces = [];
          for (let i = 0; i < 16; i++) {
            pieces.push({
              id: i,
              emoji: theme.confettiEmojis[i % theme.confettiEmojis.length],
              left: Math.random() * 100,
              delay: Math.random() * 0.8
            });
          }
          setConfettiPieces(pieces);
        }
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
          setScreensCleared(prev => prev + 1);
          setPuzzleIndex(prev => prev + 1);
        }, 2000);
      } else {
        const nextWord = currentWords.find(w => !newFoundWords.includes(w));
        setTargetWord(nextWord);
        setShowHint(true);
      }
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setSelectedCells([]);
        setCurrentWord('');
      }, 400);
    }
  };

  const shuffleGrid = () => {
    const newGrid = grid.map(row => [...row]);
    const unusedPositions = [];
    const unusedLetters = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (!usedCells.has(`${i}-${j}`)) {
          unusedPositions.push({ row: i, col: j });
          unusedLetters.push(newGrid[i][j]);
        }
      }
    }
    for (let i = unusedLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [unusedLetters[i], unusedLetters[j]] = [unusedLetters[j], unusedLetters[i]];
    }
    unusedPositions.forEach((pos, idx) => {
      newGrid[pos.row][pos.col] = unusedLetters[idx];
    });
    setGrid(newGrid);
    setSelectedCells([]);
    setCurrentWord('');
  };

  const renderMenu = () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-amber-100 via-yellow-100 via-emerald-100 via-cyan-100 to-violet-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Iridescent overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/30 via-transparent to-blue-200/30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-amber-200/20 via-transparent to-purple-200/20 pointer-events-none"></div>
      
      <div className="text-center mb-6 md:mb-8 relative z-10">
        <div className="text-6xl md:text-7xl mb-3 md:mb-4">🔍</div>
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Griddle Shake!
        </h1>
        <p className="text-amber-700 text-base md:text-lg">A Letter Griddle Word Hunt Game</p>
        <p className="text-amber-600/80 text-sm mt-1">10 themes to explore!</p>
      </div>
      <button
        onClick={() => setGamePhase('theme')}
        className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white px-10 md:px-12 py-4 rounded-full font-bold text-lg md:text-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 mb-3 md:mb-4 relative z-10"
      >
        <Play size={24} className="md:w-7 md:h-7" /> Play
      </button>
      <button
        onClick={() => setShowStatsModal(true)}
        className="bg-white/80 hover:bg-white active:bg-white/90 px-6 py-2.5 rounded-full font-bold shadow-lg transition-all flex items-center gap-2 text-amber-700 relative z-10"
      >
        <Trophy size={20} /> Your Stats
      </button>
      <div className="mt-6 md:mt-8 text-center relative z-10 px-2">
        <p className="text-amber-700 text-sm mb-2">How to Play:</p>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 md:p-4 max-w-sm text-sm text-amber-800 space-y-1 shadow-lg">
          <p>🎯 Tap an emoji to see its hint</p>
          <p>🔤 Tap letters in the grid to spell the word</p>
          <p>✅ Clear all words to advance!</p>
          <p>⏱️ Beat the clock!</p>
        </div>
      </div>
      {stats.currentStreak > 1 && (
        <div className="mt-4 md:mt-6 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full font-bold shadow-lg flex items-center gap-2 relative z-10 text-sm md:text-base">
          <Flame size={20} className="md:w-6 md:h-6" /> {stats.currentStreak} Day Streak!
        </div>
      )}
      
      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-amber-700/70 relative z-10">
        <p>© {new Date().getFullYear()} Letter Griddle Games. Free & ad-free!</p>
        <p className="mt-1">
          <a href="https://lettergriddle.com/privacy" className="hover:text-amber-800 underline">Privacy</a>
          {' · '}
          <a href="https://lettergriddle.com/terms" className="hover:text-amber-800 underline">Terms</a>
          {' · '}
          <a href="https://lettergriddle.com" className="hover:text-amber-800 underline">More Games</a>
        </p>
      </div>
    </div>
  );

  const renderThemeSelect = () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-amber-100 via-yellow-100 via-emerald-100 via-cyan-100 to-violet-100 flex flex-col items-center p-3 md:p-4 relative overflow-hidden">
      {/* Iridescent overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/30 via-transparent to-blue-200/30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-amber-200/20 via-transparent to-purple-200/20 pointer-events-none"></div>
      
      <button onClick={() => setGamePhase('menu')} className="self-start mb-3 md:mb-4 text-amber-700 hover:text-amber-900 active:text-amber-900 flex items-center gap-2 relative z-10 bg-white/50 px-3 py-1.5 rounded-full text-sm">
        <Home size={18} /> Back
      </button>
      <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 mb-4 md:mb-6 relative z-10" style={{ fontFamily: 'Georgia, serif' }}>
        Choose Your Theme
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 max-w-3xl w-full px-1 relative z-10">
        {Object.entries(THEMES).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => { setSelectedTheme(key); setGamePhase('timer'); }}
            className={`bg-gradient-to-br ${theme.bgGradient} p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all transform hover:scale-105 border-2 border-white/50`}
          >
            <div className="text-3xl md:text-4xl mb-1">{theme.icon}</div>
            <div className="font-bold text-xs md:text-sm text-gray-800">{theme.name}</div>
            <div className="text-xs text-gray-600">{theme.puzzles.length} puzzles</div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderTimerSelect = () => {
    const theme = getTheme();
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme?.bgGradient || 'from-amber-50 to-yellow-50'} flex flex-col items-center justify-center p-4`}>
        <button onClick={() => setGamePhase('theme')} className="absolute top-4 left-4 text-gray-700 hover:text-gray-900 active:text-gray-900 flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full text-sm">
          <Home size={18} /> Back
        </button>
        <div className="text-5xl md:text-6xl mb-3 md:mb-4">{theme?.icon}</div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>
          {theme?.name}
        </h2>
        <p className="mb-6 md:mb-8 text-gray-600 text-sm md:text-base">Choose your time limit</p>
        <div className="flex gap-3 md:gap-4">
          {[1, 2, 3].map(mins => (
            <button
              key={mins}
              onClick={() => startCountdown(mins)}
              className="bg-white/90 hover:bg-white active:bg-white/80 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all transform hover:scale-105 min-w-[80px] md:min-w-[100px]"
            >
              <Clock className="mx-auto mb-2 text-gray-600" size={28} />
              <div className="text-2xl md:text-3xl font-bold text-gray-800">{mins}</div>
              <div className="text-gray-600 text-xs md:text-sm">min{mins > 1 ? 's' : ''}</div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderCountdown = () => {
    const theme = getTheme();
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme?.bgGradient || 'from-amber-50 to-yellow-50'} flex items-center justify-center`}>
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="text-9xl font-bold text-white mb-4 animate-bounce" style={{ fontFamily: 'Georgia, serif' }}>
              {countdownValue > 0 ? countdownValue : 'GO!'}
            </div>
            <div className="text-2xl text-white font-bold animate-pulse">
              {countdownValue > 0 ? 'Get Ready!' : '🔍'}
            </div>
            <div className="flex justify-center gap-4 mt-8">
              {(theme?.confettiEmojis || ['🔍']).slice(0, 5).map((emoji, i) => (
                <div key={i} className="text-5xl" style={{ animation: 'shake 0.3s infinite' }}>
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@keyframes shake { 0%, 100% { transform: translateX(0) rotate(0deg); } 25% { transform: translateX(-5px) rotate(-5deg); } 75% { transform: translateX(5px) rotate(5deg); } }`}</style>
      </div>
    );
  };

  const renderGame = () => {
    const theme = getTheme();
    const targetInfo = targetWord ? getWordInfo(targetWord) : null;
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme?.bgGradient || 'from-amber-50 to-yellow-50'} p-2 md:p-4 relative overflow-hidden`}>
        {showCelebration && (
          <>
            {/* Falling Confetti */}
            <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
              {confettiPieces.map((piece) => (
                <div
                  key={piece.id}
                  className="absolute text-4xl md:text-5xl"
                  style={{
                    left: `${piece.left}%`,
                    top: '-60px',
                    animation: `confettiFall 2s ease-out ${piece.delay}s forwards`
                  }}
                >
                  {piece.emoji}
                </div>
              ))}
              {/* Extra confetti for fuller effect */}
              {confettiPieces.map((piece) => (
                <div
                  key={`extra-${piece.id}`}
                  className="absolute text-3xl md:text-4xl"
                  style={{
                    left: `${(piece.left + 50) % 100}%`,
                    top: '-60px',
                    animation: `confettiFall 2.2s ease-out ${piece.delay + 0.3}s forwards`
                  }}
                >
                  {piece.emoji}
                </div>
              ))}
            </div>
            {/* Celebration Message */}
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-4 rounded-2xl shadow-2xl animate-bounce text-center">
                <div className="text-3xl font-bold">{celebrationMessage}</div>
                <div className="text-lg">Screen Cleared!</div>
              </div>
            </div>
            {/* Confetti Animation Keyframes */}
            <style>{`
              @keyframes confettiFall {
                0% {
                  transform: translateY(0) rotate(0deg) scale(1);
                  opacity: 1;
                }
                50% {
                  opacity: 1;
                }
                100% {
                  transform: translateY(100vh) rotate(720deg) scale(0.5);
                  opacity: 0;
                }
              }
            `}</style>
          </>
        )}
        {showExitConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center">
              <div className="text-4xl mb-3">🚪</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Leave Game?</h3>
              <p className="text-gray-600 mb-4">Your progress will be lost.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowExitConfirm(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full font-bold">
                  Keep Playing
                </button>
                <button onClick={() => { setShowExitConfirm(false); setGamePhase('menu'); }} className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                  Leave
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mb-2 px-1">
          <div className="flex items-center gap-1.5 md:gap-2 text-gray-800">
            <Trophy size={16} className="md:w-[18px] md:h-[18px]" />
            <span className="font-bold text-xs md:text-sm">{screensCleared} screens</span>
          </div>
          <div className={`text-xl md:text-2xl font-bold font-mono text-gray-800 ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : ''}`}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-xs md:text-sm text-gray-600">{totalWordsFound} words</div>
        </div>
        <div className="flex justify-center gap-1.5 md:gap-2 mb-2">
          {currentWords.map((word, i) => {
            const isFound = foundWords.includes(word);
            const isCurrent = word === targetWord;
            const wordInfo = getWordInfo(word);
            return (
              <button
                key={i}
                onClick={() => handleEmojiClick(word)}
                disabled={isFound}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-xl md:text-3xl transition-all ${
                  isFound ? 'bg-green-500 shadow-lg cursor-default' :
                  isCurrent ? 'bg-white shadow-lg ring-2 md:ring-4 ring-amber-400 scale-105 md:scale-110' :
                  'bg-white/70 active:scale-95 cursor-pointer'
                }`}
              >
                {isFound ? '✓' : wordInfo.emoji}
              </button>
            );
          })}
        </div>
        {targetWord && targetInfo && showHint && (
          <div className="flex justify-center mb-2 px-2">
            <div className="bg-white/95 rounded-xl md:rounded-2xl px-3 md:px-4 py-2 shadow-lg max-w-sm w-full">
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-600 mb-1 italic">"{targetInfo.hint}"</div>
                <div className="text-xl md:text-2xl font-bold text-gray-800 tracking-wider flex justify-center gap-0.5 md:gap-1">
                  {targetWord.split('').map((letter, i) => (
                    <span key={i} className={`inline-block w-6 h-8 md:w-7 md:h-9 border-b-2 text-center leading-8 md:leading-9 ${
                      currentWord[i] === letter ? 'text-green-600 border-green-400' :
                      currentWord[i] ? 'text-red-500 border-red-300' : 'text-gray-300 border-gray-300'
                    }`}>
                      {currentWord[i] || ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center mb-3">
          <div className="grid grid-cols-5 gap-1 md:gap-1.5 p-2 md:p-3 bg-gray-800 rounded-xl md:rounded-2xl shadow-xl">
            {grid.map((row, rowIdx) =>
              row.map((letter, colIdx) => {
                const cellKey = `${rowIdx}-${colIdx}`;
                const isSelected = selectedCells.some(c => c.key === cellKey);
                const isUsed = usedCells.has(cellKey);
                const order = selectedCells.findIndex(c => c.key === cellKey) + 1;
                return (
                  <button
                    key={cellKey}
                    onClick={() => handleCellClick(rowIdx, colIdx)}
                    disabled={isUsed}
                    className={`w-11 h-11 md:w-14 md:h-14 rounded-lg text-lg md:text-2xl font-bold transition-all relative
                      ${isUsed ? 'bg-green-500 text-white opacity-60 cursor-default' :
                        isSelected ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white scale-105 shadow-lg' :
                        'bg-gradient-to-br from-amber-100 to-yellow-100 text-gray-800 active:scale-95'}
                      ${showCorrect && isSelected ? 'from-green-400 to-green-500' : ''}
                      ${showWrong && isSelected ? 'from-red-400 to-red-500' : ''}`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {letter}
                    {isSelected && order > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-amber-600 rounded-full text-[10px] md:text-xs flex items-center justify-center text-white font-bold">
                        {order}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
        <div className="flex justify-center gap-1.5 md:gap-2 mb-3 flex-wrap px-2">
          <button onClick={() => setShowExitConfirm(true)} className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white px-3 md:px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
            <ArrowLeft size={14} className="md:w-4 md:h-4" /> Exit
          </button>
          <button onClick={shuffleGrid} className="bg-white/80 hover:bg-white active:bg-white/90 px-3 md:px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-1.5 md:gap-2 text-gray-700 text-xs md:text-sm">
            <Shuffle size={14} className="md:w-4 md:h-4" /> Shuffle
          </button>
          {selectedCells.length > 0 && (
            <button onClick={() => { setSelectedCells([]); setCurrentWord(''); }} className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 px-3 md:px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-1.5 md:gap-2 text-gray-700 text-xs md:text-sm">
              <RotateCcw size={14} className="md:w-4 md:h-4" /> Clear
            </button>
          )}
          {currentWord.length === targetWord?.length && (
            <button onClick={checkWord} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 active:from-green-700 active:to-emerald-700 text-white px-4 md:px-5 py-2 rounded-full font-bold shadow-lg text-xs md:text-sm">
              Check ✓
            </button>
          )}
        </div>
        {foundWords.length > 0 && (
          <div className="flex justify-center gap-2 flex-wrap">
            {foundWords.map((word, i) => (
              <span key={i} className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow flex items-center gap-1">
                {getWordInfo(word).emoji} {word} ✓
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderGameOver = () => {
    const theme = getTheme();
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-amber-100 via-yellow-100 via-emerald-100 via-cyan-100 to-violet-100 flex flex-col items-center justify-center p-3 md:p-4 relative overflow-hidden">
        {/* Iridescent overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/30 via-transparent to-blue-200/30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-amber-200/20 via-transparent to-purple-200/20 pointer-events-none"></div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-2xl text-center max-w-md w-full relative z-10">
          <div className="text-5xl md:text-6xl mb-3 md:mb-4">⏰</div>
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 mb-2" style={{ fontFamily: 'Georgia, serif' }}>Time's Up!</h2>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 md:p-6 my-4 md:my-6">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-amber-600">{screensCleared}</div>
                <div className="text-xs md:text-sm text-gray-600">Screens Cleared</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-amber-600">{totalWordsFound}</div>
                <div className="text-xs md:text-sm text-gray-600">Words Found</div>
              </div>
            </div>
          </div>
          {stats.currentStreak > 0 && (
            <div className="bg-gradient-to-r from-orange-100 to-rose-100 rounded-xl p-3 md:p-4 mb-3 md:mb-4 flex items-center justify-center gap-2">
              <Flame className="text-orange-500" size={20} />
              <span className="font-bold text-orange-600 text-sm md:text-base">{stats.currentStreak} Day Streak!</span>
            </div>
          )}
          {missedWords.length > 0 && (
            <div className="bg-gray-100 rounded-xl p-3 md:p-4 mb-4 md:mb-6">
              <div className="text-xs md:text-sm text-gray-600 mb-2">Words you were working on:</div>
              <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
                {missedWords.map((word, i) => (
                  <div key={i} className="bg-white rounded-lg px-2 md:px-3 py-1.5 md:py-2 shadow-sm">
                    <span className="text-lg md:text-xl mr-1">{getWordInfo(word).emoji}</span>
                    <span className="font-bold text-gray-700 text-sm md:text-base">{word}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2 md:gap-3">
            <button onClick={() => setShowShareModal(true)} className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 hover:from-violet-600 hover:via-purple-600 hover:to-indigo-600 active:scale-95 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-bold shadow-lg flex items-center justify-center gap-2 text-sm md:text-base">
              <Share2 size={18} /> Share Results
            </button>
            <button onClick={() => startCountdown(selectedTime)} className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 active:scale-95 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-bold shadow-lg text-sm md:text-base">
              Play Again
            </button>
            <button onClick={() => setGamePhase('theme')} className="text-gray-600 hover:text-gray-800 active:text-gray-900 font-medium text-sm md:text-base py-1">Change Theme</button>
            <button onClick={() => setGamePhase('menu')} className="text-gray-500 hover:text-gray-700 text-xs md:text-sm py-1">Main Menu</button>
          </div>
        </div>
        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
            <div className="bg-gradient-to-br from-white via-rose-50/50 via-amber-50/50 to-violet-50/50 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-white/50" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500">Share Your Score!</h3>
                <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
              <div className="bg-white/80 rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre-wrap border border-amber-200">
{`Griddle Shake! 🔍
Theme: ${theme?.name} ${theme?.icon}
⏱️ ${selectedTime} min${selectedTime > 1 ? 's' : ''}
📺 ${screensCleared} screens
🔤 ${totalWordsFound} words

Play at lettergriddle.com/griddleshake
Free & ad-free!
Part of the Letter Griddle Games 🥞
More games: lettergriddle.com`}
              </div>
              <div className="flex flex-col gap-2">
                {typeof navigator !== 'undefined' && navigator.share && (
                  <button
                    onClick={async () => {
                      try {
                        await navigator.share({
                          title: 'Griddle Shake!',
                          text: `Griddle Shake! 🔍\nTheme: ${theme?.name} ${theme?.icon}\n⏱️ ${selectedTime} min${selectedTime > 1 ? 's' : ''}\n📺 ${screensCleared} screens\n🔤 ${totalWordsFound} words\n\nPlay at lettergriddle.com/griddleshake\nFree & ad-free!\nPart of the Letter Griddle Games 🥞\nMore games: lettergriddle.com`
                        });
                      } catch (err) {
                        console.log('Share cancelled');
                      }
                    }}
                    className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 hover:from-violet-600 hover:via-purple-600 hover:to-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center justify-center gap-2"
                  >
                    <Share2 size={18} /> Share
                  </button>
                )}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`Griddle Shake! 🔍\nTheme: ${theme?.name} ${theme?.icon}\n⏱️ ${selectedTime} min${selectedTime > 1 ? 's' : ''}\n📺 ${screensCleared} screens\n🔤 ${totalWordsFound} words\n\nPlay at lettergriddle.com/griddleshake\nFree & ad-free!\nPart of the Letter Griddle Games 🥞\nMore games: lettergriddle.com`);
                    setShareCopied(true);
                    setTimeout(() => setShareCopied(false), 2000);
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  {shareCopied ? '✓ Copied!' : <><Copy size={18} /> Copy to Clipboard</>}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderStatsModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowStatsModal(false)}>
      <div className="bg-gradient-to-br from-white via-rose-50/50 via-amber-50/50 to-violet-50/50 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-white/50" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 flex items-center gap-2">
            <Trophy className="text-amber-500" size={24} /> Your Stats
          </h3>
          <button onClick={() => setShowStatsModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gradient-to-br from-rose-100 to-pink-50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-rose-600">{stats.gamesPlayed}</div>
            <div className="text-xs text-gray-600">Games</div>
          </div>
          <div className="bg-gradient-to-br from-amber-100 to-yellow-50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-amber-600">{stats.totalWordsFound}</div>
            <div className="text-xs text-gray-600">Words</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-100 to-green-50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-emerald-600">{stats.bestScreens}</div>
            <div className="text-xs text-gray-600">Best Screens</div>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-amber-50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-orange-600">{stats.currentStreak}</div>
            <div className="text-xs text-gray-600">Streak 🔥</div>
          </div>
        </div>
        <button onClick={() => setShowStatsModal(false)} className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {gamePhase === 'menu' && renderMenu()}
      {gamePhase === 'theme' && renderThemeSelect()}
      {gamePhase === 'timer' && renderTimerSelect()}
      {gamePhase === 'countdown' && renderCountdown()}
      {gamePhase === 'playing' && renderGame()}
      {gamePhase === 'gameover' && renderGameOver()}
      {showStatsModal && renderStatsModal()}
    </div>
  );
};

export default GriddleShake;