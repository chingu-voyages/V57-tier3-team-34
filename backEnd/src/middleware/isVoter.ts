import { Roles } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "@/config/app.config.json";

const APP_SECRET: string = process.env.APP_SECRET!;
export const isUserAVoter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    res.status(401).json({
      success: false,
      message: "Unauthenticated",
    });
    return;
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, APP_SECRET);
    if (decoded.userType !== Roles.VOTER) {
      throw new Error("You're not an eligible voter");
    }

    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const electionIsActive = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!config.vote_is_live) {
      throw new Error("Election hasn't began!");
    }

    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
