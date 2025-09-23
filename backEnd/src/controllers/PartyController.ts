import { createPartyService } from "@/services/PartyService";
import errorHandler from "@/utils/errorHandler";
import type { Request, Response } from "express";

export const registerParty = async (req: Request, res: Response) => {
  try {
    const newParty = await createPartyService(req.body);

    return res.status(201).json({
      success: true,
      data: newParty,
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};
