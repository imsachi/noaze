import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CheckoutCartItems() {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  if (!cartItems || cartItems.length === 0)
    return (
      <div className="p-4 bg-white border rounded-xl shadow-sm text-center">
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );

  return (
    <div className="p-4 bg-white border rounded-xl shadow-sm space-y-4">
      <h2 className="text-xl font-semibold mb-2">Cart Items</h2>

      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex items-center gap-4 p-3 border-b last:border-none"
        >
          {/* Product Image */}
          {console.log(item)}

          <img
            src={item.images[0].url}
            alt={item.name}
            className="w-16 h-16 rounded object-cover border"
          />

          {/* Product Info */}
          <div className="flex-1">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">₹{item.price}</p>
          </div>

          {/* Qty Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => removeFromCart(item)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="px-3">{item.qty}</span>
            <button
              onClick={() => addToCart(item)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
