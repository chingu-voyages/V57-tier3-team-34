import { registerParty } from "@/controllers/PartyController";
import { createVoter } from "../controllers/voterController";

import { Router } from "express";
import {
  authenticateUser,
  updateProfile,
  userProfile,
} from "@/controllers/AuthController";
import { verifyToken } from "@/middleware/auth";
import upload from "@/helpers/Upload";

const router = Router();

router.post("/register-voter", createVoter); //Post to this endpoint to create a voter
router.post("/register-party", registerParty); //Post to this endpoint to create a voter

router.post("/login", authenticateUser);

router.get("/profile", verifyToken, userProfile);
router.put("/profile", verifyToken, upload.single("banner"), updateProfile);

export default router;
