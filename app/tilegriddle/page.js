"use client";
import React, { useState, useEffect, useRef } from 'react';

const TileGriddle = () => {
  // SVG Avatar Components matching Griddle Falls exactly
  const AvatarSVGs = () => (
    <svg style={{ display: 'none' }}>
      {/* Laurel - Cafe owner with long straight thick hair */}
      <symbol id="avatar-laurel" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#d4a574"/>
        {/* Long straight thick hair - behind */}
        <path d="M20 35 L20 85 Q20 90 30 90 L30 40 Q30 20 50 18 Q70 20 70 40 L70 90 Q80 90 80 85 L80 35 Q80 10 50 10 Q20 10 20 35 Z" fill="#3d2314"/>
        {/* Face */}
        <circle cx="50" cy="42" r="22" fill="#f5deb3"/>
        {/* Hair front pieces */}
        <path d="M28 30 Q28 18 50 16 Q72 18 72 30 L72 42 Q72 25 50 23 Q28 25 28 42 Z" fill="#3d2314"/>
        {/* Side hair strands */}
        <path d="M28 40 L25 70" stroke="#3d2314" strokeWidth="8" strokeLinecap="round"/>
        <path d="M72 40 L75 70" stroke="#3d2314" strokeWidth="8" strokeLinecap="round"/>
        {/* Eyes */}
        <circle cx="42" cy="40" r="3" fill="#3d2e1f"/>
        <circle cx="58" cy="40" r="3" fill="#3d2e1f"/>
        {/* Smile */}
        <path d="M42 50 Q50 57 58 50" stroke="#3d2e1f" strokeWidth="2" fill="none"/>
        {/* Apron hint */}
        <path d="M35 75 L35 95 L65 95 L65 75" fill="#f5e6d3"/>
        <rect x="45" y="78" width="10" height="8" fill="#d4a574" rx="2"/>
      </symbol>

      {/* Sarah - Caring older sister type with glasses */}
      <symbol id="avatar-sarah" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#b8956a"/>
        <circle cx="50" cy="40" r="22" fill="#ffe4c4"/>
        <ellipse cx="50" cy="85" rx="30" ry="20" fill="#6b8e23"/>
        {/* Hair - longer */}
        <path d="M25 40 Q25 10 50 10 Q75 10 75 40 L78 55 Q78 60 72 55 L72 40 Q72 15 50 15 Q28 15 28 40 L28 55 Q22 60 22 55 Z" fill="#8b4513"/>
        {/* Eyes - warm */}
        <circle cx="42" cy="38" r="3" fill="#3d2e1f"/>
        <circle cx="58" cy="38" r="3" fill="#3d2e1f"/>
        {/* Gentle smile */}
        <path d="M40 48 Q50 56 60 48" stroke="#3d2e1f" strokeWidth="2" fill="none"/>
        {/* Glasses */}
        <circle cx="42" cy="38" r="8" stroke="#d4a574" strokeWidth="2" fill="none"/>
        <circle cx="58" cy="38" r="8" stroke="#d4a574" strokeWidth="2" fill="none"/>
        <line x1="50" y1="38" x2="50" y2="38" stroke="#d4a574" strokeWidth="2"/>
      </symbol>

      {/* Taylor B - TV enthusiast */}
      <symbol id="avatar-taylor" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#a89080"/>
        <circle cx="50" cy="40" r="22" fill="#deb887"/>
        <ellipse cx="50" cy="85" rx="30" ry="20" fill="#4169e1"/>
        {/* Short hair */}
        <path d="M30 35 Q30 12 50 12 Q70 12 70 35 L68 28 Q68 18 50 18 Q32 18 32 28 Z" fill="#2f1f0f"/>
        {/* Eyes - excited */}
        <circle cx="42" cy="38" r="4" fill="#3d2e1f"/>
        <circle cx="58" cy="38" r="4" fill="#3d2e1f"/>
        {/* Sparkle in eye */}
        <circle cx="43" cy="37" r="1" fill="white"/>
        <circle cx="59" cy="37" r="1" fill="white"/>
        {/* Big smile */}
        <path d="M38 48 Q50 60 62 48" stroke="#3d2e1f" strokeWidth="2" fill="none"/>
      </symbol>

      {/* Mr. Lindsay - Friendly dog groomer */}
      <symbol id="avatar-mr-lindsay" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#c9b896"/>
        <circle cx="50" cy="40" r="22" fill="#f5deb3"/>
        <ellipse cx="50" cy="85" rx="30" ry="20" fill="#2e8b57"/>
        {/* Balding with sides */}
        <path d="M28 38 Q28 30 35 30 L35 35 Q32 35 32 38 Z" fill="#808080"/>
        <path d="M72 38 Q72 30 65 30 L65 35 Q68 35 68 38 Z" fill="#808080"/>
        {/* Eyes - kind */}
        <circle cx="42" cy="38" r="3" fill="#3d2e1f"/>
        <circle cx="58" cy="38" r="3" fill="#3d2e1f"/>
        {/* Mustache */}
        <path d="M40 50 Q50 55 60 50 Q50 52 40 50" fill="#808080"/>
        {/* Smile */}
        <path d="M42 55 Q50 60 58 55" stroke="#3d2e1f" strokeWidth="2" fill="none"/>
      </symbol>
    </svg>
  );

  // Avatar component that uses the SVG symbols
  const Avatar = ({ characterId, size = 48 }) => (
    <svg width={size} height={size} style={{ borderRadius: '50%', overflow: 'hidden' }}>
      <use href={`#avatar-${characterId}`} />
    </svg>
  );

  // Trivia Crew opponents with their SVG avatar IDs
  const opponents = {
    laurel: {
      name: 'Laurel',
      avatarId: 'laurel',
      description: 'Cafe owner & trivia host',
      winMessage: "Great game! Come back to the cafe anytime! ☕",
      loseMessage: "You beat me fair and square! 🎉"
    },
    mrlindsay: {
      name: 'Mr. Lindsay',
      avatarId: 'mr-lindsay',
      description: 'Friendly regular',
      winMessage: "Brilliant! Simply brilliant! I knew I had it!",
      loseMessage: "Well played! You've got sharp instincts!"
    },
    sarah: {
      name: 'Sarah',
      avatarId: 'sarah',
      description: 'Encouraging and wise',
      winMessage: "That was so fun! You're getting better every game!",
      loseMessage: "I knew you could do it! Same time next Sunday? 💚"
    },
    taylorb: {
      name: 'Taylor B.',
      avatarId: 'taylor',
      description: 'Smart and helpful',
      winMessage: "Nice game! Wanna grab some coffee after?",
      loseMessage: "Dude, you crushed it! Respect! 🤙"
    }
  };

  // Emoji themes (keeping the same themes)
  const themes = {
    pancakes: {
      name: 'Pancakes & Breakfast',
      emojis: ['🥞', '🧇', '🥓', '🍳', '🧈', '🍯', '☕'],
      confetti: ['🥞', '🧇', '🥓', '🍳', '🧈', '🍯', '☕', '🫐', '🍓']
    },
    sweets: {
      name: 'Sweet Treats',
      emojis: ['🍭', '🍬', '🍫', '🍩', '🧁', '🍪', '🍰'],
      confetti: ['🍭', '🍬', '🍫', '🍩', '🧁', '🍪', '🍰', '🎂', '🍦']
    },
    movies: {
      name: 'Movies',
      emojis: ['🎬', '🎥', '🍿', '🎭', '⭐', '🎪', '🏆'],
      confetti: ['🎬', '🎥', '🍿', '🎭', '⭐', '🏆', '🎞️', '📽️']
    }
  };

  // Game states
  const [gamePhase, setGamePhase] = useState('theme-select'); // 'theme-select', 'playing', 'game-over'
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [tiles, setTiles] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [opponentHand, setOpponentHand] = useState([]);
  const [chain, setChain] = useState([]);
  const [boneyard, setBoneyard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('player');
  const [message, setMessage] = useState('');
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedTile, setSelectedTile] = useState(null);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [debugInfo, setDebugInfo] = useState(''); // Debug info for computer turn
  const [canPass, setCanPass] = useState(false); // Player can pass after drawing a playable tile
  const gameOverRef = useRef(false);
  const currentYear = new Date().getFullYear();

  // Stats tracking with localStorage
  const [stats, setStats] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tileGriddleStats');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return { wins: 0, losses: 0, ties: 0 };
  });

  // Save stats to localStorage whenever they change
  const updateStats = (result) => {
    const newStats = { ...stats };
    if (result === 'win') newStats.wins++;
    else if (result === 'loss') newStats.losses++;
    else if (result === 'tie') newStats.ties++;
    setStats(newStats);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tileGriddleStats', JSON.stringify(newStats));
    }
  };

  // Track stats when game ends
  const statsTrackedRef = useRef(false);
  useEffect(() => {
    if (winner && !statsTrackedRef.current) {
      statsTrackedRef.current = true;
      if (winner === 'player') {
        updateStats('win');
      } else if (winner === 'opponent') {
        updateStats('loss');
      } else if (winner === 'tie') {
        updateStats('tie');
      }
    }
    // Reset ref when game restarts
    if (!winner) {
      statsTrackedRef.current = false;
    }
  }, [winner]);

  // Generate all tiles for a theme (double-six style: 28 tiles)
  const generateTiles = (themeEmojis) => {
    const tiles = [];
    for (let i = 0; i < themeEmojis.length; i++) {
      for (let j = i; j < themeEmojis.length; j++) {
        tiles.push({
          id: `${i}-${j}`,
          left: themeEmojis[i],
          right: themeEmojis[j],
          isDouble: i === j
        });
      }
    }
    return tiles;
  };

  // Shuffle array
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Start game with selected theme
  const startGame = (themeKey) => {
    const theme = themes[themeKey];
    const allTiles = shuffleArray(generateTiles(theme.emojis));
    
    const player = allTiles.slice(0, 5);
    const opponent = allTiles.slice(5, 10);
    const remaining = allTiles.slice(10);

    setSelectedTheme(themeKey);
    setTiles(allTiles);
    setPlayerHand(player);
    setOpponentHand(opponent);
    setBoneyard(remaining);
    setChain([]);
    setCurrentPlayer('player');
    setWinner(null);
    setSelectedTile(null);
    setShowConfetti(false);
    setShowGameOverModal(false);
    setShareCopied(false);
    gameOverRef.current = false;
    setGamePhase('playing');
    setMessage('Start by playing a double tile, or draw from the griddle!');
  };

  // Get opponent display name
  const getOpponentName = () => {
    if (!selectedOpponent) return 'Opponent';
    return opponents[selectedOpponent].name;
  };

  // Check if tile can be played
  const canPlayTile = (tile, chainEnds) => {
    if (chain.length === 0) {
      return tile.isDouble;
    }
    const { leftEnd, rightEnd } = chainEnds;
    return tile.left === leftEnd || tile.right === leftEnd || 
           tile.left === rightEnd || tile.right === rightEnd;
  };

  // Get chain ends
  const getChainEnds = () => {
    if (chain.length === 0) return { leftEnd: null, rightEnd: null };
    const leftEnd = chain[0].displayLeft;
    const rightEnd = chain[chain.length - 1].displayRight;
    return { leftEnd, rightEnd };
  };

  // Play a tile
  const playTile = (tile, hand, setHand, player) => {
    if (gameOverRef.current) return false;
    
    const chainEnds = getChainEnds();
    
    if (chain.length === 0) {
      if (!tile.isDouble) {
        if (player === 'player') {
          setMessage('First tile must be a double!');
        }
        return false;
      }
      setChain([{ ...tile, displayLeft: tile.left, displayRight: tile.right }]);
      setHand(hand.filter(t => t.id !== tile.id));
      
      // Check for win
      const newHand = hand.filter(t => t.id !== tile.id);
      if (newHand.length === 0) {
        gameOverRef.current = true;
        const opponentData = opponents[selectedOpponent];
        if (player === 'player') {
          setWinner('player');
          setMessage(`You win! ${opponentData.loseMessage}`);
          triggerConfetti();
          showGameOverWithDelay(1500, true); // Extra delay to savor confetti!
        } else {
          setWinner('opponent');
          setMessage(`${getOpponentName()} wins! ${opponentData.winMessage}`);
          showGameOverWithDelay(1500, false);
        }
        return true;  // Game ended
      }
      return false;  // Game continues - NOT true!
    }

    const { leftEnd, rightEnd } = chainEnds;
    let newChain = [...chain];
    let played = false;

    if (tile.left === leftEnd) {
      newChain.unshift({ ...tile, displayLeft: tile.right, displayRight: tile.left });
      played = true;
    } else if (tile.right === leftEnd) {
      newChain.unshift({ ...tile, displayLeft: tile.left, displayRight: tile.right });
      played = true;
    } else if (tile.left === rightEnd) {
      newChain.push({ ...tile, displayLeft: tile.left, displayRight: tile.right });
      played = true;
    } else if (tile.right === rightEnd) {
      newChain.push({ ...tile, displayLeft: tile.right, displayRight: tile.left });
      played = true;
    }

    if (played) {
      setChain(newChain);
      setHand(hand.filter(t => t.id !== tile.id));
      
      // Check for win
      const newHand = hand.filter(t => t.id !== tile.id);
      if (newHand.length === 0) {
        gameOverRef.current = true;
        const opponentData = opponents[selectedOpponent];
        if (player === 'player') {
          setWinner('player');
          setMessage(`You win! ${opponentData.loseMessage}`);
          triggerConfetti();
          showGameOverWithDelay(1500, true); // Extra delay to savor confetti!
        } else {
          setWinner('opponent');
          setMessage(`${getOpponentName()} wins! ${opponentData.winMessage}`);
          showGameOverWithDelay(1500, false);
        }
        return true;
      }
    }
    // Return false if game continues (tile was played but no winner)
    // Return false if tile couldn't be played
    // Only return true above when game actually ended
    return false;
  };

  // Check if any tile in hand can be played
  const hasPlayableTile = (hand) => {
    const chainEnds = getChainEnds();
    return hand.some(tile => canPlayTile(tile, chainEnds));
  };

  // Handle player tile click
  const handleTileClick = (tile) => {
    if (currentPlayer !== 'player' || winner || gameOverRef.current) return;
    
    if (selectedTile?.id === tile.id) {
      // Clicking selected tile again deselects it
      setSelectedTile(null);
    } else {
      // Select the tile - player will then click an end to place it
      setSelectedTile(tile);
      
      // Check if this is the first tile (must be double)
      if (chain.length === 0) {
        if (tile.isDouble) {
          setMessage('Click to place your starting tile!');
        } else {
          setMessage('First tile must be a double!');
        }
      } else {
        // Check which ends this tile can match
        const { leftEnd, rightEnd } = getChainEnds();
        const canMatchLeft = tile.left === leftEnd || tile.right === leftEnd;
        const canMatchRight = tile.left === rightEnd || tile.right === rightEnd;
        
        if (canMatchLeft && canMatchRight) {
          setMessage('Click LEFT or RIGHT end to place your tile!');
        } else if (canMatchLeft) {
          setMessage('Click the LEFT end to place your tile!');
        } else if (canMatchRight) {
          setMessage('Click the RIGHT end to place your tile!');
        } else {
          setMessage("That tile doesn't match either end!");
        }
      }
    }
  };

  // Handle clicking on chain end to place tile
  const handlePlaceAtEnd = (end) => {
    if (!selectedTile || currentPlayer !== 'player' || winner || gameOverRef.current) return;
    
    const { leftEnd, rightEnd } = getChainEnds();
    let newChain = [...chain];
    let canPlace = false;
    
    // First tile (chain is empty)
    if (chain.length === 0) {
      if (selectedTile.isDouble) {
        newChain = [{ ...selectedTile, displayLeft: selectedTile.left, displayRight: selectedTile.right }];
        canPlace = true;
      }
    } else if (end === 'left') {
      // Place at left end
      if (selectedTile.left === leftEnd) {
        newChain = [{ ...selectedTile, displayLeft: selectedTile.right, displayRight: selectedTile.left }, ...chain];
        canPlace = true;
      } else if (selectedTile.right === leftEnd) {
        newChain = [{ ...selectedTile, displayLeft: selectedTile.left, displayRight: selectedTile.right }, ...chain];
        canPlace = true;
      }
    } else if (end === 'right') {
      // Place at right end
      if (selectedTile.left === rightEnd) {
        newChain = [...chain, { ...selectedTile, displayLeft: selectedTile.left, displayRight: selectedTile.right }];
        canPlace = true;
      } else if (selectedTile.right === rightEnd) {
        newChain = [...chain, { ...selectedTile, displayLeft: selectedTile.right, displayRight: selectedTile.left }];
        canPlace = true;
      }
    }
    
    if (canPlace) {
      setChain(newChain);
      const newPlayerHand = playerHand.filter(t => t.id !== selectedTile.id);
      setPlayerHand(newPlayerHand);
      setSelectedTile(null);
      setCanPass(false);
      
      // Check for win
      if (newPlayerHand.length === 0) {
        gameOverRef.current = true;
        const opponentData = opponents[selectedOpponent];
        setWinner('player');
        setMessage(`You win! ${opponentData.loseMessage}`);
        triggerConfetti();
        showGameOverWithDelay(1500, true); // Extra delay to savor the confetti!
      } else {
        setMessage(`${getOpponentName()}'s turn...`);
        setCurrentPlayer('opponent');
      }
    }
  };

  // Handle draw button - player draws ONE tile
  const handleDraw = () => {
    if (currentPlayer !== 'player' || winner || gameOverRef.current) return;
    
    if (hasPlayableTile(playerHand)) {
      setMessage('You have a playable tile! Play it instead.');
      return;
    }
    
    if (boneyard.length > 0) {
      const newBoneyard = [...boneyard];
      const drawnTile = newBoneyard.pop();
      const newPlayerHand = [...playerHand, drawnTile];
      setBoneyard(newBoneyard);
      setPlayerHand(newPlayerHand);
      
      // Always show Pass button - let player decide
      setCanPass(true);
      
      // Don't tell them if it's playable - let them figure it out!
      setMessage(`You drew ${drawnTile.left}|${drawnTile.right}`);
    } else {
      // No tiles to draw - show pass button
      setCanPass(true);
      setMessage(`No tiles to draw.`);
    }
  };

  // Handle pass button - player chooses to pass after drawing a playable tile
  const handlePass = () => {
    if (currentPlayer !== 'player' || winner || gameOverRef.current) return;
    setCanPass(false);
    setMessage(`You passed. ${getOpponentName()}'s turn.`);
    setCurrentPlayer('opponent');
  };

  // Handle when player must pass with empty boneyard - check for blocked game
  const handleForcedPass = () => {
    if (currentPlayer !== 'player' || winner || gameOverRef.current) return;
    
    const opponentName = getOpponentName();
    
    // Check if opponent can play
    const chainEnds = getChainEnds();
    const opponentCanPlay = opponentHand.some(t => 
      t.left === chainEnds.leftEnd || t.right === chainEnds.leftEnd ||
      t.left === chainEnds.rightEnd || t.right === chainEnds.rightEnd
    );
    
    if (!opponentCanPlay) {
      // Both players stuck - game is blocked!
      gameOverRef.current = true;
      const opponentData = opponents[selectedOpponent];
      
      if (playerHand.length < opponentHand.length) {
        setWinner('player');
        triggerConfetti();
        setMessage(`Game blocked! You win with fewer tiles! ${opponentData.loseMessage}`);
        showGameOverWithDelay(1500, true);
      } else if (opponentHand.length < playerHand.length) {
        setWinner('opponent');
        setMessage(`Game blocked! ${opponentName} wins with fewer tiles! ${opponentData.winMessage}`);
        showGameOverWithDelay(1500);
      } else {
        setWinner('tie');
        setMessage("Game blocked! It's a tie!");
        showGameOverWithDelay(1500);
      }
    } else {
      // Opponent can still play, pass turn to them
      setMessage(`You can't play. ${opponentName}'s turn.`);
      setCurrentPlayer('opponent');
    }
  };

  // Trigger confetti
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  // Show game over modal with delay so player can see final move
  // Use longer delay for player wins to savor the confetti!
  const showGameOverWithDelay = (delay = 1500, isPlayerWin = false) => {
    const actualDelay = isPlayerWin ? 2500 : delay; // Extra time to enjoy confetti
    setTimeout(() => {
      setShowGameOverModal(true);
    }, actualDelay);
  };

  // Handle share results
  const handleShare = async () => {
    const theme = themes[selectedTheme];
    
    const shareText = `🥞 Tile Griddle
At the Letter Griddle

🧇 Theme: ${theme.name}
${winner === 'player' ? '🏆 I won!' : ''}
Play at lettergriddle.com/tilegriddle
🥞 More games at lettergriddle.com`;

    // Try native sharing first (works on mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Tile Griddle Results',
          text: shareText
        });
      } catch (err) {
        // User cancelled or share failed, fall back to clipboard
        if (err.name !== 'AbortError') {
          await navigator.clipboard.writeText(shareText);
          setShareCopied(true);
          setTimeout(() => setShareCopied(false), 2000);
        }
      }
    } else {
      // Fallback to clipboard for desktop
      await navigator.clipboard.writeText(shareText);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  // Computer turn effect - runs when it becomes opponent's turn
  useEffect(() => {
    // Only run when it's opponent's turn during active gameplay
    if (currentPlayer !== 'opponent') return;
    if (winner) return;
    if (gamePhase !== 'playing') return;
    if (gameOverRef.current) return;

    const opponentName = opponents[selectedOpponent]?.name || 'Opponent';
    setDebugInfo('Computer thinking...');
    setMessage(`${opponentName} is thinking...`);

    // Step 1: Check if computer can play from hand (after delay)
    const thinkingTimeout = setTimeout(() => {
      if (gameOverRef.current) return;
      
      // Calculate chain ends
      let leftEnd = null;
      let rightEnd = null;
      if (chain.length > 0) {
        leftEnd = chain[0].displayLeft;
        rightEnd = chain[chain.length - 1].displayRight;
      }
      
      // Check which tiles can be played
      const canPlay = (tile) => {
        if (chain.length === 0) return tile.isDouble;
        return tile.left === leftEnd || tile.right === leftEnd ||
               tile.left === rightEnd || tile.right === rightEnd;
      };
      
      const playableTiles = opponentHand.filter(canPlay);
      setDebugInfo(`Found ${playableTiles.length} playable tiles`);

      if (playableTiles.length > 0) {
        // Computer can play a tile from hand
        const randomTile = playableTiles[Math.floor(Math.random() * playableTiles.length)];
        
        // Play the tile
        let newChain = [...chain];
        if (chain.length === 0) {
          newChain = [{ ...randomTile, displayLeft: randomTile.left, displayRight: randomTile.right }];
        } else {
          if (randomTile.left === leftEnd) {
            newChain = [{ ...randomTile, displayLeft: randomTile.right, displayRight: randomTile.left }, ...chain];
          } else if (randomTile.right === leftEnd) {
            newChain = [{ ...randomTile, displayLeft: randomTile.left, displayRight: randomTile.right }, ...chain];
          } else if (randomTile.left === rightEnd) {
            newChain = [...chain, { ...randomTile, displayLeft: randomTile.left, displayRight: randomTile.right }];
          } else if (randomTile.right === rightEnd) {
            newChain = [...chain, { ...randomTile, displayLeft: randomTile.right, displayRight: randomTile.left }];
          }
        }
        
        const newOpponentHand = opponentHand.filter(t => t.id !== randomTile.id);
        setChain(newChain);
        setOpponentHand(newOpponentHand);
        
        // Check for win
        if (newOpponentHand.length === 0) {
          gameOverRef.current = true;
          const opponentData = opponents[selectedOpponent];
          setWinner('opponent');
          setMessage(`${opponentName} wins! ${opponentData.winMessage}`);
          showGameOverWithDelay(1500); // Delay so player can see final move
        } else {
          setMessage(`${opponentName} played ${randomTile.left}|${randomTile.right}. Your turn!`);
          setCurrentPlayer('player');
        }
      } else if (boneyard.length > 0) {
        // Computer needs to draw ONE tile
        setMessage(`${opponentName} can't play. Drawing a tile...`);
        
        // Delay before drawing
        setTimeout(() => {
          if (gameOverRef.current) return;
          
          const newBoneyard = [...boneyard];
          const drawnTile = newBoneyard.pop();
          const newOpponentHand = [...opponentHand, drawnTile];
          
          setBoneyard(newBoneyard);
          setOpponentHand(newOpponentHand);
          
          // Recalculate chain ends (in case they changed)
          let currentLeftEnd = null;
          let currentRightEnd = null;
          if (chain.length > 0) {
            currentLeftEnd = chain[0].displayLeft;
            currentRightEnd = chain[chain.length - 1].displayRight;
          }
          
          // Check if drawn tile can be played
          const drawnCanPlay = drawnTile.left === currentLeftEnd || drawnTile.right === currentLeftEnd ||
                               drawnTile.left === currentRightEnd || drawnTile.right === currentRightEnd;
          
          if (drawnCanPlay) {
            // Play the drawn tile after another delay
            setMessage(`${opponentName} drew a tile and can play it!`);
            
            setTimeout(() => {
              if (gameOverRef.current) return;
              
              let newChain = [...chain];
              if (drawnTile.left === currentLeftEnd) {
                newChain = [{ ...drawnTile, displayLeft: drawnTile.right, displayRight: drawnTile.left }, ...chain];
              } else if (drawnTile.right === currentLeftEnd) {
                newChain = [{ ...drawnTile, displayLeft: drawnTile.left, displayRight: drawnTile.right }, ...chain];
              } else if (drawnTile.left === currentRightEnd) {
                newChain = [...chain, { ...drawnTile, displayLeft: drawnTile.left, displayRight: drawnTile.right }];
              } else if (drawnTile.right === currentRightEnd) {
                newChain = [...chain, { ...drawnTile, displayLeft: drawnTile.right, displayRight: drawnTile.left }];
              }
              
              const finalOpponentHand = newOpponentHand.filter(t => t.id !== drawnTile.id);
              setChain(newChain);
              setOpponentHand(finalOpponentHand);
              
              // Check for win
              if (finalOpponentHand.length === 0) {
                gameOverRef.current = true;
                const opponentData = opponents[selectedOpponent];
                setWinner('opponent');
                setMessage(`${opponentName} wins! ${opponentData.winMessage}`);
                showGameOverWithDelay(1500); // Delay so player can see final move
              } else {
                setMessage(`${opponentName} played ${drawnTile.left}|${drawnTile.right}. Your turn!`);
                setCurrentPlayer('player');
              }
            }, 2000); // Delay before playing drawn tile - give player time to see
          } else {
            // Can't play drawn tile - pass
            setMessage(`${opponentName} drew a tile but can't play. ${opponentName} passes. Your turn!`);
            setCurrentPlayer('player');
            
            // Check for blocked game
            const playerCanPlay = playerHand.some(t => 
              t.left === currentLeftEnd || t.right === currentLeftEnd ||
              t.left === currentRightEnd || t.right === currentRightEnd
            );
            if (!playerCanPlay && newBoneyard.length === 0) {
              gameOverRef.current = true;
              const playerCount = playerHand.length;
              const opponentCount = newOpponentHand.length;
              const opponentData = opponents[selectedOpponent];
              if (playerCount < opponentCount) {
                setWinner('player');
                setMessage(`Game blocked! You win with fewer tiles! ${opponentData.loseMessage}`);
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 4000);
                showGameOverWithDelay(1500, true); // Extra delay for player win!
              } else if (opponentCount < playerCount) {
                setWinner('opponent');
                setMessage(`Game blocked! ${opponentName} wins with fewer tiles! ${opponentData.winMessage}`);
                showGameOverWithDelay(1500, false);
              } else {
                setWinner('tie');
                setMessage("Game blocked! It's a tie!");
                showGameOverWithDelay(1500, false);
              }
            }
          }
        }, 2000); // Delay before drawing - give player time to see
      } else {
        // No tiles to draw - opponent must pass
        setMessage(`${opponentName} can't play and no tiles to draw. ${opponentName} passes. Your turn!`);
        setCurrentPlayer('player');
        
        // Check for blocked game
        let currentLeftEnd = null;
        let currentRightEnd = null;
        if (chain.length > 0) {
          currentLeftEnd = chain[0].displayLeft;
          currentRightEnd = chain[chain.length - 1].displayRight;
        }
        const playerCanPlay = playerHand.some(t => 
          t.left === currentLeftEnd || t.right === currentLeftEnd ||
          t.left === currentRightEnd || t.right === currentRightEnd
        );
        if (!playerCanPlay) {
          gameOverRef.current = true;
          const playerCount = playerHand.length;
          const opponentCount = opponentHand.length;
          const opponentData = opponents[selectedOpponent];
          if (playerCount < opponentCount) {
            setWinner('player');
            setMessage(`Game blocked! You win with fewer tiles! ${opponentData.loseMessage}`);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4000);
            showGameOverWithDelay(1500, true); // Extra delay for player win!
          } else if (opponentCount < playerCount) {
            setWinner('opponent');
            setMessage(`Game blocked! ${opponentName} wins with fewer tiles! ${opponentData.winMessage}`);
            showGameOverWithDelay(1500, false);
          } else {
            setWinner('tie');
            setMessage("Game blocked! It's a tie!");
            showGameOverWithDelay(1500, false);
          }
        }
      }
    }, 2000); // Initial thinking delay - give player time to see

    return () => clearTimeout(thinkingTimeout);
  }, [currentPlayer, winner, gamePhase, opponentHand, boneyard, chain, playerHand, selectedOpponent]);

  // Render tile
  const renderTile = (tile, isPlayer = false, isSelected = false, faceDown = false) => {
    if (faceDown) {
      return (
        <div
          key={tile.id}
          className="flex items-center justify-center rounded-lg shadow-md"
          style={{
            width: '44px',
            height: '28px',
            background: 'linear-gradient(135deg, #d4a574 0%, #b8956a 100%)',
            border: '1px solid #8b5a2b'
          }}
        >
          <span style={{ fontSize: '14px' }}>🥞</span>
        </div>
      );
    }

    return (
      <div
        key={tile.id}
        onClick={() => isPlayer && handleTileClick(tile)}
        className={`flex items-center rounded-lg shadow-md transition-all ${
          isPlayer ? 'cursor-pointer hover:scale-105' : ''
        } ${isSelected ? 'ring-4 ring-amber-400 scale-110' : ''}`}
        style={{
          background: tile.isDouble 
            ? 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)'
            : 'linear-gradient(135deg, #fff8e7 0%, #f5e6d3 100%)',
          border: '2px solid #8b5a2b',
          padding: '8px 12px',
          minWidth: '90px',
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        <span style={{ fontSize: '30px' }}>{tile.displayLeft ?? tile.left}</span>
        <span style={{ margin: '0 6px', color: '#8b5a2b', fontWeight: 'bold', fontSize: '18px' }}>|</span>
        <span style={{ fontSize: '30px' }}>{tile.displayRight ?? tile.right}</span>
      </div>
    );
  };

  // Footer component
  const Footer = () => (
    <div style={{
      marginTop: '24px',
      paddingTop: '16px',
      borderTop: '1px solid rgba(139, 90, 43, 0.3)',
      textAlign: 'center',
      fontSize: '12px',
      color: '#8b5a2b'
    }}>
      <div style={{ marginBottom: '8px' }}>
        <a 
          href="https://lettergriddle.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#8b5a2b', textDecoration: 'none', marginRight: '16px' }}
        >
          🥞 Letter Griddle Games
        </a>
        <a 
          href="https://lettergriddle.com/privacy" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#a89080', textDecoration: 'none', marginRight: '16px' }}
        >
          Privacy
        </a>
        <a 
          href="https://lettergriddle.com/terms" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#a89080', textDecoration: 'none' }}
        >
          Terms
        </a>
      </div>
      <div style={{ color: '#a89080' }}>
        © {currentYear} Tile Griddle
      </div>
    </div>
  );

  // Theme selection screen (with opponent selection)
  if (gamePhase === 'theme-select') {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #C2632A 0%, #D4833A 25%, #E8A866 50%, #F5DEB3 80%, #FFFDF5 100%)',
          touchAction: 'manipulation',
          overscrollBehavior: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <AvatarSVGs />
        <div className="max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">🥞|🥞</div>
            <h1 className="text-3xl font-bold mb-1" style={{ color: '#FFFDF5', fontFamily: 'Georgia, serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              Tile Griddle
            </h1>
            <p className="text-sm" style={{ color: '#FFFDF5', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
              At the Letter Griddle
            </p>
          </div>

          <div className="rounded-2xl p-6 shadow-xl" style={{ 
            background: 'linear-gradient(135deg, #f5e6d3 0%, #ede0d0 100%)',
            border: '2px solid #d4a574'
          }}>

            {!selectedOpponent ? (
              <>
                <h2 className="text-xl font-bold text-center mb-4" style={{ color: '#8b5a2b', fontFamily: 'Georgia, serif' }}>
                  Choose Your Opponent
                </h2>
                <p className="text-center text-sm mb-4" style={{ color: '#5d4e3c' }}>
                  Play against a member of the Trivia Crew!
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(opponents).map(([key, opponent]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedOpponent(key)}
                      className="p-4 rounded-xl transition-all hover:scale-105 text-center"
                      style={{
                        background: 'rgba(212, 165, 116, 0.2)',
                        border: '2px solid rgba(212, 165, 116, 0.4)'
                      }}
                    >
                      <div className="flex justify-center mb-2">
                        <Avatar characterId={opponent.avatarId} size={56} />
                      </div>
                      <div className="font-bold" style={{ color: '#8b5a2b', fontSize: '14px' }}>
                        {opponent.name}
                      </div>
                      <div style={{ color: '#5d4e3c', fontSize: '11px' }}>
                        {opponent.description}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Show selected opponent */}
                <div className="flex items-center justify-between mb-4 p-3 rounded-xl" style={{
                  background: 'rgba(212, 165, 116, 0.2)',
                  border: '2px solid rgba(212, 165, 116, 0.4)'
                }}>
                  <div className="flex items-center gap-3">
                    <Avatar characterId={opponents[selectedOpponent].avatarId} size={48} />
                    <div>
                      <div className="font-bold" style={{ color: '#8b5a2b' }}>
                        vs {opponents[selectedOpponent].name}
                      </div>
                      <div style={{ color: '#5d4e3c', fontSize: '12px' }}>
                        {opponents[selectedOpponent].description}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedOpponent(null)}
                    className="text-sm px-3 py-1 rounded-full"
                    style={{ background: 'rgba(212, 165, 116, 0.3)', color: '#8b5a2b' }}
                  >
                    Change
                  </button>
                </div>

                {/* Step 2: Choose Theme */}
                <h2 className="text-xl font-bold text-center mb-4" style={{ color: '#8b5a2b', fontFamily: 'Georgia, serif' }}>
                  Pick Your Theme
                </h2>
                <div className="space-y-3">
                  {Object.entries(themes).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => startGame(key)}
                      className="w-full p-4 rounded-xl transition-all hover:scale-102"
                      style={{
                        background: 'linear-gradient(135deg, #d4a574 0%, #b8956a 100%)',
                        border: 'none',
                        boxShadow: '0 4px 15px rgba(212, 165, 116, 0.3)'
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex gap-1">
                          {theme.emojis.slice(0, 3).map((emoji, i) => (
                            <span key={i} style={{ fontSize: '20px' }}>{emoji}</span>
                          ))}
                        </div>
                        <span className="font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                          {theme.name}
                        </span>
                      </div>
                      {/* Show all theme emojis */}
                      <div className="flex justify-center gap-1 pt-2 border-t border-white/20">
                        {theme.emojis.map((emoji, i) => (
                          <span key={i} style={{ fontSize: '16px' }}>{emoji}</span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            <p className="text-center mt-4 text-xs" style={{ color: '#8b5a2b' }}>
              {!selectedOpponent 
                ? 'Choose an opponent, then pick a theme • Match tiles • Win the game'
                : 'Match emoji tiles • First to empty their hand wins!'
              }
            </p>

            <button
              onClick={() => setShowHelpModal(true)}
              className="w-full mt-3 py-2 rounded-xl font-medium transition-all hover:scale-102"
              style={{
                background: 'rgba(212, 165, 116, 0.3)',
                border: '1px solid rgba(212, 165, 116, 0.5)',
                color: '#8b5a2b'
              }}
            >
              How to Play
            </button>

            <Footer />
          </div>
        </div>

        {/* How to Play Modal - also on startup screen */}
        {showHelpModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowHelpModal(false)}
          >
            <div 
              className="rounded-2xl p-5 max-w-sm w-full shadow-2xl max-h-[85vh] overflow-y-auto" 
              style={{
                background: 'linear-gradient(135deg, #f5e6d3 0%, #ede0d0 100%)',
                border: '2px solid #d4a574'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🥞|🥞</div>
                <h2 className="text-xl font-bold" style={{ color: '#8b5a2b', fontFamily: 'Georgia, serif' }}>
                  How to Play
                </h2>
              </div>

              <div className="space-y-4 text-sm" style={{ color: '#5d4e3c' }}>
                <div className="p-3 rounded-xl" style={{ background: 'rgba(212, 165, 116, 0.2)' }}>
                  <div className="font-bold mb-1" style={{ color: '#8b5a2b' }}>🍳 Goal</div>
                  <p>Be the first to play all your tiles! If no one can play, fewest tiles wins.</p>
                </div>

                <div className="p-3 rounded-xl" style={{ background: 'rgba(212, 165, 116, 0.2)' }}>
                  <div className="font-bold mb-1" style={{ color: '#8b5a2b' }}>🧇 How to Play</div>
                  <div className="space-y-1">
                    <p><strong>Start:</strong> Play a double tile (matching emojis) to begin</p>
                    <p><strong>Match:</strong> Click a tile, then click where to place it</p>
                    <p><strong>Draw:</strong> Can't play? Draw from the Tile Griddle</p>
                    <p><strong>Pass:</strong> Drew but still can't play? Click Pass</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl" style={{ background: 'rgba(212, 165, 116, 0.2)' }}>
                  <div className="font-bold mb-1" style={{ color: '#8b5a2b' }}>🥣 Matching Rules</div>
                  <p>Match the emoji on your tile to an emoji at either end of the chain.</p>
                  <div className="flex items-center justify-center gap-2 mt-2 text-lg">
                    <span>🍪|🧇</span>
                    <span style={{ color: '#8b5a2b' }}>→</span>
                    <span>🧇|🍩</span>
                    <span style={{ color: '#5d8a5d' }}>✓</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl" style={{ background: 'rgba(212, 165, 116, 0.2)' }}>
                  <div className="font-bold mb-1" style={{ color: '#8b5a2b' }}>🍯 Tips</div>
                  <div className="space-y-1">
                    <p>🍪 Watch what your opponent plays</p>
                    <p>🍰 Save doubles for strategic moments</p>
                    <p>🥛 Pay attention to which emojis are running out</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowHelpModal(false)}
                className="w-full mt-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #d4a574 0%, #b8956a 100%)',
                  color: 'white'
                }}
              >
                Got it! 🥞
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main game screen
  const theme = themes[selectedTheme];
  const chainEnds = getChainEnds();

  return (
    <div className="min-h-screen p-4"
      style={{
        background: 'linear-gradient(180deg, #C2632A 0%, #D4833A 25%, #E8A866 50%, #F5DEB3 80%, #FFFDF5 100%)',
        touchAction: 'manipulation',
        overscrollBehavior: 'none',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <AvatarSVGs />
      
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                fontSize: '2rem',
                animation: `fall ${2 + Math.random() * 2}s linear forwards`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            >
              {theme.confetti[Math.floor(Math.random() * theme.confetti.length)]}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              setGamePhase('theme-select');
              setSelectedOpponent(null);
            }}
            className="text-sm px-3 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.2)', color: '#FFFDF5' }}
          >
            ← Menu
          </button>
          <div className="text-center flex-1">
            <div className="text-2xl mb-0">🥞|🥞</div>
            <h1 className="text-lg font-bold" style={{ color: '#FFFDF5', fontFamily: 'Georgia, serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              Tile Griddle
            </h1>
            <p className="text-xs" style={{ color: '#f5e6d3' }}>{theme.name}</p>
          </div>
          <button
            onClick={() => setShowHelpModal(true)}
            className="text-sm px-3 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.2)', color: '#FFFDF5' }}
          >
            ?
          </button>
        </div>

        {/* Theme Emojis Legend */}
        <div className="mb-3 py-2 px-3 rounded-xl text-center" style={{
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(4px)'
        }}>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs" style={{ color: '#FFFDF5', opacity: 0.8 }}>This game's tiles:</span>
            <div className="flex gap-1">
              {theme.emojis.map((emoji, i) => (
                <span key={i} style={{ fontSize: '16px' }}>{emoji}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Opponent's hand (face down) - compact */}
        <div className={`rounded-xl p-2 mb-2 ${opponentHand.length === 1 ? 'animate-pulse' : ''}`} style={{
          background: 'rgba(45, 36, 28, 0.8)',
          border: opponentHand.length === 1 ? '2px solid #fbbf24' : '1px solid rgba(212, 165, 116, 0.3)'
        }}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <Avatar characterId={opponents[selectedOpponent].avatarId} size={24} />
              <span className="text-xs font-medium" style={{ color: '#d4a574' }}>
                {getOpponentName()}
              </span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${opponentHand.length === 1 ? 'animate-bounce' : ''}`} style={{ 
              background: opponentHand.length === 1 ? '#fbbf24' : 'rgba(212, 165, 116, 0.2)', 
              color: opponentHand.length === 1 ? '#5d4e3c' : '#d4a574',
              fontWeight: opponentHand.length === 1 ? 'bold' : 'normal'
            }}>
              {opponentHand.length} {opponentHand.length === 1 ? 'tile! 👆' : 'tiles'}
            </span>
          </div>
          <div className="flex gap-1 flex-wrap justify-center">
            {opponentHand.map(tile => renderTile(tile, false, false, true))}
          </div>
        </div>

        {/* Message - right under opponent so you see their actions */}
        <div className="text-center p-3 rounded-xl mb-2" style={{
          background: 'rgba(45, 36, 28, 0.8)',
          border: '1px solid rgba(212, 165, 116, 0.3)'
        }}>
          <p style={{ 
            color: '#f5e6d3', 
            fontSize: '18px',
            lineHeight: '1.4'
          }}>{message}</p>
        </div>

        {/* Game chain */}
        <div className="rounded-xl p-3 mb-3" style={{
          background: 'linear-gradient(135deg, #8b5a2b 0%, #6b4423 100%)',
          border: '2px solid #d4a574',
          minHeight: '80px'
        }}>
          {/* Header with ends display */}
          <div className="flex items-center justify-center gap-2 mb-2">
            {chain.length === 0 ? (
              <span className="text-xs" style={{ color: '#d4a574' }}>Play a double to start!</span>
            ) : (
              <div className="flex items-center gap-2 py-1 px-3 rounded-lg" style={{ 
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <span className="text-xs" style={{ color: '#f5e6d3' }}>Match:</span>
                <span style={{ fontSize: '26px' }}>{chainEnds.leftEnd}</span>
                <span style={{ color: '#f5e6d3', fontSize: '11px' }}>← →</span>
                <span style={{ fontSize: '26px' }}>{chainEnds.rightEnd}</span>
              </div>
            )}
          </div>
          <div className="flex gap-2 flex-wrap justify-center items-center">
            {chain.length === 0 ? (
              // Empty chain - show placement spot for first tile
              selectedTile && selectedTile.isDouble ? (
                <button
                  onClick={() => handlePlaceAtEnd('center')}
                  className="flex items-center justify-center rounded-lg transition-all hover:scale-110"
                  style={{
                    width: '70px',
                    height: '44px',
                    background: 'rgba(212, 165, 116, 0.3)',
                    border: '3px dashed #d4a574',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ color: '#d4a574', fontSize: '20px' }}>+</span>
                </button>
              ) : (
                <div className="text-4xl opacity-30">🥞</div>
              )
            ) : (
              <>
                {/* LEFT placement spot */}
                {selectedTile && currentPlayer === 'player' && (
                  (selectedTile.left === chainEnds.leftEnd || selectedTile.right === chainEnds.leftEnd) && (
                    <button
                      onClick={() => handlePlaceAtEnd('left')}
                      className="flex items-center justify-center rounded-lg transition-all hover:scale-110 mr-2"
                      style={{
                        width: '60px',
                        height: '36px',
                        background: 'rgba(212, 165, 116, 0.3)',
                        border: '3px dashed #fbbf24',
                        cursor: 'pointer',
                        touchAction: 'manipulation',
                        WebkitTapHighlightColor: 'transparent'
                      }}
                    >
                      <span style={{ color: '#fbbf24', fontSize: '16px' }}>← +</span>
                    </button>
                  )
                )}
                
                {/* Chain tiles */}
                {chain.map((tile, index) => (
                  <div key={tile.id} className="flex items-center">
                    {renderTile(tile)}
                    {index < chain.length - 1 && (
                      <span style={{ margin: '0 2px', color: '#d4a574' }}>—</span>
                    )}
                  </div>
                ))}
                
                {/* RIGHT placement spot */}
                {selectedTile && currentPlayer === 'player' && (
                  (selectedTile.left === chainEnds.rightEnd || selectedTile.right === chainEnds.rightEnd) && (
                    <button
                      onClick={() => handlePlaceAtEnd('right')}
                      className="flex items-center justify-center rounded-lg transition-all hover:scale-110 ml-2"
                      style={{
                        width: '60px',
                        height: '36px',
                        background: 'rgba(212, 165, 116, 0.3)',
                        border: '3px dashed #fbbf24',
                        cursor: 'pointer',
                        touchAction: 'manipulation',
                        WebkitTapHighlightColor: 'transparent'
                      }}
                    >
                      <span style={{ color: '#fbbf24', fontSize: '16px' }}>+ →</span>
                    </button>
                  )
                )}
              </>
            )}
          </div>
        </div>

        {/* Boneyard / Griddle */}
        <div className="rounded-xl p-3 mb-3" style={{
          background: 'rgba(45, 36, 28, 0.6)',
          border: '1px solid rgba(212, 165, 116, 0.2)'
        }}>
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: '#d4a574' }}>
              🍳 Tile Griddle: {boneyard.length} tiles warming up
            </span>
            <div className="flex gap-2">
              {currentPlayer === 'player' && !winner && !hasPlayableTile(playerHand) && boneyard.length > 0 && !canPass && (
                <button
                  onClick={handleDraw}
                  className="px-4 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #d4a574 0%, #b8956a 100%)',
                    color: 'white'
                  }}
                >
                  Draw Tile
                </button>
              )}
              {currentPlayer === 'player' && !winner && canPass && (
                <button
                  onClick={handlePass}
                  className="px-4 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #8b5a2b 0%, #5d4e3c 100%)',
                    color: 'white'
                  }}
                >
                  Pass
                </button>
              )}
              {/* NEW: Button when player can't play and boneyard is empty */}
              {currentPlayer === 'player' && !winner && !hasPlayableTile(playerHand) && boneyard.length === 0 && !canPass && (
                <button
                  onClick={handleForcedPass}
                  className="px-4 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105 animate-pulse"
                  style={{
                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                    color: 'white'
                  }}
                >
                  Can't Play - Pass
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Player's hand */}
        <div className={`rounded-xl p-4 mb-3 ${playerHand.length === 1 ? 'animate-pulse' : ''}`} style={{
          background: 'linear-gradient(135deg, #f5e6d3 0%, #ede0d0 100%)',
          border: playerHand.length === 1 ? '3px solid #fbbf24' : '2px solid #d4a574'
        }}>
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold" style={{ color: '#8b5a2b' }}>
              Your Tiles
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${playerHand.length === 1 ? 'animate-bounce' : ''}`} style={{ 
              background: playerHand.length === 1 ? '#fbbf24' : '#d4a574', 
              color: playerHand.length === 1 ? '#5d4e3c' : 'white',
              fontWeight: playerHand.length === 1 ? 'bold' : 'normal'
            }}>
              {playerHand.length} {playerHand.length === 1 ? 'tile! 👆' : 'tiles'}
            </span>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            {playerHand.map(tile => renderTile(tile, true, selectedTile?.id === tile.id))}
          </div>
          <p className="text-center mt-3 text-xs" style={{ color: '#8b5a2b' }}>
            Select a tile, then click where to place it
          </p>
        </div>
      </div>

      {/* Game Over Modal */}
      {showGameOverModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowGameOverModal(false)}
        >
          <div 
            className="rounded-2xl p-6 max-w-sm w-full shadow-2xl" 
            style={{
              background: 'linear-gradient(135deg, #f5e6d3 0%, #ede0d0 100%)',
              border: '2px solid #d4a574'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Result emoji/avatar */}
            <div className="text-center mb-4">
              {winner === 'player' ? (
                <div className="text-6xl mb-2">🎉</div>
              ) : winner === 'tie' ? (
                <div className="text-6xl mb-2">🤝</div>
              ) : (
                <div className="flex justify-center mb-2">
                  <Avatar characterId={opponents[selectedOpponent].avatarId} size={80} />
                </div>
              )}
              
              <h2 className="text-2xl font-bold" style={{ color: '#8b5a2b', fontFamily: 'Georgia, serif' }}>
                {winner === 'player' ? 'You Won!' : winner === 'tie' ? "It's a Tie!" : `${getOpponentName()} Wins!`}
              </h2>
            </div>

            {/* Opponent message */}
            <div className="text-center p-3 rounded-xl mb-4" style={{
              background: 'rgba(212, 165, 116, 0.2)',
              border: '1px solid rgba(212, 165, 116, 0.3)'
            }}>
              <p style={{ color: '#5d4e3c', fontStyle: 'italic' }}>
                "{winner === 'player' 
                  ? opponents[selectedOpponent].loseMessage 
                  : winner === 'opponent'
                  ? opponents[selectedOpponent].winMessage
                  : "Great game! Let's play again!"
                }"
              </p>
            </div>

            {/* Game summary */}
            <div className="text-center text-sm mb-3" style={{ color: '#5d4e3c' }}>
              <p><strong>Theme:</strong> {theme.name}</p>
              <p><strong>Opponent:</strong> {getOpponentName()}</p>
              <p><strong>Tiles remaining:</strong> {winner === 'player' ? opponentHand.length : playerHand.length}</p>
            </div>

            {/* Your Stats */}
            <div className="flex justify-center gap-6 mb-3 p-2 rounded-lg" style={{
              background: 'rgba(212, 165, 116, 0.15)',
              border: '1px solid rgba(212, 165, 116, 0.3)'
            }}>
              <div className="text-center">
                <div className="font-bold text-lg" style={{ color: '#5d8a5d' }}>{stats.wins}</div>
                <div className="text-xs" style={{ color: '#5d4e3c' }}>Wins</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg" style={{ color: '#c45c5c' }}>{stats.losses}</div>
                <div className="text-xs" style={{ color: '#5d4e3c' }}>Losses</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg" style={{ color: '#8b5a2b' }}>{stats.ties}</div>
                <div className="text-xs" style={{ color: '#5d4e3c' }}>Ties</div>
              </div>
            </div>
            
            {/* Tip to see board */}
            <p className="text-center text-xs mb-4" style={{ color: '#8b5a2b' }}>
              Click outside to see the final board
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mb-3">
              <button
                onClick={handleShare}
                className="flex-1 py-3 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #5d8a5d 0%, #4a7a4a 100%)',
                  color: 'white'
                }}
              >
                {shareCopied ? '✓ Copied!' : 'Share Results'}
              </button>
              <button
                onClick={() => startGame(selectedTheme)}
                className="flex-1 py-3 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #d4a574 0%, #b8956a 100%)',
                  color: 'white'
                }}
              >
                Play Again
              </button>
            </div>

            <button
              onClick={() => {
                setShowGameOverModal(false);
                setGamePhase('theme-select');
                setSelectedOpponent(null);
              }}
              className="w-full text-sm underline"
              style={{ color: '#8b5a2b' }}
            >
              Change Opponent
            </button>
          </div>
        </div>
      )}

      {/* How to Play Modal */}
      {showHelpModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowHelpModal(false)}
        >
          <div 
            className="rounded-2xl p-5 max-w-sm w-full shadow-2xl max-h-[85vh] overflow-y-auto" 
            style={{
              background: 'linear-gradient(135deg, #f5e6d3 0%, #ede0d0 100%)',
              border: '2px solid #d4a574'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🥞|🥞</div>
              <h2 className="text-xl font-bold" style={{ color: '#8b5a2b', fontFamily: 'Georgia, serif' }}>
                How to Play
              </h2>
            </div>

            <div className="space-y-4 text-sm" style={{ color: '#5d4e3c' }}>
              <div className="p-3 rounded-xl" style={{ background: 'rgba(212, 165, 116, 0.2)' }}>
                <div className="font-bold mb-1" style={{ color: '#8b5a2b' }}>🍳 Goal</div>
                <p>Be the first to play all your tiles! If no one can play, fewest tiles wins.</p>
              </div>

              <div className="p-3 rounded-xl" style={{ background: 'rgba(212, 165, 116, 0.2)' }}>
                <div className="font-bold mb-1" style={{ color: '#8b5a2b' }}>🧇 How to Play</div>
                <div className="space-y-1">
                  <p><strong>Start:</strong> Play a double tile (matching emojis) to begin</p>
                  <p><strong>Match:</strong> Click a tile, then click where to place it</p>
                  <p><strong>Draw:</strong> Can't play? Draw from the Tile Griddle</p>
                  <p><strong>Pass:</strong> Drew but still can't play? Click Pass</p>
                </div>
              </div>

              <div className="p-3 rounded-xl" style={{ background: 'rgba(212, 165, 116, 0.2)' }}>
                <div className="font-bold mb-1" style={{ color: '#8b5a2b' }}>🥣 Matching Rules</div>
                <p>Match the emoji on your tile to an emoji at either end of the chain.</p>
                <div className="flex items-center justify-center gap-2 mt-2 text-lg">
                  <span>🍪|🧇</span>
                  <span style={{ color: '#8b5a2b' }}>→</span>
                  <span>🧇|🍩</span>
                  <span style={{ color: '#5d8a5d' }}>✓</span>
                </div>
              </div>

              <div className="p-3 rounded-xl" style={{ background: 'rgba(212, 165, 116, 0.2)' }}>
                <div className="font-bold mb-1" style={{ color: '#8b5a2b' }}>🍯 Tips</div>
                <div className="space-y-1">
                  <p>🍪 Watch what your opponent plays</p>
                  <p>🍰 Save doubles for strategic moments</p>
                  <p>🥛 Pay attention to which emojis are running out</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full mt-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #d4a574 0%, #b8956a 100%)',
                color: 'white'
              }}
            >
              Got it! 🥞
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TileGriddle;