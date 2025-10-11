import argon2 from "argon2";
import crypto from "crypto";

export function generateNumericOtp(digits = 6): string {

  const n = crypto.randomInt(0, 10 ** digits);
  return n.toString().padStart(digits, "0");
}

export async function hashOtp(otp: string): Promise<string> {

  return argon2.hash(otp);
}

export async function verifyOtpHash(otp: string, hash: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, otp);
  } catch {
    return false;
  }
}