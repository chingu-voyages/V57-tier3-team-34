import prisma from "@/config/db.config";
import Paginate from "@/helpers/Pagination";

import {
  addCandidate,
  checkCandidatePost,
  getUserByEmail,
  partyData,
} from "@/model/UserModel";
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

  let { data } = validatedData;

  const candidate = await getUserByEmail(data.email);
  if (candidate) {
    throw new Error("Email is already registered");
  }

  const post = await getPost(data.position);
  if (!post) {
    throw new Error("Please choose a valid political post");
  }

  /**
   * Check if a user has already been assigned to that post by the same party
   */

  const checkPostCandidate = await checkCandidatePost(
    data.position,
    party.userId
  );

  //If we found a candidate
  if (checkPostCandidate) {
    throw new Error(
      "Two candidates cannot contest for the same post within same party"
    );
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
    email: data.email,
    password: password,
    party: party.name,
  });

  const hashedPassword = await hashPassword(password);

  data = {
    partyId: party.userId,
    password: hashedPassword,
    userImage: (uploadResult as any).secure_url,
    ...data,
  };
  /**
   * Proceed to create the user
   */

  const newCandidate = await addCandidate(data);
  return newCandidate;
};
