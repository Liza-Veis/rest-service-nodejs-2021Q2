import { ConnectionOptions } from 'typeorm';
import { POSTGRES } from '../common/config';

const {
  HOST: host,
  PORT: port,
  USER: username,
  PASSWORD: password,
  DB: database,
} = POSTGRES;

export const config: ConnectionOptions = {
  type: 'postgres',
  synchronize: true,
  host,
  port,
  username,
  password,
  database,
};
