import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const WishlistContext = createContext(undefined);

const STORAGE_KEY = "shiftcomp_wishlist";

function loadInitialWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function wishlistReducer(state, action) {
  switch (action.type) {
    case "SET_WISHLIST": {
      return action.payload ?? [];
    }
    case "ADD_ITEM": {
      const { product } = action.payload;
      if (state.some((item) => item.id === product.id)) return state;
      return [...state, product];
    }
    case "REMOVE_ITEM": {
      const { id } = action.payload;
      return state.filter((item) => item.id !== id);
    }
    case "CLEAR_WISHLIST": {
      return [];
    }
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [items, dispatch] = useReducer(wishlistReducer, undefined, loadInitialWishlist);

  // Persist ke localStorage setiap kali wishlist berubah.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product) => {
    dispatch({ type: "ADD_ITEM", payload: { product } });
    // TODO backend: POST /api/wishlist/items { productId: product.id }
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
    // TODO backend: DELETE /api/wishlist/items/:id
  };

  const toggleItem = (product) => {
    const exists = items.some((item) => item.id === product.id);
    if (exists) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const isWishlisted = (id) => items.some((item) => item.id === id);

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" });
  };

  const totalItems = useMemo(() => items.length, [items]);

  const value = {
    items,
    addItem,
    removeItem,
    toggleItem,
    isWishlisted,
    clearWishlist,
    totalItems,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist harus dipakai di dalam <WishlistProvider>");
  }
  return ctx;
}
