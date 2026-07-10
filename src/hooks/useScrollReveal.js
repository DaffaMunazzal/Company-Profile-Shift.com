import { useEffect, useRef } from "react";

/**
 * useScrollReveal
 * Menambahkan class "is-visible" pada elemen ketika elemen tersebut
 * masuk viewport, dipakai bareng class ".reveal" di CSS untuk animasi
 * fade-in-up yang halus saat di-scroll (jalan berbarengan sama Lenis).
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px", ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}
