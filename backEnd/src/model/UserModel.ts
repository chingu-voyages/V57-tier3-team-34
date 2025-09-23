import prisma from "@/config/db.config";
import errorHandler from "@/utils/errorHandler";
import { Prisma, Roles, User } from "@prisma/client";

export interface partyData {
  name: string;
  email: string;
  password: string;
  userType: Roles;
}

type addPartyFn = (data: partyData) => Promise<User | undefined>;

export const addParty: addPartyFn = async (partyData) => {
  try {
    const party = await prisma.user.create({
      data: {
        name: partyData.name,
        email: partyData.email,
        password: partyData.password,
        userType: Roles.PARTY,
      },
    });
    return party;
  } catch (error) {
    errorHandler(error);
  }
};
