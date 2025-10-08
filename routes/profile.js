import profileController from "../controllers/profile.js";
import authenticate from "../middlewares/authentication.js";
import { Router } from "express";

const router = Router();

router.get("/", authenticate, profileController);

export default router;