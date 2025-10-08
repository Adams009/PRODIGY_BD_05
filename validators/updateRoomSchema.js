import { body, param } from "express-validator";

const validateRoomUpdate = [
  // Room ID must be valid
  param("id")
    .isInt({ min: 1 }).withMessage("Room ID must be a positive integer"),

  // Room number (string, alphanumeric allowed)
  body("roomNumber")
    .optional()
    .isString().withMessage("Room number must be a string")
    .isLength({ min: 1, max: 50 }).withMessage("Room number must be between 1 and 50 characters"),

  // Room type (enum)
  body("roomType")
    .optional()
    .isIn(["single", "double", "suite"]).withMessage("Room type must be one of: single, double, suite"),

  // Capacity (integer > 0)
  body("capacity")
    .optional()
    .isInt({ min: 1 }).withMessage("Capacity must be at least 1"),

  // Price (float > 0)
  body("price")
    .optional()
    .isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),

  // Description (string, <= 500 chars)
  body("description")
    .optional()
    .isString().withMessage("Description must be a string")
    .isLength({ max: 500 }).withMessage("Description cannot exceed 500 characters"),

  // Amenities (must be a valid array or object)
  body("amenities")
    .optional()
    .custom((value) => {
      if (typeof value !== "object") {
        throw new Error("Amenities must be a valid JSON object or array");
      }
      return true;
    }),
];

export default validateRoomUpdate;