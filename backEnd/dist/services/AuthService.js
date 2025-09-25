"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserInfo = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = require("@/model/UserModel");
const password_1 = require("@/utils/password");
const user_schema_1 = require("@/validations/user.schema");
const Cloudinary_1 = require("@/helpers/Cloudinary");
const APP_SECRET = process.env.APP_SECRET;
const login = async (data) => {
    /**
     * Validate data input
     */
    const loginData = user_schema_1.loginSchema.safeParse(data);
    if (!loginData.success) {
        throw loginData.error;
    }
    /**
     * check for user
     */
    const user = await (0, UserModel_1.getUserByEmail)(loginData.data.email);
    if (!user) {
        throw new Error("Invalid Login Credentials");
    }
    const validPassword = await (0, password_1.verifyPassword)(loginData.data.password, user.password);
    if (!validPassword) {
        throw new Error("Invalid Login Credentials");
    }
    const jwtPayload = {
        name: user.name,
        email: user.email,
        userId: user.id,
        userType: user.userType,
        partyId: user.partyId,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, APP_SECRET, { expiresIn: "1h" });
    return { userType: user.userType, token };
};
exports.login = login;
const getUserInfo = async (email) => {
    const user = await (0, UserModel_1.getUserByEmail)(email);
    if (!user) {
        throw new Error("Unable to load user information!");
    }
    return {
        name: user.name,
        email: user.email,
        userId: user.id,
        userType: user.userType,
        partyId: user.partyId,
        userImage: user.userImage,
        userManifesto: user.userManifesto,
        createdAt: user.createdAt,
    };
};
exports.getUserInfo = getUserInfo;
const updateUserProfile = async (req, email) => {
    let file = null;
    const validData = user_schema_1.userUpdateSchema.safeParse(req.body);
    if (!validData.success) {
        throw validData.error;
    }
    const validatedData = validData.data;
    if (req.file) {
        file = await (0, Cloudinary_1.cloudinaryUpload)(req.file.buffer);
    }
    const data = {
        ...validatedData,
        manifesto: validatedData.manifesto ?? undefined,
        userImage: file ? file.secure_url : undefined,
    };
    const updatedUser = await (0, UserModel_1.updateUser)(data, email);
    return {
        name: updatedUser.name,
        email: updatedUser.email,
        userId: updatedUser.id,
        userType: updatedUser.userType,
        partyId: updatedUser.partyId,
        userImage: updatedUser.userImage,
        userManifesto: updatedUser.userManifesto,
        createdAt: updatedUser.createdAt,
    };
};
exports.updateUserProfile = updateUserProfile;
