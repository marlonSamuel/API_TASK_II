import {DELETE, GET, POST, PUT, before, route} from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/BaseConotroller';
import { check } from 'express-validator';
import { validateFields } from '../common/validate_fields';
import { TaskService } from '../services/TaskService';
import { ITaskDto, ITaskUpdateDto } from '../services/dtos/ITaskDto';
import { authMiddleware } from '../common/middlewares/auth.midleware';
import moment from 'moment';

@route('/tasks')
/**
 * Controller for managing tasks.
 */
export class TaskController extends BaseController {
    /**
     * Inject the TaskService dependency.
     * @param {TaskService} taskService - The task service used for task operations.
     */
    constructor(private readonly taskService: TaskService) {
        super();
    }


    /**
     * Get all tasks.
     * @param {Request} req - The request object.
     * @param {Request} res - The response object.
    */
    @route('/')
    @GET()
    @before([
        authMiddleware
    ])
    public async getAll(req: Request, res: Response) {
        try {
            const data = await this.taskService.getAll();
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    /**
     * Get all tasks by user.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
    @route('/get-by-user')
    @GET()
    @before([
        authMiddleware
    ])
    public async getByUser(req: Request, res: Response) {
        try {
            const id = req.user?.id;
            const completed = req.query.completed?.toString();
            let _completed = false;
            if ( completed !== undefined) {
                _completed = completed.toLowerCase() === 'true';
            }
            const data = await this.taskService.getByUser(id, (completed !== undefined ? _completed : completed));
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    /**
     * Create a new task.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
    */
    @POST()
    @before([
        authMiddleware,
        check('title').notEmpty().isLength({min: 10}).withMessage('titúlo debe contener mas 10 caracteres'),
        check('description').notEmpty().isLength({min: 15}).withMessage('titúlo debe contener mas 15 caracteres'),
        check('task_date').notEmpty().custom((value) => {
            const format = 'YYYY-MM-DD HH:MM';
            const parsedDate = moment(value).format(format);
            if (!moment(parsedDate).isValid()) {
              throw new Error('Invalid date');
            }
            return true;
          }),
        validateFields
    ])
    public async create(req: Request, res: Response) {
        try {
            const body: ITaskDto = req.body;
            body.userId = req.user?.id;
            const data = await this.taskService.create(body);
            res.status(200).send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    /**
     * Update an existing task.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
    @route('/:id')
    @PUT()
    @before([
        authMiddleware,
        check('title').notEmpty(),
        check('description').notEmpty(),
        check('task_date').notEmpty(),
        check('completed').notEmpty(),
        validateFields
    ])
    public async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const body: ITaskUpdateDto = req.body;
            const data = await this.taskService.update(id, body);
            res.status(200).send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    /**
     * Delete an existing task.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     */
    @route('/:id')
    @DELETE()
    @before([
        authMiddleware
    ])
    public async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = await this.taskService.delete(id);
            res.status(200).send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }
}