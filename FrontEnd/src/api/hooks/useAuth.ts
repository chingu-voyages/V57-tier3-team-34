/**
 * useAuth Hook
 * Simple authentication state management
 */

import { useState, useEffect } from "react";
import { userService } from "../services/userServices";
import type { User, LoginCredentials, RegisterData } from "../types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    userType: string;
  };
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  // Initialize auth on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token");

      if (token) {
        try {
          const user = await userService.getProfile();
          setState({
            user,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
        } catch (error) {
          // Token might be invalid
          localStorage.removeItem("auth_token");
          setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          });
        }
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    };

    initAuth();
  });
  // Login function
  const login = async (credentials: LoginCredentials) => {
    const response = await userService.login(credentials);
    return response;
  };

  // Register function
  const register = async (userData: RegisterData) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await userService.registerVoter(userData);
      setState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
      return response;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed";
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      await userService.logout();
    } catch (error) {
      console.warn("Logout API call failed:", error);
    } finally {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    }
  };

  // Clear error
  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  return {
    ...state,
    login,
    register,
    logout,
    clearError,
  };
};
