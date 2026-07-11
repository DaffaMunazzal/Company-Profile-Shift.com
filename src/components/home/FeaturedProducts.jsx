import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../../data/products";
import ProductCard from "../products/ProductCard";
import { useLanguage } from "../../context/LanguageContext";
import Reveal from "./Reveal";

const TABS = [
  { id: "All" },
  { id: "Discount" },
  { id: "Latest" },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("All");
  const { t } = useLanguage();

  const products = useMemo(() => {
    let list = [...PRODUCTS];

    if (activeTab === "Discount") {
      list = list.filter((p) => p.discountPercent > 0);
    } else if (activeTab === "Latest") {
      list = list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return list.slice(0, 8);
  }, [activeTab]);

  return (
    <section className="home-featured">
      <div className="container">
        <Reveal className="home-section__header home-section__header--row">
          <div>
            <h2>{t("home.featured.title")}</h2>
            <p>{t("home.featured.subtitle")}</p>
          </div>

          <div className="home-featured__tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`home-featured__tab ${activeTab === tab.id ? "home-featured__tab--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {t(`${tab.id}`)}
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
          <Link to="/products" className="btn btn--outline">
            {t("home.featured.viewAll")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
