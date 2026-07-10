import Reveal from "./Reveal";

export default function PcBuilderPromo() {
  return (
    <section className="home-builder-promo">
      <div className="container home-builder-promo__inner">
        <Reveal className="home-builder-promo__text">
          <span className="home-hero__eyebrow home-hero__eyebrow--light">PC Builder</span>
          <h2>Rakit PC Sesuai Budget & Kebutuhanmu</h2>
          <p>
            Pilih komponen satu-satu, cek kompatibilitas otomatis, dan lihat
            estimasi harga total secara real-time sebelum checkout.
          </p>
          <a href="/pc-builder" className="btn btn--light">
            Coba PC Builder
          </a>
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
