/* =====================================================
   LIXERA STORE — SCRIPT.JS
   Navigation • Slider • Top Up • Joki • QRIS • WhatsApp
===================================================== */

"use strict";


/* =====================================================
   1. KONFIGURASI
===================================================== */

const CONFIG = {
  adminWhatsApp: "628818238236",
  qrisImage: "qrislixera.png",
  sliderInterval: 5000
};


/* =====================================================
   2. KATALOG TOP UP
   WDP Mobile Legends dipertahankan Rp32.500.
   Harga lainnya merupakan harga contoh awal.
===================================================== */

const TOPUP_PRODUCTS = {
  mobilelegends: [
    { name: "Weekly Diamond Pass", price: 32500 },
    { name: "5 Diamonds", price: 3000 },
    { name: "12 Diamonds", price: 5000 },
    { name: "19 Diamonds", price: 7000 },
    { name: "28 Diamonds", price: 10000 },
    { name: "36 Diamonds", price: 12000 },
    { name: "56 Diamonds", price: 17000 },
    { name: "59 Diamonds", price: 18000 },
    { name: "85 Diamonds", price: 25000 },
    { name: "112 Diamonds", price: 32000 },
    { name: "170 Diamonds", price: 47000 },
    { name: "240 Diamonds", price: 65000 },
    { name: "296 Diamonds", price: 80000 },
    { name: "408 Diamonds", price: 110000 },
    { name: "568 Diamonds", price: 150000 },
    { name: "875 Diamonds", price: 230000 },
    { name: "2010 Diamonds", price: 510000 }
  ],

  freefire: [
    { name: "5 Diamonds", price: 1000 },
    { name: "12 Diamonds", price: 2000 },
    { name: "50 Diamonds", price: 8000 },
    { name: "70 Diamonds", price: 10000 },
    { name: "140 Diamonds", price: 20000 },
    { name: "355 Diamonds", price: 49000 },
    { name: "720 Diamonds", price: 95000 },
    { name: "1450 Diamonds", price: 190000 },
    { name: "Membership Mingguan", price: 30000 },
    { name: "Membership Bulanan", price: 85000 }
  ],

  pubgmobile: [
    { name: "60 UC", price: 16000 },
    { name: "120 UC", price: 31000 },
    { name: "180 UC", price: 46000 },
    { name: "325 UC", price: 78000 },
    { name: "660 UC", price: 155000 },
    { name: "1800 UC", price: 390000 },
    { name: "3850 UC", price: 780000 }
  ],

  honorofkings: [
    { name: "16 Tokens", price: 5000 },
    { name: "80 Tokens", price: 20000 },
    { name: "240 Tokens", price: 55000 },
    { name: "400 Tokens", price: 90000 },
    { name: "800 Tokens", price: 175000 }
  ],

  fcmobile: [
    { name: "40 FC Points", price: 10000 },
    { name: "100 FC Points", price: 22000 },
    { name: "520 FC Points", price: 105000 },
    { name: "1070 FC Points", price: 205000 }
  ],

  arenaofvalor: [
    { name: "40 Vouchers", price: 10000 },
    { name: "90 Vouchers", price: 20000 },
    { name: "230 Vouchers", price: 50000 },
    { name: "470 Vouchers", price: 100000 }
  ],

  magicchessgogo: [
    { name: "10 Diamonds", price: 3000 },
    { name: "50 Diamonds", price: 12000 },
    { name: "100 Diamonds", price: 23000 },
    { name: "300 Diamonds", price: 65000 }
  ],

  "football-dream-be-a-pro": [
    { name: "Paket Kecil", price: 10000 },
    { name: "Paket Menengah", price: 25000 },
    { name: "Paket Besar", price: 50000 }
  ]
};


/* =====================================================
   3. HARGA JOKI PER BINTANG
===================================================== */

const JOKI_PRICES = {
  rank: {
    Grandmaster: 4000,
    Epic: 6000,
    Legend: 8000,
    Mythic: 18000,
    Honor: 25000,
    Glory: 30000,
    Immortal: 34000,
    Grading: 235000
  },

  gendong: {
    Grandmaster: 3000,
    Epic: 5000,
    Legend: 7000,
    Mythic: 15000,
    Honor: 22000,
    Glory: 28000,
    Immortal: 32000,
    Grading: 200000
  }
};

const GAME_NAMES = {
  mobilelegends: "Mobile Legends",
  freefire: "Free Fire",
  pubgmobile: "PUBG Mobile",
  honorofkings: "Honor of Kings",
  fcmobile: "FC Mobile",
  arenaofvalor: "Arena of Valor",
  magicchessgogo: "Magic Chess: Go Go",
  "football-dream-be-a-pro": "Football Dream: Be a Pro"
};


/* =====================================================
   4. STATE
===================================================== */

let selectedGame = null;
let selectedProduct = null;
let selectedJokiType = "rank";
let pendingOrder = null;
let currentSlide = 0;
let sliderTimer = null;


/* =====================================================
   5. HELPER FUNCTIONS
===================================================== */

function $(id) {
  return document.getElementById(id);
}

function money(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);
}

function valueOf(id) {
  return String($(id)?.value ?? "").trim();
}

function setText(id, value) {
  const element = $(id);
  if (element) element.textContent = value;
}

function show(element) {
  if (element) element.hidden = false;
}

function hide(element) {
  if (element) element.hidden = true;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function openWhatsApp(message) {
  const url =
    "https://wa.me/" +
    CONFIG.adminWhatsApp +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank", "noopener,noreferrer");
}


/* =====================================================
   6. START WEBSITE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeSlider();
  initializeTopUp();
  initializeJoki();
  initializePayment();

  setText("currentYear", new Date().getFullYear());

  // Tidak ada loading screen.
  // Halaman langsung tampil.
});


/* =====================================================
   7. NAVIGASI HALAMAN
===================================================== */

function initializeNavigation() {
  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();

      navigateTo(button.dataset.go);

      // Tombol game di halaman utama sekaligus memilih game.
      if (button.dataset.game) {
        selectGame(button.dataset.game);
      }
    });
  });
}

function navigateTo(pageName) {
  const pageMap = {
    home: "page-home",
    topup: "page-topup",
    joki: "page-joki"
  };

  const targetId = pageMap[pageName];

  if (!targetId) return;

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const target = $(targetId);

  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-link[data-go]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.go === pageName
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =====================================================
   8. HERO SLIDER
===================================================== */

function initializeSlider() {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dots = Array.from(document.querySelectorAll(".slider-dot"));

  if (!slides.length) return;

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      restartSlider();
    });
  });

  $("prevSlide")?.addEventListener("click", () => {
    showSlide(currentSlide - 1);
    restartSlider();
  });

  $("nextSlide")?.addEventListener("click", () => {
    showSlide(currentSlide + 1);
    restartSlider();
  });

  function startSlider() {
    clearInterval(sliderTimer);

    sliderTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, CONFIG.sliderInterval);
  }

  function restartSlider() {
    startSlider();
  }

  showSlide(0);
  startSlider();
}


/* =====================================================
   9. TOP UP
===================================================== */

function initializeTopUp() {
  document.querySelectorAll(".game-card[data-game]").forEach(button => {
    button.addEventListener("click", () => {
      selectGame(button.dataset.game);
    });
  });

  document.querySelectorAll(".popular-game[data-game]").forEach(button => {
    button.addEventListener("click", () => {
      navigateTo("topup");
      selectGame(button.dataset.game);
    });
  });

  $("changeGame")?.addEventListener("click", () => {
    selectedGame = null;
    selectedProduct = null;

    show($("gameGrid"));
    hide($("topupCatalog"));

    $("topupForm")?.reset();

    setText("selectedProductLabel", "Belum memilih produk");
    setText("topupTotal", money(0));

    $("gameGrid")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  $("topupForm")?.addEventListener("submit", event => {
    event.preventDefault();
    submitTopUp();
  });
}

function selectGame(gameKey) {
  if (!TOPUP_PRODUCTS[gameKey]) {
    alert("Katalog untuk game ini belum tersedia.");
    return;
  }

  selectedGame = gameKey;
  selectedProduct = null;

  navigateTo("topup");

  setText(
    "selectedGameTitle",
    GAME_NAMES[gameKey] || gameKey
  );

  setText("selectedProductLabel", "Belum memilih produk");
  setText("topupTotal", money(0));

  $("topupForm")?.reset();

  renderProducts(gameKey);
  renderGameFields(gameKey);

  hide($("gameGrid"));
  show($("topupCatalog"));

  $("topupCatalog")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function renderProducts(gameKey) {
  const container = $("topupProducts");

  if (!container) return;

  const products = TOPUP_PRODUCTS[gameKey] || [];

  container.innerHTML = products.map((product, index) => `
    <button
      type="button"
      class="product-card"
      data-product-index="${index}"
      aria-pressed="false"
    >
      <span class="product-name">
        ${escapeHTML(product.name)}
      </span>

      <strong class="product-price">
        ${money(product.price)}
      </strong>
    </button>
  `).join("");

  container.querySelectorAll("[data-product-index]").forEach(button => {
    button.addEventListener("click", () => {
      chooseProduct(Number(button.dataset.productIndex));
    });
  });
}

function chooseProduct(index) {
  const products = TOPUP_PRODUCTS[selectedGame] || [];
  const product = products[index];

  if (!product) return;

  selectedProduct = product;

  document.querySelectorAll("#topupProducts .product-card").forEach(button => {
    const active = Number(button.dataset.productIndex) === index;

    button.classList.toggle("selected", active);
    button.setAttribute("aria-pressed", String(active));
  });

  setText("selectedProductLabel", product.name);
  setText("topupTotal", money(product.price));
}

function renderGameFields(gameKey) {
  const container = $("gameFields");

  if (!container) return;

  const fields = {
    mobilelegends: [
      {
        label: "ID Mobile Legends",
        id: "gameId",
        placeholder: "Masukkan ID game"
      },
      {
        label: "Server",
        id: "gameServer",
        placeholder: "Contoh: 1234"
      },
      {
        label: "Nickname",
        id: "gameNickname",
        placeholder: "Masukkan nickname"
      }
    ],

    freefire: [
      {
        label: "ID Free Fire",
        id: "gameId",
        placeholder: "Masukkan ID game"
      },
      {
        label: "Nickname",
        id: "gameNickname",
        placeholder: "Masukkan nickname"
      }
    ],

    pubgmobile: [
      {
        label: "Character ID PUBG",
        id: "gameId",
        placeholder: "Masukkan Character ID"
      },
      {
        label: "Nickname",
        id: "gameNickname",
        placeholder: "Masukkan nickname"
      }
    ],

    honorofkings: [
      {
        label: "ID Honor of Kings",
        id: "gameId",
        placeholder: "Masukkan ID game"
      },
      {
        label: "Nickname",
        id: "gameNickname",
        placeholder: "Masukkan nickname"
      }
    ],

    fcmobile: [
      {
        label: "User ID FC Mobile",
        id: "gameId",
        placeholder: "Masukkan User ID"
      },
      {
        label: "Nickname",
        id: "gameNickname",
        placeholder: "Masukkan nickname"
      }
    ],

    arenaofvalor: [
      {
        label: "ID Arena of Valor",
        id: "gameId",
        placeholder: "Masukkan ID game"
      },
      {
        label: "Nickname",
        id: "gameNickname",
        placeholder: "Masukkan nickname"
      }
    ],

    magicchessgogo: [
      {
        label: "ID Magic Chess",
        id: "gameId",
        placeholder: "Masukkan ID game"
      },
      {
        label: "Nickname",
        id: "gameNickname",
        placeholder: "Masukkan nickname"
      }
    ],

    "football-dream-be-a-pro": [
      {
        label: "ID Pemain",
        id: "gameId",
        placeholder: "Masukkan ID pemain"
      },
      {
        label: "Nickname",
        id: "gameNickname",
        placeholder: "Masukkan nickname"
      }
    ]
  };

  container.innerHTML = (fields[gameKey] || []).map(field => `
    <label class="form-group">
      <span>${escapeHTML(field.label)}</span>

      <input
        type="text"
        id="${field.id}"
        name="${field.id}"
        placeholder="${escapeHTML(field.placeholder)}"
        autocomplete="off"
        required
      >
    </label>
  `).join("");
}

function submitTopUp() {
  if (!selectedGame || !selectedProduct) {
    alert("Pilih game dan nominal top up terlebih dahulu.");
    return;
  }

  const customerName = valueOf("topupName");
  const gameId = valueOf("gameId");
  const gameServer = valueOf("gameServer");
  const nickname = valueOf("gameNickname");

  if (!customerName || !gameId || !nickname) {
    alert("Lengkapi semua data pesanan.");
    return;
  }

  if (selectedGame === "mobilelegends" && !gameServer) {
    alert("Masukkan server Mobile Legends.");
    return;
  }

  pendingOrder = {
    type: "TOP UP GAME",
    game: GAME_NAMES[selectedGame],
    product: selectedProduct.name,
    price: selectedProduct.price,
    customerName,
    details: {
      "ID Game": gameId,
      ...(gameServer ? { Server: gameServer } : {}),
      Nickname: nickname
    }
  };

  openPayment();
}


/* =====================================================
   10. JOKI
===================================================== */

function initializeJoki() {
  document.querySelectorAll("[data-joki]").forEach(button => {
    button.addEventListener("click", () => {
      openJoki(button.dataset.joki);
    });
  });

  $("jokiForm")?.addEventListener("submit", event => {
    event.preventDefault();
    submitJokiRank();
  });

  $("jokiGendongForm")?.addEventListener("submit", event => {
    event.preventDefault();
    submitJokiGendong();
  });

  initializeRankCalculator();
}

function openJoki(type) {
  selectedJokiType = type === "gendong" ? "gendong" : "rank";

  show($("jokiDetail"));

  const rankForm = $("jokiForm");
  const gendongForm = $("jokiGendongForm");

  if (selectedJokiType === "rank") {
    show(rankForm);
    hide(gendongForm);

    setText("jokiServiceTitle", "JOKI RANK");
    setText("jokiPriceType", "Joki Rank");

    if ($("jokiBannerImage")) {
      $("jokiBannerImage").src = "bannerjokirank.png";
    }
  } else {
    hide(rankForm);
    show(gendongForm);

    setText("jokiServiceTitle", "JOKI GENDONG");
    setText("jokiPriceType", "Joki Gendong");

    if ($("jokiBannerImage")) {
      $("jokiBannerImage").src = "bannerjokigendong.png";
    }
  }

  updateRankInputs();
  calculateJokiPrice();

  $("jokiDetail")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* =====================================================
   11. KALKULATOR RANK
===================================================== */

/*
  GM, Epic, Legend:
  Tiap rank memiliki tier V, IV, III, II, I.
  Setiap tier berisi 0–5 bintang.

  Mythic: 0–24 bintang.
  Honor: 25–49 bintang.
  Glory: 50–99 bintang.
  Immortal: 100+ bintang.

  Harga dihitung berdasarkan setiap bintang yang dilewati.
*/

const RANK_ORDER = [
  "Grandmaster",
  "Epic",
  "Legend",
  "Mythic",
  "Honor",
  "Glory",
  "Immortal"
];

const TIER_ORDER = ["V", "IV", "III", "II", "I"];

function initializeRankCalculator() {
  [
    "startRank",
    "startTier",
    "startStars",
    "endRank",
    "endTier",
    "endStars"
  ].forEach(id => {
    $(id)?.addEventListener("change", () => {
      updateRankInputs();
      calculateJokiPrice();
    });

    $(id)?.addEventListener("input", calculateJokiPrice);
  });

  document.querySelectorAll("[data-counter]").forEach(button => {
    button.addEventListener("click", () => {
      const input = $(button.dataset.counter);

      if (!input) return;

      const amount = Number(button.dataset.amount || 0);
      const min = Number(input.min || 0);
      const max = Number(input.max || 1000000);
      const current = Number(input.value || 0);

      input.value = Math.max(
        min,
        Math.min(max, current + amount)
      );

      calculateJokiPrice();
    });
  });

  updateRankInputs();
  calculateJokiPrice();
}

function updateRankInputs() {
  ["start", "end"].forEach(prefix => {
    const rank = valueOf(prefix + "Rank");
    const tierGroup = $(prefix + "TierGroup");
    const tierInput = $(prefix + "Tier");
    const starsInput = $(prefix + "Stars");

    const usesTier = [
      "Grandmaster",
      "Epic",
      "Legend"
    ].includes(rank);

    if (tierGroup) {
      tierGroup.hidden = !usesTier;
    }

    if (tierInput) {
      tierInput.disabled = !usesTier;
    }

    if (starsInput) {
      if (rank === "Mythic") {
        starsInput.min = 0;
        starsInput.max = 24;
      } else if (rank === "Honor") {
        starsInput.min = 25;
        starsInput.max = 49;
      } else if (rank === "Glory") {
        starsInput.min = 50;
        starsInput.max = 99;
      } else if (rank === "Immortal") {
        starsInput.min = 100;
        starsInput.max = 1000000;
      } else {
        starsInput.min = 0;
        starsInput.max = 5;
      }

      const current = Number(starsInput.value || 0);

      if (current < Number(starsInput.min)) {
        starsInput.value = starsInput.min;
      }

      if (current > Number(starsInput.max)) {
        starsInput.value = starsInput.max;
      }
    }
  });
}

function getRankScore(prefix) {
  const rank = valueOf(prefix + "Rank");
  const tier = valueOf(prefix + "Tier") || "V";
  const stars = Math.max(
    0,
    Number(valueOf(prefix + "Stars")) || 0
  );

  if (["Grandmaster", "Epic", "Legend"].includes(rank)) {
    const rankIndex = RANK_ORDER.indexOf(rank);
    const tierIndex = TIER_ORDER.indexOf(tier);

    return (
      rankIndex * 25 +
      Math.max(0, tierIndex) * 5 +
      Math.min(stars, 5)
    );
  }

  if (rank === "Mythic") {
    return 75 + Math.min(stars, 24);
  }

  if (rank === "Honor") {
    return 100 + Math.max(0, Math.min(stars - 25, 24));
  }

  if (rank === "Glory") {
    return 125 + Math.max(0, Math.min(stars - 50, 49));
  }

  if (rank === "Immortal") {
    return 175 + Math.max(0, stars - 100);
  }

  return 0;
}

function rankAtScore(score) {
  if (score < 25) return "Grandmaster";
  if (score < 50) return "Epic";
  if (score < 75) return "Legend";
  if (score < 100) return "Mythic";
  if (score < 125) return "Honor";
  if (score < 175) return "Glory";

  return "Immortal";
}

function calculateJokiPrice() {
  if (!$("startRank") || !$("endRank")) return 0;

  const startScore = getRankScore("start");
  const endScore = getRankScore("end");

  if (endScore <= startScore) {
    setText("jokiTotal", mon
