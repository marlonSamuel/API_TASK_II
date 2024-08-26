import { Timestamp } from 'firebase-admin/firestore';

/**
 * Interface representing the data transfer object (DTO) for a task.
 * Used for creating or updating a task.
 */
interface ITaskDto {
    id: string;
    userId: string;
    title: string;
    description: string;
    createdAt: Timestamp;
    task_date: Date;
    completed: boolean;
}

/**
 * Interface representing the data transfer object (DTO) for updating a task.
 * Used for modifying an existing task.
 */
interface ITaskUpdateDto {
    title: string;
    description: string;
    task_date: Date;
    completed: boolean;
}

/**
 * Interface representing the response data for a task.
 * Used for returning task information to the client.
 */
interface ITaskDtoResponse {
    id: string;
    userId: string;
    title: string;
    description: string;
    created_date: string;
    task_date: Date;
    completed: boolean;
}

export {
    ITaskDto,
    ITaskUpdateDto,
    ITaskDtoResponse
};