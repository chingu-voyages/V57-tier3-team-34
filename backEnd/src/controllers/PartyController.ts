import {
  createPartyService,
  getPartyElectionResult,
  getPartyStats,
} from "@/services/PartyService";
import type { Request, Response } from "express";

import errorHandler from "@/utils/errorHandler";
import {
  createCandidateService,
  getCandidateService,
  partyResetCandidatePassword,
  updatePartyCandidate,
} from "@/services/CandidateService";
import { success } from "zod";

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

    const candidates = await getCandidateService(page, limit, user.userId);

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

export const createCandidate = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const candidate = await createCandidateService(req, user);

    return res.status(201).json({
      success: true,
      data: {
        candidate,
      },
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};

export const updateCandidate = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const candidate = await updatePartyCandidate(
      parseInt(req.params.userId),
      req.body
    );
    return res.status(201).json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};

export const electionResult = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).user;

    const result = await getPartyElectionResult(userId);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};

export const resetCandidatePassword = async (req: Request, res: Response) => {
  try {
    await partyResetCandidatePassword(parseInt(req.params.userId));

    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).user;
    const stat = await getPartyStats(userId);
    return res.status(201).json({
      success: true,
      data: stat,
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};
