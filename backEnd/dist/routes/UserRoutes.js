"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PartyController_1 = require("@/controllers/PartyController");
const voterController_1 = require("../controllers/voterController");
const express_1 = require("express");
const AuthController_1 = require("@/controllers/AuthController");
const auth_1 = require("@/middleware/auth");
const router = (0, express_1.Router)();
router.post("/register-voter", voterController_1.createVoter); //Post to this endpoint to create a voter
router.post("/register-party", PartyController_1.registerParty); //Post to this endpoint to create a voter
router.post("/login", AuthController_1.authenticateUser);
router.get("/profile", auth_1.verifyToken, AuthController_1.userProfile);
router.put("/profile", auth_1.verifyToken, AuthController_1.updateProfile);
exports.default = router;
