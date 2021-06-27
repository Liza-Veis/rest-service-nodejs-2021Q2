import { Transform } from 'stream';

const pattern = [
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
].join('|');

const ansiRegex = new RegExp(pattern, 'g');

export const replaceAnsiColorsStream = (): Transform =>
  new Transform({
    transform(chunk, _encoding, callback) {
      this.push(chunk.toString().replace(ansiRegex, ''));

      callback();
    },
  });
