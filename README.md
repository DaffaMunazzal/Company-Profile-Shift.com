# SHIFTCOMP — Company Profile Website

Website company profile dan PC Builder interaktif untuk **SHIFTCOMP**, toko komputer & perakitan PC profesional berbasis di Pekalongan, Jawa Tengah.

---

## 🚀 Tech Stack

| Teknologi | Versi | Keterangan |
|---|---|---|
| **React** | 19 | UI framework utama |
| **React Router DOM** | 7 | Client-side routing |
| **Vite** | 8 | Build tool & dev server |
| **Lenis** | 1.3 | Smooth scrolling library |
| **AOS** | 2.3 | Animate On Scroll — animasi saat scroll |
| **MapLibre GL** | 5 | Peta interaktif pada halaman Contact |
| **Vanilla CSS** | — | Styling tanpa framework CSS eksternal |
| **oxlint** | — | Linter JavaScript |

---

## 📁 Struktur Proyek

```
SHIFTCOMP-updated-v3/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx                      # Root routing + inisialisasi AOS
    ├── main.jsx                     # Entry point React
    ├── constants.js                 # Konstanta global (WhatsApp, jam operasional, paket protokol)
    ├── context/
    │   ├── CartContext.jsx          # Global cart state (Context API)
    │   ├── WishlistContext.jsx      # Global wishlist state (Context API)
    │   └── LanguageContext.jsx      # Internationalization / bahasa (Context API)
    ├── i18n/
    │   └── translations.js          # ⭐ Kamus terjemahan ID & EN (semua halaman)
    ├── hooks/
    │   ├── useLenis.js              # Hook untuk Lenis smooth scroll
    │   └── useScrollReveal.js       # Hook animasi reveal saat scroll
    ├── components/
    │   ├── MainLayout.jsx           # Layout wrapper (Navbar + Footer)
    │   ├── Navbar.jsx               # Navigasi + mini cart + wishlist + language toggle
    │   ├── Footer.jsx               # Footer website
    │   ├── LocationMap.jsx          # Komponen peta MapLibre GL
    │   ├── SmoothScroll.jsx         # Wrapper Lenis smooth scroll
    │   ├── home/                    # Komponen-komponen halaman Home
    │   │   ├── HeroSection.jsx
    │   │   ├── CategoryGrid.jsx
    │   │   ├── FeaturedProducts.jsx
    │   │   ├── WhyChooseUs.jsx
    │   │   ├── PcBuilderPromo.jsx
    │   │   ├── Testimonials.jsx
    │   │   ├── Newsletter.jsx
    │   │   └── Reveal.jsx           # Animasi reveal komponen
    │   ├── products/                # Sub-komponen halaman Products
    │   │   ├── ProductCard.jsx
    │   │   ├── FilterSidebar.jsx
    │   │   └── Pagination.jsx
    │   ├── services/                # Sub-komponen halaman Services
    │   │   ├── ServiceCard.jsx
    │   │   ├── ScheduleConsultationModal.jsx
    │   │   ├── JoinProtocolModal.jsx
    │   │   └── icon.jsx
    │   └── ui/
    │       └── Modal.jsx            # Komponen modal reusable
    ├── pages/
    │   ├── Home.jsx                 # Halaman utama / landing page
    │   ├── Products.jsx             # Katalog produk dengan filter & search
    │   ├── PcBuilder.jsx            # ⭐ PC Builder interaktif
    │   ├── Services.jsx             # Halaman layanan
    │   └── Contact.jsx              # Halaman kontak + peta + FAQ
    ├── data/
    │   ├── products.js              # Database produk (40+ item, 7 kategori)
    │   ├── servicesData.js          # Database layanan (6 jenis layanan)
    │   └── contactData.js           # Data hub & link sosial media
    ├── utils/
    │   └── whatsapp.js              # Utility pembuatan pesan WhatsApp (i18n-ready)
    └── style/
        ├── index.css                # CSS global & design tokens
        ├── Navbar.css
        ├── Footer.css
        ├── Home.css
        ├── Products.css
        ├── PcBuilder.css            # Styling khusus PC Builder
        ├── Services.css
        └── Contact.css
```

---

## ⚙️ Cara Menjalankan

### Prasyarat
- Node.js versi **18** atau lebih baru
- npm

### Instalasi & Menjalankan Dev Server

```bash
# 1. Masuk ke direktori project
cd NAMA FILE

# 2. Install dependencies
npm install

# 3. Jalankan dev server
npm run dev
```

Buka browser dan akses: **http://localhost:PORT**

### Build untuk Produksi

```bash
npm run build
```

Output akan ada di folder `dist/`.

### Preview Build Produksi

```bash
npm run preview
```

---

## 🗺️ Halaman & Routing

| Route | Halaman | Deskripsi |
|---|---|---|
| `/` | `Home.jsx` | Landing page utama |
| `/products` | `Products.jsx` | Katalog produk dengan filter & search |
| `/pc-builder` | `PcBuilder.jsx` | PC Builder interaktif |
| `/services` | `Services.jsx` | Daftar layanan & booking |
| `/contact` | `Contact.jsx` | Form kontak + peta + FAQ |

---

## 🌐 Internasionalisasi (i18n)

Website mendukung **2 bahasa**:
- 🇮🇩 **Bahasa Indonesia** (default)
- 🇬🇧 **English**

### Cara Kerja
Language toggle terdapat di pojok kanan Navbar. Pilihan bahasa disimpan di `localStorage` sehingga tetap diingat saat halaman di-refresh.

Semua teks terkelola di satu file kamus:

```
src/i18n/translations.js
```

### Cakupan Terjemahan
Seluruh halaman dan komponen sudah di-i18n-kan:

| Area | Status |
|---|---|
| Navbar (link, cart, wishlist, language) | ✅ |
| Footer (tagline, links, newsletter) | ✅ |
| Halaman Home (semua seksi) | ✅ |
| Halaman Products (hero, filter, sort, pagination) | ✅ |
| Halaman Services (hero, kartu layanan, modal) | ✅ |
| Halaman Contact (form, FAQ, jam operasional, peta) | ✅ |
| PC Builder (kategori, kompatibilitas, aksi, PDF export) | ✅ |
| Modal Konsultasi & Protokol | ✅ |
| Pesan WhatsApp outbound | ✅ |

### Menggunakan `useLanguage()` Hook

```jsx
import { useLanguage } from "../context/LanguageContext";

function MyComponent() {
  const { t, lang, toggleLang } = useLanguage();

  return (
    <div>
      <p>{t("nav.home")}</p>
      <p>{t("products.showing", { start: 1, end: 6, total: 40 })}</p>
      <button onClick={toggleLang}>
        {lang === "id" ? "Switch to EN" : "Ganti ke ID"}
      </button>
    </div>
  );
}
```

---

## ⭐ Fitur PC Builder (`/pc-builder`)

Halaman andalan website ini. Pengguna dapat merakit PC secara interaktif dengan memilih komponen satu per satu.

### Sidebar Kategori
Terdapat **7 kategori komponen** yang bisa dipilih:

| Kategori | Keterangan |
|---|---|
| Processor | CPU Intel & AMD |
| Motherboard | Board Intel (LGA) & AMD (AM5) |
| Memory (RAM) | DDR5, berbagai kapasitas & kecepatan |
| Graphics Card | GPU NVIDIA & AMD |
| Storage | NVMe Gen3/Gen4/Gen5, SATA SSD |
| Power Supply | 450W – 1600W, berbagai efisiensi |
| Case | Mini-ITX, mATX, Mid Tower, Full Tower |

Setiap kategori yang sudah dipilih ditandai ✓ pada sidebar.

### Build Presets (Tab GAMING / EDITING / AI/DEV)
Klik tab di bagian atas untuk **otomatis memilih 7 komponen sekaligus** sesuai use case:

| Preset | CPU | GPU | RAM | Storage | PSU | Case |
|---|---|---|---|---|---|---|
| **GAMING** | Ryzen 7 7800X3D | RTX 4070 Ti | 32GB | SSD 2TB Gen4 | 850W Gold | Corsair 4000D |
| **EDITING** | Core i9-14900KS | RTX 4080 Super | 64GB | SSD 2TB | 1000W | NZXT H510 |
| **AI/DEV** | Ryzen 9 9950X3D | RTX 4090 | 64GB | SSD 4TB Gen5 | 1600W | Lian Li O11 XL |

### Filter & Sorting
- **Filter Brand** — saring produk berdasarkan merek/seri
- **Sort by** — Terbaru / Harga: Rendah ke Tinggi / Harga: Tinggi ke Rendah / Nama: A–Z
- **Clear Selection** — hapus pilihan pada kategori aktif

### Compatibility Check (Sidebar bawah)
Pengecekan kompatibilitas real-time:
- 🟢 **Hijau** — CPU & Motherboard kompatibel (Intel → LGA, AMD → AM5)
- 🟡 **Kuning** — peringatan (misal belum memilih motherboard)
- 🔴 **Merah** — socket CPU vs Motherboard tidak cocok

### Right Panel — Build Summary & Aksi

| Tombol | Fungsi |
|---|---|
| **Export PDF Summary** | Buka tab baru dengan ringkasan build dalam format HTML, lalu trigger print dialog |
| **Inquire via WhatsApp** | Buka WhatsApp dengan pesan otomatis berisi daftar komponen + total harga |
| **Reset Build** | Hapus semua pilihan komponen |

### Top Bar (Real-time)
- **Total Configuration** — total harga semua komponen terpilih dalam IDR
- **Estimated Power** — estimasi konsumsi daya (dalam Watt)
- **Components** — jumlah komponen yang sudah dipilih dari total 7

---

## 🛒 Cart & Wishlist (Context API)

```js
// Cart
const { items, totalItems, totalPrice, addItem, removeItem, updateQuantity } = useCart();

// Wishlist
const { items, totalItems, toggleItem, isWishlisted } = useWishlist();
```

Mini cart dan wishlist dapat diakses langsung dari ikon di Navbar.

---

## 🗃️ Data Produk (`src/data/products.js`)

File ini berisi **40+ produk** dengan struktur berikut:

```js
{
  id: "shft-4090-x",           // ID unik
  sku: "SHFT-4090-X",          // SKU produk
  category: "gpu",             // cpu | gpu | ram | motherboard | storage | psu | case
  categoryLabel: "NVIDIA Series",
  name: "GeForce RTX 4090",
  variant: "Precision Edition",
  description: "Ultra-performance 24GB GDDR6X...",
  specs: ["3-Year SHIFTCOM Warranty", "24GB GDDR6X | 16384 CUDA Cores"],
  price: 28500000,             // Harga dalam Rupiah
  originalPrice: 29900000,     // Harga sebelum diskon
  discountPercent: 5,
  stockStatus: "in-stock",     // in-stock | pre-order | limited | out-of-stock
  image: "https://...",        // URL gambar produk
  createdAt: "2026-06-20",     // Tanggal masuk (untuk sorting Latest)
}
```

Export yang tersedia dari `products.js`:
- `PRODUCTS` — array semua produk
- `CATEGORIES` — daftar kategori (7 item)
- `AVAILABILITY` — opsi filter stok
- `SORT_OPTIONS` — opsi pengurutan

---

## 🎨 Design System (CSS Variables)

Didefinisikan di `src/style/index.css`:

```css
--color-primary        /* Merah brand SHIFTCOMP */
--color-text-dark      /* Teks utama / heading */
--color-text-body      /* Teks paragraf */
--color-border         /* Border halus */
--color-bg-soft        /* Background abu muda */
--font-heading         /* Font heading */
--radius-sm            /* Border radius kecil */
--radius-full          /* Border radius penuh (pill) */
```

---

## 📋 Scripts

```bash
npm run dev       # Jalankan dev server (Vite HMR)
npm run build     # Build produksi ke folder dist/
npm run preview   # Preview hasil build lokal
npm run lint      # Lint dengan oxlint
```

---

## 📌 Catatan Developer

### Nomor WhatsApp
Ganti nomor WhatsApp di `src/constants.js`:
```js
export const WHATSAPP_NUMBER = "628517447****";
```

### Menambah Terjemahan Baru
Tambahkan key di kedua bahasa dalam `src/i18n/translations.js`:
```js
export const translations = {
  id: {
    mySection: {
      myKey: "Teks dalam Bahasa Indonesia",
    },
  },
  en: {
    mySection: {
      myKey: "Text in English",
    },
  },
};
```

Lalu gunakan dengan `t("mySection.myKey")` di komponen mana pun.

### Jam Operasional
Jam operasional didefinisikan di `src/constants.js` dan digunakan secara konsisten di Contact page dan modal Schedule Consultation:
```js
export const BUSINESS_HOURS = [
  { day: "Senin - Jumat", hours: "09.00 - 21.00" },
  { day: "Sabtu",         hours: "09.00 - 18.00" },
  { day: "Minggu",        hours: "Libur" },
];
```

### Gambar Produk
Gambar produk menggunakan URL eksternal. Untuk lingkungan produksi, sebaiknya host gambar di CDN sendiri.

### Compatibility Check
Pengecekan kompatibilitas bersifat **heuristik sederhana** berdasarkan nama produk. Untuk akurasi lebih tinggi, tambahkan field `socket` / `platform` di setiap produk di `products.js`.

### Peta (MapLibre GL)
Koordinat dan alamat hub utama dapat diubah di `src/data/contactData.js`:
```js
export const PRIMARY_HUB = {
  coordinates: [-122.4014, 37.7899], // [longitude, latitude]
  addressLines: ["Jl. Maninjau Keputran, Pekalongan, Jawa Tengah"],
  mapQuery: "ShiftComp, Pekalongan, Jawa Tengah",
};
```

---

## 👥 Kontribusi

Lihat [CONTRIBUTING.md](./CONTRIBUTING.md) untuk panduan kontribusi.

---

*SHIFTCOMP — Professional PC Building Services | Pekalongan, Jawa Tengah 🇮🇩*
