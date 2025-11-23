import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import Header from "../components/Header";
import ProductSections from "../components/ProductSections";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  console.log(product);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.log("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );

  if (!product)
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Product Not Found
      </div>
    );

  // Gallery images → if backend provides array, use that
  const galleryImages = product.images?.length
    ? product.images
    : [product.image];

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <ProductGallery media={galleryImages} />
          <ProductInfo product={product} />
        </div>

        <ProductSections sections={product.sections} />
      </main>
    </>
  );
}
