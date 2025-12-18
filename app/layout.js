import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css'

export const metadata = {
  title: 'Letter Griddle Game - Daily Word Puzzle Game 🥞  ',
  description: 'Stack letters like pancakes in this delicious daily word puzzle game!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        </body>
    </html>
  )
}