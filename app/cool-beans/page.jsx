"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const BEAN_COLORS = [
  { name: "Cerulean", hex: "#2a9d8f", cool: true },
  { name: "Cobalt", hex: "#1a56db", cool: true },
  { name: "Sage", hex: "#87a878", cool: true },
  { name: "Lavender", hex: "#9b8ec4", cool: true },
  { name: "Teal", hex: "#0d9488", cool: true },
  { name: "Periwinkle", hex: "#8b9fe8", cool: true },
  { name: "Slate", hex: "#64748b", cool: true },
  { name: "Mint", hex: "#6ee7b7", cool: true },
  { name: "Indigo", hex: "#6366f1", cool: true },
  { name: "Sky", hex: "#38bdf8", cool: true },
  { name: "Seafoam", hex: "#34d399", cool: true },
  { name: "Arctic", hex: "#a5f3fc", cool: true },
  { name: "Vermillion", hex: "#e63946", cool: false },
  { name: "Tangerine", hex: "#f4845f", cool: false },
  { name: "Amber", hex: "#f59e0b", cool: false },
  { name: "Crimson", hex: "#dc2626", cool: false },
  { name: "Saffron", hex: "#f97316", cool: false },
  { name: "Coral", hex: "#fb7185", cool: false },
  { name: "Scarlet", hex: "#ef4444", cool: false },
  { name: "Peach", hex: "#fca5a5", cool: false },
  { name: "Goldenrod", hex: "#eab308", cool: false },
  { name: "Terracotta", hex: "#c2410c", cool: false },
  { name: "Russet", hex: "#b45309", cool: false },
  { name: "Flamingo", hex: "#f472b6", cool: false },
];

const COOL_FACTS = [
  { emoji: "🫘", text: "The world's oldest known bean was found in Peru and is over 8,000 years old." },
  { emoji: "🎨", text: "Cool colors (blues, greens, purples) are called 'receding colors' — they appear to move away from you in paintings." },
  { emoji: "🫘", text: "There are over 400 different varieties of beans grown around the world." },
  { emoji: "🎨", text: "The color blue didn't appear in most ancient languages — Homer described the sea as 'wine-dark,' not blue." },
  { emoji: "🫘", text: "Beans are legumes, not vegetables. They're seeds from flowering plants." },
  { emoji: "🎨", text: "Teal was named after the teal duck — a small freshwater bird with a distinctive eye stripe of that color." },
  { emoji: "🫘", text: "NASA studies beans as a potential space crop — they fix nitrogen and are nutrient-dense." },
  { emoji: "🎨", text: "Cool colors lower perceived room temperature. Painting a room blue can make it feel 5–8°F cooler." },
  { emoji: "🫘", text: "Jelly beans were one of the first candies sent into space — astronauts packed them on early missions." },
  { emoji: "🎨", text: "Indigo was so valuable in ancient times it was traded like gold and called 'blue gold.'" },
  { emoji: "🫘", text: "The phrase 'spill the beans' may come from ancient Greek elections — white beans meant yes, dark beans meant no." },
  { emoji: "🎨", text: "Cerulean comes from the Latin 'caelum,' meaning sky or heaven." },
];

function getRandomPair() {
  const coolColor = BEAN_COLORS.filter(c => c.cool)[Math.floor(Math.random() * 12)];
  const warmColor = BEAN_COLORS.filter(c => !c.cool)[Math.floor(Math.random() * 12)];
  return Math.random() < 0.5 ? [coolColor, warmColor] : [warmColor, coolColor];
}

function BeanSvg({ color, size = 120, wiggle = false }) {
  return (
    <svg
      width={size}
      height={size * 0.85}
      viewBox="0 0 120 100"
      style={{
        display: "block",
        animation: wiggle ? "beanWiggle 0.3s ease-out" : "none",
        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.25))",
      }}
    >
      <defs>
        <radialGradient id={`beanGrad-${color.hex.slice(1)}`} cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor={lighten(color.hex, 0.3)} />
          <stop offset="60%" stopColor={color.hex} />
          <stop offset="100%" stopColor={darken(color.hex, 0.25)} />
        </radialGradient>
        <radialGradient id={`beanShine-${color.hex.slice(1)}`} cx="30%" cy="25%" r="35%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <path
        d="M60 8 C30 8 10 28 10 52 C10 74 28 92 58 92 C80 92 100 80 108 62 C116 44 108 18 90 10 C82 7 72 8 60 8Z"
        fill={`url(#beanGrad-${color.hex.slice(1)})`}
      />
      <path
        d="M40 28 C38 42 40 58 48 72"
        stroke={darken(color.hex, 0.3)}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <ellipse cx="48" cy="32" rx="18" ry="12"
        fill={`url(#beanShine-${color.hex.slice(1)})`}
        transform="rotate(-20 48 32)"
      />
    </svg>
  );
}

function lighten(hex, amount) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgb(${Math.min(255,r+amount*255)},${Math.min(255,g+amount*255)},${Math.min(255,b+amount*255)})`;
}
function darken(hex, amount) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgb(${Math.max(0,r-amount*255)},${Math.max(0,g-amount*255)},${Math.max(0,b-amount*255)})`;
}

const TIMER_SECONDS = 30;

export default function CoolBeans() {
  const [phase, setPhase] = useState("intro");
  const [pair, setPair] = useState(() => getRandomPair());
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [feedback, setFeedback] = useState(null);
  const [fact] = useState(() => COOL_FACTS[Math.floor(Math.random() * COOL_FACTS.length)]);
  const [countdown, setCountdown] = useState(3);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const intervalRef = useRef(null);
  const feedbackRef = useRef(null);

  const currentYear = new Date().getFullYear();

  const startGame = () => {
    setPhase("countdown");
    setCountdown(3);
  };

  useEffect(() => {
    if (phase === "countdown") {
      const t = setInterval(() => {
        setCountdown(c => {
          if (c <= 1) {
            clearInterval(t);
            setPhase("playing");
            setTimeLeft(TIMER_SECONDS);
            setScore(0);
            setTotal(0);
            setPair(getRandomPair());
            return 0;
          }
          return c - 1;
        });
      }, 800);
      return () => clearInterval(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "playing") {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setPhase("results");
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [phase]);

  const handlePick = useCallback((chosen) => {
    if (phase !== "playing" || feedback) return;
    const correct = chosen.cool;
    setScore(s => s + (correct ? 1 : 0));
    setTotal(t => t + 1);
    setFeedback({ correct, chosen });
    feedbackRef.current = setTimeout(() => {
      setFeedback(null);
      setPair(getRandomPair());
    }, 900);
  }, [phase, feedback]);

  const accuracy = total > 0 ? Math.round(score / total * 100) : 0;

  const resultLabel =
    score / total >= 0.9 ? "You've got cool instincts! 🧊" :
    score / total >= 0.7 ? "Pretty cool! 😎" :
    score / total >= 0.5 ? "Warming up! 🌤️" :
    "It's a hot mess! 🔥";

  const shareText =
`🫘 Cool Beans
🎯 Score: ${score}/${total} (${accuracy}% cool)
${score / total >= 0.9 ? "🧊🧊🧊" : score / total >= 0.7 ? "🧊🧊" : score / total >= 0.5 ? "🧊" : "🔥"}
${resultLabel}
Play at lettergriddle.com/cool-beans
More games: lettergriddle.com`;

  const handleShare = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    });
  };

  const timerPct = timeLeft / TIMER_SECONDS;
  const timerColor = timerPct > 0.5 ? "#2a9d8f" : timerPct > 0.25 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f2027 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', serif",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes beanWiggle {
          0% { transform: scale(1); }
          40% { transform: scale(1.06) rotate(-2deg); }
          70% { transform: scale(0.97) rotate(1deg); }
          100% { transform: scale(1); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(42,157,143,0.3); }
          50% { box-shadow: 0 0 40px rgba(42,157,143,0.6); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(3deg); }
          66% { transform: translateY(-4px) rotate(-2deg); }
        }
        @keyframes countPop {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); }
        }
        .bean-btn {
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 24px 20px;
          cursor: pointer;
          transition: transform 0.12s ease, border-color 0.12s, background 0.12s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 130px;
          max-width: 190px;
        }
        .bean-btn:hover {
          transform: translateY(-4px) scale(1.04);
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.09);
        }
        .bean-btn:active { transform: scale(0.97); }
        .bean-btn.correct {
          border-color: #2a9d8f;
          background: rgba(42,157,143,0.18);
        }
        .bean-btn.wrong {
          border-color: #ef4444;
          background: rgba(239,68,68,0.12);
        }
        .start-btn {
          background: linear-gradient(135deg, #2a9d8f, #6366f1);
          border: none;
          border-radius: 50px;
          color: white;
          font-size: 1.1rem;
          font-family: Georgia, serif;
          padding: 14px 40px;
          cursor: pointer;
          letter-spacing: 0.05em;
          transition: transform 0.15s, box-shadow 0.15s;
          animation: pulseGlow 2.5s infinite;
        }
        .start-btn:hover {
          transform: scale(1.06);
          box-shadow: 0 8px 30px rgba(99,102,241,0.5);
        }
        .share-btn {
          background: linear-gradient(135deg, #2a9d8f, #6366f1);
          border: none;
          border-radius: 50px;
          color: white;
          font-size: 1rem;
          font-family: Georgia, serif;
          padding: 12px 32px;
          cursor: pointer;
          letter-spacing: 0.05em;
          transition: transform 0.15s, box-shadow 0.15s;
          margin-bottom: 12px;
        }
        .share-btn:hover {
          transform: scale(1.04);
          box-shadow: 0 6px 20px rgba(99,102,241,0.5);
        }
        .deco-bean {
          position: absolute;
          opacity: 0.06;
          pointer-events: none;
        }
        .footer-link {
          color: #475569;
          text-decoration: underline;
          transition: color 0.15s;
        }
        .footer-link:hover { color: #94a3b8; }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 20px;
        }
        .modal-box {
          background: #1e293b;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 32px;
          max-width: 420px;
          width: 100%;
          position: relative;
          animation: fadeSlideUp 0.25s ease;
        }
        .modal-close {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(255,255,255,0.08);
          border: none;
          color: #94a3b8;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-close:hover { background: rgba(255,255,255,0.15); color: #e2e8f0; }
      `}</style>

      {/* Decorative background beans */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="deco-bean" style={{
          top: `${[8,20,55,70,15,80][i]}%`,
          left: `${[5,85,2,90,48,55][i]}%`,
          animation: `float ${3+i*0.7}s ease-in-out infinite`,
          animationDelay: `${i*0.4}s`,
          transform: `scale(${1+i*0.3}) rotate(${i*40}deg)`,
        }}>
          <BeanSvg color={BEAN_COLORS[i*4]} size={80} />
        </div>
      ))}

      {/* INTRO */}
      {phase === "intro" && (
        <div style={{ textAlign: "center", animation: "fadeSlideUp 0.6s ease", maxWidth: 400 }}>
          <div style={{ fontSize: "3.5rem", marginBottom: 8, animation: "float 3s ease-in-out infinite" }}>🫘</div>
          <h1 style={{ color: "#e2e8f0", fontSize: "2.8rem", margin: "0 0 4px", letterSpacing: "-0.02em", fontWeight: "bold" }}>
            Cool Beans
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 28 }}>
            A color intuition game
          </p>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "20px 24px", marginBottom: 28, border: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>
              Two beans appear. Pick the <span style={{ color: "#38bdf8", fontWeight: "bold" }}>cooler</span> colored one.<br />
              Score as many as you can in <span style={{ color: "#2a9d8f", fontWeight: "bold" }}>30 seconds</span>.
            </p>
          </div>
          <button className="start-btn" onClick={startGame}>
            Let's Go →
          </button>
        </div>
      )}

      {/* COUNTDOWN */}
      {phase === "countdown" && (
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: "8rem",
            color: "#2a9d8f",
            animation: "countPop 0.6s ease",
            textShadow: "0 0 40px rgba(42,157,143,0.6)",
          }}>
            {countdown}
          </div>
          <p style={{ color: "#64748b", fontSize: "1rem", letterSpacing: "0.15em" }}>GET READY</p>
        </div>
      )}

      {/* PLAYING */}
      {phase === "playing" && (
        <div style={{ width: "100%", maxWidth: 460, animation: "fadeSlideUp 0.3s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ color: "#2a9d8f", fontSize: "1.4rem", fontWeight: "bold" }}>
              {score} <span style={{ color: "#475569", fontSize: "0.8rem" }}>/ {total}</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#e2e8f0", fontSize: "2rem", fontWeight: "bold", lineHeight: 1 }}>{timeLeft}</div>
              <div style={{ color: "#475569", fontSize: "0.65rem", letterSpacing: "0.1em" }}>SECONDS</div>
            </div>
            <div style={{ color: "#64748b", fontSize: "0.85rem" }}>
              {total > 0 ? Math.round(score/total*100) : 0}% cool
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 6, marginBottom: 32, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${timerPct * 100}%`,
              background: timerColor,
              borderRadius: 4,
              transition: "width 1s linear, background 0.5s",
            }} />
          </div>

          <p style={{ color: "#94a3b8", textAlign: "center", marginBottom: 20, fontSize: "0.9rem", letterSpacing: "0.08em" }}>
            Which bean is <span style={{ color: "#38bdf8" }}>cooler</span>?
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            {pair.map((color, i) => {
              let cls = "bean-btn";
              if (feedback?.chosen?.name === color.name) cls += feedback.correct ? " correct" : " wrong";
              return (
                <button key={color.name + i} className={cls} onClick={() => handlePick(color)}>
                  <BeanSvg color={color} size={100} wiggle={feedback?.chosen?.name === color.name} />
                  <span style={{ color: "#cbd5e1", fontSize: "0.9rem", letterSpacing: "0.04em" }}>{color.name}</span>
                  {feedback?.chosen?.name === color.name && (
                    <span style={{ fontSize: "1.2rem" }}>{feedback.correct ? "✓" : "✗"}</span>
                  )}
                </button>
              );
            })}
          </div>

          {feedback && (
            <p style={{
              textAlign: "center",
              marginTop: 16,
              fontSize: "0.9rem",
              color: feedback.correct ? "#2a9d8f" : "#f87171",
              animation: "fadeSlideUp 0.2s ease",
            }}>
              {feedback.correct ? "Cool choice! 🧊" : "That one's warm! 🔥"}
            </p>
          )}
        </div>
      )}

      {/* RESULTS */}
      {phase === "results" && (
        <div style={{ textAlign: "center", maxWidth: 420, animation: "fadeSlideUp 0.5s ease" }}>
          <div style={{ fontSize: "3rem", marginBottom: 8 }}>
            {score / total >= 0.8 ? "🧊" : score / total >= 0.5 ? "🫘" : "🔥"}
          </div>
          <h2 style={{ color: "#e2e8f0", fontSize: "2rem", margin: "0 0 6px" }}>Time's up!</h2>

          <div style={{ display: "inline-block", margin: "20px 0", position: "relative" }}>
            <svg width="120" height="120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
              <circle cx="60" cy="60" r="50" fill="none"
                stroke={score/total >= 0.7 ? "#2a9d8f" : "#f59e0b"}
                strokeWidth="10"
                strokeDasharray={`${(score/total||0) * 314} 314`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                style={{ transition: "stroke-dasharray 1s ease" }}
              />
              <text x="60" y="56" textAnchor="middle" fill="#e2e8f0" fontSize="22" fontFamily="Georgia" fontWeight="bold">{score}</text>
              <text x="60" y="74" textAnchor="middle" fill="#475569" fontSize="11" fontFamily="Georgia">/ {total}</text>
            </svg>
          </div>

          <p style={{ color: "#94a3b8", marginBottom: 6 }}>
            {accuracy}% accurate — {resultLabel}
          </p>

          {/* Cool fact */}
          <div style={{
            background: "rgba(42,157,143,0.1)",
            border: "1px solid rgba(42,157,143,0.3)",
            borderRadius: 16,
            padding: "18px 20px",
            margin: "20px 0",
            textAlign: "left",
          }}>
            <p style={{ color: "#5eead4", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 8px" }}>
              {fact.emoji} Cool Fact
            </p>
            <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
              {fact.text}
            </p>
          </div>

          {/* Share button */}
          <button className="share-btn" onClick={() => setShowShareModal(true)}>
            Share Results 🫘
          </button>

          <br />

          <button className="start-btn" onClick={() => {
            setPhase("intro");
            setScore(0);
            setTotal(0);
            setTimeLeft(TIMER_SECONDS);
            setFeedback(null);
          }}>
            Play Again
          </button>
        </div>
      )}

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowShareModal(false)}>✕</button>
            <h2 style={{ color: "#e2e8f0", fontSize: "1.5rem", margin: "0 0 16px", textAlign: "center" }}>
              Share Your Results! 🫘
            </h2>
            <div style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: "16px",
              marginBottom: 16,
              fontFamily: "monospace",
              fontSize: "0.9rem",
              color: "#94a3b8",
              whiteSpace: "pre-wrap",
              lineHeight: 1.7,
            }}>
              {shareText}
            </div>
            <button
              className="share-btn"
              style={{ width: "100%", marginBottom: 0 }}
              onClick={handleShare}
            >
              {shareCopied ? "✓ Copied!" : "Copy to Clipboard"}
            </button>
            <p style={{ color: "#475569", fontSize: "0.75rem", textAlign: "center", marginTop: 12, marginBottom: 0 }}>
              Love the game? Share it with a friend who hasn't played yet! 🫘
            </p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: "center",
        padding: "16px",
        fontSize: "0.72rem",
        color: "#334155",
      }}>
        <div style={{ marginBottom: 4 }}>
          <a href="/" className="footer-link" style={{ color: "#475569" }}>🥞 lettergriddle.com</a>
        </div>
        <div>
          © {currentYear} Letter Griddle. All rights reserved.
          {" | "}
          <a href="/privacy" className="footer-link">Privacy Policy</a>
          {" | "}
          <a href="/terms" className="footer-link">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}
