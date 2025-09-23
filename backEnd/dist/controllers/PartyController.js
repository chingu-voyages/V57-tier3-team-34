"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerParty = void 0;
const PartyService_1 = require("@/services/PartyService");
const errorHandler_1 = __importDefault(require("@/utils/errorHandler"));
const registerParty = async (req, res) => {
    try {
        const newParty = await (0, PartyService_1.createPartyService)(req.body);
        return res.status(201).json({
            success: true,
            data: newParty,
        });
    }
    catch (error) {
        const errors = (0, errorHandler_1.default)(error);
        return res.status(errors.status).json(errors.body);
    }
};
exports.registerParty = registerParty;
