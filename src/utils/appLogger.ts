import { Logger } from './Logger';

export const logger = new Logger({
  maxFileSizeInBytes: 5000000, // 5MB
});

logger.createFileStream({
  levels: ['http', 'error'],
  filePath: './logs/combined.log',
});
logger.createFileStream({ levels: ['error'], filePath: './logs/error.log' });
logger.createConsoleStream();
