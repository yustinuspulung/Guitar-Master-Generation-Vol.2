import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Flame, ShieldAlert, Award, Star, Play, Radio, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSectionProps {
  onCtaClick: () => void;
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeFret, setActiveFret] = useState(0);

  // 3D Perspective Card Tilt States
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Interactive Live Web Audio/EQ States
  const [activeRiff, setActiveRiff] = useState<'power' | 'solo' | null>(null);
  const [eqLevels, setEqLevels] = useState<number[]>(new Array(14).fill(12));

  // Logo Custom Image & Interactive Highlight States
  const [cardView, setCardView] = useState<'poster' | 'interactive'>('poster');
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isSparksActive, setIsSparksActive] = useState(false);

  // Simulate passive fretting for the background reverb bar
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFret((prev) => (prev + 1) % 6);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Equalizer visualizer loop (bounces vigorously on metal tracks, gently breathes when idle)
  useEffect(() => {
    let animId: number;
    const runEq = () => {
      setEqLevels((prev) => 
        prev.map((val) => {
          if (activeRiff) {
            // High-voltage rock vibrations! Bounces aggressively
            return Math.floor(Math.random() * 85) + 15;
          } else {
            // Smooth, idle breathing frequency wave
            const target = 10 + Math.floor(Math.sin(Date.now() * 0.003 + val) * 6);
            return Math.max(6, Math.floor(val * 0.75 + target * 0.25));
          }
        })
      );
      animId = requestAnimationFrame(runEq);
    };
    animId = requestAnimationFrame(runEq);
    return () => cancelAnimationFrame(animId);
  }, [activeRiff]);

  // Dynamic Web Audio Heavy Metal Synthesizer
  const playLiveRiff = (type: 'power' | 'solo') => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      setActiveRiff(type);
      const duration = type === 'power' ? 2.8 : 3.8;
      
      // Reset state once natural riff completes
      setTimeout(() => {
        setActiveRiff(null);
      }, duration * 1000);

      // Distinct wave shaping curve for high-gain heavy distortion (fuzz & clipping)
      const makeDistortionCurve = (amount = 60) => {
        const k = amount;
        const n_samples = 44100;
        const curve = new Float32Array(n_samples);
        const deg = Math.PI / 180;
        for (let i = 0; i < n_samples; ++i) {
          const x = (i * 2) / n_samples - 1;
          curve[i] = ((3 + k) * x * 18 * deg) / (Math.PI + k * Math.abs(x));
        }
        return curve;
      };

      const now = ctx.currentTime;
      
      // Distortion node
      const distortion = ctx.createWaveShaper();
      distortion.curve = makeDistortionCurve(110);
      distortion.oversample = '4x';

      // Amp Cab Simulation contour filter
      const cabFilter = ctx.createBiquadFilter();
      cabFilter.type = 'peaking';
      cabFilter.frequency.setValueAtTime(1100, now);
      cabFilter.Q.setValueAtTime(1.4, now);
      cabFilter.gain.setValueAtTime(9, now);

      // Stadium Delay Node
      const delay = ctx.createDelay(1.0);
      delay.delayTime.setValueAtTime(0.24, now);
      const delayGain = ctx.createGain();
      delayGain.gain.setValueAtTime(0.28, now);

      // Main master gain slider
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.32, now);

      // Individual synthesized guitar string function
      const triggerString = (freq: number, startT: number, dur: number, toneSweep = 1600, power = 1.0) => {
        const oscSaw = ctx.createOscillator();
        const oscTri = ctx.createOscillator();
        const oscSub = ctx.createOscillator();
        const stringGain = ctx.createGain();

        // Thick sawtooth
        oscSaw.type = 'sawtooth';
        oscSaw.frequency.setValueAtTime(freq, startT);

        // Triangular detune for warmth and lushness
        oscTri.type = 'triangle';
        oscTri.frequency.setValueAtTime(freq * 1.006, startT);

        // Sub octave square oscillator (heavy chug bass)
        oscSub.type = 'square';
        oscSub.frequency.setValueAtTime(freq / 2, startT);

        // 8Hz Pitch Vibrato vibrato for organic guitar emulation
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        vibrato.frequency.setValueAtTime(8, startT);
        vibratoGain.gain.setValueAtTime(freq * 0.013, startT);
        vibrato.connect(vibratoGain);
        vibratoGain.connect(oscSaw.frequency);
        vibratoGain.connect(oscTri.frequency);
        vibrato.start(startT);
        vibrato.stop(startT + dur);

        // Dynamic tone sweep filter
        const sweepFilter = ctx.createBiquadFilter();
        sweepFilter.type = 'lowpass';
        sweepFilter.frequency.setValueAtTime(toneSweep, startT);
        sweepFilter.frequency.exponentialRampToValueAtTime(500, startT + dur);

        // String ADSR manual envelope
        stringGain.gain.setValueAtTime(0, startT);
        stringGain.gain.linearRampToValueAtTime(0.25 * power, startT + 0.035); // punchy attack
        stringGain.gain.exponentialRampToValueAtTime(0.001, startT + dur); // smooth decay

        oscSaw.connect(sweepFilter);
        oscTri.connect(sweepFilter);
        oscSub.connect(sweepFilter);
        sweepFilter.connect(stringGain);
        stringGain.connect(distortion);

        oscSaw.start(startT);
        oscTri.start(startT);
        oscSub.start(startT);
        oscSaw.stop(startT + dur);
        oscTri.stop(startT + dur);
        oscSub.stop(startT + dur);
      };

      if (type === 'power') {
        // Melodic rock power chord progression: A5 -> C5 -> D5 -> G5
        const chords = [
          { root: 110.00, fifth: 164.81, octave: 220.00, t: 0, d: 0.6 },  // A5
          { root: 130.81, fifth: 196.00, octave: 261.63, t: 0.6, d: 0.6 },  // C5
          { root: 146.83, fifth: 220.00, octave: 293.66, t: 1.2, d: 0.8 },  // D5
          { root: 98.00, fifth: 146.83, octave: 196.00, t: 2.0, d: 0.7 },   // G5
        ];
        chords.forEach((c) => {
          triggerString(c.root, now + c.t, c.d, 1800, 0.85);
          triggerString(c.fifth, now + c.t, c.d, 1600, 0.85);
          triggerString(c.octave, now + c.t, c.d, 1500, 0.75);
        });
      } else {
        // High-Speed 8-Finger Double-Neck Tapping sequence (Balawan Tribute!)
        const tappingNotes = [
          220.00, 261.63, 311.13, 440.00, 523.25, 440.00, 311.13, 261.63, // Am dim
          174.61, 220.00, 261.63, 349.23, 440.00, 349.23, 261.63, 220.00, // Fmaj
          196.00, 246.94, 293.66, 392.00, 493.88, 392.00, 293.66, 246.94, // Gmaj
          440.00, 523.25, 659.25, 880.00, 1046.50, 880.00, 659.25, 440.00 // Am shred peak
        ];
        const noteDuration = 0.11; // 110ms per note (extreme velocity)
        tappingNotes.forEach((freq, idx) => {
          triggerString(freq, now + (idx * noteDuration), 0.22, 2200, 1.1);
        });
      }

      distortion.connect(cabFilter);
      cabFilter.connect(mainGain);

      // Delay routing setup
      distortion.connect(delay);
      delay.connect(delayGain);
      delayGain.connect(mainGain);
      delayGain.connect(delay);

      mainGain.connect(ctx.destination);
    } catch (err) {
      console.warn("Autoplay gesture blocked Web Audio initialization:", err);
      setActiveRiff(null);
    }
  };

  // 3D Card tilt dynamic projection formulas
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Limits rotation tilt within comfortable bounds (max 15 degrees)
    const rotateX = -(y / (rect.height / 2)) * 14;
    const rotateY = (x / (rect.width / 2)) * 14;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleCardMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsCardHovered(false);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-dark border-b border-zinc-900 px-4 md:px-8 py-16">
      {/* Heavy-gritted rock atmosphere simulated background with moving grunges / lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Grayscale Guitar Concert Photo Collage overlay with low opacity (20%) */}
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale contrast-200 opacity-[0.16] mix-blend-color-dodge transition-opacity duration-1000"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1200')` 
          }}
        />
        
        {/* Moving red overlay stage lighting simulation */}
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-crimson/10 rounded-full blur-[120px] animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-blaze/10 rounded-full blur-[100px] animate-pulse duration-[6000ms]" />

        {/* Rock scanlines and CRT grunges overlay for high-fidelity industrial feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-40" />
        
        {/* Subtle grid backing */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Value Proposition */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Partnership level tag */}
          <div className="inline-flex items-center gap-2 bg-crimson/10 border border-crimson/30 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-crimson uppercase animate-pulse">
            <Flame className="w-3.5 h-3.5 fill-crimson" />
            INVESTMENT OPPORTUNITY ROADSHOW 2026
          </div>

          <h1 className="headline text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-[ -0.05em]">
            GUITAR MASTER<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson via-blaze to-red-600 glow-text-red">
              GENERATION
            </span>{" "}
            <span className="text-white border-b-4 border-crimson inline-block">VOL. 2</span>
          </h1>

          <p className="text-base sm:text-lg text-steel max-w-xl font-sans leading-relaxed">
            Mengawinkan kompetisi gitar elektrik terbesar nasional dengan ekosistem <span className="text-white font-medium">The Rock Campus (TRC) Tour 2026</span> di 12 titik pertunjukkan Pulau Jawa dan audisi nasional terintegrasi di 4 pulau besar.
          </p>

          {/* Interactive virtual volume/experience button widget for engagement */}
          <div className="flex flex-wrap items-center gap-3 py-2">
            <div className="bg-card-dark border border-zinc-800 rounded-lg px-4 py-2.5 flex items-center gap-4 text-xs font-mono">
              <span className="text-steel font-semibold">TRC REVERB:</span>
              <div className="flex items-center gap-1.5">
                {[...Array(6)].map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-2.5 h-5 rounded-sm transition-all duration-300 ${
                      idx <= activeFret 
                        ? 'bg-crimson glow-red scale-110 shadow-[0_0_8px_rgba(230,33,41,0.8)]' 
                        : 'bg-zinc-800'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-crimson font-black tracking-wider transition-all duration-300">
                110% GAIN
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            <a
              id="hero-cta-button"
              href="https://wa.me/6281288805482?text=Halo%20Mbak%20Eva%20Indriyani%20(Manager%20Ezra%20Simanjuntak),%20saya%20tertarik%20dengan%20kemitraan%20dan%20proposal%20Pitch%20Deck%20GMG%20Vol.%202."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative cursor-pointer overflow-hidden rounded bg-crimson px-8 py-4 font-heading text-base font-extrabold tracking-wider text-white force-text-white transition-all hover:bg-red-700 active:scale-95 glow-red flex items-center justify-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                DAPATKAN PITCH DECK
                <span className="text-lg transition-transform group-hover:translate-x-1.5 font-bold">→</span>
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blaze to-red-500 transition-all group-hover:translate-x-0 duration-300 z-0" />
            </a>
          </div>

          <div className="flex items-center gap-6 pt-4 text-xs text-steel font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
              <span className="text-slate-200">Part of The Rock Campus Ecosystem</span>
            </div>
            <span>•</span>
            <div>Original IP by Olive Management</div>
          </div>

        </div>

        {/* Right: Sparkling glowing Guitar Emblem Circle */}
        <div id="locked-dark-guitar-widget" className="lg:col-span-12 xl:col-span-5 flex flex-col items-center justify-center py-6 gap-6">
          
          {/* View Switcher Controls floating above the card */}
          <div className="z-30 flex gap-1 p-1 bg-zinc-950/95 border border-zinc-900 rounded-full text-[10px] font-mono shadow-[0_4px_25px_rgba(0,0,0,0.8)] select-none">
            <button
              onClick={() => setCardView('poster')}
              type="button"
              className={`px-4 py-1.5 rounded-full font-black uppercase tracking-wider transition-all duration-300 cursor-pointer select-none ${
                cardView === 'poster' 
                  ? 'bg-crimson text-white shadow-[0_0_12px_rgba(230,33,41,0.55)]' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              🤘 LET'S ROCK!
            </button>
            <button
              onClick={() => setCardView('interactive')}
              type="button"
              className={`px-4 py-1.5 rounded-full font-black uppercase tracking-wider transition-all duration-300 cursor-pointer select-none ${
                cardView === 'interactive' 
                  ? 'bg-crimson text-white shadow-[0_0_12px_rgba(230,33,41,0.55)]' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              ⚡ 3D LIVE ENGINE
            </button>
          </div>

          <div className="relative w-80 h-[520px] sm:w-[360px] sm:h-[540px] flex items-center justify-center">
            
            {/* Ambient "amplifier glow" leaking behind on active riff */}
            <div className={`absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-crimson via-blaze to-orange-500 opacity-0 blur-[40px] transition-all duration-700 pointer-events-none ${activeRiff ? 'opacity-45 scale-105 animate-pulse' : ''}`} />
            
            {/* Spinning background rings */}
            <div className="absolute -inset-4 rounded-[2rem] border-2 border-dashed border-zinc-800/50 animate-[spin_60s_linear_infinite]" />
            <div className="absolute -inset-2 rounded-[2rem] border border-crimson/20 glow-red animate-[pulse_4s_ease-in-out_infinite]" />
            
            {/* Main Black Card container mimicking the uploaded logo with 3D Rotate */}
            <motion.div 
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onMouseEnter={() => setIsCardHovered(true)}
              animate={{
                rotateX: rotate.x,
                rotateY: rotate.y,
                scale: isCardHovered ? 1.03 : 1,
              }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative z-10 w-full h-full bg-black border border-zinc-800/80 rounded-3xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between overflow-hidden cursor-pointer"
              title="Click poster element or trigger riff buttons to play live sound effects!"
            >
              {/* Glossy holographic sheen sweep across the card on hover */}
              <div 
                className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{
                  transform: `translate(${rotate.y * 3}px, ${-rotate.x * 3}px) rotate(45deg)`,
                }}
              />

              {/* Internal grunge atmosphere highlights */}
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50" />

              {/* MODE 1: OFFICIAL POSTER FROM USER IMAGE LINK */}
              {cardView === 'poster' && (
                <div className="absolute inset-0 z-0 select-none overflow-hidden rounded-3xl" onClick={() => playLiveRiff(Math.random() > 0.5 ? 'power' : 'solo')}>
                  <img 
                    src="https://drive.google.com/thumbnail?id=1Ul8VuapS2C2LVKMgnuXFxHpm2EJPxR-U&sz=w1000" 
                    alt="GMG Vol 2 Let's Rock!" 
                    referrerPolicy="no-referrer"
                    onLoad={() => setLogoLoaded(true)}
                    onError={() => setLogoError(true)}
                    className={`w-full h-full object-cover object-bottom transition-all duration-700 saturate-[1.3] brightness-[1.12] contrast-[1.15] ${
                      activeRiff ? 'scale-105 saturate-[1.4] brightness-120 contrast-[1.2]' : 'group-hover:scale-[1.02]'
                    }`}
                  />
                  {/* Outer edge subtle glow instead of heavy darkening overlay */}
                  <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/10 pointer-events-none" />
                  
                  {/* Ambient interactive lightning or shockwave spark highlights when audio riffs play */}
                  {activeRiff && (
                    <div className="absolute inset-0 bg-gradient-to-r from-crimson/15 via-transparent to-teal-500/10 pointer-events-none animate-pulse mix-blend-screen" />
                  )}
                </div>
              )}

              {/* MODE 2: INTERACTIVE HAND-CRAFTED 3D LIVE ENGINE SVG */}
              {cardView === 'interactive' && (
                <>
                  {/* CARD HEADER: Exact typography matches for the uploaded logo */}
                  <div style={{ transform: "translateZ(30px)" }} className="relative z-10 w-full flex flex-col items-center select-none text-center">
                    <h3 className="font-serif text-[2.75rem] sm:text-[3.25rem] font-bold tracking-[0.04em] text-[#fafafa] leading-[0.8] uppercase [text-shadow:0_4px_12px_rgba(0,0,0,0.9)]">
                      GUITAR
                    </h3>
                    <h4 className="font-serif text-[2.75rem] sm:text-[3.25rem] font-bold tracking-[0.02em] text-[#fafafa] leading-[0.8] mt-1.5 uppercase [text-shadow:0_4px_12px_rgba(0,0,0,0.9)]">
                      MASTER
                    </h4>
                    
                    {/* Styled Generation Stamp pill to perfectly clone the uploaded logo design */}
                    <div className="relative mt-2 text-[10px] sm:text-[11px] font-sans font-black text-black bg-[#fafafa] uppercase tracking-[0.35em] text-center px-4 py-0.5 rounded border border-white font-bold select-none [box-shadow:0_0_10px_rgba(255,255,255,0.4)]">
                      GENERATION
                    </div>
                  </div>

                  {/* CARD CENTER: circular emblem photo frame with skeletons */}
                  <div 
                    style={{ transform: "translateZ(40px)" }} 
                    className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-full border-4 border-zinc-900 bg-[#165a6c] overflow-hidden flex items-center justify-center shadow-[0_12px_28px_rgba(0,0,0,0.95),inset_0_4px_15px_rgba(0,0,0,0.7)] group-hover:border-crimson/50 transition-colors duration-500"
                  >
                    {/* Dynamic Lightning overlay inside circle when sound check is on */}
                    {activeRiff && (
                      <div className="absolute inset-0 bg-cyan-400/10 pointer-events-none mix-blend-color-dodge animate-pulse z-0" />
                    )}

                    {/* SVG Illustration representing the rock skeletons with advanced styling/animations */}
                    <svg viewBox="0 0 200 200" className="w-full h-full filter saturate-[1.12] contrast-[1.05]">
                      <defs>
                        {/* Immersive starfield stage background */}
                        <radialGradient id="stageBg" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#180c2e" />
                          <stop offset="55%" stopColor="#080310" />
                          <stop offset="100%" stopColor="#000000" />
                        </radialGradient>
                        
                        {/* Premium carved mahogany sunburst body finish */}
                        <radialGradient id="guitarSunburst" cx="50%" cy="48%" r="55%">
                          <stop offset="0%" stopColor="#ff2c34" />
                          <stop offset="40%" stopColor="#a80b11" />
                          <stop offset="70%" stopColor="#430205" />
                          <stop offset="100%" stopColor="#0b0001" />
                        </radialGradient>

                        {/* Fretboard rosewood wood grain tone */}
                        <linearGradient id="rosewoodWood" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#1a1414" />
                          <stop offset="50%" stopColor="#2e1a15" />
                          <stop offset="100%" stopColor="#151010" />
                        </linearGradient>

                        {/* Highly reflective silver chrome for pickups, bridge, and whammy bar */}
                        <linearGradient id="metallicChrome" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="20%" stopColor="#b1b8be" />
                          <stop offset="50%" stopColor="#f8f9fa" />
                          <stop offset="75%" stopColor="#555d64" />
                          <stop offset="100%" stopColor="#cbd3d8" />
                        </linearGradient>

                        {/* Glowing pickups frame */}
                        <linearGradient id="goldHumbucker" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#e5c158" />
                          <stop offset="35%" stopColor="#fff3b0" />
                          <stop offset="65%" stopColor="#aa7c11" />
                          <stop offset="100%" stopColor="#d4af37" />
                        </linearGradient>

                        {/* Raised 3D glass volume knobs */}
                        <radialGradient id="glassKnob" cx="35%" cy="35%" r="65%">
                          <stop offset="0%" stopColor="#66666d" />
                          <stop offset="65%" stopColor="#15151a" />
                          <stop offset="100%" stopColor="#000000" />
                        </radialGradient>

                        {/* High-intensity neon energy glow */}
                        <filter id="neonSparkle" x="-30%" y="-30%" width="160%" height="160%">
                          <feGaussianBlur stdDeviation="3.5" result="blur1" />
                          <feGaussianBlur stdDeviation="1.2" result="blur2" />
                          <feMerge>
                            <feMergeNode in="blur1" />
                            <feMergeNode in="blur2" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                        
                        {/* Custom visual effects styles */}
                        <style>
                          {`
                            @keyframes oscillate-strings {
                              0%, 100% { transform: scaleX(1); }
                              50% { transform: scaleX(1.03); }
                            }
                            @keyframes laser-flow {
                              0% { stroke-dashoffset: 0; }
                              100% { stroke-dashoffset: -12; }
                            }
                            @keyframes radial-pulse {
                              0%, 100% { transform: scale(0.98); opacity: 0.25; }
                              50% { transform: scale(1.03); opacity: 0.55; }
                            }
                            .active-vibe { animation: oscillate-strings 0.1s linear infinite; transform-origin: 0px 48px; }
                            .laser-beam { stroke-dasharray: 4, 8; animation: laser-flow 0.8s linear infinite; }
                            .stage-pulse { animation: radial-pulse 4s ease-in-out infinite; }
                          `}
                        </style>
                      </defs>

                      {/* Circle inside background */}
                      <circle cx="100" cy="100" r="100" fill="url(#stageBg)" />
                      
                      {/* Interactive soundwave concentric rings when a riff is firing */}
                      {activeRiff && (
                        <g opacity="0.4" className="stage-pulse" style={{ transformOrigin: '100px 100px' }}>
                          <circle cx="100" cy="100" r="82" stroke="#ef4444" strokeWidth="1.5" fill="none" opacity="0.3" />
                          <circle cx="100" cy="100" r="65" stroke="#06b6d4" strokeWidth="1.0" strokeDasharray="3, 5" fill="none" opacity="0.4" />
                          <circle cx="100" cy="100" r="50" stroke="#f59e0b" strokeWidth="0.8" fill="none" opacity="0.2" />
                        </g>
                      )}

                      {/* Cool ambient laser scanner background grid lines */}
                      <g stroke="#261b40" strokeWidth="0.8" opacity="0.5">
                        <line x1="0" y1="20" x2="200" y2="180" />
                        <line x1="200" y1="20" x2="0" y2="180" />
                        <circle cx="100" cy="100" r="92" stroke="#1f1138" strokeWidth="1" fill="none" />
                      </g>

                      {/* 3D FLOATING INSTRUMENT SHADOW */}
                      <ellipse cx="94" cy="120" rx="36" ry="16" fill="rgba(0,0,0,0.72)" transform="rotate(-38, 94, 120)" />

                      {/* MAIN ROTATED 3D GUITAR GROUP */}
                      <g id="guitar-isometric" transform="translate(100, 102) rotate(-38) scale(1.08)">
                        
                        {/* NECK WOOD STRUT (Extends backwards from the joint to headstock) */}
                        <rect x="-4.5" y="-95" width="9" height="115" fill="#3f1a0e" rx="1.5" />
                        <rect x="-4.8" y="-95" width="2" height="115" fill="#1b0802" opacity="0.6" />

                        {/* ROSEWOOD FRETBOARD (Flat front surface where the frets are populated) */}
                        <rect x="-3.8" y="-90" width="7.6" height="95" fill="url(#rosewoodWood)" />

                        {/* SILVER METAL FRETS (Spatially proportionate line grid) */}
                        <g stroke="#8e9095" strokeWidth="0.5" opacity="0.95">
                          <line x1="-3.8" y1="-86" x2="3.8" y2="-86" />
                          <line x1="-3.8" y1="-80" x2="3.8" y2="-80" />
                          <line x1="-3.8" y1="-73" x2="3.8" y2="-73" />
                          <line x1="-3.8" y1="-65" x2="3.8" y2="-65" />
                          <line x1="-3.8" y1="-56" x2="3.8" y2="-56" />
                          <line x1="-3.8" y1="-46" x2="3.8" y2="-46" />
                          <line x1="-3.8" y1="-35" x2="3.8" y2="-35" />
                          <line x1="-3.8" y1="-23" x2="3.8" y2="-23" />
                          <line x1="-3.8" y1="-10" x2="3.8" y2="-10" />
                          <line x1="-3.8" y1="4" x2="3.8" y2="4" />
                        </g>

                        {/* GLOWING REBEL LIGHTNING INLAYS on Fretboard (Pulsating) */}
                        <g fill="#22d3ee" filter="url(#neonSparkle)">
                          {/* 5th Fret Dot */}
                          <circle cx="0" cy="-76.5" r="1.1" opacity={activeRiff ? 1.0 : 0.6} />
                          {/* 12th Fret Dual Dot */}
                          <circle cx="-1.5" cy="-41" r="1.0" opacity={activeRiff ? 1.0 : 0.6} />
                          <circle cx="1.5" cy="-41" r="1.0" opacity={activeRiff ? 1.0 : 0.6} />
                          {/* 17th Fret Dot */}
                          <circle cx="0" cy="-16.5" r="1.1" opacity={activeRiff ? 1.0 : 0.6} />
                        </g>

                        {/* 3D CONTOURED SOLID Mahogany GUITAR BODY */}
                        <g id="body-chassis">
                          {/* Deep body core shadow for solid 3D depth pop */}
                          <path 
                            d="M -20,-12 C -32,-30 -42,-14 -32,2 C -24,12 -28,32 -20,45 C -12,56 12,56 20,45 C 28,32 24,12 32,2 C 42,-14 32,-30 20,-12 C 14,-7 8,0 0,0 C -8,0 -14,-7 -20,-12 Z" 
                            fill="#080001"
                            transform="translate(0.5, 1.5)"
                          />
                          {/* Carved Body face with premium Cherry-Red Sunburst Gradient */}
                          <path 
                            d="M -20,-12 C -32,-30 -42,-14 -32,2 C -24,12 -28,32 -20,45 C -12,56 12,56 20,45 C 28,32 24,12 32,2 C 42,-14 32,-30 20,-12 C 14,-7 8,0 0,0 C -8,0 -14,-7 -20,-12 Z" 
                            fill="url(#guitarSunburst)"
                            stroke="#510103"
                            strokeWidth="0.8"
                          />

                          {/* Beveled 3D carved wood top edge curves (simulates carved hand rests) */}
                          <path 
                            d="M -16,4 L -18,22 M 16,4 L 18,22" 
                            stroke="#ff9fa2" 
                            strokeWidth="0.6" 
                            strokeLinecap="round" 
                            opacity="0.25" 
                          />
                          <path 
                            d="M -18,34 C -12,46 -4,48 0,48 C 4,48 12,46 18,34" 
                            fill="none" 
                            stroke="#ff4d54" 
                            strokeWidth="1" 
                            opacity="0.32" 
                          />

                          {/* High-gloss luxury lacquer body surface highlight (creates the 3D shine look!) */}
                          <path 
                            d="M -22,-20 C -25,-12 -22,-3 -18,2 C -14,-6 -14,-15 -18,-24 Z" 
                            fill="#ffffff" 
                            opacity="0.14" 
                          />
                          <path 
                            d="M 23,8 C 21,22 17,35 12,42" 
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            opacity="0.16"
                          />
                        </g>

                        {/* ACTIVE PLASMA COIL HUMBUCKER PICKUPS */}
                        <g id="pickups" transform="translate(0, 10)">
                          {/* Neck Pickup (at local y=2) */}
                          <rect x="-6" y="-4" width="12" height="6.5" fill="#1b1c20" rx="1" stroke="url(#goldHumbucker)" strokeWidth="0.8" />
                          <line x1="-4" y1="-1" x2="4" y2="-1" stroke="#cbd3d8" strokeWidth="1" strokeDasharray="1,1" />
                          <line x1="-4" y1="1" x2="4" y2="1" stroke="#d4af37" strokeWidth="1.2" strokeDasharray="1,1" />

                          {/* Bridge Pickup (at local y=24) */}
                          <rect x="-6" y="11" width="12" height="6.5" fill="#1b1c20" rx="1" stroke="url(#goldHumbucker)" strokeWidth="0.8" />
                          <line x1="-4" y1="13" x2="4" y2="13" stroke="#cbd3d8" strokeWidth="1" strokeDasharray="1,1" />
                          <line x1="-4" y1="15" x2="4" y2="15" stroke="#d4af37" strokeWidth="1.2" strokeDasharray="1,1" />
                        </g>

                        {/* CHROME MASS BRIDGE HARDWARE & SADDLES */}
                        <g id="tremolo-bridge" transform="translate(0, 41)">
                          <rect x="-7.5" y="-1.5" width="15" height="10" fill="url(#metallicChrome)" rx="1.5" stroke="#333" strokeWidth="0.5" />
                          {/* 6 individual saddle blocks */}
                          <rect x="-5.5" y="0.5" width="1.2" height="6" fill="#8e9095" />
                          <rect x="-3.7" y="0.5" width="1.2" height="6" fill="#8e9095" />
                          <rect x="-1.9" y="0.5" width="1.2" height="6" fill="#cbd1d6" />
                          <rect x="-0.1" y="0.5" width="1.2" height="6" fill="#cbd1d6" />
                          <rect x="1.7" y="0.5" width="1.2" height="6" fill="#8e9095" />
                          <rect x="3.5" y="0.5" width="1.2" height="6" fill="#8e9095" />
                        </g>

                        {/* CHROME VINTAGE TREMOLO WHAMMY BAR */}
                        <g id="whammy-bar" transform="translate(3, 44)">
                          <path 
                            d="M 1,0 L 4,4 L 11,26 L 5,34" 
                            fill="none" 
                            stroke="url(#metallicChrome)" 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeJoin="round"
                            opacity="0.95"
                          />
                          {/* Whammy plastic tip knob */}
                          <circle cx="5" cy="34" r="1.5" fill="#ffffff" />
                        </g>

                        {/* 3D LOGO-STYLE pointed ESP HEADSTOCK */}
                        <g id="pointed-headstock">
                          <path 
                            d="M -4.5,-95 L -6,-124 C -6,-129 -1,-133 -1,-138 L 7,-129 L 4.5,-95 Z" 
                            fill="#16171a" 
                            stroke="#33343a" 
                            strokeWidth="0.8" 
                          />
                          {/* Headstock body crimson-sunburst matching cover strip */}
                          <path 
                            d="M -3.8,-110 L -4.5,-124 Q -0.5,-128 3.5,-122 L 3.8,-110 Z" 
                            fill="url(#guitarSunburst)" 
                            opacity="0.8" 
                          />
                          {/* Truss Rod Hex Plastic Cover */}
                          <polygon points="-1.5,-99 1.5,-99 0,-104" fill="#000" />
                          
                          {/* Six silver tuning gears with machine heads (3-a-side) */}
                          {/* Left Tuning Keys */}
                          <circle cx="-8.2" cy="-103" r="1.2" fill="url(#metallicChrome)" />
                          <line x1="-8.2" y1="-103" x2="-11.5" y2="-103" stroke="url(#metallicChrome)" strokeWidth="1.2" />
                          <ellipse cx="-12" cy="-103" rx="0.8" ry="1.8" fill="url(#metallicChrome)" />

                          <circle cx="-8.2" cy="-113" r="1.2" fill="url(#metallicChrome)" />
                          <line x1="-8.2" y1="-113" x2="-11.5" y2="-113" stroke="url(#metallicChrome)" strokeWidth="1.2" />
                          <ellipse cx="-12" cy="-113" rx="0.8" ry="1.8" fill="url(#metallicChrome)" />

                          <circle cx="-8.2" cy="-123" r="1.2" fill="url(#metallicChrome)" />
                          <line x1="-8.2" y1="-123" x2="-11.5" y2="-123" stroke="url(#metallicChrome)" strokeWidth="1.2" />
                          <ellipse cx="-12" cy="-123" rx="0.8" ry="1.8" fill="url(#metallicChrome)" />

                          {/* Right Tuning Keys */}
                          <circle cx="8.2" cy="-103" r="1.2" fill="url(#metallicChrome)" />
                          <line x1="8.2" y1="-103" x2="11.5" y2="-103" stroke="url(#metallicChrome)" strokeWidth="1.2" />
                          <ellipse cx="12" cy="-103" rx="0.8" ry="1.8" fill="url(#metallicChrome)" />

                          <circle cx="8.2" cy="-113" r="1.2" fill="url(#metallicChrome)" />
                          <line x1="8.2" y1="-113" x2="11.5" y2="-113" stroke="url(#metallicChrome)" strokeWidth="1.2" />
                          <ellipse cx="12" cy="-113" rx="0.8" ry="1.8" fill="url(#metallicChrome)" />

                          <circle cx="8.2" cy="-123" r="1.2" fill="url(#metallicChrome)" />
                          <line x1="8.2" y1="-123" x2="11.5" y2="-123" stroke="url(#metallicChrome)" strokeWidth="1.2" />
                          <ellipse cx="12" cy="-123" rx="0.8" ry="1.8" fill="url(#metallicChrome)" />
                        </g>

                        {/* PHYSICALLY DETAILED STEEL GUITAR STRINGS & EXTRA HIGH-INTENSITY RIFF LASERS */}
                        <g id="guitar-strings" className={activeRiff ? 'active-vibe' : ''}>
                          
                          {/* Dynamic lightning neon lasers running directly underneath the strings during active overdrive riffs */}
                          {activeRiff && (
                            <g stroke={activeRiff === 'power' ? '#fbbf24' : '#06b6d4'} strokeWidth="1.5" filter="url(#neonSparkle)" className="laser-beam" opacity="0.9">
                              <line x1="-3.2" y1="-123" x2="-3.2" y2="43" />
                              <line x1="-1.9" y1="-113" x2="-1.9" y2="43" />
                              <line x1="-0.6" y1="-103" x2="-0.6" y2="43" />
                              <line x1="0.6" y1="-103" x2="0.6" y2="43" />
                              <line x1="1.9" y1="-113" x2="1.9" y2="43" />
                              <line x1="3.2" y1="-123" x2="3.2" y2="43" />
                            </g>
                          )}

                          {/* 6 Real-world high gloss silver steel core guitar strings */}
                          <line x1="-3.2" y1="-123" x2="-3.2" y2="43" stroke="#e0e8f0" strokeWidth="0.8" />
                          <line x1="-1.9" y1="-113" x2="-1.9" y2="43" stroke="#cbd5e1" strokeWidth="0.75" />
                          <line x1="-0.6" y1="-103" x2="-0.6" y2="43" stroke="#cbd5e1" strokeWidth="0.65" />
                          <line x1="0.6" y1="-103" x2="0.6" y2="43" stroke="#94a3b8" strokeWidth="0.6" />
                          <line x1="1.9" y1="-113" x2="1.9" y2="43" stroke="#94a3b8" strokeWidth="0.55" />
                          <line x1="3.2" y1="-123" x2="3.2" y2="43" stroke="#cbd5e1" strokeWidth="0.5" />
                        </g>

                        {/* ROTARY GLASS POTENTIOMETRES (Volume and Tone Dials) */}
                        <g id="control-dials">
                          {/* Volume Knob */}
                          <circle cx="15" cy="27" r="3.2" fill="url(#glassKnob)" stroke="#444" strokeWidth="0.4" />
                          <line x1="15" y1="27" x2="16.5" y2="25.5" stroke="#fefefe" strokeWidth="0.8" strokeLinecap="round" />
                          <circle cx="15" cy="27" r="1.5" fill="#ff4d54" opacity="0.3" />

                          {/* Tone Knob */}
                          <circle cx="21" cy="37" r="3.2" fill="url(#glassKnob)" stroke="#444" strokeWidth="0.4" />
                          <line x1="21" y1="37" x2="22.5" y2="35.5" stroke="#fefefe" strokeWidth="0.8" strokeLinecap="round" />
                          
                          {/* 3-way pickup selector toggle switch */}
                          <circle cx="-16" cy="18" r="1.8" fill="#1b1c20" />
                          <line x1="-16" y1="18" x2="-18" y2="13" stroke="url(#metallicChrome)" strokeWidth="1.2" strokeLinecap="round" />
                          <circle cx="-18" cy="13" r="1.0" fill="#e5c158" />
                        </g>
                      </g>

                      {/* Circular glass reflection overlay for high-end studio gloss appeal */}
                      <path d="M 5,50 Q 80,10 150,5" stroke="#ffffff" strokeWidth="1.8" fill="none" opacity="0.08" strokeLinecap="round" />

                      {/* Heavy metal dark vintage border ring */}
                      <circle cx="100" cy="100" r="98" stroke="#0f0102" strokeWidth="4" fill="none" />
                    </svg>
                  </div>
                </>
              )}

              {/* CARD SOUND CONTROLS: Interactive soundboard + Live visualizer for highly engaging feedback (Renders on top of BOTH views!) */}
              {cardView === 'interactive' && (
                <div 
                  style={{ transform: "translateZ(35px)" }} 
                  className="relative z-20 w-full px-3 py-2 bg-zinc-950/95 border border-zinc-900 rounded-2xl space-y-2.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] my-2.5 select-none"
                >
                  <div className="flex items-center justify-between text-[8px] font-mono tracking-widest font-extrabold">
                    <span className="flex items-center gap-1.5 text-zinc-450 hover:text-white transition-colors">
                      <Radio className={`w-3 h-3 text-crimson ${activeRiff ? 'animate-spin' : ''}`} />
                      LIVE CABINET SIMULATOR
                    </span>
                    <span className={`px-2 py-0.5 rounded ${activeRiff ? 'bg-crimson/20 text-crimson animate-pulse border border-crimson/35 font-black' : 'text-zinc-650 bg-zinc-900 border border-zinc-900'}`}>
                      {activeRiff ? `${activeRiff.toUpperCase()} OVERDRIVE` : 'STANDBY'}
                    </span>
                  </div>

                  {/* Equalizer Visualizer Spectrum Bars (re-rendered by parent effect thread) */}
                  <div className="h-7 flex items-end justify-center gap-1.5 px-1 border-b border-zinc-900/40 pb-1">
                    {eqLevels.map((val, idx) => (
                      <motion.div
                        key={idx}
                        className={`w-1.5 rounded-t-[1px] transition-all duration-75 ${
                          activeRiff 
                            ? idx < 7 
                              ? 'bg-gradient-to-t from-red-800 to-crimson shadow-[0_0_6px_rgba(230,33,41,0.5)]' 
                              : 'bg-gradient-to-t from-teal-700 to-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)]'
                            : 'bg-zinc-800'
                        }`}
                        style={{ height: `${val}%` }}
                      />
                    ))}
                  </div>

                  {/* Interactive synth trigger buttons */}
                  <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playLiveRiff('power');
                      }}
                      className={`flex items-center justify-center gap-1.5 px-1.5 py-1.5 rounded border font-black uppercase transition-all duration-200 active:scale-95 cursor-pointer select-none ${
                        activeRiff === 'power'
                          ? 'bg-crimson text-white border-crimson shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-crimson/40 hover:bg-zinc-900/60'
                      }`}
                      title="Play distortion heavy power chord sequence"
                    >
                      <Play className="w-2.5 h-2.5 text-crimson fill-crimson" />
                      TES GEAR 🤘
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playLiveRiff('solo');
                      }}
                      className={`flex items-center justify-center gap-1.5 px-1.5 py-1.5 rounded border font-black uppercase transition-all duration-200 active:scale-95 cursor-pointer select-none ${
                        activeRiff === 'solo'
                          ? 'bg-teal-500 text-white border-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.4)]'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-teal-500/40 hover:bg-zinc-900/60'
                      }`}
                      title="Play high-speed tapping neoclassical solo"
                    >
                      <Zap className="w-2.5 h-2.5 text-teal-400 fill-teal-400" />
                      SOLO SHRED ⚡
                    </button>
                  </div>
                </div>
              )}

              {/* CARD FOOTER: Heavy metal red Vol. 2 title with exact styling (Hide in poster mode because poster already lists Vol 2 elegantly) */}
              {cardView === 'interactive' && (
                <div 
                  style={{ transform: "translateZ(30px)" }} 
                  className="relative z-10 w-full flex flex-col items-center select-none text-center mb-1"
                >
                  <div className="font-serif text-[2.5rem] sm:text-[3rem] font-bold text-[#E62129] tracking-tight leading-none [text-shadow:0_0_15px_rgba(230,33,41,0.6)] select-none uppercase">
                    Vol. 2
                  </div>
                </div>
              )}
              
            </motion.div>
            
            {/* Ambient sparking dots orbiting the tilt card anchors */}
            <div className="absolute -top-1.5 left-20 w-3 h-3 rounded-full bg-crimson glow-red animate-bounce" />
            <div className="absolute -bottom-1.5 right-20 w-3 h-3 rounded-full bg-blaze glow-orange animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
}
