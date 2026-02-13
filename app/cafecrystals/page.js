"use client";
import React, { useState, useEffect, useCallback } from "react";

const TILE_TYPES = ["amethyst", "jade", "quartz", "sapphire", "ruby"];
const TILE_EMOJI = { amethyst: "🔮", jade: "🟢", quartz: "🤍", sapphire: "💎", ruby: "❤️" };
const TILE_COLORS = { amethyst: "#9C27B0", jade: "#2E7D32", quartz: "#E0E0E0", sapphire: "#1565C0", ruby: "#C62828" };
const NUM_TRAYS = 5;
const TILES_PER_TRAY = 4;
const BS = 5;

// Crystal facts that rotate across games
const CRYSTAL_FACTS = [
  { crystal: "Amethyst", emoji: "🔮", facts: [
    "Ancient Greeks believed amethyst could prevent intoxication — the name comes from 'amethystos' meaning 'not drunk.'",
    "Amethyst was once considered as precious as diamonds until large deposits were discovered in Brazil in the 19th century.",
    "Amethyst gets its purple color from iron impurities and natural irradiation within the quartz crystal structure."
  ]},
  { crystal: "Jade", emoji: "🟢", facts: [
    "In China, jade has been prized for over 7,000 years — longer than gold or diamonds.",
    "There are actually two different minerals called jade: nephrite and jadeite, and jadeite is the rarer and more valuable of the two.",
    "Ancient Mesoamerican civilizations valued jade more highly than gold, using it for ceremonial masks and jewelry."
  ]},
  { crystal: "Quartz", emoji: "🤍", facts: [
    "Quartz makes up about 12% of Earth's crust, making it the second most abundant mineral on the planet.",
    "The word 'crystal' comes from the Greek 'krustallos,' which originally referred to quartz and meant 'ice' — they believed it was permanently frozen.",
    "Quartz is piezoelectric, meaning it generates an electric charge under pressure, which is why it's used in watches and clocks."
  ]},
  { crystal: "Sapphire", emoji: "💎", facts: [
    "Sapphires come in every color of the rainbow except red — a red sapphire is technically a ruby!",
    "The largest sapphire ever found is the Star of Adam, weighing an incredible 1,404 carats, discovered in Sri Lanka.",
    "Medieval clergy wore sapphires to symbolize heaven, and common folk believed the gem attracted divine blessings."
  ]},
  { crystal: "Ruby", emoji: "❤️", facts: [
    "Fine rubies can be rarer and more valuable per carat than diamonds of similar size.",
    "The most expensive ruby ever sold, the Sunrise Ruby, went for over $30 million at auction in 2015.",
    "In Sanskrit, ruby is called 'ratnaraj,' meaning 'king of precious stones.'"
  ]}
];

// Open grid — no fixed wall pattern. Player chooses placement.
// WALL_PATTERN is kept only for AI placement logic reference.
const WALL_PATTERN = [
  ["amethyst", "jade", "quartz", "sapphire", "ruby"],
  ["ruby", "amethyst", "jade", "quartz", "sapphire"],
  ["sapphire", "ruby", "amethyst", "jade", "quartz"],
  ["quartz", "sapphire", "ruby", "amethyst", "jade"],
  ["jade", "quartz", "sapphire", "ruby", "amethyst"],
];

const OPPONENTS = {
  laurel: { name: "Laurel", subtitle: "Cafe owner & crystal collector", difficulty: "Medium", hairColor: "#8B6346", shirtColor: "#F5F0E8", skinColor: "#DEB887", style: "strategic" },
  mrlindsay: { name: "Mr. Lindsay", subtitle: "Friendly gem enthusiast", difficulty: "Easy", hairColor: "#8B7355", shirtColor: "#2E8B57", skinColor: "#DEB887", style: "casual" },
  taylor: { name: "Taylor B.", subtitle: "Sharp-eyed gemologist", difficulty: "Hard", hairColor: "#5C4033", shirtColor: "#4169E1", skinColor: "#DEB887", style: "aggressive" },
};

const AI_LINES = {
  laurel: {
    thinking: ["Let me check the trinket trays...", "Hmm, which crystals to collect next?", "A collector always has a plan!", "I've got my eye on something sparkly...", "This reminds me of a gem show!"],
    pickTile: (e, c) => [`I'll take ${c} ${e} from this tray!`, `These ${e} are just what I need.`, `${c} ${e} — perfect for my curio!`],
    goodMove: ["That was a smart pick!", "Nicely done — you've got a good eye for gems!", "Ooh, I had my eye on those!", "You're getting the hang of this!"],
    endWin: "Thanks for playing! The cafe always has more crystals to discover. 💎",
    endLose: "Well played! You really know your gems! 🏆",
    endTie: "A tie! That's like finding two perfect stones — equally brilliant! 🔮",
  },
  mrlindsay: {
    thinking: ["Oh, what sparkles today?", "Decisions, decisions...", "I usually go with the prettiest one!", "Let me see what's on the trays...", "This is my favorite part!"],
    pickTile: (e, c) => [`Ooh, I'll grab ${c} ${e}!`, `Can't resist those ${e}!`, `${c} ${e} coming right up!`],
    goodMove: ["Hey, nice move!", "Oh, I wanted those!", "You've got a good eye!", "Well played, friend!"],
    endWin: "Wow, I won? Must be my lucky crystal! 😄",
    endLose: "Great game! You really showed me how it's done! 👏",
    endTie: "A tie! That means we both found treasure, right? 💎",
  },
  taylor: {
    thinking: ["Analyzing the trays...", "I see a few strong options here.", "Let me think strategically...", "There's a combo I can set up.", "Time to make a calculated move."],
    pickTile: (e, c) => [`Taking ${c} ${e} — it's the optimal play.`, `${c} ${e}, exactly as planned.`, `These ${e} fit perfectly in my strategy.`],
    goodMove: ["Smart pick — I respect that!", "Oh, that was a strong move!", "You're making this competitive!", "Good choice — I need to step up my game!"],
    endWin: "Good game! I studied the collection carefully. 📊",
    endLose: "Impressive strategy! You outplayed me fair and square! 🎯",
    endTie: "A tie! We're evenly matched — rematch? 🤝",
  },
};

const rand = (a) => a[Math.floor(Math.random() * a.length)];

// ============================================
const Avatar = ({ character, size = 60 }) => {
  const s = size, d = OPPONENTS[character];
  if (!d) return null;
  return (
    <div style={{ width: s, height: s, borderRadius: "50%", background: "linear-gradient(135deg, #F5E6D3, #E8D5B7)", border: "3px solid #E0D5C3", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", flexShrink: 0 }}>
      <div style={{ width: s * 0.45, height: s * 0.45, borderRadius: "50%", backgroundColor: d.skinColor, position: "absolute", top: s * 0.12, zIndex: 2 }} />
      <div style={{ width: s * 0.5, height: character === "laurel" ? s * 0.35 : s * 0.25, borderRadius: character === "laurel" ? "50% 50% 40% 40%" : "50% 50% 30% 30%", backgroundColor: d.hairColor, position: "absolute", top: s * 0.08, zIndex: 3 }} />
      <div style={{ width: s * 0.7, height: s * 0.35, borderRadius: "50% 50% 0 0", backgroundColor: d.shirtColor, position: "absolute", bottom: 0, zIndex: 1 }} />
      <div style={{ position: "absolute", top: s * 0.3, zIndex: 4, display: "flex", gap: s * 0.08 }}>
        <div style={{ width: s * 0.05, height: s * 0.05, borderRadius: "50%", backgroundColor: "#333" }} />
        <div style={{ width: s * 0.05, height: s * 0.05, borderRadius: "50%", backgroundColor: "#333" }} />
      </div>
      <div style={{ position: "absolute", top: s * 0.38, width: s * 0.12, height: s * 0.06, borderRadius: "0 0 50% 50%", borderBottom: "2px solid #333", zIndex: 4 }} />
    </div>
  );
};

const Tile = ({ type, size = 40, onClick, selected }) => {
  if (!type) return <div style={{ width: size, height: size }} />;
  return (
    <div onClick={onClick} style={{ width: size, height: size, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.55, cursor: onClick ? "pointer" : "default", border: selected ? "3px solid #D4A843" : "2px solid rgba(0,0,0,0.1)", background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))", boxShadow: selected ? "0 0 12px rgba(212,168,67,0.5)" : "0 2px 6px rgba(0,0,0,0.1)", transform: selected ? "scale(1.1)" : "scale(1)", transition: "all 0.15s", userSelect: "none" }}>
      {TILE_EMOJI[type]}
    </div>
  );
};

function createBag() { const b = []; TILE_TYPES.forEach(t => { for (let i = 0; i < 20; i++) b.push(t); }); return shuf(b); }
function shuf(a) { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
function emptyBoard() { return { patternLines: Array.from({ length: BS }, (_, i) => ({ size: i + 1, tiles: [], type: null })), wall: Array.from({ length: BS }, () => Array(BS).fill(null)), floorLine: [], score: 0 }; }
function fillTrays(bag) { const t = [], b = [...bag]; for (let i = 0; i < NUM_TRAYS; i++) { const f = []; for (let j = 0; j < TILES_PER_TRAY; j++) { if (b.length) f.push(b.pop()); } t.push(f); } return { trays: t, bag: b }; }

function wallScore(wall, r, c) {
  let h = 1; for (let x = c - 1; x >= 0 && wall[r][x] !== null; x--) h++; for (let x = c + 1; x < BS && wall[r][x] !== null; x++) h++;
  let v = 1; for (let x = r - 1; x >= 0 && wall[x][c] !== null; x--) v++; for (let x = r + 1; x < BS && wall[x][c] !== null; x++) v++;
  if (h > 1 && v > 1) return h + v; return h > 1 ? h : v > 1 ? v : 1;
}

// Detailed version: returns { points, breakdown } for explaining scoring
function wallScoreDetailed(wall, r, c, tileType) {
  let hLeft = 0; for (let x = c - 1; x >= 0 && wall[r][x] !== null; x--) hLeft++;
  let hRight = 0; for (let x = c + 1; x < BS && wall[r][x] !== null; x++) hRight++;
  let h = 1 + hLeft + hRight;
  let vUp = 0; for (let x = r - 1; x >= 0 && wall[x][c] !== null; x--) vUp++;
  let vDown = 0; for (let x = r + 1; x < BS && wall[x][c] !== null; x++) vDown++;
  let v = 1 + vUp + vDown;
  const emoji = TILE_EMOJI[tileType] || "?";
  let points, breakdown;
  if (h > 1 && v > 1) {
    points = h + v;
    breakdown = `${emoji} placed in curio! ${h} in a row ← → plus ${v} in a column ↑ ↓ = ${points} points!`;
  } else if (h > 1) {
    points = h;
    breakdown = `${emoji} placed in curio! ${h} tiles connected in a row ← → = ${points} points!`;
  } else if (v > 1) {
    points = v;
    breakdown = `${emoji} placed in curio! ${v} tiles connected in a column ↑ ↓ = ${points} points!`;
  } else {
    points = 1;
    breakdown = `${emoji} placed in curio — no neighbors yet = 1 point`;
  }
  return { points, breakdown };
}

// Open grid: get valid columns for a tile type in a given row
function getValidWallCols(wall, rowIdx, tileType) {
  const valid = [];
  for (let c = 0; c < BS; c++) {
    if (wall[rowIdx][c] !== null) continue; // spot taken
    // Check column doesn't already have this type
    let colHasType = false;
    for (let r = 0; r < BS; r++) { if (wall[r][c] === tileType) { colHasType = true; break; } }
    if (colHasType) continue;
    // Check row doesn't already have this type
    if (wall[rowIdx].includes(tileType)) continue;
    valid.push(c);
  }
  return valid;
}

function getCompletedLines(board) {
  const lines = [];
  board.patternLines.forEach((line, idx) => {
    if (line.tiles.length === line.size && line.type) {
      // Open grid: check if there's ANY valid column for this type in this row
      const validCols = getValidWallCols(board.wall, idx, line.type);
      if (validCols.length > 0) lines.push(idx);
    }
  });
  return lines;
}

function moveLineToWall(board, rowIdx, col) {
  const line = board.patternLines[rowIdx];
  const newWall = board.wall.map(r => [...r]);
  newWall[rowIdx][col] = line.type; // Store crystal type instead of boolean
  const pts = wallScore(newWall, rowIdx, col);
  const detail = wallScoreDetailed(newWall, rowIdx, col, line.type);
  const newPatternLines = board.patternLines.map((l, i) =>
    i === rowIdx ? { size: l.size, tiles: [], type: null } : { ...l }
  );
  return { board: { ...board, wall: newWall, patternLines: newPatternLines, score: board.score + pts }, points: pts, tile: line.type, col, breakdown: detail.breakdown };
}

function applyFloorPenalty(board) {
  const penalties = [1, 1, 2, 2, 2, 3, 3];
  let pen = 0;
  board.floorLine.forEach((_, i) => { if (i < penalties.length) pen += penalties[i]; });
  return { board: { ...board, score: Math.max(0, board.score - pen), floorLine: [] }, penalty: pen };
}

function calcEndBonuses(board) {
  let bonus = 0; const events = [];
  for (let r = 0; r < BS; r++) { if (board.wall[r].every(c => c !== null)) { bonus += 2; events.push("Complete curio row → +2"); } }
  for (let c = 0; c < BS; c++) { if (board.wall.every(row => row[c] !== null)) { bonus += 7; events.push("Complete curio column → +7"); } }
  TILE_TYPES.forEach(type => {
    let n = 0; for (let r = 0; r < BS; r++) { for (let c = 0; c < BS; c++) { if (board.wall[r][c] === type) n++; } }
    if (n === 5) { bonus += 10; events.push(`All 5 ${TILE_EMOJI[type]} placed → +10`); }
  });
  return { bonus, events, board: { ...board, score: board.score + bonus } };
}

function isGameOver(board) { for (let r = 0; r < BS; r++) { if (board.wall[r].every(c => c !== null)) return true; } return false; }
function getValidLines(board, type) {
  const v = [];
  board.patternLines.forEach((line, idx) => {
    // Open grid: check if there's any valid spot for this type in this wall row
    const validCols = getValidWallCols(board.wall, idx, type);
    if (validCols.length === 0) return; // no valid placement exists
    if (line.type && line.type !== type) return; if (line.tiles.length >= line.size) return;
    v.push(idx);
  });
  return v;
}

function getAIMove(trays, center, board, style, centerTaken) {
  const moves = [];
  const ev = (src, fi, type, count) => {
    board.patternLines.forEach((line, li) => {
      const validCols = getValidWallCols(board.wall, li, type);
      if (validCols.length === 0) return; if (line.type && line.type !== type) return;
      const sp = line.size - line.tiles.length; if (sp <= 0) return;
      const fill = count >= sp; const waste = Math.max(0, count - sp);
      let s = fill ? 10 : count * 2; s -= waste * 3;
      // Penalty for being first to take from center
      if (src === "center" && !centerTaken) s -= 2;
      if (style === "aggressive") s += fill ? 5 : 0;
      else if (style === "casual") s += Math.random() * 4 - 2;
      moves.push({ src, fi, type, li, s });
    });
    moves.push({ src, fi, type, li: -1, s: -5 });
  };
  trays.forEach((t, fi) => { if (!t.length) return; [...new Set(t)].forEach(type => ev("tray", fi, type, t.filter(x => x === type).length)); });
  if (center.length) [...new Set(center)].forEach(type => ev("center", -1, type, center.filter(x => x === type).length));
  if (!moves.length) return null;
  moves.sort((a, b) => b.s - a.s);
  if (style === "casual") { const top = moves.slice(0, Math.min(3, moves.length)); return top[Math.floor(Math.random() * top.length)]; }
  return moves[0];
}

// AI chooses best column for open grid placement
function getAIWallCol(wall, rowIdx, tileType) {
  const validCols = getValidWallCols(wall, rowIdx, tileType);
  if (validCols.length === 0) return -1;
  // Score each valid column by adjacency
  let best = validCols[0], bestScore = -1;
  for (const c of validCols) {
    const tempWall = wall.map(r => [...r]);
    tempWall[rowIdx][c] = tileType;
    const s = wallScore(tempWall, rowIdx, c);
    if (s > bestScore) { bestScore = s; best = c; }
  }
  return best;
}

const SAVE_KEY = "cafeCrystalsSave";
function saveGame(s) { try { localStorage.setItem(SAVE_KEY, JSON.stringify(s)); } catch {} }
function loadGame() { try { const s = localStorage.getItem(SAVE_KEY); return s ? JSON.parse(s) : null; } catch { return null; } }
function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch {} }

// ============================================
// MAIN
// ============================================
export default function CafeTiles() {
  const [screen, setScreen] = useState("menu");
  const [opp, setOpp] = useState(null);
  const [bag, setBag] = useState([]);
  const [trays, setTrays] = useState([]);
  const [center, setCenter] = useState([]);
  const [pBoard, setPBoard] = useState(emptyBoard());
  const [aiBoard, setAiBoard] = useState(emptyBoard());
  const [sel, setSel] = useState(null);
  const [turn, setTurn] = useState("player");
  const [round, setRound] = useState(1);
  const [msg, setMsg] = useState("");
  const [showHTP, setShowHTP] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [aiComment, setAiComment] = useState("");
  const [showTut, setShowTut] = useState(true);
  const [tutStep, setTutStep] = useState(0);
  const [hasSave, setHasSave] = useState(false);

  // End-of-round scoring state
  const [phase, setPhase] = useState("play"); // "play" | "playerScore" | "playerScoreDone" | "aiScore" | "aiScoreDone" | "roundDone" | "endBonuses"
  const [completedRows, setCompletedRows] = useState([]); // player's rows ready to move
  const [lastScoreEvent, setLastScoreEvent] = useState(null); // flash scoring info
  const [playerScoreEvents, setPlayerScoreEvents] = useState([]); // Player scoring log
  const [aiScoreEvents, setAiScoreEvents] = useState([]); // AI scoring log
  const [aiScoreIdx, setAiScoreIdx] = useState(0);
  const [gameOver, setGameOver] = useState(false); // prevent auto-save after game ends
  const [endBonusEvents, setEndBonusEvents] = useState([]); // combined end bonus events for display
  const [endBonusIdx, setEndBonusIdx] = useState(0);
  const [centerTaken, setCenterTaken] = useState(false); // has anyone taken from center this round?
  const [firstPlayerNext, setFirstPlayerNext] = useState("player"); // who goes first next round
  const [crystalFactIdx, setCrystalFactIdx] = useState(() => { try { const v = localStorage.getItem("cafeCrystalsFactIdx"); return v ? parseInt(v) : 0; } catch { return 0; } });
  const [pendingWallRow, setPendingWallRow] = useState(null); // open grid: player choosing wall column
  const [pendingWallType, setPendingWallType] = useState(null);

  // Timer refs for cleanup
  const timersRef = useState([])[0];
  const clearTimers = () => { timersRef.forEach(t => clearTimeout(t)); timersRef.length = 0; };
  const addTimer = (fn, ms) => { const t = setTimeout(fn, ms); timersRef.push(t); return t; };

  useEffect(() => { setHasSave(!!loadGame()); return clearTimers; }, []);

  const DEFAULT_MSG = "Your turn! Pick crystals from a trinket tray or the center.";

  const startGame = (o) => {
    clearTimers(); clearSave(); setOpp(o);
    const nb = createBag(); const { trays: nt, bag: rb } = fillTrays(nb);
    setTrays(nt); setBag(rb); setCenter([]); setPBoard(emptyBoard()); setAiBoard(emptyBoard());
    setTurn("player"); setRound(1); setSel(null); setMsg(""); setAiComment("");
    setShowTut(true); setTutStep(0); setPhase("play"); setCompletedRows([]); setLastScoreEvent(null);
    setAiScoreEvents([]); setAiScoreIdx(0); setPlayerScoreEvents([]);
    setGameOver(false);
    setScreen("game");
  };

  const resumeGame = () => {
    const s = loadGame(); if (!s) return;
    clearTimers(); setOpp(s.opp); setTrays(s.trays); setBag(s.bag); setCenter(s.center);
    setPBoard(s.pBoard); setAiBoard(s.aiBoard); setTurn(s.turn); setRound(s.round);
    setSel(null); setAiComment("");
    setShowTut(false); setLastScoreEvent(null);
    setAiScoreEvents([]); setAiScoreIdx(0); setPlayerScoreEvents([]);
    setGameOver(false);

    // Restore phase properly
    const savedPhase = s.phase || "play";
    const allTraysEmpty = s.trays.every(t => !t.length) && !s.center.length;

    if (allTraysEmpty && (savedPhase === "play" || savedPhase === "playerScore" || savedPhase === "playerScoreDone")) {
      // All tiles played — need to be in scoring phase
      const rows = getCompletedLines(s.pBoard);
      if (rows.length > 0 || s.pBoard.floorLine.length > 0) {
        setPhase("playerScore");
        setCompletedRows(rows);
        setMsg("Welcome back! Click each glowing row to score, then finish scoring.");
      } else {
        // Player scoring already done, go straight to AI
        setPhase("playerScoreDone");
        setCompletedRows([]);
        setMsg("Welcome back! Click the button to score your opponent.");
      }
    } else if (savedPhase === "aiScore") {
      // Was mid-AI scoring — restart AI scoring from scratch
      setPhase("playerScoreDone");
      setCompletedRows([]);
      setMsg("Welcome back! Click the button to score your opponent.");
    } else if (savedPhase === "aiScoreDone") {
      // AI scoring was done, player was reviewing — go to roundDone
      setPhase("roundDone");
      setCompletedRows([]);
      setMsg("Welcome back! Start the next round when ready.");
    } else if (savedPhase === "roundDone") {
      // Round was done — let them start next round
      setPhase("roundDone");
      setCompletedRows([]);
      setMsg("Welcome back! Start the next round when ready.");
    } else {
      // Normal play phase
      setPhase("play");
      setCompletedRows([]);
      if (s.turn === "ai" && !allTraysEmpty) {
        // AI was about to go — let it proceed
        setMsg(`${OPPONENTS[s.opp]?.name}'s turn...`);
      } else {
        setMsg("Welcome back! Continue your game.");
      }
    }
    setScreen("game");
  };

  // Auto-save: whenever game state changes, save to localStorage
  // This always captures the RENDERED state (never stale closures)
  useEffect(() => {
    if (screen !== "game" || !opp || gameOver) return;
    saveGame({ opp, trays, bag, center, pBoard, aiBoard, turn, round, phase, centerTaken, firstPlayerNext });
  }, [screen, opp, trays, bag, center, pBoard, aiBoard, turn, round, phase, gameOver]);

  const allEmpty = trays.every(t => !t.length) && !center.length;

  // Detect end of round — enter player scoring phase
  useEffect(() => {
    if (screen !== "game" || !allEmpty || phase !== "play") return;
    const rows = getCompletedLines(pBoard);
    if (rows.length > 0 || pBoard.floorLine.length > 0) {
      setCompletedRows(rows);
      setPhase("playerScore");
      if (rows.length > 0) {
        setMsg("💎 Round over! Click each glowing row to move tiles to your curio.");
      } else {
        setMsg("💎 Round over! Click 'Finish Scoring' to apply penalties.");
      }
    } else {
      // No completed rows, no floor — skip to AI
      setPhase("aiScore");
      startAIScoring();
    }
  }, [allEmpty, screen, phase]);

  // Player clicks a completed row to move it
  const handleScoreRowClick = (rowIdx) => {
    if (phase !== "playerScore") return;
    if (!completedRows.includes(rowIdx)) return;

    const line = pBoard.patternLines[rowIdx];
    const validCols = getValidWallCols(pBoard.wall, rowIdx, line.type);
    
    if (validCols.length === 1) {
      // Only one option — place automatically
      const col = validCols[0];
      const result = moveLineToWall(pBoard, rowIdx, col);
      setPBoard(result.board);
      setCompletedRows(prev => prev.filter(r => r !== rowIdx));
      setLastScoreEvent({ tile: result.tile, points: result.points, row: rowIdx, col: result.col });
      setPlayerScoreEvents(prev => [...prev, { type: "wall", tile: result.tile, points: result.points, desc: result.breakdown }]);
      setMsg(result.breakdown);
      addTimer(() => setLastScoreEvent(null), 3000);
    } else {
      // Multiple options — let player choose
      setPendingWallRow(rowIdx);
      setPendingWallType(line.type);
      setMsg(`Choose where to place ${TILE_EMOJI[line.type]} in the curio (row ${rowIdx + 1}). Click a glowing spot.`);
    }
  };

  // Player picks a column in the open grid
  const handleWallColClick = (rowIdx, colIdx) => {
    if (pendingWallRow === null || pendingWallRow !== rowIdx) return;
    const validCols = getValidWallCols(pBoard.wall, rowIdx, pendingWallType);
    if (!validCols.includes(colIdx)) return;

    const result = moveLineToWall(pBoard, rowIdx, colIdx);
    setPBoard(result.board);
    setCompletedRows(prev => prev.filter(r => r !== rowIdx));
    setLastScoreEvent({ tile: result.tile, points: result.points, row: rowIdx, col: result.col });
    setPlayerScoreEvents(prev => [...prev, { type: "wall", tile: result.tile, points: result.points, desc: result.breakdown }]);
    setMsg(result.breakdown);
    setPendingWallRow(null);
    setPendingWallType(null);
    addTimer(() => setLastScoreEvent(null), 3000);
  };

  // Player finishes scoring
  const handleFinishPlayerScoring = () => {
    // Apply floor penalty
    const penResult = applyFloorPenalty(pBoard);
    const penalties = [1, 1, 2, 2, 2, 3, 3];
    const numTiles = pBoard.floorLine.length;
    setPBoard(penResult.board);
    if (penResult.penalty > 0) {
      const penBreakdown = pBoard.floorLine.map((_, i) => i < penalties.length ? `-${penalties[i]}` : "").filter(Boolean).join(", ");
      const penDesc = `💠 Crystal Cache: ${numTiles} tile${numTiles !== 1 ? "s" : ""} (${penBreakdown}) = -${penResult.penalty} points`;
      setPlayerScoreEvents(prev => [...prev, { type: "penalty", desc: penDesc }]);
    } else {
      setPlayerScoreEvents(prev => [...prev, { type: "clean", desc: "✨ Empty crystal cache — no penalty!" }]);
    }
    setPhase("playerScoreDone");
  };

  // Player manually starts AI scoring
  const handleStartAIScoring = () => {
    setPhase("aiScore");
    addTimer(() => startAIScoring(), 500);
  };

  // AI scoring — step by step display
  const startAIScoring = () => {
    const rows = getCompletedLines(aiBoard);
    const events = [];
    let tempBoard = { ...aiBoard, wall: aiBoard.wall.map(r => [...r]), patternLines: aiBoard.patternLines.map(l => ({ ...l, tiles: [...l.tiles] })), floorLine: [...aiBoard.floorLine] };

    rows.forEach(rowIdx => {
      const line = tempBoard.patternLines[rowIdx];
      const col = getAIWallCol(tempBoard.wall, rowIdx, line.type);
      if (col === -1) return; // shouldn't happen but safety check
      const result = moveLineToWall(tempBoard, rowIdx, col);
      tempBoard = result.board;
      events.push({ type: "wall", tile: result.tile, points: result.points, desc: result.breakdown });
    });

    const penalties = [1, 1, 2, 2, 2, 3, 3];
    const numFloorTiles = tempBoard.floorLine.length;
    const penResult = applyFloorPenalty(tempBoard);
    tempBoard = penResult.board;
    if (penResult.penalty > 0) {
      const penBreakdown = Array.from({ length: numFloorTiles }, (_, i) => i < penalties.length ? `-${penalties[i]}` : "").filter(Boolean).join(", ");
      events.push({ type: "penalty", desc: `💠 Crystal Cache: ${numFloorTiles} tile${numFloorTiles !== 1 ? "s" : ""} (${penBreakdown}) = -${penResult.penalty} points` });
    } else if (rows.length > 0) {
      events.push({ type: "clean", desc: "✨ Empty crystal cache — no penalty!" });
    }

    setAiScoreEvents(events);
    setAiScoreIdx(0);

    if (events.length === 0) {
      setAiBoard(tempBoard);
      finishRound(tempBoard);
      return;
    }

    // Animate events
    events.forEach((ev, i) => {
      addTimer(() => {
        setMsg(`${OPPONENTS[opp]?.name}: ${ev.desc}`);
        setAiScoreIdx(i + 1);
        if (i === events.length - 1) {
          addTimer(() => {
            setAiBoard(tempBoard);
            setPhase("aiScoreDone");
            setMsg(`${OPPONENTS[opp]?.name}'s scoring complete. Review their board, then continue.`);
          }, 2000);
        }
      }, (i + 1) * 2800);
    });
  };

  const finishRound = (finalAiBoard) => {
    const ab = finalAiBoard || aiBoard;
    const pDone = isGameOver(pBoard);
    const aDone = isGameOver(ab);
    if (pDone || aDone || round >= 5) {
      // Build animated end bonus events
      const pBonus = calcEndBonuses(pBoard);
      const aBonus = calcEndBonuses(ab);
      const events = [];
      
      if (pBonus.events.length > 0 || aBonus.events.length > 0) {
        events.push({ type: "header", desc: "🌟 End-of-Game Bonuses 🌟" });
      }
      
      if (pBonus.events.length > 0) {
        events.push({ type: "subheader", desc: "Your Bonuses:" });
        pBonus.events.forEach(e => events.push({ type: "player", desc: e }));
        events.push({ type: "playerTotal", desc: `Your bonus total: +${pBonus.bonus}`, points: pBonus.bonus });
      } else {
        events.push({ type: "subheader", desc: "No end bonuses for you this game." });
      }
      
      if (aBonus.events.length > 0) {
        events.push({ type: "subheader", desc: `${OPPONENTS[opp]?.name}'s Bonuses:` });
        aBonus.events.forEach(e => events.push({ type: "ai", desc: e }));
        events.push({ type: "aiTotal", desc: `${OPPONENTS[opp]?.name}'s bonus total: +${aBonus.bonus}`, points: aBonus.bonus });
      } else {
        events.push({ type: "subheader", desc: `No end bonuses for ${OPPONENTS[opp]?.name}.` });
      }
      
      const finalPScore = pBoard.score + pBonus.bonus;
      const finalAScore = ab.score + aBonus.bonus;
      events.push({ type: "final", desc: `Final Score — You: ${finalPScore} | ${OPPONENTS[opp]?.name}: ${finalAScore}` });
      
      // Crystal fact — rotate through types
      const crystalData = CRYSTAL_FACTS[crystalFactIdx % CRYSTAL_FACTS.length];
      const factText = crystalData.facts[Math.floor(Math.random() * crystalData.facts.length)];
      events.push({ type: "crystalFact", desc: `${crystalData.emoji} Crystal Fact — ${crystalData.crystal}: ${factText}` });
      
      // Advance crystal fact index for next game
      const nextIdx = (crystalFactIdx + 1) % CRYSTAL_FACTS.length;
      setCrystalFactIdx(nextIdx);
      try { localStorage.setItem("cafeCrystalsFactIdx", nextIdx.toString()); } catch {}
      
      setEndBonusEvents(events);
      setEndBonusIdx(0);
      setPhase("endBonuses");
      setMsg("🌟 Calculating end-of-game bonuses...");
      clearSave();
      
      // Animate events one by one
      events.forEach((ev, i) => {
        addTimer(() => {
          setEndBonusIdx(i + 1);
        }, (i + 1) * 1800);
      });
      
      return;
    }

    setPhase("roundDone");
    setMsg("Round complete! Click 'Next Round' to continue.");
  };

  const goToGameOver = () => {
    const pBonus = calcEndBonuses(pBoard);
    const aBonus = calcEndBonuses(aiBoard);
    setPBoard(pBonus.board);
    setAiBoard(aBonus.board);
    setGameOver(true);
    setScreen("gameover");
  };

  const startNextRound = () => {
    const nb = bag.length >= NUM_TRAYS * TILES_PER_TRAY ? bag : createBag();
    const { trays: nt, bag: rb } = fillTrays(nb);
    setTrays(nt); setBag(rb); setCenter([]);
    setRound(r => r + 1); setTurn(firstPlayerNext); setPhase("play");
    setCenterTaken(false); setFirstPlayerNext("player"); // reset for new round
    setCompletedRows([]); setLastScoreEvent(null); setAiScoreEvents([]); setAiScoreIdx(0); setPlayerScoreEvents([]);
    setPendingWallRow(null); setPendingWallType(null);
    setMsg(firstPlayerNext === "ai" ? `${OPPONENTS[opp]?.name} goes first this round...` : DEFAULT_MSG);
  };

  // AI Turn
  useEffect(() => {
    if (turn !== "ai" || screen !== "game" || allEmpty || phase !== "play") return;
    setAiThinking(true);
    const lines = AI_LINES[opp] || AI_LINES.mrlindsay;

    setAiComment(rand(lines.thinking));
    setMsg(`${OPPONENTS[opp]?.name} is deciding...`);

    addTimer(() => {
      const move = getAIMove(trays, center, aiBoard, OPPONENTS[opp]?.style || "casual", centerTaken);
      if (!move) { setTurn(firstPlayerNext === "player" ? "player" : "ai"); setAiThinking(false); setAiComment(""); return; }

      const isFirstCenter = move.src === "center" && !centerTaken;

      let tiles, rem;
      if (move.src === "tray") { tiles = trays[move.fi].filter(t => t === move.type); rem = trays[move.fi].filter(t => t !== move.type); }
      else { tiles = center.filter(t => t === move.type); rem = center.filter(t => t !== move.type); }

      const pickLines = lines.pickTile(TILE_EMOJI[move.type], tiles.length);
      setAiComment(rand(pickLines));
      const penaltyNote = isFirstCenter ? " (⚠️ -1 penalty!)" : "";
      setMsg(`${OPPONENTS[opp]?.name} takes ${tiles.length}× ${TILE_EMOJI[move.type]}${penaltyNote}`);

      addTimer(() => {
        if (isFirstCenter) {
          setCenterTaken(true);
          setFirstPlayerNext("ai");
        }

        let newTrays = trays;
        let newCenter = center;
        if (move.src === "tray") {
          newTrays = trays.map((t, i) => i === move.fi ? [] : t);
          newCenter = [...center, ...rem];
        } else {
          newCenter = rem;
        }

        const newAiBoard = { ...aiBoard, patternLines: aiBoard.patternLines.map(l => ({ ...l, tiles: [...l.tiles] })), floorLine: [...aiBoard.floorLine] };
        if (isFirstCenter) newAiBoard.floorLine.push("penalty");
        if (move.li >= 0) { const line = newAiBoard.patternLines[move.li]; line.type = move.type; tiles.forEach(t => { if (line.tiles.length < line.size) line.tiles.push(t); else newAiBoard.floorLine.push(t); }); }
        else newAiBoard.floorLine.push(...tiles);

        setTrays(newTrays);
        setCenter(newCenter);
        setAiBoard(newAiBoard);

        addTimer(() => {
          setAiComment(rand(lines.goodMove));
          addTimer(() => {
            setAiThinking(false); setAiComment(""); setTurn("player"); setMsg(DEFAULT_MSG);
          }, 3000);
        }, 2200);
      }, 3000);
    }, 2000);
  }, [turn, screen, opp, phase]);

  const validLines = sel ? getValidLines(pBoard, sel.type) : [];
  const mustTipJar = sel && validLines.length === 0;

  const handleTrayClick = (fi, type) => {
    if (turn !== "player" || phase !== "play") return;
    const tiles = trays[fi].filter(t => t === type);
    const rem = trays[fi].filter(t => t !== type);
    setSel({ type, count: tiles.length, tiles, src: "tray", fi, rem });
    const vl = getValidLines(pBoard, type);
    setMsg(vl.length === 0 ? `No rows for ${TILE_EMOJI[type]}. Click the Crystal Cache.` : `Selected ${tiles.length}× ${TILE_EMOJI[type]}. Pick a highlighted row.`);
    if (showTut && tutStep === 0) setTutStep(1);
  };

  const handleCenterClick = (type) => {
    if (turn !== "player" || phase !== "play") return;
    const tiles = center.filter(t => t === type);
    const rem = center.filter(t => t !== type);
    setSel({ type, count: tiles.length, tiles, src: "center", rem });
    const vl = getValidLines(pBoard, type);
    const penaltyWarning = !centerTaken ? " ⚠️ First from center: -1 penalty!" : "";
    setMsg(vl.length === 0 ? `No rows for ${TILE_EMOJI[type]}. Click the Crystal Cache.${penaltyWarning}` : `Selected ${tiles.length}× ${TILE_EMOJI[type]}. Pick a row.${penaltyWarning}`);
  };

  const handleLineClick = (li) => {
    if (!sel || turn !== "player" || !validLines.includes(li)) return;

    const isFirstCenter = sel.src === "center" && !centerTaken;

    // Center penalty: first player to take from center gets -1 and goes first next round
    if (isFirstCenter) {
      setCenterTaken(true);
      setFirstPlayerNext("player");
    }

    let newTrays = trays;
    let newCenter = center;
    if (sel.src === "tray") {
      newTrays = trays.map((t, i) => i === sel.fi ? [] : t);
      newCenter = [...center, ...sel.rem];
    } else {
      newCenter = sel.rem;
    }

    const newBoard = { ...pBoard, patternLines: pBoard.patternLines.map(l => ({ ...l, tiles: [...l.tiles] })), floorLine: [...pBoard.floorLine] };
    if (isFirstCenter) newBoard.floorLine.push("penalty");
    const line = newBoard.patternLines[li]; line.type = sel.type;
    sel.tiles.forEach(t => { if (line.tiles.length < line.size) line.tiles.push(t); else newBoard.floorLine.push(t); });

    setTrays(newTrays);
    setCenter(newCenter);
    setPBoard(newBoard);
    if (showTut && tutStep === 1) setShowTut(false);
    setSel(null); setTurn("ai"); setMsg(`${OPPONENTS[opp]?.name}'s turn...`);
  };

  const handleFloorClick = () => {
    if (!sel || turn !== "player") return;

    const isFirstCenter = sel.src === "center" && !centerTaken;
    if (isFirstCenter) {
      setCenterTaken(true);
      setFirstPlayerNext("player");
    }

    let newTrays = trays;
    let newCenter = center;
    if (sel.src === "tray") {
      newTrays = trays.map((t, i) => i === sel.fi ? [] : t);
      newCenter = [...center, ...sel.rem];
    } else {
      newCenter = sel.rem;
    }

    const newFloor = [...pBoard.floorLine, ...sel.tiles];
    if (isFirstCenter) newFloor.push("penalty");
    const newBoard = { ...pBoard, floorLine: newFloor };

    // Apply state
    setTrays(newTrays);
    setCenter(newCenter);
    setPBoard(newBoard);
    setSel(null); setTurn("ai"); setMsg(`${OPPONENTS[opp]?.name}'s turn...`);
  };

  // ---- MENU ----
  if (screen === "menu") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #2D1B4E 0%, #1A3A5C 30%, #1B5E4B 60%, #0F2027 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', serif", padding: 20 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🔮💎</div>
        <h1 style={{ fontSize: 38, color: "#FFF8F0", textShadow: "2px 2px 8px rgba(0,0,0,0.3)", margin: 0 }}>Cafe Crystals</h1>
        <p style={{ color: "#FFF8F0", opacity: 0.9, margin: "4px 0 28px", fontSize: 15 }}>At the Letter Griddle</p>
        <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: 20, padding: 28, maxWidth: 460, width: "100%", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
          {hasSave && (
            <div style={{ marginBottom: 20, textAlign: "center" }}>
              <button onClick={resumeGame} style={{ background: "linear-gradient(135deg, #2E8B57, #3CB371)", color: "white", border: "none", padding: "12px 28px", borderRadius: 24, fontSize: 15, fontWeight: "bold", cursor: "pointer", fontFamily: "'Georgia', serif", boxShadow: "0 4px 12px rgba(46,139,87,0.3)" }}>☕ Continue Saved Game</button>
              <div style={{ fontSize: 11, color: "#5C3D2E", marginTop: 6 }}>or choose a new opponent below</div>
            </div>
          )}
          <h2 style={{ textAlign: "center", color: "#8B6346", fontSize: 20, margin: "0 0 6px" }}>Choose Your Opponent</h2>
          <p style={{ textAlign: "center", color: "#A08060", fontSize: 13, margin: "0 0 20px" }}>Play against a member of the Trivia Crew!</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {Object.entries(OPPONENTS).map(([key, d]) => (
              <div key={key} onClick={() => startGame(key)} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 14, borderRadius: 14, border: "2px solid #E8D5B7", cursor: "pointer", transition: "all 0.2s", background: "linear-gradient(135deg, #FFFAF3, #FFF5E8)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#D4A843"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8D5B7"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <Avatar character={key} size={52} />
                <div style={{ fontWeight: "bold", color: "#8B6346", marginTop: 6, fontSize: 13 }}>{d.name}</div>
                <div style={{ color: "#A08060", fontSize: 10, textAlign: "center" }}>{d.subtitle}</div>
                <div style={{ marginTop: 4, fontSize: 9, padding: "2px 8px", borderRadius: 8, background: d.difficulty === "Easy" ? "#E8F5E9" : d.difficulty === "Medium" ? "#FFF3E0" : "#FFEBEE", color: d.difficulty === "Easy" ? "#2E7D32" : d.difficulty === "Medium" ? "#E65100" : "#C62828", fontWeight: "bold" }}>{d.difficulty}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button onClick={() => setShowHTP(true)} style={{ background: "linear-gradient(135deg, #D4A843, #C49530)", color: "white", border: "none", padding: "9px 24px", borderRadius: 20, fontSize: 13, fontWeight: "bold", cursor: "pointer", fontFamily: "'Georgia', serif" }}>How to Play</button>
          </div>
          <div style={{ textAlign: "center", marginTop: 16, color: "#A08060", fontSize: 11 }}>🥞 Letter Griddle Games</div>
        </div>
        {showHTP && <HTPModal onClose={() => setShowHTP(false)} />}
        <div style={{ textAlign: "center", padding: "24px 0", fontSize: 11, color: "#5C3D2E", marginTop: 16 }}>
          © {new Date().getFullYear()} Letter Griddle. All rights reserved.
          {' | '}
          <a href="/privacy" style={{ color: "#5C3D2E", textDecoration: "underline" }}>Privacy Policy</a>
          {' | '}
          <a href="/terms" style={{ color: "#5C3D2E", textDecoration: "underline" }}>Terms of Service</a>
        </div>
      </div>
    );
  }

  // ---- GAME OVER ----
  if (screen === "gameover") {
    const pWin = pBoard.score > aiBoard.score; const tie = pBoard.score === aiBoard.score;
    const l = AI_LINES[opp] || AI_LINES.mrlindsay;
    const endMsg = pWin ? l.endLose : tie ? l.endTie : l.endWin;
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #2D1B4E 0%, #1A3A5C 30%, #1B5E4B 60%, #0F2027 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', serif", padding: 20 }}>
        <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: 24, padding: 36, maxWidth: 440, width: "100%", textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
          <div style={{ fontSize: 52, marginBottom: 8 }}>{pWin ? "🏆" : tie ? "🤝" : "☕"}</div>
          <h2 style={{ color: "#8B6346", fontSize: 26, margin: "0 0 6px" }}>{pWin ? "You Win!" : tie ? "It's a Tie!" : `${OPPONENTS[opp]?.name} Wins!`}</h2>
          <p style={{ color: "#A08060", fontSize: 13, margin: "0 0 16px" }}>{pWin ? "The cafe crowd cheers! 🎉" : tie ? "A perfect match!" : "Better luck next visit!"}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 20, background: "#FFF8F0", borderRadius: 12, padding: "10px 16px", border: "1px solid #F0E0C8" }}>
            <Avatar character={opp} size={36} />
            <div style={{ fontSize: 13, color: "#8B6346", fontStyle: "italic", textAlign: "left" }}>"{endMsg}"</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 20 }}>
            <div><div style={{ fontSize: 30, fontWeight: "bold", color: "#D4A843" }}>{pBoard.score}</div><div style={{ fontSize: 12, color: "#8B7355" }}>You</div></div>
            <div style={{ width: 1, background: "#E0D5C3" }} />
            <div><div style={{ fontSize: 30, fontWeight: "bold", color: "#8B6346" }}>{aiBoard.score}</div><div style={{ fontSize: 12, color: "#8B7355" }}>{OPPONENTS[opp]?.name}</div></div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => startGame(opp)} style={{ background: "linear-gradient(135deg, #D4A843, #C49530)", color: "white", border: "none", padding: "10px 22px", borderRadius: 20, fontSize: 13, fontWeight: "bold", cursor: "pointer", fontFamily: "'Georgia', serif" }}>Play Again</button>
            <button onClick={() => setScreen("menu")} style={{ background: "#F5F0E8", color: "#8B6346", border: "2px solid #E0D5C3", padding: "10px 22px", borderRadius: 20, fontSize: 13, fontWeight: "bold", cursor: "pointer", fontFamily: "'Georgia', serif" }}>New Opponent</button>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "24px 0", fontSize: 11, color: "#5C3D2E", marginTop: 16 }}>
          © {new Date().getFullYear()} Letter Griddle. All rights reserved.
          {' | '}
          <a href="/privacy" style={{ color: "#5C3D2E", textDecoration: "underline" }}>Privacy Policy</a>
          {' | '}
          <a href="/terms" style={{ color: "#5C3D2E", textDecoration: "underline" }}>Terms of Service</a>
        </div>
      </div>
    );
  }

  // ---- GAME ----
  const inScoring = phase === "playerScore" || phase === "playerScoreDone" || phase === "aiScore" || phase === "aiScoreDone" || phase === "roundDone" || phase === "endBonuses";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #2D1B4E 0%, #1A3A5C 20%, #1B5E4B 40%, #183040 60%, #0F2027 100%)", fontFamily: "'Georgia', serif", padding: "10px 6px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 920, margin: "0 auto 6px", padding: "0 4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 18 }}>🥞</span>
          <span style={{ color: "#FFF8F0", fontWeight: "bold", fontSize: 15, textShadow: "1px 1px 4px rgba(0,0,0,0.3)" }}>Cafe Crystals</span>
        </div>
        <div style={{ color: "#FFF8F0", fontSize: 12 }}>Round {round}/5</div>
        <button onClick={() => { setHasSave(true); setScreen("menu"); }} style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", color: "#FFF8F0", padding: "3px 10px", borderRadius: 10, fontSize: 11, cursor: "pointer", fontFamily: "'Georgia', serif" }}>Save & Menu</button>
      </div>

      {/* Message */}
      <div style={{ maxWidth: 920, margin: "0 auto 8px", background: inScoring ? "#FFF3E0" : sel ? (mustTipJar ? "#FFEBEE" : "#FFF8E1") : "#FFFFFF", borderRadius: 10, padding: "8px 14px", textAlign: "center", fontSize: 13, color: mustTipJar ? "#C62828" : "#4E342E", fontWeight: "bold", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", border: sel ? "2px solid #D4A843" : "2px solid #E8D5B7", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap", minHeight: 36 }}>
        <span>{msg || DEFAULT_MSG}</span>
        {sel && <button onClick={() => { setSel(null); setMsg(DEFAULT_MSG); }} style={{ background: "#EEE", border: "none", borderRadius: 6, padding: "2px 8px", fontSize: 10, cursor: "pointer", color: "#888" }}>Cancel</button>}
      </div>

      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        {/* AI Comment */}
        {aiComment && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 auto 8px", background: "rgba(255,255,255,0.9)", borderRadius: 12, padding: "8px 14px", border: "1px solid #E8D5B7", animation: "fadeIn 0.3s ease" }}>
            <Avatar character={opp} size={28} />
            <div style={{ fontSize: 12, color: "#8B6346", fontStyle: "italic" }}>"{aiComment}"</div>
          </div>
        )}

        {/* Scoring phase banner - Player */}
        {(phase === "playerScore" || phase === "playerScoreDone") && (
          <div style={{ margin: "0 auto 8px", background: "white", borderRadius: 12, padding: "14px 18px", border: "2px solid #FFB74D", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: "bold", color: "#E65100", fontSize: 14 }}>☕ Your Scoring</div>
                <div style={{ color: "#5D4037", fontSize: 12, marginTop: 2 }}>
                  {phase === "playerScore" && completedRows.length > 0 
                    ? "Click each glowing row to move its tile to your curio!"
                    : phase === "playerScore" 
                    ? "All rows scored! Click 'Finish Scoring' to check your crystal cache."
                    : "Your scoring is complete. Review below, then score your opponent!"}
                </div>
              </div>
              {phase === "playerScore" && (
                <button onClick={handleFinishPlayerScoring}
                  style={{ background: completedRows.length === 0 ? "linear-gradient(135deg, #D4A843, #C49530)" : "#E0D5C3", color: completedRows.length === 0 ? "white" : "#8B6346", border: "none", padding: "8px 16px", borderRadius: 16, fontSize: 12, fontWeight: "bold", cursor: "pointer", fontFamily: "'Georgia', serif", whiteSpace: "nowrap" }}>
                  {completedRows.length === 0 ? "Finish Scoring →" : `${completedRows.length} row${completedRows.length > 1 ? "s" : ""} left`}
                </button>
              )}
              {phase === "playerScoreDone" && (
                <button onClick={handleStartAIScoring}
                  style={{ background: "linear-gradient(135deg, #D4A843, #C49530)", color: "white", border: "none", padding: "8px 16px", borderRadius: 16, fontSize: 12, fontWeight: "bold", cursor: "pointer", fontFamily: "'Georgia', serif", whiteSpace: "nowrap", animation: "pulse 1.5s infinite" }}>
                  Score {OPPONENTS[opp]?.name} →
                </button>
              )}
            </div>
            {/* Player scoring event log */}
            {playerScoreEvents.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {playerScoreEvents.map((ev, i) => (
                  <div key={i} style={{ background: i === playerScoreEvents.length - 1 ? "#FFF8E1" : "#FAFAFA", borderRadius: 8, padding: "6px 10px", border: i === playerScoreEvents.length - 1 ? "2px solid #4CAF50" : "1px solid #EEE", fontSize: 12, color: ev.type === "penalty" ? "#C62828" : "#4E342E", fontWeight: i === playerScoreEvents.length - 1 ? "bold" : "normal", animation: i === playerScoreEvents.length - 1 ? "fadeIn 0.3s ease" : "none" }}>
                    {ev.type === "wall" && <span style={{ color: "#2E7D32", marginRight: 6 }}>+{ev.points}</span>}
                    {ev.desc}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {phase === "aiScore" && (
          <div style={{ margin: "0 auto 8px", background: "white", borderRadius: 12, padding: "14px 18px", border: "2px solid #E8A54B", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
              <Avatar character={opp} size={26} />
              <span style={{ fontSize: 14, fontWeight: "bold", color: "#5D4037" }}>{OPPONENTS[opp]?.name}'s Scoring</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {aiScoreEvents.slice(0, aiScoreIdx).map((ev, i) => (
                <div key={i} style={{ background: i === aiScoreIdx - 1 ? "#FFF8E1" : "#FAFAFA", borderRadius: 8, padding: "6px 10px", border: i === aiScoreIdx - 1 ? "2px solid #FFB74D" : "1px solid #EEE", fontSize: 12, color: ev.type === "penalty" ? "#C62828" : "#4E342E", fontWeight: i === aiScoreIdx - 1 ? "bold" : "normal", animation: i === aiScoreIdx - 1 ? "fadeIn 0.3s ease" : "none" }}>
                  {ev.desc}
                </div>
              ))}
            </div>
          </div>
        )}

        {phase === "aiScoreDone" && (
          <div style={{ margin: "0 auto 8px", background: "white", borderRadius: 12, padding: "14px 18px", border: "2px solid #E8A54B", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
              <Avatar character={opp} size={26} />
              <span style={{ fontSize: 14, fontWeight: "bold", color: "#5D4037" }}>{OPPONENTS[opp]?.name}'s Scoring</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
              {aiScoreEvents.map((ev, i) => (
                <div key={i} style={{ background: "#FAFAFA", borderRadius: 8, padding: "6px 10px", border: "1px solid #EEE", fontSize: 12, color: ev.type === "penalty" ? "#C62828" : "#4E342E" }}>
                  {ev.desc}
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", fontSize: 12, color: "#8B6346", marginBottom: 8 }}>Take a moment to review {OPPONENTS[opp]?.name}'s board and scores.</div>
            <div style={{ textAlign: "center" }}>
              <button onClick={() => finishRound()} style={{ background: "linear-gradient(135deg, #2E8B57, #3CB371)", color: "white", border: "none", padding: "10px 24px", borderRadius: 16, fontSize: 14, fontWeight: "bold", cursor: "pointer", fontFamily: "'Georgia', serif" }}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {phase === "endBonuses" && (
          <div style={{ margin: "0 auto 8px", background: "linear-gradient(135deg, #FFF8E1, #FFF3E0)", borderRadius: 12, padding: "14px 18px", border: "2px solid #FFB74D", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {endBonusEvents.slice(0, endBonusIdx).map((ev, i) => {
                const isLatest = i === endBonusIdx - 1;
                if (ev.type === "header") return (
                  <div key={i} style={{ textAlign: "center", fontWeight: "bold", color: "#E65100", fontSize: 15, padding: "4px 0", animation: isLatest ? "fadeIn 0.3s ease" : "none" }}>{ev.desc}</div>
                );
                if (ev.type === "subheader") return (
                  <div key={i} style={{ fontWeight: "bold", color: "#5D4037", fontSize: 13, marginTop: 6, animation: isLatest ? "fadeIn 0.3s ease" : "none" }}>{ev.desc}</div>
                );
                if (ev.type === "playerTotal" || ev.type === "aiTotal") return (
                  <div key={i} style={{ background: "#E8F5E9", borderRadius: 8, padding: "6px 10px", border: "2px solid #81C784", fontSize: 13, fontWeight: "bold", color: "#2E7D32", textAlign: "center", animation: isLatest ? "fadeIn 0.3s ease" : "none" }}>{ev.desc}</div>
                );
                if (ev.type === "final") return (
                  <div key={i} style={{ background: "linear-gradient(135deg, #FFF3E0, #FFE0B2)", borderRadius: 8, padding: "8px 10px", border: "2px solid #FF9800", fontSize: 14, fontWeight: "bold", color: "#E65100", textAlign: "center", marginTop: 6, animation: isLatest ? "fadeIn 0.3s ease" : "none" }}>{ev.desc}</div>
                );
                if (ev.type === "crystalFact") return (
                  <div key={i} style={{ background: "linear-gradient(135deg, #E8EAF6, #C5CAE9)", borderRadius: 8, padding: "10px 12px", border: "2px solid #7E57C2", fontSize: 12, color: "#4A148C", textAlign: "center", marginTop: 8, lineHeight: 1.5, animation: isLatest ? "fadeIn 0.3s ease" : "none" }}>{ev.desc}</div>
                );
                return (
                  <div key={i} style={{ background: isLatest ? "#FFF8E1" : "#FAFAFA", borderRadius: 8, padding: "6px 10px", border: isLatest ? "2px solid #FFB74D" : "1px solid #EEE", fontSize: 12, color: ev.type === "player" ? "#1565C0" : "#8B6346", fontWeight: isLatest ? "bold" : "normal", animation: isLatest ? "fadeIn 0.3s ease" : "none" }}>
                    <span style={{ color: "#2E7D32", marginRight: 6 }}>+</span>{ev.desc}
                  </div>
                );
              })}
            </div>
            {endBonusIdx >= endBonusEvents.length && (
              <div style={{ textAlign: "center", marginTop: 12 }}>
                <button onClick={goToGameOver} style={{ background: "linear-gradient(135deg, #D4A843, #C49530)", color: "white", border: "none", padding: "10px 24px", borderRadius: 16, fontSize: 14, fontWeight: "bold", cursor: "pointer", fontFamily: "'Georgia', serif" }}>
                  See Final Results →
                </button>
              </div>
            )}
          </div>
        )}

        {phase === "roundDone" && (
          <div style={{ margin: "0 auto 8px", background: "linear-gradient(135deg, #E8F5E9, #C8E6C9)", borderRadius: 12, padding: "14px 18px", border: "2px solid #81C784", textAlign: "center" }}>
            <div style={{ fontWeight: "bold", color: "#2E7D32", fontSize: 15, marginBottom: 4 }}>✅ Round {round} Complete!</div>
            <div style={{ color: "#5D4037", fontSize: 13, marginBottom: 8 }}>
              You: <strong>{pBoard.score}</strong> — {OPPONENTS[opp]?.name}: <strong>{aiBoard.score}</strong>
              {pBoard.score > aiBoard.score ? " 🎉 You're in the lead!" : pBoard.score < aiBoard.score ? ` — ${OPPONENTS[opp]?.name} leads` : " — Tied!"}
            </div>
            <button onClick={startNextRound} style={{ background: "linear-gradient(135deg, #2E8B57, #3CB371)", color: "white", border: "none", padding: "10px 24px", borderRadius: 16, fontSize: 14, fontWeight: "bold", cursor: "pointer", fontFamily: "'Georgia', serif" }}>
              Next Round →
            </button>
          </div>
        )}

        {/* Scoreboard */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 10, background: "rgba(255,255,255,0.85)", borderRadius: 14, padding: "8px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #D4A843, #E8B870)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>😊</div>
            <div><div style={{ fontSize: 10, color: "#A08060" }}>You</div><div style={{ fontSize: 18, fontWeight: "bold", color: "#D4A843" }}>{pBoard.score}</div></div>
          </div>
          <div style={{ fontSize: 14, color: "#CCC", alignSelf: "center" }}>vs</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Avatar character={opp} size={24} />
            <div><div style={{ fontSize: 10, color: "#A08060" }}>{OPPONENTS[opp]?.name}</div><div style={{ fontSize: 18, fontWeight: "bold", color: "#8B6346" }}>{aiBoard.score}</div></div>
          </div>
        </div>

        {/* Tutorial */}
        {showTut && tutStep === 0 && (
          <div style={{ margin: "0 auto 8px", background: "linear-gradient(135deg, #FFF3E0, #FFE0B2)", borderRadius: 10, padding: "10px 14px", border: "2px solid #FFB74D", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 24 }}>👆</div>
            <div><div style={{ fontWeight: "bold", color: "#E65100", fontSize: 13 }}>Step 1: Pick tiles!</div><div style={{ color: "#8B6346", fontSize: 11 }}>Click any tile on a trinket tray. You'll take ALL tiles of that type.</div></div>
            <button onClick={() => setShowTut(false)} style={{ background: "none", border: "none", color: "#CCC", cursor: "pointer", fontSize: 14, marginLeft: "auto" }}>✕</button>
          </div>
        )}
        {showTut && tutStep === 1 && (
          <div style={{ margin: "0 auto 8px", background: "linear-gradient(135deg, #E8F5E9, #C8E6C9)", borderRadius: 10, padding: "10px 14px", border: "2px solid #81C784", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 24 }}>📋</div>
            <div><div style={{ fontWeight: "bold", color: "#2E7D32", fontSize: 13 }}>Step 2: Place them!</div><div style={{ color: "#33691E", fontSize: 11 }}>Click a highlighted slot on your board. If no row works, click the Crystal Cache.</div></div>
            <button onClick={() => setShowTut(false)} style={{ background: "none", border: "none", color: "#CCC", cursor: "pointer", fontSize: 14, marginLeft: "auto" }}>✕</button>
          </div>
        )}

        {/* Trinket Trays */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 4, opacity: inScoring ? 0.4 : 1, pointerEvents: inScoring ? "none" : "auto" }}>
          {trays.map((tray, fi) => (
            <div key={fi} style={{ background: "rgba(255,255,255,0.9)", borderRadius: 14, padding: 8, minWidth: 86, minHeight: 86, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, alignContent: "center", justifyItems: "center", border: "2px solid #F0E0C8", opacity: turn !== "player" || phase !== "play" ? 0.6 : 1 }}>
              {!tray.length ? <div style={{ gridColumn: "1/3", color: "#CCC", fontSize: 18 }}>·</div> :
                tray.map((t, ti) => <Tile key={ti} type={t} size={34} onClick={turn === "player" && !sel && phase === "play" ? () => handleTrayClick(fi, t) : undefined} selected={sel?.src === "tray" && sel?.fi === fi && sel?.type === t} />)}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", fontSize: 12, color: "#5D4037", fontWeight: "600", marginBottom: 8 }}>☝️ Trinket Trays</div>

        {/* Center */}
        {center.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center", marginBottom: 10, background: "rgba(255,255,255,0.7)", borderRadius: 10, padding: "6px 10px", border: "2px dashed #E0D5C3", opacity: inScoring ? 0.4 : 1 }}>
            <div style={{ width: "100%", textAlign: "center", fontSize: 10, color: "#A08060", marginBottom: 3 }}>Center</div>
            {center.map((t, i) => <Tile key={i} type={t} size={30} onClick={turn === "player" && !sel && phase === "play" ? () => handleCenterClick(t) : undefined} selected={sel?.src === "center" && sel?.type === t} />)}
          </div>
        )}

        {/* Boards side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10, alignItems: "start" }}>
          {/* Player Board */}
          <div style={{ background: "rgba(255,255,255,0.92)", borderRadius: 14, padding: 12, border: (phase === "playerScore" || phase === "playerScoreDone") ? "2px solid #FFB74D" : sel ? "2px solid #D4A843" : "2px solid #E8D5B7" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <div style={{ fontSize: 16 }}>😊</div>
              <div style={{ fontWeight: "bold", color: "#8B6346", fontSize: 13 }}>Your Board</div>
              {sel && <div style={{ marginLeft: "auto", fontSize: 11, color: "#D4A843", fontWeight: "bold", background: "#FFF8E7", padding: "2px 8px", borderRadius: 6 }}>Placing: {sel.count}× {TILE_EMOJI[sel.type]}</div>}
            </div>

            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              {/* Pattern Lines */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {pBoard.patternLines.map((line, rowIdx) => {
                  const canPlace = sel && validLines.includes(rowIdx) && phase === "play";
                  const isCompleted = phase === "playerScore" && completedRows.includes(rowIdx);
                  return (
                    <div key={rowIdx} onClick={canPlace ? () => handleLineClick(rowIdx) : isCompleted ? () => handleScoreRowClick(rowIdx) : undefined}
                      style={{ display: "flex", gap: 2, justifyContent: "flex-end", padding: 3, height: 36, alignItems: "center",
                        cursor: canPlace || isCompleted ? "pointer" : "default",
                        borderRadius: 6, border: "2px solid transparent",
                        background: isCompleted ? "rgba(255,183,77,0.15)" : "transparent",
                      }}>
                      {Array.from({ length: line.size }).map((_, i) => {
                        const ti = line.size - 1 - i;
                        const has = ti < line.tiles.length;
                        const isValidSlot = canPlace && !has;
                        return (
                          <div key={i} style={{
                            width: 30, height: 30, borderRadius: 5,
                            border: isCompleted ? "2px solid #FFB74D" : isValidSlot ? "2px solid #D4A843" : has ? "none" : "2px dashed #DDD",
                            background: isCompleted ? "rgba(255,183,77,0.2)" : isValidSlot ? "rgba(212,168,67,0.15)" : has ? "#FFF8E7" : "rgba(0,0,0,0.02)",
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                            animation: isValidSlot ? "pulse 1.5s infinite" : isCompleted ? "pulse 1s infinite" : "none",
                            boxShadow: isValidSlot ? "0 0 6px rgba(212,168,67,0.3)" : "none",
                          }}>
                            {has ? TILE_EMOJI[line.type] : ""}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Arrows */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} style={{ height: 36, display: "flex", alignItems: "center", color: "#CCC", fontSize: 12, padding: 3 }}>→</div>
                ))}
              </div>

              {/* Cafe Curio */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {pBoard.wall.map((row, rowIdx) => (
                  <div key={rowIdx} style={{ display: "flex", gap: 2, height: 36, alignItems: "center", padding: 3 }}>
                    {row.map((cellType, colIdx) => {
                      const filled = cellType !== null;
                      const isWallTarget = pendingWallRow === rowIdx && pendingWallType && getValidWallCols(pBoard.wall, rowIdx, pendingWallType).includes(colIdx);
                      const justScored = lastScoreEvent && lastScoreEvent.row === rowIdx && lastScoreEvent.col === colIdx;
                      return (
                        <div key={colIdx} onClick={isWallTarget ? () => handleWallColClick(rowIdx, colIdx) : undefined} style={{
                          width: 30, height: 30, borderRadius: 5,
                          border: justScored ? "2px solid #2E7D32" : filled ? `2px solid ${TILE_COLORS[cellType] || "#9C27B0"}` : isWallTarget ? "2px solid #FFD700" : "1px solid rgba(255,255,255,0.15)",
                          background: justScored ? "rgba(46,139,87,0.2)" : filled ? "rgba(255,255,255,0.15)" : isWallTarget ? "rgba(255,215,0,0.25)" : "rgba(255,255,255,0.05)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: filled ? 16 : 11, opacity: filled ? 1 : isWallTarget ? 0.9 : 0.3,
                          boxShadow: justScored ? "0 0 12px rgba(46,139,87,0.4)" : isWallTarget ? "0 0 10px rgba(255,215,0,0.5)" : filled ? "0 1px 4px rgba(0,0,0,0.2)" : "none",
                          cursor: isWallTarget ? "pointer" : "default",
                          transition: "all 0.3s",
                          animation: isWallTarget ? "pulse 1s infinite" : "none",
                        }}>
                          {filled ? TILE_EMOJI[cellType] : isWallTarget ? "✦" : ""}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Crystal Cache */}
            <div onClick={sel ? handleFloorClick : undefined}
              style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, padding: "6px 10px", borderRadius: 8,
                cursor: sel ? "pointer" : "default",
                background: mustTipJar ? "rgba(231,76,94,0.1)" : sel ? "rgba(212,168,67,0.08)" : "transparent",
                border: mustTipJar ? "2px solid #E74C5E" : sel ? "2px dashed #D4A843" : "1px solid transparent",
                animation: mustTipJar ? "pulse 1s infinite" : "none", flexWrap: "wrap",
              }}>
              <span style={{ fontSize: 12, color: mustTipJar ? "#C62828" : "#A08060", fontWeight: mustTipJar ? "bold" : "normal", whiteSpace: "nowrap" }}>💠 Crystal Cache{mustTipJar ? " (click!)" : ":"}</span>
              <div style={{ display: "flex", gap: 2 }}>
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} style={{ width: 22, height: 22, borderRadius: 4, border: pBoard.floorLine[i] ? "none" : "1px dashed #DDD", background: pBoard.floorLine[i] ? "#FFF0D4" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>
                    {pBoard.floorLine[i] ? (pBoard.floorLine[i] === "penalty" ? "⚠️" : TILE_EMOJI[pBoard.floorLine[i]]) : ""}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 9, color: "#BBB" }}>(-1 -1 -2 -2 -2 -3 -3)</span>
            </div>
          </div>

          {/* AI Board */}
          <div style={{ background: "rgba(255,255,255,0.75)", borderRadius: 14, padding: 10, border: phase === "aiScore" ? "2px solid #FFB74D" : "1px solid #E8D5B7", minWidth: 190 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <Avatar character={opp} size={20} />
              <div style={{ fontWeight: "bold", color: "#8B6346", fontSize: 12 }}>{OPPONENTS[opp]?.name}</div>
              {aiThinking && <span style={{ marginLeft: "auto", fontSize: 11, color: "#5C3D2E" }}>🤔</span>}
            </div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end" }}>
                {aiBoard.patternLines.map((line, ri) => (
                  <div key={ri} style={{ display: "flex", gap: 1, height: 26, alignItems: "center" }}>
                    {Array.from({ length: line.size }).map((_, i) => {
                      const ti = line.size - 1 - i; const has = ti < line.tiles.length;
                      return <div key={i} style={{ width: 20, height: 20, borderRadius: 3, border: has ? "none" : "1px dashed #DDD", background: has ? "#FFF0D4" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>{has ? TILE_EMOJI[line.type] : ""}</div>;
                    })}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#DDD", fontSize: 9, gap: 4 }}>
                {Array.from({ length: 5 }).map((_, i) => <div key={i} style={{ height: 26, display: "flex", alignItems: "center" }}>→</div>)}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {aiBoard.wall.map((row, ri) => (
                  <div key={ri} style={{ display: "flex", gap: 1, height: 26, alignItems: "center" }}>
                    {row.map((cellType, ci) => {
                      const filled = cellType !== null;
                      return <div key={ci} style={{ width: 20, height: 20, borderRadius: 3, border: filled ? `1px solid ${TILE_COLORS[cellType] || "#9C27B0"}` : "1px solid rgba(255,255,255,0.15)", background: filled ? "rgba(255,255,255,0.15)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: filled ? 10 : 8, opacity: filled ? 1 : 0.25 }}>{filled ? TILE_EMOJI[cellType] : ""}</div>;
                    })}
                  </div>
                ))}
              </div>
            </div>
            {aiBoard.floorLine.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 4, flexWrap: "wrap" }}>
                <span style={{ fontSize: 9, color: "#A08060" }}>💠</span>
                {aiBoard.floorLine.map((t, i) => <span key={i} style={{ fontSize: 9 }}>{t === "penalty" ? "⚠️" : TILE_EMOJI[t]}</span>)}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } } @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div style={{ position: "fixed", bottom: 14, right: 14 }}>
        <button onClick={() => setShowHTP(true)} style={{ background: "linear-gradient(135deg, #D4A843, #C49530)", color: "white", border: "none", width: 36, height: 36, borderRadius: "50%", fontSize: 16, cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>?</button>
      </div>
      {showHTP && <HTPModal onClose={() => setShowHTP(false)} />}
      <div style={{ textAlign: "center", padding: "24px 0", fontSize: 11, color: "#5C3D2E", marginTop: 16 }}>
        © {new Date().getFullYear()} Letter Griddle. All rights reserved.
        {' | '}
        <a href="/privacy" style={{ color: "#5C3D2E", textDecoration: "underline" }}>Privacy Policy</a>
        {' | '}
        <a href="/terms" style={{ color: "#5C3D2E", textDecoration: "underline" }}>Terms of Service</a>
      </div>
    </div>
  );
}

function HTPModal({ onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: 20, padding: 28, maxWidth: 480, width: "100%", maxHeight: "85vh", overflowY: "auto", position: "relative", fontFamily: "'Georgia', serif" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#999" }}>✕</button>
        <h2 style={{ color: "#8B6346", textAlign: "center", fontSize: 22, marginBottom: 16 }}>How to Play</h2>
        {[
          { icon: "1️⃣", title: "Pick from a Trinket Tray", desc: "Click a crystal to take ALL crystals of that type. Leftovers go to the Center." },
          { icon: "⚠️", title: "Center Penalty", desc: "First player to take from the Center gets a -1 penalty — but goes first next round!" },
          { icon: "2️⃣", title: "Place on a Pattern Row", desc: "Click a highlighted slot. Each row holds ONE crystal type." },
          { icon: "3️⃣", title: "Fill a Row → Place in Curio!", desc: "When a row is full, choose WHERE to place the crystal in your curio. No duplicate types in any row or column!" },
          { icon: "4️⃣", title: "Crystal Cache = Penalties", desc: "Can't place crystals? Send them to the Crystal Cache. Costs -1, -1, -2, -2, -2, -3, -3 points." },
          { icon: "🔄", title: "Take Turns", desc: "Alternate picks until all trays and center are empty. Then score the round!" },
          { icon: "⭐", title: "End Bonuses", desc: "Complete curio row: +2. Complete column: +7. All 5 of one type: +10!" },
          { icon: "🏆", title: "Win!", desc: "5 rounds or a completed curio row ends the game. Highest score wins!" },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: 10, marginBottom: 6, background: "#FFF8F0", borderRadius: 10, border: "1px solid #F0E0C8" }}>
            <div style={{ fontSize: 20, flexShrink: 0 }}>{s.icon}</div>
            <div><div style={{ fontWeight: "bold", color: "#8B6346", fontSize: 13 }}>{s.title}</div><div style={{ color: "#8B7355", fontSize: 12 }}>{s.desc}</div></div>
          </div>
        ))}
        <div style={{ textAlign: "center", marginTop: 12, display: "flex", justifyContent: "center", gap: 6, fontSize: 22 }}>🥞 ☕ 🍯 🧈 🍓</div>
      </div>
    </div>
  );
}
