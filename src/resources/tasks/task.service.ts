import * as tasksRepo from './task.memory.repository';
import { Task } from './task.model';

/**
 * Tasks service module
 * @module TasksService
 */

/**
 * Returns an array of all tasks on a board
 * @param {string} boardId board id
 * @returns {Promise<Array<Task>>} Promise object represents an array of tasks
 */
export const getAll = (boardId: string): Promise<Task[]> =>
  tasksRepo.getAll(boardId);

/**
 * Returns an array of all user tasks
 * @param {string} userId user id
 * @returns {Promise<Array<Task>>} Promise object represents an array of tasks
 */
export const getAllByUserId = (userId: string): Promise<Task[]> =>
  tasksRepo.getAllByUserId(userId);

/**
 * Returns a task by id and board id
 * @param {string} boardId board id
 * @param {string} id task id
 * @returns {Promise<Task>} Promise object represents a task
 */
export const getById = (boardId: string, id: string): Promise<Task> =>
  tasksRepo.getById(boardId, id);

/**
 * Creates a task
 * @param {Task} task task object
 * @returns {Promise<Task>} Promise object represents a created task
 */
export const create = (task: Task): Promise<Task> => tasksRepo.create(task);

/**
 * Updates a task
 * @param {string} boardId board id
 * @param {string} id task id
 * @param {Object} data data to update
 * @returns {Promise<Task>} Promise object represents an updated task
 */
export const update = (
  boardId: string,
  id: string,
  data: Partial<Task>
): Promise<Task> => tasksRepo.update(boardId, id, data);

/**
 * Removes a task
 * @param {string} boardId board id
 * @param {string} id task id
 * @returns {Promise<void>} Promise object
 */
export const remove = (boardId: string, id: string): Promise<void> =>
  tasksRepo.remove(boardId, id);
