import prisma from "@/config/db.config";
import Paginate from "@/helpers/Pagination";
import { addCandidate, getUserByEmail, partyData } from "@/model/UserModel";
import { generatePassword, hashPassword } from "@/utils/password";
import { candidateSchema, userSchema } from "@/validations/user.schema";
import { Roles, User } from "@prisma/client";
import { sendCandidateEmail } from "./EmailService";

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
  data: partyData,
  party: User
): Promise<User | undefined> => {
  /**
   * Validate Data
   */

  const validatedData = candidateSchema.safeParse(data);
  if (!validatedData.success) {
    throw validatedData.error;
  }
  /**
   * Check if user exists in db
   */

  const candidate = await getUserByEmail(data.email);
  if (candidate) {
    throw new Error("Email is already registered");
  }

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
  validatedData.data.password = hashedPassword;
  validatedData.data = { partyId: party.id, ...validatedData.data };
  /**
   * Proceed to create the user
   */
  //   const newCandidate = await addCandidate(validatedData.data);
  //   return newCandidate;
};
