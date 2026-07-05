# Panduan kalean buat SHIFTCOMP React

Dokumen ini untuk siapa pun yang mau lanjutin atau bantu develop project ini. Tolong dibaca dulu sebelum ubah-ubah kode, biar konsisten ya.

## 1. Setup Awal

```bash
git clone <url-repo-ini>
cd shiftcomp-react
npm install
npm run dev
```

## 2. Aturan Struktur Folder

- **`src/components/layout/`** → khusus komponen struktural yang dipakai di banyak halaman (Navbar, Footer, MainLayout). Kalau mau nambah komponen layout baru (misal `Sidebar`), taruh di sini.
- **`src/pages/`** → satu file per halaman/route.
- **`src/context/`** → state management global (Cart, nanti bisa nambah `AuthContext`, dll).
- Jangan taruh logic bisnis (fetch API, kalkulasi harga, dsb) langsung di komponen UI — taruh di context/hooks biar gampang dites dan dipakai ulang.

## 3. Cara Menambahkan Halaman Baru

1. Buat file baru di `src/pages/NamaHalaman.jsx`.
2. Bungkus dengan `<MainLayout activePath="/path-halaman">...</MainLayout>` — JANGAN import `<Navbar />` / `<Footer />` manual, karena itu tugasnya `MainLayout`.
3. Daftarkan route-nya di `src/App.jsx`:

```jsx
<Route path="/services" element={<Services />} />
```

## 4. Cara Ubah Navbar / Footer

- Navbar: edit `src/components/layout/Navbar.jsx` + `Navbar.css`.
- Footer: edit `src/components/layout/Footer.jsx` + `Footer.css`.
- Karena keduanya dipanggil lewat `MainLayout`, perubahan otomatis muncul di semua halaman. **Jangan** copy-paste JSX Navbar/Footer ke halaman lain.
- Kalau nambah link navigasi baru di Navbar, edit array `NAV_LINKS` di `Navbar.jsx`. Untuk Footer, edit array `BRAND_LINKS` / `QUICK_LINKS`.

## 5. Integrasi Backend (Cart & Newsletter)

Semua titik yang perlu disambungkan ke backend sudah ditandai dengan komentar `// TODO backend:` di:

- `src/context/CartContext.jsx` — fungsi `addItem`, `removeItem`, `updateQuantity`, `clearCart`. Saat ini semua fungsi cuma update state lokal + `localStorage`. Ganti/sisipkan pemanggilan `fetch(...)` ke API kamu di masing-masing fungsi (contoh pattern optimistic update sudah dijelaskan di komentar dalam file itu).
- `src/components/layout/Footer.jsx` — fungsi `handleSubscribe` untuk form newsletter, tinggal aktifkan bagian `fetch("/api/newsletter/subscribe", ...)` yang sudah di-comment.

**Rekomendasi urutan kerja saat backend sudah siap:**
1. Tentukan base URL API (bisa taruh di file `.env` → `VITE_API_URL=https://api.shiftcomp.com`).
2. Bikin file `src/services/api.js` sebagai wrapper fetch (biar header, auth token, error handling seragam).
3. Panggil wrapper itu di dalam `CartContext.jsx` dan `Footer.jsx`, ganti komentar `// TODO backend:` dengan kode asli.
4. Kalau ada autentikasi user, tambahkan `useEffect` di `CartProvider` untuk fetch cart dari server saat pertama kali load, lalu `dispatch({ type: "SET_CART", payload })`.

## 6. Konvensi Kode

- Komponen: PascalCase (`Navbar.jsx`), file CSS satu-satu per komponen (`Navbar.css`).
- Semua warna & font pakai CSS variable dari `src/index.css` (`var(--color-primary)`, dll) — jangan hardcode hex color baru di file lain kecuali memang warna baru yang belum ada di token.
- Style: plain CSS (tidak pakai Tailwind), biar konsisten dengan yang sudah ada.
- Bahasa komentar & teks UI: Bahasa Indonesia (kecuali ada permintaan khusus bahasa Inggris untuk konten tertentu).

## 7. Sebelum Push / PR

- Jalankan `npm run build` dulu, pastikan tidak ada error.
- Cek tampilan responsive minimal di 3 ukuran: desktop (>1024px), tablet (~768px), mobile (~375px).
- Kalau nambah komponen baru yang dipakai di banyak tempat, dokumentasikan cara pakainya di README atau di komentar atas file komponennya (ikuti gaya di `MainLayout.jsx`).

## 8. Cara Commit

Nih guys supaya riwayat Git tetap rapi dan gampang dibaca, gunakan format commit berikut ya, walaupun opsional tapi sebaiknya ya ikutin lah ya:

```bash
<type>: <deskripsi singkat>
```

### Daftar Type Commit

| Type          |        Kegunaan                                               |
|---------------|---------------------------------------------------------------|
| `feat`        | Menambah fitur baru                                           |
| `fix`         | Memperbaiki bug                                               |
| `refactor`    | Merapikan kode tanpa mengubah fungsi                          |
| `style`       | Perubahan format kode (spasi, indentasi, CSS kecil, dll)      |
| `docs`        | Mengubah dokumentasi (`README.md`, panduan, dll)              |
| `perf`        | Meningkatkan performa                                         |
| `test`        | Menambah atau mengubah testing                                |
| `chore`       | Perubahan konfigurasi, dependency, build, dll                 |

### Contoh Commit

```bash
git add .

git commit -m "feat: menambahkan halaman layanan"

git commit -m "fix: memperbaiki bug tombol checkout"

git commit -m "refactor: merapikan struktur cart context"

git commit -m "style: merapikan tampilan navbar mobile"

git commit -m "docs: memperbarui panduan setup project"

git commit -m "chore: memperbarui dependency react"
```

### Cara Push

Pastikan branch(kalo dari gogle (ruang kerja independen di dalam repositori Anda)) yang digunakan sudah benar.

```bash
git push origin nama-branch
```

Contoh:

```bash
git push origin main
```

atau

```bash
git push origin develop
```

### Sebelum Commit

Pastikan:

- Semua perubahan sudah diuji (`npm run dev`).
- Jalankan `npm run build` dan pastikan tidak ada error.
- Tidak ada file yang tidak sengaja ikut ter-commit (cek dengan `git status`).
- Jangan commit file sensitif seperti `.env`.
- Jangan commit folder `node_modules/`.

### Jika Mengambil Update Terbaru

Sebelum mulai mengerjakan atau sebelum push, ambil perubahan terbaru terlebih dahulu:

```bash
git pull origin nama-branch
```

Jika terjadi konflik, selesaikan conflict terlebih dahulu sebelum melakukan commit dan push kembali.

ouh ya kalo misal kalian bingung bisa tanya dulu ke temen temen yg lain kalo udan mentok ya tau sendiri lah ya.....