import {Router} from 'express'
import deleteRoomController from '../controllers/deleteRoom.js'
import authenticate from '../middlewares/authentication.js'
import  authorizeRoles  from '../middlewares/authorisation.js'

const router = Router();

router.delete('/:id', authenticate, authorizeRoles(["hotel_owner", "admin"]), deleteRoomController)

export default router