import React, { useState } from 'react';
import { Award, ShieldAlert, Sparkles, User, Guitar } from 'lucide-react';
import { mainJudges, auditionJudges } from '../data';
import { Juror } from '../types';

interface JudgeCardProps {
  key?: React.Key;
  judge: Juror;
}

function JudgeCard({ judge }: JudgeCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="judge-card group relative bg-[#121212]/90 border border-zinc-900 rounded-xl overflow-hidden flex flex-col justify-between hover:border-crimson/50 hover:shadow-2xl hover:shadow-crimson/5 transition-all duration-300">
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
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 object-center grayscale group-hover:grayscale-0 transition-all filter brightness-95 group-hover:brightness-105"
              referrerPolicy="no-referrer"
            />
          )}

          {/* Glowing outer frame lines on hover */}
          <span className="absolute inset-0 border-2 border-transparent group-hover:border-crimson/40 transition-all duration-300 rounded-t-xl pointer-events-none" />

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

  const currentJudges = activeTab === 'main' ? mainJudges : auditionJudges;

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

        {/* Tab Filters with Oswald / Montserrat uppercase tags */}
        <div className="flex justify-center">
          <div className="bg-card-dark border border-zinc-900 rounded-lg p-1.5 flex gap-2">
            
            {/* Tab 1: Main Judges */}
            <button
              onClick={() => setActiveTab('main')}
              className={`px-6 py-3 rounded font-heading text-xs font-black tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                activeTab === 'main'
                  ? 'bg-crimson text-white glow-red shadow-lg'
                  : 'text-steel hover:text-white bg-transparent'
              }`}
            >
              MAIN JUDGES (PANGGUNG UTAMA)
            </button>

            {/* Tab 2: Audition Judges */}
            <button
              onClick={() => setActiveTab('audition')}
              className={`px-6 py-3 rounded font-heading text-xs font-black tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                activeTab === 'audition'
                  ? 'bg-crimson text-white glow-red shadow-lg'
                  : 'text-steel hover:text-white bg-transparent'
              }`}
            >
              ONLINE AUDITION JUDGES
            </button>

          </div>
        </div>

        {/* Photo Portrait Grid with Black-and-White to Color Crimson border triggers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {currentJudges.map((judge) => (
            <JudgeCard key={judge.id} judge={judge} />
          ))}
        </div>

        {/* Brand/Sponsors alignment note */}
        <div className="text-center font-mono text-[10px] text-steel">
          *The star authority of these virtuosos acts as a massive media multiplier, drawing over <span className="text-white font-black">2.5M combined digital reach</span> globally.
        </div>

      </div>
    </section>
  );
}
