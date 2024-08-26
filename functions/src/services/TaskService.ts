import { BaseController } from '../common/BaseConotroller';
import { ApplicationException } from '../common/application.exception';
import { db } from '../common/firebase';
import { ITaskDto, ITaskDtoResponse, ITaskUpdateDto } from './dtos/ITaskDto';
import { Timestamp } from 'firebase-admin/firestore';
import moment from 'moment';
import { ITaskService } from './interfaces/ITaskService';

/**
 * Service class to handle business logic related to tasks.
 * This includes operations like retrieving tasks, creating, updating, and deleting tasks.
*/
export class TaskService extends BaseController implements ITaskService {
    /**
     * Get all tasks.
     * @return {Promise<ITaskDtoResponse[]>} A promise that resolves to an array of tasks.
     * @throws {ApplicationException} If an error occurs during retrieval.
     */
    async getAll(): Promise<ITaskDtoResponse[]> {
        try {
            // Get all tasks from the database and order them by 'task_date'
            const taskDocs = await db.collection('tasks')
                .orderBy('task_date', 'asc')
                .get();

            // Map each document to an ITaskDtoResponse object
            const tasks: ITaskDtoResponse[] = taskDocs.docs.map((doc) => {
                const { createdAt, ...data } = doc.data();
                    return {
                        ...data,
                        created_date: moment(createdAt.toDate()).format('YYYY-MM-DD HH:mm:ss'),
                        id: doc.id,
                    } as ITaskDtoResponse;
            });

            return tasks;
        } catch (error:any) {
            throw new ApplicationException(error.message);
        }
    }

    /**
     * Get tasks by user ID.
     * @param {string} id - The ID of the user.
     * @param {boolean | undefined} completed - Optional filter for completed tasks.
     * @return {Promise<ITaskDtoResponse[]>} A promise that resolves to an array of tasks for the specified user.
     * @throws {ApplicationException} If an error occurs during retrieval.
     */
    async getByUser(id: string, completed: undefined | boolean = undefined): Promise<ITaskDtoResponse[]> {
        try {
            // Build the query to retrieve tasks for a specific user
            let query = await db.collection('tasks')
                .where('userId', '==', id)
                .orderBy('task_date', 'asc');

            if (completed !== null && completed !== undefined) {
                query = query.where('completed', '==', completed);
            }

            const taskDocs = await query.get();

            // Map each document to an ITaskDtoResponse object
            const tasks: ITaskDtoResponse[] = taskDocs.docs.map((doc) => {
                const { createdAt, ...data } = doc.data();
                    return {
                        ...data,
                        created_date: moment(createdAt.toDate()).format('YYYY-MM-DD HH:mm:ss'),
                        id: doc.id,
                    } as ITaskDtoResponse;
            });

            return tasks;
        } catch (error:any) {
            throw new ApplicationException(error.message);
        }
    }

    /**
     * Create a new task.
     * @param {ITaskDto} data - The task data to create.
     * @return {Promise<ITaskDto>} A promise that resolves to the created task.
     * @throws {ApplicationException} If an error occurs during task creation.
     */
    async create(data : ITaskDto): Promise<ITaskDto> {
        try {
            data.createdAt = Timestamp.now();
            data.completed = false;

            const docRef = await db.collection('tasks').add(data);
            const newTask = await docRef.get();

            const task = {
                id: newTask.id,
                ...newTask.data()
            } as ITaskDto;

            return task;
        } catch (error:any) {
            throw new ApplicationException(error.message);
        }
    }

    /**
     * Update an existing task.
     * @param {string} id - The ID of the task to update.
     * @param {ITaskUpdateDto} data - The updated task data.
     * @return {Promise<ITaskUpdateDto>} A promise that resolves to the updated task data.
     * @throws {ApplicationException} If an error occurs during task update or if the task does not exist.
     */
    async update(id: string, data: ITaskUpdateDto): Promise<ITaskUpdateDto> {
        try {
            const task = db.collection('tasks').doc(id);
            const _task = await task.get();

            if (!_task.exists) throw new ApplicationException('No existe tarea');

            // update task
            await task.update({
                title: data.title,
                description: data.description,
                task_date: data.task_date,
                completed: data.completed
            });

            return data;
        } catch (error:any) {
            throw new ApplicationException(error.message);
        }
    }

    /**
     * Delete a task.
     * @param {string} id - The ID of the task to delete.
     * @return {Promise<boolean>} A promise that resolves to true if the task was successfully deleted.
     * @throws {ApplicationException} If an error occurs during task deletion, if the task does not exist, or if the task is completed.
     */
    async delete(id: string): Promise<boolean> {
        try {
            const task = db.collection('tasks').doc(id);
            const _task = await task.get();

            if (!_task.exists) throw new ApplicationException('No existe tarea');

            const data = _task.data() as ITaskDto;

            if (data.completed) {
                throw new ApplicationException('No se puede eliminar tarea, tarea ya ha sido completada');
            }
            // delete task
            await task.delete();
            return true;
        } catch (error:any) {
            throw new ApplicationException(error.message);
        }
    }
}