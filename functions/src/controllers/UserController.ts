import {GET, POST, before, route} from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/BaseConotroller';
import { UserService } from '../services/UserService';
import { IUserDto } from '../services/dtos/IUserDto';
import { check } from 'express-validator';
import { validateFields } from '../common/validate_fields';
import { ApplicationException } from '../common/application.exception';

/**
 * Controller for managing users.
*/
@route('/users')
export default class UserController extends BaseController {
    /**
     * Inject the UserService dependency.
     * @param {UserService} userService - The user service used for user operations.
    */
    constructor(private readonly userService: UserService) {
        super();
    }

    /**
     * Get user by email.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @throws {ApplicationException} If the user is not found.
    */
    @route('/:email')
    @GET()
    public async getByEmail(req: Request, res: Response) {
        try {
            const email = req.params.email;
            const data = await this.userService.getByEmail(email);
            if (data === null) throw new ApplicationException('Registro no encontrado');
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    /**
     * Create a new user.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
    */
    @POST()
    @before([
        check('email').notEmpty().isEmail(),
        validateFields
    ])
    public async create(req: Request, res: Response) {
        try {
            const body: IUserDto = req.body;
            const data = await this.userService.create(body);
            res.status(200).send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }
}