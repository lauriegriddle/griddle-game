import { useState, useEffect, useRef, useCallback } from "react";

const YEAR = new Date().getFullYear();

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;800;900&display=swap');
* { box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
@keyframes floatBob  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes shimmer   { 0%{background-position:200% center} 100%{background-position:-200% center} }
@keyframes poof      { 0%{transform:scale(1);opacity:1} 50%{transform:scale(2.5);opacity:0.5} 100%{transform:scale(3.2);opacity:0} }
@keyframes scoreUp   { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(-56px);opacity:0} }
@keyframes shakeLR   { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
@keyframes dropIn    { 0%{transform:scale(0.2);opacity:0} 65%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
@keyframes comboZoom { 0%{opacity:0;transform:translate(-50%,-50%) scale(0.2)} 35%{opacity:1;transform:translate(-50%,-50%) scale(1.3)} 80%{opacity:1;transform:translate(-50%,-50%) scale(1)} 100%{opacity:0;transform:translate(-50%,-50%) scale(0.9)} }
@keyframes timerWarn { 0%,100%{opacity:1} 50%{opacity:0.3} }
@keyframes slideUp   { 0%{transform:translateY(22px);opacity:0} 100%{transform:translateY(0);opacity:1} }
@keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.4} }
@keyframes toastDrop { 0%{transform:translate(-50%,-16px);opacity:0} 100%{transform:translate(-50%,0);opacity:1} }
@keyframes snapPulse { 0%,100%{opacity:0.85} 50%{opacity:1} }
.griddle-rush-title {
  background-image: linear-gradient(90deg, var(--acc, #f59e0b), #fff, var(--acc, #f59e0b));
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
`;

const THEMES = {
  cafe:{
    name:"☕ Cafe",
    types:[
      {emoji:"🥞",bg:"linear-gradient(145deg,#fef08a,#fde047)",border:"#ca8a04",shadow:"rgba(202,138,4,0.4)"},
      {emoji:"☕",bg:"linear-gradient(145deg,#fed7aa,#fb923c)",border:"#c2410c",shadow:"rgba(194,65,12,0.4)"},
      {emoji:"🍩",bg:"linear-gradient(145deg,#fda4af,#fb7185)",border:"#be123c",shadow:"rgba(190,18,60,0.4)"},
      {emoji:"🧁",bg:"linear-gradient(145deg,#a5f3fc,#22d3ee)",border:"#0e7490",shadow:"rgba(14,116,144,0.4)"},
    ],
    bgTop:"#7c2d12",bgBot:"#06030a",accent:"#f59e0b",
    gridBg:"rgba(40,12,2,0.88)",gridBorder:"#92400e",panelBg:"rgba(120,53,15,0.45)",
  },
  treats:{
    name:"🍬 Treats",
    types:[
      {emoji:"🍭",bg:"linear-gradient(145deg,#fda4af,#fb7185)",border:"#be123c",shadow:"rgba(190,18,60,0.4)"},
      {emoji:"🍫",bg:"linear-gradient(145deg,#d4a574,#92400e)",border:"#7c2d12",shadow:"rgba(124,45,18,0.4)"},
      {emoji:"🍪",bg:"linear-gradient(145deg,#fef08a,#fde047)",border:"#ca8a04",shadow:"rgba(202,138,4,0.4)"},
      {emoji:"🍦",bg:"linear-gradient(145deg,#c4b5fd,#8b5cf6)",border:"#5b21b6",shadow:"rgba(91,33,182,0.4)"},
    ],
    bgTop:"#831843",bgBot:"#06030a",accent:"#f472b6",
    gridBg:"rgba(50,4,28,0.88)",gridBorder:"#9d174d",panelBg:"rgba(131,24,67,0.44)",
  },
  movies:{
    name:"🎬 Movies",
    types:[
      {emoji:"🎬",bg:"linear-gradient(145deg,#fda4af,#fb7185)",border:"#be123c",shadow:"rgba(190,18,60,0.4)"},
      {emoji:"🍿",bg:"linear-gradient(145deg,#fef08a,#fde047)",border:"#ca8a04",shadow:"rgba(202,138,4,0.4)"},
      {emoji:"⭐",bg:"linear-gradient(145deg,#a5f3fc,#22d3ee)",border:"#0e7490",shadow:"rgba(14,116,144,0.4)"},
      {emoji:"🏆",bg:"linear-gradient(145deg,#bbf7d0,#4ade80)",border:"#15803d",shadow:"rgba(21,128,61,0.4)"},
    ],
    bgTop:"#1e1b4b",bgBot:"#03020a",accent:"#a78bfa",
    gridBg:"rgba(8,6,40,0.88)",gridBorder:"#4338ca",panelBg:"rgba(67,56,202,0.32)",
  },
};

const TIMER_OPTS=[
  {label:"🌙 Chill",value:0},{label:"⚡ 1 Min",value:60},
  {label:"☕ 2 Min",value:120},{label:"🥞 3 Min",value:180},
];

const GRID=5;
const emptyGrid=()=>Array(GRID).fill(null).map(()=>Array(GRID).fill(null));
const getTileType=(types,emoji)=>types.find(t=>t.emoji===emoji)||types[0];

const makeGroup=(types)=>{
  const id=Math.random().toString(36).slice(2);
  const r=Math.random();
  if(r<0.10){
    return{tiles:[types[Math.floor(Math.random()*types.length)].emoji],id,type:"single",orientation:"single"};
  }
  const orientation=Math.random()<0.50?"vertical":"horizontal";
  const isMatch=Math.random()<0.50;
  const a=types[Math.floor(Math.random()*types.length)].emoji;
  let b=isMatch?a:types[Math.floor(Math.random()*types.length)].emoji;
  let att=0;
  while(!isMatch&&b===a&&att++<10) b=types[Math.floor(Math.random()*types.length)].emoji;
  return{tiles:[a,b],id,type:isMatch?"match":"mixed",orientation};
};

const makeQueue=(types)=>[makeGroup(types),makeGroup(types),makeGroup(types)];

const getPlacementAt=(grid,group,anchorRow,anchorCol)=>{
  const cells=[];
  for(let i=0;i<group.tiles.length;i++){
    const r=group.orientation==="vertical"?anchorRow+i:anchorRow;
    const c=group.orientation==="horizontal"?anchorCol+i:anchorCol;
    if(r<0||r>=GRID||c<0||c>=GRID||grid[r][c]!==null)return null;
    cells.push({row:r,col:c});
  }
  return cells;
};

const findBestPlacement=(grid,group,rawRow,rawCol)=>{
  const count=group.tiles.length;
  if(count===1){
    const r=Math.max(0,Math.min(rawRow,GRID-1));
    const c=Math.max(0,Math.min(rawCol,GRID-1));
    return getPlacementAt(grid,group,r,c);
  }
  const candidates=[];
  if(group.orientation==="vertical"){
    for(let offset=0;offset<count;offset++){
      const r=Math.max(0,Math.min(rawRow-offset,GRID-count));
      candidates.push({r,c:Math.max(0,Math.min(rawCol,GRID-1))});
    }
  } else {
    for(let offset=0;offset<count;offset++){
      const c=Math.max(0,Math.min(rawCol-offset,GRID-count));
      candidates.push({r:Math.max(0,Math.min(rawRow,GRID-1)),c});
    }
  }
  for(const {r,c} of candidates){
    const p=getPlacementAt(grid,group,r,c);
    if(p)return p;
  }
  return null;
};

const pixelToCell=(cx,cy,rect,TILE,GAP)=>{
  const PAD=9;
  const col=Math.floor((cx-rect.left-PAD)/(TILE+GAP));
  const row=Math.floor((cy-rect.top-PAD)/(TILE+GAP));
  return{row,col};
};

const hasAnyMove=(grid,queue)=>{
  for(const group of queue){
    for(let r=0;r<GRID;r++) for(let c=0;c<GRID;c++)
      if(getPlacementAt(grid,group,r,c))return true;
  }
  return false;
};

const findMatches=(grid)=>{
  const hit=new Set();
  for(let r=0;r<GRID;r++)
    for(let c=0;c<=GRID-3;c++)
      if(grid[r][c]&&grid[r][c]===grid[r][c+1]&&grid[r][c]===grid[r][c+2])
        [0,1,2].forEach(d=>hit.add(`${r},${c+d}`));
  for(let c=0;c<GRID;c++)
    for(let r=0;r<=GRID-3;r++)
      if(grid[r][c]&&grid[r][c]===grid[r+1][c]&&grid[r][c]===grid[r+2][c])
        [0,1,2].forEach(d=>hit.add(`${r+d},${c}`));
  return hit;
};

// ── AUDIO ─────────────────────────────────────────────────────────────────────
// Strategy: create AudioContext lazily on first gesture, then keep it alive
// with a recurring silent node so the browser never suspends it mid-game.
// All oscillators are created synchronously at call time (no scheduling delays).

function useAudio(){
  const ctxRef  = useRef(null);
  const mOn     = useRef(false);
  const mTid    = useRef(null);
  const keepTid = useRef(null);
  const ready   = useRef(false);
  const PENT    = [261,294,329,392,440,523,587,659,784,880];

  // ── get or create context ──────────────────────────────────────────────
  const getCtx = useCallback(()=>{
    if(!ctxRef.current){
      ctxRef.current = new (window.AudioContext||window.webkitAudioContext)();
    }
    return ctxRef.current;
  },[]);

  // ── keepalive: play a truly silent buffer every 4 s ────────────────────
  // This prevents iOS/Chrome from auto-suspending the context between taps.
  const startKeepalive = useCallback(()=>{
    clearInterval(keepTid.current);
    keepTid.current = setInterval(()=>{
      try{
        const a = getCtx();
        if(a.state === "suspended") a.resume();
        const buf = a.createBuffer(1, a.sampleRate * 0.05, a.sampleRate);
        const src = a.createBufferSource();
        src.buffer = buf;
        src.connect(a.destination);
        src.start();
      }catch(e){}
    }, 4000);
  },[getCtx]);

  // ── unlock: must be called inside a real user-gesture handler ──────────
  const unlock = useCallback(()=>{
    if(ready.current) return;
    try{
      const a = getCtx();
      // Play a silent buffer — the gesture-unlock trick for iOS Safari
      const buf = a.createBuffer(1, 1, 22050);
      const src = a.createBufferSource();
      src.buffer = buf;
      src.connect(a.destination);
      src.start(0);
      a.resume().then(()=>{ ready.current = true; });
      startKeepalive();
    }catch(e){}
  },[getCtx, startKeepalive]);

  // ── listen for first gesture anywhere on page ──────────────────────────
  useEffect(()=>{
    const once = { once:true, passive:true };
    const go = ()=> unlock();
    document.addEventListener("pointerdown", go, once);
    document.addEventListener("touchstart",  go, once);
    return()=>{
      document.removeEventListener("pointerdown", go);
      document.removeEventListener("touchstart",  go);
      clearInterval(keepTid.current);
      clearTimeout(mTid.current);
    };
  },[unlock]);

  // ── core tone generator ────────────────────────────────────────────────
  // Uses currentTime + 0 delay so sound fires immediately, no scheduling lag.
  const tone = useCallback((freq, type, dur, vol=0.25)=>{
    try{
      const a = getCtx();
      if(a.state === "suspended"){ a.resume(); return; }
      const now = a.currentTime;
      const o = a.createOscillator();
      const g = a.createGain();
      o.connect(g);
      g.connect(a.destination);
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(vol, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + dur);
      o.start(now);
      o.stop(now + dur + 0.02);
    }catch(e){}
  },[getCtx]);

  // ── sound library ─────────────────────────────────────────────────────
  const s = {
    pickup:  ()=>{ unlock(); tone(660,"sine",0.08,0.22); setTimeout(()=>tone(880,"sine",0.06,0.16),50); },
    drop:    ()=>{ unlock(); tone(440,"sine",0.12,0.26); setTimeout(()=>tone(550,"sine",0.08,0.16),55); },
    clear:   ()=>{ unlock(); [523,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,"sine",0.22,0.28),i*60)); },
    combo:   ()=>{ unlock(); [523,659,784,1047,1319,1568].forEach((f,i)=>setTimeout(()=>tone(f,"triangle",0.26,0.32),i*55)); },
    bad:     ()=>{ unlock(); tone(220,"sawtooth",0.14,0.20); setTimeout(()=>tone(185,"sawtooth",0.10,0.14),85); },
    over:    ()=>{ unlock(); [392,349,330,261].forEach((f,i)=>setTimeout(()=>tone(f,"sawtooth",0.30,0.20),i*140)); },
    newBest: ()=>{ unlock(); [784,988,1175,1319,1568,1976].forEach((f,i)=>setTimeout(()=>tone(f,"sine",0.28,0.32),i*70)); },
    ping:    ()=>{ unlock(); tone(1047,"sine",0.10,0.22); },
    single:  ()=>{ unlock(); tone(1047,"sine",0.10,0.24); setTimeout(()=>tone(1319,"sine",0.10,0.24),90); },
  };

  // ── background music ──────────────────────────────────────────────────
  const startMusic = useCallback(()=>{
    if(mOn.current) return;
    mOn.current = true;
    unlock();
    let step=0, beat=0;
    const loop=()=>{
      if(!mOn.current) return;
      if(beat%4===0) tone(PENT[Math.floor(beat/4)%3]*0.5,"sine",0.5,0.06);
      if(Math.random()>0.25) tone(PENT[step%PENT.length],"sine",0.18,0.06);
      step += [1,2,1,3][beat%4]; beat++;
      mTid.current = setTimeout(loop, 300+(Math.random()<0.2?300:0));
    };
    loop();
  },[unlock, tone]);

  const stopMusic = useCallback(()=>{
    mOn.current = false;
    clearTimeout(mTid.current);
  },[]);

  return { s, startMusic, stopMusic, unlock };
}

// ── FOOTER LINKS COMPONENT ────────────────────────────────────────────────────
function FooterLinks({color="#333"}){
  const linkStyle={
    color,fontSize:10,textDecoration:"none",opacity:0.8,
    borderBottom:`1px solid ${color}55`,paddingBottom:1,
  };
  return(
    <div style={{textAlign:"center",marginTop:14}}>
      <div style={{color,fontSize:10,marginBottom:4}}>
        © {YEAR} Letter Griddle Cafe
      </div>
      <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
        <a href="https://lettergriddle.com" target="_blank" rel="noreferrer" style={linkStyle}>
          lettergriddle.com
        </a>
        <a href="https://lettergriddle.com/privacy" target="_blank" rel="noreferrer" style={linkStyle}>
          Privacy Policy
        </a>
        <a href="https://lettergriddle.com/terms" target="_blank" rel="noreferrer" style={linkStyle}>
          Terms of Service
        </a>
      </div>
    </div>
  );
}

export default function GriddleRush(){
  const[screen,    setScreen]   =useState("menu");
  const[themeKey,  setThemeKey] =useState("cafe");
  const[timerOpt,  setTimerOpt] =useState(120);
  const[musicPref, setMusicPref]=useState(false);
  const[grid,      setGrid]     =useState(emptyGrid());
  const[queue,     setQueue]    =useState([]);
  const[score,     setScore]    =useState(0);
  const[timeLeft,  setTimeLeft] =useState(0);
  const[poofs,     setPoofs]    =useState([]);
  const[scorePops, setScorePops]=useState([]);
  const[comboMsg,  setComboMsg] =useState(null);
  const[shaking,   setShaking]  =useState(false);
  const[newHigh,   setNewHigh]  =useState(false);
  const[newAch,    setNewAch]   =useState(null);
  const[showShare, setShowShare]=useState(false);
  const[showHowTo, setShowHowTo]=useState(false);
  const[showBoard, setShowBoard]=useState(false);
  const[hasSavedGame, setHasSavedGame]=useState(false); // detected after mount
  const[dragGroup, setDragGroup]=useState(null);
  const[ghostXY,   setGhostXY] =useState({x:0,y:0});
  const[snapPlacement,setSnapPlacement]=useState([]);

  // ── Safe localStorage helpers ─────────────────────────────────────────────
  const lsGet=(key,fallback="")=>{
    if(typeof window==="undefined") return fallback;
    return localStorage.getItem(key)||fallback;
  };
  const lsSet=(key,val)=>{
    if(typeof window!=="undefined") localStorage.setItem(key,val);
  };

  // highScore as STATE (it's displayed in UI) — start at 0 to match server,
  // then read real value from localStorage after first client render.
  const[highScoreVal, setHighScoreVal]=useState(0);
  const highScore=useRef(0); // ref keeps sync value for game logic

  // unlocked achievements — also initialized empty, hydrated after mount
  const unlocked=useRef(new Set());

  useEffect(()=>{
    // This runs only on the client, after hydration — safe to read localStorage
    const hs=parseInt(lsGet("gr9_hs","0"));
    highScore.current=hs;
    setHighScoreVal(hs);
    unlocked.current=new Set(JSON.parse(lsGet("gr9_ach","[]")));
    // Check for a saved game
    const saved=lsGet("gr9_save","");
    if(saved){
      try{
        const s=JSON.parse(saved);
        if(s && s.grid && s.queue && s.version===1) setHasSavedGame(true);
      }catch(e){}
    }
  },[]);

  const statsRef  =useRef({placed:0,clears:0,combo:0,score:0,newHigh:false,gotSingle:false});
  const comboCount=useRef(0);
  const timerRef  =useRef(null);
  const cellEls   =useRef({});
  const gridEl    =useRef(null);
  const scoreRef  =useRef(0);
  const newHighRef=useRef(false);
  const gridRef   =useRef(emptyGrid());
  const queueRef  =useRef([]);
  const dragActive=useRef(false);
  const dragInfo  =useRef(null);
  const lastSnapRef=useRef([]);
  const uidRef    =useRef(0);
  const uid       =()=>{ uidRef.current+=1; return uidRef.current; };

  // Safe window.innerWidth — returns 390 during SSR
  const TILE=Math.min(54,Math.floor(
    (Math.min(typeof window!=="undefined"?window.innerWidth:390,420)-56)/GRID
  ));
  const GAP=5;

  useEffect(()=>{scoreRef.current=score;},[score]);
  useEffect(()=>{newHighRef.current=newHigh;},[newHigh]);
  useEffect(()=>{gridRef.current=grid;},[grid]);
  useEffect(()=>{queueRef.current=queue;},[queue]);
  useEffect(()=>{lastSnapRef.current=snapPlacement;},[snapPlacement]);

  const{s,startMusic,stopMusic,unlock}=useAudio();
  const t=THEMES[themeKey];

  const computeSnap=useCallback((group,cx,cy,g)=>{
    const rect=gridEl.current?.getBoundingClientRect();
    if(!rect)return[];
    const{row:rawRow,col:rawCol}=pixelToCell(cx,cy,rect,TILE,GAP);
    if(rawRow<-1||rawRow>GRID||rawCol<-1||rawCol>GRID)return[];
    const placement=findBestPlacement(g,group,rawRow,rawCol);
    if(!placement)return[];
    return placement.map((pos,i)=>({...pos,emoji:group.tiles[i]}));
  },[TILE,GAP]);

  const unlockAch=useCallback((id,icon,name)=>{
    if(unlocked.current.has(id))return;
    unlocked.current.add(id);
    lsSet("gr9_ach",JSON.stringify([...unlocked.current]));
    setNewAch({id,icon,name});setTimeout(()=>setNewAch(null),3000);s.ping();
  },[s]);

  const checkAchs=useCallback((st)=>{
    if(st.placed>=1)  unlockAch("first_stack","🥞","First Stack");
    if(st.score>=100) unlockAch("second_cup","☕","Second Cup");
    if(st.clears>=3)  unlockAch("hot_griddle","🍳","Hot Griddle");
    if(st.score>=300) unlockAch("sweet_tooth","🍯","Sweet Tooth");
    if(st.combo>=2)   unlockAch("short_order","🧑‍🍳","Short Order Cook");
    if(st.score>=500) unlockAch("butter_pat","🧈","Butter Pat");
    if(st.newHigh)    unlockAch("golden_stack","🌟","Golden Stack");
    if(st.gotSingle)  unlockAch("lucky_single","🍀","Lucky Single");
  },[unlockAch]);

  const doEndGame=useCallback(()=>{
    stopMusic();
    s.over();
    clearSave(); // no partial game to resume after it ends
    setShowBoard(true);
    setTimeout(()=>{
      setShowBoard(false);
      setScreen("gameover");
    }, 2200);
  },[s,stopMusic,clearSave]);

  const dropGroup=useCallback((group,queueIdx,finalSnap)=>{
    if(!finalSnap||finalSnap.length===0){
      s.bad();setShaking(true);setTimeout(()=>setShaking(false),420);
      return;
    }
    setGrid(prevGrid=>{
      const placement=finalSnap.map(p=>({row:p.row,col:p.col}));
      for(const{row,col}of placement){
        if(prevGrid[row][col]!==null){
          setShaking(true);setTimeout(()=>setShaking(false),420);
          s.bad();return prevGrid;
        }
      }
      s.drop();
      const ng=prevGrid.map(r=>[...r]);
      placement.forEach(({row,col},i)=>{ng[row][col]=group.tiles[i];});

      const midIdx=Math.floor(placement.length/2);
      const midEl=cellEls.current[`${placement[midIdx].row},${placement[midIdx].col}`];
      const mr=midEl?.getBoundingClientRect();
      const popX=mr?mr.left+mr.width/2:200;
      const popY=mr?mr.top+mr.height/2:300;

      const matches=findMatches(ng);
      let gained=5*group.tiles.length;
      let afterGrid=ng;
      if(matches.size>0){
        comboCount.current++;
        const rowCount=Math.ceil(matches.size/3);
        gained+=30*rowCount*(comboCount.current>1?2:1);
        const pList=[];
        matches.forEach(key=>{
          const[mr2,mc]=key.split(",").map(Number);
          const el=cellEls.current[`${mr2},${mc}`];
          const rb=el?.getBoundingClientRect();
          if(rb)pList.push({id:uid(),x:rb.left+rb.width/2-16,y:rb.top+rb.height/2-16,emoji:ng[mr2][mc]});
        });
        setPoofs(p=>[...p,...pList]);
        afterGrid=ng.map((row,ri)=>row.map((cell,ci)=>matches.has(`${ri},${ci}`)?null:cell));
        if(comboCount.current>=2){s.combo();setComboMsg("🔥 Combo!");setTimeout(()=>setComboMsg(null),1100);}
        else s.clear();
        statsRef.current.clears+=rowCount;
        statsRef.current.combo=Math.max(statsRef.current.combo,comboCount.current);
      }else comboCount.current=0;

      setScorePops(p=>[...p,{id:uid(),x:popX,y:popY,val:gained}]);

      const types=THEMES[themeKey].types;
      let newQ=queueRef.current.filter((_,i)=>i!==queueIdx);
      // Only deal a fresh set when the tray is completely empty
      if(newQ.length===0){
        newQ=makeQueue(types);
        // Occasionally include a single-tile gift in the new set
        if(Math.random()<0.12){
          const gi=Math.floor(Math.random()*newQ.length);
          newQ[gi]={tiles:[types[Math.floor(Math.random()*types.length)].emoji],
            id:Math.random().toString(36).slice(2),type:"single",orientation:"single"};
        }
        if(newQ.some(g=>g.type==="single")){s.single();statsRef.current.gotSingle=true;}
      }
      setQueue(newQ);

      const newScore=scoreRef.current+gained;
      statsRef.current.placed+=group.tiles.length;
      statsRef.current.score=newScore;
      if(newScore>highScore.current){
        highScore.current=newScore;
        setHighScoreVal(newScore);
        lsSet("gr9_hs",String(newScore));
        if(!newHighRef.current){setNewHigh(true);s.newBest();}
        statsRef.current.newHigh=true;
      }
      checkAchs(statsRef.current);
      setScore(newScore);
      // Auto-save — capture current timeLeft from closure
      const tl=timerOpt>0?timeLeft:0;
      saveGame(afterGrid,newQ,newScore,tl,themeKey,timerOpt);
      setTimeout(()=>{if(!hasAnyMove(afterGrid,newQ))setTimeout(doEndGame,300);},120);
      return afterGrid;
    });
  },[themeKey,s,checkAchs,doEndGame,saveGame,timerOpt,timeLeft]);

  const onGroupPointerDown=useCallback((e,group,idx)=>{
    e.preventDefault();
    dragActive.current=true;
    dragInfo.current={group,queueIdx:idx};
    setDragGroup({group,queueIdx:idx});
    setGhostXY({x:e.clientX,y:e.clientY});
    const snap=computeSnap(group,e.clientX,e.clientY,gridRef.current);
    setSnapPlacement(snap);
    s.pickup();
  },[computeSnap,s]);

  useEffect(()=>{
    const onMove=(e)=>{
      if(!dragActive.current||!dragInfo.current)return;
      const cx=e.touches?e.touches[0].clientX:e.clientX;
      const cy=e.touches?e.touches[0].clientY:e.clientY;
      setGhostXY({x:cx,y:cy});
      setSnapPlacement(computeSnap(dragInfo.current.group,cx,cy,gridRef.current));
    };
    const onUp=(e)=>{
      if(!dragActive.current||!dragInfo.current)return;
      dragActive.current=false;
      const{group,queueIdx}=dragInfo.current;
      dragInfo.current=null;
      const snap=lastSnapRef.current;
      dropGroup(group,queueIdx,snap);
      setDragGroup(null);setGhostXY({x:0,y:0});setSnapPlacement([]);
    };
    window.addEventListener("pointermove",onMove,{passive:true});
    window.addEventListener("pointerup",onUp);
    window.addEventListener("touchmove",onMove,{passive:false});
    window.addEventListener("touchend",onUp);
    return()=>{
      window.removeEventListener("pointermove",onMove);
      window.removeEventListener("pointerup",onUp);
      window.removeEventListener("touchmove",onMove);
      window.removeEventListener("touchend",onUp);
    };
  },[computeSnap,dropGroup]);

  // ── SAVE / RESUME ─────────────────────────────────────────────────────────
  const saveGame=useCallback((g,q,sc,tl,tk,tOpt)=>{
    const payload={
      version:1,
      grid:g,
      queue:q,
      score:sc,
      themeKey:tk,
      timerOpt:tOpt,
      // If timed, save absolute timestamp so we can deduct elapsed on resume
      savedAt: tOpt>0 ? Date.now() : null,
      timeLeft: tl,
    };
    lsSet("gr9_save",JSON.stringify(payload));
  },[]);

  const clearSave=useCallback(()=>{ lsSet("gr9_save",""); setHasSavedGame(false); },[]);

  const resumeGame=useCallback(()=>{
    const raw=lsGet("gr9_save","");
    if(!raw)return;
    try{
      const sv=JSON.parse(raw);
      if(!sv||!sv.grid||!sv.queue)return;

      // Adjust time remaining for timed games
      let tl=sv.timeLeft||0;
      if(sv.timerOpt>0 && sv.savedAt){
        const elapsed=Math.floor((Date.now()-sv.savedAt)/1000);
        tl=Math.max(0, tl-elapsed);
        if(tl===0){ clearSave(); return; } // time already expired
      }

      comboCount.current=0;
      statsRef.current={placed:0,clears:0,combo:0,score:0,newHigh:false,gotSingle:false};
      scoreRef.current=sv.score||0;
      newHighRef.current=false;

      gridRef.current=sv.grid;
      queueRef.current=sv.queue;
      setGrid(sv.grid);
      setQueue(sv.queue);
      setScore(sv.score||0);
      setThemeKey(sv.themeKey||"cafe");
      setTimerOpt(sv.timerOpt||0);
      setTimeLeft(tl);
      setPoofs([]);setScorePops([]);setComboMsg(null);
      setShaking(false);setNewHigh(false);setNewAch(null);
      setShowShare(false);setShowHowTo(false);setDragGroup(null);setSnapPlacement([]);
      setHasSavedGame(false);
      setScreen("game");
      if(musicPref)startMusic();
    }catch(e){ clearSave(); }
  },[musicPref,startMusic,clearSave]);

  const startGame=useCallback(()=>{
    clearSave();
    comboCount.current=0;
    statsRef.current={placed:0,clears:0,combo:0,score:0,newHigh:false,gotSingle:false};
    scoreRef.current=0;newHighRef.current=false;
    const types=THEMES[themeKey].types;
    const g=emptyGrid();const q=makeQueue(types);
    gridRef.current=g;queueRef.current=q;
    setGrid(g);setQueue(q);setScore(0);
    setPoofs([]);setScorePops([]);setComboMsg(null);
    setShaking(false);setNewHigh(false);setNewAch(null);
    setShowShare(false);setShowHowTo(false);setDragGroup(null);setSnapPlacement([]);
    setTimeLeft(timerOpt);setScreen("game");
    const gp=parseInt(lsGet("gr9_games","0"))+1;
    lsSet("gr9_games",String(gp));
    if(musicPref)startMusic();
  },[themeKey,timerOpt,musicPref,startMusic,clearSave]);

  useEffect(()=>{
    if(screen!=="game"||timerOpt===0)return;
    timerRef.current=setInterval(()=>{
      setTimeLeft(prev=>{
        if(prev<=1){clearInterval(timerRef.current);doEndGame();return 0;}
        return prev-1;
      });
    },1000);
    return()=>clearInterval(timerRef.current);
  },[screen,timerOpt,doEndGame]);

  // ── SHARE ────────────────────────────────────────────────────────────────
  // iOS iMessage: when both `text` and `url` are passed, some apps only show
  // the URL card. Fix: put the full message in `text` WITH the URL embedded,
  // and omit the separate `url` field so the text is always shown in full.
  const buildShareText = useCallback(()=>{
    const theme = THEMES[themeKey].name;
    const lines = [
      `🍳 Griddle Rush! ${theme}`,
      ``,
      `Score: ${score} pts`,
      highScoreVal > 0 ? `🏆 Personal Best: ${highScoreVal}` : null,
      ``,
      `Play free → lettergriddle.com/rush`,
      `More games → lettergriddle.com`,
    ].filter(l => l !== null);
    return lines.join("\n");
  },[score, themeKey]);

  const doShare=useCallback(async()=>{
    const text = buildShareText();
    if(navigator.share){
      try{
        // Pass text only (with URL embedded inside) — no separate `url` field.
        // This ensures iMessage shows the full message rather than just a link card.
        await navigator.share({ title:"Griddle Rush 🍳", text });
      }catch(e){
        // User cancelled or share failed — fall through to clipboard
        if(e.name !== "AbortError"){
          try{ await navigator.clipboard.writeText(text); }catch{}
          setShowShare(true); setTimeout(()=>setShowShare(false),2500);
        }
      }
    } else {
      try{ await navigator.clipboard.writeText(text); }catch(e){}
      setShowShare(true); setTimeout(()=>setShowShare(false),2500);
    }
  },[buildShareText]);

  const fmtTime=sec=>`${Math.floor(sec/60)}:${String(sec%60).padStart(2,"0")}`;
  const timerWarn=timerOpt>0&&timeLeft>0&&timeLeft<=15;
  const snapValid=snapPlacement.length>0;
  const snapMap=Object.fromEntries(snapPlacement.map(p=>[`${p.row},${p.col}`,p.emoji]));
  const snapSet=new Set(Object.keys(snapMap));

  // ── MENU ──────────────────────────────────────────────────────────────────
  if(screen==="menu"){
    const gamesPlayed=parseInt(lsGet("gr9_games","0"));
    const LABEL="rgba(255,255,255,0.75)"; // readable on dark bg
    const INACTIVE="rgba(255,255,255,0.55)"; // unselected buttons

    return(
      <div style={{minHeight:"100vh",fontFamily:"'Nunito',sans-serif",
        background:`radial-gradient(ellipse at 35% 25%,${t.bgTop},${t.bgBot} 72%)`,
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
        padding:"20px 18px",position:"relative",overflow:"hidden"}}>
        <style>{GLOBAL_CSS}</style>

        {/* BG emoji deco */}
        {t.types.map((tp,i)=>(
          <div key={i} style={{position:"absolute",fontSize:32+i*7,opacity:0.06,
            top:`${8+i*22}%`,left:`${(i*24+5)%84}%`,userSelect:"none",
            animation:`floatBob ${2.3+i*0.4}s ease-in-out infinite`,animationDelay:`${i*0.3}s`}}>{tp.emoji}</div>
        ))}

        {/* Top-left home link */}
        <a href="https://lettergriddle.com" target="_blank" rel="noreferrer"
          style={{position:"absolute",top:14,left:14,color:"rgba(255,255,255,0.7)",
            fontSize:11,textDecoration:"none",fontFamily:"'Nunito',sans-serif",fontWeight:700,
            padding:"5px 10px",borderRadius:10,background:"rgba(255,255,255,0.1)",
            border:"1px solid rgba(255,255,255,0.18)"}}>
          🥞 lettergriddle.com
        </a>

        {/* How to Play button — top right */}
        <button onClick={()=>setShowHowTo(true)}
          style={{position:"absolute",top:14,right:14,
            color:"rgba(255,255,255,0.7)",fontSize:11,fontWeight:700,
            fontFamily:"'Nunito',sans-serif",cursor:"pointer",
            padding:"5px 10px",borderRadius:10,background:"rgba(255,255,255,0.1)",
            border:"1px solid rgba(255,255,255,0.18)"}}>
          ❓ How to Play
        </button>

        {/* How to Play modal */}
        {showHowTo&&(
          <div onClick={()=>setShowHowTo(false)}
            style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",
              display:"flex",alignItems:"center",justifyContent:"center",
              zIndex:1000,padding:20}}>
            <div onClick={e=>e.stopPropagation()}
              style={{background:"#1a1a2e",border:`2px solid ${t.accent}66`,
                borderRadius:22,padding:"24px 22px",maxWidth:360,width:"100%",
                maxHeight:"85vh",overflowY:"auto",position:"relative"}}>
              <button onClick={()=>setShowHowTo(false)}
                style={{position:"absolute",top:12,right:14,background:"none",
                  border:"none",color:"#888",fontSize:22,cursor:"pointer",lineHeight:1}}>✕</button>

              <h2 style={{fontFamily:"'Fredoka One',cursive",fontSize:26,color:t.accent,
                margin:"0 0 4px",textAlign:"center"}}>How to Play</h2>
              <p style={{color:"rgba(255,255,255,0.55)",fontSize:11,textAlign:"center",
                marginBottom:18,letterSpacing:1}}>GRIDDLE RUSH 🍳</p>

              {[
                {icon:"👇",title:"Pick up a group",text:"Tap and drag any tile group from the tray at the bottom."},
                {icon:"📍",title:"Place it on the griddle",text:"Drag over the grid — glowing cells show exactly where it will land. Release to place."},
                {icon:"↕ ↔",title:"Vertical & horizontal",text:"Groups can be stacked top-to-bottom or side-by-side. The tray shows their orientation."},
                {icon:"3️⃣",title:"Match 3 to clear",text:"Get 3 of the same emoji in a row or column — they poof away and score points!"},
                {icon:"🔥",title:"Combos score double",text:"Clear two sets in a row for a Combo — double points!"},
                {icon:"🍀",title:"The gift tile",text:"Sometimes a single tile appears — a lucky gift that's easy to place anywhere."},
                {icon:"🗂️",title:"Use your whole tray",text:"Place all tiles in the current tray before a fresh set is dealt. Strategy counts!"},
                {icon:"🏆",title:"Beat your best",text:"Your high score is saved between sessions. Can you top it?"},
              ].map(({icon,title,text})=>(
                <div key={title} style={{display:"flex",gap:12,marginBottom:14,alignItems:"flex-start"}}>
                  <div style={{fontSize:22,flexShrink:0,width:32,textAlign:"center"}}>{icon}</div>
                  <div>
                    <div style={{color:"#fff",fontWeight:800,fontSize:13,marginBottom:2}}>{title}</div>
                    <div style={{color:"rgba(255,255,255,0.65)",fontSize:12,lineHeight:1.5}}>{text}</div>
                  </div>
                </div>
              ))}

              {/* Stats section */}
              <div style={{borderTop:`1px solid rgba(255,255,255,0.1)`,marginTop:6,paddingTop:16}}>
                <p style={{color:t.accent,fontWeight:800,fontSize:13,textAlign:"center",marginBottom:12}}>
                  Your Stats
                </p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {[
                    {label:"Best Score",val:highScoreVal||0,icon:"🏆"},
                    {label:"Games Played",val:gamesPlayed,icon:"🍳"},
                  ].map(({label,val,icon})=>(
                    <div key={label} style={{background:"rgba(255,255,255,0.06)",
                      borderRadius:12,padding:"10px 8px",textAlign:"center",
                      border:`1px solid rgba(255,255,255,0.08)`}}>
                      <div style={{fontSize:20,marginBottom:4}}>{icon}</div>
                      <div style={{fontFamily:"'Fredoka One',cursive",fontSize:22,color:"#fff"}}>{val}</div>
                      <div style={{color:"rgba(255,255,255,0.45)",fontSize:10,marginTop:2}}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={()=>{setShowHowTo(false);startGame();}}
                style={{width:"100%",marginTop:18,
                  background:`linear-gradient(135deg,${t.accent},${t.bgTop})`,
                  border:"none",borderRadius:16,padding:"13px",
                  color:"#fff",fontFamily:"'Fredoka One',cursive",fontSize:20,
                  cursor:"pointer",boxShadow:`0 6px 24px ${t.accent}44`}}>
                Let's Rush! 🍳
              </button>
            </div>
          </div>
        )}

        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:14,animation:"slideUp 0.5s ease"}}>
          <div style={{fontSize:68,animation:"floatBob 3s ease-in-out infinite"}}>🍳</div>
          <h1 className="griddle-rush-title" style={{
            fontFamily:"'Fredoka One',cursive",fontSize:50,margin:"2px 0 0",
            animation:"shimmer 3s linear infinite",
            "--acc": t.accent,
          }}>Griddle Rush</h1>
          <p style={{color:"rgba(255,255,255,0.65)",margin:"3px 0 0",fontSize:11,
            letterSpacing:2,textTransform:"uppercase"}}>
            from the Letter Griddle Cafe
          </p>
        </div>

        {/* Best score */}
        <div style={{background:t.panelBg,border:`1px solid ${t.accent}55`,borderRadius:16,
          padding:"10px 28px",marginBottom:14,textAlign:"center"}}>
          <div style={{fontFamily:"'Fredoka One',cursive",fontSize:28,color:t.accent}}>🏆 {highScoreVal}</div>
          <div style={{color:"rgba(255,255,255,0.5)",fontSize:10,marginTop:1,letterSpacing:1}}>BEST SCORE</div>
        </div>

        {/* 4 tile preview */}
        <div style={{display:"flex",gap:8,marginBottom:16,justifyContent:"center"}}>
          {t.types.map((tp,i)=>(
            <div key={i} style={{width:46,height:46,borderRadius:10,background:tp.bg,
              border:`2.5px solid ${tp.border}`,display:"flex",alignItems:"center",
              justifyContent:"center",fontSize:22,boxShadow:`0 4px 14px ${tp.shadow}`}}>{tp.emoji}</div>
          ))}
        </div>

        {/* Theme */}
        <p style={{color:LABEL,fontSize:11,fontWeight:700,letterSpacing:1,
          textTransform:"uppercase",marginBottom:8}}>Theme</p>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {Object.entries(THEMES).map(([k,th])=>(
            <button key={k} onClick={()=>setThemeKey(k)} style={{
              background:themeKey===k?th.accent+"33":"rgba(255,255,255,0.08)",
              border:`2px solid ${themeKey===k?th.accent:"rgba(255,255,255,0.18)"}`,
              borderRadius:12,padding:"7px 11px",
              color:themeKey===k?th.accent:"rgba(255,255,255,0.7)",
              fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,cursor:"pointer",
              transition:"all 0.15s",transform:themeKey===k?"scale(1.05)":"scale(1)",
              boxShadow:themeKey===k?`0 4px 14px ${th.accent}44`:"none"}}>{th.name}</button>
          ))}
        </div>

        {/* Timer */}
        <p style={{color:LABEL,fontSize:11,fontWeight:700,letterSpacing:1,
          textTransform:"uppercase",marginBottom:8}}>Timer</p>
        <div style={{display:"flex",gap:7,marginBottom:14,flexWrap:"wrap",justifyContent:"center"}}>
          {TIMER_OPTS.map(o=>(
            <button key={o.value} onClick={()=>setTimerOpt(o.value)} style={{
              background:timerOpt===o.value?t.accent+"33":"rgba(255,255,255,0.08)",
              border:`2px solid ${timerOpt===o.value?t.accent:"rgba(255,255,255,0.18)"}`,
              borderRadius:11,padding:"6px 11px",
              color:timerOpt===o.value?t.accent:"rgba(255,255,255,0.7)",
              fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer",
              transition:"all 0.13s",transform:timerOpt===o.value?"scale(1.04)":"scale(1)"}}>{o.label}</button>
          ))}
        </div>

        {/* Music */}
        <button onClick={()=>setMusicPref(m=>!m)} style={{
          background:musicPref?t.accent+"22":"rgba(255,255,255,0.07)",
          border:`1px solid ${musicPref?t.accent:"rgba(255,255,255,0.2)"}`,borderRadius:18,
          padding:"7px 18px",marginBottom:18,cursor:"pointer",
          color:musicPref?t.accent:"rgba(255,255,255,0.7)",
          fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:14,
          display:"flex",alignItems:"center",gap:7}}>
          {musicPref?"🎵 Music On":"🔇 Music Off"}
        </button>

        {/* Play / Continue */}
        {hasSavedGame && (
          <button onClick={resumeGame} style={{
            background:`linear-gradient(135deg,${t.accent},${t.bgTop})`,
            border:"none",borderRadius:24,padding:"15px 52px",
            color:"#fff",fontFamily:"'Fredoka One',cursive",fontSize:27,
            cursor:"pointer",boxShadow:`0 10px 40px ${t.accent}55`,
            marginBottom:12}}
            onPointerDown={e=>{e.currentTarget.style.transform="scale(0.95)";unlock();}}
            onPointerUp={e=>e.currentTarget.style.transform="scale(1)"}>
            ▶ Continue Game
          </button>
        )}
        <button onClick={startGame} style={{
          background: hasSavedGame ? "rgba(255,255,255,0.09)" : `linear-gradient(135deg,${t.accent},${t.bgTop})`,
          border: hasSavedGame ? "1px solid rgba(255,255,255,0.2)" : "none",
          borderRadius:24,padding:"15px 52px",
          color:"#fff",fontFamily:"'Fredoka One',cursive",
          fontSize: hasSavedGame ? 20 : 27,
          cursor:"pointer",
          boxShadow: hasSavedGame ? "none" : `0 10px 40px ${t.accent}55`}}
          onPointerDown={e=>{e.currentTarget.style.transform="scale(0.95)";unlock();}}
          onPointerUp={e=>e.currentTarget.style.transform="scale(1)"}>
          {hasSavedGame ? "New Game" : "Let's Rush! 🍳"}
        </button>

        <p style={{color:"rgba(255,255,255,0.55)",fontSize:11,marginTop:14,
          textAlign:"center",maxWidth:260,lineHeight:1.8}}>
          Drag groups anywhere on the griddle • Match 3 to clear • Beat your best!
        </p>

        <FooterLinks color="rgba(255,255,255,0.45)" />
      </div>
    );
  }

  // ── GAME OVER ─────────────────────────────────────────────────────────────
  if(screen==="gameover"){
    return(
      <div style={{minHeight:"100vh",fontFamily:"'Nunito',sans-serif",
        background:`radial-gradient(ellipse at 35% 25%,${t.bgTop},${t.bgBot} 72%)`,
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
        <style>{GLOBAL_CSS}</style>
        <div style={{fontSize:66,animation:"floatBob 2.5s ease-in-out infinite"}}>🍳</div>
        <h2 style={{fontFamily:"'Fredoka One',cursive",fontSize:40,color:"#fff",margin:"8px 0 4px"}}>
          That's a Wrap!
        </h2>
        <p style={{color:"rgba(255,255,255,0.65)",marginBottom:20,fontSize:14}}>
          {timerOpt>0?"Time's up! Griddle's closed.":"No more moves — the griddle is jammed!"}
        </p>

        {/* Score card */}
        <div style={{background:t.panelBg,border:`1px solid ${t.accent}66`,borderRadius:20,
          padding:"18px 42px",marginBottom:20,textAlign:"center",boxShadow:"0 10px 48px rgba(0,0,0,0.5)"}}>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",
            letterSpacing:2,marginBottom:4}}>Final Score</div>
          <div style={{fontFamily:"'Fredoka One',cursive",fontSize:62,color:"#fff",lineHeight:1.1}}>
            {score}
          </div>
          {newHigh&&(
            <div style={{color:t.accent,fontWeight:900,fontSize:16,marginTop:6,
              textShadow:`0 0 20px ${t.accent}88`}}>
              🏆 New Personal Best!
            </div>
          )}
          <div style={{color:"rgba(255,255,255,0.55)",fontSize:13,marginTop:8,fontWeight:700}}>
            Best: <span style={{color:"#fff"}}>{highScoreVal}</span>
          </div>
        </div>

        {/* Share button */}
        <button onClick={doShare} style={{
          background:`linear-gradient(135deg,${t.accent},${t.bgTop})`,
          border:"none",borderRadius:18,padding:"13px 32px",
          color:"#fff",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:16,
          cursor:"pointer",marginBottom:10,display:"flex",alignItems:"center",gap:8,
          boxShadow:`0 6px 24px ${t.accent}55`}}>
          📤 Share My Score
        </button>
        {showShare&&(
          <div style={{color:t.accent,fontSize:12,fontWeight:700,marginBottom:8,textAlign:"center"}}>
            ✅ Copied to clipboard!
          </div>
        )}

        {/* More games nudge */}
        <div style={{background:"rgba(255,255,255,0.08)",borderRadius:14,padding:"10px 18px",
          marginBottom:16,textAlign:"center",border:"1px solid rgba(255,255,255,0.14)"}}>
          <div style={{color:"rgba(255,255,255,0.6)",fontSize:11,marginBottom:6}}>
            More games from the Letter Griddle Cafe
          </div>
          <a href="https://lettergriddle.com" target="_blank" rel="noreferrer"
            style={{color:t.accent,fontSize:13,fontWeight:800,textDecoration:"none",letterSpacing:0.5}}>
            🥞 lettergriddle.com
          </a>
        </div>

        <div style={{display:"flex",gap:10,marginBottom:16}}>
          <button onClick={startGame} style={{
            background:`linear-gradient(135deg,${t.accent},${t.bgTop})`,border:"none",borderRadius:18,
            padding:"12px 28px",color:"#fff",fontFamily:"'Fredoka One',cursive",fontSize:20,
            cursor:"pointer",boxShadow:`0 6px 24px ${t.accent}55`}}>Play Again!</button>
          <button onClick={()=>setScreen("menu")} style={{
            background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.18)",
            borderRadius:18,padding:"12px 18px",color:"rgba(255,255,255,0.7)",
            fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>
            Menu
          </button>
        </div>

        <FooterLinks color="rgba(255,255,255,0.45)" />
      </div>
    );
  }

  // ── GAME ──────────────────────────────────────────────────────────────────
  return(
    <div style={{minHeight:"100vh",fontFamily:"'Nunito',sans-serif",
      background:`radial-gradient(ellipse at 20% 10%,${t.bgTop},${t.bgBot} 65%)`,
      display:"flex",flexDirection:"column",alignItems:"center",
      padding:"10px 10px 24px",overflowX:"hidden",userSelect:"none",touchAction:"none"}}>
      <style>{GLOBAL_CSS}</style>

      {/* How to Play modal (also accessible in-game) */}
      {showHowTo&&(
        <div onClick={()=>setShowHowTo(false)}
          style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",
            display:"flex",alignItems:"center",justifyContent:"center",
            zIndex:1000,padding:20}}>
          <div onClick={e=>e.stopPropagation()}
            style={{background:"#1a1a2e",border:`2px solid ${t.accent}66`,
              borderRadius:22,padding:"24px 22px",maxWidth:360,width:"100%",
              maxHeight:"85vh",overflowY:"auto",position:"relative"}}>
            <button onClick={()=>setShowHowTo(false)}
              style={{position:"absolute",top:12,right:14,background:"none",
                border:"none",color:"#888",fontSize:22,cursor:"pointer",lineHeight:1}}>✕</button>
            <h2 style={{fontFamily:"'Fredoka One',cursive",fontSize:26,color:t.accent,
              margin:"0 0 4px",textAlign:"center"}}>How to Play</h2>
            <p style={{color:"rgba(255,255,255,0.5)",fontSize:11,textAlign:"center",
              marginBottom:18,letterSpacing:1}}>GRIDDLE RUSH 🍳</p>
            {[
              {icon:"👇",title:"Pick up a group",text:"Tap and drag any tile group from the tray at the bottom."},
              {icon:"📍",title:"Place it on the griddle",text:"Drag over the grid — glowing cells show where it will land. Release to place."},
              {icon:"↕ ↔",title:"Vertical & horizontal",text:"Groups can be stacked top-to-bottom or side-by-side. The tray shows their orientation."},
              {icon:"3️⃣",title:"Match 3 to clear",text:"Get 3 of the same emoji in a row or column — they poof away and score points!"},
              {icon:"🔥",title:"Combos score double",text:"Clear two sets in a row for a Combo!"},
              {icon:"🗂️",title:"Clear your tray",text:"Use all tiles in the current tray before a fresh set is dealt."},
            ].map(({icon,title,text})=>(
              <div key={title} style={{display:"flex",gap:12,marginBottom:14,alignItems:"flex-start"}}>
                <div style={{fontSize:22,flexShrink:0,width:32,textAlign:"center"}}>{icon}</div>
                <div>
                  <div style={{color:"#fff",fontWeight:800,fontSize:13,marginBottom:2}}>{title}</div>
                  <div style={{color:"rgba(255,255,255,0.6)",fontSize:12,lineHeight:1.5}}>{text}</div>
                </div>
              </div>
            ))}
            <button onClick={()=>setShowHowTo(false)}
              style={{width:"100%",marginTop:10,
                background:`linear-gradient(135deg,${t.accent},${t.bgTop})`,
                border:"none",borderRadius:14,padding:"12px",
                color:"#fff",fontFamily:"'Fredoka One',cursive",fontSize:18,
                cursor:"pointer"}}>Back to Game!</button>
          </div>
        </div>
      )}

      {/* Board-reveal overlay — shows briefly before game over screen */}
      {showBoard&&(
        <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:400,
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
          background:"rgba(0,0,0,0.55)"}}>
          <div style={{fontFamily:"'Fredoka One',cursive",fontSize:38,color:"#fff",
            textShadow:"0 4px 24px rgba(0,0,0,0.8)",
            animation:"slideUp 0.4s ease",textAlign:"center",lineHeight:1.3}}>
            🍳 That's a Wrap!
          </div>
          <div style={{color:"rgba(255,255,255,0.7)",fontSize:15,marginTop:8,
            fontFamily:"'Nunito',sans-serif",fontWeight:700,
            animation:"slideUp 0.5s ease 0.1s both"}}>
            {timerOpt>0?"Time's up!":"Griddle's jammed!"}
          </div>
        </div>
      )}

      {/* Drag ghost */}
      {dragGroup&&(()=>{
        const grp=dragGroup.group;
        const isH=grp.orientation==="horizontal";
        const count=grp.tiles.length;
        const w=isH?count*TILE+(count-1)*GAP:TILE;
        const h=isH?TILE:count*TILE+(count-1)*GAP;
        return(
          <div style={{
            position:"fixed",left:ghostXY.x-w/2,top:ghostXY.y-h/2,
            width:w,height:h,pointerEvents:"none",zIndex:9999,
            display:"flex",flexDirection:isH?"row":"column",gap:GAP,
            transform:"scale(1.1) rotate(-2deg)",transformOrigin:"center center",
            filter:"drop-shadow(0 12px 20px rgba(0,0,0,0.8))",opacity:0.88,
          }}>
            {grp.tiles.map((emoji,i)=>{
              const tp=getTileType(t.types,emoji);
              return(
                <div key={i} style={{
                  width:TILE,height:TILE,background:tp.bg,
                  border:"3px solid #fff",borderRadius:11,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:TILE*0.50,flexShrink:0,pointerEvents:"none",
                }}>{emoji}</div>
              );
            })}
          </div>
        );
      })()}

      {/* Particles */}
      {poofs.map(p=>(
        <div key={p.id} style={{position:"fixed",left:p.x,top:p.y,pointerEvents:"none",
          zIndex:999,fontSize:26,animation:"poof 0.6s ease forwards",transformOrigin:"center",userSelect:"none"}}>
          {p.emoji}✨
        </div>
      ))}
      {scorePops.map(p=>(
        <div key={p.id} style={{position:"fixed",left:p.x-14,top:p.y-8,pointerEvents:"none",
          zIndex:999,fontFamily:"'Fredoka One',cursive",fontSize:22,color:"#fff",
          textShadow:"0 2px 8px rgba(0,0,0,0.9)",animation:"scoreUp 0.88s ease forwards",whiteSpace:"nowrap"}}>
          +{p.val}
        </div>
      ))}
      {comboMsg&&(
        <div style={{position:"fixed",top:"36%",left:"50%",zIndex:500,pointerEvents:"none",
          fontFamily:"'Fredoka One',cursive",fontSize:52,color:t.accent,
          textShadow:`0 0 32px ${t.accent}`,animation:"comboZoom 1.1s ease forwards"}}>{comboMsg}</div>
      )}
      {newAch&&(
        <div style={{position:"fixed",top:14,left:"50%",zIndex:600,
          background:`linear-gradient(135deg,${t.accent}ee,${t.bgTop}ee)`,
          borderRadius:17,padding:"9px 20px",fontFamily:"'Nunito',sans-serif",
          fontWeight:800,color:"#fff",boxShadow:"0 8px 30px rgba(0,0,0,0.6)",
          display:"flex",gap:9,alignItems:"center",animation:"toastDrop 0.35s ease"}}>
          <span style={{fontSize:22}}>{newAch.icon}</span>
          <div>
            <div style={{fontSize:10,opacity:0.75}}>Achievement Unlocked!</div>
            <div style={{fontSize:15}}>{newAch.name}</div>
          </div>
        </div>
      )}

      {/* Header — lettergriddle.com top left, score center, controls top right */}
      <div style={{width:"100%",maxWidth:420,display:"flex",justifyContent:"space-between",
        alignItems:"center",marginBottom:6}}>

        {/* Left: home link + best score */}
        <div>
          <a href="https://lettergriddle.com" target="_blank" rel="noreferrer"
            style={{color:t.accent,fontSize:10,textDecoration:"none",fontWeight:700,
              opacity:0.8,display:"block",marginBottom:2}}>
            🥞 lettergriddle.com
          </a>
          <div style={{color:t.accent,fontSize:12,fontWeight:700}}>🏆 {highScoreVal}</div>
          {newHigh&&<div style={{color:t.accent,fontSize:9,fontWeight:900,animation:"pulse 0.8s infinite"}}>NEW BEST!</div>}
        </div>

        {/* Center: current score */}
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:44,color:"#fff",
          textShadow:`0 0 22px ${t.accent}66`,lineHeight:1}}>{score}</div>

        {/* Right: music + menu */}
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>{const m=!musicPref;setMusicPref(m);m?startMusic():stopMusic();}} style={{
            background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,
            padding:"5px 8px",color:musicPref?t.accent:"#444",cursor:"pointer",fontSize:15}}>
            {musicPref?"🎵":"🔇"}</button>
          <button onClick={()=>setShowHowTo(true)} style={{
            background:"rgba(255,255,255,0.07)",border:"1px solid #333",borderRadius:8,
            padding:"5px 8px",color:"#888",cursor:"pointer",fontSize:13,fontWeight:700}}>❓</button>
          <button onClick={()=>{
            saveGame(grid,queue,score,timeLeft,themeKey,timerOpt);
            setHasSavedGame(true);
            stopMusic();setScreen("menu");
          }} style={{
            background:"rgba(255,255,255,0.07)",border:"1px solid #222",borderRadius:8,
            padding:"5px 10px",color:"#777",fontFamily:"'Nunito',sans-serif",
            fontWeight:700,fontSize:11,cursor:"pointer"}}>💾 Exit</button>
        </div>
      </div>

      {/* Timer */}
      {timerOpt>0&&(
        <div style={{width:"100%",maxWidth:420,marginBottom:6}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:3,
            color:timerWarn?"#ef4444":"#444",fontSize:12,fontWeight:700}}>
            <span>⏱</span>
            <span style={{animation:timerWarn?"timerWarn 0.5s infinite":"none"}}>{fmtTime(timeLeft)}</span>
          </div>
          <div style={{height:5,background:"rgba(255,255,255,0.08)",borderRadius:5}}>
            <div style={{height:"100%",borderRadius:5,transition:"width 1s linear",
              width:`${(timeLeft/timerOpt)*100}%`,
              background:timerWarn?"linear-gradient(90deg,#ef4444,#f97316)":`linear-gradient(90deg,${t.accent},${t.bgTop})`}}/>
          </div>
        </div>
      )}

      {/* Drag hint */}
      <div style={{fontSize:11,color:"#3a3a3a",marginBottom:5,textAlign:"center",minHeight:15}}>
        {dragGroup
          ?(snapValid?"✅ Release to place here":"Drag over the griddle to place")
          :"👇 Drag a group onto the griddle"}
      </div>

      {/* GRID */}
      <div ref={gridEl} style={{
        display:"grid",gridTemplateColumns:`repeat(${GRID},${TILE}px)`,
        gap:GAP,background:t.gridBg,borderRadius:18,padding:9,
        border:`2px solid ${snapValid?t.accent:t.gridBorder}`,
        boxShadow:`0 10px 48px rgba(0,0,0,0.65),inset 0 0 40px rgba(0,0,0,0.25)${snapValid?`,0 0 20px ${t.accent}66`:""}`,
        marginBottom:20,position:"relative",
        transition:"border-color 0.15s,box-shadow 0.15s",
        animation:shaking?"shakeLR 0.42s ease":"none"}}>
        {grid.map((row,ri)=>row.map((cell,ci)=>{
          const key=`${ri},${ci}`;
          const isSnap=snapSet.has(key)&&!cell;
          const emoji=isSnap?snapMap[key]:cell;
          const tp=emoji?getTileType(t.types,emoji):null;
          return(
            <div key={key} ref={el=>{if(el)cellEls.current[key]=el;}} style={{
              width:TILE,height:TILE,borderRadius:10,position:"relative",
              background:tp?tp.bg:"rgba(0,0,0,0.42)",
              border:`2.5px solid ${isSnap?"#ffffff":tp?tp.border:"rgba(255,255,255,0.06)"}`,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:TILE*0.50,
              opacity:isSnap?0.82:1,
              boxShadow:isSnap
                ?`0 0 16px 3px rgba(255,255,255,0.6),0 3px 10px ${tp?tp.shadow:"rgba(0,0,0,0.3)"}`
                :tp?`0 3px 10px ${tp.shadow}`:"none",
              animation:isSnap?"snapPulse 0.7s ease-in-out infinite":cell?"dropIn 0.22s ease":"none",
              transition:"background 0.08s,border 0.08s",
            }}>{emoji||""}</div>
          );
        }))}
      </div>

      {/* QUEUE */}
      <p style={{color:"#2e2e2e",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",marginBottom:8}}>
        Drag a group — place it anywhere
      </p>
      <div style={{display:"flex",gap:14,justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
        {queue.map((group,gi)=>{
          const isH=group.orientation==="horizontal";
          const isDragging=dragGroup&&dragGroup.group.id===group.id;
          return(
            <div key={group.id}
              onPointerDown={e=>onGroupPointerDown(e,group,gi)}
              style={{
                background:t.panelBg,border:`2px solid ${t.accent}33`,borderRadius:14,
                padding:"10px",display:"flex",
                flexDirection:isH?"row":"column",
                alignItems:"center",gap:GAP,
                boxShadow:"0 5px 20px rgba(0,0,0,0.45)",
                cursor:"grab",touchAction:"none",
                transition:"transform 0.14s,opacity 0.14s,box-shadow 0.14s",
                opacity:isDragging?0.2:1,
              }}
              onPointerEnter={e=>{
                if(!dragGroup){
                  e.currentTarget.style.transform="scale(1.08) translateY(-4px)";
                  e.currentTarget.style.boxShadow=`0 10px 28px ${t.accent}44`;
                }
              }}
              onPointerLeave={e=>{
                e.currentTarget.style.transform="scale(1)";
                e.currentTarget.style.boxShadow="0 5px 20px rgba(0,0,0,0.45)";
              }}>
              {group.tiles.map((emoji,ti)=>{
                const tp=getTileType(t.types,emoji);
                return(
                  <div key={ti} style={{
                    width:TILE,height:TILE,background:tp.bg,
                    border:`2.5px solid ${tp.border}`,borderRadius:11,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:TILE*0.50,boxShadow:`0 3px 10px ${tp.shadow}`,
                    flexShrink:0,pointerEvents:"none",
                  }}>{emoji}</div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* In-game footer — compact */}
      <div style={{marginTop:14,textAlign:"center"}}>
        <div style={{color:"#222",fontSize:9,marginBottom:3}}>© {YEAR} Letter Griddle Cafe</div>
        <div style={{display:"flex",gap:10,justifyContent:"center"}}>
          <a href="https://lettergriddle.com/privacy" target="_blank" rel="noreferrer"
            style={{color:"#2a2a2a",fontSize:9,textDecoration:"none",borderBottom:"1px solid #333"}}>
            Privacy
          </a>
          <a href="https://lettergriddle.com/terms" target="_blank" rel="noreferrer"
            style={{color:"#2a2a2a",fontSize:9,textDecoration:"none",borderBottom:"1px solid #333"}}>
            Terms
          </a>
          <a href="https://lettergriddle.com" target="_blank" rel="noreferrer"
            style={{color:"#2a2a2a",fontSize:9,textDecoration:"none",borderBottom:"1px solid #333"}}>
            More Games
          </a>
        </div>
      </div>
    </div>
  );
}
