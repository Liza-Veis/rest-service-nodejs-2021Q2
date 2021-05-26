const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();

const Board = require('./board.model');
const boardsService = require('./board.service');
const validateBoard = require('./board.validation.middleware');

const catchError = require('../../utils/catchError');

router.route('/').get(
  catchError(async (req, res) => {
    const boards = await boardsService.getAll();

    res.json(boards);
  })
);

router.route('/:id').get(
  catchError(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getById(id);

    res.json(board);
  })
);

router.route('/').post(
  validateBoard,
  catchError(async (req, res) => {
    const board = await boardsService.create(new Board(req.body));

    res.status(StatusCodes.CREATED).json(board);
  })
);

router.route('/:id').put(
  validateBoard,
  catchError(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.update(id, req.body);

    res.json(board);
  })
);

router.route('/:id').delete(
  catchError(async (req, res) => {
    const { id } = req.params;
    await boardsService.remove(id);

    res.sendStatus(StatusCodes.NO_CONTENT);
  })
);

module.exports = router;
