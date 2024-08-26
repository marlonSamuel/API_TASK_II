/**
 * Class for handling application exceptions.
 * Extends the built-in Error class to include an HTTP status code.
 */
export class ApplicationException extends Error {
    public statusCode: number;
    /**
     * Constructs an instance of the ApplicationException class.
     *
     * @param {string} message - The error message to be returned. Defaults to 'An unexpected error occurred.'
     * @param {number} statusCode - The HTTP status code to be returned. Defaults to 400.
     */
    constructor(message = 'An unexpected error ocurred.', statusCode=400) {
        super(message);
        this.statusCode = statusCode;
    }
}