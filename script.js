'use strict';

/* ==========================================
   LIXERA STORE — MAIN SCRIPT
   BAGIAN 1: NAVIGASI, KATALOG, DAN TOP UP
========================================== */

const ADMIN_WA = '628818238236';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const rupiah = (number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(Number(number) || 0);

function showToast(message) {
  const toast = $('#toast');

  if (!toast) {
    alert(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/* ==========================================
   NAVIGASI HALAMAN
========================================== */

function showPage(pageName) {
  const page = $(`#${pageName}`);

  if (!page || !page.classList.contains('page')) {
    showToast('Halaman belum tersedia.');
    return;
  }

  $$('.page').forEach((item) => {
    item.classList.toggle('active', item.id === pageName);
  });

  $$('[data-page]').forEach((button) => {
    button.classList.toggle(
      'active',
      button.dataset.page === pageName
    );
  });

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

$$('[data-page]').forEach((button) => {
  button.addEventListener('click', () => {
    showPage(button.dataset.page);
  });
});

const headerOrders = $('#headerOrders');

if (headerOrders) {
  headerOrders.addEventListener('click', () => {
    showPage('orders');
  });
}

$$('[data-goto]').forEach((button) => {
  button.addEventListener('click', () => {
    showPage(button.dataset.goto);
  });
});

/* ==========================================
   DATA GAME DAN KATALOG TOP UP
   Harga contoh: sesuaikan sebelum website
   dipublikasikan ke pelanggan.
========================================== */

const GAMES = [
  {
    id: 'mobilelegends',
    name: 'Mobile Legends',
    image: 'mobilelegends.png',
    products: [
      { name: '5 Diamonds', price: 2500 },
      { name: '12 Diamonds', price: 5000 },
      { name: '19 Diamonds', price: 7000 },
      { name: '28 Diamonds', price: 9000 },
      { name: '36 Diamonds', price: 11000 },
      { name: '56 Diamonds', price: 16000 },
      { name: '85 Diamonds', price: 23000 },
      { name: '112 Diamonds', price: 30000 },
      { name: 'Weekly Diamond Pass', price: 32500 },
      { name: '170 Diamonds', price: 45000 },
      { name: '240 Diamonds', price: 62000 },
      { name: '296 Diamonds', price: 76000 },
      { name: '408 Diamonds', price: 103000 },
      { name: '568 Diamonds', price: 142000 },
      { name: '875 Diamonds', price: 215000 },
      { name: '2010 Diamonds', price: 490000 }
    ]
  },
  {
    id: 'freefire',
    name: 'Free Fire',
    image: 'freefire.png',
    products: [
      { name: '5 Diamonds', price: 1500 },
      { name: '12 Diamonds', price: 2500 },
      { name: '50 Diamonds', price: 8000 },
      { name: '70 Diamonds', price: 10000 },
      { name: '100 Diamonds', price: 15000 },
      { name: '140 Diamonds', price: 20000 },
      { name: '210 Diamonds', price: 30000 },
      { name: '355 Diamonds', price: 50000 },
      { name: '720 Diamonds', price: 100000 },
      { name: '1450 Diamonds', price: 200000 }
    ]
  },
  {
    id: 'pubgmobile',
    name: 'PUBG Mobile',
    image: 'pubgmobile.png',
    products: [
      { name: '60 UC', price: 16000 },
      { name: '120 UC', price: 32000 },
      { name: '180 UC', price: 47000 },
      { name: '325 UC', price: 79000 },
      { name: '385 UC', price: 95000 },
      { name: '660 UC', price: 158000 },
      { name: '1800 UC', price: 395000 }
    ]
  },
  {
    id: 'honorofkings',
    name: 'Honor of Kings',
    image: 'honorofkings.png',
    products: [
      { name: '8 Tokens', price: 2000 },
      { name: '16 Tokens', price: 4000 },
      { name: '80 Tokens', price: 16000 },
      { name: '240 Tokens', price: 47000 },
      { name: '400 Tokens', price: 78000 },
      { name: '800 Tokens', price: 155000 }
    ]
  },
  {
    id: 'fcmobile',
    name: 'FC Mobile',
    image: 'fcmobile.png',
    products: [
      { name: '40 FC Points', price: 10000 },
      { name: '100 FC Points', price: 23000 },
      { name: '520 FC Points', price: 105000 },
      { name: '1070 FC Points', price: 210000 }
    ]
  },
  {
    id: 'arenaofvalor',
    name: 'Arena of Valor',
    image: 'arenaofvalor.png',
    products: [
      { name: '40 Vouchers', price: 10000 },
      { name: '90 Vouchers', price: 20000 },
      { name: '230 Vouchers', price: 50000 },
      { name: '470 Vouchers', price: 100000 }
    ]
  },
  {
    id: 'magicchessgogo',
    name: 'Magic Chess: Go Go',
    image: 'magicchessgogo.png',
    products: [
      { name: '10 Diamonds', price: 3000 },
      { name: '50 Diamonds', price: 12000 },
      { name: '100 Diamonds', price: 24000 },
      { name: '300 Diamonds', price: 70000 }
    ]
  },
  {
    id: 'football-dream-be-a-pro',
    name: 'Football Dream: Be a Pro',
    image: 'football-dream-be-a-pro.png',
    products: [
      { name: 'Paket Kecil', price: 10000 },
      { name: 'Paket Sedang', price: 25000 },
      { name: 'Paket Besar', price: 50000 }
    ]
  }
];

let selectedGame = null;
let selectedProduct = null;
let currentSearch = '';

/* ==========================================
   TAMPILKAN KARTU GAME
========================================== */

function gameCardHTML(game) {
  return `
    <button
      type="button"
      class="game-card"
      data-select-game="${game.id}"
      aria-label="Pilih ${game.name}"
    >
      <div class="game-logo-wrap">
        <img
          class="game-logo"
          src="${game.image}"
          alt="${game.name}"
          loading="lazy"
          onerror="this.style.opacity='.25'"
        >
      </div>

      <div class="game-name">${game.name}</div>
      <div class="game-status">Top up tersedia</div>
    </button>
  `;
}

function renderGameGrids() {
  const homeGames = $('#homeGames');
  const topupGames = $('#topupGames');

  if (homeGames) {
    homeGames.innerHTML = GAMES
      .slice(0, 4)
      .map(gameCardHTML)
      .join('');
  }

  if (topupGames) {
    topupGames.innerHTML = GAMES
      .map(gameCardHTML)
      .join('');
  }
}

function selectGame(gameId) {
  const game = GAMES.find((item) => item.id === gameId);

  if (!game) {
    showToast('Game tidak ditemukan.');
    return;
  }

  selectedGame = game;
  selectedProduct = null;
  currentSearch = '';

  const search = $('#search');

  if (search) search.value = '';

  const gameTitle = $('#gameTitle');

  if (gameTitle) {
    gameTitle.textContent = game.name;
  }

  const catalog = $('#catalog');

  if (catalog) {
    catalog.classList.remove('hidden');
  }

  const formCard = $('#topupFormCard');

  if (formCard) {
    formCard.classList.add('hidden');
  }

  renderProducts();
  showPage('topup');

  if (catalog) {
    setTimeout(() => {
      catalog.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  }
}

document.addEventListener('click', (event) => {
  const gameButton = event.target.closest('[data-select-game]');

  if (gameButton) {
    selectGame(gameButton.dataset.selectGame);
  }
});

/* ==========================================
   RENDER PRODUK DAN PENCARIAN
========================================== */

function renderProducts() {
  const productsContainer = $('#products');
  const emptyState = $('#empty');

  if (!productsContainer || !selectedGame) return;

  const filtered = selectedGame.products.filter((product) => {
    return product.name
      .toLowerCase()
      .includes(currentSearch.toLowerCase());
  });

  productsContainer.innerHTML = filtered.map((product, index) => `
    <article class="product-card">
      <div class="product-name">${product.name}</div>

      <div class="product-description">
        ${selectedGame.name}
      </div>

      <div class="product-price">
        ${rupiah(product.price)}
      </div>

      <button
        type="button"
        class="btn btn-primary btn-block btn-small"
        data-buy-game="${selectedGame.id}"
        data-product-index="${selectedGame.products.indexOf(product)}"
      >
        Pilih Nominal
      </button>
    </article>
  `).join('');

  if (emptyState) {
    emptyState.classList.toggle('hidden', filtered.length > 0);
  }
}

const searchInput = $('#search');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value.trim();
    renderProducts();
  });
}

const changeGameButton = $('#changeGame');

if (changeGameButton) {
  changeGameButton.addEventListener('click', () => {
    selectedGame = null;
    selectedProduct = null;

    const catalog = $('#catalog');
    const formCard = $('#topupFormCard');

    if (catalog) catalog.classList.add('hidden');
    if (formCard) formCard.classList.add('hidden');

    showPage('topup');
  });
}

/* ==========================================
   PILIH PRODUK TOP UP
========================================== */

document.addEventListener('click', (event) => {
  const buyButton = event.target.closest('[data-buy-game]');

  if (!buyButton) return;

  const game = GAMES.find(
    (item) => item.id === buyButton.dataset.buyGame
  );

  if (!game) return;

  const index = Number(buyButton.dataset.productIndex);
  const product = game.products[index];

  if (!product) {
    showToast('Produk tidak ditemukan.');
    return;
  }

  selectedGame = game;
  selectedProduct = product;

  const chosenProduct = $('#chosenProduct');
  const topupPrice = $('#topupPrice');
  const formCard = $('#topupFormCard');

  if (chosenProduct) {
    chosenProduct.textContent =
      `${game.name} — ${product.name}`;
  }

  if (topupPrice) {
    topupPrice.textContent = rupiah(product.price);
  }

  if (formCard) {
    formCard.classList.remove('hidden');

    setTimeout(() => {
      formCard.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  }
});

/* ==========================================
   DATA ORDER SEMENTARA
   BAGIAN 2 AKAN MENAMBAHKAN PEMBAYARAN,
   JOKI, DAN KONFIRMASI WHATSAPP.
========================================== */

let pendingOrder = null;

function createOrderId() {
  return 'LX' + Date.now().toString().slice(-9);
}

function openWhatsApp(message) {
  const url =
    `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank');
}

/* Inisialisasi katalog game */
renderGameGrids();
/* ==========================================
   BAGIAN 2: JOKI MLBB
========================================== */

const RANKS = [
  { id: 'gm', name: 'Grandmaster', price: 4000, carry: 3000, min: 0, max: 24 },
  { id: 'epic', name: 'Epic', price: 6000, carry: 5000, min: 25, max: 49 },
  { id: 'legend', name: 'Legend', price: 8000, carry: 7000, min: 50, max: 99 },
  { id: 'mythic', name: 'Mythic', price: 18000, carry: 15000, min: 0, max: 24 },
  { id: 'honor', name: 'Mythical Honor', price: 25000, carry: 22000, min: 25, max: 49 },
  { id: 'glory', name: 'Mythical Glory', price: 30000, carry: 28000, min: 50, max: 99 },
  { id: 'immortal', name: 'Mythical Immortal', price: 34000, carry: 32000, min: 100, max: 1000 }
];

let selectedJoki = 'rank';
let pendingJoki = null;

function getRank(id) {
  return RANKS.find(rank => rank.id === id);
}

function rankOptions() {
  return RANKS.map(rank =>
    `<option value="${rank.id}">${rank.name}</option>`
  ).join('');
}

['#rankFrom', '#rankTo', '#gendongRank'].forEach(selector => {
  const select = $(selector);
  if (select) select.innerHTML = rankOptions();
});

function getDivisionStars(rankId, division, stars) {
  const base = {
    gm: 0,
    epic: 25,
    legend: 50
  }[rankId];

  if (base === undefined) return Number(stars) || 0;

  const div = Math.max(1, Math.min(5, Number(division) || 5));
  return base + (5 - div) * 5 + (Number(stars) || 0);
}

function getRankForStar(star) {
  if (star < 25) return getRank('gm');
  if (star < 50) return getRank('epic');
  if (star < 100) return getRank('legend');
  if (star < 125) return getRank('mythic');
  if (star < 150) return getRank('honor');
  if (star < 200) return getRank('glory');
  return getRank('immortal');
}

function calculateRankJoki(from, to) {
  let total = 0;
  const breakdown = [];

  for (let star = from; star < to; star++) {
    const rank = getRankForStar(star);
    total += rank.price;
    breakdown.push(`${rank.name}: ${rupiah(rank.price)}`);
  }

  return { total, breakdown };
}

function updateRankJoki() {
  const fromRank = $('#rankFrom')?.value || 'gm';
  const toRank = $('#rankTo')?.value || 'epic';

  const fromDivision = Number($('#fromDivision')?.value || 5);
  const toDivision = Number($('#toDivision')?.value || 5);
  const fromStars = Number($('#fromStars')?.value || 0);
  const toStars = Number($('#toStars')?.value || 0);

  const from = getDivisionStars(fromRank, fromDivision, fromStars);
  const to = getDivisionStars(toRank, toDivision, toStars);

  const result = calculateRankJoki(from, to);
  const valid = to > from;

  const totalEl = $('#jokiTotal');
  const countEl = $('#jokiStarCount');
  const breakdownEl = $('#jokiBreakdown');

  if (totalEl) totalEl.textContent = valid ? rupiah(result.total) : rupiah(0);
  if (countEl) countEl.textContent = valid ? `${to - from} bintang` : '0 bintang';

  if (breakdownEl) {
    breakdownEl.textContent = valid
      ? result.breakdown.join(' + ')
      : 'Rank tujuan harus lebih tinggi dari rank awal.';
  }
}

function updateDivisionVisibility() {
  const fromRank = $('#rankFrom')?.value || 'gm';
  const toRank = $('#rankTo')?.value || 'epic';

  const fromField = $('#fromDivisionField');
  const toField = $('#toDivisionField');

  if (fromField) {
    fromField.classList.toggle('hidden', !['gm', 'epic', 'legend'].includes(fromRank));
  }

  if (toField) {
    toField.classList.toggle('hidden', !['gm', 'epic', 'legend'].includes(toRank));
  }
}

['#rankFrom', '#rankTo', '#fromDivision', '#toDivision', '#fromStars', '#toStars']
  .forEach(selector => {
    const element = $(selector);
    if (element) {
      element.addEventListener('change', () => {
        updateDivisionVisibility();
        updateRankJoki();
      });
      element.addEventListener('input', updateRankJoki);
    }
  });

function updateGendong() {
  const rankId = $('#gendongRank')?.value || 'gm';
  const stars = Math.max(1, Number($('#gendongStars')?.value || 1));
  const rank = getRank(rankId);
  const total = rank ? rank.carry * stars : 0;

  const countEl = $('#gendongCount');
  const totalEl = $('#gendongTotal');

  if (countEl) countEl.textContent = `${stars} bintang`;
  if (totalEl) totalEl.textContent = rupiah(total);
}

['#gendongRank', '#gendongStars'].forEach(selector => {
  const element = $(selector);
  if (element) {
    element.addEventListener('input', updateGendong);
    element.addEventListener('change', updateGendong);
  }
});

$$('[data-joki]').forEach(button => {
  button.addEventListener('click', () => {
    selectedJoki = button.dataset.joki;

    $$('[data-joki]').forEach(item => {
      item.classList.toggle('active', item === button);
    });

    const rankForm = $('#rankForm');
    const gendongForm = $('#gendongForm');
    const detail = $('#jokiDetail');
    const title = $('#jokiTitle');

    if (rankForm) rankForm.classList.toggle('hidden', selectedJoki !== 'rank');
    if (gendongForm) gendongForm.classList.toggle('hidden', selectedJoki !== 'gendong');
    if (detail) detail.classList.remove('hidden');

    if (title) {
      title.textContent = selectedJoki === 'rank'
        ? 'Joki Rank MLBB'
        : 'Joki Gendong MLBB';
    }

    if (detail) {
      detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const changeJoki = $('#changeJoki');

if (changeJoki) {
  changeJoki.addEventListener('click', () => {
    $('#jokiDetail')?.classList.add('hidden');
  });
}

updateDivisionVisibility();
updateRankJoki();
updateGendong();

/* ==========================================
   MODAL PEMBAYARAN QRIS
========================================== */

const paymentModal = $('#paymentModal');

function openPaymentModal(order) {
  pendingOrder = order;

  if (!paymentModal) {
    showToast('Modal pembayaran tidak ditemukan di HTML.');
    return;
  }

  const productEl = $('#paymentProduct');
  const priceEl = $('#paymentPrice');
  const paidCheck = $('#paidCheck');
  const confirmButton = $('#confirmWA');

  if (productEl) productEl.textContent = order.product;
  if (priceEl) priceEl.textContent = rupiah(order.price);
  if (paidCheck) paidCheck.checked = false;
  if (confirmButton) confirmButton.disabled = true;

  paymentModal.classList.add('show');
  paymentModal.setAttribute('aria-hidden', 'false');
}

function closePaymentModal() {
  if (!paymentModal) return;

  paymentModal.classList.remove('show');
  paymentModal.setAttribute('aria-hidden', 'true');
}

$('#closeModal')?.addEventListener('click', closePaymentModal);
$('#cancelPayment')?.addEventListener('click', closePaymentModal);

paymentModal?.addEventListener('click', event => {
  if (event.target === paymentModal) closePaymentModal();
});

$('#paidCheck')?.addEventListener('change', event => {
  const confirmButton = $('#confirmWA');
  if (confirmButton) confirmButton.disabled = !event.target.checked;
});

/* ==========================================
   RIWAYAT PESANAN
========================================== */

const STORAGE_KEY = 'lixera_store_orders_v1';

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders.slice(0, 50)));
  } catch {
    showToast('Riwayat tidak bisa disimpan di browser ini.');
  }

  renderOrders();
}

function renderOrders() {
  const list = $('#ordersList');
  if (!list) return;

  const orders = getOrders();

  if (!orders.length) {
    list.innerHTML = '<div class="empty-state">Belum ada pesanan.</div>';
    return;
  }

  list.innerHTML = orders.map(order => `
    <article class="order-card">
      <div class="order-card-header">
        <div class="order-card-title">${escapeHTML(order.product)}</div>
        <span class="order-status">${escapeHTML(order.status || 'Menunggu konfirmasi')}</span>
      </div>
      <div class="order-meta">
        ID: ${escapeHTML(order.id)}<br>
        Harga: ${rupiah(order.price)}<br>
        Waktu: ${escapeHTML(order.time)}
      </div>
    </article>
  `).join('');
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

/* ==========================================
   FORM TOP UP
========================================== */

$('#topupForm')?.addEventListener('submit', event => {
  event.preventDefault();

  if (!selectedGame || !selectedProduct) {
    showToast('Pilih game dan nominal terlebih dahulu.');
    return;
  }

  const name = $('#topupName')?.value.trim() || '';
  const whatsapp = $('#topupWA')?.value.trim() || '';
  const gameID = $('#gameID')?.value.trim() || '';
  const server = $('#gameServer')?.value.trim() || '';
  const nickname = $('#nickname')?.value.trim() || '';
  const note = $('#topupNote')?.value.trim() || '';

  if (!name || !whatsapp || !gameID) {
    showToast('Lengkapi nama, WhatsApp, dan ID game.');
    return;
  }

  const order = {
    id: createOrderId(),
    type: 'Top Up',
    product: `${selectedGame.name} — ${selectedProduct.name}`,
    price: selectedProduct.price,
    name,
    whatsapp,
    gameID,
    server,
    nickname,
    note,
    time: new Date().toLocaleString('id-ID'),
    status: 'Menunggu pembayaran'
  };

  pendingOrder = order;
  openPaymentModal(order);
});

/* ==========================================
   KONFIRMASI PEMBAYARAN → WHATSAPP
========================================== */

$('#confirmWA')?.addEventListener('click', () => {
  if (!pendingOrder) {
    showToast('Pesanan tidak ditemukan.');
    return;
  }

  if (!$('#paidCheck')?.checked) {
    showToast('Centang konfirmasi pembayaran terlebih dahulu.');
    return;
  }

  const order = {
    ...pendingOrder,
    status: 'Menunggu verifikasi admin'
  };

  saveOrder(order);

  const message = [
    '*PESANAN LIXERA STORE*',
    '',
    `ID Pesanan: ${order.id}`,
    `Jenis: ${order.type || 'Top Up'}`,
    `Produk: ${order.product}`,
    `Harga: ${rupiah(order.price)}`,
    `Nama: ${order.name || '-'}`,
    `WhatsApp: ${order.whatsapp || '-'}`,
    `ID Game: ${order.gameID || '-'}`,
    `Server: ${order.server || '-'}`,
    `Nickname: ${order.nickname || '-'}`,
    `Catatan: ${order.note || '-'}`,
    '',
    'Saya sudah melakukan pembayaran QRIS. Mohon periksa pembayaran dan pesanan saya.',
    '',
    'Catatan: konfirmasi ini bukan bukti pembayaran otomatis.'
  ].join('\n');

  closePaymentModal();
  openWhatsApp(message);
  showToast('Pesanan disiapkan. Selesaikan konfirmasi di WhatsApp.');
});

/* ==========================================
   FORM JOKI RANK
========================================== */

$('#rankForm')?.addEventListener('submit', event => {
  event.preventDefault();

  const fromRank = $('#rankFrom')?.value || 'gm';
  const toRank = $('#rankTo')?.value || 'epic';

  const from = getDivisionStars(
    fromRank,
    Number($('#fromDivision')?.value || 5),
    Number($('#fromStars')?.value || 0)
  );

  const to = getDivisionStars(
    toRank,
    Number($('#toDivision')?.value || 5),
    Number($('#toStars')?.value || 0)
  );

  if (to <= from) {
    showToast('Rank tujuan harus lebih tinggi dari rank awal.');
    return;
  }

  const result = calculateRankJoki(from, to);
  const name = $('#jokiName')?.value.trim() || '';
  const whatsapp = $('#jokiWA')?.value.trim() || '';
  const note = $('#jokiNote')?.value.trim() || '';

  if (!name || !whatsapp) {
    showToast('Isi nama dan nomor WhatsApp.');
    return;
  }

  openPaymentModal({
    id: createOrderId(),
    type: 'Joki Rank MLBB',
    product: `Joki Rank ${fromRank.toUpperCase()} → ${toRank.toUpperCase()}`,
    price: result.total,
    name,
    whatsapp,
    note,
    time: new Date().toLocaleString('id-ID')
  });
});

/* ==========================================
   FORM JOKI GENDONG
========================================== */

$('#gendongForm')?.addEventListener('submit', event => {
  event.preventDefault();

  const rankId = $('#gendongRank')?.value || 'gm';
  const stars = Math.max(1, Number($('#gendongStars')?.value || 1));
  const rank = getRank(rankId);

  if (!rank) {
    showToast('Pilih rank yang valid.');
    return;
  }

  const name = $('#gendongName')?.value.trim() || '';
  const whatsapp = $('#gendongWA')?.value.trim() || '';
  const note = $('#gendongNote')?.value.trim() || '';

  if (!name || !whatsapp) {
    showToast('Isi nama dan nomor WhatsApp.');
    return;
  }

  openPaymentModal({
    id: createOrderId(),
    type: 'Joki Gendong MLBB',
    product: `Joki Gendong ${rank.name} — ${stars} bintang`,
    price: rank.carry * stars,
    name,
    whatsapp,
    note,
    time: new Date().toLocaleString('id-ID')
  });
});

/* ==========================================
   TOMBOL KEMBALI DAN INISIALISASI
========================================== */

renderOrders();

console.log('LIXERA STORE script loaded.');
