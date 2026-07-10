# SHIFTCOMP — Company Profile Website

Website company profile dan PC Builder interaktif untuk **SHIFTCOMP**, toko komputer & perakitan PC profesional.

---

## 🚀 Tech Stack

| Teknologi | Keterangan |
|---|---|
| **React 19** | UI framework utama |
| lenis | ya saya setuju |
| **React Router DOM v7** | Client-side routing |
| **Vite 8** | Build tool & dev server |
| **Vanilla CSS** | Styling tanpa framework CSS eksternal |
| **oxlint** | Linter JavaScript |

---

## 📁 Struktur Proyek

```
Company-Profile-Shift.com-main/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx                  # Root routing
    ├── main.jsx                 # Entry point React
    ├── context/
    │   └── CartContext.jsx      # Global cart state (Context API)
    ├── components/
    │   ├── MainLayout.jsx       # Layout wrapper (Navbar + Footer)
    │   ├── Navbar.jsx           # Navigasi + mini cart dropdown
    │   ├── Footer.jsx           # Footer website
    │   └── products/            # Sub-komponen halaman Products
    ├── pages/
    │   ├── Home.jsx             # Halaman utama
    │   ├── Products.jsx         # Katalog produk
    │   ├── PcBuilder.jsx        # ⭐ PC Builder interaktif
    │   ├── Services.jsx         # Halaman layanan
    │   └── Contact.jsx          # Halaman kontak
    ├── data/
    │   └── products.js          # Database produk (40+ item, 7 kategori)
    └── style/
        ├── index.css            # CSS global & design tokens
        ├── Navbar.css
        ├── Footer.css
        ├── Products.css
        └── PcBuilder.css        # Styling khusus PC Builder
```

---

## ⚙️ Cara Menjalankan

### Prasyarat
- Node.js versi **18** atau lebih baru
- npm

### Instalasi & Menjalankan Dev Server

```bash
# 1. Clone / extract project
cd Company-Profile-Shift.com-main

# 2. Install dependencies
npm install

# 3. Jalankan dev server
npm run dev
```

Buka browser dan akses: **http://localhost:5173**

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
| `/services` | `Services.jsx` | Daftar layanan |
| `/contact` | `Contact.jsx` | Form kontak |

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

- **GAMING** — Ryzen 7 7800X3D + RTX 4070 Ti + B650 Elite + RAM 32GB + SSD 2TB + PSU 850W + Corsair 4000D
- **EDITING** — Core i9-14900KS + RTX 4080 Super + Z790 Ultimate + RAM 64GB + SSD 2TB + PSU 1000W + NZXT H510
- **AI/DEV** — Ryzen 9 9950X3D + RTX 4090 + X670E Extreme + RAM 64GB + SSD 4TB Gen5 + PSU 1600W + Lian Li O11 XL

### Filter & Sorting
- **Filter Brand** — saring produk berdasarkan merek/seri (NVIDIA Series, AMD Series, DDR5 Memory, dll.)
- **Sort by** — urutkan produk berdasarkan:
  - Latest Arrivals (terbaru)
  - Price: Low to High
  - Price: High to Low
  - Name: A to Z
- **Clear Selection** — hapus pilihan pada kategori aktif

### Kartu Produk
Setiap produk menampilkan:
- Foto produk asli
- Badge diskon (jika ada)
- Label kategori & variant
- Deskripsi singkat
- Spesifikasi utama (tag)
- Status stok: **In Stock / Pre-Order / Limited / Out of Stock**
- Harga dalam **Rupiah (IDR)** + harga coret jika ada diskon
- Tombol **Select / Remove**

### Compatibility Check (Sidebar bawah)
Pengecekan kompatibilitas real-time:
- Hijau — CPU & Motherboard kompatibel (Intel → LGA, AMD → AM5)
- Kuning — peringatan (misal belum memilih motherboard)
- Merah — mismatch socket CPU vs Motherboard

### Right Panel — Build Summary & Aksi

#### Build Actions

| Tombol | Fungsi |
|---|---|
| **Export PDF Summary** | Buka tab baru dengan ringkasan build dalam format HTML, lalu trigger print dialog browser untuk disimpan sebagai PDF |
| **WhatsApp Expert** | Buka WhatsApp dengan pesan otomatis berisi daftar komponen yang dipilih + total harga |
| **Reset Build** | Hapus semua pilihan komponen |

#### Your Build
Menampilkan daftar semua 7 kategori beserta komponen yang sudah dipilih, lengkap dengan harga masing-masing dan **total kumulatif**.

### Top Bar (Real-time)
- **Total Configuration** — total harga semua komponen terpilih dalam IDR
- **Power Draw** — estimasi konsumsi daya (dalam Watt)
- **Components** — jumlah komponen yang sudah dipilih dari total 7

---

## 🗃️ Data Produk (`src/data/products.js`)

File ini berisi **40+ produk** dengan struktur berikut:

```js
{
  id: "shft-4090-x",           // ID unik
  sku: "SHFT-4090-X",          // SKU produk
  category: "gpu",             // Kategori (cpu|gpu|ram|motherboard|storage|psu|case)
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
- `CATEGORIES` — daftar kategori
- `AVAILABILITY` — opsi filter stok
- `SORT_OPTIONS` — opsi pengurutan

---

## 🛒 Cart (Context API)

File `src/context/CartContext.jsx` menyediakan global state untuk keranjang belanja, tersedia di seluruh aplikasi via `useCart()` hook:

```js
const { items, totalItems, totalPrice, addItem, removeItem, updateQuantity } = useCart();
```

Mini cart dapat diakses melalui ikon keranjang di Navbar.

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

- Nomor WhatsApp pada tombol **WhatsApp Expert** perlu diganti di `src/pages/PcBuilder.jsx`:
  ```js
  const phone = "6281234567890"; // Ganti dengan nomor WA aktif SHIFTCOMP
  ```
- Semua harga menggunakan format **IDR (Rupiah)** dengan `Intl.NumberFormat`.
- Gambar produk menggunakan URL eksternal (Google Images thumbnails). Untuk produksi, sebaiknya host gambar sendiri.
- Compatibility check bersifat **heuristik sederhana** berdasarkan nama produk. Untuk akurasi lebih tinggi, tambahkan field `socket` / `platform` di setiap produk.

---

## 👥 Kontribusi

Lihat [CONTRIBUTING.md](./CONTRIBUTING.md) untuk panduan kontribusi.

---

*SHIFTCOMP — Professional PC Building Services*
