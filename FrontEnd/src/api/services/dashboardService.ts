/**
 * Dashboard Service
 */

import { api } from '../config/apiClient';
import type { DashboardStats } from '../types';

export const dashboardService = {
  // Get dashboard statistics
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  // Get recent activity
  async getRecentActivity(): Promise<any[]> {
    const response = await api.get('/dashboard/recent-activity');
    return response.data;
  },

  // Get voting trends data
  async getVotingTrends(timeframe: 'day' | 'week' | 'month' | 'year' = 'week'): Promise<any[]> {
    const response = await api.get('/dashboard/voting-trends', {
      params: { timeframe }
    });
    return response.data;
  },

  // Get popular candidates
  async getPopularCandidates(limit: number = 10): Promise<any[]> {
    const response = await api.get('/dashboard/popular-candidates', {
      params: { limit }
    });
    return response.data;
  },

  // Get party distribution
  async getPartyDistribution(): Promise<any[]> {
    const response = await api.get('/dashboard/party-distribution');
    return response.data;
  },
};