// Election Types
import type { CandidateDataType } from "./CandidateDataType";
export interface ElectionResponse {
	success: boolean;
	data: Election;
	message?: string;
}

export interface Election {
	id: string;
	canVote: boolean;
	posts: Post[];
	totalCandidates: number;
	totalPosts: number;
	voteables: Voteable<CandidateDataType>;
}

export interface Post {
	id: string;
	postName: string;
	postDescription: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface Voteable<T> {
	Governor: T[];
	President: T[];
	Senatorial: T[];
	HouseOfRepresentatives: T[];
	StateHouseOfAssembly: T[];
	LocalGovernmentCouncil: T[];
	TraditionalLeader: T[];
	Other: T[];
}
