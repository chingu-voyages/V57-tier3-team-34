import type { FormData } from "../types/FormDataType";

export const loginVoter = async (
  e: React.FormEvent<HTMLFormElement>,
  formData: FormData,
  setLoginError: React.Dispatch<React.SetStateAction<string>>
) => {
  e.preventDefault();

  setLoginError("");

  const { email, password } = formData;

  if (!email) {
    setLoginError("The email field is required!");
    return;
  }

  if (!password) {
    setLoginError("The password field is required!");
    return;
  }

  const res = await fetch(`${import.meta.env.VITE_API_URL}/voter/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  console.log("This is the response: ", json);
};
