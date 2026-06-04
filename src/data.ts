import { Juror, TourPoint, AuditionZone, InvestmentItem } from './types';

export const statsGMGVol1 = {
  title: "GMG Vol. 1 Legacy (2022)",
  venue: "Beyond Bar, Senayan",
  highlights: [
    "Diikuti lebih dari 450+ peserta audisi online dari seluruh penjuru Indonesia",
    "Melambungkan nama virtuoso gitar muda berbakat yang kini aktif di industri nasional",
    "Tiket Grand Final terjual habis (Sold Out) dengan ratusan penonton memadati lokasi",
    "Liputan media rock nasional dan dukungan penuh dari komunitas musisi senior"
  ]
};

export const statsTRCPowerhouse = [
  {
    number: "11 TAHUN",
    label: "Konsistensi Rock Mandiri",
    desc: "Menghidupi ekosistem rock grassroot secara mandiri sejak tahun 2015."
  },
  {
    number: "167 EPISODE",
    label: "Konsistensi Tanpa Batas",
    desc: "Sukses diselenggarakan berkelanjutan tanpa bergantung pada sponsor rokok tunggal."
  },
  {
    number: "800+ BAND",
    label: "Panggung Terbuka",
    desc: "Menjadi kawah candradimuka band indie, rising stars, hingga legenda rock nasional."
  }
];

export const javaTourPoints: TourPoint[] = [
  // Club to Club (8 Titik) - Biru
  { city: "Jakarta Selatan", type: "Club to Club", venue: "", highlight: false },
  { city: "Bogor", type: "Club to Club", venue: "", highlight: false },
  { city: "Jakarta Utara", type: "Club to Club", venue: "", highlight: false },
  { city: "Depok", type: "Club to Club", venue: "", highlight: false },
  { city: "Jakarta Timur", type: "Club to Club", venue: "", highlight: false },
  { city: "Tangerang", type: "Club to Club", venue: "", highlight: false },
  { city: "Bekasi", type: "Club to Club", venue: "", highlight: false },
  { city: "Bandung", type: "Club to Club", venue: "", highlight: false },
  
  // City to City (3 Titik) - Merah
  { city: "Semarang", type: "City to City", venue: "", highlight: true },
  { city: "Jogja", type: "City to City", venue: "", highlight: true },
  { city: "Solo", type: "City to City", venue: "", highlight: true },

  // Klimaks City to City (1 Titik) - Gold
  { city: "Surabaya", type: "Klimaks", venue: "", highlight: true }
];

export const auditionZones: AuditionZone[] = [
  {
    id: "sumatera",
    region: "SUMATERA",
    zones: [
      "Zona A : Sumatera Utara dan Aceh (Pusat Seleksi Utara)",
      "Zona B : Sumatera Barat, Riau, Jambi, Kep. Riau (Pusat Seleksi Barat & Tengah)",
      "Zona C : Sumatera Selatan, Lampung, Bengkulu (Pusat Seleksi Selatan)"
    ],
    liveAuditionVenue: "PANDORA (JAKARTA)",
    details: "Dari tiap Zona (A, B, C) dipilih masing-masing 3 perwakilan untuk mengikuti babak Live Audition langsung di Jakarta (PANDORA). Di panggung Live Audition, juri akan memilih 1 pemenang final untuk mewakili masing-masing zona. Seluruh biaya transportasi dan akomodasi ditanggung penuh oleh panitia."
  },
  {
    id: "kalimantan",
    region: "KALIMANTAN",
    zones: [
      "Zona A : Kalimantan Barat, Kalimantan Tengah, Kalimantan Selatan",
      "Zona B : Kalimantan Utara, Kalimantan Timur"
    ],
    liveAuditionVenue: "SEMARANG",
    details: "Dari tiap Zona (A, B) dipilih masing-masing 3 perwakilan untuk mengikuti babak Live Audition langsung di Semarang. Di panggung Live Audition, juri akan memilih 1 pemenang final untuk mewakili masing-masing zona. Seluruh biaya transportasi dan akomodasi ditanggung penuh oleh panitia."
  },
  {
    id: "sulawesi",
    region: "SULAWESI",
    zones: [
      "Zona A : Sulawesi Tengah, Gorontalo, Sulawesi Utara",
      "Zona B : Sulawesi Barat, Sulawesi Selatan, Sulawesi Tenggara"
    ],
    liveAuditionVenue: "JOGJAKARTA",
    details: "Dari tiap Zona (A, B) dipilih masing-masing 3 perwakilan untuk mengikuti babak Live Audition langsung di Jogjakarta. Di panggung Live Audition, juri akan memilih 1 pemenang final untuk mewakili masing-masing zona. Seluruh biaya transportasi dan akomodasi ditanggung penuh oleh panitia."
  },
  {
    id: "bali",
    region: "BALI",
    zones: [
      "Wilayah Bali (Tanpa pembagian zona)"
    ],
    liveAuditionVenue: "SOLO",
    details: "Dipilih total 3 perwakilan dari Bali untuk mengikuti babak Live Audition langsung di Solo. Dari 3 peserta tersebut, juri akan memilih 1 pemenang final terbaik untuk mewakili Bali. Seluruh biaya transportasi dan akomodasi ditanggung penuh oleh panitia."
  },
  {
    id: "jawa",
    region: "JAWA (PUSAT TUR 12 TITIK)",
    zones: [
      "8 Titik Pertunjukan di Jabodetabek & Bandung (Club to Club)",
      "4 Titik Konser di Semarang, Yogyakarta, Solo & Surabaya (City to City)"
    ],
    liveAuditionVenue: "12 LOKASI TUR KOTA JAWA (ON THE ROAD)",
    details: "Rute Pulau Jawa terintegrasi secara langsung dengan jadwal tur konser The Rock Campus 2026. Kompetisi berjalan live di atas panggung konser TRC di hadapan ribuan crowd rock lokal!"
  }
];

export const mainJudges: Juror[] = [
  {
    id: "ezra",
    name: "EZRA SIMANJUNTAK",
    role: "Main Judge & TRC Founder",
    band: "ZiFactor",
    bio: "Pioneer gitar metal progresif Indonesia, pendiri utama The Rock Campus yang gigih melestarikan gerakan rock independen selama 11 tahun tanpa lelah.",
    imageUrl: "https://img.okezone.com/content/2019/10/06/205/2113524/konser-untuk-republik-dicibir-ezra-simanjuntak-angkat-bicara-Y25Kh7K411.jpg",
    articleUrl: "https://celebrity.okezone.com/read/2019/10/06/205/2113524/konser-untuk-republik-dicibir-ezra-simanjuntak-angkat-bicara",
    specialty: "High-Speed Arpeggios, Metal Composition, Industry Mentorship"
  },
  {
    id: "pay",
    name: "PAY BURMAN",
    role: "Main Judge",
    band: "BIP / Ex-Slank",
    bio: "Komposer legendaris Indonesia sekaligus gitaris yang membentuk peta musik rock nasional. Pencipta puluhan hits tersohor di tanah air.",
    imageUrl: "https://yt3.googleusercontent.com/ytc/AIdro_lZ4JyYUUH-yZY_c1xGPv9QwR872p7xn4XoCvOl-o0DDbg=s900-c-k-c0x00ffffff-no-rj",
    articleUrl: "https://www.youtube.com/@JendralMaya",
    specialty: "Melodic Hooks, Record Production, Harmonic Phrasing"
  },
  {
    id: "eet",
    name: "EET SJAHRANIE",
    role: "Main Judge",
    band: "Edane",
    bio: "Ikon dewa gitar Indonesia yang dikenal dengan riff-riff rock yang eksplosif, tone gitar berkarakter kuat, dan tingkat showmanship panggung tiada tanding.",
    imageUrl: "https://imgsrv2.voi.id/3GqmWhYxjjjnAlAN2TKlWm9ZwtkEPajsTt_QR5dnuzo/rs:fill/w:800/h:450/g:sm/wm:1:nowe:0:0:1/bG9jYWw6Ly8vcHVibGlzaGVycy8xNzQwNjUvMjAyMjA2MDEwOTQ1LW1vYmlsZS5jcm9wcGVkXzE2NTQwNTE1NTQuanBn.jpg",
    articleUrl: "https://voi.id/lifestyle/174065/30-tahun-edane-berdiri-kenali-lebih-dalam-sosok-spesial-bernama-eet-sjahranie",
    specialty: "Aggressive Riffing, Rock Tone Structuring, Stage Presence"
  },
  {
    id: "budjana",
    name: "DEWA BUDJANA",
    role: "Main Judge",
    band: "GIGI",
    bio: "Virtuoso gitar jazz-rock kontemporer dengan reputasi global. Piawai merajut harmoni tradisional Indonesia dengan improvisasi jazz modern yang magis.",
    imageUrl: "https://assetd.kompas.id/e76P592q0jdH32WGQad_Xj1OvTQ=/1024x645/smart/filters:format(webp):quality(80)/https://silo.kompas.id/wp-content/uploads/2020/10/dewa-budjana_1604116319.jpg",
    articleUrl: "https://www.kompas.id/artikel/dewa-budjana-spektrum-warna",
    specialty: "Ethnic Fusions, Sophisticated Modulations, Chord Voicing"
  },
  {
    id: "balawan",
    name: "I WAYAN BALAWAN",
    role: "Main Judge",
    band: "Batuan Ethnic Fusion",
    bio: "Terkenal di dunia internasional sebagai pelopor teknik 8-finger touch tapping menggunakan gitar leher ganda (double-neck). Maestro sejati.",
    imageUrl: "https://assets-a1.kompasiana.com/items/album/2020/01/03/img-20191130-wa0021-5e0eec37097f362034410472.jpg?t=o&v=1200",
    articleUrl: "https://www.kompasiana.com/benang_merah/5e0ef5f3d541df24f064f5a2/interview-session-balawan-youtube-channel-a-musical-diary",
    specialty: "8-Finger Double-Neck Tapping, Balinese Gamelan Tonalities, Speed"
  }
];

export const auditionJudges: Juror[] = [
  {
    id: "irvan",
    name: "IRVAN BORNEO",
    role: "Audition Judge",
    bio: "Gitaris keras multi-genre, session player papan atas Indonesia, serta pendidik gitar kawakan yang sangat jeli menilai potensi talenta muda.",
    imageUrl: "https://www.ibanez.com/common/product_artist_file/file/a_main_IrvanBorneo.jpg",
    articleUrl: "https://www.ibanez.com/na/artists/detail/1807.html",
    specialty: "Musical Dynamics, Finger Workouts, Live Comping Techniques"
  },
  {
    id: "jikun",
    name: "JIKUN RIFF",
    role: "Audition Judge",
    band: "/rif",
    bio: "Gitaris grup legendaris /rif dengan gaya riffing groovy yang khas, eksentrik, berenergi tinggi, dan sarat raungan distorsi bertenaga.",
    imageUrl: "https://cdn0-production-images-kly.akamaized.net/MbIgfEGzGr3I5pbs4KuZNV1GAqg=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3474486/original/008910800_1622980105-Jikun.jpg",
    articleUrl: "https://www.liputan6.com/showbiz/read/4575072/jikun-rif-ceritakan-pengalamannya-sebagai-gitaris-dalam-buku-bara-dalam-bait",
    specialty: "Classic Rock Crunch, Stage Dynamics, Guitar Chemistry"
  },
  {
    id: "gugun",
    name: "GUGUN",
    role: "Audition Judge",
    band: "Gugun Blues Shelter",
    bio: "Frontman blues-rock papan atas peraih penghargaan internasional yang menguasai ritme funk, ketukan blues yang sensual, serta improvisasi gitar nan liar.",
    imageUrl: "https://assetd.kompas.id/pkKwavOxxGJqgmOQN1dX7LQuic8=/1024x657/smart/filters:format(webp):quality(80)/https://silo.kompas.id/wp-content/uploads/2020/01/f71a9967-aef3-4c2e-b412-3bfa1a8f99ac_jpg.jpg",
    articleUrl: "https://www.kompas.id/artikel/lagu-lagu-paling-spesial-gugun-blues-shelter",
    specialty: "Blues Improvisations, Triadic Rhythms, Texas Clean Sound"
  }
];

export const investmentBreakdowns: InvestmentItem[] = [
  {
    category: "Club to Club Tour (8 Titik Jawa)",
    amount: "Rp 660.000.000",
    percentage: 10,
    details: "Panggung intim, audisi tertutup, kualifikasi klub, promosi akar rumput terintegrasi, audio-visual multitrack rekaman langsung."
  },
  {
    category: "City to City Concerts (4 Titik Jawa)",
    amount: "Rp 3.440.000.000",
    percentage: 52,
    details: "Konser luar ruangan/hall berbayar di Semarang, Yogyakarta, dan Solo. Aktivasi panggung utama, sewa videotron & audio standar tinggi."
  },
  {
    category: "Final Klimaks (Surabaya Arena)",
    amount: "Rp 2.500.000.000",
    percentage: 38,
    details: "Panggung puncak spektakuler nasional di Surabaya Convention Center. Kolaborasi orkestra rock, jamming maestro juri, serta penahbisan juara utama."
  }
];

export const sponsorBenefits = [
  {
    id: "logo",
    title: "Omnipresent Logo Placement",
    desc: "Penempatan logo brand sponsor secara eksklusif dan strategis pada merchandise resmi, kaus tur, baliho jalan utama, poster harian, backdrop panggung fisik, dan LED Videotron raksasa di 12 titik pertunjukan.",
    tag: "Brand Exposure"
  },
  {
    id: "mention",
    title: "Organic MC Mention 'Intermezo Dulu'",
    desc: "Pemberatan verbal secara organik oleh pemandu acara (MC) di setiap panggung pertunjukan dengan menggunakan slogan khas 'Intermezo Dulu'. Menjamin awareness brand melekat erat dalam benak penonton.",
    tag: "Aktivasi Crowd"
  },
  {
    id: "digital",
    title: "Digital Promo Campaign",
    desc: "Suntikan promosi harian, video shorts, dan reels di kanal resmi YouTube & Instagram milik The Rock Campus, serta unggahan video khusus oleh Ezra Simanjuntak dan maestro juri virtuoso berkekuatan jutaan audiens.",
    tag: "Digital Reach"
  },
  {
    id: "booth",
    title: "Primary 3D Booth Space",
    desc: "Sponsor dimanjakan dengan alokasi ruang pameran/booth terluas (Prime Location) di setiap ajang konser daerah untuk melakukan penjualan langsung, demo produk, survei konsumen, dan promosi kreatif.",
    tag: "Direct Sales"
  }
];
