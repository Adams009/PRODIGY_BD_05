import { validationResult } from "express-validator";

export const validatorError = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                status : "failed",
                errors: errors.array() 
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status : "failed",
            error : "Internal server error"
        })
    }
}
