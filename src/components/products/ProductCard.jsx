import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useLanguage } from "../../context/LanguageContext";

const STOCK_MODIFIER = {
  "in-stock": "product-card__badge--green",
  limited: "product-card__badge--orange",
  "pre-order": "product-card__badge--blue",
  "out-of-stock": "",
};

function formatIDR(value) {
  return new Intl.NumberFormat("id-ID",{
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const { t } = useLanguage();
  const [justAdded, setJustAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const isOutOfStock = product.stockStatus === "out-of-stock";
  const badgeLabel = t(`stock.${product.stockStatus}`);
  const badgeModifier = STOCK_MODIFIER[product.stockStatus];

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    // addItem sudah ada di CartContext project ini (addItem(product, qty)).
    // TODO backend: request sesungguhnya sudah ditangani di dalam CartContext.
    addItem(product, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <article className={`product-card ${isOutOfStock ? "product-card--disabled" : ""}`}>
      <div className="product-card__media">
        <img
          src={product.image}
          alt={product.name}
          className={`product-card__image ${isOutOfStock ? "product-card__image--grayscale" : ""}`}
          loading="lazy"
        />

        {isOutOfStock ? (
          <div className="product-card__overlay">
            <span className="product-card__overlay-label">{t("products.outOfStock")}</span>
          </div>
        ) : (
          <div className="product-card__stock-badge">
            <span className={`product-card__badge-dot ${badgeModifier}`} />
            <span>{badgeLabel}</span>
          </div>
        )}

        <div className="product-card__quick-actions">
          <button
            type="button"
            aria-label={wishlisted ? t("products.removeFromWishlist") : t("products.addToWishlist")}
            aria-pressed={wishlisted}
            onClick={() => toggleItem(product)}
            className={`product-card__icon-btn ${wishlisted ? "product-card__icon-btn--active" : ""}`}
          >
            <svg width="18" height="16" viewBox="0 0 24 22" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
              <path d="M12 20.5s-8.5-5.2-11-10.2C-.7 5.7 2 1.5 6.2 1.5c2.6 0 4.4 1.4 5.8 3.3 1.4-1.9 3.2-3.3 5.8-3.3 4.2 0 6.9 4.2 5.2 8.8C20.5 15.3 12 20.5 12 20.5z" />
            </svg>
          </button>
          <button type="button" aria-label={t("products.compare")} className="product-card__icon-btn">
            <svg width="18" height="15" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 6h14M13 2l4 4-4 4M21 14H7M11 18l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="product-card__body">
        <div className="product-card__meta-row">
          <span className="product-card__category">{product.categoryLabel}</span>
          <span className="product-card__sku">{t("products.sku")}: {product.sku}</span>
        </div>

        <h3 className="product-card__title">
          {product.name}
          {product.variant ? <span className="product-card__variant">{product.variant}</span> : null}
        </h3>

        <p className="product-card__description">{product.description}</p>

        <ul className="product-card__specs">
          {product.specs.map((spec) => (
            <li key={spec}>
              <svg width="12" height="15" viewBox="0 0 12 15" fill="currentColor">
                <path d="M6 0l1.8 5.5H12l-4.4 3.2L9.2 15 6 11.4 2.8 15l1.6-6.3L0 5.5h4.2z" />
              </svg>
              {spec}
            </li>
          ))}
        </ul>
      </div>

      <div className="product-card__footer">
        <div>
          {product.discountPercent > 0 && (
            <p className="product-card__old-price">
              <span>{formatIDR(product.originalPrice)}</span>{" "}
              <span className="product-card__discount">-{product.discountPercent}%</span>
            </p>
          )}
          <p className="product-card__price">{formatIDR(product.price)}</p>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          aria-label={`${t("products.addToCart")}: ${product.name}`}
          className={`product-card__cart-btn ${justAdded ? "product-card__cart-btn--added" : ""}`}
        >
          {justAdded ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
    </article>
  );
}
