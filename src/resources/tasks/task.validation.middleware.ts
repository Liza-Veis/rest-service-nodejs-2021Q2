import { Request, Response, NextFunction } from 'express';
import { TaskMessage } from '../../common/messages';
import { errors } from '../../errors';

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
    req.method === 'POST' ? TaskMessage.creationError : TaskMessage.updateError;
  const props = Object.keys(req.body || []);

  if (!props.length) {
    throw new errors.BAD_REQUEST(errorMessage);
  }
  if (props.some((prop) => !taskFields.includes(prop))) {
    throw new errors.BAD_REQUEST(errorMessage);
  }

  next();
};
