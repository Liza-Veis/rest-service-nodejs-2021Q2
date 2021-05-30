import * as tasksService from '../tasks/task.service';
import * as boardsRepo from './board.memory.repository';
import { Board } from './board.model';

/**
 * Boards service module
 * @module BoardsService
 */

/**
 * Returns an array of all boards
 * @returns {Promise<Array<Board>>} Promise object represents an array of boards
 */
export const getAll = () => boardsRepo.getAll();

/**
 * Returns a board by id
 * @param {string} id board id
 * @returns {Promise<Board>} Promise object represents a board
 */
export const getById = (id: string) => boardsRepo.getById(id);

/**
 * Creates a board
 * @param {Board} board board object
 * @returns {Promise<Board>} Promise object represents a created board
 */
export const create = (board: Board) => boardsRepo.create(board);

/**
 * Updates a board
 * @param {string} id board id
 * @param {Object} data data to update
 * @returns {Promise<Board>} Promise object represents an updated board
 */
export const update = (id: string, data: Partial<Board>) =>
  boardsRepo.update(id, data);

/**
 * Removes a board
 * @param {string} id board id
 * @returns {Promise<void>} Promise object
 */
export const remove = async (id: string) => {
  const tasks = await tasksService.getAll(id);

  tasks.forEach((task) => {
    tasksService.remove(id, task.id);
  });

  boardsRepo.remove(id);
};
