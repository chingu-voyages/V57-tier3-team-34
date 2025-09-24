import {
  createCandidate,
  getPartyCandidates,
} from "@/controllers/PartyController";
import upload from "@/helpers/Upload";
import { verifyToken } from "@/middleware/auth";
import { isUserAParty } from "@/middleware/isParty";
import { Router } from "express";

const router = Router();

router.use(verifyToken);
router.use(isUserAParty);

//Multer helps handle file uploads for nodeJs

router.get("/candidates", getPartyCandidates);
router.post("/candidate", upload.single("image"), createCandidate);

export default router;
