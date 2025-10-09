import { useMutation } from "@tanstack/react-query";
import type { AuthResponse } from "./useAuth";
import type { LoginCredentials } from "../types";
import { userServices } from "../services/userServices";

const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: userServices.login,
  });
};

export default useLogin;
