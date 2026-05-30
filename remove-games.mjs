import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('app/page.js', 'utf8');

// Remove Snacks from dailyFavorites array
content = content.replace(`,
    {
      name: "Snacks",
      tagline: "Don't leave any crumbs!",
      dropTime: "12:00 AM EST",
      emoji: "\\uD83C\\uDF6A",
      href: "/snacks",
      thumbnail: {
        gradient: "linear-gradient(135deg, #78350F 0%, #92400E 50%, #451A03 100%)",
        icon: "\\uD83C\\uDF6A",
        iconSize: "text-5xl",
        title: ["Letter Griddle", "Snacks"],
        subtitle: "Midnight Puzzle",
        subtitleColor: "text-white/80"
      },
      borderColor: "border-amber-700",
      bgColor: "from-amber-100 to-orange-100",
      textColor: "text-amber-900",
      subTextColor: "text-amber-700",
      timeColor: "text-amber-600",
      hoverBg: "bg-amber-800/80"
    },
  ];`, `
  ];`);

// Remove Has the Goods from storiesAndMore array
content = content.replace(`,
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
    },`, ``);

// Remove Ambiance from storiesAndMore array
content = content.replace(`,
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
    },`, ``);

writeFileSync('app/page.js', content);
console.log('Done!');
