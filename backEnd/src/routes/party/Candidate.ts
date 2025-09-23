import { getPartyCandidates } from "@/controllers/PartyController";
import { verifyToken } from "@/middleware/auth";
import { isUserAParty } from "@/middleware/isParty";
import { Router } from "express";

const router = Router();

router.use(verifyToken);
router.use(isUserAParty);

router.get("/candidates", getPartyCandidates);

export default router;
