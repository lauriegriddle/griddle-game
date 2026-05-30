import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/classics/page.js', 'utf8');

content = content.replace(
  `  {
    name: "Snacks",`,
  `  {
    name: "Maze",
    tagline: "Reveal the secret message!",
    emoji: "☀️",
    href: "/maze",
    thumbnail: {
      gradient: "linear-gradient(160deg, #0c4a6e 0%, #312e81 50%, #c2410c 80%, #fbbf24 100%)",
      icon: "\\u2600\\uFE0F",
      iconSize: "text-5xl",
      title: ["Letter Griddle", "Maze"],
      subtitle: "A SUMMER ADVENTURE",
      subtitleColor: "text-emerald-200"
    },
    borderColor: "border-amber-400",
    bgColor: "from-amber-100 to-orange-100",
    textColor: "text-amber-900",
    subTextColor: "text-amber-700",
    hoverBg: "bg-amber-600/80"
  },
  {
    name: "Has the Goods",
    tagline: "Sort goods before time runs out!",
    emoji: "🧲",
    href: "/goods",
    thumbnail: {
      gradient: "linear-gradient(160deg, #3a1a7e 0%, #a02070 45%, #c27a1c 80%, #eaa020 100%)",
      icon: "🧲",
      iconSize: "text-4xl",
      title: ["Has the", "Goods!"],
      subtitle: "SORT THE ITEMS",
      subtitleColor: "text-amber-100"
    },
    borderColor: "border-amber-400",
    bgColor: "from-amber-100 to-orange-100",
    textColor: "text-amber-800",
    subTextColor: "text-amber-700",
    hoverBg: "bg-amber-600/80"
  },
  {
    name: "Ambiance",
    tagline: "Music for your puzzle sessions",
    emoji: "🎹",
    href: "/ambiance",
    thumbnail: {
      gradient: "linear-gradient(160deg, #4a0a6e 0%, #b01060 45%, #c28a2c 80%, #e49018 100%)",
      icon: "🎹",
      iconSize: "text-4xl",
      title: ["Letter Griddle", "Ambiance"],
      subtitle: "DAY & EVENING MUSIC",
      subtitleColor: "text-amber-300/70"
    },
    borderColor: "border-amber-700",
    bgColor: "from-amber-50 to-stone-50",
    textColor: "text-amber-900",
    subTextColor: "text-amber-700",
    hoverBg: "bg-amber-900/80"
  },
  {
    name: "Snacks",`
);

writeFileSync('app/classics/page.js', content);
console.log('Done!');
