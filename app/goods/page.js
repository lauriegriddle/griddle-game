"use client";
import React, { useState, useEffect } from 'react';

// Achievements - shared across both modes
const achievements = [
  { id: 'first_sort', name: 'First Sort', icon: '🧲', description: 'Complete your first puzzle' },
  { id: 'speed_demon', name: 'Speed Demon', icon: '⚡', description: 'Complete with 30+ seconds left' },
  { id: 'kitchen_pro', name: 'Kitchen Pro', icon: '🍳', description: 'Complete 5 Kitchen puzzles' },
  { id: 'office_pro', name: 'Office Pro', icon: '🏢', description: 'Complete 5 Office puzzles' },
  { id: 'culinary_expert', name: 'Culinary Expert', icon: '👨‍🍳', description: 'Complete all Kitchen Challenges' },
  { id: 'trivia_master', name: 'Trivia Master', icon: '🧠', description: 'Complete all Office Challenges' },
  { id: 'one_minute_wonder', name: 'One Minute Wonder', icon: '⏱️', description: 'Win on 1-minute mode' },
  { id: 'no_mistakes', name: 'Perfect Sort', icon: '✨', description: 'Complete without mistakes' },
  { id: 'master_stocker', name: 'Master Stocker', icon: '🏆', description: 'Complete all 36 puzzles' },
];

// ============ KITCHEN PUZZLES ============
const kitchenPuzzles = [
  {
    id: 1,
    categories: ["Cereal Bowl", "Pancake Stack"],
    categoryEmojis: ["🥣", "🥞"],
    words: [
      { text: "Flakes", category: 0 },
      { text: "Syrup", category: 1 },
      { text: "Granola", category: 0 },
      { text: "Whipped Cream", category: 1 },
      { text: "Crunchy", category: 0 },
      { text: "Blueberries", category: 1 },
      { text: "Spoon", category: 0 },
      { text: "Spatula", category: 1 },
      { text: "Milk", category: 0 },
      { text: "Maple", category: 1 },
    ],
    emojis: [
      { text: "🥛", category: 0 },
      { text: "🧈", category: 1 },
    ]
  },
  {
    id: 2,
    categories: ["Hot Drinks", "Cold Drinks"],
    categoryEmojis: ["☕", "🧊"],
    words: [
      { text: "Coffee", category: 0 },
      { text: "Lemonade", category: 1 },
      { text: "Hot Tea", category: 0 },
      { text: "Smoothie", category: 1 },
      { text: "Hot Cocoa", category: 0 },
      { text: "Iced Tea", category: 1 },
      { text: "Latte", category: 0 },
      { text: "Milkshake", category: 1 },
      { text: "Espresso", category: 0 },
      { text: "Slushie", category: 1 },
    ],
    emojis: [
      { text: "🍵", category: 0 },
      { text: "🧋", category: 1 },
    ]
  },
  {
    id: 3,
    categories: ["Breakfast", "Lunch"],
    categoryEmojis: ["🍳", "🥪"],
    words: [
      { text: "Omelet", category: 0 },
      { text: "Sandwich", category: 1 },
      { text: "Waffles", category: 0 },
      { text: "Soup", category: 1 },
      { text: "Bacon", category: 0 },
      { text: "Salad", category: 1 },
      { text: "Toast", category: 0 },
      { text: "Burger", category: 1 },
      { text: "Cereal", category: 0 },
      { text: "Wrap", category: 1 },
    ],
    emojis: [
      { text: "🥞", category: 0 },
      { text: "🌯", category: 1 },
    ]
  },
  {
    id: 4,
    categories: ["Fruits", "Vegetables"],
    categoryEmojis: ["🍎", "🥕"],
    words: [
      { text: "Apple", category: 0 },
      { text: "Carrot", category: 1 },
      { text: "Banana", category: 0 },
      { text: "Broccoli", category: 1 },
      { text: "Orange", category: 0 },
      { text: "Spinach", category: 1 },
      { text: "Grapes", category: 0 },
      { text: "Celery", category: 1 },
      { text: "Mango", category: 0 },
      { text: "Pepper", category: 1 },
    ],
    emojis: [
      { text: "🍇", category: 0 },
      { text: "🥦", category: 1 },
    ]
  },
  {
    id: 5,
    categories: ["Baked Goods", "Frozen Treats"],
    categoryEmojis: ["🥐", "🍦"],
    words: [
      { text: "Croissant", category: 0 },
      { text: "Gelato", category: 1 },
      { text: "Muffin", category: 0 },
      { text: "Popsicle", category: 1 },
      { text: "Bagel", category: 0 },
      { text: "Sorbet", category: 1 },
      { text: "Scone", category: 0 },
      { text: "Frozen Yogurt", category: 1 },
      { text: "Danish", category: 0 },
      { text: "Ice Cream", category: 1 },
    ],
    emojis: [
      { text: "🍞", category: 0 },
      { text: "🧊", category: 1 },
    ]
  },
  {
    id: 6,
    categories: ["Sweet", "Savory"],
    categoryEmojis: ["🍬", "🧂"],
    words: [
      { text: "Chocolate", category: 0 },
      { text: "Pretzel", category: 1 },
      { text: "Candy", category: 0 },
      { text: "Chips", category: 1 },
      { text: "Cookie", category: 0 },
      { text: "Crackers", category: 1 },
      { text: "Cake", category: 0 },
      { text: "Popcorn", category: 1 },
      { text: "Brownie", category: 0 },
      { text: "Nuts", category: 1 },
    ],
    emojis: [
      { text: "🍭", category: 0 },
      { text: "🥨", category: 1 },
    ]
  },
  {
    id: 7,
    categories: ["From a Cow", "From a Plant"],
    categoryEmojis: ["🐄", "🌱"],
    words: [
      { text: "Whole Milk", category: 0 },
      { text: "Almond Milk", category: 1 },
      { text: "Cheese", category: 0 },
      { text: "Oat Milk", category: 1 },
      { text: "Butter", category: 0 },
      { text: "Tofu", category: 1 },
      { text: "Yogurt", category: 0 },
      { text: "Coconut Cream", category: 1 },
      { text: "Cream", category: 0 },
      { text: "Soy Milk", category: 1 },
    ],
    emojis: [
      { text: "🧀", category: 0 },
      { text: "🥥", category: 1 },
    ]
  },
  {
    id: 8,
    categories: ["Utensils", "Appliances"],
    categoryEmojis: ["🍴", "🔌"],
    words: [
      { text: "Fork", category: 0 },
      { text: "Blender", category: 1 },
      { text: "Knife", category: 0 },
      { text: "Toaster", category: 1 },
      { text: "Spoon", category: 0 },
      { text: "Mixer", category: 1 },
      { text: "Tongs", category: 0 },
      { text: "Microwave", category: 1 },
      { text: "Whisk", category: 0 },
      { text: "Coffee Maker", category: 1 },
    ],
    emojis: [
      { text: "🥄", category: 0 },
      { text: "⚡", category: 1 },
    ]
  },
  {
    id: 9,
    categories: ["Spicy", "Mild"],
    categoryEmojis: ["🌶️", "🥬"],
    words: [
      { text: "Habanero", category: 0 },
      { text: "Sugar", category: 1 },
      { text: "Cayenne", category: 0 },
      { text: "Honey", category: 1 },
      { text: "Wasabi", category: 0 },
      { text: "Vanilla", category: 1 },
      { text: "Jalapeño", category: 0 },
      { text: "Butter", category: 1 },
      { text: "Sriracha", category: 0 },
      { text: "Cream", category: 1 },
    ],
    emojis: [
      { text: "🔥", category: 0 },
      { text: "🍦", category: 1 },
    ]
  },
  {
    id: 10,
    categories: ["Coffee Shop", "Bakery"],
    categoryEmojis: ["☕", "🥧"],
    words: [
      { text: "Latte", category: 0 },
      { text: "Pie", category: 1 },
      { text: "Mocha", category: 0 },
      { text: "Tart", category: 1 },
      { text: "Brew", category: 0 },
      { text: "Pastry", category: 1 },
      { text: "Espresso", category: 0 },
      { text: "Strudel", category: 1 },
      { text: "Drip", category: 0 },
      { text: "Eclair", category: 1 },
    ],
    emojis: [
      { text: "☕", category: 0 },
      { text: "🧁", category: 1 },
    ]
  },
  // KITCHEN CULINARY CHALLENGES (11-16)
  {
    id: 11,
    categories: ["French Cuisine", "Japanese Cuisine"],
    categoryEmojis: ["🇫🇷", "🇯🇵"],
    difficulty: "challenge",
    words: [
      { text: "Croissant", category: 0 },
      { text: "Ramen", category: 1 },
      { text: "Baguette", category: 0 },
      { text: "Tempura", category: 1 },
      { text: "Soufflé", category: 0 },
      { text: "Miso", category: 1 },
      { text: "Crêpe", category: 0 },
      { text: "Sashimi", category: 1 },
      { text: "Quiche", category: 0 },
      { text: "Edamame", category: 1 },
    ],
    emojis: [
      { text: "🥐", category: 0 },
      { text: "🍱", category: 1 },
    ]
  },
  {
    id: 12,
    categories: ["Herbs", "Spices"],
    categoryEmojis: ["🌿", "🫚"],
    difficulty: "challenge",
    words: [
      { text: "Basil", category: 0 },
      { text: "Cumin", category: 1 },
      { text: "Cilantro", category: 0 },
      { text: "Paprika", category: 1 },
      { text: "Parsley", category: 0 },
      { text: "Turmeric", category: 1 },
      { text: "Oregano", category: 0 },
      { text: "Coriander", category: 1 },
      { text: "Thyme", category: 0 },
      { text: "Cardamom", category: 1 },
    ],
    emojis: [
      { text: "🌱", category: 0 },
      { text: "🌶️", category: 1 },
    ]
  },
  {
    id: 13,
    categories: ["Grilled", "Smoked"],
    categoryEmojis: ["🔥", "💨"],
    difficulty: "challenge",
    words: [
      { text: "Kebab", category: 0 },
      { text: "Brisket", category: 1 },
      { text: "Steak", category: 0 },
      { text: "Salmon Lox", category: 1 },
      { text: "Burger", category: 0 },
      { text: "Bacon", category: 1 },
      { text: "Vegetables", category: 0 },
      { text: "Ribs", category: 1 },
      { text: "Corn", category: 0 },
      { text: "Ham", category: 1 },
    ],
    emojis: [
      { text: "🍖", category: 0 },
      { text: "🥓", category: 1 },
    ]
  },
  {
    id: 14,
    categories: ["Sauté", "Braise"],
    categoryEmojis: ["🍳", "🫕"],
    difficulty: "challenge",
    words: [
      { text: "Stir Fry", category: 0 },
      { text: "Pot Roast", category: 1 },
      { text: "Quick", category: 0 },
      { text: "Low and Slow", category: 1 },
      { text: "High Heat", category: 0 },
      { text: "Tender", category: 1 },
      { text: "Toss", category: 0 },
      { text: "Simmer", category: 1 },
      { text: "Crispy", category: 0 },
      { text: "Fall Apart", category: 1 },
    ],
    emojis: [
      { text: "⚡", category: 0 },
      { text: "🕐", category: 1 },
    ]
  },
  {
    id: 15,
    categories: ["Mother Sauces", "Dessert Sauces"],
    categoryEmojis: ["👨‍🍳", "🍫"],
    difficulty: "challenge",
    words: [
      { text: "Béchamel", category: 0 },
      { text: "Caramel", category: 1 },
      { text: "Hollandaise", category: 0 },
      { text: "Chocolate", category: 1 },
      { text: "Velouté", category: 0 },
      { text: "Butterscotch", category: 1 },
      { text: "Espagnole", category: 0 },
      { text: "Berry Coulis", category: 1 },
      { text: "Tomato", category: 0 },
      { text: "Crème Anglaise", category: 1 },
    ],
    emojis: [
      { text: "🥄", category: 0 },
      { text: "🍨", category: 1 },
    ]
  },
  {
    id: 16,
    categories: ["Fancy Knife Cuts", "Basic Prep"],
    categoryEmojis: ["🔪", "🥄"],
    difficulty: "challenge",
    words: [
      { text: "Julienne", category: 0 },
      { text: "Chopped", category: 1 },
      { text: "Brunoise", category: 0 },
      { text: "Diced", category: 1 },
      { text: "Chiffonade", category: 0 },
      { text: "Sliced", category: 1 },
      { text: "Batonnet", category: 0 },
      { text: "Minced", category: 1 },
      { text: "Tournée", category: 0 },
      { text: "Cubed", category: 1 },
    ],
    emojis: [
      { text: "✨", category: 0 },
      { text: "🔪", category: 1 },
    ]
  },
];

// ============ OFFICE PUZZLES ============
const officePuzzles = [
  // MUSIC
  {
    id: 101,
    categories: ["String Instruments", "Wind Instruments"],
    categoryEmojis: ["🎻", "🎺"],
    words: [
      { text: "Violin", category: 0 },
      { text: "Flute", category: 1 },
      { text: "Guitar", category: 0 },
      { text: "Trumpet", category: 1 },
      { text: "Cello", category: 0 },
      { text: "Clarinet", category: 1 },
      { text: "Harp", category: 0 },
      { text: "Saxophone", category: 1 },
      { text: "Bass", category: 0 },
      { text: "Trombone", category: 1 },
    ],
    emojis: [
      { text: "🎸", category: 0 },
      { text: "🎷", category: 1 },
    ]
  },
  {
    id: 102,
    categories: ["80s Music", "90s Music"],
    categoryEmojis: ["📼", "💿"],
    words: [
      { text: "Thriller", category: 0 },
      { text: "Smells Like Teen Spirit", category: 1 },
      { text: "Like a Prayer", category: 0 },
      { text: "Wannabe", category: 1 },
      { text: "Billie Jean", category: 0 },
      { text: "Creep", category: 1 },
      { text: "Sweet Child O Mine", category: 0 },
      { text: "Losing My Religion", category: 1 },
      { text: "Take On Me", category: 0 },
      { text: "No Diggity", category: 1 },
    ],
    emojis: [
      { text: "🕺", category: 0 },
      { text: "🎤", category: 1 },
    ]
  },
  // MOVIES
  {
    id: 103,
    categories: ["Pixar Films", "DreamWorks Films"],
    categoryEmojis: ["🏮", "🌙"],
    words: [
      { text: "Toy Story", category: 0 },
      { text: "Shrek", category: 1 },
      { text: "Finding Nemo", category: 0 },
      { text: "Madagascar", category: 1 },
      { text: "The Incredibles", category: 0 },
      { text: "Kung Fu Panda", category: 1 },
      { text: "Up", category: 0 },
      { text: "How to Train Your Dragon", category: 1 },
      { text: "Coco", category: 0 },
      { text: "Bee Movie", category: 1 },
    ],
    emojis: [
      { text: "🤠", category: 0 },
      { text: "🐉", category: 1 },
    ]
  },
  {
    id: 104,
    categories: ["Comedy Films", "Drama Films"],
    categoryEmojis: ["😂", "🎭"],
    words: [
      { text: "Bridesmaids", category: 0 },
      { text: "The Godfather", category: 1 },
      { text: "Superbad", category: 0 },
      { text: "Schindler's List", category: 1 },
      { text: "Anchorman", category: 0 },
      { text: "Forrest Gump", category: 1 },
      { text: "The Hangover", category: 0 },
      { text: "The Shawshank Redemption", category: 1 },
      { text: "Mean Girls", category: 0 },
      { text: "Titanic", category: 1 },
    ],
    emojis: [
      { text: "🤣", category: 0 },
      { text: "😢", category: 1 },
    ]
  },
  // NATURE
  {
    id: 105,
    categories: ["Mammals", "Reptiles"],
    categoryEmojis: ["🐻", "🦎"],
    words: [
      { text: "Elephant", category: 0 },
      { text: "Crocodile", category: 1 },
      { text: "Dolphin", category: 0 },
      { text: "Turtle", category: 1 },
      { text: "Tiger", category: 0 },
      { text: "Iguana", category: 1 },
      { text: "Whale", category: 0 },
      { text: "Cobra", category: 1 },
      { text: "Giraffe", category: 0 },
      { text: "Gecko", category: 1 },
    ],
    emojis: [
      { text: "🦁", category: 0 },
      { text: "🐊", category: 1 },
    ]
  },
  {
    id: 106,
    categories: ["Ocean Life", "Freshwater Life"],
    categoryEmojis: ["🌊", "🏞️"],
    words: [
      { text: "Shark", category: 0 },
      { text: "Trout", category: 1 },
      { text: "Whale", category: 0 },
      { text: "Bass", category: 1 },
      { text: "Octopus", category: 0 },
      { text: "Catfish", category: 1 },
      { text: "Jellyfish", category: 0 },
      { text: "Crayfish", category: 1 },
      { text: "Coral", category: 0 },
      { text: "Frog", category: 1 },
    ],
    emojis: [
      { text: "🦈", category: 0 },
      { text: "🐸", category: 1 },
    ]
  },
  // GEOGRAPHY
  {
    id: 107,
    categories: ["European Countries", "Asian Countries"],
    categoryEmojis: ["🇪🇺", "🌏"],
    words: [
      { text: "France", category: 0 },
      { text: "Japan", category: 1 },
      { text: "Germany", category: 0 },
      { text: "Thailand", category: 1 },
      { text: "Italy", category: 0 },
      { text: "Vietnam", category: 1 },
      { text: "Spain", category: 0 },
      { text: "India", category: 1 },
      { text: "Portugal", category: 0 },
      { text: "South Korea", category: 1 },
    ],
    emojis: [
      { text: "🗼", category: 0 },
      { text: "🗻", category: 1 },
    ]
  },
  {
    id: 108,
    categories: ["Mountains", "Rivers"],
    categoryEmojis: ["🏔️", "🌊"],
    words: [
      { text: "Everest", category: 0 },
      { text: "Amazon", category: 1 },
      { text: "Kilimanjaro", category: 0 },
      { text: "Nile", category: 1 },
      { text: "Denali", category: 0 },
      { text: "Mississippi", category: 1 },
      { text: "Matterhorn", category: 0 },
      { text: "Danube", category: 1 },
      { text: "Fuji", category: 0 },
      { text: "Thames", category: 1 },
    ],
    emojis: [
      { text: "⛰️", category: 0 },
      { text: "🚣", category: 1 },
    ]
  },
  // SCIENCE
  {
    id: 109,
    categories: ["Elements", "Compounds"],
    categoryEmojis: ["⚛️", "🧪"],
    words: [
      { text: "Oxygen", category: 0 },
      { text: "Water", category: 1 },
      { text: "Gold", category: 0 },
      { text: "Salt", category: 1 },
      { text: "Iron", category: 0 },
      { text: "Sugar", category: 1 },
      { text: "Carbon", category: 0 },
      { text: "Rust", category: 1 },
      { text: "Helium", category: 0 },
      { text: "Baking Soda", category: 1 },
    ],
    emojis: [
      { text: "🔬", category: 0 },
      { text: "💧", category: 1 },
    ]
  },
  {
    id: 110,
    categories: ["Planets", "Moons"],
    categoryEmojis: ["🪐", "🌙"],
    words: [
      { text: "Mars", category: 0 },
      { text: "Europa", category: 1 },
      { text: "Venus", category: 0 },
      { text: "Titan", category: 1 },
      { text: "Jupiter", category: 0 },
      { text: "Ganymede", category: 1 },
      { text: "Saturn", category: 0 },
      { text: "Io", category: 1 },
      { text: "Neptune", category: 0 },
      { text: "Triton", category: 1 },
    ],
    emojis: [
      { text: "🌍", category: 0 },
      { text: "🌕", category: 1 },
    ]
  },
  // HISTORY
  {
    id: 111,
    categories: ["Ancient Civilizations", "Modern Nations"],
    categoryEmojis: ["🏛️", "🏙️"],
    words: [
      { text: "Rome", category: 0 },
      { text: "United States", category: 1 },
      { text: "Egypt", category: 0 },
      { text: "Canada", category: 1 },
      { text: "Greece", category: 0 },
      { text: "Australia", category: 1 },
      { text: "Persia", category: 0 },
      { text: "Brazil", category: 1 },
      { text: "Maya", category: 0 },
      { text: "Japan", category: 1 },
    ],
    emojis: [
      { text: "⚱️", category: 0 },
      { text: "🗽", category: 1 },
    ]
  },
  {
    id: 112,
    categories: ["Inventors", "Explorers"],
    categoryEmojis: ["💡", "🧭"],
    words: [
      { text: "Edison", category: 0 },
      { text: "Columbus", category: 1 },
      { text: "Tesla", category: 0 },
      { text: "Magellan", category: 1 },
      { text: "Bell", category: 0 },
      { text: "Armstrong", category: 1 },
      { text: "Franklin", category: 0 },
      { text: "Amundsen", category: 1 },
      { text: "Curie", category: 0 },
      { text: "Hillary", category: 1 },
    ],
    emojis: [
      { text: "🔧", category: 0 },
      { text: "🗺️", category: 1 },
    ]
  },
  // SPORTS
  {
    id: 113,
    categories: ["Team Sports", "Individual Sports"],
    categoryEmojis: ["👥", "🏃"],
    words: [
      { text: "Soccer", category: 0 },
      { text: "Tennis", category: 1 },
      { text: "Basketball", category: 0 },
      { text: "Golf", category: 1 },
      { text: "Hockey", category: 0 },
      { text: "Swimming", category: 1 },
      { text: "Volleyball", category: 0 },
      { text: "Boxing", category: 1 },
      { text: "Football", category: 0 },
      { text: "Gymnastics", category: 1 },
    ],
    emojis: [
      { text: "⚽", category: 0 },
      { text: "🎾", category: 1 },
    ]
  },
  {
    id: 114,
    categories: ["Summer Olympics", "Winter Olympics"],
    categoryEmojis: ["☀️", "❄️"],
    words: [
      { text: "Track", category: 0 },
      { text: "Skiing", category: 1 },
      { text: "Diving", category: 0 },
      { text: "Ice Skating", category: 1 },
      { text: "Gymnastics", category: 0 },
      { text: "Bobsled", category: 1 },
      { text: "Cycling", category: 0 },
      { text: "Snowboard", category: 1 },
      { text: "Rowing", category: 0 },
      { text: "Curling", category: 1 },
    ],
    emojis: [
      { text: "🏊", category: 0 },
      { text: "⛷️", category: 1 },
    ]
  },
  // LITERATURE & ART
  {
    id: 115,
    categories: ["Fiction", "Non-Fiction"],
    categoryEmojis: ["🐉", "📚"],
    words: [
      { text: "Harry Potter", category: 0 },
      { text: "Biography", category: 1 },
      { text: "Lord of the Rings", category: 0 },
      { text: "History Book", category: 1 },
      { text: "Narnia", category: 0 },
      { text: "Cookbook", category: 1 },
      { text: "Hunger Games", category: 0 },
      { text: "Dictionary", category: 1 },
      { text: "Twilight", category: 0 },
      { text: "Encyclopedia", category: 1 },
    ],
    emojis: [
      { text: "🧙", category: 0 },
      { text: "📖", category: 1 },
    ]
  },
  {
    id: 116,
    categories: ["Painters", "Sculptors"],
    categoryEmojis: ["🎨", "🗿"],
    words: [
      { text: "Picasso", category: 0 },
      { text: "Michelangelo", category: 1 },
      { text: "Van Gogh", category: 0 },
      { text: "Rodin", category: 1 },
      { text: "Monet", category: 0 },
      { text: "Donatello", category: 1 },
      { text: "Da Vinci", category: 0 },
      { text: "Bernini", category: 1 },
      { text: "Rembrandt", category: 0 },
      { text: "Brancusi", category: 1 },
    ],
    emojis: [
      { text: "🖼️", category: 0 },
      { text: "🏛️", category: 1 },
    ]
  },
  // OFFICE TRIVIA CHALLENGES (117-120)
  {
    id: 117,
    categories: ["Nobel Prize Winners", "Oscar Winners"],
    categoryEmojis: ["🏅", "🎬"],
    difficulty: "challenge",
    words: [
      { text: "Einstein", category: 0 },
      { text: "Meryl Streep", category: 1 },
      { text: "Marie Curie", category: 0 },
      { text: "Tom Hanks", category: 1 },
      { text: "Malala", category: 0 },
      { text: "Spielberg", category: 1 },
      { text: "MLK Jr", category: 0 },
      { text: "Kate Winslet", category: 1 },
      { text: "Mandela", category: 0 },
      { text: "Denzel Washington", category: 1 },
    ],
    emojis: [
      { text: "🎖️", category: 0 },
      { text: "🏆", category: 1 },
    ]
  },
  {
    id: 118,
    categories: ["Greek Gods", "Roman Gods"],
    categoryEmojis: ["🇬🇷", "🏛️"],
    difficulty: "challenge",
    words: [
      { text: "Zeus", category: 0 },
      { text: "Jupiter", category: 1 },
      { text: "Athena", category: 0 },
      { text: "Minerva", category: 1 },
      { text: "Poseidon", category: 0 },
      { text: "Neptune", category: 1 },
      { text: "Ares", category: 0 },
      { text: "Mars", category: 1 },
      { text: "Aphrodite", category: 0 },
      { text: "Venus", category: 1 },
    ],
    emojis: [
      { text: "⚡", category: 0 },
      { text: "🗡️", category: 1 },
    ]
  },
  {
    id: 119,
    categories: ["Shakespeare Plays", "Greek Tragedies"],
    categoryEmojis: ["🎭", "🏺"],
    difficulty: "challenge",
    words: [
      { text: "Hamlet", category: 0 },
      { text: "Oedipus Rex", category: 1 },
      { text: "Macbeth", category: 0 },
      { text: "Antigone", category: 1 },
      { text: "Othello", category: 0 },
      { text: "Medea", category: 1 },
      { text: "Romeo and Juliet", category: 0 },
      { text: "The Bacchae", category: 1 },
      { text: "King Lear", category: 0 },
      { text: "Electra", category: 1 },
    ],
    emojis: [
      { text: "💀", category: 0 },
      { text: "🎪", category: 1 },
    ]
  },
  {
    id: 120,
    categories: ["Classical Composers", "Jazz Legends"],
    categoryEmojis: ["🎼", "🎷"],
    difficulty: "challenge",
    words: [
      { text: "Beethoven", category: 0 },
      { text: "Miles Davis", category: 1 },
      { text: "Mozart", category: 0 },
      { text: "Louis Armstrong", category: 1 },
      { text: "Bach", category: 0 },
      { text: "Duke Ellington", category: 1 },
      { text: "Chopin", category: 0 },
      { text: "Ella Fitzgerald", category: 1 },
      { text: "Vivaldi", category: 0 },
      { text: "Charlie Parker", category: 1 },
    ],
    emojis: [
      { text: "🎹", category: 0 },
      { text: "🎺", category: 1 },
    ]
  },
];

const HasTheGoods = () => {
  // Hydration fix - wait for client mount before accessing localStorage
  const [hasMounted, setHasMounted] = useState(false);
  
  // Mode state - kitchen or office
  const [gameMode, setGameMode] = useState('kitchen'); // 'kitchen' or 'office'
  
  // Game state - now includes 'selectType' for choosing regular vs challenge
  const [gameState, setGameState] = useState('menu'); // 'menu', 'selectType', 'selectPuzzle', 'playing', 'won', 'lost'
  const [puzzleType, setPuzzleType] = useState('regular'); // 'regular' or 'challenge'
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [selectedTime, setSelectedTime] = useState(120); // Default 2 minutes
  const [timeLeft, setTimeLeft] = useState(0);
  const [fridgeItems, setFridgeItems] = useState([]);
  const [category1Items, setCategory1Items] = useState([]);
  const [category2Items, setCategory2Items] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [wrongPlacements, setWrongPlacements] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [mistakesMade, setMistakesMade] = useState(0);
  
  // Stats and modals
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showAchievementToast, setShowAchievementToast] = useState(null);

  // Default stats structure
  const defaultStats = {
    kitchen: {
      puzzlesCompleted: 0,
      totalPlays: 0,
      completedPuzzleIds: [],
      fastestTime: null,
      perfectSorts: 0,
    },
    office: {
      puzzlesCompleted: 0,
      totalPlays: 0,
      completedPuzzleIds: [],
      fastestTime: null,
      perfectSorts: 0,
    },
    unlockedAchievements: [],
  };

  // Separate stats for each mode - initialize with defaults, load from localStorage after mount
  const [stats, setStats] = useState(defaultStats);

  // Load stats from localStorage after component mounts (client-side only)
  useEffect(() => {
    setHasMounted(true);
    try {
      const saved = localStorage.getItem('hasTheGoodsStats');
      if (saved) {
        setStats(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Could not load stats', e);
    }
  }, []);

  // Get current puzzles based on mode
  const currentPuzzles = gameMode === 'kitchen' ? kitchenPuzzles : officePuzzles;
  
  // Safe access to mode stats with fallback
  const defaultModeStats = {
    puzzlesCompleted: 0,
    totalPlays: 0,
    completedPuzzleIds: [],
    fastestTime: null,
    perfectSorts: 0,
  };
  
  const currentModeStats = (gameMode === 'kitchen' ? stats.kitchen : stats.office) || defaultModeStats;
  
  // Safe accessors for Stats modal
  const kitchenStats = stats.kitchen || defaultModeStats;
  const officeStats = stats.office || defaultModeStats;
  const unlockedAchievements = stats.unlockedAchievements || [];

  // Save stats to localStorage (only after mount to prevent overwriting with defaults)
  useEffect(() => {
    if (!hasMounted) return;
    try {
      localStorage.setItem('hasTheGoodsStats', JSON.stringify(stats));
    } catch (e) {
      console.error('Could not save stats', e);
    }
  }, [stats, hasMounted]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('lost');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  // Check for win condition
  useEffect(() => {
    if (gameState === 'playing' && currentPuzzle) {
      const totalItems = currentPuzzle.words.length + currentPuzzle.emojis.length;
      const sortedItems = category1Items.length + category2Items.length;
      
      if (sortedItems === totalItems) {
        // Check if all are correct
        const allCorrect = 
          category1Items.every(item => item.category === 0) &&
          category2Items.every(item => item.category === 1);
        
        if (allCorrect) {
          setGameState('won');
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 4000);
          
          // Update stats for current mode
          const timeUsed = selectedTime - timeLeft;
          const modeKey = gameMode;
          const isPerfect = mistakesMade === 0;
          
          setStats(prev => {
            const modeStats = prev[modeKey] || defaultModeStats;
            const completedIds = modeStats.completedPuzzleIds || [];
            const newCompletedIds = completedIds.includes(currentPuzzle.id)
              ? completedIds
              : [...completedIds, currentPuzzle.id];
            
            const newStats = {
              ...prev,
              [modeKey]: {
                ...modeStats,
                puzzlesCompleted: (modeStats.puzzlesCompleted || 0) + 1,
                totalPlays: (modeStats.totalPlays || 0) + 1,
                completedPuzzleIds: newCompletedIds,
                fastestTime: modeStats.fastestTime 
                  ? Math.min(modeStats.fastestTime, timeUsed)
                  : timeUsed,
                perfectSorts: isPerfect ? (modeStats.perfectSorts || 0) + 1 : (modeStats.perfectSorts || 0),
              }
            };
            
            // Check achievements
            checkAchievements(newStats, timeUsed, isPerfect);
            
            return newStats;
          });
        }
      }
    }
  }, [category1Items, category2Items, currentPuzzle, gameState, selectedTime, timeLeft, mistakesMade, gameMode]);

  // Check and unlock achievements
  const checkAchievements = (newStats, timeUsed, isPerfect) => {
    const newAchievements = [];
    const kitchenStatsCheck = newStats.kitchen || defaultModeStats;
    const officeStatsCheck = newStats.office || defaultModeStats;
    const totalKitchen = kitchenStatsCheck.completedPuzzleIds?.length || 0;
    const totalOffice = officeStatsCheck.completedPuzzleIds?.length || 0;
    const totalAll = totalKitchen + totalOffice;
    const kitchenChallenges = (kitchenStatsCheck.completedPuzzleIds || []).filter(id => id >= 11 && id <= 16).length;
    const officeChallenges = (officeStatsCheck.completedPuzzleIds || []).filter(id => id >= 117 && id <= 120).length;

    achievements.forEach(achievement => {
      if ((newStats.unlockedAchievements || []).includes(achievement.id)) return;
      
      let shouldUnlock = false;
      
      switch (achievement.id) {
        case 'first_sort':
          shouldUnlock = totalAll >= 1;
          break;
        case 'speed_demon':
          shouldUnlock = timeLeft >= 30;
          break;
        case 'kitchen_pro':
          shouldUnlock = totalKitchen >= 5;
          break;
        case 'office_pro':
          shouldUnlock = totalOffice >= 5;
          break;
        case 'culinary_expert':
          shouldUnlock = kitchenChallenges >= 6;
          break;
        case 'trivia_master':
          shouldUnlock = officeChallenges >= 4;
          break;
        case 'one_minute_wonder':
          shouldUnlock = selectedTime === 60 && timeLeft > 0;
          break;
        case 'no_mistakes':
          shouldUnlock = isPerfect;
          break;
        case 'master_stocker':
          shouldUnlock = totalAll >= 36;
          break;
      }
      
      if (shouldUnlock) {
        newAchievements.push(achievement);
      }
    });

    if (newAchievements.length > 0) {
      setStats(prev => ({
        ...prev,
        unlockedAchievements: [...(prev.unlockedAchievements || []), ...newAchievements.map(a => a.id)]
      }));
      
      // Show achievement toast
      setShowAchievementToast(newAchievements[0]);
      setTimeout(() => setShowAchievementToast(null), 3000);
    }
  };

  // Handle item selection from fridge/bulletin
  const handleFridgeItemClick = (item) => {
    setSelectedItem(item);
  };

  // Handle category click
  const handleCategoryClick = (categoryIndex) => {
    if (!selectedItem) return;
    
    const isCorrect = selectedItem.category === categoryIndex;
    
    if (isCorrect) {
      // Remove from fridge/bulletin
      setFridgeItems(prev => prev.filter(i => i.id !== selectedItem.id));
      
      // Add to correct category
      if (categoryIndex === 0) {
        setCategory1Items(prev => [...prev, selectedItem]);
      } else {
        setCategory2Items(prev => [...prev, selectedItem]);
      }
      
      setSelectedItem(null);
    } else {
      // Track mistake
      setMistakesMade(prev => prev + 1);
      
      // Show wrong feedback
      setWrongPlacements(prev => ({ ...prev, [selectedItem.id]: true }));
      
      // Remove wrong indicator after animation
      setTimeout(() => {
        setWrongPlacements(prev => {
          const newWrong = { ...prev };
          delete newWrong[selectedItem.id];
          return newWrong;
        });
      }, 600);
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Start game
  const startGame = (puzzle) => {
    const allItems = [
      ...puzzle.words.map((w, i) => ({ ...w, id: `word-${i}`, type: 'word' })),
      ...puzzle.emojis.map((e, i) => ({ ...e, id: `emoji-${i}`, type: 'emoji' }))
    ];
    
    // Shuffle items
    const shuffled = [...allItems].sort(() => Math.random() - 0.5);
    
    // Track puzzle type for "More Puzzles" navigation
    setPuzzleType(puzzle.difficulty === 'challenge' ? 'challenge' : 'regular');
    
    setCurrentPuzzle(puzzle);
    setFridgeItems(shuffled);
    setCategory1Items([]);
    setCategory2Items([]);
    setSelectedItem(null);
    setWrongPlacements({});
    setMistakesMade(0);
    setTimeLeft(selectedTime);
    setGameState('playing');
    
    // Update total plays (with safe access)
    setStats(prev => {
      const modeStats = prev[gameMode] || defaultModeStats;
      return {
        ...prev,
        [gameMode]: {
          ...modeStats,
          totalPlays: (modeStats.totalPlays || 0) + 1
        }
      };
    });
  };

  // Shuffle items in fridge/bulletin
  const shuffleFridge = () => {
    setFridgeItems(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  // Handle share
  const handleShare = () => {
    if (!currentPuzzle) return;
    
    const timeUsed = selectedTime - timeLeft;
    const mins = Math.floor(timeUsed / 60);
    const secs = timeUsed % 60;
    const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    
    const modeEmoji = gameMode === 'kitchen' ? '🍳' : '🏢';
    const modeName = gameMode === 'kitchen' ? 'Kitchen' : 'Office';
    
    const shareText = `🧲 Letter Griddle Has the Goods!
${modeEmoji} ${modeName} Mode
${currentPuzzle.categoryEmojis[0]} ${currentPuzzle.categories[0]} vs ${currentPuzzle.categoryEmojis[1]} ${currentPuzzle.categories[1]}
✅ Sorted in ${timeStr}!${mistakesMade === 0 ? '\n✨ Perfect Sort!' : ''}
Play at lettergriddle.com/goods`;

    if (navigator.share) {
      navigator.share({
        text: shareText
      }).catch(() => {
        copyToClipboard(shareText);
      });
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  // Reset all progress
  const resetAllProgress = () => {
    setStats({
      kitchen: {
        puzzlesCompleted: 0,
        totalPlays: 0,
        completedPuzzleIds: [],
        fastestTime: null,
        perfectSorts: 0,
      },
      office: {
        puzzlesCompleted: 0,
        totalPlays: 0,
        completedPuzzleIds: [],
        fastestTime: null,
        perfectSorts: 0,
      },
      unlockedAchievements: [],
    });
    setShowResetConfirm(false);
    setShowStatsModal(false);
  };

  // Get theme colors based on mode
  const getThemeColors = () => {
    if (gameMode === 'kitchen') {
      return {
        bg: 'from-amber-400 via-orange-400 to-yellow-500',
        accent: 'amber',
        containerName: 'The Fridge',
        containerEmoji: '🧊',
        category1Name: 'The Table',
        category2Name: 'The Counter',
        tagline: 'Help Laurel take inventory at the cafe!'
      };
    } else {
      return {
        bg: 'from-blue-400 via-indigo-400 to-purple-500',
        accent: 'blue',
        containerName: 'The Bulletin Board',
        containerEmoji: '📋',
        category1Name: 'Folder A',
        category2Name: 'Folder B',
        tagline: 'Help Laurel prepare for trivia night!'
      };
    }
  };

  const theme = getThemeColors();
  const totalPuzzles = gameMode === 'kitchen' ? 16 : 20;
  const challengeIds = gameMode === 'kitchen' ? [11, 12, 13, 14, 15, 16] : [117, 118, 119, 120];
  const totalChallenges = challengeIds.length;

  // Show loading state until client-side hydration is complete
  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-500 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🧲</div>
          <p className="text-white font-bold text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg} p-4 relative overflow-hidden transition-all duration-500`}>
      {/* Floating background emojis */}
      <div className="fixed top-4 left-4 text-4xl opacity-20">{gameMode === 'kitchen' ? '🧲' : '📚'}</div>
      <div className="fixed top-4 right-4 text-4xl opacity-20">{gameMode === 'kitchen' ? '🍳' : '🎓'}</div>
      <div className="fixed bottom-4 left-4 text-4xl opacity-20">{gameMode === 'kitchen' ? '☕' : '🧠'}</div>
      <div className="fixed bottom-4 right-4 text-4xl opacity-20">{gameMode === 'kitchen' ? '🥞' : '💡'}</div>

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 60 }).map((_, i) => {
            const emojis = currentPuzzle ? 
              [currentPuzzle.categoryEmojis[0], currentPuzzle.categoryEmojis[1], '🧲', '⭐', '🎉'] :
              ['🧲', '⭐', '🎉', '✨', '🏆'];
            const emoji = emojis[i % emojis.length];
            const left = (i * 17 + (i % 7) * 13 + (i % 3) * 29) % 100;
            const delay = (i * 0.07) % 1.2;
            const duration = 2.5 + (i % 5) * 0.3;
            
            return (
              <div
                key={i}
                className="absolute text-3xl"
                style={{
                  left: `${left}%`,
                  top: '-40px',
                  animation: `confettiFall ${duration}s ease-in ${delay}s forwards`
                }}
              >
                {emoji}
              </div>
            );
          })}
        </div>
      )}

      {/* Achievement Toast */}
      {showAchievementToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
            <span className="text-2xl">{showAchievementToast.icon}</span>
            <div>
              <div className="font-bold text-sm">Achievement Unlocked!</div>
              <div className="text-xs">{showAchievementToast.name}</div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes confettiFall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px) rotate(-5deg); }
          75% { transform: translateX(5px) rotate(5deg); }
        }
        .shake {
          animation: shake 0.3s ease-in-out 2;
        }
        .selected-glow {
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.6);
        }
      `}</style>

      <div className="max-w-2xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex justify-center gap-3 mb-2">
            <span className="text-4xl">🧲</span>
            <span className="text-4xl">📊</span>
          </div>
          <h1 className="text-3xl font-bold text-white drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
            Letter Griddle
          </h1>
          <h2 className={`text-xl font-bold drop-shadow-lg ${gameMode === 'kitchen' ? 'text-amber-100' : 'text-blue-100'}`} style={{ fontFamily: 'Georgia, serif' }}>
            Has the Goods!
          </h2>
          <p className="text-white/90 text-sm mt-1">{theme.tagline}</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-4">
          <div className="bg-slate-800/80 rounded-full p-1 flex gap-1">
            <button
              onClick={() => { setGameMode('kitchen'); setGameState('menu'); }}
              className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
                gameMode === 'kitchen'
                  ? 'bg-amber-500 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🍳 Kitchen
            </button>
            <button
              onClick={() => { setGameMode('office'); setGameState('menu'); }}
              className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
                gameMode === 'office'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🏢 Office
            </button>
          </div>
        </div>

        {/* Stats Button */}
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setShowStatsModal(true)}
            className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1"
          >
            📊 Stats
          </button>
        </div>

        {/* Menu State - Choose Time and Puzzle Type */}
        {gameState === 'menu' && (
          <div className="bg-slate-800/90 rounded-2xl p-6 shadow-2xl backdrop-blur">
            {/* Time Selection */}
            <h3 className={`text-xl font-bold ${gameMode === 'kitchen' ? 'text-amber-300' : 'text-blue-300'} text-center mb-3`} style={{ fontFamily: 'Georgia, serif' }}>
              Choose Your Time
            </h3>
            <div className="flex justify-center gap-3 mb-8">
              {[60, 120, 180].map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-5 py-2 rounded-full font-bold transition-all ${
                    selectedTime === time
                      ? gameMode === 'kitchen' 
                        ? 'bg-amber-500 text-white scale-105'
                        : 'bg-blue-500 text-white scale-105'
                      : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
                  }`}
                >
                  {time / 60} min
                </button>
              ))}
            </div>

            <h3 className={`text-xl font-bold ${gameMode === 'kitchen' ? 'text-amber-300' : 'text-blue-300'} text-center mb-4`} style={{ fontFamily: 'Georgia, serif' }}>
              Choose Your Challenge
            </h3>

            {/* Two Big Buttons for Regular vs Challenge */}
            <div className="space-y-4">
              {/* Regular Puzzles Button */}
              <button
                onClick={() => { setPuzzleType('regular'); setGameState('selectPuzzle'); }}
                className={`w-full p-6 rounded-2xl text-left transition-all hover:scale-[1.02] ${
                  gameMode === 'kitchen'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 border-2 border-amber-400'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border-2 border-blue-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{gameMode === 'kitchen' ? '🍳' : '🏢'}</span>
                      <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                        {gameMode === 'kitchen' ? 'Kitchen Puzzles' : 'Office Puzzles'}
                      </span>
                    </div>
                    <p className="text-white/80 text-sm ml-12">
                      {gameMode === 'kitchen' 
                        ? 'Sort cafe inventory into the right categories'
                        : 'Organize office items and pop culture'}
                    </p>
                    <div className="ml-12 mt-2">
                      <span className={`text-xs ${gameMode === 'kitchen' ? 'text-amber-200' : 'text-blue-200'}`}>
                        {currentPuzzles.filter(p => !p.difficulty).filter(p => currentModeStats.completedPuzzleIds.includes(p.id)).length} / {currentPuzzles.filter(p => !p.difficulty).length} completed
                      </span>
                    </div>
                  </div>
                  <span className="text-4xl text-white/50">→</span>
                </div>
              </button>

              {/* Challenge Puzzles Button */}
              <button
                onClick={() => { setPuzzleType('challenge'); setGameState('selectPuzzle'); }}
                className={`w-full p-6 rounded-2xl text-left transition-all hover:scale-[1.02] border-2 ${
                  gameMode === 'kitchen'
                    ? 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border-amber-500'
                    : 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border-blue-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{gameMode === 'kitchen' ? '👨‍🍳' : '🧠'}</span>
                      <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                        {gameMode === 'kitchen' ? 'Culinary Challenges' : 'Trivia Challenges'}
                      </span>
                      <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">Advanced</span>
                    </div>
                    <p className="text-white/80 text-sm ml-12">
                      {gameMode === 'kitchen' 
                        ? 'For the food-savvy! Test your culinary knowledge'
                        : 'For the trivia buffs! Test your knowledge across topics'}
                    </p>
                    <div className="ml-12 mt-2">
                      <span className={`text-xs ${gameMode === 'kitchen' ? 'text-amber-200' : 'text-blue-200'}`}>
                        {currentPuzzles.filter(p => p.difficulty === 'challenge').filter(p => currentModeStats.completedPuzzleIds.includes(p.id)).length} / {currentPuzzles.filter(p => p.difficulty === 'challenge').length} completed
                      </span>
                    </div>
                  </div>
                  <span className="text-4xl text-white/50">→</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Select Puzzle State - Shows puzzles for chosen type */}
        {gameState === 'selectPuzzle' && (
          <div className="bg-slate-800/90 rounded-2xl p-6 shadow-2xl backdrop-blur">
            {/* Back Button */}
            <button
              onClick={() => setGameState('menu')}
              className="flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-all"
            >
              <span className="text-xl">←</span>
              <span className="font-semibold">Back</span>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-3xl">
                  {puzzleType === 'regular' 
                    ? (gameMode === 'kitchen' ? '🍳' : '🏢')
                    : (gameMode === 'kitchen' ? '👨‍🍳' : '🧠')
                  }
                </span>
                <h3 className={`text-2xl font-bold ${gameMode === 'kitchen' ? 'text-amber-300' : 'text-blue-300'}`} style={{ fontFamily: 'Georgia, serif' }}>
                  {puzzleType === 'regular'
                    ? (gameMode === 'kitchen' ? 'Kitchen Puzzles' : 'Office Puzzles')
                    : (gameMode === 'kitchen' ? 'Culinary Challenges' : 'Trivia Challenges')
                  }
                </h3>
                {puzzleType === 'challenge' && (
                  <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">Advanced</span>
                )}
              </div>
              <p className="text-white/60 text-sm">
                {selectedTime / 60} minute mode • Tap a puzzle to start
              </p>
            </div>

            {/* Puzzle Grid */}
            <div className="grid grid-cols-2 gap-3">
              {currentPuzzles
                .filter(p => puzzleType === 'challenge' ? p.difficulty === 'challenge' : !p.difficulty)
                .map((puzzle) => (
                  <button
                    key={puzzle.id}
                    onClick={() => startGame(puzzle)}
                    className={`p-4 rounded-xl text-left transition-all hover:scale-105 ${
                      currentModeStats.completedPuzzleIds.includes(puzzle.id)
                        ? 'bg-green-700 border-2 border-green-500'
                        : puzzleType === 'challenge'
                          ? gameMode === 'kitchen'
                            ? 'bg-slate-700 hover:bg-slate-600 border-2 border-amber-600'
                            : 'bg-slate-700 hover:bg-slate-600 border-2 border-blue-600'
                          : 'bg-slate-600 hover:bg-slate-500 border-2 border-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{puzzle.categoryEmojis[0]}</span>
                      <span className={`${gameMode === 'kitchen' ? 'text-amber-200' : 'text-blue-200'} font-semibold`}>{puzzle.categories[0]}</span>
                    </div>
                    <div className={`${gameMode === 'kitchen' ? 'text-amber-400' : 'text-blue-400'} text-sm`}>vs</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{puzzle.categoryEmojis[1]}</span>
                      <span className={`${gameMode === 'kitchen' ? 'text-amber-200' : 'text-blue-200'} font-semibold`}>{puzzle.categories[1]}</span>
                    </div>
                    {currentModeStats.completedPuzzleIds.includes(puzzle.id) && (
                      <div className="text-green-400 text-xs mt-1">✓ Completed</div>
                    )}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Playing State */}
        {gameState === 'playing' && currentPuzzle && (
          <>
            {/* Timer */}
            <div className="flex justify-center mb-4">
              <div className={`px-6 py-2 rounded-full font-bold text-2xl ${
                timeLeft <= 10 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : timeLeft <= 30 
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-700 text-amber-300'
              }`}>
                ⏱️ {formatTime(timeLeft)}
              </div>
            </div>

            {/* The Fridge/Bulletin Board */}
            <div className="bg-slate-700 rounded-2xl p-4 shadow-2xl border-4 border-slate-600 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{theme.containerEmoji}</span>
                  <h3 className={`text-lg font-bold ${gameMode === 'kitchen' ? 'text-amber-300' : 'text-blue-300'}`} style={{ fontFamily: 'Georgia, serif' }}>
                    {theme.containerName}
                  </h3>
                </div>
                <button
                  onClick={shuffleFridge}
                  className={`${gameMode === 'kitchen' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-500 hover:bg-blue-600'} text-white px-3 py-1 rounded-full text-sm font-semibold transition-all flex items-center gap-1`}
                >
                  ✨ Shuffle
                </button>
              </div>
              
              <p className={`${gameMode === 'kitchen' ? 'text-amber-200' : 'text-blue-200'} text-xs mb-3 text-center`}>
                {gameMode === 'kitchen' ? '🧲 Tap a magnet to select it' : '📌 Tap a note to select it'}
              </p>
              
              <div className="bg-slate-800 rounded-xl p-3 min-h-24 flex flex-wrap gap-2 justify-center items-start">
                {fridgeItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleFridgeItemClick(item)}
                    className={`px-3 py-2 rounded-lg font-semibold transition-all text-sm
                      ${wrongPlacements[item.id] 
                        ? 'bg-red-500 text-white shake' 
                        : selectedItem?.id === item.id
                          ? gameMode === 'kitchen'
                            ? 'bg-amber-400 text-slate-900 scale-110 selected-glow'
                            : 'bg-blue-400 text-slate-900 scale-110 selected-glow'
                          : 'bg-slate-600 text-amber-100 hover:bg-slate-500 hover:scale-105'
                      }
                      ${item.type === 'emoji' ? 'text-xl' : ''}
                    `}
                    style={{ fontFamily: item.type === 'word' ? 'Georgia, serif' : 'inherit' }}
                  >
                    {item.text}
                  </button>
                ))}
                {fridgeItems.length === 0 && (
                  <p className={`${gameMode === 'kitchen' ? 'text-amber-300' : 'text-blue-300'} text-sm`}>All items sorted! 🎉</p>
                )}
              </div>
            </div>

            {/* Category Areas */}
            <div className="grid grid-cols-2 gap-4 items-stretch">
              {/* Category 1 */}
              <button
                onClick={() => handleCategoryClick(0)}
                className={`bg-slate-700 rounded-2xl p-5 shadow-xl border-4 transition-all flex flex-col ${
                  selectedItem 
                    ? gameMode === 'kitchen'
                      ? 'border-amber-400 hover:border-amber-300 cursor-pointer hover:scale-102'
                      : 'border-blue-400 hover:border-blue-300 cursor-pointer hover:scale-102'
                    : 'border-slate-600'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-2xl">{currentPuzzle.categoryEmojis[0]}</span>
                  <h3 className={`text-lg font-bold ${gameMode === 'kitchen' ? 'text-amber-300' : 'text-blue-300'}`} style={{ fontFamily: 'Georgia, serif' }}>
                    {currentPuzzle.categories[0]}
                  </h3>
                </div>
                <p className={`${gameMode === 'kitchen' ? 'text-amber-200' : 'text-blue-200'} text-sm mb-3`}>{theme.category1Name}</p>
                <div className="bg-slate-800 rounded-xl p-4 flex-1 min-h-24 flex flex-wrap gap-2 justify-center content-start">
                  {category1Items.map((item) => (
                    <span
                      key={item.id}
                      className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-bold shadow-md"
                    >
                      {item.text}
                    </span>
                  ))}
                </div>
              </button>

              {/* Category 2 */}
              <button
                onClick={() => handleCategoryClick(1)}
                className={`bg-slate-700 rounded-2xl p-5 shadow-xl border-4 transition-all flex flex-col ${
                  selectedItem 
                    ? gameMode === 'kitchen'
                      ? 'border-amber-400 hover:border-amber-300 cursor-pointer hover:scale-102'
                      : 'border-blue-400 hover:border-blue-300 cursor-pointer hover:scale-102'
                    : 'border-slate-600'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-2xl">{currentPuzzle.categoryEmojis[1]}</span>
                  <h3 className={`text-lg font-bold ${gameMode === 'kitchen' ? 'text-amber-300' : 'text-blue-300'}`} style={{ fontFamily: 'Georgia, serif' }}>
                    {currentPuzzle.categories[1]}
                  </h3>
                </div>
                <p className={`${gameMode === 'kitchen' ? 'text-amber-200' : 'text-blue-200'} text-sm mb-3`}>{theme.category2Name}</p>
                <div className="bg-slate-800 rounded-xl p-4 flex-1 min-h-24 flex flex-wrap gap-2 justify-center content-start">
                  {category2Items.map((item) => (
                    <span
                      key={item.id}
                      className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-bold shadow-md"
                    >
                      {item.text}
                    </span>
                  ))}
                </div>
              </button>
            </div>

            {/* Back button */}
            <div className="text-center mt-4">
              <button
                onClick={() => setGameState('selectPuzzle')}
                className="text-white/70 hover:text-white text-sm underline"
              >
                ← Back to puzzles
              </button>
            </div>
          </>
        )}

        {/* Won State */}
        {gameState === 'won' && currentPuzzle && (
          <div className="bg-slate-700 rounded-2xl p-6 shadow-2xl border-4 border-green-500">
            <div className="text-center">
              <div className="text-6xl mb-3">🎉</div>
              <h3 className="text-2xl font-bold text-green-400 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                You've Got the Goods!
              </h3>
              <p className="text-white mb-4">
                All items sorted with {formatTime(timeLeft)} to spare!
              </p>
              
              {/* Results */}
              <div className="bg-slate-800 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700 p-4 rounded-xl min-h-32">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-xl">{currentPuzzle.categoryEmojis[0]}</span>
                      <span className="text-green-300 font-bold">{currentPuzzle.categories[0]}</span>
                    </div>
                    <p className="text-amber-300 text-sm leading-relaxed">
                      {category1Items.map((item, i) => (
                        <span key={i}>
                          {item.text}{i < category1Items.length - 1 ? ' ' : ''}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="bg-slate-700 p-4 rounded-xl min-h-32">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-xl">{currentPuzzle.categoryEmojis[1]}</span>
                      <span className="text-green-300 font-bold">{currentPuzzle.categories[1]}</span>
                    </div>
                    <p className="text-amber-300 text-sm leading-relaxed">
                      {category2Items.map((item, i) => (
                        <span key={i}>
                          {item.text}{i < category2Items.length - 1 ? ' ' : ''}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3 flex-wrap">
                <button
                  onClick={handleShare}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2"
                >
                  🎉 Share
                </button>
                <button
                  onClick={() => startGame(currentPuzzle)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2"
                >
                  🔄 Play Again
                </button>
                <button
                  onClick={() => setGameState('selectPuzzle')}
                  className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2"
                >
                  🧲 More Puzzles
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lost State */}
        {gameState === 'lost' && currentPuzzle && (
          <div className="bg-slate-700 rounded-2xl p-6 shadow-2xl border-4 border-red-500">
            <div className="text-center">
              <div className="text-6xl mb-3">⏰</div>
              <h3 className="text-2xl font-bold text-red-400 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Time's Up!
              </h3>
              <p className={`${gameMode === 'kitchen' ? 'text-amber-200' : 'text-blue-200'} mb-4`}>
                You'll get the goods next time! 🧲
              </p>
              
              {/* Show what was needed */}
              <div className="bg-slate-800 rounded-xl p-4 mb-6">
                <h4 className={`${gameMode === 'kitchen' ? 'text-amber-300' : 'text-blue-300'} font-bold mb-3`}>Here's how the items sort:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span>{currentPuzzle.categoryEmojis[0]}</span>
                      <span className={`${gameMode === 'kitchen' ? 'text-amber-200' : 'text-blue-200'} font-semibold text-sm`}>{currentPuzzle.categories[0]}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {[...currentPuzzle.words, ...currentPuzzle.emojis]
                        .filter(item => item.category === 0)
                        .map((item, i) => (
                          <span key={i} className="text-amber-100 text-xs bg-slate-700 px-2 py-1 rounded">
                            {item.text}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span>{currentPuzzle.categoryEmojis[1]}</span>
                      <span className={`${gameMode === 'kitchen' ? 'text-amber-200' : 'text-blue-200'} font-semibold text-sm`}>{currentPuzzle.categories[1]}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {[...currentPuzzle.words, ...currentPuzzle.emojis]
                        .filter(item => item.category === 1)
                        .map((item, i) => (
                          <span key={i} className="text-amber-100 text-xs bg-slate-700 px-2 py-1 rounded">
                            {item.text}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => startGame(currentPuzzle)}
                  className={`${gameMode === 'kitchen' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-500 hover:bg-blue-600'} text-white px-6 py-3 rounded-full font-bold transition-all`}
                >
                  💪 Try Again
                </button>
                <button
                  onClick={() => setGameState('selectPuzzle')}
                  className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-full font-bold transition-all"
                >
                  🧲 More Puzzles
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-6 text-white/80 text-xs">
          <p>Part of the Letter Griddle Cafe ☕</p>
          <p className="mt-1">
            <a href="/privacy" className="hover:text-white underline">Privacy</a>
            {' | '}
            <a href="/terms" className="hover:text-white underline">Terms</a>
            {' | '}
            <a href="/" className="hover:text-white underline">Back to Cafe</a>
          </p>
          <p className="mt-1 text-white/60">© 2026 Letter Griddle</p>
        </div>
      </div>

      {/* Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => { setShowStatsModal(false); setShowResetConfirm(false); }}>
          <div className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => { setShowStatsModal(false); setShowResetConfirm(false); }}
              className="absolute top-3 right-3 text-slate-400 hover:text-white text-xl"
            >
              ✕
            </button>
            
            <div className="text-center mb-4">
              <span className="text-3xl">📊</span>
              <h3 className="text-xl font-bold text-white mt-2">Your Stats</h3>
            </div>

            {!showResetConfirm ? (
              <>
                {/* Kitchen Stats */}
                <div className="mb-4 p-3 rounded-xl bg-amber-900/30 border-2 border-amber-600">
                  <h4 className="text-amber-300 font-bold text-center mb-2 flex items-center justify-center gap-2">
                    🍳 Kitchen
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-slate-700 rounded-lg p-2">
                      <div className="text-xl font-bold text-amber-400">{kitchenStats.puzzlesCompleted}</div>
                      <div className="text-[10px] text-slate-300">Sorts</div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-2">
                      <div className="text-xl font-bold text-amber-400">{kitchenStats.completedPuzzleIds.length}/16</div>
                      <div className="text-[10px] text-slate-300">Puzzles</div>
                    </div>
                  </div>
                  {/* Kitchen Challenge Progress */}
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-amber-300 mb-1">
                      <span>👨‍🍳 Culinary Challenge</span>
                      <span>{kitchenStats.completedPuzzleIds.filter(id => id >= 11 && id <= 16).length}/6</span>
                    </div>
                    <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-amber-400 transition-all"
                        style={{ width: `${(kitchenStats.completedPuzzleIds.filter(id => id >= 11 && id <= 16).length / 6) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Office Stats */}
                <div className="mb-4 p-3 rounded-xl bg-blue-900/30 border-2 border-blue-600">
                  <h4 className="text-blue-300 font-bold text-center mb-2 flex items-center justify-center gap-2">
                    🏢 Office
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-slate-700 rounded-lg p-2">
                      <div className="text-xl font-bold text-blue-400">{officeStats.puzzlesCompleted}</div>
                      <div className="text-[10px] text-slate-300">Sorts</div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-2">
                      <div className="text-xl font-bold text-blue-400">{officeStats.completedPuzzleIds.length}/20</div>
                      <div className="text-[10px] text-slate-300">Puzzles</div>
                    </div>
                  </div>
                  {/* Office Challenge Progress */}
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-blue-300 mb-1">
                      <span>🧠 Trivia Challenge</span>
                      <span>{officeStats.completedPuzzleIds.filter(id => id >= 117 && id <= 120).length}/4</span>
                    </div>
                    <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-400 transition-all"
                        style={{ width: `${(officeStats.completedPuzzleIds.filter(id => id >= 117 && id <= 120).length / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Total Progress */}
                <div className="mb-4 p-3 rounded-xl bg-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">🏆 Total Progress</span>
                    <span className="text-amber-400 font-bold">
                      {kitchenStats.completedPuzzleIds.length + officeStats.completedPuzzleIds.length}/36
                    </span>
                  </div>
                  <div className="h-2 bg-slate-600 rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-green-500 transition-all"
                      style={{ width: `${((kitchenStats.completedPuzzleIds.length + officeStats.completedPuzzleIds.length) / 36) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-amber-300 mb-2 text-center">Achievements</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {achievements.map(achievement => {
                      const isUnlocked = unlockedAchievements.includes(achievement.id);
                      return (
                        <div
                          key={achievement.id}
                          className={`p-2 rounded-lg text-center transition-all ${
                            isUnlocked 
                              ? 'bg-amber-600/30 border border-amber-500' 
                              : 'bg-slate-700/50 opacity-40'
                          }`}
                          title={achievement.description}
                        >
                          <div className="text-xl">{achievement.icon}</div>
                          <div className="text-[10px] text-slate-300 mt-1">{achievement.name}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2"
                >
                  🔄 Reset All Progress
                </button>
                <p className="text-xs text-slate-500 text-center mt-1">Start fresh from the beginning</p>
              </>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-3">⚠️</div>
                <h4 className="text-lg font-bold text-white mb-2">Reset All Progress?</h4>
                <p className="text-sm text-slate-400 mb-4">
                  This will clear all your stats for both Kitchen and Office modes. This cannot be undone!
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={resetAllProgress}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
                  >
                    Reset Everything
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HasTheGoods;