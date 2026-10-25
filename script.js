/* =====================================================
   LIXERA STORE - MAIN JAVASCRIPT
   Navigasi, Top Up, Joki, QRIS, WhatsApp
===================================================== */

/* ===================== KONFIGURASI ===================== */

const CONFIG = {
  adminWhatsApp: "628818238236",
  qrisImage: "qrislixera.png",
  slideInterval: 5000,
  loaderDuration: 4000
};

/*
  HARGA TOP UP
  Silakan sesuaikan harga selain WDP dengan katalog final.
  Harga Weekly Diamond Pass dipertahankan Rp32.500.
*/

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

/*
  CATATAN:
  Harga di atas selain Weekly Diamond Pass adalah contoh awal,
  bukan hasil pengecekan harga market real-time.
*/


/* ===================== HARGA JOKI ===================== */

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

const RANKS = [
  "Grandmaster",
  "Epic",
  "Legend",
  "Mythic",
  "Honor",
  "Glory",
  "Immortal"
];


/* ===================== FUNGSI UMUM ===================== */

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

function getElement(id) {
  return document.getElementById(id);
}

function showElement(element) {
  if (element) element.style.display = "";
}

function hideElement(element) {
  if (element) element.style.display = "none";
}

function setText(id, value) {
  const element = getElement(id);
  if (element) element.textContent = value;
}

function safeText(value) {
  return String(value ?? "").trim();
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


/* ===================== LOADING SCREEN ===================== */

document.addEventListener("DOMContentLoaded", () => {
  const loader = getElement("loader");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");

      setTimeout(() => {
        loader.style.display = "none";
      }, 600);
    }, CONFIG.loaderDuration);
  }

  initializeNavigation();
  initializeSlider();
  initializeTopUp();
  initializeJoki();
  initializePayment();
});


/* ===================== NAVIGASI HALAMAN ===================== */

function initializeNavigation() {
  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => {
      navigateTo(button.dataset.go);
    });
  });

  const backButtons = document.querySelectorAll("[data-back]");

  backButtons.forEach(button => {
    button.addEventListener("click", () => {
      navigateTo(button.dataset.back || "home");
    });
  });
}

function navigateTo(pageName) {
  const pageIds = {
    home: "page-home",
    topup: "page-topup",
    joki: "page-joki"
  };

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const target = getElement(pageIds[pageName]);

  if (target) {
    target.classList.add("active");
  }

  document.querySelectorAll("[data-go]").forEach(button => {
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


/* ===================== SLIDER BANNER ===================== */

function initializeSlider() {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dots = Array.from(document.querySelectorAll(".slider-dot"));

  if (!slides.length) return;

  let currentSlide = 0;

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
    dot.addEventListener("click", () => showSlide(index));
  });

  const previous = getElement("prevSlide");
  const next = getElement("nextSlide");

  if (previous) {
    previous.addEventListener("click", () => {
      showSlide(currentSlide - 1);
    });
  }

  if (next) {
    next.addEventListener("click", () => {
      showSlide(currentSlide + 1);
    });
  }

  showSlide(0);

  setInterval(() => {
    showSlide(currentSlide + 1);
  }, CONFIG.slideInterval);
}


/* ===================== TOP UP GAME ===================== */

let selectedGame = "";
let selectedProduct = null;

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

function initializeTopUp() {
  document.querySelectorAll("[data-game]").forEach(button => {
    button.addEventListener("click", () => {
      selectGame(button.dataset.game);
    });
  });

  const changeGameButton = getElement("changeGame");

  if (changeGameButton) {
    changeGameButton.addEventListener("click", () => {
      selectedGame = "";
      selectedProduct = null;

      hideElement(getElement("topupCatalog"));
      showElement(getElement("gameGrid"));

      const form = getElement("topupForm");
      if (form) form.reset();
    });
  }

  const form = getElement("topupForm");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      submitTopUpOrder();
    });
  }
}

function selectGame(gameKey) {
  if (!TOPUP_PRODUCTS[gameKey]) {
    alert("Katalog game ini belum tersedia.");
    return;
  }

  selectedGame = gameKey;
  selectedProduct = null;

  setText("selectedGameTitle", GAME_NAMES[gameKey] || gameKey);

  hideElement(getElement("gameGrid"));
  showElement(getElement("topupCatalog"));

  renderTopUpProducts(gameKey);
  renderGameFields(gameKey);

  setText("selectedProductLabel", "Belum memilih produk");
  setText("topupTotal", formatRupiah(0));

  const form = getElement("topupForm");
  if (form) form.reset();

  const catalog = getElement("topupCatalog");
  if (catalog) {
    catalog.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function renderTopUpProducts(gameKey) {
  const container = getElement("topupProducts");
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
        ${formatRupiah(product.price)}
      </strong>
    </button>
  `).join("");

  container.querySelectorAll("[data-product-index]").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.productIndex);
      chooseTopUpProduct(index);
    });
  });
}

function chooseTopUpProduct(index) {
  const products = TOPUP_PRODUCTS[selectedGame] || [];
  selectedProduct = products[index];

  if (!selectedProduct) return;

  const container = getElement("topupProducts");

  if (container) {
    container.querySelectorAll("[data-product-index]").forEach(button => {
      const isSelected =
        Number(button.dataset.productIndex) === index;

      button.classList.toggle("selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
  }

  setText("selectedProductLabel", selectedProduct.name);
  setText("topupTotal", formatRupiah(selectedProduct.price));
}

function renderGameFields(gameKey) {
  const container = getElement("gameFields");
  if (!container) return;

  const fields = {
    mobilelegends: [
      { name: "ID Game", id: "gameId", placeholder: "Masukkan ID Mobile Legends" },
      { name: "Server", id: "gameServer", placeholder: "Contoh: 1234" },
      { name: "Nickname", id: "gameNickname", placeholder: "Masukkan nickname" }
    ],

    freefire: [
      { name: "ID Game", id: "gameId", placeholder: "Masukkan ID Free Fire" },
      { name: "Nickname", id: "gameNickname", placeholder: "Masukkan nickname" }
    ],

    pubgmobile: [
      { name: "ID Game", id: "gameId", placeholder: "Masukkan Character ID PUBG" },
      { name: "Nickname", id: "gameNickname", placeholder: "Masukkan nickname" }
    ],

    honorofkings: [
      { name: "ID Game", id: "gameId", placeholder: "Masukkan ID Honor of Kings" },
      { name: "Nickname", id: "gameNickname", placeholder: "Masukkan nickname" }
    ],

    fcmobile: [
      { name: "User ID", id: "gameId", placeholder: "Masukkan User ID" },
      { name: "Nickname", id: "gameNickname", placeholder: "Masukkan nickname" }
    ],

    arenaofvalor: [
      { name: "ID Game", id: "gameId", placeholder: "Masukkan ID Arena of Valor" },
      { name: "Nickname", id: "gameNickname", placeholder: "Masukkan nickname" }
    ],

    magicchessgogo: [
      { name: "ID Game", id: "gameId", placeholder: "Masukkan ID game" },
      { name: "Nickname", id: "gameNickname", placeholder: "Masukkan nickname" }
    ],

    "football-dream-be-a-pro": [
      { name: "ID Game", id: "gameId", placeholder: "Masukkan ID game" },
      { name: "Nickname", id: "gameNickname", placeholder: "Masukkan nickname" }
    ]
  };

  container.innerHTML = (fields[gameKey] || []).map(field => `
    <label class="form-group">
      <span>${escapeHTML(field.name)}</span>
      <input
        type="text"
        id="${field.id}"
        name="${field.id}"
        placeholder="${escapeHTML(field.placeholder)}"
        required
        autocomplete="off"
      >
    </label>
  `).join("");
}

function submitTopUpOrder() {
  if (!selectedGame || !selectedProduct) {
    alert("Pilih game dan nominal top up terlebih dahulu.");
    return;
  }

  const gameId = safeText(getElement("gameId")?.value);
  const gameServer = safeText(getElement("gameServer")?.value);
  const nickname = safeText(getElement("gameNickname")?.value);
  const customerName = safeText(getElement("topupName")?.value);

  if (!customerName || !gameId || !nickname) {
    alert("Lengkapi nama pemesan, ID game, dan nickname.");
    return;
  }

  if (selectedGame === "mobilelegends" && !gameServer) {
    alert("Masukkan server Mobile Legends.");
    return;
  }

  pendingOrder = {
    type: "TOP UP",
    game: GAME_NAMES[selectedGame],
    product: selectedProduct.name,
    price: selectedProduct.price,
    customerName,
    details: {
      "ID Game": gameId,
      ...(gameServer ? { "Server": gameServer } : {}),
      "Nickname": nickname
    }
  };

  openPaymentModal(pendingOrder);
}


/* ===================== JOKI ===================== */

let selectedJokiType = "rank";
let pendingOrder = null;

function initializeJoki() {
  document.querySelectorAll("[data-joki]").forEach(button => {
    button.addEventListener("click", () => {
      openJokiService(button.dataset.joki);
    });
  });

  const rankForm = getElement("jokiForm");

  if (rankForm) {
    rankForm.addEventListener("submit", event => {
      event.preventDefault();
      submitJokiRank();
    });
  }

  const gendongForm = getElement("jokiGendongForm");

  if (gendongForm) {
    gendongForm.addEventListener("submit", event => {
      event.preventDefault();
      submitJokiGendong();
    });
  }

  initializeRankCalculator();
}

function openJokiService(type) {
  selectedJokiType = type === "gendong" ? "gendong" : "rank";

  const detail = getElement("jokiDetail");
  if (detail) showElement(detail);

  const rankFields = getElement("jokiRankFields");
  const gendongFields = getElement("jokiGendongFields");

  if (selectedJokiType === "rank") {
    showElement(rankFields);
    hideElement(gendongFields);

    setText("jokiServiceTitle", "JOKI RANK");

    const banner = getElement("jokiBannerImage");
    if (banner) banner.src = "bannerjokirank.png";
  } else {
    hideElement(rankFields);
    showElement(gendongFields);

    setText("jokiServiceTitle", "JOKI GENDONG");

    const banner = getElement("jokiBannerImage");
    if (banner) banner.src = "bannerjokigendong.png";
  }

  const element = getElement("jokiDetail");

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  calculateJokiPrice();
}

function initializeRankCalculator() {
  const calculatorIds = [
    "startRank",
    "startTier",
    "startStars",
    "endRank",
    "endTier",
    "endStars"
  ];

  calculatorIds.forEach(id => {
    const element = getElement(id);

    if (element) {
      element.addEventListener("change", calculateJokiPrice);
      element.addEventListener("input", calculateJokiPrice);
    }
  });

  document.querySelectorAll("[data-counter]").forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.counter;
      const amount = Number(button.dataset.amount || 0);
      const input = getElement(targetId);

      if (!input) return;

      const min = Number(input.min || 0);
      const max = Number(input.max || 1000000);
      const current = Number(input.value || 0);

      input.value = Math.max(min, Math.min(max, current + amount));

      calculateJokiPrice();
    });
  });

  calculateJokiPrice();
}

/*
  Sistem bintang:
  GM / Epic / Legend:
    Tier V = 0-5 bintang, lalu IV, III, II, I.
  Mythic = 0-24 bintang.
  Honor = 25-49 bintang.
  Glory = 50-99 bintang.
  Immortal = 100 bintang ke atas.

  Harga dihitung per bintang pada setiap rank yang dilewati.
*/

function getRankPosition(rank, tier, stars) {
  const tierOrder = {
    V: 0,
    IV: 1,
    III: 2,
    II: 3,
    I: 4
  };

  if (["Grandmaster", "Epic", "Legend"].includes(rank)) {
    const validTier = tierOrder[tier] ?? 0;
    const validStars = Math.max(0, Math.min(5, Number(stars) || 0));

    const rankIndex = RANKS.indexOf(rank);

    return rankIndex * 25 + validTier * 5 + validStars;
  }

  const value = Math.max(0, Number(stars) || 0);

  if (rank === "Mythic") return 75 + Math.min(value, 24);
  if (rank === "Honor") return 100 + Math.max(0, Math.min(value - 25, 24));
  if (rank === "Glory") return 125 + Math.max(0, Math.min(value - 50, 49));
  if (rank === "Immortal") return 175 + Math.max(0, value - 100);

  return 0;
}

function getRankNameByPosition(position) {
  if (position < 25) return "Grandmaster";
  if (position < 50) return "Epic";
  if (position < 75) return "Legend";
  if (position < 100) return "Mythic";
  if (position < 125) return "Honor";
  if (position < 175) return "Glory";
  return "Immortal";
}

function calculateJokiPrice() {
  const startRank = getElement("startRank");
  const endRank = getElement("endRank");

  if (!startRank || !endRank) return;

  const startPosition = getRankPosition(
    startRank.value,
    getElement("startTier")?.value || "V",
    getElement("startStars")?.value || 0
  );

  const endPosition = getRankPosition(
    endRank.value,
    getElement("endTier")?.value || "V",
    getElement("endStars")?.value || 0
  );

  const priceList = JOKI_PRICES[selectedJokiType] || JOKI_PRICES.rank;

  if (endPosition <= startPosition) {
    setText("jokiTotal", formatRupiah(0));
    setText("jokiPriceNote", "Rank tujuan harus lebih tinggi dari rank awal.");
    return;
  }

  let total = 0;

  for (let position = startPosition + 1; position <= endPosition; position++) {
    const rank = getRankNameByPosition(position);
    total += priceList[rank] || 0;
  }

  setText("jokiTotal", formatRupiah(total));
  setText(
    "jokiPriceNote",
    `Estimasi ${endPosition - startPosition} langkah bintang. Harga mengikuti tarif rank yang dilewati.`
  );

  return total;
}

function submitJokiRank() {
  const name = safeText(getElement("jokiName")?.value);
  const whatsapp = safeText(getElement("jokiWhatsapp")?.value);
  const request = safeText(getElement("jokiRequest")?.value);

  const total = calculateJokiPrice();

  if (!name || !whatsapp) {
    alert("Isi nama pemesan dan nomor WhatsApp.");
    return;
  }

  if (!total || total <= 0) {
    alert("Periksa rank awal dan rank tujuan.");
    return;
  }

  pendingOrder = {
    type: "JOKI RANK",
    product: `${getElement("startRank")?.value} ke ${getElement("endRank")?.value}`,
    price: total,
    customerName: name,
    details: {
      "No. WhatsApp": whatsapp,
      "Rank Awal": getElement("startRank")?.value,
      "Tier Awal": getElement("startTier")?.value || "-",
      "Bintang Awal": getElement("startStars")?.value || "0",
      "Rank Tujuan": getElement("endRank")?.value,
      "Tier Tujuan": getElement("endTier")?.value || "-",
      "Bintang Tujuan": getElement("endStars")?.value || "0",
      "Request": request || "-"
    }
  };

  openPaymentModal(pendingOrder);
}

function submitJokiGendong() {
  const name = safeText(getElement("gendongName")?.value);
  const mlId = safeText(getElement("mlId")?.value);
  const mlNick = safeText(getElement("ml
