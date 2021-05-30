import StatusCodes from 'http-status-codes';

/**
 * BadRequest error class
 * @memberof module:Errors
 * @extends {Error}
 * @property {number} status status code
 */
export class BadRequest extends Error {
  status: number;

  /**
   * @param {string} message Error message
   */
  constructor(message = 'Bad Request') {
    super(message);

    this.status = StatusCodes.BAD_REQUEST;
  }
}
