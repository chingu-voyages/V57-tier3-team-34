import { registerParty } from "@/controllers/PartyController";
import { createVoter } from "../controllers/voterController";

import { Router } from "express";
import { authenticateUser } from "@/controllers/AuthController";

const router = Router();

router.post("/register-voter", createVoter); //Post to this endpoint to create a voter
router.post("/register-party", registerParty); //Post to this endpoint to create a voter

router.post("/login", authenticateUser);

export default router;
