import axiosInstance from "../axios";
import { UserData, UserLogin } from "../../types/auth";

export const registerUser = async (userData: UserData) => {
  const response = await axiosInstance.post("/auth/signup", userData);
  return response.data;
};

export const LoginUser = async (userLogin: UserLogin) => {
  const response = await axiosInstance.post("/auth/signin", userLogin);
  return response.data;
};

