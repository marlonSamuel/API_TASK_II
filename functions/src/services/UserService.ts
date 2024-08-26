import { BaseController } from '../common/BaseConotroller';
import { ApplicationException } from '../common/application.exception';
import { IUserDto, IUserResponse } from './dtos/IUserDto';
import jwt from 'jsonwebtoken';
import { db } from '../common/firebase';
import { IUserService } from './interfaces/IUserService';


/**
 * Service class to handle business logic related to users.
 * This includes operations like retrieving user information by email and creating new users.
 */
export class UserService extends BaseController implements IUserService {
    /**
     * Get user by email.
     * @param {string} email - The email address of the user.
     * @return {Promise<IUserDto | null>} The user data if found, otherwise null.
    */
    async getByEmail(email:string): Promise<IUserDto | null> {
        try {
            const user = await db.collection('users')
                .where('email', '==', email)
                .limit(1)
                .get();

            if (user.empty) {
                return null;
            }

            // get the first document
            const _user = user.docs[0];

            // get document user data
            const userData = {
                id: _user.id,
                ..._user.data()
            };

            return userData as IUserDto;
        } catch (error) {
            return null;
        }
    }

    /**
     * Create a new user or return existing user.
     * @param {IUserDto} data - The user data to create.
     * @return {Promise<IUserResponse>} The user data and a JWT token.
     * @throws {ApplicationException} If an error occurs during user creation.
     */
    async create(data : IUserDto): Promise<IUserResponse> {
        try {
            // search user
            let user : IUserDto | null = await this.getByEmail(data.email);
            // if not found user, create new
            if (user === null) {
                const docRef = await db.collection('users').add(data);
                const newUser = await docRef.get();
                user = {
                    id: newUser.id,
                    isNew: true,
                    ...newUser.data()
                } as IUserDto;
            } else {
                user.isNew = false;
            }

            // if user exists or was created, generate token

            const secretKey:string = process.env.jwt_secret || '';

            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, secretKey, { expiresIn: '15h', algorithm: 'HS256' });

            return {
                user: user,
                token: token
            };
        } catch (error:any) {
            throw new ApplicationException(error.message);
        }
    }
}