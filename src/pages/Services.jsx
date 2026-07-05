import MainLayout from "../components/MainLayout";

export default function Services() {
  return (
    <MainLayout activePath="/services">
      <section className="container" style={{ padding: "48px 64px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-dark)" }}>
          Services
        </h2>
        {/* isi konten Services di sini */}
      </section>
    </MainLayout>
  );
}