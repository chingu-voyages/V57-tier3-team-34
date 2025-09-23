import { createVoter, loginVoter } from "../controllers/voterController";

import { Router } from "express";

const router = Router();

router.post("/create", createVoter);
router.post("/login", loginVoter);

export default router;
