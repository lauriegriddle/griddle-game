export default function BetaGames() {
  const betaGames = [
    {
      name: "Checkers",
      href: "/checkers",
      emoji: "🔴",
      description: "Beta testing in progress"
    },
    {
      name: "Cool Beans",
      href: "/cool-beans",
      emoji: "🫘",
      description: "Pick the cooler colored bean! Sort as many cool colors as you can in 30 seconds."
    },
    {
    name: "Fact Falls",
    href: "/factfalls",
    emoji: "💧",
    description: "Quote Falls meets Letter Griddle! Complete facts and puzzle categories with falling letters."
  },
    {
      name: "Stacks",
      href: "/stacks",
      emoji: "🥞",
      description: "Beta testing in progress"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🧪</div>
          <h1 className="text-4xl font-bold text-amber-800 mb-2">Beta Games</h1>
          <p className="text-amber-600">Thank you for being a tester! Please let me know if there are problems with any of the puzzles lettergriddle@gmail.com</p>
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
