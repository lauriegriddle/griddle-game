"use client";
import React, { useState, useEffect, useCallback } from 'react';

// GRIDDLE STACKS - With Stats, Achievements & Shuffle Glow

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
        {(char.hairStyle === 'long' || char.hairStyle === 'wavy') && <ellipse cx="50" cy="50" rx="28" ry="32" fill={char.hairColor} />}
        <ellipse cx="50" cy="88" rx="24" ry="18" fill={char.shirtColor} />
        <ellipse cx="50" cy="48" rx="20" ry="22" fill={char.skinTone} />
        {char.hairStyle === 'long' && (<><rect x="22" y="35" width="12" height="35" rx="6" fill={char.hairColor} /><rect x="66" y="35" width="12" height="35" rx="6" fill={char.hairColor} /><ellipse cx="50" cy="32" rx="22" ry="12" fill={char.hairColor} /></>)}
        {char.hairStyle === 'short' && <ellipse cx="50" cy="32" rx="18" ry="10" fill={char.hairColor} />}
        {char.hairStyle === 'balding' && (<><ellipse cx="28" cy="38" rx="8" ry="6" fill={char.hairColor} /><ellipse cx="72" cy="38" rx="8" ry="6" fill={char.hairColor} /></>)}
        {char.hairStyle === 'wavy' && (<><ellipse cx="50" cy="30" rx="20" ry="10" fill={char.hairColor} /><rect x="24" y="32" width="10" height="25" rx="5" fill={char.hairColor} /><rect x="66" y="32" width="10" height="25" rx="5" fill={char.hairColor} /></>)}
        <circle cx="42" cy="48" r="2.5" fill="#4A3728" /><circle cx="58" cy="48" r="2.5" fill="#4A3728" />
        <path d="M 42 58 Q 50 64 58 58" stroke="#4A3728" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
};

const TRIVIA_CREW = [
  { id: 'laurel', name: 'Laurel', thinkingQuotes: ["Hmm, let me think...", "What word could I make?"], playQuotes: ["Nice!", "Your turn!"] },
  { id: 'sarah', name: 'Sarah', thinkingQuotes: ["Interesting...", "Let me see..."], playQuotes: ["Good game!", "Beat that!"] },
  { id: 'taylor', name: 'Taylor B.', thinkingQuotes: ["Calculating...", "Hmm..."], playQuotes: ["Ha!", "Top that!"] },
  { id: 'mr_lindsay', name: 'Mr. Lindsay', thinkingQuotes: ["Back in my day...", "Ah yes..."], playQuotes: ["Splendid!", "Your move!"] },
];

const ACHIEVEMENTS = [
  { id: 'first_pancake', name: 'First Pancake', icon: '🥞', description: 'Complete your first game', requirement: (s) => s.gamesPlayed >= 1 },
  { id: 'second_cup', name: 'Second Cup', icon: '☕', description: 'Come back for another game', requirement: (s) => s.gamesPlayed >= 2 },
  { id: 'stack_master', name: 'Stack Master', icon: '🥞', description: 'Win 5 games', requirement: (s) => s.gamesWon >= 5 },
  { id: 'crown_jewel', name: 'Crown Jewel', icon: '👑', description: 'Win 10 games', requirement: (s) => s.gamesWon >= 10 },
  { id: 'diamond_stacker', name: 'Diamond Stacker', icon: '💎', description: 'Win 25 games', requirement: (s) => s.gamesWon >= 25 },
  { id: 'hot_streak', name: 'Hot Streak', icon: '🔥', description: 'Win 3 games in a row', requirement: (s) => s.bestStreak >= 3 },
  { id: 'unstoppable', name: 'Unstoppable', icon: '⚡', description: 'Win 5 games in a row', requirement: (s) => s.bestStreak >= 5 },
  { id: 'century_club', name: 'Century Club', icon: '💯', description: 'Score 100+ points', requirement: (s) => s.highestScore >= 100 },
  { id: 'word_wizard', name: 'Word Wizard', icon: '✨', description: 'Play 100 total words', requirement: (s) => s.totalWordsPlayed >= 100 },
  { id: 'laurels_friend', name: "Laurel's Friend", icon: '🌿', description: 'Beat Laurel 3 times', requirement: (s) => (s.characterStats?.laurel?.wins || 0) >= 3 },
  { id: 'sarahs_rival', name: "Sarah's Rival", icon: '🏛️', description: 'Beat Sarah 3 times', requirement: (s) => (s.characterStats?.sarah?.wins || 0) >= 3 },
  { id: 'taylors_match', name: "Taylor's Match", icon: '🎯', description: 'Beat Taylor B. 3 times', requirement: (s) => (s.characterStats?.taylor?.wins || 0) >= 3 },
  { id: 'teachers_pet', name: "Teacher's Pet", icon: '🍎', description: 'Beat Mr. Lindsay 3 times', requirement: (s) => (s.characterStats?.mr_lindsay?.wins || 0) >= 3 },
];

const LETTER_DISTRIBUTION = {'A':9,'B':2,'C':2,'D':4,'E':12,'F':2,'G':3,'H':2,'I':9,'J':1,'K':1,'L':4,'M':2,'N':6,'O':8,'P':2,'Q':1,'R':6,'S':4,'T':6,'U':4,'V':2,'W':2,'X':1,'Y':2,'Z':1};

const AI_WORDS = [
  // 2-Letter Words (Valid Scrabble words)
  'AA','AB','AD','AE','AG','AH','AI','AL','AM','AN','AR','AS','AT','AW','AX','AY',
  'BA','BE','BI','BO','BY','DA','DE','DO',
  'ED','EF','EH','EL','EM','EN','ER','ES','ET','EW','EX',
  'FA','FE','GI','GO',
  'HA','HE','HI','HM','HO',
  'ID','IF','IN','IS','IT','JO','KA','KI',
  'LA','LI','LO','MA','ME','MI','MM','MO','MU','MY',
  'NA','NE','NO','NU',
  'OD','OE','OF','OH','OI','OK','OM','ON','OP','OR','OS','OU','OW','OX','OY',
  'PA','PE','PI','PO','QI','RE','SH','SI','SO',
  'TA','TI','TO','UH','UM','UN','UP','US','UT',
  'WE','WO','XI','XU','YA','YE','YO','ZA',
  
  // 3-Letter Words
  'ACE','ACT','ADD','ADO','ADS','AFT','AGE','AGO','AID','AIM','AIR','ALE','ALL','AND','ANT','ANY','APE','ARC','ARE','ARK','ARM','ART','ASH','ASK','ATE','AWE','AXE',
  'BAD','BAG','BAN','BAR','BAT','BAY','BED','BEE','BEG','BET','BIB','BID','BIG','BIN','BIT','BOB','BOD','BOG','BOP','BOT','BOW','BOX','BOY','BRA','BRO','BUB','BUD','BUG','BUM','BUN','BUS','BUT','BUY',
  'CAB','CAD','CAM','CAN','CAP','CAR','CAT','COB','COD','COG','COP','COT','COW','COX','COY','CRY','CUB','CUD','CUE','CUP','CUR','CUT',
  'DAB','DAD','DAM','DAY','DEN','DEW','DID','DIE','DIG','DIM','DIP','DOC','DOE','DOG','DON','DOT','DRY','DUB','DUD','DUE','DUG','DUN','DUO','DYE',
  'EAR','EAT','EEL','EGG','EGO','ELF','ELK','ELM','EMU','END','ERA','ERR','EVE','EWE','EYE',
  'FAD','FAN','FAR','FAT','FAX','FED','FEE','FEN','FEW','FIB','FIG','FIN','FIR','FIT','FIX','FLU','FLY','FOB','FOE','FOG','FOP','FOR','FOX','FRY','FUN','FUR',
  'GAB','GAG','GAL','GAP','GAS','GAY','GEE','GEL','GEM','GET','GIG','GIN','GNU','GOB','GOD','GOP','GOT','GUM','GUN','GUT','GUY','GYM',
  'HAD','HAM','HAS','HAT','HAY','HEM','HEN','HER','HEW','HEX','HID','HIM','HIP','HIS','HIT','HOB','HOD','HOG','HOP','HOT','HOW','HUB','HUE','HUG','HUM','HUT',
  'ICE','ICY','ILL','IMP','INK','INN','ION','IRE','IRK','ITS','IVY',
  'JAB','JAG','JAM','JAR','JAW','JAY','JET','JIG','JOB','JOG','JOT','JOY','JUG','JUT',
  'KEG','KEN','KEY','KID','KIN','KIT',
  'LAB','LAC','LAD','LAG','LAP','LAW','LAX','LAY','LEA','LED','LEG','LET','LID','LIE','LIP','LIT','LOG','LOP','LOT','LOW','LUG',
  'MAD','MAN','MAP','MAR','MAT','MAW','MAX','MAY','MEN','MET','MID','MIX','MOB','MOD','MOM','MOP','MOW','MUD','MUG','MUM',
  'NAB','NAG','NAP','NAY','NET','NEW','NIB','NIL','NIP','NIT','NOB','NOD','NOR','NOT','NOW','NUB','NUN','NUT',
  'OAF','OAK','OAR','OAT','ODD','ODE','OFF','OFT','OHM','OHO','OIL','OLD','ONE','OPT','ORB','ORE','OUR','OUT','OWE','OWL','OWN',
  'PAD','PAL','PAN','PAP','PAR','PAT','PAW','PAY','PEA','PEG','PEN','PEP','PER','PET','PEW','PIE','PIG','PIN','PIT','PLY','POD','POP','POT','POW','PRO','PRY','PUB','PUG','PUN','PUP','PUS','PUT',
  'RAD','RAG','RAM','RAN','RAP','RAT','RAW','RAY','RED','REF','REP','RIB','RID','RIG','RIM','RIP','ROB','ROD','ROE','ROT','ROW','RUB','RUG','RUM','RUN','RUT','RYE',
  'SAC','SAD','SAG','SAP','SAT','SAW','SAX','SAY','SEA','SET','SEW','SHE','SHY','SIN','SIP','SIR','SIS','SIT','SIX','SKI','SKY','SLY','SOB','SOD','SON','SOP','SOT','SOW','SOX','SOY','SPA','SPY','STY','SUB','SUM','SUN','SUP',
  'TAB','TAD','TAG','TAN','TAP','TAR','TAT','TAX','TEA','TEN','THE','THY','TIC','TIE','TIN','TIP','TOD','TOE','TOG','TOM','TON','TOO','TOP','TOT','TOW','TOY','TRY','TUB','TUG','TUN','TWO',
  'UGH','UMP','UNS','UPS','URN','USE',
  'VAN','VAT','VET','VIA','VIE','VOW',
  'WAD','WAG','WAR','WAS','WAX','WAY','WEB','WED','WEE','WET','WHO','WHY','WIG','WIN','WIT','WOE','WOK','WON','WOO','WOW',
  'YAK','YAM','YAP','YAW','YEA','YEP','YES','YET','YEW','YIN','YIP','YON','YOU','YOW','YUK','YUM','YUP',
  'ZAP','ZED','ZEE','ZEN','ZIP','ZIT','ZOO',
  
  // 4-Letter Words (includes KITE, FLAP, WHITE, and thousands more)
  'ABLE','ACHE','ACID','ACME','ACNE','ACRE','AGED','AIDE','AIDS','AIMS','AIRS','AIRY','AJAR','AKIN','ALLY','ALSO','AMID','AMOK','AMPS','ANAL','ANTS','APES','APEX','APPS','ARCH','AREA','ARIA','ARMS','ARMY','ARTS','ARTY','ATOM','AUNT','AURA','AUTO','AWED','AWES','AWLS','AWOL','AXED','AXES','AXIS','AXLE',
  'BABE','BABY','BACK','BADE','BAGS','BAIL','BAIT','BAKE','BALD','BALE','BALL','BALM','BAND','BANE','BANG','BANK','BANS','BARB','BARE','BARK','BARN','BARS','BASE','BASH','BASK','BASS','BATH','BATS','BAWL','BAYS','BEAD','BEAK','BEAM','BEAN','BEAR','BEAT','BECK','BEDS','BEEF','BEEN','BEEP','BEER','BEES','BEET','BELL','BELT','BEND','BENT','BERG','BERM','BEST','BETA','BETS','BEVY','BIAS','BIBS','BIDE','BIDS','BIKE','BILE','BILL','BIND','BINS','BIRD','BITE','BITS','BLAB','BLAH','BLED','BLEW','BLIP','BLOB','BLOC','BLOG','BLOT','BLOW','BLUE','BLUR','BOAR','BOAS','BOAT','BOBS','BODE','BODY','BOGS','BOIL','BOLD','BOLT','BOMB','BOND','BONE','BONY','BOOK','BOOM','BOON','BOOR','BOOS','BOOT','BORE','BORN','BOSS','BOTH','BOUT','BOWL','BOWS','BOYS','BRAG','BRAN','BRAS','BRAT','BRAY','BRED','BREW','BRIG','BRIM','BRIO','BRIT','BROW','BRUT','BUCK','BUDS','BUFF','BUGS','BULB','BULK','BULL','BUMP','BUMS','BUNK','BUNS','BUOY','BURN','BURP','BURY','BUSH','BUST','BUSY','BUTS','BUTT','BUYS','BUZZ','BYES',
  'CABS','CAFE','CAGE','CAKE','CALF','CALL','CALM','CAME','CAMP','CAMS','CANE','CANS','CAPE','CAPS','CARD','CARE','CARP','CARS','CART','CASE','CASH','CASK','CAST','CATS','CAVE','CEIL','CELL','CENT','CHAP','CHAR','CHAT','CHEF','CHEW','CHIC','CHIN','CHIP','CHOP','CHOW','CHUB','CHUG','CHUM','CITE','CITY','CLAD','CLAM','CLAN','CLAP','CLAW','CLAY','CLIP','CLOD','CLOG','CLOP','CLOT','CLUB','CLUE','COAL','COAT','COAX','COBS','COCK','CODE','CODS','COGS','COIL','COIN','COKE','COLA','COLD','COLE','COLT','COMB','COME','CONE','COOK','COOL','COOP','COPE','COPS','COPY','CORD','CORE','CORK','CORN','COST','COSY','COUP','COVE','COWS','COZY','CRAB','CRAM','CREW','CRIB','CROP','CROW','CRUD','CUBE','CUBS','CUDS','CUED','CUES','CUFF','CULT','CUPS','CURB','CURD','CURE','CURL','CURS','CURT','CUSP','CUTE','CUTS',
  'DABS','DADS','DAFT','DAME','DAMP','DAMS','DANK','DARE','DARK','DARN','DART','DASH','DATA','DATE','DAWN','DAYS','DAZE','DEAD','DEAF','DEAL','DEAN','DEAR','DEBT','DECK','DEED','DEEM','DEEP','DEER','DEMO','DENT','DENY','DESK','DEWS','DIAL','DICE','DIED','DIES','DIET','DIGS','DIME','DIMS','DINE','DING','DINT','DIPS','DIRE','DIRT','DISC','DISH','DISK','DIVE','DOCK','DOCS','DODO','DOER','DOES','DOLE','DOLL','DOME','DONE','DOOM','DOOR','DOPE','DORK','DORM','DOSE','DOTE','DOTH','DOTS','DOUR','DOVE','DOWN','DOZE','DOZY','DRAB','DRAG','DRAM','DRAT','DRAW','DREW','DRIP','DROP','DRUB','DRUG','DRUM','DUAL','DUBS','DUCK','DUCT','DUDE','DUDS','DUEL','DUES','DUET','DUKE','DULL','DULY','DUMB','DUMP','DUNE','DUNG','DUNK','DUPE','DUSK','DUST','DUTY','DYED','DYER','DYES','DYKE',
  'EACH','EARL','EARN','EARS','EASE','EAST','EASY','EATS','EAVE','ECHO','EDGE','EDGY','EDIT','EELS','EGGS','EGOS','ELSE','EMIT','EMUS','ENDS','ENVY','EPIC','ERAS','EVEN','EVER','EVES','EVIL','EWER','EXAM','EXEC','EXIT','EXES','EYED','EYES',
  'FACE','FACT','FADE','FADS','FAIL','FAIR','FAKE','FALL','FAME','FANG','FANS','FARE','FARM','FART','FAST','FATE','FATS','FAWN','FAZE','FEAR','FEAT','FEDS','FEED','FEEL','FEES','FEET','FELL','FELT','FEND','FERN','FEST','FEUD','FIAT','FIBS','FIEF','FIFE','FIGS','FILE','FILL','FILM','FIND','FINE','FINK','FINS','FIRE','FIRM','FIRS','FISH','FIST','FITS','FIVE','FLAG','FLAK','FLAM','FLAN','FLAP','FLAT','FLAW','FLAX','FLAY','FLEA','FLED','FLEE','FLEW','FLEX','FLIP','FLIT','FLOG','FLOP','FLOW','FLUB','FLUE','FLUX','FOAL','FOAM','FOBS','FOCI','FOES','FOGS','FOGY','FOIL','FOLD','FOLK','FOND','FONT','FOOD','FOOL','FOOT','FOPS','FORD','FORE','FORK','FORM','FORT','FOUL','FOUR','FOWL','FOXY','FRAY','FREE','FRET','FROG','FROM','FUEL','FULL','FUME','FUND','FUNK','FURL','FURY','FUSE','FUSS','FUZZ',
  'GABS','GAGS','GAIN','GAIT','GALE','GALL','GALS','GAME','GAMY','GANG','GAPE','GAPS','GARB','GASH','GASP','GATE','GAVE','GAWK','GAZE','GEAR','GEEK','GELS','GEMS','GENE','GENT','GERM','GETS','GIFT','GIGS','GILD','GILL','GILT','GINS','GIRD','GIRL','GIST','GIVE','GLAD','GLAM','GLEN','GLIB','GLOB','GLOM','GLOP','GLOW','GLUE','GLUM','GLUT','GNAR','GNAT','GNAW','GNUS','GOAD','GOAL','GOAT','GOBS','GODS','GOER','GOES','GOLD','GOLF','GONE','GONG','GOOD','GOOF','GOON','GOOP','GORE','GORY','GOSH','GOTH','GOUT','GOWN','GRAB','GRAD','GRAM','GRAY','GREW','GREY','GRID','GRIM','GRIN','GRIP','GRIT','GROG','GROK','GROW','GRUB','GULF','GULP','GUMS','GUNK','GUNS','GURU','GUSH','GUST','GUTS','GUYS','GYBE','GYMS','GYRO',
  'HACK','HAFT','HAGS','HAIL','HAIR','HAKE','HALE','HALF','HALL','HALO','HALT','HAMS','HAND','HANG','HANK','HAPS','HARD','HARE','HARM','HARP','HASH','HASP','HAST','HATE','HATH','HATS','HAUL','HAVE','HAWK','HAYS','HAZE','HAZY','HEAD','HEAL','HEAP','HEAR','HEAT','HECK','HEED','HEEL','HEFT','HEIR','HELD','HELL','HELM','HELP','HEMS','HENS','HERB','HERD','HERE','HERO','HERS','HEWN','HEWS','HICK','HIDE','HIED','HIES','HIGH','HIKE','HILL','HILT','HIND','HINT','HIPS','HIRE','HISS','HITS','HIVE','HOAX','HOBS','HOCK','HODS','HOED','HOER','HOES','HOGS','HOLD','HOLE','HOLY','HOME','HONE','HONK','HOOD','HOOF','HOOK','HOOP','HOOT','HOPE','HOPS','HORA','HORN','HOSE','HOST','HOUR','HOVE','HOWL','HOWS','HUBS','HUED','HUES','HUFF','HUGE','HUGS','HULK','HULL','HUMP','HUMS','HUNG','HUNK','HUNT','HURL','HURT','HUSH','HUSK','HUTS','HYMN','HYPE','HYPO',
  'IBIS','ICED','ICES','ICKY','ICON','IDEA','IDLE','IDLY','IDOL','IFFY','INKS','INKY','INNS','INTO','IONS','IOTA','IRIS','IRKS','IRON','ISLE','ITCH','ITEM','IVYS',
  'JABS','JACK','JADE','JAGS','JAIL','JAKE','JAMB','JAMS','JANE','JARS','JAVA','JAWS','JAYS','JAZZ','JEAN','JEER','JELL','JERK','JEST','JETS','JIBE','JIBS','JIFF','JIGS','JILT','JINK','JINX','JIVE','JOBS','JOCK','JOGS','JOIN','JOKE','JOLT','JOSH','JOTS','JOWL','JOYS','JUDO','JUGS','JUMP','JUNE','JUNK','JURY','JUST','JUTS',
  'KALE','KEEN','KEEP','KEGS','KELP','KEPT','KEYS','KICK','KIDS','KILL','KILN','KILT','KIND','KING','KINK','KISS','KITE','KITS','KIWI','KNEE','KNEW','KNIT','KNOB','KNOT','KNOW','KONG','KOOK',
  'LABS','LACE','LACK','LACY','LADS','LADY','LAGS','LAID','LAIR','LAKE','LAMB','LAME','LAMP','LAND','LANE','LAPS','LARD','LARK','LARS','LASH','LASS','LAST','LATE','LATH','LAUD','LAVA','LAWN','LAWS','LAYS','LAZE','LAZY','LEAD','LEAF','LEAK','LEAN','LEAP','LEER','LEFT','LEGS','LEND','LENS','LENT','LESS','LEST','LEVY','LIAR','LIBS','LICE','LICK','LIDS','LIED','LIEN','LIES','LIEU','LIFE','LIFT','LIKE','LILY','LIMB','LIME','LIMP','LINE','LINK','LINT','LION','LIPS','LISP','LIST','LITE','LIVE','LOAD','LOAF','LOAM','LOAN','LOBE','LOBS','LOCK','LODE','LOFT','LOGE','LOGO','LOGS','LOIN','LONE','LONG','LOOK','LOOM','LOON','LOOP','LOOT','LORD','LORE','LORN','LOSE','LOSS','LOST','LOTS','LOUD','LOUR','LOUT','LOVE','LOWS','LUCK','LUGE','LULL','LUMP','LUNE','LUNG','LURE','LURK','LUSH','LUST','LUTE','LYNX','LYRE',
  'MACE','MADE','MADS','MAGE','MAGI','MAID','MAIL','MAIM','MAIN','MAKE','MALE','MALL','MALT','MAMA','MANE','MANS','MANY','MAPS','MARE','MARK','MARS','MART','MASH','MASK','MASS','MAST','MATE','MATH','MATS','MAUL','MAYO','MAZE','MEAD','MEAL','MEAN','MEAT','MEEK','MEET','MEGA','MELD','MELT','MEMO','MEND','MENU','MEOW','MERE','MESH','MESS','META','METE','MICA','MICE','MIDI','MILD','MILE','MILK','MILL','MIME','MIND','MINE','MINI','MINK','MINT','MINX','MIRE','MISS','MIST','MITE','MITT','MOAN','MOAT','MOBS','MOCK','MODE','MOJO','MOLD','MOLE','MOLT','MOLY','MONK','MOOD','MOON','MOOR','MOOT','MOPE','MOPS','MORE','MORN','MOSS','MOST','MOTH','MOVE','MUCH','MUCK','MUDS','MUFF','MUGS','MULE','MULL','MUMP','MUMS','MUNG','MURK','MUSE','MUSH','MUSK','MUST','MUTE','MUTT','MYTH',
  'NABS','NAGS','NAIL','NAME','NANA','NAPE','NAPS','NARC','NARY','NAVE','NAVY','NAYS','NEAR','NEAT','NECK','NEED','NEON','NERD','NEST','NETS','NEWS','NEWT','NEXT','NIBS','NICE','NICK','NIGH','NINE','NIPS','NITS','NODE','NODS','NOEL','NOIR','NOME','NONE','NOOK','NOON','NOPE','NORM','NOSE','NOSY','NOTE','NOUN','NOVA','NUBS','NUDE','NULL','NUMB','NUNS','NUTS',
  'OAFS','OAKS','OARS','OATH','OATS','OBEY','OBOE','ODDS','ODOR','OFFS','OGLE','OGRE','OHED','OHOS','OILS','OILY','OINK','OKAY','OKRA','OLDS','OMEN','OMIT','ONCE','ONES','ONLY','ONTO','ONUS','OOPS','OOZE','OOZY','OPAL','OPEN','OPTS','OPUS','ORAL','ORBS','ORCA','ORES','ORGY','OURS','OUST','OUTS','OUZO','OVEN','OVER','OWED','OWES','OWLS','OWNS','OXEN','OXES',
  'PACE','PACK','PACT','PADS','PAGE','PAID','PAIL','PAIN','PAIR','PALE','PALL','PALM','PALS','PANE','PANG','PANS','PANT','PAPA','PAPS','PARE','PARK','PARS','PART','PASS','PAST','PATE','PATH','PATS','PAVE','PAWN','PAWS','PAYS','PEAK','PEAL','PEAR','PEAS','PEAT','PECK','PECS','PEDS','PEEK','PEEL','PEEP','PEER','PEES','PEGS','PELT','PEND','PENS','PENT','PEON','PEPS','PERK','PERM','PERP','PERT','PESO','PEST','PETS','PEWS','PICK','PICS','PIED','PIER','PIES','PIGS','PIKE','PILE','PILL','PIMP','PINE','PING','PINK','PINS','PINT','PIPE','PIPS','PISS','PITA','PITH','PITS','PITY','PLAN','PLAY','PLEA','PLED','PLOD','PLOP','PLOT','PLOW','PLOY','PLUG','PLUM','PLUS','POCK','PODS','POEM','POET','POKE','POKY','POLE','POLL','POLO','POLS','POMP','POND','PONE','PONY','POOH','POOL','POOP','POOR','POPE','POPS','PORE','PORK','PORN','PORT','POSE','POSH','POST','POSY','POTS','POUR','POUT','PRAM','PRAT','PRAY','PREP','PREY','PRIG','PRIM','PROD','PROM','PROP','PROW','PRYS','PUBS','PUCE','PUCK','PUDS','PUFF','PUGS','PUKE','PULL','PULP','PUMA','PUMP','PUNS','PUNY','PUPA','PUPS','PURE','PURL','PURR','PUSH','PUSS','PUTS','PUTT','PUTZ',
  'QUAD','QUAY','QUID','QUIP','QUIT','QUIZ',
  'RACE','RACK','RACY','RAFT','RAGE','RAGS','RAID','RAIL','RAIN','RAKE','RAMP','RAMS','RAND','RANG','RANK','RANT','RAPE','RAPS','RAPT','RARE','RASH','RASP','RATE','RATS','RAVE','RAWS','RAYS','RAZE','READ','REAL','REAM','REAP','REAR','REDO','REDS','REED','REEF','REEK','REEL','REFS','REIN','RELY','REND','RENT','REPO','REPS','REST','RICE','RICH','RIDE','RIDS','RIFE','RIFF','RIFT','RIGS','RILE','RILL','RIME','RIMS','RIND','RING','RINK','RIOT','RIPE','RIPS','RISE','RISK','RITE','ROAD','ROAM','ROAR','ROBE','ROBS','ROCK','RODE','RODS','ROIL','ROLE','ROLL','ROMP','ROOF','ROOK','ROOM','ROOT','ROPE','ROPY','ROSE','ROSY','ROTE','ROTS','ROUT','ROVE','ROWS','RUBE','RUBS','RUBY','RUCK','RUDE','RUED','RUES','RUFF','RUGS','RUIN','RULE','RUMP','RUMS','RUNE','RUNG','RUNS','RUNT','RUSE','RUSH','RUST','RUTH','RUTS',
  'SACK','SACS','SAFE','SAGA','SAGE','SAGO','SAGS','SAID','SAIL','SAKE','SALE','SALT','SAME','SAND','SANE','SANG','SANK','SANS','SAPS','SASH','SASS','SATE','SAVE','SAWN','SAWS','SAYS','SCAB','SCAM','SCAN','SCAR','SCAT','SCOW','SEAL','SEAM','SEAR','SEAS','SEAT','SECT','SEED','SEEK','SEEM','SEEN','SEEP','SEER','SEES','SELF','SELL','SEMI','SEND','SENT','SEPT','SERA','SERF','SETS','SEWN','SEWS','SEXY','SHAG','SHAH','SHAM','SHAW','SHED','SHIM','SHIN','SHIP','SHIV','SHMO','SHOD','SHOE','SHOO','SHOP','SHOT','SHOW','SHUN','SHUT','SICK','SIDE','SIFT','SIGH','SIGN','SILK','SILL','SILO','SILT','SINE','SING','SINK','SIPS','SIRE','SIRS','SITE','SITS','SIZE','SKAG','SKAT','SKEG','SKEW','SKID','SKIM','SKIN','SKIP','SKIS','SKIT','SLAB','SLAG','SLAM','SLAP','SLAT','SLAW','SLAY','SLED','SLEW','SLID','SLIM','SLIT','SLOB','SLOE','SLOG','SLOP','SLOT','SLOW','SLUB','SLUE','SLUG','SLUM','SLUR','SLUT','SMOG','SNAG','SNAP','SNOB','SNOT','SNOW','SNUB','SNUG','SOAK','SOAP','SOAR','SOBS','SOCK','SODA','SODS','SOFA','SOFT','SOIL','SOLD','SOLE','SOLO','SOME','SONS','SOON','SOOT','SOPS','SORE','SORT','SOUL','SOUP','SOUR','SOWN','SOWS','SOYA','SPAN','SPAR','SPAS','SPAT','SPAY','SPEC','SPED','SPEW','SPIN','SPIT','SPOT','SPRY','SPUD','SPUN','SPUR','STAB','STAG','STAR','STAY','STEM','STEP','STEW','STIR','STOP','STOW','STUB','STUD','STUN','STYE','SUBS','SUCH','SUCK','SUDS','SUED','SUES','SUET','SUIT','SULK','SUMO','SUMP','SUMS','SUNG','SUNK','SUNS','SUPE','SUPS','SURE','SURF','SWAB','SWAM','SWAN','SWAP','SWAT','SWAY','SWIM','SWOP','SYNC',
  'TABS','TACK','TACO','TACT','TADS','TAGS','TAIL','TAKE','TALE','TALK','TALL','TAME','TAMP','TAMS','TANG','TANK','TANS','TAPE','TAPS','TARE','TARN','TARO','TARP','TARS','TART','TASK','TATS','TAUT','TAXI','TEAK','TEAL','TEAM','TEAR','TEAS','TEAT','TECH','TEDS','TEED','TEEM','TEEN','TEES','TELL','TEMP','TEND','TENS','TENT','TERM','TERN','TEST','TEXT','THAN','THAT','THAW','THEE','THEM','THEN','THEW','THEY','THIN','THIS','THUD','THUG','THUS','TICK','TIDE','TIDY','TIED','TIER','TIES','TIFF','TILE','TILL','TILT','TIME','TINE','TING','TINS','TINT','TINY','TIPS','TIRE','TITS','TOAD','TOCK','TOED','TOES','TOFT','TOFU','TOGA','TOGS','TOIL','TOKE','TOLD','TOLL','TOMB','TOME','TONE','TONS','TONY','TOOK','TOOL','TOOT','TOPS','TORE','TORN','TORT','TORY','TOSS','TOTE','TOTS','TOUR','TOUT','TOWN','TOWS','TOYS','TRAM','TRAP','TRAY','TREE','TREK','TRIM','TRIO','TRIP','TROD','TROT','TRUE','TUBA','TUBE','TUBS','TUCK','TUFT','TUGS','TUNA','TUNE','TUNS','TURD','TURF','TURN','TUSK','TUTU','TWIG','TWIN','TWIT','TYPE','TYPO',
  'UBER','UNDO','UNIT','UNTO','UPON','URGE','URNS','USED','USER','USES',
  'VAIN','VALE','VAMP','VANE','VANS','VARY','VASE','VAST','VATS','VEAL','VEEP','VEER','VEIL','VEIN','VEND','VENT','VERB','VERY','VEST','VETO','VETS','VIAL','VIBE','VICE','VIED','VIES','VIEW','VILE','VINE','VISA','VISE','VOID','VOLT','VOTE','VOWS',
  'WADE','WADS','WAFT','WAGE','WAGS','WAIF','WAIL','WAIT','WAKE','WALK','WALL','WAND','WANE','WANT','WARD','WARE','WARM','WARN','WARP','WARS','WART','WARY','WASH','WASP','WATT','WAVE','WAVY','WAXY','WAYS','WEAK','WEAN','WEAR','WEDS','WEED','WEEK','WEEP','WELD','WELL','WELT','WEND','WENT','WEPT','WERE','WEST','WETS','WHAM','WHAT','WHEN','WHET','WHEY','WHIG','WHIM','WHIP','WHIR','WHIT','WHIZ','WHOM','WICK','WIDE','WIFE','WIGS','WILD','WILE','WILL','WILT','WIMP','WIND','WINE','WING','WINK','WINS','WIPE','WIRE','WIRY','WISE','WISH','WISP','WITH','WITS','WIVE','WOES','WOKE','WOLF','WOMB','WONT','WOOD','WOOF','WOOL','WOOS','WORD','WORE','WORK','WORM','WORN','WORT','WOVE','WRAP','WREN','WRIT',
  'YANG','YANK','YAPS','YARD','YARN','YAWN','YAWP','YAWS','YEAH','YEAR','YEAS','YELL','YELP','YENS','YEPS','YERK','YETI','YEWS','YIDS','YIPE','YIPS','YOBS','YOKE','YOLK','YORE','YOUR','YOWL','YOWS','YUAN','YUCK','YUKS','YULE','YUPS',
  'ZANY','ZAPS','ZEAL','ZEBU','ZERO','ZEST','ZINC','ZING','ZIPS','ZONE','ZOOM','ZOOS','ZYME',
  
  // 5-Letter Words (common ones)
  'ABOUT','ABOVE','ABUSE','ACTED','ACTOR','ACUTE','ADDED','ADMIT','ADOPT','ADULT','AFTER','AGAIN','AGENT','AGREE','AHEAD','ALARM','ALBUM','ALERT','ALIEN','ALIGN','ALIKE','ALIVE','ALLOW','ALLOY','ALONE','ALONG','ALPHA','ALTER','AMAZE','AMBER','AMONG','ANGER','ANGLE','ANGRY','ANKLE','APART','APPLE','APPLY','ARENA','ARGUE','ARISE','ARMED','ARMOR','AROSE','ARRAY','ARROW','ASKED','ASSET','ATLAS','AVOID','AWAKE','AWARD','AWARE','AWFUL',
  'BACON','BADGE','BADLY','BAKER','BALLS','BANDS','BANKS','BASED','BASIC','BASIN','BASIS','BATCH','BEACH','BEARD','BEAST','BEGAN','BEGIN','BEGUN','BEING','BELOW','BENCH','BIBLE','BIKES','BILLY','BIRDS','BIRTH','BLACK','BLADE','BLAME','BLANK','BLAST','BLAZE','BLEED','BLEND','BLESS','BLIND','BLOCK','BLOND','BLOOD','BLOWN','BLUES','BOARD','BOATS','BODYS','BOMBS','BONDS','BONES','BONUS','BOOKS','BOOTS','BOOTH','BORED','BOUND','BRAIN','BRAND','BRASS','BRAVE','BREAD','BREAK','BREED','BRICK','BRIDE','BRIEF','BRING','BROAD','BROKE','BROWN','BRUSH','BUILD','BUILT','BUNCH','BUNNY','BURNS','BURNT','BURST','BUYER',
  'CABIN','CABLE','CANDY','CARDS','CARRY','CASES','CATCH','CAUSE','CELLS','CHAIN','CHAIR','CHALK','CHAOS','CHARM','CHART','CHASE','CHEAP','CHEAT','CHECK','CHEEK','CHEER','CHESS','CHEST','CHICK','CHIEF','CHILD','CHINA','CHIPS','CHOSE','CHUNK','CIVIL','CLAIM','CLASS','CLEAN','CLEAR','CLERK','CLICK','CLIFF','CLIMB','CLOCK','CLOSE','CLOTH','CLOUD','COACH','COAST','COATS','CODES','COINS','COLON','COLOR','COMES','COMET','COMIC','CORAL','COUCH','COUGH','COULD','COUNT','COURT','COVER','CRACK','CRAFT','CRASH','CRAZY','CREAM','CREEK','CREEP','CRIED','CRIME','CRISP','CROSS','CROWD','CROWN','CRUEL','CRUSH','CURVE','CYCLE',
  'DADDY','DAILY','DAIRY','DANCE','DATED','DATES','DEALT','DEATH','DEBUT','DECAY','DELAY','DELTA','DEMON','DENSE','DEPTH','DESKS','DEVIL','DIARY','DIGIT','DIRTY','DISCO','DITCH','DIVER','DIZZY','DODGE','DOING','DOLLS','DONOR','DONUT','DOORS','DOUGH','DOUBT','DOZEN','DRAFT','DRAIN','DRAKE','DRAMA','DRANK','DRAWN','DRAWS','DREAM','DRESS','DRIED','DRIFT','DRILL','DRINK','DRIVE','DROWN','DRUGS','DRUMS','DRUNK','DRYER','DUCKS','DUMMY','DUTCH','DYING',
  'EAGER','EAGLE','EARLY','EARTH','EATEN','EDGES','EIGHT','ELBOW','ELDER','ELECT','ELITE','EMPTY','ENDED','ENEMY','ENJOY','ENTER','ENTRY','EQUAL','ERROR','ESSAY','EVENT','EVERY','EXACT','EXAMS','EXCEL','EXIST','EXTRA',
  'FACED','FACES','FACTS','FAINT','FAIRY','FAITH','FALSE','FANCY','FARMS','FATAL','FAULT','FAVOR','FEARS','FEAST','FEELS','FENCE','FERRY','FEWER','FIBER','FIELD','FIFTH','FIFTY','FIGHT','FILED','FILES','FINAL','FINDS','FIRED','FIRES','FIRMS','FIRST','FIXED','FLAGS','FLAME','FLASH','FLASK','FLATS','FLESH','FLIES','FLOAT','FLOCK','FLOOD','FLOOR','FLOUR','FLOWS','FLUID','FLUSH','FLUTE','FOCUS','FOLKS','FOODS','FOOLS','FORCE','FORGE','FORMS','FORTH','FORTY','FORUM','FOSSIL','FOUND','FRAME','FRANK','FRAUD','FREED','FRESH','FRIED','FRONT','FROST','FRUIT','FULLY','FUNDS','FUNNY','FUZZY',
  'GAINS','GAMES','GANGS','GASES','GATES','GAUGE','GEARS','GENES','GENRE','GHOST','GIANT','GIFTS','GIRLS','GIVEN','GIVES','GLAD','GLASS','GLAZE','GLOBE','GLORY','GLOSS','GLOVE','GOALS','GOATS','GOING','GOLDEN','GOODS','GOOSE','GRACE','GRADE','GRAIN','GRAND','GRANT','GRAPE','GRAPH','GRASP','GRASS','GRAVE','GRAVY','GRAYS','GREAT','GREED','GREEN','GREET','GRIEF','GRILL','GRIME','GRIND','GRIPS','GROSS','GROUP','GROVE','GROWS','GUARD','GUESS','GUEST','GUIDE','GUILT','GUMMY','GYPSY',
  'HABIT','HANDS','HANDY','HANGS','HAPPY','HARDY','HARSH','HASN\'T','HASTE','HATED','HATES','HAUNT','HAVEN','HEADS','HEALS','HEARD','HEARS','HEART','HEATH','HEAVY','HEDGE','HEELS','HELD','HELLO','HELPS','HENCE','HERBS','HERDS','HEROS','HIDES','HILLS','HINTS','HIPPO','HIRED','HOBBY','HOLDS','HOLES','HOLLY','HOMES','HONEY','HONOR','HOOKS','HOPED','HOPES','HORNS','HORSE','HOSTS','HOTEL','HOURS','HOUSE','HOVER','HUMAN','HUMOR','HURRY','HURTS',
  'IDEAL','IDEAS','IMAGE','IMPLY','INDEX','INDIA','INNER','INPUT','INTEL','INTRO','IRON','IRONY','ISSUE','ITEMS','IVORY',
  'JACKS','JAPAN','JEANS','JELLY','JESUS','JEWEL','JIMMY','JOBS','JOINS','JOINT','JOKES','JONES','JUDGE','JUICE','JUICY','JUMBO','JUMPS','JUNK','JUNKY',
  'KEEPS','KICKS','KINDS','KINGS','KITES','KNEES','KNELT','KNIFE','KNOCK','KNOTS','KNOWN','KNOWS',
  'LABEL','LABOR','LACED','LACKS','LAKES','LAMPS','LANDS','LANES','LARGE','LASER','LASTED','LATER','LATIN','LAUGH','LAYER','LEADS','LEAKY','LEANS','LEAPS','LEARN','LEASE','LEAST','LEAVE','LEDGE','LEGAL','LEMON','LEVER','LEVEL','LEWIS','LIGHT','LIKED','LIKES','LIMBS','LIMIT','LINED','LINEN','LINER','LINES','LINKS','LIONS','LISTS','LITER','LIVED','LIVER','LIVES','LOADS','LOANS','LOBBY','LOCAL','LOCKS','LODGE','LOGIC','LOGOS','LONELY','LONGS','LOOKS','LOOPS','LOOSE','LORDS','LOSER','LOSES','LOSSES','LOTUS','LOTTO','LOUIS','LOVED','LOVER','LOVES','LOWER','LOYAL','LUCKY','LUNCH','LUNGS','LYING','LYRIC',
  'MACRO','MAGIC','MAJOR','MAKER','MAKES','MALES','MALLS','MANOR','MAPLE','MARCH','MARKS','MARRY','MARSH','MASKS','MASON','MATCH','MAYBE','MAYOR','MEALS','MEANS','MEANT','MEDAL','MEDIA','MELON','MELTS','MENUS','MERCY','MERGE','MERIT','MERRY','MESSY','METAL','METER','METRO','MICRO','MIDST','MIGHT','MILES','MILLS','MIMIC','MINDS','MINER','MINES','MINOR','MINUS','MINTS','MIXED','MIXER','MODEL','MODEM','MOIST','MONEY','MONKS','MONTH','MOODS','MORAL','MOTOR','MOTTO','MOUNT','MOUSE','MOUTH','MOVED','MOVER','MOVES','MOVIE','MUDDY','MULTI','MUMMY','MURKY','MUSIC','MUTUAL','MYTHS',
  'NAIVE','NAKED','NAMED','NAMES','NASTY','NAVAL','NEEDS','NERVE','NEVER','NEWLY','NEXTS','NIGHT','NINTH','NOBLE','NODES','NOISE','NOISY','NORMS','NORTH','NOSED','NOSEC','NOTED','NOTES','NOVEL','NURSE','NYLON',
  'OASIS','OCCUR','OCEAN','ODDER','OFFER','OFTEN','OLDER','OLIVE','OMEGA','ONION','ONSET','OPERA','OPTED','ORBIT','ORDER','ORGAN','OTHER','OUGHT','OUNCE','OUTER','OWNED','OWNER','OXIDE','OZONE',
  'PACKS','PAGES','PAINS','PAINT','PAIRS','PALMS','PANEL','PANIC','PANTS','PAPER','PARKS','PARTS','PARTY','PASTA','PASTE','PATCH','PATHS','PATIO','PAUSE','PEACE','PEACH','PEAKS','PEARL','PEARS','PEDAL','PEERS','PENNY','PERCH','PETER','PETTY','PHASE','PHONE','PHOTO','PIANO','PICKS','PIECE','PILLS','PILOT','PINCH','PITCH','PIXEL','PIZZA','PLACE','PLAIN','PLANE','PLANS','PLANT','PLATE','PLAYS','PLAZA','PLEAD','PLEAS','PLUMB','PLUMP','PLUMS','POINT','POKER','POLAR','POLES','POLLS','POOLS','PORCH','PORTS','POSED','POSES','POSTS','POUCH','POUND','POWER','PRANK','PRAYS','PRESS','PRICE','PRIDE','PRIME','PRINT','PRIOR','PRIZE','PROBE','PROMO','PRONE','PROOF','PROPS','PROSE','PROUD','PROVE','PROXY','PRUNE','PSYCH','PULLS','PULSE','PUMPS','PUNCH','PUPIL','PUPPY','PURSE','PUSSY','QUEEN','QUERY','QUEST','QUEUE','QUICK','QUIET','QUILT','QUIRK','QUITE','QUOTA','QUOTE',
  'RACES','RACKS','RADAR','RADIO','RAILS','RAINS','RAINY','RAISE','RALLY','RANCH','RANGE','RANKS','RAPID','RATED','RATES','RATIO','RAVEN','RAZOR','REACH','REACT','READS','READY','REALM','REBEL','RECAP','REFER','REIGN','RELAX','RELAY','RENAL','RENEW','RENTS','REPLY','RESET','RESIN','RESORTS','RETRO','REVUE','RHYME','RIDER','RIDES','RIDGE','RIFLE','RIGHT','RIGID','RINGS','RIOTS','RISEN','RISES','RISKS','RISKY','RIVAL','RIVER','ROADS','ROAST','ROBES','ROBOT','ROCKS','ROCKY','ROGER','ROLES','ROLLS','ROMAN','ROOFS','ROOMS','ROOTS','ROPES','ROSES','ROTOR','ROUGE','ROUGH','ROUND','ROUTE','ROYAL','RUGBY','RUINS','RULED','RULER','RULES','RUMOR','RURAL','RUSTY',
  'SADLY','SAFER','SAINT','SALAD','SALES','SALLY','SALON','SALTS','SALTY','SAMBA','SANDY','SANTA','SATIN','SAUCE','SAVES','SCALE','SCAM','SCARE','SCARF','SCARY','SCENE','SCENT','SCORE','SCOUT','SCRAP','SCREW','SEALS','SEATS','SEEDS','SEEKS','SEEMS','SEIZE','SELLS','SENDS','SENSE','SERVE','SETUP','SEVEN','SHADE','SHADY','SHAKE','SHAKY','SHALL','SHAME','SHAPE','SHARE','SHARK','SHARP','SHAVE','SHAWL','SHEAR','SHED','SHEDS','SHEER','SHEET','SHELF','SHELL','SHIFT','SHINY','SHIPS','SHIRT','SHOCK','SHOES','SHOOK','SHOOT','SHOPS','SHORE','SHORT','SHOTS','SHOUT','SHOVE','SHOWN','SHOWS','SHRUG','SHUTS','SIDED','SIDES','SIEGE','SIGHT','SIGMA','SIGNS','SILLY','SIMON','SINCE','SINGS','SITES','SIXTH','SIXTY','SIZED','SIZES','SKATE','SKILL','SKINS','SKIRT','SKULLS','SLABS','SLANG','SLAPS','SLASH','SLATE','SLAVE','SLEEK','SLEEP','SLEPT','SLICE','SLIDE','SLIME','SLIMY','SLING','SLIPS','SLOPE','SLOTS','SLOWS','SMALL','SMART','SMASH','SMELL','SMILE','SMOKE','SMOKY','SNACK','SNAKE','SNAPS','SNEAK','SNIFF','SNOWY','SOBER','SOCAL','SOCKS','SOLAR','SOLID','SOLVE','SONGS','SONIC','SORRY','SORTS','SOULS','SOUND','SOUTH','SPACE','SPARE','SPARK','SPAWN','SPEAK','SPEAR','SPECS','SPEED','SPELL','SPEND','SPENT','SPICE','SPICY','SPIES','SPIKE','SPILL','SPINE','SPLIT','SPOKE','SPOON','SPORT','SPOTS','SPRAY','SPREE','SQUAD','STACK','STAFF','STAGE','STAIN','STAIR','STAKE','STALE','STAMP','STAND','STARE','STARK','STARS','START','STATE','STATS','STAYS','STEAK','STEAL','STEAM','STEEL','STEEP','STEER','STEMS','STEPS','STERN','STICK','STIFF','STILL','STOCK','STOLE','STONE','STONY','STOOD','STOOL','STOPS','STORE','STORM','STORY','STOUT','STOVE','STRAP','STRAW','STRAY','STRIP','STUCK','STUDY','STUFF','STUMP','STUNG','STUNK','STYLE','SUCKS','SUGAR','SUITE','SUITS','SULKY','SUNNY','SUPER','SURGE','SUSHI','SWAMP','SWANS','SWEAR','SWEAT','SWEEP','SWEET','SWEPT','SWIFT','SWIMS','SWING','SWISS','SWORD','SWORE','SWORN','SWUNG','SYRUP',
  'TABLE','TACKY','TAILS','TAKEN','TAKES','TALES','TALKS','TAMPA','TANKS','TAPES','TARDY','TASKS','TASTE','TASTY','TAXES','TEACH','TEAMS','TEARS','TEARY','TEASE','TEDDY','TEENS','TEETH','TELLS','TEMPO','TENDS','TENOR','TENSE','TENTH','TENTS','TERMS','TESTS','TEXAS','TEXTS','THANK','THEFT','THEME','THERE','THESE','THICK','THIEF','THIGH','THING','THINK','THIRD','THOSE','THREE','THREW','THROW','THUMB','TIDAL','TIDES','TIGER','TIGHT','TILES','TIMER','TIMES','TIRED','TIRES','TITLE','TOAST','TODAY','TOKEN','TOKYO','TOLLS','TOMBS','TONAL','TONED','TONES','TONIC','TOOLS','TOOTH','TOPIC','TORCH','TOTAL','TOTEM','TOUCH','TOUGH','TOURS','TOWEL','TOWER','TOWNS','TOXIC','TRACE','TRACK','TRACT','TRADE','TRAIL','TRAIN','TRAIT','TRANS','TRASH','TREAT','TREES','TREND','TRIAL','TRIBE','TRICK','TRIED','TRIES','TRIMS','TRIPS','TROLL','TROOP','TROUT','TRUCK','TRULY','TRUMP','TRUNK','TRUST','TRUTH','TUBES','TULIP','TUMMY','TUNED','TUNES','TURNS','TUTOR','TWICE','TWINS','TWIST','TYPED','TYPES',
  'UDDER','UGLY','ULTRA','UNCLE','UNDER','UNDID','UNDUE','UNION','UNITE','UNITS','UNITY','UNLIT','UNTIL','UPPER','UPSET','URBAN','URGED','URGES','USAGE','USERS','USING','USUAL','UTTER',
  'VAGUE','VALID','VALOR','VALUE','VALVE','VAPOR','VAULT','VEGAS','VEGAN','VEINS','VELVE','VENOM','VENUE','VERGE','VERSE','VIDEO','VIEWS','VILLA','VINYL','VIOLA','VIRUS','VISIT','VISTA','VITAL','VIVID','VOCAL','VODKA','VOICE','VOMIT','VOTED','VOTER','VOTES','VOUCH','VOWEL',
  'WACKY','WADED','WADER','WADES','WAGER','WAGES','WAGON','WAIST','WAITS','WAKEN','WAKES','WALKS','WALLS','WALTZ','WANDS','WANTS','WARDS','WARMS','WARNS','WASTE','WATCH','WATER','WATTS','WAVED','WAVES','WAVY','WAXED','WAXES','WAYS','WEAKER','WEALTH','WEAPON','WEARS','WEARY','WEAVE','WEEDS','WEEKS','WEIGH','WEIRD','WELSH','WHEAT','WHEEL','WHERE','WHICH','WHILE','WHINE','WHITE','WHOLE','WHOSE','WICKED','WIDEN','WIDER','WIDOW','WIDTH','WIELD','WILDS','WILLS','WIMPY','WINDS','WINDY','WINED','WINES','WINGS','WINKS','WIPED','WIPER','WIRES','WISER','WITCH','WITTY','WIVES','WOKEN','WOMAN','WOMBS','WOMEN','WOODS','WOODY','WORDS','WORKS','WORLD','WORMS','WORRY','WORSE','WORST','WORTH','WOULD','WOUND','WOVEN','WRAPS','WRATH','WRECK','WREST','WRING','WRIST','WRITE','WRONG','WROTE','WRUNG',
  'YACHT','YARDS','YARNS','YAWNS','YEARN','YEARS','YEAST','YIELD','YOUNG','YOURS','YOUTH','YUCKY','YUMMY',
  'ZAPPY','ZEBRA','ZEROS','ZESTY','ZONED','ZONES','ZOOMS'
];

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
  } catch { wordCache.set(upper, false); return false; }
};
const isValidWordSync = (word) => VALID_WORDS.has(word.toUpperCase());

const PancakeTile = ({ letter, stackHeight = 1, size = 'md', selected = false, onClick, disabled = false, isNew = false }) => {
  const sizeClasses = { sm: 'w-7 h-7 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' };
  const stackLayers = Math.min(stackHeight, 5);
  return (
    <div className={`relative ${disabled ? 'opacity-50' : 'cursor-pointer'}`} onClick={disabled ? undefined : onClick}>
      {stackHeight > 1 && Array.from({ length: stackLayers - 1 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-amber-700 border border-amber-800"
          style={{ width: size === 'sm' ? '28px' : size === 'md' ? '40px' : '48px', height: size === 'sm' ? '28px' : size === 'md' ? '40px' : '48px', top: `${(stackLayers - 1 - i) * 3}px`, left: '0px', zIndex: i }} />
      ))}
      <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold relative transition-all duration-200 ${selected ? 'bg-gradient-to-br from-amber-200 to-amber-400 ring-4 ring-amber-500 scale-110 shadow-xl z-30' : 'bg-gradient-to-br from-amber-100 to-amber-300 hover:from-amber-200 hover:to-amber-400 hover:shadow-lg'} ${isNew ? 'ring-2 ring-emerald-500' : ''} border-2 border-amber-500 shadow-md`}
        style={{ zIndex: 20, marginTop: stackHeight > 1 ? `${(stackLayers - 1) * 3}px` : '0', fontFamily: 'Georgia, serif' }}>
        <span className="text-amber-900">{letter}</span>
      </div>
      {stackHeight > 1 && <div className="absolute bg-amber-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold" style={{ top: '-4px', right: '-4px', zIndex: 25 }}>{stackHeight}</div>}
    </div>
  );
};

const BoardCell = ({ onClick, isCenter, isHighlighted, hasLetter, children }) => (
  <div onClick={onClick} className={`w-8 h-8 md:w-9 md:h-9 border border-amber-300/50 flex items-center justify-center cursor-pointer transition-all ${isCenter && !hasLetter ? 'bg-amber-200/80' : 'bg-amber-50/60'} ${isHighlighted ? 'bg-amber-300/80 ring-2 ring-amber-500' : ''} ${!hasLetter && !isCenter ? 'hover:bg-amber-100/80' : ''}`}>
    {children}
    {isCenter && !hasLetter && <span className="text-amber-600 text-lg">⭐</span>}
  </div>
);

const StatsModal = ({ stats, onClose }) => {
  const unlockedAchievements = stats.unlockedAchievements || [];
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-stone-800/95 backdrop-blur-md rounded-3xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto border border-stone-600/50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>📊 Your Statistics</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-amber-100 text-2xl">✕</button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[['gamesPlayed','Games Played'],['gamesWon','Games Won'],['gamesLost','Games Lost'],['gamesTied','Games Tied'],['currentStreak','Current Streak 🔥'],['bestStreak','Best Streak'],['highestScore','Highest Score'],['totalWordsPlayed','Words Played']].map(([key, label]) => (
            <div key={key} className="bg-stone-700/50 backdrop-blur-sm rounded-xl p-3 text-center border border-stone-600/30">
              <div className="text-2xl font-bold text-amber-200">{stats[key] || 0}</div>
              <div className="text-xs text-stone-400">{label}</div>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-bold text-amber-100 mb-3" style={{fontFamily: 'Georgia, serif'}}>🎭 vs. Characters</h3>
          <div className="grid grid-cols-2 gap-2">
            {TRIVIA_CREW.map(char => {
              const cs = stats.characterStats?.[char.id] || { wins: 0, losses: 0, ties: 0 };
              return (
                <div key={char.id} className="bg-stone-700/50 backdrop-blur-sm rounded-xl p-2 border border-stone-600/30">
                  <div className="flex items-center gap-2 mb-1">
                    <CharacterAvatar character={char} size="sm" />
                    <span className="text-sm font-medium text-amber-100" style={{fontFamily: 'Georgia, serif'}}>{char.name}</span>
                  </div>
                  <div className="text-xs text-stone-400">
                    <span className="text-green-400">{cs.wins}W</span> / <span className="text-red-400">{cs.losses}L</span> / <span className="text-stone-400">{cs.ties}T</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-amber-100 mb-3" style={{fontFamily: 'Georgia, serif'}}>🏆 Achievements ({unlockedAchievements.length}/{ACHIEVEMENTS.length})</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {ACHIEVEMENTS.map(a => {
              const isUnlocked = unlockedAchievements.includes(a.id);
              return (
                <div key={a.id} className={`rounded-xl p-3 flex items-center gap-3 border ${isUnlocked ? 'bg-amber-900/30 border-amber-600/50' : 'bg-stone-700/30 border-stone-600/30 opacity-50'}`}>
                  <div className="text-2xl">{a.icon}</div>
                  <div className="flex-1">
                    <div className={`font-bold text-sm ${isUnlocked ? 'text-amber-100' : 'text-stone-500'}`} style={{fontFamily: 'Georgia, serif'}}>{a.name}</div>
                    <div className={`text-xs ${isUnlocked ? 'text-stone-300' : 'text-stone-500'}`}>{a.description}</div>
                  </div>
                  {isUnlocked && <div className="text-green-400 text-lg">✓</div>}
                </div>
              );
            })}
          </div>
        </div>
        <button onClick={onClose} className="w-full mt-4 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white py-3 rounded-xl font-bold shadow-lg transition-all border border-amber-500/50" style={{fontFamily: 'Georgia, serif'}}>Close</button>
      </div>
    </div>
  );
};

const HelpModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-stone-800/95 backdrop-blur-md rounded-3xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto border border-stone-600/50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>How to Play</h2>
        <button onClick={onClose} className="text-stone-400 hover:text-amber-100 text-2xl">✕</button>
      </div>
      <div className="space-y-3">
        <div className="flex items-start gap-3 bg-stone-600/50 rounded-xl p-3">
          <span className="text-2xl">🥞</span>
          <div><p className="font-semibold text-amber-100">Spell Words</p><p className="text-sm text-stone-300">Place letters to form valid English words (2+ letters)</p></div>
        </div>
        <div className="flex items-start gap-3 bg-stone-600/50 rounded-xl p-3">
          <span className="text-2xl">🥞</span>
          <div><p className="font-semibold text-amber-100">Build Crosswords</p><p className="text-sm text-stone-300">Connect new words to existing ones</p></div>
        </div>
        <div className="flex items-start gap-3 bg-stone-600/50 rounded-xl p-3">
          <span className="text-2xl">🥞</span>
          <div><p className="font-semibold text-amber-100">Stack for Bonus!</p><p className="text-sm text-stone-300">Place on existing letters. Stacked tiles score their stack height!</p></div>
        </div>
        <div className="bg-amber-900/30 rounded-xl p-4 border border-amber-600/30">
          <h4 className="font-bold text-amber-100 mb-2">🏆 Scoring</h4>
          <ul className="text-sm text-stone-300 space-y-1">
            <li>• Each tile = 1 point (base score)</li>
            <li>• Stacked tiles = stack height (e.g., 3-high = 3 pts)</li>
            <li>• All words formed count! (crossword bonus)</li>
          </ul>
        </div>
        <div className="bg-stone-600/50 rounded-xl p-4 border border-stone-500/50">
          <h4 className="font-bold text-amber-100 mb-2">Tip</h4>
          <p className="text-sm text-stone-300">If your word is not recognized, tap Undo to get your tiles back. Stuck? Tap Pass to skip your turn.</p>
        </div>
      </div>
      <button onClick={onClose} className="w-full mt-4 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white py-3 rounded-xl font-bold shadow-lg transition-all border border-amber-500/50" style={{fontFamily: 'Georgia, serif'}}>Got it! 🥞</button>
    </div>
  </div>
);

const GriddleStacks = () => {
  const BOARD_SIZE = 11, HAND_SIZE = 7, CENTER = 5, SAVE_KEY = 'griddleStacksSave', STATS_KEY = 'griddleStacksStats';
  
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
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const [wordsPlayedThisGame, setWordsPlayedThisGame] = useState(0);
  const [newAchievements, setNewAchievements] = useState([]);
  const currentYear = new Date().getFullYear();

  const [stats, setStats] = useState(() => {
    if (typeof window === 'undefined') return { gamesPlayed: 0, gamesWon: 0, gamesLost: 0, gamesTied: 0, currentStreak: 0, bestStreak: 0, highestScore: 0, totalWordsPlayed: 0, characterStats: {}, unlockedAchievements: [] };
    try {
      const saved = localStorage.getItem(STATS_KEY);
      return saved ? JSON.parse(saved) : { gamesPlayed: 0, gamesWon: 0, gamesLost: 0, gamesTied: 0, currentStreak: 0, bestStreak: 0, highestScore: 0, totalWordsPlayed: 0, characterStats: {}, unlockedAchievements: [] };
    } catch { return { gamesPlayed: 0, gamesWon: 0, gamesLost: 0, gamesTied: 0, currentStreak: 0, bestStreak: 0, highestScore: 0, totalWordsPlayed: 0, characterStats: {}, unlockedAchievements: [] }; }
  });

  const saveStats = useCallback((newStats) => { try { localStorage.setItem(STATS_KEY, JSON.stringify(newStats)); } catch {} }, []);

  const checkAchievements = useCallback((currentStats) => {
    const newlyUnlocked = [];
    ACHIEVEMENTS.forEach(a => { if (!currentStats.unlockedAchievements?.includes(a.id) && a.requirement(currentStats)) newlyUnlocked.push(a); });
    if (newlyUnlocked.length > 0) {
      setNewAchievements(newlyUnlocked);
      setTimeout(() => setNewAchievements([]), 4000);
      return [...(currentStats.unlockedAchievements || []), ...newlyUnlocked.map(a => a.id)];
    }
    return currentStats.unlockedAchievements || [];
  }, []);

  const updateStatsAfterGame = useCallback((gameWinner, finalPlayerScore, opponentId) => {
    const newStats = { ...stats };
    newStats.gamesPlayed = (newStats.gamesPlayed || 0) + 1;
    if (gameWinner === 'player') { newStats.gamesWon = (newStats.gamesWon || 0) + 1; newStats.currentStreak = (newStats.currentStreak || 0) + 1; newStats.bestStreak = Math.max(newStats.bestStreak || 0, newStats.currentStreak); }
    else if (gameWinner === 'opponent') { newStats.gamesLost = (newStats.gamesLost || 0) + 1; newStats.currentStreak = 0; }
    else { newStats.gamesTied = (newStats.gamesTied || 0) + 1; }
    newStats.highestScore = Math.max(newStats.highestScore || 0, finalPlayerScore);
    newStats.totalWordsPlayed = (newStats.totalWordsPlayed || 0) + wordsPlayedThisGame;
    if (!newStats.characterStats) newStats.characterStats = {};
    if (!newStats.characterStats[opponentId]) newStats.characterStats[opponentId] = { wins: 0, losses: 0, ties: 0 };
    if (gameWinner === 'player') newStats.characterStats[opponentId].wins += 1;
    else if (gameWinner === 'opponent') newStats.characterStats[opponentId].losses += 1;
    else newStats.characterStats[opponentId].ties += 1;
    newStats.unlockedAchievements = checkAchievements(newStats);
    setStats(newStats);
    saveStats(newStats);
  }, [stats, wordsPlayedThisGame, checkAchievements, saveStats]);

  useEffect(() => { if (typeof window !== 'undefined') { try { if (localStorage.getItem(SAVE_KEY)) setHasSavedGame(true); } catch {} } }, []);

  const saveGame = useCallback(() => {
    if (!gameStarted || gameOver) return;
    try { localStorage.setItem(SAVE_KEY, JSON.stringify({ board, letterPool, playerHand, opponentHand, currentTurn, playerScore, opponentScore, opponent: opponent.id, isFirstMove, lastPlayedWord, passCount, wordsPlayedThisGame, savedAt: Date.now() })); } catch {}
  }, [gameStarted, gameOver, board, letterPool, playerHand, opponentHand, currentTurn, playerScore, opponentScore, opponent, isFirstMove, lastPlayedWord, passCount, wordsPlayedThisGame]);

  useEffect(() => { if (gameStarted && !gameOver && currentTurn === 'player' && placedTiles.length === 0) saveGame(); }, [gameStarted, gameOver, currentTurn, placedTiles.length, saveGame]);

  const loadSavedGame = useCallback(() => {
    try {
      const data = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (data) { setBoard(data.board); setLetterPool(data.letterPool); setPlayerHand(data.playerHand); setOpponentHand(data.opponentHand); setCurrentTurn(data.currentTurn); setPlayerScore(data.playerScore); setOpponentScore(data.opponentScore); setOpponent(TRIVIA_CREW.find(c => c.id === data.opponent) || TRIVIA_CREW[0]); setIsFirstMove(data.isFirstMove); setLastPlayedWord(data.lastPlayedWord || ''); setPassCount(data.passCount || 0); setWordsPlayedThisGame(data.wordsPlayedThisGame || 0); setPlacedTiles([]); setSelectedTileIndex(null); setErrorMessage(''); setOpponentMessage(''); setGameOver(false); setWinner(null); setGameStarted(true); }
    } catch {}
  }, []);

  const clearSavedGame = useCallback(() => { try { localStorage.removeItem(SAVE_KEY); setHasSavedGame(false); } catch {} }, []);

  const initializeLetterPool = useCallback(() => {
    const pool = [];
    Object.entries(LETTER_DISTRIBUTION).forEach(([letter, count]) => { for (let i = 0; i < count; i++) pool.push(letter); });
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    return pool;
  }, []);

  const drawTiles = useCallback((pool, count) => ({ drawn: pool.slice(0, count), remaining: pool.slice(count) }), []);

  const shuffleHand = useCallback(() => {
    setPlayerHand(prev => { const s = [...prev]; for (let i = s.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [s[i], s[j]] = [s[j], s[i]]; } return s; });
    setSelectedTileIndex(null);
  }, []);

  const returnToMenu = () => { saveGame(); setGameStarted(false); setShowMenuConfirm(false); };

  const handleShare = useCallback(() => {
    const resultText = winner === 'player' ? '🏆 Won!' : winner === 'tie' ? '🤝 Tie!' : '🥈 Lost';
    const shareText = `☕ Griddle Stacks ${resultText}\n\nMe: ${playerScore} pts\n${opponent.name}: ${opponentScore} pts\n\nPlay at lettergriddle.com/stacks`;
    if (navigator.share) navigator.share({ title: 'Griddle Stacks', text: shareText }).catch(() => {});
    else navigator.clipboard.writeText(shareText).then(() => { setShareCopied(true); setTimeout(() => setShareCopied(false), 2000); });
  }, [winner, playerScore, opponentScore, opponent]);

  const startGame = useCallback((isNewGame = true) => {
    if (isNewGame) clearSavedGame();
    const pool = initializeLetterPool();
    const { drawn: playerTiles, remaining: pool1 } = drawTiles(pool, HAND_SIZE);
    const { drawn: opponentTiles, remaining: pool2 } = drawTiles(pool1, HAND_SIZE);
    setLetterPool(pool2); setPlayerHand(playerTiles); setOpponentHand(opponentTiles);
    setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null).map(() => ({ letter: null, stackHeight: 0 }))));
    setPlayerScore(0); setOpponentScore(0); setCurrentTurn('player'); setGameOver(false); setWinner(null);
    setIsFirstMove(true); setPlacedTiles([]); setSelectedTileIndex(null); setLastPlayedWord('');
    setErrorMessage(''); setOpponentMessage(''); setPassCount(0); setWordsPlayedThisGame(0); setGameStarted(true);
  }, [initializeLetterPool, drawTiles, clearSavedGame]);

  const resetGame = useCallback(() => { clearSavedGame(); setShowResetConfirm(false); startGame(true); }, [clearSavedGame, startGame]);

  const handleHandTileClick = (index) => { if (currentTurn !== 'player' || gameOver || isValidating) return; setSelectedTileIndex(selectedTileIndex === index ? null : index); setErrorMessage(''); };

  const handleCellClick = (row, col) => {
    if (currentTurn !== 'player' || gameOver || isValidating) return;
    const placedTileIndex = placedTiles.findIndex(t => t.row === row && t.col === col);
    if (placedTileIndex !== -1) {
      const tile = placedTiles[placedTileIndex];
      const newBoard = board.map(r => r.map(c => ({...c}))); newBoard[row][col] = { letter: tile.previousLetter, stackHeight: tile.previousHeight };
      setBoard(newBoard); setPlayerHand(prev => [...prev, tile.letter]); setPlacedTiles(prev => prev.filter((_, i) => i !== placedTileIndex)); setErrorMessage(''); return;
    }
    if (selectedTileIndex === null) return;
    const letter = playerHand[selectedTileIndex];
    const currentCell = board[row][col];
    const newBoard = board.map(r => r.map(c => ({...c}))); newBoard[row][col] = { letter, stackHeight: currentCell.stackHeight + 1 };
    setBoard(newBoard); setPlacedTiles(prev => [...prev, { row, col, letter, previousLetter: currentCell.letter, previousHeight: currentCell.stackHeight }]);
    const newHand = [...playerHand]; newHand.splice(selectedTileIndex, 1); setPlayerHand(newHand); setSelectedTileIndex(null); setErrorMessage('');
  };

  const getHorizontalWord = useCallback((bs, row, col) => {
    let sc = col; while (sc > 0 && bs[row][sc-1].letter) sc--;
    let word = '', score = 0, c = sc; while (c < BOARD_SIZE && bs[row][c].letter) { word += bs[row][c].letter; score += bs[row][c].stackHeight; c++; }
    return { word, score, startCol: sc, endCol: c-1, row };
  }, []);

  const getVerticalWord = useCallback((bs, row, col) => {
    let sr = row; while (sr > 0 && bs[sr-1][col].letter) sr--;
    let word = '', score = 0, r = sr; while (r < BOARD_SIZE && bs[r][col].letter) { word += bs[r][col].letter; score += bs[r][col].stackHeight; r++; }
    return { word, score, startRow: sr, endRow: r-1, col };
  }, []);

  const validateAndScorePlay = useCallback(async () => {
    if (placedTiles.length === 0) return { valid: false, error: 'Place at least one tile!' };
    const rows = [...new Set(placedTiles.map(t => t.row))], cols = [...new Set(placedTiles.map(t => t.col))];
    const isH = rows.length === 1, isV = cols.length === 1;
    if (!isH && !isV) return { valid: false, error: 'Tiles must be in a straight line!' };
    if (isH && placedTiles.length > 1) { const sc = [...cols].sort((a,b) => a-b); for (let c = sc[0]; c <= sc[sc.length-1]; c++) if (!board[rows[0]][c].letter) return { valid: false, error: 'No gaps!' }; }
    if (isV && placedTiles.length > 1) { const sr = [...rows].sort((a,b) => a-b); for (let r = sr[0]; r <= sr[sr.length-1]; r++) if (!board[r][cols[0]].letter) return { valid: false, error: 'No gaps!' }; }
    if (isFirstMove && !placedTiles.some(t => t.row === CENTER && t.col === CENTER)) return { valid: false, error: 'First word must touch center ⭐' };
    const wordsFormed = [], checked = new Set();
    for (const tile of placedTiles) {
      const h = getHorizontalWord(board, tile.row, tile.col), hk = `H${tile.row}-${h.startCol}`;
      if (h.word.length >= 2 && !checked.has(hk)) { checked.add(hk); wordsFormed.push(h); }
      const v = getVerticalWord(board, tile.row, tile.col), vk = `V${v.startRow}-${tile.col}`;
      if (v.word.length >= 2 && !checked.has(vk)) { checked.add(vk); wordsFormed.push(v); }
    }
    if (wordsFormed.length === 0) return { valid: false, error: 'Must form a word (2+ letters)!' };
    for (const w of wordsFormed) if (!(await validateWord(w.word))) return { valid: false, error: `"${w.word}" is not valid!` };
    if (!isFirstMove) {
      const connects = placedTiles.some(t => {
        if (t.previousLetter) return true;
        return [[t.row-1,t.col],[t.row+1,t.col],[t.row,t.col-1],[t.row,t.col+1]].some(([r,c]) => r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c].letter && !placedTiles.some(p => p.row === r && p.col === c));
      });
      if (!connects) return { valid: false, error: 'Must connect to existing words!' };
    }
    const totalScore = wordsFormed.reduce((s, w) => s + w.score, 0);
    const mainWord = wordsFormed.reduce((l, w) => w.word.length > l.word.length ? w : l, wordsFormed[0]);
    return { valid: true, score: totalScore, words: wordsFormed, mainWord: mainWord.word, wordCount: wordsFormed.length };
  }, [placedTiles, board, isFirstMove, getHorizontalWord, getVerticalWord]);

  const endGame = useCallback(() => {
    const gameWinner = playerScore > opponentScore ? 'player' : playerScore < opponentScore ? 'opponent' : 'tie';
    setGameOver(true); setWinner(gameWinner); clearSavedGame();
    updateStatsAfterGame(gameWinner, playerScore, opponent.id);
  }, [playerScore, opponentScore, clearSavedGame, updateStatsAfterGame, opponent.id]);

  const submitPlay = useCallback(async () => {
    setIsValidating(true); setErrorMessage('Checking...');
    try {
      const result = await validateAndScorePlay();
      if (!result.valid) { setErrorMessage(result.error); setIsValidating(false); return; }
      setPlayerScore(prev => prev + result.score); setLastPlayedWord(result.mainWord); setWordsPlayedThisGame(prev => prev + result.wordCount);
      const { drawn, remaining } = drawTiles(letterPool, Math.min(placedTiles.length, letterPool.length));
      setPlayerHand(prev => [...prev, ...drawn]); setLetterPool(remaining); setPlacedTiles([]); setIsFirstMove(false); setErrorMessage(''); setPassCount(0);
      if (remaining.length === 0 && playerHand.length === 0) { endGame(); setIsValidating(false); return; }
      setCurrentTurn('opponent');
    } finally { setIsValidating(false); }
  }, [validateAndScorePlay, placedTiles, letterPool, drawTiles, playerHand, endGame]);

  const undoPlacement = useCallback(() => {
    if (placedTiles.length === 0 || isValidating) return;
    const newBoard = board.map(r => r.map(c => ({...c}))), returnedTiles = [];
    placedTiles.forEach(({ row, col, letter, previousLetter, previousHeight }) => { newBoard[row][col] = { letter: previousLetter, stackHeight: previousHeight }; returnedTiles.push(letter); });
    setBoard(newBoard); setPlayerHand(prev => [...prev, ...returnedTiles]); setPlacedTiles([]); setErrorMessage('');
  }, [placedTiles, board, isValidating]);

  const passTurn = useCallback(() => {
    if (isValidating) return;
    setPlacedTiles([]); setPassCount(prev => prev + 1);
    if (passCount >= 1) { endGame(); return; }
    setCurrentTurn('opponent');
  }, [passCount, isValidating, endGame]);

  const makeAIMove = useCallback(() => {
    setIsThinking(true); setOpponentMessage(opponent.thinkingQuotes[Math.floor(Math.random() * opponent.thinkingQuotes.length)]);
    setTimeout(() => {
      let madePlay = false;
      const canSpellWord = (word, hand) => { const hc = {}; hand.forEach(l => { hc[l] = (hc[l] || 0) + 1; }); const lc = {}; word.split('').forEach(l => { lc[l] = (lc[l] || 0) + 1; }); return Object.entries(lc).every(([l, c]) => (hc[l] || 0) >= c); };
      const getHWordAt = (tb, row, col) => { let sc = col; while (sc > 0 && tb[row][sc-1].letter) sc--; let w = '', c = sc; while (c < BOARD_SIZE && tb[row][c].letter) { w += tb[row][c].letter; c++; } return w; };
      const getVWordAt = (tb, row, col) => { let sr = row; while (sr > 0 && tb[sr-1][col].letter) sr--; let w = '', r = sr; while (r < BOARD_SIZE && tb[r][col].letter) { w += tb[r][col].letter; r++; } return w; };
      const checkAllWordsValid = (tb, row, col) => { const h = getHWordAt(tb, row, col), v = getVWordAt(tb, row, col); if (h.length >= 2 && !isValidWordSync(h)) return false; if (v.length >= 2 && !isValidWordSync(v)) return false; return true; };

      if (isFirstMove) {
        const shuffled = [...AI_WORDS].sort(() => Math.random() - 0.5);
        for (const word of shuffled) {
          if (canSpellWord(word, opponentHand)) {
            const letters = word.split(''), newBoard = board.map(r => r.map(c => ({...c}))), startCol = CENTER - Math.floor(letters.length / 2);
            let score = 0; const usedLetters = [];
            letters.forEach((l, i) => { newBoard[CENTER][startCol + i] = { letter: l, stackHeight: 1 }; score += 1; usedLetters.push(l); });
            setBoard(newBoard); setOpponentScore(prev => prev + score); setLastPlayedWord(word);
            const newHand = [...opponentHand]; usedLetters.forEach(l => { const idx = newHand.indexOf(l); if (idx > -1) newHand.splice(idx, 1); });
            const { drawn, remaining } = drawTiles(letterPool, usedLetters.length);
            setOpponentHand([...newHand, ...drawn]); setLetterPool(remaining);
            setOpponentMessage(`${word}! ${opponent.playQuotes[Math.floor(Math.random() * opponent.playQuotes.length)]}`);
            setIsFirstMove(false); madePlay = true; break;
          }
        }
      } else {
        const playableSpots = [];
        for (let r = 0; r < BOARD_SIZE; r++) for (let c = 0; c < BOARD_SIZE; c++) if (board[r][c].letter) [{ row: r-1, col: c }, { row: r+1, col: c }, { row: r, col: c-1 }, { row: r, col: c+1 }].forEach(({ row, col }) => { if (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE && !board[row][col].letter) playableSpots.push({ row, col }); });
        const uniqueSpots = playableSpots.filter((s, i, self) => i === self.findIndex(x => x.row === s.row && x.col === s.col)).sort(() => Math.random() - 0.5);
        for (const spot of uniqueSpots) {
          for (let i = 0; i < opponentHand.length; i++) {
            const letter = opponentHand[i], testBoard = board.map(r => r.map(c => ({...c})));
            testBoard[spot.row][spot.col] = { letter, stackHeight: 1 };
            if (checkAllWordsValid(testBoard, spot.row, spot.col)) {
              const h = getHWordAt(testBoard, spot.row, spot.col), v = getVWordAt(testBoard, spot.row, spot.col);
              const displayWord = h.length >= v.length ? h : v, score = Math.max(h.length, v.length);
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
      if (!madePlay) { setOpponentMessage("I'll pass..."); setPassCount(prev => { if (prev >= 1) setTimeout(() => endGame(), 500); return prev + 1; }); } else { setPassCount(0); }
      setIsThinking(false);
      if (letterPool.length === 0 && opponentHand.length === 0) { endGame(); return; }
      setCurrentTurn('player');
    }, 1500);
  }, [opponent, opponentHand, board, isFirstMove, letterPool, drawTiles, endGame]);

  useEffect(() => { if (currentTurn === 'opponent' && !gameOver && gameStarted) makeAIMove(); }, [currentTurn, gameOver, gameStarted, makeAIMove]);

  // START SCREEN
  if (!gameStarted) {
    return (
      <div className="min-h-screen p-4 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #3E2723 0%, #5D4037 30%, #8D6E63 60%, #D7CCC8 95%)' }}>
        <div className="fixed top-4 left-4 text-4xl opacity-10">☕</div>
        <div className="fixed bottom-4 right-4 text-4xl opacity-10">🥞</div>
        {newAchievements.length > 0 && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
              <span className="text-2xl">{newAchievements[0].icon}</span>
              <div><div className="font-bold text-sm">Achievement Unlocked!</div><div className="text-xs">{newAchievements[0].name}</div></div>
            </div>
          </div>
        )}
        <div className="max-w-lg mx-auto pt-8 relative z-10">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🥞</div>
            <h1 className="text-4xl font-bold text-amber-100 mb-2" style={{fontFamily: 'Georgia, serif'}}>Griddle Stacks</h1>
            <p className="text-xl text-amber-200/90" style={{fontFamily: 'Georgia, serif'}}>A Letter Griddle Word Game</p>
          </div>
          <div className="bg-stone-800/70 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-stone-600/50 mb-6">
            <div className="flex justify-end mb-4">
              <button onClick={() => setShowStatsModal(true)} className="bg-stone-700/70 hover:bg-stone-600/70 text-amber-100 px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all border border-stone-600/50 flex items-center gap-2" style={{fontFamily: 'Georgia, serif'}}>
                📊 Stats {(stats.unlockedAchievements?.length || 0) > 0 && <span className="bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{stats.unlockedAchievements.length}</span>}
              </button>
            </div>
            <h2 className="text-2xl font-bold text-amber-100 mb-4 text-center" style={{fontFamily: 'Georgia, serif'}}>How to Play Griddle Stacks</h2>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 bg-stone-700/50 rounded-xl p-3 border border-stone-600/30"><span className="text-2xl">🥞</span><div><p className="font-semibold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>Spell Words</p><p className="text-sm text-stone-300">Form valid English words (2+ letters)</p></div></div>
              <div className="flex items-start gap-3 bg-stone-700/50 rounded-xl p-3 border border-stone-600/30"><span className="text-2xl">🥞</span><div><p className="font-semibold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>Build Crosswords</p><p className="text-sm text-stone-300">Connect new words to existing ones</p></div></div>
              <div className="flex items-start gap-3 bg-stone-700/50 rounded-xl p-3 border border-stone-600/30"><span className="text-2xl">🥞</span><div><p className="font-semibold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>Stack for Bonus!</p><p className="text-sm text-stone-300">Place on existing letters for extra points</p></div></div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-amber-100 mb-3 text-center" style={{fontFamily: 'Georgia, serif'}}>Choose Opponent</h3>
              <div className="flex justify-center gap-3 flex-wrap">
                {TRIVIA_CREW.map(char => {
                  const cs = stats.characterStats?.[char.id] || { wins: 0, losses: 0 };
                  return (
                    <button key={char.id} onClick={() => setOpponent(char)} className={`text-center p-2 rounded-xl transition-all ${opponent.id === char.id ? 'bg-amber-700/50 ring-2 ring-amber-400' : 'bg-stone-700/50 hover:bg-stone-600/50'} border border-stone-600/30`}>
                      <CharacterAvatar character={char} size="md" />
                      <p className="text-xs text-amber-100 mt-1 font-medium" style={{fontFamily: 'Georgia, serif'}}>{char.name}</p>
                      <p className="text-xs text-stone-400"><span className="text-green-400">{cs.wins}</span>-<span className="text-red-400">{cs.losses}</span></p>
                    </button>
                  );
                })}
              </div>
            </div>
            {hasSavedGame && <button onClick={loadSavedGame} className="w-full mb-3 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white py-4 rounded-2xl font-bold text-xl shadow-lg transition-all border border-amber-500/50" style={{fontFamily: 'Georgia, serif'}}>🥞 Continue Game</button>}
            <button onClick={() => startGame(true)} className="w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white py-4 rounded-2xl font-bold text-xl shadow-lg transition-all border border-amber-500/50" style={{fontFamily: 'Georgia, serif'}}>🥞 Start Stacking!</button>
          </div>
          <div className="text-center text-xs mt-6"><p className="text-white/80">Part of <a href="/" className="underline hover:text-white">The Letter Griddle Cafe</a> ☕</p><p className="mt-2 text-white/60"><a href="/privacy" className="hover:text-white/80">Privacy</a><span className="mx-2">•</span><a href="/terms" className="hover:text-white/80">Terms</a></p><p className="mt-1 text-white/50">© {currentYear} Letter Griddle Cafe</p></div>
        </div>
        {showStatsModal && <StatsModal stats={stats} onClose={() => setShowStatsModal(false)} />}
      </div>
    );
  }

  // GAME SCREEN
  return (
    <div className="min-h-screen p-2 md:p-4 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #3E2723 0%, #5D4037 30%, #8D6E63 60%, #D7CCC8 95%)' }}>
      <div className="fixed top-2 left-2 text-2xl opacity-10">☕</div>
      <div className="fixed bottom-2 right-2 text-2xl opacity-10">🥞</div>
      {newAchievements.length > 0 && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
            <span className="text-2xl">{newAchievements[0].icon}</span>
            <div><div className="font-bold text-sm">Achievement Unlocked!</div><div className="text-xs">{newAchievements[0].name}</div></div>
          </div>
        </div>
      )}
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => setShowMenuConfirm(true)} className="bg-stone-700/70 hover:bg-stone-600/70 text-amber-100 px-4 py-2 rounded-full text-sm font-semibold shadow-md border border-stone-600/50" style={{fontFamily: 'Georgia, serif'}}>☰ Menu</button>
          <h1 className="text-xl md:text-2xl font-bold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>Griddle Stacks</h1>
          <button onClick={() => setShowHelpModal(true)} className="bg-stone-700/70 hover:bg-stone-600/70 text-amber-100 px-4 py-2 rounded-full text-sm font-semibold shadow-md border border-stone-600/50" style={{fontFamily: 'Georgia, serif'}}>Help</button>
        </div>

        <div className="bg-stone-800/60 backdrop-blur-md rounded-xl shadow-lg p-3 mb-3 border border-stone-600/50">
          <div className="flex justify-between items-center">
            <div className={`text-center p-2 rounded-lg ${currentTurn === 'player' ? 'bg-amber-700/50 ring-2 ring-amber-400' : 'bg-stone-700/50'}`}>
              <div className="text-2xl">🥞</div><div className="text-xs font-bold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>You</div><div className="text-xl font-bold text-amber-200">{playerScore}</div>
            </div>
            <div className="text-center flex-1 px-2">
              <div className="text-sm text-amber-100 font-medium" style={{fontFamily: 'Georgia, serif'}}>{isValidating ? 'Checking...' : isThinking ? `${opponent.name} thinking...` : `${currentTurn === 'player' ? 'Your' : opponent.name + "'s"} Turn`}</div>
              <div className="text-xs text-stone-400">{letterPool.length} tiles left</div>
              {lastPlayedWord && <div className="text-sm text-amber-200 font-bold" style={{fontFamily: 'Georgia, serif'}}>Last: {lastPlayedWord}</div>}
            </div>
            <div className={`text-center p-2 rounded-lg ${currentTurn === 'opponent' ? 'bg-amber-700/50 ring-2 ring-amber-400' : 'bg-stone-700/50'}`}>
              <CharacterAvatar character={opponent} size="sm" /><div className="text-xs font-bold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>{opponent.name}</div><div className="text-xl font-bold text-amber-200">{opponentScore}</div>
            </div>
          </div>
          {opponentMessage && <div className="mt-2 text-center bg-stone-700/50 rounded-lg p-2 border border-stone-600/30"><span className="text-amber-100 text-sm italic" style={{fontFamily: 'Georgia, serif'}}>&quot;{opponentMessage}&quot;</span></div>}
        </div>

        {errorMessage && <div className={`${errorMessage === 'Checking...' ? 'bg-stone-700/70 border-stone-500/50' : 'bg-red-900/50 border-red-700/50'} border rounded-lg p-2 mb-3 text-center`}><span className={`${errorMessage === 'Checking...' ? 'text-amber-100' : 'text-red-200'} text-sm font-medium`} style={{fontFamily: 'Georgia, serif'}}>{errorMessage}</span></div>}

        <div className="bg-gradient-to-br from-amber-800 to-amber-900 p-2 rounded-xl shadow-xl mb-3 overflow-x-auto border border-amber-700/50">
          <div className="grid gap-0.5 mx-auto" style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(2rem, 2.25rem))`, width: 'fit-content' }}>
            {board.map((row, ri) => row.map((cell, ci) => (
              <BoardCell key={`${ri}-${ci}`} onClick={() => handleCellClick(ri, ci)} isCenter={ri === CENTER && ci === CENTER} isHighlighted={placedTiles.some(t => t.row === ri && t.col === ci)} hasLetter={!!cell.letter}>
                {cell.letter && <PancakeTile letter={cell.letter} stackHeight={cell.stackHeight} size="sm" isNew={placedTiles.some(t => t.row === ri && t.col === ci)} />}
              </BoardCell>
            )))}
          </div>
        </div>

        <div className="bg-stone-800/60 backdrop-blur-md rounded-xl shadow-lg p-3 mb-3 border border-stone-600/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-amber-100 font-medium" style={{fontFamily: 'Georgia, serif'}}>Your Pancakes</span>
            <button onClick={shuffleHand} disabled={currentTurn !== 'player' || isValidating} className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 disabled:opacity-50 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md border border-amber-500/50" style={{fontFamily: 'Georgia, serif'}}>Shuffle</button>
          </div>
          <div className="flex justify-center gap-2 flex-wrap">{playerHand.map((letter, idx) => <PancakeTile key={idx} letter={letter} size="lg" selected={selectedTileIndex === idx} onClick={() => handleHandTileClick(idx)} disabled={currentTurn !== 'player' || isValidating} />)}</div>
          <p className="text-xs text-stone-400 text-center mt-2">Tap a pancake, then tap the board • Tap placed tiles to remove</p>
        </div>

        <div className="flex justify-center gap-2 flex-wrap mb-3">
          <button onClick={undoPlacement} disabled={placedTiles.length === 0 || currentTurn !== 'player' || isValidating} className="bg-stone-700/70 hover:bg-stone-600/70 disabled:opacity-50 text-amber-100 px-5 py-2.5 rounded-full font-semibold text-sm shadow-md border border-stone-600/50" style={{fontFamily: 'Georgia, serif'}}>↩ Undo</button>
          <button onClick={submitPlay} disabled={placedTiles.length === 0 || currentTurn !== 'player' || isValidating} className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 disabled:opacity-50 text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-lg border border-amber-500/50" style={{fontFamily: 'Georgia, serif'}}>{isValidating ? '⏳ Checking...' : '✓ Submit'}</button>
          <button onClick={passTurn} disabled={currentTurn !== 'player' || placedTiles.length > 0 || isValidating} className="bg-stone-700/70 hover:bg-stone-600/70 disabled:opacity-50 text-amber-100 px-5 py-2.5 rounded-full font-semibold text-sm shadow-md border border-stone-600/50" style={{fontFamily: 'Georgia, serif'}}>⏭ Pass</button>
        </div>

        <div className="bg-stone-800/50 rounded-xl p-3 mb-3 text-center border border-stone-600/30">
          <p className="text-stone-300 text-sm" style={{fontFamily: 'Georgia, serif'}}>✨ Progress saves automatically! ○ <button onClick={() => setShowResetConfirm(true)} className="text-amber-300 hover:text-amber-200 underline font-medium">Reset</button></p>
        </div>

        <div className="text-center py-4 text-xs"><p className="text-white/80">Part of <a href="/" className="underline hover:text-white">The Letter Griddle Cafe</a> ☕</p><p className="mt-2 text-white/60"><a href="/privacy" className="hover:text-white/80">Privacy</a><span className="mx-2">•</span><a href="/terms" className="hover:text-white/80">Terms</a></p><p className="mt-1 text-white/50">© {currentYear} Letter Griddle Cafe</p></div>

        {gameOver && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-stone-800/95 backdrop-blur-md rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center border border-stone-600/50">
              <div className="text-6xl mb-4">{winner === 'player' ? '🎉' : winner === 'tie' ? '🤝' : '🥞'}</div>
              <h2 className="text-3xl font-bold text-amber-100 mb-2" style={{fontFamily: 'Georgia, serif'}}>{winner === 'player' ? 'You Won!' : winner === 'tie' ? "It's a Tie!" : `${opponent.name} Wins!`}</h2>
              <div className="text-xl text-stone-300 mb-4" style={{fontFamily: 'Georgia, serif'}}><p>You: {playerScore} pts</p><p>{opponent.name}: {opponentScore} pts</p></div>
              <div className="flex flex-col gap-3">
                <button onClick={() => setShowStatsModal(true)} className="bg-gradient-to-r from-stone-600 to-stone-500 hover:from-stone-500 hover:to-stone-400 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg border border-stone-400/50" style={{fontFamily: 'Georgia, serif'}}>📊 View Stats</button>
                <button onClick={handleShare} className="bg-gradient-to-r from-stone-600 to-stone-500 hover:from-stone-500 hover:to-stone-400 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg border border-stone-400/50" style={{fontFamily: 'Georgia, serif'}}>{shareCopied ? '✓ Copied!' : 'Share Results'}</button>
                <button onClick={() => startGame(true)} className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg border border-amber-500/50" style={{fontFamily: 'Georgia, serif'}}>🥞 Play Again</button>
              </div>
            </div>
          </div>
        )}

        {showHelpModal && <HelpModal onClose={() => setShowHelpModal(false)} />}

        {showMenuConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-stone-800/95 backdrop-blur-md rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center border border-stone-600/50">
              <div className="text-4xl mb-4">🥞</div>
              <h2 className="text-xl font-bold text-amber-100 mb-2" style={{fontFamily: 'Georgia, serif'}}>Return to Menu?</h2>
              <p className="text-stone-300 mb-4">Your progress will be saved automatically.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setShowMenuConfirm(false)} className="bg-stone-700/70 hover:bg-stone-600/70 text-amber-100 px-6 py-2 rounded-full font-semibold shadow-md border border-stone-600/50" style={{fontFamily: 'Georgia, serif'}}>Cancel</button>
                <button onClick={returnToMenu} className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white px-6 py-2 rounded-full font-bold shadow-lg border border-amber-500/50" style={{fontFamily: 'Georgia, serif'}}>Yes, Exit</button>
              </div>
            </div>
          </div>
        )}

        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-stone-800/95 backdrop-blur-md rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center border border-stone-600/50">
              <div className="text-4xl mb-4">🔄</div>
              <h2 className="text-xl font-bold text-amber-100 mb-2" style={{fontFamily: 'Georgia, serif'}}>Start Fresh?</h2>
              <p className="text-stone-300 mb-4">This will reset your current game and start a new one.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setShowResetConfirm(false)} className="bg-stone-700/70 hover:bg-stone-600/70 text-amber-100 px-6 py-2 rounded-full font-semibold shadow-md border border-stone-600/50" style={{fontFamily: 'Georgia, serif'}}>Cancel</button>
                <button onClick={resetGame} className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white px-6 py-2 rounded-full font-bold shadow-lg border border-amber-500/50" style={{fontFamily: 'Georgia, serif'}}>Yes, Reset</button>
              </div>
            </div>
          </div>
        )}

        {showStatsModal && <StatsModal stats={stats} onClose={() => setShowStatsModal(false)} />}
      </div>
    </div>
  );
};

export default GriddleStacks;
