import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AddressForm from "../components/AddressForm";
import PaymentMethods from "../components/PaymentMethod";
import OrderSummary from "../components/OrderSummary";
import api from "../api/axios";
import { ArrowLeft } from "lucide-react";
import RegisterModal from "../components/RegisterModal";
import { CartContext } from "../context/CartContext";
import CheckoutCartItems from "../components/CheckoutCartItems";

export default function Checkout() {
  const { id } = useParams();
  const { cartItems, clearCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [addressSaved, setAddressSaved] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // ------------------------
  // 🔐 Token check
  // ------------------------
  useEffect(() => {
    api
      .get("/auth/me", { withCredentials: true })
      .then(() => {
        // Logged in
      })
      .catch(() => {
        setShowRegisterModal(true); // instead of navigate()
      });
  }, []);

  // Fetch product
  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      setProduct(res.data.product);
    });
  }, [id]);

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to={`/product/${id}`}>
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-semibold">Checkout</h1>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left */}
          {/* ➤ Cart Items Section */}
          <CheckoutCartItems />
          <div className="md:col-span-2 space-y-6">
            <AddressForm onAddressSaved={() => setAddressSaved(true)} />
          </div>

          <PaymentMethods />

          {/* Right */}
          <OrderSummary
            product={product}
            cartItems={cartItems}
            discount={discount}
            deliveryDate={deliveryDate}
            addressSaved={addressSaved}
          />
        </div>
      </div>

      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </div>
  );
}
