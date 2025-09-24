-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "userFirstTime" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "userImage" TEXT,
ADD COLUMN     "userManifesto" TEXT,
ADD COLUMN     "userPosition" TEXT;
