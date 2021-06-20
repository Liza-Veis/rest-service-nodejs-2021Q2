import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { POSTGRES } from '../common/config';

const {
  HOST: host,
  PORT: port,
  USER: username,
  PASSWORD: password,
  DB: database,
} = POSTGRES;

const config: ConnectionOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: [path.resolve(__dirname, '../entities/*.ts')],
  migrations: [path.resolve(__dirname, '../migrations/*.ts')],
  migrationsRun: true,
  cli: {
    migrationsDir: './src/migrations',
  },
};

export default config;
