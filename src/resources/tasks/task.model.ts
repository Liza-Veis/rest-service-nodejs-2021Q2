import { v4 } from 'uuid';

/**
 * Task class
 * @property {string} id Task id
 * @property {string} title Task title
 * @property {string} description Task description
 * @property {number} order Task order
 * @property {string} userId User id
 * @property {string} boardId Board id
 * @property {string} columnId Column id
 */
export class Task {
  id: string;

  title: string;

  description: string;

  order: number;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  /**
   * @param {Object} config Config to create a task
   */
  constructor({
    id = v4(),
    title = 'TASK',
    description = '',
    order = 0,
    boardId = null,
    userId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.order = order;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
