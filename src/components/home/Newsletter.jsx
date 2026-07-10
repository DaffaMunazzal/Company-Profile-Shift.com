import { useState } from "react";
import Reveal from "./Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
            <h2>Dapatkan Promo & Info Terbaru</h2>
            <p>Berlangganan newsletter, jangan sampai ketinggalan diskon part PC.</p>
          </div>

          <form className="home-newsletter__form" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="Masukkan email kamu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Alamat email"
            />
            <button type="submit" className="btn btn--primary">
              {submitted ? "Terkirim ✓" : "Berlangganan"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
