"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserByEmail = exports.addParty = void 0;
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
            },
        });
        return user;
    }
    catch (error) {
        throw error;
    }
};
exports.updateUser = updateUser;
