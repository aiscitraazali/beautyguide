// app.js - Logika interaksi, navigasi, filter, kuis AI, modal, dan bookmark

// State Management
const appState = {
  currentPage: 'home',
  activeIngredientId: 'ceramide',
  creatorCategory: 'all',
  productCategory: 'all',
  productConcern: 'all',
  productSearchQuery: '',
  quizStep: 0,
  quizAnswers: {},
  savedProductIds: JSON.parse(localStorage.getItem('beautyguide_saved_products') || '[]'),
  activeVideo: null,
  activeProductModal: null
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderDashboardEdu();
  renderCreatorVideos();
  renderProductCatalog();
  renderIngredientDetail(appState.activeIngredientId);
  initQuiz();
  updateBookmarkCount();
  setupGlobalSearch();

  // Handle URL hash on load
  const hash = window.location.hash.replace('#', '');
  if (['home', 'catalog', 'creator', 'quiz'].includes(hash)) {
    navigateTo(hash, false);
  } else {
    navigateTo('home', false);
  }
});

// ==========================================
// 1. NAVIGATION & ROUTING
// ==========================================
function initNavigation() {
  const navLinks = document.querySelectorAll('[data-nav]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = link.getAttribute('data-nav');
      navigateTo(targetPage);
    });
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavMenu = document.getElementById('mobileNavMenu');
  if (mobileMenuBtn && mobileNavMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavMenu.classList.toggle('hidden');
    });
  }

  // Window hash change listener
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (['home', 'catalog', 'creator', 'quiz'].includes(hash)) {
      navigateTo(hash, false);
    }
  });
}

function navigateTo(pageId, updateHash = true) {
  appState.currentPage = pageId;

  if (updateHash) {
    window.location.hash = pageId;
  }

  // Hide all pages, show target
  const pages = document.querySelectorAll('.page-view');
  pages.forEach(p => p.classList.add('hidden'));

  const targetEl = document.getElementById(`page-${pageId}`);
  if (targetEl) {
    targetEl.classList.remove('hidden');
    targetEl.classList.add('animate-fade-in');
  }

  // Update navigation link active classes
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.getAttribute('data-nav') === pageId) {
      link.classList.add('active', 'text-stone-900');
      link.classList.remove('text-stone-600');
    } else {
      link.classList.remove('active', 'text-stone-900');
      link.classList.add('text-stone-600');
    }
  });

  // Close mobile nav menu if open
  const mobileNavMenu = document.getElementById('mobileNavMenu');
  if (mobileNavMenu) mobileNavMenu.classList.add('hidden');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 2. DASHBOARD / HOME EDUCATION SECTIONS
// ==========================================
function renderDashboardEdu() {
  // 1. Render Ingredient tabs in Home Edu-Pedia
  const ingredientTabsContainer = document.getElementById('ingredientTabsContainer');
  if (ingredientTabsContainer) {
    ingredientTabsContainer.innerHTML = SKINCARE_DATA.ingredients.map(ing => `
      <button 
        onclick="selectIngredient('${ing.id}')"
        class="ingredient-tab px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap border ${appState.activeIngredientId === ing.id ? 'bg-stone-900 text-white border-stone-900 shadow-sm' : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'}"
        data-ing-id="${ing.id}"
      >
        ${ing.name}
      </button>
    `).join('');
  }

  // 2. Render Featured Creators Preview on Home
  const homeFeaturedCreators = document.getElementById('homeFeaturedCreators');
  if (homeFeaturedCreators) {
    const featuredVideos = SKINCARE_DATA.videos.slice(0, 3);
    homeFeaturedCreators.innerHTML = featuredVideos.map(video => renderVideoCardHTML(video)).join('');
  }

  // 3. Render Featured Products Preview on Home
  const homeFeaturedProducts = document.getElementById('homeFeaturedProducts');
  if (homeFeaturedProducts) {
    const featuredProducts = SKINCARE_DATA.products.slice(0, 4);
    homeFeaturedProducts.innerHTML = featuredProducts.map(p => renderProductCardHTML(p)).join('');
  }
}

function selectIngredient(ingId) {
  appState.activeIngredientId = ingId;
  renderIngredientDetail(ingId);

  // Update tabs
  document.querySelectorAll('.ingredient-tab').forEach(btn => {
    if (btn.getAttribute('data-ing-id') === ingId) {
      btn.className = 'ingredient-tab px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap border bg-stone-900 text-white border-stone-900 shadow-sm';
    } else {
      btn.className = 'ingredient-tab px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap border bg-white text-stone-700 border-stone-200 hover:border-stone-400';
    }
  });
}

function renderIngredientDetail(ingId) {
  const ing = SKINCARE_DATA.ingredients.find(i => i.id === ingId) || SKINCARE_DATA.ingredients[0];
  const container = document.getElementById('ingredientDetailBox');
  if (!container) return;

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      <div class="lg:col-span-7">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${ing.color} mb-3">
          <span>✨</span> ${ing.tag}
        </div>
        <h3 class="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 mb-2">${ing.name}</h3>
        <p class="text-stone-600 leading-relaxed text-sm sm:text-base mb-6">${ing.desc}</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div class="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <span class="block font-semibold text-stone-900 mb-1">⏱ Waktu Pemakaian</span>
            <span class="text-stone-600">${ing.time}</span>
          </div>
          <div class="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <span class="block font-semibold text-stone-900 mb-1">🎯 Paling Cocok Untuk</span>
            <span class="text-stone-600">${ing.bestFor}</span>
          </div>
        </div>
      </div>

      <div class="lg:col-span-5 bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-stone-200/80">
        <h4 class="font-semibold text-stone-900 text-sm mb-3 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          Kombinasi Sinergis (Cocok Dipadukan):
        </h4>
        <div class="flex flex-wrap gap-2 mb-5">
          ${ing.pairsWell.map(pair => `<span class="px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-800 shadow-2xs">${pair}</span>`).join('')}
        </div>

        <h4 class="font-semibold text-stone-900 text-sm mb-2 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-rose-500"></span>
          Perhatian & Pantangan:
        </h4>
        <p class="text-xs text-stone-600 leading-relaxed bg-white/70 p-3 rounded-lg border border-stone-200/60">
          ${ing.avoidWith}
        </p>
      </div>
    </div>
  `;
}

// Routine Explorer AM vs PM
function switchRoutineTab(type) {
  const amBtn = document.getElementById('routineTabAM');
  const pmBtn = document.getElementById('routineTabPM');
  const amContent = document.getElementById('routineContentAM');
  const pmContent = document.getElementById('routineContentPM');

  if (type === 'am') {
    amBtn.classList.add('bg-stone-900', 'text-white');
    amBtn.classList.remove('bg-stone-100', 'text-stone-600');
    pmBtn.classList.add('bg-stone-100', 'text-stone-600');
    pmBtn.classList.remove('bg-stone-900', 'text-white');

    amContent.classList.remove('hidden');
    pmContent.classList.add('hidden');
  } else {
    pmBtn.classList.add('bg-stone-900', 'text-white');
    pmBtn.classList.remove('bg-stone-100', 'text-stone-600');
    amBtn.classList.add('bg-stone-100', 'text-stone-600');
    amBtn.classList.remove('bg-stone-900', 'text-white');

    pmContent.classList.remove('hidden');
    amContent.classList.add('hidden');
  }
}

// ==========================================
// 3. CREATOR SECTION & VIDEO MODAL
// ==========================================
function renderCreatorVideos() {
  const container = document.getElementById('creatorVideosGrid');
  if (!container) return;

  let videos = SKINCARE_DATA.videos;
  if (appState.creatorCategory !== 'all') {
    videos = videos.filter(v => v.category === appState.creatorCategory);
  }

  if (videos.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-stone-500">
        <p class="text-lg">Belum ada video untuk kategori ini.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = videos.map(video => renderVideoCardHTML(video)).join('');
}

function filterCreatorCategory(category, buttonEl) {
  appState.creatorCategory = category;

  // Update button active state
  document.querySelectorAll('.creator-filter-btn').forEach(btn => {
    btn.classList.remove('bg-stone-900', 'text-white', 'border-stone-900');
    btn.classList.add('bg-white', 'text-stone-700', 'border-stone-200');
  });

  if (buttonEl) {
    buttonEl.classList.remove('bg-white', 'text-stone-700', 'border-stone-200');
    buttonEl.classList.add('bg-stone-900', 'text-white', 'border-stone-900');
  }

  renderCreatorVideos();
}

function renderVideoCardHTML(video) {
  return `
    <div class="bg-white rounded-2xl overflow-hidden border border-stone-200/90 card-hover flex flex-col group cursor-pointer" onclick="openVideoModal('${video.id}')">
      <!-- Thumbnail with Overlay -->
      <div class="relative aspect-video w-full overflow-hidden bg-stone-900">
        <img 
          src="${video.thumbnail}" 
          alt="${video.title}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
          onerror="this.src='https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg'"
        />
        <!-- Hover Gradient & YouTube Play Button -->
        <div class="absolute inset-0 bg-stone-950/25 group-hover:bg-stone-950/45 transition-colors flex items-center justify-center">
          <div class="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-red-500 transition-all duration-300">
            <svg class="w-5 h-5 ml-0.5 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

        <!-- YouTube Duration Badge -->
        <span class="absolute bottom-3 right-3 bg-stone-900/85 backdrop-blur-xs text-white text-xs px-2 py-0.5 rounded font-medium flex items-center gap-1.5 shadow-sm">
          <svg class="w-3.5 h-3.5 text-red-500 fill-current shrink-0" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          ${video.duration}
        </span>

        <!-- Category Badge -->
        <span class="absolute top-3 left-3 badge-pill bg-white/95 text-stone-900 border-none shadow-xs font-semibold text-[11px]">
          ${video.badge}
        </span>
      </div>

      <!-- Video Content Details -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span class="font-medium text-[#A67C52]">${video.category}</span>
            <span>${video.views}</span>
          </div>
          <h4 class="font-serif text-base sm:text-lg font-semibold text-stone-900 line-clamp-2 mb-2 leading-snug group-hover:text-[#A67C52] transition-colors">
            ${video.title}
          </h4>
          <p class="text-xs text-stone-600 line-clamp-2 mb-3 leading-relaxed">
            ${video.summary}
          </p>

          <!-- Direct YouTube Link Button -->
          <div class="mb-3">
            <a 
              href="${video.youtubeUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              onclick="event.stopPropagation()" 
              class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 px-2.5 py-1 rounded-md transition-all duration-200 border border-rose-200/60"
              title="Buka langsung link YouTube di tab baru"
            >
              <svg class="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <span>Tonton di YouTube</span>
              <span class="text-xs">↗</span>
            </a>
          </div>
        </div>

        <!-- Creator Profile & Play Indicator -->
        <div class="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div class="flex items-center gap-3 overflow-hidden">
            <img 
              src="${video.creatorAvatar}" 
              alt="${video.creator}" 
              class="w-8 h-8 rounded-full object-cover border border-stone-200"
            />
            <div class="overflow-hidden">
              <p class="text-xs font-semibold text-stone-900 truncate">${video.creator}</p>
              <p class="text-[11px] text-stone-500 truncate">${video.creatorRole}</p>
            </div>
          </div>
          <span class="shrink-0 text-xs font-semibold text-[#845E3D] group-hover:text-stone-900 flex items-center gap-1 transition-colors">
            Putar
            <span class="text-[11px]">▶</span>
          </span>
        </div>
      </div>
    </div>
  `;
}

function openVideoModal(videoId) {
  const video = SKINCARE_DATA.videos.find(v => v.id === videoId);
  if (!video) return;

  appState.activeVideo = video;
  const modal = document.getElementById('videoModal');
  const container = document.getElementById('videoModalContent');

  const isFileProtocol = window.location.protocol === 'file:';

  // Video player stage HTML
  let playerStageHtml = '';
  if (isFileProtocol) {
    playerStageHtml = `
      <div id="videoPlayerStage" class="relative aspect-video w-full bg-stone-950 rounded-t-2xl overflow-hidden flex flex-col justify-between group">
        <img 
          src="${video.thumbnail}" 
          alt="${escapeHtml(video.title)}" 
          class="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" 
          onerror="this.src='https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg'"
        />
        
        <!-- Top bar overlay -->
        <div class="relative z-10 p-4 flex items-center justify-between text-white bg-linear-to-b from-stone-950/80 to-transparent">
          <span class="badge-pill bg-white/20 text-white border-none backdrop-blur-xs text-[11px]">${video.category}</span>
          <button onclick="closeVideoModal()" class="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors" title="Tutup">
            ✕
          </button>
        </div>

        <!-- Center Action -->
        <div class="relative z-10 text-center text-white px-4">
          <a 
            href="${video.youtubeUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex flex-col items-center group/play cursor-pointer"
          >
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl mb-3 group-hover/play:scale-110 group-hover/play:bg-red-500 transition-all duration-300">
              <svg class="w-8 h-8 sm:w-9 sm:h-9 ml-1 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span class="px-5 py-2.5 rounded-full bg-stone-900/90 text-white text-xs sm:text-sm font-semibold hover:bg-stone-800 transition-colors inline-flex items-center gap-2 border border-white/20 shadow-lg">
              <svg class="w-4 h-4 fill-red-500" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              Putar Video di YouTube ↗
            </span>
          </a>
        </div>

      </div>
    `;
  } else {
    playerStageHtml = `
      <div id="videoPlayerStage" class="relative aspect-video w-full bg-black rounded-t-2xl overflow-hidden shadow-2xl">
        <iframe 
          src="https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1" 
          title="${escapeHtml(video.title)}" 
          class="w-full h-full border-0" 
          referrerpolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>
      </div>
    `;
  }

  container.innerHTML = `
    <!-- Video Player Stage -->
    ${playerStageHtml}

    <!-- Video Notes & Summary -->
    <div class="p-6 bg-white rounded-b-2xl max-h-[55vh] overflow-y-auto">
      <!-- Top Bar: Creator Info & External YouTube Action -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 mb-4">
        <div class="flex items-center gap-3">
          <img src="${video.creatorAvatar}" alt="${video.creator}" class="w-11 h-11 rounded-full object-cover border border-stone-200" />
          <div>
            <h3 class="font-semibold text-stone-900 text-sm sm:text-base">${video.creator}</h3>
            <p class="text-xs text-stone-500">${video.creatorRole} · ${video.views}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <a 
            href="${video.youtubeUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            Buka di YouTube ↗
          </a>
          <button onclick="closeVideoModal()" class="w-9 h-9 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900 flex items-center justify-center transition-colors text-sm font-bold" title="Tutup">
            ✕
          </button>
        </div>
      </div>

      <!-- Video Title & Category -->
      <div class="mb-3">
        <div class="flex items-center gap-2 flex-wrap mb-2">
          <span class="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FAF4ED] text-[#845E3D] border border-[#EBDDCF]">
            ${video.category}
          </span>
          <span class="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-700">
            ${video.badge}
          </span>
          <span class="text-xs text-stone-400 font-mono">${video.duration}</span>
        </div>
        <h2 class="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">${video.title}</h2>
      </div>

      <!-- YouTube URL Quick Info & Copy -->
      <div class="p-3 mb-4 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs text-stone-600 gap-2">
        <div class="flex items-center gap-2 overflow-hidden truncate">
          <span class="font-semibold text-stone-800 shrink-0">Link Video:</span>
          <a href="${video.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="text-rose-600 hover:underline truncate">${video.youtubeUrl}</a>
        </div>
        <button onclick="copyToClipboard('${video.youtubeUrl}')" class="shrink-0 px-2.5 py-1 text-[11px] font-medium rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors shadow-2xs">
          Salin Link
        </button>
      </div>

      <p class="text-sm text-stone-600 leading-relaxed mb-5 bg-[#FAF7F2] p-4 rounded-xl border border-stone-200/80">
        ${video.summary}
      </p>

      <h4 class="font-semibold text-stone-900 text-sm mb-3 flex items-center gap-2">
        <span class="text-emerald-600 font-bold">✓</span> Rangkuman Poin Kunci (Key Takeaways):
      </h4>
      <ul class="space-y-2 mb-6">
        ${video.takeaways.map(t => `
          <li class="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
            <span class="w-1.5 h-1.5 rounded-full bg-stone-800 mt-2 shrink-0"></span>
            <span>${t}</span>
          </li>
        `).join('')}
      </ul>

      <div class="flex flex-wrap gap-3 pt-3 border-t border-stone-100 justify-end">
        <button onclick="closeVideoModal()" class="px-5 py-2.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors">
          Tutup Pemutar
        </button>
        <button onclick="closeVideoModal(); navigateTo('catalog');" class="px-5 py-2.5 rounded-full text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors">
          Eksplor Produk Terkait di Katalog →
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Link YouTube berhasil disalin ke clipboard!', 'success');
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast('Link YouTube berhasil disalin ke clipboard!', 'success');
  } catch (err) {
    showToast('Silakan salin manual: ' + text, 'info');
  }
  document.body.removeChild(textArea);
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  if (modal) modal.classList.add('hidden');
  const container = document.getElementById('videoModalContent');
  if (container) container.innerHTML = '';
  appState.activeVideo = null;
}

function loadYouTubeIframe(youtubeId, title) {
  const stage = document.getElementById('videoPlayerStage');
  if (!stage) return;
  stage.innerHTML = `
    <iframe 
      src="https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1" 
      title="${title}" 
      class="w-full h-full border-0" 
      referrerpolicy="strict-origin-when-cross-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen>
    </iframe>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================
// 4. PRODUCT CATALOG & DETAIL MODAL
// ==========================================
function renderProductCatalog() {
  const container = document.getElementById('productsCatalogGrid');
  if (!container) return;

  let products = SKINCARE_DATA.products;

  // Filter Category
  if (appState.productCategory !== 'all') {
    products = products.filter(p => p.category.toLowerCase() === appState.productCategory.toLowerCase());
  }

  // Filter Concern
  if (appState.productConcern !== 'all') {
    products = products.filter(p => p.concerns.includes(appState.productConcern) || p.concerns.includes('Semua Masalah'));
  }

  // Filter Search
  if (appState.productSearchQuery.trim() !== '') {
    const q = appState.productSearchQuery.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.keyIngredients.some(i => i.toLowerCase().includes(q))
    );
  }

  // Count indicator
  const countIndicator = document.getElementById('catalogProductsCount');
  if (countIndicator) {
    countIndicator.textContent = `Menampilkan ${products.length} formula produk edukatif`;
  }

  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-stone-500 bg-white rounded-2xl border border-stone-200">
        <p class="text-base font-medium text-stone-800 mb-1">Tidak ditemukan produk yang cocok</p>
        <p class="text-xs text-stone-500 mb-4">Coba ubah kata kunci pencarian atau reset filter kategori.</p>
        <button onclick="resetProductFilters()" class="px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-medium">
          Reset Filter
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(p => renderProductCardHTML(p)).join('');
}

function renderProductCardHTML(p) {
  const isSaved = appState.savedProductIds.includes(p.id);

  return `
    <div class="bg-white rounded-2xl overflow-hidden border border-stone-200/90 card-hover flex flex-col justify-between group">
      <div>
        <!-- Image & Badges -->
        <div class="relative aspect-square w-full bg-[#F7F4EE] overflow-hidden">
          <img 
            src="${p.image}" 
            alt="${p.name}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onerror="this.src='assets/images/hero.jpg'"
          />
          <span class="absolute top-3 left-3 badge-pill bg-white/95 text-stone-900 font-medium shadow-xs">
            ${p.category}
          </span>
          <button 
            onclick="toggleBookmarkProduct('${p.id}', event)" 
            title="Simpan Formula Ini"
            class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs transition-colors hover:bg-white text-stone-700"
          >
            <span class="${isSaved ? 'text-rose-500 fill-current' : 'text-stone-400'}">
              ${isSaved ? '♥' : '♡'}
            </span>
          </button>
        </div>

        <!-- Info Body -->
        <div class="p-5">
          <div class="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span class="uppercase tracking-wider font-semibold text-stone-400">${p.brand}</span>
          </div>

          <h3 class="font-serif text-lg font-bold text-stone-900 mb-2 leading-snug group-hover:text-[#A67C52] transition-colors">
            ${p.name}
          </h3>

          <p class="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
            ${p.shortDesc}
          </p>

          <!-- Active Ingredients Pills -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${p.keyIngredients.slice(0, 3).map(ing => `
              <span class="text-[11px] px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md font-medium">
                ${ing}
              </span>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Footer Action -->
      <div class="px-5 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between">
        <div>
          <span class="block text-[10px] text-stone-400 uppercase tracking-wider font-medium">Estimasi Harga</span>
          <span class="font-semibold text-xs sm:text-sm text-stone-900">${p.priceEst}</span>
        </div>
        <button 
          onclick="openProductModal('${p.id}')"
          class="px-3.5 py-2 rounded-full text-xs font-semibold bg-stone-100 text-stone-800 hover:bg-stone-900 hover:text-white transition-colors"
        >
          Detail Formula →
        </button>
      </div>
    </div>
  `;
}

function filterProductCategory(category, buttonEl) {
  appState.productCategory = category;

  document.querySelectorAll('.prod-cat-btn').forEach(btn => {
    btn.classList.remove('bg-stone-900', 'text-white', 'border-stone-900');
    btn.classList.add('bg-white', 'text-stone-700', 'border-stone-200');
  });

  if (buttonEl) {
    buttonEl.classList.remove('bg-white', 'text-stone-700', 'border-stone-200');
    buttonEl.classList.add('bg-stone-900', 'text-white', 'border-stone-900');
  }

  renderProductCatalog();
}

function filterProductConcern(concern, buttonEl) {
  appState.productConcern = concern;

  document.querySelectorAll('.prod-concern-btn').forEach(btn => {
    btn.classList.remove('bg-stone-900', 'text-white');
    btn.classList.add('bg-stone-100', 'text-stone-600');
  });

  if (buttonEl) {
    buttonEl.classList.remove('bg-stone-100', 'text-stone-600');
    buttonEl.classList.add('bg-stone-900', 'text-white');
  }

  renderProductCatalog();
}

function handleProductSearch(query) {
  appState.productSearchQuery = query;
  renderProductCatalog();
}

function resetProductFilters() {
  appState.productCategory = 'all';
  appState.productConcern = 'all';
  appState.productSearchQuery = '';

  const searchInput = document.getElementById('catalogSearchInput');
  if (searchInput) searchInput.value = '';

  filterProductCategory('all', document.querySelector('.prod-cat-btn[data-cat="all"]'));
  filterProductConcern('all', document.querySelector('.prod-concern-btn[data-concern="all"]'));
  renderProductCatalog();
}

function openProductModal(productId) {
  const p = SKINCARE_DATA.products.find(item => item.id === productId);
  if (!p) return;

  appState.activeProductModal = p;
  const modal = document.getElementById('productDetailModal');
  const container = document.getElementById('productDetailContent');

  const isSaved = appState.savedProductIds.includes(p.id);

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-2xl bg-white max-h-[85vh]">
      <!-- Image column -->
      <div class="md:col-span-5 bg-[#FAF7F2] relative flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-stone-200">
        <img 
          src="${p.image}" 
          alt="${p.name}" 
          class="max-h-72 md:max-h-96 w-auto object-contain rounded-xl shadow-xs"
          onerror="this.src='assets/images/hero.jpg'"
        />
        <div class="absolute top-4 left-4 flex flex-col gap-1.5">
          <span class="badge-pill bg-white text-stone-900 font-medium">${p.category}</span>
          <span class="badge-pill bg-[#C49A78]/20 text-[#845E3D] border-[#C49A78]/30 font-semibold">${p.badge}</span>
        </div>
      </div>

      <!-- Info column -->
      <div class="md:col-span-7 p-6 sm:p-8 overflow-y-auto max-h-[75vh]">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs uppercase tracking-wider font-semibold text-stone-400">${p.brand}</span>
          <button onclick="closeProductModal()" class="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-stone-200">
            ✕
          </button>
        </div>

        <h2 class="font-serif text-2xl font-bold text-stone-900 mb-2">${p.name}</h2>
        <div class="flex items-center gap-4 text-xs text-stone-600 mb-4 pb-4 border-b border-stone-100">
          <span>•</span>
          <span>Ukuran: ${p.size}</span>
          <span>•</span>
          <span class="font-semibold text-stone-900">${p.priceEst}</span>
        </div>

        <!-- Non-commercial Notice -->
        <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs mb-5 flex items-start gap-2">
          <span class="text-sm">ℹ️</span>
          <span><strong>Katalog Khusus Edukasi:</strong> Produk ini disajikan untuk mempelajari komposisi dan rekomendasi kecocokan formula. Platform ini tidak melayani transaksi atau penjualan langsung.</span>
        </div>

        <div class="space-y-4 text-xs sm:text-sm">
          <div>
            <h4 class="font-semibold text-stone-900 mb-1">🌿 Mengapa Formula Ini Bekerja:</h4>
            <p class="text-stone-600 leading-relaxed">${p.whyWeLoveIt}</p>
          </div>

          <div>
            <h4 class="font-semibold text-stone-900 mb-1.5">🧪 Kandungan Aktif Utama:</h4>
            <div class="flex flex-wrap gap-1.5">
              ${p.keyIngredients.map(ing => `<span class="px-2.5 py-1 bg-stone-100 text-stone-800 rounded-lg text-xs font-medium border border-stone-200/60">${ing}</span>`).join('')}
            </div>
          </div>

          <div>
            <h4 class="font-semibold text-stone-900 mb-1">⏱ Cara & Waktu Pakai:</h4>
            <p class="text-stone-600 leading-relaxed mb-1">${p.howToUse}</p>
            <span class="inline-block text-[11px] font-semibold text-[#845E3D] bg-[#F5EDE4] px-2.5 py-0.5 rounded-full">${p.whenToUse}</span>
          </div>

          <div>
            <h4 class="font-semibold text-stone-900 mb-1">⚠️ Catatan Layering:</h4>
            <p class="text-stone-600 leading-relaxed">${p.avoidCombine}</p>
          </div>
        </div>

        <!-- Bottom Actions -->
        <div class="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <button 
            onclick="toggleBookmarkProduct('${p.id}', event); openProductModal('${p.id}');"
            class="px-4 py-2.5 rounded-full text-xs font-semibold border ${isSaved ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'} flex items-center gap-1.5 transition-colors"
          >
            <span>${isSaved ? '♥ Tersimpan di Favorit' : '♡ Simpan ke Favorit'}</span>
          </button>
          <button 
            onclick="closeProductModal(); navigateTo('quiz');"
            class="px-5 py-2.5 rounded-full text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors"
          >
            Cek Kecocokan di Kuis →
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeProductModal() {
  const modal = document.getElementById('productDetailModal');
  if (modal) modal.classList.add('hidden');
  appState.activeProductModal = null;
}

// ==========================================
// 5. INTERACTIVE SKIN QUIZ & AI ENGINE
// ==========================================
function initQuiz() {
  appState.quizStep = 0;
  appState.quizAnswers = {};
  renderQuizStep();
}

function renderQuizStep() {
  const totalSteps = SKINCARE_DATA.quizQuestions.length;
  const currentQ = SKINCARE_DATA.quizQuestions[appState.quizStep];

  // Update progress bar & indicator
  const progressText = document.getElementById('quizProgressText');
  const progressBar = document.getElementById('quizProgressBar');
  if (progressText) progressText.textContent = `Pertanyaan ${appState.quizStep + 1} dari ${totalSteps}`;
  if (progressBar) progressBar.style.width = `${((appState.quizStep + 1) / totalSteps) * 100}%`;

  const questionCard = document.getElementById('quizQuestionCard');
  if (!questionCard) return;

  const currentAnswer = appState.quizAnswers[currentQ.id];

  questionCard.innerHTML = `
    <div class="animate-fade-in">
      <span class="badge-pill bg-[#FAF6F0] text-[#755944] mb-3">Langkah ${appState.quizStep + 1}</span>
      <h3 class="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-2 leading-snug">
        ${currentQ.question}
      </h3>
      <p class="text-xs sm:text-sm text-stone-500 mb-6">${currentQ.description}</p>

      <!-- Options Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        ${currentQ.options.map(opt => `
          <div 
            onclick="selectQuizOption(${currentQ.id}, '${opt.id}')"
            class="p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${currentAnswer === opt.id ? 'bg-[#FAF6F0] border-stone-900 ring-2 ring-stone-900/10' : 'bg-white border-stone-200 hover:border-stone-400 hover:bg-stone-50/50'}"
          >
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <span class="font-semibold text-xs sm:text-sm text-stone-900">${opt.label}</span>
                <span class="w-4 h-4 rounded-full border flex items-center justify-center ${currentAnswer === opt.id ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300'} text-[10px]">
                  ${currentAnswer === opt.id ? '✓' : ''}
                </span>
              </div>
              <p class="text-xs text-stone-500 leading-relaxed">${opt.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Navigation buttons -->
      <div class="flex items-center justify-between pt-4 border-t border-stone-100">
        <button 
          onclick="prevQuizStep()" 
          class="px-5 py-2.5 rounded-full text-xs font-semibold border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors ${appState.quizStep === 0 ? 'opacity-40 cursor-not-allowed' : ''}"
          ${appState.quizStep === 0 ? 'disabled' : ''}
        >
          ← Sebelumnya
        </button>

        <button 
          onclick="nextQuizStep()" 
          class="px-6 py-2.5 rounded-full text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-xs ${!currentAnswer ? 'opacity-50 cursor-not-allowed' : ''}"
          ${!currentAnswer ? 'disabled' : ''}
        >
          ${appState.quizStep === totalSteps - 1 ? 'Analisis dengan AI ✨' : 'Lanjutkan →'}
        </button>
      </div>
    </div>
  `;
}

function selectQuizOption(questionId, optionId) {
  appState.quizAnswers[questionId] = optionId;
  renderQuizStep();
}

function prevQuizStep() {
  if (appState.quizStep > 0) {
    appState.quizStep--;
    renderQuizStep();
  }
}

function nextQuizStep() {
  const totalSteps = SKINCARE_DATA.quizQuestions.length;
  if (!appState.quizAnswers[SKINCARE_DATA.quizQuestions[appState.quizStep].id]) {
    showToast('Silakan pilih salah satu jawaban terlebih dahulu', 'warning');
    return;
  }

  if (appState.quizStep < totalSteps - 1) {
    appState.quizStep++;
    renderQuizStep();
  } else {
    runAISkinAnalysis();
  }
}

function runAISkinAnalysis() {
  // Hide Quiz Container, Show AI Simulation Loading
  const quizForm = document.getElementById('quizFormContainer');
  const aiLoading = document.getElementById('quizAiLoading');
  const quizResult = document.getElementById('quizResultContainer');

  if (quizForm) quizForm.classList.add('hidden');
  if (quizResult) quizResult.classList.add('hidden');
  if (aiLoading) aiLoading.classList.remove('hidden');

  const stepsList = [
    'Menganalisis matriks lipid & profil pelindung kulit (skin barrier)...',
    'Menghitung toleransi konsentrasi bahan aktif & riwayat reaktivitas...',
    'Mengevaluasi faktor lingkungan & beban polusi harian...',
    'Menyusun formulasi sinergis & urutan rutinitas optimal...'
  ];

  let currentStep = 0;
  const statusEl = document.getElementById('aiLoadingStatus');
  const progressInner = document.getElementById('aiLoadingBarInner');

  const interval = setInterval(() => {
    currentStep++;
    if (statusEl && stepsList[currentStep]) {
      statusEl.textContent = stepsList[currentStep];
    }
    if (progressInner) {
      progressInner.style.width = `${((currentStep + 1) / stepsList.length) * 100}%`;
    }

    if (currentStep >= stepsList.length) {
      clearInterval(interval);
      setTimeout(() => {
        aiLoading.classList.add('hidden');
        renderQuizAnalysisResult();
      }, 500);
    }
  }, 700);
}

function renderQuizAnalysisResult() {
  const quizResult = document.getElementById('quizResultContainer');
  if (!quizResult) return;

  const answers = appState.quizAnswers;
  
  // Calculate AI diagnostic logic based on answers
  const skinTypeMap = {
    oily: { title: 'Berminyak Sebum Berlebih', barrierHealth: 82, desc: 'Kulit memproduksi sebum aktif di seluruh zona wajah. Pori-pori membutuhkan eksfoliasi larut minyak tanpa membuat lapisan epidermis dehidrasi.' },
    combination: { title: 'Kombinasi (T-Zone Aktif)', barrierHealth: 78, desc: 'Perbedaan produksi minyak antara zona T (dahi/hidung) dan zona U (pipi). Memerlukan hidrasi berlayer ringan dan kontrol minyak terlokalisir.' },
    dry: { title: 'Kering Dehidrasi (Moisture Depleted)', barrierHealth: 64, desc: 'Lapisan lipid alami tipis sehingga penguapan air (TEWL) terjadi lebih cepat. Wajib mengunci hidrasi dengan Ceramide dan pelembap oklusif.' },
    normal: { title: 'Normal Seimbang', barrierHealth: 92, desc: 'Sirkulasi minyak dan hidrasi kulit berada pada rasio harmonis. Fokus pada perlindungan antioksidan dan pencegahan penuaan dini.' },
    sensitive: { title: 'Sensitif Reaktif (Compromised Barrier)', barrierHealth: 55, desc: 'Kondisi mikrobioma kulit mudah terganggu oleh iritan luar. Wajib menggunakan produk tanpa wewangian dengan bahan penenang ber-pH seimbang.' }
  };

  const currentSkinInfo = skinTypeMap[answers[1]] || skinTypeMap.combination;
  const concernAns = answers[2] || 'barrier';
  const toleranceAns = answers[3] || 'medium';

  // Determine Do's and Don'ts
  let dos = [];
  let donts = [];

  if (concernAns === 'barrier') {
    dos = ['Ceramide NP / AP (Mengunci lipid)', 'Centella Asiatica (Penenang iritasi)', 'Hyaluronic Acid Multi-Weight', 'Sunscreen Mineral Fisik'];
    donts = ['Eksfoliasi kimiawi AHA konsentrasi tinggi', 'Scrub berbutir kasar (Physical Scrub)', 'Pewangi sintetis (Artificial Fragrance)', 'Mencuci muka dengan air terlalu panas'];
  } else if (concernAns === 'acne') {
    dos = ['Salicylic Acid 2% (Membersihkan pori)', 'Niacinamide 2-5% (Regulasi minyak)', 'Zinc PCA & Tea Tree', 'Pembersih ber-pH 5.5 gentle'];
    donts = ['Krim berat berkomedogenik tinggi', 'Memencet jerawat dengan tangan', 'Menggunakan terlalu banyak active sekaligus', 'Melewatkan pelembap karena takut berminyak'];
  } else if (concernAns === 'dull') {
    dos = ['Niacinamide (Memudarkan noda PIH)', 'Vitamin C derivatif lembut', 'Alpha Arbutin', 'Sunscreen SPF 50+ Broad Spectrum'];
    donts = ['Terpapar matahari tanpa perlindungan sunscreen', 'Mencampur Retinol dengan Vitamin C murni', 'Eksfoliasi berlebihan setiap hari', 'Tidur kurang dari 7 jam'];
  } else {
    dos = ['Peptide & Ceramide', 'Retinol dosis bertahap (PM)', 'Hyaluronic Acid mendalam', 'Antioksidan pelindung sel'];
    donts = ['Melewatkan sunscreen di siang hari', 'Menggunakan retinol tanpa pelembap barrier', 'Tidur dengan riasan wajah masih menempel', 'Kebiasaan merokok & dehidrasi'];
  }

  // Recommended products from database
  let recommendedProducts = [];
  if (answers[1] === 'dry' || concernAns === 'barrier') {
    recommendedProducts = SKINCARE_DATA.products.filter(p => ['p1', 'p3', 'p4', 'p5'].includes(p.id));
  } else if (answers[1] === 'oily' || concernAns === 'acne') {
    recommendedProducts = SKINCARE_DATA.products.filter(p => ['p1', 'p2', 'p6', 'p5'].includes(p.id));
  } else {
    recommendedProducts = SKINCARE_DATA.products.filter(p => ['p1', 'p2', 'p3', 'p5'].includes(p.id));
  }

  quizResult.innerHTML = `
    <div class="animate-fade-in">
      <!-- Result Header Card -->
      <div class="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-stone-200 mb-8">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-200/80">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-stone-900 text-white mb-2">
              <span>✨</span> Hasil Diagnosis AI Skin Engine
            </div>
            <h2 class="font-serif text-2xl sm:text-4xl font-bold text-stone-900 mb-1">
              Profil: ${currentSkinInfo.title}
            </h2>
            <p class="text-xs sm:text-sm text-stone-600 max-w-xl">
              ${currentSkinInfo.desc}
            </p>
          </div>

          <!-- Score Gauge Badge -->
          <div class="bg-white p-4 rounded-2xl border border-stone-200 text-center shrink-0 min-w-36 shadow-xs">
            <span class="block text-2xl sm:text-3xl font-serif font-bold ${currentSkinInfo.barrierHealth >= 75 ? 'text-emerald-700' : 'text-amber-700'}">
              ${currentSkinInfo.barrierHealth}%
            </span>
            <span class="text-[11px] text-stone-500 font-medium">Kekuatan Skin Barrier</span>
          </div>
        </div>

        <!-- Do's and Don'ts Matrix -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div class="bg-white p-5 rounded-2xl border border-emerald-100 shadow-2xs">
            <h4 class="font-semibold text-emerald-800 text-sm mb-3 flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">✓</span>
              Kandungan yang Sangat Disarankan (Do's):
            </h4>
            <ul class="space-y-2 text-xs text-stone-700">
              ${dos.map(d => `<li class="flex items-start gap-2"><span class="text-emerald-500 font-bold">•</span><span>${d}</span></li>`).join('')}
            </ul>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-rose-100 shadow-2xs">
            <h4 class="font-semibold text-rose-800 text-sm mb-3 flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-xs">✕</span>
              Hindari / Gunakan dengan Ekstra Hati-hati (Don'ts):
            </h4>
            <ul class="space-y-2 text-xs text-stone-700">
              ${donts.map(d => `<li class="flex items-start gap-2"><span class="text-rose-500 font-bold">•</span><span>${d}</span></li>`).join('')}
            </ul>
          </div>
        </div>
      </div>

      <!-- Personalized Routine AM & PM -->
      <div class="mb-10">
        <h3 class="font-serif text-2xl font-bold text-stone-900 mb-2">Rekomendasi Rutinitas Personal Harianmu</h3>
        <p class="text-xs sm:text-sm text-stone-500 mb-6">Urutan pengaplikasian produk yang seimbang dan tidak membebani kulit.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- AM Routine Card -->
          <div class="bg-white p-6 rounded-2xl border border-stone-200">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
              <div class="flex items-center gap-2">
                <span class="text-lg">☀️</span>
                <h4 class="font-semibold text-stone-900 text-sm">Rutinitas Pagi (AM Protection)</h4>
              </div>
              <span class="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-medium">3-4 Menit</span>
            </div>
            <ol class="space-y-3 text-xs text-stone-600">
              <li class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-[11px] shrink-0">1</span>
                <div>
                  <strong class="text-stone-800 block">Pembersih Lembut (Gentle Cleanser)</strong>
                  Basuh minyak berlebih selama tidur tanpa merusak kelembapan alami.
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-[11px] shrink-0">2</span>
                <div>
                  <strong class="text-stone-800 block">Hydrating Toner / Essence</strong>
                  Persiapkan kulit agar menyerap nutrisi dengan baik saat masih lembap.
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-[11px] shrink-0">3</span>
                <div>
                  <strong class="text-stone-800 block">Pelembap Ringan (Light Moisturizer)</strong>
                  Kunci air di dalam lapisan dermis agar kulit tidak overproduksi minyak.
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-[11px] shrink-0">4</span>
                <div>
                  <strong class="text-stone-800 block">Sunscreen SPF 50+ (Wajib)</strong>
                  Perlindungan mutlak terhadap photo-aging dan noda hitam.
                </div>
              </li>
            </ol>
          </div>

          <!-- PM Routine Card -->
          <div class="bg-white p-6 rounded-2xl border border-stone-200">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
              <div class="flex items-center gap-2">
                <span class="text-lg">🌙</span>
                <h4 class="font-semibold text-stone-900 text-sm">Rutinitas Malam (PM Regeneration)</h4>
              </div>
              <span class="text-[11px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 font-medium">Perbaikan Sel</span>
            </div>
            <ol class="space-y-3 text-xs text-stone-600">
              <li class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-[11px] shrink-0">1</span>
                <div>
                  <strong class="text-stone-800 block">Double Cleansing (Cleansing Balm/Gel)</strong>
                  Luruhkan residu sunscreen tahan air, polusi, dan makeup secara menyeluruh.
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-[11px] shrink-0">2</span>
                <div>
                  <strong class="text-stone-800 block">Calming Toner / Essence</strong>
                  Menenangkan stres oksidatif kulit setelah terpapar panas seharian.
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-[11px] shrink-0">3</span>
                <div>
                  <strong class="text-stone-800 block">Target Serum (Sesuai Kebutuhan)</strong>
                  Aplikasikan Ceramide/BHA/Peptide secara bergantian sesuai jadwal malammu.
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-[11px] shrink-0">4</span>
                <div>
                  <strong class="text-stone-800 block">Barrier Restoring Cream (Moisturizer)</strong>
                  Krim malam kaya nutrisi untuk mengunci regenerasi sel saat tidur lelap.
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Curated Product Matches -->
      <div class="mb-10">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="font-serif text-2xl font-bold text-stone-900">Rekomendasi Formula yang Kompatibel</h3>
            <p class="text-xs sm:text-sm text-stone-500">Berdasarkan profil toleransi dan target masalah kulitmu.</p>
          </div>
          <button onclick="navigateTo('catalog')" class="text-xs font-semibold text-stone-900 hover:underline">
            Lihat Semua di Katalog →
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${recommendedProducts.map(p => `
            <div class="bg-white rounded-2xl overflow-hidden border border-stone-200 card-hover flex flex-col justify-between">
              <div>
                <div class="relative aspect-square w-full bg-[#FAF7F2]">
                  <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.src='assets/images/hero.jpg'" />
                  <span class="absolute top-2.5 left-2.5 text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-semibold">
                    98% Match
                  </span>
                </div>
                <div class="p-4">
                  <span class="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">${p.brand}</span>
                  <h4 class="font-serif text-sm font-semibold text-stone-900 line-clamp-1 mb-1">${p.name}</h4>
                  <p class="text-[11px] text-stone-500 line-clamp-2">${p.shortDesc}</p>
                </div>
              </div>
              <div class="p-4 pt-0">
                <button onclick="openProductModal('${p.id}')" class="w-full py-2 bg-stone-100 hover:bg-stone-900 hover:text-white transition-colors text-stone-800 rounded-xl text-xs font-semibold">
                  Lihat Detail Formula
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-wrap items-center justify-center gap-4 py-6 border-t border-stone-200">
        <button onclick="initQuiz(); document.getElementById('quizFormContainer').classList.remove('hidden'); document.getElementById('quizResultContainer').classList.add('hidden');" class="px-6 py-3 rounded-full text-xs font-semibold border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 transition-colors">
          ↺ Ulangi Kuis Diagnosa
        </button>
        <button onclick="window.print()" class="px-6 py-3 rounded-full text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-xs">
          🖨 Cetak / Simpan Ringkasan Analisis
        </button>
      </div>
    </div>
  `;

  quizResult.classList.remove('hidden');
}

// ==========================================
// 6. BOOKMARKS & SAVED PRODUCTS DRAWER
// ==========================================
function toggleBookmarkProduct(productId, event) {
  if (event) event.stopPropagation();

  const idx = appState.savedProductIds.indexOf(productId);
  if (idx > -1) {
    appState.savedProductIds.splice(idx, 1);
    showToast('Produk dihapus dari simpanan', 'info');
  } else {
    appState.savedProductIds.push(productId);
    showToast('Produk berhasil disimpan ke daftar referensi!', 'success');
  }

  localStorage.setItem('beautyguide_saved_products', JSON.stringify(appState.savedProductIds));
  updateBookmarkCount();
  renderProductCatalog();
  renderSavedDrawerContent();
}

function updateBookmarkCount() {
  const badge = document.getElementById('headerSavedCount');
  if (badge) {
    badge.textContent = appState.savedProductIds.length;
    if (appState.savedProductIds.length > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
}

function toggleSavedDrawer() {
  const drawer = document.getElementById('savedDrawer');
  if (!drawer) return;

  const isHidden = drawer.classList.contains('hidden');
  if (isHidden) {
    renderSavedDrawerContent();
    drawer.classList.remove('hidden');
  } else {
    drawer.classList.add('hidden');
  }
}

function renderSavedDrawerContent() {
  const container = document.getElementById('savedDrawerList');
  if (!container) return;

  const saved = SKINCARE_DATA.products.filter(p => appState.savedProductIds.includes(p.id));

  if (saved.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center text-stone-500">
        <span class="text-3xl block mb-2">♡</span>
        <p class="text-sm font-semibold text-stone-700 mb-1">Belum ada formula yang disimpan</p>
        <p class="text-xs text-stone-400">Klik ikon hati pada produk di katalog untuk menyimpannya di sini.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = saved.map(p => `
    <div class="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
      <img src="${p.image}" alt="${p.name}" class="w-14 h-14 rounded-lg object-cover shrink-0 bg-white" onerror="this.src='assets/images/hero.jpg'" />
      <div class="flex-1 overflow-hidden">
        <span class="text-[10px] text-stone-400 uppercase font-semibold block">${p.brand}</span>
        <h4 class="font-serif text-xs font-semibold text-stone-900 truncate">${p.name}</h4>
        <span class="text-[11px] text-stone-500">${p.priceEst}</span>
      </div>
      <div class="flex flex-col gap-1">
        <button onclick="toggleSavedDrawer(); openProductModal('${p.id}')" class="text-xs text-stone-800 hover:text-stone-900 font-semibold p-1">
          Lihat
        </button>
        <button onclick="toggleBookmarkProduct('${p.id}', event)" class="text-[11px] text-rose-500 hover:text-rose-700 p-1">
          Hapus
        </button>
      </div>
    </div>
  `).join('');
}

// ==========================================
// 7. GLOBAL SEARCH MODAL
// ==========================================
function setupGlobalSearch() {
  const searchInput = document.getElementById('globalSearchModalInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      runGlobalSearch(e.target.value);
    });
  }

  // Keyboard shortcut Ctrl+K or Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearchModal();
    }
    if (e.key === 'Escape') {
      closeSearchModal();
      closeVideoModal();
      closeProductModal();
      const savedDrawer = document.getElementById('savedDrawer');
      if (savedDrawer) savedDrawer.classList.add('hidden');
    }
  });
}

function openSearchModal() {
  const modal = document.getElementById('searchModal');
  if (modal) {
    modal.classList.remove('hidden');
    const input = document.getElementById('globalSearchModalInput');
    if (input) {
      input.value = '';
      input.focus();
    }
    runGlobalSearch('');
  }
}

function closeSearchModal() {
  const modal = document.getElementById('searchModal');
  if (modal) modal.classList.add('hidden');
}

function runGlobalSearch(query) {
  const resultsContainer = document.getElementById('globalSearchResults');
  if (!resultsContainer) return;

  const q = query.trim().toLowerCase();
  if (q === '') {
    resultsContainer.innerHTML = `
      <div class="p-6 text-center text-xs text-stone-400">
        Ketik bahan aktif (contoh: <em>Ceramide</em>, <em>Retinol</em>), topik video, atau produk edukasi.
      </div>
    `;
    return;
  }

  // Match ingredients
  const matchedIngredients = SKINCARE_DATA.ingredients.filter(i => 
    i.name.toLowerCase().includes(q) || i.tag.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)
  );

  // Match products
  const matchedProducts = SKINCARE_DATA.products.filter(p => 
    p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.keyIngredients.some(k => k.toLowerCase().includes(q))
  );

  // Match videos
  const matchedVideos = SKINCARE_DATA.videos.filter(v => 
    v.title.toLowerCase().includes(q) || v.creator.toLowerCase().includes(q) || v.category.toLowerCase().includes(q)
  );

  const totalMatches = matchedIngredients.length + matchedProducts.length + matchedVideos.length;

  if (totalMatches === 0) {
    resultsContainer.innerHTML = `
      <div class="p-8 text-center text-stone-500">
        <p class="text-sm font-semibold text-stone-700">Tidak ada hasil untuk "${query}"</p>
        <p class="text-xs text-stone-400 mt-1">Coba gunakan istilah bahan seperti Hyaluronic Acid atau Sunscreen.</p>
      </div>
    `;
    return;
  }

  let html = '';

  if (matchedIngredients.length > 0) {
    html += `
      <div class="mb-4">
        <span class="text-[11px] font-bold text-stone-400 uppercase tracking-wider block px-3 mb-2">Bahan Aktif (Ingredients)</span>
        <div class="space-y-1">
          ${matchedIngredients.map(i => `
            <div onclick="closeSearchModal(); navigateTo('home'); selectIngredient('${i.id}');" class="p-2.5 rounded-xl hover:bg-stone-50 cursor-pointer flex items-center justify-between border border-transparent hover:border-stone-200">
              <div>
                <span class="font-semibold text-xs text-stone-900">${i.name}</span>
                <span class="text-[11px] text-stone-500 block">${i.tag}</span>
              </div>
              <span class="text-xs text-stone-400">Eksplor →</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (matchedProducts.length > 0) {
    html += `
      <div class="mb-4">
        <span class="text-[11px] font-bold text-stone-400 uppercase tracking-wider block px-3 mb-2">Formula Produk Edukasi</span>
        <div class="space-y-1">
          ${matchedProducts.map(p => `
            <div onclick="closeSearchModal(); openProductModal('${p.id}');" class="p-2.5 rounded-xl hover:bg-stone-50 cursor-pointer flex items-center justify-between border border-transparent hover:border-stone-200">
              <div class="flex items-center gap-3">
                <img src="${p.image}" class="w-8 h-8 rounded-lg object-cover" onerror="this.src='assets/images/hero.jpg'" />
                <div>
                  <span class="font-semibold text-xs text-stone-900">${p.name}</span>
                  <span class="text-[11px] text-stone-500 block">${p.brand} · ${p.category}</span>
                </div>
              </div>
              <span class="text-xs text-stone-400">Detail →</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (matchedVideos.length > 0) {
    html += `
      <div>
        <span class="text-[11px] font-bold text-stone-400 uppercase tracking-wider block px-3 mb-2">Video Creator</span>
        <div class="space-y-1">
          ${matchedVideos.map(v => `
            <div onclick="closeSearchModal(); openVideoModal('${v.id}');" class="p-2.5 rounded-xl hover:bg-stone-50 cursor-pointer flex items-center justify-between border border-transparent hover:border-stone-200">
              <div>
                <span class="font-semibold text-xs text-stone-900 line-clamp-1">${v.title}</span>
                <span class="text-[11px] text-stone-500 block">${v.creator} · ${v.category}</span>
              </div>
              <span class="text-xs text-stone-400">Tonton →</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  resultsContainer.innerHTML = html;
}

// Toast notification helper
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('appToastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'appToastContainer';
    toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgType = type === 'success' ? 'bg-stone-900 text-white' : type === 'warning' ? 'bg-amber-800 text-white' : 'bg-stone-800 text-white';
  toast.className = `${bgType} px-4 py-3 rounded-xl shadow-lg text-xs font-medium flex items-center gap-2 transform translate-y-2 opacity-0 transition-all duration-300`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
    <span class="flex-1">${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  // Animate out
  setTimeout(() => {
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
