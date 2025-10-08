import { body, param } from "express-validator";

const hotelUpdateSchema = [
  // Validate the hotel ID in the route params
  param("id")
    .isInt({ min: 1 }).withMessage("Hotel ID must be a positive integer"),

  // Optional name
  body("name")
    .optional()
    .trim()
    .isString().withMessage("Name must be a string")
    .isLength({ min: 3, max: 100 }).withMessage("Name must be between 3 and 100 characters"),

  // Optional address
  body("address")
    .optional()
    .trim()
    .isString().withMessage("Address must be a string")
    .isLength({ min: 5, max: 255 }).withMessage("Address must be between 5 and 255 characters"),

  // Optional city
  body("city")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage("City must be between 2 and 50 characters")
    .matches(/^[A-Za-z\s-]+$/).withMessage("City can only contain letters, spaces, and hyphens"),

  // Optional state
  body("state")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage("State must be between 2 and 50 characters")
    .isAlpha("en-US", { ignore: " " }).withMessage("State must only contain letters and spaces"),

  // Optional country
  body("country")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage("Country must be between 2 and 50 characters")
    .isAlpha("en-US", { ignore: " " }).withMessage("Country must only contain letters and spaces"),
];


export default hotelUpdateSchema;