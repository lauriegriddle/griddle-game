"use client";
import React, { useState, useEffect } from 'react';
import { X, Award } from 'lucide-react';
import Link from 'next/link';

// Avatar Component
const Avatar = ({ character, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const colors = {
    laurel: { bg: '#FEF3C7', skin: '#FECACA', hair: '#78350F', shirt: '#FEF3C7', accent: '#D97706' },
    mrlindsay: { bg: '#D1FAE5', skin: '#FED7AA', hair: '#9CA3AF', shirt: '#059669', accent: '#065F46' },
    sarah: { bg: '#D1FAE5', skin: '#FECACA', hair: '#78350F', shirt: '#4ADE80', accent: '#166534' },
    taylorb: { bg: '#DBEAFE', skin: '#FED7AA', hair: '#6B7280', shirt: '#3B82F6', accent: '#1D4ED8' }
  };

  const c = colors[character] || colors.laurel;

  return (
    <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center relative overflow-hidden`} style={{ backgroundColor: c.bg }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {character === 'laurel' && <ellipse cx="50" cy="35" rx="28" ry="25" fill={c.hair} />}
        {character === 'mrlindsay' && <ellipse cx="50" cy="30" rx="22" ry="15" fill={c.hair} />}
        {character === 'sarah' && <ellipse cx="50" cy="35" rx="26" ry="22" fill={c.hair} />}
        {character === 'taylorb' && <ellipse cx="50" cy="32" rx="24" ry="18" fill={c.hair} />}
        <ellipse cx="50" cy="42" rx="22" ry="24" fill={c.skin} />
        {character === 'laurel' && (
          <>
            <path d="M28 35 Q35 25 50 28 Q65 25 72 35 Q70 20 50 18 Q30 20 28 35" fill={c.hair} />
            <ellipse cx="30" cy="45" rx="8" ry="15" fill={c.hair} />
            <ellipse cx="70" cy="45" rx="8" ry="15" fill={c.hair} />
          </>
        )}
        <circle cx="40" cy="40" r="3" fill="#1F2937" />
        <circle cx="60" cy="40" r="3" fill="#1F2937" />
        <circle cx="41" cy="39" r="1" fill="white" />
        <circle cx="61" cy="39" r="1" fill="white" />
        <path d="M40 52 Q50 58 60 52" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="50" cy="85" rx="30" ry="20" fill={c.shirt} />
        {character === 'laurel' && (
          <path d="M35 75 L35 95 L65 95 L65 75 Q50 80 35 75" fill="white" stroke={c.accent} strokeWidth="1" />
        )}
      </svg>
    </div>
  );
};

// Pancake Stack Component (loses pancakes on wrong guesses)
const PancakeStack = ({ remaining, max = 6 }) => {
  return (
    <div className="flex flex-col items-center justify-end h-40">
      <div className="relative">
        {/* Plate */}
        <div className="w-32 h-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full shadow-md"></div>
        {/* Pancakes */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex flex-col-reverse items-center">
          {Array.from({ length: remaining }).map((_, i) => (
            <div
              key={i}
              className="w-20 h-4 rounded-full shadow-sm transition-all duration-500"
              style={{
                background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 50%, #B45309 100%)',
                marginBottom: i === 0 ? '0' : '-2px',
                transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 2}deg)`,
              }}
            >
              {/* Butter pat on top pancake */}
              {i === remaining - 1 && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-4 h-2 bg-yellow-200 rounded-sm shadow-sm"></div>
              )}
            </div>
          ))}
        </div>
        {/* Syrup drip */}
        {remaining > 0 && (
          <div className="absolute bottom-6 right-4 w-2 h-6 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full opacity-70"></div>
        )}
      </div>
      <p className="text-amber-700 text-sm mt-2 font-semibold">{remaining} pancake{remaining !== 1 ? 's' : ''} left</p>
    </div>
  );
};

// Coffee Cup Component (drains on wrong guesses)
const CoffeeCup = ({ remaining, max = 6 }) => {
  const fillPercent = (remaining / max) * 100;
  return (
    <div className="flex flex-col items-center justify-end h-40">
      <div className="relative">
        {/* Cup */}
        <div className="w-20 h-24 bg-gradient-to-b from-white to-gray-100 rounded-b-3xl border-4 border-amber-100 shadow-lg relative overflow-hidden">
          {/* Coffee fill */}
          <div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900 to-amber-700 transition-all duration-700 ease-out"
            style={{ height: `${fillPercent}%` }}
          >
            {/* Coffee surface shine */}
            {remaining > 0 && (
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-amber-600/50 to-transparent"></div>
            )}
          </div>
        </div>
        {/* Handle */}
        <div className="absolute top-4 -right-4 w-5 h-12 border-4 border-amber-200 rounded-r-full bg-transparent"></div>
        {/* Steam */}
        {remaining > 3 && (
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-1">
            <div className="w-1 h-4 bg-gray-300 rounded-full opacity-50 animate-pulse"></div>
            <div className="w-1 h-6 bg-gray-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-4 bg-gray-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
      </div>
      <p className="text-amber-700 text-sm mt-2 font-semibold">{remaining} sip{remaining !== 1 ? 's' : ''} left</p>
    </div>
  );
};

// Cake Component (loses slices on wrong guesses)
const CakeSlices = ({ remaining, max = 6 }) => {
  return (
    <div className="flex flex-col items-center justify-end h-40">
      <div className="relative w-32 h-32">
        {/* Cake slices as pie chart style */}
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {Array.from({ length: max }).map((_, i) => {
            const angle = (360 / max);
            const startAngle = i * angle;
            const endAngle = startAngle + angle - 2;
            const isVisible = i < remaining;
            
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;
            
            const x1 = 50 + 40 * Math.cos(startRad);
            const y1 = 50 + 40 * Math.sin(startRad);
            const x2 = 50 + 40 * Math.cos(endRad);
            const y2 = 50 + 40 * Math.sin(endRad);
            
            const largeArc = angle > 180 ? 1 : 0;
            
            return (
              <path
                key={i}
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={isVisible ? (i % 2 === 0 ? '#F472B6' : '#EC4899') : '#E5E7EB'}
                stroke="white"
                strokeWidth="2"
                className="transition-all duration-500"
                style={{ opacity: isVisible ? 1 : 0.3 }}
              />
            );
          })}
          {/* Center decoration */}
          <circle cx="50" cy="50" r="12" fill="#FDF2F8" stroke="#F9A8D4" strokeWidth="2" />
          <circle cx="50" cy="50" r="6" fill="#F472B6" />
        </svg>
        {/* Cherry on top */}
        {remaining > 0 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-red-500 rounded-full shadow-md"></div>
            <div className="w-1 h-3 bg-green-600 absolute -top-2 left-1/2 transform -translate-x-1/2 rounded-full"></div>
          </div>
        )}
      </div>
      <p className="text-pink-700 text-sm mt-2 font-semibold">{remaining} slice{remaining !== 1 ? 's' : ''} left</p>
    </div>
  );
};

// Eggs Component (leave plate on wrong guesses)
const EggsOnPlate = ({ remaining, max = 6 }) => {
  return (
    <div className="flex flex-col items-center justify-end h-40">
      <div className="relative">
        {/* Plate */}
        <div className="w-36 h-6 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-lg border-2 border-gray-100"></div>
        {/* Eggs */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-1 w-28">
          {Array.from({ length: max }).map((_, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${i < remaining ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            >
              {/* Egg white */}
              <div className="w-10 h-8 bg-white rounded-full shadow-sm relative"
                style={{ 
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  transform: `rotate(${(i * 30) - 45}deg)`
                }}>
                {/* Egg yolk */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full shadow-inner"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-orange-700 text-sm mt-2 font-semibold">{remaining} egg{remaining !== 1 ? 's' : ''} left</p>
    </div>
  );
};

// Game Tokens Component (tokens disappear on wrong guesses)
const GameTokens = ({ remaining, max = 6 }) => {
  const tokenColors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
  return (
    <div className="flex flex-col items-center justify-end h-40">
      <div className="relative">
        {/* Game board base */}
        <div className="w-32 h-24 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-xl border-4 border-indigo-300 shadow-lg relative overflow-hidden">
          {/* Board pattern */}
          <div className="absolute inset-2 grid grid-cols-3 grid-rows-2 gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-indigo-100/50 rounded"></div>
            ))}
          </div>
          {/* Tokens */}
          <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-2 p-2">
            {Array.from({ length: max }).map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full shadow-md transition-all duration-500 ${i < remaining ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                style={{ 
                  background: `linear-gradient(135deg, ${tokenColors[i]} 0%, ${tokenColors[i]}dd 100%)`,
                  boxShadow: i < remaining ? `0 2px 4px ${tokenColors[i]}66` : 'none'
                }}
              >
                <div className="w-full h-full rounded-full border-2 border-white/30"></div>
              </div>
            ))}
          </div>
        </div>
        {/* Dice decoration */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-md shadow-md flex items-center justify-center text-xs">
          🎲
        </div>
      </div>
      <p className="text-purple-700 text-sm mt-2 font-semibold">{remaining} token{remaining !== 1 ? 's' : ''} left</p>
    </div>
  );
};

// Suitcase Items Component (items fall out on wrong guesses)
const SuitcaseItems = ({ remaining, max = 6 }) => {
  const items = ['👕', '👙', '🧴', '📷', '🕶️', '🩴'];
  return (
    <div className="flex flex-col items-center justify-end h-40">
      <div className="relative">
        {/* Suitcase */}
        <div className="w-28 h-20 bg-gradient-to-b from-sky-400 to-sky-500 rounded-lg border-4 border-sky-600 shadow-lg relative">
          {/* Suitcase handle */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-sky-600 rounded-t-lg"></div>
          {/* Suitcase stripe */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-sky-600/50"></div>
          {/* Items inside */}
          <div className="absolute inset-1 flex flex-wrap justify-center items-center gap-1">
            {Array.from({ length: max }).map((_, i) => (
              <div
                key={i}
                className={`text-lg transition-all duration-500 ${i < remaining ? 'opacity-100 scale-100' : 'opacity-0 scale-0 -translate-y-4'}`}
              >
                {items[i]}
              </div>
            ))}
          </div>
          {/* Clasps */}
          <div className="absolute bottom-1 left-3 w-3 h-2 bg-yellow-400 rounded-sm"></div>
          <div className="absolute bottom-1 right-3 w-3 h-2 bg-yellow-400 rounded-sm"></div>
        </div>
        {/* Wheels */}
        <div className="absolute -bottom-1 left-4 w-3 h-3 bg-gray-600 rounded-full"></div>
        <div className="absolute -bottom-1 right-4 w-3 h-3 bg-gray-600 rounded-full"></div>
      </div>
      <p className="text-sky-700 text-sm mt-2 font-semibold">{remaining} item{remaining !== 1 ? 's' : ''} packed</p>
    </div>
  );
};

// Shopping Bags Component (bags disappear on wrong guesses)
const ShoppingBags = ({ remaining, max = 6 }) => {
  const bagColors = [
    { bg: 'from-emerald-300 to-emerald-400', border: 'border-emerald-500' },
    { bg: 'from-teal-300 to-teal-400', border: 'border-teal-500' },
    { bg: 'from-cyan-300 to-cyan-400', border: 'border-cyan-500' },
    { bg: 'from-emerald-400 to-emerald-500', border: 'border-emerald-600' },
    { bg: 'from-teal-400 to-teal-500', border: 'border-teal-600' },
    { bg: 'from-green-300 to-green-400', border: 'border-green-500' },
  ];
  return (
    <div className="flex flex-col items-center justify-end h-40">
      <div className="flex items-end gap-1">
        {Array.from({ length: max }).map((_, i) => {
          const heights = [16, 20, 18, 22, 17, 19];
          const widths = [10, 12, 11, 14, 10, 12];
          return (
            <div
              key={i}
              className={`transition-all duration-500 ${i < remaining ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            >
              {/* Bag */}
              <div 
                className={`bg-gradient-to-b ${bagColors[i].bg} ${bagColors[i].border} border-2 rounded-b-lg relative shadow-md`}
                style={{ width: `${widths[i] * 3}px`, height: `${heights[i] * 2.5}px` }}
              >
                {/* Handles */}
                <div className="absolute -top-2 left-1/4 w-1 h-3 bg-amber-700 rounded-full"></div>
                <div className="absolute -top-2 right-1/4 w-1 h-3 bg-amber-700 rounded-full"></div>
                <div className="absolute -top-3 left-1/4 right-1/4 h-1 border-2 border-amber-700 border-b-0 rounded-t-full"></div>
                {/* Tissue paper */}
                <div className="absolute -top-1 left-1 right-1 h-3 bg-white/80 rounded-t-sm" style={{ clipPath: 'polygon(0 100%, 20% 30%, 40% 100%, 60% 40%, 80% 100%, 100% 50%, 100% 100%)' }}></div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-emerald-700 text-sm mt-2 font-semibold">{remaining} bag{remaining !== 1 ? 's' : ''} left</p>
    </div>
  );
};

// Cooking Pot Component (ingredients disappear on wrong guesses)
const CookingPot = ({ remaining, max = 6 }) => {
  const ingredients = ['🥕', '🧅', '🍅', '🥔', '🌶️', '🧄'];
  return (
    <div className="flex flex-col items-center justify-end h-40">
      <div className="relative">
        {/* Steam */}
        {remaining > 3 && (
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            <div className="w-1.5 h-5 bg-gray-300 rounded-full opacity-50 animate-pulse"></div>
            <div className="w-1.5 h-7 bg-gray-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1.5 h-5 bg-gray-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
        {/* Pot */}
        <div className="w-28 h-16 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-3xl border-4 border-gray-800 relative overflow-hidden shadow-lg">
          {/* Soup/liquid inside */}
          <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-orange-600 to-orange-400 rounded-b-2xl">
            {/* Bubbles */}
            <div className="absolute top-1 left-3 w-2 h-2 bg-orange-300 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-2 right-4 w-1.5 h-1.5 bg-orange-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          </div>
          {/* Ingredients floating */}
          <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-1 p-1">
            {Array.from({ length: max }).map((_, i) => (
              <div
                key={i}
                className={`text-base transition-all duration-500 ${i < remaining ? 'opacity-100 scale-100' : 'opacity-0 scale-0 -translate-y-2'}`}
                style={{ transform: i < remaining ? `rotate(${(i * 15) - 30}deg)` : 'none' }}
              >
                {ingredients[i]}
              </div>
            ))}
          </div>
        </div>
        {/* Pot rim */}
        <div className="absolute -top-1 left-0 right-0 h-3 bg-gradient-to-b from-gray-500 to-gray-600 rounded-t-lg border-2 border-gray-700"></div>
        {/* Handles */}
        <div className="absolute top-2 -left-3 w-4 h-6 bg-gray-700 rounded-l-full border-2 border-gray-800"></div>
        <div className="absolute top-2 -right-3 w-4 h-6 bg-gray-700 rounded-r-full border-2 border-gray-800"></div>
      </div>
      <p className="text-orange-700 text-sm mt-2 font-semibold">{remaining} ingredient{remaining !== 1 ? 's' : ''} left</p>
    </div>
  );
};

const ScoopsGame = () => {
  const [gamePhase, setGamePhase] = useState('selectTheme');
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [teamMessage, setTeamMessage] = useState('');
  const [opponentMessage, setOpponentMessage] = useState('');
  const [playerTeam, setPlayerTeam] = useState([]);
  const [opponentTeam, setOpponentTeam] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  
  const maxWrongGuesses = 6;

  const [stats, setStats] = useState({
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    currentStreak: 0,
    bestStreak: 0,
    themeStats: {},
    achievements: []
  });

  useEffect(() => {
    setHasMounted(true);
    try {
      const saved = localStorage.getItem('scoopsStats');
      if (saved) {
        setStats(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Could not load stats', e);
    }
  }, []);

  const crewMembers = [
    { id: 'laurel', name: 'Laurel', title: 'Cafe Owner' },
    { id: 'mrlindsay', name: 'Mr. Lindsay', title: 'Friendly Regular' },
    { id: 'sarah', name: 'Sarah', title: 'Encouraging & Wise' },
    { id: 'taylorb', name: 'Taylor B.', title: 'Smart & Helpful' }
  ];

  const themes = [
    { 
      id: 'breakfast', 
      name: 'Breakfast', 
      icon: '🥞',
      styledIcon: true,
      iconColor: 'from-amber-600 to-orange-500',
      bgGradient: 'from-amber-50 to-amber-100',
      borderColor: 'border-amber-300',
      component: PancakeStack,
      puzzles: [
        { phrase: 'BUTTERMILK PANCAKES', hint: 'A fluffy breakfast classic' },
        { phrase: 'MAPLE SYRUP', hint: 'Sweet tree nectar topping' },
        { phrase: 'SUNNY SIDE UP', hint: 'Egg style with runny yolk' },
        { phrase: 'BREAKFAST IN BED', hint: 'A lazy morning luxury' },
        { phrase: 'BACON AND EGGS', hint: 'The dynamic duo' },
        { phrase: 'FRENCH TOAST', hint: 'Bread dipped and fried' },
        { phrase: 'HASH BROWNS', hint: 'Crispy shredded potatoes' },
        { phrase: 'MORNING PERSON', hint: 'Early riser type' }
      ]
    },
    { 
      id: 'coffee', 
      name: 'Coffee Shop', 
      icon: '☕',
      styledIcon: true,
      iconColor: 'from-amber-700 to-amber-900',
      bgGradient: 'from-amber-50 to-yellow-50',
      borderColor: 'border-amber-300',
      component: CoffeeCup,
      puzzles: [
        { phrase: 'MAPLE SYRUP LATTE', hint: 'Sweet Canadian-inspired drink' },
        { phrase: 'COFFEE WITH FRIENDS', hint: 'Best way to catch up' },
        { phrase: 'EXTRA SHOT', hint: 'More caffeine please' },
        { phrase: 'COZY CORNER BOOTH', hint: 'Best seat in the cafe' },
        { phrase: 'BARISTA SPECIAL', hint: 'Off-menu creation' },
        { phrase: 'WAKE UP CALL', hint: 'Morning caffeine hit' },
        { phrase: 'CREAM AND SUGAR', hint: 'Coffee additions' },
        { phrase: 'DAILY GRIND', hint: 'Routine or coffee beans' }
      ]
    },
    { 
      id: 'sweets', 
      name: 'Sweet Treats', 
      icon: '🍰',
      styledIcon: true,
      iconColor: 'from-orange-500 to-amber-600',
      bgGradient: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-300',
      component: CakeSlices,
      puzzles: [
        { phrase: 'BIRTHDAY CAKE', hint: 'Celebration dessert' },
        { phrase: 'CHOCOLATE CHIP COOKIE', hint: 'Classic baked treat' },
        { phrase: 'STRAWBERRY SHORTCAKE', hint: 'Fruity layered dessert' },
        { phrase: 'SAVE ROOM FOR DESSERT', hint: 'Wise dining advice' },
        { phrase: 'SWEET TOOTH', hint: 'Craving for sugar' },
        { phrase: 'SUGAR RUSH', hint: 'Post-candy energy' },
        { phrase: 'PIECE OF CAKE', hint: 'Easy or delicious' },
        { phrase: 'ICING ON TOP', hint: 'The finishing touch' }
      ]
    },
    { 
      id: 'brunch', 
      name: 'Brunch', 
      icon: '🍳',
      styledIcon: true,
      iconColor: 'from-yellow-500 to-amber-500',
      bgGradient: 'from-yellow-50 to-amber-50',
      borderColor: 'border-yellow-300',
      component: EggsOnPlate,
      puzzles: [
        { phrase: 'SUNDAY MORNING BRUNCH', hint: 'Weekend late breakfast' },
        { phrase: 'EGGS BENEDICT', hint: 'Hollandaise-topped classic' },
        { phrase: 'MIMOSA BAR', hint: 'Bubbly self-serve station' },
        { phrase: 'AVOCADO TOAST', hint: 'Trendy green spread' },
        { phrase: 'BRUNCH BUNCH', hint: 'Your weekend crew' },
        { phrase: 'SLEEP IN SATURDAY', hint: 'Lazy weekend start' },
        { phrase: 'BOTTOMLESS COFFEE', hint: 'Unlimited refills' },
        { phrase: 'LATE BREAKFAST', hint: 'Another word for brunch' }
      ]
    },
    { 
      id: 'games', 
      name: 'Games', 
      icon: '🎮',
      styledIcon: true,
      iconColor: 'from-amber-600 to-yellow-600',
      bgGradient: 'from-amber-50 to-yellow-50',
      borderColor: 'border-amber-300',
      component: GameTokens,
      puzzles: [
        { phrase: 'GAME NIGHT', hint: 'Evening of friendly competition' },
        { phrase: 'ROLL THE DICE', hint: 'Take a chance' },
        { phrase: 'WINNING STREAK', hint: 'Multiple victories in a row' },
        { phrase: 'BOARD GAMES', hint: 'Tabletop fun for all ages' },
        { phrase: 'WILD CARD', hint: 'Unpredictable game changer' },
        { phrase: 'PLAYER ONE', hint: 'First to grab the controller' },
        { phrase: 'HIGH SCORE', hint: 'The number to beat' },
        { phrase: 'LEVEL UP', hint: 'Getting stronger or better' }
      ]
    },
    { 
      id: 'vacation', 
      name: 'Vacation', 
      icon: '✈️',
      styledIcon: true,
      iconColor: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-300',
      component: SuitcaseItems,
      puzzles: [
        { phrase: 'BEACH VACATION', hint: 'Sandy toes and ocean views' },
        { phrase: 'WINDOW SEAT', hint: 'Best spot for cloud watching' },
        { phrase: 'ROAD TRIP', hint: 'Adventure on four wheels' },
        { phrase: 'PASSPORT READY', hint: 'Prepared for international travel' },
        { phrase: 'OUT OF OFFICE', hint: 'Email auto-reply status' },
        { phrase: 'SOUVENIR SHOPPING', hint: 'Bringing home memories' },
        { phrase: 'ROOM SERVICE', hint: 'Hotel dining in bed' },
        { phrase: 'JET LAG', hint: 'Tired from time zone hopping' }
      ]
    },
    { 
      id: 'shopping', 
      name: 'Shopping', 
      icon: '🛒',
      styledIcon: true,
      iconColor: 'from-yellow-600 to-amber-600',
      bgGradient: 'from-yellow-50 to-amber-50',
      borderColor: 'border-yellow-300',
      component: ShoppingBags,
      puzzles: [
        { phrase: 'RETAIL THERAPY', hint: 'Shopping to feel better' },
        { phrase: 'WINDOW SHOPPING', hint: 'Looking without buying' },
        { phrase: 'FLASH SALE', hint: 'Limited time discount' },
        { phrase: 'ADD TO CART', hint: 'Online shopping action' },
        { phrase: 'BARGAIN HUNTER', hint: 'Deal seeker extraordinaire' },
        { phrase: 'SOLD OUT', hint: 'None left in stock' },
        { phrase: 'GIFT RECEIPT', hint: 'For easy returns' },
        { phrase: 'SHOPPING SPREE', hint: 'Buying bonanza' }
      ]
    },
    { 
      id: 'cooking', 
      name: 'Cooking', 
      icon: '👨‍🍳',
      styledIcon: true,
      iconColor: 'from-orange-600 to-red-500',
      bgGradient: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-300',
      component: CookingPot,
      puzzles: [
        { phrase: 'SECRET INGREDIENT', hint: 'The special something' },
        { phrase: 'FAMILY RECIPE', hint: 'Passed down generations' },
        { phrase: 'TASTE TEST', hint: 'Quality control in the kitchen' },
        { phrase: 'FROM SCRATCH', hint: 'Made without shortcuts' },
        { phrase: 'COMFORT FOOD', hint: 'Meals that warm the soul' },
        { phrase: 'SLOW COOKER', hint: 'Set it and forget it appliance' },
        { phrase: 'PINCH OF SALT', hint: 'Small seasoning amount' },
        { phrase: 'SOUS CHEF', hint: 'Second in command in kitchen' }
      ]
    }
  ];

  const teamMessages = {
    correct: [
      "Yes! Great guess! 🎉",
      "You've got this! ⭐",
      "That's it! Keep going! 💪",
      "Brilliant! 🧠",
      "We knew you'd get it! 🙌"
    ],
    wrong: [
      "Shake it off! We're still in this! 💪",
      "No worries, try another! 🌟",
      "You've got more guesses! Keep going! ✨",
      "That's okay! Think about the hint! 🤔",
      "We believe in you! 💫"
    ],
    close: [
      "So close! You've almost got it! 🔥",
      "Just a few more letters! ⭐",
      "The answer is right there! 👀",
      "Almost! Keep going! 🎯"
    ],
    win: [
      "WE DID IT! Amazing teamwork! 🎉🎊",
      "VICTORY! You're incredible! 🏆",
      "That's how it's done! Champions! 👑"
    ],
    lose: [
      "So close! We'll get them next time! 💪",
      "Good effort team! Another round? 🌟",
      "That was a tough one! Try again? ✨"
    ]
  };

  const opponentMessages = {
    correct: [
      "Lucky guess... 🤨",
      "Hmm, not bad... 👀",
      "Okay okay, you got that one... 😏"
    ],
    wrong: [
      "Ha! Missed one! 😄",
      "Tough luck! 😏",
      "Oops! That's not it! 😅"
    ],
    win: [
      "Well played... we'll get you next time! 👏",
      "You got us this round! 🤝",
      "Impressive! Rematch? 🎮"
    ],
    lose: [
      "Better luck next time! 😄",
      "We got this one! 🏆",
      "The scoop was ours! ☕"
    ]
  };

  const achievements = [
    { id: 'first_scoop', name: 'First Scoop', icon: '☕', description: 'Win your first game', requirement: (s) => s.wins >= 1 },
    { id: 'coffee_lover', name: 'Coffee Lover', icon: '☕', description: 'Win 3 Coffee Shop games', requirement: (s) => (s.themeStats?.coffee?.wins || 0) >= 3 },
    { id: 'sweet_streak', name: 'Sweet Streak', icon: '🍰', description: '3-game win streak', requirement: (s) => s.currentStreak >= 3 },
    { id: 'breakfast_champion', name: 'Breakfast Champion', icon: '🥞', description: 'Win 5 Breakfast games', requirement: (s) => (s.themeStats?.breakfast?.wins || 0) >= 5 },
    { id: 'regular', name: 'Cafe Regular', icon: '👑', description: 'Play 10 games', requirement: (s) => s.gamesPlayed >= 10 },
    { id: 'perfect_game', name: 'Perfect Order', icon: '⭐', description: 'Win without any wrong guesses', requirement: (s) => s.perfectGames >= 1 },
  ];

  const assignTeams = () => {
    const shuffled = [...crewMembers].sort(() => Math.random() - 0.5);
    setPlayerTeam(shuffled.slice(0, 2));
    setOpponentTeam(shuffled.slice(2, 4));
  };

  const selectRandomPuzzle = (theme) => {
    const puzzles = theme.puzzles;
    const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    setCurrentPuzzle(puzzle);
  };

  const startGame = (theme) => {
    setSelectedTheme(theme);
    assignTeams();
    selectRandomPuzzle(theme);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setTeamMessage("Let's get the inside scoop! ☕");
    setOpponentMessage("Think you can solve it? 🤔");
    setGamePhase('playing');
  };

  const handleLetterGuess = (letter) => {
    if (guessedLetters.includes(letter) || gamePhase !== 'playing') return;

    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);

    const phraseLetters = currentPuzzle.phrase.toUpperCase().replace(/[^A-Z]/g, '');
    const isCorrect = phraseLetters.includes(letter);

    if (isCorrect) {
      setTeamMessage(teamMessages.correct[Math.floor(Math.random() * teamMessages.correct.length)]);
      setOpponentMessage(opponentMessages.correct[Math.floor(Math.random() * opponentMessages.correct.length)]);
      
      // Check for win
      const allLettersGuessed = [...new Set(phraseLetters.split(''))].every(l => newGuessedLetters.includes(l));
      if (allLettersGuessed) {
        handleWin(newGuessedLetters);
      } else {
        // Check if close to winning
        const remaining = [...new Set(phraseLetters.split(''))].filter(l => !newGuessedLetters.includes(l)).length;
        if (remaining <= 2) {
          setTimeout(() => {
            setTeamMessage(teamMessages.close[Math.floor(Math.random() * teamMessages.close.length)]);
          }, 1000);
        }
      }
    } else {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      setTeamMessage(teamMessages.wrong[Math.floor(Math.random() * teamMessages.wrong.length)]);
      setOpponentMessage(opponentMessages.wrong[Math.floor(Math.random() * opponentMessages.wrong.length)]);

      if (newWrongGuesses >= maxWrongGuesses) {
        handleLose();
      }
    }
  };

  const handleWin = (finalGuessedLetters) => {
    setGamePhase('won');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
    setTeamMessage(teamMessages.win[Math.floor(Math.random() * teamMessages.win.length)]);
    setOpponentMessage(opponentMessages.win[Math.floor(Math.random() * opponentMessages.win.length)]);

    const newStats = { ...stats };
    newStats.gamesPlayed = (newStats.gamesPlayed || 0) + 1;
    newStats.wins = (newStats.wins || 0) + 1;
    newStats.currentStreak = (newStats.currentStreak || 0) + 1;
    newStats.bestStreak = Math.max(newStats.bestStreak || 0, newStats.currentStreak);
    
    if (wrongGuesses === 0) {
      newStats.perfectGames = (newStats.perfectGames || 0) + 1;
    }

    if (!newStats.themeStats) newStats.themeStats = {};
    if (!newStats.themeStats[selectedTheme.id]) newStats.themeStats[selectedTheme.id] = { wins: 0, losses: 0, games: 0 };
    newStats.themeStats[selectedTheme.id].games++;
    newStats.themeStats[selectedTheme.id].wins++;

    // Check achievements
    const newAchievements = [];
    achievements.forEach(achievement => {
      if (!newStats.achievements?.includes(achievement.id) && achievement.requirement(newStats)) {
        newAchievements.push(achievement.id);
      }
    });
    if (newAchievements.length > 0) newStats.achievements = [...(newStats.achievements || []), ...newAchievements];

    setStats(newStats);
    try { localStorage.setItem('scoopsStats', JSON.stringify(newStats)); } catch (e) { console.error('Could not save stats', e); }
  };

  const handleLose = () => {
    setGamePhase('lost');
    setTeamMessage(teamMessages.lose[Math.floor(Math.random() * teamMessages.lose.length)]);
    setOpponentMessage(opponentMessages.lose[Math.floor(Math.random() * opponentMessages.lose.length)]);

    const newStats = { ...stats };
    newStats.gamesPlayed = (newStats.gamesPlayed || 0) + 1;
    newStats.losses = (newStats.losses || 0) + 1;
    newStats.currentStreak = 0;

    if (!newStats.themeStats) newStats.themeStats = {};
    if (!newStats.themeStats[selectedTheme.id]) newStats.themeStats[selectedTheme.id] = { wins: 0, losses: 0, games: 0 };
    newStats.themeStats[selectedTheme.id].games++;
    newStats.themeStats[selectedTheme.id].losses++;

    setStats(newStats);
    try { localStorage.setItem('scoopsStats', JSON.stringify(newStats)); } catch (e) { console.error('Could not save stats', e); }
  };

  const resetGame = () => {
    setGamePhase('selectTheme');
    setSelectedTheme(null);
    setCurrentPuzzle(null);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setTeamMessage('');
    setOpponentMessage('');
  };

  const playAgain = () => {
    assignTeams();
    selectRandomPuzzle(selectedTheme);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setTeamMessage("Let's get another scoop! ☕");
    setOpponentMessage("Ready for round two? 🤔");
    setGamePhase('playing');
  };

  const getShareText = () => {
    const result = gamePhase === 'won' ? '🏆 Got the Scoop!' : '😅 Close but no scoop!';
    return `☕ Scoops at the Letter Griddle
${selectedTheme.name}
${result}

Play at lettergriddle.com/scoops
🥞 Play more games at lettergriddle.com`;
  };

  const handleShare = async () => {
    const shareText = getShareText();
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Scoops at the Letter Griddle', text: shareText });
        return;
      } catch (e) {
        if (e.name !== 'AbortError') console.log('Native share failed, using clipboard');
      }
    }
    
    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const renderPhrase = () => {
    if (!currentPuzzle) return null;
    
    return (
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {currentPuzzle.phrase.split(' ').map((word, wordIdx) => (
          <div key={wordIdx} className="flex gap-1">
            {word.split('').map((letter, letterIdx) => {
              const isGuessed = guessedLetters.includes(letter.toUpperCase());
              const isRevealed = gamePhase === 'lost' || isGuessed;
              const isLetter = /[A-Z]/i.test(letter);
              
              return (
                <div
                  key={letterIdx}
                  className={`w-8 h-10 flex items-center justify-center text-xl font-bold rounded-lg transition-all duration-300 ${
                    isLetter
                      ? isRevealed
                        ? isGuessed
                          ? 'bg-gradient-to-b from-amber-100 to-amber-200 text-amber-900 border-2 border-amber-400'
                          : 'bg-gradient-to-b from-red-100 to-red-200 text-red-900 border-2 border-red-400'
                        : 'bg-gradient-to-b from-amber-600 to-amber-700 border-2 border-amber-800'
                      : ''
                  }`}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {isLetter ? (isRevealed ? letter.toUpperCase() : '') : letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderKeyboard = () => {
    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    const phraseLetters = currentPuzzle?.phrase.toUpperCase().replace(/[^A-Z]/g, '') || '';

    return (
      <div className="flex flex-col items-center gap-2">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1">
            {row.map(letter => {
              const isGuessed = guessedLetters.includes(letter);
              const isCorrect = isGuessed && phraseLetters.includes(letter);
              const isWrong = isGuessed && !phraseLetters.includes(letter);
              
              return (
                <button
                  key={letter}
                  onClick={() => handleLetterGuess(letter)}
                  disabled={isGuessed || gamePhase !== 'playing'}
                  className={`w-8 h-10 rounded-lg font-bold text-sm transition-all duration-200 ${
                    isCorrect
                      ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-white border-2 border-amber-600 shadow-md'
                      : isWrong
                        ? 'bg-gray-300 text-gray-500 border-2 border-gray-400'
                        : isGuessed
                          ? 'bg-gray-200 text-gray-400'
                          : 'bg-gradient-to-b from-amber-100 to-amber-200 text-amber-900 border-2 border-amber-300 hover:from-amber-200 hover:to-amber-300 hover:scale-105 active:scale-95'
                  }`}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  if (!hasMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #92400E 0%, #B45309 15%, #D97706 30%, #F59E0B 50%, #FBBF24 70%, #FCD34D 85%, #FDE68A 100%)' }}>
        <div className="text-5xl animate-pulse">☕</div>
      </div>
    );
  }

  const ThemeVisual = selectedTheme?.component || PancakeStack;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #92400E 0%, #B45309 10%, #D97706 25%, #F59E0B 40%, #FBBF24 55%, #F59E0B 70%, #D97706 85%, #B45309 100%)' }}>
      {/* Decorative elements */}
      <div className="fixed top-4 left-4 text-5xl opacity-25">☕</div>
      <div className="fixed top-4 right-4 text-5xl opacity-25">🥞</div>
      <div className="fixed bottom-4 left-4 text-5xl opacity-25">🍰</div>
      <div className="fixed bottom-4 right-4 text-5xl opacity-25">☕</div>
      <div className="fixed top-1/3 left-8 text-4xl opacity-15">🧈</div>
      <div className="fixed top-1/2 right-8 text-4xl opacity-15">🍯</div>
      
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top center, rgba(251, 146, 60, 0.4) 0%, transparent 50%)' }}></div>
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(245, 158, 11, 0.3) 0%, transparent 40%)' }}></div>

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => {
            const pieces = ['☕', '🥞', '🍰', '⭐', '🎉', '🧇'];
            const piece = pieces[i % pieces.length];
            const left = (i * 7 + Math.random() * 10) % 100;
            return (
              <div key={i} className="absolute text-3xl" style={{ left: `${left}%`, top: '-50px', animation: `confettiFall 3s ease-in ${(i % 10) * 0.1}s forwards` }}>
                {piece}
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes confettiFall { to { transform: translateY(100vh) rotate(360deg); opacity: 0; } }
      `}</style>

      <div className="max-w-lg mx-auto p-4 relative">
        {/* Letter Griddle Games Link */}
        <div className="absolute top-4 left-4">
          <Link href="/" className="flex items-center gap-2 text-amber-100 hover:text-white transition-colors">
            <span className="text-xl">🥞</span>
            <span className="text-sm font-semibold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Letter Griddle Games</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center pt-12 pb-4">
          {/* Stylized Coffee Cup */}
          <div className="flex justify-center mb-3">
            <div className="relative">
              {/* Cup */}
              <div className="w-16 h-14 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b-2xl border-4 border-amber-300 relative overflow-hidden shadow-lg">
                {/* Coffee */}
                <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-amber-800 to-amber-600 rounded-b-xl">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-amber-500/50 to-transparent"></div>
                </div>
              </div>
              {/* Handle */}
              <div className="absolute top-2 -right-3 w-4 h-8 border-4 border-amber-300 rounded-r-full bg-transparent"></div>
              {/* Steam */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex gap-1">
                <div className="w-1 h-3 bg-amber-200 rounded-full opacity-60 animate-pulse"></div>
                <div className="w-1 h-4 bg-amber-200 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-1 h-3 bg-amber-200 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold" style={{ fontFamily: 'Georgia, serif', color: '#FFFBEB', textShadow: '3px 3px 6px rgba(120, 53, 15, 0.5), 0 0 30px rgba(251, 191, 36, 0.3)' }}>Scoops</h1>
          <p className="text-amber-200 italic text-lg mt-1" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Get the inside scoop at the Letter Griddle</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 mb-6">
          <button onClick={() => setShowStatsModal(true)} className="bg-white/90 hover:bg-white text-amber-800 px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg border-2 border-amber-300 hover:scale-105">📊 Stats</button>
          <button onClick={() => setShowHowToPlay(true)} className="bg-white/90 hover:bg-white text-amber-800 px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg border-2 border-amber-300 hover:scale-105">How to Play</button>
        </div>

        {/* Main Card - Glassmorphism */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-amber-200/50 overflow-hidden" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}>
          
          {/* Theme Selection */}
          {gamePhase === 'selectTheme' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-amber-900 text-center mb-2" style={{ fontFamily: 'Georgia, serif' }}>Choose Your Theme</h2>
              <p className="text-amber-700 text-center mb-6 text-sm">Pick a category and get the inside scoop!</p>
              <div className="grid grid-cols-2 gap-4">
                {themes.map(theme => {
                  // Each theme gets its own font personality
                  const fontStyles = {
                    breakfast: { fontFamily: 'Georgia, serif', fontWeight: '700', letterSpacing: '0.02em' },
                    coffee: { fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: '600', letterSpacing: '0.03em' },
                    sweets: { fontFamily: 'system-ui, sans-serif', fontWeight: '800', letterSpacing: '0.01em' },
                    brunch: { fontFamily: 'Georgia, serif', fontWeight: '500', letterSpacing: '0.05em' },
                    games: { fontFamily: 'system-ui, sans-serif', fontWeight: '900', letterSpacing: '-0.01em', textTransform: 'uppercase', fontSize: '1.25rem' },
                    vacation: { fontFamily: 'Georgia, serif', fontWeight: '600', fontStyle: 'italic', letterSpacing: '0.02em' },
                    shopping: { fontFamily: 'system-ui, sans-serif', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '1.1rem' },
                    cooking: { fontFamily: 'Georgia, serif', fontWeight: '700', fontStyle: 'normal', letterSpacing: '0.01em' }
                  };
                  
                  return (
                    <button
                      key={theme.id}
                      onClick={() => startGame(theme)}
                      className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border-2 border-amber-300/70 hover:border-amber-400 hover:bg-white/80 hover:shadow-lg transition-all text-center group hover:scale-[1.02]"
                    >
                      <div 
                        className="text-2xl text-amber-800 group-hover:text-amber-900 transition-colors"
                        style={fontStyles[theme.id]}
                      >
                        {theme.name}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-center text-amber-700 text-sm mt-6" style={{ fontFamily: 'Georgia, serif' }}>Guess the hidden phrase before running out of guesses!</p>
            </div>
          )}

          {/* Game Play */}
          {(gamePhase === 'playing' || gamePhase === 'won' || gamePhase === 'lost') && selectedTheme && (
            <div className="p-4">
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={resetGame} className="text-amber-600 hover:text-amber-800 text-sm font-semibold">← Themes</button>
                <div className="text-center">
                  <div className="font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>{selectedTheme.name}</div>
                </div>
                <div className="w-16"></div>
              </div>

              {/* Teams Display */}
              <div className="flex justify-between mb-4">
                {/* Your Team */}
                <div className="bg-amber-100/60 backdrop-blur-sm rounded-xl p-3 border-2 border-amber-300/70 flex-1 mr-2 shadow-sm">
                  <div className="text-xs font-bold text-amber-800 text-center mb-2">Your Team</div>
                  <div className="flex justify-center gap-2">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm">You</div>
                    </div>
                    {playerTeam.map(member => (
                      <div key={member.id} className="text-center">
                        <Avatar character={member.id} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Opponent Team */}
                <div className="bg-orange-100/60 backdrop-blur-sm rounded-xl p-3 border-2 border-orange-300/70 flex-1 ml-2 shadow-sm">
                  <div className="text-xs font-bold text-orange-800 text-center mb-2">Opponents</div>
                  <div className="flex justify-center gap-2">
                    {opponentTeam.map(member => (
                      <div key={member.id} className="text-center">
                        <Avatar character={member.id} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Team Messages */}
              {teamMessage && (
                <div className="bg-amber-100/50 backdrop-blur-sm rounded-xl p-3 mb-3 border-2 border-amber-300/70 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {playerTeam.slice(0, 2).map(member => (
                        <Avatar key={member.id} character={member.id} size="sm" />
                      ))}
                    </div>
                    <p className="text-amber-800 text-sm font-medium italic">"{teamMessage}"</p>
                  </div>
                </div>
              )}

              {opponentMessage && (
                <div className="bg-orange-100/50 backdrop-blur-sm rounded-xl p-3 mb-4 border-2 border-orange-300/70 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {opponentTeam.slice(0, 2).map(member => (
                        <Avatar key={member.id} character={member.id} size="sm" />
                      ))}
                    </div>
                    <p className="text-orange-800 text-sm font-medium italic">"{opponentMessage}"</p>
                  </div>
                </div>
              )}

              {/* Visual + Phrase Area */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
                {/* Theme Visual */}
                <div className="flex-shrink-0">
                  <ThemeVisual remaining={maxWrongGuesses - wrongGuesses} max={maxWrongGuesses} />
                </div>
              </div>

              {/* Hint */}
              <div className="text-center mb-4">
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium border-2 border-amber-300">
                  Hint: {currentPuzzle?.hint}
                </span>
              </div>

              {/* Phrase */}
              {renderPhrase()}

              {/* Win/Lose Message */}
              {gamePhase === 'won' && (
                <div className="bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 rounded-2xl p-4 mb-4 text-center border-2 border-amber-400 shadow-md">
                  <p className="text-2xl font-bold text-amber-800 mb-1">🏆 You Got the Scoop! 🏆</p>
                  <p className="text-amber-700">"{currentPuzzle?.phrase}"</p>
                </div>
              )}

              {gamePhase === 'lost' && (
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-4 mb-4 text-center border-2 border-amber-400">
                  <p className="text-2xl font-bold text-amber-800 mb-1">😅 So Close!</p>
                  <p className="text-amber-700">The answer was: "{currentPuzzle?.phrase}"</p>
                </div>
              )}

              {/* Keyboard */}
              {gamePhase === 'playing' && renderKeyboard()}

              {/* Game Over Buttons */}
              {(gamePhase === 'won' || gamePhase === 'lost') && (
                <div className="flex gap-3 justify-center mt-4">
                  <button onClick={playAgain} className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105" style={{ fontFamily: 'Georgia, serif' }}>Play Again</button>
                  <button onClick={() => setShowShareModal(true)} className="bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105" style={{ fontFamily: 'Georgia, serif' }}>Share</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center py-6 mt-4">
          <p className="text-white/90 text-sm">
            Part of <Link href="/" className="underline hover:text-white transition-colors">The Letter Griddle Cafe</Link>
          </p>
          <p className="text-white/70 text-xs mt-1">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span className="mx-1">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </p>
          <p className="text-white/60 text-xs mt-1">© {new Date().getFullYear()} Letter Griddle Cafe</p>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
            <h2 className="text-2xl font-bold text-amber-800 mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>Share Your Scoop! ☕</h2>
            <div className="bg-amber-50 rounded-xl p-4 mb-4 font-mono text-sm border-2 border-amber-200">
              <div className="whitespace-pre-wrap text-amber-900">{getShareText()}</div>
            </div>
            <button onClick={handleShare} className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg transition-all">{shareCopied ? '✓ Copied!' : 'Share Results'}</button>
          </div>
        </div>
      )}

      {/* Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowStatsModal(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative my-8" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowStatsModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
            <h2 className="text-2xl font-bold text-amber-800 mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>Your Scoops 📊</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-amber-50 rounded-xl p-3 text-center border-2 border-amber-200"><div className="text-2xl font-bold text-amber-800">{stats.gamesPlayed || 0}</div><div className="text-xs text-amber-600">Games Played</div></div>
              <div className="bg-green-50 rounded-xl p-3 text-center border-2 border-green-200"><div className="text-2xl font-bold text-green-800">{stats.wins || 0}</div><div className="text-xs text-green-600">Wins</div></div>
              <div className="bg-amber-50 rounded-xl p-3 text-center border-2 border-amber-200"><div className="text-2xl font-bold text-amber-800">{stats.currentStreak || 0} 🔥</div><div className="text-xs text-amber-600">Current Streak</div></div>
              <div className="bg-amber-50 rounded-xl p-3 text-center border-2 border-amber-200"><div className="text-2xl font-bold text-amber-800">{stats.bestStreak || 0}</div><div className="text-xs text-amber-600">Best Streak</div></div>
            </div>
            
            {/* Theme Stats */}
            <div className="border-t-2 border-amber-200 pt-4 mb-4">
              <h3 className="font-bold text-amber-800 mb-3 text-center">By Theme</h3>
              <div className="grid grid-cols-2 gap-2">
                {themes.map(theme => {
                  const themeStats = stats.themeStats?.[theme.id] || { wins: 0, games: 0 };
                  return (
                    <div key={theme.id} className="bg-amber-50 rounded-lg p-2 text-center border border-amber-200">
                      <div className="text-xl">{theme.icon}</div>
                      <div className="text-xs font-semibold text-amber-800">{themeStats.wins}W / {themeStats.games}G</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="border-t-2 border-amber-200 pt-4">
              <h3 className="font-bold text-amber-800 mb-3 text-center flex items-center justify-center gap-2"><Award size={20} />Achievements</h3>
              <div className="space-y-2">
                {achievements.map(achievement => {
                  const unlocked = stats.achievements?.includes(achievement.id);
                  return (
                    <div key={achievement.id} className={`flex items-center gap-3 rounded-lg p-2 border ${unlocked ? 'bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-400' : 'bg-gray-100 border-gray-300 opacity-50'}`}>
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <div className={`font-semibold text-sm ${unlocked ? 'text-amber-800' : 'text-gray-600'}`}>{achievement.name}</div>
                        <div className={`text-xs ${unlocked ? 'text-amber-600' : 'text-gray-500'}`}>{achievement.description}</div>
                      </div>
                      {unlocked && <span className="text-green-500">✓</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How to Play Modal */}
      {showHowToPlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowHowToPlay(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowHowToPlay(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
            <div className="text-center mb-4"><div className="text-4xl mb-2">☕</div><h2 className="text-2xl font-bold text-amber-800" style={{ fontFamily: 'Georgia, serif' }}>How to Play</h2></div>
            <div className="space-y-4">
              <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200"><div className="font-bold text-amber-800 mb-1">🥞 Goal</div><p className="text-sm text-amber-700">Guess the hidden phrase letter by letter before you run out of guesses!</p></div>
              <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200"><div className="font-bold text-amber-800 mb-1">🍳 How to Play</div><ul className="text-sm text-amber-700 space-y-1"><li>• Pick a theme to start</li><li>• You'll be teamed with 2 crew members</li><li>• Tap letters to guess</li><li>• Green = correct, Gray = wrong</li><li>• 6 wrong guesses and you're out!</li></ul></div>
              <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200"><div className="font-bold text-amber-800 mb-1">🧇 Tips</div><ul className="text-sm text-amber-700 space-y-1"><li>• Start with common letters (E, A, R, S, T)</li><li>• Use the hint to guide your guesses</li><li>• Watch the visual - it shows guesses left!</li></ul></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoopsGame;
