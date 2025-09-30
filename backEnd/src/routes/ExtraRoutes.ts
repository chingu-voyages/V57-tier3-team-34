import { getPosts } from "@/controllers/ExtrasController";
import { Router } from "express";

const router = Router();

router.get("/get-political-posts", getPosts);

export default router;
