export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border-4 border-amber-200">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🥞</div>
          <h1 className="text-4xl font-bold text-amber-800" style={{fontFamily: 'Georgia, serif'}}>
            Privacy Policy
          </h1>
        </div>

        <div className="space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">
            <strong>Last Updated:</strong> November 5, 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">Welcome to Letter Griddle</h2>
            <p>
              Letter Griddle ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our daily word puzzle game at www.lettergriddle.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-amber-700 mb-2 mt-4">Local Storage Data</h3>
            <p className="mb-2">
              We store game data locally on your device using your browser's local storage. This includes:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Your puzzle completion statistics (puzzles completed, streaks, fastest times)</li>
              <li>Achievement progress</li>
              <li>Game preferences</li>
            </ul>
            <p className="mt-2">
              This data never leaves your device and is not sent to our servers. You can clear this data at any time through your browser settings.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 mb-2 mt-4">Analytics Data</h3>
            <p>
              We use Vercel Web Analytics to understand how visitors use our site. This service collects anonymous usage data including:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Page views and navigation patterns</li>
              <li>Device type and browser information</li>
              <li>General geographic location (country/region level only)</li>
              <li>Site performance metrics</li>
            </ul>
            <p className="mt-2">
              Vercel Analytics does not use cookies and does not collect personally identifiable information. Learn more at{' '}
              <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 underline">
                Vercel's Analytics Privacy Policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">What We Don't Collect</h2>
            <p>We do not:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Require you to create an account</li>
              <li>Collect your name, email address, or any personal contact information</li>
              <li>Use traditional tracking cookies</li>
              <li>Sell or share your data with third parties</li>
              <li>Track you across other websites</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">Children's Privacy</h2>
            <p>
              Letter Griddle is suitable for all ages. We do not knowingly collect personal information from anyone. The game can be played without providing any personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Clear your local game data at any time through your browser settings</li>
              <li>Use browser privacy features or ad blockers (though we don't show ads)</li>
              <li>Contact us with questions about this policy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:laurie@lettergriddle.com" className="text-amber-600 hover:text-amber-700 underline">
                laurie@lettergriddle.com
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