import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      /**
       * Optional property added to the Express Request object to hold JWT payload information.
       * @type {JwtPayload}
      */
      user?: JwtPayload;
    }
  }
}

export {};