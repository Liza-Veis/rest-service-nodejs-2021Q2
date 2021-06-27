import { Request, Response, NextFunction } from 'express';
import { UserMessage } from '../../common/messages';
import { errors } from '../../errors';

const userFields = ['id', 'name', 'login', 'password'];

export const validateUser = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const errorMessage =
    req.method === 'POST' ? UserMessage.creationError : UserMessage.updateError;
  const props = Object.keys(req.body || []);

  if (!props.length) {
    throw new errors.BAD_REQUEST(errorMessage);
  }
  if (props.some((prop) => !userFields.includes(prop))) {
    throw new errors.BAD_REQUEST(errorMessage);
  }

  next();
};
