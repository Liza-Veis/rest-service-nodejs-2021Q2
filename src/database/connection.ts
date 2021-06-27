import { createConnection } from 'typeorm';
import config from './ormconfig';
import { logger } from '../utils/appLogger';

export const connectToDB = async (cb: () => void): Promise<void> => {
  createConnection(config)
    .then(() => {
      logger.info('Connection to db has been established successfully');
      cb();
    })
    .catch((err) => logger.error(err));
};
