import Reveal from "./Reveal";
import { useLanguage } from "../../context/LanguageContext";

const TESTIMONIALS_STATIC = [
  {
    avatar: "https://i.imgur.com/5H8SsQZ.png",
    rating: 5,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/177914586?v=4",
    rating: 4,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/159778410?v=4",
    rating: 5,
  },
];

export default function Testimonials() {
  const { t } = useLanguage();
  const list = t("home.testimonials.items") || [];

  return (
    <section className="home-testimonials">
      <div className="container">
        <Reveal className="home-section__header">
          <h2>{t("home.testimonials.title")}</h2>
          <p>{t("home.testimonials.subtitle")}</p>
        </Reveal>

        <div className="home-testimonials__grid">
          {list.map((item, i) => {
            const staticData = TESTIMONIALS_STATIC[i] || { rating: 5, avatar: "" };
            return (
              <Reveal key={item.name} delay={i * 80} className="home-testimonial-card">
                <div className="home-testimonial-card__stars">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <svg
                      key={idx}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={idx < staticData.rating ? "var(--color-primary)" : "none"}
                      stroke="var(--color-primary)"
                      strokeWidth="1.5"
                    >
                      <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
                    </svg>
                  ))}
                </div>
                <p className="home-testimonial-card__quote">&ldquo;{item.quote}&rdquo;</p>
                <div className="home-testimonial-card__author">
                  <img src={staticData.avatar} alt={item.name} loading="lazy" />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
