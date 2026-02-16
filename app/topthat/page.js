"use client";
import { useState, useEffect, useCallback, useRef } from "react";

const GAME_DURATION = 30;
const DISPLAY_TIME = 3000; // ms before pair auto-expires

// Pancake toppings (correct answers)
const toppings = [
  "Maple Syrup", "Blueberries", "Strawberries", "Whipped Cream", "Banana Slices",
  "Chocolate Chips", "Butter", "Honey", "Pecans", "Walnuts",
  "Raspberries", "Powdered Sugar", "Cinnamon", "Nutella", "Peanut Butter",
  "Coconut Flakes", "Caramel Sauce", "Lemon Curd", "Jam", "Cream Cheese",
  "Blackberries", "Almonds", "Granola", "Yogurt", "Apple Slices",
  "Peach Slices", "Agave Nectar", "Boysenberries", "Dulce de Leche", "Mascarpone",
  "Fig Preserves", "Hazelnuts", "Mango", "Passion Fruit", "Compote",
];

// NOT pancake toppings (wrong answers)
const notToppings = [
  "Ketchup", "Mustard", "Mayonnaise", "Soy Sauce", "Hot Dog",
  "Pickles", "Olives", "Anchovies", "Salsa", "Ranch Dressing",
  "Wasabi", "Horseradish", "Garlic Bread", "Croutons", "Sardines",
  "Breadstick", "Potato Chips", "French Fries", "Meatballs", "Tuna",
  "Gravy", "BBQ Sauce", "Relish", "Sauerkraut", "Hummus",
  "Sriracha", "Tabasco", "Teriyaki", "Fish Sauce", "Tartar Sauce",
  "Pepperoni", "Jalapeños", "Onion Rings", "Clam Chowder", "Coleslaw",
];

// Fun topping facts
const toppingFacts = [
  "Maple syrup takes about 40 gallons of sap to make just one gallon of syrup!",
  "The world's largest pancake was over 49 feet wide and used 6,614 pounds of batter.",
  "Blueberries are one of the only naturally blue foods in nature.",
  "Whipped cream was invented in the 16th century and was originally called 'milk snow.'",
  "Americans pour over 26 million gallons of maple syrup on their pancakes each year.",
  "Bananas are technically berries, but strawberries are not!",
  "Chocolate chips were invented by accident in 1938 by Ruth Wakefield.",
  "Honey never spoils. Archaeologists found 3,000-year-old honey that was still edible!",
  "Pecans are the only major tree nut native to North America.",
  "Cinnamon was once more valuable than gold in ancient Egypt.",
  "Nutella was created during World War II when chocolate was in short supply.",
  "The average American eats about 3 pounds of peanut butter per year.",
  "Coconut is technically a fruit, a nut, and a seed all at once.",
  "Lemon curd dates back to 19th-century England as a filling for tarts.",
  "Powdered sugar is just regular sugar ground into a fine powder with a bit of cornstarch.",
];

export default function LetterGriddleTopThat() {
  const [gameState, setGameState] = useState("idle"); // idle, countdown, playing, finished
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [currentPair, setCurrentPair] = useState(null); // { topping, notTopping, toppingOnLeft }
  const [countdownNum, setCountdownNum] = useState(3);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [toppingFact, setToppingFact] = useState("");
  const [feedbackState, setFeedbackState] = useState(null); // null, "correct", "wrong", "timeout"
  const [particles, setParticles] = useState([]);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [pairsShown, setPairsShown] = useState(0);

  const gameTimerRef = useRef(null);
  const pairTimerRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const particleIdRef = useRef(0);
  const usedToppingsRef = useRef(new Set());
  const usedNotToppingsRef = useRef(new Set());

  // Generate a new pair
  const generatePair = useCallback(() => {
    let topping, notTopping;

    // Pick unused topping
    const availableToppings = toppings.filter(t => !usedToppingsRef.current.has(t));
    if (availableToppings.length === 0) usedToppingsRef.current.clear();
    const toppingPool = availableToppings.length > 0 ? availableToppings : toppings;
    topping = toppingPool[Math.floor(Math.random() * toppingPool.length)];
    usedToppingsRef.current.add(topping);

    // Pick unused not-topping
    const availableNots = notToppings.filter(t => !usedNotToppingsRef.current.has(t));
    if (availableNots.length === 0) usedNotToppingsRef.current.clear();
    const notPool = availableNots.length > 0 ? availableNots : notToppings;
    notTopping = notPool[Math.floor(Math.random() * notPool.length)];
    usedNotToppingsRef.current.add(notTopping);

    const toppingOnLeft = Math.random() > 0.5;

    return { topping, notTopping, toppingOnLeft };
  }, []);

  // Show next pair
  const showNextPair = useCallback(() => {
    clearTimeout(pairTimerRef.current);
    const pair = generatePair();
    setCurrentPair(pair);
    setFeedbackState(null);
    setPairsShown(p => p + 1);

    // Auto-expire
    pairTimerRef.current = setTimeout(() => {
      setFeedbackState("timeout");
      setStreak(0);
      feedbackTimerRef.current = setTimeout(() => {
        showNextPair();
      }, 600);
    }, DISPLAY_TIME);
  }, [generatePair]);

  // Add particles
  const addParticles = useCallback((x, y, type) => {
    const emojis = type === "correct"
      ? ["🥞", "✨", "🍯", "💫", "⭐"]
      : ["💨", "😬", "❌"];
    const count = type === "correct" ? 8 : 4;
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x: x + (Math.random() - 0.5) * 80,
        y: y + (Math.random() - 0.5) * 40,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        dx: (Math.random() - 0.5) * 100,
        dy: -30 - Math.random() * 70,
        scale: 0.5 + Math.random() * 0.7,
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);
  }, []);

  // Handle choice
  const handleChoice = useCallback((choseLeft, e) => {
    if (gameState !== "playing" || !currentPair || feedbackState) return;

    clearTimeout(pairTimerRef.current);

    const isCorrect = choseLeft === currentPair.toppingOnLeft;
    const rect = e.currentTarget.getBoundingClientRect();

    setTotalAnswered(t => t + 1);

    if (isCorrect) {
      const newStreak = streak + 1;
      const bonus = Math.min(newStreak, 5);
      setScore(s => s + bonus);
      setStreak(newStreak);
      setBestStreak(prev => Math.max(prev, newStreak));
      setFeedbackState("correct");
      addParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, "correct");
    } else {
      setWrong(w => w + 1);
      setStreak(0);
      setFeedbackState("wrong");
      addParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, "wrong");
    }

    feedbackTimerRef.current = setTimeout(() => {
      showNextPair();
    }, 500);
  }, [gameState, currentPair, feedbackState, streak, addParticles, showNextPair]);

  // Start game
  const startGame = useCallback(() => {
    setGameState("countdown");
    setCountdownNum(3);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setWrong(0);
    setTotalAnswered(0);
    setPairsShown(0);
    setTimeLeft(GAME_DURATION);
    setCurrentPair(null);
    setFeedbackState(null);
    setParticles([]);
    setShowShareModal(false);
    setShareCopied(false);
    usedToppingsRef.current.clear();
    usedNotToppingsRef.current.clear();

    let count = 3;
    const countInterval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdownNum(count);
      } else {
        clearInterval(countInterval);
        setCountdownNum(0);
        setGameState("playing");

        setTimeout(() => showNextPair(), 300);

        let remaining = GAME_DURATION;
        gameTimerRef.current = setInterval(() => {
          remaining--;
          setTimeLeft(remaining);
          if (remaining <= 0) {
            clearInterval(gameTimerRef.current);
            clearTimeout(pairTimerRef.current);
            clearTimeout(feedbackTimerRef.current);
            setGameState("finished");
            setToppingFact(toppingFacts[Math.floor(Math.random() * toppingFacts.length)]);
          }
        }, 1000);
      }
    }, 800);
  }, [showNextPair]);

  // Cleanup
  useEffect(() => {
    return () => {
      clearInterval(gameTimerRef.current);
      clearTimeout(pairTimerRef.current);
      clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  // Get rating
  const getRating = () => {
    if (score >= 50) return { title: "Topping Titan!", emoji: "👑", color: "#e8a040" };
    if (score >= 35) return { title: "Syrup Savant!", emoji: "🍯", color: "#d4943a" };
    if (score >= 20) return { title: "Berry Sharp!", emoji: "🍓", color: "#c48060" };
    return { title: "Batter Up!", emoji: "🥞", color: "#b89070" };
  };

  // Share
  const handleShare = () => {
    const rating = getRating();
    const accuracy = totalAnswered > 0 ? Math.round((totalAnswered - wrong) / totalAnswered * 100) : 0;
    const shareText = `🥞 Letter Griddle: Top That! 🥞\n${rating.emoji} ${rating.title}\nScore: ${score} pts | ${accuracy}% accuracy | x${bestStreak} streak\nPlay at www.lettergriddle.com/topthat\n\nMore from the Letter Griddle Family:\n🥞 lettergriddle.com`;
    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const timerColor = timeLeft <= 5 ? "rgba(255,80,60,0.9)" : timeLeft <= 10 ? "rgba(255,160,80,0.9)" : "rgba(220,180,140,0.7)";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 40% 25%, #352418 0%, #261810 40%, #180e08 75%, #100a04 100%)",
        fontFamily: "'Georgia', 'Palatino Linotype', serif",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Ambient background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(220,160,80,0.06) 0%, transparent 70%)",
          top: "8%", left: "15%", animation: "floatOrb1 14s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,140,60,0.05) 0%, transparent 70%)",
          bottom: "15%", right: "10%", animation: "floatOrb2 17s ease-in-out infinite",
        }} />
      </div>

      <style>{`
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -15px) scale(1.08); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-18px, 12px) scale(1.1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes countdownPop {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes cardEnter {
          from { opacity: 0; transform: scale(0.85) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes correctFlash {
          0% { box-shadow: 0 0 0 rgba(100,200,100,0); border-color: rgba(100,200,100,0.7); }
          50% { box-shadow: 0 0 25px rgba(100,200,100,0.3); }
          100% { box-shadow: 0 0 0 rgba(100,200,100,0); }
        }
        @keyframes wrongShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes timeoutFade {
          0% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        @keyframes particleFly {
          0% { opacity: 1; transform: translate(0, 0) scale(var(--s)); }
          100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.2); }
        }
        @keyframes urgentPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes subtleBreathe {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.75; }
        }
        @keyframes streakPop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes timerBarPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes vsGlow {
          0%, 100% { text-shadow: 0 0 8px rgba(220,160,80,0.2); }
          50% { text-shadow: 0 0 16px rgba(220,160,80,0.4); }
        }
      `}</style>

      {/* Particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: "fixed", left: p.x, top: p.y, fontSize: 18, pointerEvents: "none", zIndex: 100,
          "--dx": `${p.dx}px`, "--dy": `${p.dy}px`, "--s": p.scale,
          animation: "particleFly 1s ease-out forwards",
        }}>{p.emoji}</div>
      ))}

      {/* Main content */}
      <div style={{
        maxWidth: 520, margin: "0 auto", padding: "16px 16px",
        position: "relative", zIndex: 1, minHeight: "100vh",
        display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{
            fontSize: 12, letterSpacing: 4, color: "rgba(220,170,110,0.4)",
            textTransform: "uppercase", marginBottom: 6,
          }}>Letter Griddle</div>
          <h1 style={{
            fontSize: 36, fontWeight: 700, color: "rgba(230,185,120,0.9)",
            margin: 0, textShadow: "0 0 20px rgba(220,160,80,0.15), 0 2px 4px rgba(0,0,0,0.3)",
            letterSpacing: 2,
          }}>Top That!</h1>
          <div style={{
            width: 50, height: 2, margin: "8px auto 0",
            background: "linear-gradient(90deg, transparent, rgba(220,160,80,0.35), transparent)",
          }} />
        </div>

        {/* IDLE */}
        {gameState === "idle" && (
          <div style={{
            textAlign: "center", animation: "fadeInUp 0.8s ease-out",
            flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <div style={{
              fontSize: 72, marginBottom: 20,
              filter: "drop-shadow(0 0 15px rgba(220,160,80,0.2))",
              animation: "subtleBreathe 2.5s ease-in-out infinite",
            }}>🥞</div>
            <p style={{
              color: "rgba(220,175,120,0.6)", fontSize: 16, lineHeight: 1.8,
              maxWidth: 340, margin: "0 auto 28px",
            }}>
              Two items appear. Only one is a pancake topping.
              <br />Tap the right one before time runs out!
              <br />
              <span style={{ opacity: 0.6, fontSize: 14 }}>
                Quick decisions, {GAME_DURATION} seconds on the clock.
              </span>
            </p>

            <button onClick={startGame} style={{
              background: "linear-gradient(135deg, rgba(220,160,80,0.25) 0%, rgba(200,130,50,0.18) 100%)",
              border: "1px solid rgba(220,170,100,0.3)", color: "rgba(235,200,140,0.95)",
              padding: "14px 48px", borderRadius: 40, fontSize: 18,
              fontFamily: "inherit", cursor: "pointer", transition: "all 0.3s ease",
              boxShadow: "0 0 20px rgba(220,150,60,0.1)",
            }}
              onMouseEnter={e => { e.target.style.boxShadow = "0 0 30px rgba(220,150,60,0.2)"; e.target.style.background = "linear-gradient(135deg, rgba(220,160,80,0.35) 0%, rgba(200,130,50,0.28) 100%)"; }}
              onMouseLeave={e => { e.target.style.boxShadow = "0 0 20px rgba(220,150,60,0.1)"; e.target.style.background = "linear-gradient(135deg, rgba(220,160,80,0.25) 0%, rgba(200,130,50,0.18) 100%)"; }}
            >🥞 Start Topping</button>

            <button onClick={() => setShowHowToPlay(true)} style={{
              background: "transparent", border: "none", color: "rgba(220,170,110,0.4)",
              padding: "10px 24px", fontSize: 14, fontFamily: "inherit",
              cursor: "pointer", transition: "color 0.3s ease", marginTop: 12,
            }}
              onMouseEnter={e => { e.target.style.color = "rgba(220,170,110,0.7)"; }}
              onMouseLeave={e => { e.target.style.color = "rgba(220,170,110,0.4)"; }}
            >❓ How to Play</button>
          </div>
        )}

        {/* COUNTDOWN */}
        {gameState === "countdown" && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div key={countdownNum} style={{
              fontSize: 100, fontWeight: 700, color: "rgba(230,185,120,0.9)",
              textShadow: "0 0 40px rgba(220,160,80,0.3)", animation: "countdownPop 0.7s ease-out",
            }}>{countdownNum > 0 ? countdownNum : "🥞"}</div>
          </div>
        )}

        {/* PLAYING */}
        {gameState === "playing" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* HUD */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, padding: "0 4px" }}>
              <div>
                <div style={{ color: "rgba(220,170,110,0.4)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>SCORE</div>
                <div style={{ color: "rgba(230,200,140,0.9)", fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{score}</div>
              </div>
              {streak > 1 && (
                <div key={streak} style={{ animation: "streakPop 0.3s ease-out", textAlign: "center" }}>
                  <div style={{
                    color: streak >= 5 ? "rgba(255,180,60,0.95)" : "rgba(220,175,110,0.8)",
                    fontSize: streak >= 5 ? 22 : 18, fontWeight: 700,
                    textShadow: streak >= 5 ? "0 0 12px rgba(255,180,60,0.3)" : "none",
                  }}>x{streak} streak!</div>
                </div>
              )}
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "rgba(220,170,110,0.4)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>TIME</div>
                <div style={{
                  color: timerColor, fontSize: 28, fontWeight: 700, lineHeight: 1,
                  animation: timeLeft <= 5 ? "urgentPulse 0.5s ease-in-out infinite" : "none",
                }}>{timeLeft}s</div>
              </div>
            </div>

            {/* Timer bar */}
            <div style={{ height: 3, borderRadius: 2, background: "rgba(220,160,80,0.08)", marginBottom: 20, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${(timeLeft / GAME_DURATION) * 100}%`, borderRadius: 2,
                background: timeLeft <= 5 ? "linear-gradient(90deg, rgba(255,80,40,0.7), rgba(255,120,60,0.5))" :
                  timeLeft <= 10 ? "linear-gradient(90deg, rgba(220,160,60,0.6), rgba(220,180,80,0.4))" :
                  "linear-gradient(90deg, rgba(220,160,80,0.4), rgba(220,180,100,0.3))",
                transition: "width 1s linear",
                animation: timeLeft <= 5 ? "timerBarPulse 0.5s ease-in-out infinite" : "none",
              }} />
            </div>

            {/* Choice cards */}
            {currentPair && (
              <div style={{
                flex: 1, display: "flex", flexDirection: "column",
                justifyContent: "center", gap: 16, padding: "0 8px",
              }}>
                {/* VS label */}
                <div style={{
                  textAlign: "center", color: "rgba(220,170,110,0.3)",
                  fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: -8,
                }}>Which one tops a pancake?</div>

                <div style={{ display: "flex", gap: 14, alignItems: "stretch" }}>
                  {/* Left card */}
                  {(() => {
                    const leftText = currentPair.toppingOnLeft ? currentPair.topping : currentPair.notTopping;
                    const leftIsCorrect = currentPair.toppingOnLeft;
                    const showCorrect = feedbackState === "correct" && leftIsCorrect;
                    const showWrong = feedbackState === "wrong" && !leftIsCorrect;
                    const showMissed = feedbackState === "timeout" && leftIsCorrect;

                    return (
                      <button
                        onClick={(e) => handleChoice(true, e)}
                        disabled={!!feedbackState}
                        style={{
                          flex: 1, padding: "28px 16px", borderRadius: 18,
                          background: showCorrect || showMissed
                            ? "linear-gradient(135deg, rgba(100,200,100,0.15), rgba(80,180,80,0.08))"
                            : showWrong
                            ? "linear-gradient(135deg, rgba(255,80,60,0.12), rgba(220,60,40,0.06))"
                            : "linear-gradient(135deg, rgba(220,170,100,0.08) 0%, rgba(200,150,80,0.04) 100%)",
                          border: showCorrect || showMissed
                            ? "2px solid rgba(100,200,100,0.5)"
                            : showWrong
                            ? "2px solid rgba(255,80,60,0.4)"
                            : "1px solid rgba(220,170,100,0.15)",
                          cursor: feedbackState ? "default" : "pointer",
                          fontFamily: "inherit", fontSize: 20, fontWeight: 700,
                          color: showCorrect || showMissed ? "rgba(140,220,140,0.9)" : showWrong ? "rgba(255,120,100,0.8)" : "rgba(230,195,140,0.85)",
                          transition: "all 0.15s ease",
                          animation: showCorrect ? "correctFlash 0.5s ease-out" : showWrong ? "wrongShake 0.4s ease-out" : feedbackState === "timeout" && !leftIsCorrect ? "timeoutFade 0.4s forwards" : currentPair ? "cardEnter 0.3s ease-out" : "none",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          minHeight: 100, textAlign: "center", lineHeight: 1.3,
                          boxShadow: showCorrect ? "0 0 20px rgba(100,200,100,0.15)" : "none",
                        }}
                        onMouseEnter={e => { if (!feedbackState) e.target.style.background = "linear-gradient(135deg, rgba(220,170,100,0.15) 0%, rgba(200,150,80,0.08) 100%)"; e.target.style.borderColor = "rgba(220,170,100,0.3)"; }}
                        onMouseLeave={e => { if (!feedbackState) e.target.style.background = "linear-gradient(135deg, rgba(220,170,100,0.08) 0%, rgba(200,150,80,0.04) 100%)"; e.target.style.borderColor = "rgba(220,170,100,0.15)"; }}
                      >
                        {leftText}
                      </button>
                    );
                  })()}

                  {/* VS divider */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, width: 36,
                  }}>
                    <div style={{
                      color: "rgba(220,170,110,0.35)", fontSize: 14, fontWeight: 700,
                      letterSpacing: 1, animation: "vsGlow 3s ease-in-out infinite",
                    }}>VS</div>
                  </div>

                  {/* Right card */}
                  {(() => {
                    const rightText = currentPair.toppingOnLeft ? currentPair.notTopping : currentPair.topping;
                    const rightIsCorrect = !currentPair.toppingOnLeft;
                    const showCorrect = feedbackState === "correct" && rightIsCorrect;
                    const showWrong = feedbackState === "wrong" && !rightIsCorrect;
                    const showMissed = feedbackState === "timeout" && rightIsCorrect;

                    return (
                      <button
                        onClick={(e) => handleChoice(false, e)}
                        disabled={!!feedbackState}
                        style={{
                          flex: 1, padding: "28px 16px", borderRadius: 18,
                          background: showCorrect || showMissed
                            ? "linear-gradient(135deg, rgba(100,200,100,0.15), rgba(80,180,80,0.08))"
                            : showWrong
                            ? "linear-gradient(135deg, rgba(255,80,60,0.12), rgba(220,60,40,0.06))"
                            : "linear-gradient(135deg, rgba(220,170,100,0.08) 0%, rgba(200,150,80,0.04) 100%)",
                          border: showCorrect || showMissed
                            ? "2px solid rgba(100,200,100,0.5)"
                            : showWrong
                            ? "2px solid rgba(255,80,60,0.4)"
                            : "1px solid rgba(220,170,100,0.15)",
                          cursor: feedbackState ? "default" : "pointer",
                          fontFamily: "inherit", fontSize: 20, fontWeight: 700,
                          color: showCorrect || showMissed ? "rgba(140,220,140,0.9)" : showWrong ? "rgba(255,120,100,0.8)" : "rgba(230,195,140,0.85)",
                          transition: "all 0.15s ease",
                          animation: showCorrect ? "correctFlash 0.5s ease-out" : showWrong ? "wrongShake 0.4s ease-out" : feedbackState === "timeout" && !rightIsCorrect ? "timeoutFade 0.4s forwards" : currentPair ? "cardEnter 0.3s ease-out 0.05s both" : "none",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          minHeight: 100, textAlign: "center", lineHeight: 1.3,
                          boxShadow: showCorrect ? "0 0 20px rgba(100,200,100,0.15)" : "none",
                        }}
                        onMouseEnter={e => { if (!feedbackState) e.target.style.background = "linear-gradient(135deg, rgba(220,170,100,0.15) 0%, rgba(200,150,80,0.08) 100%)"; e.target.style.borderColor = "rgba(220,170,100,0.3)"; }}
                        onMouseLeave={e => { if (!feedbackState) e.target.style.background = "linear-gradient(135deg, rgba(220,170,100,0.08) 0%, rgba(200,150,80,0.04) 100%)"; e.target.style.borderColor = "rgba(220,170,100,0.15)"; }}
                      >
                        {rightText}
                      </button>
                    );
                  })()}
                </div>

                {/* Feedback text */}
                <div style={{ textAlign: "center", height: 24, marginTop: 4 }}>
                  {feedbackState === "correct" && (
                    <span style={{ color: "rgba(140,220,140,0.8)", fontSize: 14, fontWeight: 700 }}>
                      ✨ That tops it!
                    </span>
                  )}
                  {feedbackState === "wrong" && (
                    <span style={{ color: "rgba(255,120,100,0.7)", fontSize: 14 }}>
                      Not a topping!
                    </span>
                  )}
                  {feedbackState === "timeout" && (
                    <span style={{ color: "rgba(220,170,110,0.4)", fontSize: 14 }}>
                      Too slow!
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Bottom hint */}
            <p style={{ textAlign: "center", color: "rgba(220,170,110,0.25)", fontSize: 12, marginTop: 8 }}>
              Tap the pancake topping!
            </p>
          </div>
        )}

        {/* FINISHED */}
        {gameState === "finished" && (
          <div style={{ textAlign: "center", animation: "fadeInUp 0.8s ease-out", flex: 1 }}>
            {(() => {
              const rating = getRating();
              const accuracy = totalAnswered > 0 ? Math.round((totalAnswered - wrong) / totalAnswered * 100) : 0;
              return (
                <>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 56, marginBottom: 8, filter: `drop-shadow(0 0 15px ${rating.color}40)` }}>{rating.emoji}</div>
                    <h2 style={{ fontSize: 28, color: rating.color, margin: 0, textShadow: `0 0 20px ${rating.color}30` }}>{rating.title}</h2>
                  </div>

                  {/* Score card */}
                  <div style={{
                    background: "linear-gradient(135deg, rgba(220,170,100,0.08) 0%, rgba(200,150,80,0.04) 100%)",
                    border: "1px solid rgba(220,170,100,0.12)", borderRadius: 20,
                    padding: "24px 20px", marginBottom: 20,
                  }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                      <div>
                        <div style={{ color: "rgba(230,200,140,0.9)", fontSize: 30, fontWeight: 700 }}>{score}</div>
                        <div style={{ color: "rgba(220,170,110,0.4)", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>Points</div>
                      </div>
                      <div>
                        <div style={{ color: "rgba(230,200,140,0.9)", fontSize: 30, fontWeight: 700 }}>{accuracy}%</div>
                        <div style={{ color: "rgba(220,170,110,0.4)", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>Accuracy</div>
                      </div>
                      <div>
                        <div style={{ color: "rgba(230,200,140,0.9)", fontSize: 30, fontWeight: 700 }}>x{bestStreak}</div>
                        <div style={{ color: "rgba(220,170,110,0.4)", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>Best Streak</div>
                      </div>
                    </div>
                  </div>

                  {/* Fun fact */}
                  <div style={{
                    background: "rgba(220,170,100,0.04)", border: "1px solid rgba(220,170,100,0.08)",
                    borderRadius: 14, padding: "14px 18px", marginBottom: 24,
                  }}>
                    <p style={{ color: "rgba(220,170,110,0.35)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>🥞 Topping Trivia</p>
                    <p style={{ color: "rgba(220,185,130,0.65)", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{toppingFact}</p>
                  </div>

                  {/* Buttons */}
                  <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
                    <button onClick={() => setShowShareModal(true)} style={{
                      background: "linear-gradient(135deg, rgba(220,160,80,0.25) 0%, rgba(200,130,50,0.18) 100%)",
                      border: "1px solid rgba(220,170,100,0.3)", color: "rgba(235,200,140,0.95)",
                      padding: "10px 28px", borderRadius: 30, fontSize: 14, fontFamily: "inherit",
                      cursor: "pointer", transition: "all 0.3s ease", boxShadow: "0 0 15px rgba(220,150,60,0.08)",
                    }}
                      onMouseEnter={e => { e.target.style.boxShadow = "0 0 25px rgba(220,150,60,0.18)"; }}
                      onMouseLeave={e => { e.target.style.boxShadow = "0 0 15px rgba(220,150,60,0.08)"; }}
                    >🥞 Share Results</button>
                    <button onClick={startGame} style={{
                      background: "transparent", border: "1px solid rgba(220,170,100,0.18)",
                      color: "rgba(220,170,110,0.45)", padding: "10px 28px", borderRadius: 30,
                      fontSize: 14, fontFamily: "inherit", cursor: "pointer", transition: "all 0.3s ease",
                    }}
                      onMouseEnter={e => { e.target.style.borderColor = "rgba(220,170,100,0.35)"; e.target.style.color = "rgba(220,170,110,0.75)"; }}
                      onMouseLeave={e => { e.target.style.borderColor = "rgba(220,170,100,0.18)"; e.target.style.color = "rgba(220,170,110,0.45)"; }}
                    >Top Again</button>
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <p style={{ color: "rgba(220,170,110,0.2)", fontSize: 12 }}>
                      A tasty moment from the <span style={{ color: "rgba(220,170,110,0.4)" }}>Letter Griddle Family</span>
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 6, fontSize: 11 }}>
                      <a href="/" style={{ color: "rgba(220,170,110,0.25)", textDecoration: "none", transition: "color 0.3s ease" }} onMouseEnter={(e) => { e.target.style.color = "rgba(220,170,110,0.55)"; }} onMouseLeave={(e) => { e.target.style.color = "rgba(220,170,110,0.25)"; }}>🥞 More Games at lettergriddle.com</a>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 32, paddingBottom: 16 }}>
          <p style={{ color: "rgba(220,170,110,0.12)", fontSize: 10 }}>
            © {new Date().getFullYear()} Letter Griddle. All rights reserved.
            {" | "}
            <a href="/privacy" style={{ color: "rgba(220,170,110,0.18)", textDecoration: "underline", textUnderlineOffset: 2 }}>Privacy Policy</a>
            {" | "}
            <a href="/terms" style={{ color: "rgba(220,170,110,0.18)", textDecoration: "underline", textUnderlineOffset: 2 }}>Terms of Service</a>
          </p>
        </div>
      </div>

      {/* How to Play Modal */}
      {showHowToPlay && (
        <div onClick={() => setShowHowToPlay(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 200, padding: 16, backdropFilter: "blur(4px)",
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "linear-gradient(145deg, #2a1a10, #180e06)",
            border: "1px solid rgba(220,170,100,0.18)", borderRadius: 24,
            padding: "28px 24px", maxWidth: 420, width: "100%", position: "relative",
            boxShadow: "0 0 40px rgba(220,150,60,0.08)", animation: "fadeInUp 0.4s ease-out",
            maxHeight: "85vh", overflowY: "auto",
          }}>
            <button onClick={() => setShowHowToPlay(false)} style={{
              position: "absolute", top: 14, right: 14, background: "none",
              border: "none", color: "rgba(220,170,110,0.4)", fontSize: 20,
              cursor: "pointer", padding: 4, lineHeight: 1,
            }}>✕</button>

            <h2 style={{ textAlign: "center", color: "rgba(230,190,120,0.9)", fontSize: 24, marginBottom: 24 }}>How to Play 🥞</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "👀", title: "Two Items Appear", desc: "You'll see two items side by side. One is a real pancake topping, the other is not!" },
                { icon: "👆", title: "Tap the Topping", desc: "Quickly tap the item that belongs on a pancake. Is it maple syrup or mustard? You decide!" },
                { icon: "⚡", title: "Build Your Streak", desc: "Consecutive correct answers build a streak multiplier, up to x5 points! One wrong answer resets it." },
                { icon: "⏱️", title: `Beat the Clock`, desc: `You have ${GAME_DURATION} seconds. If you don't choose in time, the pair disappears and your streak resets.` },
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(220,160,80,0.12)", border: "1px solid rgba(220,170,100,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0,
                  }}>{step.icon}</div>
                  <div>
                    <p style={{ color: "rgba(230,200,140,0.9)", fontSize: 15, fontWeight: 700, margin: "0 0 4px 0" }}>{step.title}</p>
                    <p style={{ color: "rgba(220,175,120,0.5)", fontSize: 13, margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ratings */}
            <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid rgba(220,170,100,0.08)" }}>
              <p style={{ color: "rgba(220,170,110,0.35)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 12 }}>Topping Ratings</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { emoji: "🥞", title: "Batter Up!", range: "0–19" },
                  { emoji: "🍓", title: "Berry Sharp!", range: "20–34" },
                  { emoji: "🍯", title: "Syrup Savant!", range: "35–49" },
                  { emoji: "👑", title: "Topping Titan!", range: "50+" },
                ].map((r, i) => (
                  <div key={i} style={{
                    background: "rgba(220,160,80,0.05)", border: "1px solid rgba(220,170,100,0.06)",
                    borderRadius: 10, padding: "8px 10px", display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <span style={{ fontSize: 20 }}>{r.emoji}</span>
                    <div>
                      <div style={{ color: "rgba(230,200,140,0.75)", fontSize: 12, fontWeight: 700 }}>{r.title}</div>
                      <div style={{ color: "rgba(220,170,110,0.35)", fontSize: 10 }}>{r.range} pts</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setShowHowToPlay(false)} style={{
              display: "block", margin: "22px auto 0",
              background: "linear-gradient(135deg, rgba(220,160,80,0.25) 0%, rgba(200,130,50,0.18) 100%)",
              border: "1px solid rgba(220,170,100,0.3)", color: "rgba(235,200,140,0.95)",
              padding: "10px 40px", borderRadius: 30, fontSize: 15, fontFamily: "inherit",
              cursor: "pointer", transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.target.style.boxShadow = "0 0 20px rgba(220,150,60,0.15)"; }}
              onMouseLeave={e => { e.target.style.boxShadow = "none"; }}
            >Let's Top It! 🥞</button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div onClick={() => setShowShareModal(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 200, padding: 16, backdropFilter: "blur(4px)",
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "linear-gradient(145deg, #2a1a10, #180e06)",
            border: "1px solid rgba(220,170,100,0.18)", borderRadius: 24,
            padding: 32, maxWidth: 420, width: "100%", position: "relative",
            boxShadow: "0 0 40px rgba(220,150,60,0.08)", animation: "fadeInUp 0.4s ease-out",
          }}>
            <button onClick={() => setShowShareModal(false)} style={{
              position: "absolute", top: 16, right: 16, background: "none",
              border: "none", color: "rgba(220,170,110,0.4)", fontSize: 20,
              cursor: "pointer", padding: 4, lineHeight: 1,
            }}>✕</button>

            <h2 style={{ textAlign: "center", color: "rgba(230,190,120,0.9)", fontSize: 24, marginBottom: 20 }}>Share Your Score 🥞</h2>

            <div style={{
              background: "rgba(220,170,100,0.05)", border: "1px solid rgba(220,170,100,0.1)",
              borderRadius: 16, padding: 20, marginBottom: 20, fontFamily: "monospace",
              fontSize: 13, lineHeight: 1.7, color: "rgba(220,185,130,0.65)", whiteSpace: "pre-wrap",
            }}>
              {(() => {
                const rating = getRating();
                const accuracy = totalAnswered > 0 ? Math.round((totalAnswered - wrong) / totalAnswered * 100) : 0;
                return `🥞 Letter Griddle: Top That! 🥞\n${rating.emoji} ${rating.title}\nScore: ${score} pts | ${accuracy}% accuracy | x${bestStreak} streak\nPlay at www.lettergriddle.com/topthat\n\nMore from the Letter Griddle Family:\n🥞 lettergriddle.com`;
              })()}
            </div>

            <button onClick={handleShare} style={{
              width: "100%",
              background: shareCopied ? "linear-gradient(135deg, rgba(76,175,80,0.3), rgba(56,142,60,0.25))" : "linear-gradient(135deg, rgba(220,160,80,0.25) 0%, rgba(200,130,50,0.18) 100%)",
              border: shareCopied ? "1px solid rgba(76,175,80,0.4)" : "1px solid rgba(220,170,100,0.3)",
              color: shareCopied ? "rgba(200,255,200,0.9)" : "rgba(235,200,140,0.95)",
              padding: "14px 24px", borderRadius: 30, fontSize: 16, fontFamily: "inherit",
              cursor: "pointer", transition: "all 0.3s ease",
            }}>{shareCopied ? "✓ Copied!" : "Copy to Clipboard"}</button>

            <p style={{ textAlign: "center", color: "rgba(220,170,110,0.28)", fontSize: 12, marginTop: 16 }}>
              Challenge a friend. Can they top that? 🥞
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
