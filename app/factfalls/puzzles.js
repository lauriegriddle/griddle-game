// ============================================================
// Griddle Fact Falls — Puzzle Rotation
// Anchor date: April 17, 2026 at 12:00 AM = Index 0
// Add new facts to the end — rotation will not shift
// ============================================================

const ANCHOR_DATE = new Date('2026-04-17T00:00:00-05:00');

const factFallsPuzzles = [
  {
    number: 1,
    source: "Laughter",
    text: "You are thirty times more likely to laugh in a group than when alone",
    emoji: "😂"
  },
  {
    number: 2,
    source: "Theatre",
    text: "Many Broadway theaters skip Row I going from H to J because audiences often mistook the letter I for the number one",
    emoji: "🎭"
  },
  {
    number: 3,
    source: "Pancakes",
    text: "The first pancakes may have been made as far back as twelve thousand years ago",
    emoji: "🥞"
  },
  {
    number: 4,
    source: "Scrabble",
    text: "Scrabble was invented in 1933 and can be found in three of every five American homes",
    emoji: "🅰️"
  },
  {
    number: 5,
    source: "Pencil",
    text: "Pencils have six sides to prevent them from rolling off tables and to make them easier to grip",
    emoji: "✏️"
  },
  {
    number: 6,
    source: "Waffles",
    text: "Waffle iron patterns inspired the sole of the first Nike sneaker",
    emoji: "🧇"
  },
  {
    number: 7,
    source: "Eiffel Tower",
    text: "The Eiffel Tower was meant to be dismantled after twenty years but was saved by its use as a radio antenna",
    emoji: "🗼"
  },
  {
    number: 8,
    source: "Golf",
    text: "The Scottish government banned golf three times because it distracted from mandatory archery practice",
    emoji: "⛳"
  },
  {
    number: 9,
    source: "Paella",
    text: "Paella takes its name from the wide shallow pan used to cook it rather than the rice itself",
    emoji: "🥘"
  },
  {
    number: 10,
    source: "Oatmeal Cookie",
    text: "Oatmeal raisin cookies were once considered a health food due to their fiber and vitamin content",
    emoji: "🍪"
  },
  {
    number: 11,
    source: "Perfume",
    text: "The world's first recorded chemist was a woman named Tapputi a perfume maker in ancient Mesopotamia",
    emoji: "🌸"
  },
  {
    number: 12,
    source: "Potluck",
    text: "Potluck comes from the medieval practice of serving whatever was left in the pot to unexpected guests",
    emoji: "🍲"
  },
  {
    number: 13,
    source: "Popcorn",
    text: "The oldest ears of popcorn were found in a cave in New Mexico and are about five thousand years old",
    emoji: "🍿"
  },
  {
    number: 14,
    source: "Caramel",
    text: "In the nineteen fifties a Kraft Foods salesman invented caramel apples by melting caramel candies",
    emoji: "🍎"
  },
  {
    number: 15,
    source: "Easter",
    text: "Roughly seventy six percent of people eat the ears of a chocolate bunny first",
    emoji: "🐰"
  },
  {
    number: 16,
    source: "Brunch",
    text: "The word brunch was coined in 1895 by British writer Guy Beringer as a Sunday meal for Saturday night carousers",
    emoji: "🥂"
  },
  {
    number: 17,
    source: "Breakfast",
    text: "The word breakfast means to break the fast from not eating through the night",
    emoji: "🍳"
  },
  {
    number: 18,
    source: "Jelly Beans",
    text: "Jelly beans were the first candy sold by weight and take seven days to make their hard shell",
    emoji: "🫘"
  },
  {
    number: 19,
    source: "Stars",
    text: "There are more stars in the universe than grains of sand on all the beaches on Earth",
    emoji: "⭐"
  },
  {
    number: 20,
    source: "Reading",
    text: "Reading improves focus strengthens memory and can make you kinder by fostering empathy",
    emoji: "📚"
  },
  {
    number: 21,
    source: "Selfie",
    text: "The first photographic selfie was taken in 1839 and the term selfie was coined in 2002",
    emoji: "📱"
  },
  {
    number: 22,
    source: "Dance",
    text: "Dancing improves cognitive function and physical health and spans cultures across all of human history",
    emoji: "💃"
  },
  {
    number: 23,
    source: "Antique",
    text: "An antique is generally defined as an item at least one hundred years old",
    emoji: "🏺"
  },
  {
    number: 24,
    source: "Butterfly",
    text: "A caterpillar transforms into a butterfly within ten to fifteen days inside a chrysalis",
    emoji: "🦋"
  },
  {
    number: 25,
    source: "Soup",
    text: "The earliest evidence of soup dates back to six thousand BC and was likely hippopotamus soup",
    emoji: "🍜"
  },
  {
    number: 26,
    source: "Musical Instruments",
    text: "A piano has seventy five hundred parts and can play the range of nearly an entire orchestra",
    emoji: "🎵"
  },
  {
    number: 27,
    source: "Social Media",
    text: "Social media users spend an average of two hours and twenty four minutes per day on social platforms",
    emoji: "📲"
  },
  {
    number: 28,
    source: "Pasta",
    text: "There are more than six hundred shapes of pasta worldwide with spaghetti penne and macaroni among the most popular",
    emoji: "🍝"
  },
  {
    number: 29,
    source: "Puppy",
    text: "Puppies need fifteen to twenty hours of sleep per day to support their rapid development",
    emoji: "🐶"
  },
  {
    number: 30,
    source: "Party",
    text: "The Holi festival one of the world's oldest party traditions has been celebrated for over two thousand years",
    emoji: "🎉"
  }
];

function getTodaysFactFall() {
  const now = new Date();
  const estNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  // Reset to midnight for day calculation
  const todayMidnight = new Date(estNow);
  todayMidnight.setHours(0, 0, 0, 0);
  const anchorMidnight = new Date(ANCHOR_DATE);
  anchorMidnight.setHours(0, 0, 0, 0);
  const daysSinceAnchor = Math.floor((todayMidnight - anchorMidnight) / (1000 * 60 * 60 * 24));
  const index = ((daysSinceAnchor % factFallsPuzzles.length) + factFallsPuzzles.length) % factFallsPuzzles.length;
  return factFallsPuzzles[index];
}

// For use in Next.js: export default factFallsPuzzles;
// export { getTodaysFactFall };