import { ErrorRequestHandler } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { logger } from './appLogger';

export const errorHandler = ((err, _, res, next) => {
  let log = err;

  if (err.status) {
    res.status(err.status).send(err.message);

    log = err.message;
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);

    if (err.stack) log += `\n${err.stack.split('\n').slice(1, 4).join('\n')}`;
  }

  res.on('finish', () => logger.error(log));

  next();
}) as ErrorRequestHandler;
