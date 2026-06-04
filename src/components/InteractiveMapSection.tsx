import React, { useState } from 'react';
import { MapPin, Info, Globe, Compass, Sparkles, CheckCircle2, Plane, Hotel, Star, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { auditionZones, javaTourPoints } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function InteractiveMapSection() {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('jawa');
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const regionIds = ['sumatera', 'kalimantan', 'sulawesi', 'bali', 'jawa'];
  const currentIndex = regionIds.indexOf(selectedRegionId);

  const selectRegion = (id: string) => {
    const curIdx = regionIds.indexOf(selectedRegionId);
    const newIdx = regionIds.indexOf(id);
    if (newIdx !== curIdx) {
      setDirection(newIdx > curIdx ? 'right' : 'left');
      setSelectedRegionId(id);
    }
  };

  const handlePrev = () => {
    setDirection('left');
    const prevIndex = (currentIndex - 1 + regionIds.length) % regionIds.length;
    setSelectedRegionId(regionIds[prevIndex]);
  };

  const handleNext = () => {
    setDirection('right');
    const nextIndex = (currentIndex + 1) % regionIds.length;
    setSelectedRegionId(regionIds[nextIndex]);
  };

  const slideVariants = {
    initial: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? 60 : -60,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: 'easeOut' }
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? -60 : 60,
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' }
    })
  };

  const selectedZone = auditionZones.find(z => z.id === selectedRegionId) || auditionZones[0];

  // Map of Indonesia interactive coordinates for visualization
  const regions = [
    { id: 'sumatera', name: 'Sumatera', hubCity: 'Jakarta (PANDORA)', hostCoord: { x: 230, y: 310 }, anchor: { x: 140, y: 150 }, color: 'text-emerald-400 border-emerald-500/30' },
    { id: 'kalimantan', name: 'Kalimantan', hubCity: 'Semarang', hostCoord: { x: 310, y: 318 }, anchor: { x: 350, y: 170 }, color: 'text-amber-400 border-amber-500/30' },
    { id: 'sulawesi', name: 'Sulawesi', hubCity: 'Yogyakarta', hostCoord: { x: 295, y: 323 }, anchor: { x: 505, y: 180 }, color: 'text-cyan-400 border-cyan-500/30' },
    { id: 'bali', name: 'Bali', hubCity: 'Solo', hostCoord: { x: 323, y: 323 }, anchor: { x: 454, y: 328 }, color: 'text-fuchsia-400 border-fuchsia-500/30' },
    { id: 'jawa', name: 'Jawa Tour', hubCity: '12 Kota Tur', hostCoord: null, anchor: { x: 300, y: 315 }, color: 'text-rose-400 border-rose-500/30' }
  ];

  const getIslandStyle = (id: string) => {
    const isSelected = selectedRegionId === id;
    const isHovered = hoveredRegionId === id;

    if (id === 'jawa') {
      if (isSelected) return 'fill-emerald-500/30 stroke-emerald-400 stroke-[2.5] filter drop-shadow-[0_0_12px_rgba(16,185,129,0.7)] transition-all duration-300 cursor-pointer';
      if (isHovered) return 'fill-emerald-500/15 stroke-emerald-500/60 stroke-[1.5] transition-all duration-300 cursor-pointer';
      return 'fill-[#121214] stroke-zinc-700 stroke-[1] transition-all duration-300 cursor-pointer';
    }

    if (isSelected) {
      return 'fill-emerald-500/25 stroke-emerald-400 stroke-[2.5] filter drop-shadow-[0_0_10px_rgba(16,185,129,0.6)] transition-all duration-300 cursor-pointer';
    }
    if (isHovered) {
      return 'fill-emerald-500/10 stroke-emerald-500/40 stroke-[1.5] transition-all duration-300 cursor-pointer';
    }
    return 'fill-[#0d0d0f] stroke-zinc-800 stroke-[1.2] transition-all duration-300 cursor-pointer';
  };

  const activeRegion = regions.find(r => r.id === selectedRegionId);

  return (
    <section id="interactive-map-section" className="relative bg-[#070707] border-b border-zinc-900 py-24 px-4 md:px-8 overflow-hidden">
      {/* Background overlay decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] bg-emerald-600/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f12_1px,transparent_1px),linear-gradient(to_bottom,#0f0f12_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs text-emerald-400 font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <Compass className="w-4 h-4 animate-spin text-emerald-400" style={{ animationDuration: '6s' }} /> 
            PETA INTERAKTIF AUDISI NASIONAL
          </div>
          <h2 className="font-heading text-3.5xl sm:text-5xl font-black tracking-tight text-white uppercase">
            SISTEM ZONING SELEKSI GMG VOL. 2
          </h2>
          <p className="font-sans text-sm text-zinc-400 max-w-2xl mx-auto">
            Penyaringan ketat dari luar Pulau Jawa berskala nasional. Kami membagi wilayah seleksi secara terstruktur dengan kepastian biaya akomodasi & transportasi ditanggung oleh panitia!
          </p>
        </div>

        {/* Outer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Map Graphics container */}
          <div className="lg:col-span-12 xl:col-span-7 bg-[#0c0c0e] border border-zinc-900 rounded-xl p-5 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-900/60 pb-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">INDONESIA COMPLETE GRAPHIC</span>
                <h3 className="font-heading text-lg font-black text-white uppercase tracking-tight">
                  PETA WILAYAH SELEKSI & RUTE AUDISI
                </h3>
              </div>
              <span className="self-start sm:self-auto text-[10px] text-zinc-400 font-mono bg-zinc-950 border border-zinc-900 px-3 py-1.5 rounded tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
                KLIK PULAU UNTUK DETAIL SUB-ZONA
              </span>
            </div>

            {/* Stylized dark dashboard visual of Indonesia map */}
            <div className="relative aspect-[16/9] w-full bg-[#050506] border border-zinc-900 rounded-lg overflow-hidden flex flex-col justify-between p-4 min-h-[320px] sm:min-h-[420px]">
              
              {/* Grid backdrop overlay for radar system look */}
              <div className="absolute inset-0 bg-[radial-gradient(#141416_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none opacity-80" />
              
              {/* Telemetry metadata overlay on left corner */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none font-mono text-[9px] text-zinc-600 uppercase space-y-1 bg-black/70 px-3 py-2 rounded border border-zinc-900/80 backdrop-blur-sm hidden sm:block">
                <div>MAP_ENGINE: <span className="text-emerald-400">ACTIVE</span></div>
                <div>SELECTED_ISLAND: <span className="text-white font-bold">{selectedRegionId.toUpperCase()}</span></div>
                <div>AUDITION_HUB: <span className="text-emerald-400">{activeRegion?.hubCity.toUpperCase() || "N/A"}</span></div>
              </div>

              {/* Graphic island SVG paths and markers in an aspect-ratio matched wrapper */}
              <div className="absolute inset-0 flex items-center justify-center p-2 pointer-events-none">
                <div className="relative aspect-[16/9] w-full max-h-full flex items-center justify-center">
                  <svg viewBox="0 0 800 450" className="w-full h-full select-none pointer-events-auto">
                  {/* Grid overlay lines inside SVG for alignment and tech aesthetic */}
                  <g stroke="#0f0f11" strokeWidth="0.8" strokeDasharray="3,6" className="pointer-events-none">
                    <line x1="100" y1="0" x2="100" y2="450" />
                    <line x1="200" y1="0" x2="200" y2="450" />
                    <line x1="300" y1="0" x2="300" y2="450" />
                    <line x1="400" y1="0" x2="400" y2="450" />
                    <line x1="500" y1="0" x2="500" y2="450" />
                    <line x1="600" y1="0" x2="600" y2="450" />
                    <line x1="700" y1="0" x2="700" y2="450" />
                    <line x1="0" y1="100" x2="800" y2="100" />
                    <line x1="0" y1="200" x2="800" y2="200" />
                    <line x1="0" y1="300" x2="800" y2="300" />
                    <line x1="0" y1="400" x2="800" y2="400" />
                  </g>

                  {/* Draw connection line from selected island to its host city on Java */}
                  {activeRegion && activeRegion.hostCoord && (
                    <g className="pointer-events-none">
                      <line 
                        x1={activeRegion.anchor.x} 
                        y1={activeRegion.anchor.y} 
                        x2={activeRegion.hostCoord.x} 
                        y2={activeRegion.hostCoord.y} 
                        stroke="#10b981" 
                        strokeWidth="2" 
                        strokeDasharray="6,4" 
                        className="animate-[dash_10s_linear_infinite]"
                        style={{
                          strokeDashoffset: 10,
                          animation: 'dash 1.5s linear infinite'
                        }}
                      />
                      <circle cx={activeRegion.hostCoord.x} cy={activeRegion.hostCoord.y} r="6" className="fill-emerald-400 animate-ping opacity-60" />
                      <circle cx={activeRegion.hostCoord.x} cy={activeRegion.hostCoord.y} r="3" className="fill-emerald-400" />
                      
                      {/* Anchor points */}
                      <circle cx={activeRegion.anchor.x} cy={activeRegion.anchor.y} r="4" className="fill-emerald-500" />
                    </g>
                  )}

                  {/* Non-audition background path outlining Papua & Maluku for complete context with custom gray styling */}
                  <g className="opacity-15 fill-zinc-800 stroke-zinc-700 stroke-[1] pointer-events-none">
                    {/* Papua island */}
                    <path d="M 590 198 C 594 190, 600 182, 608 178 C 614 174, 622 178, 628 184 C 634 190, 642 198, 650 200 C 658 202, 666 198, 674 202 C 682 206, 688 212, 696 218 C 704 224, 712 228, 720 230 C 728 232, 736 236, 744 244 L 755 255 L 748 262 C 740 270, 730 268, 720 266 C 710 264, 700 262, 690 264 C 680 266, 670 268, 660 266 C 650 264, 642 258, 634 256 C 626 254, 618 250, 610 248 C 602 246, 596 242, 590 236 C 584 230, 580 220, 582 212 C 584 204, 588 200, 590 198 Z" />
                    {/* Halmahera island (North Maluku) */}
                    <path d="M 550 125 C 553 120, 558 122, 556 128 C 554 134, 551 140, 555 144 C 559 148, 564 146, 563 152 C 562 158, 554 162, 548 158 C 542 154, 546 148, 547 142 C 548 136, 547 130, 550 125 Z" />
                    {/* Seram Island (Maluku) */}
                    <path d="M 545 180 C 555 178, 565 180, 575 182 C 585 184, 575 188, 565 188 C 555 188, 545 186, 545 180 Z" />
                    {/* Buru Island (Maluku) */}
                    <path d="M 525 182 C 530 180, 535 182, 535 186 C 535 190, 530 190, 525 186 Z" />
                    <circle cx="560" cy="168" r="1.5" />
                    <circle cx="548" cy="198" r="1.2" />
                  </g>

                  {/* SUMATERA */}
                  <g 
                    id="map-region-sumatera"
                    onClick={() => setSelectedRegionId('sumatera')}
                    onMouseEnter={() => setHoveredRegionId('sumatera')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    className="transition-all duration-300"
                  >
                    {/* High-quality realistic Sumatra path with detailed coastline features */}
                    <path 
                      d="M 35 68 C 30 62, 35 55, 42 50 C 50 45, 58 42, 65 46 C 72 50, 78 56, 82 64 C 85 70, 92 78, 98 84 C 104 90, 112 94, 118 100 C 124 106, 130 110, 138 116 C 144 122, 148 128, 154 134 C 160 140, 168 146, 174 154 C 180 162, 184 170, 192 178 C 200 186, 206 194, 214 204 C 220 212, 226 222, 234 232 C 240 240, 246 250, 250 260 C 254 268, 258 276, 254 282 C 250 286, 242 284, 234 278 C 226 272, 220 264, 214 258 C 206 252, 198 248, 192 242 C 186 236, 178 230, 172 222 C 166 214, 158 208, 152 200 C 146 192, 138 186, 132 178 C 126 170, 118 164, 112 156 C 106 148, 98 142, 92 134 C 86 126, 78 120, 72 112 C 66 104, 58 98, 52 90 C 46 82, 40 76, 35 68 Z" 
                      className={getIslandStyle('sumatera')}
                    />

                    {/* Detailed Bangka Island */}
                    <path 
                      d="M 233 213 C 235 208, 240 206, 245 208 Q 248 210 249 216 C 248 221, 243 226, 238 224 C 235 222, 232 218, 233 213 Z" 
                      className={getIslandStyle('sumatera')}
                    />

                    {/* Detailed Belitung Island */}
                    <path 
                      d="M 258 220 C 261 215, 267 217, 268 222 C 267 227, 261 228, 258 225 Z" 
                      className={getIslandStyle('sumatera')}
                    />

                    {/* Nias Island */}
                    <path 
                      d="M 58 118 Q 63 113 67 119 C 68 123, 62 126, 58 118 Z" 
                      className={getIslandStyle('sumatera')}
                    />

                    {/* Mentawai Islands */}
                    <path 
                      d="M 100 182 C 102 178, 107 180, 106 185 C 104 188, 100 186, 100 182 Z" 
                      className={getIslandStyle('sumatera')}
                    />
                    <path 
                      d="M 112 200 C 114 196, 119 198, 118 203 C 116 206, 112 204, 112 200 Z" 
                      className={getIslandStyle('sumatera')}
                    />

                    {/* Batam & Bintan (Riau Archipelago) */}
                    <path d="M 198 135 C 200 133, 203 133, 204 135 C 205 137, 203 139, 201 139 Z" className={getIslandStyle('sumatera')} />
                    <path d="M 205 139 C 207 137, 210 137, 211 139 C 211 141, 208 143, 206 142 Z" className={getIslandStyle('sumatera')} />

                    <text x="100" y="210" className={`font-mono text-[10px] uppercase pointer-events-none tracking-widest select-none transition-colors duration-300 ${selectedRegionId === 'sumatera' ? 'fill-emerald-400 font-bold' : 'fill-zinc-600'}`}>Sumatera</text>
                    
                    {/* Internal zoning visual division guides (dashed arcs inside path) */}
                    {selectedRegionId === 'sumatera' && (
                      <g stroke="#10b981" strokeWidth="0.8" strokeDasharray="2,3" fill="none" className="opacity-60">
                        {/* Zone A / B boundary */}
                        <path d="M 120 125 Q 100 150 145 155" />
                        {/* Zone B / C boundary */}
                        <path d="M 175 190 Q 200 200 185 220" />
                        
                        {/* Zone Labels */}
                        <text x="75" y="115" className="fill-emerald-400 font-mono text-[7px]">ZONA A</text>
                        <text x="125" y="170" className="fill-emerald-400 font-mono text-[7px]">ZONA B</text>
                        <text x="180" y="235" className="fill-emerald-400 font-mono text-[7px]">ZONA C</text>
                      </g>
                    )}
                  </g>

                  {/* KALIMANTAN */}
                  <g 
                    id="map-region-kalimantan"
                    onClick={() => setSelectedRegionId('kalimantan')}
                    onMouseEnter={() => setHoveredRegionId('kalimantan')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    className="transition-all duration-300"
                  >
                    {/* Geographically realistic Kalimantan contour with proper peninsulas and bays */}
                    <path 
                      d="M 330 65 C 340 58, 355 52, 368 50 C 378 48, 388 54, 398 56 C 408 58, 415 50, 422 52 C 430 55, 432 64, 438 70 C 445 76, 452 74, 458 80 C 464 86, 458 96, 454 104 C 450 112, 452 120, 448 128 C 444 136, 436 138, 432 146 C 428 154, 434 162, 430 170 C 426 178, 418 180, 414 188 C 410 196, 416 204, 412 212 C 408 220, 400 226, 392 232 C 384 238, 374 236, 364 230 C 354 224, 344 226, 334 232 C 324 238, 314 236, 304 228 C 294 220, 288 210, 282 202 C 276 194, 268 190, 262 182 C 256 174, 260 164, 256 154 C 252 144, 260 136, 268 128 C 276 120, 284 118, 292 110 C 300 102, 304 92, 312 85 C 320 78, 320 80, 330 65 Z" 
                      className={getIslandStyle('kalimantan')}
                    />
                    <text x="315" y="180" className={`font-mono text-[10px] uppercase pointer-events-none tracking-widest select-none transition-colors duration-300 ${selectedRegionId === 'kalimantan' ? 'fill-emerald-400 font-bold' : 'fill-zinc-600'}`}>Kalimantan</text>
                    
                    {/* Zone division lines */}
                    {selectedRegionId === 'kalimantan' && (
                      <g stroke="#10b981" strokeWidth="0.8" strokeDasharray="2,3" fill="none" className="opacity-60">
                        {/* Boundary line separating West/South from East/North */}
                        <path d="M 330 120 Q 360 180 395 235" />
                        
                        <text x="290" y="200" className="fill-emerald-400 font-mono text-[7px]">ZONA A</text>
                        <text x="382" y="150" className="fill-emerald-400 font-mono text-[7px]">ZONA B</text>
                      </g>
                    )}
                  </g>

                  {/* SULAWESI */}
                  <g 
                    id="map-region-sulawesi"
                    onClick={() => setSelectedRegionId('sulawesi')}
                    onMouseEnter={() => setHoveredRegionId('sulawesi')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    className="transition-all duration-300"
                  >
                    {/* Slender, highly aesthetic four-branch ('K' shape) orchid-form Sulawesi contour */}
                    <path 
                      d="M 454 162 C 458 154, 466 146, 474 138 C 478 122, 474 110, 488 106 C 502 102, 516 108, 530 103 C 544 98, 552 88, 568 88 C 578 88, 578 98, 564 103 C 544 108, 528 118, 518 128 C 510 138, 510 146, 520 144 C 532 142, 544 139, 558 146 C 568 150, 568 160, 554 163 C 538 165, 520 163, 512 173 C 506 180, 516 190, 526 200 C 536 210, 542 220, 537 230 C 532 236, 522 234, 514 223 C 506 213, 504 200, 496 195 C 488 193, 486 203, 482 213 C 478 226, 482 238, 478 246 C 472 252, 464 246, 462 234 Q 458 215 460 200 C 462 185, 450 170, 454 162 Z" 
                      className={getIslandStyle('sulawesi')}
                    />
                    <text x="475" y="215" className={`font-mono text-[10px] uppercase pointer-events-none tracking-widest select-none transition-colors duration-300 ${selectedRegionId === 'sulawesi' ? 'fill-emerald-400 font-bold' : 'fill-zinc-600'}`}>Sulawesi</text>
                    
                    {/* Zone division lines */}
                    {selectedRegionId === 'sulawesi' && (
                      <g stroke="#10b981" strokeWidth="0.8" strokeDasharray="2,3" fill="none" className="opacity-60">
                        {/* Central boundary */}
                        <path d="M 505 178 L 538 180" />
                        
                        <text x="515" y="145" className="fill-emerald-400 font-mono text-[7px]">ZONA A</text>
                        <text x="515" y="200" className="fill-emerald-400 font-mono text-[7px]">ZONA B</text>
                      </g>
                    )}
                  </g>

                  {/* BALI */}
                  <g 
                    id="map-region-bali"
                    onClick={() => setSelectedRegionId('bali')}
                    onMouseEnter={() => setHoveredRegionId('bali')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    className="transition-all duration-300"
                  >
                    {/* Geographically elegant Bali Island shape */}
                    <path 
                      d="M 444 327 C 447 323, 451 322, 455 324 C 459 326, 463 322, 467 325 C 471 328, 469 334, 465 336 C 461 338, 455 337, 451 334 C 447 332, 443 331, 444 327 Z" 
                      className={getIslandStyle('bali')}
                    />
                    
                    {/* Accurate chain of adjacent Nusa Tenggara islands (Lombok, Sumbawa, Flores, etc.) */}
                    <g className="opacity-40 fill-none stroke-zinc-900 stroke-[1.2]">
                      <path d="M 472 329 C 475 328, 478 329, 481 331 C 484 333, 482 336, 479 337 C 476 338, 473 335, 472 329 Z" />
                      <path d="M 485 331 C 489 329, 495 329, 500 332 C 505 335, 502 338, 497 339 C 492 340, 487 337, 485 331 Z" />
                      <path d="M 506 331 Q 515 332 525 330 T 535 333" />
                    </g>
                    
                    <text x="466" y="322" className={`font-mono text-[9px] uppercase pointer-events-none tracking-wider select-none transition-colors duration-300 ${selectedRegionId === 'bali' ? 'fill-emerald-400 font-bold' : 'fill-zinc-600'}`}>Bali</text>
                  </g>

                  {/* JAWA */}
                  <g 
                    id="map-region-jawa"
                    onClick={() => setSelectedRegionId('jawa')}
                    onMouseEnter={() => setHoveredRegionId('jawa')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    className="transition-all duration-300"
                  >
                    {/* Sleek, detailed geographic Java Island path spanning Banten to Banyuwangi */}
                    <path 
                      d="M 195 315 C 200 310, 208 308, 215 308 C 222 308, 228 312, 235 310 C 242 308, 248 302, 255 304 C 262 306, 268 300, 275 302 C 282 304, 288 308, 295 308 C 302 308, 308 312, 315 312 C 322 312, 328 308, 335 310 C 342 312, 348 308, 355 312 C 362 316, 368 312, 375 318 C 382 324, 388 322, 395 328 C 402 334, 408 332, 415 330 C 422 328, 428 331, 435 331 C 438 335, 434 338, 428 336 C 420 334, 412 328, 404 326 C 396 324, 388 327, 380 326 C 372 325, 364 327, 356 326 C 348 325, 340 326, 332 325 C 324 324, 316 323, 308 322 C 300 321, 292 320, 284 320 C 276 320, 268 320, 260 319 C 252 318, 244 318, 236 317 C 228 316, 220 316, 212 315 C 204 314, 196 311, 195 315 Z" 
                      className={getIslandStyle('jawa')}
                    />
                    
                    {/* Madura island contour */}
                    <path 
                      d="M 416 312 L 430 314 L 427 318 L 413 316 Z" 
                      className={getIslandStyle('jawa')}
                    />
                    
                    <text x="245" y="344" className={`font-mono text-[9px] uppercase pointer-events-none tracking-widest select-none transition-colors duration-300 ${selectedRegionId === 'jawa' ? 'fill-emerald-400 font-bold' : 'fill-zinc-600'}`}>Pulau Jawa (12 Titik)</text>
                    
                    {/* Highlighted major Live Audition Host venue dots on Java */}
                    {/* Jakarta (Pandora) */}
                    <circle cx="230" cy="310" r="4.5" className="fill-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)] border border-white" />
                    {/* Semarang */}
                    <circle cx="310" cy="318" r="4" className="fill-amber-400 border border-white/50" />
                    {/* Jogjakarta */}
                    <circle cx="295" cy="323" r="4" className="fill-cyan-400 border border-white/50" />
                    {/* Solo */}
                    <circle cx="323" cy="323" r="4" className="fill-fuchsia-400 border border-white/50" />
                    {/* Surabaya */}
                    <circle cx="380" cy="326" r="3" className="fill-rose-500 opacity-60" />
                  </g>
                  </svg>
                  
                  {/* Glowing interactive markers positioned precisely as popovers, positioned relative to the aspect 16/9 box */}
                  <div className="absolute inset-0 pointer-events-none">
                    {regions.map((reg) => {
                      const isActive = reg.id === selectedRegionId;
                      return (
                        <button
                          key={reg.id}
                          onClick={() => setSelectedRegionId(reg.id)}
                          style={{ left: `${(reg.anchor.x / 800) * 100}%`, top: `${(reg.anchor.y / 450) * 100}%` }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 group p-2.5 cursor-pointer pointer-events-auto transition-all duration-300 z-20 outline-none"
                        >
                          <span className="relative flex h-5 w-5">
                            {isActive && (
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-500"></span>
                            )}
                            
                            <span className={`relative inline-flex rounded-full h-5 w-5 border border-white/80 items-center justify-center transition-all ${
                              isActive 
                                ? 'bg-emerald-500 scale-125 shadow-[0_0_12px_rgba(16,185,129,0.8)]' 
                                : 'bg-zinc-950 hover:bg-zinc-900 border-zinc-700 hover:border-white'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-zinc-400'}`} />
                            </span>
                          </span>

                          {/* Desktop label */}
                          <span className={`absolute top-6 left-1/2 -translate-x-1/2 bg-zinc-950 border text-[9px] font-mono whitespace-nowrap px-2 py-0.5 rounded transition-all pointer-events-none uppercase shadow-lg ${
                            isActive ? 'text-white border-emerald-500 font-extrabold' : 'text-zinc-500 group-hover:text-zinc-300 border-zinc-900'
                          }`}>
                            {reg.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                </div>
              </div>

              {/* Dynamic Legend on bottom of the map container */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap justify-between items-center gap-2 bg-black/85 border border-zinc-900/90 rounded px-3.5 py-2 text-[10px] font-mono text-zinc-400 z-10 backdrop-blur-md">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white/20 inline-block" />
                    <span>Sumatera (Host: Jakarta)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-white/20 inline-block" />
                    <span>Kalimantan (Host: Semarang)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 border border-white/20 inline-block" />
                    <span>Sulawesi (Host: Jogja)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 border border-white/20 inline-block" />
                    <span>Bali (Host: Solo)</span>
                  </div>
                </div>
                <span className="text-zinc-500 hidden sm:inline">*Klik pulau untuk filter</span>
              </div>

            </div>

            {/* Quick action switches tab */}
            <div className="flex flex-wrap gap-1.5 p-1.5 bg-zinc-950 rounded-lg items-center">
              <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider px-2 block mr-auto">Fast Switch:</span>
              {regions.map((reg) => {
                const isActive = reg.id === selectedRegionId;
                return (
                  <button
                    key={reg.id + '-tab-link'}
                    onClick={() => setSelectedRegionId(reg.id)}
                    className={`font-mono text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded transition-all cursor-pointer border ${
                      isActive 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-black'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border-transparent'
                    }`}
                  >
                    {reg.name}
                  </button>
                );
              })}
            </div>

            {/* General Description Banner below map */}
            <div className="flex items-start gap-3.5 p-4 bg-emerald-950/10 border border-emerald-500/15 rounded-lg text-xs leading-relaxed text-zinc-300">
              <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">INTEGRASI JALUR AUDISI LINTAS PULAU</span>
                <p className="font-sans">
                  Sistem integrasi ini mempermudah penyaringan bakat musisi luar Jawa. Peserta terpilih dari masing-masing sub-zona akan didatangkan langsung ke kota-kota audisi di Pulau Jawa untuk unjuk kemampuan secara live di hadapan dewan juri ahli.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Displaying detail guides matching selected zone */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
            
            {/* Main Selection Details card */}
            <div className="bg-[#0b0b0d] border border-zinc-900 rounded-xl p-5 sm:p-7 space-y-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-emerald-500 to-lime-400 z-10" />

              {/* Slider Header Control & Info text */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <div className="text-[10px] text-emerald-400 font-mono tracking-widest font-black uppercase flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 animate-pulse" /> DETAIL ZONA SELEKSI NASIONAL
                </div>
                {/* Swipe helper tag for mobile layout */}
                <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800/40 px-2 py-0.5 rounded text-[9px] text-zinc-500 font-mono">
                  <span>SWIPE CARD / TAPS</span>
                  <span className="animate-pulse text-emerald-400">↔</span>
                </div>
              </div>

              {/* Carousel Content with Drag Handlers */}
              <div className="relative overflow-hidden min-h-[440px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={selectedRegionId}
                    custom={direction}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.4}
                    onDragEnd={(e, info) => {
                      const swipeThreshold = 50;
                      if (info.offset.x < -swipeThreshold) {
                        handleNext();
                      } else if (info.offset.x > swipeThreshold) {
                        handlePrev();
                      }
                    }}
                    className="space-y-5 cursor-grab active:cursor-grabbing touch-pan-y"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-2xl font-black text-white uppercase tracking-tight">
                        PULAU {selectedZone.region}
                      </h3>
                      {/* Left and Right navigation indicators */}
                      <div className="flex items-center gap-1 z-10" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={handlePrev}
                          title="Sebelumnya"
                          className="p-1 px-2 rounded bg-zinc-950 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-[10px] text-zinc-500 min-w-[32px] text-center">
                          {currentIndex + 1} / {regionIds.length}
                        </span>
                        <button 
                          onClick={handleNext}
                          title="Berikutnya"
                          className="p-1 px-2 rounded bg-zinc-950 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Sub-zones Grid */}
                    <div className="space-y-3">
                      <span className="text-[10px] text-zinc-500 font-mono block border-b border-zinc-900 pb-1 uppercase tracking-wider">PEMBAGIAN SUB-ZONA:</span>
                      <div className="space-y-2.5">
                        {selectedZone.zones.map((zoneText, idx) => (
                          <div key={idx} className="flex items-start gap-3 bg-zinc-950 p-3.5 rounded border border-zinc-900/80 hover:border-zinc-800 transition-colors">
                            <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-zinc-200 leading-relaxed font-sans">{zoneText}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Venue details */}
                    <div className="space-y-2 bg-gradient-to-r from-zinc-950 to-[#0e1612] p-4 border border-emerald-950/40 rounded-lg">
                      <span className="text-[9px] text-[#A3A3A3] font-mono uppercase block tracking-wider">LOKASI AUDISI LIVE:</span>
                      <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase">
                        <MapPin className="w-4 h-4 text-emerald-400 animate-bounce" />
                        DI AUDISI DI KOTA: {selectedZone.liveAuditionVenue}
                      </div>
                    </div>

                    {/* Selection Rules & Mechanics section */}
                    <div className="space-y-3.5 border-t border-zinc-900/80 pt-5">
                      <span className="text-[10px] text-zinc-500 font-mono block uppercase tracking-wider">MEKANISME SELEKSI RESMI:</span>
                      
                      <div className="grid grid-cols-1 gap-2.5">
                        {/* Step 1 */}
                        <div className="flex items-start gap-3 bg-zinc-950/40 p-3 rounded border border-zinc-900/60">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0 mt-0.5">
                            1
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-xs text-white font-bold leading-none">Penyaringan 3 Perwakilan</p>
                            <p className="text-[11px] text-zinc-400 font-sans">
                              Dari setiap Zona terpilih **3 wakil terbaik** yang lolos seleksi demo online awal.
                            </p>
                          </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-start gap-3 bg-zinc-950/40 p-3 rounded border border-zinc-900/60">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0 mt-0.5">
                            2
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-xs text-white font-bold leading-none">Babak Live Audition Daerah</p>
                            <p className="text-[11px] text-zinc-400 font-sans">
                              Ke-3 perwakilan daerah di-audisi secara tatap muka langsung di kota host ({selectedZone.liveAuditionVenue || "Solo"}).
                            </p>
                          </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-start gap-3 bg-zinc-950/40 p-3 rounded border border-zinc-900/60">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0 mt-0.5">
                            3
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-xs text-white font-bold leading-none">Pemilihan 1 Wakil Finalis</p>
                            <p className="text-[11px] text-zinc-400 font-sans">
                              Juri ahli akan memilih **1 gitaris terbaik** sebagai representasi mutlak dari sub-zona tersebut menuju klimaks pertunjukan.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Trust guarantee card */}
                      <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3 shadow-md">
                        <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 flex-shrink-0 border border-emerald-500/20">
                          <Plane className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-white font-black uppercase tracking-wider">Garansi 100% Ditanggung Panitia</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          </div>
                          <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                            Tenang berpikir kreatif saja! Semua biaya transportasi dan akomodasi finalis terpilih akan **ditanggung sepenuhnya** oleh pihak panitia penyelenggara.
                          </p>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dot Indicators at the absolute bottom with short titles for clear map/carousel synchronization */}
              <div className="flex justify-start md:justify-center items-center gap-1.5 border-t border-zinc-900 pt-4 overflow-x-auto scrollbar-none px-4 md:px-0">
                {regionIds.map((regId) => {
                  const regName = auditionZones.find(z => z.id === regId)?.region.split(' ')[0] || regId;
                  const isActive = regId === selectedRegionId;
                  return (
                    <button
                      key={regId}
                      onClick={() => selectRegion(regId)}
                      className={`px-2.5 py-1.5 rounded-lg font-mono text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1 border flex-shrink-0 ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.15)] scale-105 font-bold'
                          : 'bg-zinc-950/40 border-zinc-900/60 text-zinc-500 hover:text-zinc-400 hover:bg-zinc-900/20'
                      }`}
                    >
                      <span className={`w-1 h-1 rounded-full flex-shrink-0 ${isActive ? 'bg-emerald-400 animate-ping' : 'bg-transparent'}`} />
                      {regName}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Special expansion showing Jawa Tour list only if "jawa" is selected, or a preview summary */}
            {selectedRegionId === 'jawa' ? (
              <div className="bg-gradient-to-b from-[#111] to-[#0a0a0b] border-2 border-emerald-500/20 rounded-xl p-6 space-y-4 shadow-xl">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="font-heading text-xs font-black text-white uppercase tracking-wider flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    RUTE DETAIL 12 TITIK JAWA (TRC 2026)
                  </span>
                  <span className="text-[9px] bg-emerald-500 text-black px-2 py-0.5 font-black uppercase rounded">
                    GMG CONCERT
                  </span>
                </div>

                {/* List of 12 Points */}
                <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 scrollbar-thin">
                  {javaTourPoints.map((point, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-3 rounded-lg text-xs border transition-all duration-200 ${
                        point.type === 'Klimaks' 
                          ? 'bg-amber-500/5 border-amber-500/30 text-amber-200 font-extrabold shadow-[0_0_10px_rgba(245,158,11,0.05)]'
                          : point.type === 'City to City' 
                            ? 'bg-red-500/5 border-red-500/20 text-red-100 font-semibold shadow-[0_0_8px_rgba(239,68,68,0.02)]'
                            : 'bg-zinc-950/60 border-zinc-900 hover:border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full ${
                          point.type === 'Klimaks'
                            ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                            : point.type === 'City to City'
                              ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                              : 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]'
                        }`} />
                        <span className="tracking-tight">{point.city}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {point.venue && <span className="font-mono text-[10px] text-zinc-600">{point.venue}</span>}
                        <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded tracking-wide border uppercase ${
                          point.type === 'Klimaks'
                            ? 'bg-amber-400/10 text-amber-400 border-amber-400/20'
                            : point.type === 'City to City'
                              ? 'bg-red-500/10 text-red-400 border-red-500/20'
                              : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                          {point.type === 'Klimaks' ? 'Klimaks City to City' : point.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* On mobile, we ALWAYS show the Rute Detail 12 Titik Jawa list so users can look at it even if they selected another region! */}
                <div className="block lg:hidden bg-gradient-to-b from-[#111] to-[#0a0a0b] border-2 border-emerald-500/20 rounded-xl p-6 space-y-4 shadow-xl">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                    <span className="font-heading text-xs font-black text-white uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      RUTE DETAIL 12 TITIK JAWA (TRC 2026)
                    </span>
                    <span className="text-[9px] bg-emerald-500 text-black px-2 py-0.5 font-black uppercase rounded">
                      GMG CONCERT
                    </span>
                  </div>

                  {/* List of 12 Points */}
                  <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 scrollbar-thin">
                    {javaTourPoints.map((point, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between p-3 rounded-lg text-xs border transition-all duration-200 ${
                          point.type === 'Klimaks' 
                            ? 'bg-amber-500/5 border-amber-500/30 text-amber-200 font-extrabold shadow-[0_0_10px_rgba(245,158,11,0.05)]'
                            : point.type === 'City to City' 
                              ? 'bg-red-500/5 border-red-500/20 text-red-100 font-semibold shadow-[0_0_8px_rgba(239,68,68,0.02)]'
                              : 'bg-zinc-950/60 border-zinc-900 hover:border-zinc-800 text-zinc-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2 h-2 rounded-full ${
                            point.type === 'Klimaks'
                              ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                              : point.type === 'City to City'
                                ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                                : 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]'
                          }`} />
                          <span className="tracking-tight">{point.city}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {point.venue && <span className="font-mono text-[10px] text-zinc-600">{point.venue}</span>}
                          <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded tracking-wide border uppercase ${
                            point.type === 'Klimaks'
                              ? 'bg-amber-400/10 text-amber-400 border-amber-400/20'
                              : point.type === 'City to City'
                                ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          }`}>
                            {point.type === 'Klimaks' ? 'Klimaks City to City' : point.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0b0b0d] border border-zinc-900 rounded-xl p-5 space-y-3.5 shadow-xl">
                  <span className="text-[10px] text-zinc-500 font-mono block uppercase tracking-wider">DEWAN JURI VIRTUOSO AHLI</span>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Para finalis yang tersaring dari masing-masing sub-zona pulau luar Jawa akan diterbangkan langsung dan berhadapan tatap muka untuk dinilai secara orisinil oleh maestro gitaris seperti Dewa Budjana, Eet Sjahranie, Pay Burman, dan Balawan.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-black uppercase font-mono cursor-pointer hover:text-emerald-300 transition-colors">
                    <a href="#judges-section" className="flex items-center gap-1.5">
                      <span>Lihat Profil Juri Virtuoso</span> <span>↓</span>
                    </a>
                  </div>
                </div>
              </>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
