import { Link } from "react-router-dom";
import { CATEGORIES } from "../../data/products";
import { useLanguage } from "../../context/LanguageContext";
import Reveal from "./Reveal";

const CATEGORY_ICONS = {
  cpu: "M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2M7 7h10v10H7z",
  gpu: "M3 8h18v8H3zM7 8V6a2 2 0 012-2h6a2 2 0 012 2v2M6 18v1M18 18v1",
  ram: "M4 8h16v8H4zM7 8v8M11 8v8M15 8v8",
  motherboard: "M3 3h18v18H3zM7 7h4v4H7zM14 7h3M14 11h3M14 15h3M7 15h4",
  storage: "M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01",
  psu: "M6 3h12v18H6zM9 8h6M9 12h6M9 16h6",
  case: "M6 2h12l2 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6z",
};

export default function CategoryGrid() {
  const { t } = useLanguage();

  return (
    <section className="home-categories">
      <div className="container">
        <Reveal as="div" className="home-section__header">
          <h2>{t("home.categories.title")}</h2>
          <p>{t("home.categories.subtitle")}</p>
        </Reveal>

        <div className="home-categories__grid">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 60}>
              <Link to={`/products?category=${cat.id}`} className="home-category-card">
                <span className="home-category-card__icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d={CATEGORY_ICONS[cat.id] || CATEGORY_ICONS.case} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="home-category-card__label">{t(`categories.${cat.id}`)}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
