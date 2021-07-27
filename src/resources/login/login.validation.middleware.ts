import { Request, Response, NextFunction } from 'express';
import { LoginMessage } from '../../common/messages';
import { errors } from '../../errors';

const loginFields = ['login', 'password'];

export const validateLogin = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const props = Object.keys(req.body || []);

  if (!props.length || loginFields.length !== props.length) {
    throw new errors.BAD_REQUEST(LoginMessage.validationError);
  }
  if (loginFields.some((prop) => !loginFields.includes(prop))) {
    throw new errors.BAD_REQUEST(LoginMessage.validationError);
  }

  next();
};
