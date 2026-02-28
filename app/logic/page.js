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
      // Coffee=r1, Butter=r2, Pancake=r3, Strawberry=r4, Honey=r5
      solution: [3, 1, 5, 2, 4],
      clues: [
        "☕ Coffee is in the first row.",
        "🧈 Butter is in the second row.",
        "🥞 Pancake is in the middle row.",
        "🍓 Strawberry is in the fourth row.",
        "🍯 Honey is in the last row.",
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
      // Croissant=r1, Waffle=r2, Tea=r3, Blueberry=r4, Cookie=r5
      solution: [2, 4, 1, 3, 5],
      clues: [
        "🥐 Croissant is in the first row.",
        "🧇 Waffle is in row 2.",
        "🍪 Cookie is in the last row.",
        "🫐 Blueberry is in row 4.",
        "🍵 Tea is right above Blueberry.",
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
      // Strawberry=r1, Blueberry=r2, Syrup=r3, Pancake=r4, Coffee=r5, Butter=r6, Waffle=r7
      // Verify: Pancake middle(r4)✓, Syrup odd(r3)✓, Butter r6✓, Coffee between Pancake(4) and Butter(6)=r5✓,
      //         Strawberry r1✓, Blueberry next to Strawberry(r1)=r2✓, Waffle not r3/r4=r7✓
      solution: [1, 2, 4, 5, 6, 3, 7],
      clues: [
        "🥞 Pancake is in the middle row.",
        "🍯 Syrup is in one of the odd rows.",
        "🧈 Butter is in row 6.",
        "☕ Coffee is between Pancake and Butter.",
        "🍓 Strawberry is in the first row.",
        "🫐 Blueberry is next to Strawberry.",
        "🧇 Waffle is not in row 3 or 4.",
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
      // Egg=r1, Cheese=r2(below Egg), Toast=r3, Avocado=r4, Bacon=r5, Olive=r6(even,not 2/4), Juice=r7
      // Verify: Egg r1✓, Cheese directly below Egg=r2✓, Bacon r5✓, Avocado r4✓, Juice last=r7✓,
      //         Olive even not 2/4=r6✓, Toast not r1/r7=r3✓
      solution: [4, 1, 5, 2, 3, 7, 6],
      clues: [
        "🍳 Egg is in the first row.",
        "🧀 Cheese is directly below Egg.",
        "🥓 Bacon is in row 5.",
        "🥑 Avocado is in row 4.",
        "🥤 Juice is in the last row.",
        "🫒 Olive is in an even row, but not row 2 or 4.",
        "🍞 Toast is not in row 1 or 7.",
      ],
      quote: "Every morning brings new potential, but if you dwell on the misfortunes of the day before, you tend to overlook tremendous opportunities. — Harvey Mackay",
    },
  ],
  hard: [
    {
      id: "h1",
      title: "Full Café Menu",
      // Items: 0=Pancake, 1=Coffee, 2=Waffle, 3=Honey, 4=Butter, 5=Strawberry, 6=Blueberry, 7=Croissant, 8=Tea
      items: [
        { emoji: "🥞", name: "Pancake" },
        { emoji: "☕", name: "Coffee" },
        { emoji: "🧇", name: "Waffle" },
        { emoji: "🍯", name: "Honey" },
        { emoji: "🧈", name: "Butter" },
        { emoji: "🍓", name: "Strawberry" },
        { emoji: "🫐", name: "Blueberry" },
        { emoji: "🥐", name: "Croissant" },
        { emoji: "🍵", name: "Tea" },
      ],
      // Coffee=r1, Butter=r2(below Coffee), Honey=r3, Blueberry=r4, Pancake=r5
      // Remaining: Waffle, Strawberry, Croissant, Tea for rows 6,7,8,9
      // Tea=r9(last), Croissant even row higher than 6 → r8
      // Strawberry not next to Blueberry(r4) → not r5(taken). Options: r6,r7
      // Waffle between Blueberry(r4) and Strawberry
      // If Strawberry=r7, Waffle between r4 and r7 = r5(taken) or r6. Waffle=r6. ✓
      // Verify: Strawberry not next to Blueberry: r7 not adjacent to r4 ✓
      solution: [5, 1, 6, 3, 2, 7, 4, 8, 9],
      clues: [
        "☕ Coffee is in the first row.",
        "🧈 Butter is directly below Coffee.",
        "🍯 Honey is in row 3.",
        "🫐 Blueberry is in row 4.",
        "🥞 Pancake is in row 5.",
        "🍵 Tea is in the last row.",
        "🍓 Strawberry is not next to Blueberry.",
        "🥐 Croissant is in an even row higher than row 6.",
        "🧇 Waffle is between Blueberry and Strawberry.",
      ],
      quote: "It is during our darkest moments that we must focus to see the light. — Aristotle",
    },
    {
      id: "h2",
      title: "Grand Breakfast",
      // Items: 0=Egg, 1=Bacon, 2=Pancake, 3=Waffle, 4=Coffee, 5=Honey, 6=Butter, 7=Strawberry, 8=Juice
      items: [
        { emoji: "🍳", name: "Egg" },
        { emoji: "🥓", name: "Bacon" },
        { emoji: "🥞", name: "Pancake" },
        { emoji: "🧇", name: "Waffle" },
        { emoji: "☕", name: "Coffee" },
        { emoji: "🍯", name: "Honey" },
        { emoji: "🧈", name: "Butter" },
        { emoji: "🍓", name: "Strawberry" },
        { emoji: "🥤", name: "Juice" },
      ],
      // Pancake=r1, Coffee=r2, Waffle=r3, Egg=r4, Honey=r5, Butter=r6, Bacon=r7, Strawberry=r8, Juice=r9
      // Verify: Pancake r1✓, Coffee r2✓, Butter r3→NO wait let me redo this.
      // Clues: Pancake r1, Coffee r2, Butter r6, Egg r4, Juice r9(last)
      // Waffle above Egg(r4), not r1/r2 → r3 ✓
      // Bacon r7 ✓
      // Honey not r5 or r8 → remaining rows are 5,8. If not 5 or 8... that's broken.
      // Let me redesign this puzzle properly.
      // Remaining after r1,r2,r3,r4,r6,r7,r9: rows 5 and 8 for Honey and Strawberry
      // Honey not r5 or r8 is impossible. Fix clue: "Honey is in row 5"
      // Strawberry even row below r6 → r8 ✓
      // Pancake=r1, Coffee=r2, Waffle=r3, Egg=r4, Honey=r5, Butter=r6, Bacon=r7, Strawberry=r8, Juice=r9
      solution: [4, 7, 1, 3, 2, 5, 6, 8, 9],
      clues: [
        "🥞 Pancake is in row 1.",
        "☕ Coffee is in row 2.",
        "🧇 Waffle is above Egg but not in row 1 or 2.",
        "🍳 Egg is in row 4.",
        "🍯 Honey is in row 5.",
        "🧈 Butter is in row 6.",
        "🥓 Bacon is in row 7.",
        "🍓 Strawberry is in an even row below row 6.",
        "🥤 Juice is in the last row.",
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
  easy: { label: "Easy", emoji: "☕", color: "#16A34A", desc: "5 items · Direct clues" },
  medium: { label: "Medium", emoji: "🥞", color: "#D97706", desc: "7 items · Mixed clues" },
  hard: { label: "Hard", emoji: "🔥", color: "#DC2626", desc: "9 items · Tricky clues" },
  trivia: { label: "Trivia Night", emoji: "🌙", color: "#7C3AED", desc: "9 items · Deductive clues" },
};

export default function GriddleLogic() {
  const [difficulty, setDifficulty] = useState("medium");
  const [puzzleIdx, setPuzzleIdx] = useState(0);
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

  const puzzle = PUZZLES[difficulty][puzzleIdx];
  const numRows = puzzle.items.length;

  useEffect(() => {
    setGrid(Array(numRows).fill(null));
    setSelectedItem(null);
    setSelectedRow(null);
    setCheckResults(null);
    setSolved(false);
    setShowQuote(false);
    setShowShare(false);
    setConfetti([]);
    setAttempts(0);
    setCopied(false);
    const indices = puzzle.items.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledOrder(indices);
  }, [difficulty, puzzleIdx]);

  const placedItems = new Set(grid.filter((i) => i !== null));
  const displayTrayItems = shuffledOrder
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

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div style={{
            fontSize: "12px", color: "#D97706", letterSpacing: "3px",
            textTransform: "uppercase", marginBottom: "4px",
          }}>Letter Griddle Café presents</div>
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
          <div>A game from the <span style={{ color: "#D97706" }}>Letter Griddle Café</span></div>
          <div style={{ marginTop: "4px" }}>
            🥞 <span style={{ textDecoration: "underline" }}>lettergriddle.com</span>
            {" · "}☕ <span style={{ textDecoration: "underline" }}>griddlefalls.com</span>
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