"use client";
import React, { useState, useEffect, useCallback } from 'react';

// ============================================
// GRIDDLE STACKS - A Letter Griddle Word Game
// Premium Café au Lait Edition
// Warm, cozy glassmorphism for long game sessions
// ============================================

// Character Avatar Component
const CharacterAvatar = ({ character, size = 'md' }) => {
  const sizeClasses = { sm: 'w-10 h-10', md: 'w-14 h-14', lg: 'w-16 h-16' };
  
  const characters = {
    laurel: { skinTone: '#E8C4A0', hairColor: '#5D4037', hairStyle: 'long', shirtColor: '#D4A574', bgColor: '#C9A882' },
    mr_lindsay: { skinTone: '#F0DCC0', hairColor: '#B8B8B8', hairStyle: 'balding', shirtColor: '#4A7C6F', bgColor: '#A8B5A0' },
    sarah: { skinTone: '#E8C4A0', hairColor: '#6B4423', hairStyle: 'wavy', shirtColor: '#4A7C59', bgColor: '#C9A882' },
    taylor: { skinTone: '#C68642', hairColor: '#1C1108', hairStyle: 'short', shirtColor: '#4A6FA5', bgColor: '#A89080' },
  };
  
  const char = characters[character?.id] || characters.laurel;
  
  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden shadow-md`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="50" fill={char.bgColor} />
        {(char.hairStyle === 'long' || char.hairStyle === 'wavy') && (
          <ellipse cx="50" cy="50" rx="28" ry="32" fill={char.hairColor} />
        )}
        <ellipse cx="50" cy="88" rx="24" ry="18" fill={char.shirtColor} />
        <ellipse cx="50" cy="48" rx="20" ry="22" fill={char.skinTone} />
        {char.hairStyle === 'long' && (
          <>
            <rect x="22" y="35" width="12" height="35" rx="6" fill={char.hairColor} />
            <rect x="66" y="35" width="12" height="35" rx="6" fill={char.hairColor} />
            <ellipse cx="50" cy="32" rx="22" ry="12" fill={char.hairColor} />
          </>
        )}
        {char.hairStyle === 'short' && <ellipse cx="50" cy="32" rx="18" ry="10" fill={char.hairColor} />}
        {char.hairStyle === 'balding' && (
          <>
            <ellipse cx="28" cy="38" rx="8" ry="6" fill={char.hairColor} />
            <ellipse cx="72" cy="38" rx="8" ry="6" fill={char.hairColor} />
          </>
        )}
        {char.hairStyle === 'wavy' && (
          <>
            <ellipse cx="50" cy="30" rx="20" ry="10" fill={char.hairColor} />
            <rect x="24" y="32" width="10" height="25" rx="5" fill={char.hairColor} />
            <rect x="66" y="32" width="10" height="25" rx="5" fill={char.hairColor} />
          </>
        )}
        <circle cx="42" cy="48" r="2.5" fill="#4A3728" />
        <circle cx="58" cy="48" r="2.5" fill="#4A3728" />
        <path d="M 42 58 Q 50 64 58 58" stroke="#4A3728" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// Trivia Crew opponents
const TRIVIA_CREW = [
  { id: 'laurel', name: 'Laurel', description: 'Cafe owner',
    thinkingQuotes: ["Hmm, let me think...", "What word could I make?", "Interesting letters..."],
    playQuotes: ["Nice!", "Your turn!", "How about that?"] },
  { id: 'sarah', name: 'Sarah', description: 'Word enthusiast',
    thinkingQuotes: ["Interesting...", "Let me see...", "I have an idea..."],
    playQuotes: ["Good game!", "Beat that!", "Your move!"] },
  { id: 'taylor', name: 'Taylor B.', description: 'Strategist',
    thinkingQuotes: ["Calculating...", "Hmm...", "Let me think strategically..."],
    playQuotes: ["Ha!", "Top that!", "Nice try keeping up!"] },
  { id: 'mr_lindsay', name: 'Mr. Lindsay', description: 'Retired teacher',
    thinkingQuotes: ["Back in my day...", "Ah yes...", "Let me recall..."],
    playQuotes: ["Splendid!", "Your move!", "Educational!"] },
];

// Letter distribution
const LETTER_DISTRIBUTION = {
  'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2, 'I': 9,
  'J': 1, 'K': 1, 'L': 4, 'M': 2, 'N': 6, 'O': 8, 'P': 2, 'Q': 1, 'R': 6,
  'S': 4, 'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1
};

// AI word list
const AI_WORDS = ['AT','BE','DO','GO','HE','IF','IN','IS','IT','ME','MY','NO','OF','ON','OR','SO','TO','UP','US','WE','ACE','ACT','ADD','AGE','AGO','AID','AIM','AIR','ALL','AND','ANT','ANY','APE','ARC','ARE','ARK','ARM','ART','ASK','ATE','BAD','BAG','BAT','BED','BET','BIG','BIT','BOW','BOX','BOY','BUD','BUG','BUS','BUT','BUY','CAB','CAN','CAP','CAR','CAT','COP','COT','COW','CRY','CUB','CUD','CUP','CUT','DAD','DAM','DAY','DEN','DEW','DID','DIG','DIM','DIP','DOC','DOE','DOG','DOT','DRY','DUB','DUD','DUE','DUG','EAR','EAT','EEL','EGG','ELF','ELK','ELM','END','ERA','EVE','EWE','EYE','FAN','FAR','FAT','FAX','FED','FEE','FEW','FIG','FIN','FIT','FIX','FLY','FOB','FOE','FOG','FOR','FOX','FRY','FUN','FUR','GAP','GAS','GAY','GEL','GEM','GET','GIG','GIN','GNU','GOB','GOD','GOT','GUM','GUN','GUT','GUY','GYM','HAD','HAM','HAS','HAT','HAY','HEM','HEN','HER','HEW','HID','HIM','HIP','HIS','HIT','HOB','HOG','HOP','HOT','HOW','HUB','HUE','HUG','HUM','HUT','ICE','ICY','ILL','IMP','INK','INN','ION','IRE','IRK','ITS','IVY','JAB','JAG','JAM','JAR','JAW','JAY','JET','JIG','JOB','JOG','JOT','JOY','JUG','JUT','KEG','KEN','KEY','KID','KIN','KIT','LAB','LAC','LAD','LAG','LAP','LAW','LAY','LEA','LED','LEG','LET','LID','LIE','LIP','LIT','LOG','LOT','LOW','LUG','MAD','MAN','MAP','MAR','MAT','MAW','MAY','MEN','MET','MID','MIX','MOB','MOM','MOP','MOW','MUD','MUG','MUM','NAB','NAG','NAP','NAY','NET','NEW','NIL','NIP','NIT','NOD','NOR','NOT','NOW','NUB','NUN','NUT','OAK','OAR','OAT','ODD','ODE','OFF','OFT','OHM','OIL','OLD','ONE','OPT','ORB','ORE','OUR','OUT','OWE','OWL','OWN','PAD','PAL','PAN','PAT','PAW','PAY','PEA','PEG','PEN','PEP','PER','PET','PEW','PIE','PIG','PIN','PIT','PLY','POD','POP','POT','POW','PRY','PUB','PUN','PUP','PUS','PUT','RAG','RAM','RAN','RAP','RAT','RAW','RAY','RED','REF','RIB','RID','RIG','RIM','RIP','ROB','ROD','ROT','ROW','RUB','RUG','RUM','RUN','RUT','RYE','SAC','SAD','SAG','SAP','SAT','SAW','SAY','SEA','SET','SEW','SHE','SHY','SIN','SIP','SIR','SIS','SIT','SIX','SKI','SKY','SLY','SOB','SOD','SON','SOP','SOT','SOW','SOY','SPA','SPY','STY','SUB','SUM','SUN','SUP','TAB','TAD','TAG','TAN','TAP','TAR','TAT','TAX','TEA','TEN','THE','THY','TIC','TIE','TIN','TIP','TOE','TON','TOO','TOP','TOT','TOW','TOY','TRY','TUB','TUG','TWO','URN','USE','VAN','VAT','VET','VIA','VIE','VOW','WAD','WAG','WAR','WAS','WAX','WAY','WEB','WED','WET','WHO','WHY','WIG','WIN','WIT','WOE','WOK','WON','WOO','WOW','YAK','YAM','YAP','YAW','YEA','YES','YET','YEW','YOU','ZAP','ZED','ZEN','ZIP','ZIT','ZOO','ABLE','ACHE','AGED','ALSO','AREA','ARMY','AWAY','BABY','BACK','BAKE','BALL','BAND','BANK','BASE','BATH','BEAN','BEAR','BEAT','BEEN','BEER','BELL','BELT','BEST','BIRD','BITE','BLOW','BLUE','BOAT','BODY','BOIL','BOLD','BONE','BOOK','BOOT','BORN','BOSS','BOTH','BOWL','BURN','BUSY','CAFE','CAGE','CAKE','CALL','CALM','CAME','CAMP','CARD','CARE','CASE','CASH','CAST','CAVE','CHAT','CHIP','CITY','CLAP','CLAY','CLUB','COAL','COAT','CODE','COIN','COLD','COME','COOK','COOL','COPE','COPY','CORE','CORN','COST','CREW','CROP','CURE','CUTE','DALE','DAME','DAMP','DARE','DARK','DATA','DATE','DAWN','DAYS','DEAD','DEAL','DEAN','DEAR','DEBT','DECK','DEEP','DEER','DESK','DIAL','DIET','DIRT','DISH','DISK','DOES','DONE','DOOR','DOWN','DRAW','DREW','DROP','DRUG','DRUM','DUAL','DUCK','DULL','DUMP','DUST','DUTY','EACH','EARN','EASE','EAST','EASY','EDGE','ELSE','EVEN','EVER','EVIL','EXAM','EXIT','FACE','FACT','FADE','FAIL','FAIR','FAKE','FALL','FAME','FARM','FAST','FATE','FEAR','FEED','FEEL','FEET','FELL','FELT','FILE','FILL','FILM','FIND','FINE','FIRE','FIRM','FISH','FLAG','FLAT','FLEW','FLIP','FLOW','FOLK','FOOD','FOOL','FOOT','FORD','FORE','FORK','FORM','FORT','FOUL','FOUR','FREE','FROM','FUEL','FULL','FUND','GAIN','GAME','GATE','GAVE','GEAR','GENE','GIFT','GIRL','GIVE','GLAD','GLOW','GLUE','GOAL','GOAT','GOES','GOLD','GOLF','GONE','GOOD','GRAB','GRAY','GREW','GRIP','GROW','GULF','HAIR','HALF','HALL','HAND','HANG','HARD','HARM','HATE','HAVE','HEAD','HEAL','HEAR','HEAT','HEEL','HELD','HELL','HELP','HERE','HERO','HIDE','HIGH','HIKE','HILL','HINT','HIRE','HOLD','HOLE','HOME','HOPE','HOST','HOUR','HUNT','HURT','IDEA','INCH','INTO','IRON','ITEM','JACK','JAIL','JANE','JAZZ','JEAN','JOBS','JOHN','JOIN','JOKE','JUMP','JUNE','JURY','JUST','KEEN','KEEP','KEPT','KICK','KIDS','KILL','KIND','KING','KNEE','KNEW','KNOW','LACK','LADY','LAID','LAKE','LAMP','LAND','LANE','LAST','LATE','LAWN','LEAD','LEAF','LEAN','LEFT','LEND','LENS','LESS','LIED','LIFE','LIFT','LIKE','LINE','LINK','LIST','LIVE','LOAD','LOAN','LOCK','LOGO','LONG','LOOK','LORD','LOSE','LOSS','LOST','LOTS','LOUD','LOVE','LUCK','MADE','MAIL','MAIN','MAKE','MALE','MALL','MANY','MARK','MASS','MATE','MEAL','MEAN','MEAT','MEET','MENU','MERE','MESS','MICE','MIKE','MILD','MILE','MILK','MILL','MIND','MINE','MISS','MODE','MOOD','MOON','MORE','MOST','MOVE','MUCH','MUST','NAME','NAVY','NEAR','NEAT','NECK','NEED','NEWS','NEXT','NICE','NINE','NODE','NONE','NOON','NORM','NOSE','NOTE','OATH','OKAY','ONCE','ONLY','ONTO','OPEN','ORAL','OVEN','OVER','PACE','PACK','PAGE','PAID','PAIN','PAIR','PALE','PALM','PARK','PART','PASS','PAST','PATH','PEAK','PICK','PILE','PINE','PINK','PIPE','PLAN','PLAY','PLOT','PLUG','PLUS','POET','POLL','POND','POOL','POOR','POPE','PORT','POSE','POST','POUR','PRAY','PULL','PUMP','PURE','PUSH','QUIT','RACE','RAIL','RAIN','RANK','RARE','RATE','READ','REAL','REAR','RELY','RENT','REST','RICE','RICH','RIDE','RING','RISE','RISK','ROAD','ROCK','RODE','ROLE','ROLL','ROOF','ROOM','ROOT','ROPE','ROSE','RULE','RUSH','SAFE','SAID','SAKE','SALE','SALT','SAME','SAND','SANG','SAVE','SEAL','SEAT','SEED','SEEK','SEEM','SEEN','SELF','SELL','SEND','SENT','SEPT','SHED','SHIP','SHOP','SHOT','SHOW','SHUT','SICK','SIDE','SIGN','SILK','SITE','SIZE','SKIN','SLIP','SLOW','SNAP','SNOW','SOFT','SOIL','SOLD','SOLE','SOME','SONG','SOON','SORT','SOUL','SOUP','SPOT','STAR','STAY','STEM','STEP','STOP','SUCH','SUIT','SURE','SWIM','TAIL','TAKE','TALE','TALK','TALL','TANK','TAPE','TASK','TEAM','TEAR','TECH','TELL','TEND','TENT','TERM','TEST','TEXT','THAN','THAT','THEM','THEN','THEY','THIN','THIS','THUS','TIDE','TIED','TIER','TILE','TIME','TINY','TIRE','TOLD','TOLL','TONE','TOOK','TOOL','TOPS','TORE','TORN','TOUR','TOWN','TRAP','TRAY','TREE','TRIM','TRIP','TRUE','TUBE','TUNE','TURN','TWIN','TYPE','UNIT','UPON','USED','USER','VARY','VAST','VERY','VIEW','VINE','VOTE','WAGE','WAIT','WAKE','WALK','WALL','WANT','WARM','WARN','WASH','WAVE','WAYS','WEAK','WEAR','WEEK','WELL','WENT','WERE','WEST','WHAT','WHEN','WHOM','WIDE','WIFE','WILD','WILL','WIND','WINE','WING','WIRE','WISE','WISH','WITH','WOKE','WOLF','WOOD','WORD','WORE','WORK','WORM','WORN','WRAP','YARD','YEAH','YEAR','YOUR','ZERO','ZONE'];

// Official 2-letter Scrabble words
const TWO_LETTER_WORDS = new Set(['AA','AB','AD','AE','AG','AH','AI','AL','AM','AN','AR','AS','AT','AW','AX','AY','BA','BE','BI','BO','BY','DA','DE','DO','ED','EF','EH','EL','EM','EN','ER','ES','ET','EX','FA','FE','GI','GO','HA','HE','HI','HM','HO','ID','IF','IN','IS','IT','JO','KA','KI','LA','LI','LO','MA','ME','MI','MM','MO','MU','MY','NA','NE','NO','NU','OD','OE','OF','OH','OI','OK','OM','ON','OP','OR','OS','OU','OW','OX','OY','PA','PE','PI','PO','QI','RE','SH','SI','SO','TA','TI','TO','UH','UM','UN','UP','US','UT','WE','WO','XI','XU','YA','YE','YO','ZA']);

const VALID_WORDS = new Set([...TWO_LETTER_WORDS, ...AI_WORDS]);
const wordCache = new Map();

const validateWord = async (word) => {
  const upper = word.toUpperCase();
  if (wordCache.has(upper)) return wordCache.get(upper);
  if (VALID_WORDS.has(upper)) { wordCache.set(upper, true); return true; }
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
    const isValid = response.ok;
    wordCache.set(upper, isValid);
    return isValid;
  } catch (error) { wordCache.set(upper, false); return false; }
};

const isValidWordSync = (word) => VALID_WORDS.has(word.toUpperCase());

// Pancake Tile Component - Warm coffee tones
const PancakeTile = ({ letter, stackHeight = 1, size = 'md', selected = false, onClick, disabled = false, isNew = false }) => {
  const sizeClasses = { sm: 'w-7 h-7 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' };
  const stackLayers = Math.min(stackHeight, 5);
  return (
    <div className={`relative ${disabled ? 'opacity-50' : 'cursor-pointer'}`} onClick={disabled ? undefined : onClick}>
      {stackHeight > 1 && Array.from({ length: stackLayers - 1 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-amber-700 border border-amber-800"
          style={{ width: size === 'sm' ? '28px' : size === 'md' ? '40px' : '48px', height: size === 'sm' ? '28px' : size === 'md' ? '40px' : '48px', top: `${(stackLayers - 1 - i) * 3}px`, left: '0px', zIndex: i }} />
      ))}
      <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold relative transition-all duration-200
        ${selected ? 'bg-gradient-to-br from-amber-200 to-amber-400 ring-4 ring-amber-500 scale-110 shadow-xl z-30' : 'bg-gradient-to-br from-amber-100 to-amber-300 hover:from-amber-200 hover:to-amber-400 hover:shadow-lg'}
        ${isNew ? 'ring-2 ring-emerald-500' : ''} border-2 border-amber-500 shadow-md`}
        style={{ zIndex: 20, marginTop: stackHeight > 1 ? `${(stackLayers - 1) * 3}px` : '0', fontFamily: 'Georgia, serif' }}>
        <span className="text-amber-900">{letter}</span>
      </div>
      {stackHeight > 1 && (<div className="absolute bg-amber-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold" style={{ top: '-4px', right: '-4px', zIndex: 25 }}>{stackHeight}</div>)}
    </div>
  );
};

// Board Cell Component - Warm cream tones
const BoardCell = ({ onClick, isCenter, isHighlighted, hasLetter, children }) => (
  <div onClick={onClick} className={`w-8 h-8 md:w-9 md:h-9 border border-amber-300/50 flex items-center justify-center cursor-pointer transition-all ${isCenter && !hasLetter ? 'bg-amber-200/80' : 'bg-amber-50/60'} ${isHighlighted ? 'bg-amber-300/80 ring-2 ring-amber-500' : ''} ${!hasLetter && !isCenter ? 'hover:bg-amber-100/80' : ''}`}>
    {children}
    {isCenter && !hasLetter && <span className="text-amber-600 text-lg">⭐</span>}
  </div>
);

// How to Play Content - Café au lait styling
const HowToPlayContent = () => (
  <div className="space-y-3">
    <div className="flex items-start gap-3 bg-stone-600/50 backdrop-blur-sm rounded-xl p-3">
      <span className="text-2xl">🥞</span>
      <div><p className="font-semibold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>Spell Words</p><p className="text-sm text-stone-300">Place letters to form valid English words (2+ letters)</p></div>
    </div>
    <div className="flex items-start gap-3 bg-stone-600/50 backdrop-blur-sm rounded-xl p-3">
      <span className="text-2xl">➕</span>
      <div><p className="font-semibold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>Build Crosswords</p><p className="text-sm text-stone-300">Connect new words to existing ones on the board</p></div>
    </div>
    <div className="flex items-start gap-3 bg-stone-600/50 backdrop-blur-sm rounded-xl p-3">
      <span className="text-2xl">📚</span>
      <div><p className="font-semibold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>Stack for Bonus!</p><p className="text-sm text-stone-300">Place on existing letters. Stacked tiles score their stack height!</p></div>
    </div>
    <div className="bg-amber-900/30 backdrop-blur-sm rounded-xl p-4 border border-amber-600/30">
      <h4 className="font-bold text-amber-100 mb-2 flex items-center gap-2" style={{fontFamily: 'Georgia, serif'}}><span>🏆</span> Scoring</h4>
      <ul className="text-sm text-stone-300 space-y-1">
        <li>• <strong className="text-amber-200">Each tile = 1 point</strong> (base score)</li>
        <li>• <strong className="text-amber-200">Stacked tiles = stack height</strong> (e.g., 3-high = 3 pts)</li>
        <li>• <strong className="text-amber-200">All words formed count!</strong> (crossword bonus)</li>
      </ul>
    </div>
    <div className="bg-stone-600/50 backdrop-blur-sm rounded-xl p-4 border border-stone-500/50">
      <h4 className="font-bold text-amber-100 mb-2 flex items-center gap-2" style={{fontFamily: 'Georgia, serif'}}><span>💡</span> Tip</h4>
      <p className="text-sm text-stone-300">If your word isn't recognized, tap <strong className="text-amber-200">Undo</strong> to get your tiles back and try another word. Stuck? Tap <strong className="text-amber-200">Pass</strong> to skip your turn.</p>
    </div>
  </div>
);

// ============================================
// MAIN GAME COMPONENT
// ============================================
const GriddleStacks = () => {
  const BOARD_SIZE = 11;
  const HAND_SIZE = 7;
  const CENTER = Math.floor(BOARD_SIZE / 2);
  const SAVE_KEY = 'griddleStacksSave';
  
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState(() => Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null).map(() => ({ letter: null, stackHeight: 0 }))));
  const [letterPool, setLetterPool] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [opponentHand, setOpponentHand] = useState([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState(null);
  const [placedTiles, setPlacedTiles] = useState([]);
  const [currentTurn, setCurrentTurn] = useState('player');
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [opponent, setOpponent] = useState(TRIVIA_CREW[0]);
  const [opponentMessage, setOpponentMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isFirstMove, setIsFirstMove] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [lastPlayedWord, setLastPlayedWord] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passCount, setPassCount] = useState(0);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showMenuConfirm, setShowMenuConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const currentYear = new Date().getFullYear();

  // Check for saved game on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) setHasSavedGame(true);
    } catch (e) { console.error('Could not check saved game', e); }
  }, []);

  // Save game progress
  const saveGame = useCallback(() => {
    if (!gameStarted || gameOver) return;
    try {
      const saveData = { board, letterPool, playerHand, opponentHand, currentTurn, playerScore, opponentScore, opponent: opponent.id, isFirstMove, lastPlayedWord, passCount, savedAt: Date.now() };
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    } catch (e) { console.error('Could not save game', e); }
  }, [gameStarted, gameOver, board, letterPool, playerHand, opponentHand, currentTurn, playerScore, opponentScore, opponent, isFirstMove, lastPlayedWord, passCount]);

  // Auto-save after each player action
  useEffect(() => {
    if (gameStarted && !gameOver && currentTurn === 'player' && placedTiles.length === 0) saveGame();
  }, [gameStarted, gameOver, currentTurn, placedTiles.length, saveGame]);

  // Load saved game
  const loadSavedGame = useCallback(() => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setBoard(data.board); setLetterPool(data.letterPool); setPlayerHand(data.playerHand); setOpponentHand(data.opponentHand);
        setCurrentTurn(data.currentTurn); setPlayerScore(data.playerScore); setOpponentScore(data.opponentScore);
        setOpponent(TRIVIA_CREW.find(c => c.id === data.opponent) || TRIVIA_CREW[0]);
        setIsFirstMove(data.isFirstMove); setLastPlayedWord(data.lastPlayedWord || ''); setPassCount(data.passCount || 0);
        setPlacedTiles([]); setSelectedTileIndex(null); setErrorMessage(''); setOpponentMessage(''); setGameOver(false); setWinner(null); setGameStarted(true);
      }
    } catch (e) { console.error('Could not load saved game', e); }
  }, []);

  // Clear saved game
  const clearSavedGame = useCallback(() => {
    try { localStorage.removeItem(SAVE_KEY); setHasSavedGame(false); } catch (e) { console.error('Could not clear saved game', e); }
  }, []);

  // Initialize letter pool
  const initializeLetterPool = useCallback(() => {
    const pool = [];
    Object.entries(LETTER_DISTRIBUTION).forEach(([letter, count]) => { for (let i = 0; i < count; i++) pool.push(letter); });
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    return pool;
  }, []);

  // Draw tiles from pool
  const drawTiles = useCallback((pool, count) => ({ drawn: pool.slice(0, count), remaining: pool.slice(count) }), []);

  // Shuffle player hand
  const shuffleHand = useCallback(() => {
    setPlayerHand(prev => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
      return shuffled;
    });
    setSelectedTileIndex(null);
  }, []);

  const returnToMenu = () => { saveGame(); setGameStarted(false); setShowMenuConfirm(false); };
  const resetGame = useCallback(() => { clearSavedGame(); setShowResetConfirm(false); startGame(true); }, [clearSavedGame]);

  // Share results
  const handleShare = useCallback(() => {
    const resultText = winner === 'player' ? '🏆 Won!' : winner === 'tie' ? '🤝 Tie!' : '🥈 Lost';
    const shareText = `☕ Griddle Stacks ${resultText}\n\nMe: ${playerScore} pts\n${opponent.name}: ${opponentScore} pts\n\nPlay at lettergriddle.com/stacks\nPart of the Letter Griddle Cafe ☕`;
    
    if (navigator.share) {
      navigator.share({ title: 'Griddle Stacks Results', text: shareText }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      });
    }
  }, [winner, playerScore, opponentScore, opponent]);

  // Start game
  const startGame = useCallback((isNewGame = true) => {
    if (isNewGame) clearSavedGame();
    const pool = initializeLetterPool();
    const { drawn: playerTiles, remaining: pool1 } = drawTiles(pool, HAND_SIZE);
    const { drawn: opponentTiles, remaining: pool2 } = drawTiles(pool1, HAND_SIZE);
    setLetterPool(pool2); setPlayerHand(playerTiles); setOpponentHand(opponentTiles);
    setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null).map(() => ({ letter: null, stackHeight: 0 }))));
    setPlayerScore(0); setOpponentScore(0); setCurrentTurn('player'); setGameOver(false); setWinner(null);
    setIsFirstMove(true); setPlacedTiles([]); setSelectedTileIndex(null); setLastPlayedWord('');
    setErrorMessage(''); setOpponentMessage(''); setPassCount(0); setGameStarted(true);
  }, [initializeLetterPool, drawTiles, clearSavedGame]);

  // Handle clicking tile in hand
  const handleHandTileClick = (index) => {
    if (currentTurn !== 'player' || gameOver || isValidating) return;
    setSelectedTileIndex(selectedTileIndex === index ? null : index);
    setErrorMessage('');
  };

  // Handle clicking cell on board
const handleCellClick = (row, col) => {
  if (currentTurn !== 'player' || gameOver || isValidating) return;
  
  // Check if clicking on a tile placed this turn - remove it
  const placedTileIndex = placedTiles.findIndex(t => t.row === row && t.col === col);
  if (placedTileIndex !== -1) {
    const tileToRemove = placedTiles[placedTileIndex];
    const newBoard = board.map(r => r.map(c => ({...c})));
    newBoard[row][col] = { letter: tileToRemove.previousLetter, stackHeight: tileToRemove.previousHeight };
    setBoard(newBoard);
    setPlayerHand(prev => [...prev, tileToRemove.letter]);
    setPlacedTiles(prev => prev.filter((_, idx) => idx !== placedTileIndex));
    setErrorMessage('');
    return;
  }
  
  // Place a tile if one is selected
  if (selectedTileIndex === null) return;
  const letter = playerHand[selectedTileIndex];
  const currentCell = board[row][col];
  const newBoard = board.map(r => r.map(c => ({...c})));
  newBoard[row][col] = { letter, stackHeight: currentCell.stackHeight + 1 };
  setBoard(newBoard);
  setPlacedTiles(prev => [...prev, { row, col, letter, previousLetter: currentCell.letter, previousHeight: currentCell.stackHeight }]);
  const newHand = [...playerHand]; newHand.splice(selectedTileIndex, 1); setPlayerHand(newHand);
  setSelectedTileIndex(null); setErrorMessage('');
};

  // Get words at position
  const getHorizontalWord = useCallback((boardState, row, col) => {
    let startCol = col;
    while (startCol > 0 && boardState[row][startCol - 1].letter) startCol--;
    let word = '', score = 0, c = startCol;
    while (c < BOARD_SIZE && boardState[row][c].letter) { word += boardState[row][c].letter; score += boardState[row][c].stackHeight; c++; }
    return { word, score, startCol, endCol: c - 1, row };
  }, []);

  const getVerticalWord = useCallback((boardState, row, col) => {
    let startRow = row;
    while (startRow > 0 && boardState[startRow - 1][col].letter) startRow--;
    let word = '', score = 0, r = startRow;
    while (r < BOARD_SIZE && boardState[r][col].letter) { word += boardState[r][col].letter; score += boardState[r][col].stackHeight; r++; }
    return { word, score, startRow, endRow: r - 1, col };
  }, []);

  // Validate and score play
  const validateAndScorePlay = useCallback(async () => {
    if (placedTiles.length === 0) return { valid: false, error: 'Place at least one tile!' };
    const rows = [...new Set(placedTiles.map(t => t.row))];
    const cols = [...new Set(placedTiles.map(t => t.col))];
    const isHorizontal = rows.length === 1;
    const isVertical = cols.length === 1;
    if (!isHorizontal && !isVertical) return { valid: false, error: 'Tiles must be in a straight line!' };
    
    if (isHorizontal && placedTiles.length > 1) {
      const sortedCols = [...cols].sort((a, b) => a - b);
      for (let c = sortedCols[0]; c <= sortedCols[sortedCols.length - 1]; c++) {
        if (!board[rows[0]][c].letter) return { valid: false, error: 'No gaps allowed!' };
      }
    }
    if (isVertical && placedTiles.length > 1) {
      const sortedRows = [...rows].sort((a, b) => a - b);
      for (let r = sortedRows[0]; r <= sortedRows[sortedRows.length - 1]; r++) {
        if (!board[r][cols[0]].letter) return { valid: false, error: 'No gaps allowed!' };
      }
    }
    
    if (isFirstMove) {
      const touchesCenter = placedTiles.some(t => t.row === CENTER && t.col === CENTER);
      if (!touchesCenter) return { valid: false, error: 'First word must touch the center star! ⭐' };
    }
    
    const wordsFormed = [];
    const checkedWords = new Set();
    for (const tile of placedTiles) {
      const hWord = getHorizontalWord(board, tile.row, tile.col);
      const hKey = `H${tile.row}-${hWord.startCol}`;
      if (hWord.word.length >= 2 && !checkedWords.has(hKey)) { checkedWords.add(hKey); wordsFormed.push(hWord); }
      const vWord = getVerticalWord(board, tile.row, tile.col);
      const vKey = `V${vWord.startRow}-${tile.col}`;
      if (vWord.word.length >= 2 && !checkedWords.has(vKey)) { checkedWords.add(vKey); wordsFormed.push(vWord); }
    }
    
    if (wordsFormed.length === 0) return { valid: false, error: 'Must form at least one word (2+ letters)!' };
    
    for (const wordObj of wordsFormed) {
      const isValid = await validateWord(wordObj.word);
      if (!isValid) return { valid: false, error: `"${wordObj.word}" is not a valid word!` };
    }
    
    if (!isFirstMove) {
      const connects = placedTiles.some(tile => {
        if (tile.previousLetter) return true;
        const { row, col } = tile;
        const adjacents = [[row-1,col],[row+1,col],[row,col-1],[row,col+1]];
        return adjacents.some(([r, c]) => {
          if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) return false;
          if (!board[r][c].letter) return false;
          return !placedTiles.some(t => t.row === r && t.col === c);
        });
      });
      if (!connects) return { valid: false, error: 'Must connect to existing words!' };
    }
    
    const totalScore = wordsFormed.reduce((sum, w) => sum + w.score, 0);
    const mainWord = wordsFormed.reduce((longest, w) => w.word.length > longest.word.length ? w : longest, wordsFormed[0]);
    return { valid: true, score: totalScore, words: wordsFormed, mainWord: mainWord.word };
  }, [placedTiles, board, isFirstMove, getHorizontalWord, getVerticalWord, CENTER]);

  // Submit play
  const submitPlay = useCallback(async () => {
    setIsValidating(true);
    setErrorMessage('Checking words...');
    try {
      const result = await validateAndScorePlay();
      if (!result.valid) { setErrorMessage(result.error); setIsValidating(false); return; }
      setPlayerScore(prev => prev + result.score);
      setLastPlayedWord(result.mainWord);
      const tilesToDraw = Math.min(placedTiles.length, letterPool.length);
      const { drawn, remaining } = drawTiles(letterPool, tilesToDraw);
      setPlayerHand(prev => [...prev, ...drawn]);
      setLetterPool(remaining);
      setPlacedTiles([]);
      setIsFirstMove(false);
      setErrorMessage('');
      setPassCount(0);
      if (remaining.length === 0 && playerHand.length === 0) { endGame(); setIsValidating(false); return; }
      setCurrentTurn('opponent');
    } finally { setIsValidating(false); }
  }, [validateAndScorePlay, placedTiles, letterPool, drawTiles, playerHand]);

  // Undo placement
  const undoPlacement = useCallback(() => {
    if (placedTiles.length === 0 || isValidating) return;
    const newBoard = board.map(r => r.map(c => ({...c})));
    const returnedTiles = [];
    placedTiles.forEach(({ row, col, letter, previousLetter, previousHeight }) => {
      newBoard[row][col] = { letter: previousLetter, stackHeight: previousHeight };
      returnedTiles.push(letter);
    });
    setBoard(newBoard); setPlayerHand(prev => [...prev, ...returnedTiles]); setPlacedTiles([]); setErrorMessage('');
  }, [placedTiles, board, isValidating]);

  // Pass turn
  const passTurn = useCallback(() => {
    if (isValidating) return;
    setPlacedTiles([]);
    setPassCount(prev => prev + 1);
    if (passCount >= 1) { endGame(); return; }
    setCurrentTurn('opponent');
  }, [passCount, isValidating]);

  // End game
  const endGame = useCallback(() => {
    setGameOver(true);
    setWinner(playerScore > opponentScore ? 'player' : playerScore < opponentScore ? 'opponent' : 'tie');
    clearSavedGame();
  }, [playerScore, opponentScore, clearSavedGame]);

  // AI Move Logic
  const makeAIMove = useCallback(() => {
    setIsThinking(true);
    setOpponentMessage(opponent.thinkingQuotes[Math.floor(Math.random() * opponent.thinkingQuotes.length)]);
    
    setTimeout(() => {
      let madePlay = false;
      
      const canSpellWord = (word, hand) => {
        const handCounts = {}; hand.forEach(l => { handCounts[l] = (handCounts[l] || 0) + 1; });
        const letterCounts = {}; word.split('').forEach(l => { letterCounts[l] = (letterCounts[l] || 0) + 1; });
        return Object.entries(letterCounts).every(([l, c]) => (handCounts[l] || 0) >= c);
      };
      
      const getHWordAt = (testBoard, row, col) => {
        let startCol = col;
        while (startCol > 0 && testBoard[row][startCol - 1].letter) startCol--;
        let word = '', c = startCol;
        while (c < BOARD_SIZE && testBoard[row][c].letter) { word += testBoard[row][c].letter; c++; }
        return word;
      };
      
      const getVWordAt = (testBoard, row, col) => {
        let startRow = row;
        while (startRow > 0 && testBoard[startRow - 1][col].letter) startRow--;
        let word = '', r = startRow;
        while (r < BOARD_SIZE && testBoard[r][col].letter) { word += testBoard[r][col].letter; r++; }
        return word;
      };
      
      const checkAllWordsValid = (testBoard, row, col) => {
        const hWord = getHWordAt(testBoard, row, col);
        const vWord = getVWordAt(testBoard, row, col);
        if (hWord.length >= 2 && !isValidWordSync(hWord)) return false;
        if (vWord.length >= 2 && !isValidWordSync(vWord)) return false;
        return true;
      };
      
      if (isFirstMove) {
        const shuffledWords = [...AI_WORDS].sort(() => Math.random() - 0.5);
        for (const word of shuffledWords) {
          if (canSpellWord(word, opponentHand)) {
            const letters = word.split('');
            const newBoard = board.map(r => r.map(c => ({...c})));
            const startCol = CENTER - Math.floor(letters.length / 2);
            let score = 0;
            const usedLetters = [];
            letters.forEach((letter, i) => { newBoard[CENTER][startCol + i] = { letter, stackHeight: 1 }; score += 1; usedLetters.push(letter); });
            setBoard(newBoard); setOpponentScore(prev => prev + score); setLastPlayedWord(word);
            const newHand = [...opponentHand];
            usedLetters.forEach(l => { const idx = newHand.indexOf(l); if (idx > -1) newHand.splice(idx, 1); });
            const { drawn, remaining } = drawTiles(letterPool, usedLetters.length);
            setOpponentHand([...newHand, ...drawn]); setLetterPool(remaining);
            setOpponentMessage(`${word}! ${opponent.playQuotes[Math.floor(Math.random() * opponent.playQuotes.length)]}`);
            setIsFirstMove(false); madePlay = true; break;
          }
        }
      } else {
        const playableSpots = [];
        for (let r = 0; r < BOARD_SIZE; r++) {
          for (let c = 0; c < BOARD_SIZE; c++) {
            if (board[r][c].letter) {
              const adjacents = [{ row: r - 1, col: c }, { row: r + 1, col: c }, { row: r, col: c - 1 }, { row: r, col: c + 1 }];
              adjacents.forEach(({ row, col }) => {
                if (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE && !board[row][col].letter) playableSpots.push({ row, col });
              });
            }
          }
        }
        
        const uniqueSpots = playableSpots.filter((spot, index, self) => index === self.findIndex(s => s.row === spot.row && s.col === spot.col));
        const shuffledSpots = [...uniqueSpots].sort(() => Math.random() - 0.5);
        
        for (const spot of shuffledSpots) {
          for (let i = 0; i < opponentHand.length; i++) {
            const letter = opponentHand[i];
            const testBoard = board.map(r => r.map(c => ({...c})));
            testBoard[spot.row][spot.col] = { letter, stackHeight: 1 };
            
            if (checkAllWordsValid(testBoard, spot.row, spot.col)) {
              const hWord = getHWordAt(testBoard, spot.row, spot.col);
              const vWord = getVWordAt(testBoard, spot.row, spot.col);
              const displayWord = hWord.length >= vWord.length ? hWord : vWord;
              const score = Math.max(hWord.length, vWord.length);
              
              setBoard(testBoard); setOpponentScore(prev => prev + score); setLastPlayedWord(displayWord);
              const newHand = [...opponentHand]; newHand.splice(i, 1);
              const { drawn, remaining } = drawTiles(letterPool, 1);
              setOpponentHand([...newHand, ...drawn]); setLetterPool(remaining);
              setOpponentMessage(`${displayWord}! ${opponent.playQuotes[Math.floor(Math.random() * opponent.playQuotes.length)]}`);
              madePlay = true; break;
            }
          }
          if (madePlay) break;
        }
      }
      
      if (!madePlay) {
        setOpponentMessage("I'll pass this turn...");
        setPassCount(prev => { if (prev >= 1) setTimeout(() => endGame(), 500); return prev + 1; });
      } else { setPassCount(0); }
      
      setIsThinking(false);
      if (letterPool.length === 0 && opponentHand.length === 0) { endGame(); return; }
      setCurrentTurn('player');
    }, 1500);
  }, [opponent, opponentHand, board, isFirstMove, letterPool, drawTiles, endGame, CENTER]);

  // Trigger AI turn
  useEffect(() => {
    if (currentTurn === 'opponent' && !gameOver && gameStarted) makeAIMove();
  }, [currentTurn, gameOver, gameStarted, makeAIMove]);

  // ============================================
  // RENDER - Start Screen with Café au Lait styling
  // ============================================
  if (!gameStarted) {
    return (
      <div className="min-h-screen p-4 relative overflow-hidden" style={{
        background: 'linear-gradient(180deg, #3E2723 0%, #4E342E 15%, #5D4037 30%, #6D4C41 45%, #8D6E63 60%, #A1887F 75%, #BCAAA4 85%, #D7CCC8 95%, #EFEBE9 100%)'
      }}>
        {/* Subtle decorative elements */}
        <div className="fixed top-4 left-4 text-4xl opacity-10">☕</div>
        <div className="fixed top-4 right-4 text-4xl opacity-10">📚</div>
        <div className="fixed bottom-4 left-4 text-4xl opacity-10">🥞</div>
        <div className="fixed bottom-4 right-4 text-4xl opacity-10">☕</div>
        
        <div className="max-w-lg mx-auto pt-8 relative z-10">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🥞📚</div>
            <h1 className="text-4xl font-bold text-amber-100 mb-2" style={{fontFamily: 'Georgia, serif'}}>Griddle Stacks</h1>
            <p className="text-xl text-amber-200/90" style={{fontFamily: 'Georgia, serif'}}>A Letter Griddle Word Game</p>
            <p className="text-amber-300/70 text-sm mt-1">Stack pancakes, spell words, score big!</p>
          </div>
          
          {/* Main content card with glassmorphism */}
          <div className="bg-stone-800/70 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-stone-600/50 mb-6">
            <h2 className="text-2xl font-bold text-amber-100 mb-4 text-center" style={{fontFamily: 'Georgia, serif'}}>📖 How to Play</h2>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 bg-stone-700/50 backdrop-blur-sm rounded-xl p-3 border border-stone-600/30">
                <span className="text-2xl">🥞</span>
                <div><p className="font-semibold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>Spell Words</p><p className="text-sm text-stone-300">Place letters to form valid English words</p></div>
              </div>
              <div className="flex items-start gap-3 bg-stone-700/50 backdrop-blur-sm rounded-xl p-3 border border-stone-600/30">
                <span className="text-2xl">➕</span>
                <div><p className="font-semibold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>Build Crosswords</p><p className="text-sm text-stone-300">Connect new words to existing ones</p></div>
              </div>
              <div className="flex items-start gap-3 bg-stone-700/50 backdrop-blur-sm rounded-xl p-3 border border-stone-600/30">
                <span className="text-2xl">📚</span>
                <div><p className="font-semibold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>Stack for Bonus!</p><p className="text-sm text-stone-300">Place on existing letters for extra points</p></div>
              </div>
            </div>
            
            {/* Real Dictionary */}
            <div className="bg-amber-900/30 backdrop-blur-sm rounded-xl p-4 mb-6 border border-amber-700/30">
              <h3 className="font-bold text-amber-100 mb-2 text-center" style={{fontFamily: 'Georgia, serif'}}>📖 Real Dictionary!</h3>
              <p className="text-sm text-stone-300 text-center">Uses a real English dictionary API. Any valid word works!</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-bold text-amber-100 mb-2 text-center" style={{fontFamily: 'Georgia, serif'}}>📖 Quick Reference</h3>
              <div className="bg-stone-700/50 backdrop-blur-sm rounded-xl p-3 text-sm space-y-2 border border-stone-600/30">
                <p className="text-stone-300"><span className="font-bold text-amber-200">🥞 Spell Words:</span> Place letters to form valid English words (2+ letters)</p>
                <p className="text-stone-300"><span className="font-bold text-amber-200">➕ Build Crosswords:</span> Connect new words to existing ones</p>
                <p className="text-stone-300"><span className="font-bold text-amber-200">📚 Stack for Bonus:</span> Place on existing letters. Stacked tiles score their stack height!</p>
                <p className="text-stone-300"><span className="font-bold text-amber-200">🏆 Scoring:</span> Each tile = 1 pt, stacked tiles = stack height, all words formed count!</p>
                <p className="text-stone-400 text-xs mt-2">⚠️ Invalid word? Tap <strong className="text-amber-200">Undo</strong> to try again or <strong className="text-amber-200">Pass</strong> to skip your turn.</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold text-amber-100 mb-3 text-center" style={{fontFamily: 'Georgia, serif'}}>🎭 Choose Opponent</h3>
              <div className="flex justify-center gap-3 flex-wrap">
                {TRIVIA_CREW.map(char => (
                  <button key={char.id} onClick={() => setOpponent(char)}
                    className={`text-center p-2 rounded-xl transition-all ${opponent.id === char.id ? 'bg-amber-700/50 ring-2 ring-amber-400 shadow-lg backdrop-blur-sm' : 'bg-stone-700/50 hover:bg-stone-600/50 backdrop-blur-sm'} border border-stone-600/30`}>
                    <CharacterAvatar character={char} size="md" />
                    <p className="text-xs text-amber-100 mt-1 font-medium" style={{fontFamily: 'Georgia, serif'}}>{char.name}</p>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Continue Game Button */}
            {hasSavedGame && (
              <button onClick={loadSavedGame}
                className="w-full mb-3 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white py-4 rounded-2xl font-bold text-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] border border-amber-500/50"
                style={{fontFamily: 'Georgia, serif'}}>
                ▶️ Continue Game
              </button>
            )}
            
            <button onClick={() => startGame(true)}
              className="w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white py-4 rounded-2xl font-bold text-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] border border-amber-500/50"
              style={{fontFamily: 'Georgia, serif'}}>
              🥞 Start Stacking!
            </button>
          </div>
          
          {/* Footer - white text on dark gradient */}
          <div className="text-center text-xs mt-6">
            <p className="text-white/80">Part of <a href="/" className="underline hover:text-white">The Letter Griddle Cafe</a> ☕</p>
            <p className="mt-2 text-white/60">
              <a href="/privacy" className="hover:text-white/80">Privacy</a>
              <span className="mx-2">•</span>
              <a href="/terms" className="hover:text-white/80">Terms</a>
            </p>
            <p className="mt-1 text-white/50">© {currentYear} Letter Griddle Cafe</p>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER - Game Screen with Café au Lait styling
  // ============================================
  return (
    <div className="min-h-screen p-2 md:p-4 relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #3E2723 0%, #4E342E 15%, #5D4037 30%, #6D4C41 45%, #8D6E63 60%, #A1887F 75%, #BCAAA4 85%, #D7CCC8 95%, #EFEBE9 100%)'
    }}>
      {/* Subtle decorative elements */}
      <div className="fixed top-2 left-2 text-2xl opacity-10">☕</div>
      <div className="fixed top-2 right-2 text-2xl opacity-10">📚</div>
      <div className="fixed bottom-2 left-2 text-2xl opacity-10">🥞</div>
      <div className="fixed bottom-2 right-2 text-2xl opacity-10">☕</div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => setShowMenuConfirm(true)}
            className="bg-stone-700/70 backdrop-blur-sm hover:bg-stone-600/70 text-amber-100 px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all border border-stone-600/50"
            style={{fontFamily: 'Georgia, serif'}}>
            ☰ Menu
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>🥞 Griddle Stacks</h1>
          <button onClick={() => setShowHelpModal(true)}
            className="bg-stone-700/70 backdrop-blur-sm hover:bg-stone-600/70 text-amber-100 px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all border border-stone-600/50"
            style={{fontFamily: 'Georgia, serif'}}>
            Help
          </button>
        </div>

        {/* Scoreboard - Glassmorphism */}
        <div className="bg-stone-800/60 backdrop-blur-md rounded-xl shadow-lg p-3 mb-3 border border-stone-600/50">
          <div className="flex justify-between items-center">
            <div className={`text-center p-2 rounded-lg transition-all ${currentTurn === 'player' ? 'bg-amber-700/50 ring-2 ring-amber-400 backdrop-blur-sm' : 'bg-stone-700/50 backdrop-blur-sm'}`}>
              <div className="text-2xl">🥞</div>
              <div className="text-xs font-bold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>You</div>
              <div className="text-xl font-bold text-amber-200">{playerScore}</div>
            </div>
            <div className="text-center flex-1 px-2">
              <div className="text-sm text-amber-100 font-medium" style={{fontFamily: 'Georgia, serif'}}>
                {isValidating ? 'Checking...' : isThinking ? `${opponent.name} thinking...` : `${currentTurn === 'player' ? 'Your' : opponent.name + "'s"} Turn`}
              </div>
              <div className="text-xs text-stone-400">{letterPool.length} tiles left</div>
              {lastPlayedWord && <div className="text-sm text-amber-200 font-bold" style={{fontFamily: 'Georgia, serif'}}>Last: {lastPlayedWord}</div>}
            </div>
            <div className={`text-center p-2 rounded-lg transition-all ${currentTurn === 'opponent' ? 'bg-amber-700/50 ring-2 ring-amber-400 backdrop-blur-sm' : 'bg-stone-700/50 backdrop-blur-sm'}`}>
              <CharacterAvatar character={opponent} size="sm" />
              <div className="text-xs font-bold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>{opponent.name}</div>
              <div className="text-xl font-bold text-amber-200">{opponentScore}</div>
            </div>
          </div>
          {opponentMessage && (
            <div className="mt-2 text-center bg-stone-700/50 backdrop-blur-sm rounded-lg p-2 border border-stone-600/30">
              <span className="text-amber-100 text-sm italic" style={{fontFamily: 'Georgia, serif'}}>"{opponentMessage}"</span>
            </div>
          )}
        </div>

        {/* Error/Status Message */}
        {errorMessage && (
          <div className={`${errorMessage === 'Checking words...' ? 'bg-stone-700/70 border-stone-500/50' : 'bg-red-900/50 border-red-700/50'} backdrop-blur-sm border rounded-lg p-2 mb-3 text-center`}>
            <span className={`${errorMessage === 'Checking words...' ? 'text-amber-100' : 'text-red-200'} text-sm font-medium`} style={{fontFamily: 'Georgia, serif'}}>{errorMessage}</span>
          </div>
        )}

        {/* Game Board - Warm tones */}
        <div className="bg-gradient-to-br from-amber-800 to-amber-900 p-2 rounded-xl shadow-xl mb-3 overflow-x-auto border border-amber-700/50">
          <div className="grid gap-0.5 mx-auto" style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(2rem, 2.25rem))`, width: 'fit-content' }}>
            {board.map((row, rowIdx) => (
              row.map((cell, colIdx) => (
                <BoardCell key={`${rowIdx}-${colIdx}`} onClick={() => handleCellClick(rowIdx, colIdx)}
                  isCenter={rowIdx === CENTER && colIdx === CENTER}
                  isHighlighted={placedTiles.some(t => t.row === rowIdx && t.col === colIdx)}
                  hasLetter={!!cell.letter}>
                  {cell.letter && <PancakeTile letter={cell.letter} stackHeight={cell.stackHeight} size="sm"
                    isNew={placedTiles.some(t => t.row === rowIdx && t.col === colIdx)} />}
                </BoardCell>
              ))
            ))}
          </div>
        </div>

        {/* Player Hand - Glassmorphism */}
        <div className="bg-stone-800/60 backdrop-blur-md rounded-xl shadow-lg p-3 mb-3 border border-stone-600/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-amber-100 font-medium" style={{fontFamily: 'Georgia, serif'}}>Your Pancakes</span>
            <button onClick={shuffleHand} disabled={currentTurn !== 'player' || isValidating}
              className="bg-stone-700/70 backdrop-blur-sm hover:bg-stone-600/70 disabled:opacity-50 text-amber-100 px-3 py-1 rounded-full text-xs font-semibold shadow transition-all border border-stone-600/50"
              style={{fontFamily: 'Georgia, serif'}}>
              🔀 Shuffle
            </button>
          </div>
          <div className="flex justify-center gap-2 flex-wrap">
            {playerHand.map((letter, idx) => (
              <PancakeTile key={idx} letter={letter} size="lg" selected={selectedTileIndex === idx}
                onClick={() => handleHandTileClick(idx)} disabled={currentTurn !== 'player' || isValidating} />
            ))}
          </div>
          <p className="text-xs text-stone-400 text-center mt-2">Tap a pancake, then tap the board • Tap placed tiles to remove</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-2 flex-wrap mb-3">
          <button onClick={undoPlacement} disabled={placedTiles.length === 0 || currentTurn !== 'player' || isValidating}
            className="bg-stone-700/70 backdrop-blur-sm hover:bg-stone-600/70 disabled:opacity-50 text-amber-100 px-5 py-2.5 rounded-full font-semibold text-sm shadow-md transition-all border border-stone-600/50"
            style={{fontFamily: 'Georgia, serif'}}>
            ↩ Undo
          </button>
          <button onClick={submitPlay} disabled={placedTiles.length === 0 || currentTurn !== 'player' || isValidating}
            className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 disabled:opacity-50 text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-lg transition-all transform hover:scale-[1.02] border border-amber-500/50"
            style={{fontFamily: 'Georgia, serif'}}>
            {isValidating ? '⏳ Checking...' : '✓ Submit'}
          </button>
          <button onClick={passTurn} disabled={currentTurn !== 'player' || placedTiles.length > 0 || isValidating}
            className="bg-stone-700/70 backdrop-blur-sm hover:bg-stone-600/70 disabled:opacity-50 text-amber-100 px-5 py-2.5 rounded-full font-semibold text-sm shadow-md transition-all border border-stone-600/50"
            style={{fontFamily: 'Georgia, serif'}}>
            ⏭ Pass
          </button>
        </div>

        {/* Progress saves message */}
        <div className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-3 mb-3 text-center border border-stone-600/30">
          <p className="text-stone-300 text-sm" style={{fontFamily: 'Georgia, serif'}}>
            ✨ Your progress saves automatically! Leave and come back anytime to complete puzzle! ○{' '}
            <button onClick={() => setShowResetConfirm(true)} className="text-amber-300 hover:text-amber-200 underline font-medium">
              Reset to start fresh
            </button>
          </p>
        </div>

        {/* Footer - white text on dark gradient */}
        <div className="text-center py-4 text-xs">
          <p className="text-white/80">Part of <a href="/" className="underline hover:text-white">The Letter Griddle Cafe</a> ☕</p>
          <p className="mt-2 text-white/60">
            <a href="/privacy" className="hover:text-white/80">Privacy</a>
            <span className="mx-2">•</span>
            <a href="/terms" className="hover:text-white/80">Terms</a>
          </p>
          <p className="mt-1 text-white/50">© {currentYear} Letter Griddle Cafe</p>
        </div>

        {/* Game Over Modal */}
        {gameOver && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-stone-800/95 backdrop-blur-md rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center border border-stone-600/50">
              <div className="text-6xl mb-4">{winner === 'player' ? '🎉' : winner === 'tie' ? '🤝' : '🥞'}</div>
              <h2 className="text-3xl font-bold text-amber-100 mb-2" style={{fontFamily: 'Georgia, serif'}}>
                {winner === 'player' ? 'You Won!' : winner === 'tie' ? "It's a Tie!" : `${opponent.name} Wins!`}
              </h2>
              <div className="text-xl text-stone-300 mb-4" style={{fontFamily: 'Georgia, serif'}}>
                <p>You: {playerScore} pts</p>
                <p>{opponent.name}: {opponentScore} pts</p>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={handleShare}
                  className="bg-gradient-to-r from-stone-600 to-stone-500 hover:from-stone-500 hover:to-stone-400 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg transition-all border border-stone-400/50"
                  style={{fontFamily: 'Georgia, serif'}}>
                  {shareCopied ? '✓ Copied!' : 'Share Results'}
                </button>
                <button onClick={() => startGame(true)}
                  className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-all border border-amber-500/50"
                  style={{fontFamily: 'Georgia, serif'}}>
                  🥞 Play Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Help Modal */}
        {showHelpModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-stone-800/95 backdrop-blur-md rounded-3xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto border border-stone-600/50">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>📖 How to Play</h2>
                <button onClick={() => setShowHelpModal(false)} className="text-stone-400 hover:text-amber-100 text-2xl">✕</button>
              </div>
              <HowToPlayContent />
              <button onClick={() => setShowHelpModal(false)}
                className="w-full mt-4 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white py-3 rounded-xl font-bold shadow-lg transition-all border border-amber-500/50"
                style={{fontFamily: 'Georgia, serif'}}>
                Got it! 🥞
              </button>
            </div>
          </div>
        )}

        {/* Menu Confirm Modal */}
        {showMenuConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-stone-800/95 backdrop-blur-md rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center border border-stone-600/50">
              <div className="text-4xl mb-4">🥞</div>
              <h2 className="text-xl font-bold text-amber-100 mb-2" style={{fontFamily: 'Georgia, serif'}}>Return to Menu?</h2>
              <p className="text-stone-300 mb-4">Your progress will be saved automatically.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setShowMenuConfirm(false)}
                  className="bg-stone-700/70 backdrop-blur-sm hover:bg-stone-600/70 text-amber-100 px-6 py-2 rounded-full font-semibold shadow-md transition-all border border-stone-600/50"
                  style={{fontFamily: 'Georgia, serif'}}>
                  Cancel
                </button>
                <button onClick={returnToMenu}
                  className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white px-6 py-2 rounded-full font-bold shadow-lg transition-all border border-amber-500/50"
                  style={{fontFamily: 'Georgia, serif'}}>
                  Yes, Exit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset Confirm Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-stone-800/95 backdrop-blur-md rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center border border-stone-600/50">
              <div className="text-4xl mb-4">🔄</div>
              <h2 className="text-xl font-bold text-amber-100 mb-2" style={{fontFamily: 'Georgia, serif'}}>Start Fresh?</h2>
              <p className="text-stone-300 mb-4">This will reset your current game and start a new one with new letters.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setShowResetConfirm(false)}
                  className="bg-stone-700/70 backdrop-blur-sm hover:bg-stone-600/70 text-amber-100 px-6 py-2 rounded-full font-semibold shadow-md transition-all border border-stone-600/50"
                  style={{fontFamily: 'Georgia, serif'}}>
                  Cancel
                </button>
                <button onClick={resetGame}
                  className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white px-6 py-2 rounded-full font-bold shadow-lg transition-all border border-amber-500/50"
                  style={{fontFamily: 'Georgia, serif'}}>
                  Yes, Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GriddleStacks;
