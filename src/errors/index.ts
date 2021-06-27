import { NotFound } from './NotFound';
import { BadRequest } from './BadRequest';
import { Forbidden } from './Forbidden';
import { Unauthorized } from './Unauthorized';

export const errors = {
  NOT_FOUND: NotFound,
  BAD_REQUEST: BadRequest,
  FORBIDDEN: Forbidden,
  UNAUTHORIZED: Unauthorized,
};
