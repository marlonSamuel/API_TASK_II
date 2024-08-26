
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

import express from 'express';
import cors from 'cors';
import loadContainer from './container';
import { loadControllers } from 'awilix-express';

// Load environment variables from .env file
import dotenv from 'dotenv';

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

console.log(process.env.APP_FOO);

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));
// Parse incoming JSON requests
app.use(express.json());
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Load the dependency injection container
loadContainer(app);

// Load controllers from the 'controllers' directory
app.use(loadControllers(
    'controllers/*.ts',
    {cwd: __dirname}
));

// Start the server only in development environment
if (process.env.APP_FOO === 'development') {
    app.listen(3000, ()=> {
        console.log('Server running on port 3000');
    });
}

export default app;