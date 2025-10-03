import {body} from "express-validator"

const loginSchema = [
    body("email")
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail()
        .toLowerCase(),

    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
]

export default loginSchema