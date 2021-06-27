import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { match } from 'node-match-path';
import { JWT_SECRET_KEY } from '../common/config';
import { WHITE_ROUTES } from '../common/constants';
import { LoginMessage } from '../common/messages';
import { errors } from '../errors';

export const authorize: RequestHandler = (req, _res, next) => {
  if (WHITE_ROUTES.some((route) => match(route, req.path).matches)) {
    return next();
  }

  const authHeader = req.header('Authorization');

  if (!authHeader) {
    throw new errors.UNAUTHORIZED(LoginMessage.authorizeError);
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    throw new errors.UNAUTHORIZED(LoginMessage.authorizeError);
  }

  try {
    jwt.verify(token, JWT_SECRET_KEY);
  } catch {
    throw new errors.UNAUTHORIZED(LoginMessage.authorizeError);
  }

  return next();
};
