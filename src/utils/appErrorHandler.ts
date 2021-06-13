import { ErrorRequestHandler } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { logger } from './appLogger';

export const errorHandler = ((err, _, res, next) => {
  const log = err.status ? err.message : err.stack || err;

  res.on('finish', () => logger.error(log));

  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }

  next();
}) as ErrorRequestHandler;
