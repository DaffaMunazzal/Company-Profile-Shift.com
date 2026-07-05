import { useState } from "react";
import "./Footer.css";

const BRAND_LINKS = ["Our Mission", "Precision Standards", "The Team", "Sustainability"];
const QUICK_LINKS = ["PC Builder", "New Arrivals", "Support Center", "Warranty Policy"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      // TODO backend: sambungkan ke endpoint newsletter kamu, contoh:
      // await fetch("/api/newsletter/subscribe", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      await new Promise((resolve) => setTimeout(resolve, 500)); // simulasi request
      setStatus("success");
      setEmail("");
    } catch (err) {
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
              <p className="footer__tagline">
                © 2026 SHIFTCOM. Precision
                <br />
                Engineering for Digital Creators.
              </p>
              <div className="footer__socials">
                <a href="#" className="footer__social-icon" aria-label="Twitter / X">
                  <XIcon />
                </a>
                <a href="#" className="footer__social-icon" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#" className="footer__social-icon" aria-label="Youtube">
                  <YoutubeIcon />
                </a>
              </div>
            </div>

            {/* Brand Story */}
            <div className="footer__col">
              <h5>Brand Story</h5>
              <ul>
                {BRAND_LINKS.map((label) => (
                  <li key={label}>
                    <a href="#">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer__col">
              <h5>Quick Links</h5>
              <ul>
                {QUICK_LINKS.map((label) => (
                  <li key={label}>
                    <a href="#">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer__col">
              <h5>Newsletter</h5>
              <p className="footer__newsletter-text">
                Stay updated with the latest in
                <br />
                performance tech.
              </p>
              <form className="footer__form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer__input"
                />
                <button type="submit" className="footer__subscribe-btn" disabled={status === "loading"}>
                  {status === "loading" ? "Mengirim..." : "Subscribe"}
                </button>
                {status === "success" && <p className="footer__form-msg footer__form-msg--ok">Terima kasih, berhasil subscribe!</p>}
                {status === "error" && <p className="footer__form-msg footer__form-msg--err">Gagal, coba lagi.</p>}
              </form>
            </div>
          </div>

          <div className="footer__bottom">
            <p className="footer__legal">Privacy Policy | Terms of Service | Cookies</p>
            <p className="footer__badge">DESIGNED FOR PERFORMANCE</p>
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
