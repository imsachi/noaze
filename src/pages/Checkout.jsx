import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AddressForm from "../components/AddressForm";
import PaymentMethods from "../components/PaymentMethod";
import CouponBox from "../components/CouponBox";
import OrderSummary from "../components/OrderSummary";
import api from "../api/axios";
import { ArrowLeft } from "lucide-react";

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [addressSaved, setAddressSaved] = useState(false);
  console.log(addressSaved, "gggggggg");
  // ------------------------
  // 🔐 Check for token cookie
  // ------------------------
  useEffect(() => {
    api
      .get("/auth/me", { withCredentials: true })
      .then(() => {
        // user is authenticated
      })
      .catch(() => {
        navigate("/register");
      });
  }, [navigate]);

  // Fetch product
  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      setProduct(res.data.product);
    });
  }, [id]);

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  // Example delivery date
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

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left */}
          <div className="md:col-span-2 space-y-6">
            <AddressForm onAddressSaved={() => setAddressSaved(true)} />
          </div>
          <PaymentMethods />
          {/* Right */}
          <OrderSummary
            product={product}
            discount={discount}
            deliveryDate={deliveryDate}
            addressSaved={addressSaved}
          />
        </div>
      </div>
    </div>
  );
}
