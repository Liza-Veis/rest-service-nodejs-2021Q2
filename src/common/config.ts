import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const { PORT, NODE_ENV, JWT_SECRET_KEY } = process.env;

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;
export const POSTGRES = {
  HOST: POSTGRES_HOST,
  PORT: Number(POSTGRES_PORT),
  USER: POSTGRES_USER,
  PASSWORD: POSTGRES_PASSWORD,
  DB: POSTGRES_DB,
};

const { AUTH_MODE: isAuthMode } = process.env;
export const AUTH_MODE = !!isAuthMode;
