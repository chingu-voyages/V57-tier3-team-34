/**
 * Election Service
 */

import { api } from "../config/apiClient";
import type { ElectionResponse } from "../../types";
import type { Vote } from "../types";
import type { CandidateDataPostRequest } from "../../types/CandidateDataType";

export const electionService = {
	// Get all elections
	async getElections(): Promise<ElectionResponse> {
		const response = await api.get("/vote/initiate-vote");
		return response.data;
	},

	async initiateVote(voteData: CandidateDataPostRequest[]): Promise<Vote> {
		const response = await api.post("/vote/cast", voteData);
		return response.data;
	},
};
