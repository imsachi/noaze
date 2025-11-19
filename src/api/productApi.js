const API_URL = "https://zustit.com/api/products";

export const getProducts = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.products;
};
