'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// Anchor: April 16, 2026 = Fact #1 (Laughter)
const ANCHOR_DATE = new Date('2026-04-16T00:00:00-05:00');

const FACTS = [
  { number:1,  source:"Laughter",       text:"You are thirty times more likely to laugh in a group" },
  { number:2,  source:"Theatre",        text:"Actors say break a leg instead of good luck" },
  { number:3,  source:"Pancakes",       text:"Pancakes are one of the oldest foods in human history" },
  { number:4,  source:"Scrabble",       text:"Scrabble is in three of every five American homes" },
  { number:5,  source:"Pencil",         text:"Pencils are six sided so they do not roll away" },
  { number:6,  source:"Waffles",        text:"Waffle irons inspired the first Nike sneaker sole" },
  { number:7,  source:"Eiffel Tower",   text:"The Eiffel Tower was kept as a radio antenna" },
  { number:8,  source:"Golf",           text:"Scotland banned golf three times to protect archery" },
  { number:9,  source:"Paella",         text:"Paella is named for the pan not the rice" },
  { number:10, source:"Oatmeal Cookie", text:"Oatmeal cookies were once sold as a health food" },
  { number:11, source:"Perfume",        text:"Tapputi was the worlds first known chemist" },
  { number:12, source:"Potluck",        text:"Potluck meant giving guests whatever was in the pot" },
  { number:13, source:"Popcorn",        text:"Popcorn is one of the oldest snack foods ever discovered" },
  { number:14, source:"Caramel",        text:"Real caramel is just sugar cooked slowly over low heat" },
  { number:15, source:"Easter",         text:"Most people eat the chocolate bunny ears first" },
  { number:16, source:"Brunch",         text:"Brunch was coined in 1895 for late night carousers" },
  { number:17, source:"Breakfast",      text:"Breakfast means breaking the fast from overnight" },
  { number:18, source:"Jelly Beans",    text:"Jelly beans take seven days to make their hard shell" },
  { number:19, source:"Stars",          text:"More stars exist than grains of sand on Earth" },
  { number:20, source:"Reading",        text:"Reading boosts memory focus and empathy" },
  { number:21, source:"Selfie",         text:"The first selfie was taken in 1839" },
  { number:22, source:"Dance",          text:"Dancing boosts brain health in every human culture" },
  { number:23, source:"Antique",        text:"An antique must be at least one hundred years old" },
  { number:24, source:"Butterfly",      text:"Caterpillars become butterflies inside a chrysalis" },
  { number:25, source:"Soup",           text:"Evidence of soup dates back to six thousand BC" },
  { number:26, source:"Piano",          text:"A piano has seventy five hundred parts" },
  { number:27, source:"Social Media",   text:"People spend over two hours daily on social media" },
  { number:28, source:"Pasta",          text:"Over six hundred pasta shapes exist worldwide" },
  { number:29, source:"Puppy",          text:"Puppies sleep up to twenty hours each day" },
  { number:30, source:"Party",          text:"Holi is one of the oldest festivals on Earth" },
];

function getTodaysFact() {
  const now = new Date();
  const est = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const today = new Date(est); today.setHours(0,0,0,0);
  const anchor = new Date(ANCHOR_DATE); anchor.setHours(0,0,0,0);
  const days = Math.floor((today - anchor) / 86400000);
  const idx = ((days % FACTS.length) + FACTS.length) % FACTS.length;
  return FACTS[idx];
}

function pickCols(text) {
  const words = text.toUpperCase().replace(/[^A-Z ]/g,'').trim().split(/\s+/);
  let best = 10, bestScore = Infinity;
  for (let cols = 8; cols <= 12; cols++) {
    let col = 0, blacks = 0, rows = 0;
    const colCounts = Array(cols).fill(0);
    for (let wi = 0; wi < words.length; wi++) {
      const w = words[wi];
      if (col > 0 && col + w.length > cols) { blacks += cols - col; col = 0; rows++; }
      for (let li = 0; li < w.length; li++) { colCounts[col] += 1; col++; }
      if (wi < words.length - 1 && col < cols) col++;
    }
    blacks += cols - col; rows++;
    const maxCol = Math.max(...colCounts);
    const score = blacks + Math.abs(rows - 6) * 3 + maxCol * 2;
    if (score < bestScore) { bestScore = score; best = cols; }
  }
  return best;
}

function buildGrid(text, cols) {
  const words = text.toUpperCase().replace(/[^A-Z ]/g,'').trim().split(/\s+/);
  const rows = []; let row = [], col = 0;
  for (let wi = 0; wi < words.length; wi++) {
    const w = words[wi];
    if (col > 0 && col + w.length > cols) {
      while (col < cols) { row.push({t:'b'}); col++; }
      rows.push(row); row = []; col = 0;
    }
    for (let li = 0; li < w.length; li++) { row.push({t:'l', ch:w[li]}); col++; }
    if (wi < words.length - 1 && col < cols) { row.push({t:'b'}); col++; }
  }
  while (col < cols) { row.push({t:'b'}); col++; }
  if (row.length) rows.push(row);
  return rows;
}

function buildBank(grid, cols) {
  const bank = Array.from({length:cols}, () => []);
  for (let r = 0; r < grid.length; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c].t === 'l') bank[c].push(grid[r][c].ch);
  bank.forEach(col => {
    col.sort(); // alphabetical so players can scan easily
  });
  return bank;
}

function findCircled(grid, cols, source) {
  const src = source.toUpperCase().replace(/[^A-Z]/g,'');
  const used = new Set(), result = [];
  for (let si = 0; si < src.length; si++) {
    for (let r = 0; r < grid.length; r++) {
      let found = false;
      for (let c = 0; c < cols; c++) {
        const k = `${r},${c}`;
        if (!used.has(k) && grid[r][c].t === 'l' && grid[r][c].ch === src[si]) {
          result.push({r,c,si}); used.add(k); found = true; break;
        }
      }
      if (found) break;
    }
  }
  return result;
}

function Confetti() {
  const colors = ['#EF9F27','#FAC775','#854F0B','#633806','#FAEEDA','#BA7517','#f5c842'];
  const pieces = Array.from({length:45}, (_,i) => ({
    id:i,
    left: Math.random()*100,
    delay: Math.random()*1.5,
    dur: 1.8+Math.random()*1.5,
    color: colors[Math.floor(Math.random()*colors.length)],
    size: 7+Math.random()*9,
    rot: Math.random()*360,
  }));
  return (
    <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:50,overflow:'hidden'}}>
      {pieces.map(p=>(
        <div key={p.id} style={{
          position:'absolute',top:'-20px',left:`${p.left}%`,
          width:`${p.size}px`,height:`${p.size}px`,
          background:p.color,borderRadius:'2px',
          animation:`gff-fall ${p.dur}s ${p.delay}s ease-in forwards`,
          transform:`rotate(${p.rot}deg)`,
        }}/>
      ))}
      <style>{`@keyframes gff-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(540deg);opacity:0}}`}</style>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────
const S = {
  page:    {background:'#f0e4d0',minHeight:'100vh',padding:'16px',display:'flex',justifyContent:'center',fontFamily:"'Lato',sans-serif"},
  card:    {maxWidth:'640px',width:'100%',background:'#FFFBF4',borderRadius:'18px',border:'2px solid #FAC775',padding:'18px',boxShadow:'0 4px 24px rgba(65,36,2,0.12)',alignSelf:'flex-start'},
  btnPri:  {background:'#EF9F27',color:'white',border:'none',borderRadius:'7px',padding:'7px 18px',fontWeight:'700',cursor:'pointer',fontSize:'13px',fontFamily:"'Lato',sans-serif"},
  btnSec:  {background:'white',color:'#854F0B',border:'1.5px solid #EF9F27',borderRadius:'7px',padding:'7px 18px',fontWeight:'700',cursor:'pointer',fontSize:'13px',fontFamily:"'Lato',sans-serif"},
  iconBtn: {width:'34px',height:'34px',borderRadius:'7px',fontSize:'15px',cursor:'pointer',background:'white',color:'#854F0B',border:'1.5px solid #FAC775',display:'inline-flex',alignItems:'center',justifyContent:'center',fontFamily:"'Lato',sans-serif"},
  serif:   {fontFamily:"'Playfair Display',serif"},
};

export default function FactFallsPage() {
  const [fact]          = useState(() => getTodaysFact());
  const [cols, setCols] = useState(10);
  const [grid, setGrid] = useState([]);
  const [bank, setBank] = useState([]);
  const [circled, setCircled] = useState([]);
  const [answers, setAnswers] = useState({});
  const [started, setStarted] = useState(false);
  const [done, setDone]       = useState(false);
  const [secs, setSecs]       = useState(0);
  const [noTimer, setNoTimer] = useState(false);
  const [selKey, setSelKey]   = useState(null);
  const [toast, setToast]     = useState('');
  const [modal, setModal]     = useState(null);
  const [confetti, setConfetti] = useState(false);
  const timerRef = useRef(null);
  const toastRef = useRef(null);

  // Init
  useEffect(() => {
    setNoTimer(localStorage.getItem('gff_nt') === 'true');
    const c = pickCols(fact.text);
    setCols(c);
    const g = buildGrid(fact.text, c);
    const b = buildBank(g, c);
    setGrid(g); setBank(b); setCircled(findCircled(g, c, fact.source));
    try {
      const sv = JSON.parse(localStorage.getItem('gff_progress'));
      if (sv && sv.date === new Date().toDateString() && sv.num === fact.number) {
        setAnswers(sv.answers||{}); setSecs(sv.secs||0); setStarted(true);
        if (sv.done) { setDone(true); setConfetti(true); }
      }
    } catch(e) {}
  }, [fact]);

  // Timer
  useEffect(() => {
    if (started && !done) timerRef.current = setInterval(() => setSecs(s=>s+1), 1000);
    return () => clearInterval(timerRef.current);
  }, [started, done]);

  // Save
  useEffect(() => {
    if (!started || !grid.length) return;
    localStorage.setItem('gff_progress', JSON.stringify({
      date: new Date().toDateString(), num: fact.number, answers, secs, done
    }));
  }, [answers, secs, done, started, fact, grid]);

  // Sync saved answers to uncontrolled DOM inputs after load
  useEffect(() => {
    if (!grid.length || !started) return;
    Object.entries(answers).forEach(([key, ch]) => {
      if (!ch) return;
      const el = document.getElementById('cell-'+key);
      if (!el) return;
      el.value = ch;
      const [r, c] = key.split(',').map(Number);
      el.style.color = ch === grid[r]?.[c]?.ch ? '#2d7a2d' : '#c0392b';
    });
  }, [grid, started]); // only on grid/started change, not every keystroke

  const showToast = useCallback((msg) => {
    setToast(msg); clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(''), 2600);
  }, []);

  const checkWin = useCallback((ans, g, c) => {
    for (let r=0; r<g.length; r++)
      for (let col=0; col<c; col++)
        if (g[r][col].t==='l' && (ans[`${r},${col}`]||'') !== g[r][col].ch) return;
    setDone(true); clearInterval(timerRef.current); setConfetti(true);
  }, []);

  const focusCell = useCallback((key) => {
    setSelKey(key);
    setTimeout(() => {
      const el = document.getElementById('cell-' + key);
      if (el) el.focus();
    }, 10);
  }, []);

  const advanceFrom = useCallback((r, c, g, numCols) => {
    let nc = c + 1, nr = r;
    while (nr < g.length) {
      if (nc >= numCols) { nc = 0; nr++; continue; }
      if (g[nr]?.[nc]?.t === 'l') {
        const key = nr + ',' + nc;
        setSelKey(key);
        setTimeout(() => {
          const el = document.getElementById('cell-' + key);
          if (el) el.focus();
        }, 10);
        return;
      }
      nc++;
    }
  }, []);

  const handleInput = useCallback((key, r, c, val) => {
    if (!started||done) return;
    const ch = val.toUpperCase().replace(/[^A-Z]/g,'').slice(-1);

    // Clear
    if (!ch) {
      const ans = {...answers, [key]:''};
      setAnswers(ans);
      const el = document.getElementById('cell-'+key);
      if (el) { el.value=''; el.style.color='#633806'; }
      return;
    }

    // Only allow letters present in this column's bank
    const colLetters = bank[c] ? [...bank[c]] : [];
    for (let row = 0; row < grid.length; row++) {
      if (row === r) continue;
      if (grid[row]?.[c]?.t === 'l') {
        const placed = answers[row+','+c] || '';
        if (placed === grid[row][c].ch) {
          const idx = colLetters.indexOf(placed);
          if (idx !== -1) colLetters.splice(idx, 1);
        }
      }
    }
    if (!colLetters.includes(ch)) {
      showToast(ch + ' is not available in this column!');
      const el = document.getElementById('cell-'+key);
      if (el) el.value = answers[key] || '';
      return;
    }

    const ans = {...answers, [key]:ch};
    setAnswers(ans);

    // Update DOM directly — no re-render flash
    const el = document.getElementById('cell-'+key);
    if (el) {
      el.value = ch;
      el.style.color = ch === grid[r][c].ch ? '#2d7a2d' : '#c0392b';
    }

    advanceFrom(r, c, grid, cols);
    checkWin(ans, grid, cols);
  }, [started,done,answers,grid,cols,bank,checkWin,advanceFrom,showToast]);

  const handleCheck = () => {
    let wrong=0,filled=0;
    for (let r=0;r<grid.length;r++) for (let c=0;c<cols;c++) {
      if (grid[r][c].t==='l') { const v=answers[`${r},${c}`]||''; if(v){filled++;if(v!==grid[r][c].ch)wrong++;} }
    }
    if (!filled){showToast('Fill in some letters first!');return;}
    showToast(wrong===0 ? 'All good so far. Keep going!' : `${wrong} letter${wrong>1?'s':''} to fix. You got this!`);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setSecs(0);setAnswers({});setStarted(false);setDone(false);setSelKey(null);setConfetti(false);
    localStorage.removeItem('gff_progress');
    const c=pickCols(fact.text), g=buildGrid(fact.text,c), b=buildBank(g,c);
    setCols(c);setGrid(g);setBank(b);setCircled(findCircled(g,c,fact.source));setModal(null);
  };

  const handleShare = () => {
    const m=Math.floor(secs/60),s=secs%60,t=`${m}:${s<10?'0':''}${s}`;
    const txt=`\uD83E\uDD5E Griddle Fact Falls \u2014 No. ${fact.number}\n\uD83D\uDCDA Source: ${fact.source}\n\u23F1\uFE0F Completed in ${t}!\n\nPlay at lettergriddle.com/factfalls\nMore games at lettergriddle.com`;
    navigator.clipboard.writeText(txt).then(()=>showToast('Copied to clipboard!'));
  };

  const fmt = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
  const circledSet = {};
  circled.forEach(c=>{circledSet[`${c.r},${c.c}`]=true;});

  // Compute remaining bank: remove correctly placed letters from each column
  const remainingBank = bank.map((col, c) => {
    const used = [];
    for (let r = 0; r < grid.length; r++) {
      if (grid[r]?.[c]?.t === 'l') {
        const val = answers[`${r},${c}`] || '';
        if (val === grid[r][c].ch) used.push(val);
      }
    }
    const remaining = [...col];
    used.forEach(letter => {
      const idx = remaining.indexOf(letter);
      if (idx !== -1) remaining.splice(idx, 1);
    });
    return remaining;
  });
  const bankH = remainingBank.length ? Math.max(...remainingBank.map(col=>col.length)) : 0;

  // Source display
  const srcUpper = fact.source.toUpperCase();
  let ni = 0;
  const srcDisplay = srcUpper.split('').map((ch,i) => {
    if (ch===' ') return <span key={i}>&nbsp;&nbsp;</span>;
    const ci = circled[ni++];
    if (ci) {
      const val = answers[`${ci.r},${ci.c}`]||'';
      const hit = grid[ci.r] && val===grid[ci.r][ci.c]?.ch;
      return <span key={i} style={{color:hit?'#EF9F27':'#633806'}}>{hit?ch:'_'}</span>;
    }
    return <span key={i}>{ch}</span>;
  });

  const year = new Date().getFullYear();
  const dateStr = new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});

  return (
    <div style={S.page}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@400;700&display=swap" rel="stylesheet"/>
      <style>{`
        .gff-cell { box-sizing: border-box; }
        .gff-cell input { -webkit-user-select: text; user-select: text; }
        @media (max-width: 600px) {
          .gff-grid-wrap { padding: 6px !important; }
        }
      `}</style>
      <div style={S.card}>

        {/* Header */}
        <div style={{textAlign:'center',paddingBottom:'12px',borderBottom:'1.5px solid #FAC775',marginBottom:'14px'}}>
          <h1 style={{...S.serif,fontSize:'26px',color:'#633806',margin:0}}>Griddle Fact Falls</h1>
          <div style={{fontSize:'11px',color:'#BA7517',letterSpacing:'2px',textTransform:'uppercase',marginTop:'3px'}}>A Letter Griddle Cafe Daily</div>
        </div>

        {/* Win banner */}
        {done && (
          <div style={{background:'#fffbef',border:'2px solid #EF9F27',borderRadius:'12px',padding:'16px',textAlign:'center',marginBottom:'14px'}}>
            <h3 style={{...S.serif,color:'#633806',fontSize:'22px',marginBottom:'6px',marginTop:0}}>You got it!</h3>
            <div style={{fontSize:'13px',color:'#BA7517',marginBottom:'8px'}}>Completed in {fmt(secs)} &nbsp;&middot;&nbsp; {fact.source}</div>
            <div style={{fontSize:'12px',color:'#854F0B',fontStyle:'italic',lineHeight:1.6,marginBottom:'12px',maxWidth:'380px',margin:'0 auto 12px'}}>
              &ldquo;{fact.text}&rdquo;
            </div>
            <button onClick={handleShare} style={S.btnPri}>Share Results</button>
          </div>
        )}

        {/* Controls */}
        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'12px'}}>
          {!started&&!done
            ? <button onClick={()=>{
              setStarted(true);
              // Focus first letter cell after render
              setTimeout(()=>{
                for(let r=0;r<grid.length;r++){
                  for(let c=0;c<cols;c++){
                    if(grid[r]?.[c]?.t==='l'){
                      const k=r+','+c;
                      setSelKey(k);
                      const el=document.getElementById('cell-'+k);
                      if(el)el.focus();
                      return;
                    }
                  }
                }
              },50);
            }} style={S.btnPri}>Start</button>
            : <button onClick={()=>setModal('reset')} style={S.btnPri}>Reset</button>
          }
          <button onClick={handleCheck} disabled={!started} style={{...S.btnSec,opacity:started?1:0.35,cursor:started?'pointer':'default'}}>Check</button>
          <button onClick={()=>setModal('howto')} style={S.iconBtn}>?</button>
          <button onClick={()=>setModal('settings')} style={S.iconBtn}>&#9881;</button>
          {started&&!noTimer&&(
            <div style={{marginLeft:'auto',fontWeight:'700',color:'#854F0B',background:'#FFF8EE',border:'1.5px solid #FAC775',borderRadius:'7px',padding:'5px 14px',minWidth:'66px',textAlign:'center',fontSize:'15px'}}>
              {fmt(secs)}
            </div>
          )}
        </div>

        {/* Grid */}
        {grid.length>0 && (
          <div style={{background:'#FFF8EE',border:'2px solid #EF9F27',borderRadius:'10px',padding:'10px',marginBottom:'12px',overflowX:'auto'}}>
            {/* Bank */}
            <table style={{borderCollapse:'collapse',width:'100%',tableLayout:'fixed'}}>
              <colgroup>{Array.from({length:cols}).map((_,i)=><col key={i}/>)}</colgroup>
              <tbody>
                {Array.from({length:bankH}).map((_,bi)=>(
                  <tr key={bi}>
                    {Array.from({length:cols}).map((_,c)=>(
                      <td key={c} style={{textAlign:'center',fontSize:'12px',fontWeight:'700',color:'#633806',height:'18px',lineHeight:'18px',padding:'0 1px',border:'none'}}>
                        {remainingBank[c]?.[bi]||''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Divider */}
            <div style={{height:'3px',background:'#EF9F27',margin:'6px 0 4px',borderRadius:'2px'}}/>
            {/* Answer grid - uses uncontrolled inputs to prevent flash on mobile */}
            <table style={{borderCollapse:'collapse',width:'100%',tableLayout:'fixed'}}>
              <colgroup>{Array.from({length:cols}).map((_,i)=><col key={i}/>)}</colgroup>
              <tbody>
                {grid.map((row,r)=>(
                  <tr key={r}>
                    {row.map((cell,c)=>{
                      const key=`${r},${c}`;
                      const isCircled=circledSet[key];
                      if (cell.t==='b') return <td key={c} style={{height:'36px',background:'#412402',border:'1.5px solid #412402'}}/>;
                      return (
                        <td key={c} onClick={()=>started&&focusCell(key)}
                          style={{height:'36px',border:'1.5px solid #EF9F27',padding:0,position:'relative',cursor:started?'pointer':'default',background:'white'}}>
                          {isCircled&&(
                            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'22px',height:'22px',borderRadius:'50%',border:'1.5px solid #BA7517',pointerEvents:'none',zIndex:1}}/>
                          )}
                          <input id={'cell-'+key} type="text" maxLength={2}
                            defaultValue=""
                            disabled={!started}
                            onChange={e=>handleInput(key,r,c,e.target.value)}
                            onFocus={()=>setSelKey(key)}
                            style={{display:'block',width:'100%',height:'100%',background:'transparent',border:'none',outline:'none',textAlign:'center',fontSize:'12px',fontWeight:'700',fontFamily:"'Lato',sans-serif",textTransform:'uppercase',padding:0,cursor:started?'pointer':'default',color:'#633806',position:'relative',zIndex:2}}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Fact Source */}
        <div style={{background:'white',border:'1.5px solid #FAC775',borderRadius:'10px',padding:'12px 16px',marginBottom:'12px',textAlign:'center'}}>
          <div style={{...S.serif,fontSize:'12px',color:'#BA7517',letterSpacing:'1.5px',textTransform:'uppercase',marginBottom:'8px'}}>The Fact Source</div>
          <div style={{fontFamily:'monospace',fontSize:'17px',fontWeight:'700',color:'#633806',letterSpacing:'5px'}}>{srcDisplay}</div>
        </div>

        {/* Footer */}
        <div style={{textAlign:'center',fontSize:'11px',color:'#BA7517',paddingTop:'4px',lineHeight:1.9}}>
          Fact No. {fact.number} &nbsp;|&nbsp; {dateStr} &nbsp;|&nbsp;
          <button onClick={()=>setModal('howto')} style={{background:'none',border:'none',color:'#BA7517',textDecoration:'underline',cursor:'pointer',fontSize:'11px',padding:0}}>How to Play</button>
          &nbsp;|&nbsp;<a href="/privacy" style={{color:'#BA7517'}}>Privacy</a>
          &nbsp;|&nbsp;<a href="/terms" style={{color:'#BA7517'}}>Terms</a>
          &nbsp;|&nbsp;<a href="/" style={{color:'#BA7517'}}>lettergriddle.com</a>
          <div>&copy; {year} Letter Griddle. All rights reserved.</div>
        </div>
      </div>

      {confetti && <Confetti/>}

      {toast && (
        <div style={{position:'fixed',top:'18px',left:'50%',transform:'translateX(-50%)',background:'#633806',color:'#FAEEDA',padding:'9px 22px',borderRadius:'22px',fontSize:'13px',fontWeight:'700',zIndex:200,pointerEvents:'none',whiteSpace:'nowrap'}}>
          {toast}
        </div>
      )}

      {modal && (
        <div onClick={e=>e.target===e.currentTarget&&setModal(null)}
          style={{position:'fixed',inset:0,background:'rgba(65,36,2,0.42)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:100}}>
          <div style={{background:'#FFFBF4',borderRadius:'16px',border:'2px solid #FAC775',padding:'28px',maxWidth:'440px',width:'90%',maxHeight:'85vh',overflowY:'auto',position:'relative'}}>
            <button onClick={()=>setModal(null)} style={{position:'absolute',top:'14px',right:'16px',background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#BA7517'}}>&#10005;</button>

            {modal==='howto' && <>
              <h2 style={{...S.serif,color:'#633806',fontSize:'21px',marginBottom:'16px',marginTop:0}}>How to Play Griddle Fact Falls</h2>
              <ol style={{paddingLeft:'20px',margin:0}}>
                {[
                  <span key={0}>Press <strong style={{color:'#854F0B'}}>Start</strong>. Scrambled letters appear above the grid &mdash; each column&apos;s letters belong somewhere in that column below.</span>,
                  <span key={1}>Click a white cell and type a letter. Place each letter in the right row to reveal a fun fact. Each word fits entirely on one line &mdash; no wrapping. You can only enter letters available in that column!</span>,
                  <span key={2}>Cells with a <strong style={{color:'#854F0B'}}>circle</strong> reveal letters in <strong style={{color:'#854F0B'}}>The Fact Source</strong> &mdash; that&apos;s the puzzle category!</span>,
                  <span key={3}><strong style={{color:'#2d7a2d'}}>Green</strong> = correct. <strong style={{color:'#c0392b'}}>Red</strong> = try again. Press <strong style={{color:'#854F0B'}}>Check</strong> anytime.</span>,
                  <span key={4}>Progress saves automatically. A new fact drops every day at midnight.</span>,
                ].map((item,i)=>(
                  <li key={i} style={{fontSize:'13px',color:'#412402',lineHeight:1.65,marginBottom:'10px'}}>{item}</li>
                ))}
              </ol>
              <p style={{fontSize:'12px',color:'#BA7517',marginTop:'12px',marginBottom:0}}>Facts come from Letter Griddle puzzles, recipes, and cafe vignettes.</p>
              <div style={{display:'flex',justifyContent:'center',marginTop:'18px'}}>
                <button onClick={()=>setModal(null)} style={S.btnPri}>Return to Game</button>
              </div>
            </>}

            {modal==='settings' && <>
              <h2 style={{...S.serif,color:'#633806',fontSize:'21px',marginBottom:'16px',marginTop:0}}>Settings</h2>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 0'}}>
                <div>
                  <div style={{fontSize:'13px',color:'#412402',fontWeight:'700'}}>Hide timer</div>
                  <div style={{fontSize:'11px',color:'#BA7517',marginTop:'1px'}}>For less stressful play</div>
                </div>
                <button onClick={()=>{const nt=!noTimer;setNoTimer(nt);localStorage.setItem('gff_nt',String(nt));}}
                  style={{width:'38px',height:'22px',background:noTimer?'#EF9F27':'#FAC775',borderRadius:'11px',cursor:'pointer',position:'relative',border:'none',flexShrink:0}}>
                  <div style={{position:'absolute',top:'3px',left:noTimer?'19px':'3px',width:'16px',height:'16px',background:'white',borderRadius:'50%',transition:'left 0.2s'}}/>
                </button>
              </div>
              <div style={{display:'flex',justifyContent:'center',marginTop:'18px'}}>
                <button onClick={()=>setModal(null)} style={S.btnPri}>Return to Game</button>
              </div>
            </>}

            {modal==='reset' && <>
              <h2 style={{...S.serif,color:'#633806',fontSize:'21px',textAlign:'center',marginBottom:'14px',marginTop:0}}>Reset the puzzle?</h2>
              <p style={{textAlign:'center',fontSize:'13px',color:'#412402',margin:0}}>All progress will be cleared.</p>
              <div style={{display:'flex',gap:'10px',justifyContent:'center',marginTop:'18px'}}>
                <button onClick={()=>setModal(null)} style={S.btnSec}>No!</button>
                <button onClick={handleReset} style={S.btnPri}>Yes</button>
              </div>
            </>}
          </div>
        </div>
      )}
    </div>
  );
}