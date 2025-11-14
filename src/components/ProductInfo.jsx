export default function ProductInfo({ product }) {
  if (!product) return null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
        <p className="text-lg text-gray-500 mt-2">{product.tagline}</p>
      </div>

      <div className="text-2xl font-semibold text-gray-800">
        ${product.price.toFixed(2)}
      </div>

      <p className="text-gray-600 leading-relaxed max-w-md">
        {product.description}
      </p>

      <div className="flex gap-3">
        <button className="px-6 py-3 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700 transition">
          Add to Cart
        </button>
        <button className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
          Buy Now
        </button>
      </div>

      <ul className="mt-6 text-sm text-gray-500 space-y-2">
        <li>✅ Free shipping on orders over ₹999</li>
        <li>🔄 30-day returns guarantee</li>
        <li>🕒 Ships in 24 hours</li>
      </ul>
    </div>
  );
}
