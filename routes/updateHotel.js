import { Router } from "express";
import updateHotelController from "../controllers/updateHotel.js";
import authenticate from "../middlewares/authentication.js";
import authorizeRoles from "../middlewares/authorisation.js";

const router = Router();

router.put("/:id", authenticate, authorizeRoles(["admin", "hotel_owner"]), updateHotelController);

export default router;