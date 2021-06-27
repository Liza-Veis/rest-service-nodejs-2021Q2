import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class Forbidden extends Error {
  status: number;

  constructor(message: string = ReasonPhrases.FORBIDDEN) {
    super(message);

    this.status = StatusCodes.FORBIDDEN;
  }
}
