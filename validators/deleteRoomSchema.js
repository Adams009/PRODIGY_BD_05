import { param, body } from "express-validator";

const deleteRoomSchema = [
    param('id')
        .isInt().withMessage('Room ID must be an integer'),
        
    body("hotelId")
        .notEmpty().withMessage("HotelId is required")
        .isInt({ min: 1 }).withMessage("HotelId must be a positive integer")
]

export default deleteRoomSchema;