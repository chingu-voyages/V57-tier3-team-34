import { getCandidates } from "@/model/UserModel";
import { createPartyService } from "@/services/PartyService";
import type { Request, Response } from "express";

import errorHandler from "@/utils/errorHandler";
import { getCandidateService } from "@/services/CandidateService";

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

export const getPartyCandidates = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const candidates = await getCandidateService(page, limit);

    return res.status(201).json({
      success: true,
      data: {
        candidates,
      },
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};
