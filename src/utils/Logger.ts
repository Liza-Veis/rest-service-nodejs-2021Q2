import path from 'path';
import { createWriteStream, WriteStream, mkdirSync, existsSync } from 'fs';
import { Request, Response, NextFunction } from 'express';

type Level = 'info' | 'error';

type ConsoleStream = {
  write: (data: string) => void;
};

type Stream = WriteStream | ConsoleStream;

type Streams = { [level in Level]: Stream[] };

type AddStreamConfig = {
  levels: Level[];
  stream: Stream | ((level: Level) => Stream);
};

type FileStreamConfig = {
  levels: Level[];
  filePath: string;
};

type ConsoleStreamConfig = {
  levels: Level[];
};

export class Logger {
  private streams: Streams = { info: [], error: [] };

  constructor() {
    this.requestHandler = this.requestHandler.bind(this);
  }

  createFileStream({ levels, filePath }: FileStreamConfig): void {
    const dirPath = path.dirname(filePath);
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }
    const stream = createWriteStream(filePath, { flags: 'a+' });

    this.addStream({ levels, stream });

    stream.on('error', (err) => {
      process.stderr.write(`Unable to log: ${err.message}\n`);
    });
  }

  createConsoleStream({ levels }: ConsoleStreamConfig): void {
    const write = (log: string, level: Level) =>
      level === 'error' ? process.stderr.write(log) : process.stdout.write(log);

    const stream = (level: Level) => ({
      write: (log: string) => write(log, level),
    });

    this.addStream({ levels, stream });
  }

  requestHandler(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, query, body } = req;
    const start = process.hrtime.bigint();
    const stringQuery = JSON.stringify(query);
    const stringBody = JSON.stringify(body);

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Logger.getDurationInMs(start, process.hrtime.bigint());
      const log = `${method}:${originalUrl} ${statusCode} (${duration} ms) query:${stringQuery} body:${stringBody}`;

      this.info(log);
    });

    next();
  }

  info(log: string): void {
    this.logToLevel('info', log);
  }

  error(log: string): void {
    this.logToLevel('error', log);
  }

  private logToLevel(level: Level, log: string): void {
    const date = Logger.getFormattedDate(new Date());

    this.streams[level].forEach((stream) => {
      stream.write(`[${date}] - ${level}: ${log}\n`);
    });
  }

  private addStream({ levels, stream }: AddStreamConfig): void {
    levels.forEach((level) => {
      this.streams[level].push(
        typeof stream === 'function' ? stream(level) : stream
      );
    });
  }

  private static getFormattedDate(date: Date): string {
    const addZero = (n: number) => (n < 10 ? `0${n}` : n);

    const year = date.getFullYear();
    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDate());
    const hours = addZero(date.getHours());
    const minutes = addZero(date.getMinutes());
    const seconds = addZero(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private static getDurationInMs(startInNs: bigint, endInNs: bigint): number {
    const NS_TO_MS = BigInt(1e6);
    const durationInNs = endInNs - startInNs;

    return Number(durationInNs / NS_TO_MS);
  }
}
