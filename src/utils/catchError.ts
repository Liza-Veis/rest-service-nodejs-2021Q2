import { Request, Response, NextFunction } from 'express';

export const catchError =
  (cb: (req: Request, res: Response, next: NextFunction) => void) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
