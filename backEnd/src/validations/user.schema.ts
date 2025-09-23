import { Roles } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
  name: z.string("Name is required").min(2, "Name is required"),
  email: z.string("Email is required").email("Please provide a valid email"),
  password: z
    .string("Please enter a valid password")
    .min(1, "Please provide a password"),
  userType: z.enum(Roles),
});

export type UserInput = z.infer<typeof userSchema>;
