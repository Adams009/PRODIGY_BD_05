import { Router } from "express";
import  registerHotelController  from "../controllers/registerHotel.js";
import authenticate from "../middlewares/authentication.js";
import  authorizeRoles  from "../middlewares/authorisation.js";

const router = Router();

router.post("/", authenticate, authorizeRoles(["hotel_owner", "admin"]), registerHotelController);

export default router;