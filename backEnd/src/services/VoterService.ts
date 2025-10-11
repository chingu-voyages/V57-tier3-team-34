import {
  addVoter,
  getUserByEmail,
  voterData,
  createVerificationDocument,
} from "@/model/UserModel";
import { requestOtpData, addOtp, otpData } from "@/model/OtpModel";
import { hashPassword } from "@/utils/password";
import {
  requestOtpSchema,
  verifyOtpSchema,
  voterSchema,
} from "@/validations/schema";
import { User, OtpPurposes } from "@prisma/client";
import prisma from "@/config/db.config";
import { generateNumericOtp, hashOtp, verifyOtpHash } from "@/utils/otp";
import { sendVoterEmail } from "./EmailService";

const EXP_MIN = Number(process.env.OTP_EXP_MINUTES ?? 5);
const MAX_ATTEMPTS = Number(process.env.OTP_MAX_ATTEMPTS ?? 5);

export const createVoterService = async (
  data: voterData
): Promise<{ user: User } | undefined> => {
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

  return { user: newVoter };
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
        message: "No verification document found for this user",
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

export const getOtpService = async (data: requestOtpData) => {
  const validatedData = requestOtpSchema.safeParse(data);
  if (!validatedData.success) {
    throw validatedData.error;
  }

  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.otpRequest.updateMany({
    where: {
      userId: user.id,
      purpose: OtpPurposes.VERIFY_EMAIL,
      consumedAt: null,
      expiresAt: { gt: new Date() },
    },
    data: { expiresAt: new Date() }, // expire them immediately
  });

  const code = generateNumericOtp(6);
  const codeHash = await hashOtp(code);
  const expiresAt = new Date(Date.now() + EXP_MIN * 60 * 1000);

  const otp = await addOtp({
    userId: user.id,
    purpose: OtpPurposes.VERIFY_EMAIL,
    codeHash: codeHash,
    expiresAt,
  });

  const sent = await sendVoterEmail({
    email: data.email,
    purpose: OtpPurposes.VERIFY_EMAIL,
    otp: code,
  });

  if (!sent) {
    throw new Error("Failed to send OTP email");
  }

  return otp;
};

export const verifyOtpService = async (data: otpData) => {
  const validatedData = verifyOtpSchema.safeParse(data);
  if (!validatedData.success) {
    throw validatedData.error;
  }

  const otp = await prisma.otpRequest.findFirst({
    where: {
      userId: data.userId,
      purpose: OtpPurposes.VERIFY_EMAIL,
      consumedAt: null,
      expiresAt: { gt: new Date() },
      attempts: { lt: MAX_ATTEMPTS },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!otp) {
    throw new Error("Invalid OTP");
  }

  const ok = await verifyOtpHash(data.codeHash, otp.codeHash);

  await prisma.otpRequest.update({
    where: { id: otp.id },
    data: { attempts: { increment: 1 } },
  });

  if (!ok) {
    if (otp.attempts + 1 >= MAX_ATTEMPTS) {
      await prisma.otpRequest.update({
        where: { id: otp.id },
        data: { expiresAt: new Date() },
      });
    }
    throw new Error("Invalid OTP");
  }

  // consume OTP
  await prisma.otpRequest.update({
    where: { id: otp.id },
    data: { consumedAt: new Date() },
  });

  return otp;
};
