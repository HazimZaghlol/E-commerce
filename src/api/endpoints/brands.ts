import axiosInstance from "../axios";

export const Brands = async () => {
  const response = await axiosInstance.get("brands");
  console.log(response.data);

  return response.data;
};
