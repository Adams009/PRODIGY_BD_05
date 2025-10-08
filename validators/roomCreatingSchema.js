import { body } from "express-validator";

const roomCreatingSchema = [
  body("hotelId")
    .notEmpty().withMessage("HotelId is required")
    .isInt({ min: 1 }).withMessage("HotelId must be a positive integer"),

  body("roomNumber")
    .notEmpty().withMessage("Room number is required")
    .isString().withMessage("Room number must be a string"),

  body("roomType")
    .notEmpty().withMessage("Room type is required")
    .isIn(["single", "double", "suite"]).withMessage("Room type must be one of: single, double, suite"),

  body("capacity")
    .notEmpty().withMessage("Capacity is required")
    .isInt({ min: 1 }).withMessage("Capacity must be at least 1"),

  body("price")
    .notEmpty().withMessage("Price is required")
    .isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),

  body("description")
    .notEmpty().withMessage("Description is required")
    .isLength({ max: 500 }).withMessage("Description cannot exceed 500 characters"),

  body("amenities")
    .notEmpty().withMessage("Amenities are required")
    .custom((value) => {
      if (typeof value !== "object") {
        throw new Error("Amenities must be a valid JSON object or array");
      }
      return true;
    }),
];

export default roomCreatingSchema;
