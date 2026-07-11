import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-layout__content">{children}</main>
      <Footer />
    </div>
  );
}
