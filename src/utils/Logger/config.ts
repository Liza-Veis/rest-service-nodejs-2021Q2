import { Level, Color, LoggerColors } from './types';

const getStatusColor = (status: number): Color => {
  if (status >= 500) return 'red';
  if (status >= 400) return 'yellow';
  if (status >= 300) return 'cyan';
  return 'green';
};

export const DEFAULT_COLORS: LoggerColors = {
  levels: { info: 'blue', error: 'red' },
  date: 'cyan',
  duration: 'magenta',
  method: 'yellow',
  status: getStatusColor,
};

export const DEFAULT_MAX_FILE_SIZE = 10000000; // 10MB

export const LEVELS: Level[] = ['info', 'error'];
