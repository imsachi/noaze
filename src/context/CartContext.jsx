import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  // ----------------------------------------
  // ✅ Load cart from localStorage on refresh
  // ----------------------------------------
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsCartLoaded(true);
  }, []);

  // ----------------------------------------
  // ✅ Save cart to localStorage whenever cart changes
  // ----------------------------------------
  useEffect(() => {
    if (!isCartLoaded) return;
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ----------------------------------------
  // ✅ Add item to cart (increase qty if exists)
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
  // ✅ Decrease qty OR remove item completely
  // ----------------------------------------
  const removeFromCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (!exists) return prev;

      // If qty becomes 0 → remove the item fully
      if (exists.qty - qty <= 0) {
        return prev.filter((item) => item._id !== product._id);
      }

      // Otherwise reduce qty
      return prev.map((item) =>
        item._id === product._id ? { ...item, qty: item.qty - qty } : item
      );
    });
  };

  // ----------------------------------------
  // ❌ Remove item instantly (no qty logic)
  // ----------------------------------------
  const removeItemCompletely = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  // ----------------------------------------
  // Clear all cart items
  // ----------------------------------------
  const clearCart = () => {
    console.log("fjc");
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        removeItemCompletely,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
