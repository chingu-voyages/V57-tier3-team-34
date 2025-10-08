import type { CandidateDataType } from "./CandidateDataType";

export type ElectionResultsDataType = {
	[position: string]: CandidateDataType[];
	// INDEX SIGNATURE FOR DYNAMIC POSITIONS
};

export type ApiResponse = {
	data: ElectionResultsDataType;
};
