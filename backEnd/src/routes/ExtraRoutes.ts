import { getElectionResult, getPosts } from "@/controllers/ExtrasController";
import { Router } from "express";

const router = Router();

router.get("/get-political-posts", getPosts);
router.get("/election-results", getElectionResult);

export default router;
