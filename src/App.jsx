import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import PcBuilder from "./pages/PcBuilder";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

// Re-init AOS setiap pindah halaman supaya elemen baru ikut ke-deteksi,
// dan scroll ke atas biar transisi antar halaman terasa rapi.
function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    AOS.refresh();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [location.pathname]);

  return null;
}

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  return (
    <BrowserRouter>
      <RouteEffects />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pc-builder" element={<PcBuilder />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}