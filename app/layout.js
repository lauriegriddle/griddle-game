import { Analytics } from '@vercel/analytics/react';
import './globals.css'

export const metadata = {
  title: 'Griddle - Daily Word Puzzle Game 🥞',
  description: 'Stack letters like pancakes in this delicious daily word puzzle game!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        </body>
    </html>
  )
}