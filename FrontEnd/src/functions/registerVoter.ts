import { userServices, apiUtils } from "../api";
import type { RegisterVoterDataType } from "../types/RegisterVoterDataType";

export const registerVoter = async (
	e: React.FormEvent<HTMLFormElement>,
	formData: RegisterVoterDataType,
) => {
	e.preventDefault();
	console.log("Voter's creds: ", formData);

	try {
		const { fullName, email, password } = formData;

		// Use the API service with proper typing
		const response = await userServices.registerVoter({
			name: fullName,
			email,
			password,
		});

		console.log("Registration successful:", response);
		return response;
	} catch (error) {
		console.error("Registration failed:", apiUtils.formatError(error));
		throw error;
	}
};
