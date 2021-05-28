const { StatusCodes } = require('http-status-codes');

/**
 * BadRequest error class
 * @memberof module:Errors
 * @extends {Error}
 * @property {number} status status code
 */
class BAD_REQUEST extends Error {
  /**
   * @param {string} message Error message
   */
  constructor(message = 'Bad Request') {
    super(message);

    this.status = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BAD_REQUEST;
