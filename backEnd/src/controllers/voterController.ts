import { Request, Response } from "express";
import { 
  createVoterService, 
  getVoterVerificationStatus,
  approveVoterVerification,
  rejectVoterVerification
} from "@/services/VoterService";
import errorHandler from "@/utils/errorHandler";
import { Roles } from "@prisma/client";

export const createVoter = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: name, email, password",
      });
    }

    const voterData = {
      name,
      email,
      password,
      userType: Roles.VOTER
    };

    const result = await createVoterService(voterData);

    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Failed to create voter",
      });
    }

    // Return success response without password
    const { password: _, ...userWithoutPassword } = result.user;
    
    return res.status(201).json({
      success: true,
      message: "Voter registered successfully.",
      data: {
        user: userWithoutPassword
      },
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
