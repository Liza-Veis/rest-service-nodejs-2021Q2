import { Request, Response, NextFunction } from 'express';
import * as errors from '../../errors';
import { Column } from './column.model';

/**
 * Boards validation middleware module
 * @module BoardsValidation
 */

const boardFields = ['id', 'title', 'columns'];
const columnFields = ['id', 'title', 'order'];

/**
 * Validates a request body when creating and updating a board
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Object} next Express next middleware function
 * @returns {void}
 */
export const validateBoard = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const action = req.method === 'POST' ? 'create' : 'update';
  const errorMessage = `Board entity to ${action} isn't valid`;
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
