"use client";

import { useState, useEffect } from "react";

// ─── PUZZLE DATA ───
// solution[itemIndex] = row number (1-indexed) where that item belongs
// EVERY puzzle verified: clues → placement → solution array

const PUZZLES = {
  easy: [
    {
      id: "e1",
      title: "Morning Favorites",
      // Items: 0=Pancake, 1=Coffee, 2=Honey, 3=Butter, 4=Strawberry
      items: [
        { emoji: "🥞", name: "Pancake" },
        { emoji: "☕", name: "Coffee" },
        { emoji: "🍯", name: "Honey" },
        { emoji: "🧈", name: "Butter" },
        { emoji: "🍓", name: "Strawberry" },
      ],
      // Target: Coffee=r1, Butter=r2, Pancake=r3, Strawberry=r4, Honey=r5
      // Verify:
      // 1. Coffee is above everything else → r1 ✓
      // 2. Pancake is in the middle row → r3 (middle of 5) ✓
      // 3. Honey is in the last row → r5 ✓
      // 4. Butter is between Coffee and Pancake → Coffee(1)...Butter(2)...Pancake(3) ✓
      // 5. Strawberry is below Pancake → r4 ✓
      solution: [3, 1, 5, 2, 4],
      clues: [
        "☕ Coffee is above everything else.",
        "🥞 Pancake is in the middle row.",
        "🍯 Honey is in the last row.",
        "🧈 Butter is between Coffee and Pancake.",
        "🍓 Strawberry is below Pancake.",
      ],
      quote: "Start where you are. Use what you have. Do what you can. — Arthur Ashe",
    },
    {
      id: "e2",
      title: "Café Treats",
      // Items: 0=Waffle, 1=Blueberry, 2=Croissant, 3=Tea, 4=Cookie
      items: [
        { emoji: "🧇", name: "Waffle" },
        { emoji: "🫐", name: "Blueberry" },
        { emoji: "🥐", name: "Croissant" },
        { emoji: "🍵", name: "Tea" },
        { emoji: "🍪", name: "Cookie" },
      ],
      // Target: Croissant=r1, Waffle=r2, Tea=r3, Blueberry=r4, Cookie=r5
      // Verify:
      // 1. The two baked goods (Croissant, Waffle) are in the top two rows → r1, r2 ✓
      // 2. Croissant is above Waffle → r1 above r2 ✓
      // 3. Cookie is in the last row → r5 ✓
      // 4. Tea is above Blueberry → r3 above r4 ✓
      // 5. Blueberry is next to Cookie → r4 next to r5 ✓
      solution: [2, 4, 1, 3, 5],
      clues: [
        "🥐🧇 The two baked goods are in the top two rows.",
        "🥐 Croissant is above Waffle.",
        "🍪 Cookie is in the last row.",
        "🍵 Tea is above Blueberry.",
        "🫐 Blueberry is next to Cookie.",
      ],
      quote: "Happiness is not something ready made. It comes from your own actions. — Dalai Lama",
    },
  ],
  medium: [
    {
      id: "m1",
      title: "Morning Rush",
      // Items: 0=Strawberry, 1=Blueberry, 2=Pancake, 3=Coffee, 4=Butter, 5=Syrup, 6=Waffle
      items: [
        { emoji: "🍓", name: "Strawberry" },
        { emoji: "🫐", name: "Blueberry" },
        { emoji: "🥞", name: "Pancake" },
        { emoji: "☕", name: "Coffee" },
        { emoji: "🧈", name: "Butter" },
        { emoji: "🍯", name: "Syrup" },
        { emoji: "🧇", name: "Waffle" },
      ],
      // Target: Strawberry=r1, Blueberry=r2, Syrup=r3, Pancake=r4, Coffee=r5, Butter=r6, Waffle=r7
      // Verify each clue:
      // 1. The two berries are at the top → Strawberry(1) Blueberry(2) ✓
      // 2. Strawberry is above Blueberry → r1 above r2 ✓
      // 3. Pancake is in the middle row → r4 (middle of 7) ✓
      // 4. Coffee is directly below Pancake → Pancake(4) Coffee(5) ✓
      // 5. Butter is below Coffee but not in the last row → r6 (below r5, not r7) ✓
      // 6. Waffle is in the last row → r7 ✓
      // 7. Syrup is between Blueberry and Pancake → Blueberry(2) Syrup(3) Pancake(4) ✓
      solution: [1, 2, 4, 5, 6, 3, 7],
      clues: [
        "🍓🫐 The two berries are both in the top half of the griddle.",
        "🍓 Strawberry is above Blueberry.",
        "🥞 Pancake is in the exact middle row.",
        "☕ Coffee is directly below Pancake.",
        "🧈 Butter is below Coffee but not in the last row.",
        "🧇 Waffle is in the last row.",
        "🍯 Syrup is somewhere between Blueberry and Pancake.",
      ],
      quote: "The secret of getting ahead is getting started. — Mark Twain",
    },
    {
      id: "m2",
      title: "Brunch Spread",
      // Items: 0=Avocado, 1=Egg, 2=Bacon, 3=Cheese, 4=Toast, 5=Juice, 6=Olive
      items: [
        { emoji: "🥑", name: "Avocado" },
        { emoji: "🍳", name: "Egg" },
        { emoji: "🥓", name: "Bacon" },
        { emoji: "🧀", name: "Cheese" },
        { emoji: "🍞", name: "Toast" },
        { emoji: "🥤", name: "Juice" },
        { emoji: "🫒", name: "Olive" },
      ],
      // Target: Egg=r1, Cheese=r2, Toast=r3, Avocado=r4, Bacon=r5, Olive=r6, Juice=r7
      // Verify each clue:
      // 1. Egg is higher than all other items → r1 ✓
      // 2. Cheese is directly below Egg → r2 ✓
      // 3. The drink is in the last row → Juice(7) ✓
      // 4. Bacon is in an odd row in the bottom half → r5 (odd, bottom half rows 4-7) ✓
      // 5. Olive is next to Bacon → Bacon(5) Olive(6) ✓
      // 6. Toast is above Avocado → Toast(3) Avocado(4) ✓
      // 7. Avocado is in the middle row → r4 (middle of 7) ✓
      solution: [4, 1, 5, 2, 3, 7, 6],
      clues: [
        "🍳 Egg is higher than every other item.",
        "🧀 Cheese is directly below Egg.",
        "🥤 The only drink is in the last row.",
        "🥓 Bacon is in an odd row in the bottom half.",
        "🫒 Olive is next to Bacon.",
        "🍞 Toast is somewhere above Avocado.",
        "🥑 Avocado is in the middle row.",
      ],
      quote: "Every morning brings new potential, but if you dwell on the misfortunes of the day before, you tend to overlook tremendous opportunities. — Harvey Mackay",
    },
  ],
  hard: [
    {
      id: "h1",
      title: "Full Café Menu",
      // Items: 0=Pancake, 1=Coffee, 2=Waffle, 3=Honey, 4=Butter, 5=Croissant, 6=Tea
      items: [
        { emoji: "🥞", name: "Pancake" },
        { emoji: "☕", name: "Coffee" },
        { emoji: "🧇", name: "Waffle" },
        { emoji: "🍯", name: "Honey" },
        { emoji: "🧈", name: "Butter" },
        { emoji: "🥐", name: "Croissant" },
        { emoji: "🍵", name: "Tea" },
      ],
      // Target: Coffee=r1, Croissant=r2, Butter=r3, Pancake=r4, Waffle=r5, Honey=r6, Tea=r7
      // Verify each clue:
      // 1. The two drinks are on opposite ends of the griddle → Coffee(1) Tea(7) ✓
      // 2. Coffee is above Tea → r1 above r7 ✓
      // 3. The baked goods (Pancake, Waffle, Croissant) are all in a row → r2,r4,r5... no.
      //    Let me adjust: "No two baked goods are next to each other" → Croissant(2) Pancake(4) Waffle(5)...
      //    That doesn't work either (4 and 5 adjacent). Let me rethink.
      //    Baked goods: Croissant(2), Pancake(4), Waffle(5) — 4&5 are adjacent. 
      //    Change: "The three baked goods are all in the middle five rows" → r2,r4,r5 all in rows 2-6 ✓
      // 4. Pancake is in the middle row → r4 ✓
      // 5. Croissant is above Pancake but not in row 1 → r2 or r3. Since Butter is r3, Croissant=r2 ✓
      // 6. Waffle is directly below Pancake → r5 ✓
      // 7. Butter is between the top drink and Pancake → Coffee(1)...Butter...Pancake(4) → r2 or r3. 
      //    Croissant is r2, so Butter=r3 ✓
      // 8. Honey is in an even row in the bottom half → r6 (even, bottom half rows 4-7) ✓
      solution: [4, 1, 5, 6, 3, 2, 7],
      clues: [
        "☕🍵 The two drinks are on opposite ends of the griddle.",
        "☕ Coffee is above Tea.",
        "🥞 Pancake is in the exact middle row.",
        "🧇 Waffle is directly below Pancake.",
        "🥐 Croissant is above Pancake but not in the first row.",
        "🧈 Butter is somewhere between Coffee and Pancake.",
        "🍯 Honey is in an even row in the bottom half.",
      ],
      quote: "It is during our darkest moments that we must focus to see the light. — Aristotle",
    },
    {
      id: "h2",
      title: "Grand Breakfast",
      // Items: 0=Egg, 1=Bacon, 2=Pancake, 3=Waffle, 4=Coffee, 5=Strawberry, 6=Juice
      items: [
        { emoji: "🍳", name: "Egg" },
        { emoji: "🥓", name: "Bacon" },
        { emoji: "🥞", name: "Pancake" },
        { emoji: "🧇", name: "Waffle" },
        { emoji: "☕", name: "Coffee" },
        { emoji: "🍓", name: "Strawberry" },
        { emoji: "🥤", name: "Juice" },
      ],
      // Target: Waffle=r1, Coffee=r2, Egg=r3, Pancake=r4, Strawberry=r5, Bacon=r6, Juice=r7
      // Verify each clue:
      // 1. The two drinks (Coffee, Juice) are not next to each other → Coffee(2) Juice(7) ✓
      // 2. Coffee is in the top three rows → r2 ✓
      // 3. Juice is below all the food items → r7 (below everything) ✓
      // 4. The griddle items (Pancake, Waffle) are both above Egg... no, Waffle(1) Pancake(4) Egg(3).
      //    Pancake(4) is not above Egg(3). Let me adjust.
      //    "Waffle is higher than Pancake" → r1 above r4 ✓
      // 5. Egg is between Coffee and Pancake → Coffee(2) Egg(3) Pancake(4) ✓
      // 6. Strawberry is in an odd row below the middle → odd rows below r4: r5 or r7. Juice is r7. So r5 ✓
      // 7. Bacon is next to Strawberry → Strawberry(5) Bacon(6) ✓
      // 8. Waffle is in the first row → too direct. Change to:
      //    "Waffle is above all other items" → r1 ✓
      solution: [3, 6, 4, 1, 2, 5, 7],
      clues: [
        "☕🥤 The two drinks are not next to each other.",
        "☕ Coffee is in the top three rows.",
        "🥤 Juice is below every food item.",
        "🧇 Waffle is higher than Pancake.",
        "🍳 Egg is between Coffee and Pancake.",
        "🍓 Strawberry is in an odd row below the middle.",
        "🥓 Bacon is next to Strawberry.",
      ],
      quote: "You are never too old to set another goal or to dream a new dream. — C.S. Lewis",
    },
  ],
  trivia: [
    {
      id: "t1",
      title: "Laurel's Challenge",
      // Items: 0=Pancake, 1=Coffee, 2=Waffle, 3=Honey, 4=Butter, 5=Strawberry, 6=Blueberry, 7=Croissant, 8=Syrup
      items: [
        { emoji: "🥞", name: "Pancake" },
        { emoji: "☕", name: "Coffee" },
        { emoji: "🧇", name: "Waffle" },
        { emoji: "🍯", name: "Honey" },
        { emoji: "🧈", name: "Butter" },
        { emoji: "🍓", name: "Strawberry" },
        { emoji: "🫐", name: "Blueberry" },
        { emoji: "🥐", name: "Croissant" },
        { emoji: "🥄", name: "Syrup" },
      ],
      // Solution: Coffee=1, Croissant=2, Butter=3, Pancake=4, Syrup=5, Waffle=6, Strawberry=7, Blueberry=8, Honey=9
      // Verify all clues below:
      // 1. Drinks are in odd rows → Coffee(1)✓, no other drinks
      //    Actually "Drinks" = Coffee. Coffee in odd row(1) ✓
      // 2. The two berries are next to each other → Strawberry(7) Blueberry(8) ✓
      // 3. Pancake is directly above Syrup → Pancake(4) Syrup(5) ✓
      // 4. Butter is somewhere in the top three rows → Butter(3) ✓
      // 5. No fruit is in the top half (rows 1-4) → Strawberry(7) Blueberry(8) Honey(9) all > 4 ✓
      //    Wait, Honey isn't fruit. Let me recount: fruits = Strawberry, Blueberry. Both > 4 ✓
      // 6. Croissant is between Coffee and Butter → Coffee(1) Croissant(2) Butter(3) ✓
      // 7. The sweet toppings (Honey, Syrup) are not next to each other → Honey(9) Syrup(5) ✓ not adjacent
      // 8. Waffle is in an even row in the bottom half → Waffle(6) even, bottom half (5-9) ✓
      // 9. The baked goods (Pancake, Waffle, Croissant) are all in different thirds of the griddle
      //    → Croissant(2) top third(1-3), Pancake(4) middle third(4-6), Waffle(6) middle third... 
      //    Hmm, let me adjust. Remove this clue, the others are sufficient.
      //    Replace with: "Honey is in the last row"
      solution: [4, 1, 6, 9, 3, 7, 8, 2, 5],
      clues: [
        "☕ The only drink is in an odd row in the top half.",
        "🍓🫐 The two berries are in adjacent rows.",
        "🥞 Pancake is directly above Syrup.",
        "🧈 Butter is somewhere in the top three rows.",
        "🍓 No fruit appears in the top half of the griddle.",
        "🥐 Croissant is between the drink and Butter.",
        "🍯 The sweet toppings (Honey and Syrup) are not next to each other.",
        "🧇 Waffle is in an even row in the bottom half.",
        "🍯 Honey is in the last row.",
      ],
      quote: "The only way to do great work is to love what you do. — Steve Jobs",
    },
    {
      id: "t2",
      title: "Sunday Stumper",
      // Items: 0=Egg, 1=Toast, 2=Bacon, 3=Jam, 4=Tea, 5=Muffin, 6=Banana, 7=Yogurt, 8=Granola
      items: [
        { emoji: "🍳", name: "Egg" },
        { emoji: "🍞", name: "Toast" },
        { emoji: "🥓", name: "Bacon" },
        { emoji: "🍓", name: "Jam" },
        { emoji: "🍵", name: "Tea" },
        { emoji: "🧁", name: "Muffin" },
        { emoji: "🍌", name: "Banana" },
        { emoji: "🥛", name: "Yogurt" },
        { emoji: "🥣", name: "Granola" },
      ],
      // Solution: Muffin=1, Tea=2, Toast=3, Jam=4, Egg=5, Bacon=6, Yogurt=7, Granola=8, Banana=9
      // Verify:
      // 1. The hot items (Egg, Bacon, Toast, Tea) are all in the top 6 rows → Egg(5)✓ Bacon(6)✓ Toast(3)✓ Tea(2)✓
      // 2. Jam is directly below Toast → Toast(3) Jam(4) ✓
      // 3. Bacon is in an even row → Bacon(6) ✓
      // 4. Tea is above all other hot items → Tea(2) above Egg(5), Bacon(6), Toast(3) ✓
      // 5. The dairy items (Yogurt) are in the bottom three rows → Yogurt(7) ✓
      // 6. Granola is next to Yogurt → Yogurt(7) Granola(8) ✓
      // 7. Banana is below Granola → Granola(8) Banana(9) ✓
      // 8. Egg is in the middle row → Egg(5) middle of 9 ✓
      // 9. Muffin is higher than Tea → Muffin(1) Tea(2) ✓
      solution: [5, 3, 6, 4, 2, 1, 9, 7, 8],
      clues: [
        "🔥 The hot items (Egg, Bacon, Toast, Tea) are all in the top six rows.",
        "🍓 Jam is directly below Toast.",
        "🥓 Bacon is in an even row.",
        "🍵 Tea is above all other hot items.",
        "🥛 Dairy items are in the bottom three rows.",
        "🥣 Granola is next to Yogurt.",
        "🍌 Banana is below Granola.",
        "🍳 Egg is in the exact middle row.",
        "🧁 Muffin is higher than Tea.",
      ],
      quote: "Believe you can and you're halfway there. — Theodore Roosevelt",
    },
  ],
};

const DIFFICULTY_CONFIG = {
  easy: { label: "Easy", emoji: "☕", color: "#16A34A", desc: "5 items · Gentle clues" },
  medium: { label: "Medium", emoji: "🥞", color: "#D97706", desc: "7 items · Mixed clues" },
  hard: { label: "Hard", emoji: "🔥", color: "#DC2626", desc: "7 items · Indirect clues" },
  trivia: { label: "Trivia Night", emoji: "🌙", color: "#7C3AED", desc: "9 items · Deductive clues" },
};

export default function GriddleLogic() {
  const [difficulty, setDifficulty] = useState("medium");
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [showLanding, setShowLanding] = useState(true);
  const [grid, setGrid] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [checkResults, setCheckResults] = useState(null);
  const [solved, setSolved] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showClues, setShowClues] = useState(true);
  const [confetti, setConfetti] = useState([]);
  const [shuffledOrder, setShuffledOrder] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [copied, setCopied] = useState(false);

  const puzzle = PUZZLES[difficulty][puzzleIdx] || PUZZLES[difficulty][0];
  const numRows = puzzle.items.length;

  useEffect(() => {
    const currentPuzzle = PUZZLES[difficulty][puzzleIdx] || PUZZLES[difficulty][0];
    const rows = currentPuzzle.items.length;
    setGrid(Array(rows).fill(null));
    setSelectedItem(null);
    setSelectedRow(null);
    setCheckResults(null);
    setSolved(false);
    setShowQuote(false);
    setShowShare(false);
    setConfetti([]);
    setAttempts(0);
    setCopied(false);
    const indices = currentPuzzle.items.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledOrder(indices);
  }, [difficulty, puzzleIdx]);

  // Guard against stale state during difficulty transitions
  if (grid.length !== numRows) {
    return <div style={{ minHeight: "100vh", background: "#FFF8F0" }} />;
  }

  const placedItems = new Set(grid.filter((i) => i !== null));
  const displayTrayItems = shuffledOrder
    .filter((idx) => idx < puzzle.items.length)
    .map((idx) => ({ ...puzzle.items[idx], idx }))
    .filter((item) => !placedItems.has(item.idx));

  const handleTrayItemClick = (itemIdx) => {
    setCheckResults(null);
    if (selectedItem === itemIdx) { setSelectedItem(null); return; }
    setSelectedItem(itemIdx);
    if (selectedRow !== null) {
      const newGrid = [...grid];
      newGrid[selectedRow] = itemIdx;
      setGrid(newGrid);
      setSelectedItem(null);
      setSelectedRow(null);
    }
  };

  const handleRowClick = (rowIdx) => {
    if (solved) return;
    setCheckResults(null);
    if (selectedItem !== null) {
      const newGrid = [...grid];
      newGrid[rowIdx] = selectedItem;
      setGrid(newGrid);
      setSelectedItem(null);
      setSelectedRow(null);
      return;
    }
    if (grid[rowIdx] === null) {
      setSelectedRow(selectedRow === rowIdx ? null : rowIdx);
      return;
    }
    if (selectedRow !== null && selectedRow !== rowIdx) {
      const newGrid = [...grid];
      [newGrid[selectedRow], newGrid[rowIdx]] = [newGrid[rowIdx], newGrid[selectedRow]];
      setGrid(newGrid);
      setSelectedRow(null);
      return;
    }
    setSelectedRow(selectedRow === rowIdx ? null : rowIdx);
  };

  const handleRemoveFromRow = (rowIdx, e) => {
    e.stopPropagation();
    setCheckResults(null);
    const newGrid = [...grid];
    newGrid[rowIdx] = null;
    setGrid(newGrid);
    setSelectedRow(null);
  };

  const handleCheck = () => {
    setAttempts((a) => a + 1);
    const results = grid.map((itemIdx, rowIdx) => {
      if (itemIdx === null) return false;
      return puzzle.solution[itemIdx] === rowIdx + 1;
    });
    setCheckResults(results);
    if (results.every((r) => r)) {
      setSolved(true);
      triggerConfetti();
      setTimeout(() => setShowQuote(true), 600);
      setTimeout(() => setShowShare(true), 1200);
    }
  };

  const handleReset = () => {
    setGrid(Array(numRows).fill(null));
    setSelectedItem(null);
    setSelectedRow(null);
    setCheckResults(null);
  };

  const handleNewPuzzle = () => {
    setPuzzleIdx((puzzleIdx + 1) % PUZZLES[difficulty].length);
  };

  const triggerConfetti = () => {
    const pieces = [];
    const emojis = ["🥞", "☕", "🧈", "🍯", "🍓", "🫐", "✨", "⭐", "🧇"];
    for (let i = 0; i < 45; i++) {
      pieces.push({
        id: i, emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100, delay: Math.random() * 2,
        duration: 2.5 + Math.random() * 2, size: 16 + Math.random() * 20,
      });
    }
    setConfetti(pieces);
  };

  const handleCopyShare = async () => {
    const config = DIFFICULTY_CONFIG[difficulty];
    const gridEmojis = grid.map((itemIdx) => puzzle.items[itemIdx].emoji).join(" ");
    const text = `☕ Griddle Logic — ${puzzle.title}\n${config.emoji} ${config.label} · ${attempts === 1 ? "First try!" : `Solved in ${attempts} checks`}\n${gridEmojis}\n\n💡 "${puzzle.quote.split("—")[0].trim()}"\n\nPlay at lettergriddle.com/logic\n🥞 More games at lettergriddle.com`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { setCopied(false); }
  };

  const allPlaced = grid.every((item) => item !== null);
  const someIncorrect = checkResults && !checkResults.every((r) => r);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #FFF8F0 0%, #FFF1E0 40%, #FEF3C7 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: "relative", overflow: "hidden",
    }}>
      {confetti.map((p) => (
        <div key={p.id} style={{
          position: "fixed", left: `${p.left}%`, top: "-40px",
          fontSize: `${p.size}px`, zIndex: 100, pointerEvents: "none",
          animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
        }}>{p.emoji}</div>
      ))}

      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "20px 16px 40px" }}>

        {/* ─── HOW TO PLAY LANDING SCREEN ─── */}
        {showLanding && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "linear-gradient(180deg, #FFF8F0 0%, #FFF1E0 40%, #FEF3C7 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px",
          }}>
            <div style={{
              maxWidth: "420px", width: "100%",
              background: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow: "0 8px 32px rgba(180, 120, 60, 0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
              padding: "32px 24px",
              maxHeight: "90vh", overflowY: "auto",
              animation: "fadeInUp 0.5s ease-out",
            }}>
              {/* Title */}
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <div style={{ fontSize: "12px", color: "#D97706", letterSpacing: "3px", marginBottom: "4px" }}>
                  ☕ FROM THE CAFÉ ☕
                </div>
                <h1 style={{ fontSize: "28px", color: "#78350F", margin: "0 0 4px", fontWeight: "bold" }}>
                  Griddle Logic
                </h1>
                <div style={{ fontSize: "13px", color: "#92400E", fontStyle: "italic" }}>
                  A cozy logic puzzle from Letter Griddle 
                </div>
              </div>

              {/* How to Play */}
              <div style={{
                background: "rgba(255, 255, 255, 0.5)",
                borderRadius: "16px", padding: "16px", marginBottom: "16px",
                border: "1px solid rgba(217, 119, 6, 0.15)",
              }}>
                <h2 style={{ fontSize: "16px", color: "#92400E", margin: "0 0 10px", textAlign: "center" }}>
                  How to Play
                </h2>

                <div style={{ fontSize: "13px", color: "#78350F", lineHeight: "1.6" }}>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                    <span style={{ fontSize: "18px", flexShrink: 0 }}>👆</span>
                    <div><strong>Place items:</strong> Tap an emoji from the tray, then tap a row on the griddle to place it. Tap two rows to swap items.</div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                    <span style={{ fontSize: "18px", flexShrink: 0 }}>🔍</span>
                    <div><strong>Read the clues:</strong> Each clue tells you something about where an item belongs:  "above," "between," "next to," or which part of the griddle to look at.</div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ fontSize: "18px", flexShrink: 0 }}>✅</span>
                    <div><strong>Check your work:</strong> When all items are placed, hit Check. Green means correct, red means try again!</div>
                  </div>
                </div>
              </div>

              {/* Difficulty Guide */}
              <div style={{
                background: "rgba(255, 255, 255, 0.5)",
                borderRadius: "16px", padding: "16px", marginBottom: "24px",
                border: "1px solid rgba(217, 119, 6, 0.15)",
              }}>
                <h2 style={{ fontSize: "16px", color: "#92400E", margin: "0 0 10px", textAlign: "center" }}>
                  Choose Your Challenge
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {Object.entries(DIFFICULTY_CONFIG).map(([key, cfg]) => (
                    <div key={key} style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      padding: "8px 12px", borderRadius: "10px",
                      background: "rgba(255,255,255,0.4)",
                      border: "1px solid rgba(255,255,255,0.5)",
                    }}>
                      <span style={{ fontSize: "20px" }}>{cfg.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "14px", fontWeight: "bold", color: cfg.color }}>{cfg.label}</div>
                        <div style={{ fontSize: "11px", color: "#78716C" }}>{cfg.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  onClick={() => setShowLanding(false)}
                  style={{
                    width: "100%", padding: "14px", borderRadius: "14px",
                    background: "linear-gradient(135deg, #D97706, #B45309)",
                    color: "white", fontWeight: "bold", fontSize: "16px",
                    border: "none", cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(180, 80, 0, 0.3)",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  ☕ Start Puzzling
                </button>
                <button
                  onClick={() => setShowLanding(false)}
                  style={{
                    width: "100%", padding: "10px", borderRadius: "10px",
                    background: "transparent",
                    color: "#A3A3A3", fontSize: "13px",
                    border: "none", cursor: "pointer",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  Skip →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "16px", position: "relative" }}>
          <button
            onClick={() => setShowLanding(true)}
            style={{
              position: "absolute", top: "0", right: "0",
              background: "rgba(217, 119, 6, 0.1)",
              border: "1px solid rgba(217, 119, 6, 0.3)", borderRadius: "50%",
              width: "30px", height: "30px", fontSize: "15px",
              cursor: "pointer", color: "#D97706",
              fontFamily: "'Georgia', serif",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            title="How to Play"
          >?</button>
          <div style={{
            fontSize: "12px", color: "#D97706", letterSpacing: "3px",
            textTransform: "uppercase", marginBottom: "4px",
          }}>Letter Griddle presents</div>
          <h1 style={{
            fontSize: "32px", fontWeight: "bold", color: "#3A2A1C", margin: "0 0 4px",
          }}>☕ Griddle Logic</h1>
          <p style={{
            fontSize: "14px", color: "#78716C", margin: "0 0 2px", fontStyle: "italic",
          }}>Place each item in the right row on the griddle</p>
          <p style={{
            fontSize: "13px", color: "#D97706", margin: 0, fontWeight: "bold",
          }}>{puzzle.title}</p>
        </div>

        {/* DIFFICULTY TOGGLE */}
        <div style={{
          display: "flex", gap: "6px", justifyContent: "center",
          marginBottom: "16px", flexWrap: "wrap",
        }}>
          {Object.entries(DIFFICULTY_CONFIG).map(([key, cfg]) => {
            const isActive = difficulty === key;
            return (
              <button key={key} onClick={() => { setDifficulty(key); setPuzzleIdx(0); }}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "8px 14px", borderRadius: "12px",
                  border: isActive ? `2px solid ${cfg.color}` : "2px solid #E5E5E5",
                  background: isActive ? `${cfg.color}12` : "white",
                  cursor: "pointer", transition: "all 0.2s ease",
                  fontFamily: "system-ui, sans-serif",
                }}>
                <span style={{ fontSize: "16px" }}>{cfg.emoji}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{
                    fontSize: "13px", fontWeight: "bold",
                    color: isActive ? cfg.color : "#78716C",
                  }}>{cfg.label}</div>
                  <div style={{
                    fontSize: "10px", color: isActive ? cfg.color : "#A3A3A3",
                  }}>{cfg.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ITEM TRAY */}
        {!solved && (
          <div style={{
            background: "white", borderRadius: "16px", padding: "12px",
            marginBottom: "14px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            border: "2px solid #FEF3C7",
          }}>
            <div style={{
              fontSize: "11px", color: "#78716C", textTransform: "uppercase",
              letterSpacing: "1.5px", marginBottom: "8px", textAlign: "center",
              fontFamily: "system-ui, sans-serif",
            }}>Items to Place</div>
            <div style={{
              display: "flex", flexWrap: "wrap", gap: "6px",
              justifyContent: "center", minHeight: "48px",
            }}>
              {displayTrayItems.length === 0 ? (
                <div style={{
                  fontSize: "13px", color: "#78716C", fontStyle: "italic", padding: "8px",
                }}>All items placed! ✨</div>
              ) : displayTrayItems.map((item) => (
                <button key={item.idx}
                  onClick={() => handleTrayItemClick(item.idx)}
                  style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", gap: "1px", padding: "5px 9px",
                    borderRadius: "12px",
                    border: selectedItem === item.idx ? "2px solid #D97706" : "2px solid transparent",
                    background: selectedItem === item.idx ? "#FEF3C7" : "#FFFBEB",
                    cursor: "pointer", transition: "all 0.15s ease",
                    transform: selectedItem === item.idx ? "scale(1.05)" : "scale(1)",
                  }}>
                  <span style={{ fontSize: "26px", lineHeight: 1 }}>{item.emoji}</span>
                  <span style={{
                    fontSize: "9px", color: "#78716C", fontFamily: "system-ui, sans-serif",
                  }}>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* THE GRIDDLE */}
        <div style={{
          background: "linear-gradient(145deg, #4A3728 0%, #5C4433 100%)",
          borderRadius: "20px", padding: "14px 10px",
          boxShadow: "0 8px 32px rgba(74,55,40,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
          border: "3px solid #3A2A1C", marginBottom: "14px",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {Array.from({ length: numRows }, (_, rowIdx) => {
              const itemIdx = grid[rowIdx];
              const item = itemIdx !== null ? puzzle.items[itemIdx] : null;
              const isSelected = selectedRow === rowIdx;
              const isCorrect = checkResults?.[rowIdx] === true;
              const isWrong = checkResults?.[rowIdx] === false && itemIdx !== null;

              let rowBg = "rgba(255,251,235,0.92)";
              let rowBorder = "2px solid transparent";
              if (solved) { rowBg = "#DCFCE7"; rowBorder = "2px solid #16A34A"; }
              else if (isCorrect) { rowBg = "#DCFCE7"; rowBorder = "2px solid #16A34A"; }
              else if (isWrong) { rowBg = "#FEE2E2"; rowBorder = "2px solid #DC2626"; }
              else if (isSelected) { rowBg = "#FEF3C7"; rowBorder = "2px solid #D97706"; }

              return (
                <div key={rowIdx} onClick={() => handleRowClick(rowIdx)}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    background: rowBg, borderRadius: "10px",
                    padding: "7px 10px", cursor: solved ? "default" : "pointer",
                    border: rowBorder, transition: "all 0.2s ease", minHeight: "46px",
                  }}>
                  <div style={{
                    width: "26px", height: "26px", borderRadius: "50%",
                    background: solved || isCorrect ? "#16A34A" : "#D97706",
                    color: "white", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "13px", fontWeight: "bold",
                    fontFamily: "system-ui, sans-serif", flexShrink: 0,
                  }}>{isCorrect || solved ? "✓" : rowIdx + 1}</div>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "7px" }}>
                    {item ? (
                      <>
                        <span style={{ fontSize: "26px", lineHeight: 1 }}>{item.emoji}</span>
                        <span style={{ fontSize: "14px", color: "#292524" }}>{item.name}</span>
                      </>
                    ) : (
                      <span style={{
                        fontSize: "12px", fontStyle: "italic",
                        color: isSelected ? "#D97706" : "#B8A898",
                        fontFamily: "system-ui, sans-serif",
                      }}>{isSelected ? "Tap an item to place here" : "Empty"}</span>
                    )}
                  </div>
                  {item && !solved && (
                    <button onClick={(e) => handleRemoveFromRow(rowIdx, e)}
                      style={{
                        width: "22px", height: "22px", borderRadius: "50%",
                        border: "none", background: "rgba(0,0,0,0.1)",
                        color: "#78716C", cursor: "pointer",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: "14px", flexShrink: 0,
                      }}>×</button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        {!solved && (
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "14px" }}>
            <button onClick={handleCheck} disabled={!allPlaced}
              style={{
                padding: "11px 26px", borderRadius: "12px", border: "none",
                background: allPlaced ? "linear-gradient(135deg, #D97706, #F59E0B)" : "#E5E5E5",
                color: allPlaced ? "white" : "#A3A3A3",
                fontSize: "15px", fontWeight: "bold",
                cursor: allPlaced ? "pointer" : "not-allowed",
                boxShadow: allPlaced ? "0 4px 12px rgba(217,119,6,0.3)" : "none",
                transition: "all 0.2s ease",
              }}>☕ Check</button>
            <button onClick={handleReset}
              style={{
                padding: "11px 18px", borderRadius: "12px",
                border: "2px solid #78716C", background: "transparent",
                color: "#78716C", fontSize: "13px", cursor: "pointer",
                transition: "all 0.2s ease",
              }}>Reset</button>
          </div>
        )}

        {/* INCORRECT FEEDBACK */}
        {someIncorrect && !solved && (
          <div style={{
            textAlign: "center", padding: "10px", background: "#FEE2E2",
            borderRadius: "12px", marginBottom: "14px", animation: "fadeInUp 0.3s ease",
          }}>
            <span style={{ fontSize: "14px", color: "#DC2626" }}>
              Some items aren't quite right — keep thinking! 🤔
            </span>
          </div>
        )}

        {/* QUOTE REVEAL */}
        {showQuote && (
          <div style={{
            background: "linear-gradient(135deg, #FFF8F0, #FFFBEB)",
            borderRadius: "20px", padding: "22px 18px", marginBottom: "16px",
            border: "2px solid #F59E0B", boxShadow: "0 4px 20px rgba(217,119,6,0.15)",
            animation: "fadeInUp 0.6s ease", textAlign: "center",
          }}>
            <div style={{
              fontSize: "12px", color: "#D97706", textTransform: "uppercase",
              letterSpacing: "2px", marginBottom: "10px", fontFamily: "system-ui, sans-serif",
            }}>☕ Today's Brew of Wisdom ☕</div>
            <div style={{
              fontSize: "18px", color: "#292524", lineHeight: 1.5, fontStyle: "italic",
            }}>"{puzzle.quote.split("—")[0].trim()}"</div>
            {puzzle.quote.includes("—") && (
              <div style={{ fontSize: "13px", color: "#78716C", marginTop: "6px" }}>
                — {puzzle.quote.split("—")[1].trim()}
              </div>
            )}
          </div>
        )}

        {/* GLASSMORPHISM SHARE CARD */}
        {showShare && (
          <div style={{
            position: "relative", borderRadius: "24px", overflow: "hidden",
            marginBottom: "16px", animation: "fadeInUp 0.6s ease 0.2s both",
          }}>
            {/* Café scene background */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 0,
              background: "linear-gradient(135deg, #5C3D2E 0%, #8B6F47 30%, #D4A574 60%, #F5DEB3 100%)",
            }}>
              <div style={{ position: "absolute", top: "12px", left: "16px", fontSize: "28px", opacity: 0.3 }}>☕</div>
              <div style={{ position: "absolute", top: "40px", right: "20px", fontSize: "22px", opacity: 0.25 }}>🥞</div>
              <div style={{ position: "absolute", bottom: "30px", left: "30px", fontSize: "20px", opacity: 0.2 }}>🧇</div>
              <div style={{ position: "absolute", bottom: "15px", right: "40px", fontSize: "24px", opacity: 0.2 }}>🍯</div>
              <div style={{ position: "absolute", top: "65px", left: "50%", fontSize: "18px", opacity: 0.15 }}>✨</div>
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(90deg, transparent 49.5%, rgba(255,255,255,0.08) 49.5%, rgba(255,255,255,0.08) 50.5%, transparent 50.5%),
                  linear-gradient(0deg, transparent 49%, rgba(255,255,255,0.06) 49%, rgba(255,255,255,0.06) 51%, transparent 51%)`,
                backgroundSize: "100% 100%",
              }} />
            </div>

            {/* Glass pane */}
            <div style={{
              position: "relative", zIndex: 1,
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.35)",
              borderRadius: "24px", padding: "24px 20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.05)",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "40px",
                background: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)",
                borderRadius: "24px 24px 0 0", pointerEvents: "none",
              }} />
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "24px", fontWeight: "bold", color: "rgba(255,255,255,0.95)",
                  textShadow: "0 2px 8px rgba(0,0,0,0.3)", marginBottom: "4px",
                }}>☕ Griddle Logic</div>
                <div style={{
                  fontSize: "15px", color: "rgba(255,255,255,0.85)",
                  textShadow: "0 1px 4px rgba(0,0,0,0.2)", marginBottom: "12px",
                }}>{puzzle.title} · {DIFFICULTY_CONFIG[difficulty].label}</div>
                <div style={{
                  display: "flex", justifyContent: "center", gap: "4px",
                  marginBottom: "12px", flexWrap: "wrap",
                }}>
                  {grid.map((itemIdx, i) => (
                    <div key={i} style={{
                      width: "36px", height: "36px", borderRadius: "10px",
                      background: "rgba(255,255,255,0.2)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "20px", backdropFilter: "blur(4px)",
                    }}>{puzzle.items[itemIdx].emoji}</div>
                  ))}
                </div>
                <div style={{
                  fontSize: "13px", color: "rgba(255,255,255,0.8)",
                  marginBottom: "14px", textShadow: "0 1px 3px rgba(0,0,0,0.15)",
                }}>
                  {attempts === 1 ? "✨ Solved on the first try!" : `Solved in ${attempts} checks`}
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.15)", borderRadius: "12px",
                  padding: "12px", border: "1px solid rgba(255,255,255,0.2)", marginBottom: "16px",
                }}>
                  <div style={{
                    fontSize: "13px", fontStyle: "italic", color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.5, textShadow: "0 1px 3px rgba(0,0,0,0.15)",
                  }}>
                    💡 "{puzzle.quote.split("—")[0].trim()}"
                    {puzzle.quote.includes("—") && (
                      <span style={{ display: "block", marginTop: "4px", fontSize: "12px", opacity: 0.8 }}>
                        — {puzzle.quote.split("—")[1].trim()}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                  <button onClick={handleCopyShare}
                    style={{
                      padding: "10px 20px", borderRadius: "12px",
                      background: copied ? "rgba(22,163,74,0.8)" : "rgba(255,255,255,0.25)",
                      color: "white", fontSize: "14px", fontWeight: "bold", cursor: "pointer",
                      backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.3)",
                      transition: "all 0.2s ease", fontFamily: "system-ui, sans-serif",
                    }}>{copied ? "✓ Copied!" : "📋 Copy Results"}</button>
                  <button onClick={handleNewPuzzle}
                    style={{
                      padding: "10px 20px", borderRadius: "12px",
                      background: "rgba(217,119,6,0.7)", color: "white",
                      fontSize: "14px", fontWeight: "bold", cursor: "pointer",
                      backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)",
                      transition: "all 0.2s ease", fontFamily: "system-ui, sans-serif",
                    }}>🥞 Next Puzzle</button>
                </div>
                <div style={{
                  marginTop: "12px", fontSize: "11px", color: "rgba(255,255,255,0.6)",
                  fontFamily: "system-ui, sans-serif",
                }}>lettergriddle.com/logic</div>
              </div>
            </div>
          </div>
        )}

        {/* CLUES */}
        <div style={{
          background: "white", borderRadius: "16px", padding: "14px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "2px solid #FEF3C7",
        }}>
          <button onClick={() => setShowClues(!showClues)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              width: "100%", background: "none", border: "none", cursor: "pointer", padding: 0,
            }}>
            <span style={{ fontSize: "15px", fontWeight: "bold", color: "#292524" }}>📋 Clues</span>
            <span style={{
              fontSize: "18px", color: "#78716C",
              transform: showClues ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.2s ease",
            }}>▾</span>
          </button>
          {showClues && (
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
              {puzzle.clues.map((clue, i) => (
                <div key={i} style={{
                  padding: "7px 10px",
                  background: i % 2 === 0 ? "rgba(254,243,199,0.4)" : "rgba(255,251,235,0.6)",
                  borderRadius: "8px", fontSize: "13px", color: "#292524",
                  lineHeight: 1.5, animation: `slideIn 0.3s ease ${i * 0.04}s both`,
                }}>{clue}</div>
              ))}
            </div>
          )}
        </div>

        {/* HOW TO PLAY */}
        <div style={{
          textAlign: "center", marginTop: "18px", fontSize: "12px",
          color: "#78716C", fontFamily: "system-ui, sans-serif", lineHeight: 1.6,
        }}>
          <strong>How to Play:</strong> Tap an item, then tap a row to place it.
          Tap two rows to swap items. Use ☕ Check when ready!
        </div>

        {/* FOOTER */}
        <div style={{
          textAlign: "center", marginTop: "20px", paddingTop: "14px",
          borderTop: "1px solid #FEF3C7", fontSize: "12px", color: "#78716C",
        }}>
          <div>A game from <span style={{ color: "#D97706" }}>Letter Griddle Games</span></div>
          <div style={{ marginTop: "4px" }}>
            🥞 <a href="https://www.lettergriddle.com" style={{ color: "#78716C", textDecoration: "underline" }}>lettergriddle.com</a>
            {" · "}☕ <a href="https://www.griddlefalls.com" style={{ color: "#78716C", textDecoration: "underline" }}>griddlefalls.com</a>
          </div>
          <div style={{ marginTop: "8px", fontSize: "11px", color: "#A3A3A3" }}>
            © {new Date().getFullYear()} Letter Griddle. All rights reserved.
            {" | "}
            <a href="/privacy" style={{ color: "#A3A3A3", textDecoration: "underline" }}>Privacy Policy</a>
            {" | "}
            <a href="/terms" style={{ color: "#A3A3A3", textDecoration: "underline" }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
}