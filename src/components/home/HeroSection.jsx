import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { useLanguage } from "../../context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="home-hero">
      <div className="container home-hero__inner">
        <Reveal className="home-hero__content">
          <span className="home-hero__eyebrow">{t("home.hero.eyebrow")}</span>
          <h1 className="home-hero__title">
            {t("home.hero.titlePrefix")}<span>{t("home.hero.titleHighlight")}</span>{t("home.hero.titleSuffix")}
          </h1>
          <p className="home-hero__subtitle">
            {t("home.hero.subtitle")}
          </p>
          <div className="home-hero__actions">
            <Link to="/products" className="btn btn--primary">
              {t("home.hero.buyNow")}
            </Link>
            <Link to="/pc-builder" className="btn btn--outline">
              {t("home.hero.startBuilder")}
            </Link>
          </div>

          <div className="home-hero__stats">
            <div>
              <strong>10K+</strong>
              <span>{t("home.hero.stats.customers")}</span>
            </div>
            <div>
              <strong>500+</strong>
              <span>{t("home.hero.stats.products")}</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>{t("home.hero.stats.rating")}</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="home-hero__media" delay={120}>
          <img
            src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80"
            alt="Rakitan PC gaming SHIFTCOMP"
            loading="eager"
          />
          <div className="home-hero__badge">
            <span className="home-hero__badge-dot" />
            {t("home.hero.badge")}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
