import { StatusCodes } from 'http-status-codes';
import { Router, Request, Response } from 'express';
import * as boardsService from './board.service';
import { BoardSchema } from '../../schemas/board.schema';
import { validate } from '../../middlewares/validation.middleware';
import { catchError } from '../../utils/catchError';

export const router = Router();
const validationMiddleware = validate(BoardSchema);

router.route('/').get(
  catchError(async (_req: Request, res: Response) => {
    const boards = await boardsService.getAll();

    res.json(boards);
  })
);

router.route('/:id').get(
  catchError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const board = await boardsService.getById(id!);

    res.json(board);
  })
);

router.route('/').post(
  validationMiddleware,
  catchError(async (req: Request, res: Response) => {
    const board = await boardsService.create(req.body);

    res.status(StatusCodes.CREATED).json(board);
  })
);

router.route('/:id').put(
  validationMiddleware,
  catchError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const board = await boardsService.update(id!, req.body);

    res.json(board);
  })
);

router.route('/:id').delete(
  catchError(async (req: Request, res: Response) => {
    const { id } = req.params;
    await boardsService.remove(id!);

    res.sendStatus(StatusCodes.NO_CONTENT);
  })
);
