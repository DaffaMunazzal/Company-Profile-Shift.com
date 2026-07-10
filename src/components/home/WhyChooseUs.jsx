import Reveal from "./Reveal";

const FEATURES = [
  {
    title: "100% Produk Original",
    desc: "Semua komponen bergaransi resmi distributor, bebas dari barang KW.",
    icon: "M9 12l2 2 4-4M12 22c5-1.5 8-5.5 8-10V6l-8-4-8 4v6c0 4.5 3 8.5 8 10z",
  },
  {
    title: "Pengiriman Cepat & Aman",
    desc: "Packing anti guncangan, dikirim dari gudang terdekat ke lokasimu.",
    icon: "M3 7h11v8H3zM14 10h4l3 3v2h-7zM6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z",
  },
  {
    title: "Konsultasi Gratis",
    desc: "Bingung pilih part? Chat teknisi kami sebelum checkout, kapan saja.",
    icon: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  },
  {
    title: "Layanan Purna Jual",
    desc: "Klaim garansi dan servis mudah lewat toko fisik maupun online.",
    icon: "M12 2l3 6 6 .9-4.5 4.4 1 6.2-5.5-2.9L6.5 19.5l1-6.2L3 8.9 9 8z",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="home-why">
      <div className="container">
        <Reveal className="home-section__header">
          <h2>Kenapa Pilih SHIFTCOMP?</h2>
          <p>Belanja komponen PC jadi lebih tenang dan terpercaya.</p>
        </Reveal>

        <div className="home-why__grid">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 80} className="home-why__card">
              <span className="home-why__icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d={f.icon} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
