import { useState, useEffect, useCallback, useRef } from "react";

const GAME_DURATION = 30;
const DISPLAY_TIME = 3000;

// Coffee-related items (correct answers)
const coffeeItems = [
  "Espresso", "Cappuccino", "Latte", "Americano", "Mocha",
  "Cold Brew", "French Press", "Pour Over", "Macchiato", "Flat White",
  "Cortado", "Ristretto", "Affogato", "Red Eye", "Drip Coffee",
  "Coffee Bean", "Barista", "Crema", "Portafilter", "Tamper",
  "Coffee Grinder", "Frother", "Demitasse", "Café au Lait", "Turkish Coffee",
  "Irish Coffee", "Lungo", "Doppio", "Coffee Filter", "Moka Pot",
  "Chemex", "AeroPress", "Percolator", "Siphon Brew", "Café Breve",
  "Coffee Roast", "Arabica", "Robusta", "Nitro Cold Brew", "Vienna Coffee",
];

// NOT coffee-related (wrong answers)
const notCoffeeItems = [
  "Bowling Ball", "Spatula", "Trampoline", "Doorknob", "Kazoo",
  "Yo-Yo", "Stapler", "Flip Flop", "Canoe", "Xylophone",
  "Toenail Clipper", "Hubcap", "Lint Roller", "Pool Noodle", "Oven Mitt",
  "Traffic Cone", "Plunger", "Flyswatter", "Soap Dish", "Shoelace",
  "Colander", "Compass", "Clipboard", "Thimble", "Megaphone",
  "Pendulum", "Pogo Stick", "Telescope", "Harmonica", "Sundial",
  "Wheelbarrow", "Corkboard", "Velcro", "Hammock", "Birdbath",
  "Treadmill", "Mailbox", "Fire Hydrant", "Wind Chime", "Toboggan",
];

// Coffee fun facts
const coffeeFacts = [
  "Coffee is the second most traded commodity in the world, right after crude oil!",
  "The word 'espresso' means 'pressed out' in Italian, referring to the brewing method.",
  "Finland consumes the most coffee per capita, about 12 kg per person per year!",
  "A goat herder in Ethiopia discovered coffee around 850 AD when his goats got energetic after eating the berries.",
  "It takes about 70 coffee beans to make one cup of coffee.",
  "Coffee was originally eaten, not drunk. African tribes mixed coffee berries with fat to create energy balls.",
  "Beethoven was so particular about his coffee that he counted exactly 60 beans per cup.",
  "The world's most expensive coffee, Kopi Luwak, is made from beans eaten and excreted by civets.",
  "Decaf coffee is not 100% caffeine-free. It still contains about 2-15 mg per cup.",
  "The first webcam was invented at Cambridge to monitor a coffee pot so researchers wouldn't walk to an empty pot.",
  "Brazil produces about one-third of the world's coffee supply.",
  "A 'flat white' originated in Australia and New Zealand in the 1980s.",
  "Cold brew coffee has about 67% less acidity than hot brewed coffee.",
  "The crema on an espresso should be a rich golden-brown color and about 2mm thick.",
  "Coffee plants can live up to 100 years, but produce the most fruit between ages 7 and 20.",
  "Teddy Roosevelt reportedly drank a gallon of coffee a day!",
];

export default function LetterGriddleLattes() {
  const [gameState, setGameState] = useState("idle");
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [currentPair, setCurrentPair] = useState(null);
  const [countdownNum, setCountdownNum] = useState(3);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [coffeeFact, setCoffeeFact] = useState("");
  const [feedbackState, setFeedbackState] = useState(null);
  const [particles, setParticles] = useState([]);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [steamParticles, setSteamParticles] = useState([]);

  const gameTimerRef = useRef(null);
  const pairTimerRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  const particleIdRef = useRef(0);
  const steamIntervalRef = useRef(null);
  const usedCoffeeRef = useRef(new Set());
  const usedNotCoffeeRef = useRef(new Set());

  // Steam effect during gameplay
  useEffect(() => {
    if (gameState === "playing") {
      steamIntervalRef.current = setInterval(() => {
        const id = particleIdRef.current++;
        const steam = {
          id,
          x: 20 + Math.random() * 60,
          delay: Math.random() * 0.5,
          size: 8 + Math.random() * 14,
          duration: 3 + Math.random() * 2,
        };
        setSteamParticles(prev => [...prev, steam]);
        setTimeout(() => {
          setSteamParticles(prev => prev.filter(s => s.id !== id));
        }, (steam.duration + steam.delay) * 1000);
      }, 800);
    } else {
      clearInterval(steamIntervalRef.current);
      setSteamParticles([]);
    }
    return () => clearInterval(steamIntervalRef.current);
  }, [gameState]);

  const generatePair = useCallback(() => {
    const availableCoffee = coffeeItems.filter(t => !usedCoffeeRef.current.has(t));
    if (availableCoffee.length === 0) usedCoffeeRef.current.clear();
    const coffeePool = availableCoffee.length > 0 ? availableCoffee : coffeeItems;
    const coffee = coffeePool[Math.floor(Math.random() * coffeePool.length)];
    usedCoffeeRef.current.add(coffee);

    const availableNots = notCoffeeItems.filter(t => !usedNotCoffeeRef.current.has(t));
    if (availableNots.length === 0) usedNotCoffeeRef.current.clear();
    const notPool = availableNots.length > 0 ? availableNots : notCoffeeItems;
    const notCoffee = notPool[Math.floor(Math.random() * notPool.length)];
    usedNotCoffeeRef.current.add(notCoffee);

    return { coffee, notCoffee, coffeeOnLeft: Math.random() > 0.5 };
  }, []);

  const showNextPair = useCallback(() => {
    clearTimeout(pairTimerRef.current);
    const pair = generatePair();
    setCurrentPair(pair);
    setFeedbackState(null);

    pairTimerRef.current = setTimeout(() => {
      setFeedbackState("timeout");
      setStreak(0);
      feedbackTimerRef.current = setTimeout(() => {
        showNextPair();
      }, 600);
    }, DISPLAY_TIME);
  }, [generatePair]);

  const addParticles = useCallback((x, y, type) => {
    const emojis = type === "correct"
      ? ["☕", "✨", "💫", "⭐", "🫘"]
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

  const handleChoice = useCallback((choseLeft, e) => {
    if (gameState !== "playing" || !currentPair || feedbackState) return;
    clearTimeout(pairTimerRef.current);
    const rect = e.currentTarget.getBoundingClientRect();
    const isCorrect = choseLeft === currentPair.coffeeOnLeft;
    setTotalAnswered(t => t + 1);

    if (isCorrect) {
      const newStreak = streak + 1;
      setScore(s => s + Math.min(newStreak, 5));
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

    feedbackTimerRef.current = setTimeout(() => showNextPair(), 500);
  }, [gameState, currentPair, feedbackState, streak, addParticles, showNextPair]);

  const startGame = useCallback(() => {
    setGameState("countdown");
    setCountdownNum(3);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setWrong(0);
    setTotalAnswered(0);
    setTimeLeft(GAME_DURATION);
    setCurrentPair(null);
    setFeedbackState(null);
    setParticles([]);
    setShowShareModal(false);
    setShareCopied(false);
    usedCoffeeRef.current.clear();
    usedNotCoffeeRef.current.clear();

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
            setCoffeeFact(coffeeFacts[Math.floor(Math.random() * coffeeFacts.length)]);
          }
        }, 1000);
      }
    }, 800);
  }, [showNextPair]);

  useEffect(() => {
    return () => {
      clearInterval(gameTimerRef.current);
      clearTimeout(pairTimerRef.current);
      clearTimeout(feedbackTimerRef.current);
      clearInterval(steamIntervalRef.current);
    };
  }, []);

  const getRating = () => {
    if (score >= 50) return { title: "Master Barista!", emoji: "👑", color: "#c4956a" };
    if (score >= 35) return { title: "Latte Artist!", emoji: "☕", color: "#b08060" };
    if (score >= 20) return { title: "Bean Counter!", emoji: "🫘", color: "#9a7560" };
    return { title: "Decaf Dreamer!", emoji: "😴", color: "#8a7060" };
  };

  const handleShare = () => {
    const rating = getRating();
    const accuracy = totalAnswered > 0 ? Math.round((totalAnswered - wrong) / totalAnswered * 100) : 0;
    const shareText = `☕ Letter Griddle: Lattes ☕\n${rating.emoji} ${rating.title}\nScore: ${score} pts | ${accuracy}% accuracy | x${bestStreak} streak\nPlay at www.lettergriddle.com/lattes\n\nMore from the Letter Griddle Family:\n🥞 lettergriddle.com`;
    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const timerColor = timeLeft <= 5 ? "rgba(200,90,70,0.9)" : timeLeft <= 10 ? "rgba(190,140,90,0.9)" : "rgba(180,155,130,0.7)";

  // Earthy coffee palette helpers
  const c = {
    text: "rgba(200,175,145,",       // warm cream text
    accent: "rgba(180,140,95,",       // warm coffee accent
    bg: "rgba(160,125,85,",           // card backgrounds
    glow: "rgba(190,150,100,",        // subtle glows
    green: "rgba(130,180,120,",       // correct
    red: "rgba(200,100,80,",          // wrong
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 35% 20%, #2c2018 0%, #221810 35%, #18100a 70%, #0e0806 100%)",
      fontFamily: "'Georgia', 'Palatino Linotype', serif",
      overflow: "hidden", position: "relative", userSelect: "none",
    }}>
      {/* Ambient */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(160,120,70,0.05) 0%, transparent 70%)",
          top: "10%", left: "20%", animation: "floatOrb1 16s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: 280, height: 280, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(140,100,55,0.04) 0%, transparent 70%)",
          bottom: "12%", right: "15%", animation: "floatOrb2 19s ease-in-out infinite",
        }} />
      </div>

      <style>{`
        @keyframes floatOrb1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,-12px) scale(1.06)} }
        @keyframes floatOrb2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-15px,10px) scale(1.08)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(25px)} to{opacity:1;transform:translateY(0)} }
        @keyframes countdownPop { 0%{transform:scale(0.3);opacity:0} 50%{transform:scale(1.2);opacity:1} 100%{transform:scale(1);opacity:1} }
        @keyframes cardEnter { from{opacity:0;transform:scale(0.85) translateY(15px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes correctFlash { 0%{box-shadow:0 0 0 rgba(130,180,120,0)} 50%{box-shadow:0 0 25px rgba(130,180,120,0.25)} 100%{box-shadow:0 0 0 rgba(130,180,120,0)} }
        @keyframes wrongShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
        @keyframes timeoutFade { 0%{opacity:1} 100%{opacity:0.3} }
        @keyframes particleFly { 0%{opacity:1;transform:translate(0,0) scale(var(--s))} 100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(0.2)} }
        @keyframes urgentPulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes subtleBreathe { 0%,100%{opacity:0.5} 50%{opacity:0.7} }
        @keyframes streakPop { 0%{transform:scale(0.7);opacity:0} 60%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
        @keyframes timerBarPulse { 0%,100%{opacity:0.8} 50%{opacity:1} }
        @keyframes vsGlow { 0%,100%{text-shadow:0 0 6px rgba(180,140,90,0.15)} 50%{text-shadow:0 0 14px rgba(180,140,90,0.35)} }
        @keyframes steamRise { 
          0%{opacity:0;transform:translateY(0) scale(0.5)} 
          20%{opacity:0.15} 
          80%{opacity:0.06} 
          100%{opacity:0;transform:translateY(-120px) translateX(15px) scale(1.5)} 
        }
        @keyframes coffeeCupFloat {
          0%,100%{transform:translateY(0) rotate(-2deg)}
          50%{transform:translateY(-6px) rotate(2deg)}
        }
      `}</style>

      {/* Steam particles */}
      {steamParticles.map(s => (
        <div key={s.id} style={{
          position: "fixed", left: `${s.x}%`, bottom: 0, pointerEvents: "none", zIndex: 0,
          width: s.size, height: s.size, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,155,120,0.12), transparent)",
          animation: `steamRise ${s.duration}s ease-out ${s.delay}s forwards`,
        }} />
      ))}

      {/* Burst particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: "fixed", left: p.x, top: p.y, fontSize: 18, pointerEvents: "none", zIndex: 100,
          "--dx": `${p.dx}px`, "--dy": `${p.dy}px`, "--s": p.scale,
          animation: "particleFly 1s ease-out forwards",
        }}>{p.emoji}</div>
      ))}

      <div style={{
        maxWidth: 520, margin: "0 auto", padding: "16px 16px",
        position: "relative", zIndex: 1, minHeight: "100vh",
        display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{
            fontSize: 12, letterSpacing: 4, color: `${c.accent}0.35)`,
            textTransform: "uppercase", marginBottom: 6,
          }}>Letter Griddle</div>
          <h1 style={{
            fontSize: 36, fontWeight: 700, color: `${c.text}0.9)`, margin: 0,
            textShadow: `0 0 20px ${c.glow}0.12), 0 2px 4px rgba(0,0,0,0.3)`,
            letterSpacing: 2,
          }}>Lattes</h1>
          <div style={{
            width: 50, height: 2, margin: "8px auto 0",
            background: `linear-gradient(90deg, transparent, ${c.accent}0.3), transparent)`,
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
              filter: `drop-shadow(0 0 15px ${c.glow}0.18))`,
              animation: "coffeeCupFloat 4s ease-in-out infinite",
            }}>☕</div>
            <p style={{
              color: `${c.text}0.55)`, fontSize: 16, lineHeight: 1.8,
              maxWidth: 340, margin: "0 auto 28px",
            }}>
              Two items appear. Only one belongs in a café.
              <br />Tap the coffee item before time runs out!
              <br />
              <span style={{ opacity: 0.6, fontSize: 14 }}>
                Quick sips, {GAME_DURATION} seconds on the clock.
              </span>
            </p>

            <button onClick={startGame} style={{
              background: `linear-gradient(135deg, ${c.bg}0.2) 0%, ${c.bg}0.12) 100%)`,
              border: `1px solid ${c.accent}0.25)`, color: `${c.text}0.9)`,
              padding: "14px 48px", borderRadius: 40, fontSize: 18,
              fontFamily: "inherit", cursor: "pointer", transition: "all 0.3s ease",
              boxShadow: `0 0 20px ${c.glow}0.08)`,
            }}
              onMouseEnter={e => { e.target.style.boxShadow = `0 0 30px ${c.glow}0.18)`; e.target.style.background = `linear-gradient(135deg, ${c.bg}0.28) 0%, ${c.bg}0.18) 100%)`; }}
              onMouseLeave={e => { e.target.style.boxShadow = `0 0 20px ${c.glow}0.08)`; e.target.style.background = `linear-gradient(135deg, ${c.bg}0.2) 0%, ${c.bg}0.12) 100%)`; }}
            >☕ Start Brewing</button>

            <button onClick={() => setShowHowToPlay(true)} style={{
              background: "transparent", border: "none", color: `${c.accent}0.35)`,
              padding: "10px 24px", fontSize: 14, fontFamily: "inherit",
              cursor: "pointer", transition: "color 0.3s ease", marginTop: 12,
            }}
              onMouseEnter={e => { e.target.style.color = `${c.accent}0.6)`; }}
              onMouseLeave={e => { e.target.style.color = `${c.accent}0.35)`; }}
            >❓ How to Play</button>
          </div>
        )}

        {/* COUNTDOWN */}
        {gameState === "countdown" && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div key={countdownNum} style={{
              fontSize: 100, fontWeight: 700, color: `${c.text}0.9)`,
              textShadow: `0 0 40px ${c.glow}0.25)`, animation: "countdownPop 0.7s ease-out",
            }}>{countdownNum > 0 ? countdownNum : "☕"}</div>
          </div>
        )}

        {/* PLAYING */}
        {gameState === "playing" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* HUD */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, padding: "0 4px" }}>
              <div>
                <div style={{ color: `${c.accent}0.35)`, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>SCORE</div>
                <div style={{ color: `${c.text}0.9)`, fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{score}</div>
              </div>
              {streak > 1 && (
                <div key={streak} style={{ animation: "streakPop 0.3s ease-out", textAlign: "center" }}>
                  <div style={{
                    color: streak >= 5 ? "rgba(200,170,110,0.95)" : `${c.text}0.75)`,
                    fontSize: streak >= 5 ? 22 : 18, fontWeight: 700,
                    textShadow: streak >= 5 ? "0 0 12px rgba(200,170,110,0.25)" : "none",
                  }}>x{streak} streak!</div>
                </div>
              )}
              <div style={{ textAlign: "right" }}>
                <div style={{ color: `${c.accent}0.35)`, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>TIME</div>
                <div style={{
                  color: timerColor, fontSize: 28, fontWeight: 700, lineHeight: 1,
                  animation: timeLeft <= 5 ? "urgentPulse 0.5s ease-in-out infinite" : "none",
                }}>{timeLeft}s</div>
              </div>
            </div>

            {/* Timer bar */}
            <div style={{ height: 3, borderRadius: 2, background: `${c.bg}0.06)`, marginBottom: 20, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${(timeLeft / GAME_DURATION) * 100}%`, borderRadius: 2,
                background: timeLeft <= 5 ? "linear-gradient(90deg, rgba(200,80,50,0.6), rgba(200,100,60,0.4))" :
                  timeLeft <= 10 ? `linear-gradient(90deg, ${c.accent}0.5), ${c.accent}0.3))` :
                  `linear-gradient(90deg, ${c.bg}0.35), ${c.bg}0.2))`,
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
                <div style={{
                  textAlign: "center", color: `${c.accent}0.28)`,
                  fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: -8,
                }}>Which one belongs in a café?</div>

                <div style={{ display: "flex", gap: 14, alignItems: "stretch" }}>
                  {/* Left card */}
                  {(() => {
                    const leftText = currentPair.coffeeOnLeft ? currentPair.coffee : currentPair.notCoffee;
                    const leftIsCorrect = currentPair.coffeeOnLeft;
                    const showCorrect = feedbackState === "correct" && leftIsCorrect;
                    const showWrong = feedbackState === "wrong" && !leftIsCorrect;
                    const showMissed = feedbackState === "timeout" && leftIsCorrect;

                    return (
                      <button onClick={e => handleChoice(true, e)} disabled={!!feedbackState}
                        style={{
                          flex: 1, padding: "28px 16px", borderRadius: 18,
                          background: showCorrect || showMissed
                            ? `linear-gradient(135deg, ${c.green}0.12), ${c.green}0.06))`
                            : showWrong ? `linear-gradient(135deg, ${c.red}0.1), ${c.red}0.05))`
                            : `linear-gradient(135deg, ${c.bg}0.07) 0%, ${c.bg}0.03) 100%)`,
                          border: showCorrect || showMissed ? `2px solid ${c.green}0.45)` : showWrong ? `2px solid ${c.red}0.35)` : `1px solid ${c.accent}0.12)`,
                          cursor: feedbackState ? "default" : "pointer",
                          fontFamily: "inherit", fontSize: 20, fontWeight: 700,
                          color: showCorrect || showMissed ? `${c.green}0.9)` : showWrong ? `${c.red}0.8)` : `${c.text}0.8)`,
                          transition: "all 0.15s ease",
                          animation: showCorrect ? "correctFlash 0.5s ease-out" : showWrong ? "wrongShake 0.4s ease-out" : feedbackState === "timeout" && !leftIsCorrect ? "timeoutFade 0.4s forwards" : "cardEnter 0.3s ease-out",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          minHeight: 100, textAlign: "center", lineHeight: 1.3,
                          boxShadow: showCorrect ? `0 0 20px ${c.green}0.12)` : "none",
                        }}
                        onMouseEnter={e => { if (!feedbackState) { e.target.style.background = `linear-gradient(135deg, ${c.bg}0.12) 0%, ${c.bg}0.06) 100%)`; e.target.style.borderColor = `${c.accent}0.25)`; }}}
                        onMouseLeave={e => { if (!feedbackState) { e.target.style.background = `linear-gradient(135deg, ${c.bg}0.07) 0%, ${c.bg}0.03) 100%)`; e.target.style.borderColor = `${c.accent}0.12)`; }}}
                      >{leftText}</button>
                    );
                  })()}

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, width: 36 }}>
                    <div style={{ color: `${c.accent}0.3)`, fontSize: 14, fontWeight: 700, letterSpacing: 1, animation: "vsGlow 3s ease-in-out infinite" }}>VS</div>
                  </div>

                  {/* Right card */}
                  {(() => {
                    const rightText = currentPair.coffeeOnLeft ? currentPair.notCoffee : currentPair.coffee;
                    const rightIsCorrect = !currentPair.coffeeOnLeft;
                    const showCorrect = feedbackState === "correct" && rightIsCorrect;
                    const showWrong = feedbackState === "wrong" && !rightIsCorrect;
                    const showMissed = feedbackState === "timeout" && rightIsCorrect;

                    return (
                      <button onClick={e => handleChoice(false, e)} disabled={!!feedbackState}
                        style={{
                          flex: 1, padding: "28px 16px", borderRadius: 18,
                          background: showCorrect || showMissed
                            ? `linear-gradient(135deg, ${c.green}0.12), ${c.green}0.06))`
                            : showWrong ? `linear-gradient(135deg, ${c.red}0.1), ${c.red}0.05))`
                            : `linear-gradient(135deg, ${c.bg}0.07) 0%, ${c.bg}0.03) 100%)`,
                          border: showCorrect || showMissed ? `2px solid ${c.green}0.45)` : showWrong ? `2px solid ${c.red}0.35)` : `1px solid ${c.accent}0.12)`,
                          cursor: feedbackState ? "default" : "pointer",
                          fontFamily: "inherit", fontSize: 20, fontWeight: 700,
                          color: showCorrect || showMissed ? `${c.green}0.9)` : showWrong ? `${c.red}0.8)` : `${c.text}0.8)`,
                          transition: "all 0.15s ease",
                          animation: showCorrect ? "correctFlash 0.5s ease-out" : showWrong ? "wrongShake 0.4s ease-out" : feedbackState === "timeout" && !rightIsCorrect ? "timeoutFade 0.4s forwards" : "cardEnter 0.3s ease-out 0.05s both",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          minHeight: 100, textAlign: "center", lineHeight: 1.3,
                          boxShadow: showCorrect ? `0 0 20px ${c.green}0.12)` : "none",
                        }}
                        onMouseEnter={e => { if (!feedbackState) { e.target.style.background = `linear-gradient(135deg, ${c.bg}0.12) 0%, ${c.bg}0.06) 100%)`; e.target.style.borderColor = `${c.accent}0.25)`; }}}
                        onMouseLeave={e => { if (!feedbackState) { e.target.style.background = `linear-gradient(135deg, ${c.bg}0.07) 0%, ${c.bg}0.03) 100%)`; e.target.style.borderColor = `${c.accent}0.12)`; }}}
                      >{rightText}</button>
                    );
                  })()}
                </div>

                {/* Feedback */}
                <div style={{ textAlign: "center", height: 24, marginTop: 4 }}>
                  {feedbackState === "correct" && <span style={{ color: `${c.green}0.8)`, fontSize: 14, fontWeight: 700 }}>☕ Good taste!</span>}
                  {feedbackState === "wrong" && <span style={{ color: `${c.red}0.7)`, fontSize: 14 }}>Not in the café!</span>}
                  {feedbackState === "timeout" && <span style={{ color: `${c.accent}0.35)`, fontSize: 14 }}>Coffee's getting cold!</span>}
                </div>
              </div>
            )}

            <p style={{ textAlign: "center", color: `${c.accent}0.2)`, fontSize: 12, marginTop: 8 }}>
              Tap the coffee item!
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

                  <div style={{
                    background: `linear-gradient(135deg, ${c.bg}0.06) 0%, ${c.bg}0.03) 100%)`,
                    border: `1px solid ${c.accent}0.1)`, borderRadius: 20,
                    padding: "24px 20px", marginBottom: 20,
                  }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                      <div>
                        <div style={{ color: `${c.text}0.9)`, fontSize: 30, fontWeight: 700 }}>{score}</div>
                        <div style={{ color: `${c.accent}0.35)`, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>Points</div>
                      </div>
                      <div>
                        <div style={{ color: `${c.text}0.9)`, fontSize: 30, fontWeight: 700 }}>{accuracy}%</div>
                        <div style={{ color: `${c.accent}0.35)`, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>Accuracy</div>
                      </div>
                      <div>
                        <div style={{ color: `${c.text}0.9)`, fontSize: 30, fontWeight: 700 }}>x{bestStreak}</div>
                        <div style={{ color: `${c.accent}0.35)`, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>Best Streak</div>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    background: `${c.bg}0.03)`, border: `1px solid ${c.accent}0.06)`,
                    borderRadius: 14, padding: "14px 18px", marginBottom: 24,
                  }}>
                    <p style={{ color: `${c.accent}0.3)`, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>☕ Coffee Corner</p>
                    <p style={{ color: `${c.text}0.6)`, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{coffeeFact}</p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
                    <button onClick={() => setShowShareModal(true)} style={{
                      background: `linear-gradient(135deg, ${c.bg}0.2) 0%, ${c.bg}0.12) 100%)`,
                      border: `1px solid ${c.accent}0.25)`, color: `${c.text}0.9)`,
                      padding: "10px 28px", borderRadius: 30, fontSize: 14, fontFamily: "inherit",
                      cursor: "pointer", transition: "all 0.3s ease", boxShadow: `0 0 15px ${c.glow}0.06)`,
                    }}
                      onMouseEnter={e => { e.target.style.boxShadow = `0 0 25px ${c.glow}0.14)`; }}
                      onMouseLeave={e => { e.target.style.boxShadow = `0 0 15px ${c.glow}0.06)`; }}
                    >☕ Share Results</button>
                    <button onClick={startGame} style={{
                      background: "transparent", border: `1px solid ${c.accent}0.15)`,
                      color: `${c.accent}0.4)`, padding: "10px 28px", borderRadius: 30,
                      fontSize: 14, fontFamily: "inherit", cursor: "pointer", transition: "all 0.3s ease",
                    }}
                      onMouseEnter={e => { e.target.style.borderColor = `${c.accent}0.3)`; e.target.style.color = `${c.accent}0.7)`; }}
                      onMouseLeave={e => { e.target.style.borderColor = `${c.accent}0.15)`; e.target.style.color = `${c.accent}0.4)`; }}
                    >Brew Again</button>
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <p style={{ color: `${c.accent}0.18)`, fontSize: 12 }}>
                      A warm moment from the <span style={{ color: `${c.accent}0.35)` }}>Letter Griddle Family</span>
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 6, fontSize: 11 }}>
                      <a href="/" style={{ color: `${c.accent}0.2)`, textDecoration: "none", transition: "color 0.3s ease" }} onMouseEnter={(e) => { e.target.style.color = `${c.accent}0.5)`; }} onMouseLeave={(e) => { e.target.style.color = `${c.accent}0.2)`; }}>🥞 More Games at lettergriddle.com</a>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 32, paddingBottom: 16 }}>
          <p style={{ color: `${c.accent}0.1)`, fontSize: 10 }}>
            © {new Date().getFullYear()} Letter Griddle. All rights reserved.
            {" | "}
            <a href="/privacy" style={{ color: `${c.accent}0.15)`, textDecoration: "underline", textUnderlineOffset: 2 }}>Privacy Policy</a>
            {" | "}
            <a href="/terms" style={{ color: `${c.accent}0.15)`, textDecoration: "underline", textUnderlineOffset: 2 }}>Terms of Service</a>
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
            background: "linear-gradient(145deg, #2a1a10, #160e06)",
            border: `1px solid ${c.accent}0.15)`, borderRadius: 24,
            padding: "28px 24px", maxWidth: 420, width: "100%", position: "relative",
            boxShadow: `0 0 40px ${c.glow}0.06)`, animation: "fadeInUp 0.4s ease-out",
            maxHeight: "85vh", overflowY: "auto",
          }}>
            <button onClick={() => setShowHowToPlay(false)} style={{
              position: "absolute", top: 14, right: 14, background: "none",
              border: "none", color: `${c.accent}0.35)`, fontSize: 20,
              cursor: "pointer", padding: 4, lineHeight: 1,
            }}>✕</button>

            <h2 style={{ textAlign: "center", color: `${c.text}0.9)`, fontSize: 24, marginBottom: 24 }}>How to Play ☕</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "👀", title: "Two Items Appear", desc: "You'll see two items side by side. One is coffee-related, the other has no business in a café!" },
                { icon: "☕", title: "Tap the Coffee Item", desc: "Quickly tap the item that belongs in a coffee shop. Is it a Cortado or a Canoe? You decide!" },
                { icon: "⚡", title: "Build Your Streak", desc: "Consecutive correct answers build a streak multiplier, up to x5 points! One wrong answer resets it." },
                { icon: "⏱️", title: "Beat the Clock", desc: `You have ${GAME_DURATION} seconds. If you don't choose in time, the pair vanishes and your streak resets.` },
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: `${c.bg}0.1)`, border: `1px solid ${c.accent}0.12)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0,
                  }}>{step.icon}</div>
                  <div>
                    <p style={{ color: `${c.text}0.85)`, fontSize: 15, fontWeight: 700, margin: "0 0 4px 0" }}>{step.title}</p>
                    <p style={{ color: `${c.text}0.45)`, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${c.accent}0.06)` }}>
              <p style={{ color: `${c.accent}0.3)`, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 12 }}>Barista Ratings</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { emoji: "😴", title: "Decaf Dreamer", range: "0–19" },
                  { emoji: "🫘", title: "Bean Counter", range: "20–34" },
                  { emoji: "☕", title: "Latte Artist", range: "35–49" },
                  { emoji: "👑", title: "Master Barista", range: "50+" },
                ].map((r, i) => (
                  <div key={i} style={{
                    background: `${c.bg}0.04)`, border: `1px solid ${c.accent}0.05)`,
                    borderRadius: 10, padding: "8px 10px", display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <span style={{ fontSize: 20 }}>{r.emoji}</span>
                    <div>
                      <div style={{ color: `${c.text}0.7)`, fontSize: 12, fontWeight: 700 }}>{r.title}</div>
                      <div style={{ color: `${c.accent}0.3)`, fontSize: 10 }}>{r.range} pts</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setShowHowToPlay(false)} style={{
              display: "block", margin: "22px auto 0",
              background: `linear-gradient(135deg, ${c.bg}0.2) 0%, ${c.bg}0.12) 100%)`,
              border: `1px solid ${c.accent}0.25)`, color: `${c.text}0.9)`,
              padding: "10px 40px", borderRadius: 30, fontSize: 15, fontFamily: "inherit",
              cursor: "pointer", transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.target.style.boxShadow = `0 0 20px ${c.glow}0.12)`; }}
              onMouseLeave={e => { e.target.style.boxShadow = "none"; }}
            >Let's Brew! ☕</button>
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
            background: "linear-gradient(145deg, #2a1a10, #160e06)",
            border: `1px solid ${c.accent}0.15)`, borderRadius: 24,
            padding: 32, maxWidth: 420, width: "100%", position: "relative",
            boxShadow: `0 0 40px ${c.glow}0.06)`, animation: "fadeInUp 0.4s ease-out",
          }}>
            <button onClick={() => setShowShareModal(false)} style={{
              position: "absolute", top: 16, right: 16, background: "none",
              border: "none", color: `${c.accent}0.35)`, fontSize: 20,
              cursor: "pointer", padding: 4, lineHeight: 1,
            }}>✕</button>

            <h2 style={{ textAlign: "center", color: `${c.text}0.9)`, fontSize: 24, marginBottom: 20 }}>Share Your Score ☕</h2>

            <div style={{
              background: `${c.bg}0.04)`, border: `1px solid ${c.accent}0.08)`,
              borderRadius: 16, padding: 20, marginBottom: 20, fontFamily: "monospace",
              fontSize: 13, lineHeight: 1.7, color: `${c.text}0.6)`, whiteSpace: "pre-wrap",
            }}>
              {(() => {
                const rating = getRating();
                const accuracy = totalAnswered > 0 ? Math.round((totalAnswered - wrong) / totalAnswered * 100) : 0;
                return `☕ Letter Griddle: Lattes ☕\n${rating.emoji} ${rating.title}\nScore: ${score} pts | ${accuracy}% accuracy | x${bestStreak} streak\nPlay at www.lettergriddle.com/lattes\n\nMore from the Letter Griddle Family:\n🥞 lettergriddle.com`;
              })()}
            </div>

            <button onClick={handleShare} style={{
              width: "100%",
              background: shareCopied ? "linear-gradient(135deg, rgba(76,175,80,0.25), rgba(56,142,60,0.2))" : `linear-gradient(135deg, ${c.bg}0.2) 0%, ${c.bg}0.12) 100%)`,
              border: shareCopied ? "1px solid rgba(76,175,80,0.35)" : `1px solid ${c.accent}0.25)`,
              color: shareCopied ? "rgba(200,255,200,0.9)" : `${c.text}0.9)`,
              padding: "14px 24px", borderRadius: 30, fontSize: 16, fontFamily: "inherit",
              cursor: "pointer", transition: "all 0.3s ease",
            }}>{shareCopied ? "✓ Copied!" : "Copy to Clipboard"}</button>

            <p style={{ textAlign: "center", color: `${c.accent}0.22)`, fontSize: 12, marginTop: 16 }}>
              Challenge a friend. Who's the real barista? ☕
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
