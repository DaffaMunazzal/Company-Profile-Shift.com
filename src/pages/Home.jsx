import MainLayout from "../components/MainLayout";
import HeroSection from "../components/home/HeroSection";
import CategoryGrid from "../components/home/CategoryGrid";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import PcBuilderPromo from "../components/home/PcBuilderPromo";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import useLenis from "../hooks/useLenis";
import "../style/Products.css"; // reuse .product-card styles for FeaturedProducts
import "../style/Home.css";

export default function Home() {
  // Smooth scroll (inertia) untuk seluruh halaman Home.
  // Kalau mau berlaku di semua halaman, pindahkan useLenis() ke MainLayout.jsx.
  useLenis();

  return (
    <MainLayout activePath="/">
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <WhyChooseUs />
      <PcBuilderPromo />
      <Testimonials />
      <Newsletter />
    </MainLayout>
  );
}
