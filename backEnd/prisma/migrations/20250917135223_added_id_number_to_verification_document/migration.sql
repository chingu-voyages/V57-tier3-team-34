/*
  Warnings:

  - Added the required column `idNumber` to the `VerificationDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."VerificationDocument" ADD COLUMN     "idNumber" TEXT NOT NULL;
