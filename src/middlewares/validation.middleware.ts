import { RequestHandler } from 'express';
import { ObjectSchema } from 'joi';
import { ValidationMessage } from '../common/messages';
import { errors } from '../errors';

export const validate =
  (schema: ObjectSchema): RequestHandler =>
  (req, _res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const { message } = error;

      throw new errors.BAD_REQUEST(ValidationMessage.getErrorMessage(message));
    }

    next();
  };
