"use client";
import React, { useState } from 'react';
import { Share2, Instagram } from 'lucide-react';

// Daily trivia questions - tied to Letter Griddle themes
const triviaQuestions = [
  {
    id: 1,
    theme: "Candy 🍬",
    question: "Reese's Pieces gained fame from which movie?",
    options: ["Gremlins", "E.T.", "Ghostbusters", "The Goonies"],
    correctAnswer: "E.T.",
    hint: "Phone home...",
    funFact: "Mars turned down the product placement for M&M's, so Reese's got the starring role. Sales jumped 65% after the film!"
  },
  {
    id: 2,
    theme: "Candy 🍬",
    question: "Tootsie Rolls were military rations during which event?",
    options: ["World War I", "World War II", "Korean War", "Vietnam War"],
    correctAnswer: "World War II",
    hint: "The 1940s were tough times...",
    funFact: "Tootsie Rolls didn't melt and provided quick energy for soldiers. They were included in rations throughout WWII!"
  },
  {
    id: 3,
    theme: "Candy 🍬",
    question: "Snickers is named as a tribute to which animal?",
    options: ["Dog", "Cat", "Horse", "Cow"],
    correctAnswer: "Horse",
    hint: "The Mars family loved this farm animal...",
    funFact: "The Mars family named the candy bar after their favorite horse, Snickers, when it launched in 1930!"
  },
  {
    id: 4,
    theme: "Candy 🍬",
    question: "What are Kit Kat's individual sections called?",
    options: ["Bars", "Sticks", "Fingers", "Strips"],
    correctAnswer: "Fingers",
    hint: "Count them on your hand...",
    funFact: "The original 1935 design was meant for a 'break' - snap off a finger! The name comes from an 18th-century London club."
  },
  {
    id: 5,
    theme: "Movies 🎬",
    question: "Which film featured a great white shark terrorizing a beach town?",
    options: ["The Deep", "Jaws", "Piranha", "Orca"],
    correctAnswer: "Jaws",
    hint: "You're gonna need a bigger boat...",
    funFact: "Jaws was released in 1975 and became the first summer blockbuster, earning over $470 million worldwide!"
  },
  {
    id: 6,
    theme: "Food 🍕",
    question: "Which country invented pizza as we know it today?",
    options: ["Greece", "United States", "Italy", "France"],
    correctAnswer: "Italy",
    hint: "Think Naples...",
    funFact: "Modern pizza originated in Naples, Italy in the 18th century. The Margherita pizza was created in 1889 to honor Queen Margherita!"
  },
  {
    id: 7,
    theme: "Music 🎵",
    question: "The Walkman portable cassette player was introduced by which company?",
    options: ["Panasonic", "Sony", "Philips", "Samsung"],
    correctAnswer: "Sony",
    hint: "A Japanese electronics giant...",
    funFact: "Sony released the Walkman in 1979 for $150. It revolutionized how people listened to music and sold over 400 million units!"
  },
  {
    id: 8,
    theme: "Sports ⚽",
    question: "How many players are on a standard soccer team on the field?",
    options: ["9", "10", "11", "12"],
    correctAnswer: "11",
    hint: "Same as American football...",
    funFact: "The 11-player rule was standardized in 1870. Early soccer games had anywhere from 15 to 20 players per side!"
  },
  {
    id: 9,
    theme: "Animals 🦁",
    question: "What is a group of flamingos called?",
    options: ["Flock", "Flamboyance", "Flutter", "Flame"],
    correctAnswer: "Flamboyance",
    hint: "Think about their colorful personality...",
    funFact: "A group of flamingos is called a 'flamboyance' - fitting for these bright pink, show-stopping birds!"
  },
  {
    id: 10,
    theme: "History 📜",
    question: "The first email was sent in what decade?",
    options: ["1960s", "1970s", "1980s", "1990s"],
    correctAnswer: "1970s",
    hint: "Earlier than most people think...",
    funFact: "Ray Tomlinson sent the first email in 1971. He also chose the @ symbol to separate usernames from computer names!"
  }
];

// Function to get today's question
const getTodaysQuestion = () => {
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const hour = estTime.getHours();
  
  let questionDate = new Date(estTime);
  if (hour < 19) {
    questionDate.setDate(questionDate.getDate() - 1);
  }
  questionDate.setHours(19, 45, 0, 0);
  
  const epoch = new Date('1970-01-01');
  const daysSinceEpoch = Math.floor((questionDate - epoch) / (1000 * 60 * 60 * 24));
  const questionIndex = daysSinceEpoch % triviaQuestions.length;
  
  return triviaQuestions[questionIndex];
};

const FlipsGame = () => {
  const [question] = useState(getTodaysQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const handleCardClick = (option) => {
    if (hasAnswered || isFlipping) return;
    
    setIsFlipping(true);
    setSelectedAnswer(option);
    
    setTimeout(() => {
      setHasAnswered(true);
      setIsFlipping(false);
    }, 600);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleShare = () => {
    const resultEmoji = isCorrect ? "✅" : "🤔";
    const resultText = isCorrect ? "Got it!" : "Learned something new!";
    const hintText = showHint ? " (with hint)" : "";
    const shareText = `Letter Griddle Flips 🥞\n${question.theme}\n${resultEmoji} ${resultText}${hintText}\nNew flip daily at 7:45 PM EST\nlettergriddle.com/flips`;
    
    navigator.clipboard.writeText(shareText).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const getCardStyle = (option) => {
    if (!hasAnswered) {
      return "bg-gradient-to-br from-amber-100 to-amber-200 border-amber-400 hover:border-amber-500 hover:shadow-lg hover:scale-105 cursor-pointer";
    }
    
    if (option === question.correctAnswer) {
      return "bg-gradient-to-br from-green-100 to-green-200 border-green-500 scale-105";
    }
    
    if (option === selectedAnswer && !isCorrect) {
      return "bg-gradient-to-br from-amber-200 to-amber-300 border-amber-600 opacity-75";
    }
    
    return "bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300 opacity-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="fixed top-4 left-4 text-4xl opacity-20">☕</div>
      <div className="fixed top-4 right-4 text-4xl opacity-20">🥞</div>
      <div className="fixed bottom-20 left-4 text-4xl opacity-20">📜</div>
      <div className="fixed bottom-20 right-4 text-4xl opacity-20">☕</div>

      <div className="max-w-lg mx-auto relative">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">☕</div>
          <h1 className="text-3xl font-bold text-amber-100" style={{fontFamily: 'Georgia, serif'}}>
            Letter Griddle Flips
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl shadow-2xl p-6 border-4 border-amber-300">
          
          {/* Theme Badge */}
          <div className="text-center mb-4">
            <span className="bg-amber-700 text-amber-100 px-4 py-1 rounded-full text-sm font-semibold">
              {question.theme}
            </span>
          </div>

          {/* Question */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-amber-900" style={{fontFamily: 'Georgia, serif'}}>
              {question.question}
            </h2>
          </div>

          {/* Hint Toggle */}
          {!hasAnswered && (
            <div className="text-center mb-4">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 mx-auto text-amber-700 hover:text-amber-800 transition-all"
              >
                <span className={`text-lg ${showHint ? "opacity-100" : "opacity-70"}`}>💡</span>
                <span className="text-sm font-medium">
                  {showHint ? "Hide hint" : "Need a hint?"}
                </span>
              </button>
              
              {showHint && (
                <div className="mt-2 bg-amber-200 rounded-lg px-4 py-2 inline-block">
                  <p className="text-amber-800 text-sm italic">💡 {question.hint}</p>
                </div>
              )}
            </div>
          )}

          {/* Answer Cards - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {question.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(option)}
                className={`
                  relative p-4 rounded-xl border-3 transition-all duration-300 
                  ${getCardStyle(option)}
                  ${isFlipping && selectedAnswer === option ? 'animate-pulse' : ''}
                `}
                style={{
                  minHeight: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: '3px'
                }}
              >
                <span className="text-amber-900 font-semibold text-center" style={{fontFamily: 'Georgia, serif'}}>
                  {option}
                </span>
                
                {/* Checkmark for correct answer after reveal */}
                {hasAnswered && option === question.correctAnswer && (
                  <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Result & Fun Fact */}
          {hasAnswered && (
            <div className="animate-fade-in">
              {/* Result Message */}
              <div className={`text-center p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100 border-2 border-green-300' : 'bg-amber-200 border-2 border-amber-400'}`}>
                <p className="text-xl font-bold mb-1" style={{fontFamily: 'Georgia, serif'}}>
                  {isCorrect ? "🎉 You got it!" : "Good guess!"}
                </p>
                {!isCorrect && (
                  <p className="text-amber-800">
                    The answer was <strong>{question.correctAnswer}</strong>
                  </p>
                )}
              </div>

              {/* Fun Fact */}
              <div className="bg-gradient-to-br from-amber-700 to-amber-800 rounded-xl p-4 text-amber-100">
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  ☕ Did You Know?
                </p>
                <p className="text-sm leading-relaxed">
                  {question.funFact}
                </p>
              </div>

              {/* Share Button */}
              <div className="text-center mt-4">
                <button
                  onClick={handleShare}
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all flex items-center gap-2 mx-auto"
                >
                  <Share2 size={18} />
                  {shareCopied ? "Copied!" : "Share"}
                </button>
              </div>

              {/* Come Back Message */}
              <div className="text-center mt-4">
                <p className="text-amber-700 text-sm">
                  ☕ Come back tomorrow for another flip!
                </p>
              </div>
            </div>
          )}

          {/* Instruction */}
          {!hasAnswered && (
            <div className="text-center">
              <p className="text-amber-600 text-sm">
                Tap a card to flip it
              </p>
            </div>
          )}
        </div>

        {/* New Flip Time */}
        <div className="text-center mt-6">
          <p className="text-amber-300 text-xs">
            New flip daily at 7:45 PM EST
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pb-6">
        <div className="max-w-lg mx-auto text-center">
          {/* Letter Griddle Games Link */}
          <a 
            href="https://lettergriddle.com" 
            className="inline-flex items-center gap-2 text-amber-200 hover:text-amber-100 transition-colors mb-4"
          >
            <span className="text-xl">🥞</span>
            <span className="font-semibold">Letter Griddle Games</span>
          </a>
          
          {/* Instagram */}
          <div className="mb-4">
            <a 
              href="https://instagram.com/letter_griddle" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-300 hover:text-amber-100 text-sm transition-colors"
            >
              <Instagram size={16} className="inline mr-1" /> @letter_griddle
            </a>
          </div>
          
          {/* Legal Links */}
          <div className="flex justify-center gap-4 text-xs text-amber-400 mb-3">
            <a href="/privacy" className="hover:text-amber-200 transition-colors">Privacy</a>
            <span>•</span>
            <a href="/terms" className="hover:text-amber-200 transition-colors">Terms</a>
          </div>
          
          {/* Copyright */}
          <p className="text-amber-500 text-xs">
            © {new Date().getFullYear()} Letter Griddle. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FlipsGame;