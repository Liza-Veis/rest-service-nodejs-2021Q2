const uuid = require('uuid');
const Column = require('./column.model');

/**
 * Board class
 * @property {string} id Board id
 * @property {string} title Board title
 * @property {Array<Column>} columns Board columns
 */
class Board {
  /**
   * @param {Object} config Config to create a board
   */
  constructor({ id = uuid.v4(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => new Column(column));
  }
}

module.exports = Board;
