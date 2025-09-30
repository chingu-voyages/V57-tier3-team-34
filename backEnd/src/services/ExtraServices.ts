import { getPosts } from "@/model/PoliticalPostsModel";

export const getPoliticalPosts = async () => {
  const posts = await getPosts();

  const allPosts = posts?.map(({ createdAt, updatedAt, ...rest }) => rest);

  return allPosts;
};
