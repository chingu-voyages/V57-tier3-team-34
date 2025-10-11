/**
 * Simple API Client with Axios
 */

import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/blah`
    : "https://v57-tier3-team-34.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
    }
    return Promise.reject(error);
  }
);

export { api };

// Helper functions
export const setAuthData = (data: { token: string; userType: string }) => {
  localStorage.setItem("auth_token", data.token);
  localStorage.setItem("user_type", data.userType);
};

export const clearAuthToken = () => {
  localStorage.removeItem("auth_token");
};
