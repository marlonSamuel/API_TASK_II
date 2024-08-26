import { NextFunction, Request, Response} from 'express';
import { validationResult } from 'express-validator';

/**
 * Middleware to validate fields based on express-validator checks
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @return {Response} - Sends a response with validation errors if any, or proceeds to the next middleware
*/
export const validateFields = (req: Request, res: Response, next: NextFunction) => {
    // Get validation results from express-validator
    const errores = validationResult( req );

    // If there are validation errors, send a 400 response with error details
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    // If no validation errors, proceed to the next middleware
    next();
};