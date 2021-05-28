const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model'); // eslint-disable-line no-unused-vars

/**
 * Tasks service module
 * @module TasksService
 */

/**
 * Returns an array of all tasks on a board
 * @param {string} boardId board id
 * @returns {Promise<Array<Task>>} Promise object represents an array of tasks
 */
const getAll = (boardId) => tasksRepo.getAll(boardId);

/**
 * Returns an array of all user tasks
 * @param {string} userId user id
 * @returns {Promise<Array<Task>>} Promise object represents an array of tasks
 */
const getAllByUserId = (userId) => tasksRepo.getAllByUserId(userId);

/**
 * Returns a task by id and board id
 * @param {string} boardId board id
 * @param {string} id task id
 * @returns {Promise<Task>} Promise object represents a task
 */
const getById = (boardId, id) => tasksRepo.getById(boardId, id);

/**
 * Creates a task
 * @param {Object} task config to create a task
 * @returns {Promise<Task>} Promise object represents a created task
 */
const create = (task) => tasksRepo.create(task);

/**
 * Updates a task
 * @param {string} boardId board id
 * @param {string} id task id
 * @param {Object} data data to update
 * @returns {Promise<Task>} Promise object represents an updated task
 */
const update = (boardId, id, data) => tasksRepo.update(boardId, id, data);

/**
 * Removes a task
 * @param {string} boardId board id
 * @param {string} id task id
 * @returns {Promise<void>} Promise object
 */
const remove = (boardId, id) => tasksRepo.remove(boardId, id);

module.exports = {
  getAll,
  getAllByUserId,
  getById,
  create,
  update,
  remove,
};
