import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        smoothWheel: true,
        touchMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
