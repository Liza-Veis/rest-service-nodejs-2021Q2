import express, { ErrorRequestHandler } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';

export const app = express();
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

app.use(((err, _, res, next) => {
  if (err?.status) {
    res.status(err.status).send(err.message);
  } else if (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }

  next();
}) as ErrorRequestHandler);
