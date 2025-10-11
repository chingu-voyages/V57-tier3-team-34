import { Roles } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const APP_SECRET: string = process.env.APP_SECRET!;
export const isUserAParty = (
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
    if (decoded.userType !== Roles.PARTY) {
      throw new Error("You do not have permission to view this page");
    }

    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
