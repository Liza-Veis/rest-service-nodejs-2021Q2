import { Request, Response, NextFunction } from 'express';
import { BoardMessages } from '../../common/messages';
import * as errors from '../../errors';
import { Column } from './column.model';

const boardFields = ['id', 'title', 'columns'];
const columnFields = ['id', 'title', 'order'];

export const validateBoard = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const errorMessage =
    req.method === 'POST'
      ? BoardMessages.creationError
      : BoardMessages.updateError;
  const props = Object.keys(req.body || []);

  if (!props.length) {
    throw new errors.BAD_REQUEST(errorMessage);
  }
  if (props.some((prop) => !boardFields.includes(prop))) {
    throw new errors.BAD_REQUEST(errorMessage);
  }
  if (req.body?.columns) {
    if (!Array.isArray(req.body.columns)) {
      throw new errors.BAD_REQUEST(errorMessage);
    }

    const isValidColumns = req.body.columns.every(
      (column: Partial<Column>) =>
        typeof column === 'object' &&
        Object.keys(column).every((prop) => columnFields.includes(prop))
    );

    if (!isValidColumns) {
      throw new errors.BAD_REQUEST(errorMessage);
    }
  }

  next();
};
