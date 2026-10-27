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
      title: 'Skin Barrier Rusak vs Dehidrasi: Cara Mengenali & Memperbaikinya dalam 14 Hari',
      creator: 'dr. Sarah Jenidrs, Sp.D.V.E',
      creatorRole: 'Dermatologist & Skin Educator',
      creatorAvatar: 'https://images.unsplash.com/photo-1594824813639-959929d2b78a?auto=format&fit=crop&w=150&q=80',
      duration: '14:20',
      views: '142K views',
      category: 'Skin Barrier',
      thumbnail: 'assets/images/creator_dermatologist.jpg',
      badge: 'Expert Choice',
      summary: 'Banyak orang mengira kulitnya berjerawat padahal lapisan skin barrier-nya yang rusak karena over-exfoliasi. Simak tanda-tanda kerusakan barrier dan protokol pemulihan 2 minggu.',
      takeaways: [
        'Hentikan seluruh eksfoliasi dan retinol sementara',
        'Gunakan teknik "Moisture Sandwich" dengan Ceramide',
        'Cuci muka dengan pembersih ber-pH seimbang tanpa busa berlebih',
        'Selalu pakai sunscreen mineral saat keluar ruangan'
      ],
      youtubeId: 'dQw4w9WgXcQ' // placeholder video ID
    },
    {
      id: 'v2',
      title: 'Clean Beauty Morning Routine: 4 Langkah Simpel untuk Kulit Glowing Alami',
      creator: 'Nadia Larasati',
      creatorRole: 'Certified Aesthetician & Creator',
      creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      duration: '09:45',
      views: '98K views',
      category: 'Rutinitas Pagi',
      thumbnail: 'assets/images/creator_routine.jpg',
      badge: 'Populer',
      summary: 'Rutinitas pagi hari tidak perlu rumit dengan 10 tahapan. Fokus pada perlindungan antioksidan, hidrasi ringan, dan sunscreen yang nyaman tanpa whitecast.',
      takeaways: [
        'Membasuh wajah dengan air hangat kuku di pagi hari',
        'Aplikasikan hydrating essence saat kulit masih setengah basah',
        'Gunakan takaran sunscreen 2 jari secara merata',
        'Tunggu 5 menit sebelum menggunakan makeup'
      ],
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: 'v3',
      title: 'Panduan Pemula Pakai Retinol: Jadwal, Dosis, & Mencegah Purging Parah',
      creator: 'Clara Kimberly',
      creatorRole: 'Skincare Formulator & Reviewer',
      creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      duration: '18:12',
      views: '215K views',
      category: 'Bahan Aktif',
      thumbnail: 'assets/images/creator_retinol.jpg',
      badge: 'Wajib Tonton',
      summary: 'Retinol adalah bahan emas anti-aging, tetapi salah pakai bisa memicu iritasi dan breakout. Pelajari teknik sandwich method dan tips layering yang benar.',
      takeaways: [
        'Mulai dengan kadar 0.1% - 0.2% seminggu sekali',
        'Gunakan metode sandwich: pelembap - retinol - pelembap',
        'Hindari area kelopak mata dan sudut bibir',
        'Wajib sunscreen SPF 50 di keesokan paginya'
      ],
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: 'v4',
      title: 'Perbedaan Jerawat Fungal Acne, Bakterial, & Hormonal serta Cara Mengatasinya',
      creator: 'dr. Aris Munandar',
      creatorRole: 'Clinical Dermatologist',
      creatorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80',
      duration: '16:05',
      views: '180K views',
      category: 'Acne & Jerawat',
      thumbnail: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      badge: 'Edukasi Klinis',
      summary: 'Tidak semua bruntusan itu jerawat biasa. Membedakan fungal acne (Malassezia folliculitis) dari jerawat hormonal sangat penting agar pemilihan bahan aktif tidak salah.',
      takeaways: [
        'Fungal acne gatal dan ukurannya seragam di dahi/dada',
        'Hindari minyak alami (oil) untuk penderita fungal acne',
        'BHA 2% sangat efektif untuk sumbatan komedo hormonal',
        'Konsultasi dokter jika jerawat kistik meradang hebat'
      ],
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: 'v5',
      title: 'Mitos vs Fakta Sunscreen: Berapa Banyak Takaran & Kapan Harus Re-apply?',
      creator: 'Amanda Vania',
      creatorRole: 'Beauty Educator',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      duration: '11:30',
      views: '76K views',
      category: 'Proteksi UV',
      thumbnail: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
      badge: 'Tips Praktis',
      summary: 'Apakah sunscreen di dalam ruangan tetap wajib? Apakah makeup ber-SPF sudah cukup melindungi kulit? Simak penjelasan ilmiah mengenai sinar UV-A dan UV-B.',
      takeaways: [
        'Sinar UVA dapat menembus kaca jendela dan merusak kolagen',
        'SPF makeup tidak pernah cukup tebal untuk perlindungan optimal',
        'Gunakan sunscreen spray atau cushion SPF untuk re-apply di atas riasan',
        'PA++++ menandakan perlindungan maksimal terhadap penuaan dini'
      ],
      youtubeId: 'dQw4w9WgXcQ'
    },
    {
      id: 'v6',
      title: 'Skincare Minimalis: Konsep "Skinimalism" yang Bikin Kulit Tenang & Sehat',
      creator: 'Elina Salim',
      creatorRole: 'Holistic Skin Enthusiast',
      creatorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      duration: '12:40',
      views: '110K views',
      category: 'Pemula (Basic 101)',
      thumbnail: 'https://images.unsplash.com/photo-1512290900672-1f419b4bb47e?auto=format&fit=crop&w=800&q=80',
      badge: 'Mindful Care',
      summary: 'Mengapa menggunakan terlalu banyak produk justru membuat kulit kewalahan? Pendekatan skinimalism mengajarkan kita mendengarkan apa yang benar-benar dibutuhkan kulit.',
      takeaways: [
        'Tiga pilar dasar: Cleanse, Moisturize, Protect (CMP)',
        'Beri jeda minimal 28 hari saat mencoba produk baru',
        'Kurangi stress dan prioritaskan tidur nyenyak 7 jam',
        'Kulit sehat memiliki pori-pori dan tekstur alami'
      ],
      youtubeId: 'dQw4w9WgXcQ'
    }
  ],

  // 3. Data Katalog Produk (Edukatif & Informatif - Tidak Dijual)
  products: [
    {
      id: 'p1',
      name: 'Gentle Botanical Cleansing Gel',
      brand: 'Terra Botanica',
      category: 'Cleanser',
      skinTypes: ['Semua Jenis Kulit', 'Sensitif', 'Berminyak'],
      concerns: ['Kulit Sensitif', 'Jerawat & Minyak'],
      image: 'assets/images/product_cleanser.jpg',
      rating: 4.9,
      reviewsCount: 312,
      priceEst: 'Rp 125.000',
      size: '200 ml',
      badge: 'pH 5.5 Balanced',
      keyIngredients: ['Oat Extract', 'Centella Asiatica', 'Glycerin', 'Amino Acid Surfactant'],
      shortDesc: 'Pembersih wajah bertekstur gel lembut dengan busa mikro alami yang tidak mengikis barrier kelembapan kulit.',
      howToUse: 'Basahi wajah dengan air hangat. Tuangkan 1 pump ke telapak tangan, busakan lembut lalu pijat ke wajah selama 60 detik. Bilas hingga bersih.',
      whenToUse: 'Pagi (AM) & Malam (PM)',
      avoidCombine: 'Tidak ada pantangan',
      whyWeLoveIt: 'Bebas SLS/SLES, tidak meninggalkan sensasi kulit ketarik atau kesat kering.'
    },
    {
      id: 'p2',
      name: 'Calming Green Tea Essence Toner',
      brand: 'Botanical Calm',
      category: 'Toner',
      skinTypes: ['Kombinasi', 'Berminyak', 'Sensitif'],
      concerns: ['Kemerahan & Barrier', 'Jerawat & Minyak'],
      image: 'assets/images/product_toner.jpg',
      rating: 4.8,
      reviewsCount: 245,
      priceEst: 'Rp 145.000',
      size: '100 ml',
      badge: 'Anti-Redness',
      keyIngredients: ['82% Green Tea Water', 'Madecassoside', 'Panthenol 2%', 'Allantoin'],
      shortDesc: 'Toner esens berair yang kaya antioksidan polifenol untuk menenangkan kulit meradang dan menyeimbangkan kadar air-minyak.',
      howToUse: 'Tuangkan secukupnya pada telapak tangan atau kapas lembut, tepuk-tepuk perlahan ke seluruh wajah dan leher hingga meresap sempurna.',
      whenToUse: 'Pagi (AM) & Malam (PM)',
      avoidCombine: 'Bisa dipadukan dengan semua bahan aktif.',
      whyWeLoveIt: 'Sangat menyegarkan tanpa aroma sintetis, langsung meredakan kemerahan.'
    },
    {
      id: 'p3',
      name: 'Hydrating Peptide & Ceramide Serum',
      brand: 'Lumière Botanics',
      category: 'Serum',
      skinTypes: ['Kering', 'Dehidrasi', 'Normal', 'Sensitif'],
      concerns: ['Kulit Kering', 'Garis Halus', 'Kulit Sensitif'],
      image: 'assets/images/hero.jpg',
      rating: 5.0,
      reviewsCount: 420,
      priceEst: 'Rp 185.000',
      size: '30 ml',
      badge: 'Editor Pick',
      keyIngredients: ['5 Multi-Ceramides', 'Oligopeptide-1', 'Hyaluronic Acid Multi-Molecular', 'Trehalose'],
      shortDesc: 'Serum konsentrat tinggi yang memperbaiki arsitektur pelindung kulit, menghidrasi hingga lapisan terdalam, dan mengembalikan kekenyalan.',
      howToUse: 'Gunakan 3-4 tetes serum setelah toner. Ratakan ke wajah dengan gerakan memijat ke atas secara lembut.',
      whenToUse: 'Pagi (AM) & Malam (PM)',
      avoidCombine: 'Sangat aman digabung dengan Retinol atau Eksfolian untuk meminimalkan iritasi.',
      whyWeLoveIt: 'Tekstur milky cepat meresap tanpa rasa lengket sama sekali.'
    },
    {
      id: 'p4',
      name: 'Oat & Barrier Restoring Cream',
      brand: 'Nourish Botanics',
      category: 'Moisturizer',
      skinTypes: ['Kering', 'Sensitif', 'Kombinasi Kering'],
      concerns: ['Kulit Kering', 'Kemerahan & Barrier', 'Kulit Sensitif'],
      image: 'assets/images/product_moisturizer.jpg',
      rating: 4.9,
      reviewsCount: 388,
      priceEst: 'Rp 175.000',
      size: '50 gr',
      badge: 'Intense Recovery',
      keyIngredients: ['Colloidal Oatmeal', 'Ceramide NP', 'Squalane 100% Plant-Derived', 'Shea Butter'],
      shortDesc: 'Krim pelembap kaya nutrisi yang mengunci hidrasi 24 jam dan melindungi kulit dari agresi polusi serta cuaca kering.',
      howToUse: 'Ambil seukuran biji jagung menggunakan spatula bersih. Hangatkan sebentar di jari lalu aplikasikan merata pada wajah dan leher.',
      whenToUse: 'Pagi & Malam (Bisa lebih tebal di malam hari sebagai sleeping pack)',
      avoidCombine: 'Tidak ada pantangan.',
      whyWeLoveIt: 'Menenangkan eczema ringan dan kulit pecah-pecah seketika.'
    },
    {
      id: 'p5',
      name: 'Mineral Water Sunscreen Fluid SPF 50+ PA++++',
      brand: 'Suncalm Lab',
      category: 'Sunscreen',
      skinTypes: ['Semua Jenis Kulit', 'Sensitif', 'Berminyak'],
      concerns: ['Semua Masalah', 'Kulit Sensitif', 'Kusam & Noda Hitam'],
      image: 'assets/images/product_sunscreen.jpg',
      rating: 4.9,
      reviewsCount: 512,
      priceEst: 'Rp 160.000',
      size: '60 ml',
      badge: 'No Whitecast',
      keyIngredients: ['Zinc Oxide Non-Nano', 'Hawaiian Seaweed Extract', 'Aloe Vera', 'Niacinamide 2%'],
      shortDesc: 'Tabir surya berbahan dasar mineral fisik yang sangat ringan, tanpa rasa perih di mata, tidak menyumbat pori, dan ramah terumbu karang.',
      howToUse: 'Kocok sebelum pakai. Oleskan sebanyak dua ruas jari ke seluruh wajah dan leher 15 menit sebelum terpapar sinar matahari.',
      whenToUse: 'Pagi (AM) setiap hari, re-apply tiap 2-3 jam saat aktif di luar ruangan.',
      avoidCombine: 'Gunakan sebagai langkah terakhir rangkaian skincare pagi sebelum makeup.',
      whyWeLoveIt: 'Tekstur fluid cair seperti air, hasil akhir semi-matte velvet yang nyaman seharian.'
    },
    {
      id: 'p6',
      name: '2% BHA Pore Clarifying Liquid',
      brand: 'DermPure Labs',
      category: 'Toner',
      skinTypes: ['Berminyak', 'Kombinasi'],
      concerns: ['Jerawat & Minyak', 'Pori-Pori Besar'],
      image: 'assets/images/product_toner.jpg',
      rating: 4.7,
      reviewsCount: 198,
      priceEst: 'Rp 150.000',
      size: '120 ml',
      badge: 'Exfoliator',
      keyIngredients: ['Salicylic Acid 2%', 'Tea Tree Leaf Extract', 'Zinc PCA', 'Hyaluronic Acid'],
      shortDesc: 'Cairan eksfoliasi kimiawi lembut tanpa bilas untuk melarutkan sebum di dalam pori, memudarkan komedo, dan mencegah jerawat timbul.',
      howToUse: 'Setelah cuci muka di malam hari, tuang pada kapas dan usapkan lembut ke area T-zone atau bagian berkomedo. Gunakan 2-3 kali seminggu.',
      whenToUse: 'Malam hari (PM) saja.',
      avoidCombine: 'Jangan dipakai bersamaan dengan Retinol atau scrub fisik di malam yang sama.',
      whyWeLoveIt: 'Mengurangi komedo hidung dalam 10 hari pemakaian rutin.'
    },
    {
      id: 'p7',
      name: 'Pure Squalane Lightweight Face Oil',
      brand: 'Botanical Calm',
      category: 'Moisturizer',
      skinTypes: ['Kering', 'Normal', 'Sensitif'],
      concerns: ['Kulit Kering', 'Garis Halus'],
      image: 'assets/images/hero.jpg',
      rating: 4.8,
      reviewsCount: 164,
      priceEst: 'Rp 130.000',
      size: '30 ml',
      badge: '100% Plant Derived',
      keyIngredients: ['100% Sugarcane Squalane', 'Vitamin E (Tocopherol)'],
      shortDesc: 'Minyak wajah murni berkepadatan molekul mirip minyak alami kulit manusia, melembapkan tanpa menyumbat pori-pori.',
      howToUse: 'Campurkan 1-2 tetes dengan pelembapmu atau tekan perlahan di akhir rutinitas malam.',
      whenToUse: 'Malam hari (PM) atau Pagi untuk kulit ekstra kering.',
      avoidCombine: 'Bisa dicampur dengan semua krim.',
      whyWeLoveIt: 'Sangat non-comedogenic dan memberi kilau natural sehat.'
    },
    {
      id: 'p8',
      name: 'Gentle Granule-Free Clarifying Cleanser',
      brand: 'DermPure Labs',
      category: 'Cleanser',
      skinTypes: ['Berminyak', 'Berjerawat', 'Kombinasi'],
      concerns: ['Jerawat & Minyak', 'Kusam & Noda Hitam'],
      image: 'assets/images/product_cleanser.jpg',
      rating: 4.8,
      reviewsCount: 220,
      priceEst: 'Rp 118.000',
      size: '150 ml',
      badge: 'Low pH Cleanser',
      keyIngredients: ['Tea Tree Extract', 'Low Betaine Salicylate', 'Allantoin'],
      shortDesc: 'Pembersih berbusa halus lembut khusus kulit rentan jerawat, membersihkan sisa kotoran tanpa mengikis kelembapan alami.',
      howToUse: 'Pijat lembut ke wajah basah selama 60 detik terutama di area hidung dan dagu.',
      whenToUse: 'Pagi & Malam',
      avoidCombine: 'Tidak ada pantangan.',
      whyWeLoveIt: 'Mencegah jerawat baru muncul dan tidak membuat kulit kencang seperti ditarik.'
    }
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
