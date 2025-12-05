import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // ----------------------------------------
  // ✅ Load cart from localStorage on refresh
  // ----------------------------------------
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // ----------------------------------------
  // ✅ Save cart to localStorage on change
  // ----------------------------------------
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ----------------------------------------
  // Add item
  // ----------------------------------------
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);

      if (exists) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + qty } : item
        );
      }

      return [...prev, { ...product, qty }];
    });
  };

  // ----------------------------------------
  // Remove item
  // ----------------------------------------
  const removeFromCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);

      if (exists) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty - qty } : item
        );
      }

      return [...prev, { ...product, qty }];
    });
  };

  // ----------------------------------------
  // Clear cart
  // ----------------------------------------
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart"); // optional
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
