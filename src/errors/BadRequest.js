class BAD_REQUEST extends Error {
  constructor(message = 'Bad Request') {
    super(message);

    this.status = 400;
  }
}

module.exports = BAD_REQUEST;
