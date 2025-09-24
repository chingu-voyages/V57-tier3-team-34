import { Roles } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
  name: z.string("Name is required").min(2, "Name is required"),
  email: z.email("Please provide a valid email"),
  password: z
    .string("Please enter a valid password")
    .min(1, "Please provide a password"),
  userType: z.enum(Roles),
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
  userType: z.enum(Roles),
  password: z.string().optional(),
  partyId: z.number().optional(),
  bio: z.string("Bio is required."),
  userImage: z.string().optional(),
  position: z.string("Please enter the position candidate is "),
});
