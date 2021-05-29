const DB = require('../../common/inMemoryDb');
const errors = require('../../errors');
const Board = require('./board.model'); // eslint-disable-line no-unused-vars
const Column = require('./column.model');

/**
 * Boards repository module
 * @module BoardsRepository
 */

const GROUP = 'boards';

/**
 * Returns an array of all boards
 * @returns {Promise<Array<Board>>} Promise object represents an array of boards
 */
const getAll = async () => DB.getAllEntities(GROUP);

/**
 * Returns a board by id
 * @param {string} id board id
 * @returns {Promise<Board>} Promise object represents a board
 */
const getById = async (id) => {
  const board = await DB.getEntity(GROUP, { id });

  if (!board) throw new errors.NOT_FOUND(`Board with id: ${id} not found`);

  return board;
};

/**
 * Creates a board
 * @param {Board} board board object
 * @returns {Promise<Board>} Promise object represents a created board
 */
const create = async (board) => {
  const createdBoard = await DB.createEntity(GROUP, board);

  if (!createdBoard) {
    throw new errors.BAD_REQUEST(`Board entity to create isn't valid`);
  }

  return createdBoard;
};

/**
 * Updates a board
 * @param {string} id board id
 * @param {Object} data data to update
 * @returns {Promise<Board>} Promise object represents an updated board
 */
const update = async (id, data) => {
  const columns = data.columns?.map((column) => new Column(column));
  const dataToUpdate = columns ? { ...data, columns } : data;
  const board = await DB.updateEntity(GROUP, { id }, dataToUpdate);

  if (!board) {
    throw new errors.BAD_REQUEST(`Board entity to update isn't valid`);
  }

  return board;
};

/**
 * Removes a board
 * @param {string} id board id
 * @returns {Promise<void>} Promise object
 */
const remove = async (id) => {
  const isRemoved = await DB.removeEntity(GROUP, { id });

  if (!isRemoved) throw new errors.NOT_FOUND(`Board with id: ${id} not found`);
};

module.exports = { getAll, getById, create, update, remove };
