import { Router } from "express";
import {
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", registerUser);
router.post("/refresh-access-token", refreshAccessToken);

// Exporting the router
export default router;
