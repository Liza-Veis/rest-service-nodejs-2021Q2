import StatusCodes from 'http-status-codes';

export class NotFound extends Error {
  status: number;

  constructor(message = 'Not Found') {
    super(message);

    this.status = StatusCodes.NOT_FOUND;
  }
}
