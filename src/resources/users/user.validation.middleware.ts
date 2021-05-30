import { Request, Response, NextFunction } from 'express';
import { UserMessages } from '../../common/messages';
import * as errors from '../../errors';

const userFields = ['id', 'name', 'login', 'password'];

export const validateUser = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  const errorMessage =
    req.method === 'POST'
      ? UserMessages.creationError
      : UserMessages.updateError;
  const props = Object.keys(req.body || []);

  if (!props.length) {
    throw new errors.BAD_REQUEST(errorMessage);
  }
  if (props.some((prop) => !userFields.includes(prop))) {
    throw new errors.BAD_REQUEST(errorMessage);
  }

  next();
};
