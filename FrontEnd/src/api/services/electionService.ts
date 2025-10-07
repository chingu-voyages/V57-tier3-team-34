/**
 * Election Service
 */

import { api } from "../config/apiClient";
import type { ElectionResponse } from "../../types";

export const electionService = {
	// Get all elections
	async getElections(): Promise<ElectionResponse> {
		const response = await api.get("/vote/initiate-vote");
		return response.data;
	},
};
