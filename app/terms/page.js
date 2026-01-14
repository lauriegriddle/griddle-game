export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border-4 border-amber-200">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🥞</div>
          <h1 className="text-4xl font-bold text-amber-800" style={{fontFamily: 'Georgia, serif'}}>
            Terms of Service
          </h1>
        </div>

        <div className="space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">
            <strong>Last Updated:</strong> November 5, 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">Welcome to Letter Griddle</h2>
            <p>
              By accessing and using Letter Griddle at www.lettergriddle.com, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">Use of the Game</h2>
            
            <h3 className="text-xl font-semibold text-amber-700 mb-2 mt-4">License</h3>
            <p>
              We grant you a personal, non-exclusive, non-transferable, revocable license to access and use Letter Griddle for your personal entertainment.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 mb-2 mt-4">Acceptable Use</h3>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Use the Game for any illegal purpose</li>
              <li>Attempt to hack, reverse engineer, or disrupt the Game</li>
              <li>Use automated tools or bots to play the Game</li>
              <li>Copy, modify, or distribute the Game content without permission</li>
              <li>Remove or modify any copyright notices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">Game Content</h2>
            <p>
              All puzzles, design elements, and content in Letter Griddle are protected by copyright. The Game is provided for entertainment purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">Sharing Results</h2>
            <p>
              When you share your puzzle results, you may post them on social media. The shared results do not contain personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">Disclaimer</h2>
            <p>
              Letter Griddle is provided as is without warranties. We do not guarantee the Game will always be available or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">Limitation of Liability</h2>
            <p>
              Letter Griddle shall not be liable for any damages arising from your use of the Game.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">Contact</h2>
            <p>
              Questions? Contact us at{' '}
              <a href="mailto:lettergriddle.gmail.com" className="text-amber-600 hover:text-amber-700 underline">
                lettergriddle@gmail.com
              </a>
            </p>
          </section>

          <div className="mt-8 pt-6 border-t-2 border-amber-200 text-center">
            <a href="/" className="inline-block bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all">
              ← Back to Game
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}