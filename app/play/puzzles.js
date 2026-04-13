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
      { word: "DESIGNS", hint: "Plans and makes something with purpose", revealedIndex: 0 },
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
      { word: "PROGRAM", hint: "Set of instructions that tell a computer what to do", revealedIndex: 0 },
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

  // =============================================
  // INDEX 78 - Shows Feb 15, 2026 at 7 PM
  // =============================================
  {
    category: "U.S. Presidents",
    puzzleNumber: 157,
    words: [
      { word: "POLK", hint: "11th President who expanded U.S. territory westward", revealedIndex: 0 },
      { word: "ADAMS", hint: "A surname shared by the 2nd and 6th Presidents", revealedIndex: 2 },
      { word: "TRUMAN", hint: "33rd President who made the decision to use atomic weapons", revealedIndex: 3 },
      { word: "JOHNSON", hint: "A surname shared by the 17th and 36th Presidents", revealedIndex: 0 },
      { word: "ROOSEVELT", hint: "A surname shared by the 26th and 32nd Presidents", revealedIndex: 4 },
    ],
    funFact: "No U.S. President's last name starts with the letter 'S,' despite 'S' being the most common starting letter for English words. 🇺🇸",
  },

  // =============================================
  // INDEX 79 - Shows Feb 16, 2026 at 7 PM
  // =============================================
  {
    category: "Tater Tots",
    puzzleNumber: 158,
    words: [
      { word: "PUFF", hint: "To swell or expand with air", revealedIndex: 0 },
      { word: "CRUST", hint: "A crispy outer layer formed when cooked", revealedIndex: 2 },
      { word: "POTATO", hint: "The starchy vegetable these are made from", revealedIndex: 3 },
      { word: "COMFORT", hint: "A type of food that brings warmth and satisfaction", revealedIndex: 0 },
      { word: "CYLINDER", hint: "The classic shape of these bite-sized treats", revealedIndex: 4 },
    ],
    funFact: "Tater tots were invented in 1953 as a way to use up leftover potato scraps from making French fries. 🥔",
  },

  // =============================================
  // INDEX 80 - Shows Feb 17, 2026 at 7 PM
  // =============================================
  {
    category: "Full Moon",
    puzzleNumber: 159,
    words: [
      { word: "TIDE", hint: "The rise and fall of ocean water influenced by lunar gravity", revealedIndex: 0 },
      { word: "LUNAR", hint: "Relating to the moon", revealedIndex: 2 },
      { word: "APOLLO", hint: "NASA's program that landed humans on the moon", revealedIndex: 3 },
      { word: "ECLIPSE", hint: "When Earth's shadow blocks sunlight from reaching the moon", revealedIndex: 0 },
      { word: "SATELLITE", hint: "A natural or artificial body orbiting a planet", revealedIndex: 4 },
    ],
    funFact: "A full moon occurs approximately every 29.5 days when the moon is opposite the Sun, appearing fully illuminated from Earth. It does not produce its own light, but rather reflects sunlight, and it always rises at sunset. 🌕",
  },

  // =============================================
  // INDEX 81 - Shows Feb 18, 2026 at 7 PM
  // =============================================
  {
    category: "Birds",
    puzzleNumber: 160,
    words: [
      { word: "HAWK", hint: "A bird of prey known for sharp eyesight and swift diving", revealedIndex: 0 },
      { word: "ROBIN", hint: "A songbird with a red or orange breast", revealedIndex: 2 },
      { word: "PARROT", hint: "A colorful tropical bird known for mimicking speech", revealedIndex: 3 },
      { word: "PELICAN", hint: "A large waterbird with a pouch under its bill", revealedIndex: 0 },
      { word: "PHEASANT", hint: "A game bird with colorful plumage, often hunted", revealedIndex: 4 },
    ],
    funFact: "Birds are modern-day dinosaurs, with roughly 10,000 species that all share the unique trait of having feathers. 🐦",
  },

  // =============================================
  // INDEX 82 - Shows Feb 19, 2026 at 7 PM
  // =============================================
  {
    category: "Carrot Cake",
    puzzleNumber: 161,
    words: [
      { word: "RICH", hint: "Having a deep, full flavor or texture", revealedIndex: 0 },
      { word: "ICING", hint: "A sweet topping spread on cakes, often cream cheese", revealedIndex: 2 },
      { word: "NUTMEG", hint: "A warm spice often used in baking", revealedIndex: 3 },
      { word: "RAISINS", hint: "Dried grapes sometimes added for sweetness", revealedIndex: 0 },
      { word: "CINNAMON", hint: "A fragrant spice from tree bark used in desserts", revealedIndex: 4 },
    ],
    funFact: "Carrot cake has a surprisingly long history, with roots in the Middle Ages when sweeteners were scarce and expensive. 🥕",
  },

  // =============================================
  // INDEX 83 - Shows Feb 20, 2026 at 7 PM
  // =============================================
  {
    category: "Guitar",
    puzzleNumber: 162,
    words: [
      { word: "PICK", hint: "A small flat tool used to pluck strings", revealedIndex: 0 },
      { word: "STRUM", hint: "To brush fingers across strings to make chords", revealedIndex: 2 },
      { word: "STRING", hint: "A thin cord stretched across the instrument to produce sound", revealedIndex: 3 },
      { word: "AMPLIFY", hint: "To increase the volume of sound electronically", revealedIndex: 0 },
      { word: "ACOUSTIC", hint: "A type that produces sound naturally without electronics", revealedIndex: 4 },
    ],
    funFact: "Guitars, with a 3,500-year history tracing back to ancient Egypt and Persia, are the world's most popular instrument. 🎸",
  },

  // =============================================
  // INDEX 84 - Shows Feb 21, 2026 at 7 PM
  // =============================================
  {
    category: "Washington",
    puzzleNumber: 163,
    words: [
      { word: "ARMY", hint: "The military branch he commanded during the Revolution", revealedIndex: 0 },
      { word: "FIRST", hint: "His position in the line of U.S. Presidents", revealedIndex: 2 },
      { word: "FARMER", hint: "His occupation at Mount Vernon", revealedIndex: 3 },
      { word: "FOUNDER", hint: "One who establishes something, like a nation", revealedIndex: 0 },
      { word: "DELAWARE", hint: "The river he famously crossed on Christmas night", revealedIndex: 4 },
    ],
    funFact: "George Washington was a self-taught, tall, skilled dancer and savvy businessman who ran America's largest whiskey distillery, was a master spy leader, and never lived in the White House. 🇺🇸",
  },
  // =============================================
  // INDEX 85 - Shows Feb 22, 2026 at 7 PM
  // =============================================
  {
    category: "Horses",
    puzzleNumber: 164,
    words: [
      { word: "FOAL", hint: "A baby horse under one year old", revealedIndex: 0 },
      { word: "FILLY", hint: "A young female horse", revealedIndex: 2 },
      { word: "EQUINE", hint: "Relating to or affecting horses", revealedIndex: 3 },
      { word: "MUSTANG", hint: "A free-roaming wild horse of the American West", revealedIndex: 0 },
      { word: "STALLION", hint: "An adult male horse used for breeding", revealedIndex: 4 },
    ],
    funFact: "Horses are social herd animals with excellent long-term memories and can sleep both standing up and lying down. 🐴",
  },

  // =============================================
  // INDEX 86 - Shows Feb 23, 2026 at 7 PM
  // =============================================
  {
    category: "Chinese New Year",
    puzzleNumber: 165,
    words: [
      { word: "JADE", hint: "A precious green stone symbolizing purity and wisdom", revealedIndex: 0 },
      { word: "HORSE", hint: "The zodiac animal for 2026", revealedIndex: 2 },
      { word: "ORANGE", hint: "A fruit representing good luck and prosperity", revealedIndex: 3 },
      { word: "EMPEROR", hint: "An ancient ruler of China", revealedIndex: 0 },
      { word: "ENVELOPE", hint: "A red packet containing money given as a gift", revealedIndex: 4 },
    ],
    funFact: "Chinese New Year in 2026 fell on Tuesday, February 17th, marking the start of the Year of the Fire Horse. The celebration, known as the Spring Festival, lasts 16 days, culminating in the Lantern Festival on March 3rd. It is a time for family reunions, red decorations, and fireworks, symbolizing momentum, ambition, and strength. 🧧",
  },

  // =============================================
  // INDEX 87 - Shows Feb 24, 2026 at 7 PM
  // =============================================
  {
    category: "Alaska",
    puzzleNumber: 166,
    words: [
      { word: "BEAR", hint: "A large mammal common in the wilderness", revealedIndex: 0 },
      { word: "MOOSE", hint: "The largest member of the deer family", revealedIndex: 2 },
      { word: "MUKLUK", hint: "A soft boot traditionally worn by Arctic peoples", revealedIndex: 3 },
      { word: "GLACIER", hint: "A massive body of slow-moving ice", revealedIndex: 0 },
      { word: "BOREALIS", hint: "The northern lights, or aurora", revealedIndex: 4 },
    ],
    funFact: "Alaska is the largest U.S. state, twice the size of Texas, yet holds the lowest population density, with over 3 million lakes and 100,000+ glaciers. 🏔️",
  },

  // =============================================
  // INDEX 88 - Shows Feb 25, 2026 at 7 PM
  // =============================================
  {
    category: "Frogurt",
    puzzleNumber: 167,
    words: [
      { word: "TART", hint: "Having a sharp, tangy taste", revealedIndex: 0 },
      { word: "FRUIT", hint: "A popular topping like strawberries or mango", revealedIndex: 2 },
      { word: "FLAVOR", hint: "The distinctive taste of a food", revealedIndex: 3 },
      { word: "REFRESH", hint: "To cool down or revive", revealedIndex: 0 },
      { word: "TOPPINGS", hint: "Extras added on top like sprinkles or nuts", revealedIndex: 4 },
    ],
    funFact: "Frozen yogurt isn't just yogurt that's been frozen; it is made by adding live cultures to milk and mixing in air while it freezes to prevent large ice crystals, resulting in a creamy texture. 🍦",
  },

  // =============================================
  // INDEX 89 - Shows Feb 26, 2026 at 7 PM
  // =============================================
  {
    category: "Opera",
    puzzleNumber: 168,
    words: [
      { word: "ARIA", hint: "A solo song performed by a single voice", revealedIndex: 0 },
      { word: "TENOR", hint: "A high adult male singing voice", revealedIndex: 2 },
      { word: "CHORUS", hint: "A group of singers performing together", revealedIndex: 3 },
      { word: "SOPRANO", hint: "The highest female singing voice", revealedIndex: 0 },
      { word: "BARITONE", hint: "A male voice between tenor and bass", revealedIndex: 4 },
    ],
    funFact: "Opera has a 400-year legacy, originating around 1600 as a fully sung dramatic form. Famous for high drama, it features intense, unamplified vocals that cut through orchestras. 🎭",
  },

  // =============================================
  // INDEX 90 - Shows Feb 27, 2026 at 7 PM
  // =============================================
  {
    category: "Radio",
    puzzleNumber: 169,
    words: [
      { word: "WAVE", hint: "An electromagnetic signal that carries sound", revealedIndex: 0 },
      { word: "TUNER", hint: "A device that selects a specific frequency", revealedIndex: 2 },
      { word: "SIGNAL", hint: "A transmitted broadcast picked up by receivers", revealedIndex: 3 },
      { word: "ANTENNA", hint: "A metal rod or dish that picks up transmissions", revealedIndex: 0 },
      { word: "RECEIVER", hint: "A device that captures and plays broadcasts", revealedIndex: 4 },
    ],
    funFact: "Radio is the oldest form of electronic communication, originating over 120 years ago, with waves that can travel forever through space. 📻",
  },

  // =============================================
  // INDEX 91 - Shows Feb 28, 2026 at 7 PM
  // =============================================
  {
    category: "Hippopotamus",
    puzzleNumber: 170,
    words: [
      { word: "YAWN", hint: "An open-mouthed display showing large teeth", revealedIndex: 0 },
      { word: "BLOAT", hint: "A group of hippos", revealedIndex: 2 },
      { word: "DANGER", hint: "A threat or risk, as these animals are quite aggressive", revealedIndex: 3 },
      { word: "RIVERBED", hint: "The bottom of a water channel where they walk", revealedIndex: 0 },
      { word: "BEHEMOTH", hint: "A huge creature, often used to describe these giants", revealedIndex: 4 },
    ],
    funFact: "Hippopotamuses are semi-aquatic giants that, despite spending up to 16 hours a day submerged, cannot actually swim or float, instead walking along riverbeds. They are surprisingly fast, reaching 22 mph on land, and produce their own red, antibiotic 'blood sweat' to protect skin from the sun. 🦛",
  },
  // =============================================
  // INDEX 92 - Shows Mar 1, 2026 at 7 PM
  // =============================================
  {
    category: "Compliments",
    puzzleNumber: 171,
    words: [
      { word: "WISH", hint: "A hope or desire for someone's happiness", revealedIndex: 0 },
      { word: "BOOST", hint: "To lift up or increase confidence", revealedIndex: 2 },
      { word: "MORALE", hint: "The spirit or confidence of a person or group", revealedIndex: 3 },
      { word: "GENUINE", hint: "Sincere and authentic, not fake", revealedIndex: 0 },
      { word: "POSITIVE", hint: "Optimistic and encouraging", revealedIndex: 4 },
    ],
    funFact: "Giving compliments can increase stress resilience and enhance personal well-being. For relationships to flourish, experts suggest that positive interactions, including compliments, should outnumber negative ones by more than five to one. 💬",
  },

  // =============================================
  // INDEX 93 - Shows Mar 2, 2026 at 7 PM
  // =============================================
  {
    category: "Dr. Seuss",
    puzzleNumber: 172,
    words: [
      { word: "EGGS", hint: "A breakfast food featured in a famous title with ham", revealedIndex: 0 },
      { word: "VERSE", hint: "Poetry or rhyming lines", revealedIndex: 2 },
      { word: "GRINCH", hint: "A green character who stole Christmas", revealedIndex: 3 },
      { word: "CARTOON", hint: "An animated drawing or illustration", revealedIndex: 0 },
      { word: "ARTISTIC", hint: "Creative and imaginative in style", revealedIndex: 4 },
    ],
    funFact: "Dr. Seuss wasn't a doctor, coined the word 'nerd,' and wrote Green Eggs and Ham when his editor bet him that he couldn't write a book using only 50 words. 📚",
  },

  // =============================================
  // INDEX 94 - Shows Mar 3, 2026 at 7 PM
  // =============================================
  {
    category: "Lions",
    puzzleNumber: 173,
    words: [
      { word: "LAZY", hint: "Resting often, as these cats sleep up to 20 hours a day", revealedIndex: 0 },
      { word: "PRIDE", hint: "A group of these big cats living together", revealedIndex: 2 },
      { word: "SOCIAL", hint: "Living and interacting with others in a group", revealedIndex: 3 },
      { word: "AFRICAN", hint: "The continent where most of these animals live", revealedIndex: 0 },
      { word: "MAJESTIC", hint: "Grand, impressive, and regal in appearance", revealedIndex: 4 },
    ],
    funFact: "Lions are the only truly social big cats, living in prides of up to 40 members, and are famously known as the 'king of the jungle' despite living in grasslands. 🦁",
  },

  // =============================================
  // INDEX 95 - Shows Mar 4, 2026 at 7 PM
  // =============================================
  {
    category: "Cheese Doodles",
    puzzleNumber: 174,
    words: [
      { word: "NEON", hint: "A bright, fluorescent color like orange", revealedIndex: 0 },
      { word: "SNACK", hint: "A small portion of food eaten between meals", revealedIndex: 2 },
      { word: "POWDER", hint: "A fine, dusty coating left on fingers", revealedIndex: 3 },
      { word: "CHEDDAR", hint: "A type of cheese used for flavoring", revealedIndex: 0 },
      { word: "CORNMEAL", hint: "Ground corn used as the base ingredient", revealedIndex: 4 },
    ],
    funFact: "Cheese Doodles stem from farm machinery accidentally puffing corn kernels and were perfected in the 1950s. Over 15 million pounds are produced annually with March 5 officially recognized as National Cheese Doodle Day. 🧀",
  },

  // =============================================
  // INDEX 96 - Shows Mar 5, 2026 at 7 PM
  // =============================================
  {
    category: "Cheesecake",
    puzzleNumber: 175,
    words: [
      { word: "SOUR", hint: "A type of cream used to add tanginess", revealedIndex: 0 },
      { word: "CRUST", hint: "The graham cracker base of the dessert", revealedIndex: 2 },
      { word: "CREAMY", hint: "Smooth and rich in texture", revealedIndex: 3 },
      { word: "CUSTARD", hint: "A thick, creamy mixture of eggs and cream", revealedIndex: 0 },
      { word: "HEAVENLY", hint: "Delightfully delicious, like paradise", revealedIndex: 4 },
    ],
    funFact: "Ancient Greek athletes were served cheesecake to boost their energy during the first Olympic Games. 🍰",
  },

  // =============================================
  // INDEX 97 - Shows Mar 6, 2026 at 7 PM
  // =============================================
  {
    category: "Next Window, Please",
    puzzleNumber: 176,
    words: [
      { word: "SODA", hint: "A fizzy carbonated beverage", revealedIndex: 0 },
      { word: "SHAKE", hint: "A thick, blended ice cream drink", revealedIndex: 2 },
      { word: "BURGER", hint: "A sandwich with a ground beef patty", revealedIndex: 3 },
      { word: "KETCHUP", hint: "A tomato-based condiment for fries", revealedIndex: 0 },
      { word: "PICKLES", hint: "Tangy cucumber slices on a sandwich", revealedIndex: 4 },
    ],
    funFact: "Fast food is full of surprising history, from White Castle being the first chain (1921) and Wendy's inventing the drive-thru (1970) to Taco Bell starting as a hot dog stand before focusing on tacos, while globally, KFC is a Christmas tradition in Japan thanks to clever marketing, and Pizza Hut once delivered to space, showing how these quick meals have quirky origins and global reach. 🍔",
  },

  // =============================================
  // INDEX 98 - Shows Mar 7, 2026 at 7 PM
  // =============================================
  {
    category: "Women's Day",
    puzzleNumber: 177,
    words: [
      { word: "BOLD", hint: "Courageous and daring", revealedIndex: 0 },
      { word: "HONOR", hint: "To show respect and recognition", revealedIndex: 2 },
      { word: "RIGHTS", hint: "Freedoms and entitlements for all people", revealedIndex: 3 },
      { word: "JUSTICE", hint: "Fairness and equality under the law", revealedIndex: 0 },
      { word: "STRENGTH", hint: "Power, courage, and determination", revealedIndex: 4 },
    ],
    funFact: "The first International Women's Day was held in Austria, Denmark, Germany, and Switzerland on March 19, 1911 with over 1 million people attending rallies. 💪",
  },
  // =============================================
  // INDEX 99 - Shows Mar 8, 2026 at 7 PM
  // =============================================
  {
    category: "Sticky Bun",
    puzzleNumber: 178,
    words: [
      { word: "NUTS", hint: "Crunchy toppings like pecans or walnuts", revealedIndex: 0 },
      { word: "GOOEY", hint: "Soft, sticky, and deliciously messy", revealedIndex: 2 },
      { word: "SPIRAL", hint: "A coiled or rolled shape", revealedIndex: 3 },
      { word: "CARAMEL", hint: "A sweet, buttery topping made from sugar", revealedIndex: 0 },
      { word: "INVERTED", hint: "Flipped upside down when served", revealedIndex: 4 },
    ],
    funFact: "Associated with breakfast or dessert, they are commonly linked to terms like cinnamon rolls, caramel rolls, Schnecken (German origin), monkey bread, and, in the UK/Canada, Chelsea buns. 🥐",
  },

  // =============================================
  // INDEX 100 - Shows Mar 9, 2026 at 7 PM
  // =============================================
  {
    category: "Brown Bag",
    puzzleNumber: 179,
    words: [
      { word: "PREP", hint: "To prepare food in advance", revealedIndex: 0 },
      { word: "LUNCH", hint: "A midday meal", revealedIndex: 2 },
      { word: "NAPKIN", hint: "A cloth or paper for wiping hands and face", revealedIndex: 3 },
      { word: "THERMOS", hint: "An insulated container to keep drinks hot or cold", revealedIndex: 0 },
      { word: "CONTENTS", hint: "What's inside the bag", revealedIndex: 4 },
    ],
    funFact: "Packing your lunch dates back to the 1800s using tobacco tins, with the first official, thermos-equipped lunch box appearing in the 1920s. Modern packed lunches save money (potentially $800+ annually) and reduce waste, as average school lunches create 67 pounds of trash yearly. The first character-themed lunchbox featured Mickey Mouse. 🥪",
  },

  // =============================================
  // INDEX 101 - Shows Mar 10, 2026 at 7 PM
  // =============================================
  {
    category: "Asleep",
    puzzleNumber: 180,
    words: [
      { word: "CONK", hint: "To fall asleep suddenly", revealedIndex: 0 },
      { word: "CRASH", hint: "To collapse into sleep from exhaustion", revealedIndex: 2 },
      { word: "CATNAP", hint: "A short, light sleep", revealedIndex: 3 },
      { word: "SLUMBER", hint: "A peaceful, restful sleep", revealedIndex: 0 },
      { word: "DREAMING", hint: "Experiencing images and stories while sleeping", revealedIndex: 4 },
    ],
    funFact: "Roughly 95% of all dreams are forgotten by the time a person wakes up. 😴",
  },

  // =============================================
  // INDEX 102 - Shows Mar 11, 2026 at 7 PM
  // =============================================
  {
    category: "Plant a Flower",
    puzzleNumber: 181,
    words: [
      { word: "SEED", hint: "The tiny beginning of a plant", revealedIndex: 0 },
      { word: "PETAL", hint: "A colorful part of a bloom", revealedIndex: 2 },
      { word: "SPROUT", hint: "A young plant just starting to grow", revealedIndex: 3 },
      { word: "CONTAIN", hint: "To hold or keep within a pot", revealedIndex: 0 },
      { word: "EMERGING", hint: "Coming out or appearing from the soil", revealedIndex: 4 },
    ],
    funFact: "Planting flowers connects you to history and science, with facts like hydrangea and sunflowers being able to remove 95% of radioactivity from soil. Some flowers, like tulips, were once more valuable than gold, while others, like the bamboo orchid, can grow 12 inches a day. 🌸",
  },

  // =============================================
  // INDEX 103 - Shows Mar 12, 2026 at 7 PM
  // =============================================
  {
    category: "Coffee Break",
    puzzleNumber: 182,
    words: [
      { word: "JAVA", hint: "Slang term for coffee", revealedIndex: 0 },
      { word: "RELAX", hint: "To rest and unwind", revealedIndex: 2 },
      { word: "PUZZLE", hint: "A brain game to enjoy during downtime", revealedIndex: 3 },
      { word: "BREATHER", hint: "A short pause to catch your breath", revealedIndex: 0 },
      { word: "REFRESHES", hint: "Revives and re-energizes you", revealedIndex: 4 },
    ],
    funFact: "The modern 'coffee break' originated in the late 19th/early 20th century, often attributed to Norwegian immigrant women working in Wisconsin tobacco warehouses who needed to tend to duties at home. It evolved into a widespread office, social, and union-recognized norm by the 1950s, solidified by marketing campaigns to boost productivity. ☕",
  },

  // =============================================
  // INDEX 104 - Shows Mar 13, 2026 at 7 PM
  // =============================================
  {
    category: "Superstition",
    puzzleNumber: 183,
    words: [
      { word: "LUCK", hint: "Good or bad fortune", revealedIndex: 0 },
      { word: "WORRY", hint: "To feel anxious or uneasy", revealedIndex: 2 },
      { word: "PHOBIA", hint: "An intense fear of something", revealedIndex: 3 },
      { word: "THIRTEEN", hint: "A number often considered unlucky", revealedIndex: 0 },
      { word: "RELIEVED", hint: "Feeling glad that something feared didn't happen", revealedIndex: 4 },
    ],
    funFact: "Did you know that Friday the 13th occurs one to three times annually when a month starts on a Sunday? Every calendar year has at least one Friday the 13th, but never more than three. In 2026, Friday the 13th occurs in February, March, and November! 🍀",
  },

  // =============================================
  // INDEX 105 - Shows Mar 14, 2026 at 7 PM
  // =============================================
  {
    category: "Pep Rally",
    puzzleNumber: 184,
    words: [
      { word: "GAME", hint: "A competitive event or match", revealedIndex: 0 },
      { word: "CHEER", hint: "To shout encouragement and support", revealedIndex: 2 },
      { word: "HOOPLA", hint: "Excitement and commotion", revealedIndex: 3 },
      { word: "PLAYER", hint: "Someone on a team", revealedIndex: 0 },
      { word: "SPORTING", hint: "Related to athletic activities", revealedIndex: 4 },
    ],
    funFact: "Often held in gyms or stadiums, these events feature loud music, cheerleaders, band performances, themed dress-up days, and competitive games like the 'Cheer-o-Meter' or musical chairs. While usually for sports, they can also celebrate academic achievements, homecoming, or school milestones. 📣",
  },

  // =============================================
  // INDEX 106 - Shows Mar 15, 2026 at 7 PM
  // =============================================
  {
    category: "Ides of March",
    puzzleNumber: 185,
    words: [
      { word: "DOOM", hint: "A fate of destruction or death", revealedIndex: 0 },
      { word: "ROMAN", hint: "Relating to ancient Rome", revealedIndex: 2 },
      { word: "BEWARE", hint: "To be cautious or on guard", revealedIndex: 3 },
      { word: "WARNING", hint: "A sign of danger ahead", revealedIndex: 0 },
      { word: "CAUTIOUS", hint: "Careful to avoid risk or trouble", revealedIndex: 4 },
    ],
    funFact: "The Ides of March is famously known as the date in 44 BCE when Julius Caesar was assassinated by senators, a turning point that accelerated the end of the Roman Republic. The phrase 'Beware the Ides of March' was popularized by Shakespeare. 🏛️",
  },

  // =============================================
  // INDEX 107 - Shows Mar 16, 2026 at 7 PM
  // =============================================
  {
    category: "St. Patrick's Day",
    puzzleNumber: 186,
    words: [
      { word: "LUCK", hint: "Good fortune, often associated with the Irish", revealedIndex: 0 },
      { word: "GREEN", hint: "The color of shamrocks and leprechauns", revealedIndex: 2 },
      { word: "CLOVER", hint: "A plant with leaves considered lucky", revealedIndex: 3 },
      { word: "IRELAND", hint: "The Emerald Isle", revealedIndex: 0 },
      { word: "TREASURE", hint: "What's at the end of the rainbow", revealedIndex: 4 },
    ],
    funFact: "There are no snakes in Ireland, and legend says St. Patrick drove them out, but scientists believe they never inhabited the island post-Ice Age. ☘️",
  },

  // =============================================
  // INDEX 108 - Shows Mar 17, 2026 at 7 PM
  // =============================================
  {
    category: "March Madness",
    puzzleNumber: 187,
    words: [
      { word: "FOUR", hint: "The Final ___ in college basketball", revealedIndex: 0 },
      { word: "HOOPS", hint: "Slang for basketball", revealedIndex: 2 },
      { word: "BUZZER", hint: "A last-second shot is called a ___-beater", revealedIndex: 3 },
      { word: "BRACKET", hint: "The tournament chart fans fill out", revealedIndex: 0 },
      { word: "CHAMPION", hint: "The team that wins it all", revealedIndex: 4 },
    ],
    funFact: "March Madness began in 1939 with only eight teams, with Oregon winning the inaugural tournament. It has since grown into a massive 68-team event, where the odds of a perfect bracket are roughly 1 in 9.2 quintillion. 🏀",
  },

  // =============================================
  // INDEX 109 - Shows Mar 18, 2026 at 7 PM
  // =============================================
  {
    category: "Pie",
    puzzleNumber: 188,
    words: [
      { word: "LIME", hint: "Key ___ pie is a Florida favorite", revealedIndex: 0 },
      { word: "PEACH", hint: "A sweet summer fruit pie", revealedIndex: 2 },
      { word: "CHERRY", hint: "A classic red fruit filling", revealedIndex: 3 },
      { word: "COCONUT", hint: "A tropical pie flavor with cream", revealedIndex: 0 },
      { word: "MERINGUE", hint: "A fluffy, toasted topping made from egg whites", revealedIndex: 4 },
    ],
    funFact: "Pie has an 8,000-year history, starting with ancient Egyptians and Romans, and was historically known for savory fillings served in inedible, thick crusts. 🥧",
  },

  // =============================================
  // INDEX 110 - Shows Mar 19, 2026 at 7 PM
  // =============================================
  {
    category: "First Day of Spring",
    puzzleNumber: 189,
    words: [
      { word: "BIRD", hint: "Migrating creatures returning north", revealedIndex: 0 },
      { word: "BLOOM", hint: "When flowers open up", revealedIndex: 2 },
      { word: "GARDEN", hint: "A place to plant and grow", revealedIndex: 3 },
      { word: "RENEWAL", hint: "A fresh start or rebirth", revealedIndex: 0 },
      { word: "SUNLIGHT", hint: "Longer days bring more of this", revealedIndex: 4 },
    ],
    funFact: "The first day of spring (vernal equinox) occurs on March 19, 20, or 21, marking the moment the Sun crosses the celestial equator, resulting in nearly equal 12-hour day and night worldwide. It signifies the start of six months of daylight at the North Pole and a 'balancing' of Earth's tilt. 🌸",
  },

  // =============================================
  // INDEX 111 - Shows Mar 20, 2026 at 7 PM
  // =============================================
  {
    category: "Vacation",
    puzzleNumber: 190,
    words: [
      { word: "REST", hint: "Time to relax and recharge", revealedIndex: 0 },
      { word: "BREAK", hint: "A pause from work or routine", revealedIndex: 2 },
      { word: "LEAVE", hint: "Time off from your job", revealedIndex: 3 },
      { word: "HOLIDAY", hint: "A special day or getaway", revealedIndex: 0 },
      { word: "RELAXING", hint: "Calm and stress-free", revealedIndex: 4 },
    ],
    funFact: "Some people are more likely to choose mountain vacations (introverts) while others prefer beaches (extroverts). 🏖️",
  },

  // =============================================
  // INDEX 112 - Shows Mar 21, 2026 at 7 PM
  // =============================================
  {
    category: "Lamb",
    puzzleNumber: 191,
    words: [
      { word: "WALK", hint: "Lambs can do this within minutes of birth", revealedIndex: 0 },
      { word: "BLEAT", hint: "The sound a lamb makes", revealedIndex: 2 },
      { word: "VISION", hint: "Lambs have nearly 360 degrees of this", revealedIndex: 3 },
      { word: "PLAYFUL", hint: "Frisky and full of fun", revealedIndex: 0 },
      { word: "SHEARING", hint: "The process of removing wool", revealedIndex: 4 },
    ],
    funFact: "Lambs are highly social and intelligent. They can walk within minutes of birth and recognize human faces. They possess nearly 360-degree panoramic vision, which allows them to spot predators without turning their heads. 🐑",
  },

  // =============================================
  // INDEX 113 - Shows Mar 22, 2026 at 7 PM
  // =============================================
  {
    category: "World Water Day",
    puzzleNumber: 192,
    words: [
      { word: "DROP", hint: "A tiny bead of liquid", revealedIndex: 0 },
      { word: "OCEAN", hint: "A vast body of saltwater", revealedIndex: 2 },
      { word: "STREAM", hint: "A small, flowing body of water", revealedIndex: 3 },
      { word: "HYDRATE", hint: "To drink water and replenish fluids", revealedIndex: 0 },
      { word: "RESOURCE", hint: "Something valuable we must protect", revealedIndex: 4 },
    ],
    funFact: "World Water Day 2026, held on March 22, focuses on the theme 'Water and Gender' with the campaign 'Where water flows, equality grows'. Led by UNICEF and UN-Women, it highlights that women and girls in 53 countries spend 250 million hours daily collecting water. 🌊",
  },

  // =============================================
  // INDEX 114 - Shows Mar 23, 2026 at 7 PM
  // =============================================
  {
    category: "Puppy",
    puzzleNumber: 193,
    words: [
      { word: "BARK", hint: "The sound a dog makes", revealedIndex: 0 },
      { word: "FETCH", hint: "A game of throwing and retrieving", revealedIndex: 2 },
      { word: "TREAT", hint: "A tasty reward for good behavior", revealedIndex: 3 },
      { word: "COLLAR", hint: "Worn around the neck with tags", revealedIndex: 0 },
      { word: "CUDDLING", hint: "Snuggling up close for warmth", revealedIndex: 4 },
    ],
    funFact: "Puppies need 15–20 hours of sleep per day to support their rapid development. Similar to human fingerprints, every dog has a unique nose print. 🐶",
  },

  // =============================================
  // INDEX 115 - Shows Mar 24, 2026 at 7 PM
  // =============================================
  {
    category: "Theatre",
    puzzleNumber: 194,
    words: [
      { word: "ROLE", hint: "A part played by an actor", revealedIndex: 0 },
      { word: "DRAMA", hint: "A serious or emotional performance", revealedIndex: 2 },
      { word: "SCRIPT", hint: "The written dialogue for a play", revealedIndex: 3 },
      { word: "CURTAIN", hint: "It rises at the start and falls at the end", revealedIndex: 0 },
      { word: "BROADWAY", hint: "New York City's famous theatre district", revealedIndex: 4 },
    ],
    funFact: "Many Broadway theaters skip Row I, going from H to J, because audiences often mistook the letter 'I' for the number '1'. 🎭",
  },

  // =============================================
  // INDEX 116 - Shows Mar 25, 2026 at 7 PM
  // =============================================
  {
    category: "Waffle",
    puzzleNumber: 195,
    words: [
      { word: "IRON", hint: "The tool used to cook waffles", revealedIndex: 0 },
      { word: "CRISP", hint: "Crunchy on the outside", revealedIndex: 2 },
      { word: "GOLDEN", hint: "The perfect color when done", revealedIndex: 3 },
      { word: "BELGIAN", hint: "A style known for deep pockets", revealedIndex: 0 },
      { word: "TOPPINGS", hint: "Fruit, syrup, or whipped cream", revealedIndex: 4 },
    ],
    funFact: "Waffles originated in the Middle Ages, with 13th-century irons creating honeycomb patterns that inspired Nike's first sneaker soles. 🧇",
  },

  // =============================================
  // INDEX 117 - Shows Mar 26, 2026 at 7 PM
  // =============================================
  {
    category: "Butterfly",
    puzzleNumber: 196,
    words: [
      { word: "LIFE", hint: "The stages from egg to adult", revealedIndex: 0 },
      { word: "CYCLE", hint: "A repeating pattern of changes", revealedIndex: 2 },
      { word: "WINGED", hint: "Having colorful flight appendages", revealedIndex: 3 },
      { word: "MONARCH", hint: "An orange and black migratory species", revealedIndex: 0 },
      { word: "ANTENNAE", hint: "Sensory organs on the head", revealedIndex: 4 },
    ],
    funFact: "A caterpillar transforms into a butterfly within 10 to 15 days inside a chrysalis. 🦋",
  },

  // =============================================
  // INDEX 118 - Shows Mar 27, 2026 at 7 PM
  // =============================================
  {
    category: "Popcorn",
    puzzleNumber: 197,
    words: [
      { word: "SALT", hint: "A classic seasoning", revealedIndex: 0 },
      { word: "WHITE", hint: "The color of plain popped kernels", revealedIndex: 2 },
      { word: "CRUNCH", hint: "The satisfying sound when you bite", revealedIndex: 3 },
      { word: "BUTTERY", hint: "Rich and golden-coated", revealedIndex: 0 },
      { word: "UNPOPPED", hint: "The kernels left at the bottom of the bowl", revealedIndex: 4 },
    ],
    funFact: "The oldest ears of popcorn were found in a cave in New Mexico and are estimated to be about 5,600 years old. 🍿",
  },

  // =============================================
  // INDEX 119 - Shows Mar 28, 2026 at 7 PM
  // =============================================
  {
    category: "Puzzles",
    puzzleNumber: 198,
    words: [
      { word: "CLUE", hint: "A helpful hint to solve", revealedIndex: 0 },
      { word: "PIECE", hint: "One part of the whole", revealedIndex: 2 },
      { word: "TEASER", hint: "A brain ___ challenges the mind", revealedIndex: 3 },
      { word: "JIGSAW", hint: "A puzzle with interlocking pieces", revealedIndex: 0 },
      { word: "SOLUTION", hint: "The answer you're looking for", revealedIndex: 4 },
    ],
    funFact: "Jigsaw puzzles were invented around 1760 by cartographer John Spilsbury, who mounted maps on wood and cut them into pieces to teach geography. Known as 'Dissected Maps' originally, they were expensive, high-society entertainment until die-cut cardboard made them popular during the Great Depression. 🧩",
  },

  // =============================================
  // INDEX 120 - Shows Mar 29, 2026 at 7 PM
  // =============================================
  {
    category: "Pencil",
    puzzleNumber: 199,
    words: [
      { word: "LEAD", hint: "What the writing core is mistakenly called", revealedIndex: 0 },
      { word: "WRITE", hint: "To put words on paper", revealedIndex: 2 },
      { word: "WOODEN", hint: "Made from timber", revealedIndex: 3 },
      { word: "SHARPEN", hint: "To restore the point", revealedIndex: 0 },
      { word: "GRAPHITE", hint: "The actual material in the core", revealedIndex: 4 },
    ],
    funFact: "Pencil 'lead' is actually a mixture of graphite and clay. Pencils are generally made with six sides to prevent them from rolling off tables and to make them easier to grip. ✏️",
  },

  // =============================================
  // INDEX 121 - Shows Mar 30, 2026 at 7 PM
  // =============================================
  {
    category: "Paella",
    puzzleNumber: 200,
    words: [
      { word: "RICE", hint: "The base grain of this dish", revealedIndex: 0 },
      { word: "SPAIN", hint: "Country where it originated", revealedIndex: 2 },
      { word: "CHICKEN", hint: "A common protein topping", revealedIndex: 3 },
      { word: "SAFFRON", hint: "The expensive spice that gives it color", revealedIndex: 0 },
      { word: "VALENCIA", hint: "The Spanish region famous for this dish", revealedIndex: 4 },
    ],
    funFact: "Paella originated as an 18th-century farmers' lunch in Valencia, Spain. It takes its name from the wide, shallow pan used, rather than the rice itself. 🥘",
  },

  // =============================================
  // INDEX 122 - Shows Mar 31, 2026 at 7 PM
  // =============================================
  {
    category: "April 1",
    puzzleNumber: 201,
    words: [
      { word: "ZANY", hint: "Amusingly unconventional", revealedIndex: 0 },
      { word: "SILLY", hint: "Playfully foolish", revealedIndex: 2 },
      { word: "GOTCHA", hint: "Exclaimed after a successful prank", revealedIndex: 3 },
      { word: "COMICAL", hint: "Funny and entertaining", revealedIndex: 0 },
      { word: "MISCHIEF", hint: "Playful troublemaking", revealedIndex: 4 },
    ],
    funFact: "April 1 is a day for pranks and hoaxes with origins possibly dating back to 1392. Traditions often require pranks to cease by noon. 🃏",
  },

  // =============================================
  // INDEX 123 - Shows Apr 1, 2026 at 7 PM
  // =============================================
  {
    category: "Oatmeal Cookie",
    puzzleNumber: 202,
    words: [
      { word: "OATS", hint: "The hearty grain in the recipe", revealedIndex: 0 },
      { word: "CHEWY", hint: "Soft and easy to bite", revealedIndex: 2 },
      { word: "RAISIN", hint: "A dried grape often added", revealedIndex: 3 },
      { word: "HEALTHY", hint: "Good for you", revealedIndex: 0 },
      { word: "MOLASSES", hint: "A dark, sweet syrup", revealedIndex: 4 },
    ],
    funFact: "Oatmeal cookies, often considered a 'healthy' treat, originated in the 1800s from Scottish oatcakes, which soldiers historically carried for energy. In the early 1900s, oatmeal raisin cookies were popular as a health food due to their fiber and vitamin content. They are the #1 non-cereal use for oatmeal. 🍪",
  },

  // =============================================
  // INDEX 124 - Shows Apr 2, 2026 at 7 PM
  // =============================================
  {
    category: "Selfie",
    puzzleNumber: 203,
    words: [
      { word: "SNAP", hint: "To take a quick photo", revealedIndex: 0 },
      { word: "PHONE", hint: "The device most often used", revealedIndex: 2 },
      { word: "CAMERA", hint: "What captures the image", revealedIndex: 3 },
      { word: "SHARING", hint: "Posting for others to see", revealedIndex: 0 },
      { word: "PORTRAIT", hint: "A photo of a person", revealedIndex: 4 },
    ],
    funFact: "The first photographic selfie was taken in 1839. Roughly 92 million selfies are taken daily, often motivated by capturing memories. The term was coined in 2002. 📱",
  },

  // =============================================
  // INDEX 125 - Shows Apr 3, 2026 at 7 PM
  // =============================================
  {
    category: "Caramel",
    puzzleNumber: 204,
    words: [
      { word: "SOFT", hint: "Tender and easy to chew", revealedIndex: 0 },
      { word: "APPLE", hint: "A fruit often dipped in this treat", revealedIndex: 2 },
      { word: "STICKY", hint: "Tends to cling to your teeth", revealedIndex: 3 },
      { word: "POPCORN", hint: "A snack often coated with this", revealedIndex: 0 },
      { word: "LUSCIOUS", hint: "Richly appealing and delicious", revealedIndex: 4 },
    ],
    funFact: "The word caramel is derived from the Portuguese or Spanish word 'caramelo,' which appeared in the English language around 1725. In the 1950s, a Kraft Foods salesman invented caramel apples after experimenting with melting caramel candies. 🍎",
  },

  // =============================================
  // INDEX 126 - Shows Apr 4, 2026 at 7 PM
  // =============================================
  {
    category: "Perfume",
    puzzleNumber: 205,
    words: [
      { word: "MUSK", hint: "A warm, earthy base note", revealedIndex: 0 },
      { word: "SCENT", hint: "A distinctive smell", revealedIndex: 2 },
      { word: "FLORAL", hint: "Smelling like flowers", revealedIndex: 3 },
      { word: "POWDERY", hint: "A soft, delicate fragrance type", revealedIndex: 0 },
      { word: "ESSENCE", hint: "The concentrated extract", revealedIndex: 4 },
    ],
    funFact: "According to a Cuneiform tablet, the world's first recorded chemist was a woman named Tapputi, a perfume maker in Mesopotamia. Modern perfumes are largely synthetic, as producing natural essential oils on a mass scale is too expensive. 🌸",
  },

  // =============================================
  // INDEX 127 - Shows Apr 5, 2026 at 7 PM
  // =============================================
  {
    category: "Easter",
    puzzleNumber: 206,
    words: [
      { word: "LILY", hint: "A white flower associated with this holiday", revealedIndex: 0 },
      { word: "BUNNY", hint: "A hopping symbol of the season", revealedIndex: 2 },
      { word: "BONNET", hint: "A decorative hat worn in parades", revealedIndex: 3 },
      { word: "DECORATE", hint: "To adorn eggs with colors", revealedIndex: 0 },
      { word: "SUNRISE", hint: "Early morning service time", revealedIndex: 4 },
    ],
    funFact: "Before the rabbit became popular, other animals like the fox, cuckoo, or stork were believed to deliver eggs in different parts of Germany. Roughly 76% of people eat the ears of a chocolate bunny first. 🐰",
  },

  // =============================================
  // INDEX 128 - Shows Apr 6, 2026 at 7 PM
  // =============================================
  {
    category: "Reading",
    puzzleNumber: 207,
    words: [
      { word: "SKIM", hint: "To read quickly for main points", revealedIndex: 0 },
      { word: "BROWSE", hint: "To look through casually", revealedIndex: 2 },
      { word: "PERUSE", hint: "To read thoroughly", revealedIndex: 3 },
      { word: "INFORMED", hint: "Having knowledge from learning", revealedIndex: 0 },
      { word: "BOOKMARK", hint: "Saves your place in a book", revealedIndex: 4 },
    ],
    funFact: "Reading is a form of exercise for the brain that improves focus, strengthens memory, and can make you kinder by fostering empathy. 📚",
  },

  // =============================================
  // INDEX 129 - Shows Apr 7, 2026 at 7 PM
  // =============================================
  {
    category: "Party",
    puzzleNumber: 208,
    words: [
      { word: "BASH", hint: "A lively celebration", revealedIndex: 0 },
      { word: "MIXER", hint: "A social gathering to meet people", revealedIndex: 2 },
      { word: "SOIRÉE", hint: "An elegant evening party", revealedIndex: 3 },
      { word: "SHINDIG", hint: "A fun, festive event", revealedIndex: 0 },
      { word: "WINGDING", hint: "A wild, lavish party", revealedIndex: 4 },
    ],
    funFact: "The Holi festival, one of the world's oldest party traditions, has been celebrated for over 2,000 years, featuring a massive, colorful, festive crowd. 🎉",
  },

  // =============================================
  // INDEX 130 - Shows Apr 8, 2026 at 7 PM
  // =============================================
  {
    category: "Eiffel Tower",
    puzzleNumber: 209,
    words: [
      { word: "VIEW", hint: "What you see from the top", revealedIndex: 0 },
      { word: "PARIS", hint: "The city where it stands", revealedIndex: 2 },
      { word: "ICONIC", hint: "Widely recognized and symbolic", revealedIndex: 3 },
      { word: "TOURIST", hint: "A visitor to a famous site", revealedIndex: 0 },
      { word: "LANDMARK", hint: "A famous, recognizable structure", revealedIndex: 4 },
    ],
    funFact: "The Eiffel Tower, originally built for the 1889 World's Fair, was meant to be dismantled after 20 years but was saved by its use as a radio antenna. 🗼",
  },

  // =============================================
  // INDEX 131 - Shows Apr 9, 2026 at 7 PM
  // =============================================
  {
    category: "Antique",
    puzzleNumber: 210,
    words: [
      { word: "RARE", hint: "Uncommon and hard to find", revealedIndex: 0 },
      { word: "RELIC", hint: "An object from the past", revealedIndex: 2 },
      { word: "RUSTIC", hint: "Having a simple, aged charm", revealedIndex: 3 },
      { word: "COLLECT", hint: "To gather items as a hobby", revealedIndex: 0 },
      { word: "HEIRLOOM", hint: "A treasured family possession", revealedIndex: 4 },
    ],
    funFact: "An antique is generally defined as an item at least 100 years old, distinguishing it from vintage or collectibles. These pieces often feature superior craftsmanship, such as handmade dovetail joints, hidden compartments for secrets, and materials rarely used today. 🏺",
  },

  // =============================================
  // INDEX 132 - Shows Apr 10, 2026 at 7 PM
  // =============================================
  {
    category: "Golf",
    puzzleNumber: 211,
    words: [
      { word: "IRON", hint: "A type of club for mid-range shots", revealedIndex: 0 },
      { word: "WEDGE", hint: "A club for short, high shots", revealedIndex: 2 },
      { word: "BIRDIE", hint: "One stroke under par", revealedIndex: 3 },
      { word: "FAIRWAY", hint: "The mowed path between tee and green", revealedIndex: 0 },
      { word: "SANDTRAP", hint: "A bunker filled with sand", revealedIndex: 4 },
    ],
    funFact: "Golf is a historic sport with roots in 15th-century Scotland. The Scottish government banned golf three times between 1457 and 1744 because it distracted from mandatory archery practice. ⛳",
  },

  // =============================================
  // INDEX 133 - Shows Apr 11, 2026 at 7 PM
  // =============================================
  {
    category: "Stars",
    puzzleNumber: 212,
    words: [
      { word: "TINY", hint: "Very small in appearance from Earth", revealedIndex: 0 },
      { word: "DWARF", hint: "A small, dim type of star", revealedIndex: 2 },
      { word: "DAZZLE", hint: "To impress with brightness", revealedIndex: 3 },
      { word: "SPARKLE", hint: "To twinkle with light", revealedIndex: 0 },
      { word: "CELESTIAL", hint: "Relating to the sky or heavens", revealedIndex: 4 },
    ],
    funFact: "There are more stars in the universe than grains of sand on Earth, and they range in color from blue (hottest) to red (coolest). ⭐",
  },

  // =============================================
  // INDEX 134 - Shows Apr 12, 2026 at 7 PM
  // =============================================
  {
    category: "Dance",
    puzzleNumber: 213,
    words: [
      { word: "FOLK", hint: "Traditional cultural style", revealedIndex: 0 },
      { word: "MUSIC", hint: "What dancers move to", revealedIndex: 2 },
      { word: "BALLET", hint: "A classical form with pointe shoes", revealedIndex: 3 },
      { word: "PERFORM", hint: "To present before an audience", revealedIndex: 0 },
      { word: "BALLROOM", hint: "Elegant partner dancing", revealedIndex: 4 },
    ],
    funFact: "Dance is an ancient, global form of expression, spanning from 1500s Italian courts to modern hip-hop, that improves cognitive function and physical health. 💃",
  },

  // =============================================
  // INDEX 135 - Shows Apr 13, 2026 at 7 PM
  // =============================================
  {
    category: "Scrabble",
    puzzleNumber: 214,
    words: [
      { word: "TILE", hint: "A small piece with a letter", revealedIndex: 0 },
      { word: "POINT", hint: "The value of each letter", revealedIndex: 2 },
      { word: "SQUARE", hint: "A space on the board", revealedIndex: 3 },
      { word: "SCORING", hint: "Adding up your word value", revealedIndex: 0 },
      { word: "INVENTOR", hint: "Alfred Mosher Butts created it", revealedIndex: 4 },
    ],
    funFact: "Invented in 1933 by architect Alfred Mosher Butts, Scrabble was originally named 'Lexiko' and later 'Criss-Cross Words' before becoming the popular game found in three of every five American homes. 🅰",
  },

  // =============================================
  // INDEX 136 - Shows Apr 14, 2026 at 7 PM
  // =============================================
  {
    category: "Laughter",
    puzzleNumber: 215,
    words: [
      { word: "GLEE", hint: "Great delight and joy", revealedIndex: 0 },
      { word: "AMUSE", hint: "To make someone smile", revealedIndex: 2 },
      { word: "GIGGLE", hint: "A light, silly laugh", revealedIndex: 3 },
      { word: "CHUCKLE", hint: "A quiet, soft laugh", revealedIndex: 0 },
      { word: "CHEERFUL", hint: "Happy and in good spirits", revealedIndex: 4 },
    ],
    funFact: "Laughter is the only 'contagious' health condition, and you are 30 times more likely to laugh in a group than when alone. Your brain responds to the sound of laughter by preparing your facial muscles to join in, even if you don't know why everyone is laughing. 😂",
  },

  // =============================================
  // INDEX 137 - Shows Apr 15, 2026 at 7 PM
  // =============================================
  {
    category: "Jelly Beans",
    puzzleNumber: 216,
    words: [
      { word: "JARS", hint: "Containers often filled with them", revealedIndex: 0 },
      { word: "FRUIT", hint: "A common flavor category", revealedIndex: 2 },
      { word: "FLAVOR", hint: "The taste of each bean", revealedIndex: 3 },
      { word: "GUMDROP", hint: "A similar sugar-coated candy", revealedIndex: 0 },
      { word: "COLORFUL", hint: "Bright and varied in hue", revealedIndex: 4 },
    ],
    funFact: "Jelly beans were the first candy sold by weight and have a 7-day 'panning' process to create their hard shell. 🫘",
  },

  // =============================================
  // INDEX 138 - Shows Apr 16, 2026 at 7 PM
  // =============================================
  {
    category: "Takeout",
    puzzleNumber: 217,
    words: [
      { word: "FAST", hint: "Quick and convenient", revealedIndex: 0 },
      { word: "READY", hint: "Prepared and waiting", revealedIndex: 2 },
      { word: "PICKUP", hint: "To collect your order", revealedIndex: 3 },
      { word: "PACKAGE", hint: "How the food is wrapped", revealedIndex: 0 },
      { word: "CURBSIDE", hint: "Delivered to your car", revealedIndex: 4 },
    ],
    funFact: "Takeout has ancient roots, in Pompeii, Italy, serving fast food from street-side counters in Roman times. 🥡",
  },

  // =============================================
  // INDEX 139 - Shows Apr 17, 2026 at 7 PM
  // =============================================
  {
    category: "Friday",
    puzzleNumber: 218,
    words: [
      { word: "TGIF", hint: "Thank Goodness It's ___", revealedIndex: 0 },
      { word: "JEANS", hint: "Casual pants often worn this day", revealedIndex: 2 },
      { word: "CASUAL", hint: "Relaxed and informal", revealedIndex: 3 },
      { word: "COMFORT", hint: "A feeling of ease", revealedIndex: 0 },
      { word: "INFORMAL", hint: "Not following strict rules", revealedIndex: 4 },
    ],
    funFact: "Casual Friday, which boosts morale and allows personal expression, originated from Hawaii's 'Aloha Friday' in the 1960s, where workers wore tropical shirts to combat heat. 👖",
  },

  // =============================================
  // INDEX 140 - Shows Apr 18, 2026 at 7 PM
  // =============================================
  {
    category: "Kickball",
    puzzleNumber: 219,
    words: [
      { word: "TEAM", hint: "A group playing together", revealedIndex: 0 },
      { word: "FIELD", hint: "The outdoor playing area", revealedIndex: 2 },
      { word: "KICKER", hint: "The person who boots the ball", revealedIndex: 3 },
      { word: "PITCHER", hint: "The person who rolls the ball", revealedIndex: 0 },
      { word: "HOMEBASE", hint: "Where you score a run", revealedIndex: 4 },
    ],
    funFact: "Known as 'soccer baseball' in Canada, this playground staple was actually used to train soldiers during World War II. ⚽",
  },

  // =============================================
  // INDEX 141 - Shows Apr 19, 2026 at 7 PM
  // =============================================
  {
    category: "Garlic",
    puzzleNumber: 220,
    words: [
      { word: "BULB", hint: "The whole head of cloves", revealedIndex: 0 },
      { word: "CLOVE", hint: "One segment of the bulb", revealedIndex: 2 },
      { word: "MINCED", hint: "Finely chopped", revealedIndex: 3 },
      { word: "ROASTED", hint: "Cooked until soft and sweet", revealedIndex: 0 },
      { word: "AROMATIC", hint: "Having a strong, pleasant smell", revealedIndex: 4 },
    ],
    funFact: "Garlic is a natural mosquito repellent and was historically used to keep away 'blood suckers,' inspiring vampire lore. 🧄",
  },

  // =============================================
  // INDEX 142 - Shows Apr 20, 2026 at 7 PM
  // =============================================
  {
    category: "Volunteers",
    puzzleNumber: 221,
    words: [
      { word: "HELP", hint: "To assist others", revealedIndex: 0 },
      { word: "SERVE", hint: "To give your time and effort", revealedIndex: 2 },
      { word: "DONATE", hint: "To give freely", revealedIndex: 3 },
      { word: "INVOLVE", hint: "To participate actively", revealedIndex: 0 },
      { word: "OUTREACH", hint: "Efforts to connect with communities", revealedIndex: 4 },
    ],
    funFact: "Over 1 billion people volunteer worldwide, contributing over $184 billion in economic value. Volunteers are 78% less likely to feel stressed and have a lower risk of isolation. 🤝",
  },

  // =============================================
  // INDEX 143 - Shows Apr 21, 2026 at 7 PM
  // =============================================
  {
    category: "Earth Day",
    puzzleNumber: 222,
    words: [
      { word: "SOIL", hint: "The ground where plants grow", revealedIndex: 0 },
      { word: "GREEN", hint: "The color of environmental efforts", revealedIndex: 2 },
      { word: "PLANET", hint: "Our home in space", revealedIndex: 3 },
      { word: "COMPOST", hint: "Recycled organic matter", revealedIndex: 0 },
      { word: "CONSERVE", hint: "To protect and preserve", revealedIndex: 4 },
    ],
    funFact: "Earth Day, celebrated annually on April 22 since 1970, is the world's largest secular observance, with over 1 billion people in 190+ countries participating. 🌍",
  },

  // =============================================
  // INDEX 144 - Shows Apr 22, 2026 at 7 PM
  // =============================================
  {
    category: "Hot Tea",
    puzzleNumber: 223,
    words: [
      { word: "BOIL", hint: "To heat water to bubbling", revealedIndex: 0 },
      { word: "SPOON", hint: "Used to stir in honey", revealedIndex: 2 },
      { word: "TEAPOT", hint: "A vessel for steeping", revealedIndex: 3 },
      { word: "SIPPING", hint: "Drinking slowly", revealedIndex: 0 },
      { word: "STEAMING", hint: "Giving off hot vapor", revealedIndex: 4 },
    ],
    funFact: "Contrary to popular belief, Turkey, not Britain, has the highest per capita tea consumption. 🫖",
  },

  // =============================================
  // INDEX 145 - Shows Apr 23, 2026 at 7 PM
  // =============================================
  {
    category: "Shakespeare",
    puzzleNumber: 224,
    words: [
      { word: "PLAY", hint: "A theatrical performance", revealedIndex: 0 },
      { word: "STAGE", hint: "Where actors perform", revealedIndex: 2 },
      { word: "FAMOUS", hint: "Widely known and celebrated", revealedIndex: 3 },
      { word: "THEATER", hint: "A venue for dramatic arts", revealedIndex: 0 },
      { word: "EVERYONE", hint: "His works are for all people", revealedIndex: 4 },
    ],
    funFact: "William Shakespeare was a prolific playwright and poet who invented over 1,700 words, including 'eyeball' and 'swagger' and coined phrases like 'break the ice'. 🎭",
  },

  // =============================================
  // INDEX 146 - Shows Apr 24, 2026 at 7 PM
  // =============================================
  {
    category: "Penguins",
    puzzleNumber: 225,
    words: [
      { word: "DIVE", hint: "To plunge into the water", revealedIndex: 0 },
      { word: "PREEN", hint: "To groom feathers", revealedIndex: 2 },
      { word: "WADDLE", hint: "A side-to-side walk", revealedIndex: 3 },
      { word: "ROOKERY", hint: "A penguin nesting colony", revealedIndex: 0 },
      { word: "FEATHERS", hint: "Waterproof covering", revealedIndex: 4 },
    ],
    funFact: "Penguins are flightless seabirds that 'fly' underwater at speeds up to 22 mph, utilizing countershading (black/white coloring) for camouflage. 🐧",
  },

  // =============================================
  // INDEX 147 - Shows Apr 25, 2026 at 7 PM
  // =============================================
  {
    category: "Getting Organized",
    puzzleNumber: 226,
    words: [
      { word: "FIND", hint: "To locate something", revealedIndex: 0 },
      { word: "PLACE", hint: "A spot for everything", revealedIndex: 2 },
      { word: "REDUCE", hint: "To minimize clutter", revealedIndex: 3 },
      { word: "CLUTTER", hint: "Messy, disorganized items", revealedIndex: 0 },
      { word: "PLANNING", hint: "Thinking ahead systematically", revealedIndex: 4 },
    ],
    funFact: "Getting organized is a powerful habit that saves roughly 3,680 hours of life spent searching for lost items and eliminates 40% of household chores. It increases mental clarity, reduces decision fatigue, and can even prompt healthier eating choices. 🗂️",
  },

  // =============================================
  // INDEX 148 - Shows Apr 26, 2026 at 7 PM
  // =============================================
  {
    category: "Superhero",
    puzzleNumber: 227,
    words: [
      { word: "CAPE", hint: "A flowing garment worn on the back", revealedIndex: 0 },
      { word: "POWER", hint: "A special ability", revealedIndex: 2 },
      { word: "SECRET", hint: "A hidden identity", revealedIndex: 3 },
      { word: "COSTUME", hint: "A distinctive outfit", revealedIndex: 0 },
      { word: "DISGUISE", hint: "A way to hide who you are", revealedIndex: 4 },
    ],
    funFact: "Unlike many heroes, Batman has no inherent superhuman powers and relies solely on his intellect, training, and gadgets. 🦸",
  },

  // =============================================
  // INDEX 149 - Shows Apr 27, 2026 at 7 PM
  // =============================================
  {
    category: "Poetry",
    puzzleNumber: 228,
    words: [
      { word: "LOVE", hint: "A common poetic theme", revealedIndex: 0 },
      { word: "VERSE", hint: "A line or stanza", revealedIndex: 2 },
      { word: "RECITE", hint: "To speak aloud from memory", revealedIndex: 3 },
      { word: "RHYMING", hint: "Words that sound alike", revealedIndex: 0 },
      { word: "METAPHOR", hint: "A comparison without like or as", revealedIndex: 4 },
    ],
    funFact: "Poetry is one of the oldest forms of literature, with origins predating written language, often used to pass down history. 📝",
  },

  // =============================================
  // INDEX 150 - Shows Apr 28, 2026 at 7 PM
  // =============================================
  {
    category: "Animal Crackers",
    puzzleNumber: 229,
    words: [
      { word: "LION", hint: "The king of the jungle", revealedIndex: 0 },
      { word: "TIGER", hint: "A striped big cat", revealedIndex: 2 },
      { word: "CIRCUS", hint: "Where these animals once performed", revealedIndex: 3 },
      { word: "CRUNCHY", hint: "Crisp and noisy to eat", revealedIndex: 0 },
      { word: "ELEPHANT", hint: "The largest land animal", revealedIndex: 4 },
    ],
    funFact: "Animal Crackers date back from 1902. They were originally designed with a string to hang as Christmas tree ornaments. More than 40 million packages are sold annually, featuring over 50 different animal shapes throughout their history. 🦁",
  },

  // =============================================
  // INDEX 151 - Shows Apr 29, 2026 at 7 PM
  // =============================================
  {
    category: "Barbecue",
    puzzleNumber: 230,
    words: [
      { word: "SLOW", hint: "Low and ___ cooking method", revealedIndex: 0 },
      { word: "GRILL", hint: "To cook over open flames", revealedIndex: 2 },
      { word: "SMOKER", hint: "Equipment for adding wood flavor", revealedIndex: 3 },
      { word: "COOKOUT", hint: "An outdoor gathering with food", revealedIndex: 0 },
      { word: "CHARCOAL", hint: "Black briquettes for grilling", revealedIndex: 4 },
    ],
    funFact: "Barbecue, or BBQ, originated from the Caribbean Taino word barbacoa, meaning a 'sacred fire pit' or raised wooden grate, and has been used for over 200,000 years. 🍖",
  },

  // =============================================
  // INDEX 152 - Shows Apr 30, 2026 at 7 PM
  // =============================================
  {
    category: "April Showers",
    puzzleNumber: 231,
    words: [
      { word: "RAIN", hint: "Water falling from clouds", revealedIndex: 0 },
      { word: "STORM", hint: "A weather disturbance", revealedIndex: 2 },
      { word: "GROWTH", hint: "What rain helps plants do", revealedIndex: 3 },
      { word: "FLOWERS", hint: "What May brings", revealedIndex: 0 },
      { word: "MOISTURE", hint: "Wetness in the air or soil", revealedIndex: 4 },
    ],
    funFact: "The phrase originated in a poem by Thomas Tusser in 1557, initially recorded as 'Sweet April showers, do spring May flowers'. While famously linked to blooming flowers, they often act as a myth in some regions, with June actually being wetter in the US. 🌧️",
  },

  // =============================================
  // INDEX 153 - Shows May 1, 2026 at 7 PM
  // =============================================
  {
    category: "Hoagie",
    puzzleNumber: 232,
    words: [
      { word: "LONG", hint: "The shape of the roll", revealedIndex: 0 },
      { word: "BREAD", hint: "The base of any sandwich", revealedIndex: 2 },
      { word: "SALAMI", hint: "A popular Italian cold cut", revealedIndex: 3 },
      { word: "VEGGIES", hint: "Lettuce, tomato, onion", revealedIndex: 0 },
      { word: "REGIONAL", hint: "Varies by location", revealedIndex: 4 },
    ],
    funFact: "Declared the 'Official Sandwich of Philadelphia' in 1992, it is a staple of Philly culture typically made with cold cuts, cheese, and veggies on a long roll. 🥖",
  },

  // =============================================
  // INDEX 154 - Shows May 2, 2026 at 7 PM
  // =============================================
  {
    category: "Iris",
    puzzleNumber: 233,
    words: [
      { word: "NEWS", hint: "Fleur-de-lis appears on news logos", revealedIndex: 0 },
      { word: "GREEK", hint: "Named after a goddess from this culture", revealedIndex: 2 },
      { word: "GARDEN", hint: "Where flowers grow", revealedIndex: 3 },
      { word: "BELGIUM", hint: "Country with the iris as national flower", revealedIndex: 0 },
      { word: "BLOOMING", hint: "In the process of flowering", revealedIndex: 4 },
    ],
    funFact: "National Iris Day, celebrated on May 8th, honors the vibrant flower representing the Greek goddess of the rainbow. Symbolizing faith and wisdom, irises bloom in every color except red. 💜",
  },

  // =============================================
  // INDEX 155 - Shows May 3, 2026 at 7 PM
  // =============================================
  {
    category: "Shrimp",
    puzzleNumber: 234,
    words: [
      { word: "LEGS", hint: "Shrimp have ten of these", revealedIndex: 0 },
      { word: "OCEAN", hint: "Where most shrimp live", revealedIndex: 2 },
      { word: "MANTIS", hint: "A type with powerful claws", revealedIndex: 3 },
      { word: "SEAFOOD", hint: "A category of ocean cuisine", revealedIndex: 0 },
      { word: "GRILLING", hint: "A popular cooking method", revealedIndex: 4 },
    ],
    funFact: "Shrimp are fascinating crustaceans with their hearts located in their heads, and they possess ten legs, often swimming backward to escape danger. 🦐",
  },

  // =============================================
  // INDEX 156 - Shows May 4, 2026 at 7 PM
  // =============================================
  {
    category: "Indulge",
    puzzleNumber: 235,
    words: [
      { word: "FEED", hint: "To satisfy a craving", revealedIndex: 0 },
      { word: "ALLOW", hint: "To permit yourself", revealedIndex: 2 },
      { word: "PAMPER", hint: "To treat yourself luxuriously", revealedIndex: 3 },
      { word: "IMPULSE", hint: "A sudden urge", revealedIndex: 0 },
      { word: "GENEROUS", hint: "Giving freely to yourself", revealedIndex: 4 },
    ],
    funFact: "Indulging mindfully and without guilt can boost mental well-being, reduce stress, and improve work engagement. 🍫",
  },

  // =============================================
  // INDEX 157 - Shows May 5, 2026 at 7 PM
  // =============================================
  {
    category: "Cinco de Mayo",
    puzzleNumber: 236,
    words: [
      { word: "ARMY", hint: "Military forces that fought", revealedIndex: 0 },
      { word: "HONOR", hint: "To show respect", revealedIndex: 2 },
      { word: "FRANCE", hint: "The country Mexico defeated", revealedIndex: 3 },
      { word: "MEXICAN", hint: "Relating to Mexico", revealedIndex: 0 },
      { word: "INVASION", hint: "A foreign military attack", revealedIndex: 4 },
    ],
    funFact: "Cinco de Mayo commemorates the Mexican army's unexpected 1862 victory over France at the Battle of Puebla, not Mexican Independence Day (Sept 16). While a minor holiday in Mexico, it became popular in the U.S. during the 1960s-80s to celebrate Mexican-American culture. 🇲🇽",
  },

  // =============================================
  // INDEX 158 - Shows May 6, 2026 at 7 PM
  // =============================================
  {
    category: "Nurse",
    puzzleNumber: 237,
    words: [
      { word: "CARE", hint: "Compassionate attention", revealedIndex: 0 },
      { word: "TREAT", hint: "To provide medical help", revealedIndex: 2 },
      { word: "HEALTH", hint: "Physical well-being", revealedIndex: 3 },
      { word: "MEDICAL", hint: "Related to medicine", revealedIndex: 0 },
      { word: "HOSPITAL", hint: "Where patients receive care", revealedIndex: 4 },
    ],
    funFact: "Nurses are the backbone of healthcare, consistently ranked as the most honest and ethical profession. With over 4.7 million registered nurses in the U.S. alone, they represent the largest healthcare profession. 👩‍⚕️",
  },

  // =============================================
  // INDEX 159 - Shows May 7, 2026 at 7 PM
  // =============================================
  {
    category: "Chicken Dance",
    puzzleNumber: 238,
    words: [
      { word: "CLAP", hint: "To bring hands together", revealedIndex: 0 },
      { word: "POLKA", hint: "A lively European dance style", revealedIndex: 2 },
      { word: "WIGGLE", hint: "To move side to side", revealedIndex: 3 },
      { word: "WEDDING", hint: "Where this dance is often performed", revealedIndex: 0 },
      { word: "FEATHERS", hint: "What chickens are covered in", revealedIndex: 4 },
    ],
    funFact: "Inspired by skiers, it was brought to the U.S. in 1981, where a lack of duck costumes at a Tulsa event forced a name change to the Chicken Dance. 🐔",
  },

  // =============================================
  // INDEX 160 - Shows May 8, 2026 at 7 PM
  // =============================================
  {
    category: "Mothers Day",
    puzzleNumber: 239,
    words: [
      { word: "LOVE", hint: "Deep affection", revealedIndex: 0 },
      { word: "HEART", hint: "Symbol of love", revealedIndex: 2 },
      { word: "WISDOM", hint: "Knowledge gained through experience", revealedIndex: 3 },
      { word: "NURTURE", hint: "To care for and encourage", revealedIndex: 0 },
      { word: "SELFLESS", hint: "Putting others first", revealedIndex: 4 },
    ],
    funFact: "Mother's Day is celebrated on the second Sunday of May in many countries, initiated by Anna Jarvis in 1908 to honor her mother. 💐",
  },

  // =============================================
  // INDEX 161 - Shows May 9, 2026 at 7 PM
  // =============================================
  {
    category: "Hat",
    puzzleNumber: 240,
    words: [
      { word: "BRIM", hint: "The edge that shades your face", revealedIndex: 0 },
      { word: "BERET", hint: "A soft, round French cap", revealedIndex: 2 },
      { word: "COWBOY", hint: "A Western style with a wide brim", revealedIndex: 3 },
      { word: "HATBAND", hint: "A decorative strip around the crown", revealedIndex: 0 },
      { word: "SOMBRERO", hint: "A Mexican hat with a very wide brim", revealedIndex: 4 },
    ],
    funFact: "Originally used for protection from the elements, hats became important indicators of social status, profession, and religious beliefs. 🎩",
  },

  // =============================================
  // INDEX 162 - Shows May 10, 2026 at 7 PM
  // =============================================
  {
    category: "Museum",
    puzzleNumber: 241,
    words: [
      { word: "TOUR", hint: "A guided walk through exhibits", revealedIndex: 0 },
      { word: "GUIDE", hint: "Someone who explains the displays", revealedIndex: 2 },
      { word: "TICKET", hint: "Your pass for entry", revealedIndex: 3 },
      { word: "GALLERY", hint: "A room for displaying art", revealedIndex: 0 },
      { word: "ARTIFACT", hint: "A historical object on display", revealedIndex: 4 },
    ],
    funFact: "There are over 55,000 museums worldwide, with the Louvre in Paris being the most visited, hosting over 10 million people annually. 🏛️",
  },

  // =============================================
  // INDEX 163 - Shows May 11, 2026 at 7 PM
  // =============================================
  {
    category: "Money Tips",
    puzzleNumber: 242,
    words: [
      { word: "PLAN", hint: "A strategy for your finances", revealedIndex: 0 },
      { word: "ASSET", hint: "Something of value you own", revealedIndex: 2 },
      { word: "FRUGAL", hint: "Careful with spending", revealedIndex: 3 },
      { word: "INTEREST", hint: "What your savings can earn", revealedIndex: 0 },
      { word: "SAVINGS", hint: "Money set aside for later", revealedIndex: 4 },
    ],
    funFact: "Money has been part of human history for at least 5,000 years. Put tax refunds or bonuses toward savings, not impulse buys. 💰",
  },

  // =============================================
  // INDEX 164 - Shows May 12, 2026 at 7 PM
  // =============================================
  {
    category: "Notebook",
    puzzleNumber: 243,
    words: [
      { word: "MEMO", hint: "A short written note", revealedIndex: 0 },
      { word: "DIARY", hint: "A personal daily record", revealedIndex: 2 },
      { word: "LEDGER", hint: "A book for financial records", revealedIndex: 3 },
      { word: "JOURNAL", hint: "A place to write thoughts", revealedIndex: 0 },
      { word: "PORTABLE", hint: "Easy to carry around", revealedIndex: 4 },
    ],
    funFact: "Notebooks and journals are essential for enhancing memory, boosting creativity, and reducing screen time, with studies showing that writing by hand aids in cognitive retention. 📓",
  },

  // =============================================
  // INDEX 165 - Shows May 13, 2026 at 7 PM
  // =============================================
  {
    category: "Turtles",
    puzzleNumber: 244,
    words: [
      { word: "BASK", hint: "To warm in the sun", revealedIndex: 0 },
      { word: "SHELL", hint: "The protective outer covering", revealedIndex: 2 },
      { word: "WISDOM", hint: "Often symbolized by these creatures", revealedIndex: 3 },
      { word: "ANCIENT", hint: "Very old, from long ago", revealedIndex: 0 },
      { word: "TORTOISE", hint: "A land-dwelling relative", revealedIndex: 4 },
    ],
    funFact: "Turtles are ancient reptiles existing for over 150 million years. They live on every continent except Antarctica. 🐢",
  },

  // =============================================
  // INDEX 166 - Shows May 14, 2026 at 7 PM
  // =============================================
  {
    category: "Tap Dance",
    puzzleNumber: 245,
    words: [
      { word: "FLAP", hint: "A basic tap step", revealedIndex: 0 },
      { word: "BRUSH", hint: "A sweeping foot movement", revealedIndex: 2 },
      { word: "CHANGE", hint: "A weight shift step", revealedIndex: 3 },
      { word: "HOOFING", hint: "Slang for tap dancing", revealedIndex: 0 },
      { word: "RHYTHMIC", hint: "Having a regular beat", revealedIndex: 4 },
    ],
    funFact: "Tap dance is a uniquely American art form born from blending Irish clog, British step dancing, and West African drumming rhythms in the 1700s-1800s. 👞",
  },

  // =============================================
  // INDEX 167 - Shows May 15, 2026 at 7 PM
  // =============================================
  {
    category: "Hamburger",
    puzzleNumber: 246,
    words: [
      { word: "BEEF", hint: "The main meat ingredient", revealedIndex: 0 },
      { word: "PATTY", hint: "The shaped meat portion", revealedIndex: 2 },
      { word: "MEDIUM", hint: "A common cooking preference", revealedIndex: 3 },
      { word: "TOPPING", hint: "Lettuce, tomato, cheese", revealedIndex: 0 },
      { word: "BARBECUE", hint: "A popular sauce flavor", revealedIndex: 4 },
    ],
    funFact: "Burgers are incredibly popular, with around 60% of all sandwiches sold worldwide being hamburgers. 🍔",
  },

  // =============================================
  // INDEX 168 - Shows May 16, 2026 at 7 PM
  // =============================================
  {
    category: "Compost",
    puzzleNumber: 247,
    words: [
      { word: "SOIL", hint: "What compost enriches", revealedIndex: 0 },
      { word: "MULCH", hint: "Material spread around plants", revealedIndex: 2 },
      { word: "MATTER", hint: "Organic ___ breaks down", revealedIndex: 3 },
      { word: "ORGANIC", hint: "Natural, from living things", revealedIndex: 0 },
      { word: "NUTRIENT", hint: "Food for plants", revealedIndex: 4 },
    ],
    funFact: "Composting is a natural, 12,000-year-old process that turns organic waste into nutrient-rich humus, reducing landfill waste by up to 20%. 🌱",
  },

  // =============================================
  // INDEX 169 - Shows May 17, 2026 at 7 PM
  // =============================================
  {
    category: "Blueberry",
    puzzleNumber: 248,
    words: [
      { word: "TART", hint: "Slightly sour taste", revealedIndex: 0 },
      { word: "BLOOM", hint: "The dusty coating on fresh ones", revealedIndex: 2 },
      { word: "BAKING", hint: "Used in muffins and pies", revealedIndex: 3 },
      { word: "AMERICA", hint: "Native to North ___", revealedIndex: 0 },
      { word: "SMOOTHIE", hint: "A blended drink", revealedIndex: 4 },
    ],
    funFact: "Blueberries, a North American native superfood, are actually purple, rich in antioxidants, and packed with 25% of your daily Vitamin C in just one cup. 🫐",
  },

  // =============================================
  // INDEX 170 - Shows May 18, 2026 at 7 PM
  // =============================================
  {
    category: "Teacher",
    puzzleNumber: 249,
    words: [
      { word: "PLAN", hint: "To prepare lessons", revealedIndex: 0 },
      { word: "REACH", hint: "To connect with students", revealedIndex: 2 },
      { word: "LEADER", hint: "Someone who guides others", revealedIndex: 3 },
      { word: "INSPIRE", hint: "To motivate and encourage", revealedIndex: 0 },
      { word: "INSTRUCT", hint: "To teach or educate", revealedIndex: 4 },
    ],
    funFact: "Many teachers report high job satisfaction, valuing creativity, and forming lasting impacts on students' lives. 👩‍🏫",
  },
];

// ===========================================
// ROTATION FUNCTION - Uses Anchor Date System
// ===========================================
export function getTodaysPuzzle() {
  // Get current time in America/New_York timezone
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
  
  // Create anchor date in the same timezone-naive way
  // November 29, 2025 at 7 PM (when index 0 started)
  const anchorDate = new Date(2025, 10, 29, 19, 0, 0, 0); // Month is 0-indexed, so 10 = November
  
  // Calculate days since anchor date
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysSinceAnchor = Math.round((puzzleDate - anchorDate) / msPerDay);
  
  // Calculate puzzle index (wrapping around the array)
  let puzzleIndex = daysSinceAnchor % puzzles.length;
  
  // Handle negative values (for dates before anchor - shouldn't happen in production)
  if (puzzleIndex < 0) {
    puzzleIndex += puzzles.length;
  }
  
  return puzzles[puzzleIndex];
}

export default puzzles;