import prisma from "@/config/db.config";
import Paginate from "@/helpers/Pagination";

import {
  addCandidate,
  checkCandidatePost,
  findUserById,
  getUserByEmail,
  partyData,
  updateCandidate,
  updateUserPassword,
} from "@/model/UserModel";
import { generatePassword, hashPassword } from "@/utils/password";
import {
  candidateSchema,
  updateCandidateSchema,
  userSchema,
} from "@/validations/schema";
import { Roles, User } from "@prisma/client";
import { sendCandidateEmail, sendEmail } from "./EmailService";
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
    include: { userPosition: true },
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

export const updatePartyCandidate = async (
  candidateId: number,
  candidateData: {
    name: string;
    bio: string;
    position: number;
  }
): Promise<any> => {
  const candidate = await findUserById(candidateId);
  if (!candidate) {
    throw new Error("Candidate does not exists!");
  }

  const validatedData = updateCandidateSchema.safeParse(candidateData);

  if (!validatedData.success) {
    throw validatedData.error;
  }

  let { data } = validatedData;

  const post = await getPost(data.position);
  if (!post) {
    throw new Error("Please choose a valid political post");
  }

  /**
   * Check if a user has already been assigned to that post by the same party
   */

  const checkPostCandidate = await checkCandidatePost(
    data.position,
    candidate.partyId!
  );

  //If we found a candidate
  if (checkPostCandidate) {
    throw new Error(
      "Two candidates cannot contest for the same post within same party"
    );
  }

  const updatedCandidateData = await updateCandidate(
    candidateId,
    candidateData
  );

  return updatedCandidateData;
};

export const partyResetCandidatePassword = async (candidateId: number) => {
  const candidate = await findUserById(candidateId);
  if (!candidate) {
    throw new Error("Candidate does not exists!");
  }

  const password = generatePassword(8);

  /**
   * send some email or build the email to send with the password
   */
  await sendEmail({
    email: candidate.email,
    subject: "Your Password has been Reset",
    message: `Hello ${candidate.name}, <br /><br />
    Your portal's password was just reset by your party. 
    <br />Your new password is <b>${password}</b>`,
  });

  const hashedPassword = await hashPassword(password);
  await updateUserPassword(candidate.id, hashedPassword);
  return true;
};
