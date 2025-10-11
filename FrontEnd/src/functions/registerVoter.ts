import { useMutation } from "@tanstack/react-query";
import type { RegisterVoterDataType } from "../types/RegisterVoterDataType";
import { toast } from "sonner";

export const useRegisterVoter = () => {
  const mutation = useMutation<
    RegisterVoterDataType,
    Error,
    { name: string; email: string; password: string }
  >({
    mutationFn: async (userData) => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL ||
          "https://v57-tier3-team-34.onrender.com"
        }/user/register-voter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      return data;
    },
    onSuccess: () => {
      toast.success("Registration Successful!", {
        description: "You can now log in with the provided credentials.",
        duration: 7000,
      });
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed", {
        duration: 7000,
      });
    },
  });

  const registerVoter = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: RegisterVoterDataType
  ) => {
    e.preventDefault();
    const { fullName, email, password } = formData;

    mutation.mutate({
      name: fullName,
      email,
      password,
    });
  };

  return {
    registerVoter,
    isLoading: mutation.isPending,
  };
};
