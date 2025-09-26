import prisma from "@/config/db.config";
import { OtpRequest, OtpPurposes } from "@prisma/client";

export interface otpData {
  userId: number;
  purpose?: OtpPurposes;
  codeHash: string;
  expiresAt: Date;
}

export interface requestOtpData {
  email: string;
  purpose: OtpPurposes;
}

type addOtpFn = (data: otpData) => Promise<OtpRequest | undefined>;

export const addOtp: addOtpFn = async (data: otpData) => {
  try {
    const otp = await prisma.otpRequest.create({
      data: {
        userId: data.userId,
        purpose: OtpPurposes.VERIFY_EMAIL,
        codeHash: data.codeHash,
        expiresAt: data.expiresAt,
        consumedAt: null,
        attempts: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return otp;
  } catch (error) {
    throw error;
  }
};
