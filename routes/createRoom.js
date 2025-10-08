import { Router } from "express";
import authenticate from "../middlewares/authentication.js";
import  authorizeRoles  from "../middlewares/authorisation.js";
import createRoomController from "../controllers/createRoom.js"

const router = Router()

router.get('/', authenticate, authorizeRoles(["hotel_owner", "admin"], createRoomController))

export default router