import useScrollReveal from "../../hooks/useScrollReveal";

/**
 * Reveal
 * Bungkus elemen apapun supaya muncul dengan animasi fade-in-up
 * ketika di-scroll ke viewport. Bisa dikasih delay bertahap untuk
 * efek stagger di grid/list (mis. delay={index * 80}).
 */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
