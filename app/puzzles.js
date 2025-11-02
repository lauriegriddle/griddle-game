// All available puzzles for Griddle
export const puzzles = [
  {
    category: "Candy",
    puzzleNumber: 48,
    words: [
      { word: "MINT", hint: "A refreshing flavor often paired with chocolate, popular in after-dinner treats", revealedIndex: 1 },
      { word: "GUMMY", hint: "Chewy, jiggly candy that comes in shapes like bears, worms, and rings", revealedIndex: 2 },
      { word: "BONBON", hint: "A small chocolate-covered confection, French for 'good good'", revealedIndex: 3 },
      { word: "CARAMEL", hint: "A sweet, sticky golden treat made from heated sugar and cream", revealedIndex: 0 },
      { word: "LOLLIPOP", hint: "A hard candy on a stick, perfect for licking and comes in swirls", revealedIndex: 5 }
    ]
  },
  {
    category: "Autumn",
    puzzleNumber: 49,
    words: [
      { word: "COZY", hint: "A warm and comfortable feeling, perfect for snuggling with blankets and hot drinks", revealedIndex: 1 },
      { word: "CRISP", hint: "Fresh and cool air that makes you want to wear a light jacket", revealedIndex: 2 },
      { word: "LEAVES", hint: "They change colors and fall from trees during this season", revealedIndex: 3 },
      { word: "FOLIAGE", hint: "The collective term for all the colorful leaves on trees", revealedIndex: 0 },
      { word: "COLORFUL", hint: "Describing the brilliant reds, oranges, yellows, and browns of the season", revealedIndex: 5 }
    ]
  },
  {
    category: "Hiking",
    puzzleNumber: 50,
    words: [
      { word: "TREK", hint: "A long, adventurous journey on foot through challenging terrain", revealedIndex: 1 },
      { word: "TRAIL", hint: "A marked path through the wilderness for hikers to follow", revealedIndex: 2 },
      { word: "BLAZER", hint: "Someone who marks a new path through unexplored territory", revealedIndex: 3 },
      { word: "CLIMBER", hint: "A person who ascends steep mountains or rock faces", revealedIndex: 0 },
      { word: "RAMBLING", hint: "Walking for pleasure in the countryside without a fixed route", revealedIndex: 5 }
    ]
  },
  {
    category: "Dessert",
    puzzleNumber: 51,
    words: [
      { word: "CAKE", hint: "A sweet baked treat with layers, frosting, and often candles for celebrations", revealedIndex: 1 },
      { word: "FRUIT", hint: "Fresh, natural sweet treats like berries, melons, and apples served after dinner", revealedIndex: 2 },
      { word: "COOKIE", hint: "Small, sweet baked treats that are crispy or chewy, perfect with milk", revealedIndex: 3 },
      { word: "PUDDING", hint: "A creamy, smooth dessert that can be chocolate, vanilla, or butterscotch", revealedIndex: 0 },
      { word: "SHERBET", hint: "A frozen fruity dessert, lighter and icier than ice cream", revealedIndex: 5 }
    ]
  },
  {
    category: "What's in the bag?",
    puzzleNumber: 52,
    words: [
      { word: "BOOK", hint: "Something you read with pages, a cover, and a story or information inside", revealedIndex: 1 },
      { word: "SNACK", hint: "A small bite of food to eat between meals when you're a bit hungry", revealedIndex: 2 },
      { word: "TABLET", hint: "A portable touchscreen device for browsing the internet and using apps", revealedIndex: 3 },
      { word: "LAPTOP", hint: "A portable computer you can open and close, perfect for work or school", revealedIndex: 0 },
      { word: "NOTEBOOK", hint: "Blank pages bound together for writing notes, lists, or journaling", revealedIndex: 5 }
    ]
  }
];

// Get today's puzzle based on the current date
export const getTodaysPuzzle = () => {
  // Launch date - November 2, 2025 (today!)
  const launchDate = new Date('2025-11-02');
  const today = new Date();
  
  // Calculate how many days have passed since launch
  const daysSinceLaunch = Math.floor((today - launchDate) / (1000 * 60 * 60 * 24));
  
  // Get puzzle index (cycles through all 5 puzzles)
  const puzzleIndex = daysSinceLaunch % puzzles.length;
  
  return puzzles[puzzleIndex];
};