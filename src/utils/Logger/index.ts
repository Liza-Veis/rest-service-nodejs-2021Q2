import path from 'path';
import { pipeline } from 'stream';
import {
  createWriteStream,
  mkdirSync,
  existsSync,
  statSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import { DEFAULT_COLORS, DEFAULT_MAX_FILE_SIZE, LEVELS } from './config';
import { replaceAnsiColorsStream } from './replaceAnsiColorsStream';
import {
  ConsoleStreamConfig,
  FileStreamConfig,
  Streams,
  Level,
  AddStreamConfig,
  ColorsConfig,
  LoggerColors,
  Stream,
} from './types';

export class Logger {
  static readonly levels = LEVELS;

  readonly colors: LoggerColors;

  readonly maxFileSize: number;

  private streams: Streams = { info: [], error: [] };

  private static maxLevelLength: number;

  constructor({
    colors = {} as ColorsConfig,
    maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE,
  } = {}) {
    const levelColors = { ...DEFAULT_COLORS.levels, ...colors.levels };

    this.colors = { ...DEFAULT_COLORS, ...colors, levels: levelColors };
    this.maxFileSize = maxFileSizeInBytes;
    this.requestHandler = this.requestHandler.bind(this);
    Logger.maxLevelLength = Math.max(
      ...Logger.levels.map((level) => level.length)
    );
  }

  createFileStream({ levels, filePath }: FileStreamConfig): void {
    const transformStream = replaceAnsiColorsStream();
    const dirPath = path.dirname(filePath);
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }
    const writeStream = createWriteStream(filePath, { flags: 'a+' });

    transformStream.on('data', (chunk: Buffer) => {
      const fileSize = statSync(filePath).size;
      if (fileSize + chunk.length > this.maxFileSize) {
        this.rotateFile(filePath, chunk.length);
      }
    });

    const fileStream = pipeline(transformStream, writeStream, (err) => {
      if (err) process.stderr.write(`Unable to log: ${err.message}\n`);
    });
    const write = (log: string) => {
      transformStream.write(log);
    };
    const onFinish = (callback: () => void) => {
      fileStream.on('finish', callback);
    };
    const end = () => {
      fileStream.end();
    };

    const stream = { write, onFinish, end };

    this.addStream({ levels, stream });
  }

  createConsoleStream({ levels }: ConsoleStreamConfig): void {
    let finishCallback: () => void;
    const onFinish = (callback: () => void) => {
      finishCallback = callback;
    };
    const end = () => {
      if (finishCallback) finishCallback();
    };
    const write = (level: Level, log: string) => {
      if (level === 'error') {
        process.stderr.write(log);
      } else {
        process.stdout.write(log);
      }
    };

    const stream = (level: Level) => ({
      write: (log: string) => write(level, log),
      onFinish,
      end,
    });

    this.addStream({ levels, stream });
  }

  requestHandler(req: Request, res: Response, next: NextFunction): void {
    const start = process.hrtime.bigint();

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Logger.getDurationInMs(start, process.hrtime.bigint());
      const log = this.getRequestLog(req, duration, statusCode);

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

  async finish(): Promise<void> {
    const streams = [
      ...new Set(([] as Stream[]).concat(...Object.values(this.streams))),
    ];

    await Promise.all(
      streams.map(
        (stream) =>
          new Promise((resolve) => {
            stream.onFinish(() => resolve(''));
            stream.end();
          })
      )
    );
  }

  private logToLevel(level: Level, log: string): void {
    const streams = this.streams[level];
    const metadata = this.getMetadata(new Date(), level);

    streams.forEach((stream) => {
      stream.write(`${metadata} ${log}\n`);
    });
  }

  private addStream({ levels, stream }: AddStreamConfig): void {
    levels.forEach((level) => {
      this.streams[level].push(
        typeof stream === 'function' ? stream(level) : stream
      );
    });
  }

  private getMetadata(date: Date, level: Level) {
    const spaces = ' '.repeat(
      Math.max(Logger.maxLevelLength - level.length, 0)
    );
    const levelString = this.getColorString(level, `${level}:`) + spaces;
    const formattedDate = Logger.getFormattedDate(date);
    const dateString = this.getColorString('date', `[${formattedDate}]`);

    return `${dateString} ${levelString}`;
  }

  private getRequestLog(req: Request, duration: number, status: number) {
    const { originalUrl, method, query, body } = req;
    const stringQuery = JSON.stringify(query);
    const stringBody = JSON.stringify(body);
    const methodString = this.getColorString('method', `${method}:`);
    const statusString = this.getColorString('status', status);
    const durationString = this.getColorString('duration', `(${duration} ms)`);

    return `${methodString}${originalUrl} ${statusString} ${durationString} query:${stringQuery} body:${stringBody}`;
  }

  private getColorString(
    type: keyof ColorsConfig | Level,
    value: string | number
  ): string {
    if (type === 'status' && typeof this.colors.status === 'function') {
      return chalk`{${this.colors.status(+value)} ${value}}`;
    }
    if (Logger.levels.includes(type as Level)) {
      return chalk`{${this.colors.levels[type as Level]} ${value}}`;
    }

    return chalk`{${this.colors[type as keyof ColorsConfig]} ${value}}`;
  }

  private rotateFile(filePath: string, chunkSize: number) {
    let content = readFileSync(filePath).toString();

    while (Buffer.byteLength(content) + chunkSize > this.maxFileSize) {
      content = content.split('\n').slice(1).join('\n');
    }

    writeFileSync(filePath, content);
  }

  private static getDurationInMs(startInNs: bigint, endInNs: bigint): number {
    const NS_TO_MS = BigInt(1e6);
    const durationInNs = endInNs - startInNs;

    return Number(durationInNs / NS_TO_MS);
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
}
