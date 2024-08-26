import { Response } from 'express';
import { ApplicationException } from './application.exception';

/**
 * Abstract class for handling exception management in controllers.
 */
export abstract class BaseController {
    /**
     * Handles exceptions by sending appropriate responses based on the error type.
     *
     * @param {any} err - The error that needs to be handled.
     * @param {Response} res - The HTTP response object used to send the response.
     */
    handleException(err: any, res: Response) {
        if (err instanceof ApplicationException) {
            res.status(err.statusCode);
            res.send({ok: false, message: err.message});
        } else {
            console.log('error en base controller', err.message);
            res.status(500).send({ok: false, message: 'Error inesperado'});
        }
    }
}