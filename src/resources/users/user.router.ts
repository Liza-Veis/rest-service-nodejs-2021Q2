import { StatusCodes } from 'http-status-codes';
import { Router, Request, Response } from 'express';

import { User } from '../../entities/User';
import * as usersService from './user.service';
import { validateUser } from './user.validation.middleware';
import { catchError } from '../../utils/catchError';

export const router = Router();

router.route('/').get(
  catchError(async (_req: Request, res: Response) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await usersService.getById(id!);

    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  validateUser,
  catchError(async (req: Request, res: Response) => {
    const user = await usersService.create(req.body);

    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  validateUser,
  catchError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await usersService.update(id!, req.body);

    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  catchError(async (req: Request, res: Response) => {
    const { id } = req.params;
    await usersService.remove(id!);

    res.sendStatus(StatusCodes.NO_CONTENT);
  })
);
