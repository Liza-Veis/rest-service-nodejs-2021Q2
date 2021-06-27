import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const { PORT, NODE_ENV } = process.env;

const { AUTH_MODE: isAuthMode } = process.env;
export const AUTH_MODE = !!isAuthMode;

const { SALT_ROUNDS: saltRounds } = process.env;
export const SALT_ROUNDS = saltRounds ? Number(saltRounds) : 10;

const { JWT_SECRET_KEY: jwtSecretKey } = process.env;
export const JWT_SECRET_KEY: Secret = jwtSecretKey || '';

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
