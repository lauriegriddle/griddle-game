export const metadata = {
  title: 'lettergriddle.com',
  description: 'The griddle is hot, so stay cool! A summer word unscramble game from the Letter Griddle family.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>☀️</text></svg>",
  },
  openGraph: {
    title: 'Beat the Heat — Letter Griddle',
    description: 'The griddle is hot, so stay cool! Unscramble summer words before they melt.',
    url: 'https://www.lettergriddle.com/beat-the-heat',
    siteName: 'Letter Griddle',
    type: 'website',
  },
};

export default function BeatTheHeatLayout({ children }) {
  return <>{children}</>;
}