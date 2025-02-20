import axiosInstance from "../axios";

export const categories = async () => {
  const response = await axiosInstance.get("categories");
  return response.data;
};
