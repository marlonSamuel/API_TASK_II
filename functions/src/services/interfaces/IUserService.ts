import { IUserDto, IUserResponse } from '../dtos/IUserDto';

/**
 * Interface for user-related services.
 * Defines the contract for the operations related to users that a service must implement.
*/
export interface IUserService {
    getByEmail(email: string): Promise<IUserDto | null>;
    create(data: IUserDto): Promise<IUserResponse>;
}