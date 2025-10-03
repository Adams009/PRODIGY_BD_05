import { Router } from "express";
import registerController from "../controllers/register.js";

const route = Router()

route.post('/', registerController)

export default route;