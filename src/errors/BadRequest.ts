import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class BadRequest extends Error {
  status: number;

  constructor(message: string = ReasonPhrases.BAD_REQUEST) {
    super(message);

    this.status = StatusCodes.BAD_REQUEST;
  }
}
