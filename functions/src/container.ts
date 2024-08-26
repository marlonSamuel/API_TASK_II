import { asClass, createContainer } from 'awilix';
import express from 'express';
import { scopePerRequest } from 'awilix-express';
import { UserService } from './services/UserService';
import { TaskService } from './services/TaskService';

/**
 * Configures and sets up dependency injection for the application.
 * @param {express.Application} app - The Express application instance.
 */
export default (app: express.Application)=>{
    // Create a new dependency injection container
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    // Register services with the container
    container.register({
        userService: asClass(UserService).scoped(),
        taskService: asClass(TaskService).scoped(),
    });

    // Apply Awilix's scope-per-request middleware to the Express app
    app.use(scopePerRequest(container));
};