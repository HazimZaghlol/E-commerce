import axiosInstance from "../axios";

export const fetchProductList = async () => {
  const response = await axiosInstance.get("/products");
  return response.data.data;
};

export const fetchSingleProduct = async (productId: string) => {
  const response = await axiosInstance.get(`/products/${productId}`);
  console.log(response);
  return response.data.data;
};
