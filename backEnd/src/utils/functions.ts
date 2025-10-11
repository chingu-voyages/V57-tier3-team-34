import { findUserById, getCandidates } from "@/model/UserModel";
import { getInitializedVotes } from "@/model/VoteModel";
import { Roles } from "@prisma/client";

export const confirmVotesMatch = async (
  voteData: { postId: number; candidateId: number }[],
  userId: number
) => {
  const pendingVotes = await getInitializedVotes(userId);
  const transformSubmission = voteData.map((row) => {
    return {
      userId,
      postId: row.postId,
    };
  });

  const initializedData = pendingVotes?.map((item) => item.postId).sort();
  const extractedPostId = transformSubmission.map((item) => item.postId).sort();

  const match =
    JSON.stringify(initializedData) === JSON.stringify(extractedPostId);

  return match;
};

export const confirmAllCandidatesValid = async (
  candidates: { postId: number; candidateId: number }[]
): Promise<boolean> => {
  let previous_candidate = null;
  let candidate = null;
  for (const { candidateId, postId } of candidates) {
    if (previous_candidate !== candidateId) {
      candidate = await findUserById(candidateId);
    }

    if (!candidate) {
      throw new Error(`No candidate with ID ${candidateId}`);
    }

    if (candidate?.userType !== Roles.CANDIDATE) {
      throw new Error(`${candidate?.name} is not a candidate`);
    }

    if (candidate?.politicalPostId !== postId) {
      throw new Error(
        `Candidate ${candidate?.name} did not contest for the post submitted`
      );
    }

    previous_candidate = candidateId;
  }

  return true;
};

export const getPostsAndCandidates = async (partyId?: number): Promise<any> => {
  let candidates = null;
  if (partyId) {
    candidates = await getCandidates(partyId);
  } else {
    candidates = await getCandidates();
  }

  if (!candidates) {
    throw new Error("No voteable candidates found!");
  }

  //Transform the object to the data we need
  let voteables = candidates.reduce((acc, user) => {
    let key = user.userPosition.postName;
    acc[key] = acc[key] || [];
    acc[key].push({
      candidateName: user.name,
      candidateId: user.id,
      candidateImage: user.userImage,
      partyName: user.party.name,
      partyId: user.party.id,
      partyBanner: user.party.userImage,
      electablePost: user.userPosition.postName,
      electablePostId: user.userPosition.id,
    });
    return acc;
  }, {});

  return voteables;
};
