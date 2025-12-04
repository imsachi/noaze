const baseURL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  const res = await fetch(baseURL + "products");
  const data = await res.json();
  return data.products;
};
