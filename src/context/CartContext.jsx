import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(undefined);

const STORAGE_KEY = "shiftcomp_cart";

function loadInitialCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "SET_CART": {
      return action.payload ?? [];
    }
    case "ADD_ITEM": {
      const { product, qty = 1 } = action.payload;
      const existing = state.find((item) => item.id === product.id);
      if (existing) {
        return state.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...state, { ...product, qty }];
    }
    case "REMOVE_ITEM": {
      const { id } = action.payload;
      return state.filter((item) => item.id !== id);
    }
    case "UPDATE_QTY": {
      const { id, qty } = action.payload;
      if (qty <= 0) {
        return state.filter((item) => item.id !== id);
      }
      return state.map((item) => (item.id === id ? { ...item, qty } : item));
    }
    case "CLEAR_CART": {
      return [];
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadInitialCart);

  // Persist ke localStorage setiap kali cart berubah.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, qty } });
    // TODO backend: POST /api/cart/items { productId: product.id, qty }
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
    // TODO backend: DELETE /api/cart/items/:id
  };

  const updateQuantity = (id, qty) => {
    dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
    // TODO backend: PATCH /api/cart/items/:id { qty }
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    // TODO backend: DELETE /api/cart
  };

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.qty * (item.price || 0), 0),
    [items]
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart harus dipakai di dalam <CartProvider>");
  }
  return ctx;
}
