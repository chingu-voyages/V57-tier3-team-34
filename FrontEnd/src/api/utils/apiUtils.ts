/**
 * API Utilities
 * Helper functions for API operations
 */

import axios from 'axios';

export const apiUtils = {
  /**
   * Format error message from API error
   */
  formatError: (error: any): string => {
    if (error?.response?.data?.message) return error.response.data.message;
    if (error?.message) return error.message;
    if (typeof error === 'string') return error;
    return 'An unexpected error occurred';
  },

  /**
   * Check if error is network related
   */
  isNetworkError: (error: any): boolean => {
    return axios.isAxiosError(error) && !error.response;
  },

  /**
   * Check if error is authentication related
   */
  isAuthError: (error: any): boolean => {
    const status = error?.response?.status;
    return status === 401 || status === 403;
  },

  /**
   * Check if error is server error
   */
  isServerError: (error: any): boolean => {
    const status = error?.response?.status;
    return status >= 500;
  },

  /**
   * Check if error is client error
   */
  isClientError: (error: any): boolean => {
    const status = error?.response?.status;
    return status >= 400 && status < 500;
  },

  /**
   * Create query string from params object
   */
  createQueryString: (params: Record<string, any>): string => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });
    return searchParams.toString();
  },

  /**
   * Handle file upload
   */
  createFormData: (file: File, additionalData?: Record<string, any>): FormData => {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });
    }
    
    return formData;
  },

  /**
   * Retry function with exponential backoff
   */
  retryWithBackoff: async <T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    initialDelay: number = 1000
  ): Promise<T> => {
    let lastError: any;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        
        // Don't retry on client errors (4xx)
        if (apiUtils.isClientError(error)) {
          throw error;
        }
        
        if (attempt < maxRetries) {
          const delay = initialDelay * Math.pow(2, attempt - 1);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  },

  /**
   * Debounce function for API calls
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },
};