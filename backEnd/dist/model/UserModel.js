"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVerificationDocument = exports.addVoter = exports.addCandidate = exports.updateUser = exports.getUserByEmail = exports.addParty = void 0;
const db_config_1 = __importDefault(require("@/config/db.config"));
const client_1 = require("@prisma/client");
const addParty = async (partyData) => {
    try {
        const party = await db_config_1.default.user.create({
            data: {
                name: partyData.name,
                email: partyData.email,
                password: partyData.password,
                userType: client_1.Roles.PARTY,
            },
        });
        return party;
    }
    catch (error) {
        throw error;
    }
};
exports.addParty = addParty;
const getUserByEmail = async (email) => {
    try {
        const user = await db_config_1.default.user.findUnique({
            where: { email: email },
        });
        return user;
    }
    catch (error) {
        throw error;
    }
};
exports.getUserByEmail = getUserByEmail;
const updateUser = async (data, email) => {
    try {
        const user = await db_config_1.default.user.update({
            where: {
                email: email,
            },
            data: {
                name: data.name,
                userManifesto: data.manifesto,
                userImage: data.userImage,
            },
        });
        return user;
    }
    catch (error) {
        throw error;
    }
};
exports.updateUser = updateUser;
const addCandidate = async (data) => {
    try {
        const candidate = await db_config_1.default.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                userType: client_1.Roles.CANDIDATE,
                partyId: data.partyId,
                userManifesto: data.bio,
                userImage: data.userImage,
                userPosition: data.position,
            },
        });
        return candidate;
    }
    catch (error) {
        throw error;
    }
};
exports.addCandidate = addCandidate;
const addVoter = async (data) => {
    try {
        const voter = await db_config_1.default.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                userType: client_1.Roles.VOTER,
            },
        });
        return voter;
    }
    catch (error) {
        throw error;
    }
};
exports.addVoter = addVoter;
const createVerificationDocument = async (userId, verifyDoc, idNumber = "TEMP_ID") => {
    try {
        const verificationDoc = await db_config_1.default.verificationDocument.create({
            data: {
                userId,
                idFile: verifyDoc,
                idNumber,
                status: "PENDING",
            },
        });
        return verificationDoc;
    }
    catch (error) {
        throw error;
    }
};
exports.createVerificationDocument = createVerificationDocument;
