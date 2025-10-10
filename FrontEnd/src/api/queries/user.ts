import { userServices } from "../services/userServices";
import type { User } from "../types";

export const getMyProfile = async (): Promise<User> => {
  const token = localStorage.getItem("auth_token");
  if (!token) throw new Error("Please login again");

  const data = await userServices.getProfile();
  return data;
};
