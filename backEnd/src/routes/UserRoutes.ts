import { registerParty } from "@/controllers/PartyController";
import {
  createVoter,
  getVerificationStatus,
  approveVerification,
  rejectVerification,
  getOtp,
  verifyOtp,
} from "../controllers/voterController";

import { Router } from "express";
import {
  authenticateUser,
  updateProfile,
  userProfile,
} from "@/controllers/AuthController";
import { verifyToken } from "@/middleware/auth";
import upload from "@/helpers/Upload";

const router = Router();

// Voter routes
router.post("/register-voter", createVoter); // Alternative endpoint for backward compatibility
router.post("/request-otp", getOtp);
router.post("/verify-otp", verifyOtp);
router.get("/verification-status/:userId", verifyToken, getVerificationStatus);

// Admin verification routes (require authentication)
router.put("/verify/approve/:userId", verifyToken, approveVerification);
router.put("/verify/reject/:userId", verifyToken, rejectVerification);

// Party routes
router.post("/register-party", registerParty);

// Auth routes
router.post("/login", authenticateUser);

router.get("/profile", verifyToken, userProfile);
router.put("/profile", verifyToken, upload.single("banner"), updateProfile);

export default router;
