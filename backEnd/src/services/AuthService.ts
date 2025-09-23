import jwt from "jsonwebtoken";

import { getUserByEmail } from "@/model/UserModel";
import { verifyPassword } from "@/utils/password";
import { loginSchema } from "@/validations/user.schema";

import { User } from "@prisma/client";

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
