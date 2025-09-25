import { addVoter, getUserByEmail, voterData, createVerificationDocument } from "@/model/UserModel";
import { hashPassword } from "@/utils/password";
import { voterSchema } from "@/validations/user.schema";
import { User } from "@prisma/client";
import prisma from "@/config/db.config";

export const createVoterService = async (
  data: voterData
): Promise<{ user: User} | undefined> => {
  /**
   * Validate Data
   */
  const validatedData = voterSchema.safeParse(data);
  if (!validatedData.success) {
    throw validatedData.error;
  }

  /**
   * Check if user exists in db
   */
  const existingUser = await getUserByEmail(data.email);
  if (existingUser) {
    throw new Error("Email is already registered");
  }

  /**
   * Hash password
   */
  const hashedPassword = await hashPassword(validatedData.data.password);
  validatedData.data.password = hashedPassword;

  /**
   * Create the voter
   */
  const newVoter = await addVoter(validatedData.data);
  
  if (!newVoter) {
    throw new Error("Failed to create voter");
  }

  /**
   * Create verification document
   */
  // const verificationDoc = await createVerificationDocument(
  //   newVoter.id,
  //   validatedData.data.verifyDoc
  // );

  return {
    user: newVoter
  };
};

export const getVoterVerificationStatus = async (userId: number) => {
  try {
    const verificationDoc = await prisma.verificationDocument.findFirst({
      where: { userId },
      select: {
        id: true,
        idType: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!verificationDoc) {
      return { 
        status: "NOT_FOUND", 
        message: "No verification document found for this user" 
      };
    }

    return {
      status: verificationDoc.status,
      idType: verificationDoc.idType,
      submittedAt: verificationDoc.createdAt,
      lastUpdated: verificationDoc.updatedAt,
    };
  } catch (error) {
    throw new Error("Failed to fetch verification status");
  }
};

export const approveVoterVerification = async (userId: number) => {
  try {
    // Update verification document status
    const updatedDoc = await prisma.verificationDocument.updateMany({
      where: { userId },
      data: { status: "APPROVED" },
    });

    // Add user to eligible voters if not already present
    const eligibleVoter = await prisma.eligibleVoter.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    return { updatedDoc, eligibleVoter };
  } catch (error) {
    throw new Error("Failed to approve voter verification");
  }
};

export const rejectVoterVerification = async (userId: number) => {
  try {
    const updatedDoc = await prisma.verificationDocument.updateMany({
      where: { userId },
      data: { status: "REJECTED" },
    });

    // Remove from eligible voters if present
    await prisma.eligibleVoter.deleteMany({
      where: { userId },
    });

    return updatedDoc;
  } catch (error) {
    throw new Error("Failed to reject voter verification");
  }
};
