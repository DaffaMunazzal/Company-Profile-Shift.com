import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    name: "Rizky Ardiansyah",
    role: "Content Creator",
    avatar: "https://i.pravatar.cc/80?img=12",
    quote:
      "Rakitan PC editing dari SHIFTCOMP ngebut banget, render video 4K jadi jauh lebih cepat. Pengiriman juga aman.",
    rating: 5,
  },
  {
    name: "Dewi Anggraini",
    role: "Gamer & Streamer",
    avatar: "https://i.pravatar.cc/80?img=32",
    quote:
      "Pakai fitur PC Builder gampang banget buat pemula kayak aku, langsung tau part mana yang cocok sama budget.",
    rating: 5,
  },
  {
    name: "Farhan Maulana",
    role: "Mahasiswa Teknik",
    avatar: "https://i.pravatar.cc/80?img=51",
    quote:
      "Harga bersaing dan CS-nya responsif waktu aku tanya-tanya soal kompatibilitas motherboard.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="home-testimonials">
      <div className="container">
        <Reveal className="home-section__header">
          <h2>Kata Pelanggan Kami</h2>
          <p>Ribuan builder puas dengan layanan SHIFTCOMP.</p>
        </Reveal>

        <div className="home-testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80} className="home-testimonial-card">
              <div className="home-testimonial-card__stars">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <svg
                    key={idx}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={idx < t.rating ? "var(--color-primary)" : "none"}
                    stroke="var(--color-primary)"
                    strokeWidth="1.5"
                  >
                    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
                  </svg>
                ))}
              </div>
              <p className="home-testimonial-card__quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="home-testimonial-card__author">
                <img src={t.avatar} alt={t.name} loading="lazy" />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
