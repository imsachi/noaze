import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import InfoIconsSection from "./ProductDetailIconsSection";

export default function ProductInfo({ product }) {
  const { addToCart } = useContext(CartContext);
  if (!product) return null;
  const navigate = useNavigate();

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate(`/checkout/${product._id}`); // 👈 send product ID
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-lg text-gray-500 mt-2">{product.tagline}</p>
      </div>

      <div className="text-2xl font-semibold text-gray-800">
        {product.price.toFixed(2)} ₹
      </div>

      <p className="text-gray-600 leading-relaxed max-w-md">
        {product.description}
      </p>

      <div className="flex gap-3">
        <button className="px-6 py-3 rounded-xl border border-sky-600  text-sky-800 font-medium hover:bg-sky-700 transition">
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="px-6 py-3 rounded-xl bg-linear-60 from-violet-300 to-sky-600 text-white font-medium hover:bg-sky-700 transition"
        >
          Buy Now
        </button>
      </div>
      <InfoIconsSection product={product} />
    </div>
  );
}
