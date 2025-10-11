import prisma from "@/config/db.config";
import { PoliticalPost } from "@prisma/client";
import { Fn } from "@prisma/client/runtime/library";

type getPosts = () => Promise<PoliticalPost[] | undefined>;
type getPost = (id: number) => Promise<PoliticalPost | null>;

const model = prisma.politicalPost;

export const getPosts: getPosts = async () => {
  try {
    const posts = await model.findMany({});
    return posts;
  } catch (error) {
    throw error;
  }
};

export const getPost: getPost = async (
  postId
): Promise<PoliticalPost | null> => {
  try {
    const post = await model.findUnique({
      where: {
        id: postId,
      },
    });

    return post;
  } catch (error) {
    throw error;
  }
};
