"use strict";

/* ==========================================
   LIXERA STORE — SCRIPT.JS
   Katalog, Top Up, Joki, QRIS, WhatsApp
========================================== */

const ADMIN_WA = "628818238236";
const STORAGE_KEY = "lixera_orders_v1";

/* ==========================================
   1. DATA GAME DAN KATALOG HARGA
========================================== */

const games = [
  {
    id: "ml",
    name: "Mobile Legends",
    image: "mobilelegends.png",
    icon: "⚔️",
    products: [
      ["5 Diamond", 1600], ["10 Diamond", 3545],
      ["12 Diamond", 3845], ["19 Diamond", 6500],
      ["28 Diamond", 10000], ["44 Diamond", 13800],
      ["54 Diamond", 16700], ["59 Diamond", 17800],
      ["71 Diamond", 22000], ["74 Diamond", 23400],
      ["85 Diamond", 26400], ["88 Diamond", 27400],
      ["110 Diamond", 33000], ["113 Diamond", 35000],
      ["128 Diamond", 43112], ["148 Diamond", 49000],
      ["222 Diamond", 75000], ["240 Diamond", 79000],
      ["277 Diamond", 86000], ["284 Diamond", 87430],
      ["296 Diamond", 90000], ["301 Diamond", 104000],
      ["346 Diamond", 109435], ["356 Diamond", 113000],
      ["370 Diamond", 114800], ["384 Diamond", 118000],
      ["408 Diamond", 125100], ["424 Diamond", 131230],
      ["452 Diamond", 147900], ["518 Diamond", 171200],
      ["568 Diamond", 182345], ["601 Diamond", 194320],
      ["642 Diamond", 207132], ["716 Diamond", 231000],
      ["758 Diamond", 249100], ["790 Diamond", 258000],
      ["845 Diamond", 274000], ["875 Diamond", 281200],
      ["938 Diamond", 301000], ["1045 Diamond", 313000],
      ["1136 Diamond", 364238], ["1159 Diamond", 373100],
      ["1443 Diamond", 462233], ["1506 Diamond", 482344],
      ["1704 Diamond", 546022], ["2010 Diamond", 562376],
      ["2232 Diamond", 692222], ["2625 Diamond", 815000],
      ["3453 Diamond", 1081456],
      ["Weekly Diamond Pass 1x", 31500],
      ["Weekly Diamond Pass 2x", 63000],
      ["Weekly Diamond Pass 3x", 94500],
      ["Twilight Pass", 170000],
      ["Weekly Elite Bundle", 17200],
      ["Monthly Efic Bundle", 84756]
    ]
  },
  {
    id: "ff",
    name: "Free Fire",
    image: "freefire.png",
    icon: "🔥",
    products: [
      ["5 Diamond", 950], ["10 Diamond", 1962],
      ["20 Diamond", 3800], ["50 Diamond", 7300],
      ["70 Diamond", 9500], ["80 Diamond", 12000],
      ["100 Diamond", 14356], ["120 Diamond", 18700],
      ["130 Diamond", 19100], ["145 Diamond", 21300],
      ["150 Diamond", 22100], ["190 Diamond", 28760],
      ["200 Diamond", 30118], ["210 Diamond", 31000],
      ["280 Diamond", 40900], ["355 Diamond", 47320],
      ["420 Diamond", 58876], ["425 Diamond", 59132],
      ["475 Diamond", 67344], ["495 Diamond", 69786],
      ["500 Diamond", 70000], ["510 Diamond", 72400],
      ["545 Diamond", 77100], ["565 Diamond", 79333],
      ["600 Diamond", 86111], ["635 Diamond", 89100],
      ["720 Diamond", 97000], ["800 Diamond", 109345],
      ["860 Diamond", 118222], ["930 Diamond", 128999],
      ["1000 Diamond", 139000], ["1050 Diamond", 142500],
      ["1075 Diamond", 152000], ["1080 Diamond", 149000],
      ["1440 Diamond", 200000], ["1450 Diamond", 230000],
      ["2160 Diamond", 301000], ["2180 Diamond", 305000],
      ["7290 Diamond", 982000], ["36500 Diamond", 5005000],
      ["73100 Diamond", 10010000],
      ["Member Mingguan", 28000],
      ["Member Bulanan", 93000],
      ["BP Card", 47000],
      ["Level Up Pass 6", 6000],
      ["Level Up Pass 10", 9800],
      ["Level Up Pass 15", 9800],
      ["Level Up Pass 20", 9800],
      ["Level Up Pass 30", 15000]
    ]
  },
  {
    id: "pubg",
    name: "PUBG Mobile",
    image: "pubgmobile.png",
    icon: "🎯",
    products: [
      ["60 UC", 17000], ["120 UC", 34000],
      ["300 + 25 UC", 85000], ["600 + 60 UC", 170500],
      ["1500 + 300 UC", 425000], ["3000 + 850 UC", 850000],
      ["6000 + 2100 UC", 1700000],
      ["12000 + 4200 UC", 3400000],
      ["18000 + 6300 UC", 5096000],
      ["24000 + 8400 UC", 6795000],
      ["36000 + 12600 UC", 10192000],
      ["48000 + 16800 UC", 13600000]
    ]
  },
  {
    id: "hok",
    name: "Honor of Kings",
    image: "honorofkings.png",
    icon: "👑",
    products: [
      ["80 Token", 16200], ["240 Token", 47200],
      ["400 Token", 80200], ["560 Token", 107000],
      ["800 + 30 Token", 160500],
      ["2400 + 108 Token", 480500],
      ["4000 + 180 Token", 802000],
      ["8000 + 360 Token", 1600000]
    ]
  },
  {
    id: "fc",
    name: "FC Mobile",
    image: "fcmobile.png",
    icon: "⚽",
    products: [
      ["40 FC Point", 6800], ["100 FC Point", 16000],
      ["520 FC Point", 78000], ["1070 FC Point", 157000],
      ["2200 FC Point", 323500], ["5750 FC Point", 784444],
      ["12000 FC Point", 1570000],
      ["39 Silver", 6900], ["99 Silver", 16300],
      ["499 Silver", 78000], ["999 Silver", 156999],
      ["1999 Silver", 323500], ["4999 Silver", 785987],
      ["9999 Silver", 1600000]
    ]
  },
  {
    id: "aov",
    name: "Arena of Valor",
    image: "arenaofvalor.png",
    icon: "🛡️",
    products: [
      ["40 Voucher", 10200], ["90 Voucher", 20200],
      ["230 Voucher", 50200], ["470 Voucher", 100200],
      ["950 Voucher", 200500], ["1430 Voucher", 300500],
      ["2390 Voucher", 500500]
    ]
  },
  {
    id: "mcgg",
    name: "Magic Chess GoGo",
    image: "magicchessgogo.png",
    icon: "♟️",
    products: [
      ["5 Diamond", 1800], ["12 Diamond", 4500],
      ["19 Diamond", 6799], ["28 Diamond", 9764],
      ["44 Diamond", 15000], ["59 Diamond", 20122],
      ["86 Diamond", 29311], ["170 Diamond", 58200],
      ["240 Diamond", 81500], ["296 Diamond", 96600],
      ["408 Diamond", 137333], ["568 Diamond", 188888],
      ["875 Diamond", 290000], ["2010 Diamond", 638200],
      ["4830 Diamond", 1500000],
      ["Weekly Card", 32000],
      ["Lukas Latest Bounty", 18888],
      ["Battle for Discount", 18888]
    ]
  },
  {
    id: "fdbp",
    name: "Football Dream",
    image: "football-dream-be-a-pro.png",
    icon: "🏟️",
    products: [
      ["60 Supreme Token", 14600],
      ["180 Supreme Token", 42800],
      ["300 Supreme Token", 71000],
      ["680 Supreme Token", 142300],
      ["940 Supreme Token", 212500],
      ["1280 Supreme Token", 284200],
      ["1980 Supreme Token", 425555],
      ["3120 Supreme Token", 707800],
      ["6480 Supreme Token", 1420000],
      ["Indonesian Garuda", 24200]
    ]
  }
];

/* ==========================================
   2. TARIF JOKI
========================================== */

const rankOrder = ["GM", "Epic", "Legend", "Mythic", "Honor", "Glory", "Immortal"];

const rankLabels = {
  GM: "Grandmaster",
  Epic: "Epic",
  Legend: "Legend",
  Mythic: "Mythic",
  Honor: "Mythical Honor",
  Glory: "Mythical Glory",
  Immortal: "Mythical Immortal"
};

const rankRates = {
  GM: 4000,
  Epic: 6000,
  Legend: 8000,
  Mythic: 18000,
  Honor: 25000,
  Glory: 30000,
  Immortal: 34000
};

const gendongRates = {
  GM: 3000,
  Epic: 5000,
  Legend: 7000,
  Mythic: 15000,
  Honor: 22000,
  Glory: 28000,
  Immortal: 32000
};

/*
  Skor internal untuk menghitung perjalanan rank.

  GM, Epic, Legend:
  tiap divisi V sampai I mewakili satu tingkat.
  Setiap tingkat memiliki 0-5 bintang.

  Mythic:   0-24
  Honor:   25-49
  Glory:   50-99
  Immortal: 100+

  Skor internal:
  GM     -75 s/d -51
  Epic   -50 s/d -26
  Legend -25 s/d -1
  Mythic   0 s/d 24
  Honor   25 s/d 49
  Glory   50 s/d 99
  Immortal 100+
*/

const rankBase = {
  GM: -75,
  Epic: -50,
  Legend: -25,
  Mythic: 0,
  Honor: 25,
  Glory: 50,
  Immortal: 100
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const money = amount =>
  "Rp" + Math.round(Number(amount) || 0).toLocaleString("id-ID");

const escapeHTML = value =>
  String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function getOrders() {
  try {
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(orders) ? orders : [];
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    showToast("Pesanan tidak bisa disimpan di perangkat ini.");
  }
}

/* ==========================================
   3. NAVIGASI HALAMAN
========================================== */

function navigateTo(pageId) {
  const page = $("#" + pageId);
  if (!page) return;

  $$(".page").forEach(item => item.classList.remove("active"));
  page.classList.add("active");

  $$(".nav-item").forEach(item => {
    item.classList.toggle("active", item.dataset.page === pageId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

$$("[data-page]").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    navigateTo(button.dataset.page);
  });
});

$("#headerOrders")?.addEventListener("click", () => {
  navigateTo("orders");
});

/* ==========================================
   4. BANNER SLIDER
========================================== */

(function initSlider() {
  const slides = $$("#homeSlider .slide");
  const dots = $$("#homeSliderDots .dot");

  if (!slides.length) return;

  let activeIndex = 0;

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === activeIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === activeIndex);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  setInterval(() => showSlide(activeIndex + 1), 5000);
})();

/* ==========================================
   5. GAMBAR KATEGORI
========================================== */

function gameCardHTML(game) {
  return `
    <button class="game-card" type="button" data-game="${escapeHTML(game.id)}">
      <span class="game-logo-wrap">
        <img src="${escapeHTML(game.image)}"
             alt="${escapeHTML(game.name)}"
             loading="lazy"
             onerror="this.style.display='none'">
        <span class="game-fallback">${escapeHTML(game.icon)}</span>
      </span>
      <span class="game-name">${escapeHTML(game.name)}</span>
    </button>
  `;
}

function renderGameGrids() {
  const html = games.map(gameCardHTML).join("");

  if ($("#homeGames")) $("#homeGames").innerHTML = html;
  if ($("#topupGames")) $("#topupGames").innerHTML = html;
}

renderGameGrids();

let selectedGame = null;
let selectedProduct = null;

function selectGame(gameId) {
  const game = games.find(item => item.id === gameId);
  if (!game) return;

  selectedGame = game;
  selectedProduct = null;

  $("#gameTitle").textContent = game.name;
  $("#changeGame").hidden = false;
  $("#topupFormCard").hidden = true;
  $("#search").value = "";

  $$(".game-card").forEach(card => {
    card.classList.toggle("selected", card.dataset.game === gameId);
  });

  renderProducts();
  $("#catalog").scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("click", event => {
  const gameButton = event.target.closest("[data-game]");
  if (gameButton) selectGame(gameButton.dataset.game);
});

function renderProducts() {
  const productGrid = $("#products");
  const empty = $("#empty");

  if (!selectedGame) {
    productGrid.innerHTML = "";
    empty.hidden = false;
    empty.querySelector("h3").textContent = "Belum Ada Produk";
    empty.querySelector("p").textContent = "Pilih salah satu game untuk melihat katalog.";
    return;
  }

  const query = ($("#search").value || "").trim().toLowerCase();

  const products = selectedGame.products.filter(product =>
    product[0].toLowerCase().includes(query)
  );

  productGrid.innerHTML = products.map((product, index) => {
    const originalIndex = selectedGame.products.indexOf(product);
    const isSelected =
      selectedProduct &&
      selectedProduct.gameId === selectedGame.id &&
      selectedProduct.index === originalIndex;

    return `
      <button class="product-card ${isSelected ? "selected" : ""}"
              type="button"
              data-product-index="${originalIndex}">
        <span class="product-name">${escapeHTML(product[0])}</span>
        <span class="product-desc">${escapeHTML(selectedGame.name)}</span>
        <span class="product-price">${money(product[1])}</span>
        <span class="product-select">${isSelected ? "DIPILIH ✓" : "PILIH PRODUK"}</span>
      </button>
    `;
  }).join("");

  empty.hidden = products.length > 0;

  if (!products.length) {
    empty.querySelector("h3").textContent = "Produk Tidak Ditemukan";
    empty.querySelector("p").textContent = "Coba kata kunci pencarian lain.";
  }
}

$("#search")?.addEventListener("input", renderProducts);

$("#products")?.addEventListener("click", event => {
  const card = event.target.closest("[data-product-index]");
  if (!card || !selectedGame) return;

  const index = Number(card.dataset.productIndex);
  const product = selectedGame.products[index];
  if (!product) return;

  selectedProduct = {
    gameId: selectedGame.id,
    gameName: selectedGame.name,
    index,
    name: product[0],
    price: product[1]
  };

  $("#chosenProduct").textContent = product[0];
  $("#topupPrice").textContent = money(product[1]);
  $("#topupFormCard").hidden = false;

  renderProducts();

  $("#topupFormCard").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

$("#changeGame")?.addEventListener("click", () => {
  $("#topupGames")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

/* ==========================================
   6. FORM TOP UP
========================================== */

let pendingOrder = null;

function validPhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

function normalizePhone(phone) {
  let digits = String(phone || "").replace(/\D/g, "");
  if (digits.startsWith("0")) digits = "62" + digits.slice(1);
  if (digits.startsWith("8")) digits = "62" + digits;
  return digits;
}

function openPayment(order) {
  pendingOrder = {
    ...order,
    orderId: "LX" + Date.now().toString().slice(-9),
    createdAt: new Date().toISOString(),
    status: "Menunggu konfirmasi admin"
  };

  $("#paymentProduct").textContent = order.product;
  $("#paymentPrice").textContent = money(order.price);
  $("#paidCheck").checked = false;
  $("#confirmWA").disabled = true;
  $("#paymentModal").hidden = false;
  document.body.style.overflow = "hidden";
}

function closePayment() {
  $("#paymentModal").hidden = true;
  document.body.style.overflow = "";
}

$("#closeModal")?.addEventListener("click", closePayment);
$("#cancelPayment")?.addEventListener("click", closePayment);

$("#paymentModal")?.addEventListener("click", event => {
  if (event.target.id === "paymentModal") closePayment();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && $("#paymentModal") && !$("#paymentModal").hidden) {
    closePayment();
  }
});

$("#paidCheck")?.addEventListener("change", event => {
  $("#confirmWA").disabled = !event.target.checked;
});

$("#topupForm")?.addEventListener("submit", event => {
  event.preventDefault();

  if (!selectedProduct) {
    showToast("Pilih produk Top Up terlebih dahulu.");
    return;
  }

  const name = $("#topupName").value.trim();
  const phone = $("#topupWA").value.trim();
  const gameId = $("#gameID").value.trim();
  const server = $("#gameServer").value.trim();
  const nickname = $("#nickname").value.trim();
  const note = $("#topupNote").value.trim();

  if (!name || !validPhone(phone) || !gameId) {
    showToast("Periksa nama, nomor WhatsApp, dan ID game.");
    return;
  }

  openPayment({
    type: "Top Up",
    game: selectedProduct.gameName,
    product: selectedProduct.name,
    price: selectedProduct.price,
    name,
    phone: normalizePhone(phone),
    gameId,
    server,
    nickname,
    note
  });
});

/* ==========================================
   7. PERHITUNGAN PANGKAT JOKI
========================================== */

function divisionNumber(value) {
  const divisions = { V: 0, IV: 1, III: 2, II: 3, I: 4 };
  return divisions[value] ?? 0;
}

function getRankScore(rank, stars, division) {
  stars = Number(stars) || 0;

  if (rank === "GM" || rank === "Epic" || rank === "Legend") {
    return rankBase[rank] + divisionNumber(division) * 5 + stars;
  }

  if (rank === "Mythic") return stars;
  if (rank === "Honor") return 25 + (stars - 25);
  if (rank === "Glory") return 50 + (stars - 50);
  if (rank === "Immortal") return stars;

  return 0;
}

function validateRankStars(rank, stars) {
  if (!Number.isInteger(stars)) return false;

  if (["GM", "Epic", "Legend"].includes(rank)) {
    return stars >= 0 && stars <= 5;
  }

  if (rank === "Mythic") return stars >= 0 && stars <= 24;
  if (rank === "Honor") return stars >= 25 && stars <= 49;
  if (rank === "Glory") return stars >= 50 && stars <= 99;
  if (rank === "Immortal") return stars >= 100 && stars <= 1000;

  return false;
}

function describeRank(rank, stars, division) {
  if (["GM", "Epic", "Legend"].includes(rank)) {
    return `${rankLabels[rank]} ${division} — ${stars} bintang`;
  }

  return `${rankLabels[rank]} — ${stars} bintang`;
}

/*
  Tarif bertingkat:
  setiap rentang bintang memakai tarif rank yang dilalui.
  Harga bukan tarif rank tujuan dikali seluruh bintang.

  Rentang:
  - GM/Epic/Legend: skor sebelum Mythic
  - Mythic: 0-24
  - Honor: 25-49
  - Glory: 50-99
  - Immortal: 100+
*/

function getRateForScore(score, isGendong = false) {
  let rank;

  if (score < -50) rank = "GM";
  else if (score < -25) rank = "Epic";
  else if (score < 0) rank = "Legend";
  else if (score < 25) rank = "Mythic";
  else if (score < 50) rank = "Honor";
  else if (score < 100) rank = "Glory";
  else rank = "Immortal";

  return isGendong ? gendongRates[rank] : rankRates[rank];
}

function calculateTieredPrice(startScore, endScore, isGendong = false) {
  if (endScore <= startScore) {
    return { total: 0, stars: 0, breakdown: [] };
  }

  let total = 0;
  let cursor = startScore;
  const breakdown = [];

  while (cursor < endScore) {
    const rate = getRateForScore(cursor, isGendong);

    let nextBoundary;

    if (cursor < -50) nextBoundary = -50;
    else if (cursor < -25) nextBoundary = -25;
    else if (cursor < 0) nextBoundary = 0;
    else if (cursor < 25) nextBoundary = 25;
    else if (cursor < 50) nextBoundary = 50;
    else if (cursor < 100) nextBoundary = 100;
    else nextBoundary = endScore;

    const segmentEnd = Math.min(endScore, nextBoundary);
    const count = segmentEnd - cursor;

    if (count <= 0) break;

    total += count * rate;
    breakdown.push({
      count,
      rate,
      total: count * rate,
      rank: getRateRank(cursor)
    });

    cursor = segmentEnd;
  }

  return {
    total,
    stars: endScore - startScore,
    breakdown
  };
}

function getRateRank(score) {
  if (score < -50) return "GM";
  if (score < -25) return "Epic";
  if (score < 0) return "Legend";
  if (score < 25) return "Mythic";
  if (score < 50) return "Honor";
  if (score < 100) return "Glory";
  return "Immortal";
}

function formatBreakdown(result) {
  if (!result.breakdown.length) {
    return "Target harus lebih tinggi dari rank saat ini.";
  }

  return result.breakdown.map(item =>
    `${item.count} bintang ${rankLabels[item.rank]} × ${money(item.rate)} = ${money(item.total)}`
  ).join("\n");
}

/* ==========================================
 
