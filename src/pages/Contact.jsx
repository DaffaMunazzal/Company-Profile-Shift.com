import MainLayout from "../components/MainLayout";

export default function Contact() {
  return (
    <MainLayout activePath="/contact">
      <section className="container" style={{ padding: "48px 64px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-dark)" }}>
          Contact
        </h2>
        {/* isi konten Contact di sini */}
      </section>
    </MainLayout>
  );
}