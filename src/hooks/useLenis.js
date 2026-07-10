import { useEffect } from "react";
import Lenis from "lenis";

/**
 * useLenis
 * Menginisialisasi Lenis untuk animasi scroll halus (smooth scrolling)
 * pada seluruh halaman. Cukup panggil hook ini sekali di halaman/page
 * yang butuh smooth scroll (mis. di Home.jsx).
 *
 * Kalau nanti mau dipakai global di semua halaman, pindahkan pemanggilan
 * hook ini ke MainLayout.jsx supaya berlaku di seluruh aplikasi.
 */
export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    let rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
