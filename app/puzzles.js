// Letter Griddle - Daily Puzzles
// Each puzzle rotates based on the day
// Puzzle changes at 7 PM EST daily

const puzzles = [
  // EXISTING PUZZLES (48-58)
  {
    category: "Candy",
    puzzleNumber: 48,
    words: [
      { word: "MINT", hint: "A refreshing flavored candy often used after dinner", revealedIndex: 0 },
      { word: "TAFFY", hint: "A chewy candy often sold at boardwalks and beaches", revealedIndex: 2 },
      { word: "GUMMY", hint: "Soft, chewy candy often shaped like bears or worms", revealedIndex: 3 },
      { word: "LOLLIPOP", hint: "Hard candy on a stick, a classic carnival treat", revealedIndex: 0 },
      { word: "CHOCOLATE", hint: "Sweet treat made from cacao beans, enjoyed worldwide", revealedIndex: 5 }
    ]
  },
  {
    category: "Autumn",
    puzzleNumber: 49,
    words: [
      { word: "LEAF", hint: "Tree foliage that changes color and falls in this season", revealedIndex: 0 },
      { word: "APPLE", hint: "Round fruit often picked at orchards in fall", revealedIndex: 2 },
      { word: "PUMPKIN", hint: "Large orange gourd carved for Halloween", revealedIndex: 3 },
      { word: "HARVEST", hint: "The gathering of crops at the end of the growing season", revealedIndex: 0 },
      { word: "SWEATER", hint: "Cozy knitted clothing worn when temperatures drop", revealedIndex: 5 }
    ]
  },
  {
    category: "Hiking",
    puzzleNumber: 50,
    words: [
      { word: "BOOT", hint: "Sturdy footwear essential for trail walking", revealedIndex: 0 },
      { word: "TRAIL", hint: "A marked path through nature for walking", revealedIndex: 2 },
      { word: "SUMMIT", hint: "The highest point of a mountain", revealedIndex: 3 },
      { word: "COMPASS", hint: "Navigation tool that points north", revealedIndex: 0 },
      { word: "BACKPACK", hint: "Bag worn on shoulders to carry supplies", revealedIndex: 5 }
    ]
  },
  {
    category: "Dessert",
    puzzleNumber: 51,
    words: [
      { word: "TART", hint: "A pastry with fruit filling and no top crust", revealedIndex: 0 },
      { word: "FUDGE", hint: "Rich, creamy chocolate confection", revealedIndex: 2 },
      { word: "SUNDAE", hint: "Ice cream topped with sauce, whipped cream, and a cherry", revealedIndex: 3 },
      { word: "BROWNIE", hint: "Dense, chocolate baked square dessert", revealedIndex: 0 },
      { word: "CHEESECAKE", hint: "Creamy dessert with a graham cracker crust", revealedIndex: 5 }
    ]
  },
  {
    category: "What's in the bag?",
    puzzleNumber: 52,
    words: [
      { word: "KEYS", hint: "Metal items that unlock doors and start cars", revealedIndex: 0 },
      { word: "PHONE", hint: "Mobile device for calls, texts, and apps", revealedIndex: 2 },
      { word: "WALLET", hint: "Folding case for money and cards", revealedIndex: 3 },
      { word: "LIPSTICK", hint: "Cosmetic applied to add color to lips", revealedIndex: 0 },
      { word: "SUNGLASSES", hint: "Eyewear that protects from bright light", revealedIndex: 5 }
    ]
  },
  {
    category: "Fruits",
    puzzleNumber: 53,
    words: [
      { word: "PEAR", hint: "A sweet fruit with a narrow top and rounded bottom", revealedIndex: 0 },
      { word: "MANGO", hint: "Tropical stone fruit with orange flesh", revealedIndex: 2 },
      { word: "ORANGE", hint: "Citrus fruit known for its vitamin C content", revealedIndex: 3 },
      { word: "APRICOT", hint: "Small orange stone fruit related to peaches", revealedIndex: 0 },
      { word: "PINEAPPLE", hint: "Tropical fruit with spiky skin and sweet yellow interior", revealedIndex: 5 }
    ]
  },
  {
    category: "Animals",
    puzzleNumber: 54,
    words: [
      { word: "BEAR", hint: "Large mammal that hibernates in winter", revealedIndex: 0 },
      { word: "TIGER", hint: "Large striped cat native to Asia", revealedIndex: 2 },
      { word: "GIRAFFE", hint: "Tallest land animal with a long neck", revealedIndex: 3 },
      { word: "ELEPHANT", hint: "Largest land mammal with a trunk", revealedIndex: 0 },
      { word: "ALLIGATOR", hint: "Large reptile found in swamps and rivers", revealedIndex: 5 }
    ]
  },
  {
    category: "Occupations",
    puzzleNumber: 55,
    words: [
      { word: "CHEF", hint: "Professional who prepares food in a restaurant", revealedIndex: 0 },
      { word: "NURSE", hint: "Healthcare worker who cares for patients", revealedIndex: 2 },
      { word: "TEACHER", hint: "Educator who instructs students in a classroom", revealedIndex: 3 },
      { word: "ENGINEER", hint: "Professional who designs and builds systems", revealedIndex: 0 },
      { word: "ARCHITECT", hint: "Designer of buildings and structures", revealedIndex: 5 }
    ]
  },
  {
    category: "Sports",
    puzzleNumber: 56,
    words: [
      { word: "GOLF", hint: "Sport played with clubs and a small white ball", revealedIndex: 0 },
      { word: "RUGBY", hint: "Contact team sport played with an oval ball", revealedIndex: 2 },
      { word: "TENNIS", hint: "Racquet sport played on a court with a net", revealedIndex: 3 },
      { word: "SWIMMING", hint: "Water sport involving moving through water", revealedIndex: 0 },
      { word: "BASKETBALL", hint: "Team sport where players shoot a ball through a hoop", revealedIndex: 5 }
    ]
  },
  {
    category: "U.S. States",
    puzzleNumber: 57,
    words: [
      { word: "UTAH", hint: "Western state known for its national parks", revealedIndex: 0 },
      { word: "TEXAS", hint: "The Lone Star State, second largest by area", revealedIndex: 2 },
      { word: "OREGON", hint: "Pacific Northwest state known for its forests", revealedIndex: 3 },
      { word: "GEORGIA", hint: "Southern state known as the Peach State", revealedIndex: 0 },
      { word: "CALIFORNIA", hint: "Most populous state on the West Coast", revealedIndex: 5 }
    ]
  },
  {
    category: "School Days",
    puzzleNumber: 58,
    words: [
      { word: "DESK", hint: "Furniture where students sit and work", revealedIndex: 0 },
      { word: "LUNCH", hint: "Midday meal eaten in the cafeteria", revealedIndex: 2 },
      { word: "RECESS", hint: "Break time for outdoor play", revealedIndex: 3 },
      { word: "SCIENCE", hint: "Subject exploring how the world works", revealedIndex: 0 },
      { word: "TEXTBOOK", hint: "Educational book used for studying", revealedIndex: 5 }
    ]
  },

  // NEW PUZZLES (59-65)
  {
    category: "Trees and Shrubs",
    puzzleNumber: 59,
    words: [
      { word: "PALM", hint: "Tropical tree with large fan-shaped or feathery leaves", revealedIndex: 0 },
      { word: "MAPLE", hint: "Deciduous tree known for its colorful fall foliage and sweet sap", revealedIndex: 2 },
      { word: "BANYAN", hint: "Fig tree with aerial roots that grow down to form additional trunks", revealedIndex: 3 },
      { word: "JASMINE", hint: "Fragrant flowering shrub often used in perfumes and teas", revealedIndex: 0 },
      { word: "CINNAMON", hint: "Aromatic evergreen tree whose inner bark is used as a spice", revealedIndex: 5 }
    ]
  },
  {
    category: "Movie Titles",
    puzzleNumber: 60,
    words: [
      { word: "JAWS", hint: "1975 Spielberg thriller about a great white shark terrorizing a beach town", revealedIndex: 0 },
      { word: "ALIEN", hint: "1979 sci-fi horror classic with Sigourney Weaver fighting extraterrestrials", revealedIndex: 2 },
      { word: "FROZEN", hint: "Disney animated film featuring Elsa, Anna, and the song 'Let It Go'", revealedIndex: 3 },
      { word: "TITANIC", hint: "1997 epic romance about the doomed ocean liner starring DiCaprio and Winslet", revealedIndex: 0 },
      { word: "INCEPTION", hint: "Christopher Nolan mind-bending thriller about dreams within dreams", revealedIndex: 5 }
    ]
  },
  {
    category: "Colors",
    puzzleNumber: 61,
    words: [
      { word: "BLUE", hint: "The color of a clear sky on a sunny day", revealedIndex: 0 },
      { word: "BEIGE", hint: "A neutral sandy or tan shade often used in interior design", revealedIndex: 2 },
      { word: "INDIGO", hint: "A deep purple-blue color between blue and violet in the rainbow", revealedIndex: 3 },
      { word: "EMERALD", hint: "A rich green color named after a precious gemstone", revealedIndex: 0 },
      { word: "BURGUNDY", hint: "A deep reddish-purple wine color named after a French region", revealedIndex: 5 }
    ]
  },
  {
    category: "International Foods",
    puzzleNumber: 62,
    words: [
      { word: "TACO", hint: "A Mexican dish with a folded tortilla and various fillings", revealedIndex: 0 },
      { word: "SUSHI", hint: "Japanese dish of vinegared rice with raw fish or vegetables", revealedIndex: 2 },
      { word: "PAELLA", hint: "A Spanish rice dish from Valencia with seafood and saffron", revealedIndex: 3 },
      { word: "RAVIOLI", hint: "Italian pasta pillows filled with cheese, meat, or vegetables", revealedIndex: 0 },
      { word: "CROISSANT", hint: "A flaky, buttery French pastry shaped like a crescent", revealedIndex: 5 }
    ]
  },
  {
    category: "Games",
    puzzleNumber: 63,
    words: [
      { word: "RISK", hint: "Strategic board game of world domination with armies and dice", revealedIndex: 0 },
      { word: "CHESS", hint: "Ancient strategy game with kings, queens, and checkmate", revealedIndex: 2 },
      { word: "DOMINO", hint: "Tile game with numbered dots played by matching ends", revealedIndex: 3 },
      { word: "YAHTZEE", hint: "Dice game where players try to score combinations and get five of a kind", revealedIndex: 0 },
      { word: "SCRABBLE", hint: "Word-building board game where letter tiles score points on a grid", revealedIndex: 5 }
    ]
  },
  {
    category: "Cities Around the World",
    puzzleNumber: 64,
    words: [
      { word: "ROME", hint: "Ancient Italian city known as the Eternal City, home to the Colosseum", revealedIndex: 0 },
      { word: "PARIS", hint: "French capital famous for the Eiffel Tower and the Louvre Museum", revealedIndex: 2 },
      { word: "LONDON", hint: "UK capital on the Thames River with Big Ben and Buckingham Palace", revealedIndex: 3 },
      { word: "TORONTO", hint: "Canada's largest city, known for the CN Tower and multicultural neighborhoods", revealedIndex: 0 },
      { word: "BARCELONA", hint: "Spanish coastal city famous for Gaudí's architecture and La Rambla", revealedIndex: 5 }
    ]
  },
  {
    category: "Cool Weather Clothing",
    puzzleNumber: 65,
    words: [
      { word: "COAT", hint: "A long outer garment worn over other clothes for warmth", revealedIndex: 0 },
      { word: "SCARF", hint: "A piece of fabric worn around the neck for warmth or style", revealedIndex: 2 },
      { word: "JACKET", hint: "A shorter outer garment that covers the upper body and arms", revealedIndex: 3 },
      { word: "SWEATER", hint: "A knitted garment worn on the upper body, often made of wool", revealedIndex: 0 },
      { word: "CASHMERE", hint: "A luxuriously soft wool fabric from the Kashmir goat", revealedIndex: 5 }
    ]
  },
  {
    category: "Friendship",
    puzzleNumber: 66,
    words: [
      { word: "ALLY", hint: "A trusted friend who supports and stands by you", revealedIndex: 0 },
      { word: "LOYAL", hint: "Faithful and devoted through thick and thin", revealedIndex: 2 },
      { word: "TRUSTY", hint: "Reliable and dependable, someone you can count on", revealedIndex: 3 },
      { word: "SUPPORT", hint: "To give help, encouragement, and assistance to someone", revealedIndex: 0 },
      { word: "KINDNESS", hint: "The quality of being friendly, generous, and considerate", revealedIndex: 5 }
    ]
  },
  {
    category: "Art Projects",
    puzzleNumber: 67,
    words: [
      { word: "LINE", hint: "A mark made by a pencil, pen, or brush across a surface", revealedIndex: 0 },
      { word: "SHADE", hint: "The use of darkness to create depth and dimension in artwork", revealedIndex: 2 },
      { word: "CANVAS", hint: "A piece of cloth stretched over a frame for painting", revealedIndex: 3 },
      { word: "DRAWING", hint: "The art of creating images with pencils, pens, or charcoal", revealedIndex: 0 },
      { word: "COLLAGE", hint: "Artwork made by gluing paper, photos, and other materials together", revealedIndex: 5 }
    ]
  },
  {
    category: "Musicals",
    puzzleNumber: 68,
    words: [
      { word: "RENT", hint: "Jonathan Larson's rock musical about struggling artists in New York City", revealedIndex: 0 },
      { word: "EVITA", hint: "Andrew Lloyd Webber musical about Argentina's first lady Eva Perón", revealedIndex: 2 },
      { word: "WICKED", hint: "Musical telling the untold story of the witches of Oz", revealedIndex: 3 },
      { word: "COMPANY", hint: "Stephen Sondheim musical about a bachelor and his married friends in New York", revealedIndex: 0 },
      { word: "HAMILTON", hint: "Lin-Manuel Miranda's hip-hop musical about a founding father", revealedIndex: 5 }
    ]
  },
  {
    category: "Football",
    puzzleNumber: 69,
    words: [
      { word: "DOWN", hint: "A play in football; teams get four tries to advance 10 yards", revealedIndex: 0 },
      { word: "BLITZ", hint: "A defensive play where extra players rush the quarterback", revealedIndex: 2 },
      { word: "CENTER", hint: "The offensive lineman who snaps the ball to the quarterback", revealedIndex: 3 },
      { word: "DEFENSE", hint: "The team trying to stop the other team from scoring", revealedIndex: 0 },
      { word: "GRIDIRON", hint: "Another name for a football field, named for its yard lines", revealedIndex: 5 }
    ]
  }
  ];

// Function to get today's puzzle based on EST time
export function getTodaysPuzzle() {
  // Get current time in EST
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  
  // Puzzle changes at 7 PM EST
  const hour = estTime.getHours();
  const puzzleDate = new Date(estTime);
  
  // Puzzle drops at 7 PM and stays live until next 7 PM
  // If before 7 PM today, show yesterday's puzzle (which dropped at 7 PM yesterday)
  // If after 7 PM today, show today's puzzle (which just dropped)
  if (hour >= 19) {
    // After 7 PM - use today's date (puzzle just dropped)
    puzzleDate.setDate(puzzleDate.getDate());
  } else {
    // Before 7 PM - use yesterday's date (still showing yesterday's 7 PM puzzle)
    puzzleDate.setDate(puzzleDate.getDate() - 1);
  }
  
  // Calculate days since epoch (Jan 1, 1970) to determine puzzle index
  const epoch = new Date('1970-01-01');
  const daysSinceEpoch = Math.floor((puzzleDate - epoch) / (1000 * 60 * 60 * 24));
  
  // Rotate through puzzles (now 18 total puzzles)
  const puzzleIndex = (daysSinceEpoch + 1) % puzzles.length;
  
  return puzzles[puzzleIndex];
}

export default puzzles;
