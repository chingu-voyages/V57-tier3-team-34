"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.userProfile = exports.authenticateUser = void 0;
const AuthService_1 = require("@/services/AuthService");
const errorHandler_1 = __importDefault(require("@/utils/errorHandler"));
const authenticateUser = async (req, res) => {
    try {
        const user = await (0, AuthService_1.login)(req.body);
        return res.status(201).json({
            success: true,
            data: {
                token: user.token,
                userType: user.userType,
            },
        });
    }
    catch (error) {
        const errorData = (0, errorHandler_1.default)(error);
        return res.status(errorData.status).json(errorData.body);
    }
};
exports.authenticateUser = authenticateUser;
const userProfile = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("User not found!");
        }
        const currentUser = await (0, AuthService_1.getUserInfo)(user.email);
        res.status(201).json({
            success: true,
            data: { user: currentUser },
        });
    }
    catch (error) {
        const errorData = (0, errorHandler_1.default)(error);
        return res.status(errorData.status).json(errorData.body);
    }
};
exports.userProfile = userProfile;
const updateProfile = async (req, res) => {
    try {
        const currentUser = req.user;
        const updateData = await (0, AuthService_1.updateUserProfile)(req, currentUser.email);
        if (!updateData) {
            throw new Error("Failed to update user account");
        }
        const updatedInfo = await (0, AuthService_1.getUserInfo)(currentUser.email);
        return res.status(201).json({
            success: true,
            data: {
                user: updatedInfo,
            },
        });
    }
    catch (error) {
        const errorData = (0, errorHandler_1.default)(error);
        return res.status(errorData.status).json(errorData.body);
    }
};
exports.updateProfile = updateProfile;
