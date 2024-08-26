import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

/**
 * Extends the default Express Request interface to include user information.
*/
interface CustomRequest extends Request {
    user?: { id: string; email: string };
}

/**
 * Middleware function for authentication.
 * Verifies the JWT token provided in the Authorization header and attaches the user information to the request.
 *
 * @param {CustomRequest} req - The request object, extended with user information if authentication is successful.
 * @param {Response} res - The response object, used to send HTTP responses.
 * @param {NextFunction} next - The next middleware function in the request-response cycle.
 * @return {void} - Calls `next()` if authentication is successful, or sends an error response if not.
 */
export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  // Extract the token from the Authorization header, Assumes token is sent as 'Bearer token'
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Token not found');
  }

  // verify token
  jwt.verify(token, process.env.jwt_secret!, (err, decoded) => {
    req.user = decoded as { id: string; email: string };
    if (err) {
      return res.status(401).send({ok: false, message: err.message});
    }
    next();
  });
};