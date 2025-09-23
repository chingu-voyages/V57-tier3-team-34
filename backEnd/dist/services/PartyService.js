"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPartyService = void 0;
const UserModel_1 = require("@/model/UserModel");
const password_1 = require("@/utils/password");
const user_schema_1 = require("@/validations/user.schema");
const createPartyService = async (data) => {
    /**
     * Validate Data
     */
    const validatedData = user_schema_1.userSchema.safeParse(data);
    if (!validatedData.success) {
        throw validatedData.error;
    }
    /**
     * Check if user exists in db
     */
    const party = await (0, UserModel_1.getUserByEmail)(data.email);
    if (party) {
        throw new Error("Email is already registered");
    }
    const hashedPassword = await (0, password_1.hashPassword)(validatedData.data.password);
    validatedData.data.password = hashedPassword;
    /**
     * Proceed to create the user
     */
    const newParty = await (0, UserModel_1.addParty)(validatedData.data);
    return newParty;
};
exports.createPartyService = createPartyService;
