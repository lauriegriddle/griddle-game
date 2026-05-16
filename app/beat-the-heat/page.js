"use client";
import { useState, useEffect, useRef, useCallback, memo } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// PUZZLE DATA
// ─────────────────────────────────────────────────────────────────────────────
const PUZZLES = [
  { word:"BRISKET",       scrambled:"KETBIRS",      category:"Backyard BBQ",       clue:"A slow-smoked beef cut that melts in your mouth." },
  { word:"SWIMSUIT",      scrambled:"MIWSSUIT",     category:"Pool party",         clue:"Essential attire for taking a dip." },
  { word:"LEMONADE",      scrambled:"ALEDEOMN",     category:"Refreshment",        clue:"Freshly squeezed, tart, and served ice cold." },
  { word:"SURFBOARD",     scrambled:"DRFOABURS",    category:"Beach and ocean",    clue:"Used to catch a wave." },
  { word:"SUNSCREEN",     scrambled:"ENCSNRUSE",    category:"Beach bag",          clue:"Protect your skin from UV rays." },
  { word:"POPSICLE",      scrambled:"PSOICPLE",     category:"Frozen treats",      clue:"Flavored ice on a stick." },
  { word:"SANDCASTLE",    scrambled:"LSDAATENSC",   category:"Sandcastles",        clue:"Build one at the shoreline before the tide comes in." },
  { word:"HAMMOCK",       scrambled:"MHOMACK",      category:"Backyard life",      clue:"Hang it between two trees and sway the afternoon away." },
  { word:"WATERMELON",    scrambled:"WNATELORME",   category:"Tropical fruits",    clue:"Green outside, pink and juicy inside." },
  { word:"FIREFLIES",     scrambled:"FLEIRSIFE",    category:"Summer nights",      clue:"Tiny glowing insects that light up the dusk." },
  { word:"ROLLERCOASTER", scrambled:"LRESRORCTAOEL", category:"Boardwalk",          clue:"A screamingly fast ride by the ocean." },
  { word:"MANGO",         scrambled:"NAGOM",        category:"Tropical fruits",    clue:"Sweet golden flesh inside a rosy skin." },
  { word:"PAPAYA",        scrambled:"AAPAYP",       category:"Tropical fruits",    clue:"Soft orange fruit with tiny black seeds inside." },
  { word:"COCONUT",       scrambled:"TCOONUC",      category:"Tropical fruits",    clue:"Crack it open for milk and sweet white flesh." },
  { word:"VANILLA",       scrambled:"AILLVAN",      category:"Ice cream flavors",  clue:"The classic. Never boring, always beloved." },
  { word:"STRAWBERRY",    scrambled:"YRREBSWRAT",   category:"Ice cream flavors",  clue:"Bright pink and sweet, made from summer's best berry." },
  { word:"PISTACHIO",     scrambled:"IOHACSPIT",    category:"Ice cream flavors",  clue:"Pale green and nutty, a gelato favorite." },
  { word:"CHARCOAL",      scrambled:"LACOHRAC",     category:"Backyard BBQ",       clue:"What heats the grill on a summer cookout." },
  { word:"CORNHOLE",      scrambled:"EHOLNCOR",     category:"Backyard BBQ",       clue:"Toss the beanbag into the hole to score." },
  { word:"SPARKLER",      scrambled:"RAPLEKRS",     category:"Fireworks",          clue:"Hold the wire and watch it fizz and spark." },
  { word:"FIREWORKS",     scrambled:"KRSOWERFI",    category:"Fireworks",          clue:"They light up the sky every Fourth of July." },
  { word:"CAMPFIRE",      scrambled:"PFEMIRCA",     category:"Camping",            clue:"Gather round. Marshmallows won't toast themselves." },
  { word:"LIGHTNING",     scrambled:"GHTNINLGI",    category:"Summer storms",      clue:"A flash in the sky before the thunder rolls." },
  { word:"HURRICANE",     scrambled:"NACRIRHUE",    category:"Summer storms",      clue:"The fiercest summer storm, spinning with power." },
  { word:"SNORKEL",       scrambled:"NRKOLSE",      category:"Coral reef",         clue:"Breathe above water while peering at what's below." },
  { word:"SEASHELL",      scrambled:"SLHAELES",     category:"Beach and ocean",    clue:"Pick it up and you might hear the ocean." },
  { word:"TIDEPOOLS",     scrambled:"LOSEDPOIT",    category:"Beach and ocean",    clue:"Tiny ecosystems left behind when the tide goes out." },
  { word:"SUNFLOWER",     scrambled:"REWFONULS",    category:"Farmers market",     clue:"Tall, golden, and always facing the sun." },
  { word:"BLUEBERRY",     scrambled:"YREBRLEUB",    category:"Farmers market",     clue:"Tiny, deep blue, and perfect in a muffin." },
  { word:"SAILBOAT",      scrambled:"BALOATIS",     category:"Sailing and boats",  clue:"Wind fills its sails and it glides across the water." },
  { word:"BUTTERFLY",     scrambled:"TYFLBETUR",    category:"Butterfly garden",   clue:"It starts as a caterpillar and emerges in color." },
  { word:"MONARCH",       scrambled:"RAHCONM",      category:"Butterfly garden",   clue:"Orange and black wings. The most famous migrator." },
  { word:"ROADTRIP",      scrambled:"DORPTIRA",     category:"Road trips",         clue:"Pack the car, pick a playlist, and just drive." },
  { word:"WATERSLIDE",    scrambled:"DELRSWATEI",   category:"Waterpark",          clue:"Climb the stairs, sit down, and hold on tight." },
  { word:"MOCKTAIL",      scrambled:"LTIACKMO",     category:"Summer drinks",      clue:"All the fun of a cocktail with no alcohol required." },
];

// ─────────────────────────────────────────────────────────────────────────────
// ACHIEVEMENTS
// ─────────────────────────────────────────────────────────────────────────────
const ACHIEVEMENTS = [
  { id:"first_scoop",   icon:"🍦", label:"First scoop",   desc:"Complete your first game" },
  { id:"ice_cold",      icon:"🧊", label:"Ice cold",      desc:"Solve all 5 words" },
  { id:"speed_demon",   icon:"⚡", label:"Speed demon",   desc:"Solve a word in under 5 seconds" },
  { id:"cool_streak",   icon:"🌊", label:"Cool streak",   desc:"3 correct answers in a row" },
  { id:"summer_champ",  icon:"🏆", label:"Summer champ",  desc:"Score 400 or more points" },
  { id:"heat_wave",     icon:"🔥", label:"Heat wave",     desc:"Play 3 or more games" },
  { id:"brain_freeze",  icon:"🥶", label:"Brain freeze",  desc:"Perfect game on Ice Cube mode" },
  { id:"no_melt",       icon:"❄️", label:"No melt",       desc:"Solve all 5 with time to spare" },
  { id:"category_king", icon:"👑", label:"Category king", desc:"Solve 3 different categories in one round" },
];

// ─────────────────────────────────────────────────────────────────────────────
// WORD CELEBRATION PHRASES
// ─────────────────────────────────────────────────────────────────────────────
const CELEBRATE_PHRASES = [
  'Sun-sational! ☀️',
  'Making waves! 🌊',
  'Shell yeah! 🐚',
  'Hot stuff! 🔥',
  'Totally beachy! 🏖️',
];
// ─────────────────────────────────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t; }
function lerpRGB(r1,g1,b1,r2,g2,b2,t) {
  return [Math.round(lerp(r1,r2,t)), Math.round(lerp(g1,g2,t)), Math.round(lerp(b1,b2,t))];
}
function rgb(r,g,b) { return `rgb(${r},${g},${b})`; }

function getBg(t) {
  const c0 = lerpRGB(240,249,255, 255,240,248, t);
  const c1 = lerpRGB(224,242,254, 252,231,243, t);
  const c2 = lerpRGB(237,233,254, 255,249,195, t);
  return `linear-gradient(155deg,${rgb(...c0)} 0%,${rgb(...c1)} 50%,${rgb(...c2)} 100%)`;
}
function getTextColor(t)   { return rgb(...lerpRGB(3,105,161,  157,23,77,  t)); }
function getBorderColor(t) { return rgb(...lerpRGB(147,197,253, 249,168,212, t)); }
function getSlotBg(t)      { return rgb(...lerpRGB(240,249,255, 255,240,248, t)); }
function getFilledBg(t) {
  const c1 = lerpRGB(224,242,254, 252,231,243, t);
  const c2 = lerpRGB(186,230,253, 249,168,212, t);
  return `linear-gradient(135deg,${rgb(...c1)},${rgb(...c2)})`;
}
function getIrisBar(t) {
  const a = lerpRGB(186,230,253, 249,168,212, t);
  const b2 = lerpRGB(196,181,253, 253,203,107, t);
  const c = lerpRGB(165,243,252, 196,181,253, t);
  return `linear-gradient(90deg,${rgb(...a)},${rgb(...b2)},${rgb(...c)},${rgb(...a)})`;
}
function getTitleGradient(t) {
  return t < 0.5
    ? 'linear-gradient(90deg,#0369a1,#38bdf8,#a78bfa,#67e8f9,#38bdf8,#0369a1)'
    : 'linear-gradient(90deg,#9d174d,#f472b6,#f59e0b,#fb7185,#f472b6,#9d174d)';
}

// ─────────────────────────────────────────────────────────────────────────────
// SHUFFLE
// ─────────────────────────────────────────────────────────────────────────────
function shuffleArr(a) {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

// ─────────────────────────────────────────────────────────────────────────────
// SOUNDSCAPE ENGINE  (Web Audio API - no files required)
// Copy this section to any Letter Griddle summer game!
// ─────────────────────────────────────────────────────────────────────────────
const STEEL_NOTES  = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33];
const STEEL_MELODY = [
  [0,0.5],[4,0.5],[2,0.5],[4,0.5],[5,0.5],[4,0.5],[2,1.0],
  [0,0.5],[2,0.5],[4,0.5],[3,0.5],[2,0.5],[0,0.5],[1,1.5],
  [4,0.5],[5,0.5],[6,0.5],[5,0.5],[4,0.5],[2,0.5],[0,1.0],
  [3,0.5],[2,0.5],[1,0.5],[2,0.5],[0,2.0],
];
const MELODY_TOTAL = STEEL_MELODY.reduce((s,n) => s + n[1], 0);

function useSoundscape() {
  const ctxRef     = useRef(null);
  const activeRef  = useRef({ waves:false, birds:false, drum:false });
  const volRef     = useRef({ waves:0.6,   birds:0.35,  drum:0.5  });

  // Per-layer master gain nodes — kept alive for smooth volume changes
  const waveGainRef = useRef(null);
  const birdGainRef = useRef(null);
  const drumGainRef = useRef(null);

  // Cleanup handles
  const waveSrcsRef  = useRef([]);  // { src, lfo } pairs
  const birdTimRef   = useRef(null);
  const drumTimRef   = useRef(null);

  // ── Audio context — created once on first user gesture ──────────────────
  async function getCtx() {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctxRef.current.state === 'suspended') {
      await ctxRef.current.resume();
    }
    return ctxRef.current;
  }

  // ── WAVES ────────────────────────────────────────────────────────────────
  // Two filtered noise sources at slightly different swell rates,
  // each amplitude-modulated by a slow sine LFO (always positive 0..1).
  async function startWaves() {
    const c = await getCtx();

    // Master gain for this layer
    const master = c.createGain();
    master.gain.value = volRef.current.waves * 0.7;
    master.connect(c.destination);
    waveGainRef.current = master;

    const srcs = [
      { lfoHz: 0.11, noiseLen: 3, lpf: 380, hpf: 60,  delay: 0   },
      { lfoHz: 0.07, noiseLen: 4, lpf: 320, hpf: 50,  delay: 1.8 },
    ].map(({ lfoHz, noiseLen, lpf, hpf, delay }) => {
      // Pink-ish noise buffer
      const len = Math.floor(c.sampleRate * noiseLen);
      const buf = c.createBuffer(1, len, c.sampleRate);
      const d   = buf.getChannelData(0);
      let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0;
      for (let i = 0; i < len; i++) {
        const wh = Math.random() * 2 - 1;
        b0=0.99886*b0+wh*0.0555179; b1=0.99332*b1+wh*0.0750759;
        b2=0.96900*b2+wh*0.1538520; b3=0.86650*b3+wh*0.3104856;
        b4=0.55000*b4+wh*0.5329522; b5=-0.7616*b5-wh*0.0168980;
        d[i] = (b0+b1+b2+b3+b4+b5+wh*0.5362) * 0.11;
      }

      const src = c.createBufferSource();
      src.buffer = buf; src.loop = true;

      const loPass  = c.createBiquadFilter();
      loPass.type = 'lowpass'; loPass.frequency.value = lpf;
      loPass.Q.value = 0.5;

      const hiPass  = c.createBiquadFilter();
      hiPass.type = 'highpass'; hiPass.frequency.value = hpf;

      // LFO drives a VCA (volume control with always-positive range 0.2..1.0)
      const lfo     = c.createOscillator();
      lfo.type = 'sine'; lfo.frequency.value = lfoHz;

      const lfoGain = c.createGain();
      lfoGain.gain.value = 0.4;   // LFO depth: output swings +/-0.4

      const vca     = c.createGain();
      vca.gain.value = 0.6;       // VCA center: 0.6 +/- 0.4 = 0.2..1.0

      lfo.connect(lfoGain);
      lfoGain.connect(vca.gain);  // AudioParam addition — always >= 0.2

      src.connect(loPass);
      loPass.connect(hiPass);
      hiPass.connect(vca);
      vca.connect(master);

      src.start(c.currentTime + delay);
      lfo.start(c.currentTime + delay);
      return { src, lfo };
    });

    waveSrcsRef.current = srcs;
  }

  function stopWaves() {
    waveSrcsRef.current.forEach(({ src, lfo }) => {
      try { src.stop(); } catch(e){}
      try { lfo.stop(); } catch(e){}
    });
    waveSrcsRef.current = [];
    try { waveGainRef.current?.disconnect(); } catch(e){}
    waveGainRef.current = null;
  }

  // ── BIRDS ────────────────────────────────────────────────────────────────
  // Randomised seagull calls: a long gliding cry and short pip calls.
  async function startBirds() {
    const c = await getCtx();

    const master = c.createGain();
    master.gain.value = volRef.current.birds * 0.55;
    master.connect(c.destination);
    birdGainRef.current = master;

    scheduleBird(c, master);
  }

  function scheduleBird(c, master) {
    if (!activeRef.current.birds) return;
    const ms = 1500 + Math.random() * 4000;
    birdTimRef.current = setTimeout(() => {
      if (!activeRef.current.birds || !birdGainRef.current) return;
      doChirp(c, master);
      scheduleBird(c, master);
    }, ms);
  }

  function doChirp(c, master) {
    const t = c.currentTime;
    if (Math.random() > 0.45) {
      // Long seagull glide cry
      const osc = c.createOscillator();
      const g   = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(820 + Math.random()*180, t);
      osc.frequency.linearRampToValueAtTime(560 + Math.random()*80, t+0.35);
      osc.frequency.linearRampToValueAtTime(740 + Math.random()*60, t+0.6);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.65, t+0.06);
      g.gain.setValueAtTime(0.6, t+0.3);
      g.gain.linearRampToValueAtTime(0, t+0.7);
      osc.connect(g); g.connect(master);
      osc.start(t); osc.stop(t+0.75);
    } else {
      // Short pip(s) — sometimes a double call
      const base = 1100 + Math.random()*400;
      const count = Math.random() > 0.5 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        const t0 = t + i * 0.22;
        const osc = c.createOscillator();
        const g   = c.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(base * (1 - i*0.05), t0);
        osc.frequency.exponentialRampToValueAtTime(base * 0.72, t0+0.13);
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(0.5, t0+0.02);
        g.gain.linearRampToValueAtTime(0, t0+0.16);
        osc.connect(g); g.connect(master);
        osc.start(t0); osc.stop(t0+0.2);
      }
    }
  }

  function stopBirds() {
    clearTimeout(birdTimRef.current);
    try { birdGainRef.current?.disconnect(); } catch(e){}
    birdGainRef.current = null;
  }

  // ── STEEL DRUM ───────────────────────────────────────────────────────────
  // Simulates a steel pan using harmonics with fast attack, natural decay.
  // The characteristic steel drum sound comes from the inharmonic overtones
  // at 2.756x and 5.404x the fundamental.
  function steelNote(c, master, freq, time, dur) {
    const amps    = [0.55, 0.25, 0.10];
    const ratios  = [1, 2.756, 5.404];
    ratios.forEach((ratio, hi) => {
      const osc = c.createOscillator();
      const g   = c.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq * ratio;
      const amp = amps[hi];
      const decay = Math.min(dur * 0.85, 1.4);
      g.gain.setValueAtTime(0, time);
      g.gain.linearRampToValueAtTime(amp, time + 0.006); // sharp attack
      g.gain.exponentialRampToValueAtTime(amp * 0.3, time + decay * 0.35);
      g.gain.exponentialRampToValueAtTime(0.0001, time + decay);
      osc.connect(g); g.connect(master);
      osc.start(time); osc.stop(time + decay + 0.05);
    });
  }

  async function startDrum() {
    const c = await getCtx();

    const master = c.createGain();
    master.gain.value = volRef.current.drum * 0.55;
    master.connect(c.destination);
    drumGainRef.current = master;

    playMelodyLoop(c, master, c.currentTime + 0.1);
  }

  function playMelodyLoop(c, master, startTime) {
    if (!activeRef.current.drum || !drumGainRef.current) return;
    const tempo = 0.58;
    let t = startTime;
    STEEL_MELODY.forEach(([ni, beats]) => {
      steelNote(c, master, STEEL_NOTES[ni], t, beats * tempo);
      t += beats * tempo;
    });
    const loopMs = MELODY_TOTAL * tempo * 1000 - 80;
    drumTimRef.current = setTimeout(() => {
      if (activeRef.current.drum && drumGainRef.current) {
        playMelodyLoop(c, drumGainRef.current, c.currentTime + 0.02);
      }
    }, loopMs);
  }

  function stopDrum() {
    clearTimeout(drumTimRef.current);
    try { drumGainRef.current?.disconnect(); } catch(e){}
    drumGainRef.current = null;
  }

  // ── PUBLIC API ───────────────────────────────────────────────────────────
  function setLayerOn(name, on) {
    activeRef.current[name] = on;
    if (on) {
      if (name==='waves') startWaves();
      if (name==='birds') startBirds();
      if (name==='drum')  startDrum();
    } else {
      if (name==='waves') stopWaves();
      if (name==='birds') stopBirds();
      if (name==='drum')  stopDrum();
    }
  }

  function setLayerVol(name, val) {
    volRef.current[name] = val;
    const mult   = name==='waves' ? 0.7 : name==='birds' ? 0.55 : 0.55;
    const gRef   = name==='waves' ? waveGainRef : name==='birds' ? birdGainRef : drumGainRef;
    if (gRef.current) gRef.current.gain.value = val * mult;
  }

  function stopAll() {
    ['waves','birds','drum'].forEach(k => {
      activeRef.current[k] = false;
    });
    stopWaves(); stopBirds(); stopDrum();
  }

  return { setLayerOn, setLayerVol, stopAll };
}

// ─────────────────────────────────────────────────────────────────────────────
// SOUNDSCAPE MODAL
// Owns its own layer/volume state so parent re-renders never cause a blink.
// Receives only stable refs: the sound engine functions and onClose.
// ─────────────────────────────────────────────────────────────────────────────
const IRIS_FIXED_STYLE = {
  height:4, borderRadius:99, marginBottom:14,
  backgroundImage:'linear-gradient(90deg,#bae6fd,#c4b5fd,#a5f3fc,#f9a8d4,#fde68a,#bae6fd)',
  backgroundSize:'400% auto', animation:'bthShimmer 5s linear infinite',
};
const SHIMMER_BTN_STYLE = {
  display:'block', width:'100%', padding:12, border:'none', borderRadius:14,
  fontSize:14, fontWeight:700, fontFamily:'sans-serif', cursor:'pointer', color:'#3b0764',
  backgroundImage:'linear-gradient(90deg,#bae6fd,#c4b5fd,#f9a8d4,#fde68a,#f9a8d4,#c4b5fd,#bae6fd)',
  backgroundSize:'300% auto', animation:'bthShimmer 6s linear infinite',
};

const SoundModal = memo(function SoundModal({ soundRef, onClose }) {
  const [layers, setLayers] = useState({ waves:false, birds:false, drum:false });
  const [vols,   setVols]   = useState({ waves:60, birds:35, drum:50 });

  function toggle(name) {
    setLayers(prev => {
      const next = !prev[name];
      soundRef.current.setLayerOn(name, next);
      return { ...prev, [name]:next };
    });
  }

  function setVol(name, val) {
    setVols(prev => ({ ...prev, [name]:val }));
    soundRef.current.setLayerVol(name, val / 100);
  }

  const stopAll = e => { e.stopPropagation(); };

  return (
    <div style={{ position:'fixed', inset:0, zIndex:60, background:'rgba(0,0,0,0.32)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}
      onMouseDown={e => { if (e.target===e.currentTarget) onClose(); }}>
      <div style={{ width:'100%', maxWidth:380, borderRadius:22, padding:'18px 16px', background:'linear-gradient(155deg,#f0f9ff 0%,#e0f2fe 40%,#ede9fe 75%,#fce7f3 100%)' }}
        onMouseDown={stopAll} onClick={stopAll}>
        <div style={IRIS_FIXED_STYLE} />
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <h2 style={{ fontSize:18, fontWeight:700, backgroundImage:'linear-gradient(90deg,#0369a1,#38bdf8,#a78bfa,#f472b6,#0369a1)', backgroundSize:'300% auto', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent', animation:'bthShimmerSlow 6s linear infinite' }}>
            Summer soundscape
          </h2>
          <button onClick={onClose} style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:'#6b7280' }}>✕</button>
        </div>
        <p style={{ fontSize:11, fontFamily:'sans-serif', color:'#6b6b8d', fontStyle:'italic', marginBottom:14 }}>
          Layer the sounds you love. Mix your perfect summer moment.
        </p>
        {[
          { id:'waves', icon:'🌊', name:'Ocean waves',  desc:'Steady swells rolling onto the shore' },
          { id:'birds', icon:'🐦', name:'Seabirds',     desc:'Gulls calling lazily overhead' },
          { id:'drum',  icon:'🥁', name:'Steel drum',   desc:'A gentle island melody drifting by' },
        ].map((layer, li) => (
          <div key={layer.id} style={{ background: layers[layer.id] ? 'rgba(196,181,253,0.18)' : 'rgba(255,255,255,0.42)', border:`1px solid ${layers[layer.id] ? '#a78bfa' : '#bae6fd'}`, borderRadius:14, padding:'12px 14px', marginBottom:10, transition:'background .3s,border-color .3s' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
              <span style={{ fontSize:26, animation:`bthFloat 3s ease-in-out ${li*0.4}s infinite` }}>{layer.icon}</span>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:13, fontWeight:700, color:'#1e3a5f', fontFamily:'sans-serif' }}>{layer.name}</p>
                <p style={{ fontSize:11, color:'#5b8fa8', fontFamily:'sans-serif', marginTop:1 }}>{layer.desc}</p>
              </div>
              <div onClick={() => toggle(layer.id)}
                style={{ width:44, height:24, borderRadius:99, cursor:'pointer', position:'relative', background: layers[layer.id] ? 'linear-gradient(90deg,#38bdf8,#a78bfa)' : '#cbd5e1', transition:'background .3s', flexShrink:0 }}>
                <div style={{ position:'absolute', width:18, height:18, borderRadius:'50%', background:'white', top:3, left: layers[layer.id] ? 23 : 3, transition:'left .25s', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}
              onMouseDown={stopAll} onPointerDown={stopAll}>
              <span style={{ fontSize:12, fontFamily:'sans-serif', color:'#5b8fa8' }}>🔉</span>
              <input type="range" min="0" max="100" step="1"
                value={vols[layer.id]}
                onChange={e => setVol(layer.id, Number(e.target.value))}
                onMouseDown={stopAll} onPointerDown={stopAll}
                style={{ flex:1, accentColor:'#a78bfa', cursor:'pointer' }} />
              <span style={{ fontSize:11, fontFamily:'sans-serif', color:'#5b8fa8', minWidth:28, textAlign:'right' }}>{vols[layer.id]}%</span>
            </div>
          </div>
        ))}
        <p style={{ fontSize:10, fontFamily:'sans-serif', color:'#94a3b8', textAlign:'center', marginBottom:12, fontStyle:'italic' }}>
          Sounds are generated in your browser. No files downloaded.
        </p>
        <button onClick={onClose} style={SHIMMER_BTN_STYLE}>Back to the game ☀️</button>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO PLAY MODAL  — top-level for same reason
// ─────────────────────────────────────────────────────────────────────────────
function HowToPlay({ onClose }) {
  const stopBoth = e => { e.stopPropagation(); };
  return (
    <div style={{ position:'fixed', inset:0, zIndex:50, background:'rgba(0,0,0,0.35)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}
      onMouseDown={e => { if (e.target===e.currentTarget) onClose(); }}>
      <div style={{ width:'100%', maxWidth:420, maxHeight:'90vh', overflowY:'auto', borderRadius:22, padding:'18px 16px', background:'linear-gradient(155deg,#f0f9ff 0%,#e0f2fe 40%,#ede9fe 75%,#fce7f3 100%)' }}
        onMouseDown={stopBoth} onClick={stopBoth}>
        <div style={IRIS_FIXED_STYLE} />
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
          <h2 style={{ fontSize:20, fontWeight:700, backgroundImage:'linear-gradient(90deg,#0369a1,#38bdf8,#a78bfa,#f472b6,#0369a1)', backgroundSize:'300% auto', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent', animation:'bthShimmerSlow 6s linear infinite' }}>
            How to play
          </h2>
          <button onClick={onClose} style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:'#6b7280' }}>✕</button>
        </div>
        <p style={{ fontSize:11, fontStyle:'italic', color:'#6b6b8d', fontFamily:'sans-serif', marginBottom:14 }}>Beat the Heat: a summer word unscramble</p>
        {[
          { n:1, head:'Choose your mode',
            body:'Pick 🍦 Ice cream cone for 30 seconds, or 🧊 Ice cube for 20. Both melt. One just does it faster.' },
          { n:2, head:'Read the clue',
            body:'A category and a clue tell you what the mystery word is. The letters are all there, just scrambled.' },
          { n:3, head:'Tap or type letters to unscramble',
            body:'Tap a letter to place it. Tap a filled slot to return it. On a keyboard, just type! Press Backspace to remove, Space to shuffle.' },
          { n:4, head:'The color is your timer',
            body:'Watch the screen shift from cool pale blue to warm pink as time runs out. The hotter it looks, the faster you should move!',
            extra:true },
          { n:5, head:'Set your summer soundscape',
            body:'Tap the sound icon to mix ocean waves, seabirds, and steel drum. Layer as many as you like.' },
          { n:6, head:'Score points and build streaks',
            body:'Each correct word earns 100 base points, plus up to 50 speed bonus points for how much time you have left. Chain correct answers to add a streak bonus on top. 5 words per round.' },
          { n:7, head:'Unlock achievements and share',
            body:'Earn badges for speed, perfect rounds, and streaks. Share your emoji score card with friends!' },
        ].map(({ n, head, body, extra }) => (
          <div key={n} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:9, background:'rgba(255,255,255,0.45)', borderRadius:12, padding:'9px 10px' }}>
            <div style={{ width:22, height:22, borderRadius:'50%', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, fontFamily:'sans-serif', backgroundImage:'linear-gradient(135deg,#bae6fd,#c4b5fd)', color:'#1e3a8a' }}>{n}</div>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:12, fontWeight:700, color:'#1e3a5f', fontFamily:'sans-serif', marginBottom:3 }}>{head}</p>
              <p style={{ fontSize:11, color:'#4a6580', fontFamily:'sans-serif', lineHeight:1.5 }}>{body}</p>
              {extra && <>
                <div style={{ height:10, borderRadius:99, margin:'7px 0 3px', backgroundImage:'linear-gradient(90deg,#bae6fd,#c4b5fd,#e0abf5,#f9a8d4,#fda4af)' }} />
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <span style={{ fontSize:10, fontFamily:'sans-serif', color:'#6b6b8d' }}>❄️ Plenty of time</span>
                  <span style={{ fontSize:10, fontFamily:'sans-serif', color:'#6b6b8d' }}>🌡️ Time is up!</span>
                </div>
              </>}
            </div>
          </div>
        ))}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:14 }}>
          {[
            { icon:'🍦', name:'Ice cream cone', time:'30 seconds', desc:'A little more time to savor it' },
            { icon:'🧊', name:'Ice cube',       time:'20 seconds', desc:'Melts fast. Think faster.' },
          ].map(m => (
            <div key={m.name} style={{ borderRadius:12, padding:'9px 8px', textAlign:'center', border:'1px solid #bae6fd', background:'rgba(240,249,255,0.5)' }}>
              <div style={{ fontSize:24, marginBottom:4 }}>{m.icon}</div>
              <p style={{ fontSize:11, fontWeight:700, color:'#1e3a5f', fontFamily:'sans-serif' }}>{m.name}</p>
              <p style={{ fontSize:10, color:'#5b8fa8', fontFamily:'sans-serif', marginTop:2 }}>{m.time}</p>
              <p style={{ fontSize:10, color:'#7a9ab5', fontFamily:'sans-serif', marginTop:3, fontStyle:'italic' }}>{m.desc}</p>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={SHIMMER_BTN_STYLE}>Got it. Let us play! ☀️</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function BeatTheHeat() {
  // Screen state
  const [screen,       setScreen]       = useState('landing');
  const [showHtp,      setShowHtp]      = useState(false);
  const [showSound,    setShowSound]    = useState(false);

  // Mode
  const [mode,         setMode]         = useState('cone');
  const [timeLimit,    setTimeLimit]    = useState(30);

  // Game state
  const [puzzles,      setPuzzles]      = useState([]);
  const [curIdx,       setCurIdx]       = useState(0);
  const [playerAns,    setPlayerAns]    = useState([]);
  const [letterOrder,  setLetterOrder]  = useState([]);
  const [letterUsed,   setLetterUsed]   = useState([]);
  const [timeLeft,     setTimeLeft]     = useState(30);
  const [timeFrac,     setTimeFrac]     = useState(0);
  const [score,        setScore]        = useState(0);
  const [streak,       setStreak]       = useState(0);
  const [slotState,    setSlotState]    = useState('idle');
  const [toast,        setToast]        = useState({ msg:'', good:true, show:false });
  const [results,      setResults]      = useState([]);
  const [confetti,     setConfetti]     = useState([]);
  const [newAch,       setNewAch]       = useState([]);
  const [wordCelebration, setWordCelebration] = useState(null); // { phrase, sandyBits }

  // Sound state lives inside SoundModal — no parent state needed

  // Persisted
  const [allAch,       setAllAch]       = useState([]);
  const [gamesPlayed,  setGamesPlayed]  = useState(0);
  const [bestTime,     setBestTime]     = useState(null);

  // Refs
  const timerRef     = useRef(null);
  const scoreRef     = useRef(0);
  const streakRef    = useRef(0);
  const maxStrRef    = useRef(0);
  const resultsRef   = useRef([]);
  const timeLimitRef = useRef(30);
  const puzzlesRef   = useRef([]);
  const curIdxRef    = useRef(0);
  const timeLeftRef  = useRef(30);
  const playerAnsRef = useRef([]);
  const letterOrdRef = useRef([]);
  const letterUsdRef = useRef([]);

  const sound    = useSoundscape();
  const soundRef = useRef(sound);
  const year  = new Date().getFullYear();

  // Load persisted
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('bth_v1') || '{}');
      setAllAch(s.ach || []);
      setGamesPlayed(s.gp || 0);
      setBestTime(s.bt || null);
    } catch(e) {}
  }, []);

  // Keyboard
  useEffect(() => {
    const h = (e) => {
      if (screen !== 'game') return;
      if (showHtp || showSound) return;
      if (e.key === 'Enter')     { handleCheck(); return; }
      if (e.key === 'Backspace') { handleBackspace(); return; }
      if (e.key === ' ')         { e.preventDefault(); handleShuffle(); return; }
      const k = e.key.toUpperCase();
      if (/^[A-Z]$/.test(k)) handleKeyLetter(k);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  // Timer
  useEffect(() => {
    if (screen !== 'game') return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      timeLeftRef.current -= 1;
      const tl = timeLimitRef.current;
      setTimeLeft(timeLeftRef.current);
      setTimeFrac(1 - timeLeftRef.current / tl);
      if (timeLeftRef.current <= 0) {
        clearInterval(timerRef.current);
        handleTimeout();
      }
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [screen, curIdx]);

  // ── Game flow ──────────────────────────────────────────────────────────────
  function startGame() {
    const tl = mode === 'cone' ? 30 : 20;
    timeLimitRef.current = tl;
    setTimeLimit(tl);
    const picked = shuffleArr(PUZZLES).slice(0, 5);
    puzzlesRef.current = picked;
    setPuzzles(picked);
    scoreRef.current = 0; streakRef.current = 0; maxStrRef.current = 0;
    resultsRef.current = [];
    setScore(0); setStreak(0); setResults([]);
    initPuzzle(picked, 0, tl);
    setScreen('game');
  }

  function initPuzzle(pArr, idx, tl) {
    const p     = pArr[idx];
    const order = shuffleArr(p.scrambled.split(''));
    const ans   = Array(p.word.length).fill('');
    const used  = Array(order.length).fill(false);
    curIdxRef.current    = idx;
    timeLeftRef.current  = tl;
    playerAnsRef.current = ans;
    letterOrdRef.current = order;
    letterUsdRef.current = used;
    setCurIdx(idx);
    setPlayerAns(ans);
    setLetterOrder(order);
    setLetterUsed(used);
    setTimeLeft(tl);
    setTimeFrac(0);
    setSlotState('idle');
    clearInterval(timerRef.current);
  }

  function handleLetterTap(ch, idx) {
    const ans  = [...playerAnsRef.current];
    const used = [...letterUsdRef.current];
    const first = ans.indexOf('');
    if (first === -1) return;
    ans[first] = ch; used[idx] = true;
    playerAnsRef.current = ans; letterUsdRef.current = used;
    setPlayerAns([...ans]); setLetterUsed([...used]);
  }

  function handleSlotTap(i) {
    const ans  = [...playerAnsRef.current];
    const used = [...letterUsdRef.current];
    const ch = ans[i]; if (!ch) return;
    ans[i] = '';
    const ord = letterOrdRef.current;
    for (let j = 0; j < ord.length; j++) {
      if (ord[j] === ch && used[j]) { used[j] = false; break; }
    }
    playerAnsRef.current = ans; letterUsdRef.current = used;
    setPlayerAns([...ans]); setLetterUsed([...used]);
  }

  function handleKeyLetter(key) {
    const ord  = letterOrdRef.current;
    const used = [...letterUsdRef.current];
    const ans  = [...playerAnsRef.current];
    const first = ans.indexOf('');
    if (first === -1) return;
    for (let i = 0; i < ord.length; i++) {
      if (ord[i] === key && !used[i]) {
        ans[first] = key; used[i] = true;
        playerAnsRef.current = ans; letterUsdRef.current = used;
        setPlayerAns([...ans]); setLetterUsed([...used]);
        return;
      }
    }
  }

  function handleBackspace() {
    const ans  = [...playerAnsRef.current];
    const used = [...letterUsdRef.current];
    const ord  = letterOrdRef.current;
    const filled = ans.map((c,i) => c ? i : -1).filter(i => i >= 0);
    if (!filled.length) return;
    const last = filled[filled.length - 1];
    const ch = ans[last]; ans[last] = '';
    for (let j = 0; j < ord.length; j++) {
      if (ord[j] === ch && used[j]) { used[j] = false; break; }
    }
    playerAnsRef.current = ans; letterUsdRef.current = used;
    setPlayerAns([...ans]); setLetterUsed([...used]);
  }

  function handleClear() {
    const ans  = Array(playerAnsRef.current.length).fill('');
    const used = Array(letterUsdRef.current.length).fill(false);
    playerAnsRef.current = ans; letterUsdRef.current = used;
    setPlayerAns([...ans]); setLetterUsed([...used]);
  }

  function handleShuffle() {
    const usedChars = {};
    playerAnsRef.current.forEach(ch => { if (ch) usedChars[ch] = (usedChars[ch]||0)+1; });
    const newOrd  = shuffleArr(letterOrdRef.current);
    const tmp     = {};
    const newUsed = newOrd.map(ch => {
      tmp[ch] = tmp[ch]||0;
      if ((usedChars[ch]||0) > tmp[ch]) { tmp[ch]++; return true; }
      return false;
    });
    letterOrdRef.current = newOrd; letterUsdRef.current = newUsed;
    setLetterOrder([...newOrd]); setLetterUsed([...newUsed]);
  }

  function handleCheck() {
    const pa  = playerAnsRef.current;
    if (pa.includes('')) return;
    clearInterval(timerRef.current);
    const p       = puzzlesRef.current[curIdxRef.current];
    const correct = pa.join('') === p.word;
    const tUsed   = timeLimitRef.current - timeLeftRef.current;
    if (correct) {
      streakRef.current++;
      maxStrRef.current = Math.max(maxStrRef.current, streakRef.current);
    } else {
      streakRef.current = 0;
    }
    const pts = correct
      ? 100 + Math.round((timeLeftRef.current / timeLimitRef.current) * 50) + (streakRef.current > 1 ? streakRef.current * 10 : 0)
      : 0;
    scoreRef.current += pts;
    setScore(scoreRef.current);
    setStreak(streakRef.current);
    resultsRef.current = [...resultsRef.current, { word:p.word, category:p.category, correct, timeUsed:tUsed, pts }];
    setSlotState(correct ? 'correct' : 'wrong');
    if (correct) {
      const phrase = CELEBRATE_PHRASES[Math.floor(Math.random() * CELEBRATE_PHRASES.length)];
      const sandyColors = ['#f9d878','#f5c842','#e8b84b','#fde68a','#fbbf24','#fcd34d','#fef3c7','#f9a8d4','#fbcfe8'];
      const bits = Array.from({length:28}, (_,i) => ({
        id:i,
        left:`${20 + Math.random()*60}%`,
        color:sandyColors[i % sandyColors.length],
        dur:`${0.7+Math.random()*0.8}s`,
        delay:`${Math.random()*0.3}s`,
        rot:`${Math.random()*360}deg`,
        shape: Math.random() > 0.5 ? '50%' : '2px',
        size: `${4+Math.random()*5}px`,
      }));
      setWordCelebration({ phrase, bits });
      setTimeout(() => setWordCelebration(null), 1600);
    }
    showToast(correct ? `+${pts} pts${streakRef.current > 1 ? ' 🔥' : ''}` : 'Not quite. Keep cool!', correct);
    setTimeout(advance, 960);
  }

  function handleTimeout() {
    const p = puzzlesRef.current[curIdxRef.current];
    streakRef.current = 0;
    resultsRef.current = [...resultsRef.current, { word:p.word, category:p.category, correct:false, timeUsed:timeLimitRef.current, pts:0 }];
    setStreak(0);
    setSlotState('wrong');
    showToast("Time's up!", false);
    setTimeout(advance, 960);
  }

  function advance() {
    const nextIdx = curIdxRef.current + 1;
    if (nextIdx < 5) {
      initPuzzle(puzzlesRef.current, nextIdx, timeLimitRef.current);
    } else {
      finishGame();
    }
  }

  function finishGame() {
    const res     = resultsRef.current;
    const solved  = res.filter(r => r.correct).length;
    const times   = res.filter(r => r.correct).map(r => r.timeUsed);
    const fast    = times.length ? Math.min(...times) : null;
    if (fast !== null && (bestTime === null || fast < bestTime)) setBestTime(fast);
    const earned  = calcAchievements(solved, fast, res);
    const updated = [...new Set([...allAch, ...earned])];
    const gp      = gamesPlayed + 1;
    setAllAch(updated); setGamesPlayed(gp); setNewAch(earned); setResults(res);
    try { localStorage.setItem('bth_v1', JSON.stringify({ ach:updated, gp, bt:fast ?? bestTime })); } catch(e){}
    if (solved >= 3) launchConfetti();
    setScreen('result');
  }

  function calcAchievements(solved, fast, res) {
    const n = [];
    const chk = (id, cond) => { if (cond && !allAch.includes(id)) n.push(id); };
    chk('first_scoop',   true);
    chk('ice_cold',      solved === 5);
    chk('speed_demon',   fast !== null && fast <= 5);
    chk('cool_streak',   maxStrRef.current >= 3);
    chk('summer_champ',  scoreRef.current >= 400);
    chk('heat_wave',     gamesPlayed >= 2);
    chk('brain_freeze',  mode === 'cube' && solved === 5);
    chk('no_melt',       solved === 5);
    const cats = new Set(res.filter(r => r.correct).map(r => r.category));
    chk('category_king', cats.size >= 3);
    return n;
  }

  function buildShareText(res) {
    const solved = res.filter(r => r.correct).length;
    const icons  = res.map(r => r.correct ? (r.timeUsed <= 5 ? '⚡' : r.timeUsed <= 10 ? '🌊' : '🧊') : '🌡️').join(' ');
    return [
      '☀️ Beat the Heat',
      `${mode==='cone'?'🍦':'🧊'} ${mode==='cone'?'30s':'20s'} mode`,
      '',
      icons,
      `${solved}/5 words  •  ${scoreRef.current} pts${maxStrRef.current > 1 ? `  •  🔥 ${maxStrRef.current} streak` : ''}`,
      '',
      '⚡ blazing  🌊 quick  🧊 solved  🌡️ melted',
      '',
      'The griddle is hot, so stay cool!',
      'lettergriddle.com/beat-the-heat',
    ].join('\n');
  }

  async function doShare() {
    const txt = buildShareText(results);
    if (navigator.share) {
      try { await navigator.share({ title:'Beat the Heat', text:txt }); return; }
      catch(e) { if (e.name === 'AbortError') return; }
    }
    try {
      await navigator.clipboard.writeText(txt);
      showToast('Copied! Share it and stay cool ☀️', true);
    } catch(e) {}
  }

  function showToast(msg, good) {
    setToast({ msg, good, show:true });
    setTimeout(() => setToast(t => ({ ...t, show:false })), 1500);
  }

  function launchConfetti() {
    const colors = ['#bae6fd','#f9a8d4','#c4b5fd','#fde68a','#86efac','#fda4af'];
    setConfetti(Array.from({length:52}, (_,i) => ({
      id:i, left:`${Math.random()*100}%`,
      color:colors[i%colors.length],
      dur:`${0.9+Math.random()*1.2}s`,
      delay:`${Math.random()*0.5}s`,
      rot:`${Math.random()*360}deg`,
    })));
    setTimeout(() => setConfetti([]), 2600);
  }

  // ── Sound controls ─────────────────────────────────────────────────────────
  // ── Derived colors ─────────────────────────────────────────────────────────
  const tc = getTextColor(timeFrac);
  const bc = getBorderColor(timeFrac);
  const sb = getSlotBg(timeFrac);
  const fb = getFilledBg(timeFrac);

  // ── Slot style helper ──────────────────────────────────────────────────────
  function slotStyle(ch) {
    if (slotState === 'correct') return { bg:'linear-gradient(135deg,#dcfce7,#86efac)', border:'#4ade80', color:'#14532d' };
    if (slotState === 'wrong')   return { bg:'linear-gradient(135deg,#fee2e2,#fca5a5)', border:'#f87171', color:'#7f1d1d' };
    if (ch) return { bg:fb, border:bc, color:tc };
    return { bg:sb, border:bc, color:tc };
  }

  const p = puzzles[curIdx];

  // ─────────────────────────────────────────────────────────────────────────
  // SHARED STYLES
  // ─────────────────────────────────────────────────────────────────────────
  const IRIS = {
    height:4, borderRadius:99, marginBottom:14,
    backgroundImage: getIrisBar(timeFrac),
    backgroundSize:'400% auto', animation:'bthShimmer 5s linear infinite',
  };
  const IRIS_FIXED = {
    height:4, borderRadius:99, marginBottom:14,
    backgroundImage:'linear-gradient(90deg,#bae6fd,#c4b5fd,#a5f3fc,#f9a8d4,#fde68a,#bae6fd)',
    backgroundSize:'400% auto', animation:'bthShimmer 5s linear infinite',
  };
  const TITLE_STYLE = {
    fontSize:26, fontWeight:700, textAlign:'center', marginBottom:4,
    backgroundImage:'linear-gradient(90deg,#0369a1,#38bdf8,#a78bfa,#f472b6,#f59e0b,#38bdf8,#0369a1)',
    backgroundSize:'300% auto', WebkitBackgroundClip:'text', backgroundClip:'text',
    WebkitTextFillColor:'transparent', animation:'bthShimmerSlow 7s linear infinite',
  };
  const SHIMMER_BTN = {
    display:'block', width:'100%', padding:12, border:'none', borderRadius:14,
    fontSize:14, fontWeight:700, fontFamily:'sans-serif', cursor:'pointer', color:'#3b0764',
    backgroundImage:'linear-gradient(90deg,#bae6fd,#c4b5fd,#f9a8d4,#fde68a,#f9a8d4,#c4b5fd,#bae6fd)',
    backgroundSize:'300% auto', animation:'bthShimmer 6s linear infinite',
    letterSpacing:'.02em',
  };
  const FOOTER_STYLE = { borderTop:'1px solid #bae6fd', paddingTop:10, textAlign:'center', marginTop:4 };
  const FOOT_LINK = { fontSize:11, fontFamily:'sans-serif', color:'#5b8fa8', textDecoration:'none' };
  const FOOT_SEP  = { fontSize:11, color:'#bae6fd', fontFamily:'sans-serif', margin:'0 6px' };

  const LandingBg = { minHeight:'100vh', background:'linear-gradient(155deg,#f0f9ff 0%,#e0f2fe 40%,#ede9fe 75%,#fce7f3 100%)', padding:'20px 16px 28px', fontFamily:'Georgia,serif' };
  const CardBg    = { background:'rgba(255,255,255,0.45)', borderRadius:14, padding:'10px 12px', border:'1px solid #e0f2fe' };



  // ─────────────────────────────────────────────────────────────────────────
  // LANDING SCREEN
  // ─────────────────────────────────────────────────────────────────────────
  if (screen === 'landing') return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div style={LandingBg}>
        <div style={{ maxWidth:400, margin:'0 auto' }}>
          <div style={IRIS_FIXED} />
          <div style={{ textAlign:'center', marginBottom:6 }}>
            <span style={{ fontSize:54, display:'inline-block', animation:'bthFloat 3s ease-in-out infinite' }}>☀️</span>
          </div>
          <h1 style={TITLE_STYLE}>Beat the Heat</h1>
          <p style={{ textAlign:'center', fontSize:15, fontStyle:'italic', color:'#6b6b8d', fontFamily:'sans-serif', marginBottom:6, lineHeight:1.5 }}>
            The griddle is hot, so stay cool!
          </p>
          <p style={{ textAlign:'center', fontSize:13, color:'#94a3b8', fontFamily:'sans-serif', marginBottom:20 }}>
            A summer word game from the Letter Griddle family
          </p>
          <div style={{ display:'flex', justifyContent:'center', gap:12, marginBottom:22 }}>
            {['🍦','🌊','🧊','🌴','🌸'].map((e,i) => (
              <span key={i} style={{ fontSize:22, display:'inline-block', animation:`bthFloat 3s ease-in-out ${i*0.4}s infinite` }}>{e}</span>
            ))}
          </div>
          {/* Mode picker */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:16 }}>
            {[
              { id:'cone', icon:'🍦', name:'Ice cream cone', time:'30 seconds', desc:'A little more time to savor it' },
              { id:'cube', icon:'🧊', name:'Ice cube',       time:'20 seconds', desc:'Melts fast. Think faster.' },
            ].map((m,mi) => (
              <div key={m.id} onClick={() => setMode(m.id)} style={{ borderRadius:16, padding:'14px 10px', textAlign:'center', cursor:'pointer', border: mode===m.id ? '2px solid #a78bfa' : '1.5px solid #bae6fd', background: mode===m.id ? 'rgba(237,233,254,0.6)' : 'rgba(240,249,255,0.7)', transition:'transform .2s,border-color .2s' }}>
                <span style={{ fontSize:30, display:'block', marginBottom:6, animation:`bthFloat 3s ease-in-out ${mi*0.5}s infinite` }}>{m.icon}</span>
                <p style={{ fontSize:13, fontWeight:700, color:'#1e3a5f', fontFamily:'sans-serif' }}>{m.name}</p>
                <p style={{ fontSize:12, color:'#5b8fa8', fontFamily:'sans-serif', marginTop:2 }}>{m.time}</p>
                <p style={{ fontSize:11, color:'#7a9ab5', fontFamily:'sans-serif', marginTop:4, fontStyle:'italic' }}>{m.desc}</p>
              </div>
            ))}
          </div>
          <button onClick={startGame} style={{ ...SHIMMER_BTN, marginBottom:8 }}>Start playing ☀️</button>
          <div style={{ display:'flex', justifyContent:'center', gap:20, marginBottom:18 }}>
            <button onClick={() => setShowHtp(true)}   style={{ background:'none', border:'none', fontSize:12, fontFamily:'sans-serif', color:'#7c6baa', cursor:'pointer', padding:'4px 0' }}>How to play?</button>
            <button onClick={() => setShowSound(true)} style={{ background:'none', border:'none', fontSize:12, fontFamily:'sans-serif', color:'#7c6baa', cursor:'pointer', padding:'4px 0' }}>🎵 Soundscape</button>
          </div>
          {/* Achievements peek */}
          <div style={{ ...CardBg, marginBottom:14 }}>
            <p style={{ fontSize:10, fontFamily:'sans-serif', color:'#6b6b8d', marginBottom:8, fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase' }}>Achievements to unlock</p>
            <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
              {ACHIEVEMENTS.slice(0,6).map(a => (
                <span key={a.id} style={{ fontSize:10, fontFamily:'sans-serif', padding:'3px 9px', borderRadius:99, background:'rgba(196,181,253,0.3)', border:'1px solid #c4b5fd', color:'#4c1d95' }}>{a.icon} {a.label}</span>
              ))}
            </div>
          </div>
          {/* Previously earned */}
          {allAch.length > 0 && (
            <div style={{ ...CardBg, marginBottom:14 }}>
              <p style={{ fontSize:10, fontFamily:'sans-serif', color:'#6b6b8d', marginBottom:8, fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase' }}>Your achievements</p>
              <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                {allAch.map(id => {
                  const a = ACHIEVEMENTS.find(x => x.id===id);
                  return a ? <span key={id} style={{ fontSize:10, fontFamily:'sans-serif', padding:'3px 9px', borderRadius:99, background:'rgba(253,231,243,0.5)', border:'1px solid #f9a8d4', color:'#9d174d' }}>{a.icon} {a.label}</span> : null;
                })}
              </div>
            </div>
          )}
          <div style={FOOTER_STYLE}>
            <a href="https://www.lettergriddle.com" style={FOOT_LINK}>lettergriddle.com</a>
            <span style={FOOT_SEP}>•</span>
            <a href="https://www.lettergriddle.com/privacy" style={FOOT_LINK}>Privacy</a>
            <span style={FOOT_SEP}>•</span>
            <a href="https://www.lettergriddle.com/terms" style={FOOT_LINK}>Terms</a>
            <p style={{ fontSize:10, color:'#94a3b8', fontFamily:'sans-serif', marginTop:4 }}>© {year} Letter Griddle. All rights reserved.</p>
          </div>
        </div>
      </div>
      {showHtp   && <HowToPlay />}
      {showSound && <SoundModal soundRef={soundRef} onClose={() => setShowSound(false)} />}
    </>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // GAME SCREEN
  // ─────────────────────────────────────────────────────────────────────────
  if (screen === 'game' && p) return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div style={{ minHeight:'100vh', background:getBg(timeFrac), padding:'14px 16px', fontFamily:'Georgia,serif', transition:'background 0.4s ease' }}>
        <div style={{ maxWidth:400, margin:'0 auto' }}>
          <div style={{ ...IRIS, transition:'background-image 0.4s ease' }} />
          {/* Header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
            <span style={{ fontSize:10, fontWeight:600, fontFamily:'sans-serif', padding:'3px 10px', borderRadius:99, backgroundImage: timeFrac < 0.5 ? 'linear-gradient(90deg,#e0f2fe,#bae6fd,#f0f9ff,#bae6fd)' : 'linear-gradient(90deg,#fce7f3,#fbcfe8,#fdf2f8,#fbcfe8)', backgroundSize:'300% auto', animation:'bthShimmerSlow 6s linear infinite', color:tc, textTransform:'uppercase', letterSpacing:'.04em' }}>
              {p.category}
            </span>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <button onClick={() => setShowSound(true)} style={{ background:'none', border:'none', fontSize:16, cursor:'pointer', padding:2 }} aria-label="Soundscape">🎵</button>
              <button onClick={() => setShowHtp(true)}   style={{ background:'none', border:'none', fontSize:14, cursor:'pointer', padding:2, fontFamily:'sans-serif', color:tc }} aria-label="How to play">?</button>
              <span style={{ fontSize:11, fontFamily:'sans-serif', color:tc }}>{curIdx+1} of 5</span>
            </div>
          </div>
          {/* Score */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
            <span style={{ fontSize:12, fontWeight:600, fontFamily:'sans-serif', color:tc }}>Score: {score}</span>
            {streak > 1 && <span style={{ fontSize:11, fontFamily:'sans-serif', color:tc }}>{mode==='cone'?'🔥':'🌊'} {streak} streak</span>}
          </div>
          {/* Clue */}
          <div style={{ background:'rgba(255,255,255,0.38)', borderRadius:12, padding:'8px 12px', marginBottom:10, border:`1px solid ${bc}` }}>
            <p style={{ fontSize:12, fontFamily:'sans-serif', fontStyle:'italic', color:tc, lineHeight:1.5 }}>
              <strong style={{ fontStyle:'normal' }}>Clue: </strong>{p.clue}
            </p>
          </div>
          {/* Melt SVG */}
          <div style={{ display:'flex', justifyContent:'center', marginBottom:8 }}>
            <svg width="90" height="70" viewBox="0 0 90 70">
              {mode==='cone' ? <>
                <polygon points="45,64 30,34 60,34" fill="#C8A46A" stroke="#A07840" strokeWidth="0.5"/>
                <circle cx="45" cy="26" r={Math.max(3, 18*(1-timeFrac*0.75))}
                  fill={rgb(...lerpRGB(250,215,160, 253,168,212, timeFrac))}
                  stroke={rgb(...lerpRGB(240,178,100, 245,120,170, timeFrac))} strokeWidth="0.8"/>
                {timeFrac > 0.2 && <path d={`M41,34 Q39,${34+timeFrac*20} 40,${34+timeFrac*22}`} fill="none" stroke={rgb(...lerpRGB(250,215,160,253,168,212,timeFrac))} strokeWidth="2.5" strokeLinecap="round"/>}
              </> : <>
                <rect x={45-Math.max(3,19*(1-timeFrac*0.7))} y={28-Math.max(3,19*(1-timeFrac*0.7))} width={Math.max(6,38*(1-timeFrac*0.7))} height={Math.max(6,38*(1-timeFrac*0.7))} rx="3"
                  fill={rgb(...lerpRGB(186,230,253,249,168,212,timeFrac))}
                  stroke={rgb(...lerpRGB(125,211,252,245,120,170,timeFrac))} strokeWidth="0.8" opacity="0.9"/>
                <rect x={45-Math.max(3,19*(1-timeFrac*0.7))+4} y={28-Math.max(3,19*(1-timeFrac*0.7))+4}
                  width={Math.max(6,38*(1-timeFrac*0.7))*0.45} height={Math.max(6,38*(1-timeFrac*0.7))*0.13} rx="2" fill="white" opacity="0.4"/>
              </>}
              <text x="45" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fontFamily="sans-serif" fill={tc}>{timeLeft}s</text>
            </svg>
          </div>
          {/* Progress dots */}
          <div style={{ display:'flex', gap:5, justifyContent:'center', marginBottom:8 }}>
            {Array.from({length:5},(_,i) => (
              <div key={i} style={{ width:8, height:8, borderRadius:'50%', background: i < curIdx ? '#86efac' : i===curIdx ? bc : 'rgba(200,200,200,0.4)' }} />
            ))}
          </div>
          {/* Toast */}
          <div style={{ textAlign:'center', height:28, marginBottom:4 }}>
            <span style={{ display:'inline-block', padding:'4px 14px', borderRadius:99, fontSize:12, fontWeight:600, fontFamily:'sans-serif', background: toast.good ? '#27500A' : '#7f1d1d', color: toast.good ? '#dcfce7' : '#fee2e2', opacity: toast.show ? 1 : 0, transition:'opacity .3s' }}>{toast.msg}</span>
          </div>
          {/* Sandy word celebration */}
          {wordCelebration && (
            <div style={{ position:'relative', height:0, overflow:'visible', pointerEvents:'none' }}>
              <div style={{ position:'absolute', left:0, right:0, top:-10, display:'flex', justifyContent:'center', zIndex:20 }}>
                <span style={{ fontSize:16, fontWeight:700, fontFamily:'sans-serif', color:tc, background:'rgba(255,255,255,0.7)', padding:'4px 14px', borderRadius:99, border:`1px solid ${bc}`, animation:'bthBounceIn 0.3s ease', whiteSpace:'nowrap', backdropFilter:'blur(4px)' }}>
                  {wordCelebration.phrase}
                </span>
              </div>
              {wordCelebration.bits.map(b => (
                <div key={b.id} style={{ position:'absolute', width:b.size, height:b.size, borderRadius:b.shape, left:b.left, top:-8, background:b.color, transform:`rotate(${b.rot})`, animation:`bthSandFall ${b.dur} ${b.delay} ease-in forwards`, pointerEvents:'none' }}/>
              ))}
            </div>
          )}
          {/* Answer slots */}
          <div style={{ display:'flex', justifyContent:'center', gap:5, marginBottom:8, flexWrap:'wrap' }}>
            {playerAns.map((ch, i) => {
              const s = slotStyle(ch);
              return (
                <div key={i} onClick={() => handleSlotTap(i)} style={{ width:32, height:32, borderRadius:7, border:`1.5px solid ${s.border}`, background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, fontFamily:'sans-serif', cursor:'pointer', color:s.color, transition:'background .3s,border-color .3s' }}>{ch}</div>
              );
            })}
          </div>
          {/* Letter tiles */}
          <div style={{ display:'flex', justifyContent:'center', gap:5, marginBottom:10, flexWrap:'wrap' }}>
            {letterOrder.map((ch, i) => (
              <button key={i} onClick={() => !letterUsed[i] && handleLetterTap(ch, i)} style={{ width:32, height:32, borderRadius:7, border:`1px solid ${bc}`, background: letterUsed[i] ? 'rgba(200,200,200,0.15)' : fb, fontSize:14, fontWeight:700, fontFamily:'sans-serif', cursor: letterUsed[i] ? 'default' : 'pointer', color: letterUsed[i] ? 'rgba(150,150,150,0.35)' : tc, opacity: letterUsed[i] ? 0.3 : 1, animation: letterUsed[i] ? 'none' : `bthFloat 3s ease-in-out ${i*0.15}s infinite`, transition:'background .3s,border-color .3s,opacity .2s' }}>{ch}</button>
            ))}
          </div>
          {/* Action buttons */}
          <div style={{ display:'flex', gap:6, marginBottom:8 }}>
            {[['Clear',handleClear],['Shuffle',handleShuffle],['Check',handleCheck]].map(([lbl,fn]) => (
              <button key={lbl} onClick={fn} style={{ flex:1, padding:'7px 0', fontSize:12, borderRadius:10, cursor:'pointer', fontFamily:'sans-serif', fontWeight:500, border:`1px solid ${bc}`, background:sb, color:tc, transition:'background .3s,border-color .3s' }}>{lbl}</button>
            ))}
          </div>
          <p style={{ fontSize:10, fontFamily:'sans-serif', color:tc, opacity:0.55, textAlign:'center', marginBottom:10 }}>
            Type letters  •  Backspace to remove  •  Enter to check  •  Space to shuffle
          </p>
          <div style={{ ...FOOTER_STYLE, borderTopColor:bc }}>
            <a href="https://www.lettergriddle.com" style={{ ...FOOT_LINK, color:tc, opacity:0.7 }}>lettergriddle.com</a>
            <span style={{ ...FOOT_SEP, color:bc }}>•</span>
            <a href="https://www.lettergriddle.com/privacy" style={{ ...FOOT_LINK, color:tc, opacity:0.7 }}>Privacy</a>
            <span style={{ ...FOOT_SEP, color:bc }}>•</span>
            <a href="https://www.lettergriddle.com/terms" style={{ ...FOOT_LINK, color:tc, opacity:0.7 }}>Terms</a>
          </div>
        </div>
      </div>
      {showHtp   && <HowToPlay />}
      {showSound && <SoundModal soundRef={soundRef} onClose={() => setShowSound(false)} />}
    </>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // RESULT SCREEN
  // ─────────────────────────────────────────────────────────────────────────
  if (screen === 'result') {
    const solved   = results.filter(r => r.correct).length;
    const resTimes = results.filter(r => r.correct).map(r => r.timeUsed);
    const fast     = resTimes.length ? Math.min(...resTimes) : null;
    const ICONS    = ['😅','😎','🌟','🌟','🏆'];
    const MSGS     = ['Yikes. The sun won today!','You survived the heat!','Hot stuff! Great round!','Sizzling! Almost perfect!','You beat the heat! Champion!'];
    return (
      <>
        <style>{GLOBAL_CSS}</style>
        <div style={{ minHeight:'100vh', background:'linear-gradient(155deg,#f0f9ff 0%,#e0f2fe 40%,#ede9fe 75%,#fce7f3 100%)', padding:'16px', fontFamily:'Georgia,serif' }}>
          <div style={{ maxWidth:400, margin:'0 auto', position:'relative' }}>
            {/* Confetti */}
            <div style={{ position:'absolute', top:0, left:0, right:0, height:0, overflow:'visible', pointerEvents:'none' }}>
              {confetti.map(c => (
                <div key={c.id} style={{ position:'absolute', width:8, height:8, borderRadius:1, left:c.left, top:0, background:c.color, transform:`rotate(${c.rot})`, animation:`bthConfetti ${c.dur} ${c.delay} linear forwards` }}/>
              ))}
            </div>
            <div style={IRIS_FIXED} />
            {/* Result hero */}
            <div style={{ textAlign:'center', marginBottom:14 }}>
              <div style={{ fontSize:48, marginBottom:4 }}>{ICONS[solved]}</div>
              <h2 style={{ fontSize:20, fontWeight:700, backgroundImage:'linear-gradient(90deg,#0369a1,#38bdf8,#a78bfa,#f472b6,#0369a1)', backgroundSize:'300% auto', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent', animation:'bthShimmerSlow 6s linear infinite', marginBottom:4 }}>
                {MSGS[solved]}
              </h2>
              <p style={{ fontSize:12, fontFamily:'sans-serif', color:'#6b6b8d' }}>{solved} of 5 words solved</p>
            </div>
            {/* Stats */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,minmax(0,1fr))', gap:8, marginBottom:12 }}>
              {[
                { num:scoreRef.current, lbl:'Points' },
                { num:`${solved}/5`,    lbl:'Solved' },
                { num:fast !== null ? `${fast}s` : 'none', lbl:'Best time' },
              ].map(s => (
                <div key={s.lbl} style={{ background:'rgba(255,255,255,0.45)', borderRadius:12, padding:'10px 8px', textAlign:'center', border:'1px solid #e0f2fe' }}>
                  <p style={{ fontSize:20, fontWeight:700, color:'#1e3a5f', fontFamily:'sans-serif' }}>{s.num}</p>
                  <p style={{ fontSize:11, color:'#6b6b8d', fontFamily:'sans-serif', marginTop:2 }}>{s.lbl}</p>
                </div>
              ))}
            </div>
            {/* Word list */}
            <div style={{ display:'flex', flexDirection:'column', gap:5, marginBottom:12 }}>
              {results.map((r,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, background:'rgba(255,255,255,0.4)', borderRadius:10, padding:'7px 10px', border:'1px solid #e0f2fe', fontFamily:'sans-serif' }}>
                  <span style={{ color: r.correct ? '#15803d' : '#b91c1c', fontSize:15 }}>{r.correct ? '✓' : '✗'}</span>
                  <span style={{ color:'#1e3a5f', fontWeight:600 }}>{r.word}</span>
                  <span style={{ marginLeft:'auto', fontSize:11, color:'#6b6b8d' }}>{r.correct ? `+${r.pts} pts` : mode==='cube' ? '🧊 melted' : '🍦 melted'}</span>
                </div>
              ))}
            </div>
            {/* New achievements */}
            {newAch.length > 0 && (
              <div style={{ background:'rgba(255,255,255,0.45)', borderRadius:14, padding:'10px 12px', marginBottom:12, border:'1px solid #c4b5fd' }}>
                <p style={{ fontSize:11, fontFamily:'sans-serif', color:'#4c1d95', fontWeight:600, marginBottom:8, letterSpacing:'.04em', textTransform:'uppercase' }}>Achievements unlocked!</p>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {newAch.map(id => {
                    const a = ACHIEVEMENTS.find(x => x.id===id);
                    return a ? <span key={id} style={{ fontSize:11, fontFamily:'sans-serif', padding:'4px 10px', borderRadius:99, background:'rgba(253,231,243,0.7)', border:'1px solid #f9a8d4', color:'#9d174d', fontWeight:600 }}>{a.icon} {a.label}</span> : null;
                  })}
                </div>
              </div>
            )}
            {/* Share card */}
            <div style={{ background:'rgba(255,255,255,0.45)', border:'1px solid #e0f2fe', borderRadius:14, padding:'12px 14px', marginBottom:10, fontFamily:'monospace', fontSize:12, whiteSpace:'pre-wrap', color:'#1e3a5f', lineHeight:1.7 }}>
              {buildShareText(results)}
            </div>
            {/* Buttons */}
            <div style={{ display:'flex', gap:8, marginBottom:12 }}>
              <button onClick={doShare} style={{ ...SHIMMER_BTN, flex:1 }}>Share results</button>
              <button onClick={() => { soundRef.current.stopAll(); setScreen('landing'); }} style={{ flex:1, padding:10, fontSize:13, borderRadius:12, border:'1px solid #bae6fd', cursor:'pointer', fontFamily:'sans-serif', fontWeight:500, background:'rgba(240,249,255,0.6)', color:'#0369a1' }}>
                Play again
              </button>
            </div>
            <div style={FOOTER_STYLE}>
              <a href="https://www.lettergriddle.com" style={FOOT_LINK}>lettergriddle.com</a>
              <span style={FOOT_SEP}>•</span>
              <a href="https://www.lettergriddle.com/privacy" style={FOOT_LINK}>Privacy</a>
              <span style={FOOT_SEP}>•</span>
              <a href="https://www.lettergriddle.com/terms" style={FOOT_LINK}>Terms</a>
              <p style={{ fontSize:10, color:'#94a3b8', fontFamily:'sans-serif', marginTop:4 }}>© {year} Letter Griddle. All rights reserved.</p>
            </div>
          </div>
        </div>
        {showHtp   && <HowToPlay />}
        {showSound && <SoundModal soundRef={soundRef} onClose={() => setShowSound(false)} />}
      </>
    );
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL CSS  (injected once via <style> tag)
// ─────────────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @keyframes bthShimmer     { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes bthShimmerSlow { 0%{background-position:400% center} 100%{background-position:-400% center} }
  @keyframes bthFloat       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
  @keyframes bthFadeIn      { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes bthConfetti    { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(340px) rotate(720deg);opacity:0} }
  @keyframes bthSandFall    { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(120px) rotate(540deg);opacity:0} }
  @keyframes bthBounceIn    { 0%{transform:scale(0.7);opacity:0} 60%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
  *  { box-sizing: border-box; margin: 0; padding: 0; }
  body { margin: 0; }
  button:focus-visible { outline: 2px solid #a78bfa; outline-offset: 2px; }
  input[type=range] { accent-color: #a78bfa; }
`;