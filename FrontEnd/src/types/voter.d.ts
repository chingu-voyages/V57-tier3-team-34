// Election Types
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
	voteables: Voteable[];
}

export interface Post {
	id: string;
	postName: string;
	postDescription: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface Voteable {
	Governor: Candidate[];
	President: Candidate[];
}
