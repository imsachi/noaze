import { Link } from "react-router-dom";
export default function ProductCard({ id, title, price, badge, image }) {
  return (
    <Link to={`/product/${id}`}>
      <div className="rounded-2xl border shadow-sm hover:shadow-lg transition overflow-hidden">
        <img src={image} alt={title} className="w-full h-56 object-cover" />
        <div className="p-4">
          {badge && (
            <span className="inline-block bg-sky-100 text-sky-600 text-xs px-2 py-1 rounded">
              {badge}
            </span>
          )}
          <h3 className="mt-2 font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">${price.toFixed(2)}</p>
          <button className="mt-3 w-full  bg-blue-500 text-black py-2 rounded-md">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
