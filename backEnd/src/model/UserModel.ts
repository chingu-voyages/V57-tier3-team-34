import prisma from "@/config/db.config";
import { Roles, User } from "@prisma/client";

export interface partyData {
  name: string;
  email: string;
  password: string;
  userType: Roles;
  partyId?: number | null;
}

export interface authData {
  name: string;
  email: string;
  userId: number;
  userType: string;
  partyId: number | null;
  userManifesto: string | null;
  userImage: string | null;
  createdAt: Date;
}

export interface candidateData {
  name: string;
  email: string;
  password?: any;
  userType: Roles;
  partyId?: number | null;
  bio: string;
  position: number | null;
  userImage?: string | undefined;
}

export interface voterData {
  name: string;
  email: string;
  password: string;
  userType: Roles;
}

type addPartyFn = (data: partyData) => Promise<User | undefined>;

type addCandidateFn = (data: candidateData) => Promise<User | undefined>;

type addVoterFn = (data: voterData) => Promise<User | undefined>;

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
    throw error;
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  data: { name: string; manifesto?: string; userImage?: string },
  email: string
): Promise<User> => {
  try {
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        name: data.name,
        userManifesto: data.manifesto,
        userImage: data.userImage,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const addCandidate: addCandidateFn = async (
  data: candidateData
): Promise<User | undefined> => {
  try {
    const candidate = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        userType: Roles.CANDIDATE,
        partyId: data.partyId,
        userManifesto: data.bio,
        userImage: data.userImage,
        politicalPostId: data.position,
      },
    });
    return candidate;
  } catch (error) {
    throw error;
  }
};

export const addVoter: addVoterFn = async (data: voterData) => {
  try {
    const voter = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        userType: Roles.VOTER,
      },
    });
    return voter;
  } catch (error) {
    throw error;
  }
};

export const createVerificationDocument = async (
  userId: number,
  verifyDoc: string,
  idNumber: string = "TEMP_ID"
) => {
  try {
    const verificationDoc = await prisma.verificationDocument.create({
      data: {
        userId,
        idFile: verifyDoc,
        idNumber,
        status: "PENDING",
      },
    });
    return verificationDoc;
  } catch (error) {
    throw error;
  }
};
