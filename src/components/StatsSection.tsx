import React from 'react';
import { Award, Zap, Users, ShieldCheck, HeartCrack, ChevronRight } from 'lucide-react';
import { statsGMGVol1, statsTRCPowerhouse } from '../data';

export default function StatsSection() {
  return (
    <section className="relative bg-zinc-950 border-b border-zinc-900 py-20 px-4 md:px-8">
      {/* Decorative background grid and lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-crimson/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1f1f1f_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs text-crimson font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5 fill-crimson" /> PROVEN TRACTION & RECORD
          </div>
          <h2 className="headline text-4xl sm:text-5xl font-black tracking-tight text-white">
            EKOSISTEM MANDIRI YANG TERVALIDASI
          </h2>
          <p className="font-sans text-sm text-steel">
            Guitar Master Generation bukan mimpi di atas kertas. Kami mengawinkan legacy kompetisi sukses masa lalu dengan pilar musik rock grassroot terbesar di Indonesia.
          </p>
        </div>

        {/* Top: GMG Vol. 1 Legacy Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-card-dark border border-zinc-900 rounded-xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-xl">
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-crimson/10 to-transparent pointer-events-none" />
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 text-xs text-steel font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-crimson" />
                HISTORICAL SHOWCASE
              </div>

              <div className="space-y-2">
                <span className="text-sm font-mono text-crimson font-black tracking-widest">{statsGMGVol1.title}</span>
                <h3 className="font-heading text-2xl font-black text-white uppercase tracking-tight">
                  {statsGMGVol1.venue}
                </h3>
              </div>

              <p className="text-sm text-steel font-sans leading-relaxed">
                Di tahun 2022, Guitar Master Generation Vol. 1 di Senayan sukses melahirkan ikon-ikon gitaris baru. Standard penjurian yang luar biasa ketat terbukti berhasil mendapatkan respon antusias luar biasa dari ratusan talenta di seluruh kepulauan Indonesia.
              </p>
            </div>

            <div className="pt-6 border-t border-zinc-900 mt-6 flex items-center justify-between">
              <span className="text-xs text-steel font-mono">BEYOND BAR SENAYAN • 2022</span>
              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">100% SUCCESS RECORD</span>
            </div>
          </div>

          {/* Sisi Kanan: GMG Vol. 1 Bullet Stats Points */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
            <h4 className="text-xs text-steel font-mono uppercase tracking-widest mb-1 border-b border-zinc-900 pb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-crimson" /> REKAM JEJAK SUKSES GMG VOL. 1:
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {statsGMGVol1.highlights.map((highlight, index) => (
                <div 
                  key={index} 
                  className="bg-card-dark/40 border border-zinc-900/60 p-5 rounded-lg hover:border-zinc-800 transition-colors flex gap-4 items-start"
                >
                  <div className="bg-zinc-900 p-2 rounded text-crimson border border-zinc-800 flex-shrink-0">
                    <span className="font-mono text-sm font-black text-crimson">0{index + 1}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Embedded YouTube video of GMG Vol. 1 Finalist (Winner) */}
        <div id="gmg-vol1-video" className="bg-[#121212]/40 border border-zinc-900 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider bg-emerald-500/5 border border-emerald-500/15 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                DOKUMENTASI ACARA
              </div>
              <h4 className="font-heading text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                ALE FUNKY — CIBINONG (JUARA I)
              </h4>
              <p className="text-xs text-[#8B8B8B] font-sans">
                Penampilan babak Grand Final dari pemenang utama Guitar Master Generation Vol. 01.
              </p>
            </div>
            <div>
              <a 
                href="https://www.youtube.com/watch?v=LNIdENw7gfU"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white bg-crimson hover:bg-red-700 px-4 py-2 rounded-lg transition-all shadow-[0_4px_12px_rgba(220,38,38,0.25)] hover:shadow-[0_4px_16px_rgba(220,38,38,0.4)]"
              >
                Tonton Langsung di YouTube <span className="text-sm">↗</span>
              </a>
            </div>
          </div>
          
          <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-zinc-900 shadow-[0_15px_42px_rgba(0,0,0,0.6)] bg-black">
            <iframe
              id="gmg-winner-iframe"
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube-nocookie.com/embed/LNIdENw7gfU?rel=0&enablejsapi=1"
              title="ALE FUNKY - Cibinong - Finalis (Juara I) Guitar Master Generation Vol. 01"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {/* Bottom: TRC Powerhouse Stats: 3-column Grid Card with #1A1A1A container and radius 8px */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-3">
            <span className="h-px bg-zinc-800 flex-grow" />
            <span className="font-heading text-xs font-black tracking-widest text-steel uppercase">
              POWERED BY THE ROCK CAMPUS (TRC) CORE ENGINE
            </span>
            <span className="h-px bg-zinc-800 flex-grow" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statsTRCPowerhouse.map((stat, index) => (
              <div 
                key={index}
                className="stat-box bg-[#1A1A1A] border border-zinc-900/60 rounded-xl p-8 hover:border-crimson/40 hover:shadow-[0_0_20px_rgba(230,33,41,0.12)] transition-all group relative overflow-hidden duration-300"
              >
                {/* Visual red accent bar on the left edge of each card */}
                <span className="absolute top-0 bottom-0 left-0 w-[4px] bg-crimson rounded-l-xl opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Text Content block placed securely on top layer (z-10) */}
                <div className="relative z-10 space-y-4">
                  <div className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-white group-hover:text-crimson transition-colors duration-300 origin-left">
                    {stat.number}
                  </div>
                  
                  <div className="space-y-1.5">
                    <h4 className="font-heading text-base font-bold text-white uppercase tracking-tight">
                      {stat.label}
                    </h4>
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed font-normal">
                      {stat.desc}
                    </p>
                  </div>
                </div>

                {/* Subtly faded background typography watermark placed behind (z-0) so it does not overlap or cover text */}
                <div className="absolute -bottom-3 right-4 z-0 text-[85px] leading-none select-none font-black text-zinc-900/40 opacity-25 group-hover:text-crimson/5 group-hover:scale-105 transition-all duration-300 pointer-events-none font-mono">
                  {index === 0 ? 'XI' : index === 1 ? '167' : '800'}
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof Quote Badge */}
          <div className="bg-card-dark border border-zinc-900 p-4 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3 text-left">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=60",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=60",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=60"
                ].map((faceUrl, i) => (
                  <img 
                    key={i} 
                    src={faceUrl} 
                    alt="Investor" 
                    className="w-8 h-8 rounded-full border-2 border-zinc-950 object-cover" 
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div>
                <span className="text-white font-semibold block">TRC Collective Support</span>
                <span className="text-steel">Voted by 20+ prominent industry partners as the highest-yield grassroot ecosystem.</span>
              </div>
            </div>
            <div className="text-steel font-mono text-[10px] uppercase bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> STABILITY VERIFIED BY OLIVE MGMT
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
