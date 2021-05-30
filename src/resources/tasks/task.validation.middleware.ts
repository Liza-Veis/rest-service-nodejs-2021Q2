import { Request, Response, NextFunction } from 'express';
import * as errors from '../../errors';

const taskFields = [
  'id',
  'title',
  'description',
  'order',
  'userId',
  'columnId',
  'boardId',
];

export const validateTask = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
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
