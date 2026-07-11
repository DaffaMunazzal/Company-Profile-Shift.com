import { useState } from "react";
import MainLayout from "../components/MainLayout";
import LocationMap from "../components/LocationMap";
import shiftcomImage from "../components/assets/shiftcom.jpg";
import { BUSINESS_HOURS } from "../constants";
import { PRIMARY_HUB, SOCIAL_LINKS } from "../data/contactData";
import { getContactFormMessage, openWhatsApp } from "../utils/whatsapp";
import { useLanguage } from "../context/LanguageContext";
import "../style/Contact.css";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      className={`contact-faq__chevron${open ? " contact-faq__chevron--open" : ""}`}
      width="12" height="8" viewBox="0 0 12 8" fill="none"
    >
      <path d="M1 1.5L6 6.5L11 1.5" stroke="#2a1614" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const subjects = t("contact.subjects");
  const journey = t("contact.journey");
  const faqs = t("contact.faqs");

  const [form, setForm] = useState({ name: "", email: "", subject: subjects[0], message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sent
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = t("contact.errorName");
    if (!form.email.trim()) {
      next.email = t("contact.errorEmail");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = t("contact.errorEmail");
    }
    if (!form.message.trim()) next.message = t("contact.errorMessage");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO backend: POST /api/contact { name, email, subject, message }
    openWhatsApp(getContactFormMessage(form, t));

    setStatus("sent");
    setForm((prev) => ({ ...prev, name: "", email: "", message: "" }));
    setTimeout(() => setStatus("idle"), 4000);
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      PRIMARY_HUB.mapQuery
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const toggleFaq = (id) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <MainLayout activePath="/contact">
      <div className="contact-page">
        {/* ---------- HERO ---------- */}
        <section className="contact-hero">
          <div className="contact-hero__inner" data-aos="fade-up">
            <h1 className="contact-hero__title">
              {t("contact.heroTitle1")} <span>{t("contact.heroHighlight")}</span>{t("contact.heroTitle2")}
            </h1>
            <p className="contact-hero__desc">{t("contact.heroDesc")}</p>
          </div>
        </section>

        {/* ---------- STORY & TIMELINE ---------- */}
        <section className="contact-story">
          <div className="contact-story__grid">
            <div className="contact-story__timeline-col" data-aos="fade-right">
              <h2 className="contact-section-title">{t("contact.ourJourney")}</h2>
              <ol className="contact-timeline">
                {journey.map((item) => (
                  <li key={item.id} className="contact-timeline__item">
                    <span className="contact-timeline__dot" aria-hidden="true" />
                    <p className="contact-timeline__year">{item.year}</p>
                    <h3 className="contact-timeline__title">{item.title}</h3>
                    <p className="contact-timeline__desc">{item.desc}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="contact-story__photo-col" data-aos="fade-left">
              <img
                className="contact-story__photo"
                src={shiftcomImage}
                alt="SHIFTCOM workshop"
              />
              <blockquote className="contact-story__quote">
                <p>{t("contact.quote")}</p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ---------- HOURS & MAP ---------- */}
        {/* Jam operasional di sini sengaja diambil dari BUSINESS_HOURS yang sama
            dipakai modal "Schedule Consultation" (src/constants.js), supaya
            keduanya selalu konsisten. */}
        <section className="contact-hours">
          <div className="contact-hours__grid">
            <div className="contact-hours__col" data-aos="fade-up">
              <h2 className="contact-section-title">{t("contact.hoursAccess")}</h2>
              <ul className="contact-hours__list">
                {BUSINESS_HOURS.map((row, idx) => {
                  const dayLabels = [
                    t("common.monFri"),
                    t("common.sat"),
                    t("common.sun"),
                  ];
                  const dayName = dayLabels[idx] || row.day;
                  const timeStr = row.hours === "Libur" ? t("common.holiday") : row.hours;
                  return (
                    <li key={row.day} className="contact-hours__row">
                      <span className="contact-hours__day">{dayName}</span>
                      <span
                        className={`contact-hours__time${row.hours === "Libur" ? " contact-hours__time--highlight" : ""
                          }`}
                      >
                        {timeStr}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="contact-hub-card">
                <p className="contact-hub-card__label">{t("contact.primaryHub")}</p>
                <p className="contact-hub-card__address">
                  {PRIMARY_HUB.addressLines.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
                <button
                  type="button"
                  className="contact-hub-card__btn"
                  onClick={handleGetDirections}
                >
                  {t("contact.getDirections")} <ArrowIcon />
                </button>
              </div>
            </div>

            <div className="contact-map" data-aos="fade-up" data-aos-delay="100">
              <LocationMap
                center={PRIMARY_HUB.coordinates}
                label="SHIFTCOM HQ"
                address={PRIMARY_HUB.mapQuery}
              />
            </div>
          </div>
        </section>

        {/* ---------- FORM + FAQ + SOCIALS ---------- */}
        <section className="contact-form-section">
          <div className="contact-form-section__grid">
            <div className="contact-form-col" data-aos="fade-right">
              <h2 className="contact-section-title">{t("contact.letsBuild")}</h2>
              <p className="contact-form-col__lead">{t("contact.letsBuildLead")}</p>

              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__row">
                  <div className="contact-field">
                    <label htmlFor="contact-name">{t("contact.fullName")}</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange("name")}
                    />
                    {errors.name && <span className="contact-field__error">{errors.name}</span>}
                  </div>
                  <div className="contact-field">
                    <label htmlFor="contact-email">{t("contact.emailAddress")}</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange("email")}
                    />
                    {errors.email && <span className="contact-field__error">{errors.email}</span>}
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-subject">{t("contact.subject")}</label>
                  <select
                    id="contact-subject"
                    value={form.subject}
                    onChange={handleChange("subject")}
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-message">{t("contact.message")}</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder={t("contact.messagePlaceholder")}
                    value={form.message}
                    onChange={handleChange("message")}
                  />
                  {errors.message && <span className="contact-field__error">{errors.message}</span>}
                </div>

                <button type="submit" className="contact-form__submit">
                  {status === "sent" ? t("contact.messageSent") : t("contact.sendMessage")}
                </button>
              </form>
            </div>

            <div className="contact-side-col" data-aos="fade-left">
              <div className="contact-faq">
                <h3 className="contact-faq__title">{t("contact.faqTitle")}</h3>
                <div className="contact-faq__list">
                  {faqs.map((faq) => {
                    const open = openFaq === faq.id;
                    return (
                      <div key={faq.id} className="contact-faq__item">
                        <button
                          type="button"
                          className="contact-faq__question"
                          onClick={() => toggleFaq(faq.id)}
                          aria-expanded={open}
                        >
                          <span>{faq.q}</span>
                          <ChevronIcon open={open} />
                        </button>
                        {open && <p className="contact-faq__answer">{faq.a}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="contact-socials">
                <h3 className="contact-socials__title">{t("contact.connectGlobally")}</h3>
                <div className="contact-socials__list">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-socials__link"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
