import type { FormData } from "../types/FormDataType";

export const registerVoter = async (
  e: React.FormEvent<HTMLFormElement>,
  formData: FormData,
  setFormData: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      email: string;
      password: string;
      confirmPassword: string;
      verifyDoc: string;
    }>
  >
) => {
  e.preventDefault();
  console.log("Voter's creds: ", formData);

  const { fullName, email, password } = formData;

  const res = await fetch(`${import.meta.env.VITE_API_URL}/voter/create`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullName, email, password }),
  });

  const json = await res.json();

  if (json)
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      verifyDoc: "",
    });
};
