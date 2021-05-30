import StatusCodes from 'http-status-codes';

export class BadRequest extends Error {
  status: number;

  constructor(message = 'Bad Request') {
    super(message);

    this.status = StatusCodes.BAD_REQUEST;
  }
}
