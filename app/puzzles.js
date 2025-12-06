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
    category: "We 🧡 Pancakes!",
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
  }
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