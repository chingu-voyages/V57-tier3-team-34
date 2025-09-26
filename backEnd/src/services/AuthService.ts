import jwt from "jsonwebtoken";

import { authData, getUserByEmail, updateUser } from "@/model/UserModel";
import { verifyPassword } from "@/utils/password";
import { loginSchema, userUpdateSchema } from "@/validations/user.schema";

import { OtpPurposes, Roles } from "@prisma/client";
import { cloudinaryUpload } from "@/helpers/Cloudinary";
import { sendVoterEmail } from "./EmailService";
import { getOtpService } from "./VoterService";

const APP_SECRET: string = process.env.APP_SECRET!;

interface jwtData {
  name: string;
  email: string;
  userId: number;
  userType: string;
  partyId: number | null;
}

export const login = async (data: {
  username: string;
  password: string;
}): Promise<{ userType: string; token: string }> => {
  /**
   * Validate data input
   */

  const loginData = loginSchema.safeParse(data);

  if (!loginData.success) {
    throw loginData.error;
  }

  /**
   * check for user
   */
  const user = await getUserByEmail(loginData.data.email);
  if (!user) {
    throw new Error("Invalid Login Credentials");
  }

  const validPassword = await verifyPassword(
    loginData.data.password,
    user.password
  );
  if (!validPassword) {
    throw new Error("Invalid Login Credentials");
  }

  if (user.userType === Roles.VOTER) {
    await getOtpService({ email: user.email, purpose: OtpPurposes.VERIFY_EMAIL });
  }

  const jwtPayload: jwtData = {
    name: user.name,
    email: user.email,
    userId: user.id,
    userType: user.userType,
    partyId: user.partyId,
  };

  const token = jwt.sign(jwtPayload, APP_SECRET, { expiresIn: "1h" });
  return { userType: user.userType, token };
};

export const getUserInfo = async (email: string): Promise<authData> => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("Unable to load user information!");
  }

  return {
    name: user.name,
    email: user.email,
    userId: user.id,
    userType: user.userType,
    partyId: user.partyId,
    userImage: user.userImage,
    userManifesto: user.userManifesto,
    createdAt: user.createdAt,
  };
};

export const updateUserProfile = async (
  req: any,
  email: string
): Promise<authData> => {
  let file = null;

  const validData = userUpdateSchema.safeParse(req.body);

  if (!validData.success) {
    throw validData.error;
  }

  const validatedData = validData.data;

  if (req.file) {
    file = await cloudinaryUpload(req.file.buffer);
  }

  const data = {
    ...validatedData,
    manifesto: validatedData.manifesto ?? undefined,
    userImage: file ? (file as any).secure_url : undefined,
  };

  const updatedUser = await updateUser(data, email);

  return {
    name: updatedUser.name,
    email: updatedUser.email,
    userId: updatedUser.id,
    userType: updatedUser.userType,
    partyId: updatedUser.partyId,
    userImage: updatedUser.userImage,
    userManifesto: updatedUser.userManifesto,
    createdAt: updatedUser.createdAt,
  };
};
