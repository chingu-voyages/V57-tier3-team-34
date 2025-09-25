"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PartyController_1 = require("@/controllers/PartyController");
const voterController_1 = require("../controllers/voterController");
const express_1 = require("express");
const AuthController_1 = require("@/controllers/AuthController");
const auth_1 = require("@/middleware/auth");
const Upload_1 = __importDefault(require("@/helpers/Upload"));
const router = (0, express_1.Router)();
// Voter routes
router.post("/register-voter", voterController_1.createVoter); // Alternative endpoint for backward compatibility
router.get("/verification-status/:userId", auth_1.verifyToken, voterController_1.getVerificationStatus);
// Admin verification routes (require authentication)
router.put("/verify/approve/:userId", auth_1.verifyToken, voterController_1.approveVerification);
router.put("/verify/reject/:userId", auth_1.verifyToken, voterController_1.rejectVerification);
// Party routes
router.post("/register-party", PartyController_1.registerParty);
// Auth routes
router.post("/login", AuthController_1.authenticateUser);
router.get("/profile", auth_1.verifyToken, AuthController_1.userProfile);
router.put("/profile", auth_1.verifyToken, Upload_1.default.single("banner"), AuthController_1.updateProfile);
exports.default = router;
