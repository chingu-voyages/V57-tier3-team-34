import { Request, Response } from "express";
import {
  createVoterService,
  getVoterVerificationStatus,
  approveVoterVerification,
  rejectVoterVerification,
  getOtpService,
  verifyOtpService,
} from "@/services/VoterService";
import errorHandler from "@/utils/errorHandler";

export const createVoter = async (req: Request, res: Response) => {
  try {
    const result = await createVoterService(req.body);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};

export const getVerificationStatus = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const status = await getVoterVerificationStatus(userId);

    return res.status(200).json({
      success: true,
      data: status,
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};

export const approveVerification = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const result = await approveVoterVerification(userId);

    return res.status(200).json({
      success: true,
      message: "Voter verification approved successfully",
      data: result,
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};

export const rejectVerification = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const result = await rejectVoterVerification(userId);

    return res.status(200).json({
      success: true,
      message: "Voter verification rejected",
      data: result,
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};

export const getOtp = async (req: Request, res: Response) => {
  try {
    const result = await getOtpService(req.body);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const result = await verifyOtpService(req.body);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    const errors = errorHandler(error);
    return res.status(errors.status).json(errors.body);
  }
};
