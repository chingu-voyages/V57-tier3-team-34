import { getPosts } from "@/model/PoliticalPostsModel";
import { getVotes } from "@/model/VoteModel";
import { getPostsAndCandidates } from "@/utils/functions";

export const getPoliticalPosts = async () => {
  const posts = await getPosts();

  const allPosts = posts?.map(({ createdAt, updatedAt, ...rest }) => rest);

  return allPosts;
};

export const electionResult = async () => {
  //Get the voteables
  const voteables = await getPostsAndCandidates();
  //Get all votes in the system
  const dataSet = await getVotes();

  //Get the vote count for each political posts
  const counts: any = {};
  dataSet?.forEach(({ postId, candidateId }) => {
    const cid = candidateId!;
    if (!counts[postId]) counts[postId] = {};
    counts[postId][cid] = (counts[postId][cid] || 0) + 1;
  });

  for (const role in voteables) {
    const group = voteables[role];

    //Get the Post ID for each group
    const postId = group[0].electablePostId;

    //Get the highest vote
    const maxVotes = Math.max(
      ...group.map(
        (candidate: any) => counts[postId]?.[candidate.candidateId] || 0
      )
    );

    voteables[role] = group.map((candidate: any) => {
      const votes = counts[postId]?.[candidate.candidateId] || 0;
      return {
        ...candidate,
        votes,
        isWinner: votes === maxVotes,
      };
    });
  }

  return voteables;
};
