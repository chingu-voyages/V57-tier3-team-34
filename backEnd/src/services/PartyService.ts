import {
  addParty,
  findUserById,
  getPartyDashboardStat,
  getUserByEmail,
  partyData,
} from "@/model/UserModel";
import { getPartyVotes } from "@/model/VoteModel";
import { getPostsAndCandidates } from "@/utils/functions";
import { hashPassword } from "@/utils/password";
import { userSchema } from "@/validations/schema";
import { User } from "@prisma/client";

export const createPartyService = async (
  data: partyData
): Promise<User | undefined> => {
  /**
   * Validate Data
   */

  const validatedData = userSchema.safeParse(data);
  if (!validatedData.success) {
    throw validatedData.error;
  }
  /**
   * Check if user exists in db
   */

  const party = await getUserByEmail(data.email);
  if (party) {
    throw new Error("Email is already registered");
  }

  const hashedPassword = await hashPassword(validatedData.data.password);
  validatedData.data.password = hashedPassword;
  /**
   * Proceed to create the user
   */
  const newParty = await addParty(validatedData.data);
  return newParty;
};

export const getPartyElectionResult = async (partyId: number): Promise<any> => {
  const voteables = await getPostsAndCandidates(partyId);
  const voteDataset = await getPartyVotes(partyId);

  //Get the vote count for each political posts
  const counts: any = {};

  voteDataset?.forEach(({ postId, candidateId }) => {
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
      };
    });
  }

  return voteables;
};

export const getPartyStats = async (partyId: number) => {
  const statData = await getPartyDashboardStat(partyId);
  return statData;
};
