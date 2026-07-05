// ini berfungsi untuk mengimport library react-router-dom yang digunakan untuk routing pada aplikasi React. BrowserRouter digunakan untuk membungkus seluruh aplikasi agar dapat menggunakan fitur routing, Routes digunakan untuk mendefinisikan kumpulan route, dan Route digunakan untuk mendefinisikan setiap route individual. Selain itu, juga mengimport dua komponen halaman yaitu Home dan Products dari folder pages.
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* Tambahkan route lain sesuai kebutuhan */}
      </Routes>
    </BrowserRouter>
  );
}