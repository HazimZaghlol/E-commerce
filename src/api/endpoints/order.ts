import { ShippingAddress } from "../../types/order";
import axiosInstance from "../axios";

export const LoginVerified = async (token: string  ) => {
  const response = await axiosInstance.get("/auth/verifyToken", {
    headers: {
      token: token,
    },
  });

  return response.data;
};

export const orderSubmit = async (cardId: number, shippingAddress: ShippingAddress, token: string) => {
  const response = await axiosInstance.post(
    `/orders/${cardId}`,
    { shippingAddress },
    {
      headers: {
        token: token,
      },
    }
  );
  console.log({ shippingAddress });
  console.log(response.data);

  return response.data;
};

export const VisaSubmit = async (cardId: number, shippingAddress: ShippingAddress, token: string) => {
  const response = await axiosInstance.post(
    `/orders/checkout-session/${cardId}`,
    { shippingAddress },
    {
      headers: {
        token: token,
      },
      params: {
        url: "http://localhost:5173",
      },
    }
  );
  return response.data;
};
