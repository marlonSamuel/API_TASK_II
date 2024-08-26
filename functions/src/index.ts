import * as functions from 'firebase-functions';
import app from './app';
import { loadControllers } from 'awilix-express';

// Configure the application to use controllers
app.use(loadControllers('controllers/*.js', { cwd: __dirname }));

// Export the Express app as a Firebase Cloud Function
export const api = functions.https.onRequest(app);