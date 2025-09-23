import { addParty, getUserByEmail, partyData } from "@/model/UserModel";
import { hashPassword } from "@/utils/password";
import { userSchema } from "@/validations/user.schema";
import { User } from "@prisma/client";

export const createPartyService = async (
  data: partyData
): Promise<User | undefined> => {
  /**
   * Validate Data
   */

  const validatedData = userSchema.safeParse(data);
  if (!validatedData.success) {
    throw validatedData.error;
  }
  /**
   * Check if user exists in db
   */

  const party = await getUserByEmail(data.email);
  if (party) {
    throw new Error("Email is already registered");
  }

  const hashedPassword = await hashPassword(validatedData.data.password);
  validatedData.data.password = hashedPassword;
  /**
   * Proceed to create the user
   */
  const newParty = await addParty(validatedData.data);
  return newParty;
};
