import { castVoteables, getVoteables } from "@/services/VoteService";
import errorHandler from "@/utils/errorHandler";
import { Request, Response } from "express";

export const initiateVote = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).user;

    const voteAbles = await getVoteables(userId);
    return res.status(201).json({
      success: true,
      data: voteAbles,
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};

export const castVote = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).user;

    await castVoteables(userId, req.body);
    return res.status(201).json({
      success: true,
      data: [],
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};
