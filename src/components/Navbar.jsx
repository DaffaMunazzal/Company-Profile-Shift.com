import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useLanguage } from "../context/LanguageContext";
import { getCartCheckoutMessage, openWhatsApp } from "../utils/whatsapp";
import "../style/Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();
  const { items: wishItems, totalItems: totalWishItems, removeItem: removeWishItem } = useWishlist();
  const { lang, toggleLang, t } = useLanguage();

  const NAV_LINKS = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.products"), href: "/products" },
    { label: t("nav.pcBuilder"), href: "/pc-builder" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const handleCheckout = () => {
    if (items.length === 0) return;
    openWhatsApp(getCartCheckoutMessage(items, totalPrice, t));
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <div className="navbar__brand">
          <Link to="/" onClick={() => setMenuOpen(false)}>SHIFTCOMP</Link>
        </div>

        {/* Nav links - desktop */}
        <nav className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === "/"}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__lang-btn"
            aria-label={t("nav.language")}
            onClick={toggleLang}
            title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
          >
            <GlobeIcon />
            <span className="navbar__lang-code">{lang.toUpperCase()}</span>
          </button>

          <button
            className="navbar__icon-btn"
            aria-label={t("nav.wishlist")}
            onClick={() => {
              setWishlistOpen((v) => !v);
              setCartOpen(false);
            }}
          >
            <HeartIcon filled={totalWishItems > 0} />
            {totalWishItems > 0 && <span className="navbar__cart-badge">{totalWishItems}</span>}
          </button>

          <button
            className="navbar__icon-btn navbar__cart-btn"
            aria-label={t("nav.cart")}
            onClick={() => {
              setCartOpen((v) => !v);
              setWishlistOpen(false);
            }}
          >
            <CartIcon />
            {totalItems > 0 && <span className="navbar__cart-badge">{totalItems}</span>}
          </button>

          {/* Hamburger - mobile only */}
          <button
            className="navbar__hamburger"
            aria-label={t("nav.menu")}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Dropdown mini-cart */}
        {cartOpen && (
          <div className="navbar__cart-dropdown">
            <h4>{t("cart.title")} ({totalItems})</h4>
            {items.length === 0 ? (
              <p className="navbar__cart-empty">{t("cart.empty")}</p>
            ) : (
              <>
                <ul className="navbar__cart-list">
                  {items.map((item) => (
                    <li key={item.id} className="navbar__cart-item">
                      <div className="navbar__cart-item-info">
                        <span className="navbar__cart-item-name">{item.name}</span>
                        <span className="navbar__cart-item-price">
                          Rp {(item.price || 0).toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="navbar__cart-item-qty">
                        <button onClick={() => updateQuantity(item.id, item.qty - 1)}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQuantity(item.id, item.qty + 1)}>+</button>
                        <button
                          className="navbar__cart-item-remove"
                          onClick={() => removeItem(item.id)}
                          aria-label={t("cart.remove")}
                        >
                          ×
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="navbar__cart-total">
                  <span>{t("cart.total")}</span>
                  <strong>Rp {totalPrice.toLocaleString("id-ID")}</strong>
                </div>
                <button className="navbar__checkout-btn" onClick={handleCheckout}>
                  {t("cart.checkout")}
                </button>
              </>
            )}
          </div>
        )}

        {/* Dropdown wishlist */}
        {wishlistOpen && (
          <div className="navbar__cart-dropdown navbar__wishlist-dropdown">
            <h4>{t("wishlist.title")} ({totalWishItems})</h4>
            {wishItems.length === 0 ? (
              <>
                <p className="navbar__cart-empty">{t("wishlist.empty")}</p>
                <p className="navbar__wishlist-hint">{t("wishlist.hint")}</p>
              </>
            ) : (
              <ul className="navbar__cart-list">
                {wishItems.map((item) => (
                  <li key={item.id} className="navbar__cart-item">
                    <div className="navbar__cart-item-info">
                      <span className="navbar__cart-item-name">{item.name}</span>
                      <span className="navbar__cart-item-price">
                        Rp {(item.price || 0).toLocaleString("id-ID")}
                      </span>
                    </div>
                    <button
                      className="navbar__cart-item-remove"
                      onClick={() => removeWishItem(item.id)}
                      aria-label={t("wishlist.remove")}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <Link
              to="/products"
              className="navbar__checkout-btn navbar__wishlist-link"
              onClick={() => setWishlistOpen(false)}
            >
              {t("wishlist.viewProducts")}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

function GlobeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="7" stroke="#5F3F3A" strokeWidth="1.5" />
      <path d="M2 9h14M9 2c1.8 2 2.8 4.5 2.8 7s-1 5-2.8 7c-1.8-2-2.8-4.5-2.8-7s1-5 2.8-7z" stroke="#5F3F3A" strokeWidth="1.3" />
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg width="18" height="16" viewBox="0 0 24 22" fill={filled ? "#5F3F3A" : "none"} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 20.5s-8.5-5.2-11-10.2C-.7 5.7 2 1.5 6.2 1.5c2.6 0 4.4 1.4 5.8 3.3 1.4-1.9 3.2-3.3 5.8-3.3 4.2 0 6.9 4.2 5.2 8.8C20.5 15.3 12 20.5 12 20.5z"
        stroke="#5F3F3A"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 2H3.5L5.4 11.5C5.5 12 6 12.5 6.5 12.5H14.5C15 12.5 15.5 12 15.6 11.5L17 4.5H4.5"
        stroke="#5F3F3A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="16" r="1" fill="#5F3F3A" />
      <circle cx="14" cy="16" r="1" fill="#5F3F3A" />
    </svg>
  );
}
