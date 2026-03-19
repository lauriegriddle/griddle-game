"use client";
import { useState, useEffect, useCallback, useRef } from "react";

const BG = "min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 flex flex-col items-center py-3 px-2";
const FONT = "Georgia, serif";
const YEAR = new Date().getFullYear();

// Three Spring puzzles
const PUZZLES = [
  {
    words:   ["HELLO", "SUNSHINE", "DAYS"],
    flat:    "HELLOSUNSHINEDAYS",
    pre:     new Set([0, 6, 10, 16]),
    prePlace:[[1,1,0],[3,9,6],[7,1,10],[9,9,16]],
    collect: [[1,3,9],[1,5,2],[1,7,5],
              [3,7,1],[3,5,4],[3,3,8],
              [5,3,12],[5,5,3],[5,7,7],
              [7,7,11],[7,5,14],[7,3,13],
              [9,3,15]],
    winMsg:  "HELLO SUNSHINE DAYS!",
    nextLabel:"Try the next puzzle!",
  },
  {
    words:   ["SPRING", "HAS", "SPRUNG", "TODAY"],
    flat:    "SPRINGHASSPRUNGTODAY",
    pre:     new Set([0, 6, 12, 19]),
    prePlace:[[1,1,0],[3,9,6],[7,1,12],[9,9,19]],
    collect: [[1,3,10],[1,5,3],[1,7,16],[1,8,7],
              [3,7,4],[3,5,14],[3,3,2],[3,2,9],
              [5,3,17],[5,5,5],[5,7,13],[5,8,1],
              [7,7,8],[7,5,15],[7,3,18],[7,2,11]],
    winMsg:  "SPRING HAS SPRUNG TODAY!",
    nextLabel:"Try the next puzzle!",
  },
  {
    words:   ["SUNNY", "DAYS", "AHEAD"],
    flat:    "SUNNYDAYSAHEAD",
    pre:     new Set([0, 4, 9, 13]),
    prePlace:[[1,1,0],[3,9,4],[7,1,9],[9,9,13]],
    collect: [[1,3,2],[1,5,8],[1,7,1],
              [3,7,3],[3,5,6],[3,3,7],
              [5,3,5],[5,5,10],[5,7,11],
              [7,7,12]],
    winMsg:  "SUNNY DAYS AHEAD!",
    nextLabel:"Try the next puzzle!",
  },
];

function buildLetterMap(puzzle) {
  const m = {};
  puzzle.prePlace.forEach(([r,c,i]) =>
    m[r+"-"+c] = { msgIdx:i, display:puzzle.flat[i], preFilled:true }
  );
  puzzle.collect.forEach(([r,c,i]) => {
    const k = r+"-"+c;
    if (!m[k]) m[k] = { msgIdx:i, display:puzzle.flat[i], preFilled:false };
  });
  return m;
}

const SHIMMER_COLORS = ["#a7f3d0","#6ee7b7","#fde68a","#fbcfe8","#c4b5fd","#93c5fd"];

const FUN_FACTS = [
  "Spring is a season of renewal, marked by the vernal equinox when the Earth's tilt causes nearly equal day and night worldwide. The word vernal means spring, and equinox comes from Latin words meaning equal night.",
  "Spring officially brings warmer weather, melting snow, blooming flowers, and the end of hibernation for animals. Increased sunshine boosts Vitamin D and raises energy levels, making people more active and happier.",
  "Spring is famous for newborn animals, increased pollinator activity, and cultural celebrations. Baby birds learn their songs in spring, while migratory birds return north.",
  "Black bears, squirrels, and marmots emerge from hibernation during spring. Honeybees often swarm in spring to look for a new place to build a hive.",
];

// Maze: 11 cols x 11 rows, snake path verified by BFS
const COLS = 11;
const ROWS = 11;
const CELL = 44;

function buildMaze() {
  const g = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  const h = (r, c1, c2) => { for (let c = Math.min(c1,c2); c <= Math.max(c1,c2); c++) g[r][c] = 1; };
  const v = (c, r1, r2) => { for (let r = Math.min(r1,r2); r <= Math.max(r1,r2); r++) g[r][c] = 1; };
  h(1,1,9); v(9,1,3);
  h(3,1,9); v(1,3,5);
  h(5,1,9); v(9,5,7);
  h(7,1,9); v(1,7,9);
  h(9,1,9);
  g[1][1] = 2;
  g[9][9] = 3;
  return g;
}
const RAW_MAZE = buildMaze();

const TURN_ARROWS = {
  "1-9":"v","3-9":"v","3-1":"v","5-1":"v",
  "5-9":"v","7-9":"v","7-1":"v","9-1":">",
};

const CHARM_MAP = {
  "1-4":{ emoji:"flower", msg:"A beautiful find! Keep going!", spin:"3s" },
  "3-4":{ emoji:"star",   msg:"You're glowing! Halfway through this row!", spin:"2s" },
  "5-6":{ emoji:"teapot", msg:"Tea break! You're doing wonderfully!", spin:"4s" },
  "7-4":{ emoji:"flower", msg:"You are doing something wonderful - keep going!", spin:"1.5s" },
  "9-5":{ emoji:"heart",  msg:"Almost there! The griddle is waiting!", spin:"2.5s" },
};

const CHARM_DISPLAY = {
  flower: "&#x1F338;",
  star:   "&#x2B50;",
  teapot: "&#x1FAD6;",
  heart:  "&#x1F49B;",
};

export default function LetterGriddleMaze() {
  const [puzzleIdx,      setPuzzleIdx]      = useState(0);

  const puzzle       = PUZZLES[puzzleIdx];
  const MESSAGE_FLAT = puzzle.flat;
  const PRE_FILLED   = puzzle.pre;
  const LETTER_MAP   = buildLetterMap(puzzle);
  const totalCollect = Object.values(LETTER_MAP).filter(v => !v.preFilled).length;

  const letterMapRef   = useRef(LETTER_MAP);
  const messageFlatRef = useRef(MESSAGE_FLAT);
  useEffect(() => {
    letterMapRef.current   = LETTER_MAP;
    messageFlatRef.current = MESSAGE_FLAT;
  });

  const [showWelcome,    setShowWelcome]    = useState(true);
  const [playerPos,      setPlayerPos]      = useState({ r:1, c:1 });
  const [collectedSet,   setCollectedSet]   = useState(new Set());
  const [collectedBank,  setCollectedBank]  = useState([]);
  const [griddleLetters, setGriddleLetters] = useState(
    () => puzzle.flat.split("").map((l,i) => puzzle.pre.has(i) ? l : null)
  );
  const [rearrangeMode,  setRearrangeMode]  = useState(false);
  const [selBank,        setSelBank]        = useState(null);
  const [selSlot,        setSelSlot]        = useState(null);
  const [won,            setWon]            = useState(false);
  const [wrongAns,       setWrongAns]       = useState(false);
  const [shakingSlot,    setShakingSlot]    = useState(null);
  const [flashCell,      setFlashCell]      = useState(null);
  const [shimmer,        setShimmer]        = useState([]);
  const [startPulse,     setStartPulse]     = useState(true);
  const [foundCharms,    setFoundCharms]    = useState(new Set());
  const [charmPopup,     setCharmPopup]     = useState(null);
  const [showHowTo,      setShowHowTo]      = useState(false);
  const [funFact,        setFunFact]        = useState("");
  const [showFunFact,    setShowFunFact]    = useState(false);
  const [copyMsg,        setCopyMsg]        = useState(false);
  const [confetti,       setConfetti]       = useState([]);

  const collectedRef     = useRef(new Set());
  const foundCharmsRef   = useRef(new Set());
  const rearrangeModeRef = useRef(false);
  const wonRef           = useRef(false);
  const charmTimerRef    = useRef(null);

  useEffect(() => {
    setShimmer(Array.from({ length:14 }, (_,i) => ({
      id:i, x:Math.random()*100, y:Math.random()*100,
      color:SHIMMER_COLORS[i % SHIMMER_COLORS.length],
      size:4+Math.random()*7, delay:Math.random()*5, dur:3+Math.random()*4,
    })));
    const t = setTimeout(() => setStartPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  const tryMove = useCallback((dr, dc) => {
    if (rearrangeModeRef.current || wonRef.current) return;
    setPlayerPos(prev => {
      const nr = prev.r + dr;
      const nc = prev.c + dc;
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) return prev;
      if (RAW_MAZE[nr][nc] === 0) return prev;
      const key = nr+"-"+nc;
      const entry = letterMapRef.current[key];
      if (entry && !collectedRef.current.has(key)) {
        const next = new Set([...collectedRef.current, key]);
        collectedRef.current = next;
        setCollectedSet(new Set(next));
        if (!entry.preFilled) {
          setCollectedBank(b => [...b, { letter:messageFlatRef.current[entry.msgIdx], msgIdx:entry.msgIdx }]);
          setFlashCell(key);
          setTimeout(() => setFlashCell(null), 500);
        }
      }
      const charm = CHARM_MAP[key];
      if (charm && !foundCharmsRef.current.has(key)) {
        foundCharmsRef.current = new Set([...foundCharmsRef.current, key]);
        setFoundCharms(new Set(foundCharmsRef.current));
        if (charmTimerRef.current) clearTimeout(charmTimerRef.current);
        setCharmPopup({ display:CHARM_DISPLAY[charm.emoji], msg:charm.msg, spin:charm.spin });
        charmTimerRef.current = setTimeout(() => setCharmPopup(null), 3500);
      }
      setStartPulse(false);
      if (RAW_MAZE[nr][nc] === 3) {
        setTimeout(() => { rearrangeModeRef.current = true; setRearrangeMode(true); }, 400);
      }
      return { r:nr, c:nc };
    });
  }, []);

  useEffect(() => {
    const onKey = e => {
      if (!rearrangeModeRef.current) {
        const map = {
          ArrowUp:[-1,0], ArrowDown:[1,0], ArrowLeft:[0,-1], ArrowRight:[0,1],
          w:[-1,0], s:[1,0], a:[0,-1], d:[0,1],
        };
        if (map[e.key]) { e.preventDefault(); tryMove(...map[e.key]); }
        return;
      }
      const puz = PUZZLES[puzzleIdxRef.current];
      const allSlots = puz.flat.split("").map((_,i) => i).filter(i => !puz.pre.has(i));
      const bankLen  = collectedBankRef.current.length;
      const bank     = collectedBankRef.current;

      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        e.preventDefault();
        const typed = e.key.toUpperCase();
        const bankIdx = bank.findIndex(item => item.letter === typed);
        if (bankIdx === -1) return;
        const currentGriddle = griddleLetsRef.current;
        const selSlotVal = selSlotRef.current;
        let targetSlot = (selSlotVal !== null && currentGriddle[selSlotVal] === null)
          ? selSlotVal
          : allSlots.find(si => currentGriddle[si] === null) || null;
        if (targetSlot === null) return;
        const item = bank[bankIdx];
        setGriddleLetters(g => { const n=[...g]; n[targetSlot]=item.letter; return n; });
        setCollectedBank(b => b.filter((_,j) => j !== bankIdx));
        checkPlacementDirect(item.letter, targetSlot);
        setSelBank(null);
        setSelSlot(null);
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setSelBank(null); setSelSlot(null);
      } else if (e.key === "Tab") {
        e.preventDefault();
        if (!e.shiftKey) {
          setSelSlot(null);
          setSelBank(prev => {
            if (bankLen === 0) return null;
            if (prev === null) return 0;
            return (prev + 1) % bankLen;
          });
        } else {
          setSelBank(null);
          setSelSlot(prev => {
            if (allSlots.length === 0) return null;
            if (prev === null) return allSlots[0];
            const idx = allSlots.indexOf(prev);
            return allSlots[(idx + 1) % allSlots.length];
          });
        }
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const bRef = selBankRef.current;
        const sRef = selSlotRef.current;
        if (bRef !== null) {
          const el = document.getElementById("bank-"+bRef);
          if (el) el.click();
        } else if (sRef !== null) {
          const el = document.getElementById("slot-"+sRef);
          if (el) el.click();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tryMove]);

  const puzzleIdxRef    = useRef(0);
  const collectedBankRef = useRef([]);
  const selBankRef      = useRef(null);
  const selSlotRef      = useRef(null);
  const griddleLetsRef  = useRef([]);
  useEffect(() => { puzzleIdxRef.current = puzzleIdx; }, [puzzleIdx]);
  useEffect(() => { collectedBankRef.current = collectedBank; }, [collectedBank]);
  useEffect(() => { selBankRef.current = selBank; }, [selBank]);
  useEffect(() => { selSlotRef.current = selSlot; }, [selSlot]);
  useEffect(() => { griddleLetsRef.current = griddleLetters; }, [griddleLetters]);

  const touchRef = useRef(null);
  const onMazeTouchStart = e => { touchRef.current = { x:e.touches[0].clientX, y:e.touches[0].clientY }; };
  const onMazeTouchEnd   = e => {
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    if (Math.sqrt(dx*dx+dy*dy) > 20) {
      if (Math.abs(dx) > Math.abs(dy)) tryMove(0, dx > 0 ? 1 : -1);
      else tryMove(dy > 0 ? 1 : -1, 0);
    }
    touchRef.current = null;
  };
  const dpadPress = (dr, dc) => e => { e.stopPropagation(); tryMove(dr, dc); };

  const checkPlacementDirect = (letter, si) => {
    if (letter !== messageFlatRef.current[si]) {
      setShakingSlot(si);
      setTimeout(() => setShakingSlot(null), 500);
    }
  };

  const clickBank = i => {
    if (selBank === i) { setSelBank(null); return; }
    if (selSlot !== null) {
      const item = collectedBank[i];
      const displaced = griddleLetters[selSlot];
      setGriddleLetters(g => { const n=[...g]; n[selSlot]=item.letter; return n; });
      if (displaced !== null) {
        setCollectedBank(b => { const n=[...b]; n[i]={ letter:displaced, msgIdx:selSlot }; return n; });
      } else {
        setCollectedBank(b => b.filter((_,j) => j !== i));
      }
      checkPlacementDirect(item.letter, selSlot);
      setSelSlot(null); setSelBank(null);
      return;
    }
    setSelBank(i); setSelSlot(null);
  };

  const clickSlot = si => {
    if (PRE_FILLED.has(si)) return;
    const letter = griddleLetters[si];
    if (selBank !== null) {
      const item = collectedBank[selBank];
      const displaced = griddleLetters[si];
      setGriddleLetters(g => { const n=[...g]; n[si]=item.letter; return n; });
      if (displaced !== null) {
        setCollectedBank(b => { const n=[...b]; n[selBank]={ letter:displaced, msgIdx:si }; return n; });
      } else {
        setCollectedBank(b => b.filter((_,i) => i !== selBank));
      }
      checkPlacementDirect(item.letter, si);
      setSelBank(null);
    } else if (selSlot !== null) {
      if (selSlot === si) { setSelSlot(null); return; }
      if (!PRE_FILLED.has(selSlot)) {
        if (letter === null) {
          setGriddleLetters(g => { const n=[...g]; n[si]=n[selSlot]; n[selSlot]=null; return n; });
        } else {
          setGriddleLetters(g => { const n=[...g]; [n[selSlot],n[si]]=[n[si],n[selSlot]]; return n; });
        }
      }
      setSelSlot(null);
    } else {
      setSelSlot(si);
    }
  };

  const returnToBank = si => {
    if (PRE_FILLED.has(si)) return;
    const letter = griddleLetters[si];
    if (!letter) return;
    setGriddleLetters(g => { const n=[...g]; n[si]=null; return n; });
    setCollectedBank(b => [...b, { letter, msgIdx:si }]);
    setSelSlot(null); setSelBank(null);
  };

  const shuffleBank = () => {
    setCollectedBank(b => {
      const s = [...b];
      for (let i = s.length-1; i > 0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        [s[i],s[j]] = [s[j],s[i]];
      }
      return s;
    });
  };

  const checkAnswer = () => {
    if (griddleLetters.join("") === MESSAGE_FLAT) {
      wonRef.current = true;
      setWon(true);
      const fact = FUN_FACTS[Math.floor(Math.random()*FUN_FACTS.length)];
      setFunFact(fact);
      const pieces = Array.from({ length:80 }, (_,i) => ({
        id:i, x:Math.random()*100, delay:Math.random()*1.2,
        dur:2+Math.random()*2,
        color:["#6ee7b7","#fde68a","#fbcfe8","#a7f3d0","#fbbf24","#34d399"][i%6],
        size:6+Math.random()*8, rot:Math.random()*360,
      }));
      setConfetti(pieces);
      setTimeout(() => setShowFunFact(true), 900);
    } else {
      setWrongAns(true);
      setTimeout(() => setWrongAns(false), 900);
    }
  };

  const handleShare = async () => {
    const charmCount = foundCharms.size;
    const total = Object.keys(CHARM_MAP).length;
    const text =
      "\uD83C\uDF38 I solved the Letter Griddle Maze!\n\n" +
      "\u2728 Found " + charmCount + "/" + total + " charms\n" +
      "\u2600\uFE0F I revealed the secret message!\n\n" +
      "lettergriddle.com/maze\n" +
      "\uD83D\uDCDA Read Letter Griddle Stories:\n" +
      "lettergriddlecafe.com\n" +
      "\uD83E\uDD5E More: lettergriddle.com";
    if (navigator.share) {
      try { await navigator.share({ title:"Letter Griddle Maze", text }); return; }
      catch(e) {}
    }
    try { await navigator.clipboard.writeText(text); } catch(e) {}
    setCopyMsg(true);
    setTimeout(() => setCopyMsg(false), 2500);
  };

  const resetForPuzzle = (pIdx) => {
    const p = PUZZLES[pIdx];
    letterMapRef.current   = buildLetterMap(p);
    messageFlatRef.current = p.flat;
    collectedRef.current   = new Set();
    setCollectedSet(new Set());
    foundCharmsRef.current = new Set();
    setFoundCharms(new Set());
    setPlayerPos({ r:1, c:1 });
    setCollectedBank([]);
    setGriddleLetters(p.flat.split("").map((l,i) => p.pre.has(i) ? l : null));
    rearrangeModeRef.current = false;
    setRearrangeMode(false);
    setSelBank(null);
    setSelSlot(null);
    wonRef.current = false;
    setWon(false);
    setWrongAns(false);
    setConfetti([]);
    setShowFunFact(false);
    setCopyMsg(false);
    setStartPulse(true);
    setTimeout(() => setStartPulse(false), 6000);
  };

  const reset = () => resetForPuzzle(puzzleIdx);

  const switchPuzzle = () => {
    const next = (puzzleIdx + 1) % PUZZLES.length;
    setPuzzleIdx(next);
    resetForPuzzle(next);
  };

  const gotCount = [...collectedSet].filter(k => LETTER_MAP[k] && !LETTER_MAP[k].preFilled).length;
  const allPlaced = collectedBank.length === 0;

  const CharmIcon = ({ emoji }) => (
    <span dangerouslySetInnerHTML={{ __html: CHARM_DISPLAY[emoji] }} />
  );

  return (
    <div className={BG} style={{ fontFamily:FONT, userSelect:"none" }}>

      <style>{`
        @keyframes shimmerA { 0%,100%{opacity:0;transform:scale(.5) translateY(0)} 50%{opacity:.5;transform:scale(1.4) translateY(-10px)} }
        @keyframes popA     { 0%{transform:scale(0) rotate(-20deg);opacity:0} 65%{transform:scale(1.3) rotate(4deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes glowA    { 0%,100%{text-shadow:0 0 15px #6ee7b7} 50%{text-shadow:0 0 45px #6ee7b7,0 0 80px #a7f3d0} }
        @keyframes nudgeA   { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }
        @keyframes spinA    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes charmIn  { 0%{opacity:0;transform:translateY(10px) scale(.85)} 100%{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes fallA    { 0%{opacity:1;transform:translateY(0) rotate(0deg)} 100%{opacity:0;transform:translateY(110vh) rotate(720deg)} }
        @keyframes factIn   { 0%{opacity:0;transform:scale(.9)} 100%{opacity:1;transform:scale(1)} }
        @keyframes slideUp  { 0%{opacity:0;transform:translateY(20px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes shake    { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-5px)} 40%{transform:translateX(5px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
      `}</style>

      {/* Shimmer bg */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {shimmer.map(p => (
          <div key={p.id} className="absolute rounded-full"
            style={{ left:p.x+"%", top:p.y+"%", width:p.size, height:p.size,
              background:p.color, boxShadow:"0 0 "+(p.size*2)+"px "+p.color,
              animation:"shimmerA "+p.dur+"s ease-in-out "+p.delay+"s infinite", opacity:0 }}/>
        ))}
      </div>

      {/* Confetti */}
      {won && confetti.map(p => (
        <div key={p.id} className="fixed pointer-events-none z-50"
          style={{ left:p.x+"%", top:"-20px",
            animation:"fallA "+p.dur+"s ease-in "+p.delay+"s forwards", opacity:0 }}>
          <div style={{ width:p.size, height:p.size, background:p.color,
            borderRadius:p.id%2===0?"50%":"2px", transform:"rotate("+p.rot+"deg)" }}/>
        </div>
      ))}

      {/* Charm popup */}
      {charmPopup && (
        <div className="fixed z-50 left-1/2 top-20 -translate-x-1/2 pointer-events-none"
          style={{ animation:"charmIn .35s ease-out forwards" }}>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-emerald-400 shadow-2xl"
            style={{ background:"linear-gradient(135deg,#064e3b,#065f46)", boxShadow:"0 0 30px #6ee7b799" }}>
            <span className="text-3xl" style={{ animation:"spinA "+charmPopup.spin+" linear infinite", display:"inline-block" }}
              dangerouslySetInnerHTML={{ __html: charmPopup.display }} />
            <p className="text-emerald-100 text-sm font-medium" style={{ maxWidth:200 }}>{charmPopup.msg}</p>
          </div>
        </div>
      )}

      {/* Fun fact modal */}
      {showFunFact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowFunFact(false)}>
          <div className="rounded-2xl p-6 max-w-sm w-full border border-emerald-400 shadow-2xl text-center"
            style={{ background:"linear-gradient(135deg,#064e3b,#065f46)", animation:"factIn .4s ease-out" }}>
            <div className="text-4xl mb-3">&#x1F338;</div>
            <h3 className="text-emerald-200 font-bold text-base mb-2">Did You Know?</h3>
            <p className="text-emerald-100 text-sm leading-relaxed mb-4">{funFact}</p>
            <button onClick={() => setShowFunFact(false)}
              className="px-5 py-2 rounded-full bg-emerald-400 text-emerald-950 font-bold text-sm hover:bg-emerald-300 transition-all">
              Lovely!
            </button>
          </div>
        </div>
      )}

      {/* How to play modal */}
      {showHowTo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowHowTo(false)}>
          <div className="rounded-2xl p-5 max-w-sm w-full border border-emerald-400 shadow-2xl"
            style={{ background:"linear-gradient(135deg,#064e3b,#065f46)", animation:"factIn .3s ease-out" }}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-emerald-200 font-bold text-base">How to Play</h3>
              <button onClick={() => setShowHowTo(false)}
                className="text-emerald-400 hover:text-emerald-200 text-xl leading-none">X</button>
            </div>
            <div className="space-y-3 text-emerald-100 text-sm leading-relaxed">
              <p>Navigate your <strong>sun</strong> through the maze using the d-pad, arrow keys, click, tap, or swipe.</p>
              <p><span className="text-amber-300 font-bold">Amber tiles</span> are letters to collect. Walk over them!</p>
              <p><span className="text-emerald-300 font-bold">Green tiles</span> are already filled in the griddle below.</p>
              <p>Hidden <strong>charms</strong> spin along the path. Step on them for a surprise message!</p>
              <p>Reach the <strong>star</strong> to finish the maze, then arrange your letters to spell the secret message.</p>
              <p>Tap a letter from your bank, then tap a slot to place it. Tap a filled slot to select it, then tap another slot to swap. Double-tap a filled slot to return it to your bank.</p>
              <p>Use the <strong>Shuffle</strong> button to mix up your letter bank.</p>
            </div>
            <button onClick={() => setShowHowTo(false)}
              className="mt-4 w-full py-2 rounded-full bg-emerald-400 text-emerald-950 font-bold text-sm hover:bg-emerald-300 transition-all">
              Let's go!
            </button>
          </div>
        </div>
      )}

      {/* Copy toast */}
      {copyMsg && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          style={{ animation:"slideUp .3s ease-out" }}>
          <div className="px-5 py-2 rounded-full bg-emerald-700 border border-emerald-400 text-emerald-100 text-sm shadow-xl">
            Copied to clipboard!
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 text-center mb-1 w-full max-w-sm">
        <div className="flex items-center justify-between px-1">
          <button onClick={() => setShowHowTo(true)}
            className="w-8 h-8 rounded-full bg-emerald-800 border border-emerald-600 text-emerald-200 text-sm flex items-center justify-center hover:bg-emerald-700 transition-all">
            ?
          </button>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">&#x1F338;</span>
              <h1 className="text-base font-bold text-emerald-200 tracking-widest uppercase"
                style={{ textShadow:"0 0 16px #6ee7b7" }}>Letter Griddle Maze</h1>
              <span className="text-xl">&#x1F337;</span>
            </div>
            <p className="text-emerald-400 text-xs mt-0.5">
              {won ? "You did it!" : rearrangeMode ? "Arrange letters to reveal the message!" : "A Spring Adventure!"}
            </p>
            <p className="text-emerald-600 text-xs">Puzzle {puzzleIdx + 1} of {PUZZLES.length}</p>
          </div>
          <div className="w-8" />
        </div>
      </div>

      {/* Welcome screen */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/90 px-6">
          <div className="rounded-3xl p-8 max-w-sm w-full border-2 border-emerald-500 shadow-2xl text-center"
            style={{ background:"linear-gradient(160deg,#064e3b,#065f46,#064e3b)", boxShadow:"0 0 40px #6ee7b744" }}>
            <div className="text-5xl mb-3">&#x1F338;</div>
            <h2 className="text-xl font-bold text-emerald-200 tracking-widest uppercase mb-4"
              style={{ textShadow:"0 0 16px #6ee7b7" }}>Letter Griddle Maze</h2>
            <div className="space-y-3 text-emerald-100 text-sm leading-relaxed text-left mb-6">
              <p className="flex items-start gap-2">
                <span className="text-lg mt-0.5">&#x2600;&#xFE0F;</span>
                <span>Navigate your <strong>sun</strong> through the maze using the <strong>d-pad</strong>, <strong>arrow keys</strong>, <strong>tap</strong>, <strong>click</strong>, or <strong>swipe</strong>.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-lg mt-0.5">&#x1F7E8;</span>
                <span>Walk over <strong className="text-amber-300">amber letter tiles</strong> to collect them.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-lg mt-0.5">&#x2728;</span>
                <span>Find hidden <strong>charms</strong> along the path for a surprise!</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-lg mt-0.5">&#x2B50;</span>
                <span>Reach the <strong>star</strong> to finish the maze.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-lg mt-0.5">&#x1F9E9;</span>
                <span>Then <strong>arrange your letters</strong> in the griddle below to reveal the secret message!</span>
              </p>
            </div>
            <button onClick={() => setShowWelcome(false)}
              className="w-full py-3 rounded-full bg-emerald-400 text-emerald-950 font-bold text-base hover:bg-emerald-300 transition-all shadow-lg">
              Let's Play! &#x1F338;
            </button>
          </div>
        </div>
      )}

      {/* Maze phase */}
      {!rearrangeMode && !won && (
        <>
          <div className="relative z-10 flex gap-3 text-xs text-emerald-300 mb-2">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-md bg-emerald-400 inline-block" />
              Pre-filled
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-md bg-amber-300 inline-block" />
              Collect me
            </span>
            <span className="flex items-center gap-1">
              <span className="text-sm">&#x2728;</span>
              Charm
            </span>
          </div>

          <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-emerald-700 shadow-2xl"
            style={{ width:COLS*CELL, maxWidth:"100vw" }}
            onTouchStart={onMazeTouchStart}
            onTouchEnd={onMazeTouchEnd}>
            <div style={{ display:"grid",
              gridTemplateColumns:"repeat("+COLS+", "+CELL+"px)",
              gridTemplateRows:"repeat("+ROWS+", "+CELL+"px)" }}>
              {RAW_MAZE.map((row,r) => row.map((cell,c) => {
                const key      = r+"-"+c;
                const isPlayer = playerPos.r===r && playerPos.c===c;
                const entry    = LETTER_MAP[key];
                const charm    = CHARM_MAP[key];
                const charmFound = foundCharms.has(key);
                const isGot    = collectedSet.has(key);
                const isFlash  = flashCell===key;
                const isEnd    = cell===3;
                const isOpen   = cell!==0;
                const arrow    = TURN_ARROWS[key];
                const isHint   = r===1 && c===2 && startPulse;

                return (
                  <div key={key}
                    onClick={() => { const dr=r-playerPos.r, dc=c-playerPos.c; if(Math.abs(dr)+Math.abs(dc)===1) tryMove(dr,dc); }}
                    style={{ width:CELL, height:CELL }}
                    className={"relative flex items-center justify-center " +
                      (cell===0 ? "bg-emerald-950" : "bg-emerald-900") +
                      (isOpen && !isPlayer ? " cursor-pointer hover:bg-emerald-800 transition-colors" : "")}>

                    {isOpen && !isPlayer && (
                      <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ background:"radial-gradient(circle,#6ee7b7,transparent 80%)" }}/>
                    )}

                    {isHint && !isPlayer && (
                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <span className="text-amber-300 text-xl font-bold"
                          style={{ animation:"nudgeA .7s ease-in-out infinite" }}>&#x279C;</span>
                      </div>
                    )}

                    {arrow && !isPlayer && !entry && !charm && !isHint && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-emerald-600 text-sm opacity-50">{arrow}</span>
                      </div>
                    )}

                    {charm && !charmFound && !isPlayer && (
                      <div className="z-10 flex items-center justify-center w-full h-full">
                        <div className="absolute w-9 h-9 rounded-full opacity-30"
                          style={{ background:"radial-gradient(circle,#a7f3d0,transparent)",
                            animation:"spinA "+charm.spin+" linear infinite" }}/>
                        <span className="text-xl relative z-10"
                          style={{ animation:"spinA "+charm.spin+" linear infinite", display:"inline-block" }}>
                          <CharmIcon emoji={charm.emoji} />
                        </span>
                      </div>
                    )}

                    {charm && charmFound && !isPlayer && (
                      <div className="text-xs opacity-40">&#x2728;</div>
                    )}

                    {entry && !isGot && !isPlayer && (
                      <div className={entry.preFilled
                        ? "z-10 w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold border-2 shadow-lg bg-emerald-400 border-emerald-200 text-emerald-950"
                        : "z-10 w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold border-2 shadow-lg bg-amber-300 border-amber-100 text-amber-900"}
                        style={{ fontFamily:FONT }}>
                        {entry.display}
                      </div>
                    )}

                    {isFlash && (
                      <div className="z-20 text-xl" style={{ animation:"popA .5s ease-out" }}>&#x2728;</div>
                    )}

                    {isGot && entry && !entry.preFilled && !isPlayer && !isFlash && (
                      <div className="w-2 h-2 rounded-full bg-emerald-400 opacity-30"/>
                    )}

                    {isPlayer && (
                      <div className="z-20 flex items-center justify-center text-3xl"
                        style={{ filter:"drop-shadow(0 0 8px #fde68a)", lineHeight:1 }}>
                        &#x2600;&#xFE0F;
                      </div>
                    )}

                    {isEnd && !isPlayer && (
                      <div className="z-10 text-2xl animate-bounce">&#x2B50;</div>
                    )}
                  </div>
                );
              }))}
            </div>
          </div>

          {/* D-pad */}
          <div className="relative z-10 mt-3 flex flex-col items-center gap-1">
            <button onTouchStart={dpadPress(-1,0)} onTouchEnd={e=>e.stopPropagation()} onClick={()=>tryMove(-1,0)}
              className="w-12 h-11 rounded-xl bg-emerald-800 border border-emerald-600 text-emerald-100 text-xl shadow-lg active:bg-emerald-600 active:scale-95 transition-all">
              &#9650;
            </button>
            <div className="flex gap-1">
              <button onTouchStart={dpadPress(0,-1)} onTouchEnd={e=>e.stopPropagation()} onClick={()=>tryMove(0,-1)}
                className="w-12 h-11 rounded-xl bg-emerald-800 border border-emerald-600 text-emerald-100 text-xl shadow-lg active:bg-emerald-600 active:scale-95 transition-all">
                &#9664;
              </button>
              <div className="w-12 h-11 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-2xl">
                &#x2600;&#xFE0F;
              </div>
              <button onTouchStart={dpadPress(0,1)} onTouchEnd={e=>e.stopPropagation()} onClick={()=>tryMove(0,1)}
                className="w-12 h-11 rounded-xl bg-emerald-800 border border-emerald-600 text-emerald-100 text-xl shadow-lg active:bg-emerald-600 active:scale-95 transition-all">
                &#9654;
              </button>
            </div>
            <button onTouchStart={dpadPress(1,0)} onTouchEnd={e=>e.stopPropagation()} onClick={()=>tryMove(1,0)}
              className="w-12 h-11 rounded-xl bg-emerald-800 border border-emerald-600 text-emerald-100 text-xl shadow-lg active:bg-emerald-600 active:scale-95 transition-all">
              &#9660;
            </button>
          </div>

          {/* Charm tracker */}
          <div className="relative z-10 mt-2 flex gap-1 items-center">
            {Object.keys(CHARM_MAP).map((key,i) => (
              <span key={i} className="text-lg transition-all"
                style={{ opacity:foundCharms.has(key)?1:0.25,
                  filter:foundCharms.has(key)?"drop-shadow(0 0 4px #6ee7b7)":"none" }}>
                <CharmIcon emoji={CHARM_MAP[key].emoji} />
              </span>
            ))}
            <span className="text-emerald-500 text-xs ml-1">
              {foundCharms.size}/{Object.keys(CHARM_MAP).length} charms
            </span>
          </div>
        </>
      )}

      {/* Rearrange phase */}
      {rearrangeMode && !won && (
        <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-3 mt-1 px-3">
          <p className="text-emerald-300 text-sm text-center">You made it! Place your letters into the griddle.</p>
          <div className="w-full">
            <div className="flex items-center justify-between mb-1 px-1">
              <p className="text-emerald-400 text-xs tracking-wider uppercase">Your letters</p>
              <button onClick={shuffleBank}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-800 border border-emerald-600 text-emerald-200 text-xs hover:bg-emerald-700 active:scale-95 transition-all">
                &#x1F338; Shuffle
              </button>
            </div>
            <div className="flex gap-2 flex-wrap justify-center p-3 rounded-2xl bg-emerald-950 border border-emerald-700 min-h-14">
              {collectedBank.length === 0
                ? <span className="text-emerald-600 text-xs self-center">All placed!</span>
                : collectedBank.map((item,i) => (
                  <div key={i} id={"bank-"+i} onClick={() => clickBank(i)}
                    className={"w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold border-2 cursor-pointer transition-all " +
                      (selBank===i
                        ? "bg-amber-300 border-amber-100 text-amber-950 scale-110 shadow-lg"
                        : "bg-amber-200 border-amber-400 text-amber-900 hover:scale-105")}
                    style={{ fontFamily:FONT, animation:"popA .3s ease-out" }}>
                    {item.letter}
                  </div>
                ))
              }
            </div>
          </div>
          <p className="text-emerald-500 text-xs text-center">
            {selBank !== null
              ? "Tap a slot in the griddle below"
              : selSlot !== null
                ? "Tap another slot to swap, or same slot to deselect"
                : "Tap a letter above, then tap a slot. Double-tap a slot to return it."}
          </p>
          {foundCharms.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 text-xs">Charms:</span>
              {Object.keys(CHARM_MAP).map((key,i) => (
                <span key={i} className="text-base"
                  style={{ opacity:foundCharms.has(key)?1:0.2 }}>
                  <CharmIcon emoji={CHARM_MAP[key].emoji} />
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Win screen */}
      {won && (
        <div className="relative z-10 flex flex-col items-center gap-3 mt-2 px-4">
          <div className="text-5xl animate-bounce">&#x1F338;</div>
          <h2 className="text-xl font-bold text-emerald-200 text-center"
            style={{ animation:"glowA 2s ease-in-out infinite" }}>
            {puzzle.winMsg}
          </h2>
          {foundCharms.size === Object.keys(CHARM_MAP).length
            ? <p className="text-emerald-300 text-sm text-center">You found ALL {foundCharms.size} charms! Maze master!</p>
            : <p className="text-emerald-400 text-sm text-center">Found {foundCharms.size}/{Object.keys(CHARM_MAP).length} charms - play again to find them all!</p>
          }
          <div className="flex gap-2">
            {Object.keys(CHARM_MAP).map((key,i) => (
              <span key={i} className="text-2xl"
                style={{ opacity:foundCharms.has(key)?1:0.2,
                  filter:foundCharms.has(key)?"drop-shadow(0 0 6px #6ee7b7)":"none" }}>
                <CharmIcon emoji={CHARM_MAP[key].emoji} />
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap justify-center mt-1">
            <button onClick={handleShare}
              className="px-5 py-2 rounded-full bg-emerald-500 text-emerald-950 font-bold text-sm hover:bg-emerald-400 transition-all">
              Share Results
            </button>
            <button onClick={() => setShowFunFact(true)}
              className="px-5 py-2 rounded-full bg-amber-400 text-amber-950 font-bold text-sm hover:bg-amber-300 transition-all">
              Fun Fact
            </button>
            <button onClick={reset}
              className="px-5 py-2 rounded-full bg-emerald-800 border border-emerald-600 text-emerald-200 font-bold text-sm hover:bg-emerald-700 transition-all">
              Play Again
            </button>
            <button onClick={switchPuzzle}
              className="px-5 py-2 rounded-full bg-emerald-600 border border-emerald-400 text-emerald-100 font-bold text-sm hover:bg-emerald-500 transition-all">
              {puzzle.nextLabel}
            </button>
          </div>
        </div>
      )}

      {/* Letter Griddle - always visible */}
      <div className="relative z-10 mt-4 w-full max-w-sm px-2">
        <div className="rounded-2xl bg-gradient-to-b from-emerald-800 to-green-900 border border-emerald-600 shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2 border-b border-emerald-700">
            <span className="text-emerald-300 text-xs tracking-widest uppercase">Letter Griddle</span>
            <span>&#x1F95E;</span>
          </div>
          <div className="flex flex-col items-center gap-2 px-3 pt-2 pb-3">
            {(() => {
              let idx = 0;
              return puzzle.words.map((word,wi) => {
                const indices = Array.from({ length:word.length }, (_,i) => idx+i);
                idx += word.length;
                return (
                  <div key={wi} className="flex gap-1 justify-center">
                    {indices.map(si => {
                      const letter = griddleLetters[si];
                      const isPre  = PRE_FILLED.has(si);
                      const isSel  = selSlot === si;
                      return (
                        <div key={si} id={"slot-"+si}
                          onClick={() => rearrangeMode && clickSlot(si)}
                          onDoubleClick={() => rearrangeMode && returnToBank(si)}
                          className={"w-9 h-10 rounded-lg flex items-center justify-center text-sm font-bold border-2 select-none transition-all " +
                            (rearrangeMode && !isPre ? "cursor-pointer " : "cursor-default ") +
                            (isPre
                              ? "bg-emerald-400 border-emerald-200 text-emerald-950"
                              : letter
                                ? isSel
                                  ? "bg-amber-300 border-amber-100 text-amber-950 scale-110 shadow-lg"
                                  : "bg-amber-200 border-amber-400 text-amber-900 hover:scale-105"
                                : wrongAns
                                  ? "bg-red-900 border-red-600"
                                  : isSel
                                    ? "bg-emerald-700 border-emerald-300 scale-110 shadow-lg"
                                    : "bg-emerald-950 border-emerald-700")}
                          style={{ fontFamily:FONT, animation: shakingSlot===si ? "shake 0.5s ease-in-out" : "none" }}>
                          {letter || ""}
                        </div>
                      );
                    })}
                  </div>
                );
              });
            })()}
          </div>
          {!rearrangeMode && !won && (
            <div className="px-4 pb-3">
              <div className="flex justify-between text-emerald-500 text-xs mb-1">
                <span>Letters found</span>
                <span>{gotCount}/{totalCollect}</span>
              </div>
              <div className="h-1.5 rounded-full bg-emerald-950">
                <div className="h-full rounded-full bg-emerald-400 transition-all"
                  style={{ width:(totalCollect>0 ? (gotCount/totalCollect)*100 : 0)+"%" }}/>
              </div>
              <p className="text-emerald-600 text-xs text-center mt-2">
                Letters appear here to arrange after the maze!
              </p>
            </div>
          )}
          {rearrangeMode && !won && allPlaced && (
            <div className="flex justify-center pb-3">
              <button onClick={checkAnswer}
                className={"px-6 py-2 rounded-full font-bold text-sm transition-all shadow-lg " +
                  (wrongAns ? "bg-red-500 text-white animate-pulse" : "bg-amber-400 text-amber-950 hover:bg-amber-300")}>
                {wrongAns ? "Not quite - keep trying!" : "Check Answer"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-6 pb-4 text-center space-y-1">
        <a href="https://lettergriddle.com" target="_blank" rel="noopener noreferrer"
          className="text-emerald-400 text-xs hover:text-emerald-200 transition-colors font-medium block">
          lettergriddle.com
        </a>
        <div className="flex items-center justify-center gap-2 text-emerald-700 text-xs">
          <a href="https://lettergriddle.com/privacy" target="_blank" rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
          <span>|</span>
          <a href="https://lettergriddle.com/terms" target="_blank" rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors">Terms of Service</a>
        </div>
        <p className="text-emerald-800 text-xs">(c) {YEAR} Letter Griddle. All rights reserved.</p>
      </div>

    </div>
  );
}
