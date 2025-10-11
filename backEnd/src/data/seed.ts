import prisma from "../config/db.config";
import posts from "./positions.json";

const seed = async () => {
  console.log("Checking Table...");

  const count = await prisma.politicalPost.count();
  if (count === 0) {
    console.log("Seeding...");
    console.log(posts);
  }

  const data = posts.map((post) => ({
    postName: post.name,
    postDescription: post.description,
  }));

  await prisma.politicalPost.createMany({ data });
};

seed();
