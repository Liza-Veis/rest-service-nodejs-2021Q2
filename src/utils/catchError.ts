import { Request, Response, NextFunction } from 'express';

/**
 * Catches an error in an async function
 * @param {Function} cb async function
 * @returns {*} Promise object represents an async function result
 */
export const catchError =
  (cb: (req: Request, res: Response, next: NextFunction) => void) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
