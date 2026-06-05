import React, { useState, useEffect } from 'react';
import { Award, ShieldAlert, Sparkles, User, Guitar, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { mainJudges, auditionJudges } from '../data';
import { Juror } from '../types';

interface JudgeCardProps {
  key?: React.Key;
  judge: Juror;
}

function JudgeCard({ judge }: JudgeCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isColorActive, setIsColorActive] = useState(false);

  return (
    <div 
      onClick={() => setIsColorActive(prev => !prev)}
      className={`judge-card group relative bg-[#121212]/90 border rounded-xl overflow-hidden flex flex-col justify-between hover:border-crimson/50 hover:shadow-2xl hover:shadow-crimson/5 transition-all duration-300 cursor-pointer ${
        isColorActive ? 'border-crimson/50 shadow-2xl shadow-crimson/5' : 'border-zinc-900'
      }`}
    >
      <div>
        {/* Photo container */}
        <div className="relative aspect-[4/3] w-full bg-zinc-950 overflow-hidden border-b border-zinc-900">
          {imgError ? (
            <div className="relative block w-full h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex flex-col items-center justify-center p-4 text-center select-none overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,33,41,0.08),transparent_70%)]" />
              <div className="relative z-10 flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-black/80 border border-zinc-800 flex items-center justify-center">
                  <Guitar className="w-6 h-6 text-crimson group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 font-extrabold uppercase tracking-widest">
                  {judge.name}
                </span>
              </div>
            </div>
          ) : (
            <img
              src={judge.imageUrl}
              alt={judge.name}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover object-center transition-all duration-500 filter ${
                isColorActive 
                  ? 'grayscale-0 brightness-105 scale-105' 
                  : 'grayscale group-hover:grayscale-0 brightness-95 group-hover:brightness-105 group-hover:scale-105'
              }`}
              referrerPolicy="no-referrer"
            />
          )}

          {/* Glowing outer frame lines on hover */}
          <span className={`absolute inset-0 border-2 border-transparent transition-all duration-300 rounded-t-xl pointer-events-none ${
            isColorActive ? 'border-crimson/40' : 'group-hover:border-crimson/40'
          }`} />

          {/* Hover Badge */}
          <div className="judge-band-badge absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[10px] uppercase font-mono tracking-wider text-crimson font-black border border-crimson/30 pointer-events-none">
            {judge.band ? `${judge.band}` : 'SESSION LEGEND'}
          </div>
        </div>

        {/* Body textual profiles */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between items-start gap-2">
              <div className="text-[10px] font-mono text-crimson tracking-widest uppercase font-extrabold flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-crimson" /> {judge.role}
              </div>

            </div>
            <h3 className="font-heading text-lg font-black text-white hover:text-crimson tracking-tight transition-colors uppercase">
              {judge.name}
            </h3>
          </div>

          <p className="font-sans text-xs text-steel leading-relaxed">
            {judge.bio}
          </p>

          {judge.articleUrl && (
            <div className="pt-1">
              <a
                href={judge.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-crimson hover:text-white font-black uppercase tracking-wider group-hover:translate-x-1 transition-all duration-300"
              >
                Selidik Berita & Kiprah Juri ↗
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Technical specialty details footer row */}
      <div className="p-6 pt-0 mt-auto">
        <div className="bg-zinc-950 p-4 border border-zinc-900 rounded-lg">
          <span className="text-[9px] text-[#8B8B8B] font-mono uppercase block mb-1.5 tracking-wider font-semibold">
            Spesialisasi Teknis Penjurian:
          </span>
          <p className="text-[11px] text-white font-mono font-medium leading-relaxed flex items-start gap-1.5">
            <span className="text-crimson font-extrabold">•</span>
            <span>{judge.specialty}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function JudgesSection() {
  const [activeTab, setActiveTab] = useState<'main' | 'audition'>('main');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;
    
    // Switch slides if horizontal swipe exceeds 40 pixels and is primarily horizontal
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        setActiveTab('audition');
      } else {
        setActiveTab('main');
      }
    }
    
    setTouchStartX(null);
    setTouchStartY(null);
  };

  return (
    <section className="relative bg-zinc-950 border-b border-zinc-900 py-20 px-4 md:px-8">
      {/* Decorative backing visuals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-10 w-[40vw] h-[40vw] bg-crimson/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-10 w-[40vw] h-[40vw] bg-blaze/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs text-crimson font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Guitar className="w-3.5 h-3.5" /> THE STAR POWER
          </div>
          <h2 className="headline text-4xl sm:text-5xl font-black tracking-tight text-white">
            JAJARAN JURI VIRTUOSO
          </h2>
          <p className="font-sans text-sm text-steel">
            Menjamin kredibilitas kompetisi di mata media, musisi profesional, dan publik nasional. Dijuri langsung oleh para maestro legendaris musik cadas dan kontemporer Indonesia.
          </p>
        </div>

        {/* Tab Filters with Premium Unified Segment Control */}
        <div className="flex flex-col items-center gap-6">
          <div className="bg-[#121212] border border-zinc-900 rounded-xl p-1.5 flex gap-1 w-full max-w-xl shadow-2xl relative">
            
            {/* Tab 1: Main Judges */}
            <button
              onClick={() => setActiveTab('main')}
              className={`flex-1 py-3 px-3 sm:px-6 rounded-lg font-heading text-[10px] sm:text-xs font-black tracking-widest uppercase transition-all duration-300 cursor-pointer text-center relative z-10 ${
                activeTab === 'main'
                  ? 'text-white'
                  : 'text-zinc-500 hover:text-zinc-350'
              }`}
            >
              Main Judges (Panggung Utama)
              {activeTab === 'main' && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-crimson rounded-lg -z-10 glow-red"
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                />
              )}
            </button>

            {/* Tab 2: Audition Judges */}
            <button
              onClick={() => setActiveTab('audition')}
              className={`flex-1 py-3 px-3 sm:px-6 rounded-lg font-heading text-[10px] sm:text-xs font-black tracking-widest uppercase transition-all duration-300 cursor-pointer text-center relative z-10 ${
                activeTab === 'audition'
                  ? 'text-white'
                  : 'text-zinc-500 hover:text-zinc-350'
              }`}
            >
              Online Audition Judges
              {activeTab === 'audition' && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-crimson rounded-lg -z-10 glow-red"
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                />
              )}
            </button>

          </div>

          {/* Low-profile console indicator bar for sliding states */}
          <div className="flex items-center gap-3 w-48 sm:w-64 select-none">
            <button 
              onClick={() => setActiveTab('main')}
              className="flex-1 h-1.5 rounded-full cursor-pointer overflow-hidden bg-zinc-900 border border-zinc-850 hover:border-zinc-700 transition-all duration-300"
              title="Main Judges"
            >
              <div className={`h-full bg-crimson transition-all duration-500 ease-out ${activeTab === 'main' ? 'w-full glow-red' : 'w-0'}`} />
            </button>
            <span className="text-[9px] font-mono font-bold text-zinc-650 tracking-wider">SLIDE</span>
            <button 
              onClick={() => setActiveTab('audition')}
              className="flex-1 h-1.5 rounded-full cursor-pointer overflow-hidden bg-zinc-900 border border-zinc-850 hover:border-zinc-700 transition-all duration-300"
              title="Online Audition Judges"
            >
              <div className={`h-full bg-crimson transition-all duration-500 ease-out ${activeTab === 'audition' ? 'w-full glow-red' : 'w-0'}`} />
            </button>
          </div>
        </div>

        {/* Sliding category container */}
        <div className="relative px-0 sm:px-4 overflow-visible">
          
          {/* Main viewport limit */}
          <div 
            className="overflow-hidden w-full touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              animate={{ x: activeTab === 'main' ? '0%' : '-50%' }}
              transition={{ type: 'spring', stiffness: 265, damping: 26 }}
              className="flex w-[200%]"
            >
              {/* Slide 1: Main Judges (Grid Layout) */}
              <div className="w-1/2 flex-shrink-0 px-2 sm:px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {mainJudges.map((judge) => (
                    <JudgeCard key={judge.id} judge={judge} />
                  ))}
                </div>
              </div>

              {/* Slide 2: Audition Judges (Grid Layout) */}
              <div className="w-1/2 flex-shrink-0 px-2 sm:px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {auditionJudges.map((judge) => (
                    <JudgeCard key={judge.id} judge={judge} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Brand/Sponsors alignment note */}
        <div className="text-center font-mono text-[10px] text-steel">
          *The star authority of these virtuosos acts as a massive media multiplier, drawing over <span className="text-white font-black">2.5M combined digital reach</span> globally.
        </div>

      </div>
    </section>
  );
}
