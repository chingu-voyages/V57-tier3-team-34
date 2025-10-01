import { electionResult, getPoliticalPosts } from "@/services/ExtraServices";
import errorHandler from "@/utils/errorHandler";
import type { Request, Response } from "express";
import { success } from "zod";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getPoliticalPosts();

    return res.status(201).json({
      success: true,
      data: {
        posts,
      },
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};

export const getElectionResult = async (req: Request, res: Response) => {
  try {
    const result = await electionResult();

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};
