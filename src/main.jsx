import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { LanguageProvider } from "./context/LanguageContext";
import SmoothScroll from "./components/SmoothScroll";
import "./style/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <CartProvider>
        <WishlistProvider>
          <SmoothScroll>
            <App />
          </SmoothScroll>
        </WishlistProvider>
      </CartProvider>
    </LanguageProvider>
  </React.StrictMode>
);
