const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use('/boards/:boardId/tasks', taskRouter);

app.use((err, req, res, next) => {
  if (err?.status) {
    res.status(err.status).send(err.message);
  } else if (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }

  next();
});

module.exports = app;
