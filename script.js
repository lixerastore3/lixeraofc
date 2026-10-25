"use strict";

/* =========================================
   KONFIGURASI LIXERA STORE
========================================= */

const ADMIN_WHATSAPP = "628818238236";
const LOADING_DURATION = 4000;
const SLIDER_INTERVAL = 5000;

const rupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

/* =========================================
   LOADING SCREEN 4 DETIK
========================================= */

window.addEventListener("load", () => {
  window.setTimeout(() => {
    $("#loader")?.classList.add("done");
  }, LOADING_DURATION);
});

$$(".year").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

/* =========================================
   NAVIGASI HALAMAN
========================================= */

function showPage(pageName) {
  const target = $(`#page-${pageName}`);

  if (!target) return;

  $$(".page").forEach((page) => {
    page.classList.remove("active");
  });

  target.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

$$("[data-page]").forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

/* =========================================
   SLIDER BANNER HALAMAN UTAMA
========================================= */

const slides = $$(".slide");
const dots = $$(".dot");
const previousButton = $(".prev");
const nextButton = $(".next");

let currentSlide = 0;
let sliderTimer = null;

function showSlide(index) {
  if (!slides.length) return;

  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function startSlider() {
  window.clearInterval(sliderTimer);

  if (slides.length > 1) {
    sliderTimer = window.setInterval(() => {
      showSlide(currentSlide + 1);
    }, SLIDER_INTERVAL);
  }
}

previousButton?.addEventListener("click", () => {
  showSlide(currentSlide - 1);
  startSlider();
});

nextButton?.addEventListener("click", () => {
  showSlide(currentSlide + 1);
  startSlider();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    startSlider();
  });
});

showSlide(0);
startSlider();

/* =========================================
   DATA GAME TOP UP
   Nama gambar harus sesuai dengan file
   yang ada di repository GitHub.
========================================= */

const games = [
  {
    id: "mobilelegends",
    name: "Mobile Legends",
    image: "catagorymobilelegend.jpg",
    products: [
      { name: "Weekly Diamond Pass", price: 32500 },
      { name: "5 Diamonds", price: 2500 },
      { name: "12 Diamonds", price: 4500 },
      { name: "19 Diamonds", price: 6500 },
      { name: "28 Diamonds", price: 8500 },
      { name: "36 Diamonds", price: 10500 },
      { name: "56 Diamonds", price: 15500 },
      { name: "59 Diamonds", price: 16500 },
      { name: "85 Diamonds", price: 23500 },
      { name: "112 Diamonds", price: 30500 },
      { name: "170 Diamonds", price: 45500 },
      { name: "240 Diamonds", price: 62500 },
      { name: "296 Diamonds", price: 76500 },
      { name: "408 Diamonds", price: 104500 },
      { name: "568 Diamonds", price: 143500 },
      { name: "716 Diamonds", price: 180500 },
      { name: "875 Diamonds", price: 219500 },
      { name: "1159 Diamonds", price: 289500 },
      { name: "1500 Diamonds", price: 370000 },
      { name: "2010 Diamonds", price: 490000 }
    ]
  },

  {
    id: "freefire",
    name: "Free Fire",
    image: "catagoryfreefire.jpg",
    products: [
      { name: "5 Diamonds", price: 1000 },
      { name: "12 Diamonds", price: 2000 },
      { name: "50 Diamonds", price: 8000 },
      { name: "70 Diamonds", price: 10000 },
      { name: "100 Diamonds", price: 15000 },
      { name: "140 Diamonds", price: 20000 },
      { name: "210 Diamonds", price: 30000 },
      { name: "355 Diamonds", price: 50000 },
      { name: "500 Diamonds", price: 70000 },
      { name: "720 Diamonds", price: 100000 },
      { name: "1000 Diamonds", price: 135000 },
      { name: "1450 Diamonds", price: 190000 },
      { name: "2180 Diamonds", price: 285000 }
    ]
  },

  {
    id: "pubgmobile",
    name: "PUBG Mobile",
    image: "catagorypubgmobile.jpg",
    products: [
      { name: "60 UC", price: 16000 },
      { name: "120 UC", price: 31000 },
      { name: "180 UC", price: 46000 },
      { name: "325 UC", price: 76000 },
      { name: "385 UC", price: 92000 },
      { name: "660 UC", price: 150000 },
      { name: "720 UC", price: 165000 },
      { name: "1800 UC", price: 390000 },
      { name: "3850 UC", price: 780000 }
    ]
  },

  {
    id: "honorofkings",
    name: "Honor of Kings",
    image: "catagoryhonorofkings.jpg",
    products: [
      { name: "8 Tokens", price: 3000 },
      { name: "16 Tokens", price: 5000 },
      { name: "80 Tokens", price: 15000 },
      { name: "240 Tokens", price: 45000 },
      { name: "400 Tokens", price: 75000 },
      { name: "800 Tokens", price: 145000 }
    ]
  },

  {
    id: "fc mobile",
    name: "FC Mobile",
    image: "catagoryfcmobile.jpg",
    products: [
      { name: "40 FC Points", price: 10000 },
      { name: "100 FC Points", price: 22000 },
      { name: "520 FC Points", price: 100000 },
      { name: "1070 FC Points", price: 195000 },
      { name: "2200 FC Points", price: 390000 }
    ]
  },

  {
    id: "arenaofvalor",
    name: "Arena of Valor",
    image: "catagoryarenaofvalor.jpg",
    products: [
      { name: "40 Vouchers", price: 10000 },
      { name: "90 Vouchers", price: 20000 },
      { name: "230 Vouchers", price: 50000 },
      { name: "470 Vouchers", price: 100000 },
      { name: "950 Vouchers", price: 195000 }
    ]
  },

  {
    id: "magicchess",
    name: "Magic Chess: Go Go",
    image: "catagorymagicchesgogo.jpg",
    products: [
      { name: "Weekly Pass", price: 15000 },
      { name: "Small Pack", price: 10000 },
      { name: "Medium Pack", price: 25000 },
      { name: "Large Pack", price: 50000 }
    ]
  },

  {
    id: "footballdream",
    name: "Football Dream: Be a Pro",
    image: "catagoryfootbal dreambeapro.jpg",
    products: [
      { name: "Paket 1", price: 10000 },
      { name: "Paket 2", price: 25000 },
      { name: "Paket 3", price: 50000 },
      { name: "Paket 4", price: 100000 }
    ]
  }
];

/* =========================================
   RENDER KATALOG GAME
========================================= */

const gameGrid = $("#gameGrid");
const topupCatalog = $("#topupCatalog");
const topupProducts = $("#topupProducts");
const selectedGameTitle = $("#selectedGameTitle");
const topupTotal = $("#topupTotal");

let selectedGame = null;
let selectedTopupProduct = null;

function renderGames() {
  if (!gameGrid) return;

  gameGrid.innerHTML = games.map((game) => `
    <button
      type="button"
      class="game-card"
      data-game="${game.id}"
    >
      <img
        src="${game.image}"
        alt="${game.name}"
        loading="lazy"
        onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"
      >
      <span class="fallback" style="display:none">
        ${game.name.slice(0, 2).toUpperCase()}
      </span>
      <strong>${game.name}</strong>
      <small>PILIH GAME ↗</small>
    </button>
  `).join("");

  $$(".game-card").forEach((button) => {
    button.addEventListener("click", () => {
      selectGame(button.dataset.game);
    });
  });
}

function selectGame(gameId) {
  selectedGame = games.find((game) => game.id === gameId);

  if (!selectedGame) return;

  selectedTopupProduct = null;

  $$(".game-card").forEach((button) => {
    button.classList.toggle(
      "selected",
      button.dataset.game === gameId
    );
  });

  selectedGameTitle.textContent =
    `${selectedGame.name} — Pilih Nominal`;

  renderTopupProducts();

  topupCatalog.classList.remove("hidden");

  topupCatalog.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  updateTopupTotal();
}

function renderTopupProducts() {
  if (!selectedGame || !topupProducts) return;

  topupProducts.innerHTML = selectedGame.products.map(
    (product, index) => `
      <button
        type="button"
        class="product"
        data-product-index="${index}"
      >
        <strong>${product.name}</strong>
        <span>${rupiah(product.price)}</span>
      </button>
    `
  ).join("");

  $$(".product").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.productIndex);

      selectedTopupProduct = selectedGame.products[index];

      $$(".product").forEach((productButton) => {
        productButton.classList.toggle(
          "selected",
          productButton === button
        );
      });

      updateTopupTotal();
    });
  });
}

function updateTopupTotal() {
  if (!topupTotal) return;

  topupTotal.textContent = selectedTopupProduct
    ? rupiah(selectedTopupProduct.price)
    : "Pilih nominal";
}

$("#closeCatalog")?.addEventListener("click", () => {
  topupCatalog.classList.add("hidden");

  gameGrid.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

renderGames();

/* =========================================
   DATA HARGA JOKI
   Mengikuti dua poster yang dikirim.
========================================= */

const jokiPrices = {
  rank: [
    { name: "Grandmaster", price: 4000 },
    { name: "Epic", price: 6000 },
    { name: "Legend", price: 8000 },
    { name: "Mythic", price: 18000 },
    { name: "Honor", price: 25000 },
    { name: "Glory", price: 30000 },
    { name: "Immortal", price: 34000 },
    { name: "Mythic Grading", price: 235000 }
  ],

  gendong: [
    { name: "Grandmaster", price: 3000 },
    { name: "Epic", price: 5000 },
    { name: "Legend", price: 7000 },
    { name: "Mythic", price: 15000 },
    { name: "Honor", price: 22000 },
    { name: "Glory", price: 28000 },
    { name: "Immortal", price: 32000 },
    { name: "Mythic Grading", price: 200000 }
  ]
};

let selectedJokiType = null;
let selectedJokiProduct = null;

const jokiDetail = $("#jokiDetail");
const jokiProducts = $("#jokiProducts");
const jokiTitle = $("#jokiTitle");
const jokiBannerImage = $("#jokiBannerImage");
const jokiTotal = $("#jokiTotal");

function selectJoki(type) {
  if (!jokiPrices[type]) return;

  selectedJokiType = type;
  selectedJokiProduct = null;

  const isRank = type === "rank";

  jokiTitle.textContent = isRank
    ? "JOKI RANK"
    : "JOKI GENDONG";

  jokiBannerImage.src = isRank
    ? "bannerjokirank.png"
    : "bannerjokigendong.png";

  jokiBannerImage.alt = isRank
    ? "Banner Joki Rank"
    : "Banner Joki Gendong";

  jokiBannerImage.onerror = () => {
    jokiBannerImage.style.display = "none";
  };

  jokiBannerImage.onload = () => {
    jokiBannerImage.style.display = "block";
  };

  renderJokiProducts();

  jokiDetail.classList.remove("hidden");

  jokiDetail.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  updateJokiTotal();
}

$$("[data-joki]").forEach((button) => {
  button.addEventListener("click", () => {
    selectJoki(button.dataset.joki);
  });
});

function renderJokiProducts() {
  if (!selectedJokiType || !jokiProducts) return;

  jokiProducts.innerHTML = jokiPrices[selectedJokiType].map(
    (product, index) => `
      <button
        type="button"
        class="product"
        data-joki-index="${index}"
      >
        <strong>${product.name}</strong>
        <span>${rupiah(product.price)}</span>
      </button>
    `
  ).join("");

  $$(".joki-products .product").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.jokiIndex);

      selectedJokiProduct =
        jokiPrices[selectedJokiType][index];

      $$(".joki-products .product").forEach((item) => {
        item.classList.toggle("selected", item === button);
      });

      updateJokiTotal();
    });
  });
}

function updateJokiTotal() {
  if (!jokiTotal) return;

  jokiTotal.textContent = selectedJokiProduct
    ? rupiah(selectedJokiProduct.price)
    : "Pilih produk";
}

$("#closeJoki")?.addEventListener("click", () => {
  jokiDetail.classList.add("hidden");

  $(".joki-cats")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

/* =========================================
   POPUP QRIS DAN KONFIRMASI WHATSAPP
========================================= */

const paymentModal = $("#paymentModal");
const paidCheck = $("#paidCheck");
const confirmWhatsApp = $("#confirmWhatsApp");

let currentOrder = null;

function openPayment(order) {
  currentOrder = order;

  $("#paymentProduct").textContent = order.product;
  $("#paymentTotal").textContent = rupiah(order.price);

  paidCheck.checked = false;
  confirmWhatsApp.disabled = true;

  paymentModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closePayment() {
  paymentModal.classList.add("hidden");
  document.body.style.overflow = "";
}

$("#closePayment")?.addEventListener("click", closePayment);

paymentModal?.addEventListener("click", (event) => {
  if (event.target === paymentModal) {
    closePayment();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && paymentModal) {
    closePayment();
  }
});

paidCheck?.addEventListener("change", () => {
  confirmWhatsApp.disabled = !paidCheck.checked;
});

/* =========================================
   FORM ORDER TOP UP
========================================= */

$("#topupForm")?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!selectedGame) {
    alert("Pilih game terlebih dahulu.");
    return;
  }

  if (!selectedTopupProduct) {
    alert("Pilih nominal top up terlebih dahulu.");
    return;
  }

  const name = $("#topupName").value.trim();
  const playerId = $("#playerId").value.trim();
  const serverId = $("#serverId").value.trim();

  if (!name || !playerId) {
    alert("Lengkapi nama dan ID game terlebih dahulu.");
    return;
  }

  const serverText = serverId || "Tidak diisi";

  openPayment({
    type: "TOP UP",
    product: `${selectedGame.name} - ${selectedTopupProduct.name}`,
    price: selectedTopupProduct.price,
    details: [
      `Nama Pemesan: ${name}`,
      `Game: ${selectedGame.name}`,
      `ID Game: ${playerId}`,
      `Server/Zone ID: ${serverText}`,
      `Produk: ${selectedTopupProduct.name}`,
      `Total: ${rupiah(selectedTopupProduct.price)}`
    ]
  });
});

/* =========================================
   FORM ORDER JOKI
========================================= */

$("#jokiForm")?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!selectedJokiType || !selectedJokiProduct) {
    alert("Pilih layanan dan produk joki terlebih dahulu.");
    return;
  }

  const name = $("#jokiName").value.trim();
  const nick = $("#jokiNick").value.trim();
  const gameId = $("#jokiId").value.trim();
  const server = $("#jokiServer").value.trim();
  const notes = $("#jokiNotes").value.trim();

  if (!name || !nick || !gameId) {
    alert("Lengkapi nama, nickname, dan ID game.");
    return;
  }

  const serviceName = selectedJokiType === "rank"
    ? "JOKI RANK"
    : "JOKI GENDONG";

  openPayment({
    type: "JOKI",
    product: `${serviceName} - ${selectedJokiProduct.name}`,
    price: selectedJokiProduct.price,
    details: [
      `Nama Pemesan: ${name}`,
      `Layanan: ${serviceName}`,
      `Nickname ML: ${nick}`,
      `ID Game: ${gameId}`,
      `Server: ${server || "Tidak diisi"}`,
      `Rank/Pesanan: ${selectedJokiProduct.name}`,
      `Catatan: ${notes || "Tidak ada"}`,
      `Total: ${rupiah(selectedJokiProduct.price)}`
    ]
  });
});

/* =========================================
   KONFIRMASI VIA WHATSAPP
========================================= */

confirmWhatsApp?.addEventListener("click", () => {
  if (!currentOrder || !paidCheck.checked) {
    alert("Centang konfirmasi pembayaran terlebih dahulu.");
    return;
  }

  const message = [
    "HALO ADMIN LIXERA STORE!",
    "",
    "Saya ingin mengonfirmasi pesanan.",
    "",
    `Jenis Pesanan: ${currentOrder.type}`,
    ...currentOrder.details,
    "",
    "Saya sudah melakukan pembayaran QRIS.",
    "Mohon periksa dan verifikasi pembayaran saya.",
    "",
    "Terima kasih."
  ].join("\n");

  const whatsappURL =
    `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});

/* =========================================
   SELESAI
========================================= */

console.log("LIXERA STORE berhasil dimuat.");
