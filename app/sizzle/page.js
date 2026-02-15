"use client";
import { useState, useEffect, useCallback, useRef } from "react";

const GAME_DURATION = 30; // seconds
const BACON_SPAWN_MIN = 600;
const BACON_SPAWN_MAX = 1400;
const BACON_LIFETIME = 2200; // ms before bacon disappears
const PANCAKE_COUNT = 5;

// Fun sizzle facts shown after game
const sizzleFacts = [
  "Americans consume about 18 billion strips of bacon per year!",
  "Bacon has been around since 1500 BC when the Chinese first cured pork bellies with salt.",
  "The average American eats about 18 pounds of bacon each year.",
  "There's a bacon camp in Michigan where everything on the menu features bacon.",
  "Bacon and pancakes became a breakfast duo in the 1920s thanks to a marketing campaign.",
  "The word 'bacon' comes from the Old High German 'bacho,' meaning buttock.",
  "Canada has its own style of bacon. It's made from the pork loin, not the belly!",
  "Maple bacon pancakes are one of the most searched breakfast recipes online.",
  "A perfect strip of bacon is cooked at 400°F for maximum crispiness.",
  "National Bacon Day is celebrated on December 30th every year.",
  "Kevin Bacon has exactly zero relation to the food, but we love him anyway.",
  "The BLT is the second most popular sandwich in the United States.",
];

export default function LetterGriddleSizzle() {
  const [gameState, setGameState] = useState("idle"); // idle, countdown, playing, finished
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [bacons, setBacons] = useState([]);
  const [pancakes, setPancakes] = useState([]);
  const [selectedBacon, setSelectedBacon] = useState(null);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [sizzleParticles, setSizzleParticles] = useState([]);
  const [countdownNum, setCountdownNum] = useState(3);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [sizzleFact, setSizzleFact] = useState("");
  const [pancakeFlashes, setPancakeFlashes] = useState({});
  const [missedBacons, setMissedBacons] = useState(0);

  const baconIdRef = useRef(0);
  const particleIdRef = useRef(0);
  const spawnTimerRef = useRef(null);
  const gameTimerRef = useRef(null);
  const baconTimeoutsRef = useRef({});

  // Initialize pancake positions (bottom area, spread out)
  const initPancakes = useCallback(() => {
    const positions = [];
    for (let i = 0; i < PANCAKE_COUNT; i++) {
      positions.push({
        id: i,
        x: 8 + i * 18,
        baconCount: 0,
      });
    }
    return positions;
  }, []);

  // Spawn a bacon strip at random position in upper area
  const spawnBacon = useCallback(() => {
    const id = baconIdRef.current++;
    const newBacon = {
      id,
      x: 5 + Math.random() * 75,
      y: 5 + Math.random() * 35,
      rotation: Math.random() * 40 - 20,
      wobble: Math.random() * 6 - 3,
    };

    setBacons((prev) => [...prev, newBacon]);

    // Auto-expire bacon
    baconTimeoutsRef.current[id] = setTimeout(() => {
      setBacons((prev) => {
        const exists = prev.find((b) => b.id === id);
        if (exists) {
          setMissedBacons((m) => m + 1);
          setCombo(0);
        }
        return prev.filter((b) => b.id !== id);
      });
      delete baconTimeoutsRef.current[id];
    }, BACON_LIFETIME);
  }, []);

  // Schedule next bacon spawn
  const scheduleSpawn = useCallback(() => {
    const delay =
      BACON_SPAWN_MIN + Math.random() * (BACON_SPAWN_MAX - BACON_SPAWN_MIN);
    spawnTimerRef.current = setTimeout(() => {
      spawnBacon();
      scheduleSpawn();
    }, delay);
  }, [spawnBacon]);

  // Add sizzle particles
  const addSizzleParticles = useCallback((x, y) => {
    const newParticles = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        emoji: ["🔥", "💥", "✨", "🥓", "💫"][
          Math.floor(Math.random() * 5)
        ],
        dx: (Math.random() - 0.5) * 120,
        dy: -20 - Math.random() * 80,
        scale: 0.6 + Math.random() * 0.6,
      });
    }
    setSizzleParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setSizzleParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id))
      );
    }, 1000);
  }, []);

  // Start countdown then game
  const startGame = useCallback(() => {
    setGameState("countdown");
    setCountdownNum(3);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setMissedBacons(0);
    setBacons([]);
    setPancakes(initPancakes());
    setTimeLeft(GAME_DURATION);
    setSelectedBacon(null);
    setSizzleParticles([]);
    setShowShareModal(false);
    setShareCopied(false);
    setPancakeFlashes({});

    // Countdown: 3, 2, 1, GO!
    let count = 3;
    const countInterval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdownNum(count);
      } else {
        clearInterval(countInterval);
        setCountdownNum(0);
        setGameState("playing");

        // Start spawning bacon
        setTimeout(() => {
          spawnBacon();
          scheduleSpawn();
        }, 300);

        // Start game timer
        let remaining = GAME_DURATION;
        gameTimerRef.current = setInterval(() => {
          remaining--;
          setTimeLeft(remaining);
          if (remaining <= 0) {
            clearInterval(gameTimerRef.current);
            clearTimeout(spawnTimerRef.current);
            // Clear all bacon timeouts
            Object.values(baconTimeoutsRef.current).forEach(clearTimeout);
            baconTimeoutsRef.current = {};
            setGameState("finished");
            setSizzleFact(
              sizzleFacts[Math.floor(Math.random() * sizzleFacts.length)]
            );
          }
        }, 1000);
      }
    }, 800);
  }, [initPancakes, spawnBacon, scheduleSpawn]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(spawnTimerRef.current);
      clearInterval(gameTimerRef.current);
      Object.values(baconTimeoutsRef.current).forEach(clearTimeout);
    };
  }, []);

  // Handle bacon tap (select it)
  const handleBaconTap = useCallback(
    (baconId, e) => {
      if (gameState !== "playing") return;
      e.stopPropagation();
      setSelectedBacon(baconId);
    },
    [gameState]
  );

  // Handle pancake tap (drop bacon on it)
  const handlePancakeTap = useCallback(
    (pancakeId, e) => {
      if (gameState !== "playing" || selectedBacon === null) return;

      // Remove bacon
      const baconExists = bacons.find((b) => b.id === selectedBacon);
      if (!baconExists) {
        setSelectedBacon(null);
        return;
      }

      // Clear its timeout
      if (baconTimeoutsRef.current[selectedBacon]) {
        clearTimeout(baconTimeoutsRef.current[selectedBacon]);
        delete baconTimeoutsRef.current[selectedBacon];
      }

      setBacons((prev) => prev.filter((b) => b.id !== selectedBacon));

      // Update pancake
      setPancakes((prev) =>
        prev.map((p) =>
          p.id === pancakeId ? { ...p, baconCount: p.baconCount + 1 } : p
        )
      );

      // Flash pancake
      setPancakeFlashes((prev) => ({ ...prev, [pancakeId]: true }));
      setTimeout(() => {
        setPancakeFlashes((prev) => ({ ...prev, [pancakeId]: false }));
      }, 400);

      // Score + combo
      const newCombo = combo + 1;
      const comboMultiplier = Math.min(newCombo, 5);
      const points = 1 * comboMultiplier;
      setScore((s) => s + points);
      setCombo(newCombo);
      setBestCombo((prev) => Math.max(prev, newCombo));

      // Particles
      const rect = e.currentTarget.getBoundingClientRect();
      addSizzleParticles(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );

      setSelectedBacon(null);
    },
    [gameState, selectedBacon, bacons, combo, addSizzleParticles]
  );

  // Deselect bacon when tapping empty space
  const handleBackgroundTap = useCallback(() => {
    if (selectedBacon !== null) {
      setSelectedBacon(null);
    }
  }, [selectedBacon]);

  // Share handler
  const handleShare = () => {
    const rating =
      score >= 60
        ? "🔥 Sizzle Master!"
        : score >= 40
        ? "🥓 Bacon Boss!"
        : score >= 20
        ? "🍳 Short Order Cook"
        : "🥞 Pancake Apprentice";

    const shareText = `🥓 Letter Griddle Sizzle 🥓\n${rating}\nScore: ${score} points | Best combo: x${bestCombo}\n${score} strips served in ${GAME_DURATION}s!\nPlay at www.lettergriddle.com/sizzle\n\nMore from the Letter Griddle Family:\n🥞 lettergriddle.com`;

    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  // Get rating
  const getRating = () => {
    if (score >= 60)
      return { title: "Sizzle Master!", emoji: "🔥", color: "#ff6b35" };
    if (score >= 40)
      return { title: "Bacon Boss!", emoji: "🥓", color: "#e8a045" };
    if (score >= 20)
      return { title: "Short Order Cook", emoji: "🍳", color: "#d4a574" };
    return { title: "Pancake Apprentice", emoji: "🥞", color: "#c4956a" };
  };

  // Timer urgency color
  const timerColor =
    timeLeft <= 5
      ? "rgba(255,80,60,0.9)"
      : timeLeft <= 10
      ? "rgba(255,160,60,0.9)"
      : "rgba(255,200,120,0.7)";

  return (
    <div
      onClick={handleBackgroundTap}
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at 50% 30%, #3d2216 0%, #2a1610 35%, #1a0e08 70%, #120a05 100%)",
        fontFamily: "'Georgia', 'Palatino Linotype', serif",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Ambient warm background elements */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* Subtle heat shimmer effect */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse at 50% 80%, rgba(255,120,40,0.04) 0%, transparent 60%)",
            animation: "heatShimmer 4s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,140,50,0.06) 0%, transparent 70%)",
            top: "15%",
            right: "10%",
            animation: "floatOrb1 10s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,100,30,0.05) 0%, transparent 70%)",
            bottom: "20%",
            left: "8%",
            animation: "floatOrb2 13s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes heatShimmer {
          0%, 100% { opacity: 0.6; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.02); }
        }
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, 10px) scale(1.08); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -15px) scale(1.1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes baconSizzle {
          0%, 100% { transform: rotate(var(--rot)) translateY(0); }
          25% { transform: rotate(calc(var(--rot) + 2deg)) translateY(-2px); }
          75% { transform: rotate(calc(var(--rot) - 2deg)) translateY(1px); }
        }
        @keyframes baconPulseReady {
          0%, 100% { 
            box-shadow: 0 0 10px rgba(255,150,50,0.3), 0 0 20px rgba(255,120,30,0.15);
            transform: rotate(var(--rot)) scale(1);
          }
          50% { 
            box-shadow: 0 0 18px rgba(255,150,50,0.5), 0 0 35px rgba(255,120,30,0.25);
            transform: rotate(var(--rot)) scale(1.05);
          }
        }
        @keyframes baconSelected {
          0%, 100% { 
            box-shadow: 0 0 15px rgba(255,200,60,0.6), 0 0 30px rgba(255,160,40,0.3), 0 0 50px rgba(255,120,20,0.15);
            transform: rotate(var(--rot)) scale(1.1);
          }
          50% { 
            box-shadow: 0 0 25px rgba(255,200,60,0.8), 0 0 45px rgba(255,160,40,0.4), 0 0 70px rgba(255,120,20,0.2);
            transform: rotate(var(--rot)) scale(1.15);
          }
        }
        @keyframes pancakeWaiting {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes pancakeFlash {
          0% { box-shadow: 0 0 20px rgba(255,180,50,0.6), 0 0 40px rgba(255,140,30,0.3); }
          100% { box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        }
        @keyframes particleFly {
          0% { opacity: 1; transform: translate(0, 0) scale(var(--s)); }
          100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.2); }
        }
        @keyframes countdownPop {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes urgentPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes comboPopIn {
          0% { transform: scale(0.5) translateY(10px); opacity: 0; }
          60% { transform: scale(1.15) translateY(-2px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes baconExpire {
          0% { opacity: 1; transform: rotate(var(--rot)) scale(1); }
          100% { opacity: 0; transform: rotate(var(--rot)) scale(0.5); }
        }
        @keyframes subtleBreathe {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.75; }
        }
      `}</style>

      {/* Sizzle particles */}
      {sizzleParticles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "fixed",
            left: p.x,
            top: p.y,
            fontSize: 18,
            pointerEvents: "none",
            zIndex: 100,
            "--dx": `${p.dx}px`,
            "--dy": `${p.dy}px`,
            "--s": p.scale,
            animation: "particleFly 1s ease-out forwards",
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Main content */}
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          padding: "16px 16px",
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 4,
              color: "rgba(255,160,80,0.45)",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Letter Griddle
          </div>
          <h1
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: "rgba(255,180,100,0.9)",
              margin: 0,
              textShadow:
                "0 0 25px rgba(255,140,50,0.2), 0 2px 4px rgba(0,0,0,0.3)",
              letterSpacing: 3,
            }}
          >
            Sizzle
          </h1>
          <div
            style={{
              width: 50,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, rgba(255,150,70,0.4), transparent)",
              margin: "8px auto 0",
            }}
          />
        </div>

        {/* IDLE STATE */}
        {gameState === "idle" && (
          <div
            style={{
              textAlign: "center",
              animation: "fadeInUp 0.8s ease-out",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: 72,
                marginBottom: 20,
                filter: "drop-shadow(0 0 15px rgba(255,140,50,0.25))",
                animation: "subtleBreathe 2.5s ease-in-out infinite",
              }}
            >
              🥓
            </div>

            <p
              style={{
                color: "rgba(255,180,110,0.65)",
                fontSize: 16,
                lineHeight: 1.8,
                maxWidth: 340,
                margin: "0 auto 28px",
              }}
            >
              Bacon's sizzling on the griddle!
              <br />
              Tap a strip, then tap a pancake to serve it.
              <br />
              <span style={{ opacity: 0.6, fontSize: 14 }}>
                How many can you serve in {GAME_DURATION} seconds?
              </span>
            </p>

            <button
              onClick={startGame}
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,140,50,0.3) 0%, rgba(255,100,20,0.2) 100%)",
                border: "1px solid rgba(255,160,70,0.35)",
                color: "rgba(255,200,130,0.95)",
                padding: "14px 48px",
                borderRadius: 40,
                fontSize: 18,
                fontFamily: "inherit",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 0 20px rgba(255,130,40,0.12)",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow =
                  "0 0 30px rgba(255,130,40,0.25), 0 0 60px rgba(255,100,20,0.1)";
                e.target.style.background =
                  "linear-gradient(135deg, rgba(255,140,50,0.4) 0%, rgba(255,100,20,0.3) 100%)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow =
                  "0 0 20px rgba(255,130,40,0.12)";
                e.target.style.background =
                  "linear-gradient(135deg, rgba(255,140,50,0.3) 0%, rgba(255,100,20,0.2) 100%)";
              }}
            >
              🔥 Start Sizzling
            </button>

            <button
              onClick={() => setShowHowToPlay(true)}
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(255,160,80,0.4)",
                padding: "10px 24px",
                fontSize: 14,
                fontFamily: "inherit",
                cursor: "pointer",
                transition: "color 0.3s ease",
                marginTop: 12,
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "rgba(255,160,80,0.7)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "rgba(255,160,80,0.4)";
              }}
            >
              ❓ How to Play
            </button>
          </div>
        )}

        {/* COUNTDOWN STATE */}
        {gameState === "countdown" && (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              key={countdownNum}
              style={{
                fontSize: 100,
                fontWeight: 700,
                color: "rgba(255,180,80,0.9)",
                textShadow: "0 0 40px rgba(255,140,50,0.4)",
                animation: "countdownPop 0.7s ease-out",
              }}
            >
              {countdownNum > 0 ? countdownNum : "🔥"}
            </div>
          </div>
        )}

        {/* PLAYING STATE */}
        {gameState === "playing" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* HUD */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
                padding: "0 4px",
              }}
            >
              {/* Score */}
              <div>
                <div
                  style={{
                    color: "rgba(255,160,80,0.45)",
                    fontSize: 10,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  SCORE
                </div>
                <div
                  style={{
                    color: "rgba(255,200,120,0.9)",
                    fontSize: 28,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {score}
                </div>
              </div>

              {/* Combo */}
              {combo > 1 && (
                <div
                  key={combo}
                  style={{
                    animation: "comboPopIn 0.3s ease-out",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      color:
                        combo >= 5
                          ? "rgba(255,100,40,0.95)"
                          : "rgba(255,180,80,0.8)",
                      fontSize: combo >= 5 ? 22 : 18,
                      fontWeight: 700,
                      textShadow:
                        combo >= 5
                          ? "0 0 15px rgba(255,100,30,0.4)"
                          : "none",
                    }}
                  >
                    x{combo} combo!
                  </div>
                </div>
              )}

              {/* Timer */}
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    color: "rgba(255,160,80,0.45)",
                    fontSize: 10,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  TIME
                </div>
                <div
                  style={{
                    color: timerColor,
                    fontSize: 28,
                    fontWeight: 700,
                    lineHeight: 1,
                    animation:
                      timeLeft <= 5
                        ? "urgentPulse 0.5s ease-in-out infinite"
                        : "none",
                  }}
                >
                  {timeLeft}s
                </div>
              </div>
            </div>

            {/* Timer bar */}
            <div
              style={{
                height: 3,
                borderRadius: 2,
                background: "rgba(255,150,70,0.1)",
                marginBottom: 16,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(timeLeft / GAME_DURATION) * 100}%`,
                  borderRadius: 2,
                  background:
                    timeLeft <= 5
                      ? "linear-gradient(90deg, rgba(255,80,40,0.8), rgba(255,120,60,0.6))"
                      : timeLeft <= 10
                      ? "linear-gradient(90deg, rgba(255,160,60,0.7), rgba(255,200,80,0.5))"
                      : "linear-gradient(90deg, rgba(255,160,70,0.5), rgba(255,200,100,0.4))",
                  transition: "width 1s linear",
                }}
              />
            </div>

            {/* Game area - Bacons (upper) */}
            <div
              style={{
                position: "relative",
                width: "100%",
                flex: 1,
                minHeight: 260,
              }}
            >
              {/* Bacon zone label */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  color: "rgba(255,160,80,0.2)",
                  fontSize: 10,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {selectedBacon !== null
                  ? "✨ Now tap a pancake below! ✨"
                  : "Tap a bacon strip"}
              </div>

              {/* Bacon strips */}
              {bacons.map((bacon) => {
                const isSelected = selectedBacon === bacon.id;
                return (
                  <div
                    key={bacon.id}
                    onClick={(e) => handleBaconTap(bacon.id, e)}
                    style={{
                      position: "absolute",
                      left: `${bacon.x}%`,
                      top: `${bacon.y}%`,
                      "--rot": `${bacon.rotation}deg`,
                      width: 56,
                      height: 28,
                      cursor: "pointer",
                      zIndex: isSelected ? 20 : 5,
                      animation: isSelected
                        ? "baconSelected 0.8s ease-in-out infinite"
                        : "baconPulseReady 1.5s ease-in-out infinite",
                      transition: "filter 0.2s",
                      filter: isSelected
                        ? "brightness(1.3)"
                        : "brightness(1)",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 14,
                        background: isSelected
                          ? "linear-gradient(135deg, #d4553a, #c44830, #b83c26, #d4553a, #c44830)"
                          : "linear-gradient(135deg, #c44830, #a83a24, #922e1c, #c44830, #a83a24)",
                        backgroundSize: "200% 100%",
                        boxShadow: isSelected
                          ? "inset 0 2px 4px rgba(255,200,150,0.3), inset 0 -2px 3px rgba(0,0,0,0.3)"
                          : "inset 0 2px 4px rgba(255,180,120,0.2), inset 0 -2px 3px rgba(0,0,0,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                      }}
                    >
                      🥓
                    </div>
                  </div>
                );
              })}

              {/* Divider line */}
              <div
                style={{
                  position: "absolute",
                  bottom: 90,
                  left: "10%",
                  right: "10%",
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,150,70,0.15), transparent)",
                }}
              />

              {/* Pancakes (bottom area) */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                  gap: 10,
                  padding: "0 4px",
                }}
              >
                {pancakes.map((pancake) => {
                  const isFlashing = pancakeFlashes[pancake.id];
                  const isTarget = selectedBacon !== null;
                  return (
                    <div
                      key={pancake.id}
                      onClick={(e) => handlePancakeTap(pancake.id, e)}
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        background: isFlashing
                          ? "radial-gradient(circle at 40% 35%, #f0b840, #d4962a, #c48420)"
                          : "radial-gradient(circle at 40% 35%, #e0a235, #c48420, #a87018)",
                        boxShadow: isFlashing
                          ? "0 0 20px rgba(255,180,50,0.5), 0 0 40px rgba(255,140,30,0.2), 0 4px 12px rgba(0,0,0,0.3)"
                          : "0 4px 15px rgba(0,0,0,0.3), inset 0 -3px 6px rgba(0,0,0,0.15), inset 0 3px 6px rgba(255,200,120,0.15)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: isTarget ? "pointer" : "default",
                        transition: "box-shadow 0.3s ease, transform 0.2s ease",
                        animation:
                          isTarget && !isFlashing
                            ? "pancakeWaiting 0.8s ease-in-out infinite"
                            : isFlashing
                            ? "pancakeFlash 0.4s ease-out"
                            : "none",
                        transform: isTarget ? "scale(1.05)" : "scale(1)",
                        position: "relative",
                      }}
                    >
                      <span style={{ fontSize: 24 }}>🥞</span>
                      {pancake.baconCount > 0 && (
                        <div
                          style={{
                            position: "absolute",
                            top: -4,
                            right: -4,
                            background:
                              "linear-gradient(135deg, rgba(255,140,50,0.9), rgba(220,100,20,0.9))",
                            color: "white",
                            fontSize: 11,
                            fontWeight: 700,
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow:
                              "0 2px 6px rgba(0,0,0,0.3)",
                          }}
                        >
                          {pancake.baconCount}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hint */}
            <p
              style={{
                textAlign: "center",
                color: "rgba(255,160,80,0.3)",
                fontSize: 12,
                marginTop: 12,
              }}
            >
              {selectedBacon !== null
                ? "Tap a pancake to serve the bacon!"
                : "Tap a sizzling bacon strip to grab it"}
            </p>
          </div>
        )}

        {/* FINISHED STATE */}
        {gameState === "finished" && (
          <div
            style={{
              textAlign: "center",
              animation: "fadeInUp 0.8s ease-out",
              flex: 1,
            }}
          >
            {/* Rating */}
            {(() => {
              const rating = getRating();
              return (
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontSize: 56,
                      marginBottom: 8,
                      filter: `drop-shadow(0 0 15px ${rating.color}40)`,
                    }}
                  >
                    {rating.emoji}
                  </div>
                  <h2
                    style={{
                      fontSize: 28,
                      color: rating.color,
                      margin: 0,
                      textShadow: `0 0 20px ${rating.color}30`,
                    }}
                  >
                    {rating.title}
                  </h2>
                </div>
              );
            })()}

            {/* Score card */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,160,70,0.08) 0%, rgba(255,120,40,0.04) 100%)",
                border: "1px solid rgba(255,160,70,0.15)",
                borderRadius: 20,
                padding: "24px 20px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      color: "rgba(255,200,120,0.9)",
                      fontSize: 30,
                      fontWeight: 700,
                    }}
                  >
                    {score}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,160,80,0.45)",
                      fontSize: 10,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    Points
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      color: "rgba(255,200,120,0.9)",
                      fontSize: 30,
                      fontWeight: 700,
                    }}
                  >
                    x{bestCombo}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,160,80,0.45)",
                      fontSize: 10,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    Best Combo
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      color: "rgba(255,200,120,0.9)",
                      fontSize: 30,
                      fontWeight: 700,
                    }}
                  >
                    {missedBacons}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,160,80,0.45)",
                      fontSize: 10,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    Missed
                  </div>
                </div>
              </div>

              {/* Pancake breakdown */}
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: "1px solid rgba(255,160,70,0.1)",
                  display: "flex",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                {pancakes.map((p) => (
                  <div key={p.id} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 28 }}>🥞</div>
                    <div
                      style={{
                        color: "rgba(255,200,120,0.7)",
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      {p.baconCount}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizzle fact */}
            <div
              style={{
                background: "rgba(255,160,70,0.05)",
                border: "1px solid rgba(255,160,70,0.1)",
                borderRadius: 14,
                padding: "14px 18px",
                marginBottom: 24,
              }}
            >
              <p
                style={{
                  color: "rgba(255,160,80,0.4)",
                  fontSize: 10,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                🥓 Sizzle Fact
              </p>
              <p
                style={{
                  color: "rgba(255,200,130,0.7)",
                  fontSize: 13,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {sizzleFact}
              </p>
            </div>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              <button
                onClick={() => setShowShareModal(true)}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,140,50,0.3) 0%, rgba(255,100,20,0.2) 100%)",
                  border: "1px solid rgba(255,160,70,0.35)",
                  color: "rgba(255,200,130,0.95)",
                  padding: "10px 28px",
                  borderRadius: 30,
                  fontSize: 14,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 0 15px rgba(255,130,40,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow =
                    "0 0 25px rgba(255,130,40,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow =
                    "0 0 15px rgba(255,130,40,0.1)";
                }}
              >
                🔥 Share Results
              </button>
              <button
                onClick={startGame}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,160,70,0.2)",
                  color: "rgba(255,160,80,0.5)",
                  padding: "10px 28px",
                  borderRadius: 30,
                  fontSize: 14,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "rgba(255,160,70,0.4)";
                  e.target.style.color = "rgba(255,160,80,0.8)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(255,160,70,0.2)";
                  e.target.style.color = "rgba(255,160,80,0.5)";
                }}
              >
                Sizzle Again
              </button>
            </div>

            {/* Family link */}
            <div style={{ marginTop: 8 }}>
              <p
                style={{
                  color: "rgba(255,160,80,0.25)",
                  fontSize: 12,
                }}
              >
                A sizzling moment from the{" "}
                <span style={{ color: "rgba(255,160,80,0.45)" }}>
                  Letter Griddle Family
                </span>
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 16,
                  marginTop: 6,
                  fontSize: 11,
                }}
              >
                <span style={{ color: "rgba(255,160,80,0.3)" }}>
                  🥞 lettergriddle.com
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: 32,
            paddingBottom: 16,
          }}
        >
          <p
            style={{
              color: "rgba(255,160,80,0.13)",
              fontSize: 10,
            }}
          >
            © {new Date().getFullYear()} Letter Griddle. All rights reserved.
            {" | "}
            <a
              href="/privacy"
              style={{
                color: "rgba(255,160,80,0.2)",
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              Privacy Policy
            </a>
            {" | "}
            <a
              href="/terms"
              style={{
                color: "rgba(255,160,80,0.2)",
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>

      {/* How to Play Modal */}
      {showHowToPlay && (
        <div
          onClick={() => setShowHowToPlay(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
            padding: 16,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(145deg, #2e1a10, #1a0e06)",
              border: "1px solid rgba(255,160,70,0.2)",
              borderRadius: 24,
              padding: "28px 24px",
              maxWidth: 420,
              width: "100%",
              position: "relative",
              boxShadow: "0 0 40px rgba(255,130,40,0.1)",
              animation: "fadeInUp 0.4s ease-out",
              maxHeight: "85vh",
              overflowY: "auto",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowHowToPlay(false)}
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: "none",
                border: "none",
                color: "rgba(255,160,80,0.4)",
                fontSize: 20,
                cursor: "pointer",
                padding: 4,
                lineHeight: 1,
              }}
            >
              ✕
            </button>

            <h2
              style={{
                textAlign: "center",
                color: "rgba(255,190,110,0.9)",
                fontSize: 24,
                marginBottom: 24,
              }}
            >
              How to Play 🥓
            </h2>

            {/* Steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Step 1 */}
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(255,140,50,0.15)",
                    border: "1px solid rgba(255,160,70,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  🥓
                </div>
                <div>
                  <p
                    style={{
                      color: "rgba(255,200,130,0.9)",
                      fontSize: 15,
                      fontWeight: 700,
                      margin: "0 0 4px 0",
                    }}
                  >
                    Grab the Bacon
                  </p>
                  <p
                    style={{
                      color: "rgba(255,180,110,0.55)",
                      fontSize: 13,
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    Bacon strips appear and sizzle on the griddle. Tap one to grab it before it disappears!
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(255,140,50,0.15)",
                    border: "1px solid rgba(255,160,70,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  🥞
                </div>
                <div>
                  <p
                    style={{
                      color: "rgba(255,200,130,0.9)",
                      fontSize: 15,
                      fontWeight: 700,
                      margin: "0 0 4px 0",
                    }}
                  >
                    Serve It Up
                  </p>
                  <p
                    style={{
                      color: "rgba(255,180,110,0.55)",
                      fontSize: 13,
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    With a bacon strip selected, tap any pancake at the bottom to serve it. Each pancake can hold multiple strips!
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(255,140,50,0.15)",
                    border: "1px solid rgba(255,160,70,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  🔥
                </div>
                <div>
                  <p
                    style={{
                      color: "rgba(255,200,130,0.9)",
                      fontSize: 15,
                      fontWeight: 700,
                      margin: "0 0 4px 0",
                    }}
                  >
                    Build Your Combo
                  </p>
                  <p
                    style={{
                      color: "rgba(255,180,110,0.55)",
                      fontSize: 13,
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    Serve strips back-to-back to build a combo multiplier, up to x5 points per strip! Miss a bacon and your combo resets.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(255,140,50,0.15)",
                    border: "1px solid rgba(255,160,70,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  ⏱️
                </div>
                <div>
                  <p
                    style={{
                      color: "rgba(255,200,130,0.9)",
                      fontSize: 15,
                      fontWeight: 700,
                      margin: "0 0 4px 0",
                    }}
                  >
                    Beat the Clock
                  </p>
                  <p
                    style={{
                      color: "rgba(255,180,110,0.55)",
                      fontSize: 13,
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    You have {GAME_DURATION} seconds! Serve as many strips as you can before time runs out.
                  </p>
                </div>
              </div>
            </div>

            {/* Ratings preview */}
            <div
              style={{
                marginTop: 22,
                paddingTop: 18,
                borderTop: "1px solid rgba(255,160,70,0.1)",
              }}
            >
              <p
                style={{
                  color: "rgba(255,160,80,0.4)",
                  fontSize: 10,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  textAlign: "center",
                  marginBottom: 12,
                }}
              >
                Sizzle Ratings
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                {[
                  { emoji: "🥞", title: "Pancake Apprentice", range: "0–19" },
                  { emoji: "🍳", title: "Short Order Cook", range: "20–39" },
                  { emoji: "🥓", title: "Bacon Boss", range: "40–59" },
                  { emoji: "🔥", title: "Sizzle Master", range: "60+" },
                ].map((r, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,140,50,0.06)",
                      border: "1px solid rgba(255,160,70,0.08)",
                      borderRadius: 10,
                      padding: "8px 10px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{r.emoji}</span>
                    <div>
                      <div
                        style={{
                          color: "rgba(255,200,130,0.8)",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {r.title}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,160,80,0.4)",
                          fontSize: 10,
                        }}
                      >
                        {r.range} pts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Got it button */}
            <button
              onClick={() => setShowHowToPlay(false)}
              style={{
                display: "block",
                margin: "22px auto 0",
                background:
                  "linear-gradient(135deg, rgba(255,140,50,0.3) 0%, rgba(255,100,20,0.2) 100%)",
                border: "1px solid rgba(255,160,70,0.35)",
                color: "rgba(255,200,130,0.95)",
                padding: "10px 40px",
                borderRadius: 30,
                fontSize: 15,
                fontFamily: "inherit",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow =
                  "0 0 20px rgba(255,130,40,0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "none";
              }}
            >
              Let's Sizzle! 🔥
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div
          onClick={() => setShowShareModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
            padding: 16,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(145deg, #2e1a10, #1a0e06)",
              border: "1px solid rgba(255,160,70,0.2)",
              borderRadius: 24,
              padding: 32,
              maxWidth: 420,
              width: "100%",
              position: "relative",
              boxShadow: "0 0 40px rgba(255,130,40,0.1)",
              animation: "fadeInUp 0.4s ease-out",
            }}
          >
            <button
              onClick={() => setShowShareModal(false)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "none",
                color: "rgba(255,160,80,0.4)",
                fontSize: 20,
                cursor: "pointer",
                padding: 4,
                lineHeight: 1,
              }}
            >
              ✕
            </button>

            <h2
              style={{
                textAlign: "center",
                color: "rgba(255,190,110,0.9)",
                fontSize: 24,
                marginBottom: 20,
              }}
            >
              Share Your Sizzle 🥓
            </h2>

            <div
              style={{
                background: "rgba(255,160,70,0.06)",
                border: "1px solid rgba(255,160,70,0.12)",
                borderRadius: 16,
                padding: 20,
                marginBottom: 20,
                fontFamily: "monospace",
                fontSize: 13,
                lineHeight: 1.7,
                color: "rgba(255,190,120,0.7)",
                whiteSpace: "pre-wrap",
              }}
            >
              {`🥓 Letter Griddle Sizzle 🥓\n${getRating().emoji} ${getRating().title}\nScore: ${score} points | Best combo: x${bestCombo}\n${score} strips served in ${GAME_DURATION}s!\nPlay at www.lettergriddle.com/sizzle\n\nMore from the Letter Griddle Family:\n🥞 lettergriddle.com`}
            </div>

            <button
              onClick={handleShare}
              style={{
                width: "100%",
                background: shareCopied
                  ? "linear-gradient(135deg, rgba(76,175,80,0.3), rgba(56,142,60,0.25))"
                  : "linear-gradient(135deg, rgba(255,140,50,0.3) 0%, rgba(255,100,20,0.2) 100%)",
                border: shareCopied
                  ? "1px solid rgba(76,175,80,0.4)"
                  : "1px solid rgba(255,160,70,0.35)",
                color: shareCopied
                  ? "rgba(200,255,200,0.9)"
                  : "rgba(255,200,130,0.95)",
                padding: "14px 24px",
                borderRadius: 30,
                fontSize: 16,
                fontFamily: "inherit",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {shareCopied ? "✓ Copied!" : "Copy to Clipboard"}
            </button>

            <p
              style={{
                textAlign: "center",
                color: "rgba(255,160,80,0.3)",
                fontSize: 12,
                marginTop: 16,
              }}
            >
              Challenge a friend to outsizzle you! 🔥
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
