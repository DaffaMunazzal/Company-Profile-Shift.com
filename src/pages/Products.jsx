// contoh halaman produk. Nanti di ganti
import MainLayout from "../components/MainLayout";
import { useCart } from "../context/CartContext";

// Contoh data produk. Nanti ganti dengan hasil fetch dari backend/API kamu.
const DUMMY_PRODUCTS = [
  { id: "p1", name: "RTX 4070 Graphics Card", price: 8500000 },
  { id: "p2", name: "Ryzen 7 7800X3D", price: 6200000 },
  { id: "p3", name: "32GB DDR5 RAM Kit", price: 1750000 },
];

export default function Products() {
  const { addItem } = useCart();

  return (
    <MainLayout activePath="/products">
      <section style={{ padding: "48px 64px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-dark)" }}>
          Products
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
            marginTop: 24,
          }}
        >
          {DUMMY_PRODUCTS.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                padding: 16,
              }}
            >
              <h4 style={{ margin: "0 0 8px", color: "var(--color-text-dark)" }}>{product.name}</h4>
              <p style={{ margin: "0 0 12px", color: "var(--color-text-body)" }}>
                Rp {product.price.toLocaleString("id-ID")}
              </p>
              <button
                onClick={() => addItem(product, 1)}
                style={{
                  background: "var(--color-primary)",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 16px",
                  fontWeight: 700,
                  width: "100%",
                }}
              >
                Tambah ke Keranjang
              </button>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
