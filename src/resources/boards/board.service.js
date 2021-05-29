const tasksService = require('../tasks/task.service');
const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model'); // eslint-disable-line no-unused-vars

/**
 * Boards service module
 * @module BoardsService
 */

/**
 * Returns an array of all boards
 * @returns {Promise<Array<Board>>} Promise object represents an array of boards
 */
const getAll = () => boardsRepo.getAll();

/**
 * Returns a board by id
 * @param {string} id board id
 * @returns {Promise<Board>} Promise object represents a board
 */
const getById = (id) => boardsRepo.getById(id);

/**
 * Creates a board
 * @param {Board} board board object
 * @returns {Promise<Board>} Promise object represents a created board
 */
const create = (board) => boardsRepo.create(board);

/**
 * Updates a board
 * @param {string} id board id
 * @param {Object} data data to update
 * @returns {Promise<Board>} Promise object represents an updated board
 */
const update = (id, data) => boardsRepo.update(id, data);

/**
 * Removes a board
 * @param {string} id board id
 * @returns {Promise<void>} Promise object
 */
const remove = async (id) => {
  const tasks = await tasksService.getAll(id);

  tasks.forEach((task) => {
    tasksService.remove(id, task.id);
  });

  boardsRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
