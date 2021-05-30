import StatusCodes from 'http-status-codes';

/**
 * NotFound error class
 * @memberof module:Errors
 * @extends {Error}
 * @property {number} status status code
 */
export class NotFound extends Error {
  status: number;

  /**
   * @param {string} message Error message
   */
  constructor(message = 'Not Found') {
    super(message);

    this.status = StatusCodes.NOT_FOUND;
  }
}
