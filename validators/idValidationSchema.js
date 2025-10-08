import { param } from "express-validator";

export const idValidationSchema = [
  // Validate the hotel ID in the route params
    param("id")
        .isInt({ min: 1 }).withMessage("ID must be a positive integer")
];

export default idValidationSchema;