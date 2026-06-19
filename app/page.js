"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [showStories, setShowStories] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [showSummer, setShowSummer] = useState(false);
  
  
  // SECTION 1: Daily Favorites (all daily games)
  const dailyFavorites = [
    {
      name: "Letter Griddle",
      tagline: "The original daily word puzzle",
      dropTime: "7:00 PM EST",
      emoji: "\uD83E\uDD5E",
      href: "/play",
      thumbnail: {
        gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #EA580C 100%)",
        tiles: "PLAY",
        tileBg: "bg-white",
        tileText: "#D97706",
        title: ["Letter", "Griddle"],
        subtitle: "Daily Word Puzzle",
        subtitleColor: "text-amber-100"
      },
      borderColor: "border-amber-300",
      bgColor: "from-amber-100 to-yellow-100",
      textColor: "text-amber-800",
      subTextColor: "text-amber-700",
      timeColor: "text-amber-600",
      hoverBg: "bg-amber-600/80"
    },
    {
      name: "Letter Griddle Mini",
      tagline: "A bite-sized word puzzle",
      dropTime: "7:15 PM EST",
      emoji: "\uD83C\uDF6F",
      href: "/mini",
      thumbnail: {
        gradient: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)",
        title: ["Letter Griddle", "Mini"],
        subtitle: "Bite-Sized Puzzle",
        subtitleColor: "text-yellow-100"
      },
      borderColor: "border-yellow-300",
      bgColor: "from-yellow-100 to-amber-100",
      textColor: "text-yellow-800",
      subTextColor: "text-yellow-700",
      timeColor: "text-yellow-600",
      hoverBg: "bg-yellow-500/80"
    },
    {
      name: "Little Letter Griddle",
      tagline: "Words and a moonlit puzzle",
      dropTime: "7:30 PM EST",
      emoji: "\uD83C\uDF19",
      href: "https://littlelettergriddle.com",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(135deg, #818CF8 0%, #6366F1 50%, #4F46E5 100%)",
        icon: "\uD83C\uDF19",
        iconSize: "text-5xl",
        title: ["Little Letter", "Griddle"],
        subtitle: "Moonlit Puzzle",
        subtitleColor: "text-indigo-200",
        hasStars: true
      },
      borderColor: "border-indigo-200",
      bgColor: "from-indigo-100 to-purple-100",
      textColor: "text-indigo-800",
      subTextColor: "text-indigo-700",
      timeColor: "text-indigo-600",
      hoverBg: "bg-indigo-500/80"
    },
    {
      name: "Letter Griddle Flips",
      tagline: "Daily trivia flip",
      dropTime: "7:45 PM EST",
      emoji: "\u2615",
      href: "/flips",
      thumbnail: {
        gradient: "linear-gradient(135deg, #B45309 0%, #92400E 50%, #78350F 100%)",
        icon: "\u2615",
        iconSize: "text-4xl",
        title: ["Letter Griddle", "Flips"],
        titleStyle: ["text-xl", "text-3xl italic"],
        subtitle: "Daily Trivia",
        subtitleColor: "text-amber-200"
      },
      borderColor: "border-amber-300",
      bgColor: "from-amber-100 to-yellow-100",
      textColor: "text-amber-900",
      subTextColor: "text-amber-700",
      timeColor: "text-amber-600",
      hoverBg: "bg-amber-700/80"
    },
    {
      name: "Letter Griddle Buffet",
      tagline: "Ambiance and words",
      dropTime: "8:00 PM EST",
      emoji: "\uD83C\uDF7D\uFE0F",
      href: "https://lettergriddlebuffet.com",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(135deg, #F97316 0%, #EA580C 50%, #DC2626 100%)",
        icon: "\uD83C\uDF7D\uFE0F",
        iconSize: "text-4xl",
        title: ["Letter Griddle", "Buffet"],
        subtitle: "All-You-Can-Play",
        subtitleColor: "text-orange-100"
      },
      borderColor: "border-orange-200",
      bgColor: "from-orange-100 to-red-100",
      textColor: "text-orange-800",
      subTextColor: "text-orange-700",
      timeColor: "text-orange-600",
      hoverBg: "bg-orange-500/80"
    },
    {
      name: "Cafe Game",
      tagline: "A Cafe Daily Special Puzzle",
      dropTime: "7:00 AM EST",
      emoji: "\uD83D\uDC51",
      href: "https://lettergriddlecafe.com/game",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(160deg, #fbbf24 0%, #c2410c 30%, #312e81 70%, #0c4a6e 100%)",
        icon: "\uD83D\uDC51",
        iconSize: "text-4xl",
        title: ["Cafe", "Game"],
        subtitle: "A CAFE SPECIAL",
        subtitleColor: "text-amber-200"
      },
      borderColor: "border-amber-700",
      bgColor: "from-amber-100 to-orange-100",
      textColor: "text-amber-900",
      subTextColor: "text-amber-700",
      timeColor: "text-amber-600",
      hoverBg: "bg-amber-800/80"
    },
  ];

  // SECTION 2: Fan Favorites
  const grandOpeningGames = [
    {
      name: "Pancakes",
      tagline: "Earn the toppings! 30 Puzzles!",
      emoji: "\uD83E\uDD5E",
      href: "/pancakes",
      thumbnail: {
        gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #92400E 100%)",
        icon: "\uD83E\uDD5E",
        iconSize: "text-5xl",
        title: ["Letter Griddle", "Pancakes"],
        subtitle: "Word Search Game",
        subtitleColor: "text-amber-100"
      },
      borderColor: "border-amber-400",
      bgColor: "from-amber-100 to-orange-100",
      textColor: "text-amber-800",
      subTextColor: "text-amber-700",
      hoverBg: "bg-amber-600/80"
    },
    {
      name: "Griddle Logic",
      tagline: "Choose your challenge!",
      emoji: "\uD83E\uDDE9",
      href: "/logic",
      thumbnail: {
        gradient: "linear-gradient(135deg, #6366F1 0%, #4F46E5 50%, #4338CA 100%)",
        icon: "\uD83E\uDDE9",
        iconSize: "text-5xl",
        title: ["Griddle", "Logic"],
        subtitle: "Logic Puzzle",
        subtitleColor: "text-indigo-100"
      },
      borderColor: "border-indigo-400",
      bgColor: "from-indigo-100 to-purple-100",
      textColor: "text-indigo-800",
      subTextColor: "text-indigo-700",
      hoverBg: "bg-indigo-500/80"
    },
  ];

  // SECTION 3: More Games
  const letterGriddleGames = [
    {
      name: "Griddle Falls",
      tagline: "With the Letter Griddle Cafe Crew",
      emoji: "\u2615",
      href: "https://griddlefalls.com",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(135deg, #D4833A 0%, #C2632A 50%, #8B3A1A 100%)",
        icon: "\u2615",
        iconSize: "text-4xl",
        title: ["Griddle", "Falls"],
        subtitle: "Cozy Cafe Trivia",
        subtitleColor: "text-orange-100"
      },
      borderColor: "border-orange-300",
      bgColor: "from-orange-100 to-amber-100",
      textColor: "text-orange-800",
      subTextColor: "text-orange-700",
      hoverBg: "bg-orange-500/80"
    },
    {
      name: "Spins",
      tagline: "Complete the song titles to reveal links to songs",
      emoji: "\uD83D\uDCBF",
      href: "/spins",
      thumbnail: {
        gradient: "linear-gradient(135deg, #A855F7 0%, #7C3AED 50%, #6D28D9 100%)",
        icon: "\uD83D\uDCBF",
        iconSize: "text-5xl",
        title: ["Letter Griddle", "Spins"],
        subtitle: "Music Word Game",
        subtitleColor: "text-purple-200",
        hasStars: true
      },
      borderColor: "border-purple-400",
      bgColor: "from-purple-100 to-violet-100",
      textColor: "text-purple-800",
      subTextColor: "text-purple-700",
      hoverBg: "bg-purple-500/80"
    },
    {
      name: "Hoopla",
      tagline: "Word-Finding Challenge! 20 Puzzles!",
      emoji: "\uD83D\uDCE3",
      href: "/hoopla",
      thumbnail: {
        gradient: "linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)",
        icon: "\uD83D\uDCE3",
        iconSize: "text-5xl",
        title: ["Letter Griddle", "Hoopla"],
        subtitle: "Game Night Pep Rally",
        subtitleColor: "text-red-100"
      },
      borderColor: "border-red-400",
      bgColor: "from-red-100 to-orange-100",
      textColor: "text-red-800",
      subTextColor: "text-red-700",
      hoverBg: "bg-red-500/80"
    },
    {
      name: "Jukebox",
      tagline: "One word leads to the next",
      emoji: "\uD83C\uDFB5",
      href: "https://lettergriddlecafe.com/jukebox",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(135deg, #115e59 0%, #0f4c4c 50%, #0a3939 100%)",
        icon: "\uD83D\uDCBF",
        iconSize: "text-4xl",
        title: ["Jukebox"],
        subtitle: "Word Chain",
        subtitleColor: "text-teal-200"
      },
      borderColor: "border-teal-700",
      bgColor: "from-teal-100 to-cyan-100",
      textColor: "text-teal-900",
      subTextColor: "text-teal-700",
      hoverBg: "bg-teal-800/80"
    },
    {
      name: "Griddle Shake",
      tagline: "A Letter Griddle Word Hunt Game",
      emoji: "\uD83D\uDD0D",
      href: "/griddleshake",
      thumbnail: {
        gradient: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 25%, #f5d0fe 50%, #a5f3fc 75%, #c4b5fd 100%)",
        icon: "\uD83D\uDD0D",
        iconSize: "text-4xl",
        title: ["Griddle", "Shake"],
        subtitle: "WORD HUNT",
        subtitleColor: "text-purple-100"
      },
      borderColor: "border-purple-300",
      bgColor: "from-purple-50 to-pink-50",
      textColor: "text-purple-800",
      subTextColor: "text-purple-600",
      hoverBg: "bg-purple-400/80"
    },
    {
      name: "Kerflufflegrid",
      tagline: "Reveal the theme before Kerflufflegrid",
      emoji: "\u231B",
      href: "https://kerflufflegrid.com",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
        icon: "\u231B",
        iconSize: "text-4xl",
        title: ["Kerfluffle", "grid"],
        subtitle: "Beat the Clock",
        subtitleColor: "text-amber-100"
      },
      borderColor: "border-amber-300",
      bgColor: "from-amber-100 to-yellow-100",
      textColor: "text-amber-800",
      subTextColor: "text-amber-700",
      hoverBg: "bg-amber-600/80"
    },
    {
      name: "Saddle Shoes",
      tagline: "A retro memory matching game",
      emoji: "\uD83D\uDC5F",
      href: "/saddleshoes",
      thumbnail: {
        gradient: "linear-gradient(135deg, #78350f 0%, #44403c 50%, #451a03 100%)",
        icon: "\uD83C\uDF68",
        iconSize: "text-4xl",
        title: ["Saddle", "Shoes"],
        subtitle: "Memory Match Game",
        subtitleColor: "text-amber-100"
      },
      borderColor: "border-amber-800",
      bgColor: "from-amber-100 to-stone-100",
      textColor: "text-amber-900",
      subTextColor: "text-amber-700",
      hoverBg: "bg-amber-800/80"
    },
    {
      name: "Tile Griddle",
      tagline: "A domino game with the Trivia Crew",
      emoji: "\uD83E\uDD5E\uD83E\uDDC1\uD83C\uDF7F",
      href: "/tilegriddle",
      thumbnail: {
        gradient: "linear-gradient(135deg, #f6ad55 0%, #ed8936 50%, #dd6b20 100%)",
        icon: "\uD83E\uDD5E|\uD83E\uDD5E",
        iconSize: "text-3xl",
        title: ["Tile", "Griddle"],
        subtitle: "MATCH GAME",
        subtitleColor: "text-orange-100"
      },
      borderColor: "border-orange-300",
      bgColor: "from-orange-50 to-amber-50",
      textColor: "text-orange-800",
      subTextColor: "text-orange-700",
      hoverBg: "bg-orange-500/80"
    },
    {
      name: "Scoops",
      tagline: "Get the scoop!",
      emoji: "\u2615",
      href: "/scoops",
      thumbnail: {
        gradient: "linear-gradient(135deg, #F97316 0%, #EA580C 50%, #C2410C 100%)",
        icon: "\u2615",
        iconSize: "text-5xl",
        title: ["Letter Griddle", "Scoops"],
        subtitle: "Trivia Challenge Letter Griddle Style",
        subtitleColor: "text-orange-100"
      },
      borderColor: "border-orange-400",
      bgColor: "from-orange-100 to-amber-100",
      textColor: "text-orange-800",
      subTextColor: "text-orange-700",
      hoverBg: "bg-orange-500/80"
    },
  ];

  // SECTION 4: Stories, Recipes & More
  const storiesAndMore = [
    {
      name: "Letter Griddle Cafe",
      tagline: "Fictional stories and puzzles",
      emoji: "\uD83E\uDDE1",
      href: "https://lettergriddlecafe.com",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(160deg, #1a3a6e 0%, #6b3fa0 45%, #c25a1c 80%, #f5b942 100%)",
        icon: "\uD83E\uDDE1",
        iconSize: "text-4xl",
        title: ["Letter Griddle", "Cafe"],
        titleStyle: ["text-lg", "text-2xl"],
        subtitle: "Stories & Puzzles",
        subtitleColor: "text-amber-100"
      },
      borderColor: "border-orange-200",
      bgColor: "from-orange-100 to-amber-100",
      textColor: "text-orange-800",
      subTextColor: "text-orange-700",
      hoverBg: "bg-amber-600/80"
    },
    {
      name: "Cookbook",
      tagline: "Recipes paired with word puzzles",
      emoji: "\uD83C\uDF4A",
      href: "https://lettergriddlecookbook.com",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(160deg, #2a2a7e 0%, #8b3090 45%, #c26a0c 80%, #f0a830 100%)",
        icon: "\uD83C\uDF4A",
        iconSize: "text-4xl",
        title: ["Letter Griddle", "Cookbook"],
        subtitle: "Recipes + Puzzles",
        subtitleColor: "text-orange-100"
      },
      borderColor: "border-orange-200",
      bgColor: "from-orange-100 to-amber-100",
      textColor: "text-orange-800",
      subTextColor: "text-orange-700",
      hoverBg: "bg-orange-500/80"
    },
  ];

  // SECTION: Cafe Specials
  const cafeSpecials = [
    {
      name: "The Cafe Synth",
      tagline: "Play a musical keyboard.",
      emoji: "🎹",
      href: "/synth",
      thumbnail: {
        gradient: "linear-gradient(135deg, #D4833A 0%, #C2632A 50%, #8B3A1A 100%)",
        icon: "🎹",
        iconSize: "text-4xl",
        title: ["The Cafe", "Synth"],
        subtitle: "PLAY THE SYNTH",
        subtitleColor: "text-amber-200"
      },
      borderColor: "border-amber-700",
      bgColor: "from-amber-100 to-orange-100",
      textColor: "text-amber-900",
      subTextColor: "text-amber-700",
      hoverBg: "bg-amber-800/80"
    },
    {
      name: "Griddlelogue",
      tagline: "Set your timer and preserve the lore!",
      emoji: "🕰️",
      href: "/griddlelogue",
      thumbnail: {
        gradient: "linear-gradient(135deg, #92400e 0%, #78350f 50%, #451a03 100%)",
        icon: "🕰️",
        iconSize: "text-4xl",
        title: ["Griddle", "logue"],
        subtitle: "CAFE TRIVIA TRAVELOGUE",
        subtitleColor: "text-amber-200"
      },
      borderColor: "border-amber-700",
      bgColor: "from-amber-50 to-stone-100",
      textColor: "text-amber-900",
      subTextColor: "text-amber-700",
      hoverBg: "bg-amber-900/80"
    },
    {
      name: "Griddle Rush",
      tagline: "Drag emoji tiles, match 3 to clear, beat your best!",
      emoji: "🍳",
      href: "/rush",
      thumbnail: {
        gradient: "linear-gradient(135deg, #b45309 0%, #92400e 50%, #451a03 100%)",
        icon: "🍳",
        iconSize: "text-4xl",
        title: ["Griddle", "Rush"],
        subtitle: "MATCH 3 TILE GAME",
        subtitleColor: "text-amber-200"
      },
      borderColor: "border-amber-700",
      bgColor: "from-amber-50 to-orange-100",
      textColor: "text-amber-900",
      subTextColor: "text-amber-700",
      hoverBg: "bg-amber-800/80"
    },
  ];

  // SECTION 5: Espresso Lane
  const espressoLaneGames = [
    {
      name: "Glow",
      tagline: "Flip pancakes to reveal your activity",
      emoji: "\u2728",
      href: "/glow",
      thumbnail: {
        gradient: "linear-gradient(135deg, #2d1b0e 0%, #1a0f05 50%, #0d0803 100%)",
        icon: "\u2728",
        iconSize: "text-5xl",
        title: ["Letter Griddle", "Glow"],
        subtitle: "Daily Activity",
        subtitleColor: "text-amber-300/70"
      },
      borderColor: "border-amber-700",
      bgColor: "from-amber-50 to-orange-50",
      textColor: "text-amber-900",
      subTextColor: "text-amber-700",
      hoverBg: "bg-amber-900/80"
    },
    {
      name: "Sizzle",
      tagline: "Beat the 30-second clock",
      emoji: "\uD83E\uDD53",
      href: "/sizzle",
      thumbnail: {
        gradient: "linear-gradient(135deg, #3d2216 0%, #2a1610 50%, #1a0e08 100%)",
        icon: "\uD83E\uDD53",
        iconSize: "text-5xl",
        title: ["Letter Griddle", "Sizzle"],
        subtitle: "Speed Game",
        subtitleColor: "text-orange-300/70"
      },
      borderColor: "border-orange-700",
      bgColor: "from-orange-50 to-amber-50",
      textColor: "text-orange-900",
      subTextColor: "text-orange-700",
      hoverBg: "bg-orange-900/80"
    },
    {
      name: "Top That!",
      tagline: "Pick the pancake topping quickly!",
      emoji: "\uD83E\uDD5E",
      href: "/topthat",
      thumbnail: {
        gradient: "linear-gradient(135deg, #352418 0%, #261810 50%, #180e08 100%)",
        icon: "\uD83E\uDD5E",
        iconSize: "text-5xl",
        title: ["Letter Griddle", "Top That!"],
        subtitle: "Quick Decisions",
        subtitleColor: "text-amber-300/60"
      },
      borderColor: "border-amber-600",
      bgColor: "from-amber-50 to-yellow-50",
      textColor: "text-amber-900",
      subTextColor: "text-amber-700",
      hoverBg: "bg-amber-800/80"
    },
    {
      name: "Lattes",
      tagline: "Spot the coffee item. Cortado or Canoe?",
      emoji: "\u2615",
      href: "/lattes",
      thumbnail: {
        gradient: "linear-gradient(135deg, #2c2018 0%, #221810 50%, #0e0806 100%)",
        icon: "\u2615",
        iconSize: "text-5xl",
        title: ["Letter Griddle", "Lattes"],
        subtitle: "Coffee Game",
        subtitleColor: "text-amber-200/60"
      },
      borderColor: "border-amber-800",
      bgColor: "from-amber-50 to-stone-50",
      textColor: "text-amber-900",
      subTextColor: "text-amber-800",
      hoverBg: "bg-amber-900/80"
    },
    {
      name: "Order Up!",
      tagline: "Assemble the order quickly!",
      emoji: "\uD83C\uDF73",
      href: "/order",
      thumbnail: {
        gradient: "linear-gradient(135deg, #2a1a0e 0%, #1c1008 50%, #100a04 100%)",
        icon: "\uD83C\uDF73",
        iconSize: "text-5xl",
        title: ["Letter Griddle", "Order Up!"],
        subtitle: "Timed Challenge",
        subtitleColor: "text-amber-300/60"
      },
      borderColor: "border-amber-700",
      bgColor: "from-amber-50 to-orange-50",
      textColor: "text-amber-900",
      subTextColor: "text-amber-700",
      hoverBg: "bg-amber-900/80"
    },
    {
      name: "To Go!",
      tagline: "Complete the order",
      emoji: "\uD83E\uDD61",
      href: "/togo",
      thumbnail: {
        gradient: "linear-gradient(135deg, #261a12 0%, #1a1008 50%, #0e0804 100%)",
        icon: "\uD83E\uDD61",
        iconSize: "text-5xl",
        title: ["Letter Griddle", "To Go!"],
        subtitle: "Coffee Orders",
        subtitleColor: "text-amber-200/60"
      },
      borderColor: "border-amber-800",
      bgColor: "from-amber-50 to-stone-50",
      textColor: "text-amber-900",
      subTextColor: "text-amber-800",
      hoverBg: "bg-amber-900/80"
    }
  ];

  // SECTION 6: Summer Days
  const summerDaysGames = [
    {
      name: "Radio",
      tagline: "Sounds of Summer and Links to Songs",
      emoji: "\uD83D\uDCFB",
      href: "/radio",
      thumbnail: {
        gradient: "linear-gradient(160deg, #0c4a6e 0%, #0369a1 40%, #0ea5e9 70%, #38bdf8 100%)",
        icon: "\uD83D\uDCFB",
        iconSize: "text-5xl",
        title: ["Letter Griddle", "Radio"],
        subtitle: "SOUNDS OF SUMMER",
        subtitleColor: "text-sky-100"
      },
      borderColor: "border-sky-400",
      bgColor: "from-sky-50 to-blue-100",
      textColor: "text-sky-900",
      subTextColor: "text-sky-700",
      hoverBg: "bg-sky-800/80"
    },
    {
      name: "Beat the Heat",
      tagline: "The griddle is hot, so stay cool!",
      emoji: "\u2600\uFE0F",
      href: "/beat-the-heat",
      thumbnail: {
        gradient: "linear-gradient(160deg, #1e3a8a 0%, #0369a1 35%, #0ea5e9 65%, #7dd3fc 100%)",
        icon: "\u2600\uFE0F",
        iconSize: "text-5xl",
        title: ["Beat the", "Heat"],
        subtitle: "STAY COOL!",
        subtitleColor: "text-sky-100"
      },
      borderColor: "border-sky-400",
      bgColor: "from-sky-50 to-blue-100",
      textColor: "text-sky-900",
      subTextColor: "text-sky-700",
      hoverBg: "bg-sky-700/80"
    },
    {
      name: "Summer Cottage",
      tagline: "10 summer puzzles with fun facts!",
      emoji: "\uD83C\uDFD6\uFE0F",
      href: "https://lettergriddlecottage.com",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(160deg, #0c4a6e 0%, #0e7490 35%, #0891b2 65%, #22d3ee 100%)",
        icon: "\uD83C\uDFD6\uFE0F",
        iconSize: "text-4xl",
        title: ["Summer", "Cottage"],
        subtitle: "SUMMER ESCAPE",
        subtitleColor: "text-cyan-100"
      },
      borderColor: "border-cyan-400",
      bgColor: "from-cyan-50 to-sky-100",
      textColor: "text-cyan-900",
      subTextColor: "text-cyan-700",
      hoverBg: "bg-cyan-800/80"
    },
    {
      name: "Beach Cottage",
      tagline: "Decorate your beach cottage!",
      emoji: "\uD83C\uDFE1",
      href: "https://lettergriddlecottage.com/beach",
      external: true,
      thumbnail: {
        gradient: "linear-gradient(160deg, #1e3a8a 0%, #1d4ed8 30%, #0369a1 60%, #0ea5e9 100%)",
        icon: "\uD83C\uDFE1",
        iconSize: "text-4xl",
        title: ["Beach", "Cottage"],
        subtitle: "DECORATE YOUR COTTAGE",
        subtitleColor: "text-blue-100"
      },
      borderColor: "border-blue-400",
      bgColor: "from-blue-50 to-sky-100",
      textColor: "text-blue-900",
      subTextColor: "text-blue-700",
      hoverBg: "bg-blue-800/80"
    },
    {
      name: "Letter Griddle Travels",
      tagline: "Offered as a puzzle book too!",
      emoji: "\u2708\uFE0F",
      href: "/travels",
      thumbnail: {
        gradient: "linear-gradient(160deg, #0c4a6e 0%, #0369a1 30%, #0891b2 60%, #67e8f9 100%)",
        icon: "\u2708\uFE0F",
        iconSize: "text-5xl",
        title: ["Letter Griddle", "Travels"],
        subtitle: "SUMMER ADVENTURES",
        subtitleColor: "text-cyan-100"
      },
      borderColor: "border-cyan-400",
      bgColor: "from-cyan-50 to-sky-100",
      textColor: "text-cyan-900",
      subTextColor: "text-cyan-700",
      hoverBg: "bg-cyan-700/80"
    },
    {
      name: "Letter Griddle Geo",
      tagline: "Pick a country. Solve the words.",
      emoji: "\uD83C\uDF0D",
      href: "/geo",
      thumbnail: {
        gradient: "linear-gradient(160deg, #0c4a6e 0%, #1e3a8a 35%, #1d4ed8 65%, #3b82f6 100%)",
        icon: "\uD83C\uDF0D",
        iconSize: "text-5xl",
        title: ["Letter Griddle", "Geo"],
        subtitle: "WORLD WORD PUZZLE",
        subtitleColor: "text-blue-100"
      },
      borderColor: "border-blue-400",
      bgColor: "from-blue-50 to-indigo-100",
      textColor: "text-blue-900",
      subTextColor: "text-blue-700",
      hoverBg: "bg-blue-800/80"
    },
  ];

  const renderThumbnail = (game) => {
    const { thumbnail } = game;
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden"
        style={{ background: thumbnail.gradient }}
      >
        {thumbnail.hasStars && (
          <>
            <div className="absolute top-3 left-5 text-white/40 text-sm">{"\u2726"}</div>
            <div className="absolute top-6 right-6 text-white/30 text-xs">{"\u2726"}</div>
            <div className="absolute bottom-8 left-8 text-white/25 text-sm">{"\u2726"}</div>
            <div className="absolute top-10 left-1/4 text-white/20 text-xs">{"\u2726"}</div>
            <div className="absolute bottom-12 right-10 text-white/35 text-xs">{"\u2726"}</div>
          </>
        )}
        {thumbnail.tiles && (
          <div className="flex gap-1.5 mb-3">
            {thumbnail.tiles.split('').map((letter, i) => (
              <div
                key={i}
                className={`${thumbnail.tiles === 'PLAY' ? 'w-10 h-11' : 'w-9 h-10'} ${thumbnail.tileBg} rounded-lg flex items-center justify-center shadow-md`}
              >
                <span
                  className={`${thumbnail.tiles === 'PLAY' ? 'text-lg' : 'text-base'} font-bold`}
                  style={{ fontFamily: 'Georgia, serif', color: thumbnail.tileText }}
                >
                  {letter}
                </span>
              </div>
            ))}
          </div>
        )}
        {thumbnail.icon && (
          <div className={`${thumbnail.iconSize} mb-2`}>{thumbnail.icon}</div>
        )}
        <div className="text-center">
          {thumbnail.title.map((line, i) => (
            <div
              key={i}
              className={`font-bold text-white leading-tight ${
                thumbnail.titleStyle
                  ? thumbnail.titleStyle[i]
                  : i === 0 && thumbnail.title.length > 1 && !thumbnail.tiles
                    ? 'text-xl'
                    : 'text-2xl'
              }`}
              style={{
                fontFamily: 'Georgia, serif',
                textShadow: '1px 1px 3px rgba(0,0,0,0.25)'
              }}
            >
              {line}
            </div>
          ))}
        </div>
        <div className={`text-xs tracking-widest uppercase mt-2 font-medium ${thumbnail.subtitleColor}`}>
          {thumbnail.subtitle}
        </div>
      </div>
    );
  };

  const GameCard = ({ game, children }) => {
    const baseClasses = `group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${game.borderColor} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${game.comingSoon ? 'opacity-70 pointer-events-none' : ''}`;
    if (game.external) {
      return (
        <a href={game.href} className={baseClasses} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={game.href} className={baseClasses}>
        {children}
      </Link>
    );
  };

  const GameGrid = ({ games }) => (
    <div className="flex flex-wrap justify-center gap-6">
      {games.map((game) => (
        <div key={game.name} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
          <GameCard game={game}>
            <div className="relative h-48">
              {renderThumbnail(game)}
              {game.comingSoon ? (
                <div className="absolute inset-0 bg-gray-800/60 flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-2xl mb-1">{"\u2744\uFE0F"}</p>
                    <p className="font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Coming Soon</p>
                  </div>
                </div>
              ) : (
                <div className={`absolute inset-0 ${game.hoverBg} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <span className="text-white font-bold text-lg">
                    {game.href.includes('cafe') || game.href.includes('cookbook') || game.href.includes('cottage') ? 'Visit \u2192' : 'Play Now \u2192'}
                  </span>
                </div>
              )}
            </div>
            <div className={`p-5 bg-gradient-to-br ${game.bgColor}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{game.emoji}</span>
                <h2 className={`text-xl font-bold ${game.textColor}`} style={{ fontFamily: 'Georgia, serif' }}>
                  {game.name}
                </h2>
              </div>
              <p className={`${game.subTextColor} text-sm mb-2`}>{game.tagline}</p>
              {game.dropTime && (
                <p className={`${game.timeColor} text-xs font-semibold`}>
                  {"\uD83D\uDD56"} New puzzle daily at {game.dropTime}
                </p>
              )}
            </div>
          </GameCard>
        </div>
      ))}
    </div>
  );

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <header className="text-center py-12 px-4">
        <div className="text-6xl mb-4">{"\uD83E\uDD5E"}</div>
        <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          The Letter Griddle Games
        </h1>
        <p className="text-sm text-amber-600 font-medium mb-6">
          {"\u2728"} Play free {"\u2022"} No downloads {"\u2728"}
        </p>
        <nav className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
          <button
            onClick={() => scrollToSection('daily-favorites')}
            className="inline-flex items-center gap-1 px-4 py-2 text-white rounded-full text-sm font-semibold shadow-md hover:opacity-90 transition-opacity animate-pulse"
            style={{ background: 'linear-gradient(135deg, #EA580C 0%, #D97706 50%, #92400E 100%)', animationDuration: '3s' }}
          >
            <span>{"\uD83E\uDD5E"}</span>
            Daily Favorites
          </button>
          
          <button
            onClick={() => { setShowStories(!showStories); if (!showStories) setTimeout(() => scrollToSection('stories-more'), 100); }}
            className="px-4 py-2 text-white rounded-full text-sm font-semibold hover:opacity-90 transition-colors shadow-md"
            style={{ background: 'linear-gradient(160deg, #0c4a6e 0%, #312e81 50%, #c2410c 80%, #fbbf24 100%)' }}
          >
            {"\u2728"} Stories & Recipes
          </button>
          
          <button
            onClick={() => { setShowSummer(!showSummer); if (!showSummer) setTimeout(() => scrollToSection('summer-days'), 100); }}
            className="px-4 py-2 text-white rounded-full text-sm font-semibold hover:opacity-90 transition-colors shadow-md"
            style={{ background: 'linear-gradient(160deg, #0c4a6e 0%, #0369a1 40%, #0ea5e9 75%, #38bdf8 100%)' }}
          >
            ☀️ Summer Days
          </button>
        </nav>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => { setShowBooks(!showBooks); if (!showBooks) setTimeout(() => scrollToSection('books'), 100); }}
            className="px-6 py-2 text-white rounded-full text-sm font-semibold hover:opacity-90 transition-colors shadow-md"
            style={{ background: 'linear-gradient(135deg, #BE123C 0%, #EA580C 50%, #B45309 100%)', fontFamily: 'Georgia, serif' }}
          >
            🍳 Screen-Free Books ✏️
          </button>
          
        </div>

        <div className="flex justify-center mt-3">
          <button
            onClick={() => window.location.href = '/archive'}
            className="px-6 py-2 text-white rounded-full text-sm font-semibold hover:opacity-90 transition-colors shadow-md"
            style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #92400E 100%)', fontFamily: 'Georgia, serif' }}
          >
            🗂️ Puzzle Archive
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-12">

        
        {/* SECTION 1: Daily Favorites */}
        <section id="daily-favorites" className="mb-16 scroll-mt-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-amber-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>Daily Favorites</h2>
            <p className="text-amber-600">Six daily puzzles starting at 7 PM EST!</p>
          </div>
          <style>{`
            .daily-card { min-width: 220px; border-radius: 16px; overflow: hidden; border: 2px solid #FCD34D; flex-shrink: 0; transform: scale(0.92); transition: transform 0.3s, opacity 0.3s; opacity: 0.7; cursor: pointer; text-decoration: none; display: block; background: white; }
            .daily-card.active { transform: scale(1); opacity: 1; border-color: #D97706; box-shadow: 0 6px 20px rgba(217,119,6,0.2); }
            .daily-track { display: flex; gap: 16px; transition: transform 0.4s cubic-bezier(.4,0,.2,1); padding: 12px 0 20px; }
          `}</style>
          <div className="overflow-hidden">
            <div className="daily-track" id="daily-track">
              {dailyFavorites.map((game, i) => (
                game.external ? (
                  <a key={game.name} href={game.href} target="_blank" rel="noopener noreferrer" className={`daily-card ${i === 0 ? 'active' : ''}`}>
                    <div className="relative h-36 flex flex-col items-center justify-center" style={{ background: game.thumbnail.gradient }}>
                      <div className="text-4xl mb-2">{game.thumbnail.icon}</div>
                      <p className="text-white font-bold text-sm text-center px-3" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>{game.thumbnail.title.join(' ')}</p>
                      <p className="text-xs uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.85)' }}>{game.thumbnail.subtitle}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-amber-50 to-yellow-100">
                      <p className="font-bold text-amber-900 text-sm mb-1" style={{ fontFamily: 'Georgia, serif' }}>{game.name}</p>
                      <p className="text-amber-700 text-xs italic mb-1" style={{ fontFamily: 'Georgia, serif' }}>{game.tagline}</p>
                      <p className="text-amber-600 font-semibold" style={{ fontSize: '10px' }}>🕖 {game.dropTime}</p>
                    </div>
                  </a>
                ) : (
                  <a key={game.name} href={game.href} className={`daily-card ${i === 0 ? 'active' : ''}`}>
                    <div className="relative h-36 flex flex-col items-center justify-center" style={{ background: game.thumbnail.gradient }}>
                      {game.thumbnail.tiles ? (
                        <div className="flex gap-1 mb-2">
                          {game.thumbnail.tiles.split('').map((letter, j) => (
                            <div key={j} className="w-8 h-9 bg-white rounded-lg flex items-center justify-center shadow-md">
                              <span className="text-sm font-bold" style={{ color: '#D97706', fontFamily: 'Georgia, serif' }}>{letter}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-4xl mb-2">{game.thumbnail.icon}</div>
                      )}
                      <p className="text-white font-bold text-sm text-center px-3" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>{game.thumbnail.title.join(' ')}</p>
                      <p className="text-xs uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.85)' }}>{game.thumbnail.subtitle}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-amber-50 to-yellow-100">
                      <p className="font-bold text-amber-900 text-sm mb-1" style={{ fontFamily: 'Georgia, serif' }}>{game.name}</p>
                      <p className="text-amber-700 text-xs italic mb-1" style={{ fontFamily: 'Georgia, serif' }}>{game.tagline}</p>
                      <p className="text-amber-600 font-semibold" style={{ fontSize: '10px' }}>🕖 {game.dropTime}</p>
                    </div>
                  </a>
                )
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <button
              onClick={() => {
                const track = document.getElementById('daily-track');
                const cards = track.querySelectorAll('.daily-card');
                const current = Array.from(cards).findIndex(c => c.classList.contains('active'));
                const prev = (current - 1 + cards.length) % cards.length;
                cards[current].classList.remove('active');
                cards[prev].classList.add('active');
                const offset = prev * (220 + 16) - (track.parentElement.offsetWidth / 2 - 110);
                track.style.transform = `translateX(${-Math.max(0, offset)}px)`;
              }}
              className="w-12 h-12 rounded-full font-bold text-xl transition-all hover:scale-110"
              style={{ background: 'white', border: '3px solid #D97706', color: '#D97706' }}
            >
              ←
            </button>
            <p className="text-amber-400 text-sm">🥞🥞🥞🥞🥞🥞</p>
            <button
              onClick={() => {
                const track = document.getElementById('daily-track');
                const cards = track.querySelectorAll('.daily-card');
                const current = Array.from(cards).findIndex(c => c.classList.contains('active'));
                const next = (current + 1) % cards.length;
                cards[current].classList.remove('active');
                cards[next].classList.add('active');
                const offset = next * (220 + 16) - (track.parentElement.offsetWidth / 2 - 110);
                track.style.transform = `translateX(${-Math.max(0, offset)}px)`;
              }}
              className="w-12 h-12 rounded-full font-bold text-xl transition-all hover:scale-110"
              style={{ background: 'white', border: '3px solid #D97706', color: '#D97706' }}
            >
              →
            </button>
          </div>
          <p className="text-center text-amber-600 text-base italic mt-2" style={{ fontFamily: 'Georgia, serif' }}>Click any card to play!</p>
        </section>

        {/* SECTION: Books */}
        {showBooks && (
<section id="books" className="mb-16 scroll-mt-8" style={{ background: 'linear-gradient(180deg, #BE123C 0%, #EA580C 25%, #D97706 55%, #FCD34D 80%, #FEF9C3 100%)', borderRadius: '24px', padding: '2rem 1.5rem' }}>
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-2 rounded-full text-white font-bold mb-4" style={{ background: 'linear-gradient(135deg, #BE123C 0%, #EA580C 50%, #B45309 100%)', fontFamily: 'Georgia, serif' }}>
              🍳 Screen-Free Books ✏️
            </div>
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.2)' }}>Letter Griddle is off-line too!</h2>
            <p className="italic" style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.9)' }}>Letter Griddle now offers screen-free options</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <a href="https://www.amazon.com/Letter-Griddle-Puzzles-Word-Lettergriddle-com/dp/B0GPN9QFRF" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-48 flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706, #92400E)' }}>
                  <span className="text-5xl mb-2">🥞</span>
                  <p className="text-white font-bold text-lg text-center px-4" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>Letter Griddle</p>
                  <p className="text-amber-100 text-xs tracking-widest uppercase mt-1">50 Word Puzzles</p>
                  <div className="absolute inset-0 bg-amber-900/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon →</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col justify-between" style={{ minHeight: "140px" }}>
                  <h3 className="text-base font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>Letter Griddle: 50 Word Puzzles</h3>
                  <p className="text-amber-700 text-sm italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>The original collection of puzzles for screen-free downtime</p>
                  <p className="text-amber-600 text-xs font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Read a sample on Amazon</p>
                </div>
              </a>
            </div>
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <a href="https://www.amazon.com/dp/B0H2LCVFY5" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-48 flex flex-col items-center justify-center" style={{ background: 'linear-gradient(160deg, #0c4a6e, #0369a1, #38bdf8)' }}>
                  <span className="text-5xl mb-2">✈️</span>
                  <p className="text-white font-bold text-lg text-center px-4" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>Letter Griddle Travels</p>
                  <p className="text-cyan-100 text-xs tracking-widest uppercase mt-1">A World Tour of Word Puzzles</p>
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">NEW</div>
                  <div className="absolute inset-0 bg-cyan-900/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon →</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col justify-between" style={{ minHeight: "140px" }}>
                  <h3 className="text-base font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>Letter Griddle Travels ✈️</h3>
                  <p className="text-amber-700 text-sm italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>40 puzzles across countries, cities and landmarks</p>
                  <p className="text-amber-600 text-xs font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Read a sample on Amazon</p>
                </div>
              </a>
            </div>
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <a href="https://www.amazon.com/Todays-Special-Breakfast-Inspired-Letter-Griddle/dp/B0GN9K7GKC" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-48 flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #FBBF24, #F59E0B, #78350F)' }}>
                  <span className="text-5xl mb-2">📓</span>
                  <p className="text-white font-bold text-lg text-center px-4" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>Today's Special</p>
                  <p className="text-yellow-100 text-xs tracking-widest uppercase mt-1">Breakfast-Inspired Notebook</p>
                  <div className="absolute inset-0 bg-amber-900/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon →</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col justify-between" style={{ minHeight: "140px" }}>
                  <h3 className="text-base font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>Today's Special Notebook</h3>
                  <p className="text-amber-700 text-sm italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>A beautiful lined notebook with honey pot design on every page</p>
                  <p className="text-amber-600 text-xs font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon with a "look inside"</p>
                </div>
              </a>
            </div>
          </div>

          <div className="text-center my-8">
            <span className="inline-block px-6 py-2 text-amber-800 font-semibold italic border-t-2 border-b-2 border-amber-300 text-sm" style={{ fontFamily: 'Georgia, serif' }}>
              ☀️ Journals & Notebooks for Screen-Free Mornings
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <a href="https://www.amazon.com/dp/B0GM1TNH5B" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-48 flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #7C3AED, #C2410C, #F97316)' }}>
                  <span className="text-5xl mb-2">🌅</span>
                  <p className="text-white font-bold text-lg text-center px-4" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>Just Breakfast</p>
                  <p className="text-orange-100 text-xs tracking-widest uppercase mt-1">A 90-Day Journal</p>
                  <div className="absolute inset-0 bg-amber-900/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon →</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col justify-between" style={{ minHeight: '140px' }}>
                  <h3 className="text-base font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>Just Breakfast Journal</h3>
                  <p className="text-amber-700 text-sm italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>A 90-day guided journal for your breakfast ritual to savor every morning</p>
                  <p className="text-amber-600 text-xs font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon with a "look inside"</p>
                </div>
              </a>
            </div>
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <a href="https://www.amazon.com/Breakfast-Nature-Sights-Sounds-Savoring/dp/B0GM1RLYZW/" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-48 flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #14532D, #166534, #4ADE80)' }}>
                  <span className="text-5xl mb-2">🌿</span>
                  <p className="text-white font-bold text-lg text-center px-4" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>Breakfast and Nature</p>
                  <p className="text-green-100 text-xs tracking-widest uppercase mt-1">Sights, Sounds, Savoring</p>
                  <div className="absolute inset-0 bg-green-900/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon →</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col justify-between" style={{ minHeight: '140px' }}>
                  <h3 className="text-base font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>Breakfast and Nature</h3>
                  <p className="text-amber-700 text-sm italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>A 90-day journal where breakfast meets the beauty of nature</p>
                  <p className="text-amber-600 text-xs font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon with a "look inside"</p>
                </div>
              </a>
            </div>
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <a href="https://www.amazon.com/Coffee-Notebook-Laurie-Hess/dp/B0GMWTWJK4/" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-48 flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #3C1A00, #6B2D00, #A35200)' }}>
                  <span className="text-5xl mb-2">☕</span>
                  <p className="text-white font-bold text-lg text-center px-4" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>Coffee Coffee Coffee</p>
                  <p className="text-amber-200 text-xs tracking-widest uppercase mt-1">Your Notebook. Your Coffee.</p>
                  <div className="absolute inset-0 bg-amber-900/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon→</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col justify-between" style={{ minHeight: '140px' }}>
                  <h3 className="text-base font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>Coffee Coffee Coffee</h3>
                  <p className="text-amber-700 text-sm italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>A lined notebook for quiet coffee moments & the love of the brew</p>
                  <p className="text-amber-600 text-xs font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Now on Amazon with a "look inside"</p>
                </div>
              </a>
            </div>
          </div>
        </section>
)}
        {/* SECTION: Stories & More */}
        {showStories && (
<section id="stories-more" className="mb-16 scroll-mt-8">
          <div className="text-center mb-8">
            <div
              className="inline-block px-6 py-2 rounded-full text-white font-bold mb-4"
              style={{ background: 'linear-gradient(160deg, #0c4a6e 0%, #312e81 50%, #c2410c 80%, #fbbf24 100%)', fontFamily: 'Georgia, serif' }}
            >
              ✨ Stories & Recipes
            </div>
            <h2 className="text-3xl font-bold text-amber-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Stories, Recipes, & Puzzles
            </h2>
            <p className="text-amber-600">From Letter Griddle</p>
          </div>
          <GameGrid games={storiesAndMore} />
        </section>
)}

        {/* SECTION: Summer Days */}
        {showSummer && (
<section id="summer-days" className="mb-16 scroll-mt-8 rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #0c4a6e 0%, #0369a1 15%, #38bdf8 30%, #fef9c3 50%, #fbbf24 65%, #38bdf8 80%, #0369a1 90%, #0c4a6e 100%)' }}>
          <div className="text-center pt-10 pb-4 px-4">
            <div className="inline-block px-6 py-2 rounded-full text-white font-bold mb-4" style={{ background: 'linear-gradient(160deg, #0c4a6e 0%, #0369a1 40%, #0ea5e9 75%, #38bdf8 100%)', fontFamily: 'Georgia, serif' }}>
              ☀️ Summer Days ☀️
            </div>
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.2)' }}>Summer Days</h2>
            <p className="text-sky-100 italic mb-4" style={{ fontFamily: 'Georgia, serif' }}>Summer fun from Letter Griddle</p>
            <div className="text-3xl" style={{ animation: 'spin 8s linear infinite', display: 'inline-block' }}>☀️</div>
          </div>
          <style>{`
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .summer-card { min-width: 220px; background: white; border-radius: 16px; overflow: hidden; border: 2px solid #7dd3fc; flex-shrink: 0; transform: scale(0.92); transition: transform 0.3s, opacity 0.3s; opacity: 0.7; }
            .summer-card.active { transform: scale(1); opacity: 1; border-color: #0369a1; }
            .summer-track { display: flex; gap: 16px; transition: transform 0.4s cubic-bezier(.4,0,.2,1); padding: 12px 0 20px; }
          `}</style>
          <div className="px-4 overflow-hidden">
            <div className="summer-track" id="summer-track">
              {summerDaysGames.map((game, i) => (
                <a key={game.name} href={game.href} target={game.external ? '_blank' : '_self'} rel="noopener noreferrer" className={`summer-card ${i === 0 ? 'active' : ''}`} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                  <div className="relative h-36 flex flex-col items-center justify-center" style={{ background: game.thumbnail.gradient }}>
                    <div className="text-4xl mb-1">{game.thumbnail.icon}</div>
                    <p className="text-white font-bold text-sm text-center px-3" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>{game.thumbnail.title.join(' ')}</p>
                    <p className="text-xs uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.85)' }}>{game.thumbnail.subtitle}</p>
                  </div>
                  <div className="p-3" style={{ background: 'linear-gradient(to bottom, #e0f2fe, #bae6fd)' }}>
                    <p className="font-bold text-sky-900 text-sm mb-1" style={{ fontFamily: 'Georgia, serif' }}>{game.name}</p>
                    <p className="text-sky-700 text-xs italic" style={{ fontFamily: 'Georgia, serif' }}>{game.tagline}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 pb-8 px-4 mt-2">
            <button
              onClick={() => {
                const track = document.getElementById('summer-track');
                const cards = track.querySelectorAll('.summer-card');
                const current = Array.from(cards).findIndex(c => c.classList.contains('active'));
                const prev = (current - 1 + cards.length) % cards.length;
                cards[current].classList.remove('active');
                cards[prev].classList.add('active');
                const offset = prev * (220 + 16) - (track.parentElement.offsetWidth / 2 - 110);
                track.style.transform = `translateX(${-Math.max(0, offset)}px)`;
              }}
              className="w-14 h-14 rounded-full font-bold text-2xl shadow-lg hover:shadow-xl transition-all hover:scale-110"
              style={{ background: 'white', border: '3px solid #0369a1', color: '#0369a1' }}
            >
              ←
            </button>
            <p className="text-sky-100 text-lg">🌊🌊🌊🌊🌊</p>
            <button
              onClick={() => {
                const track = document.getElementById('summer-track');
                const cards = track.querySelectorAll('.summer-card');
                const current = Array.from(cards).findIndex(c => c.classList.contains('active'));
                const next = (current + 1) % cards.length;
                cards[current].classList.remove('active');
                cards[next].classList.add('active');
                const offset = next * (220 + 16) - (track.parentElement.offsetWidth / 2 - 110);
                track.style.transform = `translateX(${-Math.max(0, offset)}px)`;
              }}
              className="w-14 h-14 rounded-full font-bold text-2xl shadow-lg hover:shadow-xl transition-all hover:scale-110"
              style={{ background: 'white', border: '3px solid #0369a1', color: '#0369a1' }}
            >
              →
            </button>
          </div>
        </section>
)}
        </main>

      <footer className="bg-amber-800 text-amber-100 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-2xl">{"\uD83E\uDD5E"}</span>
            <span className="text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>Letter Griddle</span>
          </div>
          <div className="flex justify-center gap-6 mb-4 text-sm">
            <a href="https://instagram.com/letter_griddle" className="hover:text-white transition-colors flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              @letter_griddle
            </a>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
          <div className="text-2xl mb-2">{"\uD83E\uDDE1"}</div>
          <p className="text-sm">{"\u00A9"} {new Date().getFullYear()} Letter Griddle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}