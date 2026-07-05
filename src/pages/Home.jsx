// contoh halaman utama. Nanti di ganti
import MainLayout from "../components/MainLayout";

export default function Home() {
    return (
        <MainLayout activePath="/">
            <section style={{ padding: "80px 64px", textAlign: "center" }}>
                <h1 style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-dark)" }}>
                Selamat Datang di SHIFTCOMP
                </h1>
                <p style={{ maxWidth: 520, margin: "16px auto 0", color: "var(--color-text-body)" }}>
                Ini halaman contoh. Navbar dan Footer di atas & bawah otomatis muncul
                karena dibungkus lewat komponen <code>MainLayout</code>.
                </p>
            </section>
        </MainLayout>
    )
}