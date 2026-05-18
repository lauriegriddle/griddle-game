"use client";
import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// LETTER GRIDDLE RADIO — Summer Songs
// Lives at lettergriddle.com/radio
// Format: Letter Griddle (5 words per puzzle, one revealed letter each)
// Theme: Classic summer songs
// ─────────────────────────────────────────────────────────────────────────────

const FONT = "Georgia, serif";
const YEAR = new Date().getFullYear();

// FM frequencies assigned to each puzzle — spread across the dial
const PUZZLE_FREQS = [88.1, 89.3, 90.7, 92.1, 93.5, 95.1, 96.7, 98.3];

const PUZZLES = [
  {
    id: 1, freq: 88.1,
    youtubeUrl: "https://www.youtube.com/results?search_query=The+Boys+of+Summer+Don+Henley",
    song: "The Boys of Summer",
    artist: "Don Henley",
    year: "1984",
    category: "Classic Rock",
    emoji: "🕶️",
    funFact: "The iconic 1984 Don Henley hit was actually turned down by Tom Petty, who felt it was too slow. Henley recorded it himself and it became one of the defining songs of the decade.",
    words: [
      { word: "BOYS",     hint: "Summer is their season",            revealedIndex: 1 },
      { word: "DRIVE",    hint: "What you do on a summer night",     revealedIndex: 2 },
      { word: "SUNSET",   hint: "End of a perfect day",              revealedIndex: 3 },
      { word: "SUNGLASS", hint: "Essential summer accessory",        revealedIndex: 3 },
      { word: "DEADHEAD", hint: "Grateful fan on the road",          revealedIndex: 4 },
    ],
  },
  {
    id: 2, freq: 89.3,
    youtubeUrl: "https://www.youtube.com/results?search_query=Cruel+Summer+Bananarama",
    song: "Cruel Summer",
    artist: "Bananarama",
    year: "1983",
    category: "Pop",
    emoji: "🌡️",
    funFact: "Bananarama's 'Cruel Summer' lyrics were inspired by the band being stuck in London during a rare heatwave while all their friends were on vacation. The misery was real.",
    words: [
      { word: "GONE",     hint: "Everyone you know has done this",   revealedIndex: 1 },
      { word: "CRUEL",    hint: "How this summer feels",             revealedIndex: 2 },
      { word: "VOICES",   hint: "What you hear in your head",        revealedIndex: 3 },
      { word: "BURNING",  hint: "The city is doing this",            revealedIndex: 3 },
      { word: "PAVEMENT", hint: "Hot enough to fry an egg",          revealedIndex: 3 },
    ],
  },
  {
    id: 3, freq: 90.7,
    youtubeUrl: "https://www.youtube.com/results?search_query=Summertime+DJ+Jazzy+Jeff+The+Fresh+Prince",
    song: "Summertime",
    artist: "DJ Jazzy Jeff and The Fresh Prince",
    year: "1991",
    category: "Hip Hop",
    emoji: "🎤",
    funFact: "Written in just two hours during a delayed flight, the track perfectly captures backyard cookouts and neighborhood nostalgia. It won a Grammy for Best Rap Performance.",
    words: [
      { word: "JAZZ",     hint: "One half of this duo",              revealedIndex: 1 },
      { word: "CHILL",    hint: "The vibe of a summer afternoon",    revealedIndex: 2 },
      { word: "PRINCE",   hint: "The Fresh one",                     revealedIndex: 3 },
      { word: "STREETS",  hint: "Where everyone hangs out",         revealedIndex: 3 },
      { word: "BARBECUE", hint: "The backyard centerpiece",          revealedIndex: 3 },
    ],
  },
  {
    id: 4, freq: 92.1,
    youtubeUrl: "https://www.youtube.com/results?search_query=Summer+in+the+City+The+Lovin+Spoonful",
    song: "Summer in the City",
    artist: "The Lovin' Spoonful",
    year: "1966",
    category: "Classic Rock",
    emoji: "🏙️",
    funFact: "Released in 1966, this hit is famous for being one of the first popular songs to use real street sounds -- car horns and jackhammers -- in the recording.",
    words: [
      { word: "CITY",     hint: "Where the heat hits hardest",       revealedIndex: 1 },
      { word: "DIRTY",    hint: "How summer streets feel",           revealedIndex: 3 },
      { word: "GRITTY",   hint: "Urban summer texture",              revealedIndex: 3 },
      { word: "ALRIGHT",  hint: "At night everything is this",       revealedIndex: 2 },
      { word: "SIDEWALK", hint: "Hot enough to feel through shoes",  revealedIndex: 3 },
    ],
  },
  {
    id: 5, freq: 93.5,
    youtubeUrl: "https://www.youtube.com/results?search_query=Sunny+Afternoon+The+Kinks",
    song: "Sunny Afternoon",
    artist: "The Kinks",
    year: "1966",
    category: "British Invasion",
    emoji: "🌤️",
    funFact: "A masterful mix of upbeat music and satirical lyrics, Sunny Afternoon became an iconic summer anthem and served as the perfect soundtrack to England's 1966 World Cup win.",
    words: [
      { word: "HOME",     hint: "Where you want to stay all day",    revealedIndex: 1 },
      { word: "YACHT",    hint: "The rich man's summer toy",         revealedIndex: 2 },
      { word: "TAXMAN",   hint: "The villain of this story",         revealedIndex: 3 },
      { word: "SQUEEZE",  hint: "What the taxman does to you",       revealedIndex: 3 },
      { word: "PLEASANT", hint: "The afternoon most definitely is",  revealedIndex: 2 },
    ],
  },
  {
    id: 6, freq: 95.1,
    youtubeUrl: "https://www.youtube.com/results?search_query=Wipe+Out+The+Surfaris",
    song: "Wipe Out",
    artist: "The Surfaris",
    year: "1963",
    category: "Surf Rock",
    emoji: "🥁",
    funFact: "Wipe Out by The Surfaris was created entirely by accident in about 15 minutes. The iconic rapid-fire drum solo was played by drummer Ron Wilson, who was a senior in high school at the time.",
    words: [
      { word: "DRUM",     hint: "The instrument that made this song famous",  revealedIndex: 2 },
      { word: "LAUGH",    hint: "What the creepy voice does at the start",    revealedIndex: 2 },
      { word: "SCHOOL",   hint: "Where Ron Wilson still was when he recorded", revealedIndex: 3 },
      { word: "TEENAGE",  hint: "Age of the musicians who made this",         revealedIndex: 3 },
      { word: "BREAKING", hint: "What surfers do when they wipe out",         revealedIndex: 4 },
    ],
  },
  {
    id: 7, freq: 96.7,
    youtubeUrl: "https://www.youtube.com/results?search_query=Summer+Nights+Grease+soundtrack",
    song: "Summer Nights",
    artist: "Olivia Newton-John and John Travolta",
    year: "1978",
    category: "Soundtrack",
    emoji: "🎬",
    funFact: "The iconic Grease duet Summer Nights was actually written for the Broadway adaptation of Grease, not the original stage show. It became one of the most recognizable summer songs ever recorded.",
    words: [
      { word: "DUET",    hint: "Two voices, one unforgettable song",       revealedIndex: 2 },
      { word: "FLING",   hint: "A summer romance by another name",         revealedIndex: 2 },
      { word: "GREASE",  hint: "The movie this song is from",              revealedIndex: 3 },
      { word: "FIFTIES", hint: "The decade the story is set in",           revealedIndex: 3 },
      { word: "ROMANCE", hint: "What happened at the beach that summer",   revealedIndex: 3 },
    ],
  },
  {
    id: 8, freq: 98.3,
    youtubeUrl: "https://www.youtube.com/results?search_query=Surfin+USA+The+Beach+Boys",
    song: "Surfin' U.S.A.",
    artist: "The Beach Boys",
    year: "1963",
    category: "Surf Rock",
    emoji: "🏄",
    funFact: "Driven by Carl Wilson's Chuck Berry-inspired guitar riffs and a melody celebrating coast-to-coast surf culture, Surfin' U.S.A. cemented The Beach Boys as legends of the surf-rock genre.",
    words: [
      { word: "WAVE",     hint: "What every surfer is chasing",            revealedIndex: 2 },
      { word: "COAST",    hint: "Where the Beach Boys called home",        revealedIndex: 2 },
      { word: "SUNTAN",   hint: "The reward for a day at the beach",       revealedIndex: 3 },
      { word: "WAXING",   hint: "What you do to a surfboard before paddling out", revealedIndex: 3 },
      { word: "PARADISE", hint: "What surfers call the perfect beach",     revealedIndex: 4 },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// WEB AUDIO — Beach Radio Soundscape (ice cream truck + distant radio)
// ─────────────────────────────────────────────────────────────────────────────
const TRUCK_NOTES  = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
const TRUCK_MELODY = [
  [2,0.5],[4,0.5],[2,0.5],[0,0.5],[2,0.5],[4,0.5],[5,1.0],
  [4,0.5],[3,0.5],[2,0.5],[1,0.5],[0,1.5],
  [3,0.5],[2,0.5],[3,0.5],[4,0.5],[2,0.5],[0,0.5],[1,0.5],[2,0.5],[0,2.0],
];
const TRUCK_TOTAL = TRUCK_MELODY.reduce((s,n) => s+n[1], 0);

const RADIO_NOTES  = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88];
const RADIO_MELODY = [
  [4,0.5],[4,0.25],[5,0.25],[4,0.5],[2,0.5],[0,1.0],
  [5,0.5],[5,0.25],[6,0.25],[5,0.5],[4,0.5],[2,1.0],
  [4,0.5],[2,0.5],[0,0.5],[2,0.5],[4,0.5],[5,0.5],[4,1.0],
  [2,0.5],[4,0.5],[5,0.5],[4,0.25],[2,0.25],[0,2.0],
];
const RADIO_TOTAL = RADIO_MELODY.reduce((s,n) => s+n[1], 0);

function useRadioSound() {
  const ctxRef       = useRef(null);
  const activeRef    = useRef({ truck:false, radio:false });
  const volRef       = useRef({ truck:0.45, radio:0.4 });
  const truckGainRef = useRef(null);
  const radioGainRef = useRef(null);
  const truckTimRef  = useRef(null);
  const radioTimRef  = useRef(null);
  const allOscsRef   = useRef([]);

  async function getCtx() {
    if (!ctxRef.current)
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    if (ctxRef.current.state === "suspended") await ctxRef.current.resume();
    return ctxRef.current;
  }

  function trackOsc(osc) {
    allOscsRef.current.push(osc);
    if (allOscsRef.current.length > 200) allOscsRef.current = allOscsRef.current.slice(-80);
  }

  function killAllOscs() {
    allOscsRef.current.forEach(o => { try { o.stop(); } catch(e){} });
    allOscsRef.current = [];
  }

  async function startTruck() {
    const c = await getCtx();
    const master = c.createGain();
    master.gain.value = volRef.current.truck * 0.5;
    master.connect(c.destination);
    truckGainRef.current = master;
    playTruckLoop(c, master, c.currentTime + 0.3);
  }

  function truckNote(c, master, freq, time, dur) {
    [-4, 0, 4].forEach((det, i) => {
      const osc = c.createOscillator(); const g = c.createGain();
      osc.type = "sine"; osc.frequency.value = freq; osc.detune.value = det;
      const amp = i===1 ? 0.55 : 0.2;
      const decay = Math.min(dur*0.9, 0.9);
      g.gain.setValueAtTime(0, time);
      g.gain.linearRampToValueAtTime(amp, time+0.01);
      g.gain.exponentialRampToValueAtTime(amp*0.4, time+decay*0.3);
      g.gain.exponentialRampToValueAtTime(0.0001, time+decay);
      osc.connect(g); g.connect(master);
      trackOsc(osc); osc.start(time); osc.stop(time+decay+0.05);
    });
  }

  function playTruckLoop(c, master, startTime) {
    if (!activeRef.current.truck || !truckGainRef.current) return;
    const tempo = 0.38; let t = startTime;
    TRUCK_MELODY.forEach(([ni, beats]) => { truckNote(c, master, TRUCK_NOTES[ni], t, beats*tempo); t += beats*tempo; });
    truckTimRef.current = setTimeout(() => {
      if (activeRef.current.truck && truckGainRef.current)
        playTruckLoop(c, truckGainRef.current, c.currentTime+0.2);
    }, (TRUCK_TOTAL*tempo + 4.0 + Math.random()*3) * 1000);
  }

  function stopTruck() {
    clearTimeout(truckTimRef.current);
    if (truckGainRef.current && ctxRef.current) {
      try { truckGainRef.current.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.02); } catch(e){}
      const g = truckGainRef.current;
      setTimeout(() => { try { g.disconnect(); } catch(e){} }, 250);
    }
    truckGainRef.current = null;
  }

  async function startRadio() {
    const c = await getCtx();
    const master = c.createGain();
    master.gain.value = volRef.current.radio * 0.45;
    master.connect(c.destination);
    radioGainRef.current = master;
    const lpf = c.createBiquadFilter();
    lpf.type = "lowpass"; lpf.frequency.value = 1800; lpf.Q.value = 0.7;
    lpf.connect(master);
    radioGainRef._lpf = lpf;
    playRadioLoop(c, lpf, c.currentTime + 1.0);
  }

  function radioNote(c, dest, freq, time, dur) {
    [{ type:"sine", amp:0.5 }, { type:"triangle", amp:0.15 }].forEach(({ type, amp }) => {
      const osc = c.createOscillator(); const g = c.createGain();
      osc.type = type; osc.frequency.value = freq;
      const decay = Math.min(dur*0.85, 1.1);
      g.gain.setValueAtTime(0, time);
      g.gain.linearRampToValueAtTime(amp, time+0.02);
      g.gain.exponentialRampToValueAtTime(amp*0.35, time+decay*0.4);
      g.gain.exponentialRampToValueAtTime(0.0001, time+decay);
      osc.connect(g); g.connect(dest);
      trackOsc(osc); osc.start(time); osc.stop(time+decay+0.05);
    });
  }

  function playRadioLoop(c, lpf, startTime) {
    if (!activeRef.current.radio || !radioGainRef.current) return;
    const tempo = 0.52; let t = startTime;
    RADIO_MELODY.forEach(([ni, beats]) => { radioNote(c, lpf, RADIO_NOTES[ni], t, beats*tempo); t += beats*tempo; });
    radioTimRef.current = setTimeout(() => {
      if (activeRef.current.radio && radioGainRef.current && radioGainRef._lpf)
        playRadioLoop(c, radioGainRef._lpf, c.currentTime+0.1);
    }, (RADIO_TOTAL*tempo + 1.5) * 1000);
  }

  function stopRadio() {
    clearTimeout(radioTimRef.current);
    if (radioGainRef.current && ctxRef.current) {
      try { radioGainRef.current.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.02); } catch(e){}
      const g = radioGainRef.current;
      setTimeout(() => { try { g.disconnect(); } catch(e){} }, 250);
    }
    radioGainRef.current = null; radioGainRef._lpf = null;
  }

  function setLayerOn(name, on) {
    if (on) {
      activeRef.current[name] = true;
      if (name === "truck") startTruck();
      if (name === "radio") startRadio();
    } else {
      activeRef.current[name] = false;
      const gRef = name === "truck" ? truckGainRef : radioGainRef;
      if (gRef.current && ctxRef.current) {
        try { gRef.current.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.02); } catch(e){}
      }
      killAllOscs();
      if (name === "truck") stopTruck();
      if (name === "radio") stopRadio();
    }
  }

  function setLayerVol(name, val) {
    volRef.current[name] = val;
    const mult = name === "truck" ? 0.5 : 0.45;
    const gRef = name === "truck" ? truckGainRef : radioGainRef;
    if (gRef.current) gRef.current.gain.value = val * mult;
  }

  function stopAll() {
    [truckGainRef, radioGainRef].forEach(r => {
      if (r.current && ctxRef.current) {
        try { r.current.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.01); } catch(e){}
      }
    });
    activeRef.current = { truck:false, radio:false };
    clearTimeout(truckTimRef.current); clearTimeout(radioTimRef.current);
    killAllOscs(); stopTruck(); stopRadio();
  }

  return { setLayerOn, setLayerVol, stopAll };
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function shuffleArr(a) {
  const r = [...a];
  for (let i = r.length-1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [r[i],r[j]] = [r[j],r[i]];
  }
  return r;
}

function initWordState(puzzle) {
  return puzzle.words.map(w => {
    const placed = Array(w.word.length).fill("");
    placed[w.revealedIndex] = w.word[w.revealedIndex];
    const available = w.word.split("").filter((_,i) => i !== w.revealedIndex).sort();
    return { placed, available, complete: false, celebrating: false };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function LetterGriddleRadio() {
  const [screen,       setScreen]       = useState("tuner"); // "tuner" | "game"
  const [tunedIdx,     setTunedIdx]     = useState(null);    // which station is tuned
  const [tunerStatic,  setTunerStatic]  = useState(false);   // brief static flash
  const knobDegRef                      = useRef({});        // knob rotation angles
  const [puzzleIdx,    setPuzzleIdx]    = useState(0);
  const [wordStates,   setWordStates]   = useState(() => initWordState(PUZZLES[0]));
  const [selLetter,    setSelLetter]    = useState(null);   // { wordIdx, letterIdx }
  const [selSlot,      setSelSlot]      = useState(null);   // { wordIdx, slotIdx }
  const [hintsOpen,    setHintsOpen]    = useState([]);
  const [allDone,      setAllDone]      = useState(false);
  const [startTime,    setStartTime]    = useState(Date.now());
  const [elapsed,      setElapsed]      = useState(null);
  const [confetti,     setConfetti]     = useState([]);
  const [showFunFact,  setShowFunFact]  = useState(false);
  const [showHow,      setShowHow]      = useState(false);
  const [showWelcome,  setShowWelcome]  = useState(false); // set after mount via localStorage check
  const [showSound,    setShowSound]    = useState(false);
  const [soundLayers,  setSoundLayers]  = useState({ truck:false, radio:false });
  const [soundVols,    setSoundVols]    = useState({ truck:45, radio:40 });
  const [copyMsg,      setCopyMsg]      = useState(false);
  const [stats,        setStats]        = useState(() => {
    if (typeof window === "undefined") return { solved:0, fastest:null };
    try { return JSON.parse(localStorage.getItem("radioStats") || "{}") || { solved:0, fastest:null }; }
    catch { return { solved:0, fastest:null }; }
  });

  const sound    = useRadioSound();
  const soundRef = useRef(sound);

  // Show welcome modal on first visit only
  useEffect(() => {
    try {
      if (!localStorage.getItem("radioWelcome_v3")) {
        setShowWelcome(true);
      }
    } catch(e) {}
  }, []);

  function dismissWelcome() {
    setShowWelcome(false);
    try { localStorage.setItem("radioWelcome_v3", "1"); } catch(e) {}
  }
  const puzzle   = PUZZLES[puzzleIdx];

  // Toggle sound layer
  function toggleSound(name) {
    setSoundLayers(prev => {
      const next = !prev[name];
      soundRef.current.setLayerOn(name, next);
      return { ...prev, [name]:next };
    });
  }
  function setSoundVol(name, val) {
    setSoundVols(prev => ({ ...prev, [name]:val }));
    soundRef.current.setLayerVol(name, val/100);
  }

  // Check all words done
  useEffect(() => {
    if (wordStates.every(ws => ws.complete) && !allDone) {
      const secs = Math.round((Date.now() - startTime) / 1000);
      setElapsed(secs);
      setAllDone(true);
      const newStats = {
        solved: (stats.solved||0) + 1,
        fastest: stats.fastest ? Math.min(stats.fastest, secs) : secs,
      };
      setStats(newStats);
      try { localStorage.setItem("radioStats", JSON.stringify(newStats)); } catch(e){}
      launchConfetti();
      setTimeout(() => setShowFunFact(true), 800);
    }
  }, [wordStates, allDone]);

  function launchConfetti() {
    const colors = ["#fde68a","#f9a8d4","#86efac","#7dd3fc","#c4b5fd","#fb923c","#fbbf24"];
    setConfetti(Array.from({length:60}, (_,i) => ({
      id:i, x:Math.random()*100,
      color:colors[i%colors.length],
      dur:`${1+Math.random()*1.5}s`,
      delay:`${Math.random()*0.6}s`,
      rot:Math.random()*360,
      size:6+Math.random()*7,
    })));
    setTimeout(() => setConfetti([]), 3500);
  }

  // Letter click from bank
  function clickLetter(wordIdx, letterIdx) {
    if (selSlot !== null && selSlot.wordIdx === wordIdx) {
      // Place into selected slot
      placeIntoSlot(wordIdx, selSlot.slotIdx, letterIdx);
      setSelSlot(null);
      return;
    }
    setSelLetter(prev =>
      prev?.wordIdx === wordIdx && prev?.letterIdx === letterIdx ? null : { wordIdx, letterIdx }
    );
    setSelSlot(null);
  }

  // Slot click
  function clickSlot(wordIdx, slotIdx) {
    const ws = wordStates[wordIdx];
    if (ws.complete) return;
    if (slotIdx === puzzle.words[wordIdx].revealedIndex) return;

    const hasFilled = ws.placed[slotIdx] !== "";

    if (hasFilled) {
      // Return letter to bank
      const letter = ws.placed[slotIdx];
      setWordStates(prev => prev.map((s, wi) => {
        if (wi !== wordIdx) return s;
        const placed = [...s.placed]; placed[slotIdx] = "";
        const available = [...s.available, letter].sort();
        return { ...s, placed, available };
      }));
      setSelLetter(null); setSelSlot(null);
      return;
    }

    if (selLetter !== null && selLetter.wordIdx === wordIdx) {
      placeIntoSlot(wordIdx, slotIdx, selLetter.letterIdx);
      setSelLetter(null); setSelSlot(null);
      return;
    }

    setSelSlot(prev =>
      prev?.wordIdx === wordIdx && prev?.slotIdx === slotIdx ? null : { wordIdx, slotIdx }
    );
    setSelLetter(null);
  }

  function placeIntoSlot(wordIdx, slotIdx, letterIdx) {
    setWordStates(prev => prev.map((s, wi) => {
      if (wi !== wordIdx) return s;
      const available = [...s.available];
      const letter = available[letterIdx];
      available.splice(letterIdx, 1);
      const placed = [...s.placed];
      placed[slotIdx] = letter;
      const complete = placed.join("") === puzzle.words[wi].word;
      return { ...s, placed, available, complete,
        celebrating: complete ? true : s.celebrating };
    }));
    if (wordStates[wordIdx].celebrating) return;
    // Brief celebration then settle
    setTimeout(() => {
      setWordStates(prev => prev.map((s, wi) =>
        wi === wordIdx ? { ...s, celebrating:false } : s
      ));
    }, 1000);
  }

  // Shuffle bank for a word
  function shuffleWord(wordIdx) {
    setWordStates(prev => prev.map((s, wi) =>
      wi === wordIdx ? { ...s, available:shuffleArr(s.available) } : s
    ));
  }

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (allDone || showHow || showSound || showFunFact) return;
      const key = e.key.toUpperCase();
      if (key === "BACKSPACE") {
        // Remove last placed letter from first incomplete word
        const wi = wordStates.findIndex(ws => !ws.complete);
        if (wi === -1) return;
        const ws = wordStates[wi];
        const lastFilled = ws.placed.map((l,i) => l && i !== puzzle.words[wi].revealedIndex ? i : -1)
          .filter(i => i >= 0).pop();
        if (lastFilled !== undefined) {
          const letter = ws.placed[lastFilled];
          setWordStates(prev => prev.map((s, i) => {
            if (i !== wi) return s;
            const placed = [...s.placed]; placed[lastFilled] = "";
            return { ...s, placed, available:[...s.available, letter].sort() };
          }));
        }
        return;
      }
      if (/^[A-Z]$/.test(key)) {
        const wi = wordStates.findIndex(ws => !ws.complete);
        if (wi === -1) return;
        const ws = wordStates[wi];
        const li = ws.available.indexOf(key);
        if (li === -1) return;
        const si = ws.placed.findIndex((l, i) => l === "" && i !== puzzle.words[wi].revealedIndex);
        if (si === -1) return;
        placeIntoSlot(wi, si, li);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [wordStates, allDone, showHow, showSound, showFunFact]);

  function nextPuzzle() {
    const next = (puzzleIdx + 1) % PUZZLES.length;
    setPuzzleIdx(next);
    setWordStates(initWordState(PUZZLES[next]));
    setSelLetter(null); setSelSlot(null);
    setHintsOpen([]);
    setAllDone(false); setElapsed(null);
    setShowFunFact(false); setConfetti([]);
    setStartTime(Date.now());
  }

  async function doShare() {
    const mins = Math.floor((elapsed||0)/60);
    const secs = (elapsed||0)%60;
    const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    const hintCount = hintsOpen.filter(h => wordStates[h]?.complete !== undefined).length;
    const text = [
      `📻 Letter Griddle Radio`,
      `🎵 "${puzzle.song}" by ${puzzle.artist}`,
      ``,
      `✅ Solved in ${timeStr}!`,
      hintCount > 0 ? `🏐 Used ${hintCount} hint${hintCount>1?"s":""}` : `🌟 No hints!`,
      ``,
      `lettergriddle.com/radio`,
      `More Letter Griddle games: lettergriddle.com`,
    ].join("\n");
    if (navigator.share) {
      try { await navigator.share({ title:"Letter Griddle Radio", text }); return; }
      catch(e) { if (e.name==="AbortError") return; }
    }
    try { await navigator.clipboard.writeText(text); } catch(e){}
    setCopyMsg(true);
    setTimeout(() => setCopyMsg(false), 2500);
  }

  // ── TUNER FUNCTIONS ─────────────────────────────────────────────────────
  function tuneToStation(idx) {
    setTunerStatic(true);
    // Rotate tune knob toward new station
    const dir = tunedIdx === null ? 1 : (idx > tunedIdx ? 1 : -1);
    knobDegRef.current.tune = (knobDegRef.current.tune || 0) + dir * 55;
    setTimeout(() => {
      setTunedIdx(idx);
      setTunerStatic(false);
    }, 280);
  }

  function stepStation(dir) {
    const next = tunedIdx === null
      ? (dir > 0 ? 0 : PUZZLES.length - 1)
      : (tunedIdx + dir + PUZZLES.length) % PUZZLES.length;
    tuneToStation(next);
  }

  function rotateKnob(id, amt = 45) {
    knobDegRef.current[id] = (knobDegRef.current[id] || 0) + amt;
    // Force re-render for knob visual
    setTunedIdx(t => t); // tiny nudge
  }

  function launchPuzzle() {
    if (tunedIdx === null) return;
    const idx = tunedIdx;
    setPuzzleIdx(idx);
    setWordStates(initWordState(PUZZLES[idx]));
    setSelLetter(null); setSelSlot(null);
    setHintsOpen([]); setAllDone(false);
    setElapsed(null); setShowFunFact(false);
    setConfetti([]); setStartTime(Date.now());
    setScreen("game");
  }

  // ── TUNER SCREEN ────────────────────────────────────────────────────────
  const MIN_F = 88, MAX_F = 108;
  const freqPct = (f) => ((f - MIN_F) / (MAX_F - MIN_F)) * 100;
  const tunedPuzzle = tunedIdx !== null ? PUZZLES[tunedIdx] : null;

  const TunerScreen = () => (
    <div style={{ maxWidth:440, margin:"0 auto", padding:"0 0 32px" }}>

      {/* Radio body */}
      <div style={{
        background:"linear-gradient(160deg,#2c2825,#1a1714,#2c2825)",
        borderRadius:22, border:"2px solid #6b5e52",
        padding:"18px 16px 18px", marginBottom:14,
        boxShadow:"0 10px 40px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.06)",
        position:"relative",
      }}>
        {/* Brushed metal lines */}
        <div style={{ position:"absolute", inset:0, borderRadius:20, pointerEvents:"none",
          backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.008) 3px,rgba(255,255,255,0.008) 6px)" }} />

        {/* Brand badge */}
        <p style={{ textAlign:"center", fontSize:9, letterSpacing:".25em", textTransform:"uppercase",
          color:"rgba(251,191,36,0.35)", fontFamily:"sans-serif", marginBottom:12 }}>
          <span style={{ border:"1px solid rgba(251,191,36,0.18)", padding:"2px 12px", borderRadius:99 }}>
            GRIDDLE FM &bull; STEREO
          </span>
        </p>

        {/* Display window */}
        <div style={{
          background:"#050a05", borderRadius:10, border:"2px solid #3d3530",
          padding:"10px 14px 12px", marginBottom:14, position:"relative", overflow:"hidden",
          boxShadow:"inset 0 3px 12px rgba(0,0,0,0.9)",
        }}>
          {/* Amber glow overlay */}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,rgba(251,191,36,0.03),rgba(251,191,36,0.13))", pointerEvents:"none" }} />
          {/* Scanline sweep */}
          <div style={{ position:"absolute", top:0, left:"-110%", width:"200%", height:"100%",
            background:"linear-gradient(90deg,transparent 30%,rgba(251,191,36,0.05) 50%,transparent 70%)",
            animation:"radioScan 4s linear infinite", pointerEvents:"none" }} />

          {/* Frequency readout */}
          <div style={{ fontFamily:"'Courier New',monospace", fontSize:28, fontWeight:700,
            color:"#fbbf24", textAlign:"center", letterSpacing:4,
            textShadow:"0 0 14px rgba(251,191,36,0.8),0 0 30px rgba(251,191,36,0.3)",
            marginBottom:6 }}>
            {tunedPuzzle ? tunedPuzzle.freq.toFixed(1) : "--.-"}
            <span style={{ fontSize:12, letterSpacing:2, verticalAlign:"super" }}> FM</span>
          </div>

          {/* Song display */}
          <div style={{ textAlign:"center", minHeight:38, display:"flex", flexDirection:"column", justifyContent:"center" }}>
            {tunerStatic ? (
              <p style={{ fontSize:13, color:"rgba(251,191,36,0.25)", fontFamily:"'Courier New',monospace",
                letterSpacing:3, animation:"radioStatic 0.3s ease-in-out infinite" }}>
                -- TUNING --
              </p>
            ) : tunedPuzzle ? (
              <>
                <p style={{ fontSize:14, color:"#fde68a", fontWeight:600, fontFamily:FONT,
                  animation:"radioFadeIn 0.35s ease-out" }}>
                  "{tunedPuzzle.song}"
                </p>
                <p style={{ fontSize:11, color:"rgba(251,191,36,0.55)", fontFamily:"sans-serif",
                  marginTop:2, animation:"radioFadeIn 0.35s ease-out 0.1s both" }}>
                  {tunedPuzzle.artist} ({tunedPuzzle.year})
                </p>
              </>
            ) : (
              <p style={{ fontSize:12, color:"rgba(251,191,36,0.2)", fontFamily:"'Courier New',monospace",
                letterSpacing:3 }}>
                -- SCAN FOR STATIONS --
              </p>
            )}
          </div>

          {/* Signal LEDs */}
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"center", gap:2, marginTop:8 }}>
            {[[6,"#22c55e"],[10,"#22c55e"],[14,"#22c55e"],[10,"#fbbf24"],[6,"#ef4444"]].map(([h,c],i) => (
              <div key={i} style={{ width:5, height:h, borderRadius:1, background:c,
                opacity:tunedPuzzle && !tunerStatic ? (i===3?0.65:i===4?0.3:0.9) : 0.15,
                transition:"opacity 0.3s" }} />
            ))}
          </div>
        </div>

        {/* Frequency band */}
        <div style={{ marginBottom:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", padding:"0 4px", marginBottom:4 }}>
            {["88","92","96","100","104","108"].map(f => (
              <span key={f} style={{ fontSize:9, color:"rgba(251,191,36,0.35)",
                fontFamily:"'Courier New',monospace" }}>{f}</span>
            ))}
          </div>
          <div
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct  = (e.clientX - rect.left) / rect.width;
              const freq = MIN_F + pct * (MAX_F - MIN_F);
              let nearest = 0, nearestD = Infinity;
              PUZZLES.forEach((p, i) => {
                const d = Math.abs(p.freq - freq);
                if (d < nearestD) { nearestD = d; nearest = i; }
              });
              tuneToStation(nearest);
            }}
            style={{ height:32, background:"#0a0a0a", borderRadius:4,
              border:"1px solid #3d3530", position:"relative", cursor:"pointer", overflow:"hidden",
              boxShadow:"inset 0 2px 6px rgba(0,0,0,0.8)" }}>
            {/* Tick marks */}
            <div style={{ position:"absolute", inset:0, pointerEvents:"none",
              backgroundImage:"repeating-linear-gradient(90deg,rgba(251,191,36,0.18) 0,rgba(251,191,36,0.18) 1px,transparent 1px,transparent 10%),repeating-linear-gradient(90deg,rgba(251,191,36,0.07) 0,rgba(251,191,36,0.07) 1px,transparent 1px,transparent 5%)" }} />
            {/* Needle */}
            <div style={{
              position:"absolute", top:-4, bottom:-4, width:3,
              background:"linear-gradient(180deg,#fbbf24,#f59e0b,#fbbf24)",
              borderRadius:2, boxShadow:"0 0 8px rgba(251,191,36,0.9),0 0 16px rgba(251,191,36,0.4)",
              left: tunedPuzzle ? `${freqPct(tunedPuzzle.freq)}%` : "2%",
              transform:"translateX(-50%)",
              transition:"left 0.22s cubic-bezier(0.34,1.56,0.64,1)",
              pointerEvents:"none", zIndex:3,
            }}>
              <div style={{ position:"absolute", top:-2, left:"50%", transform:"translateX(-50%)",
                borderLeft:"5px solid transparent", borderRight:"5px solid transparent",
                borderTop:"6px solid #fbbf24" }} />
            </div>
            {/* Station dots */}
            {PUZZLES.map((p, i) => (
              <div key={i}
                onClick={e => { e.stopPropagation(); tuneToStation(i); }}
                style={{
                  position:"absolute", top:"50%",
                  left:`${freqPct(p.freq)}%`,
                  transform:"translate(-50%,-50%)",
                  width: tunedIdx===i ? 13 : 9,
                  height: tunedIdx===i ? 13 : 9,
                  borderRadius:"50%",
                  border:`2px solid ${tunedIdx===i ? "#fbbf24" : "rgba(251,191,36,0.4)"}`,
                  background: tunedIdx===i ? "#fbbf24" : "rgba(251,191,36,0.1)",
                  boxShadow: tunedIdx===i ? "0 0 10px #fbbf24" : "none",
                  transition:"all 0.22s",
                  cursor:"pointer", zIndex:2,
                }} />
            ))}
          </div>
        </div>

        {/* Knobs row */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 }}>
          {/* Volume knob */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
            <div onClick={() => rotateKnob("vol")} style={{
              width:40, height:40, borderRadius:"50%", cursor:"pointer",
              background:"radial-gradient(circle at 33% 30%,#8a7a72,#3d3530,#1a1714)",
              border:"2px solid #4d4440", position:"relative",
              boxShadow:"0 4px 10px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.08)",
              transform:`rotate(${knobDegRef.current.vol || 0}deg)`, transition:"transform 0.15s",
            }}>
              <div style={{ position:"absolute", top:5, left:"50%", transform:"translateX(-50%)",
                width:2, height:10, background:"#fbbf24", borderRadius:99,
                boxShadow:"0 0 5px #fbbf24" }} />
            </div>
            <span style={{ fontSize:8, color:"rgba(251,191,36,0.4)", fontFamily:"sans-serif",
              textTransform:"uppercase", letterSpacing:".08em" }}>Vol</span>
          </div>

          {/* Center: prev / tune knob / next */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <button onClick={() => stepStation(-1)} style={{
                width:36, height:30, borderRadius:8, border:"1px solid #4d4440",
                background:"linear-gradient(180deg,#4d4440,#2c2825)",
                color:"rgba(251,191,36,0.75)", fontSize:13, cursor:"pointer",
                boxShadow:"0 2px 4px rgba(0,0,0,0.4)", fontFamily:"sans-serif",
              }}>&#9664;&#9664;</button>
              <div onClick={() => { rotateKnob("tune", 50); stepStation(1); }} style={{
                width:54, height:54, borderRadius:"50%", cursor:"pointer",
                background:"radial-gradient(circle at 33% 30%,#8a7a72,#3d3530,#1a1714)",
                border:"2px solid #4d4440", position:"relative",
                boxShadow:"0 4px 12px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.08)",
                transform:`rotate(${knobDegRef.current.tune || 0}deg)`, transition:"transform 0.2s",
              }}>
                <div style={{ position:"absolute", top:6, left:"50%", transform:"translateX(-50%)",
                  width:2, height:13, background:"#fbbf24", borderRadius:99,
                  boxShadow:"0 0 6px #fbbf24" }} />
              </div>
              <button onClick={() => stepStation(1)} style={{
                width:36, height:30, borderRadius:8, border:"1px solid #4d4440",
                background:"linear-gradient(180deg,#4d4440,#2c2825)",
                color:"rgba(251,191,36,0.75)", fontSize:13, cursor:"pointer",
                boxShadow:"0 2px 4px rgba(0,0,0,0.4)", fontFamily:"sans-serif",
              }}>&#9654;&#9654;</button>
            </div>
            <span style={{ fontSize:8, color:"rgba(251,191,36,0.4)", fontFamily:"sans-serif",
              textTransform:"uppercase", letterSpacing:".08em" }}>Tune</span>
          </div>

          {/* Bass knob */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
            <div onClick={() => rotateKnob("bass")} style={{
              width:40, height:40, borderRadius:"50%", cursor:"pointer",
              background:"radial-gradient(circle at 33% 30%,#8a7a72,#3d3530,#1a1714)",
              border:"2px solid #4d4440", position:"relative",
              boxShadow:"0 4px 10px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.08)",
              transform:`rotate(${knobDegRef.current.bass || 0}deg)`, transition:"transform 0.15s",
            }}>
              <div style={{ position:"absolute", top:5, left:"50%", transform:"translateX(-50%)",
                width:2, height:10, background:"#fbbf24", borderRadius:99,
                boxShadow:"0 0 5px #fbbf24" }} />
            </div>
            <span style={{ fontSize:8, color:"rgba(251,191,36,0.4)", fontFamily:"sans-serif",
              textTransform:"uppercase", letterSpacing:".08em" }}>Bass</span>
          </div>
        </div>
      </div>

      {/* Play button */}
      <button onClick={tunedPuzzle ? launchPuzzle : () => document.getElementById('station-list')?.scrollIntoView({ behavior:'smooth' })}
        style={{
          display:"block", width:"100%", padding:13, border:"none", borderRadius:14,
          fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:FONT,
          color:"#1e3a5f", marginBottom:16, letterSpacing:".02em",
          backgroundImage:"linear-gradient(90deg,#fbbf24,#f59e0b,#fbbf24)",
          backgroundSize:"200% auto", animation:"radioShimmer 3s linear infinite",
          opacity: tunerStatic ? 0.6 : 1,
          transition:"opacity 0.2s",
        }}>
        {tunerStatic ? "Tuning... 📻" : tunedPuzzle ? `Play "${tunedPuzzle.song}" 🎵` : "Tune to a station above! 📻"}
      </button>

      {/* Station list */}
      <div id="station-list" style={{ background:"rgba(12,42,78,0.55)", borderRadius:14,
        border:"1px solid rgba(14,165,233,0.2)", padding:10 }}>
        <p style={{ fontSize:10, color:"rgba(125,211,252,0.45)", fontFamily:"sans-serif",
          textTransform:"uppercase", letterSpacing:".06em", textAlign:"center", marginBottom:8 }}>
          All stations
        </p>
        {PUZZLES.map((p, i) => (
          <div key={i} onClick={() => tuneToStation(i)}
            style={{
              display:"flex", alignItems:"center", gap:8, padding:"7px 8px",
              borderRadius:9, cursor:"pointer", marginBottom:2,
              background: tunedIdx===i ? "rgba(251,191,36,0.1)" : "transparent",
              border:`1px solid ${tunedIdx===i ? "rgba(251,191,36,0.25)" : "transparent"}`,
              transition:"background .15s,border-color .15s",
            }}>
            <span style={{ fontSize:10, fontFamily:"'Courier New',monospace",
              color:"#fbbf24", minWidth:52 }}>{p.freq.toFixed(1)} FM</span>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:12, color:"#e0f2fe", fontFamily:FONT }}>{p.emoji} "{p.song}"</p>
              <p style={{ fontSize:10, color:"rgba(125,211,252,0.55)", fontFamily:"sans-serif",
                marginTop:1 }}>{p.artist} ({p.year})</p>
            </div>
            <div style={{
              width:7, height:7, borderRadius:"50%",
              background: tunedIdx===i ? "#fbbf24" : "transparent",
              border:`1px solid ${tunedIdx===i ? "#fbbf24" : "rgba(251,191,36,0.35)"}`,
              boxShadow: tunedIdx===i ? "0 0 6px #fbbf24" : "none",
              flexShrink:0, transition:"all .2s",
            }} />
          </div>
        ))}
      </div>
    </div>
  );

  const formatTime = (s) => {
    if (!s) return "--";
    const m = Math.floor(s/60);
    return m > 0 ? `${m}m ${s%60}s` : `${s}s`;
  };

  // ── SCREEN ROUTING ──────────────────────────────────────────────────────
  if (screen === "tuner") return (
    <>
      <style>{`
        @keyframes fall    { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }
        @keyframes pop     { 0%{transform:scale(0);opacity:0} 65%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
        @keyframes glow    { 0%,100%{text-shadow:0 0 12px #fbbf24} 50%{text-shadow:0 0 40px #fbbf24,0 0 70px #fde68a} }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes slideUp { 0%{opacity:0;transform:translateY(16px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes shake   { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
        @keyframes radioShimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes radioScan    { 0%{transform:translateX(-110%)} 100%{transform:translateX(110%)} }
        @keyframes radioStatic  { 0%,100%{opacity:0.15} 50%{opacity:1} }
        @keyframes radioFadeIn  { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <div style={{
        minHeight:"100vh",
        background:"linear-gradient(160deg,#0c4a6e 0%,#075985 30%,#b45309 85%,#d97706 100%)",
        fontFamily:FONT, padding:"16px 12px 32px",
      }}>
        {/* Iris bar */}
        <div style={{ height:4, borderRadius:99, marginBottom:16, backgroundImage:"linear-gradient(90deg,#bae6fd,#c4b5fd,#a5f3fc,#f9a8d4,#fde68a,#bae6fd)", backgroundSize:"400% auto", animation:"radioShimmer 5s linear infinite" }} />
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          marginBottom:20, maxWidth:440, margin:"0 auto 20px" }}>
          <button onClick={() => setShowWelcome(true)}
            style={{ width:34, height:34, borderRadius:"50%", border:"1px solid #38bdf8",
              background:"rgba(255,255,255,0.12)", color:"#e0f2fe", fontSize:14,
              cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:"sans-serif" }}>
            ?
          </button>
          <div style={{ textAlign:"center" }}>
            <p style={{ fontSize:11, color:"rgba(125,211,252,0.7)", letterSpacing:".1em", textTransform:"uppercase", fontFamily:"sans-serif", marginBottom:4 }}>Letter Griddle</p>
            <h1 style={{ fontSize:26, fontWeight:700, color:"#fde68a", animation:"glow 3s ease-in-out infinite", fontFamily:FONT }}>📻 Radio</h1>
            <p style={{ fontSize:12, color:"rgba(125,211,252,0.6)", fontFamily:"sans-serif", marginTop:4 }}>
              Tune to a station and solve the puzzle
            </p>
          </div>
          <button onClick={() => setShowSound(true)}
            style={{ width:34, height:34, borderRadius:"50%", border:"1px solid #fbbf24",
              background:"rgba(255,255,255,0.12)", color:"#fde68a", fontSize:16,
              cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            🎵
          </button>
        </div>
        <TunerScreen />

        {/* ── REQUEST LINE ── */}
        <div style={{
          maxWidth:440, margin:"0 auto 0", padding:"0 0 4px",
        }}>
          <div style={{
            background:"linear-gradient(135deg,rgba(12,42,78,0.7),rgba(7,24,56,0.8))",
            border:"1px solid rgba(251,191,36,0.25)",
            borderRadius:16, padding:"16px 16px 14px", marginBottom:14,
            position:"relative", overflow:"hidden",
          }}>
            {/* Subtle shimmer stripe at top */}
            <div style={{
              position:"absolute", top:0, left:0, right:0, height:3, borderRadius:"16px 16px 0 0",
              backgroundImage:"linear-gradient(90deg,#fbbf24,#f9a8d4,#c4b5fd,#fbbf24)",
              backgroundSize:"300% auto", animation:"radioShimmer 4s linear infinite",
            }} />

            <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginTop:4 }}>
              {/* Microphone icon */}
              <div style={{
                fontSize:28, flexShrink:0, animation:"float 3s ease-in-out infinite",
                display:"inline-block",
              }}>🎙️</div>

              <div style={{ flex:1 }}>
                <p style={{
                  fontSize:14, fontWeight:700, color:"#fde68a",
                  fontFamily:FONT, marginBottom:6,
                  textShadow:"0 0 10px rgba(251,191,36,0.4)",
                }}>
                  Call the Request Line!
                </p>
                <p style={{
                  fontSize:12, color:"#e0f2fe", fontFamily:"sans-serif",
                  lineHeight:1.6, marginBottom:10,
                }}>
                  Got a summer song that belongs on Griddle FM? Send us your request and get your puzzle published with credit!
                </p>

                {/* How to submit */}
                <div style={{
                  background:"rgba(0,0,0,0.25)", borderRadius:10,
                  padding:"10px 12px", marginBottom:12,
                  border:"1px solid rgba(251,191,36,0.15)",
                }}>
                  <p style={{
                    fontSize:11, fontWeight:700, color:"#fbbf24",
                    fontFamily:"sans-serif", marginBottom:8,
                    textTransform:"uppercase", letterSpacing:".06em",
                  }}>
                    How to submit
                  </p>
                  {[
                    ["🎵", "Name your summer song and artist"],
                    ["📝", "Send 5 words from the song's world:"],
                    ["4️⃣", "One 4-letter word"],
                    ["5️⃣", "One 5-letter word"],
                    ["6️⃣", "One 6-letter word"],
                    ["7️⃣", "One 7-letter word"],
                    ["8️⃣", "One 8-letter word"],
                    ["⭐", "Your name for the puzzle credit!"],
                  ].map(([icon, text], i) => (
                    <div key={i} style={{
                      display:"flex", alignItems:"flex-start", gap:8,
                      marginBottom: i < 7 ? 5 : 0,
                      paddingLeft: i >= 2 && i <= 6 ? 16 : 0,
                    }}>
                      <span style={{ fontSize: i >= 2 && i <= 6 ? 11 : 13, flexShrink:0, marginTop:1 }}>{icon}</span>
                      <p style={{
                        fontSize:11, color: i >= 2 && i <= 6 ? "rgba(125,211,252,0.7)" : "#e0f2fe",
                        fontFamily:"sans-serif", lineHeight:1.5, margin:0,
                        fontStyle: i >= 2 && i <= 6 ? "italic" : "normal",
                      }}>{text}</p>
                    </div>
                  ))}
                </div>

                {/* Email button */}
                <a
                  href="mailto:lettergriddle@gmail.com?subject=Griddle%20FM%20Request%20Line&body=Song%3A%20%0AArtist%3A%20%0A%0AMy%205%20words%3A%0A4-letter%3A%20%0A5-letter%3A%20%0A6-letter%3A%20%0A7-letter%3A%20%0A8-letter%3A%20%0A%0AHint%20for%20each%20word%20(optional)%3A%0A%0AMy%20name%20for%20the%20credit%3A%20"
                  style={{
                    display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                    padding:"10px 16px", borderRadius:99, textDecoration:"none",
                    backgroundImage:"linear-gradient(90deg,#fbbf24,#f59e0b,#fbbf24)",
                    backgroundSize:"200% auto", animation:"radioShimmer 3s linear infinite",
                    fontWeight:700, fontSize:13, color:"#1e3a5f", fontFamily:"sans-serif",
                  }}>
                  <span>📮</span>
                  <span>Email your request</span>
                </a>

                <p style={{
                  fontSize:10, color:"rgba(125,211,252,0.4)", fontFamily:"sans-serif",
                  textAlign:"center", marginTop:8, fontStyle:"italic",
                }}>
                  lettergriddle@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ maxWidth:440, margin:"16px auto 0", borderTop:"1px solid rgba(56,189,248,0.2)", paddingTop:12, textAlign:"center" }}>
          <a href="https://www.lettergriddle.com" style={{ fontSize:12, color:"#38bdf8", fontFamily:"sans-serif", textDecoration:"none" }}>lettergriddle.com</a>
          <span style={{ color:"rgba(56,189,248,0.3)", margin:"0 8px", fontFamily:"sans-serif", fontSize:12 }}>|</span>
          <a href="https://www.lettergriddle.com/privacy" style={{ fontSize:11, color:"rgba(125,211,252,0.45)", fontFamily:"sans-serif", textDecoration:"none" }}>Privacy</a>
          <span style={{ color:"rgba(56,189,248,0.2)", margin:"0 6px", fontFamily:"sans-serif" }}>|</span>
          <a href="https://www.lettergriddle.com/terms" style={{ fontSize:11, color:"rgba(125,211,252,0.45)", fontFamily:"sans-serif", textDecoration:"none" }}>Terms</a>
          <p style={{ fontSize:10, color:"rgba(125,211,252,0.25)", fontFamily:"sans-serif", marginTop:4 }}>&copy; {YEAR} Letter Griddle. All rights reserved.</p>
        </div>
      </div>

      {/* Welcome modal — must be in tuner return so it shows on first visit */}
      {showWelcome && (
        <div style={{ position:"fixed", inset:0, zIndex:60, background:"rgba(7,24,56,0.92)",
          backdropFilter:"blur(5px)", display:"flex", alignItems:"center", justifyContent:"center",
          padding:"1rem" }}
          onMouseDown={e => { if (e.target===e.currentTarget) dismissWelcome(); }}>
          <div style={{ width:"100%", maxWidth:400, maxHeight:"92vh", overflowY:"auto",
            borderRadius:22, padding:"22px 18px",
            background:"linear-gradient(155deg,#0c4a6e,#075985,#0c2d4f)",
            border:"2px solid #0ea5e9", boxShadow:"0 0 50px rgba(14,165,233,0.25)",
            animation:"slideUp .4s ease-out" }}
            onMouseDown={e=>e.stopPropagation()} onClick={e=>e.stopPropagation()}>
            <div style={{ height:4, borderRadius:99, marginBottom:16,
              backgroundImage:"linear-gradient(90deg,#bae6fd,#c4b5fd,#a5f3fc,#f9a8d4,#fde68a,#bae6fd)",
              backgroundSize:"400% auto", animation:"radioShimmer 5s linear infinite" }} />
            <div style={{ textAlign:"center", marginBottom:14 }}>
              <div style={{ fontSize:44, marginBottom:6, display:"inline-block",
                animation:"float 3s ease-in-out infinite" }}>📻</div>
              <h2 style={{ fontSize:20, fontWeight:700, color:"#fde68a",
                fontFamily:FONT, textShadow:"0 0 14px rgba(251,191,36,0.6)",
                marginBottom:4 }}>Welcome to Griddle FM!</h2>
              <p style={{ fontSize:12, color:"rgba(125,211,252,0.65)", fontFamily:"sans-serif" }}>
                Summer songs as Letter Griddle puzzles
              </p>
            </div>
            {[
              ["🎚️", "Tune the radio dial to pick your summer song puzzle."],
              ["💙", "Five words per song, each with one letter revealed as your starting clue."],
              ["🏐", "Tap the beach ball next to any word for a hint if you get stuck."],
              ["🌊", "Solve all five words to unlock a Did You Know? fact and a YouTube link!"],
              ["⌨️", "On a keyboard, just type! Backspace removes the last letter placed."],
            ].map(([icon, text], i) => (
              <div key={i} style={{ display:"flex", gap:10, marginBottom:8,
                background:"rgba(255,255,255,0.05)", borderRadius:12, padding:"9px 10px" }}>
                <span style={{ fontSize:18, flexShrink:0 }}>{icon}</span>
                <p style={{ fontSize:12, color:"#e0f2fe", fontFamily:"sans-serif",
                  lineHeight:1.5, margin:0 }}>{text}</p>
              </div>
            ))}
            <div style={{ background:"rgba(251,191,36,0.08)", border:"1px solid rgba(251,191,36,0.22)",
              borderRadius:12, padding:"12px 13px", margin:"12px 0" }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                <span style={{ fontSize:22, flexShrink:0,
                  animation:"float 3s ease-in-out 0.5s infinite" }}>🎙️</span>
                <div>
                  <p style={{ fontSize:13, fontWeight:700, color:"#fbbf24",
                    fontFamily:FONT, marginBottom:4 }}>Call the Request Line!</p>
                  <p style={{ fontSize:11, color:"rgba(125,211,252,0.75)",
                    fontFamily:"sans-serif", lineHeight:1.55 }}>
                    Got a summer song that belongs on Griddle FM? Email us your song
                    and 5 words (4, 5, 6, 7, and 8 letters) to get your puzzle
                    published with credit!
                  </p>
                  <a href="mailto:lettergriddle@gmail.com?subject=Griddle%20FM%20Request%20Line&body=Song%3A%20%0AArtist%3A%20%0A%0AMy%205%20words%3A%0A4-letter%3A%20%0A5-letter%3A%20%0A6-letter%3A%20%0A7-letter%3A%20%0A8-letter%3A%20%0A%0AHint%20for%20each%20word%20(optional)%3A%0A%0AMy%20name%20for%20the%20credit%3A%20"
                    style={{ display:"inline-block", marginTop:8, fontSize:11,
                      fontWeight:700, color:"#1e3a5f", background:"#fbbf24",
                      border:"none", borderRadius:99, padding:"5px 14px",
                      textDecoration:"none", fontFamily:"sans-serif" }}>
                    📮 Email your request
                  </a>
                </div>
              </div>
            </div>
            <button onClick={dismissWelcome} style={{
              display:"block", width:"100%", padding:13, border:"none", borderRadius:14,
              fontSize:15, fontWeight:700, fontFamily:FONT, cursor:"pointer", color:"#1e3a5f",
              backgroundImage:"linear-gradient(90deg,#fbbf24,#f59e0b,#fbbf24)",
              backgroundSize:"200% auto", animation:"radioShimmer 3s linear infinite",
              marginBottom:8 }}>
              Got it -- let me tune in! 📻
            </button>
            <p style={{ fontSize:10, color:"rgba(125,211,252,0.3)", fontFamily:"sans-serif",
              textAlign:"center" }}>
              Tap ? anytime to see this again
            </p>
          </div>
        </div>
      )}
    </>
  );
  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(160deg,#0c4a6e 0%,#075985 25%,#0369a1 55%,#b45309 85%,#d97706 100%)",
      fontFamily:FONT,
      userSelect:"none",
      position:"relative",
      overflowX:"hidden",
    }}>
      <style>{`
        @keyframes fall    { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }
        @keyframes pop     { 0%{transform:scale(0);opacity:0} 65%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
        @keyframes glow    { 0%,100%{text-shadow:0 0 12px #fbbf24} 50%{text-shadow:0 0 40px #fbbf24,0 0 70px #fde68a} }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes slideUp { 0%{opacity:0;transform:translateY(16px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes shake   { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
        @keyframes radioShimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes radioScan    { 0%{transform:translateX(-110%)} 100%{transform:translateX(110%)} }
        @keyframes radioStatic  { 0%,100%{opacity:0.15} 50%{opacity:1} }
        @keyframes radioFadeIn  { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* Confetti */}
      {confetti.map(c => (
        <div key={c.id} style={{ position:"fixed", left:c.x+"%", top:"-20px", zIndex:50, pointerEvents:"none",
          animation:`fall ${c.dur} ${c.delay} ease-in forwards` }}>
          <div style={{ width:c.size, height:c.size, background:c.color,
            borderRadius:c.id%3===0?"50%":c.id%3===1?"2px":"0",
            transform:`rotate(${c.rot}deg)` }} />
        </div>
      ))}

      {/* Copy toast */}
      {copyMsg && (
        <div style={{ position:"fixed", bottom:80, left:"50%", transform:"translateX(-50%)",
          zIndex:60, background:"#0c4a6e", border:"1px solid #38bdf8", color:"#e0f2fe",
          padding:"8px 20px", borderRadius:99, fontSize:13, fontFamily:"sans-serif",
          animation:"slideUp .3s ease-out", whiteSpace:"nowrap" }}>
          Copied! Share it! 📻
        </div>
      )}

      {/* Sound modal */}
      {showSound && (
        <div style={{ position:"fixed", inset:0, zIndex:60, background:"rgba(7,24,56,0.88)",
          backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}
          onMouseDown={e => { if (e.target===e.currentTarget) setShowSound(false); }}>
          <div style={{ width:"100%", maxWidth:360, borderRadius:22, padding:"18px 16px",
            background:"linear-gradient(155deg,#0c4a6e,#075985,#0c2d4f)",
            border:"2px solid #0ea5e9", boxShadow:"0 0 40px rgba(14,165,233,0.3)" }}
            onMouseDown={e=>e.stopPropagation()} onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <h2 style={{ fontSize:17, fontWeight:700, color:"#fde68a",
                textShadow:"0 0 12px #fbbf24", fontFamily:FONT }}>Beach Sounds 📻</h2>
              <button onClick={() => setShowSound(false)}
                style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#7dd3fc" }}>✕</button>
            </div>
            <p style={{ fontSize:11, color:"rgba(125,211,252,0.7)", marginBottom:14,
              fontFamily:"sans-serif", fontStyle:"italic" }}>
              Layer the sounds for your perfect summer afternoon.
            </p>
            {[
              { id:"truck", icon:"🍦", name:"Ice cream truck",  desc:"That classic jingle in the distance" },
              { id:"radio", icon:"📻", name:"Beach radio",      desc:"Breezy pop from a nearby umbrella" },
            ].map((layer, li) => (
              <div key={layer.id} style={{
                background:soundLayers[layer.id]?"rgba(56,189,248,0.15)":"rgba(12,42,78,0.7)",
                border:`1px solid ${soundLayers[layer.id]?"#38bdf8":"#0c4a6e"}`,
                borderRadius:14, padding:"11px 13px", marginBottom:10,
                transition:"background .3s,border-color .3s" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:9 }}>
                  <span style={{ fontSize:24 }}>{layer.icon}</span>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:13, fontWeight:700, color:"#e0f2fe", fontFamily:"sans-serif" }}>{layer.name}</p>
                    <p style={{ fontSize:11, color:"#7dd3fc", fontFamily:"sans-serif", marginTop:1 }}>{layer.desc}</p>
                  </div>
                  <div onClick={() => toggleSound(layer.id)}
                    style={{ width:44, height:24, borderRadius:99, cursor:"pointer", position:"relative",
                      background:soundLayers[layer.id]?"linear-gradient(90deg,#0ea5e9,#38bdf8)":"#1e3a5f",
                      border:`1px solid ${soundLayers[layer.id]?"#38bdf8":"#0c4a6e"}`,
                      transition:"background .3s", flexShrink:0 }}>
                    <div style={{ position:"absolute", width:18, height:18, borderRadius:"50%",
                      background:"white", top:2, left:soundLayers[layer.id]?22:3,
                      transition:"left .25s", boxShadow:"0 1px 3px rgba(0,0,0,0.4)" }} />
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}
                  onMouseDown={e=>e.stopPropagation()} onPointerDown={e=>e.stopPropagation()}>
                  <span style={{ fontSize:12, color:"#7dd3fc" }}>🔉</span>
                  <input type="range" min="0" max="100" step="1" value={soundVols[layer.id]}
                    onChange={e => setSoundVol(layer.id, Number(e.target.value))}
                    onMouseDown={e=>e.stopPropagation()} onPointerDown={e=>e.stopPropagation()}
                    style={{ flex:1, accentColor:"#38bdf8", cursor:"pointer" }} />
                  <span style={{ fontSize:11, color:"#7dd3fc", minWidth:28, textAlign:"right",
                    fontFamily:"sans-serif" }}>{soundVols[layer.id]}%</span>
                </div>
              </div>
            ))}
            <p style={{ fontSize:10, color:"rgba(125,211,252,0.4)", textAlign:"center",
              marginBottom:12, fontFamily:"sans-serif", fontStyle:"italic" }}>
              All sounds generated in your browser. No downloads.
            </p>
            <button onClick={() => setShowSound(false)} style={{
              display:"block", width:"100%", padding:11, border:"none", borderRadius:13,
              fontSize:14, fontWeight:700, fontFamily:FONT, cursor:"pointer", color:"#1e3a5f",
              background:"linear-gradient(90deg,#fbbf24,#f59e0b,#fbbf24)", backgroundSize:"200% auto" }}>
              Back to the music! 🎵
            </button>
          </div>
        </div>
      )}

      {/* Welcome modal — first visit only */}
      {showWelcome && (
        <div style={{ position:"fixed", inset:0, zIndex:60, background:"rgba(7,24,56,0.92)",
          backdropFilter:"blur(5px)", display:"flex", alignItems:"center", justifyContent:"center",
          padding:"1rem" }}
          onMouseDown={e => { if (e.target===e.currentTarget) dismissWelcome(); }}>
          <div style={{ width:"100%", maxWidth:400, maxHeight:"92vh", overflowY:"auto",
            borderRadius:22, padding:"22px 18px",
            background:"linear-gradient(155deg,#0c4a6e,#075985,#0c2d4f)",
            border:"2px solid #0ea5e9", boxShadow:"0 0 50px rgba(14,165,233,0.25)",
            animation:"slideUp .4s ease-out" }}
            onMouseDown={e=>e.stopPropagation()} onClick={e=>e.stopPropagation()}>

            {/* Iris bar */}
            <div style={{ height:4, borderRadius:99, marginBottom:16,
              backgroundImage:"linear-gradient(90deg,#bae6fd,#c4b5fd,#a5f3fc,#f9a8d4,#fde68a,#bae6fd)",
              backgroundSize:"400% auto", animation:"radioShimmer 5s linear infinite" }} />

            {/* Icon + title */}
            <div style={{ textAlign:"center", marginBottom:14 }}>
              <div style={{ fontSize:44, marginBottom:6, display:"inline-block",
                animation:"float 3s ease-in-out infinite" }}>📻</div>
              <h2 style={{ fontSize:20, fontWeight:700, color:"#fde68a",
                fontFamily:FONT, textShadow:"0 0 14px rgba(251,191,36,0.6)",
                marginBottom:4 }}>Welcome to Griddle FM!</h2>
              <p style={{ fontSize:12, color:"rgba(125,211,252,0.65)", fontFamily:"sans-serif" }}>
                Summer songs as Letter Griddle puzzles
              </p>
            </div>

            {/* How to play steps */}
            {[
              ["🎚️", "Tune the radio dial to pick your summer song puzzle."],
              ["💙", "Five words per song, each with one letter revealed as your starting clue."],
              ["🏐", "Tap the beach ball next to any word for a hint if you get stuck."],
              ["🌊", "Solve all five words to unlock a Did You Know? fact and a YouTube link!"],
              ["⌨️", "On a keyboard, just type! Backspace removes the last letter placed."],
            ].map(([icon, text], i) => (
              <div key={i} style={{ display:"flex", gap:10, marginBottom:8,
                background:"rgba(255,255,255,0.05)", borderRadius:12, padding:"9px 10px" }}>
                <span style={{ fontSize:18, flexShrink:0 }}>{icon}</span>
                <p style={{ fontSize:12, color:"#e0f2fe", fontFamily:"sans-serif",
                  lineHeight:1.5, margin:0 }}>{text}</p>
              </div>
            ))}

            {/* Request line */}
            <div style={{ background:"rgba(251,191,36,0.08)", border:"1px solid rgba(251,191,36,0.22)",
              borderRadius:12, padding:"12px 13px", margin:"12px 0" }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                <span style={{ fontSize:22, flexShrink:0,
                  animation:"float 3s ease-in-out 0.5s infinite" }}>🎙️</span>
                <div>
                  <p style={{ fontSize:13, fontWeight:700, color:"#fbbf24",
                    fontFamily:FONT, marginBottom:4 }}>Call the Request Line!</p>
                  <p style={{ fontSize:11, color:"rgba(125,211,252,0.75)",
                    fontFamily:"sans-serif", lineHeight:1.55 }}>
                    Got a summer song that belongs on Griddle FM? Email us your song
                    and 5 words (4, 5, 6, 7, and 8 letters) to get your puzzle
                    published with credit!
                  </p>
                  <a href="mailto:lettergriddle@gmail.com?subject=Griddle%20FM%20Request%20Line&body=Song%3A%20%0AArtist%3A%20%0A%0AMy%205%20words%3A%0A4-letter%3A%20%0A5-letter%3A%20%0A6-letter%3A%20%0A7-letter%3A%20%0A8-letter%3A%20%0A%0AHint%20for%20each%20word%20(optional)%3A%0A%0AMy%20name%20for%20the%20credit%3A%20"
                    style={{ display:"inline-block", marginTop:8, fontSize:11,
                      fontWeight:700, color:"#1e3a5f", background:"#fbbf24",
                      border:"none", borderRadius:99, padding:"5px 14px",
                      textDecoration:"none", fontFamily:"sans-serif" }}>
                    📮 Email your request
                  </a>
                </div>
              </div>
            </div>

            {/* Got it button */}
            <button onClick={dismissWelcome} style={{
              display:"block", width:"100%", padding:13, border:"none", borderRadius:14,
              fontSize:15, fontWeight:700, fontFamily:FONT, cursor:"pointer", color:"#1e3a5f",
              backgroundImage:"linear-gradient(90deg,#fbbf24,#f59e0b,#fbbf24)",
              backgroundSize:"200% auto", animation:"radioShimmer 3s linear infinite",
              marginBottom:8 }}>
              Got it — let me tune in! 📻
            </button>
            <p style={{ fontSize:10, color:"rgba(125,211,252,0.3)", fontFamily:"sans-serif",
              textAlign:"center" }}>
              Tap ? anytime to see this again
            </p>
          </div>
        </div>
      )}

      {/* How to play modal */}
      {showHow && (
        <div style={{ position:"fixed", inset:0, zIndex:50, background:"rgba(7,24,56,0.88)",
          backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}
          onMouseDown={e => { if (e.target===e.currentTarget) setShowHow(false); }}>
          <div style={{ width:"100%", maxWidth:400, maxHeight:"90vh", overflowY:"auto",
            borderRadius:22, padding:"18px 16px",
            background:"linear-gradient(155deg,#0c4a6e,#075985,#0c2d4f)",
            border:"2px solid #0ea5e9" }}
            onMouseDown={e=>e.stopPropagation()} onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
              <h2 style={{ fontSize:18, fontWeight:700, color:"#fde68a",
                textShadow:"0 0 12px #fbbf24", fontFamily:FONT }}>How to play</h2>
              <button onClick={() => setShowHow(false)}
                style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#7dd3fc" }}>✕</button>
            </div>
            {[
              ["🎚️", "Tune the radio dial to pick your summer song. Click a station dot, use the step buttons, or tap a song in the list below the radio."],
              ["📻", "Each puzzle is built around a classic summer song. Five words from the song's world are hidden in the griddle."],
              ["💙", "Each word has one letter already revealed in blue. Use it as your starting clue."],
              ["🎵", "Tap a letter from the bank, then tap an empty slot to place it. Or tap the slot first, then the letter."],
              ["⌨️", "On a keyboard, just type! Letters land in the next open slot. Backspace removes the last one."],
              ["🏐", "Stuck? Tap the beach ball next to a word for a hint."],
              ["🌊", "Solve all five words to unlock the Did You Know? fact and a YouTube link for the song!"],
            ].map(([icon, text], i) => (
              <div key={i} style={{ display:"flex", gap:10, marginBottom:9,
                background:"rgba(255,255,255,0.06)", borderRadius:12, padding:"9px 10px" }}>
                <span style={{ fontSize:20, flexShrink:0 }}>{icon}</span>
                <p style={{ fontSize:12, color:"#e0f2fe", fontFamily:"sans-serif",
                  lineHeight:1.5, margin:0 }}>{text}</p>
              </div>
            ))}
            {/* Request line mention */}
            <div style={{ background:"rgba(251,191,36,0.08)", border:"1px solid rgba(251,191,36,0.2)",
              borderRadius:12, padding:"10px 12px", marginBottom:12 }}>
              <p style={{ fontSize:12, fontWeight:700, color:"#fbbf24", fontFamily:"sans-serif",
                marginBottom:4 }}>🎙️ Call the Request Line!</p>
              <p style={{ fontSize:11, color:"rgba(125,211,252,0.75)", fontFamily:"sans-serif",
                lineHeight:1.55 }}>
                Got a summer song that belongs on Griddle FM? Email{" "}
                <a href="mailto:lettergriddle@gmail.com" style={{ color:"#fbbf24" }}>lettergriddle@gmail.com</a>
                {" "}with your song and 5 words (4, 5, 6, 7, and 8 letters) to get your puzzle published with credit!
              </p>
            </div>
            <button onClick={() => setShowHow(false)} style={{
              display:"block", width:"100%", padding:11, border:"none", borderRadius:13,
              fontSize:14, fontWeight:700, fontFamily:FONT, cursor:"pointer", color:"#1e3a5f",
              background:"linear-gradient(90deg,#fbbf24,#f59e0b,#fbbf24)" }}>
              Let's play! 🎵
            </button>
          </div>
        </div>
      )}

      {/* Fun fact modal */}
      {showFunFact && (
        <div style={{ position:"fixed", inset:0, zIndex:50, background:"rgba(7,24,56,0.88)",
          backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}
          onClick={() => setShowFunFact(false)}>
          <div style={{ width:"100%", maxWidth:380, borderRadius:22, padding:"24px 20px",
            background:"linear-gradient(155deg,#0c4a6e,#075985)",
            border:"2px solid #38bdf8", boxShadow:"0 0 40px rgba(56,189,248,0.2)",
            animation:"slideUp .4s ease-out", textAlign:"center" }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ fontSize:48, marginBottom:8, animation:"float 2s ease-in-out infinite",
              display:"inline-block" }}>📻</div>
            <h3 style={{ color:"#fde68a", fontSize:18, fontWeight:700,
              marginBottom:6, fontFamily:FONT }}>Did You Know?</h3>
            <p style={{ color:"#e0f2fe", fontSize:13, lineHeight:1.65,
              fontFamily:"sans-serif", marginBottom:16 }}>{puzzle.funFact}</p>
            <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
              {puzzle.youtubeUrl && (
                <a href={puzzle.youtubeUrl} target="_blank" rel="noopener noreferrer"
                  style={{ padding:"9px 20px", borderRadius:99, border:"none", cursor:"pointer",
                    fontWeight:700, fontSize:13, fontFamily:"sans-serif",
                    background:"#dc2626", color:"white", textDecoration:"none",
                    display:"inline-block" }}>
                  Listen on YouTube ▶
                </a>
              )}
              <button onClick={doShare} style={{
                padding:"9px 20px", borderRadius:99, border:"none", cursor:"pointer",
                fontWeight:700, fontSize:13, fontFamily:"sans-serif",
                background:"#0ea5e9", color:"white" }}>
                Share results 🌊
              </button>
              <button onClick={() => { setShowFunFact(false); setScreen("tuner"); }} style={{
                padding:"9px 20px", borderRadius:99, border:"none", cursor:"pointer",
                fontWeight:700, fontSize:13, fontFamily:"sans-serif",
                background:"#fbbf24", color:"#1e3a5f" }}>
                Next song 🎵
              </button>
              <button onClick={() => setShowFunFact(false)} style={{
                padding:"9px 20px", borderRadius:99,
                border:"1px solid #38bdf8", cursor:"pointer",
                fontWeight:600, fontSize:13, fontFamily:"sans-serif",
                background:"transparent", color:"#7dd3fc" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PAGE CONTENT ── */}
      <div style={{ maxWidth:480, margin:"0 auto", padding:"16px 12px 32px" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          marginBottom:16 }}>
          <button onClick={() => setShowWelcome(true)}
            style={{ width:34, height:34, borderRadius:"50%", border:"1px solid #38bdf8",
              background:"rgba(255,255,255,0.12)", color:"#e0f2fe", fontSize:14,
              cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            ?
          </button>
          <div style={{ textAlign:"center" }}>
            <p style={{ fontSize:11, color:"rgba(125,211,252,0.7)", letterSpacing:".1em",
              textTransform:"uppercase", fontFamily:"sans-serif", marginBottom:2 }}>
              Letter Griddle
            </p>
            <h1 style={{ fontSize:22, fontWeight:700, color:"#fde68a",
              textShadow:"0 0 16px #fbbf24", animation:"glow 3s ease-in-out infinite",
              fontFamily:FONT, margin:0 }}>
              📻 Radio
            </h1>
            {/* Change station link */}
            <button onClick={() => setScreen("tuner")}
              style={{ background:"none", border:"none", fontSize:10, cursor:"pointer",
                color:"rgba(251,191,36,0.5)", fontFamily:"sans-serif", marginTop:2,
                padding:0, textDecoration:"underline" }}>
              Change station
            </button>
          </div>
          <button onClick={() => setShowSound(true)}
            style={{ width:34, height:34, borderRadius:"50%", border:"1px solid #fbbf24",
              background:"rgba(255,255,255,0.12)", color:"#fde68a", fontSize:16,
              cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            🎵
          </button>
        </div>

        {/* Song banner */}
        <div style={{
          background:"linear-gradient(135deg,rgba(14,165,233,0.2),rgba(251,191,36,0.15))",
          border:"1px solid rgba(56,189,248,0.4)", borderRadius:16,
          padding:"12px 16px", marginBottom:14, textAlign:"center" }}>
          <div style={{ fontSize:22, marginBottom:4,
            animation:"float 3s ease-in-out infinite", display:"inline-block" }}>
            {puzzle.emoji}
          </div>
          <p style={{ fontSize:16, fontWeight:700, color:"white",
            fontFamily:FONT, marginBottom:2 }}>
            "{puzzle.song}"
          </p>
          <p style={{ fontSize:12, color:"#7dd3fc", fontFamily:"sans-serif" }}>
            {puzzle.artist} ({puzzle.year}) &middot; {puzzle.category}
          </p>
          <p style={{ fontSize:11, color:"rgba(125,211,252,0.5)", fontFamily:"sans-serif",
            marginTop:4 }}>
            Puzzle {puzzleIdx+1} of {PUZZLES.length}
          </p>
        </div>

        {/* Words */}
        {puzzle.words.map((wordDef, wi) => {
          const ws = wordStates[wi];
          const hintOpen = hintsOpen.includes(wi);
          return (
            <div key={wi} style={{
              background:ws.complete
                ?"rgba(56,189,248,0.12)"
                :"rgba(12,42,78,0.6)",
              border:`1px solid ${ws.complete?"#38bdf8":"rgba(14,165,233,0.2)"}`,
              borderRadius:14, padding:"10px 12px", marginBottom:10,
              transition:"background .4s,border-color .4s" }}>

              {/* Slots */}
              <div style={{ display:"flex", gap:5, justifyContent:"center",
                marginBottom:6, flexWrap:"wrap" }}>
                {wordDef.word.split("").map((_, si) => {
                  const isRev  = si === wordDef.revealedIndex;
                  const letter = ws.placed[si];
                  const isSel  = selSlot?.wordIdx===wi && selSlot?.slotIdx===si;
                  let bg, border, color;
                  if (ws.complete)    { bg="#0ea5e9"; border="#38bdf8"; color="white"; }
                  else if (isRev)     { bg="#2dd4bf"; border="#99f6e4"; color="#0f3d38"; }
                  else if (letter)    { bg="#f97316"; border="#fdba74"; color="white"; }
                  else if (isSel)     { bg="rgba(56,189,248,0.3)"; border="#38bdf8"; color="#e0f2fe"; }
                  else                { bg="rgba(12,42,78,0.8)"; border="rgba(14,165,233,0.25)"; color="transparent"; }
                  return (
                    <div key={si}
                      onClick={() => !ws.complete && clickSlot(wi, si)}
                      style={{ width:34, height:36, borderRadius:8, border:`1.5px solid ${border}`,
                        background:bg, color, display:"flex", alignItems:"center",
                        justifyContent:"center", fontSize:15, fontWeight:700,
                        fontFamily:FONT, cursor:ws.complete?"default":"pointer",
                        transition:"background .2s,border-color .2s",
                        animation:ws.complete && ws.celebrating?"pop .5s ease-out":"none",
                        transform:isSel?"scale(1.08)":"scale(1)" }}>
                      {letter || ""}
                    </div>
                  );
                })}
                {/* Hint toggle */}
                {!ws.complete && (
                  <button onClick={() => setHintsOpen(prev =>
                    prev.includes(wi) ? prev.filter(x=>x!==wi) : [...prev, wi])}
                    style={{ width:34, height:36, borderRadius:8,
                      border:"1px solid rgba(14,165,233,0.3)",
                      background:hintOpen?"rgba(251,191,36,0.2)":"rgba(12,42,78,0.5)",
                      color:hintOpen?"#fbbf24":"rgba(125,211,252,0.6)",
                      fontSize:14, cursor:"pointer",
                      display:"flex", alignItems:"center", justifyContent:"center" }}>
                    🏐
                  </button>
                )}
                {ws.complete && (
                  <span style={{ fontSize:20, display:"flex", alignItems:"center" }}>🌊</span>
                )}
              </div>

              {/* Hint text */}
              {hintOpen && !ws.complete && (
                <p style={{ fontSize:11, color:"#fde68a", fontFamily:"sans-serif",
                  fontStyle:"italic", textAlign:"center", margin:"4px 0 6px",
                  animation:"slideUp .2s ease-out" }}>
                  {wordDef.hint}
                </p>
              )}

              {/* Letter bank for this word */}
              {!ws.complete && (
                <div style={{ display:"flex", gap:4, justifyContent:"center",
                  flexWrap:"wrap", marginTop:2 }}>
                  {ws.available.map((letter, li) => {
                    const isSel = selLetter?.wordIdx===wi && selLetter?.letterIdx===li;
                    return (
                      <button key={li} onClick={() => clickLetter(wi, li)}
                        style={{ width:32, height:32, borderRadius:7,
                          border:`1.5px solid ${isSel?"#fbbf24":"rgba(14,165,233,0.4)"}`,
                          background:isSel
                            ?"linear-gradient(135deg,#fbbf24,#f59e0b)"
                            :"linear-gradient(135deg,rgba(14,165,233,0.25),rgba(56,189,248,0.15))",
                          color:isSel?"#1e3a5f":"#e0f2fe",
                          fontSize:14, fontWeight:700, fontFamily:FONT, cursor:"pointer",
                          transition:"all .15s",
                          transform:isSel?"scale(1.12)":"scale(1)",
                          animation:"float 3s ease-in-out infinite",
                          animationDelay:`${li*0.12}s` }}>
                        {letter}
                      </button>
                    );
                  })}
                  {ws.available.length > 1 && (
                    <button onClick={() => shuffleWord(wi)}
                      style={{ width:32, height:32, borderRadius:7,
                        border:"1px solid rgba(14,165,233,0.3)",
                        background:"rgba(12,42,78,0.6)",
                        color:"rgba(125,211,252,0.6)", fontSize:12,
                        cursor:"pointer" }}>
                      ↺
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Completion banner */}
        {allDone && (
          <div style={{ background:"linear-gradient(135deg,rgba(14,165,233,0.2),rgba(251,191,36,0.15))",
            border:"1px solid #38bdf8", borderRadius:16, padding:"14px 16px",
            textAlign:"center", marginBottom:12, animation:"slideUp .4s ease-out" }}>
            <div style={{ fontSize:36, marginBottom:4,
              animation:"glow 2s ease-in-out infinite" }}>🎉</div>
            <p style={{ fontSize:18, fontWeight:700, color:"#fde68a",
              fontFamily:FONT, marginBottom:2 }}>
              You know your summer songs!
            </p>
            <p style={{ fontSize:12, color:"#7dd3fc", fontFamily:"sans-serif",
              marginBottom:10 }}>
              Solved in {formatTime(elapsed)}
              {stats.fastest && elapsed && elapsed <= stats.fastest ? " -- Personal best!" : ""}
            </p>
            <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
              {puzzle.youtubeUrl && (
                <a href={puzzle.youtubeUrl} target="_blank" rel="noopener noreferrer"
                  style={{ padding:"9px 18px", borderRadius:99, border:"none", cursor:"pointer",
                    fontWeight:700, fontSize:13, fontFamily:"sans-serif",
                    background:"#dc2626", color:"white", textDecoration:"none",
                    display:"inline-block" }}>
                  Listen ▶
                </a>
              )}
              <button onClick={doShare} style={{
                padding:"9px 18px", borderRadius:99, border:"none", cursor:"pointer",
                fontWeight:700, fontSize:13, fontFamily:"sans-serif",
                background:"#0ea5e9", color:"white" }}>
                Share 🌊
              </button>
              <button onClick={() => setShowFunFact(true)} style={{
                padding:"9px 18px", borderRadius:99, border:"none", cursor:"pointer",
                fontWeight:700, fontSize:13, fontFamily:"sans-serif",
                background:"#fbbf24", color:"#1e3a5f" }}>
                Did you know? 📻
              </button>
              <button onClick={nextPuzzle} style={{
                padding:"9px 18px", borderRadius:99,
                border:"1px solid #38bdf8", cursor:"pointer",
                fontWeight:600, fontSize:13, fontFamily:"sans-serif",
                background:"transparent", color:"#7dd3fc" }}>
                Next song 🎵
              </button>
            </div>
          </div>
        )}

        {/* Keyboard hint */}
        {!allDone && (
          <p style={{ fontSize:10, color:"rgba(125,211,252,0.4)", textAlign:"center",
            fontFamily:"sans-serif", marginTop:4 }}>
            Type letters on your keyboard &middot; Backspace to remove
          </p>
        )}

        {/* Footer */}
        <div style={{ marginTop:24, paddingTop:16,
          borderTop:"1px solid rgba(56,189,248,0.2)", textAlign:"center" }}>
          <a href="https://www.lettergriddle.com" style={{ fontSize:12,
            color:"#38bdf8", fontFamily:"sans-serif", textDecoration:"none",
            display:"block", marginBottom:6 }}>
            lettergriddle.com
          </a>
          <div style={{ display:"flex", justifyContent:"center", gap:12,
            fontSize:11, fontFamily:"sans-serif",
            color:"rgba(125,211,252,0.45)" }}>
            <a href="https://www.lettergriddle.com/privacy"
              style={{ color:"inherit", textDecoration:"none" }}>Privacy</a>
            <span>|</span>
            <a href="https://www.lettergriddle.com/terms"
              style={{ color:"inherit", textDecoration:"none" }}>Terms</a>
          </div>
          <p style={{ fontSize:10, color:"rgba(125,211,252,0.25)",
            fontFamily:"sans-serif", marginTop:4 }}>
            &copy; {YEAR} Letter Griddle. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}