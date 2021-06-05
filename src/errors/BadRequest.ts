import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class BadRequest extends Error {
  status: number;

  constructor(message = ReasonPhrases.BAD_REQUEST as string) {
    super(message);

    this.status = StatusCodes.BAD_REQUEST;
  }
}
