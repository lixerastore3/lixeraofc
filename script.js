"use strict";

const ADMIN_WA = "628818238236";
const $ = id => document.getElementById(id);
const rp = n => "Rp" + Number(n).toLocaleString("id-ID");

let gameAktif = "";
let produkAktif = null;
let pesanan = null;
let jokiAktif = "";

/* =========================
   NAVIGASI
========================= */

function halaman(nama) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.toggle("active", p.id === nama);
  });

  document.querySelectorAll("[data-page]").forEach(b => {
    b.classList.toggle("active", b.dataset.page === nama);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", e => {
  const b = e.target.closest("[data-page]");
  if (!b) return;
  e.preventDefault();
  halaman(b.dataset.page);
});

/* =========================
   BANNER OTOMATIS
========================= */

const slides = [...document.querySelectorAll(".slide")];
let slideIndex = 0;

function gantiSlide(i) {
  if (!slides.length) return;
  slideIndex = (i + slides.length) % slides.length;
  slides.forEach((s, n) => s.classList.toggle("active", n === slideIndex));
}

if (slides.length > 1) {
  setInterval(() => gantiSlide(slideIndex + 1), 5000);
}

/* =========================
   DATA GAME DAN HARGA
========================= */

const dataGame = {
  ml: {
    nama: "Mobile Legends",
    gambar: "mobilelegends.png",
    fields: ["ID Mobile Legends", "Server"],
    produk: [
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
      ["2010 DM",562376],["2232 DM",692222],["2625 DM",815000],
      ["3453 DM",1081456],["Weekly Diamond Pass 1x",31500],
      ["Weekly Diamond Pass 2x",63000],
      ["Weekly Diamond Pass 3x",94500],
      ["Twilight Pass",170000],["Weekly Elite Bundle",17200],
      ["Monthly Efic Bundle",84756]
    ]
  },

  ff: {
    nama: "Free Fire",
    gambar: "freefire.png",
    fields: ["ID Free Fire"],
    produk: [
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
      ["2160 DM",301000],["2180 DM",305000],["7290 DM",982000],
      ["36500 DM",5005000],["73100 DM",10010000],
      ["Member Mingguan",28000],["Member Bulanan",93000],
      ["BP Card",47000],["Level Up Pass 6",6000],
      ["Level Up Pass 10",9800],["Level Up Pass 15",9800],
      ["Level Up Pass 20",9800],["Level Up Pass 30",15000]
    ]
  },

  pubg: {
    nama: "PUBG Mobile",
    gambar: "pubgmobile.png",
    fields: ["Character ID PUBG"],
    produk: [
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
    nama: "Honor of Kings",
    gambar: "honorofkings.png",
    fields: ["ID Honor of Kings"],
    produk: [
      ["80 Token",16200],["240 Token",47200],
      ["400 Token",80200],["560 Token",107000],
      ["800 Token + Bonus 30",160500],
      ["2400 Token + Bonus 108",480500],
      ["4000 Token + Bonus 180",802000],
      ["8000 Token + Bonus 360",1600000]
    ]
  },

  fc: {
    nama: "EA Sports FC Mobile",
    gambar: "fcmobile.png",
    fields: ["ID FC Mobile"],
    produk: [
      ["40 FC Point",6800],["100 FC Point",16000],
      ["520 FC Point",78000],["1070 FC Point",157000],
      ["2200 FC Point",323500],["5750 FC Point",784444],
      ["12000 FC Point",1570000],["39 Silver",6900],
      ["99 Silver",16300],["499 Silver",78000],
      ["999 Silver",156999],["1999 Silver",323500],
      ["4999 Silver",785987],["9999 Silver",1600000]
    ]
  },

  aov: {
    nama: "Arena of Valor",
    gambar: "arenaofvalor.png",
    fields: ["ID Arena of Valor"],
    produk: [
      ["40 Voucher",10200],["90 Voucher",20200],
      ["230 Voucher",50200],["470 Voucher",100200],
      ["950 Voucher",200500],["1430 Voucher",300500],
      ["2390 Voucher",500500]
    ]
  },

  mchg: {
    nama: "Magic Chess GoGo",
    gambar: "magicchessgogo.png",
    fields: ["ID Magic Chess GoGo"],
    produk: [
      ["5 DM",1800],["12 DM",4500],["19 DM",6799],
      ["28 DM",9764],["44 DM",15000],["59 DM",20122],
      ["86 DM",29311],["170 DM",58200],["240 DM",81500],
      ["296 DM",96600],["408 DM",137333],["568 DM",188888],
      ["875 DM",290000],["2010 DM",638200],
      ["4830 DM",1500000],["Weekly Card",32000],
      ["Lukas Latest Bounty",18888],["Battle for Discount",18888]
    ]
  },

  fdbp: {
    nama: "Football Dream: Be A Pro",
    gambar: "football-dream-be-a-pro.png",
    fields: ["ID Football Dream"],
    produk: [
      ["60 Supreme Token",14600],["180 Supreme Token",42800],
      ["300 Supreme Token",71000],["680 Supreme Token",142300],
      ["940 Supreme Token",212500],["1280 Supreme Token",284200],
      ["1980 Supreme Token",425555],["3120 Supreme Token",707800],
      ["6480 Supreme Token",1420000],["Indonesian Garuda",24200]
    ]
  }
};

/* =========================
   RENDER KATALOG
========================= */

function buatKartuGame(key) {
  const g = dataGame[key];
  const b = document.createElement("button");
  b.type = "button";
  b.className = "game-card";
  b.innerHTML = `<img src="${g.gambar}" alt=""><b></b>`;
  b.querySelector("b").textContent = g.nama;
  b.querySelector("img").onerror = function() {
    this.style.display = "none";
    b.insertAdjacentText("afterbegin", "🎮 ");
  };
  b.addEventListener("click", () => bukaGame(key));
  return b;
}

Object.keys(dataGame).forEach(key => {
  $("homeGames").appendChild(buatKartuGame(key));
  $("topupGames").appendChild(buatKartuGame(key));
});

function bukaGame(key) {
  gameAktif = key;
  $("catalog").hidden = false;
  $("topupForm").hidden = true;
  $("topupGames").hidden = true;
  $("gameTitle").textContent = dataGame[key].nama;
  $("search").value = "";
  tampilProduk();
  $("catalog").scrollIntoView({ behavior: "smooth" });
}

$("changeGame").addEventListener("click", () => {
  $("catalog").hidden = true;
  $("topupForm").hidden = true;
  $("topupGames").hidden = false;
  produkAktif = null;
});

$("search").addEventListener("input", tampilProduk);

function tampilProduk() {
  if (!gameAktif) return;

  const box = $("products");
  box.innerHTML = "";

  const q = $("search").value.toLowerCase();
  const list = dataGame[gameAktif].produk.filter(p =>
    p[0].toLowerCase().includes(q)
  );

  $("empty").hidden = list.length > 0;

  list.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const name = document.createElement("b");
    name.textContent = p[0];

    const price = document.createElement("strong");
    price.className = "product-price";
    price.textContent = rp(p[1]);

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Pilih Produk";
    button.addEventListener("click", () => pilihProduk(p, i));

    card.append(name, price, button);
    box.appendChild(card);
  });
}

function pilihProduk(p, index) {
  produkAktif = { nama: p[0], harga: p[1], id: gameAktif + "-" + index };

  $("chosenProduct").textContent = dataGame[gameAktif].nama + " — " + p[0];
  $("topupPrice").textContent = "Total: " + rp(p[1]);

  const fields = $("gameInputs");
  fields.innerHTML = "";

  dataGame[gameAktif].fields.forEach((label, i) => {
    const lab = document.createElement("label");
    lab.textContent = label;

    const input = document.createElement("input");
    input.required = true;
    input.id = "gameID" + i;
    input.placeholder = label;

    fields.append(lab, input);
  });

  $("topupForm").hidden = false;
  $("topupForm").scrollIntoView({ behavior: "smooth" });
}

/* =========================
   PESANAN TOP UP
========================= */

$("topupForm").addEventListener("submit", e => {
  e.preventDefault();

  if (!produkAktif) return;

  const ids = [...$("gameInputs").querySelectorAll("input")]
    .map(el => el.placeholder + ": " + el.value.trim())
    .join("\n");

  pesanan = {
    jenis: "Top Up Game",
    nama: $("topupName").value.trim(),
    wa: $("topupWA").value.trim(),
    produk: dataGame[gameAktif].nama + " - " + produkAktif.nama,
    harga: produkAktif.harga,
    detail: ids + "\nNickname: " + $("nickname").value.trim(),
    catatan: $("topupNote").value.trim()
  };

  bukaPembayaran();
});

/* =========================
   JOKI DAN KALKULATOR
========================= */

const rankNama = {
  grandmaster: "Grandmaster",
  epic: "Epic",
  legend: "Legend",
  mythic: "Mythic",
  honor: "Honor",
  glory: "Glory",
  immortal: "Immortal"
};

const urutanRank = [
  "grandmaster", "epic", "legend",
  "mythic", "honor", "glory", "immortal"
];

const tarifRank = {
  grandmaster: 4000,
  epic: 6000,
  legend: 8000,
  mythic: 18000,
  honor: 25000,
  glory: 30000,
  immortal: 34000
};

const tarifGendong = {
  grandmaster: 3000,
  epic: 5000,
  legend: 7000,
  mythic: 15000,
  honor: 22000,
  glory: 28000,
  immortal: 32000
};

function skorRank(rank, stars) {
  const i = urutanRank.indexOf(rank);
  if (i <= 2) return i * 25 + stars;
  if (rank === "mythic") return 75 + stars;
  if (rank === "honor") return 100 + stars;
  if (rank === "glory") return 125 + stars;
  return 175 + stars;
}

function hitungJokiRank() {
  const a = $("rankStart").value;
  const b = $("rankEnd").value;
  const sa = Math.max(0, Number($("starsStart").value) || 0);
  const sb = Math.max(0, Number($("starsEnd").value) || 0);

  const mulai = skorRank(a, sa);
  const akhir = skorRank(b, sb);

  if (akhir <= mulai) {
    $("rankPrice").textContent = "Rank tujuan harus lebih tinggi.";
    return null;
  }

  let total = 0;

  for (let s = mulai; s < akhir; s++) {
    let r;

    if (s < 25) r = "grandmaster";
    else if (s < 50) r = "epic";
    else if (s < 75) r = "legend";
    else if (s < 100) r = "mythic";
    else if (s < 125) r = "honor";
    else if (s < 175) r = "glory";
    else r = "immortal";

    total += tarifRank[r];
  }

  $("rankPrice").textContent = "Estimasi: " + rp(total);
  return total;
}

["rankStart", "rankEnd", "starsStart", "starsEnd"].forEach(id => {
  $(id).addEventListener("input", hitungJokiRank);
  $(id).addEventListener("change", hitungJokiRank);
});

function hitungJokiGendong() {
  const rank = $("gendongRank").value;
  const stars = Math.max(1, Number($("gendongStars").value) || 1);
  $("gendongPrice").textContent = "Estimasi: " + rp(tarifGendong[rank] * stars);
}

$("gendongRank").addEventListener("change", hitungJokiGendong);
$("gendongStars").addEventListener("input", hitungJokiGendong);

document.querySelectorAll("[data-joki]").forEach(button => {
  button.addEventListener("click", () => {
    jokiAktif = button.dataset.joki;
    $("jokiChoices").hidden = true;
    $("jokiDetail").hidden = false;

    $("rankForm").hidden = jokiAktif !== "rank";
    $("gendongForm").hidden = jokiAktif !== "gendong";
    $("jokiTitle").textContent = jokiAktif === "rank"
      ? "Joki Rank Mobile Legends"
      : "Joki Gendong Mobile Legends";

    if (jokiAktif === "rank") hitungJokiRank();
    else hitungJokiGendong();

    $("jokiDetail").scrollIntoView({ behavior: "smooth" });
  });
});

$("changeJoki").addEventListener("click", () => {
  $("jokiChoices").hidden = false;
  $("jokiDetail").hidden = true;
});

$("rankForm").addEventListener("submit", e => {
  e.preventDefault();

  const harga = hitungJokiRank();
  if (harga === null) return;

  pesanan = {
    jenis: "Joki Rank Mobile Legends",
    nama: $("rankName").value.trim(),
    wa: $("rankWA").value.trim(),
    produk: rankNama[$("rankStart").value] + " ke " + rankNama[$("rankEnd").value],
    harga,
    detail:
      "Rank awal: " + rankNama[$("rankStart").value] +
      "\nBintang awal: " + $("starsStart").value +
      "\nRank tujuan: " + rankNama[$("rankEnd").value] +
      "\nBintang tujuan: " + $("starsEnd").value +
      "\nCatatan: " + $("rankNote").value.trim()
  };

  bukaPembayaran();
});

$("gendongForm").addEventListener("submit", e => {
  e.preventDefault();

  const rank = $("gendongRank").value;
  const stars = Math.max(1, Number($("gendongStars").value) || 1);

  pesanan = {
    jenis: "Joki Gendong Mobile Legends",
    nama: $("gendongName").value.trim(),
    wa: $("gendongWA").value.trim(),
    produk: rankNama[rank] + " - " + stars + " bintang",
    harga: tarifGendong[rank] * stars,
    detail:
      "ID ML: " + $("mlID").value.trim() +
      "\nNickname: " + $("mlNickname").value.trim() +
      "\nTarget: " + rankNama[rank] +
      "\nBintang: " + stars +
      "\nCatatan: " + $("gendongNote").value.trim()
  };

  bukaPembayaran();
});

/* =========================
   PEMBAYARAN QRIS
========================= */

function bukaPembayaran() {
  if (!pesanan) return;

  $("paymentProduct").textContent = pesanan.produk;
  $("paymentPrice").textContent = rp(pesanan.harga);
  $("paidCheck").checked = false;
  $("confirmWA").disabled = true;
  $("paymentModal").hidden = false;
}

$("closeModal").addEventListener("click", () => {
  $("paymentModal").hidden = true;
});

$("paymentModal").addEventListener("click", e => {
  if (e.target === $("paymentModal")) {
    $("paymentModal").hidden = true;
  }
});

$("paidCheck").addEventListener("change", () => {
  $("confirmWA").disabled = !$("paidCheck").checked;
});

$("confirmWA").addEventListener("click", () => {
  if (!pesanan || !$("paidCheck").checked) return;

  const pesan = [
    "*PESANAN LIXERA STORE*",
    "",
    "Jenis: " + pesanan.jenis,
    "Nama: " + pesanan.nama,
    "WhatsApp: " + pesanan.wa,
    "Produk: " + pesanan.produk,
    "Total: " + rp(pesanan.harga),
    "",
    pesanan.detail || "",
    pesanan.catatan ? "\nCatatan: " + pesanan.catatan : "",
    "",
    "Saya sudah membayar melalui QRIS.",
    "Mohon periksa pembayaran saya."
  ].join("\n");

  window.open(
    "https://wa.me/" + ADMIN_WA + "?text=" + encodeURIComponent(pesan),
    "_blank"
  );
});

/* =========================
   MULAI WEBSITE
========================= */

hitungJokiRank();
hitungJokiGendong();
halaman("home");

console.log("LIXERA STORE aktif");
