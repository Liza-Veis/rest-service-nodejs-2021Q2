const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const validateBoard = require('./board.validation.middleware');

const asyncErrorHandler = require('../../utils/asyncErrorHandler');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const boards = await boardsService.getAll();

    res.json(boards);
  })
);

router.route('/:id').get(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getById(id);

    res.json(board);
  })
);

router.route('/').post(
  validateBoard,
  asyncErrorHandler(async (req, res) => {
    const board = await boardsService.create(new Board(req.body));

    res.status(201).json(board);
  })
);

router.route('/:id').put(
  validateBoard,
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.update(id, req.body);

    res.json(board);
  })
);

router.route('/:id').delete(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    await boardsService.remove(id);

    res.sendStatus(204);
  })
);

module.exports = router;
