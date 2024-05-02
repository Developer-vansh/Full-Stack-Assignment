import { Router } from "express";
import { getPosts } from "../controllers/post.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/:pageSize/:page",verifyJWT, getPosts);

export default router;
