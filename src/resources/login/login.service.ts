import jwt from 'jsonwebtoken';
import * as userService from '../users/user.service';
import { errors } from '../../errors';
import { LoginMessage } from '../../common/messages';
import { checkPassword } from '../../utils/hashHelper';
import { JWT_SECRET_KEY } from '../../common/config';

export const signToken = async (
  login: string,
  password: string
): Promise<string> => {
  const user = await userService.getByProps({ login }).catch(() => {
    throw new errors.FORBIDDEN(LoginMessage.loginError);
  });

  if (!user) {
    throw new errors.FORBIDDEN(LoginMessage.loginError);
  }

  const { id, password: hashedPassword } = user;
  const isRightPassword = await checkPassword(password, hashedPassword);

  if (isRightPassword) {
    return jwt.sign({ id, login }, JWT_SECRET_KEY, {
      expiresIn: '10m',
    });
  }

  throw new errors.FORBIDDEN(LoginMessage.loginError);
};
