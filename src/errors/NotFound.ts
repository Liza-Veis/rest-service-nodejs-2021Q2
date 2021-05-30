import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class NotFound extends Error {
  status: number;

  constructor(message = ReasonPhrases.NOT_FOUND as string) {
    super(message);

    this.status = StatusCodes.NOT_FOUND;
  }
}
