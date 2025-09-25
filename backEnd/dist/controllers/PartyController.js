"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCandidate = exports.getPartyCandidates = exports.registerParty = void 0;
const PartyService_1 = require("@/services/PartyService");
const errorHandler_1 = __importDefault(require("@/utils/errorHandler"));
const CandidateService_1 = require("@/services/CandidateService");
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
const getPartyCandidates = async (req, res) => {
    try {
        const user = req.user;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const candidates = await (0, CandidateService_1.getCandidateService)(page, limit, user.userId);
        return res.status(201).json({
            success: true,
            data: {
                candidates,
            },
        });
    }
    catch (error) {
        const errors = (0, errorHandler_1.default)(error);
        return res.status(errors.status).json(errors.body);
    }
};
exports.getPartyCandidates = getPartyCandidates;
const createCandidate = async (req, res) => {
    try {
        const user = req.user;
        const candidate = await (0, CandidateService_1.createCandidateService)(req, user);
        return res.status(201).json({
            success: true,
            data: {
                candidate,
            },
        });
    }
    catch (error) {
        const errors = (0, errorHandler_1.default)(error);
        return res.status(errors.status).json(errors.body);
    }
};
exports.createCandidate = createCandidate;
