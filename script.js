"use strict";

/* =========================
   LIXERA STORE - SCRIPT.JS
========================= */

const ADMIN_WA = "628818238236";

const rupiah = n => "Rp" + Number(n).toLocaleString("id-ID");
const $ = id => document.getElementById(id);

let selectedProduct = null;
let selectedJoki = null;
let currentGame = null;
let currentCategory = "Semua";
let pendingOrder = null;

function toast(msg) {
  const el = $("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2800);
}

function showPage(page) {
  document.querySelectorAll("[data-page-section]").forEach(el => {
    el.classList.toggle("active", el.dataset.pageSection === page);
  });

  document.querySelectorAll("[data-page]").forEach(el => {
    el.classList.toggle("active", el.dataset.page === page);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", e => {
  const btn = e.target.closest("[data-page]");
  if (btn) {
    e.preventDefault();
    showPage(btn.dataset.page);
  }
});

/* =========================
   BANNER SLIDER
========================= */

(() => {
  const slides = [...document.querySelectorAll(".slide")];
  const dots = [...document.querySelectorAll(".slider-dot")];
  if (!slides.length) return;

  let index = 0;

  function renderSlide(i) {
    index = (i + slides.length) % slides.length;

    slides.forEach((s, n) => s.classList.toggle("active", n === index));
    dots.forEach((d, n) => d.classList.toggle("active", n === index));
  }

  $("prevSlide")?.addEventListener("click", () => renderSlide(index - 1));
  $("nextSlide")?.addEventListener("click", () => renderSlide(index + 1));

  dots.forEach(dot => {
    dot.addEventListener("click", () => renderSlide(Number(dot.dataset.slide)));
  });

  setInterval(() => renderSlide(index + 1), 5000);
})();

/* =========================
   KATALOG GAME
========================= */

const games = {
  ml: {
    name: "Mobile Legends",
    image: "mobilelegends.png",
    fields: ["ID Mobile Legends", "Server"],
    products: [
      ["5 DM",1600],["10 DM",3545],["12 DM",3845],
      ["19 DM",6500],["28 DM",10000],["44 DM",13800],
      ["54 DM",16700],["59 DM",17800],["71 DM",22000],
      ["74 DM",23400],["85 DM",26400],["88 DM",27400],
      ["110 DM",33000],["113 DM",35000],["128 DM",43112],
      ["148 DM",49000],["222 DM",75000],["240 DM",79000],
      ["277 DM",86000],["284 DM",87430],["296 DM",90000],
      ["301 DM",104000],["346 DM",109435],["356 DM",113000],
      ["370 DM",114800],["384 DM",118000],["408 DM",125100],
      ["424 DM",131230],["452 DM",147900],["518 DM",171200],
      ["568 DM",182345],["601 DM",194320],["642 DM",207132],
      ["716 DM",231000],["758 DM",249100],["790 DM",258000],
      ["845 DM",274000],["875 DM",281200],["938 DM",301000],
      ["1045 DM",313000],["1136 DM",364238],["1159 DM",373100],
      ["1443 DM",462233],["1506 DM",482344],["1704 DM",546022],
      ["2010 DM",562376],["2232 DM",692222],
      ["2625 DM",815000],["3453 DM",1081456],
      ["Weekly Diamond Pass 1x",31500],
      ["Weekly Diamond Pass 2x",63000],
      ["Weekly Diamond Pass 3x",94500],
      ["Twilight Pass",170000],
      ["Weekly Elite Bundle",17200],
      ["Monthly Efic Bundle",84756]
    ]
  },

  ff: {
    name: "Free Fire",
    image: "freefire.png",
    fields: ["ID Free Fire"],
    products: [
      ["5 DM",950],["10 DM",1962],["20 DM",3800],
      ["50 DM",7300],["70 DM",9500],["80 DM",12000],
      ["100 DM",14356],["120 DM",18700],["130 DM",19100],
      ["145 DM",21300],["150 DM",22100],["190 DM",28760],
      ["200 DM",30118],["210 DM",31000],["280 DM",40900],
      ["355 DM",47320],["420 DM",58876],["425 DM",59132],
      ["475 DM",67344],["495 DM",69786],["500 DM",70000],
      ["510 DM",72400],["545 DM",77100],["565 DM",79333],
      ["600 DM",86111],["635 DM",89100],["720 DM",97000],
      ["800 DM",109345],["860 DM",118222],["930 DM",128999],
      ["1000 DM",139000],["1050 DM",142500],["1075 DM",152000],
      ["1080 DM",149000],["1440 DM",200000],["1450 DM",230000],
      ["2160 DM",301000],["2180 DM",305000],
      ["7290 DM",982000],["36500 DM",5005000],
      ["73100 DM",10010000],
      ["Member Mingguan",28000],["Member Bulanan",93000],
      ["BP Card",47000],["Level Up Pass 6",6000],
      ["Level Up Pass 10",9800],["Level Up Pass 15",9800],
      ["Level Up Pass 20",9800],["Level Up Pass 30",15000]
    ]
  },

  pubg: {
    name: "PUBG Mobile",
    image: "pubgmobile.png",
    fields: ["Character ID PUBG"],
    products: [
      ["60 UC",17000],["120 UC",34000],
      ["300 UC + Bonus 25 UC",85000],
      ["600 UC + Bonus 60 UC",170500],
      ["1500 UC + Bonus 300 UC",425000],
      ["3000 UC + Bonus 850 UC",850000],
      ["6000 UC + Bonus 2100 UC",1700000],
      ["12000 UC + Bonus 4200 UC",3400000],
      ["18000 UC + Bonus 6300 UC",5096000],
      ["24000 UC + Bonus 8400 UC",6795000],
      ["36000 UC + Bonus 12600 UC",10192000],
      ["48000 UC + Bonus 16800 UC",13600000]
    ]
  },

  hok: {
    name: "Honor of Kings",
    image: "honorofkings.png",
    fields: ["ID Honor of Kings"],
    products: [
      ["80 Token",16200],["240 Token",47200],
      ["400 Token",80200],["560 Token",107000],
      ["800 Token + Bonus 30",160500],
      ["2400 Token + Bonus 108",480500],
      ["4000 Token + Bonus 180",802000],
      ["8000 Token + Bonus 360",1600000]
    ]
  },

  fc: {
    name: "EA Sports FC Mobile",
    image: "fcmobile.png",
    fields: ["ID FC Mobile"],
    products: [
      ["40 FC Point",6800],["100 FC Point",16000],
      ["520 FC Point",78000],["1070 FC Point",157000],
      ["2200 FC Point",323500],["5750 FC Point",784444],
      ["12000 FC Point",1570000],
      ["39 Silver",6900],["99 Silver",16300],
      ["499 Silver",78000],["999 Silver",156999],
      ["1999 Silver",323500],["4999 Silver",785987],
      ["9999 Silver",1600000]
    ]
  },

  aov: {
    name: "Arena of Valor",
    image: "arenaofvalor.png",
    fields: ["ID Arena of Valor"],
    products: [
      ["40 Voucher",10200],["90 Voucher",20200],
      ["230 Voucher",50200],["470 Voucher",100200],
      ["950 Voucher",200500],["1430 Voucher",300500],
      ["2390 Voucher",500500]
    ]
  },

  mchg: {
    name: "Magic Chess GoGo",
    image: "magicchessgogo.png",
    fields: ["ID Magic Chess GoGo"],
    products: [
      ["5 DM",1800],["12 DM",4500],["19 DM",6799],
      ["28 DM",9764],["44 DM",15000],["59 DM",20122],
      ["86 DM",29311],["170 DM",58200],["240 DM",81500],
      ["296 DM",96600],["408 DM",137333],["568 DM",188888],
      ["875 DM",290000],["2010 DM",638200],
      ["4830 DM",1500000],["Weekly Card",32000],
      ["Lukas Latest Bounty",18888],
      ["Battle for Discount",18888]
    ]
  },

  fdbp: {
    name: "Football Dream: Be A Pro",
    image: "football-dream-be-a-pro.png",
    fields: ["ID Football Dream"],
    products: [
      ["60 Supreme Token",14600],["180 Supreme Token",42800],
      ["300 Supreme Token",71000],["680 Supreme Token",142300],
      ["940 Supreme Token",212500],["1280 Supreme Token",284200],
      ["1980 Supreme Token",425555],["3120 Supreme Token",707800],
      ["6480 Supreme Token",1420000],["Indonesian Garuda",24200]
    ]
  }
};

/* Membuat ID produk otomatis dari nama game dan urutan produk. */
Object.entries(games).forEach(([key, game]) => {
  game.products = game.products.map((p, i) => ({
    id: key + "-" + i,
    name: p[0],
    price: p[1],
    category: /pass|member|bundle|card|silver|bounty|discount|garuda/i.test(p[0])
      ? "Paket & Lainnya"
      : "Top Up"
  }));
});

function makeGameCard(key) {
  const game = games[key];
  const btn = document.createElement("button");
  btn.className = "game-card";
  btn.type = "button";
  btn.innerHTML = `
    <img src="${game.image}" alt="${game.name}">
    <span>${game.name}</span>
  `;
  btn.addEventListener("click", () => openGame(key));
  const img = btn.querySelector("img");
  img.onerror = () => {
    img.style.display = "none";
    btn.classList.add("image-missing");
  };
  return btn;
}

function renderGameGrids() {
  const home = $("homeGameGrid");
  const topup = $("topupGameGrid");
  if (!home || !topup) return;

  Object.keys(games).forEach(key => {
    home.appendChild(makeGameCard(key));
    topup.appendChild(makeGameCard(key));
  });
}

function openGame(key) {
  if (!games[key]) return;
  currentGame = key;
  currentCategory = "Semua";

  $("topupCatalog").hidden = false;
  $("topupOrderCard").hidden = true;
  $("topupGameGrid").hidden = true;

  $("selectedGameImage").src = games[key].image;
  $("selectedGameImage").onerror = () => {
    $("selectedGameImage").style.visibility = "hidden";
  };
  $("selectedGameImage").style.visibility = "visible";
  $("selectedGameTitle").textContent = games[key].name;

  $("productSearch").value = "";
  renderFilters();
  renderProducts();
  $("topupCatalog").scrollIntoView({ behavior: "smooth", block: "start" });
}

$("changeGame")?.addEventListener("click", () => {
  currentGame = null;
  $("topupCatalog").hidden = true;
  $("topupOrderCard").hidden = true;
  $("topupGameGrid").hidden = false;
});

function renderFilters() {
  const box = $("productFilters");
  if (!box || !currentGame) return;

  const categories = ["Semua", ...new Set(
    games[currentGame].products.map(p => p.category)
  )];

  box.innerHTML = "";
  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = category;
    btn.className = category === currentCategory ? "active" : "";
    btn.addEventListener("click", () => {
      currentCategory = category;
      renderFilters();
      renderProducts();
    });
    box.appendChild(btn);
  });
}

function renderProducts() {
  const box = $("topupProducts");
  if (!box || !currentGame) return;

  const search = $("productSearch").value.trim().toLowerCase();
  const products = games[currentGame].products.filter(p =>
    (currentCategory === "Semua" || p.category === currentCategory) &&
    p.name.toLowerCase().includes(search)
  );

  box.innerHTML = "";
  $("noProducts").hidden = products.length > 0;

  products.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const name = document.createElement("strong");
    name.className = "product-name";
    name.textContent = product.name;

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = rupiah(product.price);

    const buy = document.createElement("button");
    buy.type = "button";
    buy.className = "product-buy";
    buy.textContent = "Pilih";

    buy.addEventListener("click", () => chooseProduct(product));

    card.append(name, price, buy);
    box.appendChild(card);
  });
}

$("productSearch")?.addEventListener("input", renderProducts);

function chooseProduct(product) {
  selectedProduct = product;

  $("selectedGameKey").value = currentGame;
  $("selectedProductId").value = product.id;
  $("selectedProductPrice").value = product.price;
  $("selectedProductLabel").textContent =
    games[currentGame].name + " - " + product.name;

  $("topupTotal").textContent = rupiah(product.price);
  $("topupGrandTotal").textContent = rupiah(product.price);

  const fields = $("gameFields");
  fields.innerHTML = "";

  games[currentGame].fields.forEach((label, i) => {
    const group = document.createElement("div");
    group.className = "form-group";

    const inputId = "gameField" + i;
    const lab = document.createElement("label");
    lab.htmlFor = inputId;
    lab.textContent = label;

    const input = document.createElement("input");
    input.id = inputId;
    input.required = true;
    input.maxLength = 80;
    input.dataset.fieldName = label;

    group.append(lab, input);
    fields.appendChild(group);
  });

  const nick = document.createElement("div");
  nick.className = "form-group";
  nick.innerHTML =
    '<label for="gameNickname">Nickname dalam game</label>' +
    '<input id="gameNickname" required maxlength="80">';
  fields.appendChild(nick);

  $("topupOrderCard").hidden = false;
  $("topupOrderCard").scrollIntoView({ behavior: "smooth", block: "start" });
}

/* =========================
   FORM TOP UP
========================= */

$("topupForm")?.addEventListener("submit", e => {
  e.preventDefault();

  if (!selectedProduct || !currentGame) {
    toast("Pilih produk terlebih dahulu.");
    return;
  }

  const gameDetails = [...$("gameFields").querySelectorAll("input")]
    .map(input => `${input.dataset.fieldName || "Nickname"}: ${input.value.trim()}`)
    .join("\n");

  pendingOrder = {
    type: "Top Up",
    product: `${games[currentGame].name} - ${selectedProduct.name}`,
    price: selectedProduct.price,
    name: $("topupName").value.trim(),
    whatsapp: $("topupWhatsapp").value.trim(),
    details: gameDetails,
    note: $("topupNote").value.trim()
  };

  openPayment(pendingOrder);
});

/* =========================
   JOKI MOBILE LEGENDS
========================= */

const rankOrder = [
  "grandmaster", "epic", "legend",
  "mythic", "honor", "glory", "immortal"
];

const rankNames = {
  grandmaster: "Grandmaster",
  epic: "Epic",
  legend: "Legend",
  mythic: "Mythic",
  honor: "Honor",
  glory: "Glory",
  immortal: "Immortal"
};

const rankPrices = {
  rank: {
    grandmaster: 4000, epic: 6000, legend: 8000,
    mythic: 18000, honor: 25000, glory: 30000,
    immortal: 34000
  },
  gendong: {
    grandmaster: 3000, epic: 5000, legend: 7000,
    mythic: 15000, honor: 22000, glory: 28000,
    immortal: 32000
  }
};

const gradingPrices = { rank: 235000, gendong: 200000 };

function rankScore(rank, tier, stars) {
  const index = rankOrder.indexOf(rank);
  if (index < 0) return 0;

  if (index <= 2) {
    return index * 25 + (5 - Number(tier)) * 5 + Number(stars);
  }

  if (rank === "mythic") return 75 + Number(stars);
  if (rank === "honor") return 100 + Number(stars);
  if (rank === "glory") return 125 + Number(stars);
  return 175 + Number(stars);
}

function rankDistance(start, end, type) {
  const startScore = start.score;
  const endScore = end.score;

  if (endScore <= startScore) return null;

  let total = 0;

  for (let score = startScore; score < endScore; score++) {
    let rank;

    if (score < 25) rank = "grandmaster";
    else if (score < 50) rank = "epic";
    else if (score < 75) rank = "legend";
    else if (score < 100) rank = "mythic";
    else if (score < 125) rank = "honor";
    else if (score < 175) rank = "glory";
    else rank = "immortal";

    total += rankPrices[type][rank];
  }

  return total;
}

function readRank(rankId, tierId, starsId) {
  const rank = $(rankId).value;
  const tier = $(tierId).value;
  const stars = Math.max(0, Number($(starsId).value) || 0);

  return {
    rank,
    tier,
    stars,
    score: rankScore(rank, tier, stars)
  };
}

function updateRankForm() {
  const startRank = $("startRank").value;
  const endRank = $("endRank").value;

  $("startTierGroup").hidden = rankOrder.indexOf(startRank) > 2;
  $("endTierGroup").hidden = rankOrder.indexOf(endRank) > 2;

  const start = readRank("startRank", "startTier", "startStars");
  const end = readRank("endRank", "endTier", "endStars");
  const total = rankDistance(start, end, "rank");

  $("jokiTotal").textContent = total === null ? "Periksa target rank" : rupiah(total);
  $("jokiPriceNote").textContent = total === null
    ? "Rank tujuan harus lebih tinggi daripada rank awal."
    : "Estimasi berdasarkan jumlah bintang dan tarif tiap rank.";
}

["startRank", "startTier", "startStars",
 "endRank", "endTier", "endStars"].forEach(id => {
  $(id)?.addEventListener("change", updateRankForm);
  $(id)?.addEventListener("input", updateRankForm);
});

document.querySelectorAll("[data-joki]").forEach(btn => {
  btn.addEventListener("click", () => openJoki(btn.dataset.joki));
});

function openJoki(type) {
  selectedJoki = type;
  $("jokiCategories").hidden = true;
  $("jokiDetail").hidden = false;

  $("jokiForm").hidden = type !== "rank";
  $("jokiGendongForm").hidden = type !== "gendong";

  $("jokiServiceTitle").textContent =
    type === "rank" ? "Joki Rank Mobile Legends" : "Joki Gendong Mobile Legends";

  $("jokiBannerImage").src =
    type === "rank" ? "bannerjokirank.png" : "bannerjokigendong.png";

  $("jokiBannerImage").onerror = () => {
    $("jokiBannerImage").style.display = "none";
  };
  $("jokiBannerImage").style.display = "block";

  if (type === "rank") updateRankForm();
  else updateGendongForm();

  $("jokiDetail").scrollIntoView({ behavior: "smooth", block: "start" });
}

$("changeJoki")?.addEventListener("click", () => {
  $("jokiDetail").hidden = true;
  $("jokiCategories").hidden = false;
});

function updateGendongForm() {
  const rank = $("gendongRank").value;
  const stars = Math.max(1, Number($("gendongStars").value) || 1);
  $("gendongTotal").textContent = rupiah(rankPrices.gendong[rank] * stars);
}

$("gendongRank")?.addEventListener("change", updateGendongForm);
$("gendongStars")?.addEventListener("input", updateGendongForm);

$("jokiForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const start = readRank("startRank", "startTier", "startStars");
  const end = readRank("endRank", "endTier", "endStars");
  const total = rankDistance(start, end, "rank");

  if (total === null) {
    toast("Rank tujuan harus lebih tinggi.");
    return;
  }

  pendingOrder = {
    type: "Joki Rank",
    product: `Joki Rank ${rankNames[start.rank]} ke ${rankNames[end.rank]}`,
    price: total,
    name: $("jokiName").value.trim(),
    whatsapp: $("jokiWhatsapp").value.trim(),
    details:
      `Rank awal: ${rankNames[start.rank]}\n` +
      `Bintang awal: ${start.stars}\n` +
      `Rank tujuan: ${rankNames[end.rank]}\n` +
      `Bintang tujuan: ${end.stars}\n` +
      `Catatan: ${$("jokiRequest").value.trim()}`
  };

  openPayment(pendingOrder);
});

$("jokiGendongForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const rank = $("gendongRank").value;
  const stars = Math.max(1, Number($("gendongStars").value) || 1);
  const total = rankPrices.gendong[rank] * stars;

  pendingOrder = {
    type: "Joki Gendong",
    product: `${rankNames[rank]} - ${stars} bintang`,
    price: total,
    name: $("gendongName").value.trim(),
    whatsapp: $("gendongWhatsapp").value.trim(),
    details:
      `ID Mobile Legends: ${$("mlId").value.trim()}\n` +
      `Nickname: ${$("mlNick").value.trim()}\n` +
      `Target rank: ${rankNames[rank]}\n` +
      `Jumlah bintang: ${stars}\n` +
      `Catatan: ${$("gendongNote").value.trim()}`
  };

  openPayment(pendingOrder);
});

/* =========================
   PEMBAYARAN QRIS
========================= */

function openPayment(order) {
  $("paymentProduct").textContent = order.product;
  $("paymentTotal").textContent = rupiah(order.price);
  $("paidCheck").checked = false;
  $("confirmWhatsApp").disabled = true;
  $("paymentModal").hidden = false;
  document.body.classList.add("modal-open");
}

function closePayment() {
  $("paymentModal").hidden = true;
  document.body.classList.remove("modal-open");
}

$("closePayment")?.addEventListener("click", closePayment);

$("paymentModal")?.addEventListener("click", e => {
  if (e.target === $("paymentModal")) closePayment();
});

$("paidCheck")?.addEventListener("change", () => {
  $("confirmWhatsApp").disabled = !$("paidCheck").checked;
});

$("confirmWhatsApp")?.addEventListener("click", () => {
  if (!pendingOrder || !$("paidCheck").checked) {
    toast("Centang konfirmasi pembayaran terlebih dahulu.");
    return;
  }

  const order = pendingOrder;

  const message = [
    "*PESANAN LIXERA STORE*",
    "",
    `Jenis: ${order.type}`,
    `Nama: ${order.name}`,
    `WhatsApp: ${order.whatsapp}`,
    `Produk: ${order.product}`,
    `Total: ${rupiah(order.price)}`,
    "",
    order.details || "",
    order.note ? `Catatan: ${or
