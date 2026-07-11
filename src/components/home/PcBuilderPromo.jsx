import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { useLanguage } from "../../context/LanguageContext";

export default function PcBuilderPromo() {
  const { t } = useLanguage();

  return (
    <section className="home-builder-promo">
      <div className="container home-builder-promo__inner">
        <Reveal className="home-builder-promo__text">
          <span className="home-hero__eyebrow home-hero__eyebrow--light">{t("home.promo.eyebrow")}</span>
          <h2>{t("home.promo.title")}</h2>
          <p>
            {t("home.promo.desc")}
          </p>
          <Link to="/pc-builder" className="btn btn--light">
            {t("home.promo.btn")}
          </Link>
        </Reveal>

        <Reveal delay={120} className="home-builder-promo__media">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
            alt="PC Builder SHIFTCOMP"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}
