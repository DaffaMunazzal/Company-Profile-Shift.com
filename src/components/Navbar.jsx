import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "PC Builder", href: "/pc-builder" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ activePath = "/" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <div className="navbar__brand">
          <a href="/">SHIFTCOMP</a>
        </div>

        {/* Nav links - desktop */}
        <nav className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link ${activePath === link.href ? "navbar__link--active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          <button className="navbar__icon-btn" aria-label="Cari">
            <SearchIcon />
          </button>
          <button className="navbar__icon-btn" aria-label="Akun">
            <UserIcon />
          </button>
          <button
            className="navbar__icon-btn navbar__cart-btn"
            aria-label="Keranjang"
            onClick={() => setCartOpen((v) => !v)}
          >
            <CartIcon />
            {totalItems > 0 && <span className="navbar__cart-badge">{totalItems}</span>}
          </button>

          {/* Hamburger - mobile only */}
          <button
            className="navbar__hamburger"
            aria-label="Menu"
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
            <h4>Keranjang ({totalItems})</h4>
            {items.length === 0 ? (
              <p className="navbar__cart-empty">Keranjang masih kosong.</p>
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
                          aria-label="Hapus item"
                        >
                          ×
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="navbar__cart-total">
                  <span>Total</span>
                  <strong>Rp {totalPrice.toLocaleString("id-ID")}</strong>
                </div>
                <button className="navbar__checkout-btn">Checkout</button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.25 14.5C11.7018 14.5 14.5 11.7018 14.5 8.25C14.5 4.79822 11.7018 2 8.25 2C4.79822 2 2 4.79822 2 8.25C2 11.7018 4.79822 14.5 8.25 14.5Z"
        stroke="#5F3F3A"
        strokeWidth="1.5"
      />
      <path d="M16 16L12.5 12.5" stroke="#5F3F3A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 9C10.933 9 12.5 7.433 12.5 5.5C12.5 3.567 10.933 2 9 2C7.067 2 5.5 3.567 5.5 5.5C5.5 7.433 7.067 9 9 9Z"
        stroke="#5F3F3A"
        strokeWidth="1.5"
      />
      <path
        d="M2.5 16C2.5 12.9624 5.41015 10.5 9 10.5C12.5899 10.5 15.5 12.9624 15.5 16"
        stroke="#5F3F3A"
        strokeWidth="1.5"
        strokeLinecap="round"
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
