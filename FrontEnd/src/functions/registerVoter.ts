import type { RegisterVoterDataType } from "../types/RegisterVoterDataType";

export const registerVoter = async (
	e: React.FormEvent<HTMLFormElement>,
	formData: RegisterVoterDataType,
) => {
	e.preventDefault();
	console.log("Voter's creds: ", formData);

	const { fullName, email, password } = formData;

	const name = fullName;

	const res = await fetch(
		`${import.meta.env.VITE_API_URL}/user/register-voter`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, password }),
		},
	);

	const json = await res.json();

	if (!res.ok) console.log(json.message);
	else console.log("Request successful: ", json);
	// INCLUDE SUCCESSFUL "ELSE" CONDITION USING TOAST NOTIFICATION
};
