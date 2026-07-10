import Reveal from "./Reveal";

export default function HeroSection() {
  return (
    <section className="home-hero">
      <div className="container home-hero__inner">
        <Reveal className="home-hero__content">
          <span className="home-hero__eyebrow">SHIFTCOMP • Since 2018</span>
          <h1 className="home-hero__title">
            Rakit PC Impianmu, <span>Tanpa Ribet.</span>
          </h1>
          <p className="home-hero__subtitle">
            Komponen PC original dengan garansi resmi, harga bersaing, dan tim
            teknisi berpengalaman yang siap bantu kamu dari pemilihan part
            sampai instalasi.
          </p>
          <div className="home-hero__actions">
            <a href="/products" className="btn btn--primary">
              Belanja Sekarang
            </a>
            <a href="/pc-builder" className="btn btn--outline">
              Mulai PC Builder
            </a>
          </div>

          <div className="home-hero__stats">
            <div>
              <strong>10K+</strong>
              <span>Pelanggan Puas</span>
            </div>
            <div>
              <strong>500+</strong>
              <span>Produk Tersedia</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>Rating Toko</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="home-hero__media" delay={120}>
          <img
            src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80"
            alt="Rakitan PC gaming SHIFTCOMP"
            loading="eager"
          />
          <div className="home-hero__badge">
            <span className="home-hero__badge-dot" />
            Garansi Resmi 3 Tahun
          </div>
        </Reveal>
      </div>
    </section>
  );
}
