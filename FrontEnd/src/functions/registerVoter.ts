import type { FormData } from "../types/FormDataType";

export const registerVoter = async (
	e: React.FormEvent<HTMLFormElement>,
	formData: FormData,
) => {
	e.preventDefault();
	console.log("Voter's creds: ", formData);

	const { fullName, email, password } = formData;

	const res = await fetch(`${import.meta.env.VITE_API_URL}/user/create`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ fullName, email, password }),
	});

	const json = await res.json();

	console.log("This is the response: ", json);
};
