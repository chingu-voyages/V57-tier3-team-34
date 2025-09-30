import { Roles, OtpPurposes } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
  name: z.string("Name is required").min(2, "Name is required"),
  email: z.email("Please provide a valid email"),
  password: z
    .string("Please enter a valid password")
    .min(1, "Please provide a password"),
});

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string("Password is required"),
});

export const userUpdateSchema = z.object({
  name: z.string("Name is required"),
  manifesto: z.string().nullable().optional(),
  userImage: z.string().nullable().optional(),
});

export const candidateSchema = z.object({
  name: z.string("Name is required").min(2, "Name is required"),
  email: z.email("Please provide a valid email"),
  password: z.string().optional(),
  partyId: z.number().optional(),
  bio: z.string("Bio is required."),
  userImage: z.string().optional(),
  position: z.coerce.number("Provide a valid candidate position"),
});

export const voterSchema = z.object({
  name: z.string("Full name is required").min(2, "Full name is required"),
  email: z.email("Please provide a valid email"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters"),
  userType: z.enum(Roles).optional().default("VOTER"),
});

export const requestOtpSchema = z.object({
  email: z.email(),
  purpose: z.enum(OtpPurposes),
});

export const verifyOtpSchema = z.object({
  email: z.email(),
  codeHash: z.string().min(6, "OTP must be 6 digits"),
  purpose: z.enum(OtpPurposes),
});
