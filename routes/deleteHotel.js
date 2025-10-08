import { Router } from "express";
import deleteHotelController from "../controllers/deleteHotel.js";
import authenticate from "../middlewares/authentication.js";
import  authorizeRoles  from "../middlewares/authorisation.js"

const router = Router();

router.delete("/:id", authenticate, authorizeRoles(["hotel_owner", "admin"]), deleteHotelController);

export default router;