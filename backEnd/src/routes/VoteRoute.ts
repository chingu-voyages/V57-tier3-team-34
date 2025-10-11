import { castVote, getVotes, initiateVote } from "@/controllers/VoteController";
import { verifyToken } from "@/middleware/auth";
import { electionIsActive, isUserAVoter } from "@/middleware/isVoter";
import { Router } from "express";

const router = Router();

router.use(verifyToken);
router.use(isUserAVoter);
router.use(electionIsActive);

router.get("/initiate-vote", initiateVote);
router.post("/cast", castVote);
router.get("/my-votes", getVotes);

export default router;
