"use client";
import { useState, useEffect, useCallback, useRef } from "react";

const activities = [
  { text: "Jot down three things you're grateful for today", icon: "📝" },
  { text: "Read a chapter in a book you've been meaning to finish", icon: "📖" },
  { text: "Clean out one drawer, just one!", icon: "🗄️" },
  { text: "Give yourself a genuine compliment", icon: "💛" },
  { text: "Go for a 10-minute walk outside", icon: "🚶" },
  { text: "Listen to your favorite song, all the way through", icon: "🎵" },
  { text: "Try a new recipe for dinner tonight", icon: "🍳" },
  { text: "Text someone you haven't talked to in a while", icon: "💬" },
  { text: "Stretch for five minutes, your body will thank you", icon: "🧘" },
  { text: "Write down a happy memory from this past week", icon: "✨" },
  { text: "Tidy up your desk or workspace", icon: "🧹" },
  { text: "Drink a full glass of water, slowly", icon: "💧" },
  { text: "Step outside and take three deep breaths", icon: "🌿" },
  { text: "Put on music and dance for one whole song", icon: "💃" },
  { text: "Light a candle and sit quietly for two minutes", icon: "🕯️" },
  { text: "Look through old photos that make you smile", icon: "📸" },
  { text: "Write a kind note to leave for someone", icon: "💌" },
  { text: "Organize your phone and delete 5 apps you don't use", icon: "📱" },
  { text: "Draw or doodle something, no matter how silly", icon: "🎨" },
  { text: "Make yourself a warm cup of tea or cocoa", icon: "☕" },
  { text: "Pick a room and find one thing to donate", icon: "🎁" },
  { text: "Write down one goal for this week", icon: "🎯" },
  { text: "Compliment a stranger or coworker today", icon: "😊" },
  { text: "Rearrange something small: a shelf, a vase, a photo", icon: "🖼️" },
  { text: "Put your phone down for 15 minutes and just be", icon: "🌙" },
];

const TOTAL_PANCAKES = 12;
const FLIPS_NEEDED = 8;
const GLOW_DURATION = 2800;
const GLOW_INTERVAL_MIN = 1200;
const GLOW_INTERVAL_MAX = 3200;

// Soft warm color palette for glowing
const glowColors = [
  "rgba(255, 183, 77, 0.9)",
  "rgba(255, 213, 79, 0.85)",
  "rgba(255, 167, 38, 0.85)",
  "rgba(255, 236, 179, 0.9)",
  "rgba(255, 202, 40, 0.88)",
];

export default function LetterGriddleGlow() {
  const [gameState, setGameState] = useState("idle"); // idle, playing, revealing, revealed
  const [pancakes, setPancakes] = useState([]);
  const [glowingIdx, setGlowingIdx] = useState(null);
  const [flipsCount, setFlipsCount] = useState(0);
  const [activity, setActivity] = useState(null);
  const [revealProgress, setRevealProgress] = useState(0);
  const [missedGlows, setMissedGlows] = useState(0);
  const [particles, setParticles] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const glowTimerRef = useRef(null);
  const glowTimeoutRef = useRef(null);
  const particleIdRef = useRef(0);
  const elapsedTimeRef = useRef(0);
  const startTimeRef = useRef(null);

  // Initialize pancakes in a scattered layout
  const initPancakes = useCallback(() => {
    const newPancakes = [];
    for (let i = 0; i < TOTAL_PANCAKES; i++) {
      newPancakes.push({
        id: i,
        flipped: false,
        x: 0,
        y: 0,
        rotation: Math.random() * 20 - 10,
        scale: 0.85 + Math.random() * 0.3,
        glowColor: glowColors[Math.floor(Math.random() * glowColors.length)],
      });
    }
    return newPancakes;
  }, []);

  // Pick today's activity deterministically
  const getTodaysActivity = useCallback(() => {
    const today = new Date();
    const dayIndex =
      (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) %
      activities.length;
    return activities[dayIndex];
  }, []);

  // Spawn glow on a random unflipped pancake
  const spawnGlow = useCallback(() => {
    setPancakes((prev) => {
      const unflipped = prev
        .map((p, i) => ({ ...p, idx: i }))
        .filter((p) => !p.flipped);
      if (unflipped.length === 0) return prev;
      const chosen = unflipped[Math.floor(Math.random() * unflipped.length)];
      setGlowingIdx(chosen.idx);
      return prev;
    });

    // Auto-expire glow
    glowTimeoutRef.current = setTimeout(() => {
      setGlowingIdx((curr) => {
        if (curr !== null) {
          setMissedGlows((m) => m + 1);
        }
        return null;
      });
    }, GLOW_DURATION);
  }, []);

  // Schedule next glow
  const scheduleNextGlow = useCallback(() => {
    const delay =
      GLOW_INTERVAL_MIN +
      Math.random() * (GLOW_INTERVAL_MAX - GLOW_INTERVAL_MIN);
    glowTimerRef.current = setTimeout(() => {
      spawnGlow();
      scheduleNextGlow();
    }, delay);
  }, [spawnGlow]);

  // Start game
  const startGame = useCallback(() => {
    const newPancakes = initPancakes();
    setPancakes(newPancakes);
    setFlipsCount(0);
    setMissedGlows(0);
    setGlowingIdx(null);
    setActivity(getTodaysActivity());
    setGameState("playing");
    setRevealProgress(0);
    setParticles([]);
    setShowShareModal(false);
    setShareCopied(false);
    startTimeRef.current = Date.now();

    setTimeout(() => {
      spawnGlow();
      scheduleNextGlow();
    }, 1500);
  }, [initPancakes, getTodaysActivity, spawnGlow, scheduleNextGlow]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      clearTimeout(glowTimerRef.current);
      clearTimeout(glowTimeoutRef.current);
    };
  }, []);

  // Add floating particle
  const addParticles = useCallback((x, y) => {
    const newParticles = [];
    for (let i = 0; i < 6; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x: x + (Math.random() - 0.5) * 60,
        y: y + (Math.random() - 0.5) * 60,
        emoji: ["✨", "🌟", "💫", "⭐"][Math.floor(Math.random() * 4)],
        dx: (Math.random() - 0.5) * 80,
        dy: -30 - Math.random() * 60,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id))
      );
    }, 1200);
  }, []);

  // Handle pancake tap
  const handlePancakeTap = useCallback(
    (idx, e) => {
      if (gameState !== "playing") return;
      if (idx !== glowingIdx) return;

      // Get position for particles
      const rect = e.currentTarget.getBoundingClientRect();
      addParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);

      clearTimeout(glowTimeoutRef.current);
      setGlowingIdx(null);

      setPancakes((prev) => {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], flipped: true };
        return updated;
      });

      const newFlips = flipsCount + 1;
      setFlipsCount(newFlips);
      setRevealProgress(Math.min(newFlips / FLIPS_NEEDED, 1));

      if (newFlips >= FLIPS_NEEDED) {
        clearTimeout(glowTimerRef.current);
        clearTimeout(glowTimeoutRef.current);
        elapsedTimeRef.current = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setGameState("revealing");
        setTimeout(() => setGameState("revealed"), 2000);
      }
    },
    [gameState, glowingIdx, flipsCount, addParticles]
  );

  // Progress bar width
  const progressPct = (flipsCount / FLIPS_NEEDED) * 100;

  // Format seconds to readable time
  const formatTime = (seconds) => {
    if (!seconds) return "";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  // Handle share
  const handleShare = () => {
    const timeStr = formatTime(elapsedTimeRef.current);
    const shareText = `✨ Letter Griddle Glow ✨\n🥞 Flipped ${flipsCount} pancakes in ${timeStr}\nToday's activity: ${activity.icon} ${activity.text}\nPlay at www.lettergriddle.com/glow\n\nMore from the Letter Griddle Family:\n🥞 lettergriddle.com`;

    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  // Grid positions for pancakes (4x3 grid with slight randomness)
  const getPancakeStyle = (idx) => {
    const col = idx % 4;
    const row = Math.floor(idx / 4);
    const baseX = col * 25 + 4;
    const baseY = row * 33 + 2;
    return {
      left: `${baseX + Math.sin(idx * 1.7) * 3}%`,
      top: `${baseY + Math.cos(idx * 2.3) * 3}%`,
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at 30% 20%, #2d1b0e 0%, #1a0f05 40%, #0d0803 100%)",
        fontFamily: "'Georgia', 'Palatino Linotype', serif",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Ambient background glow orbs */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,183,77,0.08) 0%, transparent 70%)",
            top: "10%",
            left: "5%",
            animation: "floatOrb1 12s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,213,79,0.06) 0%, transparent 70%)",
            top: "50%",
            right: "10%",
            animation: "floatOrb2 15s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 250,
            height: 250,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,167,38,0.05) 0%, transparent 70%)",
            bottom: "15%",
            left: "30%",
            animation: "floatOrb3 18s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 15px) scale(1.15); }
        }
        @keyframes floatOrb3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 25px) scale(1.05); }
        }
        @keyframes glowPulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(255,200,60,0.4), 0 0 40px rgba(255,180,40,0.2), 0 0 60px rgba(255,160,20,0.1);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(255,200,60,0.7), 0 0 60px rgba(255,180,40,0.4), 0 0 90px rgba(255,160,20,0.2);
            transform: scale(1.08);
          }
        }
        @keyframes flipUp {
          0% { transform: rotateX(0deg) scale(1); }
          50% { transform: rotateX(90deg) scale(0.9); }
          100% { transform: rotateX(0deg) scale(0.85); opacity: 0.4; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealGlow {
          0% { box-shadow: 0 0 0px rgba(255,200,60,0); }
          50% { box-shadow: 0 0 40px rgba(255,200,60,0.6), 0 0 80px rgba(255,180,40,0.3); }
          100% { box-shadow: 0 0 25px rgba(255,200,60,0.4), 0 0 50px rgba(255,180,40,0.15); }
        }
        @keyframes particleFloat {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.3); }
        }
        @keyframes subtleBreathe {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.7; }
        }
        @keyframes progressShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes enterPancake {
          from { opacity: 0; transform: scale(0.3) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "fixed",
            left: p.x,
            top: p.y,
            fontSize: 20,
            pointerEvents: "none",
            zIndex: 100,
            "--dx": `${p.dx}px`,
            "--dy": `${p.dy}px`,
            animation: "particleFloat 1.2s ease-out forwards",
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
          padding: "20px 16px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              fontSize: 14,
              letterSpacing: 4,
              color: "rgba(255,200,120,0.5)",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Letter Griddle
          </div>
          <h1
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: "rgba(255,220,140,0.9)",
              margin: 0,
              textShadow: "0 0 30px rgba(255,200,60,0.2)",
              letterSpacing: 2,
            }}
          >
            Glow
          </h1>
          <div
            style={{
              width: 60,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, rgba(255,200,100,0.4), transparent)",
              margin: "12px auto 0",
            }}
          />
        </div>

        {/* Idle state */}
        {gameState === "idle" && (
          <div
            style={{
              textAlign: "center",
              animation: "fadeInUp 0.8s ease-out",
            }}
          >
            <div
              style={{
                fontSize: 80,
                marginBottom: 24,
                filter: "drop-shadow(0 0 20px rgba(255,200,60,0.3))",
                animation: "subtleBreathe 3s ease-in-out infinite",
              }}
            >
              🥞
            </div>

            <p
              style={{
                color: "rgba(255,210,140,0.7)",
                fontSize: 16,
                lineHeight: 1.8,
                maxWidth: 340,
                margin: "0 auto 32px",
              }}
            >
              Pancakes are warming on the griddle.
              <br />
              When one starts to glow, tap it to flip!
              <br />
              <span style={{ opacity: 0.6, fontSize: 14 }}>
                Flip enough and something special awaits.
              </span>
            </p>

            <button
              onClick={startGame}
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,183,77,0.25) 0%, rgba(255,143,0,0.2) 100%)",
                border: "1px solid rgba(255,200,100,0.3)",
                color: "rgba(255,220,150,0.9)",
                padding: "14px 48px",
                borderRadius: 40,
                fontSize: 18,
                fontFamily: "inherit",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 0 20px rgba(255,180,60,0.1)",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow =
                  "0 0 30px rgba(255,180,60,0.25), 0 0 60px rgba(255,160,40,0.1)";
                e.target.style.background =
                  "linear-gradient(135deg, rgba(255,183,77,0.35) 0%, rgba(255,143,0,0.3) 100%)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow =
                  "0 0 20px rgba(255,180,60,0.1)";
                e.target.style.background =
                  "linear-gradient(135deg, rgba(255,183,77,0.25) 0%, rgba(255,143,0,0.2) 100%)";
              }}
            >
              Start Flipping
            </button>
          </div>
        )}

        {/* Playing state */}
        {(gameState === "playing" || gameState === "revealing") && (
          <div style={{ animation: "fadeInUp 0.6s ease-out" }}>
            {/* Progress bar */}
            <div style={{ marginBottom: 20, padding: "0 8px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    color: "rgba(255,200,120,0.5)",
                    fontSize: 12,
                    letterSpacing: 1,
                  }}
                >
                  FLIPPED
                </span>
                <span
                  style={{
                    color: "rgba(255,200,120,0.7)",
                    fontSize: 14,
                  }}
                >
                  {flipsCount} / {FLIPS_NEEDED}
                </span>
              </div>
              <div
                style={{
                  height: 4,
                  borderRadius: 2,
                  background: "rgba(255,200,100,0.1)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progressPct}%`,
                    borderRadius: 2,
                    background:
                      "linear-gradient(90deg, rgba(255,183,77,0.6), rgba(255,213,79,0.8), rgba(255,183,77,0.6))",
                    backgroundSize: "200% 100%",
                    animation:
                      progressPct > 0
                        ? "progressShimmer 2s linear infinite"
                        : "none",
                    transition: "width 0.5s ease-out",
                  }}
                />
              </div>
            </div>

            {/* Pancake grid */}
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "75%",
                marginBottom: 20,
              }}
            >
              {pancakes.map((p, idx) => {
                const isGlowing = glowingIdx === idx && !p.flipped;
                const pos = getPancakeStyle(idx);

                return (
                  <div
                    key={p.id}
                    onClick={(e) => handlePancakeTap(idx, e)}
                    style={{
                      position: "absolute",
                      ...pos,
                      width: "20%",
                      aspectRatio: "1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor:
                        isGlowing && gameState === "playing"
                          ? "pointer"
                          : "default",
                      transform: `rotate(${p.rotation}deg) scale(${p.scale})`,
                      animation: p.flipped
                        ? "flipUp 0.5s ease-out forwards"
                        : `enterPancake 0.5s ease-out ${idx * 0.08}s both`,
                      perspective: 200,
                      zIndex: isGlowing ? 10 : 1,
                      transition: "z-index 0.1s",
                    }}
                  >
                    {/* Glow ring */}
                    {isGlowing && (
                      <div
                        style={{
                          position: "absolute",
                          inset: -6,
                          borderRadius: "50%",
                          animation: "glowPulse 1.2s ease-in-out infinite",
                          pointerEvents: "none",
                        }}
                      />
                    )}

                    {/* Pancake */}
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        background: p.flipped
                          ? "radial-gradient(circle at 40% 35%, rgba(180,120,50,0.4) 0%, rgba(120,70,20,0.3) 100%)"
                          : "radial-gradient(circle at 40% 35%, #e6a740 0%, #c4842a 50%, #a06820 100%)",
                        boxShadow: isGlowing
                          ? `0 0 25px ${p.glowColor}, 0 0 50px rgba(255,180,40,0.3), inset 0 -3px 6px rgba(0,0,0,0.2)`
                          : p.flipped
                          ? "inset 0 2px 4px rgba(0,0,0,0.2)"
                          : "0 4px 12px rgba(0,0,0,0.4), inset 0 -3px 6px rgba(0,0,0,0.15), inset 0 3px 6px rgba(255,220,140,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: p.flipped ? 20 : 28,
                        transition:
                          "box-shadow 0.3s ease, background 0.3s ease",
                        opacity: p.flipped ? 0.35 : 1,
                      }}
                    >
                      {p.flipped ? "✓" : "🥞"}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hint text */}
            {gameState === "playing" && (
              <p
                style={{
                  textAlign: "center",
                  color: "rgba(255,200,120,0.4)",
                  fontSize: 13,
                  animation: "subtleBreathe 4s ease-in-out infinite",
                }}
              >
                {glowingIdx !== null
                  ? "A pancake is glowing, tap it!"
                  : "Watch for the glow..."}
              </p>
            )}

            {gameState === "revealing" && (
              <p
                style={{
                  textAlign: "center",
                  color: "rgba(255,220,140,0.8)",
                  fontSize: 16,
                  animation: "subtleBreathe 1.5s ease-in-out infinite",
                }}
              >
                ✨ Revealing your glow activity... ✨
              </p>
            )}
          </div>
        )}

        {/* Revealed state */}
        {gameState === "revealed" && activity && (
          <div
            style={{
              textAlign: "center",
              animation: "fadeInUp 1s ease-out",
            }}
          >
            {/* Activity card */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,200,100,0.08) 0%, rgba(255,170,60,0.04) 100%)",
                border: "1px solid rgba(255,200,100,0.15)",
                borderRadius: 24,
                padding: "40px 28px",
                marginBottom: 28,
                animation: "revealGlow 2s ease-out forwards",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative inner glow */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,200,80,0.08) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  fontSize: 48,
                  marginBottom: 20,
                  filter: "drop-shadow(0 0 15px rgba(255,200,60,0.3))",
                }}
              >
                {activity.icon}
              </div>

              <p
                style={{
                  color: "rgba(255,200,120,0.5)",
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Today's Glow Activity
              </p>

              <p
                style={{
                  color: "rgba(255,225,160,0.9)",
                  fontSize: 22,
                  lineHeight: 1.6,
                  maxWidth: 360,
                  margin: "0 auto",
                  textShadow: "0 0 20px rgba(255,200,60,0.15)",
                }}
              >
                {activity.text}
              </p>
            </div>

            {/* Cozy message */}
            <p
              style={{
                color: "rgba(255,200,120,0.4)",
                fontSize: 14,
                lineHeight: 1.7,
                marginBottom: 28,
              }}
            >
              You flipped {flipsCount} pancakes ✨
              <br />
              <span style={{ fontSize: 12, opacity: 0.7 }}>
                Now go make it glow!
              </span>
            </p>

            {/* Play again */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => setShowShareModal(true)}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,183,77,0.25) 0%, rgba(255,143,0,0.2) 100%)",
                  border: "1px solid rgba(255,200,100,0.3)",
                  color: "rgba(255,220,150,0.9)",
                  padding: "10px 28px",
                  borderRadius: 30,
                  fontSize: 14,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 0 15px rgba(255,180,60,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = "0 0 25px rgba(255,180,60,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = "0 0 15px rgba(255,180,60,0.1)";
                }}
              >
                ✨ Share Results
              </button>
              <button
                onClick={() => {
                  setGameState("idle");
                  setParticles([]);
                }}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,200,100,0.2)",
                  color: "rgba(255,200,120,0.5)",
                  padding: "10px 28px",
                  borderRadius: 30,
                  fontSize: 14,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "rgba(255,200,100,0.4)";
                  e.target.style.color = "rgba(255,200,120,0.8)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(255,200,100,0.2)";
                  e.target.style.color = "rgba(255,200,120,0.5)";
                }}
              >
                Flip Again
              </button>
            </div>

            {/* Link back */}
            <div style={{ marginTop: 24 }}>
              <p
                style={{
                  color: "rgba(255,200,120,0.3)",
                  fontSize: 12,
                }}
              >
                A cozy moment from the{" "}
                <span style={{ color: "rgba(255,200,120,0.5)" }}>
                  Letter Griddle Family
                </span>
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 16,
                  marginTop: 8,
                  fontSize: 11,
                }}
              >
                <a
                  href="/"
                  style={{
                    color: "rgba(255,200,120,0.35)",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => { e.target.style.color = "rgba(255,200,120,0.6)"; }}
                  onMouseLeave={(e) => { e.target.style.color = "rgba(255,200,120,0.35)"; }}
                >
                  🥞 More Games at lettergriddle.com
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: 40,
            paddingBottom: 20,
          }}
        >
          <p
            style={{
              color: "rgba(255,200,120,0.15)",
              fontSize: 10,
            }}
          >
            © {new Date().getFullYear()} Letter Griddle. All rights reserved.
            {" | "}
            <a
              href="/privacy"
              style={{
                color: "rgba(255,200,120,0.25)",
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
                color: "rgba(255,200,120,0.25)",
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>

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
              background: "linear-gradient(145deg, #2a1a0a, #1a0f05)",
              border: "1px solid rgba(255,200,100,0.2)",
              borderRadius: 24,
              padding: 32,
              maxWidth: 420,
              width: "100%",
              position: "relative",
              boxShadow: "0 0 40px rgba(255,180,60,0.1)",
              animation: "fadeInUp 0.4s ease-out",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowShareModal(false)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "none",
                color: "rgba(255,200,120,0.4)",
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
                color: "rgba(255,220,140,0.9)",
                fontSize: 24,
                marginBottom: 20,
              }}
            >
              Share Your Glow ✨
            </h2>

            {/* Share preview */}
            <div
              style={{
                background: "rgba(255,200,100,0.06)",
                border: "1px solid rgba(255,200,100,0.12)",
                borderRadius: 16,
                padding: 20,
                marginBottom: 20,
                fontFamily: "monospace",
                fontSize: 13,
                lineHeight: 1.7,
                color: "rgba(255,210,140,0.7)",
                whiteSpace: "pre-wrap",
              }}
            >
              {`✨ Letter Griddle Glow ✨\n🥞 Flipped ${flipsCount} pancakes in ${formatTime(elapsedTimeRef.current)}\nToday's activity: ${activity ? `${activity.icon} ${activity.text}` : ""}\nPlay at www.lettergriddle.com/glow\n\nMore from the Letter Griddle Family:\n🥞 lettergriddle.com`}
            </div>

            {/* Copy button */}
            <button
              onClick={handleShare}
              style={{
                width: "100%",
                background: shareCopied
                  ? "linear-gradient(135deg, rgba(76,175,80,0.3), rgba(56,142,60,0.25))"
                  : "linear-gradient(135deg, rgba(255,183,77,0.25) 0%, rgba(255,143,0,0.2) 100%)",
                border: shareCopied
                  ? "1px solid rgba(76,175,80,0.4)"
                  : "1px solid rgba(255,200,100,0.3)",
                color: shareCopied
                  ? "rgba(200,255,200,0.9)"
                  : "rgba(255,220,150,0.9)",
                padding: "14px 24px",
                borderRadius: 30,
                fontSize: 16,
                fontFamily: "inherit",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 0 15px rgba(255,180,60,0.1)",
              }}
            >
              {shareCopied ? "✓ Copied!" : "Copy to Clipboard"}
            </button>

            {/* Nudge */}
            <p
              style={{
                textAlign: "center",
                color: "rgba(255,200,120,0.35)",
                fontSize: 12,
                marginTop: 16,
              }}
            >
              Love the glow? Share it with a friend! 🥞
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
