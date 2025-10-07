/**
 * API Types
 */

// User/Auth Types
export interface User {
  status: boolean;
  data: {
    user: {
      userId: number;
      userType: string;
      name: string;
      email: string;
      partyId: number | null;
      createdAt: string;
    };
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Candidate Types
export interface Candidate {
  id: string;
  name: string;
  party: string;
  position: string;
  description?: string;
  imageUrl?: string;
  electionId: string;
  createdAt: string;
  updatedAt: string;
}

// Vote Types
export interface Vote {
  id: string;
  voterId: string;
  candidateId: string;
  electionId: string;
  createdAt: string;
}

export interface VoteData {
  candidateId: string;
  electionId: string;
}

// Dashboard Types
export interface DashboardStats {
  totalVoters: number;
  totalCandidates: number;
  totalElections: number;
  activeElections: number;
  votingTurnout: number;
}

export interface ElectionResults {
  electionId: string;
  totalVotes: number;
  candidates: Array<{
    candidate: Candidate;
    voteCount: number;
    percentage: number;
  }>;
}

export interface CandidateFormInput {
  name: string;
  email?: string | null;
  post: number;
  image?: FileList | null;
  bio: string;
}

export type CandidateUpdateData = {
  name: string;
  post: number;
  bio: string;
};
