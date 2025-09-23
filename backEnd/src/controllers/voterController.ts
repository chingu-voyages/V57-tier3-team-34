import { Request, Response } from "express";
import prisma from "../DB/db.config";

export const createVoter = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  const emailExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (emailExists)
    return res
      .status(400)
      .json({ message: "Email already exists. Please use another" });

  const newUser = await prisma.user.create({
    data: {
      name: fullName,
      email,
      password,
    },
  });
  return res.status(201).json({ msg: "User created successfully", newUser });
};
