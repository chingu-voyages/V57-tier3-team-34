import { createVoter } from "../controllers/voterController";

import { Router } from "express";

const router = Router();

router.post("/", createVoter); //Post to this endpoint to create a voter

export default router;
