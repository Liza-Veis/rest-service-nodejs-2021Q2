const { StatusCodes } = require('http-status-codes');

/**
 * NotFound error class
 * @memberof module:Errors
 * @extends {Error}
 * @property {number} status status code
 */
class NOT_FOUND extends Error {
  /**
   * @param {string} message Error message
   */
  constructor(message = 'Not Found') {
    super(message);

    this.status = StatusCodes.NOT_FOUND;
  }
}

module.exports = NOT_FOUND;
