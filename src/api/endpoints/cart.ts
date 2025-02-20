import axiosInstance from "../axios";

export const addToCart = async (productId: string, token: string | null) => {
  const response = await axiosInstance.post(
    "/cart",
    { productId },
    {
      headers: {
        token: token,
      },
    }
  );
  return response.data;
};

export const getCartDetails = async (token: string | null) => {
  const response = await axiosInstance.get("/cart", {
    headers: {
      token: token,
    },
  });
  

  return response.data.data;
};

export const deleteCartDetails = async (productId: string, token: string | null) => {
  const response = await axiosInstance.delete(`/cart/${productId}`, {
    headers: {
      token: token,
    },
  });
  return response.data;
};

export const updateCartItem = async (productId: string, newCount: number, token: string | null) => {
  const response = await axiosInstance.put(
    `/cart/${productId}`,
    { count: newCount },
    {
      headers: {
        token: token,
      },
    }
  );
  return response.data;
};
