import { Request, Response, NextFunction } from 'express';
import * as errors from '../../errors';

/**
 * Users validation middleware module
 * @module UsersValidation
 */

const userFields = ['id', 'name', 'login', 'password'];

/**
 * Validates a request body when creating and updating a user
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Object} next Express next middleware function
 * @returns {void}
 */
export const validateUser = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  const action = req.method === 'POST' ? 'create' : 'update';
  const errorMessage = `User entity to ${action} isn't valid`;
  const props = Object.keys(req.body || []);

  if (!props.length) {
    throw new errors.BAD_REQUEST(errorMessage);
  }
  if (props.some((prop) => !userFields.includes(prop))) {
    throw new errors.BAD_REQUEST(errorMessage);
  }

  next();
};
