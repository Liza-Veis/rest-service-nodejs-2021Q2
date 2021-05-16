const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const validateUser = require('./user.validation.middleware');

const asyncErrorHandler = require('../../utils/asyncErrorHandler');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getById(id);

    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  validateUser,
  asyncErrorHandler(async (req, res) => {
    const user = await usersService.create(new User(req.body));

    res.status(201).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  validateUser,
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.update(id, req.body);

    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    await usersService.remove(id);

    res.sendStatus(204);
  })
);

module.exports = router;
