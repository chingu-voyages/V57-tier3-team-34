import { createUser } from "../controllers/userController";

import { Router } from "express";

const router = Router();

router.post("/create", createUser);

export default router;
