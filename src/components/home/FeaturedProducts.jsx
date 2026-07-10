import { useMemo, useState } from "react";
import { PRODUCTS } from "../../data/products";
import ProductCard from "../products/ProductCard";
import Reveal from "./Reveal";

const TABS = [
  { id: "all", label: "Semua" },
  { id: "discount", label: "Sedang Diskon" },
  { id: "latest", label: "Terbaru" },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all");

  const products = useMemo(() => {
    let list = [...PRODUCTS];

    if (activeTab === "discount") {
      list = list.filter((p) => p.discountPercent > 0);
    } else if (activeTab === "latest") {
      list = list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return list.slice(0, 8);
  }, [activeTab]);

  return (
    <section className="home-featured">
      <div className="container">
        <Reveal className="home-section__header home-section__header--row">
          <div>
            <h2>Produk Unggulan</h2>
            <p>Pilihan terbaik dari SHIFTCOMP, siap masuk keranjang kamu.</p>
          </div>

          <div className="home-featured__tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`home-featured__tab ${activeTab === tab.id ? "home-featured__tab--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="home-featured__grid">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 60}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal className="home-featured__footer">
          <a href="/products" className="btn btn--outline">
            Lihat Semua Produk
          </a>
        </Reveal>
      </div>
    </section>
  );
}
