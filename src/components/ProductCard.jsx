import { Link } from "react-router-dom";
export default function ProductCard({ _id, name, price, badge, images }) {
  return (
    <Link to={`/product/${_id}`}>
      <div className="rounded-2xl border border-gray-400 hover:shadow-lg transition overflow-hidden">
        <img
          src={images[0].url}
          alt={name}
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          {badge && (
            <span className="inline-block bg-sky-100 text-sky-600 text-xs px-2 py-1 rounded">
              {badge}
            </span>
          )}
          <h3 className="mt-2 font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600"> {price.toFixed(2)} ₹</p>
          <button className="mt-3 w-full bg-linear-60 from-violet-400 to-violet-300 text-black py-2 rounded-md">
            Know more
          </button>
        </div>
      </div>
    </Link>
  );
}
