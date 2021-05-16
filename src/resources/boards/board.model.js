const { v4: uuid } = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static addColumn(board, title = 'COLUMN') {
    if (!board?.columns) return;

    const column = {
      id: uuid(),
      title,
      order: board.columns.length,
    };

    board.columns.push(column);
  }
}

module.exports = Board;
