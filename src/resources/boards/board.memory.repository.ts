import * as DB from '../../common/inMemoryDb';
import * as errors from '../../errors';
import { Board } from './board.model';
import { Column } from './column.model';

/**
 * Boards repository module
 * @module BoardsRepository
 */

export const GROUP = 'boards';

/**
 * Returns an array of all boards
 * @returns {Promise<Array<Board>>} Promise object represents an array of boards
 */
export const getAll = async () => DB.getAllEntities(GROUP);

/**
 * Returns a board by id
 * @param {string} id board id
 * @returns {Promise<Board>} Promise object represents a board
 */
export const getById = async (id: string) => {
  const board = await DB.getEntity(GROUP, { id });

  if (!board) throw new errors.NOT_FOUND(`Board with id: ${id} not found`);

  return board;
};

/**
 * Creates a board
 * @param {Board} board board object
 * @returns {Promise<Board>} Promise object represents a created board
 */
export const create = async (board: Board) => {
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
export const update = async (id: string, data: Partial<Board>) => {
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
export const remove = async (id: string) => {
  const isRemoved = await DB.removeEntity(GROUP, { id });

  if (!isRemoved) throw new errors.NOT_FOUND(`Board with id: ${id} not found`);
};
