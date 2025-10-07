import { useMutation } from "@tanstack/react-query";
import type { AuthResponse } from "./useAuth";
import type { LoginCredentials } from "../types";
import { userService } from "../services/userService";

const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: userService.login,
  });
};

export default useLogin;
