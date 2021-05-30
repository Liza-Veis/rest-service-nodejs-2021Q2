import * as DB from '../../common/inMemoryDb';
import * as errors from '../../errors';
import { Task } from './task.model';

/**
 * Tasks repository module
 * @module TasksRepository
 */

const GROUP = 'tasks';

/**
 * Returns an array of all tasks on a board
 * @param {string} boardId board id
 * @returns {Promise<Array<Task>>} Promise object represents an array of tasks
 */
export const getAll = async (boardId: string): Promise<Task[]> => {
  const tasks = await DB.getAllEntities(GROUP)!;

  return tasks.filter((task) => task.boardId === boardId);
};

/**
 * Returns an array of all user tasks
 * @param {string} userId user id
 * @returns {Promise<Array<Task>>} Promise object represents an array of tasks
 */
export const getAllByUserId = async (userId: string): Promise<Task[]> => {
  const tasks = await DB.getAllEntities(GROUP)!;

  return tasks.filter((task) => task.userId === userId);
};

/**
 * Returns a task by id and board id
 * @param {string} boardId board id
 * @param {string} id task id
 * @returns {Promise<Task>} Promise object represents a task
 */
export const getById = async (boardId: string, id: string): Promise<Task> => {
  const task = await DB.getEntity(GROUP, { boardId, id });

  if (!task) {
    throw new errors.NOT_FOUND(
      `Task with id: ${id} on board with id: ${boardId} not found`
    );
  }

  return task;
};

/**
 * Creates a task
 * @param {Task} task task object
 * @returns {Promise<Task>} Promise object represents a created task
 */
export const create = async (task: Task): Promise<Task> => {
  const createdTask = await DB.createEntity(GROUP, task);

  if (!createdTask) {
    throw new errors.BAD_REQUEST(`Task entity to create isn't valid`);
  }

  return createdTask;
};

/**
 * Updates a task
 * @param {string} boardId board id
 * @param {string} id task id
 * @param {Object} data data to update
 * @returns {Promise<Task>} Promise object represents an updated task
 */
export const update = async (
  boardId: string,
  id: string,
  data: Partial<Task>
): Promise<Task> => {
  const task = await DB.updateEntity(GROUP, { boardId, id }, data);

  if (!task) {
    throw new errors.BAD_REQUEST(`Task entity to update isn't valid`);
  }

  return task;
};

/**
 * Removes a task
 * @param {string} boardId board id
 * @param {string} id task id
 * @returns {Promise<void>} Promise object
 */
export const remove = async (boardId: string, id: string): Promise<void> => {
  const isRemoved = await DB.removeEntity(GROUP, { boardId, id });

  if (!isRemoved) {
    throw new errors.NOT_FOUND(
      `Task with id: ${id} on board with id: ${boardId} not found`
    );
  }
};
