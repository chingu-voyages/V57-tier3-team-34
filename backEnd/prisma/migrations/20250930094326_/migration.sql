/*
  Warnings:

  - You are about to drop the column `userPosition` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CandidatePost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."CandidatePost" DROP CONSTRAINT "CandidatePost_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CandidatePost" DROP CONSTRAINT "CandidatePost_userId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "userPosition",
ADD COLUMN     "politicalPostId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Vote" ADD COLUMN     "postId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."CandidatePost";

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_politicalPostId_fkey" FOREIGN KEY ("politicalPostId") REFERENCES "public"."PoliticalPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vote" ADD CONSTRAINT "Vote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."PoliticalPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
