import chalk from 'chalk';

export type Color = typeof chalk.Color;

export type Level = 'info' | 'error' | 'http';

export type Stream = {
  write: (log: string) => void;
  onFinish: (callback: () => void) => void;
  end: () => void;
};

export type Streams = { [level in Level]: Stream[] };

export type LoggerColors = {
  levels: { [level in Level]: Color };
  date: Color;
  duration: Color;
  method: Color;
  status: Color | ((status: number) => Color);
};

export type ColorsConfig = Partial<Omit<LoggerColors, 'levels'>> & {
  levels?: { [level in Level]?: Color };
};

export type AddStreamConfig = {
  levels?: Level[];
  stream: Stream | ((level: Level) => Stream);
};

export type FileStreamConfig = {
  levels?: Level[];
  filePath: string;
};

export type ConsoleStreamConfig = { levels?: Level[] };
