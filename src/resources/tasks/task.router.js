const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.get('/', async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getBoardTasks(boardId);

  res.json(tasks);
});

router.get('/:id', async (req, res) => {
  const { boardId, id } = req.params;
  try {
    const task = await tasksService.getById(boardId, id);

    res.json(task);
  } catch {
    res.sendStatus(404);
  }
});

router.post('/', async (req, res) => {
  const { boardId } = req.params;
  const task = await tasksService.create(new Task({ ...req.body, boardId }));

  res.status(201).json(task);
});

router.put('/:id', async (req, res) => {
  const { boardId, id } = req.params;
  const task = await tasksService.update(boardId, id, req.body);

  res.json(task);
});

router.delete('/:id', async (req, res) => {
  const { boardId, id } = req.params;
  await tasksService.remove(boardId, id);

  res.sendStatus(204);
});

module.exports = router;
