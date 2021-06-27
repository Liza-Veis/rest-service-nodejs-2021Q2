import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class NotFound extends Error {
  status: number;

  constructor(message: string = ReasonPhrases.NOT_FOUND) {
    super(message);

    this.status = StatusCodes.NOT_FOUND;
  }
}
