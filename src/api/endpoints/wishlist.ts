import axiosInstance from "../axios";

export const addToWishlist = async (productId: string, token: string | null) => {
  const response = await axiosInstance.post(
    "/wishlist",
    { productId },
    {
      headers: {
        token: token,
      },
    }
  );
  return response.data;
};

export const getWishlist = async (token: string | null) => {
  const response = await axiosInstance.get("/wishlist", {
    headers: {
      token: token,
    },
  });
  return response.data;
};

export const deleteWishlist = async (productId: string, token: string | null) => {
  const response = await axiosInstance.delete(`/wishlist/${productId}`, {
    headers: {
      token: token,
    },
  });
  return response.data;
};
