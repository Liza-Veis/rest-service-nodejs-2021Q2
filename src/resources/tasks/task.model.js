const { v4: uuid } = require('uuid');

class Task {
  constructor({
    id = uuid(),
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
