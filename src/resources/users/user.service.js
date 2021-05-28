const tasksService = require('../tasks/task.service');
const usersRepo = require('./user.memory.repository');
const User = require('./user.model'); // eslint-disable-line no-unused-vars

/**
 * Users service module
 * @module UsersService
 */

/**
 * Returns an array of all users
 * @returns {Promise<Array<User>>} Promise object represents an array of users
 */
const getAll = () => usersRepo.getAll();

/**
 * Returns a user by id
 * @param {string} id user id
 * @returns {Promise<User>} Promise object represents a user
 */
const getById = (id) => usersRepo.getById(id);

/**
 * Creates a user
 * @param {Object} user config to create a user
 * @returns {Promise<User>} Promise object represents a created user
 */
const create = (user) => usersRepo.create(user);

/**
 * Updates a user
 * @param {string} id user id
 * @param {Object} data data to update
 * @returns {Promise<User>} Promise object represents an updated user
 */
const update = (id, data) => usersRepo.update(id, data);

/**
 * Removes a user
 * @param {string} id user id
 * @returns {Promise<void>} Promise object
 */
const remove = async (id) => {
  const tasks = await tasksService.getAllByUserId(id);

  tasks.forEach((task) => {
    tasksService.update(task.boardId, task.id, { userId: null });
  });

  usersRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
