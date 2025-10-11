/**
 * Simple loginUser function using the simplified API
 */

import { userServices } from "../api";
import type { LoginCredentials } from "../types";

// Simple version - replaces your old registerVoter function
export const loginUser = async (
  e: React.FormEvent<HTMLFormElement>,
  formData: LoginCredentials
) => {
  e.preventDefault();

  try {
    const { email, password } = formData;

    // Use the simple API service
    const response = await userServices.login({
      email,
      password,
    });

    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
