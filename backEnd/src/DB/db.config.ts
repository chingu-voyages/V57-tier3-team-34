import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error", "warn"],
});

// TEST THE CONNECTION
prisma
  .$connect()
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection failed:", error));

export default prisma;
