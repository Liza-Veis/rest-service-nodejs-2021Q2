import { Request, Response, NextFunction } from 'express';
import { TaskMessages } from '../../common/messages';
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
  _res: Response,
  next: NextFunction
): void => {
  const errorMessage =
    req.method === 'POST'
      ? TaskMessages.creationError
      : TaskMessages.updateError;
  const props = Object.keys(req.body || []);

  if (!props.length) {
    throw new errors.BAD_REQUEST(errorMessage);
  }
  if (props.some((prop) => !taskFields.includes(prop))) {
    throw new errors.BAD_REQUEST(errorMessage);
  }

  next();
};
