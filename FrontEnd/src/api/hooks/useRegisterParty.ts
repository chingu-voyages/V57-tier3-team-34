import { useMutation } from "@tanstack/react-query";
import type { RegisterData, User } from "../types";
import { userService } from "../services/userService";

const useRegisterParty = () => {
	return useMutation<User, Error, RegisterData>({
		mutationFn: userService.registerParty,
	});
};

export default useRegisterParty;
