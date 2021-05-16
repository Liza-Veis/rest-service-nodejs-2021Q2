const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

const asyncErrorHandler = require('../../utils/asyncErrorHandler');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getBoardTasks(boardId);

    res.json(tasks);
  })
);

router.route('/:id').get(
  asyncErrorHandler(async (req, res) => {
    const { boardId, id } = req.params;
    const task = await tasksService.getById(boardId, id);

    res.json(task);
  })
);

router.route('/').post(
  asyncErrorHandler(async (req, res) => {
    const { boardId } = req.params;
    const task = await tasksService.create(new Task({ ...req.body, boardId }));

    res.status(201).json(task);
  })
);

router.route('/:id').put(
  asyncErrorHandler(async (req, res) => {
    const { boardId, id } = req.params;
    const task = await tasksService.update(boardId, id, req.body);

    res.json(task);
  })
);

router.route('/:id').delete(
  asyncErrorHandler(async (req, res) => {
    const { boardId, id } = req.params;
    await tasksService.remove(boardId, id);

    res.sendStatus(204);
  })
);

module.exports = router;
