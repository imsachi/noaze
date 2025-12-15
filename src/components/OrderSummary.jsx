import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function OrderSummary({ addressSaved, cartItems }) {
  console.log(addressSaved);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { clearCart } = useContext(CartContext);
  const [billing, setBilling] = useState(null);
  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  // ----------------------------
  // ✅ Fetch Billing from Backend
  // ----------------------------
  useEffect(() => {
    if (!user || cartItems.length === 0) return;

    const fetchBilling = async () => {
      try {
        const res = await api.post(
          "/store/billing/calculate",
          {
            cartItems: cartItems.map((item) => ({
              product: item._id,
              qty: item.qty,
              price: item.price,
            })),
            pincode: user.addresses[0]?.pincode,
            discountCode,
          },
          { withCredentials: true }
        );

        setBilling(res.data.bill);
      } catch (err) {
        console.error("Billing fetch failed", err);
      }
    };

    fetchBilling();
  }, [user, cartItems, discountCode]);

  // ----------------------------
  // ✅ Place Order
  // ----------------------------
  const placeOrder = async () => {
    if (!billing) return alert("Billing is not ready yet.");
    console.log(user);
    try {
      setLoading(true);

      const res = await api.post(
        "/orders/place",
        {
          items: cartItems.map((item) => ({
            product: item._id,
            qty: item.qty,
            price: item.price,
          })),
          user: user,
          billing,
        },
        { withCredentials: true }
      );

      clearCart();
      navigate("/order-success");
    } catch (err) {
      alert(err.response?.data?.error || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (!billing)
    return (
      <div className="p-5 bg-gray-100 rounded-xl text-center">
        Calculating billing...
      </div>
    );

  return (
    <div className="p-5 bg-white rounded-2xl border border-gray-100">
      <h2 className="text-xl font-bold mb-3">Order Summary</h2>

      {/* ---------------- Cart Items ---------------- */}
      <div className="space-y-3 mb-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between text-sm text-gray-800"
          >
            <span>
              {item.title} × {item.qty}
            </span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
      </div>

      {/* ---------------- Discount Code Input ---------------- */}
      <div className="mb-3 flex gap-2">
        <input
          type="text"
          placeholder="Discount code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-lg"
        />
        <button
          onClick={() => setDiscountCode(discountCode)}
          className="bg-black text-white px-4 rounded-lg"
        >
          Apply
        </button>
      </div>

      {/* ---------------- Billing Summary ---------------- */}
      <div className="mt-4 border-t pt-4 text-gray-800 space-y-2">
        <p className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{billing.subtotal}</span>
        </p>
        <p className="flex justify-between text-green-600">
          <span>Discount:</span>
          <span>- ₹{billing.discount}</span>
        </p>
        <p className="flex justify-between">
          <span>Shipping:</span>
          <span>₹{billing.deliveryCharge}</span>
        </p>
        <p className="flex justify-between">
          <span>Tax:</span>
          <span>₹{billing.gst}</span>
        </p>

        <h3 className="flex justify-between font-bold text-lg pt-3 border-t mt-2">
          <span>Total:</span>
          <span>₹{billing.total}</span>
        </h3>
      </div>

      {/* ---------------- Place Order Button ---------------- */}
      <button
        onClick={placeOrder}
        disabled={!addressSaved}
        className={`mt-4 w-full py-3 rounded-lg text-white 
      ${addressSaved ? "bg-black" : "bg-gray-400 cursor-not-allowed"}
  `}
      >
        {addressSaved
          ? loading
            ? "Placing Order.."
            : "Place Order"
          : "Save Address To Continue"}
      </button>
    </div>
  );
}
