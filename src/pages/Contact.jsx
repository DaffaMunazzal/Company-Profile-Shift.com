import { useState } from "react";
import MainLayout from "../components/MainLayout";
import SmoothScroll from "../components/SmoothScroll";
import shiftcomImage from "../components/assets/shiftcom.jpg";
import {
  JOURNEY_TIMELINE,
  BUSINESS_HOURS,
  PRIMARY_HUB,
  CONTACT_SUBJECTS,
  CONTACT_FAQS,
  SOCIAL_LINKS,
} from "../data/contactData";
import { getContactFormMessage, openWhatsApp } from "../utils/whatsapp";
import "../style/Contact.css";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: CONTACT_SUBJECTS[0],
  message: "",
};

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
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sent
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Nama wajib diisi.";
    if (!form.email.trim()) {
      next.email = "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Format email tidak valid.";
    }
    if (!form.message.trim()) next.message = "Pesan wajib diisi.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO backend: POST /api/contact { name, email, subject, message }
    openWhatsApp(getContactFormMessage(form));

    setStatus("sent");
    setForm(INITIAL_FORM);
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
    <SmoothScroll>
      <MainLayout activePath="/contact">
        <div className="contact-page">
          {/* ---------- HERO ---------- */}
          <section className="contact-hero">
            <div className="contact-hero__inner">
              <h1 className="contact-hero__title">
                Defining the Edge of <span>Innovation</span>.
              </h1>
              <p className="contact-hero__desc">
                SHIFTCOM was founded on a single principle: Precision. We don't just
                build computers; we engineer high-performance vessels for digital
                creators and professional enthusiasts.
              </p>
            </div>
          </section>

          {/* ---------- STORY & TIMELINE ---------- */}
          <section className="contact-story">
            <div className="contact-story__grid">
              <div className="contact-story__timeline-col">
                <h2 className="contact-section-title">Our Journey</h2>
                <ol className="contact-timeline">
                  {JOURNEY_TIMELINE.map((item) => (
                    <li key={item.id} className="contact-timeline__item">
                      <span className="contact-timeline__dot" aria-hidden="true" />
                      <p className="contact-timeline__year">{item.year}</p>
                      <h3 className="contact-timeline__title">{item.title}</h3>
                      <p className="contact-timeline__desc">{item.desc}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="contact-story__photo-col">
                <img
                  className="contact-story__photo"
                  src={shiftcomImage}
                  alt="SHIFTCOM workshop"
                />
                <blockquote className="contact-story__quote">
                  <p>"Excellence is not an option; it's our standard."</p>
                </blockquote>
              </div>
            </div>
          </section>

          {/* ---------- HOURS & MAP ---------- */}
          <section className="contact-hours">
            <div className="contact-hours__grid">
              <div className="contact-hours__col">
                <h2 className="contact-section-title">Hours &amp; Access</h2>
                <ul className="contact-hours__list">
                  {BUSINESS_HOURS.map((row) => (
                    <li key={row.id} className="contact-hours__row">
                      <span className="contact-hours__day">{row.day}</span>
                      <span
                        className={`contact-hours__time${
                          row.highlight ? " contact-hours__time--highlight" : ""
                        }`}
                      >
                        {row.hours}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="contact-hub-card">
                  <p className="contact-hub-card__label">{PRIMARY_HUB.label}</p>
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
                    Get Directions <ArrowIcon />
                  </button>
                </div>
              </div>

              <div className="contact-map">
                <a
                  className="contact-map__pin"
                  href={`https://www.google.com/maps/place/Masjid+Babussalam/@-6.8822601,109.6350903,3a,56.3y,61.11h,89.22t/data=!3m7!1e1!3m5!1sOQFBGX7y-Qs5v9ciMD_fsg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0.78360604938824%26panoid%3DOQFBGX7y-Qs5v9ciMD_fsg%26yaw%3D61.113519249928125!7i16384!8i8192!4m17!1m9!3m8!1s0x2e7025004eef7ab1:0x8d795258f63a1b9d!2sARKAN+CELL!8m2!3d-6.8947677!4d109.6788661!9m1!1b1!16s%2Fg%2F11vyc0fhrs!3m6!1s0x2e70265cb1446771:0x3739b56842038d1a!8m2!3d-6.8823486!4d109.6348818!10e5!16s%2Fg%2F11c58rmx8c?entry=ttu&g_ep=EgoyMDI2MDcwNy4wIKXMDSoASAFQAw%3D%3D
                    ${encodeURIComponent(
                    PRIMARY_HUB.mapQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-map__dot" />
                  <span className="contact-map__label">SHIFTCOM HQ</span>
                </a>
              </div>
            </div>
          </section>

          {/* ---------- FORM + FAQ + SOCIALS ---------- */}
          <section className="contact-form-section">
            <div className="contact-form-section__grid">
              <div className="contact-form-col">
                <h2 className="contact-section-title">Let's Build Together</h2>
                <p className="contact-form-col__lead">
                  Whether you're looking for a bespoke workstation or have a
                  technical inquiry, our concierge team is ready to assist.
                </p>
 
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form__row">
                    <div className="contact-field">
                      <label htmlFor="contact-name">Full Name</label>
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
                      <label htmlFor="contact-email">Email Address</label>
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
                    <label htmlFor="contact-subject">Subject</label>
                    <select
                      id="contact-subject"
                      value={form.subject}
                      onChange={handleChange("subject")}
                    >
                      {CONTACT_SUBJECTS.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell us about your project..."
                      value={form.message}
                      onChange={handleChange("message")}
                    />
                    {errors.message && <span className="contact-field__error">{errors.message}</span>}
                  </div>

                  <button type="submit" className="contact-form__submit">
                    {status === "sent" ? "Message Sent ✓" : "Send Message"}
                  </button>
                </form>
              </div>

              <div className="contact-side-col">
                <div className="contact-faq">
                  <h3 className="contact-faq__title">Frequently Asked</h3>
                  <div className="contact-faq__list">
                    {CONTACT_FAQS.map((faq) => {
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
                  <h3 className="contact-socials__title">Connect Globally</h3>
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
    </SmoothScroll>
  );
}
