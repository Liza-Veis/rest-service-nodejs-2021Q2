import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class Unauthorized extends Error {
  status: number;

  constructor(message: string = ReasonPhrases.UNAUTHORIZED) {
    super(message);

    this.status = StatusCodes.UNAUTHORIZED;
  }
}
