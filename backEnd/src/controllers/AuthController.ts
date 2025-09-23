import { login } from "@/services/AuthService";
import errorHandler from "@/utils/errorHandler";
import type { Request, Response } from "express";
import { success } from "zod";

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const user = await login(req.body);
    return res.status(201).json({
      success: true,
      data: {
        token: user.token,
        userType: user.userType,
      },
    });
  } catch (error) {
    const errorData = errorHandler(error);
    return res.status(errorData.status).json(errorData.body);
  }
};

export const userProfile = async (req: Request, res: Response) => {};
