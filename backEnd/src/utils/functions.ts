import { findUserById } from "@/model/UserModel";
import { getInitializedVotes } from "@/model/VoteModel";
import { Roles } from "@prisma/client";

export const confirmVotesMatch = async (
  voteData: { post_id: number; candidate_id: number }[],
  userId: number
) => {
  const pendingVotes = await getInitializedVotes(userId);
  const transformSubmission = voteData.map((row) => {
    return {
      userId,
      post_id: row.post_id,
    };
  });

  const initializedData = pendingVotes?.map((item) => item.postId).sort();
  const extractedPostId = transformSubmission
    .map((item) => item.post_id)
    .sort();

  const match =
    JSON.stringify(initializedData) === JSON.stringify(extractedPostId);

  return match;
};

export const confirmAllCandidatesValid = async (
  candidates: { post_id: number; candidate_id: number }[]
): Promise<boolean> => {
  let previous_candidate = null;
  let candidate = null;
  for (const { candidate_id, post_id } of candidates) {
    if (previous_candidate !== candidate_id) {
      candidate = await findUserById(candidate_id);
    }

    if (!candidate) {
      throw new Error(`No candidate with ID ${candidate_id}`);
    }

    if (candidate?.userType !== Roles.CANDIDATE) {
      throw new Error(`${candidate?.name} is not a candidate`);
    }

    if (candidate?.politicalPostId !== post_id) {
      throw new Error(
        `Candidate ${candidate?.name} did not contest for the post submitted`
      );
    }

    previous_candidate = candidate_id;
  }

  return true;
};
