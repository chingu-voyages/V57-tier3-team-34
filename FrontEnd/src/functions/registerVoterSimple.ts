/**
 * Simple API usage examples
 */

import { userService, electionService, apiUtils, useAuth } from '../api';
import type { RegisterVoterDataType } from '../types/RegisterVoterDataType';

// Simple voter registration
export const registerVoter = async (
  e: React.FormEvent<HTMLFormElement>,
  formData: RegisterVoterDataType,
) => {
  e.preventDefault();
  
  try {
    const { fullName, email, password } = formData;

    // Use the API service with proper typing
    const response = await userService.registerVoter({
      name: fullName,
      email,
      password,
    });

    console.log('Registration successful:', response);
    return response;
    
  } catch (error) {
    console.error('Registration failed:', apiUtils.formatError(error));
    throw error;
  }
};

// Example: Cast a vote using the initiate-vote endpoint
export const initiateVote = async (
  candidateId: string,
  electionId: string
) => {
  try {
    const response = await electionService.initiateVote({
      candidateId,
      electionId
    });

    console.log('Vote initiated successfully:', response);
    return response;
    
  } catch (error) {
    if (apiUtils.isAuthError(error)) {
      console.error('Authentication required to vote');
    } else {
      console.error('Vote failed:', apiUtils.formatError(error));
    }
    throw error;
  }
};

// Example: Using the useAuth hook in a component
export const useVotingComponent = () => {
  const { user, isAuthenticated, login, logout, isLoading, error } = useAuth();
  
  const handleLogin = async (email: string, password: string) => {
    try {
      await login({ email, password });
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  const handleVote = async (candidateId: string, electionId: string) => {
    if (!isAuthenticated) {
      console.error('Must be logged in to vote');
      return;
    }
    
    try {
      await initiateVote(candidateId, electionId);
    } catch (error) {
      console.error('Vote failed:', error);
    }
  };
  
  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    handleLogin,
    handleVote,
    logout,
  };
};
