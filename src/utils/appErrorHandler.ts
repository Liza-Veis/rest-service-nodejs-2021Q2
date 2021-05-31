import { ErrorRequestHandler } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const appErrorHandler = ((err, _, res, next) => {
  if (err?.status) {
    res.status(err.status).send(err.message);
  } else if (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }

  next();
}) as ErrorRequestHandler;
