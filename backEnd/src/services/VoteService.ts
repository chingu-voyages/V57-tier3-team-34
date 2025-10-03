import { getCandidates } from "@/model/UserModel";
import { getPoliticalPosts } from "./ExtraServices";
import {
  castVote,
  confirmedNotVote,
  getInitializedVotes,
  getUserVotes,
  initiateVotes,
} from "@/model/VoteModel";
import { object, string } from "zod";
import {
  confirmAllCandidatesValid,
  confirmVotesMatch,
  getPostsAndCandidates,
} from "@/utils/functions";

export const getVoteables = async (userId: number): Promise<any> => {
  const posts = await getPoliticalPosts();
  const voteables = await getPostsAndCandidates();

  //Get ready to initiate the vote but confirm if user hasn't casted votes yet.
  const userNotVoted = await confirmedNotVote(userId);

  if (!userNotVoted) {
    //We will be returning their vote choices here whenever this is called
    throw new Error(
      "User already casted vote. Please check your dashboard for results and your vote choice"
    );
  }

  //Initialize their vote streak in the db
  const possibleVotes = Object.entries(voteables) as [
    string,
    {
      electablePostId: number;
    }[],
  ][];

  const dataToInsert: any = [];

  possibleVotes.forEach(([position, values]) => {
    dataToInsert.push({
      userId,
      postId: values[0].electablePostId,
    });
  });

  if (dataToInsert.length <= 0) {
    throw new Error("No candidates found in the system");
  }

  await initiateVotes(dataToInsert);

  return { canVote: userNotVoted, posts, voteables };
};

export const castVoteables = async (
  userId: number,
  data: { post_id: number; candidate_id: number }[]
): Promise<any> => {
  /**
   * Let's check if they have not voed
   */
  const userNotVoted = await confirmedNotVote(userId);

  if (!userNotVoted) {
    //We will be returning their vote choices here whenever this is called
    throw new Error(
      "User already casted vote. Please check your dashboard for results and your vote choice"
    );
  }

  /**
   * We have to first validate if their casted vote matches the stored expected casted vote
   * Let's extract the post ids then compare it with the submitted post ids
   */

  const match = await confirmVotesMatch(data, userId);

  if (!match) {
    throw new Error("Invalid Vote Data");
  }

  //Ensure that all selected candidates are valid
  await confirmAllCandidatesValid(data);

  const voteData = data.map((item) => {
    return {
      userId,
      candidateId: item.candidate_id,
      postId: item.post_id,
    };
  });

  await castVote(voteData);
  return true;
};

export const getMyvotes = async (userId: number) => {
  const voteables = await getPostsAndCandidates();
  const myVotes = await getUserVotes(userId);

  const refinedVotes = myVotes.map((vote) => {
    return { post_id: vote.postId, candidate_id: vote.candidateId };
  });

  const stringedVotes = new Set(
    refinedVotes.map((vote) => `${vote.post_id}-${vote.candidate_id}`)
  );

  for (const role in voteables) {
    voteables[role] = voteables[role].map((candidate: any) => {
      const key = `${candidate.electablePostId}-${candidate.candidateId}`;
      return {
        ...candidate,
        myChoice: stringedVotes.has(key),
      };
    });
  }

  return voteables;
};
