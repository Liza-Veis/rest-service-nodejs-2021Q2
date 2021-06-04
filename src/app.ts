import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import { logger } from './utils/appLogger';
import { errorHandler } from './utils/appErrorHandler';

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

app.use(logger.requestHandler);

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use('/boards/:boardId/tasks', taskRouter);

app.use(errorHandler);

process.on('uncaughtException', (err) => {
  logger.error(err.stack || err.toString());
  logger.finish().then(() => process.exit(1));
});

process.on('unhandledRejection', (err: Error) => {
  logger.error(err.stack || err.toString());
});

// throw new Error('Oups');
// Promise.reject(Error('oups'));
