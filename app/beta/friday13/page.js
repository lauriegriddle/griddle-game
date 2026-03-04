"use client";
import { useState, useEffect, useCallback, useRef } from "react";

const PUZZLES = [
  {
    id: 1,
    theme: "Life",
    subtitle: "Placeholder question or statement.",
    emoji: "✨",
    words: [
      { word: "GROW", hint: "To develop, change, and become more than you were before", revealedIndex: 0 },
      { word: "DREAM", hint: "A vision of possibility that guides you forward", revealedIndex: 2 },
      { word: "PURPOSE", hint: "The deeper reason behind what you do and who you are", revealedIndex: 0 },
      { word: "ALCHEMY", hint: "The art of transforming something ordinary into something extraordinary", revealedIndex: 3 },
      { word: "CONSCIOUS", hint: "Fully awake and aware of yourself, your choices, and the world around you", revealedIndex: 4 },
    ],
    didYouKnow: "Recent studies found that in the moments after the heart stops, the brain can experience a sudden surge of highly organized electrical activity. Some researchers believe this may explain near-death experiences.",
  },
  {
    id: 2,
    theme: "After Life",
    subtitle: "Placeholder question or statement.",
    emoji: "🌙",
    words: [
      { word: "PEACE", hint: "A state of calm and stillness beyond all worry", revealedIndex: 0 },
      { word: "SPIRIT", hint: "The essence of a person that some believe endures beyond the body", revealedIndex: 0 },
      { word: "BEYOND", hint: "Past the limits of what we can see or understand", revealedIndex: 0 },
      { word: "PASSAGE", hint: "A journey or transition from one state to another", revealedIndex: 0 },
      { word: "ETHEREAL", hint: "Delicate and light, as if belonging to another world", revealedIndex: 0 },
    ],
    didYouKnow: "Placeholder: Fun fact for After Life puzzle coming soon.",
  },
  {
    id: 3,
    theme: "The Bridge Between",
    subtitle: "Placeholder question or statement.",
    emoji: "⭐",
    words: [
      { word: "SIGNS", hint: "Meaningful messages that seem to come from beyond coincidence", revealedIndex: 0 },
      { word: "MEDIUM", hint: "A person believed to communicate between the living and those who have passed", revealedIndex: 0 },
      { word: "INTUITION", hint: "A deep inner knowing that arrives without logical explanation", revealedIndex: 0 },
      { word: "CONNECTED", hint: "Linked together across distance, time, or even dimensions", revealedIndex: 0 },
      { word: "TRANSCEND", hint: "To rise above ordinary limits and reach something greater", revealedIndex: 0 },
    ],
    didYouKnow: "Placeholder: Fun fact for The Bridge Between puzzle coming soon.",
  },
];

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
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600/50 rounded-xl p-5 max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-amber-200 font-semibold text-lg" style={{ fontFamily: "Cormorant Garamond, serif" }}>How to Play</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-200 transition-colors text-lg w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-700/50">✕</button>
      </div>
      <div className="space-y-3" style={{ fontFamily: "Crimson Text, serif" }}>
        <div className="flex items-start gap-3">
          <span className="text-amber-400 text-sm mt-0.5 shrink-0">1.</span>
          <p className="text-slate-300 text-sm leading-relaxed">Each word has its own set of scrambled letters below it. One letter is already revealed to help you get started.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-amber-400 text-sm mt-0.5 shrink-0">2.</span>
          <p className="text-slate-300 text-sm leading-relaxed">Tap a letter, then tap an empty slot to place it. Or tap an empty slot first, then tap a letter. Either way works! On a computer, you can also type letters on your keyboard.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-amber-400 text-sm mt-0.5 shrink-0">3.</span>
          <p className="text-slate-300 text-sm leading-relaxed">If a letter turns red, it is in the wrong spot and will return to the letter bank. Keep trying!</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-amber-400 text-sm mt-0.5 shrink-0">4.</span>
          <p className="text-slate-300 text-sm leading-relaxed">Tap the Hint button for a clue about each word. Use the ↻ button to shuffle the letters for a fresh look.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-amber-400 text-sm mt-0.5 shrink-0">5.</span>
          <p className="text-slate-300 text-sm leading-relaxed">Complete all five words to reveal a "Did You Know?" fun fact and move on to the next puzzle.</p>
        </div>
      </div>
      <div className="mt-5 text-center">
        <button onClick={onClose} className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-sm transition-all" style={{ fontFamily: "Crimson Text, serif" }}>Let us Play</button>
      </div>
    </div>
  </div>
);

const EventFooter = () => {
  const year = new Date().getFullYear();
  return (
    <div className="text-center mt-6 pb-4 space-y-1.5">
      <p className="text-slate-700 text-xs">A Letter Griddle Experience</p>
      <p className="text-slate-700 text-xs">© {year} Letter Griddle. All rights reserved.</p>
      <div className="flex justify-center gap-3">
        <a href="https://www.lettergriddle.com/privacy" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-amber-500/70 text-xs underline underline-offset-2 transition-colors">Privacy Policy</a>
        <span className="text-slate-700 text-xs">•</span>
        <a href="https://www.lettergriddle.com/terms" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-amber-500/70 text-xs underline underline-offset-2 transition-colors">Terms of Service</a>
      </div>
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
          : celebrating ? "bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border-amber-400 scale-[1.02]"
          : isActive ? "bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-amber-500/40"
          : "bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-600/50 hover:border-amber-500/30"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-amber-300 text-xs font-semibold tracking-wider uppercase">{word.length} Letters</span>
          {isCompleted && <span className="text-emerald-400 text-sm">✓</span>}
          {isActive && !isCompleted && <span className="text-amber-400 text-xs">⌨ active</span>}
        </div>
        <div className="flex items-center gap-2">
          {!isCompleted && (
            <button onClick={handleShuffle} className="text-xs px-2 py-1 rounded-full bg-slate-700/80 text-slate-300 hover:bg-slate-600 hover:text-amber-200 transition-all" title="Shuffle letters">↻</button>
          )}
          <button onClick={() => setHintRevealed(!hintRevealed)} className={`text-xs px-3 py-1 rounded-full transition-all font-medium ${
            hintRevealed ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-500 hover:to-amber-600 shadow-sm"
          }`}>{hintRevealed ? "Hide Hint" : "Hint"}</button>
        </div>
      </div>
      {hintRevealed && (
        <div className="bg-slate-900/50 border border-amber-500/20 rounded-lg p-2.5 mb-3">
          <p className="text-amber-100/90 text-sm leading-relaxed">{wordData.hint}</p>
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
          else if (isRevealed) slotClass += " bg-gradient-to-br from-indigo-800/40 to-purple-900/40 border-indigo-400/60 text-indigo-200";
          else if (isCompleted) slotClass += " bg-gradient-to-br from-emerald-700/40 to-teal-800/40 border-emerald-400/50 text-emerald-200 shadow-sm shadow-emerald-500/20";
          else if (isSelected) slotClass += " bg-amber-500/20 border-amber-400 text-amber-200 ring-2 ring-amber-400/50";
          else if (current) slotClass += " bg-slate-700/60 border-slate-500/60 text-slate-100 hover:border-amber-400/50";
          else slotClass += " bg-slate-800/40 border-slate-600/40 text-transparent hover:border-amber-500/40 hover:bg-slate-700/40";
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
                isSelected ? "bg-amber-500 border-amber-300 text-amber-900 scale-110 shadow-lg shadow-amber-500/40 ring-2 ring-amber-300/50"
                  : "bg-gradient-to-br from-slate-600 to-slate-700 border-slate-500 text-slate-100 hover:from-amber-600 hover:to-amber-700 hover:border-amber-400 hover:text-white hover:shadow-md"
              }`} style={{ fontFamily: "Georgia, serif" }}>{letter}</div>
            );
          })}
        </div>
      )}
      {isCompleted && !celebrating && (
        <div className="text-center mt-1"><span className="text-emerald-400 text-lg">✦</span></div>
      )}
    </div>
  );
};

export default function Friday13Page() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [completedWords, setCompletedWords] = useState(PUZZLES.map((p) => Array(p.words.length).fill(false)));
  const [puzzleComplete, setPuzzleComplete] = useState(Array(PUZZLES.length).fill(false));
  const [showDidYouKnow, setShowDidYouKnow] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [activeWordIdx, setActiveWordIdx] = useState(0);

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

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:wght@300;400;500;600&display=swap');
          @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
          .fade-up { animation: fadeUp 0.8s ease-out forwards; opacity: 0; }
          .fade-up-1 { animation-delay: 0.2s; } .fade-up-2 { animation-delay: 0.5s; } .fade-up-3 { animation-delay: 0.8s; } .fade-up-4 { animation-delay: 1.1s; } .fade-up-5 { animation-delay: 1.4s; }
          .shimmer-text { background: linear-gradient(90deg, #d4a054, #f5d89a, #d4a054); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 4s linear infinite; }
        `}</style>
        <div className="max-w-lg w-full text-center">
          <div className="fade-up fade-up-1 mb-4">
            <span className="text-xs tracking-[0.3em] uppercase text-slate-400 font-medium">Letter Griddle presents</span>
          </div>
          <h1 className="fade-up fade-up-2 text-3xl sm:text-4xl font-semibold mb-2 shimmer-text" style={{ fontFamily: "Cormorant Garamond, serif" }}>Friday the 13th Summit</h1>
          <p className="fade-up fade-up-2 text-lg text-slate-300 mb-6 italic" style={{ fontFamily: "Crimson Text, serif" }}>Life, After Life, and the Bridge Between</p>
          <p className="fade-up fade-up-3 text-slate-400 text-sm mb-2 leading-relaxed max-w-sm mx-auto" style={{ fontFamily: "Crimson Text, serif" }}>Placeholder: Three puzzles. Fifteen words. A journey from what we know into what we wonder about.</p>
          <p className="fade-up fade-up-3 text-slate-500 text-xs mb-8" style={{ fontFamily: "Crimson Text, serif" }}>Presented by Let's Create Summits</p>
          <div className="fade-up fade-up-4 flex justify-center gap-4 mb-8">
            {PUZZLES.map((p) => (
              <div key={p.id} className="text-center">
                <div className="text-2xl mb-1">{p.emoji}</div>
                <span className="text-xs text-slate-400" style={{ fontFamily: "Crimson Text, serif" }}>{p.theme}</span>
              </div>
            ))}
          </div>
          <div className="fade-up fade-up-5">
            <button onClick={() => setShowIntro(false)} className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold tracking-wide transition-all shadow-lg shadow-amber-900/30 hover:shadow-amber-800/40 hover:scale-105" style={{ fontFamily: "Crimson Text, serif", fontSize: "1.1rem" }}>Begin the Journey</button>
          </div>
          <div className="fade-up fade-up-5"><EventFooter /></div>
        </div>
      </div>
    );
  }

  if (allDone && !showDidYouKnow) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:wght@300;400;500;600&display=swap');
          @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .fade-up { animation: fadeUp 0.8s ease-out forwards; opacity: 0; }
          .fade-up-1 { animation-delay: 0.2s; } .fade-up-2 { animation-delay: 0.5s; } .fade-up-3 { animation-delay: 0.8s; } .fade-up-4 { animation-delay: 1.1s; } .fade-up-5 { animation-delay: 1.6s; }
        `}</style>
        <div className="max-w-lg w-full text-center">
          <div className="fade-up fade-up-1 text-3xl mb-4">✨</div>
          <h2 className="fade-up fade-up-1 text-2xl sm:text-3xl font-semibold text-amber-200 mb-2" style={{ fontFamily: "Cormorant Garamond, serif" }}>Journey Complete</h2>
          <p className="fade-up fade-up-2 text-slate-400 text-sm mb-1" style={{ fontFamily: "Crimson Text, serif" }}>You explored all three puzzles.</p>
          <p className="fade-up fade-up-2 text-slate-500 text-xs mb-8 italic" style={{ fontFamily: "Crimson Text, serif" }}>Thank you for playing and attending the Friday the 13th Summit!</p>
          <div className="fade-up fade-up-3 flex justify-center gap-6 mb-8">
            {PUZZLES.map((p) => (
              <div key={p.id} className="text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-900/30 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">{p.emoji}</span>
                </div>
                <span className="text-xs text-emerald-400" style={{ fontFamily: "Crimson Text, serif" }}>{p.theme}</span>
              </div>
            ))}
          </div>
          <div className="fade-up fade-up-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl border border-slate-700/50 p-5 mb-6">
            <p className="text-amber-200 font-semibold mb-4" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem" }}>Explore more from Letter Griddle</p>
            <div className="space-y-3">
              <a href="https://www.lettergriddle.com/play" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-r from-amber-700/30 to-amber-800/30 hover:from-amber-600/40 hover:to-amber-700/40 border border-amber-600/30 rounded-lg p-3 transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🥞</span>
                  <div className="text-left">
                    <span className="text-amber-200 text-sm font-medium group-hover:text-amber-100">Letter Griddle</span>
                    <p className="text-slate-400 text-xs">A new pancake-inspired word puzzle every day</p>
                  </div>
                </div>
              </a>
              <a href="https://www.lettergriddle.com" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-r from-amber-700/30 to-amber-800/30 hover:from-amber-600/40 hover:to-amber-700/40 border border-amber-600/30 rounded-lg p-3 transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-xl">☕</span>
                  <div className="text-left">
                    <span className="text-amber-200 text-sm font-medium group-hover:text-amber-100">Letter Griddle Games</span>
                    <p className="text-slate-400 text-xs">Explore our full family of games</p>
                  </div>
                </div>
              </a>
              <a href="https://www.amazon.com/dp/B0GM1N2YV8?ref=ppx_yo2ov_dt_b_fed_asin_title" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-r from-purple-900/30 to-indigo-900/30 hover:from-purple-800/40 hover:to-indigo-800/40 border border-purple-600/30 rounded-lg p-3 transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📖</span>
                  <div className="text-left">
                    <span className="text-amber-200 text-sm font-medium group-hover:text-amber-100">Breakfast and Tarot: Savor and Shuffle</span>
                    <p className="text-slate-400 text-xs">A 90-day guided journal</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="fade-up fade-up-5">
            <p className="text-slate-600 text-xs mb-2">Friday the 13th Summit • Presented by Let's Create Summits</p>
            <EventFooter />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:wght@300;400;500;600&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.5s ease-out; }
      `}</style>
      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
      <div className="max-w-lg mx-auto px-3 py-4">
        <div className="text-center mb-4">
          <div className="flex items-center justify-between mb-1">
            <div className="w-8" />
            <span className="text-xs tracking-[0.2em] uppercase text-slate-500 font-medium">Letter Griddle • Event Edition</span>
            <button onClick={() => setShowHowToPlay(true)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-amber-300 hover:border-amber-500/30 transition-all text-sm" title="How to Play">?</button>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-amber-200 mt-1" style={{ fontFamily: "Cormorant Garamond, serif" }}>Friday the 13th Summit</h1>
          <div className="flex justify-center gap-3 mt-3">
            {PUZZLES.map((p, idx) => (
              <button key={p.id} onClick={() => { if (puzzleComplete[idx] || idx === currentPuzzle) { setCurrentPuzzle(idx); setShowDidYouKnow(false); setActiveWordIdx(0); } }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                  idx === currentPuzzle ? "bg-amber-600/30 border border-amber-500/40 text-amber-200"
                    : puzzleComplete[idx] ? "bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 cursor-pointer hover:bg-emerald-800/30"
                    : "bg-slate-800/40 border border-slate-700/40 text-slate-500"
                }`}>
                <span>{p.emoji}</span>
                <span style={{ fontFamily: "Crimson Text, serif" }}>{p.theme}</span>
                {puzzleComplete[idx] && <span>✓</span>}
              </button>
            ))}
          </div>
        </div>
        {showDidYouKnow && (
          <div className="fade-in mb-4">
            <div className="bg-gradient-to-br from-amber-900/40 to-yellow-900/30 border-2 border-amber-500/30 rounded-xl p-5 text-center">
              <div className="text-2xl mb-2">💫</div>
              <h3 className="text-amber-200 font-semibold text-lg mb-3" style={{ fontFamily: "Cormorant Garamond, serif" }}>Did You Know?</h3>
              <p className="text-amber-100/80 text-sm leading-relaxed mb-5" style={{ fontFamily: "Crimson Text, serif" }}>{puzzle.didYouKnow}</p>
              {currentPuzzle < PUZZLES.length - 1 ? (
                <button onClick={goToNextPuzzle} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium transition-all shadow-lg hover:scale-105" style={{ fontFamily: "Crimson Text, serif" }}>
                  Continue to {PUZZLES[currentPuzzle + 1].theme} {PUZZLES[currentPuzzle + 1].emoji}
                </button>
              ) : (
                <button onClick={() => setShowDidYouKnow(false)} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium transition-all shadow-lg hover:scale-105" style={{ fontFamily: "Crimson Text, serif" }}>
                  Complete the Journey ✨
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
              <p className="text-slate-400 text-xs mt-2 italic" style={{ fontFamily: "Crimson Text, serif" }}>{puzzle.subtitle}</p>
            </div>
            <div className="text-center mb-3">
              <p className="text-slate-500 text-xs">Tap a letter then tap a slot, or tap a slot then tap a letter. On a computer, click a word and type!</p>
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