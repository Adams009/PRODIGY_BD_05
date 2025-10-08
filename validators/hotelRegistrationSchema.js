import { body } from "express-validator";

const HotelRegistrationSchema = [
  body("name")
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3, max: 100 })
    .isString().withMessage('Name must be a string'),

  body("address")
    .trim()
    .notEmpty().withMessage('Address is required')
    .isLength({ min: 5, max: 255 })
    .isString().withMessage('Address must be string'),

  body("city")
    .trim()
    .notEmpty().withMessage('City is required')
    .isLength({ min: 2, max: 50})
    .matches(/^[A-Za-z\s-]+$/).withMessage('Only letters A-Z, a-z, spaces, and hyphens are allowed'),

  body("state")
    .trim()
    .notEmpty().withMessage('State is required')
    .isLength({ min: 2, max: 50 })
    .isAlpha("en-US", { ignore: " " }).withMessage('only letters (A-Z, a-z) and space is taken' ),

  body("country")
    .trim()
    .notEmpty().withMessage('Country is required')
    .isLength({ min : 2, max: 50})
    .isAlpha("en-US", { ignore: " " }),
];


export default HotelRegistrationSchema