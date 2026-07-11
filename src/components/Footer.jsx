import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { SOCIAL_LINKS } from "../data/contactData";
import { getViewProcessMessage, openWhatsApp } from "../utils/whatsapp";
import "../style/Footer.css";

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  twitter: XIcon,
  linkedin: XIcon,
  youtube: YoutubeIcon,
};

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const BRAND_LINKS = [
    { label: t("common.brandLinks.mission"), to: "/contact" },
    { label: t("common.brandLinks.standards"), to: "/services" },
    { label: t("common.brandLinks.team"), to: "/contact" },
    { label: t("common.brandLinks.sustainability"), to: "/contact" },
  ];

  const QUICK_LINKS = [
    { label: t("nav.pcBuilder"), to: "/pc-builder" },
    { label: t("nav.products"), to: "/products" },
    { label: t("common.quickLinks.support"), action: () => openWhatsApp(getViewProcessMessage(t)) },
    { label: t("common.quickLinks.warranty"), to: "/services" },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // simulasi request
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="footer">
      <div className="containers">
        <div className="footer__wrapper">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__col footer__col--brand">
              <h3 className="footer__logo">SHIFTCOM</h3>
              <p className="footer__tagline">{t("footer.tagline")}</p>
              <div className="footer__socials">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = SOCIAL_ICONS[social.id] || XIcon;
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer__social-icon"
                      aria-label={social.label}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Brand Story */}
            <div className="footer__col">
              <h5>{t("footer.brandStory")}</h5>
              <ul>
                {BRAND_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer__col">
              <h5>{t("footer.quickLinks")}</h5>
              <ul>
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to}>{link.label}</Link>
                    ) : (
                      <button type="button" className="footer__link-btn" onClick={link.action}>
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer__col">
              <h5>{t("footer.newsletter")}</h5>
              <p className="footer__newsletter-text">{t("footer.newsletterText")}</p>
              <form className="footer__form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  placeholder={t("footer.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer__input"
                />
                <button type="submit" className="footer__subscribe-btn" disabled={status === "loading"}>
                  {status === "loading" ? t("footer.sending") : t("footer.subscribe")}
                </button>
                {status === "success" && <p className="footer__form-msg footer__form-msg--ok">{t("footer.subscribeSuccess")}</p>}
                {status === "error" && <p className="footer__form-msg footer__form-msg--err">{t("footer.subscribeError")}</p>}
              </form>
            </div>
          </div>

          <div className="footer__bottom">
            <p className="footer__legal">{t("footer.legal")}</p>
            <p className="footer__badge">{t("footer.badge")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.5 0.5L5.5 7L0.7 13.5H2.4L6.3 8.2L9.8 13.5H13.5L8.2 6.6L12.7 0.5H11L7.4 5.4L4.2 0.5H0.5Z"
        fill="#5F3F3A"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="13" height="13" rx="3.5" stroke="#5F3F3A" />
      <circle cx="7" cy="7" r="3" stroke="#5F3F3A" />
      <circle cx="10.8" cy="3.2" r="0.8" fill="#5F3F3A" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="12" height="10" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="13" height="10" rx="2.5" stroke="#5F3F3A" />
      <path d="M5.5 3.3L9 5.5L5.5 7.7V3.3Z" fill="#5F3F3A" />
    </svg>
  );
}
