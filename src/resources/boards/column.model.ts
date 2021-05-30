import { v4 } from 'uuid';

/**
 * Column class
 * @property {string} id Column id
 * @property {string} title Column title
 * @property {number} order Column order
 */
export class Column {
  id: string;

  title: string;

  order: number;

  /**
   * @param {Object} config Config to create a column
   */
  constructor({ id = v4(), title = 'COLUMN', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
