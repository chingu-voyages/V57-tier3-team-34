/**
 * User Service
 */

import { api, setAuthToken, clearAuthToken } from '../config/apiClient';
import type { RegisterData, LoginCredentials, AuthResponse, User } from '../types';

export const userService = {
  // Register a new voter
  async registerVoter(userData: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/user/register-voter', userData);
    
    if (response.data.token) {
      setAuthToken(response.data.token);
    }
    
    return response.data;
  },

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/user/login', credentials);
    
    if (response.data.token) {
      setAuthToken(response.data.token);
    }
    
    return response.data;
  },

  // Logout user
  async logout(): Promise<void> {
    try {
      await api.post('/user/logout');
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      clearAuthToken();
    }
  },

  // Get current user profile
  async getProfile(): Promise<User> {
    const response = await api.get('/user/profile');
    return response.data;
  },

  // Update user profile
  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await api.put('/user/profile', userData);
    return response.data;
  },
};
