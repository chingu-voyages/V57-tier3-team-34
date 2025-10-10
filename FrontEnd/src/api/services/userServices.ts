/**
 * User Service
 */

import { api, setAuthData, clearAuthToken } from "../config/apiClient";
import type { RegisterData, LoginCredentials, User } from "../types";
import type { AuthResponse } from "../hooks/useAuth";

export const userServices = {
  // Register a new voter
  async registerVoter(userData: RegisterData): Promise<AuthResponse> {
    const response = await api.post("/user/register-voter", userData);

    if (response.data.token) {
      setAuthData(response.data);
    }

    return response.data;
  },

  async registerParty(data: RegisterData): Promise<User> {
    const response = await api.post("/user/register-party", data);
    return response.data;
  },

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/user/login", credentials);

    setAuthData(data.data);
    return data;
  },

  // Logout user
  async logout(): Promise<void> {
    try {
      await api.post("/user/logout");
    } catch (error) {
      console.warn("Logout API call failed:", error);
    } finally {
      clearAuthToken();
    }
  },

  // Get current user profile
  async getProfile(): Promise<User> {
    const response = await api.get("/user/profile");
    return response.data;
  },

  // Update user profile
  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await api.put("/user/profile", userData);
    return response.data;
  },
};
