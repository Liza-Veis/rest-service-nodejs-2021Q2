import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import { errors } from './errors';
import { RouteMessage } from './common/messages';
import { logger } from './utils/appLogger';
import { handleError } from './middlewares/handle-error.middleware';
import { authorize } from './middlewares/authorization.middleware';

import { router as loginRouter } from './resources/login/login.router';
import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';

export const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(logger.requestHandler);

app.use(authorize);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use('/boards/:boardId/tasks', taskRouter);

app.use('*', (req) => {
  const { method, originalUrl } = req;
  throw new errors.NOT_FOUND(RouteMessage.getNonExistent(method, originalUrl));
});

app.use(handleError);

process.on('uncaughtException', (err) => {
  logger.error(err.stack || err.toString());
  logger.finish().then(() => process.exit(1));
});

process.on('unhandledRejection', (err: Error) => {
  logger.error(err.stack || err.toString());
});
