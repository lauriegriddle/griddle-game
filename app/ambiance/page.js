"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Volume2, VolumeX, Play, Pause, Music, Home, ChevronDown } from 'lucide-react';

const AmbiancePage = () => {
  const [isEvening, setIsEvening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showTrackMenu, setShowTrackMenu] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const audioRef = useRef(null);

  const dayTracks = [
    { name: 'Morning Light', file: '/ambiance/day-cafe-jazz.mp3' },
    { name: 'Sunday Papers', file: '/ambiance/day-acoustic.mp3' },
    { name: 'Garden Room', file: '/ambiance/day-lofi.mp3' },
  ];

  const eveningTracks = [
    { name: 'Golden Hour', file: '/ambiance/evening-jazz.mp3' },
    { name: 'Last Call', file: '/ambiance/evening-piano.mp3' },
    { name: 'City Lights', file: '/ambiance/evening-rain.mp3' },
  ];

  const tracks = isEvening ? eveningTracks : dayTracks;

  useEffect(() => {
    setCurrentTrack(0);
  }, [isEvening]);

  // Check for puzzle drop times and trigger glow
useEffect(() => {
  const checkGlowTime = () => {
    const now = new Date();
    const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const hours = estTime.getHours();
    const minutes = estTime.getMinutes();

    // Morning glow: 7:00 AM - 7:05 AM EST
    const isMorningGlow = hours === 7 && minutes < 5;

    // Evening glow: 7:00, 7:15, 7:30, 7:45, 8:00 PM (first 5 min of each)
    const isEveningGlow = 
      (hours === 19 && minutes < 5) ||
      (hours === 19 && minutes >= 15 && minutes < 20) ||
      (hours === 19 && minutes >= 30 && minutes < 35) ||
      (hours === 19 && minutes >= 45 && minutes < 50) ||
      (hours === 20 && minutes < 5);

    setIsGlowing(isMorningGlow || isEveningGlow);
  };

  checkGlowTime();
  const interval = setInterval(checkGlowTime, 30000);
  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume, isMuted, currentTrack, isEvening]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  const toggleScene = () => setIsEvening(!isEvening);

  const selectTrack = (index) => {
    setCurrentTrack(index);
    setShowTrackMenu(false);
    if (isPlaying && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Glow animation styles */}
      <style>{`
        @keyframes gentleGlow {
          0%, 100% { 
            text-shadow: 0 0 20px #fbbf24, 0 0 40px #fbbf24, 0 0 60px #fbbf24;
          }
          50% { 
            text-shadow: 0 0 40px #fbbf24, 0 0 80px #fbbf24, 0 0 100px #fbbf24;
          }
        }
        .tagline-glow {
          animation: gentleGlow 1s ease-in-out infinite !important;
          text-shadow: 0 0 20px #fbbf24 !important;
        }
      `}</style>
      
      <audio
  ref={audioRef}
  src={tracks[currentTrack]?.file}
  loop={true}
  preload="auto"
  onEnded={(e) => {
    e.target.currentTime = 0;
    e.target.play();
  }}
/>

      <div 
  className={`absolute inset-0 transition-opacity duration-1000 ${
    isEvening ? 'opacity-0' : 'opacity-100'
  }`}
>
  <div
    className="absolute inset-0"
    style={{
    background: 'linear-gradient(160deg, #A67B5B 0%, #BC8A5F 20%, #D4A373 40%, #E8C4A0 60%, #FFE4C9 80%, #FFF8F0 100%)',
    }}
  />
  {/* Warm overlay - day only */}
<div
  className={`absolute inset-0 transition-opacity duration-1000 ${
    isEvening ? 'opacity-0' : 'opacity-100'
  }`}
  style={{
    backgroundColor: 'rgba(255, 180, 100, 0.15)',
  }}
/>
</div>
      
      <div
  className={`absolute inset-0 transition-opacity duration-1000 ${
    isEvening ? 'opacity-100' : 'opacity-0'
  }`}
>
  <div
    className="absolute inset-0"
    style={{
      background: 'linear-gradient(160deg, #A04000 0%, #D35400 20%, #E67E22 40%, #F5B041 60%, #FFE0A3 80%, #FFF7E6 100%)',
    }}
  />
  {/* Brighten overlay */}
  <div 
    className="absolute inset-0"
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    }}
  />
</div>

      <div 
        className={`absolute inset-0 transition-all duration-1000 ${
          isEvening ? 'bg-black/30' : 'bg-black/10'
        }`}
      />

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        
        <div className="flex justify-between items-center p-4 md:p-6">
          <a 
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all bg-black/30 hover:bg-black/50 text-white/90 backdrop-blur-sm border border-white/10"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <Home size={16} />
            <span className="text-sm hidden sm:inline">Back to Game</span>
          </a>

          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
            <Sun className={`w-4 h-4 transition-all ${!isEvening ? 'text-amber-300' : 'text-white/40'}`} />
            <button
              onClick={toggleScene}
              className="relative w-12 h-6 rounded-full transition-all duration-500 bg-white/20"
            >
              <div 
                className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-500 bg-white shadow-lg ${
                  isEvening ? 'left-7' : 'left-1'
                }`}
              />
            </button>
            <Moon className={`w-4 h-4 transition-all ${isEvening ? 'text-amber-300' : 'text-white/40'}`} />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          
          <div className="mb-8 text-center">
            <h1 
              className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.15em] transition-all duration-1000 ${
                isEvening ? 'text-amber-100/90' : 'text-white/95'
              }`}
              style={{ 
                fontFamily: 'Georgia, serif',
                textShadow: isEvening 
                  ? '0 0 40px rgba(251,191,36,0.3), 0 2px 10px rgba(0,0,0,0.5)' 
                  : '0 2px 20px rgba(0,0,0,0.3)',
              }}
            >
              LETTER GRIDDLE
            </h1>
            <p 
              className={`mt-3 text-sm md:text-base tracking-[0.15em] transition-all duration-1000 ${
                isEvening ? 'text-amber-200/60' : 'text-white/70'
              }`}
              style={{ 
                fontFamily: 'Georgia, serif',
                textShadow: '0 1px 10px rgba(0,0,0,0.5)',
              }}
            >
              DAILY PUZZLES
            </p>
          </div>

          <p 
            className={`text-center text-base md:text-lg ${isGlowing ? 'tagline-glow' : ''}max-w-md transition-all duration-1000 ${
              isEvening ? 'text-white/60' : 'text-white/80'
            }`}
            style={{ 
              fontFamily: 'Georgia, serif', 
              fontStyle: 'italic',
              textShadow: isGlowing ? '0 0 20px #fbbf24, 0 0 40px #fbbf24, 0 0 60px #f59e0b' : '0 1px 10px rgba(0,0,0,0.5)',
            }}
          >
            {isEvening 
              ? '"Puzzle hour. New games drop 7-8pm"' 
              : '"Start your day. Letter Griddle Cafe Special drops at 7am."'}
          </p>

          <div 
            className="w-full max-w-sm p-5 rounded-2xl transition-all duration-500 bg-black/40 backdrop-blur-md border border-white/10"
            style={{
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            
            <div className="relative mb-4">
              <button
                onClick={() => setShowTrackMenu(!showTrackMenu)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all bg-white/10 hover:bg-white/15 text-white/80 border border-white/5"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                <div className="flex items-center gap-3">
                  <Music size={16} className="text-amber-300/80" />
                  <div className="text-left">
                    <p className="text-xs text-white/50 uppercase tracking-wider">Now Playing</p>
                    <p className="text-sm">{tracks[currentTrack]?.name || 'Select Track'}</p>
                  </div>
                </div>
                <ChevronDown 
                  className={`transition-transform text-white/50 ${showTrackMenu ? 'rotate-180' : ''}`} 
                  size={16} 
                />
              </button>
              
              {showTrackMenu && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-xl shadow-2xl z-20 overflow-hidden bg-black/80 backdrop-blur-md border border-white/10">
                  {tracks.map((track, index) => (
                    <button
                      key={track.name}
                      onClick={() => selectTrack(index)}
                      className={`w-full px-4 py-3 text-left transition-all flex items-center gap-3 text-white/70 hover:bg-white/10 ${
                        currentTrack === index ? 'bg-white/10' : ''
                      }`}
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      <span className="text-sm">{track.name}</span>
                      {currentTrack === index && (
                        <span className="ml-auto text-amber-400">●</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-6 mb-4">
              <button
                onClick={togglePlay}
                className="p-4 rounded-full transition-all bg-amber-500/80 hover:bg-amber-500 text-white shadow-lg"
                style={{
                  boxShadow: '0 4px 20px rgba(251,191,36,0.3)',
                }}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={toggleMute} 
                className="text-white/50 hover:text-white/80 transition-colors"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none cursor-pointer bg-white/20"
                  style={{
                    background: `linear-gradient(to right, rgba(251,191,36,0.8) ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`
                  }}
                />
              </div>
              <span className="text-xs text-white/40 w-8 text-right" style={{ fontFamily: 'Georgia, serif' }}>
                {Math.round(volume * 100)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 text-center">
          <p 
            className="text-xs text-white/40 tracking-wider"
            style={{ 
              fontFamily: 'Georgia, serif',
              textShadow: '0 1px 5px rgba(0,0,0,0.5)',
            }}
          >
            Leave open while you play · <a href="/" className="underline hover:text-white/60 transition-colors">lettergriddle.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AmbiancePage;