import { Request, Response, NextFunction } from 'express';
import * as errors from '../../errors';

/**
 * Tasks validation middleware module
 * @module TasksValidation
 */

const taskFields = [
  'id',
  'title',
  'description',
  'order',
  'userId',
  'columnId',
  'boardId',
];

/**
 * Validates a request body when creating and updating a task
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Object} next Express next middleware function
 * @returns {void}
 */
export const validateTask = (req: Request, _: Response, next: NextFunction) => {
  const action = req.method === 'POST' ? 'create' : 'update';
  const errorMessage = `Task entity to ${action} isn't valid`;
  const props = Object.keys(req.body || []);

  if (!props.length) {
    throw new errors.BAD_REQUEST(errorMessage);
  }
  if (props.some((prop) => !taskFields.includes(prop))) {
    throw new errors.BAD_REQUEST(errorMessage);
  }

  next();
};
