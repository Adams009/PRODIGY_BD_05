import {Router} from "express"
import loginController from "../controllers/login.js"

const route = Router()

route.post("/", loginController)

export default route