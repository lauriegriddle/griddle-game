// Letter Griddle - Daily Puzzles
// ANCHOR DATE ROTATION SYSTEM
// Puzzle changes at 7 PM EST daily
//
// ===========================================
// HOW THIS SYSTEM WORKS:
// ===========================================
// - ANCHOR_DATE = A specific date/time when index 0 was/will be shown
// - Puzzles are shown in array order starting from that date
// - Adding new puzzles to the END won't disrupt existing rotation!
// - New puzzles naturally appear after all current puzzles have cycled
//
// TO ADD NEW PUZZLES:
// 1. Just add them to the END of the puzzles array
// 2. They'll automatically appear after the current rotation completes
// 3. No need to change anything else!
// ===========================================

// ANCHOR DATE: November 29, 2025 at 7:00 PM EST
// On this date, puzzle at index 0 ('Round the Hearth) will be shown
const ANCHOR_DATE = new Date('2025-11-29T19:00:00-05:00');

const puzzles = [
  // ===========================================
  // INDEX 0 - Shows on anchor date (Nov 29, 2025 at 7 PM)
  // ===========================================
  {
    category: "'Round the Hearth",
    puzzleNumber: 79,
    words: [
      { word: "WARM", hint: "The cozy feeling you get sitting by a fire", revealedIndex: 0 },
      { word: "STORY", hint: "A tale shared aloud while gathered together", revealedIndex: 2 },
      { word: "TOASTY", hint: "Comfortably hot, like bread by the fire", revealedIndex: 2 },
      { word: "MANTLE", hint: "The shelf above a fireplace for displaying photos", revealedIndex: 3 },
      { word: "COMFORT", hint: "A feeling of ease and contentment at home", revealedIndex: 1 }
    ],
    funFact: "The word 'hearth' comes from the Latin word focus, which means 'center' or 'heart'. This is why the hearth has historically been considered the 'heart of the home' and why we still use the word 'focus' today to talk about the main point of something."
  },
  // INDEX 1 - Shows Nov 30, 2025 at 7 PM
  {
    category: "The Price is Right",
    puzzleNumber: 80,
    words: [
      { word: "CASH", hint: "Money in bills or coins, often a grand prize", revealedIndex: 0 },
      { word: "PRIZE", hint: "Something won in a game or competition", revealedIndex: 2 },
      { word: "ANSWER", hint: "What you give when a question is asked", revealedIndex: 3 },
      { word: "CONTEST", hint: "A competition where people try to win", revealedIndex: 3 },
      { word: "SHOWDOWN", hint: "A final face-off to determine the winner", revealedIndex: 2 }
    ],
    funFact: "The Price is Right is the longest running game show in US history and has given away over $350 million in prizes since 1972."
  },
  // INDEX 2 - Shows Dec 1, 2025 at 7 PM
  {
    category: "Moving Through the Air",
    puzzleNumber: 81,
    words: [
      { word: "SOAR", hint: "To fly high without flapping wings", revealedIndex: 0 },
      { word: "GLIDE", hint: "To move smoothly through the air with little effort", revealedIndex: 2 },
      { word: "CRUISE", hint: "To travel at a steady, comfortable speed", revealedIndex: 2 },
      { word: "TAKEOFF", hint: "The moment a plane leaves the ground", revealedIndex: 3 },
      { word: "NAVIGATE", hint: "To find your way and steer a course", revealedIndex: 4 }
    ],
    funFact: "The first animals to fly were a sheep, a duck, and a rooster in a hot air balloon in 1783."
  },
  // INDEX 3 - Shows Dec 2, 2025 at 7 PM
  {
    category: "Animated Film Characters",
    puzzleNumber: 82,
    words: [
      { word: "LILO", hint: "Hawaiian girl who adopts an unusual pet from space", revealedIndex: 0 },
      { word: "SHREK", hint: "Green ogre who lives in a swamp and rescues a princess", revealedIndex: 2 },
      { word: "STITCH", hint: "Blue alien experiment 626 who becomes part of a family", revealedIndex: 2 },
      { word: "NEUTRON", hint: "Boy genius Jimmy with a tall swirl of hair", revealedIndex: 3 },
      { word: "MONSTERS", hint: "Mike and Sulley work at this Inc. company", revealedIndex: 4 }
    ],
    funFact: "Boo in Monsters, Inc was voiced by a toddler whose playtime was recorded to get her lines."
  },
  // INDEX 4 - Shows Dec 3, 2025 at 7 PM
  {
    category: "Air Travel",
    puzzleNumber: 83,
    words: [
      { word: "PASS", hint: "A boarding document that lets you on the plane", revealedIndex: 0 },
      { word: "PILOT", hint: "The person who flies the aircraft", revealedIndex: 2 },
      { word: "FLIGHT", hint: "A journey through the air from one place to another", revealedIndex: 2 },
      { word: "AIRLINE", hint: "A company that operates commercial planes", revealedIndex: 3 },
      { word: "AIRCRAFT", hint: "A vehicle designed to fly through the sky", revealedIndex: 4 }
    ],
    funFact: "Airplanes are struck by lightning regularly; however, the electrical charge goes around the plane."
  },
  // INDEX 5 - Shows Dec 4, 2025 at 7 PM
  {
    category: "Say \"Cheese!\"",
    puzzleNumber: 84,
    words: [
      { word: "BRIE", hint: "Soft French cheese with an edible white rind", revealedIndex: 0 },
      { word: "SWISS", hint: "Cheese known for its signature holes", revealedIndex: 2 },
      { word: "ASIAGO", hint: "Italian cheese often grated over pasta and salads", revealedIndex: 2 },
      { word: "CHEDDAR", hint: "Popular orange or white cheese originally from England", revealedIndex: 3 },
      { word: "MUENSTER", hint: "Mild cheese with an orange rind, great for melting", revealedIndex: 4 }
    ],
    funFact: "There are over 2,000 varieties of cheese, and it can take around 10 pounds of milk to make just one pound of cheese."
  },
  // INDEX 6 - Shows Dec 5, 2025 at 7 PM
  {
    category: "Lunch",
    puzzleNumber: 85,
    words: [
      { word: "SOUP", hint: "A warm liquid dish often served in a bowl with a spoon", revealedIndex: 0 },
      { word: "SALAD", hint: "A mix of leafy greens and vegetables, often with dressing", revealedIndex: 2 },
      { word: "MIDDAY", hint: "The time of day when lunch is typically eaten", revealedIndex: 2 },
      { word: "POTLUCK", hint: "A meal where everyone brings a dish to share", revealedIndex: 3 },
      { word: "SANDWICH", hint: "Fillings placed between two slices of bread", revealedIndex: 4 }
    ],
    funFact: "The average American will have consumed 1,500 PB&Js by the time they graduate from high school."
  },
  // INDEX 7 - Shows Dec 6, 2025 at 7 PM
  {
    category: "Rock On!",
    puzzleNumber: 86,
    words: [
      { word: "PUNK", hint: "A rebellious rock genre known for fast tempos and anti-establishment lyrics", revealedIndex: 0 },
      { word: "METAL", hint: "Heavy rock genre featuring loud, distorted guitars and powerful drums", revealedIndex: 2 },
      { word: "CLASSIC", hint: "Timeless rock from the 60s and 70s that never goes out of style", revealedIndex: 3 },
      { word: "CONCERT", hint: "A live music performance where fans gather to see their favorite bands", revealedIndex: 0 },
      { word: "SONGBIRD", hint: "A singer with a naturally beautiful, melodic voice", revealedIndex: 4 }
    ],
    funFact: "Metallica is the only band to have played on all seven continents."
  },
  // INDEX 8 - Shows Dec 7, 2025 at 7 PM
  {
    category: "Spices",
    puzzleNumber: 87,
    words: [
      { word: "SALT", hint: "Essential seasoning that enhances flavor in almost every dish", revealedIndex: 0 },
      { word: "THYME", hint: "Fragrant herb with tiny leaves, often used in soups and roasts", revealedIndex: 2 },
      { word: "PEPPER", hint: "Common table seasoning that adds a bit of heat and kick", revealedIndex: 3 },
      { word: "PAPRIKA", hint: "Red powder made from dried peppers, popular in Hungarian cuisine", revealedIndex: 0 },
      { word: "ROSEMARY", hint: "Aromatic herb with needle-like leaves, perfect with lamb and potatoes", revealedIndex: 4 }
    ],
    funFact: "By weight, paprika has more vitamin C than lemon juice."
  },
  // INDEX 9 - Shows Dec 8, 2025 at 7 PM
  {
    category: "Cats",
    puzzleNumber: 88,
    words: [
      { word: "MEOW", hint: "The signature sound a cat makes to communicate", revealedIndex: 0 },
      { word: "FURRY", hint: "Covered in soft, fluffy hair perfect for petting", revealedIndex: 2 },
      { word: "KITTEN", hint: "A baby cat, playful and full of energy", revealedIndex: 3 },
      { word: "WHISKER", hint: "Long sensory hairs on a cat's face that help them navigate", revealedIndex: 0 },
      { word: "KNEADING", hint: "When a cat pushes its paws in and out on a soft surface, like making biscuits", revealedIndex: 5 }
    ],
    funFact: "Cats have 32 muscles in each ear that allow them to rotate them 180 degrees to pinpoint sounds."
  },
  // INDEX 10 - Shows Dec 9, 2025 at 7 PM
  {
    category: "Dogs",
    puzzleNumber: 89,
    words: [
      { word: "BONE", hint: "A favorite chew treat that dogs love to gnaw on", revealedIndex: 0 },
      { word: "HOUND", hint: "A type of dog bred for hunting, known for its keen sense of smell", revealedIndex: 2 },
      { word: "BEAGLE", hint: "Friendly breed with floppy ears, famous for its nose and howl", revealedIndex: 3 },
      { word: "SERVICE", hint: "A trained dog that assists people with disabilities", revealedIndex: 0 },
      { word: "AIREDALE", hint: "The largest terrier breed, often called the 'King of Terriers'", revealedIndex: 4 }
    ],
    funFact: "Dogs have the ability to make over 100 different facial expressions, which they use to communicate with people."
  },
  // INDEX 11 - Shows Dec 10, 2025 at 7 PM
  {
    category: "At the Office",
    puzzleNumber: 90,
    words: [
      { word: "TEAM", hint: "A group of coworkers who collaborate together on projects", revealedIndex: 0 },
      { word: "STAFF", hint: "The employees who work at a company or organization", revealedIndex: 2 },
      { word: "AGENCY", hint: "A business that provides specialized services for clients", revealedIndex: 3 },
      { word: "MANAGER", hint: "The person who oversees a department or group of employees", revealedIndex: 0 },
      { word: "BUSINESS", hint: "A commercial organization that sells goods or services", revealedIndex: 4 }
    ],
    funFact: "Companies that encourage laughter see a 30% increase in productivity, and humor is not a distraction from work."
  },
  // INDEX 12 - Shows Dec 11, 2025 at 7 PM
  {
    category: "In the Kitchen",
    puzzleNumber: 91,
    words: [
      { word: "SINK", hint: "Basin with a faucet where you wash dishes and rinse food", revealedIndex: 0 },
      { word: "STOVE", hint: "Appliance with burners used for cooking food in pots and pans", revealedIndex: 2 },
      { word: "RECIPE", hint: "Written instructions that tell you how to prepare a dish", revealedIndex: 3 },
      { word: "CUPBOARD", hint: "Cabinet where you store dishes, glasses, and dry goods", revealedIndex: 0 },
      { word: "COOKWARE", hint: "Pots, pans, and other equipment used for preparing meals", revealedIndex: 4 }
    ],
    funFact: "The oldest known cookbook dates back to 1700 B.C."
  },
  // INDEX 13 - Shows Dec 12, 2025 at 7 PM
  {
    category: "Social Media",
    puzzleNumber: 92,
    words: [
      { word: "LIKE", hint: "A quick tap to show you enjoy someone's post", revealedIndex: 0 },
      { word: "VIRAL", hint: "When content spreads rapidly across the internet", revealedIndex: 2 },
      { word: "ENGAGE", hint: "To interact with content by commenting, sharing, or reacting", revealedIndex: 3 },
      { word: "COMMENT", hint: "A written response left beneath a post or video", revealedIndex: 0 },
      { word: "PLATFORM", hint: "A website or app where users share content, like Instagram or TikTok", revealedIndex: 4 }
    ],
    funFact: "Social media users spend an average of 2 hours and 24 minutes per day on social media platforms."
  },
  // INDEX 14 - Shows Dec 13, 2025 at 7 PM
  {
    category: "Pancakes",
    puzzleNumber: 93,
    words: [
      { word: "EGGS", hint: "Ingredient that helps bind the batter together", revealedIndex: 0 },
      { word: "FLOUR", hint: "The main dry ingredient that gives pancakes their structure", revealedIndex: 2 },
      { word: "SYRUP", hint: "Sweet, sticky topping poured generously over a stack", revealedIndex: 3 },
      { word: "GRIDDLE", hint: "Flat cooking surface used to make golden-brown pancakes", revealedIndex: 0 },
      { word: "HOMEMADE", hint: "Made from scratch in your own kitchen, not from a box", revealedIndex: 4 }
    ],
    funFact: "The first pancakes may have been made as far back as 12,000 years ago."
  },
  // INDEX 15 - Shows Dec 14, 2025 at 7 PM
  {
    category: "Musical Instruments",
    puzzleNumber: 94,
    words: [
      { word: "LYRE", hint: "Ancient stringed instrument played by Greek poets and musicians", revealedIndex: 0 },
      { word: "FLUTE", hint: "Woodwind instrument played by blowing air across an opening", revealedIndex: 2 },
      { word: "GUITAR", hint: "Six-stringed instrument popular in rock, country, and folk music", revealedIndex: 3 },
      { word: "UKULELE", hint: "Small four-stringed instrument from Hawaii with a cheerful sound", revealedIndex: 0 },
      { word: "KEYBOARD", hint: "Electronic instrument with black and white keys like a piano", revealedIndex: 4 }
    ],
    funFact: "A piano has 7,500 parts, which is why it can play the range of nearly an entire orchestra and is considered the 'king of instruments.'"
  },
  // INDEX 16 - Shows Dec 15, 2025 at 7 PM
  {
    category: "Soup",
    puzzleNumber: 95,
    words: [
      { word: "TACO", hint: "Tex-Mex soup topped with tortilla strips, cheese, and avocado", revealedIndex: 0 },
      { word: "BROTH", hint: "Clear, savory liquid made by simmering meat or vegetables", revealedIndex: 2 },
      { word: "BISQUE", hint: "Creamy, rich soup often made with shellfish like lobster or crab", revealedIndex: 3 },
      { word: "CHOWDER", hint: "Thick, chunky soup typically made with potatoes and clams", revealedIndex: 0 },
      { word: "BOUILLON", hint: "Concentrated stock used as a base for soups and sauces", revealedIndex: 5 }
    ],
    funFact: "The earliest evidence of soup dates back to 6000 B.C. and was likely hippopotamus soup."
  },
  // INDEX 17 - Shows Dec 16, 2025 at 7 PM
  {
    category: "Ways to Go",
    puzzleNumber: 96,
    words: [
      { word: "LANE", hint: "A narrow path or single division of a roadway", revealedIndex: 0 },
      { word: "DRIVE", hint: "A private road leading to a house, or a scenic route", revealedIndex: 2 },
      { word: "STREET", hint: "A public road in a city or town, usually lined with buildings", revealedIndex: 3 },
      { word: "HIGHWAY", hint: "A main road for fast, long-distance travel between cities", revealedIndex: 0 },
      { word: "TURNPIKE", hint: "A toll road where drivers pay a fee to travel", revealedIndex: 4 }
    ],
    funFact: "The first roads were created by animals, and the Romans built durable roads, like the Appian Way, that are still in use today."
  },
  // INDEX 18 - Shows Dec 17, 2025 at 7 PM
  {
    category: "Pasta",
    puzzleNumber: 97,
    words: [
      { word: "ZITI", hint: "Tube-shaped pasta often baked with cheese and marinara sauce", revealedIndex: 0 },
      { word: "PENNE", hint: "Cylinder pasta cut at an angle, perfect for holding chunky sauces", revealedIndex: 2 },
      { word: "SKETTY", hint: "Playful nickname for spaghetti, often used by kids", revealedIndex: 3 },
      { word: "GNOCCHI", hint: "Soft, pillowy Italian dumplings made from potatoes", revealedIndex: 0 },
      { word: "MACARONI", hint: "Curved elbow-shaped pasta famous in a cheesy American dish", revealedIndex: 4 }
    ],
    funFact: "Italy is a world leader in pasta consumption, but there are more than 600 shapes of pasta worldwide, with popular choices including spaghetti, penne, and macaroni."
  },
  // INDEX 19 - Shows Dec 18, 2025 at 7 PM
  {
    category: "Breakfast",
    puzzleNumber: 98,
    words: [
      { word: "MEAL", hint: "The first food you eat to start your day", revealedIndex: 0 },
      { word: "BACON", hint: "Crispy strips of cured pork, a breakfast favorite", revealedIndex: 2 },
      { word: "CEREAL", hint: "Crunchy grains served in a bowl with milk", revealedIndex: 3 },
      { word: "PANCAKE", hint: "Flat, round cake cooked on a griddle and stacked high", revealedIndex: 0 },
      { word: "PORRIDGE", hint: "Warm, creamy dish made by boiling oats or grains", revealedIndex: 4 }
    ],
    funFact: "The word 'breakfast' comes from two older words: 'break' (meaning to end) and 'fast' (meaning not eating for a long time). So, it means to 'break the fast' from not eating all night."
  },
  // INDEX 20 - Shows Dec 19, 2025 at 7 PM
  {
    category: "Cooking",
    puzzleNumber: 99,
    words: [
      { word: "CHOP", hint: "To cut food into smaller pieces with a knife", revealedIndex: 0 },
      { word: "WHISK", hint: "To beat ingredients quickly with a wire tool to blend or add air", revealedIndex: 2 },
      { word: "SEARED", hint: "Cooked at high heat to create a flavorful brown crust", revealedIndex: 3 },
      { word: "PREHEAT", hint: "To warm up the oven to the right temperature before baking", revealedIndex: 0 },
      { word: "MEASURED", hint: "Carefully portioned out using cups or spoons for accuracy", revealedIndex: 4 }
    ],
    funFact: "The earliest known cookbook was written in ancient Babylon around 1700 BC."
  },
  // INDEX 21 - Shows Dec 20, 2025 at 7 PM
  {
    category: "Antlers",
    puzzleNumber: 100,
    words: [
      { word: "ELK", hint: "Large North American deer known for its bugling call", revealedIndex: 0 },
      { word: "DEER", hint: "Common woodland animal, often seen with white-spotted fawns", revealedIndex: 2 },
      { word: "MOOSE", hint: "The largest member of the deer family with massive, flat antlers", revealedIndex: 3 },
      { word: "CARIBOU", hint: "Wild reindeer of North America that migrate in large herds", revealedIndex: 0 },
      { word: "REINDEER", hint: "Arctic deer famous for pulling Santa's sleigh", revealedIndex: 4 }
    ],
    funFact: "Antlers are unique to animals like deer, elk, and moose, and they are the fastest-growing animal tissue, capable of growing up to an inch a day. Antlers are shed and regrow annually, and only caribou are the exception where females also grow them."
  },
  // INDEX 22 - Shows Dec 21, 2025 at 7 PM
  {
    category: "Snow",
    puzzleNumber: 101,
    words: [
      { word: "FALL", hint: "When snow gently drops from the sky to the ground", revealedIndex: 0 },
      { word: "FLAKE", hint: "A single, delicate ice crystal with a unique shape", revealedIndex: 2 },
      { word: "FLURRY", hint: "A brief, light snowfall with swirling winds", revealedIndex: 3 },
      { word: "DRIZZLE", hint: "A light, misty precipitation, sometimes mixed with snow", revealedIndex: 0 },
      { word: "DRIFTING", hint: "When wind blows snow into piles and mounds", revealedIndex: 4 }
    ],
    funFact: "Snow is translucent, not white, and the appearance of white is due to light scattering off the ice crystals."
  },
  // INDEX 23 - Shows Dec 22, 2025 at 7 PM
  {
    category: "A Dish to Pass",
    puzzleNumber: 102,
    words: [
      { word: "FARE", hint: "Food or meals, especially the type served at an event", revealedIndex: 0 },
      { word: "FEAST", hint: "A large, celebratory meal shared with many people", revealedIndex: 2 },
      { word: "PICNIC", hint: "An outdoor meal where everyone brings food to share", revealedIndex: 3 },
      { word: "POTLUCK", hint: "A gathering where each guest contributes a dish", revealedIndex: 0 },
      { word: "FAVORITE", hint: "The dish everyone hopes someone will bring again", revealedIndex: 4 }
    ],
    funFact: "It's called 'potluck' because the term comes from the medieval practice of serving whatever was left in the pot to unexpected guests, and the meal's quality was left to 'the luck of the pot'."
  },
  // INDEX 24 - Shows Dec 23, 2025 at 7 PM
  {
    category: "Brunch",
    puzzleNumber: 103,
    words: [
      { word: "COZY", hint: "A warm, comfortable feeling perfect for a lazy morning meal", revealedIndex: 0 },
      { word: "TOAST", hint: "Crispy browned bread, often topped with avocado or jam", revealedIndex: 2 },
      { word: "QUICHE", hint: "Savory egg pie with cheese and fillings baked in a crust", revealedIndex: 3 },
      { word: "WEEKEND", hint: "The days when brunch is most popular, Saturday and Sunday", revealedIndex: 0 },
      { word: "PASTRIES", hint: "Flaky baked treats like croissants, danishes, and muffins", revealedIndex: 4 }
    ],
    funFact: "The term 'brunch' was coined in 1895 by British writer Guy Beringer, who proposed it as a Sunday meal for 'Saturday-night carousers' to help with Saturday night carousing on Sunday."
  },
  // INDEX 25 - Shows Dec 24, 2025 at 7 PM (Christmas Eve!)
  {
    category: "'Tis the Season",
    puzzleNumber: 104,
    words: [
      { word: "BELL", hint: "Ringing instrument that signals holiday cheer", revealedIndex: 0 },
      { word: "CANDY", hint: "Sweet treats like canes and chocolates enjoyed during the holidays", revealedIndex: 2 },
      { word: "JINGLE", hint: "The merry sound of small bells, often heard in holiday songs", revealedIndex: 3 },
      { word: "FESTIVE", hint: "Full of celebration, decorations, and holiday spirit", revealedIndex: 0 },
      { word: "YULETIDE", hint: "Old-fashioned word for the Christmas season", revealedIndex: 4 }
    ],
    funFact: "Jingle Bells was originally written as a Thanksgiving song."
  },
  // INDEX 26 - Shows Dec 25, 2025 at 7 PM (Christmas Day!)
  {
    category: "Christmas Tree",
    puzzleNumber: 105,
    words: [
      { word: "STAR", hint: "Shining ornament often placed at the very top of the tree", revealedIndex: 0 },
      { word: "ANGEL", hint: "Heavenly figure that sometimes crowns the treetop", revealedIndex: 2 },
      { word: "TINSEL", hint: "Sparkly, shiny strands draped over branches for shimmer", revealedIndex: 3 },
      { word: "GARLAND", hint: "A decorative string of beads, popcorn, or greenery wrapped around the tree", revealedIndex: 0 },
      { word: "DECORATE", hint: "To adorn the tree with lights, ornaments, and trimmings", revealedIndex: 4 }
    ],
    funFact: "The modern Christmas tree tradition has its roots in Germany, with the first known decorated Christmas tree appearing in Riga, Latvia, in 1510."
  },
  // INDEX 27 - Shows Dec 26, 2025 at 7 PM
  {
    category: "Time for Self-Care",
    puzzleNumber: 106,
    words: [
      { word: "REST", hint: "Taking a break to recharge your body and mind", revealedIndex: 0 },
      { word: "RELAX", hint: "To let go of stress and unwind", revealedIndex: 2 },
      { word: "GROWTH", hint: "Personal development and becoming a better version of yourself", revealedIndex: 3 },
      { word: "JOURNAL", hint: "Writing down thoughts and feelings in a notebook", revealedIndex: 0 },
      { word: "EXERCISE", hint: "Physical activity that boosts your mood and energy", revealedIndex: 4 }
    ],
    funFact: "Self-care looks different for everyone. It's about finding what works for you, which could be a massage, reading a book, or a quiet nap."
  },
  // INDEX 28 - Shows Dec 27, 2025 at 7 PM
  {
    category: "On the Slopes",
    puzzleNumber: 107,
    words: [
      { word: "SNOW", hint: "Frozen precipitation that blankets the mountain for skiing", revealedIndex: 0 },
      { word: "SKIER", hint: "A person who glides down the mountain on two long boards", revealedIndex: 2 },
      { word: "SLALOM", hint: "A race where skiers zigzag between poles down the course", revealedIndex: 3 },
      { word: "ATHLETE", hint: "A trained competitor who excels in winter sports", revealedIndex: 0 },
      { word: "DOWNHILL", hint: "The fastest alpine skiing event, racing straight down the mountain", revealedIndex: 4 }
    ],
    funFact: "Downhill skiing is the fastest non-motorized sport, with a world record speed over 158 mph achieved in speed skiing."
  },
  // INDEX 29 - Shows Dec 28, 2025 at 7 PM
  {
    category: "Pizza, pizza!",
    puzzleNumber: 108,
    words: [
      { word: "MEAT", hint: "A savory protein topping category for pizza", revealedIndex: 0 },
      { word: "SAUCE", hint: "Tomato-based spread that goes on the dough", revealedIndex: 2 },
      { word: "TOMATO", hint: "Red fruit used as the base for pizza sauce", revealedIndex: 3 },
      { word: "SAUSAGE", hint: "Spiced ground meat topping, often Italian-style", revealedIndex: 0 },
      { word: "MUSHROOM", hint: "Earthy fungus that's a popular vegetable topping", revealedIndex: 5 }
    ],
    funFact: "Pepperoni is the most popular pizza topping, with over 450 million pounds used annually."
  },
  // INDEX 30 - Shows Dec 29, 2025 at 7 PM
  {
    category: "Fancy",
    puzzleNumber: 109,
    words: [
      { word: "CHIC", hint: "Stylishly elegant and fashionably sophisticated", revealedIndex: 0 },
      { word: "FRILLY", hint: "Decorated with ruffles, lace, or elaborate trim", revealedIndex: 2 },
      { word: "ORNATE", hint: "Highly detailed and lavishly decorated", revealedIndex: 3 },
      { word: "ELEGANT", hint: "Gracefully refined and tastefully luxurious", revealedIndex: 0 },
      { word: "SUPERIOR", hint: "Of the highest quality, above all the rest", revealedIndex: 4 }
    ],
    funFact: "The term 'octothorpe' is the correct name for the '#' symbol, not 'hashtag'. Very fancy!"
  },
  // ==================================================
  // INDEX 31 - Shows Dec 30, 2025 at 7 PM
  // ==================================================
  {
    category: "No RSVP Needed",
    puzzleNumber: 110,
    words: [
      { word: "BOOK", hint: "A bound collection of pages perfect for a quiet evening in", revealedIndex: 0 },
      { word: "MOVIE", hint: "A film to watch from the comfort of your couch", revealedIndex: 2 },
      { word: "COCOA", hint: "A warm chocolate drink ideal for cozy nights", revealedIndex: 3 },
      { word: "BLANKET", hint: "A soft covering to snuggle under while relaxing", revealedIndex: 0 },
      { word: "HOMEBODY", hint: "Someone who prefers staying in over going out", revealedIndex: 4 }
    ],
    funFact: "Homebodies often use their time to explore new hobbies such as cooking, crafting, and gaming."
  },

  // ==================================================
  // INDEX 32 - Shows Dec 31, 2025 at 7 PM (New Year's Eve!)
  // ==================================================
  {
    category: "Ring in the New Year",
    puzzleNumber: 111,
    words: [
      { word: "BALL", hint: "The glittering sphere that drops in Times Square at midnight", revealedIndex: 0 },
      { word: "PARTY", hint: "A festive celebration with friends and family", revealedIndex: 2 },
      { word: "CHEER", hint: "Joyful shouts and toasts at the stroke of midnight", revealedIndex: 3 },
      { word: "CONFETTI", hint: "Colorful paper pieces thrown in celebration", revealedIndex: 0 },
      { word: "COUNTDOWN", hint: "The final seconds before the new year begins: 10, 9, 8...", revealedIndex: 5 }
    ],
    funFact: "The ball drop in NYC's Times Square started because fireworks were banned, leading to the first ball in 1907 to draw crowds instead."
  },

  // ==================================================
  // INDEX 33 - Shows Jan 1, 2026 at 7 PM (Letter Griddle Launch Day!)
  // ==================================================
  {
    category: "We 🧡 Pancakes! - Official Launch 🎉",
    puzzleNumber: 112,
    words: [
      { word: "FLIP", hint: "The mid-air turn that gives pancakes their golden sides", revealedIndex: 0 },
      { word: "SYRUP", hint: "Sweet maple topping poured generously over a stack", revealedIndex: 2 },
      { word: "BUTTER", hint: "A melting pat of this makes pancakes extra delicious", revealedIndex: 3 },
      { word: "GRIDDLE", hint: "A flat cooking surface perfect for making pancakes", revealedIndex: 0 },
      { word: "FLAPJACK", hint: "Another name for a pancake, especially in the American South", revealedIndex: 4 }
    ],
    funFact: "There are many different names for pancakes including flapjacks, griddlecakes and hotcakes. All of these other names for pancakes are the same basic ingredients and cooking method, they just may be called something different depending on region and the restaurant."
  },

  // ==================================================
  // INDEX 34 - Shows Jan 2, 2026 at 7 PM
  // ==================================================
  {
    category: "New Beginnings",
    puzzleNumber: 113,
    words: [
      { word: "ANEW", hint: "Starting over again, fresh and renewed", revealedIndex: 0 },
      { word: "FRESH", hint: "Clean and new, like the start of a new year", revealedIndex: 2 },
      { word: "DREAMY", hint: "Full of hopes and imaginative visions for the future", revealedIndex: 3 },
      { word: "JOURNEY", hint: "A long trip or path of personal growth and discovery", revealedIndex: 0 },
      { word: "ADVENTURE", hint: "An exciting experience waiting to unfold", revealedIndex: 5 }
    ],
    funFact: "The modern New Year's Day on January 1st was established by Julius Caesar in 46 B.C. to honor Janus, the Roman god of doors and beginnings, who is depicted with two faces, one looking back to the past and the other looking forward to the future."
  },

  // ================================================
  // INDEX 35 - Shows Jan 3, 2026 at 7 PM
  // ================================================
  {
    category: "Buffet",
    puzzleNumber: 114,
    words: [
      { word: "DINE", hint: "To eat a meal, especially in a formal or elegant setting", revealedIndex: 0 },
      { word: "FEAST", hint: "A large, elaborate meal celebrating a special occasion", revealedIndex: 2 },
      { word: "SUPPER", hint: "An evening meal, often lighter or more casual than dinner", revealedIndex: 3 },
      { word: "DESSERT", hint: "The sweet course served at the end of a meal", revealedIndex: 0 },
      { word: "BEVERAGE", hint: "Any drink, from water to wine to coffee", revealedIndex: 4 }
    ],
    funFact: "In the US, only about 29% of people sit down for dinner at a table every day, while roughly 70% of meals are eaten outside the home."
  },

  // ================================================
  // INDEX 36 - Shows Jan 4, 2026 at 7 PM
  // ================================================
  {
    category: "Deserts",
    puzzleNumber: 115,
    words: [
      { word: "ARID", hint: "Extremely dry, with little or no rainfall", revealedIndex: 0 },
      { word: "OASIS", hint: "A fertile green spot in a desert where water is found", revealedIndex: 2 },
      { word: "CACTUS", hint: "A spiny plant that thrives in dry, hot environments", revealedIndex: 3 },
      { word: "DROUGHT", hint: "A prolonged period of abnormally low rainfall", revealedIndex: 0 },
      { word: "DESOLATE", hint: "Barren, empty, and lifeless landscape", revealedIndex: 4 }
    ],
    funFact: "Antarctica is the world's largest desert, which is classified as such because of its extremely low precipitation, not its temperature."
  },

  // ================================================
  // INDEX 37 - Shows Jan 5, 2026 at 7 PM
  // ================================================
  {
    category: "Cereal",
    puzzleNumber: 116,
    words: [
      { word: "OATS", hint: "A hearty grain often eaten as oatmeal or in granola", revealedIndex: 0 },
      { word: "WHEAT", hint: "A golden grain used to make bread and pasta", revealedIndex: 2 },
      { word: "BARLEY", hint: "An ancient grain used in soups, stews, and brewing beer", revealedIndex: 3 },
      { word: "FROSTED", hint: "Coated with a sweet, sugary glaze on breakfast flakes", revealedIndex: 0 },
      { word: "CINNAMON", hint: "A warm, sweet spice that flavors many breakfast cereals", revealedIndex: 4 }
    ],
    funFact: "The word \"cereal\" comes from \"Cerealia,\" a major festival in ancient Rome that honored Ceres, the goddess of agriculture."
  },

  // ================================================
  // INDEX 38 - Shows Jan 6, 2026 at 7 PM
  // ================================================
  {
    category: "Ensemble",
    puzzleNumber: 117,
    words: [
      { word: "GARB", hint: "Clothing or dress, especially of a distinctive style", revealedIndex: 0 },
      { word: "COVER", hint: "Something worn to protect or conceal the body", revealedIndex: 2 },
      { word: "OUTFIT", hint: "A coordinated set of clothes worn together", revealedIndex: 3 },
      { word: "GARMENT", hint: "Any article of clothing, from shirts to pants", revealedIndex: 0 },
      { word: "COSTUME", hint: "Special attire worn for performances or occasions", revealedIndex: 4 }
    ],
    funFact: "Buttons were invented around 3,500 years before buttonholes existed. People used loops to fasten items until the buttonhole was created."
  },

  // ================================================
  // INDEX 39 - Shows Jan 7, 2026 at 7 PM
  // ================================================
  {
    category: "Backpack",
    puzzleNumber: 118,
    words: [
      { word: "TOTE", hint: "A large bag for carrying items, often open at the top", revealedIndex: 0 },
      { word: "STRAP", hint: "A strip of material used to secure or carry something", revealedIndex: 2 },
      { word: "POCKET", hint: "A small pouch sewn into a bag for storing items", revealedIndex: 3 },
      { word: "CAMPING", hint: "An outdoor activity where backpacks are essential gear", revealedIndex: 0 },
      { word: "CARRYALL", hint: "A large bag or container for holding many things", revealedIndex: 4 }
    ],
    funFact: "The term \"backpack\" became common around 1910, and while early versions were for military and outdoor use, they were introduced to students more recently."
  },

  // ================================================
  // INDEX 40 - Shows Jan 8, 2026 at 7 PM
  // ================================================
  {
    category: "Water💦",
    puzzleNumber: 119,
    words: [
      { word: "FLOW", hint: "To move steadily and continuously in a current", revealedIndex: 0 },
      { word: "VAPOR", hint: "Water in its gaseous form, like steam or mist", revealedIndex: 2 },
      { word: "STREAM", hint: "A small, narrow river flowing through the land", revealedIndex: 3 },
      { word: "TRICKLE", hint: "A thin, slow flow of liquid", revealedIndex: 0 },
      { word: "DOWNPOUR", hint: "A heavy, sudden rainfall", revealedIndex: 4 }
    ],
    funFact: "Water is the only substance on Earth found naturally in three forms: liquid, gas, and solid."
  },

  // ================================================
  // INDEX 41 - Shows Jan 9, 2026 at 7 PM
  // ================================================
  {
    category: "Road Trip",
    puzzleNumber: 120,
    words: [
      { word: "ROAM", hint: "To travel aimlessly from place to place", revealedIndex: 0 },
      { word: "JAUNT", hint: "A short journey taken for pleasure", revealedIndex: 2 },
      { word: "WANDER", hint: "To walk or travel without a fixed destination", revealedIndex: 3 },
      { word: "MIGRATE", hint: "To move from one region to another, often seasonally", revealedIndex: 0 },
      { word: "NAVIGATE", hint: "To plan and direct the route of a journey", revealedIndex: 4 }
    ],
    funFact: "The Pan-American Highway network stretches nearly 19,000 miles from Alaska to Argentina."
  },

  // ================================================
  // INDEX 42 - Shows Jan 10, 2026 at 7 PM
  // ================================================
  {
    category: "Weather",
    puzzleNumber: 121,
    words: [
      { word: "WIND", hint: "Moving air caused by differences in atmospheric pressure", revealedIndex: 0 },
      { word: "CLOUD", hint: "A visible mass of water droplets floating in the sky", revealedIndex: 2 },
      { word: "REPORT", hint: "A forecast telling you what conditions to expect", revealedIndex: 3 },
      { word: "CLIMATE", hint: "The long-term pattern of weather in a region", revealedIndex: 0 },
      { word: "SUNSHINE", hint: "Bright, warm light from the sun on a clear day", revealedIndex: 4 }
    ],
    funFact: "Fluffy clouds are full of tiny water droplets, or ice crystals. Fog is just a cloud touching the ground."
  },

  // ================================================
  // INDEX 43 - Shows Jan 11, 2026 at 7 PM
  // ================================================
  {
    category: "Mountains",
    puzzleNumber: 122,
    words: [
      { word: "HILL", hint: "A small, rounded elevation of land, lower than a mountain", revealedIndex: 0 },
      { word: "RANGE", hint: "A chain of mountains connected in a line", revealedIndex: 2 },
      { word: "RIDGED", hint: "Having a long, narrow elevated crest or edge", revealedIndex: 3 },
      { word: "VOLCANO", hint: "A mountain that can erupt with lava and ash", revealedIndex: 0 },
      { word: "HILLSIDE", hint: "The sloping side of a hill or mountain", revealedIndex: 4 }
    ],
    funFact: "More than half of the world's fresh water originates in mountain sources, making mountains the planet's \"water towers.\""
  },

  // ================================================
  // INDEX 44 - Shows Jan 12, 2026 at 7 PM
  // ================================================
  {
    category: "Now you see me, now you don't",
    puzzleNumber: 123,
    words: [
      { word: "MASK", hint: "A covering worn to hide or protect the face", revealedIndex: 0 },
      { word: "MIMIC", hint: "To imitate or copy the appearance of something else", revealedIndex: 2 },
      { word: "COVERT", hint: "Hidden or secret, not openly displayed", revealedIndex: 3 },
      { word: "CONCEAL", hint: "To keep something from being seen or discovered", revealedIndex: 0 },
      { word: "DISGUISE", hint: "An altered appearance to hide one's true identity", revealedIndex: 4 }
    ],
    funFact: "Animals use sand, smells, and even dazzle patterns to confuse enemies, while stick insects sway like twigs."
  },

  // =============================================
  // INDEX 45 - Shows Jan 13, 2026 at 7 PM
  // =============================================
  {
    category: "Map It!",
    puzzleNumber: 124,
    words: [
      { word: "PLOT", hint: "To mark or plan a course on a map", revealedIndex: 0 },
      { word: "GUIDE", hint: "A reference that helps you find your way", revealedIndex: 2 },
      { word: "SKETCH", hint: "To draw a rough outline or representation quickly", revealedIndex: 3 },
      { word: "DIAGRAM", hint: "A simplified drawing showing layout or relationships", revealedIndex: 0 },
      { word: "POSITION", hint: "The specific place where something is located", revealedIndex: 4 },
    ],
    funFact: "Maps are full of secrets! From fake towns designed to catch copycats to ancient cave drawings of stars, cartographers have hidden surprises in their work for centuries. 🗺️",
  },

  // =============================================
  // INDEX 46 - Shows Jan 14, 2026 at 7 PM
  // =============================================
  {
    category: "Shoes",
    puzzleNumber: 125,
    words: [
      { word: "MULE", hint: "A backless slip-on shoe or slipper", revealedIndex: 0 },
      { word: "FLATS", hint: "Shoes with little to no heel", revealedIndex: 2 },
      { word: "SADDLE", hint: "A two-toned oxford shoe popular in the 1950s", revealedIndex: 3 },
      { word: "HIKING", hint: "Sturdy boots designed for trails and outdoor terrain", revealedIndex: 0 },
      { word: "MOCCASIN", hint: "Soft leather shoe originally made by Native Americans", revealedIndex: 4 },
    ],
    funFact: "Step back in time! Ancient Romans were the first to make distinct left and right shoes, a major comfort improvement that we still enjoy today. 👟",
  },

  // =============================================
  // INDEX 47 - Shows Jan 15, 2026 at 7 PM
  // =============================================
  {
    category: "Beverage",
    puzzleNumber: 126,
    words: [
      { word: "SODA", hint: "A carbonated sweet drink, also called pop", revealedIndex: 0 },
      { word: "FIZZY", hint: "Bubbly and effervescent, full of tiny bubbles", revealedIndex: 2 },
      { word: "COFFEE", hint: "A caffeinated drink brewed from roasted beans", revealedIndex: 3 },
      { word: "REFRESH", hint: "To restore energy or make something feel new again", revealedIndex: 0 },
      { word: "MILKSHAKE", hint: "A thick, creamy drink blended with ice cream", revealedIndex: 4 },
    ],
    funFact: "Coffee was discovered in Ethiopia by a goat herder who noticed his goats becoming energetic after eating coffee cherries, which are technically a fruit!",
  },

  // =============================================
  // INDEX 48 - Shows Jan 16, 2026 at 7 PM
  // =============================================
  {
    category: "Weekend",
    puzzleNumber: 127,
    words: [
      { word: "HIKE", hint: "A long walk outdoors, often on trails or in nature", revealedIndex: 0 },
      { word: "MOVIE", hint: "A film you watch at the theater or at home", revealedIndex: 2 },
      { word: "SPORTS", hint: "Athletic activities like basketball, soccer, or tennis", revealedIndex: 3 },
      { word: "EXPLORE", hint: "To travel and discover new places or things", revealedIndex: 0 },
      { word: "RECREATION", hint: "Activities done for enjoyment during free time", revealedIndex: 4 },
    ],
    funFact: "The word 'weekend' first popped up in the late 1600s, when it literally meant the end of the week. But by the late 1800s, people started using it to mean Saturday and Sunday!",
  },

  // =============================================
  // INDEX 49 - Shows Jan 17, 2026 at 7 PM
  // =============================================
  {
    category: "Bookstore",
    puzzleNumber: 128,
    words: [
      { word: "PAGE", hint: "A single sheet in a book", revealedIndex: 0 },
      { word: "NOVEL", hint: "A long fictional story in book form", revealedIndex: 2 },
      { word: "POETRY", hint: "Written verses expressing emotions and ideas", revealedIndex: 3 },
      { word: "JOURNAL", hint: "A book for writing personal thoughts or records", revealedIndex: 0 },
      { word: "TEXTBOOK", hint: "An educational book used for studying a subject", revealedIndex: 4 },
    ],
    funFact: "Visiting bookstores can inspire creativity and spark new ideas! 📚",
  },

  // =============================================
  // INDEX 50 - Shows Jan 18, 2026 at 7 PM
  // =============================================
  {
    category: "Martin Luther King Jr.",
    puzzleNumber: 129,
    words: [
      { word: "FREE", hint: "Not held captive or restricted", revealedIndex: 0 },
      { word: "MARCH", hint: "To walk together in protest or celebration", revealedIndex: 2 },
      { word: "PEACE", hint: "Freedom from conflict or disturbance", revealedIndex: 3 },
      { word: "FREEDOM", hint: "The state of being free from oppression", revealedIndex: 0 },
      { word: "SPEAKER", hint: "Someone who delivers speeches to an audience", revealedIndex: 4 },
    ],
    funFact: "Martin Luther King Jr. was a brilliant student who entered college at 15. He won the Nobel Peace Prize at age 35, the youngest recipient at the time.",
  },

  // =============================================
  // INDEX 51 - Shows Jan 19, 2026 at 7 PM
  // =============================================
  {
    category: "Collegiate",
    puzzleNumber: 130,
    words: [
      { word: "DORM", hint: "A residence hall where students live on campus", revealedIndex: 0 },
      { word: "STUDY", hint: "To learn and review material for classes", revealedIndex: 2 },
      { word: "CAMPUS", hint: "The grounds and buildings of a college", revealedIndex: 3 },
      { word: "LECTURE", hint: "A talk given by a professor to students", revealedIndex: 0 },
      { word: "GRADUATE", hint: "To complete a degree and receive a diploma", revealedIndex: 4 },
    ],
    funFact: "Southampton College had Kermit the Frog as a commencement speaker in 1996! Oberlin College students can rent original paintings by masters like Picasso for just $5 a semester.",
  },

  // =============================================
  // INDEX 52 - Shows Jan 20, 2026 at 7 PM
  // =============================================
  {
    category: "Bread",
    puzzleNumber: 131,
    words: [
      { word: "RISE", hint: "What dough does when yeast activates", revealedIndex: 0 },
      { word: "CRUST", hint: "The golden outer layer of a baked loaf", revealedIndex: 2 },
      { word: "CRUMBY", hint: "Full of small dry pieces that break off", revealedIndex: 3 },
      { word: "BUTTERY", hint: "Rich and smooth like melted spread", revealedIndex: 0 },
      { word: "SANDWICH", hint: "Two slices with fillings in between", revealedIndex: 4 },
    ],
    funFact: "Ancient Egyptians used bread as money! A rolled-up piece of white bread served as a rudimentary eraser for graphite pencils before the invention of rubber erasers!",
  },

  // =============================================
  // INDEX 53 - Shows Jan 21, 2026 at 7 PM
  // =============================================
  {
    category: "Detective",
    puzzleNumber: 132,
    words: [
      { word: "PIPE", hint: "A smoking accessory associated with Sherlock Holmes", revealedIndex: 0 },
      { word: "SOLVE", hint: "To find the answer to a mystery or problem", revealedIndex: 2 },
      { word: "DETAIL", hint: "A small but important piece of information", revealedIndex: 3 },
      { word: "MYSTERY", hint: "Something unknown that needs to be figured out", revealedIndex: 0 },
      { word: "SHERLOCK", hint: "Famous fictional detective created by Arthur Conan Doyle", revealedIndex: 4 },
    ],
    funFact: "The term 'detective' was not in common use until a crime writer invented it less than two centuries ago.",
  },

  // =============================================
  // INDEX 54 - Shows Jan 22, 2026 at 7 PM
  // =============================================
  {
    category: "Skygazing",
    puzzleNumber: 133,
    words: [
      { word: "STAR", hint: "A bright point of light in the night sky", revealedIndex: 0 },
      { word: "CLOUD", hint: "A white or gray mass floating in the sky", revealedIndex: 2 },
      { word: "SUNSET", hint: "When the sun dips below the horizon in the evening", revealedIndex: 3 },
      { word: "MOONLIT", hint: "Illuminated by the glow of the moon", revealedIndex: 0 },
      { word: "DARKNESS", hint: "The absence of light in the night sky", revealedIndex: 4 },
    ],
    funFact: "On a clear day, the sky appears blue because air molecules scatter sunlight in an effect known as Rayleigh Scattering. Blue light scatters more efficiently than red light!",
  },

  // =============================================
  // INDEX 55 - Shows Jan 23, 2026 at 7 PM
  // =============================================
  {
    category: "Lakehouse",
    puzzleNumber: 134,
    words: [
      { word: "FISH", hint: "Aquatic creatures you might catch from the dock", revealedIndex: 0 },
      { word: "CANOE", hint: "A narrow boat you paddle through the water", revealedIndex: 2 },
      { word: "SNOOZE", hint: "To take a lazy afternoon nap", revealedIndex: 3 },
      { word: "BONFIRE", hint: "An outdoor fire for warmth and gathering", revealedIndex: 0 },
      { word: "HAMMOCK", hint: "A swinging bed hung between two trees", revealedIndex: 4 },
    ],
    funFact: "The Great Lakes hold 21% of the world's freshwater!",
  },

  // =============================================
  // INDEX 56 - Shows Jan 24, 2026 at 7 PM
  // =============================================
  {
    category: "Pie",
    puzzleNumber: 135,
    words: [
      { word: "ROLL", hint: "To flatten dough with a cylindrical tool", revealedIndex: 0 },
      { word: "FRUIT", hint: "A sweet filling made from apples, berries, or cherries", revealedIndex: 2 },
      { word: "PASTRY", hint: "A baked dough used for crusts and shells", revealedIndex: 3 },
      { word: "FILLING", hint: "The sweet or savory mixture inside a crust", revealedIndex: 0 },
      { word: "MERINGUE", hint: "A fluffy topping made from whipped egg whites and sugar", revealedIndex: 4 },
    ],
    funFact: "Over 186 million pies are sold in U.S. grocery stores annually, with apple, pumpkin, and cherry being top favorites! 🥧",
  },

  // =============================================
  // INDEX 57 - Shows Jan 25, 2026 at 7 PM
  // =============================================
  {
    category: "Snacking",
    puzzleNumber: 136,
    words: [
      { word: "NOSH", hint: "To eat snacks or light bites between meals", revealedIndex: 0 },
      { word: "GRAZE", hint: "To eat small amounts throughout the day", revealedIndex: 2 },
      { word: "MORSEL", hint: "A small piece or bite of food", revealedIndex: 3 },
      { word: "MUNCHIE", hint: "A craving for something to snack on", revealedIndex: 0 },
      { word: "NIBBLING", hint: "Eating in small, delicate bites", revealedIndex: 4 },
    ],
    funFact: "Potato chips were invented in 1853 by Chef George Crum in Saratoga Springs, NY, after a customer complained fries were too thick. Crum sliced potatoes paper-thin and fried them crispy!",
  },

  // =============================================
  // INDEX 58 - Shows Jan 26, 2026 at 7 PM
  // =============================================
  {
    category: "Chocolate",
    puzzleNumber: 137,
    words: [
      { word: "DARK", hint: "A rich, intense variety with less sugar", revealedIndex: 0 },
      { word: "FUDGE", hint: "A soft, dense confection often made with cocoa", revealedIndex: 2 },
      { word: "FLAVOR", hint: "The distinctive taste of a food or drink", revealedIndex: 3 },
      { word: "VELVETY", hint: "Smooth and rich in texture", revealedIndex: 0 },
      { word: "DECADENT", hint: "Luxuriously rich and indulgent", revealedIndex: 4 },
    ],
    funFact: "Chocolate cake's history traces back to the 18th century when grinding cocoa beans became feasible, with the first recipe appearing in 1847. 🍫",
  },

  // =============================================
  // INDEX 59 - Shows Jan 27, 2026 at 7 PM
  // =============================================
  {
    category: "Tablet",
    puzzleNumber: 138,
    words: [
      { word: "SURF", hint: "To browse the internet casually", revealedIndex: 0 },
      { word: "GAMES", hint: "Digital entertainment apps you play", revealedIndex: 2 },
      { word: "STYLUS", hint: "A pen-like tool for touchscreen writing", revealedIndex: 3 },
      { word: "CHARGER", hint: "A device that replenishes battery power", revealedIndex: 0 },
      { word: "SHOPPING", hint: "Buying things online with a tap", revealedIndex: 4 },
    ],
    funFact: "The GridPad, released in 1989 by Grid Systems, is considered the first commercially successful tablet computer, though it weighed 4.5 pounds and used a stylus!",
  },

  // =============================================
  // INDEX 60 - Shows Jan 28, 2026 at 7 PM
  // =============================================
  {
    category: "Artwork",
    puzzleNumber: 139,
    words: [
      { word: "FILM", hint: "A motion picture or the material used in old cameras", revealedIndex: 0 },
      { word: "PRINT", hint: "A reproduction of an image on paper", revealedIndex: 2 },
      { word: "CANVAS", hint: "A fabric surface for painting", revealedIndex: 3 },
      { word: "TINTYPE", hint: "An old photographic technique on metal plates", revealedIndex: 0 },
      { word: "PAINTING", hint: "A picture created with brushes and pigments", revealedIndex: 4 },
    ],
    funFact: "Vincent van Gogh only sold one painting during his lifetime.",
  },

  // =============================================
  // INDEX 61 - Shows Jan 29, 2026 at 7 PM
  // =============================================
  {
    category: "Run",
    puzzleNumber: 140,
    words: [
      { word: "DASH", hint: "A quick, short burst of speed", revealedIndex: 0 },
      { word: "TRAIN", hint: "To practice and prepare for a race", revealedIndex: 2 },
      { word: "SPRINT", hint: "Running at top speed for a short distance", revealedIndex: 3 },
      { word: "HYDRATE", hint: "To drink water and replenish fluids", revealedIndex: 0 },
      { word: "MARATHON", hint: "A long-distance race of 26.2 miles", revealedIndex: 4 },
    ],
    funFact: "In the Victorian era, some runners would drink champagne as an energy drink, a practice now known to be counterproductive!",
  },

  // =============================================
  // INDEX 62 - Shows Jan 30, 2026 at 7 PM
  // =============================================
  {
    category: "Furnishings",
    puzzleNumber: 141,
    words: [
      { word: "SOFA", hint: "A long upholstered seat for multiple people", revealedIndex: 0 },
      { word: "CHAIR", hint: "A seat with a back for one person", revealedIndex: 2 },
      { word: "CANOPY", hint: "A fabric covering over a bed frame", revealedIndex: 3 },
      { word: "OTTOMAN", hint: "A cushioned footstool or storage seat", revealedIndex: 0 },
      { word: "LOVESEAT", hint: "A small sofa designed for two people", revealedIndex: 4 },
    ],
    funFact: "Winged-back chairs were originally designed with 'wings' to keep people warm by blocking drafts!",
  },

  // =============================================
  // INDEX 63 - Shows Jan 31, 2026 at 7 PM
  // =============================================
  {
    category: "Swimming",
    puzzleNumber: 142,
    words: [
      { word: "POOL", hint: "A man-made body of water for swimming", revealedIndex: 0 },
      { word: "DIVER", hint: "Someone who plunges headfirst into water", revealedIndex: 2 },
      { word: "STROKE", hint: "A style of arm and leg movement in water", revealedIndex: 3 },
      { word: "SWIMMER", hint: "A person who moves through water", revealedIndex: 0 },
      { word: "PADDLING", hint: "Moving hands and feet gently in water", revealedIndex: 4 },
    ],
    funFact: "The oldest known evidence of swimming dates back to 2500 BC, with drawings from ancient Egypt!",
  },

  // =============================================
  // INDEX 64 - Shows Feb 1, 2026 at 7 PM
  // =============================================
  {
    category: "Groundhog",
    puzzleNumber: 143,
    words: [
      { word: "PHIL", hint: "The famous furry forecaster from Punxsutawney", revealedIndex: 0 },
      { word: "SPRING", hint: "The warm season that may arrive early or late", revealedIndex: 2 },
      { word: "WINTER", hint: "The cold season that might stick around six more weeks", revealedIndex: 3 },
      { word: "SHADOW", hint: "What the critter sees that determines his prediction", revealedIndex: 0 },
      { word: "FORECAST", hint: "A prediction about future weather conditions", revealedIndex: 4 },
    ],
    funFact: "The predicting groundhog is called a prognosticator, a term for someone who foretells future events. Despite the hype, Phil's predictions are only correct about 39% of the time, which is statistically worse than a coin flip. 🦫",
  },

  // =============================================
  // INDEX 65 - Shows Feb 2, 2026 at 7 PM
  // =============================================
  {
    category: "Mardi Gras",
    puzzleNumber: 144,
    words: [
      { word: "GOLD", hint: "One of the iconic colors representing power", revealedIndex: 0 },
      { word: "GREEN", hint: "One of the iconic colors representing faith", revealedIndex: 2 },
      { word: "PURPLE", hint: "One of the iconic colors representing justice", revealedIndex: 3 },
      { word: "PARADES", hint: "Festive processions with floats and marching bands", revealedIndex: 0 },
      { word: "CARNIVAL", hint: "A season of festivities before Lent begins", revealedIndex: 4 },
    ],
    funFact: "Famously celebrated in New Orleans but also globally, Mardi Gras features secret societies, or Krewes, and iconic colors: purple symbolizes justice, gold stands for power, and green represents faith. 🎭",
  },

  // =============================================
  // INDEX 66 - Shows Feb 3, 2026 at 7 PM
  // =============================================
  {
    category: "Going to the Movies",
    puzzleNumber: 145,
    words: [
      { word: "SHOW", hint: "A scheduled screening at the theater", revealedIndex: 0 },
      { word: "FLICK", hint: "A casual term for a film or movie", revealedIndex: 2 },
      { word: "SCREEN", hint: "The large surface where images are projected", revealedIndex: 3 },
      { word: "PICTURE", hint: "Another word for a motion picture or film", revealedIndex: 0 },
      { word: "ANIMATED", hint: "A type of film made with drawings or computer graphics", revealedIndex: 4 },
    ],
    funFact: "Many modern theaters make more money from popcorn than from ticket sales, even though the popcorn costs more per ounce than a filet mignon. 🎬",
  },

  // =============================================
  // INDEX 67 - Shows Feb 4, 2026 at 7 PM
  // =============================================
  {
    category: "On the Table",
    puzzleNumber: 146,
    words: [
      { word: "BOWL", hint: "A deep, rounded dish for soup or cereal", revealedIndex: 0 },
      { word: "PLATE", hint: "A flat dish for serving a main course", revealedIndex: 2 },
      { word: "SAUCER", hint: "A small shallow dish that goes under a cup", revealedIndex: 3 },
      { word: "PLATTER", hint: "A large serving dish for meats or appetizers", revealedIndex: 0 },
      { word: "PLACEMAT", hint: "A protective mat placed under a table setting", revealedIndex: 4 },
    ],
    funFact: "To remember the placement of the bread plate and dessert, make a lowercase 'b' with your left hand and 'd' with your right by touching your thumb and index finger. The 'b' is for the bread plate on the left, and the 'd' is for dessert on the right. 🍽️",
  },

  // =============================================
  // INDEX 68 - Shows Feb 5, 2026 at 7 PM
  // =============================================
  {
    category: "Frozen",
    puzzleNumber: 147,
    words: [
      { word: "COLD", hint: "Having a low temperature", revealedIndex: 0 },
      { word: "POLAR", hint: "Relating to the icy regions near the North or South Pole", revealedIndex: 2 },
      { word: "ARCTIC", hint: "The frigid region surrounding the North Pole", revealedIndex: 3 },
      { word: "BITING", hint: "Describes a sharp, piercing chill in the air", revealedIndex: 0 },
      { word: "FREEZING", hint: "Extremely cold, at or below 32 degrees Fahrenheit", revealedIndex: 4 },
    ],
    funFact: "While you might think it's cold, Earth is actually closest to the sun during the Northern Hemisphere's winter. ❄️",
  },

  // =============================================
  // INDEX 69 - Shows Feb 6, 2026 at 7 PM
  // =============================================
  {
    category: "Tea",
    puzzleNumber: 148,
    words: [
      { word: "BREW", hint: "To prepare by soaking in hot water", revealedIndex: 0 },
      { word: "STEEP", hint: "To soak leaves in hot water to extract flavor", revealedIndex: 2 },
      { word: "KETTLE", hint: "A container used to boil water", revealedIndex: 3 },
      { word: "INFUSER", hint: "A device that holds loose leaves while they soak", revealedIndex: 0 },
      { word: "STRAINER", hint: "A tool used to filter out leaves from the liquid", revealedIndex: 4 },
    ],
    funFact: "According to legend, Chinese Emperor Shennong discovered tea in 2737 BC when leaves from a wild tree accidentally fell into his pot of boiling water. 🫖",
  },

  // =============================================
  // INDEX 70 - Shows Feb 7, 2026 at 7 PM
  // =============================================
  {
    category: "Crafting",
    puzzleNumber: 149,
    words: [
      { word: "ARTS", hint: "Creative activities involving skill and imagination", revealedIndex: 0 },
      { word: "HOBBY", hint: "A leisure activity done for enjoyment", revealedIndex: 2 },
      { word: "CREATE", hint: "To make or bring something into existence", revealedIndex: 3 },
      { word: "DESIGN", hint: "To plan and make something with purpose", revealedIndex: 0 },
      { word: "SKILLFUL", hint: "Having or showing expertise and ability", revealedIndex: 4 },
    ],
    funFact: "Historically, the word 'craft' comes from an Old English word meaning 'skill or strength'. 🎨",
  },

  // =============================================
  // INDEX 71 - Shows Feb 8, 2026 at 7 PM
  // =============================================
  {
    category: "Farm",
    puzzleNumber: 150,
    words: [
      { word: "CROP", hint: "Plants grown for food or profit", revealedIndex: 0 },
      { word: "RURAL", hint: "Relating to the countryside rather than the city", revealedIndex: 2 },
      { word: "CATTLE", hint: "Cows and bulls", revealedIndex: 3 },
      { word: "TRACTOR", hint: "A powerful vehicle used for pulling farm equipment", revealedIndex: 0 },
      { word: "IRRIGATE", hint: "To supply land with water for growing crops", revealedIndex: 4 },
    ],
    funFact: "The average ear of corn has 800 kernels, and it's common for the rows to be an even number, often 16. 🌽",
  },

  // =============================================
  // INDEX 72 - Shows Feb 9, 2026 at 7 PM
  // =============================================
  {
    category: "Sunny",
    puzzleNumber: 151,
    words: [
      { word: "BEAM", hint: "A ray or shaft of light", revealedIndex: 0 },
      { word: "SOLAR", hint: "Relating to or derived from the sun", revealedIndex: 2 },
      { word: "GOLDEN", hint: "A warm, bright yellow color like sunshine", revealedIndex: 3 },
      { word: "GLARING", hint: "Shining with a harsh, dazzling light", revealedIndex: 0 },
      { word: "DAYLIGHT", hint: "The natural light of the sun during the day", revealedIndex: 4 },
    ],
    funFact: "The Sun's diameter is about 865,370 miles, meaning over one million Earths could fit inside it. ☀️",
  },

  // =============================================
  // INDEX 73 - Shows Feb 10, 2026 at 7 PM
  // =============================================
  {
    category: "Computer",
    puzzleNumber: 152,
    words: [
      { word: "APPS", hint: "Software programs designed for specific tasks", revealedIndex: 0 },
      { word: "MOUSE", hint: "A handheld device used to move a cursor", revealedIndex: 2 },
      { word: "SCREEN", hint: "The display surface where images appear", revealedIndex: 3 },
      { word: "PROGRAMS", hint: "Sets of instructions that tell a computer what to do", revealedIndex: 0 },
      { word: "KEYBOARD", hint: "A panel of keys used for typing", revealedIndex: 4 },
    ],
    funFact: "In 1947, engineers found a moth stuck in a relay of the Harvard Mark II computer, causing a malfunction. They literally 'debugged' the machine by removing the insect, coining the term. 🐛",
  },

  // =============================================
  // INDEX 74 - Shows Feb 11, 2026 at 7 PM
  // =============================================
  {
    category: "Lincoln",
    puzzleNumber: 153,
    words: [
      { word: "TALL", hint: "Having great height", revealedIndex: 0 },
      { word: "CABIN", hint: "A small rustic dwelling made of logs", revealedIndex: 2 },
      { word: "HONEST", hint: "Truthful and sincere, a famous nickname", revealedIndex: 3 },
      { word: "DEBATER", hint: "One who argues or discusses opposing viewpoints", revealedIndex: 0 },
      { word: "WRESTLER", hint: "One who competes in a grappling sport", revealedIndex: 4 },
    ],
    funFact: "Abraham Lincoln was the tallest U.S. President (6'4\"), the only President with a patent (for a boat lifter!), a gifted wrestler, a cat lover who held seances, and a prolific storyteller who stored documents in his top hat, but he had no middle name and lost many early elections before becoming president. 🎩",
  },

  // =============================================
  // INDEX 75 - Shows Feb 12, 2026 at 7 PM
  // =============================================
  {
    category: "Library",
    puzzleNumber: 154,
    words: [
      { word: "CARD", hint: "An item used to borrow books and materials", revealedIndex: 0 },
      { word: "STUDY", hint: "To read and learn about a subject", revealedIndex: 2 },
      { word: "GOOGLE", hint: "A popular search engine for finding information", revealedIndex: 3 },
      { word: "ARCHIVE", hint: "A collection of historical documents or records", revealedIndex: 0 },
      { word: "RESEARCH", hint: "The systematic investigation of a topic", revealedIndex: 4 },
    ],
    funFact: "Libraries are more than just books, with some loaning items like fishing poles or cake pans, and the largest one, the Library of Congress, has over 160 million items on 838 miles of shelves. 📚",
  },

  // =============================================
  // INDEX 76 - Shows Feb 13, 2026 at 7 PM
  // =============================================
  {
    category: "Romance",
    puzzleNumber: 155,
    words: [
      { word: "LOVE", hint: "A deep affection for someone special", revealedIndex: 0 },
      { word: "SWEET", hint: "Endearing, kind, or sugary", revealedIndex: 2 },
      { word: "WARMTH", hint: "A feeling of affection or coziness", revealedIndex: 3 },
      { word: "PASSION", hint: "Intense emotion or strong feeling", revealedIndex: 0 },
      { word: "DEVOTION", hint: "Loyal commitment and deep love", revealedIndex: 4 },
    ],
    funFact: "Romance novels consistently rank as the best-selling fiction books and generate over a billion dollars in annual sales. 💕",
  },

  // =============================================
  // INDEX 77 - Shows Feb 14, 2026 at 7 PM
  // =============================================
  {
    category: "Horses",
    puzzleNumber: 156,
    words: [
      { word: "SHOE", hint: "A metal plate on a hoof for protection", revealedIndex: 0 },
      { word: "STABLE", hint: "A building where horses are kept", revealedIndex: 2 },
      { word: "SADDLE", hint: "A seat fastened on a horse's back for riding", revealedIndex: 3 },
      { word: "FARRIER", hint: "A specialist who trims hooves and fits horseshoes", revealedIndex: 0 },
      { word: "DRESSAGE", hint: "An equestrian sport of precise, controlled movements", revealedIndex: 4 },
    ],
    funFact: "A horse needs to eat grass or hay for about 16 hours a day and can drink up to 10 or more gallons of water daily, depending on climate. 🐴",
  },
];

// ===========================================
// ROTATION FUNCTION - Uses Anchor Date System
// ===========================================
export function getTodaysPuzzle() {
  // Get current time in EST
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  
  // Determine which "puzzle day" we're in
  // Puzzle drops at 7 PM and stays live until next 7 PM
  const hour = estTime.getHours();
  const puzzleDate = new Date(estTime);
  puzzleDate.setHours(19, 0, 0, 0); // Set to 7 PM
  
  if (hour < 19) {
    // Before 7 PM - still showing yesterday's puzzle
    puzzleDate.setDate(puzzleDate.getDate() - 1);
  }
  // After 7 PM - puzzleDate is already correct (today at 7 PM)
  
  // Calculate days since anchor date
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysSinceAnchor = Math.floor((puzzleDate - ANCHOR_DATE) / msPerDay);
  
  // Calculate puzzle index (wrapping around the array)
  let puzzleIndex = daysSinceAnchor % puzzles.length;
  
  // Handle negative values (for dates before anchor - shouldn't happen in production)
  if (puzzleIndex < 0) {
    puzzleIndex += puzzles.length;
  }
  
  return puzzles[puzzleIndex];
}

export default puzzles;