const { StatusCodes } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });

const Task = require('./task.model');
const tasksService = require('./task.service');
const validateTask = require('./task.validation.middleware');

const catchError = require('../../utils/catchError');

router.route('/').get(
  catchError(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);

    res.json(tasks);
  })
);

router.route('/:id').get(
  catchError(async (req, res) => {
    const { boardId, id } = req.params;
    const task = await tasksService.getById(boardId, id);

    res.json(task);
  })
);

router.route('/').post(
  validateTask,
  catchError(async (req, res) => {
    const { boardId } = req.params;
    const task = await tasksService.create(new Task({ ...req.body, boardId }));

    res.status(StatusCodes.CREATED).json(task);
  })
);

router.route('/:id').put(
  validateTask,
  catchError(async (req, res) => {
    const { boardId, id } = req.params;
    const task = await tasksService.update(boardId, id, req.body);

    res.json(task);
  })
);

router.route('/:id').delete(
  catchError(async (req, res) => {
    const { boardId, id } = req.params;
    await tasksService.remove(boardId, id);

    res.sendStatus(StatusCodes.NO_CONTENT);
  })
);

module.exports = router;
