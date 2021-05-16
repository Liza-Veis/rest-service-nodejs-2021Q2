const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.get('/', async (req, res) => {
  const boards = await boardsService.getAll();

  res.json(boards);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const board = await boardsService.getById(id);

    res.json(board);
  } catch {
    res.sendStatus(404);
  }
});

router.post('/', async (req, res) => {
  const board = await boardsService.create(new Board(req.body));

  res.status(201).json(board);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.update(id, req.body);

  res.json(board);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await boardsService.remove(id);

  res.sendStatus(204);
});

module.exports = router;
