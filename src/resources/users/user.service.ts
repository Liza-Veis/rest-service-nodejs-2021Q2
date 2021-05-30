import * as tasksService from '../tasks/task.service';
import * as usersRepo from './user.memory.repository';
import { User } from './user.model';
import { Task } from '../tasks/task.model';

/**
 * Users service module
 * @module UsersService
 */

/**
 * Returns an array of all users
 * @returns {Promise<Array<User>>} Promise object represents an array of users
 */
export const getAll = () => usersRepo.getAll();

/**
 * Returns a user by id
 * @param {string} id user id
 * @returns {Promise<User>} Promise object represents a user
 */
export const getById = (id: string) => usersRepo.getById(id);

/**
 * Creates a user
 * @param {User} user user object
 * @returns {Promise<User>} Promise object represents a created user
 */
export const create = (user: User) => usersRepo.create(user);

/**
 * Updates a user
 * @param {string} id user id
 * @param {Object} data data to update
 * @returns {Promise<User>} Promise object represents an updated user
 */
export const update = (id: string, data: Partial<User>) =>
  usersRepo.update(id, data);

/**
 * Removes a user
 * @param {string} id user id
 * @returns {Promise<void>} Promise object
 */
export const remove = async (id: string) => {
  const tasks = await tasksService.getAllByUserId(id);

  tasks.forEach((task: Task) => {
    if (task.boardId) {
      tasksService.update(task.boardId, task.id, { userId: null });
    }
  });

  usersRepo.remove(id);
};
