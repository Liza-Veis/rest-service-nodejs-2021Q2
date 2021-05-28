const uuid = require('uuid');

/**
 * Column class
 * @property {string} id Column id
 * @property {string} title Column title
 * @property {number} order Column order
 */
class Column {
  /**
   * @param {Object} config Config to create a column
   */
  constructor({ id = uuid.v4(), title = 'COLUMN', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
