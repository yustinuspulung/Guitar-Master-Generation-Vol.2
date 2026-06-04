import React, { useState } from 'react';
import { Flame, Menu, X, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import InteractiveMapSection from './components/InteractiveMapSection';
import JudgesSection from './components/JudgesSection';
import FormSection from './components/FormSection';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'PROFIL UTAMA', sectionId: 'gmg-hero-top' },
    { label: 'REKAM JEJAK', sectionId: 'stats-section-id' },
    { label: 'RUTE & AUDISI', sectionId: 'map-section-id' },
    { label: 'VIRTUOSO JURI', sectionId: 'judges-section-id' },
    { label: 'PITCH DECK', sectionId: 'investment-form-section' },
  ];

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white selection:bg-crimson selection:text-white font-sans">
      
      {/* Dynamic Top Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#0C0C0C]/90 backdrop-blur-md border-b border-zinc-90 w-full px-4 md:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand/Logo Title */}
          <button 
            onClick={() => scrollToSection('gmg-hero-top')}
            className="flex items-center gap-3 font-heading text-left cursor-pointer outline-none group"
            id="brand-logo-button"
          >
            <div className="relative h-12 w-auto flex items-center justify-center transition-all group-hover:scale-105">
              <img 
                src="https://drive.google.com/thumbnail?id=1qIyZMqVIybFfNwICbgn3AWCOPs5yTF6o&sz=w600" 
                alt="Olive MGMT Logo" 
                className="h-10 sm:h-11 w-auto object-contain filter brightness-110 saturate-110"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback in case of network issue
                  const target = e.target as HTMLImageElement;
                  target.src = "https://drive.google.com/thumbnail?id=1Dko6F_TiVbPIS946vtzhr-8dk_iUTAMv&sz=w300";
                }}
              />
            </div>
          </button>

          {/* Desktop Navigation Links (Montserrat/Oswald layout) */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.sectionId)}
                className="font-heading text-xs font-black tracking-widest text-[#8B8B8B] hover:text-white hover:border-b-2 hover:border-crimson pb-1 pt-1 transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Header Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE SECURE ENCRYPTION
            </span>
            <button
              id="header-cta-nav"
              onClick={() => scrollToSection('investment-form-section')}
              className="px-5 py-2.5 bg-crimson hover:bg-red-700 text-white font-heading text-[10px] font-black tracking-widest rounded transition-all cursor-pointer glow-red flex items-center gap-1.5"
            >
              LET'S TALK BUSINESS <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu triggers */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => scrollToSection('investment-form-section')}
              className="px-3.5 py-1.5 bg-crimson text-white font-heading text-[10px] font-black tracking-widest rounded glow-red cursor-pointer"
            >
              PROPOSAL
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#8B8B8B] hover:text-white hover:bg-zinc-950 p-2 rounded border border-zinc-90 pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-y-0 right-0 w-64 bg-dark border-l border-zinc-900 z-50 p-6 flex flex-col justify-between shadow-2xl animate-[slideIn_0.3s_ease-out]">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <span className="font-heading text-xs font-black text-[#8B8B8B]">PETA NAVIGASI</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.sectionId)}
                  className="w-full text-left font-heading text-xs font-black tracking-widest text-[#8B8B8B] hover:text-white pb-1 transition-colors hover:border-l-2 hover:border-crimson hover:pl-2"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <div className="bg-zinc-950 p-4 rounded border border-zinc-900 text-[10px] font-mono leading-normal text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500 mb-1" />
              Verified by Olive MGMT Group & TRC Core Team 2026.
            </div>
            
            <button
              onClick={() => scrollToSection('investment-form-section')}
              className="w-full py-3.5 bg-crimson hover:bg-red-700 text-white font-heading text-xs font-black tracking-widest rounded text-center block glow-red"
            >
              DAPATKAN PITCH DECK
            </button>
          </div>
        </div>
      )}

      {/* Primary Landing Page Components with unique IDs */}
      <main>
        
        {/* HERO SECTION */}
        <div id="gmg-hero-top">
          <HeroSection onCtaClick={() => scrollToSection('investment-form-section')} />
        </div>

        {/* VALIDATION & STATS SECTION */}
        <div id="stats-section-id">
          <StatsSection />
        </div>

        {/* INTERACTIVE TOUR & AUDITIONS MAPPING SECTION */}
        <div id="map-section-id">
          <InteractiveMapSection />
        </div>

        {/* VIRTUOSO HALL OF JUDGES SECTION */}
        <div id="judges-section-id">
          <JudgesSection />
        </div>

        {/* LEAD INTERACTIVE GATING FORM & PROPOSAL PRESENTATION */}
        <FormSection />

      </main>

    </div>
  );
}
