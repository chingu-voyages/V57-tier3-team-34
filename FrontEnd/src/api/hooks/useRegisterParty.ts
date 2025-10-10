import { useMutation } from "@tanstack/react-query";
import type { RegisterData, User } from "../types";
import { userServices } from "../services/userServices";

const useRegisterParty = () => {
  return useMutation<User, Error, RegisterData>({
    mutationFn: userServices.registerParty,
  });
};

export default useRegisterParty;
