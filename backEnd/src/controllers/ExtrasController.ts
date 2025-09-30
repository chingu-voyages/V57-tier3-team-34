import { getPoliticalPosts } from "@/services/ExtraServices";
import errorHandler from "@/utils/errorHandler";
import type { Request, Response } from "express";

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
