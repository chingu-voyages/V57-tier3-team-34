"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectVerification = exports.approveVerification = exports.getVerificationStatus = exports.createVoter = void 0;
const VoterService_1 = require("@/services/VoterService");
const errorHandler_1 = __importDefault(require("@/utils/errorHandler"));
const client_1 = require("@prisma/client");
const createVoter = async (req, res) => {
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
            userType: client_1.Roles.VOTER
        };
        const result = await (0, VoterService_1.createVoterService)(voterData);
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
            message: "Voter registered successfully. Verification document submitted for review.",
            data: {
                user: userWithoutPassword
            },
        });
    }
    catch (error) {
        const errors = (0, errorHandler_1.default)(error);
        return res.status(errors.status).json(errors.body);
    }
};
exports.createVoter = createVoter;
const getVerificationStatus = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        const status = await (0, VoterService_1.getVoterVerificationStatus)(userId);
        return res.status(200).json({
            success: true,
            data: status,
        });
    }
    catch (error) {
        const errors = (0, errorHandler_1.default)(error);
        return res.status(errors.status).json(errors.body);
    }
};
exports.getVerificationStatus = getVerificationStatus;
const approveVerification = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        const result = await (0, VoterService_1.approveVoterVerification)(userId);
        return res.status(200).json({
            success: true,
            message: "Voter verification approved successfully",
            data: result,
        });
    }
    catch (error) {
        const errors = (0, errorHandler_1.default)(error);
        return res.status(errors.status).json(errors.body);
    }
};
exports.approveVerification = approveVerification;
const rejectVerification = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        const result = await (0, VoterService_1.rejectVoterVerification)(userId);
        return res.status(200).json({
            success: true,
            message: "Voter verification rejected",
            data: result,
        });
    }
    catch (error) {
        const errors = (0, errorHandler_1.default)(error);
        return res.status(errors.status).json(errors.body);
    }
};
exports.rejectVerification = rejectVerification;
