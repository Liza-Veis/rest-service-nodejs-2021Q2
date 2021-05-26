const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();

const User = require('./user.model');
const usersService = require('./user.service');
const validateUser = require('./user.validation.middleware');

const catchError = require('../../utils/catchError');

router.route('/').get(
  catchError(async (req, res) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchError(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getById(id);

    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  validateUser,
  catchError(async (req, res) => {
    const user = await usersService.create(new User(req.body));

    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  validateUser,
  catchError(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.update(id, req.body);

    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  catchError(async (req, res) => {
    const { id } = req.params;
    await usersService.remove(id);

    res.sendStatus(StatusCodes.NO_CONTENT);
  })
);

module.exports = router;
