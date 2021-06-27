import { PORT } from './common/config';
import { app } from './app';
import { connectToDB } from './database/connection';
import { logger } from './utils/appLogger';

connectToDB(() =>
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  )
);
