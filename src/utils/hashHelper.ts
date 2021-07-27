import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../common/config';

export const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, SALT_ROUNDS);

export const checkPassword = async (
  password: string,
  hash: string
): Promise<boolean> => bcrypt.compare(password, hash);
