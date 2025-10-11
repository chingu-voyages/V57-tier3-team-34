import prisma from "@/config/db.config";
import { Vote } from "@prisma/client";

const model = prisma.vote;

export const initiateVotes = async (
  data: {
    userId: number;
    postId: number;
  }[]
) => {
  try {
    /**
     * clear all existing entries, its safe because for
     * this method to be called, it means all has gone well
     * and vote has not been cast yet
     *
     */

    await model.deleteMany({
      where: {
        userId: data[0].userId,
      },
    });

    /**
     * Now insert the newly built data.
     */

    await model.createMany({
      data: data,
    });
  } catch (error) {
    throw error;
  }
};

export const getInitializedVotes = async (
  userId: number
): Promise<{ postId: number }[] | null> => {
  try {
    const pendingVotes = await model.findMany({
      where: {
        userId,
      },
      select: {
        userId: true,
        postId: true,
      },
    });

    return pendingVotes;
  } catch (error) {
    throw error;
  }
};

export const confirmedNotVote = async (userId: number): Promise<boolean> => {
  try {
    const vote = await prisma.usersVoted.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!vote) return true;

    return false;
  } catch (error) {
    throw error;
  }
};

export const castVote = async (
  data: {
    userId: number;
    postId: number;
    candidateId: number;
  }[]
): Promise<void> => {
  try {
    /**
     * clear all existing entries, its safe because for
     * this method to be called, it means all has gone well
     * and vote has not been cast yet
     *
     */

    await model.deleteMany({
      where: {
        userId: data[0].userId,
      },
    });

    /**
     * Now insert the newly built data.
     */

    await model.createMany({
      data: data,
    });

    await prisma.usersVoted.create({
      data: {
        userId: data[0].userId,
        hasVoted: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getUserVotes = async (userId: number): Promise<Vote[]> => {
  try {
    const votes = await model.findMany({
      where: {
        userId,
      },
    });

    return votes;
  } catch (error) {
    throw error;
  }
};

export const getVotes = async (): Promise<
  { postId: number; candidateId: number | null }[] | null
> => {
  try {
    return await model.findMany({
      select: {
        postId: true,
        candidateId: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getPartyVotes = async (
  partyId: number
): Promise<{ postId: number; candidateId: number | null }[] | null> => {
  try {
    return await model.findMany({
      where: {
        candidate: {
          partyId,
        },
      },
      select: {
        postId: true,
        candidateId: true,
      },
    });
  } catch (error) {
    throw error;
  }
};
