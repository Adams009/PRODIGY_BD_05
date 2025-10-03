import { body } from "express-validator"

const registrationSchema = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
        .isLength({ max: 50 }).withMessage('Name must be at most 50 characters long')
        .isString().withMessage('Name must be a string'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be a valid email address')
        .toLowerCase(),

    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isStrongPassword().withMessage('Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character'),

    body('confirmPassword')
        .trim()
        .notEmpty().withMessage('Password confirmation is required')
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
    }),

    body("role")
        .trim()
        .notEmpty().withMessage("Role is required")
        .isString().withMessage("Role must be a string")
        .toLowerCase()
        .isIn(['user', 'hotel_owner']).withMessage("Role must be either 'user' or 'hotel_owner'")
]

export default registrationSchema