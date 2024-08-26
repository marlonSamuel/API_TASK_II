
import { ITaskDto, ITaskDtoResponse, ITaskUpdateDto } from '../dtos/ITaskDto';

/**
 * Interface for task-related services.
 * Defines the contract for the operations related to tasks that a service must implement.
*/
export interface ITaskService {
    getAll(): Promise<ITaskDtoResponse[]>;
    getByUser(id: string, completed?: boolean): Promise<ITaskDtoResponse[]>;
    create(data: ITaskDto): Promise<ITaskDto>;
    update(id: string, data: ITaskUpdateDto): Promise<ITaskUpdateDto>;
    delete(id: string): Promise<boolean>;
}