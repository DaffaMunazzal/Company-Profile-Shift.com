import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children, activePath }) {
  return (
    <div className="main-layout">
      <Navbar activePath={activePath} />
      <main className="main-layout__content">{children}</main>
      <Footer />
    </div>
  );
}
