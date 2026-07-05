import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import PcBuilder from "./pages/PcBuilder";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
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