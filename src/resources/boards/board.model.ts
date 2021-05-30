import { v4 } from 'uuid';
import { Column } from './column.model';

/**
 * Board class
 * @property {string} id Board id
 * @property {string} title Board title
 * @property {Array<Column>} columns Board columns
 */
export class Board {
  id: string;

  title: string;

  columns: Column[];

  /**
   * @param {Object} config Config to create a board
   */
  constructor({ id = v4(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => new Column(column));
  }
}
