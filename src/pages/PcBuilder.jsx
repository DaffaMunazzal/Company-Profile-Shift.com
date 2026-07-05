import MainLayout from "../components/MainLayout";

export default function PcBuilder() {
  return (
    <MainLayout activePath="/pc-builder">
      <section className="container" style={{ padding: "48px 64px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-dark)" }}>
          PC Builder
        </h2>
        {/* isi konten PC Builder di sini */}
      </section>
    </MainLayout>
  );
}