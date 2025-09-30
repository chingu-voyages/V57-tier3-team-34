import prisma from "@/config/db.config";
import { PoliticalPost } from "@prisma/client";
import { Fn } from "@prisma/client/runtime/library";

type getPosts = () => Promise<PoliticalPost[] | undefined>;

const model = prisma.politicalPost;

export const getPosts: getPosts = async () => {
  try {
    const posts = await model.findMany({});
    return posts;
  } catch (error) {
    throw error;
  }
};
