const DB = require('../../common/inMemoryDb');
const errors = require('../../errors');
const Task = require('./task.model'); // eslint-disable-line no-unused-vars

const GROUP = 'tasks';

/**
 * Tasks repository module
 * @module TasksRepository
 */

/**
 * Returns an array of all tasks on a board
 * @param {string} boardId board id
 * @returns {Promise<Array<Task>>} Promise object represents an array of tasks
 */
const getAll = async (boardId) => {
  const tasks = await DB.getAllEntities(GROUP);

  return tasks.filter((task) => task.boardId === boardId);
};

/**
 * Returns an array of all user tasks
 * @param {string} userId user id
 * @returns {Promise<Array<Task>>} Promise object represents an array of tasks
 */
const getAllByUserId = async (userId) => {
  const tasks = await DB.getAllEntities(GROUP);

  return tasks.filter((task) => task.userId === userId);
};

/**
 * Returns a task by id and board id
 * @param {string} boardId board id
 * @param {string} id task id
 * @returns {Promise<Task>} Promise object represents a task
 */
const getById = async (boardId, id) => {
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
 * @param {Object} data config to create a task
 * @returns {Promise<Task>} Promise object represents a created task
 */
const create = async (data) => {
  const task = await DB.createEntity(GROUP, data);

  if (!task) throw new errors.BAD_REQUEST(`Task entity to create isn't valid`);

  return task;
};

/**
 * Updates a task
 * @param {string} boardId board id
 * @param {string} id task id
 * @param {Object} data data to update
 * @returns {Promise<Task>} Promise object represents an updated task
 */
const update = async (boardId, id, data) => {
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
const remove = async (boardId, id) => {
  const isRemoved = await DB.removeEntity(GROUP, { boardId, id });

  if (!isRemoved) {
    throw new errors.NOT_FOUND(
      `Task with id: ${id} on board with id: ${boardId} not found`
    );
  }
};

module.exports = {
  getAll,
  getAllByUserId,
  getById,
  create,
  update,
  remove,
};
