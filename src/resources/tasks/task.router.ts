import { StatusCodes } from 'http-status-codes';
import { Router, Request, Response } from 'express';
import * as tasksService from './task.service';
import { TaskSchema } from '../../schemas/task.schema';
import { validate } from '../../middlewares/validation.middleware';
import { catchError } from '../../utils/catchError';

export const router = Router({ mergeParams: true });
const validationMiddleware = validate(TaskSchema);

router.route('/').get(
  catchError(async (req: Request, res: Response) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId!);

    res.json(tasks);
  })
);

router.route('/:id').get(
  catchError(async (req: Request, res: Response) => {
    const { boardId, id } = req.params;
    const task = await tasksService.getById(boardId!, id!);

    res.json(task);
  })
);

router.route('/').post(
  validationMiddleware,
  catchError(async (req: Request, res: Response) => {
    const { boardId } = req.params;
    const task = await tasksService.create({ ...req.body, boardId });

    res.status(StatusCodes.CREATED).json(task);
  })
);

router.route('/:id').put(
  validationMiddleware,
  catchError(async (req: Request, res: Response) => {
    const { boardId, id } = req.params;
    const task = await tasksService.update(boardId!, id!, req.body);

    res.json(task);
  })
);

router.route('/:id').delete(
  catchError(async (req: Request, res: Response) => {
    const { boardId, id } = req.params;
    await tasksService.remove(boardId!, id!);

    res.sendStatus(StatusCodes.NO_CONTENT);
  })
);
