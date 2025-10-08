import {Router} from "express";
import updateRoomController from "../controllers/updateRoom.js";
import authenticate from "../middlewares/authentication.js";
import authorizeRoles from "../middlewares/authorisation.js";

const router = Router();

router.put("/:id", authenticate, authorizeRoles(["admin", "hotel_owner"]), updateRoomController);

export default router;