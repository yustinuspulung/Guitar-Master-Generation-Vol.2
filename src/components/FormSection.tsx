import React, { useState, useEffect } from 'react';
import { Mail, Phone, Building, User, Download, Unlock, Lock, ArrowRight, ArrowLeft, Trash2, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, FileText, MessageCircle, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SubmissionLead } from '../types';

export default function FormSection() {
  const [fullName, setFullName] = useState('');
  const [institution, setInstitution] = useState('');
  const [email, setEmail] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedLead, setSubmittedLead] = useState<SubmissionLead | null>(null);

  // Admin Leads Panel states
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [allLeads, setAllLeads] = useState<SubmissionLead[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sync leads from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gmg_vol2_leads');
    if (saved) {
      try {
        setAllLeads(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing leads', e);
      }
    }

    const unlockedState = localStorage.getItem('gmg_vol2_unlocked');
    if (unlockedState === 'true') {
      setIsUnlocked(true);
      const savedLead = localStorage.getItem('gmg_vol2_current_lead');
      if (savedLead) {
        try {
          setSubmittedLead(JSON.parse(savedLead));
        } catch (e) {}
      }
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Verification
    if (!fullName.trim() || !institution.trim() || !email.trim() || !whatsApp.trim()) {
      setErrorMsg('Harap lengkapi semua baris formulir sebelum mengunduh pitch deck.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Format email yang Anda masukkan tidak valid.');
      return;
    }

    // Capture Lead
    const newLead: SubmissionLead = {
      id: 'lead_' + Date.now(),
      fullName: fullName.trim(),
      institution: institution.trim(),
      email: email.trim(),
      whatsApp: whatsApp.trim(),
      timestamp: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
    };

    const updatedLeads = [newLead, ...allLeads];
    setAllLeads(updatedLeads);
    localStorage.setItem('gmg_vol2_leads', JSON.stringify(updatedLeads));
    localStorage.setItem('gmg_vol2_unlocked', 'true');
    localStorage.setItem('gmg_vol2_current_lead', JSON.stringify(newLead));

    setSubmittedLead(newLead);
    setIsUnlocked(true);
    
    // Clear inputs
    setFullName('');
    setInstitution('');
    setEmail('');
    setWhatsApp('');
  };

  const handleResetAuthentication = () => {
    localStorage.removeItem('gmg_vol2_unlocked');
    localStorage.removeItem('gmg_vol2_current_lead');
    setIsUnlocked(false);
    setSubmittedLead(null);
    setCurrentSlide(0);
  };

  const handleDeleteLead = (id: string) => {
    const filtered = allLeads.filter(l => l.id !== id);
    setAllLeads(filtered);
    localStorage.setItem('gmg_vol2_leads', JSON.stringify(filtered));
  };

  // Triggers down a structured corporate text representation of proposal deck in a download link
  const handleDownloadDeckAsAsset = () => {
    const summaryText = `
============================================================
       GUITAR MASTER GENERATION (GMG) VOL. 2 PITCH DECK
============================================================
MANAJEMEN PENGEMBANGAN: OLIVE MGMT & TRC CORE TEAM
Diterbitkan: Juni 2026
Disiapkan Khusus Untuk: ${submittedLead ? submittedLead.fullName : 'Calon Mitra Strategis'}
Instansi Mitra: ${submittedLead ? submittedLead.institution : 'Infrastruktur Publik / Perusahaan'}

1. RINGKASAN EKSEKUTIF
   GMG Vol. 2 mengawinkan salah satu kompetisi gitar elektrik terbesar Indonesia
   dengan kekuatan infrastruktur tur legendaris The Rock Campus (TRC) Tour 2026.
   Bekerja sama menyapa 120,000+ perwakilan crowd rock di 12 titik Pulau Jawa serta
   menyediakan corong audisi daerah nasional (Sumatera, Kalimantan, Sulawesi, Bali).

2. PILAR VALIDASI (TRACTION)
   - 11 TAHUN: Gerakan literasi musik rock mandiri (sejak 2015).
   - 167 EPISODE: Eksistensi gigih, mandiri, dan andal di industri kreatif.
   - 800+ BAND: Mementaskan legenda hingga band-band baru tersohor tanah air.
   - GMG VOL. 1 (2022): Sukses besar di Beyond Bar Senayan, pendaftaran penuh sesak.

3. STRUKTUR LOKASI TUR & AUDISI NASIONAL
   - Pulau Jawa (12 Titik):
     * 8 Titik Club to Club: Jakarta Selatan, Bogor, Jakarta Utara, Depok,
       Jakarta Timur, Tangerang, Bekasi, Bandung.
     * 4 Titik City to City: Semarang, Yogyakarta, Solo, Surabaya (GRAND KLIMAKS).
   - Jalur Audisi Nasional:
     * Zona Sumatera (A/B/C), Kalimantan (A/B), Sulawesi (A/B), Bali & Nusa Tenggara.
     * Live Audition Semifinalis diterbangkan langsung ke panggung utama Jakarta.

4. PANEL DEWAN JURI MAESTRO (STAR POWER)
   - Main Judges: Ezra Simanjuntak, Pay Burman, Eet Sjahranie, Dewa Budjana, Balawan.
   - Audition Judges: Irvan Borneo, Jikun Riff, Gugun Blues Shelter.

5. PORTFOLIO VIRTUAL INVESTASI (TOTAL INVESTASI: RP 6.6 MILIAR)
   - Club to Club Tour (8 Titik): Rp 660.000.000
   - City to City Concerts (4 Titik): Rp 3.440.000.000
   - Final Klimaks (Surabaya SCC): Rp 2.500.000.000

6. PAKET KEUNTUNGAN MITRA (ROI CONTRAPRESTATION)
   - Omnipresent Logo Placement (Videotron, Merchandise, Baliho, Backdrop).
   - Slogan MC Mentions secara berkala: "INTERMEZO DULU".
   - Digital Campaign kolaborasi YouTube & Instagram resmi TRC.
   - Alokasi Prime 3D Booth Space terluas di seluruh kota pertunjukan tur.

Informasi & Kontak Lanjutan:
- Olive MGMT (TRC Executive Manager): management@therockcampus.id
- Official WhatsApp Hotline (Eva Indriyani): +62 812-8880-5482
============================================================
Thank you for your trust. Build the legacy together.
    `;
    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GMG_Vol2_PitchDeck_Proposal_${submittedLead ? submittedLead.fullName.replace(/\s+/g, '_') : 'Mitra'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Slide definitions for the interactive digital deck representation
  const deckSlides = [
    {
      title: "SPESIFIKASI PROPOSAL & COVER",
      sub: "Digital Investor Pitch Deck",
      bullets: [
        "Proyek: Guitar Master Generation Vol. 2 (2026)",
        "Mitra Produksi: Olive MGMT & The Rock Campus Core Team",
        "Target Investasi Tur: Rp 6.6 Miliar Rupiah",
        "Tujuan: Mengambil kepemimpinan pangsa pasar festival musik rock independen Indonesia",
        "Audien Estimasi Tur: 120,000+ Crowd Terbuka"
      ]
    },
    {
      title: "LATAR BELAKANG & TUJUAN BISNIS",
      sub: "Mengapa GMG Vol.2 Menjanjikan?",
      bullets: [
        "Mendominasi kancah gitaris rock: Ketiadaan kompetisi gitar berskala nasional membuka peluang market share yang masif.",
        "Sinergi Mutlak Berjalan: GMG Vol. 2 tidak memulai dari nol, tumpuan kami adalah kesuksesan finansial & komunitas TRC selama 11 tahun.",
        "Daya Tarik Brand: Musisi gitaris adalah 'influencer instrumen'. Dampak pemasaran menular ke pembelian aksesoris, audio, instrumen, apparel, dll."
      ]
    },
    {
      title: "STRUKTUR GEOLOKASI (12 TITIK & NASIONAL)",
      sub: "Roda Roadshow yang Terpeta",
      bullets: [
        "Rute Intim (8 Titik Club to Club): Jabodetabek & Bandung. Mengedepankan interaksi hangat dengan pelaku industri & influencer.",
        "Rute Akbar (4 Titik City to City): Semarang, Yogyakarta, Solo. Aktivasi panggung terbuka outdoor ribuan penonton.",
        "Surabaya Klimaks: Grand Final megah di Surabaya Convention Center. Kolaborasi instrumen orkestrapun disiapkan.",
        "Sistem Luar Jawa: Audisi digital saringan ketat menjamin perwakilan talenta nusantara terlaksana inklusif."
      ]
    },
    {
      title: "STAR AUTHORITY (DINDING KREDIBILITAS)",
      sub: "Aset Pemasaran & Pengaruh Publik",
      bullets: [
        "Ezra Simanjuntak: Dedikasi 11 tahun melestarikan pilar rock grassroot tanah air.",
        "Pay Burman & Eet Sjahranie: Dua poros rocker legendaris pencipta magnet crowd.",
        "Dewa Budjana & Balawan: Daya tawar musisi instrumentalis global pemicu viralitas.",
        "Sinergi Media Komersial: Juri aktif mempromosikan kegiatan harian di kanal sosial media pribadi berpengaruh."
      ]
    },
    {
      title: "RANCANGAN KEUANGAN & PEMBAGIAN RISIKO",
      sub: "Kejelasan Alokasi & Anggaran Rp 6.6 M",
      bullets: [
        "Club to Club (10%): Rp 660 Juta untuk persiapan, kualifikasi lokal klub, audio-multitrack recording.",
        "City to City (52%): Rp 3.44 Miliar dialokasikan untuk sewa videotron daerah, panggung outdoor, sewa tempat, perizinan matang.",
        "Klimaks Surabaya (38%): Rp 2.5 Miliar untuk pagelaran puncak, apresiasi hadiah pemenang, orkestra, & jamming maestro juri.",
        "Transparansi Kelola: Pengeluaran ditinjau rutin oleh tim keuangan profesional Olive MGMT."
      ]
    },
    {
      title: "MANFAAT MITRA & EVALUASI ROI",
      sub: "Sponsorship & Contraprestations",
      bullets: [
        "Eksklusivitas Logo: Logo dipasang permanen di billboard, kaus, dan LED raksasa panggung.",
        "'Intermezo Dulu' MC Slogan: Slogan sponsor diucapkan lantang oleh MC ditiap transisi jam band, mempererat memorabilitas.",
        "Prime Booth Space: Alokasi tenda/booth promosi di lokasi strategis pusat keramaian pertunjukan.",
        "Distribusi konten digital berturut-turut di Instagram & YouTube Channel TRC."
      ]
    }
  ];

  return (
    <section id="investment-form-section" className="relative bg-zinc-950 border-t border-zinc-900 py-24 px-4 md:px-8">
      {/* Decorative gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-crimson/10 to-transparent opacity-60" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-crimson/5 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto space-y-16">
        
        {/* Unlocked State vs Gated State container render */}
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* GATED FORM SECTION */
            <motion.div 
              key="gated-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-[#0e0e0e] border border-zinc-900 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
            >
              {/* Highlight red top strip */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-crimson via-blaze to-red-600 shadow-[0_2px_10px_rgba(230,33,41,0.5)]" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Form: Gated copy */}
                <div className="lg:col-span-6 space-y-6">
                  
                  <div className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 text-[11px] text-zinc-400 font-mono font-semibold">
                    <Lock className="w-3.5 h-3.5 text-crimson animate-pulse" />
                    SECURE ACCESS AUTHORIZATION
                  </div>

                  <div className="space-y-2">
                    <h3 className="headline text-3xl sm:text-4xl font-black text-white leading-[1.05]">
                      DAPATKAN BUNDLE PROPOSAL & PITCH DECK LENGKAP
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-steel leading-relaxed">
                      Silakan hubungi via whatsapp untuk berdiskusi lebih lanjut dan mendapatkan berkas proposal Lengkap TRC Tour City to City 2026.
                    </p>
                  </div>

                  {/* High Quality Points */}
                  <div className="space-y-3.5 font-sans text-xs text-slate-300">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-emerald-500/10 p-1.5 rounded-full text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>Rencana Anggaran Operasional</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="bg-emerald-500/10 p-1.5 rounded-full text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>Metodologi perhitungan imbal pengaruh (ROI) brand.</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="bg-emerald-500/10 p-1.5 rounded-full text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>Jadwal rilis, sub-regional, dan detail kontak negosiasi.</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-zinc-500 font-mono">
                    *Kerahasiaan data dilindungi oleh enkripsi SSL ketat Olive MGMT. Kami tidak menyebarkan data kepada pihak ketiga tanpa persetujuan.
                  </p>

                </div>

                {/* Right Area: WhatsApp Manager Contact Card */}
                <div id="whatsapp-contact-card" className="lg:col-span-6 bg-[#121212] border-2 border-[#25D366]/20 p-6 sm:p-8 rounded-xl shadow-xl space-y-6 flex flex-col justify-between relative overflow-hidden">
                  {/* Subtle WhatsApp green light effect inside the card */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="text-center pb-2 border-b border-zinc-900 relative z-10">
                    <span className="text-[10px] text-[#25D366] font-mono font-bold tracking-widest uppercase block mb-1">OFFICIAL BOOKING & PARTNERSHIP</span>
                    <h4 className="font-heading text-sm font-black text-white uppercase tracking-wider">
                      HUBUNGI VIA WHATSAPP
                    </h4>
                  </div>

                  <div className="space-y-4 relative z-10">
                    <div className="bg-zinc-950/60 p-4 border border-zinc-900 rounded-lg flex items-center gap-4">
                      {/* Representational Avatar */}
                      <div className="w-12 h-12 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] font-heading font-black text-lg shadow-md flex-shrink-0">
                        EI
                      </div>
                      <div>
                        <h5 className="font-heading text-white font-black text-sm uppercase tracking-wide">Eva Indriyani</h5>
                        <p className="font-mono text-[10px] text-[#25D366] font-bold uppercase tracking-wider">Manager Ezra Simanjuntak</p>
                      </div>
                    </div>

                    <p className="font-sans text-xs text-steel leading-relaxed text-center px-1">
                      Hubungi kami untuk mendapatkan dokumen Pitch Deck & Proposal resmi berupa berkas lengkap, negosiasi skema kerja sama, sponsorship, serta presentasi khusus.
                    </p>
                  </div>

                  <div className="space-y-3 relative z-10 pt-2">
                    {/* Primary WhatsApp Link */}
                    <a
                      id="btn-whatsapp-eva"
                      href="https://wa.me/6281288805482?text=Halo%20Mbak%20Eva%20Indriyani%20(Manager%20Ezra%20Simanjuntak),%20saya%20tertarik%20dengan%2520kemitraan%20dan%20proposal%20Pitch%20Deck%20GMG%20Vol.%202."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded bg-[#25D366] text-black font-heading text-xs font-black tracking-widest text-center flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:bg-[#1ebd51] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] transition-all duration-300 uppercase select-none font-bold"
                    >
                      <svg 
                        className="w-5 h-5 fill-current" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      HUBUNGI VIA WHATSAPP
                    </a>
                  </div>

                  <p className="text-[9px] text-zinc-600 font-mono text-center relative z-10">
                    *Tautan langsung aman ke chat resmi Whatsapp. Respon aktif dalam jam kerja operasional Olive MGMT.
                  </p>

                </div>

              </div>
            </motion.div>
          ) : (
            /* UNLOCKED SLIDES & DOWNLOAD AREA */
            <motion.div 
              key="unlocked-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              
              {/* Unlocked status bar */}
              <div className="bg-zinc-900/90 border-2 border-emerald-500/30 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl backdrop-blur">
                <div className="flex items-center gap-3.5 text-left">
                  <div className="bg-emerald-500/15 p-2 rounded-full border border-emerald-500/30 text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-black text-white uppercase tracking-tight">
                      Akses Aman Terbuka Untuk: {submittedLead?.fullName} ({submittedLead?.institution})
                    </h4>
                    <p className="font-sans text-[11px] text-steel">
                      Data Anda telah didaftarkan pada server Olive MGMT. Anda berhak mengakses digital deck interaktif dan berkas proposal legal.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  
                  {/* Download proposal file */}
                  <button
                    onClick={handleDownloadDeckAsAsset}
                    className="bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-heading font-black tracking-widest px-5 py-3 rounded flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Download className="w-4 h-4 fill-black" />
                    UNDUH BERKAS PROPOSAL (TXT CARD)
                  </button>

                  <button
                    onClick={handleResetAuthentication}
                    className="border border-zinc-850 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white text-[11px] font-mono px-4 py-3 rounded cursor-pointer transition-colors"
                  >
                    Masuk Akun Lain / Lock Deck
                  </button>
                </div>
              </div>

              {/* SLIDES SHOWCASE IN-BROWSER */}
              <div className="bg-[#0f0f0f] border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12">
                
                {/* Slides navigation Sidebar */}
                <div className="md:col-span-4 bg-[#0a0a0a] border-r border-zinc-900 p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="font-heading text-xs font-black text-zinc-400 border-b border-zinc-900 pb-2 uppercase tracking-widest">
                      URUTAN MATERI PRESTASI
                    </div>
                    
                    <nav className="space-y-1.5 max-h-[300px] overflow-y-auto pr-2">
                      {deckSlides.map((slide, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`w-full text-left p-3 rounded font-heading text-xs font-black tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                            currentSlide === idx 
                              ? 'bg-crimson/15 text-crimson border-l-4 border-crimson pl-3.5'
                              : 'text-zinc-500 hover:bg-zinc-900/45 hover:text-zinc-400'
                          }`}
                        >
                          <span className="truncate uppercase">{slide.title}</span>
                          <span className="font-mono text-[10px] text-zinc-600">0{idx + 1}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div className="pt-6 border-t border-zinc-900 mt-6 space-y-3.5">
                    <div className="space-y-1 text-xs">
                      <span className="text-zinc-600 font-mono text-[10px] uppercase block">TIM MANAJEMEN WHATSAPP TIMING</span>
                      <span className="text-white font-semibold">Olive MGMT Official Desk</span>
                    </div>

                    <a
                      href="https://wa.me/6281288805482?text=Halo%20Mbak%20Eva%20Indriyani%20dan%20Tim%20TRC,%20saya%20sudah%20membaca%20Pitch%20Deck%20GMG%20Vol%202%20dan%20ingin%20menjadwalkan%20pertemuan%20bisnis."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-transparent border border-zinc-800 hover:border-[#25D366] bg-[#111] hover:bg-zinc-900 text-white font-heading text-[10px] font-black tracking-widest py-3 rounded text-center block transition-all"
                    >
                      JADWALKAN MEETING VIA WHATSAPP →
                    </a>
                  </div>
                </div>

                {/* Slides Main View */}
                <div className="md:col-span-8 p-8 sm:p-12 min-h-[360px] flex flex-col justify-between relative bg-gradient-to-br from-zinc-950 via-[#0e0e0e] to-zinc-950">
                  
                  {/* Decorative slide number inside layout top background */}
                  <div className="absolute top-8 right-10 text-zinc-900 font-heading font-black text-7xl select-none pointer-events-none">
                    0{currentSlide + 1}
                  </div>

                  <div className="space-y-6 max-w-xl relative z-10">
                    <div className="space-y-1">
                      <span className="text-xs text-crimson font-mono uppercase tracking-widest font-black">
                        {deckSlides[currentSlide].sub}
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                        {deckSlides[currentSlide].title}
                      </h3>
                    </div>

                    <ul className="space-y-3 font-sans text-xs sm:text-sm text-steel leading-relaxed">
                      {deckSlides[currentSlide].bullets.map((bullet, bidx) => (
                        <li key={bidx} className="flex gap-2.5 items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-crimson flex-shrink-0 mt-2" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Slider bottom controls */}
                  <div className="pt-8 border-t border-zinc-900/80 mt-8 flex items-center justify-between relative z-10">
                    <button
                      onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
                      disabled={currentSlide === 0}
                      className="px-4 py-2 border border-zinc-800 rounded bg-[#111] hover:bg-zinc-900 text-xs font-heading font-bold text-white transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> PREVIOUS
                    </button>

                    <span className="text-xs font-mono text-zinc-500">
                      SLIDE {currentSlide + 1} / {deckSlides.length}
                    </span>

                    <button
                      onClick={() => setCurrentSlide((prev) => Math.min(deckSlides.length - 1, prev + 1))}
                      disabled={currentSlide === deckSlides.length - 1}
                      className="px-5 py-2 border border-zinc-800 rounded bg-crimson hover:bg-red-700 text-xs font-heading font-bold text-white transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5"
                    >
                      NEXT <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>        {/* ORGANIZATIONAL FOOTER INFO BRANDS */}
        <div className="pt-8 border-t border-zinc-900 text-center space-y-6">
          <div className="text-xs text-center max-w-xl mx-auto space-y-2">
            <h5 className="font-heading text-xs font-black text-white uppercase tracking-wider">
              SONIC HORIZON
            </h5>
            <p className="font-sans text-steel leading-relaxed">
              JL. HANJUANG I BLOK 15 NO. 25 PERUM GRIYA LOKA, BSD CITY TANGERANG<br /><br />
              <strong>EVA INDRIYANI</strong> (Ezra Simanjuntak Manager)<br />
              Email: mgmtolive22@gmail.com<br />
              WhatsApp: +62 812-8880-5482
            </p>
          </div>

          {/* INSTAGRAM CHANNELS */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              id="instagram-link-olive"
              href="https://www.instagram.com/olive.management.official/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-850 bg-zinc-950 hover:bg-zinc-900 rounded text-[11px] font-bold font-mono text-zinc-400 hover:text-white hover:border-[#E1306C] transition-all cursor-pointer group shadow-sm select-none"
            >
              <Instagram className="w-4 h-4 text-zinc-500 group-hover:text-[#E1306C] transition-colors" />
              INSTAGRAM: OLIVE MANAGEMENT
            </a>
            <a
              id="instagram-link-trc"
              href="https://www.instagram.com/therockcampusinyoface/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-850 bg-zinc-950 hover:bg-zinc-900 rounded text-[11px] font-bold font-mono text-zinc-400 hover:text-white hover:border-[#E1306C] transition-all cursor-pointer group shadow-sm select-none"
            >
              <Instagram className="w-4 h-4 text-zinc-500 group-hover:text-[#E1306C] transition-colors" />
              INSTAGRAM: THE ROCK CAMPUS
            </a>
          </div>

          <div className="pt-6 text-[11px] font-mono text-zinc-600 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span>© 2026 GUITAR MASTER GENERATION & THE ROCK CAMPUS. ALL RIGHTS RESERVED.</span>
            <span>LICENSED FROM TRC CORE TEAM • OLIVE MGMT PROUD PARTNER</span>
          </div>
        </div>

      </div>
    </section>
  );
}
