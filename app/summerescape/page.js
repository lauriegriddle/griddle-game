"use client";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";

const PUZZLES = [
  {
    id: 1,
    theme: "California",
    subtitle: "",
    emoji: "\uD83C\uDF04",
    words: [
      { word: "SURF", hint: "Riding the waves along California's famous beaches", revealedIndex: 0 },
      { word: "COAST", hint: "The scenic edge where California meets the Pacific Ocean", revealedIndex: 2 },
      { word: "TAHOE", hint: "A stunning alpine lake shared with Nevada, known for its clear blue water", revealedIndex: 2 },
      { word: "REDWOOD", hint: "A towering, ancient tree species found in California's coastal forests", revealedIndex: 0 },
      { word: "YOSEMITE", hint: "A national park famous for granite cliffs, waterfalls, and giant sequoias", revealedIndex: 4 },
    ],
    didYouKnow: "The coastal gem of San Francisco boasts one of the coolest average July temperatures in the continental US, sitting at a breezy 67\u00B0 F. The Golden State is home to both the largest tree (General Sherman, by volume) and the tallest tree (Hyperion, measuring 379.7 feet) on the planet.",
  },
  {
    id: 2,
    theme: "Colorado",
    subtitle: "",
    emoji: "\uD83C\uDFD4\uFE0F",
    words: [
      { word: "HIGH", hint: "Way up above sea level, like Colorado's mountain towns", revealedIndex: 0 },
      { word: "ROCKY", hint: "The mountain range that gives Colorado its rugged, jagged peaks", revealedIndex: 2 },
      { word: "ALPINE", hint: "Relating to high mountains, like Colorado's snowy peaks", revealedIndex: 3 },
      { word: "OUTDOOR", hint: "Activities enjoyed in nature, from hiking to skiing", revealedIndex: 0 },
      { word: "ALTITUDE", hint: "The height above sea level that gives Colorado its thin, crisp air", revealedIndex: 4 },
    ],
    didYouKnow: "While best known for skiing, Colorado gets an average of over 300 days of sunshine annually, more than Florida! The tallest sand dunes in North America are located in the state at Great Sand Dunes National Park, reaching up to 750 feet high.",
  },
  {
    id: 3,
    theme: "Maine",
    subtitle: "",
    emoji: "\uD83E\uDD9E",
    words: [
      { word: "PINE", hint: "An evergreen tree common throughout Maine's forests", revealedIndex: 0 },
      { word: "CHARM", hint: "The quaint, old-fashioned appeal of a New England coastal town", revealedIndex: 2 },
      { word: "RUGGED", hint: "Rough and rocky, like Maine's dramatic coastline", revealedIndex: 3 },
      { word: "LOBSTER", hint: "A prized crustacean and Maine's most famous seafood export", revealedIndex: 0 },
      { word: "MARITIME", hint: "Relating to the sea and coastal life", revealedIndex: 4 },
    ],
    didYouKnow: "Despite its smaller geographic size, Maine has over 3,400 miles of coastline, which is more miles than California's coast. Maine produces 99% of all wild blueberries grown in the United States, and \u201Cblueberry pie\u201D is the official state dessert.",
  },
];

const GRAND_FACT = "California, Colorado, and Maine are premier July vacation spots, each offering distinct experiences. California provides sunny beaches and redwood forests, Colorado offers cool, high-altitude mountain retreats, and Maine is celebrated for its iconic rocky coastlines, fresh seafood, and lighthouses.";

const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const HowToPlayModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
    <div className="bg-gradient-to-br from-emerald-950 to-slate-900 border border-teal-500/30 rounded-xl p-5 max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-amber-200 font-semibold text-lg" style={{ fontFamily: "Cormorant Garamond, serif" }}>How to Play</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-200 transition-colors text-lg w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-700/50">{"\u2715"}</button>
      </div>
      <div className="space-y-3" style={{ fontFamily: "Crimson Text, serif" }}>
        <div className="flex items-start gap-3">
          <span className="text-amber-400 text-sm mt-0.5 shrink-0">1.</span>
          <p className="text-slate-300 text-base leading-relaxed">Each word has its own set of scrambled letters below it. One letter is already revealed to help you get started.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-amber-400 text-base mt-0.5 shrink-0">2.</span>
          <p className="text-slate-300 text-base leading-relaxed">Tap a letter, then tap an empty slot to place it. Or tap an empty slot first, then tap a letter. Either way works! On a computer, you can also type letters on your keyboard.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-amber-400 text-base mt-0.5 shrink-0">3.</span>
          <p className="text-slate-300 text-base leading-relaxed">If a letter turns red, it is in the wrong spot and will return to the letter bank. Keep trying!</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-amber-400 text-base mt-0.5 shrink-0">4.</span>
          <p className="text-slate-300 text-base leading-relaxed">{"Tap the Hint button for a clue about each word. Use the \u21BB button to shuffle the letters for a fresh look."}</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-amber-400 text-base mt-0.5 shrink-0">5.</span>
          <p className="text-slate-300 text-base leading-relaxed">{"Complete all five words to reveal a \"Did You Know?\" fun fact and move on to the next state."}</p>
        </div>
      </div>
      <div className="mt-5 text-center">
        <button onClick={onClose} className="px-6 py-2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-500 hover:to-emerald-600 text-white font-medium text-sm transition-all" style={{ fontFamily: "Crimson Text, serif" }}>{"Let\u2019s Play"}</button>
      </div>
    </div>
  </div>
);

const EventFooter = () => {
  const year = new Date().getFullYear();
  return (
    <div className="text-center mt-6 pb-4 space-y-1.5">
      <p className="text-slate-500 text-xs">A Letter Griddle Summer Escape</p>
      <p className="text-slate-500 text-xs">{"\u00A9"} {year} Letter Griddle. All rights reserved.</p>
      <div className="flex justify-center gap-3">
        <a href="https://www.lettergriddle.com/privacy" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-400/80 text-xs underline underline-offset-2 transition-colors">Privacy Policy</a>
        <span className="text-slate-600 text-xs">{"\u2022"}</span>
        <a href="https://www.lettergriddle.com/terms" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-400/80 text-xs underline underline-offset-2 transition-colors">Terms of Service</a>
      </div>
    </div>
  );
};

const BURST_COLORS = ["#14b8a6", "#0ea5e9", "#fbbf24", "#ffffff", "#34d399", "#38bdf8"];

const CelebrationOverlay = ({ variant = "puzzle", loop = false, maxWaves = 6 }) => {
  const isFinale = variant === "finale";
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!loop) return;
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setTick((t) => t + 1);
      if (count >= maxWaves - 1) clearInterval(interval);
    }, 1300);
    return () => clearInterval(interval);
  }, [loop, maxWaves]);

  const bursts = useMemo(() => {
    const burstCount = isFinale ? 7 : 5;
    const particleCount = isFinale ? 20 : 16;
    return Array.from({ length: burstCount }, (_, i) => ({
      id: `${tick}-${i}`,
      left: 8 + Math.random() * 84,
      top: 6 + Math.random() * 48,
      delay: Math.random() * (isFinale ? 0.9 : 0.5),
      size: isFinale ? 7 + Math.random() * 3 : 6,
      duration: isFinale ? 1.3 + Math.random() * 0.3 : 1.1,
      color: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
      particles: Array.from({ length: particleCount }, (_, p) => {
        const angle = (p / particleCount) * Math.PI * 2 + Math.random() * 0.3;
        const distance = (isFinale ? 55 : 45) + Math.random() * (isFinale ? 55 : 35);
        return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
      }),
    }));
  }, [tick, isFinale]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden">
      <style>{`
        @keyframes cel-particle {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          65% { opacity: 1; }
          100% { transform: translate(var(--cel-x), var(--cel-y)) scale(0.2); opacity: 0; }
        }
        @keyframes cel-flash {
          0% { opacity: 0.9; transform: scale(0.2); }
          100% { opacity: 0; transform: scale(2.2); }
        }
      `}</style>
      {bursts.map((b) => (
        <div key={b.id} style={{ position: "absolute", left: `${b.left}%`, top: `${b.top}%` }}>
          <div
            style={{
              position: "absolute",
              width: b.size + 4,
              height: b.size + 4,
              borderRadius: "9999px",
              backgroundColor: b.color,
              transform: "translate(-50%, -50%)",
              animation: `cel-flash 0.5s ease-out ${b.delay}s forwards`,
            }}
          />
          {b.particles.map((p, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                width: b.size,
                height: b.size,
                borderRadius: "9999px",
                backgroundColor: b.color,
                boxShadow: `0 0 6px 2px ${b.color}`,
                transform: "translate(-50%, -50%)",
                "--cel-x": `${p.x}px`,
                "--cel-y": `${p.y}px`,
                animation: `cel-particle ${b.duration}s ease-out ${b.delay}s forwards`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const WordPuzzle = ({ wordData, wordIdx, onComplete, isCompleted, isActive, onFocus }) => {
  const word = wordData.word;
  const revIdx = wordData.revealedIndex;
  const containerRef = useRef(null);

  const [slots, setSlots] = useState(() => {
    const s = Array(word.length).fill("");
    s[revIdx] = word[revIdx];
    return s;
  });
  const [bank, setBank] = useState(() => {
    const letters = word.split("").filter((_, i) => i !== revIdx);
    return shuffleArray(letters);
  });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedBankIdx, setSelectedBankIdx] = useState(null);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [wrongSlots, setWrongSlots] = useState({});
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    if (isActive && !isCompleted) {
      const firstEmpty = slots.findIndex((s, i) => !s && i !== revIdx);
      if (firstEmpty !== -1) setSelectedSlot(firstEmpty);
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive || isCompleted) return;
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (key.length === 1 && key >= "A" && key <= "Z") {
        e.preventDefault();
        const bankIdx = bank.findIndex((l) => l === key);
        if (bankIdx === -1) return;
        let targetSlot = selectedSlot;
        if (targetSlot === null || slots[targetSlot]) {
          targetSlot = slots.findIndex((s, i) => !s && i !== revIdx);
        }
        if (targetSlot === -1 || targetSlot === null) return;
        placeLetter(key, targetSlot, bankIdx);
        const currentSlots = [...slots];
        currentSlots[targetSlot] = key;
        const nextEmpty = currentSlots.findIndex((s, i) => !s && i !== revIdx);
        setSelectedSlot(nextEmpty !== -1 ? nextEmpty : null);
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        let lastFilled = -1;
        for (let i = slots.length - 1; i >= 0; i--) {
          if (slots[i] && i !== revIdx) { lastFilled = i; break; }
        }
        if (lastFilled === -1) return;
        const letter = slots[lastFilled];
        const newSlots = [...slots];
        newSlots[lastFilled] = "";
        setSlots(newSlots);
        const newBank = [...bank];
        const emptyIdx = newBank.findIndex((b) => b === "");
        if (emptyIdx !== -1) newBank[emptyIdx] = letter;
        setBank(newBank);
        setSelectedSlot(lastFilled);
        setSelectedBankIdx(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, isCompleted, bank, slots, selectedSlot, revIdx]);

  useEffect(() => {
    if (slots.every((s, i) => s === word[i]) && !isCompleted) {
      setCelebrating(true);
      setTimeout(() => {
        setCelebrating(false);
        onComplete(wordIdx);
      }, 1200);
    }
  }, [slots, word, isCompleted, onComplete, wordIdx]);

  const placeLetter = (letter, slotIdx, bankIdx) => {
    const newSlots = [...slots];
    const newBank = [...bank];
    if (newSlots[slotIdx]) {
      const existingLetter = newSlots[slotIdx];
      const emptyBankIdx = newBank.findIndex((b) => b === "");
      if (emptyBankIdx !== -1) newBank[emptyBankIdx] = existingLetter;
    }
    newSlots[slotIdx] = letter;
    newBank[bankIdx] = "";
    setSlots(newSlots);
    setBank(newBank);
    if (letter !== word[slotIdx]) {
      setWrongSlots((p) => ({ ...p, [slotIdx]: true }));
      setTimeout(() => {
        setWrongSlots((p) => { const n = { ...p }; delete n[slotIdx]; return n; });
        setSlots((prev) => { const r = [...prev]; r[slotIdx] = ""; return r; });
        setBank((prev) => { const r = [...prev]; r[bankIdx] = letter; return r; });
      }, 600);
    }
    setSelectedSlot(null);
    setSelectedBankIdx(null);
  };

  const handleBankClick = (idx) => {
    if (isCompleted) return;
    onFocus();
    const letter = bank[idx];
    if (!letter) return;
    if (selectedSlot !== null) {
      placeLetter(letter, selectedSlot, idx);
      setTimeout(() => {
        setSelectedSlot((prev) => {
          const nextEmpty = slots.findIndex((s, i) => !s && i !== revIdx && i !== selectedSlot);
          return nextEmpty !== -1 ? nextEmpty : null;
        });
      }, 10);
    } else {
      setSelectedBankIdx(selectedBankIdx === idx ? null : idx);
      setSelectedSlot(null);
    }
  };

  const handleSlotClick = (idx) => {
    if (isCompleted || idx === revIdx) return;
    onFocus();
    if (selectedBankIdx !== null) {
      const letter = bank[selectedBankIdx];
      if (!letter) return;
      placeLetter(letter, idx, selectedBankIdx);
    } else if (slots[idx] && idx !== revIdx) {
      const letter = slots[idx];
      const newSlots = [...slots];
      newSlots[idx] = "";
      setSlots(newSlots);
      const newBank = [...bank];
      const emptyIdx = newBank.findIndex((b) => b === "");
      if (emptyIdx !== -1) newBank[emptyIdx] = letter;
      setBank(newBank);
      setSelectedSlot(null);
      setSelectedBankIdx(null);
    } else if (!slots[idx]) {
      setSelectedSlot(selectedSlot === idx ? null : idx);
      setSelectedBankIdx(null);
    }
  };

  const handleShuffle = () => {
    const letters = bank.filter((l) => l !== "");
    const blanks = bank.filter((l) => l === "");
    setBank(shuffleArray([...shuffleArray(letters), ...blanks]));
  };

  return (
    <div
      ref={containerRef}
      onClick={() => { if (!isActive) onFocus(); }}
      className={`rounded-xl p-3 mb-3 border-2 transition-all duration-500 ${
        isCompleted ? "bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-500/50"
          : celebrating ? "bg-gradient-to-br from-teal-900/30 to-sky-900/30 border-amber-400 scale-[1.02]"
          : isActive ? "bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-teal-500/40"
          : "bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 hover:border-teal-500/30"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-amber-300 text-xs font-semibold tracking-wider uppercase">{word.length} Letters</span>
          {isCompleted && <span className="text-emerald-400 text-sm">{"\u2713"}</span>}
          {isActive && !isCompleted && <span className="text-amber-400 text-xs">{"\u2328 active"}</span>}
        </div>
        <div className="flex items-center gap-2">
          {!isCompleted && (
            <button onClick={handleShuffle} className="text-xs px-2 py-1 rounded-full bg-slate-700/80 text-slate-300 hover:bg-slate-600 hover:text-amber-200 transition-all" title="Shuffle letters">{"\u21BB"}</button>
          )}
          <button onClick={() => setHintRevealed(!hintRevealed)} className={`text-xs px-3 py-1 rounded-full transition-all font-medium ${
            hintRevealed ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-gradient-to-r from-teal-600 to-emerald-700 text-white hover:from-teal-500 hover:to-emerald-600 shadow-sm"
          }`}>{hintRevealed ? "Hide Hint" : "Hint"}</button>
        </div>
      </div>
      {hintRevealed && (
        <div className="bg-slate-900/50 border border-amber-500/20 rounded-lg p-2.5 mb-3">
          <p className="text-amber-100 text-base leading-relaxed">{wordData.hint}</p>
        </div>
      )}
      <div className="flex gap-1.5 justify-center flex-wrap mb-3">
        {word.split("").map((letter, idx) => {
          const isRevealed = idx === revIdx && !isCompleted;
          const current = slots[idx] || "";
          const isWrong = wrongSlots[idx];
          const isSelected = selectedSlot === idx;
          let slotClass = "w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-base sm:text-lg font-bold rounded-lg border-2 transition-all duration-300 cursor-pointer select-none";
          if (celebrating) slotClass += " bg-gradient-to-br from-amber-400 to-yellow-500 border-amber-300 text-amber-900 animate-bounce shadow-lg shadow-amber-500/30";
          else if (isWrong) slotClass += " bg-gradient-to-br from-red-800/60 to-red-900/60 border-red-500 text-red-300 animate-pulse";
          else if (isRevealed) slotClass += " bg-gradient-to-br from-sky-800/40 to-sky-900/40 border-sky-400/60 text-sky-200";
          else if (isCompleted) slotClass += " bg-gradient-to-br from-emerald-700/40 to-teal-800/40 border-emerald-400/50 text-emerald-200 shadow-sm shadow-emerald-500/20";
          else if (isSelected) slotClass += " bg-teal-500/20 border-teal-400 text-teal-100 ring-2 ring-teal-400/50";
          else if (current) slotClass += " bg-slate-700/60 border-slate-500/60 text-slate-100 hover:border-teal-400/50";
          else slotClass += " bg-slate-800/40 border-slate-600/40 text-transparent hover:border-teal-500/40 hover:bg-slate-700/40";
          return (
            <div key={idx} onClick={() => handleSlotClick(idx)} className={slotClass} style={{ fontFamily: "Georgia, serif" }}>
              {current || "\u00A0"}
            </div>
          );
        })}
      </div>
      {!isCompleted && (
        <div className="flex gap-1.5 justify-center flex-wrap">
          {bank.map((letter, idx) => {
            if (!letter) return <div key={idx} className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg opacity-0" />;
            const isSelected = selectedBankIdx === idx;
            return (
              <div key={idx} onClick={() => handleBankClick(idx)} className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-base sm:text-lg font-bold rounded-lg border-2 cursor-pointer select-none transition-all duration-200 ${
                isSelected ? "bg-teal-500 border-teal-300 text-white scale-110 shadow-lg shadow-teal-500/40 ring-2 ring-teal-300/50"
                  : "bg-gradient-to-br from-slate-600 to-slate-700 border-slate-500 text-slate-100 hover:from-teal-600 hover:to-emerald-700 hover:border-teal-400 hover:text-white hover:shadow-md"
              }`} style={{ fontFamily: "Georgia, serif" }}>{letter}</div>
            );
          })}
        </div>
      )}
      {isCompleted && !celebrating && (
        <div className="text-center mt-1"><span className="text-emerald-400 text-lg">{"\u2726"}</span></div>
      )}
    </div>
  );
};

export default function SummerEscapePage() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [completedWords, setCompletedWords] = useState(PUZZLES.map((p) => Array(p.words.length).fill(false)));
  const [puzzleComplete, setPuzzleComplete] = useState(Array(PUZZLES.length).fill(false));
  const [showDidYouKnow, setShowDidYouKnow] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const puzzle = PUZZLES[currentPuzzle];

  const handleWordComplete = useCallback((wordIdx) => {
    setCompletedWords((prev) => {
      const n = prev.map((a) => [...a]);
      n[currentPuzzle][wordIdx] = true;
      return n;
    });
    const nextIncomplete = completedWords[currentPuzzle].findIndex((c, i) => !c && i !== wordIdx);
    if (nextIncomplete !== -1) setActiveWordIdx(nextIncomplete);
  }, [currentPuzzle, completedWords]);

  useEffect(() => {
    if (completedWords[currentPuzzle]?.every((c) => c)) {
      setTimeout(() => {
        setPuzzleComplete((prev) => { const n = [...prev]; n[currentPuzzle] = true; return n; });
        setShowDidYouKnow(true);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2500);
      }, 800);
    }
  }, [completedWords, currentPuzzle]);

  useEffect(() => {
    if (puzzleComplete.every((c) => c)) {
      setAllDone(true);
    }
  }, [puzzleComplete]);

  const goToNextPuzzle = () => {
    setShowDidYouKnow(false);
    if (currentPuzzle < PUZZLES.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1);
      setActiveWordIdx(0);
    }
  };

  // INTRO SCREEN
  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-slate-900 to-sky-950 flex items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:wght@300;400;500;600&display=swap');
          @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
          .fade-up { animation: fadeUp 0.8s ease-out forwards; opacity: 0; }
          .fade-up-1 { animation-delay: 0.2s; } .fade-up-2 { animation-delay: 0.5s; } .fade-up-3 { animation-delay: 0.8s; } .fade-up-4 { animation-delay: 1.1s; } .fade-up-5 { animation-delay: 1.4s; } .fade-up-6 { animation-delay: 1.7s; }
          .shimmer-text { background: linear-gradient(90deg, #14b8a6, #fde68a, #0ea5e9, #fde68a, #14b8a6); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 5s linear infinite; }
        `}</style>
        <div className="max-w-lg w-full text-center">
          <div className="fade-up fade-up-2 mb-4">
            <span className="text-xs tracking-[0.3em] uppercase text-slate-400 font-medium">Letter Griddle presents</span>
          </div>
          <h1 className="fade-up fade-up-2 text-3xl sm:text-4xl font-semibold mb-2 shimmer-text" style={{ fontFamily: "Cormorant Garamond, serif" }}>Summer Escape</h1>
          <p className="fade-up fade-up-2 text-lg text-slate-300 mb-6 italic" style={{ fontFamily: "Crimson Text, serif" }}>Week 1: America's Favorite Vacation States</p>
          <p className="fade-up fade-up-3 text-slate-300 text-sm mb-2 leading-relaxed max-w-sm mx-auto" style={{ fontFamily: "Crimson Text, serif" }}>Three puzzles, three getaways: sunny coastlines, mountain air, and rocky shores.</p>
          <p className="fade-up fade-up-3 text-slate-400 text-xs mb-8" style={{ fontFamily: "Crimson Text, serif" }}>A new Summer Escape every week in July</p>
          <div className="fade-up fade-up-4 flex justify-center gap-4 mb-8">
            {PUZZLES.map((p) => (
              <div key={p.id} className="text-center">
                <div className="text-2xl mb-1">{p.emoji}</div>
                <span className="text-xs text-slate-400" style={{ fontFamily: "Crimson Text, serif" }}>{p.theme}</span>
              </div>
            ))}
          </div>
          <div className="fade-up fade-up-5">
            <button onClick={() => setShowIntro(false)} className="px-8 py-3 rounded-full bg-gradient-to-r from-teal-600 to-sky-700 hover:from-teal-500 hover:to-sky-600 text-white font-semibold tracking-wide transition-all shadow-lg shadow-black/30 hover:shadow-black/40 hover:scale-105" style={{ fontFamily: "Crimson Text, serif", fontSize: "1.1rem" }}>Start the Escape</button>
          </div>
          <div className="fade-up fade-up-6"><EventFooter /></div>
        </div>
      </div>
    );
  }

  // COMPLETION SCREEN
  if (allDone && !showDidYouKnow) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-slate-900 to-sky-950 flex items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:wght@300;400;500;600&display=swap');
          @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .fade-up { animation: fadeUp 0.8s ease-out forwards; opacity: 0; }
          .fade-up-1 { animation-delay: 0.2s; } .fade-up-2 { animation-delay: 0.5s; } .fade-up-3 { animation-delay: 0.8s; } .fade-up-4 { animation-delay: 1.1s; } .fade-up-5 { animation-delay: 1.6s; }
        `}</style>
        <CelebrationOverlay variant="finale" loop maxWaves={6} />
        <div className="max-w-lg w-full text-center">
          <div className="fade-up fade-up-1 text-3xl mb-4">{"\uD83C\uDF04"}</div>
          <h2 className="fade-up fade-up-1 text-2xl sm:text-3xl font-semibold text-amber-200 mb-2" style={{ fontFamily: "Cormorant Garamond, serif" }}>Escape Complete</h2>
          <p className="fade-up fade-up-2 text-amber-200 text-base mb-2" style={{ fontFamily: "Crimson Text, serif" }}>You made it through all three states.</p>
          <p className="fade-up fade-up-2 text-slate-300 text-sm mb-6 italic" style={{ fontFamily: "Crimson Text, serif" }}>Thanks for playing this week's Summer Escape!</p>
          <div className="fade-up fade-up-3 flex justify-center gap-6 mb-6">
            {PUZZLES.map((p) => (
              <div key={p.id} className="text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-900/30 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">{p.emoji}</span>
                </div>
                <span className="text-xs text-emerald-400" style={{ fontFamily: "Crimson Text, serif" }}>{p.theme}</span>
              </div>
            ))}
          </div>
          <div className="fade-up fade-up-3 bg-gradient-to-br from-teal-900/40 to-sky-900/30 border-2 border-amber-500/30 rounded-xl p-5 mb-6 text-center">
            <div className="text-2xl mb-2">{"\uD83C\uDF34"}</div>
            <h3 className="text-amber-200 font-semibold text-lg mb-3" style={{ fontFamily: "Cormorant Garamond, serif" }}>Did You Know?</h3>
            <p className="text-amber-100 text-base leading-relaxed" style={{ fontFamily: "Crimson Text, serif" }}>{GRAND_FACT}</p>
          </div>
          <div className="fade-up fade-up-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl border border-slate-700/50 p-5 mb-6">
            <p className="text-amber-200 font-semibold mb-4" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem" }}>Explore more from Letter Griddle</p>
            <div className="space-y-3">
              <a href="https://www.lettergriddle.com/play" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-r from-teal-700/30 to-teal-800/30 hover:from-teal-600/40 hover:to-teal-700/40 border border-teal-600/30 rounded-lg p-3 transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{"\uD83E\uDD5E"}</span>
                  <div className="text-left">
                    <span className="text-amber-200 text-sm font-medium group-hover:text-amber-100">Letter Griddle</span>
                    <p className="text-slate-400 text-xs">A new cozy word puzzle every day</p>
                  </div>
                </div>
              </a>
              <a href="https://www.lettergriddle.com" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-r from-sky-700/30 to-sky-800/30 hover:from-sky-600/40 hover:to-sky-700/40 border border-sky-600/30 rounded-lg p-3 transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{"\u2615"}</span>
                  <div className="text-left">
                    <span className="text-amber-200 text-sm font-medium group-hover:text-amber-100">Letter Griddle Games</span>
                    <p className="text-slate-400 text-xs">Explore our full family of games</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="fade-up fade-up-5"><EventFooter /></div>
        </div>
      </div>
    );
  }

  // GAME SCREEN
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-slate-900 to-sky-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:wght@300;400;500;600&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.5s ease-out; }
      `}</style>
      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
      {showCelebration && <CelebrationOverlay />}
      <div className="max-w-lg mx-auto px-3 py-4">
        <div className="text-center mb-4">
          <div className="flex items-center justify-between mb-1">
            <div className="w-8" />
            <span className="text-xs tracking-[0.2em] uppercase text-slate-300 font-medium">Letter Griddle {"\u2022"} Summer Escape</span>
            <button onClick={() => setShowHowToPlay(true)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-amber-300 hover:border-amber-500/30 transition-all text-sm" title="How to Play">?</button>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-amber-200 mt-1" style={{ fontFamily: "Cormorant Garamond, serif" }}>Summer Escape</h1>
          <div className="flex justify-center gap-3 mt-3">
            {PUZZLES.map((p, idx) => (
              <button key={p.id} onClick={() => { if (puzzleComplete[idx] || idx === currentPuzzle) { setCurrentPuzzle(idx); setShowDidYouKnow(false); setActiveWordIdx(0); } }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                  idx === currentPuzzle ? "bg-teal-600/30 border border-teal-500/40 text-amber-200"
                    : puzzleComplete[idx] ? "bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 cursor-pointer hover:bg-emerald-800/30"
                    : "bg-slate-800/40 border border-slate-700/40 text-slate-500"
                }`}>
                <span>{p.emoji}</span>
                <span style={{ fontFamily: "Crimson Text, serif" }}>{p.theme}</span>
                {puzzleComplete[idx] && <span>{"\u2713"}</span>}
              </button>
            ))}
          </div>
        </div>
        {showDidYouKnow && (
          <div className="fade-in mb-4">
            <div className="bg-gradient-to-br from-teal-900/40 to-sky-900/30 border-2 border-amber-500/30 rounded-xl p-5 text-center">
              <div className="text-2xl mb-2">{"\uD83C\uDF34"}</div>
              <h3 className="text-amber-200 font-semibold text-lg mb-3" style={{ fontFamily: "Cormorant Garamond, serif" }}>Did You Know?</h3>
              <p className="text-amber-100 text-base leading-relaxed mb-5" style={{ fontFamily: "Crimson Text, serif" }}>{puzzle.didYouKnow}</p>
              {currentPuzzle < PUZZLES.length - 1 ? (
                <button onClick={goToNextPuzzle} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-600 to-sky-700 hover:from-teal-500 hover:to-sky-600 text-white font-medium transition-all shadow-lg hover:scale-105" style={{ fontFamily: "Crimson Text, serif" }}>
                  Continue to {PUZZLES[currentPuzzle + 1].theme} {PUZZLES[currentPuzzle + 1].emoji}
                </button>
              ) : (
                <button onClick={() => { setAllDone(true); setShowDidYouKnow(false); }} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium transition-all shadow-lg hover:scale-105" style={{ fontFamily: "Crimson Text, serif" }}>
                  Finish the Escape {"\uD83C\uDF04"}
                </button>
              )}
            </div>
          </div>
        )}
        {!showDidYouKnow && (
          <div className="fade-in">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-full px-4 py-1.5">
                <span className="text-lg">{puzzle.emoji}</span>
                <span className="text-amber-200 font-medium" style={{ fontFamily: "Cormorant Garamond, serif" }}>{puzzle.theme}</span>
              </div>
              <p className="text-amber-200/80 text-xs mt-2 italic" style={{ fontFamily: "Crimson Text, serif" }}>{puzzle.subtitle}</p>
            </div>
            <div className="text-center mb-3">
              <p className="text-slate-300 text-sm">Tap a letter then tap a slot, or tap a slot then tap a letter. On a computer, click a word and type!</p>
            </div>
            {puzzle.words.map((wordData, wordIdx) => (
              <WordPuzzle
                key={`${currentPuzzle}-${wordIdx}`}
                wordData={wordData}
                wordIdx={wordIdx}
                onComplete={handleWordComplete}
                isCompleted={completedWords[currentPuzzle][wordIdx]}
                isActive={activeWordIdx === wordIdx && !completedWords[currentPuzzle][wordIdx]}
                onFocus={() => setActiveWordIdx(wordIdx)}
              />
            ))}
          </div>
        )}
        <EventFooter />
      </div>
    </div>
  );
}