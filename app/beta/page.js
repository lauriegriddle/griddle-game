export default function BetaGames() {
  const betaGames = [
    {
      name: "Checkers",
      href: "/checkers",
      emoji: "🔴",
      description: "Beta testing in progress"
    },
    {
      name: "Griddle Chronicles",
      href: "/chronicles",
      emoji: "🌌",
      description: "Race against time to preserve trivia in the leather-bound tome for future generations!"
    },
    {
      name: "Griddle Codex",
      href: "/decoder",
      emoji: "📜",
      description: "Choose your knowledge domains and decode trivia entries before time runs out!"
    },
    {
      name: "Griddlelogue",
      href: "/griddlelogue",
      emoji: "📖",
      description: "A trivia travelogue for cafe regulars across time. Set your questions, set your timer, preserve the lore!"
    },
    {
      name: "Letter Griddle Land",
      href: "/griddle-land",
      emoji: "🍂",
      description: "Beta testing. Guide the Trivia Crew to the Cinnamon Festival!"
    },
    {
      name: "Servings",
      href: "/servings",
      emoji: "🍽️",
      description: "Beta testing in progress"
    },
    {
      name: "Stadium Scramble",
      href: "/challenge",
      emoji: "🏟️",
      description: "Beta testing in progress. Snake through the grid to find all 5 hidden words!"
    },
    {
      name: "Stacks",
      href: "/stacks",
      emoji: "🥞",
      description: "Beta testing in progress"
    },
    {
      name: "Travels",
      href: "/travels",
      emoji: "🌍",
      description: "Beta testing in progress."
    },
    {
      name: "Winter Land",
      href: "/winter-land",
      emoji: "⛷️",
      description: "Beta testing. Guide the Trivia Crew to the Winter Sports Festival!"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🧪</div>
          <h1 className="text-4xl font-bold text-amber-800 mb-2">Beta Games</h1>
          <p className="text-amber-600">Thank you for being a tester!</p>
        </div>
        <div className="space-y-4">
          {betaGames.map((game) => (
            <a
              key={game.name}
              href={game.href}
              className="block bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{game.emoji}</span>
                <div>
                  <h2 className="text-xl font-bold text-amber-800">{game.name}</h2>
                  <p className="text-amber-600 text-sm">{game.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-8 text-amber-600 text-sm">
          <a href="/" className="hover:text-amber-800 underline">← Back to Letter Griddle</a>
        </div>
      </div>
    </div>
  );
}
