import { useParams } from "react-router-dom";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import Header from "../components/Header";
import { products } from "../components/Products";
import ProductSpecs from "../components/ProductSpecs";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id)) || products[0];

  const galleryImages = [
    product.image,
    "/images/product2.jpg",
    "/images/product3.jpg",
    "/images/product4.jpg",
  ];

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <ProductGallery images={galleryImages} />
          <ProductInfo product={product} />
        </div>
        <ProductSpecs specs={product.specs} description={product.longDesc} />
      </main>
    </>
  );
}
