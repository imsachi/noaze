import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../api/productApi";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
