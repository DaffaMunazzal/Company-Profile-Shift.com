import { useState } from "react";
import Reveal from "./Reveal";
import { useLanguage } from "../../context/LanguageContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    // TODO backend: POST /api/newsletter/subscribe { email }
    setSubmitted(true);
    setEmail("");
    window.setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="home-newsletter">
      <div className="container">
        <Reveal className="home-newsletter__box">
          <div>
            <h2>{t("home.newsletterSection.title")}</h2>
            <p>{t("home.newsletterSection.desc")}</p>
          </div>

          <form className="home-newsletter__form" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder={t("home.newsletterSection.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label={t("home.newsletterSection.ariaLabel")}
            />
            <button type="submit" className="btn btn--primary">
              {submitted ? t("home.newsletterSection.sent") : t("home.newsletterSection.btn")}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
