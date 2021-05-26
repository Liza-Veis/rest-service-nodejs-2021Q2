const { StatusCodes, ReasonPhrases } = require('http-status-codes');

class BAD_REQUEST extends Error {
  constructor(message = ReasonPhrases.BAD_REQUEST) {
    super(message);

    this.status = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BAD_REQUEST;
