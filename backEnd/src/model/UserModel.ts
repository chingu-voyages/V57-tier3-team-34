import prisma from "@/config/db.config";
import { Prisma, Roles, User } from "@prisma/client";

export interface partyData {
  name: string;
  email: string;
  password: string;
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
const model = prisma.user;

export const addParty: addPartyFn = async (partyData) => {
  try {
    const party = await model.create({
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
    const user = await model.findUnique({
      where: { email: email },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const checkCandidatePost = async (
  post: number,
  party: number,
  myId?: number | undefined
): Promise<User | null> => {
  try {
    const whereClause: Prisma.UserWhereInput = {
      politicalPostId: post,
      partyId: party,
      ...(myId !== undefined ? { id: { not: myId } } : {}),
    };

    const candidate = await model.findFirst({
      where: whereClause,
    });

    return candidate;
  } catch (error) {
    throw error;
  }
};

export const addCandidate: addCandidateFn = async (
  data: candidateData
): Promise<User | undefined> => {
  try {
    const candidate = await model.create({
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

export const updateUser = async (
  data: { name: string; manifesto?: string; userImage?: string },
  email: string
): Promise<User> => {
  try {
    const user = await model.update({
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

export const updateUserPassword = async (
  candidateId: number,
  newPassword: string
): Promise<boolean> => {
  try {
    await model.update({
      where: {
        id: candidateId,
      },
      data: {
        password: newPassword,
      },
    });

    return true;
  } catch (error) {
    throw error;
  }
};

export const updateCandidate = async (
  userId: number,
  candidateData: {
    name: string;
    post: number;
    bio: string;
  }
): Promise<User> => {
  try {
    const candidate = await model.update({
      where: {
        id: userId,
      },
      data: {
        name: candidateData.name,
        userManifesto: candidateData.bio,
        politicalPostId: candidateData.post,
      },
    });

    return candidate;
  } catch (error) {
    throw error;
  }
};

export const addVoter: addVoterFn = async (data: voterData) => {
  try {
    const voter = await model.create({
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

export const getCandidates = async (
  partyId?: number
): Promise<any[] | null> => {
  try {
    const data = await model.findMany({
      where: {
        userType: Roles.CANDIDATE,
        ...(partyId && { partyId }),
      },
      select: {
        id: true,
        name: true,
        userImage: true,
        party: {
          select: {
            id: true,
            name: true,
            userImage: true,
          },
        },
        userPosition: {
          select: {
            id: true,
            postName: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const findUserById = async (id: number): Promise<User | null> => {
  try {
    const user = await model.findUnique({
      where: { id },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const getPartyCandidates = async (
  id: number
): Promise<User[] | null> => {
  try {
    const candidates = await model.findMany({
      where: {
        partyId: id,
      },
    });

    return candidates;
  } catch (error) {
    throw error;
  }
};

export const getPartyDashboardStat = async (partyId: number): Promise<any> => {
  try {
    const [myCandidates, allContestants, allVoters] = await Promise.all([
      model.count({ where: { userType: Roles.CANDIDATE, partyId } }),
      model.count({ where: { userType: Roles.CANDIDATE } }),
      model.count({ where: { userType: Roles.VOTER } }),
    ]);

    return { myCandidates, allContestants, allVoters };
  } catch (error) {
    throw error;
  }
};
