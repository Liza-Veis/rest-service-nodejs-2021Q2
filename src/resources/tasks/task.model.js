const uuid = require('uuid');

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
class Task {
  /**
   * @param {Object} config Config to create a task
   */
  constructor({
    id = uuid.v4(),
    title = 'TASK',
    description = '',
    order = 0,
    userId = null,
    boardId,
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

module.exports = Task;
