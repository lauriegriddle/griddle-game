"use client";
import { useState, useEffect, useCallback, useRef, memo } from "react";

const BG = "min-h-screen flex flex-col items-center py-3 px-2";
const FONT = "Georgia, serif";
const YEAR = new Date().getFullYear();

// ─────────────────────────────────────────────────────────────────────────────
// BEACH SOUNDSCAPE ENGINE  (Web Audio API -- no files, no copyright)
// Two layers: ice cream truck jingle, distant beach radio.
// ─────────────────────────────────────────────────────────────────────────────

// Ice cream truck -- C major pentatonic bell jingle
const TRUCK_NOTES  = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
const TRUCK_MELODY = [
  [2,0.5],[4,0.5],[2,0.5],[0,0.5],
  [2,0.5],[4,0.5],[5,1.0],
  [4,0.5],[3,0.5],[2,0.5],[1,0.5],
  [0,1.5],
  [3,0.5],[2,0.5],[3,0.5],[4,0.5],
  [2,0.5],[0,0.5],[1,0.5],[2,0.5],
  [0,2.0],
];
const TRUCK_TOTAL = TRUCK_MELODY.reduce((s,n) => s + n[1], 0);

// Distant beach radio -- breezy C major pop melody
const RADIO_NOTES  = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88];
const RADIO_MELODY = [
  [4,0.5],[4,0.25],[5,0.25],[4,0.5],[2,0.5],
  [0,1.0],
  [5,0.5],[5,0.25],[6,0.25],[5,0.5],[4,0.5],
  [2,1.0],
  [4,0.5],[2,0.5],[0,0.5],[2,0.5],
  [4,0.5],[5,0.5],[4,1.0],
  [2,0.5],[4,0.5],[5,0.5],[4,0.25],[2,0.25],
  [0,2.0],
];
const RADIO_TOTAL = RADIO_MELODY.reduce((s,n) => s + n[1], 0);

function useMazeSound() {
  const ctxRef       = useRef(null);
  const activeRef    = useRef({ truck:false, radio:false });
  const volRef       = useRef({ truck:0.45, radio:0.4 });

  const truckGainRef = useRef(null);
  const radioGainRef = useRef(null);
  const truckTimRef  = useRef(null);
  const radioTimRef  = useRef(null);

  // Track all oscillators so we can force-stop them on toggle-off
  const allOscsRef   = useRef([]);

  async function getCtx() {
    if (!ctxRef.current)
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    if (ctxRef.current.state === 'suspended') await ctxRef.current.resume();
    return ctxRef.current;
  }

  function trackOsc(osc) {
    allOscsRef.current.push(osc);
    if (allOscsRef.current.length > 200)
      allOscsRef.current = allOscsRef.current.slice(-80);
    return osc;
  }

  function killAllOscs() {
    allOscsRef.current.forEach(osc => { try { osc.stop(); } catch(e){} });
    allOscsRef.current = [];
  }


  // ── ICE CREAM TRUCK ────────────────────────────────────────────────────
  async function startTruck() {
    const c = await getCtx();
    const master = c.createGain();
    master.gain.value = volRef.current.truck * 0.5;
    master.connect(c.destination);
    truckGainRef.current = master;
    playTruckLoop(c, master, c.currentTime + 0.3);
  }

  function truckNote(c, master, freq, time, dur) {
    [-4, 0, 4].forEach((detune, i) => {
      const osc = c.createOscillator(); const g = c.createGain();
      osc.type='sine'; osc.frequency.value=freq; osc.detune.value=detune;
      const amp = i===1 ? 0.55 : 0.2;
      const decay = Math.min(dur*0.9, 0.9);
      g.gain.setValueAtTime(0, time);
      g.gain.linearRampToValueAtTime(amp, time+0.01);
      g.gain.exponentialRampToValueAtTime(amp*0.4, time+decay*0.3);
      g.gain.exponentialRampToValueAtTime(0.0001, time+decay);
      osc.connect(g); g.connect(master);
      trackOsc(osc);
      osc.start(time); osc.stop(time+decay+0.05);
    });
  }

  function playTruckLoop(c, master, startTime) {
    if (!activeRef.current.truck || !truckGainRef.current) return;
    const tempo = 0.38;
    let t = startTime;
    TRUCK_MELODY.forEach(([ni, beats]) => {
      truckNote(c, master, TRUCK_NOTES[ni], t, beats*tempo);
      t += beats*tempo;
    });
    const pauseMs = (TRUCK_TOTAL*tempo + 4.0 + Math.random()*3) * 1000;
    truckTimRef.current = setTimeout(() => {
      if (activeRef.current.truck && truckGainRef.current)
        playTruckLoop(c, truckGainRef.current, c.currentTime+0.2);
    }, pauseMs);
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

  // ── DISTANT BEACH RADIO ────────────────────────────────────────────────
  async function startRadio() {
    const c = await getCtx();
    const master = c.createGain();
    master.gain.value = volRef.current.radio * 0.45;
    master.connect(c.destination);
    radioGainRef.current = master;
    const lpf = c.createBiquadFilter();
    lpf.type='lowpass'; lpf.frequency.value=1800; lpf.Q.value=0.7;
    lpf.connect(master);
    radioGainRef._lpf = lpf;
    playRadioLoop(c, lpf, c.currentTime + 1.0);
  }

  function radioNote(c, dest, freq, time, dur) {
    [{ type:'sine', amp:0.5 }, { type:'triangle', amp:0.15 }].forEach(({ type, amp }) => {
      const osc = c.createOscillator(); const g = c.createGain();
      osc.type=type; osc.frequency.value=freq;
      const decay = Math.min(dur*0.85, 1.1);
      g.gain.setValueAtTime(0, time);
      g.gain.linearRampToValueAtTime(amp, time+0.02);
      g.gain.exponentialRampToValueAtTime(amp*0.35, time+decay*0.4);
      g.gain.exponentialRampToValueAtTime(0.0001, time+decay);
      osc.connect(g); g.connect(dest);
      trackOsc(osc);
      osc.start(time); osc.stop(time+decay+0.05);
    });
  }

  function playRadioLoop(c, lpf, startTime) {
    if (!activeRef.current.radio || !radioGainRef.current) return;
    const tempo = 0.52;
    let t = startTime;
    RADIO_MELODY.forEach(([ni, beats]) => {
      radioNote(c, lpf, RADIO_NOTES[ni], t, beats*tempo);
      t += beats*tempo;
    });
    const pauseMs = (RADIO_TOTAL*tempo + 1.5) * 1000;
    radioTimRef.current = setTimeout(() => {
      if (activeRef.current.radio && radioGainRef.current && radioGainRef._lpf)
        playRadioLoop(c, radioGainRef._lpf, c.currentTime+0.1);
    }, pauseMs);
  }

  function stopRadio() {
    clearTimeout(radioTimRef.current);
    if (radioGainRef.current && ctxRef.current) {
      try { radioGainRef.current.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.02); } catch(e){}
      const g = radioGainRef.current;
      setTimeout(() => { try { g.disconnect(); } catch(e){} }, 250);
    }
    radioGainRef.current = null;
    radioGainRef._lpf = null;
  }

  // ── PUBLIC API ──────────────────────────────────────────────────────────
  function setLayerOn(name, on) {
    if (on) {
      activeRef.current[name] = true;
      if (name==='truck') startTruck();
      if (name==='radio') startRadio();
    } else {
      // Set flag FIRST so any in-flight loop checks bail immediately
      activeRef.current[name] = false;
      // Zero the master gain right now -- scheduled notes go silent instantly
      const gRef = name==='truck' ? truckGainRef : radioGainRef;
      if (gRef.current && ctxRef.current) {
        try { gRef.current.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.02); } catch(e){}
      }
      // Cancel all tracked oscillators
      killAllOscs();
      if (name==='truck') stopTruck();
      if (name==='radio') stopRadio();
    }
  }

  function setLayerVol(name, val) {
    volRef.current[name] = val;
    const mult = name==='truck' ? 0.5 : 0.45;
    const gRef = name==='truck' ? truckGainRef : radioGainRef;
    if (gRef.current) gRef.current.gain.value = val * mult;
  }

  function stopAll() {
    // Zero all master gains first for immediate silence
    [truckGainRef, radioGainRef].forEach(r => {
      if (r.current && ctxRef.current) {
        try { r.current.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.01); } catch(e){}
      }
    });
    activeRef.current = { waves:false, truck:false, radio:false };
    clearTimeout(truckTimRef.current);
    clearTimeout(radioTimRef.current);
    killAllOscs();
    stopTruck(); stopRadio();
  }

  return { setLayerOn, setLayerVol, stopAll };
}

// ─────────────────────────────────────────────────────────────────────────────
// BEACH SOUND MODAL
// Top-level component (not nested inside main) so React never remounts it
// on parent re-renders, which would cause the blink bug.
// Owns its own layer/volume state; receives only a stable soundRef + onClose.
// ─────────────────────────────────────────────────────────────────────────────
const BeachSoundModal = memo(function BeachSoundModal({ soundRef, onClose }) {
  const [layers, setLayers] = useState({ waves:false, truck:false, radio:false });
  const [vols,   setVols]   = useState({ waves:65, truck:45, radio:40 });

  const stopAll = e => e.stopPropagation();

  function toggle(name) {
    setLayers(prev => {
      const next = !prev[name];
      soundRef.current.setLayerOn(name, next);
      return { ...prev, [name]:next };
    });
  }

  function setVol(name, val) {
    setVols(prev => ({ ...prev, [name]:val }));
    soundRef.current.setLayerVol(name, val/100);
  }

  const LAYERS = [
{ id:'truck', icon:'🍦', name:'Ice cream truck',   desc:'That classic jingle in the distance' },
    { id:'radio', icon:'📻', name:'Beach radio',       desc:'Breezy pop drifting from a nearby umbrella' },
  ];

  return (
    <div
      style={{ position:'fixed', inset:0, zIndex:60, background:'rgba(7,24,56,0.85)',
        backdropFilter:'blur(4px)', display:'flex', alignItems:'center',
        justifyContent:'center', padding:'1rem' }}
      onMouseDown={e => { if (e.target===e.currentTarget) onClose(); }}>
      <div
        style={{ width:'100%', maxWidth:360, borderRadius:22,
          padding:'18px 16px',
          background:'linear-gradient(155deg,#0c4a6e 0%,#075985 50%,#0c2d4f 100%)',
          border:'2px solid #0ea5e9',
          boxShadow:'0 0 40px rgba(14,165,233,0.3)' }}
        onMouseDown={stopAll} onClick={stopAll}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <h2 style={{ fontSize:17, fontWeight:700, color:'#fde68a',
            textShadow:'0 0 12px #fbbf24', fontFamily:FONT }}>
            Beach Sounds 🏖️
          </h2>
          <button onClick={onClose}
            style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:'#7dd3fc' }}>
            ✕
          </button>
        </div>

        <p style={{ fontSize:11, color:'rgba(125,211,252,0.7)', marginBottom:14,
          fontFamily:'sans-serif', fontStyle:'italic' }}>
          Layer the sounds you love. Toggle each one on or off.
        </p>

        {/* Layer cards */}
        {LAYERS.map((layer, li) => (
          <div key={layer.id}
            style={{ background: layers[layer.id] ? 'rgba(56,189,248,0.15)' : 'rgba(12,42,78,0.7)',
              border:`1px solid ${layers[layer.id] ? '#38bdf8' : '#0c4a6e'}`,
              borderRadius:14, padding:'11px 13px', marginBottom:10,
              transition:'background .3s, border-color .3s' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:9 }}>
              <span style={{ fontSize:24 }}>{layer.icon}</span>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:13, fontWeight:700, color:'#e0f2fe',
                  fontFamily:'sans-serif' }}>{layer.name}</p>
                <p style={{ fontSize:11, color:'#7dd3fc',
                  fontFamily:'sans-serif', marginTop:1 }}>{layer.desc}</p>
              </div>
              {/* Toggle switch */}
              <div onClick={() => toggle(layer.id)}
                style={{ width:44, height:24, borderRadius:99, cursor:'pointer',
                  position:'relative', flexShrink:0,
                  background: layers[layer.id]
                    ? 'linear-gradient(90deg,#0ea5e9,#38bdf8)'
                    : '#1e3a5f',
                  border:`1px solid ${layers[layer.id] ? '#38bdf8' : '#0c4a6e'}`,
                  transition:'background .3s' }}>
                <div style={{ position:'absolute', width:18, height:18,
                  borderRadius:'50%', background:'white', top:2,
                  left: layers[layer.id] ? 22 : 3,
                  transition:'left .25s',
                  boxShadow:'0 1px 3px rgba(0,0,0,0.4)' }} />
              </div>
            </div>
            {/* Volume slider */}
            <div style={{ display:'flex', alignItems:'center', gap:10 }}
              onMouseDown={stopAll} onPointerDown={stopAll}>
              <span style={{ fontSize:12, color:'#7dd3fc' }}>🔉</span>
              <input type="range" min="0" max="100" step="1"
                value={vols[layer.id]}
                onChange={e => setVol(layer.id, Number(e.target.value))}
                onMouseDown={stopAll} onPointerDown={stopAll}
                style={{ flex:1, accentColor:'#38bdf8', cursor:'pointer' }} />
              <span style={{ fontSize:11, color:'#7dd3fc', minWidth:28,
                textAlign:'right', fontFamily:'sans-serif' }}>{vols[layer.id]}%</span>
            </div>
          </div>
        ))}

        <p style={{ fontSize:10, color:'rgba(125,211,252,0.4)', textAlign:'center',
          marginBottom:12, fontFamily:'sans-serif', fontStyle:'italic' }}>
          All sounds are generated in your browser. No downloads.
        </p>

        <button onClick={onClose}
          style={{ display:'block', width:'100%', padding:11, border:'none',
            borderRadius:13, fontSize:14, fontWeight:700, fontFamily:FONT,
            cursor:'pointer', color:'#1e3a5f',
            background:'linear-gradient(90deg,#fbbf24,#f59e0b,#fbbf24)',
            backgroundSize:'200% auto' }}>
          Back to the maze! 🏖️
        </button>
      </div>
    </div>
  );
});

// ─── SUMMER DAYS PUZZLES ───────────────────────────────────────────────────
const PUZZLES = [
  {
    words:    ["BEACH", "DAY", "VIBES"],
    flat:     "BEACHDAYVIBES",
    pre:      new Set([0, 5, 8, 12]),
    prePlace: [
      [1, 1, 0],
      [3, 9, 5],
      [7, 1, 8],
      [9, 9, 12],
    ],
    collect: [
      [1, 3, 1],
      [1, 5, 2],
      [1, 7, 3],
      [3, 7, 4],
      [3, 5, 6],
      [3, 3, 7],
      [5, 3, 9],
      [5, 5, 10],
      [7, 7, 11],
    ],
    winMsg:   "BEACH DAY VIBES! 🏖️",
    nextLabel:"Try the next puzzle!",
  },
  {
    words:    ["SALT", "IN", "THE", "AIR"],
    flat:     "SALTINTHEAIR",
    pre:      new Set([0, 4, 8, 11]),
    prePlace: [
      [1, 1, 0],
      [3, 9, 4],
      [7, 1, 8],
      [9, 9, 11],
    ],
    collect: [
      [1, 3, 1],
      [1, 5, 2],
      [1, 7, 3],
      [3, 7, 5],
      [3, 5, 6],
      [3, 3, 7],
      [5, 3, 9],
      [7, 7, 10],
    ],
    winMsg:   "SALT IN THE AIR! 🌊",
    nextLabel:"Try the next puzzle!",
  },
  {
    words:    ["ENDLESS", "SUMMER", "DAYS"],
    flat:     "ENDLESSSUMMERDAYS",
    pre:      new Set([0, 7, 13, 16]),
    prePlace: [
      [1, 1, 0],
      [3, 9, 7],
      [7, 1, 13],
      [9, 9, 16],
    ],
    collect: [
      [1, 3, 1],
      [1, 5, 2],
      [1, 7, 3],
      [3, 7, 4],
      [3, 5, 5],
      [3, 3, 6],
      [5, 3, 8],
      [5, 5, 9],
      [5, 7, 10],
      [7, 7, 11],
      [7, 5, 12],
      [9, 3, 14],
      [9, 5, 15],
    ],
    winMsg:   "ENDLESS SUMMER DAYS! ☀️",
    nextLabel:"Try an evening puzzle!",
  },
  {
    words:    ["BONFIRE", "STORIES"],
    flat:     "BONFIRESTORIES",
    pre:      new Set([0, 7, 11, 13]),
    prePlace: [
      [1, 1, 0],
      [3, 9, 7],
      [7, 1, 11],
      [9, 9, 13],
    ],
    collect: [
      [1, 3, 1],
      [1, 5, 2],
      [1, 7, 3],
      [3, 7, 4],
      [3, 5, 5],
      [3, 3, 6],
      [5, 3, 8],
      [5, 5, 9],
      [7, 5, 10],
      [9, 3, 12],
    ],
    winMsg:   "BONFIRE STORIES! 🔥",
    nextLabel:"Try the next evening puzzle!",
  },
  {
    words:    ["MIDNIGHT", "BREEZE"],
    flat:     "MIDNIGHTBREEZE",
    pre:      new Set([0, 7, 10, 13]),
    prePlace: [
      [1, 1, 0],
      [3, 9, 7],
      [7, 1, 10],
      [9, 9, 13],
    ],
    collect: [
      [1, 3, 1],
      [1, 5, 2],
      [1, 7, 3],
      [3, 7, 4],
      [3, 5, 5],
      [3, 3, 6],
      [5, 3, 8],
      [5, 5, 9],
      [7, 5, 11],
      [9, 3, 12],
    ],
    winMsg:   "MIDNIGHT BREEZE! 🌙",
    nextLabel:"Try the next evening puzzle!",
  },
  {
    words:    ["CATCHING", "FIREFLIES"],
    flat:     "CATCHINGFIREFLIES",
    pre:      new Set([0, 8, 12, 16]),
    prePlace: [
      [1, 1, 0],
      [3, 9, 8],
      [7, 1, 12],
      [9, 9, 16],
    ],
    collect: [
      [1, 3, 1],
      [1, 5, 2],
      [1, 7, 3],
      [3, 7, 4],
      [3, 5, 5],
      [3, 3, 6],
      [5, 3, 7],
      [5, 5, 9],
      [5, 7, 10],
      [7, 7, 11],
      [7, 5, 13],
      [9, 3, 14],
      [9, 5, 15],
    ],
    winMsg:   "CATCHING FIREFLIES! ✨",
    nextLabel:"Try the road trip puzzles!",
  },
  {
    words:    ["SOAKING", "UP", "THE", "SUN"],
    flat:     "SOAKINGUPTHESUN",
    pre:      new Set([0, 7, 10, 14]),
    prePlace: [
      [1, 1, 0],
      [3, 9, 7],
      [7, 1, 10],
      [9, 9, 14],
    ],
    collect: [
      [1, 3, 1],
      [1, 5, 2],
      [1, 7, 3],
      [3, 7, 4],
      [3, 5, 5],
      [3, 3, 6],
      [5, 3, 8],
      [5, 5, 9],
      [7, 5, 11],
      [7, 7, 12],
      [9, 3, 13],
    ],
    winMsg:   "SOAKING UP THE SUN! ☀️",
    nextLabel:"Try the next road trip puzzle!",
  },
  {
    words:    ["ROAD", "TRIP", "ANTHEMS"],
    flat:     "ROADTRIPANTHEMS",
    pre:      new Set([0, 4, 8, 14]),
    prePlace: [
      [1, 1, 0],
      [3, 9, 4],
      [7, 1, 8],
      [9, 9, 14],
    ],
    collect: [
      [1, 3, 1],
      [1, 5, 2],
      [1, 7, 3],
      [3, 7, 5],
      [3, 5, 6],
      [3, 3, 7],
      [5, 3, 9],
      [5, 5, 10],
      [5, 7, 11],
      [7, 7, 12],
      [9, 3, 13],
    ],
    winMsg:   "ROAD TRIP ANTHEMS! 🚗",
    nextLabel:"Try the next road trip puzzle!",
  },
  {
    words:    ["STARRY", "SUMMER", "SKIES"],
    flat:     "STARRYSUMMERSKIES",
    pre:      new Set([0, 6, 11, 16]),
    prePlace: [
      [1, 1, 0],
      [3, 9, 6],
      [7, 1, 11],
      [9, 9, 16],
    ],
    collect: [
      [1, 3, 1],
      [1, 5, 2],
      [1, 7, 3],
      [3, 7, 4],
      [3, 5, 5],
      [5, 3, 7],
      [5, 5, 8],
      [5, 7, 9],
      [7, 7, 10],
      [7, 5, 12],
      [9, 3, 13],
      [9, 5, 14],
      [7, 3, 15],
    ],
    winMsg:   "STARRY SUMMER SKIES! 🌟",
    nextLabel:"Try the daytime puzzles again!",
  },
];

function buildLetterMap(puzzle) {
  const m = {};
  puzzle.prePlace.forEach(([r, c, i]) =>
    (m[`${r}-${c}`] = { msgIdx: i, display: puzzle.flat[i], preFilled: true })
  );
  puzzle.collect.forEach(([r, c, i]) => {
    const k = `${r}-${c}`;
    if (!m[k]) m[k] = { msgIdx: i, display: puzzle.flat[i], preFilled: false };
  });
  return m;
}

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

const CHARM_MAPS = [
  {
    "1-4":{ emoji:"shell",      msg:"A seashell! Keep walking the shore!",          spin:"3s" },
    "3-4":{ emoji:"icecream",   msg:"Ice cream break! You are halfway there!",       spin:"2s" },
    "5-6":{ emoji:"umbrella",   msg:"Shady spot! Keep going, the water is warm!",    spin:"4s" },
    "7-4":{ emoji:"sunglasses", msg:"Looking cool! Almost at the griddle!",          spin:"1.5s" },
    "9-5":{ emoji:"wave",       msg:"Catch the wave -- the star is right there!",    spin:"2.5s" },
  },
  {
    "1-4":{ emoji:"firefly",  msg:"A firefly! The evening magic is starting!",       spin:"3s" },
    "3-4":{ emoji:"campfire", msg:"Gather round the fire! Keep going!",              spin:"2s" },
    "5-6":{ emoji:"moon",     msg:"The moon is rising! You are halfway there!",      spin:"4s" },
    "7-4":{ emoji:"star",     msg:"A shooting star! Almost to the griddle!",         spin:"1.5s" },
    "9-5":{ emoji:"firefly",  msg:"The fireflies are out -- the star is near!",      spin:"2.5s" },
  },
  {
    "1-4":{ emoji:"map",      msg:"A treasure map! Adventure awaits ahead!",         spin:"3s" },
    "3-4":{ emoji:"music",    msg:"Turn it up! Road trip anthem incoming!",           spin:"2s" },
    "5-6":{ emoji:"roadSign", msg:"Rest stop! Stretch your legs and keep going!",    spin:"4s" },
    "7-4":{ emoji:"camera",   msg:"Perfect photo op! Almost at the griddle!",        spin:"1.5s" },
    "9-5":{ emoji:"star",     msg:"You are a road trip star -- finish line ahead!",  spin:"2.5s" },
  },
];

function getCharmMap(pIdx) {
  return pIdx < 3 ? CHARM_MAPS[0] : pIdx < 6 ? CHARM_MAPS[1] : CHARM_MAPS[2];
}

const CHARM_DISPLAY = {
  shell:      "&#x1FAB8;",
  icecream:   "&#x1F366;",
  umbrella:   "&#x26F1;&#xFE0F;",
  sunglasses: "&#x1F576;&#xFE0F;",
  wave:       "&#x1F30A;",
  firefly:    "&#x2728;",
  moon:       "&#x1F319;",
  campfire:   "&#x1F525;",
  star:       "&#x1F31F;",
  map:        "&#x1F5FA;&#xFE0F;",
  music:      "&#x1F3B5;",
  roadSign:   "&#x1F6A7;",
  camera:     "&#x1F4F7;",
};

const SHIMMER_COLORS = ["#fde68a","#7dd3fc","#fb923c","#f9a8d4","#6ee7b7","#fbbf24"];

const FUN_FACTS = [
  "The ocean covers about 71% of Earth's surface. The Pacific Ocean alone is larger than all of Earth's landmasses combined.",
  "Sand is essentially tiny pieces of rocks, minerals, and sometimes shells or coral worn down over thousands of years. Different beaches get their color from local geology.",
  "Sunlight reaches its peak UV intensity between 10 AM and 4 PM. Sunscreen should be applied 15 minutes before heading outside and reapplied every two hours.",
  "The sound of ocean waves has been shown to reduce stress and encourage relaxation. The rhythmic pattern activates the brain's default mode, similar to meditation.",
  "Fireflies produce their glow through a chemical reaction called bioluminescence. Each species has its own unique flash pattern used to find a mate.",
  "Wood smoke from a campfire carries a chemical called guaiacol, which triggers a strong nostalgic response in the brain.",
  "The midnight breeze effect is real -- coastal areas cool significantly after sunset as land releases heat absorbed during the day.",
  "The United States Interstate Highway System spans over 48,000 miles and was inspired by the German Autobahn.",
  "Studies show that singing along to music while driving reduces stress and improves mood.",
  "The world's longest drivable road is the Pan-American Highway, stretching roughly 19,000 miles from Alaska to Argentina.",
  "On a clear night away from city lights, the Milky Way appears as a glowing band across the sky, the same stars ancient travelers used for navigation.",
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────
export default function LetterGriddleMazeSummer() {
  const [puzzleIdx, setPuzzleIdx] = useState(0);

  const puzzle       = PUZZLES[puzzleIdx];
  const MESSAGE_FLAT = puzzle.flat;
  const PRE_FILLED   = puzzle.pre;
  const LETTER_MAP   = buildLetterMap(puzzle);
  const CHARM_MAP    = getCharmMap(puzzleIdx);
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
  const [showSound,      setShowSound]      = useState(false);

  const collectedRef     = useRef(new Set());
  const foundCharmsRef   = useRef(new Set());
  const rearrangeModeRef = useRef(false);
  const wonRef           = useRef(false);
  const charmTimerRef    = useRef(null);
  const puzzleIdxRef     = useRef(0);
  const collectedBankRef = useRef([]);
  const selBankRef       = useRef(null);
  const selSlotRef       = useRef(null);
  const griddleLetsRef   = useRef([]);

  // Sound engine
  const sound    = useMazeSound();
  const soundRef = useRef(sound);

  useEffect(() => {
    setShimmer(Array.from({ length:14 }, (_,i) => ({
      id:i, x:Math.random()*100, y:Math.random()*100,
      color:SHIMMER_COLORS[i%SHIMMER_COLORS.length],
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
      const key   = `${nr}-${nc}`;
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
      const charm = getCharmMap(puzzleIdxRef.current)[key];
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

  useEffect(() => { puzzleIdxRef.current = puzzleIdx; }, [puzzleIdx]);
  useEffect(() => { collectedBankRef.current = collectedBank; }, [collectedBank]);
  useEffect(() => { selBankRef.current = selBank; }, [selBank]);
  useEffect(() => { selSlotRef.current = selSlot; }, [selSlot]);
  useEffect(() => { griddleLetsRef.current = griddleLetters; }, [griddleLetters]);

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
      const puz      = PUZZLES[puzzleIdxRef.current];
      const allSlots = puz.flat.split("").map((_,i) => i).filter(i => !puz.pre.has(i));
      const bank     = collectedBankRef.current;
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        e.preventDefault();
        const typed   = e.key.toUpperCase();
        const bankIdx = bank.findIndex(item => item.letter === typed);
        if (bankIdx === -1) return;
        const currentGriddle = griddleLetsRef.current;
        const selSlotVal     = selSlotRef.current;
        let targetSlot = (selSlotVal !== null && currentGriddle[selSlotVal] === null)
          ? selSlotVal
          : allSlots.find(si => currentGriddle[si] === null) || null;
        if (targetSlot === null) return;
        const item = bank[bankIdx];
        setGriddleLetters(g => { const n=[...g]; n[targetSlot]=item.letter; return n; });
        setCollectedBank(b => b.filter((_,j) => j !== bankIdx));
        checkPlacementDirect(item.letter, targetSlot);
        setSelBank(null); setSelSlot(null);
        return;
      }
      if (e.key === "Escape") { e.preventDefault(); setSelBank(null); setSelSlot(null); }
      else if (e.key === "Tab") {
        e.preventDefault();
        if (!e.shiftKey) {
          setSelSlot(null);
          setSelBank(prev => {
            const bankLen = collectedBankRef.current.length;
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
            return allSlots[(idx+1) % allSlots.length];
          });
        }
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const bRef = selBankRef.current;
        const sRef = selSlotRef.current;
        if (bRef !== null) { const el = document.getElementById("bank-"+bRef); if(el) el.click(); }
        else if (sRef !== null) { const el = document.getElementById("slot-"+sRef); if(el) el.click(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tryMove]);

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
      const item      = collectedBank[i];
      const displaced = griddleLetters[selSlot];
      setGriddleLetters(g => { const n=[...g]; n[selSlot]=item.letter; return n; });
      if (displaced !== null)
        setCollectedBank(b => { const n=[...b]; n[i]={ letter:displaced, msgIdx:selSlot }; return n; });
      else
        setCollectedBank(b => b.filter((_,j) => j !== i));
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
      const item      = collectedBank[selBank];
      const displaced = griddleLetters[si];
      setGriddleLetters(g => { const n=[...g]; n[si]=item.letter; return n; });
      if (displaced !== null)
        setCollectedBank(b => { const n=[...b]; n[selBank]={ letter:displaced, msgIdx:si }; return n; });
      else
        setCollectedBank(b => b.filter((_,idx) => idx !== selBank));
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
      setFunFact(FUN_FACTS[Math.floor(Math.random()*FUN_FACTS.length)]);
      const confettiColors = isRoadTrip
        ? ["#fbbf24","#f97316","#ef4444","#fde68a","#fb923c","#fcd34d"]
        : isEvening
          ? ["#818cf8","#c4b5fd","#e879f9","#a5b4fc","#6ee7b7","#fbbf24"]
          : ["#fde68a","#7dd3fc","#fb923c","#f9a8d4","#fbbf24","#38bdf8"];
      setConfetti(Array.from({ length:80 }, (_,i) => ({
        id:i, x:Math.random()*100, delay:Math.random()*1.2,
        dur:2+Math.random()*2,
        color:confettiColors[i%6],
        size:6+Math.random()*8, rot:Math.random()*360,
      })));
      setTimeout(() => setShowFunFact(true), 900);
    } else {
      setWrongAns(true);
      setTimeout(() => setWrongAns(false), 900);
    }
  };

  const handleShare = async () => {
    const charmCount = foundCharms.size;
    const total      = Object.keys(CHARM_MAP).length;
    const titleLine  = isRoadTrip
      ? "🚗 I solved the Letter Griddle Maze -- Road Trip!"
      : isEvening
        ? "🌙 I solved the Letter Griddle Maze -- Summer Evenings!"
        : "☀️ I solved the Letter Griddle Maze -- Summer Days!";
    const charmEmoji  = isRoadTrip ? "🗺️" : isEvening ? "✨" : "🐚";
    const secretEmoji = isRoadTrip ? "🎵" : isEvening ? "🔥" : "🌊";
    const text =
      titleLine + "\n\n" +
      charmEmoji + " Found " + charmCount + "/" + total + " charms\n" +
      secretEmoji + " I revealed the secret message!\n\n" +
      "lettergriddle.com/maze\n" +
      "📚 Read Letter Griddle Stories:\n" +
      "lettergriddlecafe.com\n" +
      "🥞 More: lettergriddle.com";
    const shareTitle = isRoadTrip
      ? "Letter Griddle Maze - Road Trip"
      : isEvening
        ? "Letter Griddle Maze - Summer Evenings"
        : "Letter Griddle Maze - Summer Days";
    if (navigator.share) {
      try { await navigator.share({ title:shareTitle, text }); return; } catch(e){}
    }
    try { await navigator.clipboard.writeText(text); } catch(e){}
    setCopyMsg(true);
    setTimeout(() => setCopyMsg(false), 2500);
  };

  const resetForPuzzle = pIdx => {
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
    setSelBank(null); setSelSlot(null);
    wonRef.current = false;
    setWon(false);
    setWrongAns(false);
    setConfetti([]);
    setShowFunFact(false);
    setCopyMsg(false);
    setStartPulse(true);
    setTimeout(() => setStartPulse(false), 6000);
  };

  const reset        = () => resetForPuzzle(puzzleIdx);
  const switchPuzzle = () => {
    const next = (puzzleIdx+1) % PUZZLES.length;
    setPuzzleIdx(next);
    resetForPuzzle(next);
  };

  const gotCount = [...collectedSet].filter(k => LETTER_MAP[k] && !LETTER_MAP[k].preFilled).length;
  const allPlaced = collectedBank.length === 0;

  const CharmIcon = ({ emoji }) => (
    <span dangerouslySetInnerHTML={{ __html:CHARM_DISPLAY[emoji] }} />
  );

  const isEvening  = puzzleIdx >= 3 && puzzleIdx < 6;
  const isRoadTrip = puzzleIdx >= 6;

  const bgGradient = isRoadTrip
    ? "linear-gradient(160deg, #7c2d12 0%, #9a3412 25%, #c2410c 55%, #d97706 85%, #fbbf24 100%)"
    : isEvening
      ? "linear-gradient(160deg, #0f0a1e 0%, #1e1b4b 30%, #312e81 65%, #1e3a5f 100%)"
      : "linear-gradient(160deg, #0c4a6e 0%, #075985 30%, #b45309 85%, #d97706 100%)";

  const playerEmoji  = isRoadTrip ? "🚗" : isEvening ? "🌙" : "☀️";
  const headerEmoji1 = isRoadTrip ? "🚗" : isEvening ? "🔥" : "🏖️";
  const headerEmoji2 = isRoadTrip ? "🎵" : isEvening ? "✨" : "🌊";

  const subheadText = won
    ? (isRoadTrip ? "Road trip complete!" : isEvening ? "Summer evening complete!" : "Summer complete!")
    : rearrangeMode
      ? (isRoadTrip ? "Arrange letters for the road trip phrase!" : isEvening ? "Arrange letters for the evening phrase!" : "Arrange letters for the summer phrase!")
      : (isRoadTrip ? "Road Trip Adventure!" : isEvening ? "Summer Evening Adventure!" : "Summer Days Adventure!");

  return (
    <div
      className={BG}
      style={{
        fontFamily:FONT,
        userSelect:"none",
        background:bgGradient,
        minHeight:"100vh",
        transition:"background 1s ease",
      }}
    >
      <style>{`
        @keyframes shimmerA { 0%,100%{opacity:0;transform:scale(.5) translateY(0)} 50%{opacity:.4;transform:scale(1.4) translateY(-10px)} }
        @keyframes popA     { 0%{transform:scale(0) rotate(-20deg);opacity:0} 65%{transform:scale(1.3) rotate(4deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes glowSun  { 0%,100%{text-shadow:0 0 15px #fbbf24} 50%{text-shadow:0 0 45px #fbbf24,0 0 80px #fde68a} }
        @keyframes nudgeA   { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }
        @keyframes spinA    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes charmIn  { 0%{opacity:0;transform:translateY(10px) scale(.85)} 100%{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes fallA    { 0%{opacity:1;transform:translateY(0) rotate(0deg)} 100%{opacity:0;transform:translateY(110vh) rotate(720deg)} }
        @keyframes factIn   { 0%{opacity:0;transform:scale(.9)} 100%{opacity:1;transform:scale(1)} }
        @keyframes slideUp  { 0%{opacity:0;transform:translateY(20px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes shake    { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-5px)} 40%{transform:translateX(5px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
        @keyframes waveFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>

      {/* Shimmer bg */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {shimmer.map(p => (
          <div key={p.id} className="absolute rounded-full"
            style={{ left:p.x+"%", top:p.y+"%", width:p.size, height:p.size,
              background:p.color, boxShadow:"0 0 "+(p.size*2)+"px "+p.color,
              animation:"shimmerA "+p.dur+"s ease-in-out "+p.delay+"s infinite", opacity:0 }} />
        ))}
      </div>

      {/* Confetti */}
      {won && confetti.map(p => (
        <div key={p.id} className="fixed pointer-events-none z-50"
          style={{ left:p.x+"%", top:"-20px", animation:"fallA "+p.dur+"s ease-in "+p.delay+"s forwards", opacity:0 }}>
          <div style={{ width:p.size, height:p.size, background:p.color,
            borderRadius:p.id%2===0?"50%":"2px", transform:"rotate("+p.rot+"deg)" }} />
        </div>
      ))}

      {/* Charm popup */}
      {charmPopup && (
        <div className="fixed z-50 left-1/2 top-20 -translate-x-1/2 pointer-events-none"
          style={{ animation:"charmIn .35s ease-out forwards" }}>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border shadow-2xl"
            style={{ background:"linear-gradient(135deg,#0c4a6e,#075985)", borderColor:"#38bdf8", boxShadow:"0 0 30px #7dd3fc66" }}>
            <span className="text-3xl"
              style={{ animation:"spinA "+charmPopup.spin+" linear infinite", display:"inline-block" }}
              dangerouslySetInnerHTML={{ __html:charmPopup.display }} />
            <p className="text-sky-100 text-sm font-medium" style={{ maxWidth:200 }}>{charmPopup.msg}</p>
          </div>
        </div>
      )}

      {/* Fun fact modal */}
      {showFunFact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowFunFact(false)}>
          <div className="rounded-2xl p-6 max-w-sm w-full border shadow-2xl text-center"
            style={{ background:"linear-gradient(135deg,#0c4a6e,#0369a1)", borderColor:"#38bdf8", animation:"factIn .4s ease-out" }}>
            <div className="text-4xl mb-3">🐚</div>
            <h3 className="text-sky-200 font-bold text-base mb-2">Did You Know?</h3>
            <p className="text-sky-100 text-sm leading-relaxed mb-4">{funFact}</p>
            <button onClick={() => setShowFunFact(false)}
              className="px-5 py-2 rounded-full font-bold text-sm transition-all"
              style={{ background:"#fbbf24", color:"#1e3a5f" }}>
              Lovely!
            </button>
          </div>
        </div>
      )}

      {/* How to play modal */}
      {showHowTo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowHowTo(false)}>
          <div className="rounded-2xl p-5 max-w-sm w-full border shadow-2xl"
            style={{ background:"linear-gradient(135deg,#0c4a6e,#0369a1)", borderColor:"#38bdf8", animation:"factIn .3s ease-out" }}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sky-200 font-bold text-base">How to Play</h3>
              <button onClick={() => setShowHowTo(false)}
                className="text-sky-400 hover:text-sky-200 text-xl leading-none">X</button>
            </div>
            <div className="space-y-3 text-sky-100 text-sm leading-relaxed">
              <p>Navigate your <strong>{isRoadTrip ? "car 🚗" : isEvening ? "moon 🌙" : "sun ☀️"}</strong> through the maze using the d-pad, arrow keys, tap, or swipe.</p>
              <p><span style={{ color:"#fb923c" }} className="font-bold">Sandy orange tiles</span> are letters to collect -- walk right over them!</p>
              <p><span style={{ color:"#2dd4bf" }} className="font-bold">Teal tiles</span> are already filled in the griddle below.</p>
              <p>Hidden <strong>beach charms</strong> are waiting along the path for a surprise message!</p>
              <p>Reach the <strong>star ⭐</strong> to finish the maze, then arrange your letters to reveal the summer phrase.</p>
              <p>Tap a letter from your bank, then tap a slot to place it. Double-tap a filled slot to return it to your bank.</p>
              <p>Use <strong>Shuffle</strong> to mix your letter bank.</p>
              <p>Tap <strong>🏖️</strong> in the header to mix your beach soundscape!</p>
            </div>
            <button onClick={() => setShowHowTo(false)}
              className="mt-4 w-full py-2 rounded-full font-bold text-sm transition-all"
              style={{ background:"#fbbf24", color:"#1e3a5f" }}>
              Let's go! ☀️
            </button>
          </div>
        </div>
      )}

      {/* Beach sound modal — top-level component, no blink */}
      {showSound && (
        <BeachSoundModal soundRef={soundRef} onClose={() => setShowSound(false)} />
      )}

      {/* Copy toast */}
      {copyMsg && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          style={{ animation:"slideUp .3s ease-out" }}>
          <div className="px-5 py-2 rounded-full border text-sm shadow-xl"
            style={{ background:"#0c4a6e", borderColor:"#38bdf8", color:"#e0f2fe" }}>
            Copied to clipboard!
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <div className="relative z-10 text-center mb-1 w-full max-w-sm">
        <div className="flex items-center justify-between px-1">
          <button onClick={() => setShowHowTo(true)}
            className="w-8 h-8 rounded-full border text-sm flex items-center justify-center transition-all"
            style={{ background:"rgba(255,255,255,0.15)", borderColor:"#7dd3fc", color:"#e0f2fe" }}>
            ?
          </button>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">{headerEmoji1}</span>
              <h1 className="text-base font-bold tracking-widest uppercase"
                style={{ color:"#fde68a", textShadow:"0 0 16px #fbbf24" }}>
                Letter Griddle Maze
              </h1>
              <span className="text-xl">{headerEmoji2}</span>
            </div>
            <p className="text-xs mt-0.5" style={{ color:"#7dd3fc" }}>{subheadText}</p>
            <p className="text-xs" style={{ color:"rgba(125,211,252,0.6)" }}>
              Puzzle {puzzleIdx+1} of {PUZZLES.length}
            </p>
          </div>
          {/* Sound button */}
          <button onClick={() => setShowSound(true)}
            className="w-8 h-8 rounded-full border text-base flex items-center justify-center transition-all"
            style={{ background:"rgba(255,255,255,0.15)", borderColor:"#fbbf24", color:"#fde68a" }}
            title="Beach sounds">
            🏖️
          </button>
        </div>
      </div>

      {/* ── WELCOME ── */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ background:"rgba(7,24,56,0.92)" }}>
          <div className="rounded-3xl p-8 max-w-sm w-full border-2 shadow-2xl text-center"
            style={{ background:"linear-gradient(160deg,#0c4a6e,#075985,#0c4a6e)", borderColor:"#38bdf8", boxShadow:"0 0 40px #7dd3fc44" }}>
            <div className="text-5xl mb-3" style={{ animation:"waveFloat 2s ease-in-out infinite", display:"inline-block" }}>☀️</div>
            <h2 className="text-xl font-bold tracking-widest uppercase mb-1"
              style={{ color:"#fde68a", textShadow:"0 0 16px #fbbf24" }}>
              Summer Days
            </h2>
            <p className="text-sm mb-4" style={{ color:"#7dd3fc" }}>Letter Griddle Maze</p>
            <div className="space-y-3 text-sm leading-relaxed text-left mb-6" style={{ color:"#e0f2fe" }}>
              <p className="flex items-start gap-2">
                <span className="text-lg mt-0.5">☀️</span>
                <span>Navigate your <strong>{isEvening ? "moon" : "sun"}</strong> {playerEmoji} through the maze using the <strong>d-pad</strong>, <strong>arrow keys</strong>, <strong>tap</strong>, or <strong>swipe</strong>.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-lg mt-0.5">🟠</span>
                <span>Walk over <strong style={{ color:"#fb923c" }}>sandy orange tiles</strong> to collect letters.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-lg mt-0.5">🐚</span>
                <span>Find hidden <strong>beach charms</strong> along the path for a surprise!</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-lg mt-0.5">⭐</span>
                <span>Reach the <strong>star</strong> to unlock the letter griddle.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-lg mt-0.5">🧩</span>
                <span>Then <strong>arrange your letters</strong> to reveal the summer phrase!</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-lg mt-0.5">🏖️</span>
                <span>Tap <strong>🏖️</strong> in the header to mix your beach soundscape!</span>
              </p>
            </div>
            <button onClick={() => setShowWelcome(false)}
              className="w-full py-3 rounded-full font-bold text-base transition-all shadow-lg"
              style={{ background:"#fbbf24", color:"#1e3a5f" }}>
              {isRoadTrip ? "Let's Hit the Road! 🚗" : isEvening ? "Let's Find Fireflies! ✨" : "Let's Hit the Beach! 🏖️"}
            </button>
          </div>
        </div>
      )}

      {/* ── MAZE PHASE ── */}
      {!rearrangeMode && !won && (
        <>
          <div className="relative z-10 flex gap-3 text-xs mb-2" style={{ color:"#bae6fd" }}>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-md inline-block" style={{ background:"#2dd4bf" }} />
              Pre-filled
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-md inline-block" style={{ background:"#fb923c" }} />
              Collect me
            </span>
            <span className="flex items-center gap-1">
              <span className="text-sm">🐚</span>
              Charm
            </span>
          </div>

          <div
            className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
            style={{ width:COLS*CELL, maxWidth:"100vw", border:"2px solid #0ea5e9" }}
            onTouchStart={onMazeTouchStart}
            onTouchEnd={onMazeTouchEnd}
          >
            <div style={{ display:"grid", gridTemplateColumns:`repeat(${COLS}, ${CELL}px)`, gridTemplateRows:`repeat(${ROWS}, ${CELL}px)` }}>
              {RAW_MAZE.map((row,r) => row.map((cell,c) => {
                const key      = `${r}-${c}`;
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
                const cellBg   = cell===0 ? "#0c2d4f" : "#1e5f8f";

                return (
                  <div key={key}
                    onClick={() => { const dr=r-playerPos.r, dc=c-playerPos.c; if(Math.abs(dr)+Math.abs(dc)===1) tryMove(dr,dc); }}
                    style={{ width:CELL, height:CELL, background:cellBg, position:"relative" }}
                    className={"flex items-center justify-center "+(isOpen&&!isPlayer?"cursor-pointer":"")}>
                    {isOpen && !isPlayer && (
                      <div className="absolute inset-0 pointer-events-none"
                        style={{ background:"radial-gradient(circle,rgba(253,230,138,0.06),transparent 80%)" }} />
                    )}
                    {isHint && !isPlayer && (
                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <span className="text-xl font-bold" style={{ color:"#fb923c", animation:"nudgeA .7s ease-in-out infinite" }}>➜</span>
                      </div>
                    )}
                    {arrow && !isPlayer && !entry && !charm && !isHint && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-sm opacity-30" style={{ color:"#7dd3fc" }}>{arrow}</span>
                      </div>
                    )}
                    {charm && !charmFound && !isPlayer && (
                      <div className="z-10 flex items-center justify-center w-full h-full">
                        <div className="absolute w-9 h-9 rounded-full opacity-30"
                          style={{ background:"radial-gradient(circle,#fde68a,transparent)", animation:"spinA "+charm.spin+" linear infinite" }} />
                        <span className="text-xl relative z-10" style={{ animation:"spinA "+charm.spin+" linear infinite", display:"inline-block" }}>
                          <CharmIcon emoji={charm.emoji} />
                        </span>
                      </div>
                    )}
                    {charm && charmFound && !isPlayer && (
                      <div className="text-xs opacity-30">✨</div>
                    )}
                    {entry && !isGot && !isPlayer && (
                      <div className="z-10 w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold border-2 shadow-lg"
                        style={entry.preFilled
                          ? { background:"#2dd4bf", borderColor:"#99f6e4", color:"#0f3d38" }
                          : { background:"#fb923c", borderColor:"#fed7aa", color:"#7c2d12" }}>
                        {entry.display}
                      </div>
                    )}
                    {isFlash && (
                      <div className="z-20 text-xl" style={{ animation:"popA .5s ease-out" }}>⭐</div>
                    )}
                    {isGot && entry && !entry.preFilled && !isPlayer && !isFlash && (
                      <div className="w-2 h-2 rounded-full" style={{ background:"rgba(253,230,138,0.3)" }} />
                    )}
                    {isPlayer && (
                      <div className="z-20 flex items-center justify-center text-3xl" style={{ filter:"drop-shadow(0 0 8px #fde68a)", lineHeight:1 }}>
                        {playerEmoji}
                      </div>
                    )}
                    {isEnd && !isPlayer && (
                      <div className="z-10 text-2xl animate-bounce">⭐</div>
                    )}
                  </div>
                );
              }))}
            </div>
          </div>

          {/* D-pad */}
          <div className="relative z-10 mt-3 flex flex-col items-center gap-1">
            <button onTouchStart={dpadPress(-1,0)} onTouchEnd={e=>e.stopPropagation()} onClick={()=>tryMove(-1,0)}
              className="w-12 h-11 rounded-xl border text-xl shadow-lg transition-all active:scale-95"
              style={{ background:"rgba(14,165,233,0.3)", borderColor:"#38bdf8", color:"#e0f2fe" }}>▲</button>
            <div className="flex gap-1">
              <button onTouchStart={dpadPress(0,-1)} onTouchEnd={e=>e.stopPropagation()} onClick={()=>tryMove(0,-1)}
                className="w-12 h-11 rounded-xl border text-xl shadow-lg transition-all active:scale-95"
                style={{ background:"rgba(14,165,233,0.3)", borderColor:"#38bdf8", color:"#e0f2fe" }}>◀</button>
              <div className="w-12 h-11 rounded-xl border flex items-center justify-center text-2xl"
                style={{ background:"rgba(7,24,56,0.5)", borderColor:"#0284c7" }}>{playerEmoji}</div>
              <button onTouchStart={dpadPress(0,1)} onTouchEnd={e=>e.stopPropagation()} onClick={()=>tryMove(0,1)}
                className="w-12 h-11 rounded-xl border text-xl shadow-lg transition-all active:scale-95"
                style={{ background:"rgba(14,165,233,0.3)", borderColor:"#38bdf8", color:"#e0f2fe" }}>▶</button>
            </div>
            <button onTouchStart={dpadPress(1,0)} onTouchEnd={e=>e.stopPropagation()} onClick={()=>tryMove(1,0)}
              className="w-12 h-11 rounded-xl border text-xl shadow-lg transition-all active:scale-95"
              style={{ background:"rgba(14,165,233,0.3)", borderColor:"#38bdf8", color:"#e0f2fe" }}>▼</button>
          </div>

          {/* Charm tracker */}
          <div className="relative z-10 mt-2 flex gap-1 items-center">
            {Object.keys(CHARM_MAP).map((key,i) => (
              <span key={i} className="text-lg transition-all"
                style={{ opacity:foundCharms.has(key)?1:0.25, filter:foundCharms.has(key)?"drop-shadow(0 0 4px #fbbf24)":"none" }}>
                <CharmIcon emoji={CHARM_MAP[key].emoji} />
              </span>
            ))}
            <span className="text-xs ml-1" style={{ color:"#7dd3fc" }}>
              {foundCharms.size}/{Object.keys(CHARM_MAP).length} charms
            </span>
          </div>
        </>
      )}

      {/* ── REARRANGE PHASE ── */}
      {rearrangeMode && !won && (
        <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-3 mt-1 px-3">
          <p className="text-sm text-center" style={{ color:"#bae6fd" }}>
            {isRoadTrip ? "Rest stop! 🚗 Place your letters into the griddle." : isEvening ? "You made it through the night! 🌙 Place your letters into the griddle." : "You made it to shore! ☀️ Place your letters into the griddle."}
          </p>
          <div className="w-full">
            <div className="flex items-center justify-between mb-1 px-1">
              <p className="text-xs tracking-wider uppercase" style={{ color:"#7dd3fc" }}>Your letters</p>
              <button onClick={shuffleBank}
                className="flex items-center gap-1 px-3 py-1 rounded-full border text-xs transition-all active:scale-95"
                style={{ background:"rgba(14,165,233,0.2)", borderColor:"#38bdf8", color:"#e0f2fe" }}>
                🌊 Shuffle
              </button>
            </div>
            <div className="flex gap-2 flex-wrap justify-center p-3 rounded-2xl border min-h-14"
              style={{ background:"rgba(12,42,78,0.8)", borderColor:"#0ea5e9" }}>
              {collectedBank.length === 0
                ? <span className="text-xs self-center" style={{ color:"#38bdf8" }}>All placed!</span>
                : collectedBank.map((item,i) => (
                  <div key={i} id={"bank-"+i} onClick={() => clickBank(i)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold border-2 cursor-pointer transition-all"
                    style={selBank===i
                      ? { background:"#fb923c", borderColor:"#fed7aa", color:"#7c2d12", transform:"scale(1.1)", boxShadow:"0 4px 12px rgba(251,146,60,0.4)", animation:"popA .3s ease-out" }
                      : { background:"#f97316", borderColor:"#fdba74", color:"#7c2d12", animation:"popA .3s ease-out" }}>
                    {item.letter}
                  </div>
                ))
              }
            </div>
          </div>
          <p className="text-xs text-center" style={{ color:"rgba(186,230,253,0.7)" }}>
            {selBank !== null ? "Tap a slot in the griddle below"
              : selSlot !== null ? "Tap another slot to swap, or same slot to deselect"
              : "Tap a letter above, then tap a slot. Double-tap a slot to return it."}
          </p>
          {foundCharms.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color:"#7dd3fc" }}>Charms:</span>
              {Object.keys(CHARM_MAP).map((key,i) => (
                <span key={i} className="text-base" style={{ opacity:foundCharms.has(key)?1:0.2 }}>
                  <CharmIcon emoji={CHARM_MAP[key].emoji} />
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── WIN SCREEN ── */}
      {won && (
        <div className="relative z-10 flex flex-col items-center gap-3 mt-2 px-4">
          <div className="text-5xl" style={{ animation:"waveFloat 1.5s ease-in-out infinite", display:"inline-block" }}>{isRoadTrip?"🚗":isEvening?"🌙":"☀️"}</div>
          <h2 className="text-xl font-bold text-center" style={{ animation:"glowSun 2s ease-in-out infinite", color:"#fde68a" }}>
            {puzzle.winMsg}
          </h2>
          {foundCharms.size === Object.keys(CHARM_MAP).length
            ? <p className="text-sm text-center" style={{ color:"#7dd3fc" }}>You found ALL {foundCharms.size} beach charms! Summer master! 🏆</p>
            : <p className="text-sm text-center" style={{ color:"#7dd3fc" }}>Found {foundCharms.size}/{Object.keys(CHARM_MAP).length} charms -- play again to find them all!</p>
          }
          <div className="flex gap-2">
            {Object.keys(CHARM_MAP).map((key,i) => (
              <span key={i} className="text-2xl"
                style={{ opacity:foundCharms.has(key)?1:0.2, filter:foundCharms.has(key)?"drop-shadow(0 0 6px #fbbf24)":"none" }}>
                <CharmIcon emoji={CHARM_MAP[key].emoji} />
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap justify-center mt-1">
            <button onClick={handleShare}
              className="px-5 py-2 rounded-full font-bold text-sm transition-all"
              style={{ background:"#0ea5e9", color:"#fff" }}>
              Share Results 🌊
            </button>
            <button onClick={() => setShowFunFact(true)}
              className="px-5 py-2 rounded-full font-bold text-sm transition-all"
              style={{ background:"#fbbf24", color:"#1e3a5f" }}>
              Fun Fact ☀️
            </button>
            <button onClick={reset}
              className="px-5 py-2 rounded-full border font-bold text-sm transition-all"
              style={{ background:"rgba(14,165,233,0.2)", borderColor:"#38bdf8", color:"#e0f2fe" }}>
              Play Again
            </button>
            <button onClick={switchPuzzle}
              className="px-5 py-2 rounded-full border font-bold text-sm transition-all"
              style={{ background:"rgba(251,146,60,0.3)", borderColor:"#fb923c", color:"#fde68a" }}>
              {puzzle.nextLabel}
            </button>
          </div>
        </div>
      )}

      {/* ── LETTER GRIDDLE ── */}
      <div className="relative z-10 mt-4 w-full max-w-sm px-2">
        <div className="rounded-2xl shadow-2xl border"
          style={{ background:"linear-gradient(to bottom, #1e3a5f, #164e63)", borderColor:"#0ea5e9" }}>
          <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor:"#0c4a6e" }}>
            <span className="text-xs tracking-widest uppercase" style={{ color:"#7dd3fc" }}>Letter Griddle</span>
            <span>🥞</span>
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
                      const isSel  = selSlot===si;
                      let style;
                      if (isPre)              style = { background:"#2dd4bf", borderColor:"#99f6e4", color:"#0f3d38" };
                      else if (letter&&isSel) style = { background:"#fb923c", borderColor:"#fed7aa", color:"#7c2d12", transform:"scale(1.1)", boxShadow:"0 4px 12px rgba(251,146,60,0.4)" };
                      else if (letter)        style = { background:"#f97316", borderColor:"#fdba74", color:"#7c2d12" };
                      else if (wrongAns)      style = { background:"#7f1d1d", borderColor:"#dc2626" };
                      else if (isSel)         style = { background:"rgba(14,165,233,0.3)", borderColor:"#38bdf8", transform:"scale(1.1)" };
                      else                    style = { background:"rgba(12,42,78,0.8)", borderColor:"#0c4a6e" };
                      return (
                        <div key={si} id={"slot-"+si}
                          onClick={() => rearrangeMode && clickSlot(si)}
                          onDoubleClick={() => rearrangeMode && returnToBank(si)}
                          className={"w-9 h-10 rounded-lg flex items-center justify-center text-sm font-bold border-2 select-none transition-all "+(rearrangeMode&&!isPre?"cursor-pointer":"cursor-default")}
                          style={{ ...style, fontFamily:FONT, animation:shakingSlot===si?"shake 0.5s ease-in-out":"none", color:style.color||"#e0f2fe" }}>
                          {letter||""}
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
              <div className="flex justify-between text-xs mb-1" style={{ color:"#38bdf8" }}>
                <span>Letters found</span>
                <span>{gotCount}/{totalCollect}</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background:"rgba(12,42,78,0.8)" }}>
                <div className="h-full rounded-full transition-all"
                  style={{ width:(totalCollect>0?(gotCount/totalCollect)*100:0)+"%", background:"#fb923c" }} />
              </div>
              <p className="text-xs text-center mt-2" style={{ color:"rgba(125,211,252,0.5)" }}>
                Letters appear here after you reach the star!
              </p>
            </div>
          )}

          {rearrangeMode && !won && allPlaced && (
            <div className="flex justify-center pb-3">
              <button onClick={checkAnswer}
                className={"px-6 py-2 rounded-full font-bold text-sm transition-all shadow-lg "+(wrongAns?"animate-pulse":"")}
                style={wrongAns
                  ? { background:"#dc2626", color:"#fff" }
                  : { background:"#fbbf24", color:"#1e3a5f" }}>
                {wrongAns ? "Not quite -- keep trying!" : "Check Answer ☀️"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="relative z-10 mt-6 pb-4 text-center space-y-1">
        <a href="https://lettergriddle.com" target="_blank" rel="noopener noreferrer"
          className="text-xs font-medium block transition-colors"
          style={{ color:"#38bdf8" }}>
          lettergriddle.com
        </a>
        <div className="flex items-center justify-center gap-2 text-xs" style={{ color:"rgba(125,211,252,0.5)" }}>
          <a href="https://lettergriddle.com/privacy" target="_blank" rel="noopener noreferrer"
            className="hover:text-sky-300 transition-colors">Privacy Policy</a>
          <span>|</span>
          <a href="https://lettergriddle.com/terms" target="_blank" rel="noopener noreferrer"
            className="hover:text-sky-300 transition-colors">Terms of Service</a>
        </div>
        <p className="text-xs" style={{ color:"rgba(125,211,252,0.3)" }}>© {YEAR} Letter Griddle. All rights reserved.</p>
      </div>
    </div>
  );
}