import prisma from "@/config/db.config";
import Paginate from "@/helpers/Pagination";

import { addCandidate, getUserByEmail, partyData } from "@/model/UserModel";
import { generatePassword, hashPassword } from "@/utils/password";
import { candidateSchema, userSchema } from "@/validations/user.schema";
import { Roles, User } from "@prisma/client";
import { sendCandidateEmail } from "./EmailService";
import { cloudinaryUpload } from "@/helpers/Cloudinary";
import { getPost } from "@/model/PoliticalPostsModel";

export const getCandidateService = async (
  page: number,
  limit: number,
  partyId: number
) => {
  const candidate = await Paginate({
    page: page,
    limit: limit,
    model: prisma.user,
    conditions: { userType: Roles.CANDIDATE, partyId: partyId },
  });

  return candidate;
};

export const createCandidateService = async (
  req: any,
  party: any
): Promise<User | undefined> => {
  /**
   * Validate Data
   */

  const validatedData = candidateSchema.safeParse(req.body);
  if (!validatedData.success) {
    throw validatedData.error;
  }
  /**
   * Check if user exists in db
   */

  const candidate = await getUserByEmail(req.body.email);
  if (candidate) {
    throw new Error("Email is already registered");
  }

  const post = await getPost(req.body.position);
  if (!post) {
    throw new Error("Please choose a valid political post");
  }

  if (!req.file) {
    throw new Error("Please upload candidate image");
  }

  const uploadResult = await cloudinaryUpload(req.file.buffer);
  const password = generatePassword(8);

  /**
   * send some email or build the email to send with the password
   */
  await sendCandidateEmail({
    email: validatedData.data.email,
    password: password,
    party: party.name,
  });

  const hashedPassword = await hashPassword(password);

  validatedData.data = {
    partyId: party.userId,
    password: hashedPassword,
    userImage: (uploadResult as any).secure_url,
    ...validatedData.data,
  };
  /**
   * Proceed to create the user
   */

  const newCandidate = await addCandidate(validatedData.data);
  return newCandidate;
};
