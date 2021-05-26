const { StatusCodes, ReasonPhrases } = require('http-status-codes');

class NOT_FOUND extends Error {
  constructor(message = ReasonPhrases.NOT_FOUND) {
    super(message);

    this.status = StatusCodes.NOT_FOUND;
  }
}

module.exports = NOT_FOUND;
