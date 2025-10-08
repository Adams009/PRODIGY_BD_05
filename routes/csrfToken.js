import { Router } from "express";
import csrfTokenRoute from "../controllers/csrfToken.js";

const router = Router();

router.get('/', csrfTokenRoute);

export default router;