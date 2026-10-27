// data.js - Database konten edukasi, video creator, produk, dan quiz

const SKINCARE_DATA = {
  // 1. Data Bahan Aktif (Edu-Pedia)
  ingredients: [
    {
      id: 'ceramide',
      name: 'Ceramide NP / AP',
      tag: 'Skin Barrier Hero',
      desc: 'Lipid alami yang menyusun 50% pelindung kulit luar. Mengunci kelembapan dan memperbaiki dinding kulit yang rusak.',
      time: 'AM & PM (Aman setiap hari)',
      bestFor: 'Kulit sensitif, dehidrasi, iritasi, kemerahan',
      pairsWell: ['Hyaluronic Acid', 'Niacinamide', 'Centella Asiatica'],
      avoidWith: 'Tidak ada pantangan (sangat ramah kulit)',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: 'niacinamide',
      name: 'Niacinamide (Vitamin B3)',
      tag: 'Brightening & Oil Control',
      desc: 'Multitasker yang memperkuat barrier, memudarkan noda hitam bekas jerawat, serta menyeimbangkan produksi minyak.',
      time: 'AM & PM',
      bestFor: 'Kulit berminyak, pori besar, PIH/kusam',
      pairsWell: ['Zinc PCA', 'Hyaluronic Acid', 'Ceramide'],
      avoidWith: 'Vitamin C murni (L-Ascorbic Acid konsentrasi tinggi jika kulit rentan merah)',
      color: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      id: 'hyaluronic-acid',
      name: 'Hyaluronic Acid',
      tag: 'Deep Hydration Magnet',
      desc: 'Mampu menahan air hingga 1000x berat molekulnya sendiri. Membuat kulit kenyal, plumpy, dan terhidrasi mendalam.',
      time: 'AM & PM',
      bestFor: 'Kulit dehidrasi, kering, kulit berminyak dehidrasi',
      pairsWell: ['Semua bahan aktif'],
      avoidWith: 'Gunakan selalu di kulit lembap sebelum mengunci dengan pelembap',
      color: 'bg-sky-50 text-sky-800 border-sky-200'
    },
    {
      id: 'retinol',
      name: 'Retinol / Retinoid',
      tag: 'Cell Renewal & Anti-Aging',
      desc: 'Turunan Vitamin A terbaik untuk merangsang produksi kolagen, mempercepat regenerasi sel, dan menghaluskan tekstur kulit.',
      time: 'PM Saja (Malam hari, 2-3x seminggu)',
      bestFor: 'Garis halus, tekstur kasar, bekas jerawat membandel',
      pairsWell: ['Ceramide', 'Peptide', 'Hyaluronic Acid'],
      avoidWith: 'AHA/BHA (Exfoliator), Vitamin C kuat, Benzoyl Peroxide di malam yang sama',
      color: 'bg-purple-50 text-purple-800 border-purple-200'
    },
    {
      id: 'salicylic-acid',
      name: 'Salicylic Acid (BHA)',
      tag: 'Pore Cleanser & Anti-Acne',
      desc: 'Asam larut minyak yang mampu menembus ke dalam pori-pori untuk membersihkan sumbatan sebum dan mengatasi komedo.',
      time: 'PM (2-3x seminggu)',
      bestFor: 'Komedo hitam/putih, jerawat meradang, kulit bertekstur',
      pairsWell: ['Centella Asiatica', 'Niacinamide', 'Ceramide'],
      avoidWith: 'Retinol, Physical Scrub kasar, Vitamin C tinggi',
      color: 'bg-rose-50 text-rose-800 border-rose-200'
    },
    {
      id: 'centella',
      name: 'Centella Asiatica (Cica)',
      tag: 'Calming & Anti-Inflammatory',
      desc: 'Herba tradisional kaya Madecassoside yang meredakan kemerahan, peradangan jerawat, dan mempercepat pemulihan luka.',
      time: 'AM & PM',
      bestFor: 'Kulit berjerawat aktif, iritasi, rosacea, kemerahan',
      pairsWell: ['Salicylic Acid', 'Niacinamide', 'Ceramide'],
      avoidWith: 'Tidak ada pantangan khusus',
      color: 'bg-teal-50 text-teal-800 border-teal-200'
    }
  ],

  // 2. Data Video Creator & Edukasi
  videos: [
    {
      id: 'v1',
      title: '10 HIGH MAINTENANCE Beauty Habits That Will Make You Look LOW MAINTENANCE',
      creator: 'Allison Baek',
      creatorRole: 'Beauty & Lifestyle Creator',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      duration: '16:48',
      views: '1.2M views',
      category: 'Pemula (Basic 101)',
      thumbnail: 'https://i.ytimg.com/vi/vmTQMjI1y4w/hqdefault.jpg',
      badge: 'Trending Edukasi',
      summary: 'Kebiasaan perawatan diri dan beauty habits terencana yang membuat penampilan tampak segar, bersih, dan effortless tanpa riasan tebal setiap hari.',
      takeaways: [
        'Eksfoliasi tubuh berkala dan teknik dry brushing untuk sirkulasi darah serta kulit halus',
        'Facial lymphatic massage dan gua sha di pagi hari untuk mendefinisikan kontur wajah',
        'Rutinitas skincare dasar yang konsisten setiap hari: double cleansing, hidrasi, dan SPF',
        'Kerapian kuku, kebersihan gigi, dan postur tubuh sebagai pondasi tampilan percaya diri'
      ],
      youtubeId: 'vmTQMjI1y4w',
      youtubeUrl: 'https://youtu.be/vmTQMjI1y4w?si=LWDZ0UNBqtebDtJB'
    },
    {
      id: 'v2',
      title: 'How to Get GLASS Skin for Beginners | Affordable Skincare Routine & Best Korean Products',
      creator: 'Kelly',
      creatorRole: 'Skincare Educator & Reviewer',
      creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      duration: '12:15',
      views: '890K views',
      category: 'Skin Barrier',
      thumbnail: 'https://i.ytimg.com/vi/nabwuTwtlnM/hqdefault.jpg',
      badge: 'Wajib Tonton',
      summary: 'Panduan lengkap dan praktis mendapatkan kulit glowing glass skin khas Korea dengan produk ramah kantong dan teknik hidrasi barrier bertahap.',
      takeaways: [
        'Pembersihan ganda (double cleansing) lembut berbasis oil untuk meluruhkan kotoran pori',
        'Teknik layering hydrating toner pada kulit lembap untuk mengisi cadangan air sel kulit',
        'Kombinasi pelembap barrier dengan kandungan Ceramide & Hyaluronic Acid',
        'Gunakan sunscreen bertekstur ringan dengan dewy finish untuk kilau sehat terlindungi'
      ],
      youtubeId: 'nabwuTwtlnM',
      youtubeUrl: 'https://youtu.be/nabwuTwtlnM?si=2M0Bl37HWyz_xI7B'
    },
    {
      id: 'v3',
      title: 'IT GIRL GLOW UP 🌸 | 4 Easy Ways to Improve Your NATURAL Beauty',
      creator: 'Allison Baek',
      creatorRole: 'Natural Beauty & Self-Care',
      creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      duration: '10:32',
      views: '650K views',
      category: 'Rutinitas Pagi',
      thumbnail: 'https://i.ytimg.com/vi/ohD-m5HldIo/hqdefault.jpg',
      badge: 'Populer',
      summary: 'Empat langkah praktis meningkatkan kecantikan alami: penguatan skin barrier, hidrasi mendalam, perawatan bibir bernutrisi, dan postur tubuh.',
      takeaways: [
        'Fokus pada hidrasi mendalam dengan essence berbahan centella & hyaluron',
        'Perawatan bibir harian dengan lip oil bernutrisi agar tetap kenyal dan tidak pecah-pecah',
        'Peregangan leher dan postur bahu tegak untuk mempertegas garis rahang alami',
        'Penuhi hidrasi cairan tubuh minimal 2 liter per hari demi elastisitas kulit'
      ],
      youtubeId: 'ohD-m5HldIo',
      youtubeUrl: 'https://youtu.be/ohD-m5HldIo?si=EoZHdF_tAbUzFwUv'
    },
    {
      id: 'v4',
      title: "Hailey Bieber's Skincare Routine for a Super Glowy Complexion | Vogue France",
      creator: 'Vogue France (feat. Hailey Bieber)',
      creatorRole: 'Celebrity Routine & Founder of Rhode',
      creatorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      duration: '08:45',
      views: '3.4M views',
      category: 'Proteksi UV',
      thumbnail: 'https://i.ytimg.com/vi/U0svrc0TDQM/hqdefault.jpg',
      badge: 'Celebrity Choice',
      summary: 'Rahasia tampilan "glazed donut skin" ala Hailey Bieber dari Paris: hidrasi peptide intensif, barrier restore cream, dan proteksi sunscreen SPF tinggi.',
      takeaways: [
        'Aplikasikan peptide glazing fluid pada kulit setengah basah untuk efek dewy instan',
        'Kunci kelembapan dengan barrier restoring cream kaya lipid sebelum makeup',
        'Gunakan sunscreen SPF 50+ secara merata pada seluruh area wajah, leher, dan telinga',
        'Sentuhan lembut tanpa menggosok kasar demi mencegah degradasi kolagen'
      ],
      youtubeId: 'U0svrc0TDQM',
      youtubeUrl: 'https://youtu.be/U0svrc0TDQM?si=OS3ShTrPJl6kzpA5'
    },
    {
      id: 'v5',
      title: 'Best Korean Skincare Routine for Glass Skin | Deep Active Ingredients Guide',
      creator: 'Kelly',
      creatorRole: 'K-Beauty Formulator Review',
      creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      duration: '12:15',
      views: '890K views',
      category: 'Bahan Aktif',
      thumbnail: 'https://i.ytimg.com/vi/nabwuTwtlnM/hqdefault.jpg',
      badge: 'Bahan Aktif',
      summary: 'Eksplorasi mendalam bahan aktif andalan K-Beauty: Centella Asiatica, Niacinamide, Rice Ferment, dan Snail Mucin untuk memperbaiki tekstur kulit.',
      takeaways: [
        'Centella Asiatica (Cica) untuk meredakan kemerahan dan menenangkan inflamasi',
        'Niacinamide kadar aman 2-5% untuk memperkecil pori dan mencerahkan pigmentasi',
        'Kandungan Rice Water / Ferment untuk hidrasi mendalam dan efek skin brightening',
        'Hindari mencampur terlalu banyak bahan aktif berkadar tinggi dalam satu sesi'
      ],
      youtubeId: 'nabwuTwtlnM',
      youtubeUrl: 'https://youtu.be/nabwuTwtlnM?si=N4Wv8DKg57BUXG1W'
    },
    {
      id: 'v6',
      title: 'My Simple BUT EFFECTIVE Skincare Routine! (Clear Skin & Dark Spots)',
      creator: 'Allison Baek',
      creatorRole: 'Beauty & Skincare Creator',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      duration: '11:22',
      views: '420K views',
      category: 'Acne & Jerawat',
      thumbnail: 'https://i.ytimg.com/vi/s1wBdcNXdCM/hqdefault.jpg',
      badge: 'Acne & Blemish',
      summary: 'Rutinitas perawatan wajah sederhana namun sangat terbukti efektif untuk merawat kulit rentan berjerawat dan memudarkan hiperpigmentasi pasca jerawat (PIH).',
      takeaways: [
        'Pembersih wajah ber-pH seimbang bebas surfat kasar agar jerawat tidak meradang',
        'Serum pencerah lembut berbahan Licorice Extract dan Niacinamide untuk flek noda hitam',
        'Pelembap bertekstur gel ringan yang non-comedogenic dan cepat meresap',
        'Kunci utama penyembuhan kulit: disiplin dan konsistensi minimal 4 minggu berturut-turut'
      ],
      youtubeId: 's1wBdcNXdCM',
      youtubeUrl: 'https://youtu.be/s1wBdcNXdCM?si=nBeWzwA6PgIhWSoA'
    }
  ],

  // 3. Data Katalog Produk (Edukatif & Informatif - Tidak Dijual)
  products: [
    {
      id: 'p1',
      name: 'Madagascar Centella Hyalu-Cica Water-Fit Sun Serum',
      brand: 'SKIN1004',
      category: 'Sunscreen',
      skinTypes: ['Semua Jenis Kulit', 'Sensitif', 'Kering', 'Normal'],
      concerns: ['Dehidrasi', 'Kulit Sensitif', 'Perlindungan UV'],
      image: 'assets/images/[SKIN10004]_HyaluCicaWaterFitSunSerum.jpeg',
      priceEst: 'Rp 145.000',
      size: '50 ml',
      badge: 'SPF 50+ PA++++',
      keyIngredients: ['Centella Asiatica Extract', 'Hyaluronic Acid', 'Niacinamide','Green Tea Extract'],
      shortDesc: 'Sunscreen kimia (chemical) bertekstur mirip serum yang sangat ringan, cepat menyerap, dan memberikan hidrasi maksimal tanpa meninggalkan white cast atau rasa lengket.',
      howToUse: 'Gunakan sebagai langkah terakhir dalam rutinitas perawatan wajah pagi Anda. Ambil produk sebanyak dua ruas jari, lalu oleskan secara merata ke seluruh wajah dan leher. Biarkan menyerap sebelum menggunakan makeup. Aplikasikan kembali setiap 2-3 jam jika berada di bawah paparan sinar matahari.',
      whenToUse: 'Pagi (AM)',
      avoidCombine: 'Tidak ada pantangan',
      whyWeLoveIt: 'Teksturnya yang selembut serum tidak menyumbat pori-pori, memberikan hasil akhir dewy/glowing alami, sangat nyaman di bawah makeup, serta ramah lingkungan (Reef Safe).'
    },
    {
    id: 'p2',
    name: 'Touche Éclat Glow-Pact Cushion',
    brand: 'Yves Saint Laurent',
    category: 'Cushion',
    skinTypes: ['Kulit Sensitif', 'Jerawat & Minyak', 'Kulit Kering & Dehidrasi'],
    concerns: ['Warna Kulit Tidak Merata', 'Kulit Kusam', 'Tekstur Kasar'],
    image: 'assets/images/[YSL]_Touche Éclat Glow-Pact Cushion.png',
    priceEst: 'Rp 1.150.000',
    size: '12 g',
    badge: 'Luminous Glow',
    keyIngredients: ['Hyaluronic Acid', 'Jasmine Flower Extract', 'Tocopherol (Vitamin E)','Glycerin'],
    shortDesc: 'Cushion foundation dengan formula mesh eksklusif yang memberikan hasil akhir mencerahkan, kelembapan tinggi, dan kilau alami yang tahan lama sepanjang hari.',
    howToUse: 'Tekan puff secara perlahan ke atas jaringan mesh cushion untuk mengambil produk. Tepuk-tepukkan lembut ke seluruh wajah mulai dari bagian tengah ke arah luar hingga merata dan mencapai tingkat coverage yang diinginkan.',
    whenToUse: 'Pagi (AM) / Sesuai Kebutuhan',
    avoidCombine: 'Tidak ada pantangan',
    whyWeLoveIt: 'Kemasan kuilt pink chevron yang sangat elegan dengan formula ringan yang menyamarkan noda tanpa terasa tebal serta memberikan efek dewy yang tampak sehat alami.'
    },
    {
    id: 'p3',
    name: 'Rouge Blush',
    brand: 'Dior',
    category: 'Powder Blush',
    skinTypes: ['Semua Jenis Kulit', 'Sensitif', 'Kering', 'Berminyak', 'Kombinasi'],
    concerns: ['Kusam & Bekas Jerawat'],
    image: 'assets/images/[DIOR]_Rouge Blush.png',
    priceEst: 'Rp 950.000',
    size: '6.7 g',
    badge: 'Long-Wear Color',
    keyIngredients: ['Iris Extract','Wild Pansy Extract','Red Hibiscus Extract','Mineral Pigments'],
    shortDesc: 'Powder blush ultra-pigmented yang memberikan rona alami pada pipi dengan ketahanan lama dan formula yang nyaman di kulit.',
    howToUse: 'Gunakan kuas bawaan untuk mengambil produk secukupnya. Usapkan lembut pada tulang pipi dengan gerakan memutar atau ke arah atas sesuai bentuk wajah yang diinginkan.',
    whenToUse: 'Sesuai Kebutuhan',
    avoidCombine: 'Tidak ada pantangan',
    whyWeLoveIt: 'Tekstur serbuknya sangat halus dan menyatu sempurna dengan kulit tanpa mempertegas tekstur, memberikan tampilan rona pipi segar yang tahan seharian.'
    },
  ],

  // 4. Data Kuis Kondisi Kulit (Interactive Skin Diagnostic)
  quizQuestions: [
    {
      id: 1,
      question: 'Bagaimana kondisi kulit wajahmu sekitar 1-2 jam setelah cuci muka (tanpa menggunakan skincare apa pun)?',
      description: 'Ini membantu menentukan jenis dasar kulitmu.',
      options: [
        {
          id: 'oily',
          label: 'Mengilap di seluruh wajah',
          desc: 'Terasa berminyak di dahi, hidung, pipi, dan dagu.',
          skinType: 'Berminyak (Oily)'
        },
        {
          id: 'combination',
          label: 'Berminyak di T-Zone saja',
          desc: 'Dahi dan hidung berkilau, namun pipi terasa normal atau kering.',
          skinType: 'Kombinasi (Combination)'
        },
        {
          id: 'dry',
          label: 'Terasa kencang dan tertarik',
          desc: 'Kulit terasa kering, kusam, terkadang ada bagian yang mengelupas.',
          skinType: 'Kering (Dry)'
        },
        {
          id: 'normal',
          label: 'Terasa nyaman dan seimbang',
          desc: 'Tidak terlalu berminyak maupun kering, tekstur kulit halus merata.',
          skinType: 'Normal'
        },
        {
          id: 'sensitive',
          label: 'Mudah merah, gatal, atau perih',
          desc: 'Bereaksi sangat cepat terhadap air dingin/panas atau gesekan.',
          skinType: 'Sensitif (Sensitive)'
        }
      ]
    },
    {
      id: 2,
      question: 'Apa masalah utama kulit yang paling ingin kamu perbaiki saat ini?',
      description: 'Pilih target utama perawatanmu agar formula aktif yang disarankan tepat sasaran.',
      options: [
        {
          id: 'barrier',
          label: 'Skin barrier rusak & kemerahan',
          desc: 'Kulit mudah perih saat terkena skincare, sering merah, dan dehidrasi parah.',
          focus: 'Perbaikan Barrier & Anti-Iritasi'
        },
        {
          id: 'acne',
          label: 'Jerawat aktif, bruntusan, & komedo',
          desc: 'Pori-pori sering tersumbat dan muncul jerawat meradang.',
          focus: 'Pembersihan Pori & Regulasi Sebum'
        },
        {
          id: 'dull',
          label: 'Kulit kusam & noda bekas jerawat (PIH/PIE)',
          desc: 'Warna kulit tidak merata, bekas jerawat gelap membandel.',
          focus: 'Mencerahkan & Meratakan Warna Kulit'
        },
        {
          id: 'aging',
          label: 'Garis halus, kendur, & tanda penuaan',
          desc: 'Kulit kehilangan elastisitas dan tekstur terasa mulai berkurang kekenyalannya.',
          focus: 'Regenerasi Kolagen & Anti-Aging'
        }
      ]
    },
    {
      id: 3,
      question: 'Seberapa sensitif atau reaktif kulitmu terhadap produk baru atau perubahan cuaca?',
      description: 'Tingkat sensitivitas menentukan konsentrasi bahan aktif yang aman untukmu.',
      options: [
        {
          id: 'low',
          label: 'Sangat tangguh (Jarang iritasi)',
          desc: 'Hampir tidak pernah merasa perih saat mencoba produk baru.',
          tolerance: 'Tinggi (Bisa toleran bahan aktif kuat)'
        },
        {
          id: 'medium',
          label: 'Sensitivitas sedang',
          desc: 'Kadang bereaksi jika persentase asam eksfoliasi terlalu tinggi atau berparfum.',
          tolerance: 'Sedang (Perlu patch test dan introduksi bertahap)'
        },
        {
          id: 'high',
          label: 'Sangat sensitif & mudah meradang',
          desc: 'Sering perih bahkan dengan produk berlabel gentle, mudah flare-up.',
          tolerance: 'Rendah (Wajib formula hypoallergenic & tanpa pewangi)'
        }
      ]
    },
    {
      id: 4,
      question: 'Bagaimana lingkungan dan rutinitas harianmu yang paling dominan?',
      description: 'Lingkungan menentukan kebutuhan antioksidan dan proteksi UV harian.',
      options: [
        {
          id: 'outdoor',
          label: 'Sering di luar ruangan / terpapar matahari langsung',
          desc: 'Banyak beraktivitas di jalan, olahraga outdoor, atau terkena polusi.',
          env: 'Tinggi Paparan UV & Polusi'
        },
        {
          id: 'indoor_ac',
          label: 'Mayoritas di dalam ruangan ber-AC & depan layar gadget',
          desc: 'Udara dingin kering menyerap kelembapan dan paparan blue light tinggi.',
          env: 'Tinggi Risiko Dehidrasi Ruang AC'
        },
        {
          id: 'balanced',
          label: 'Seimbang antara kegiatan dalam & luar ruangan',
          desc: 'Mobilitas normal dengan paparan sinar matahari terukur.',
          env: 'Paparan Seimbang'
        }
      ]
    },
    {
      id: 5,
      question: 'Gaya rutinitas skincare seperti apa yang paling realistis dan konsisten untukmu?',
      description: 'Rutinitas terbaik adalah rutinitas yang benar-benar kamu lakukan setiap hari.',
      options: [
        {
          id: 'minimalist',
          label: 'Minimalist (3 Langkah Cepat)',
          desc: 'Bersihkan, Lembapkan, Lindungi (CMP). Cepat, praktis, kurang dari 3 menit.',
          style: 'Skinimalism 3 Langkah'
        },
        {
          id: 'balanced_steps',
          label: 'Seimbang (4 Langkah Lengkap)',
          desc: 'Cleanser + Toner/Serum targeted + Moisturizer + Sunscreen.',
          style: 'Harmonis 4 Langkah'
        },
        {
          id: 'dedicated',
          label: 'Perawatan Menyeluruh (5-6 Langkah)',
          desc: 'Double cleansing, essence, serum ganda, eye cream, moisturizer, & masker.',
          style: 'Comprehensive Ritual'
        }
      ]
    }
  ]
};