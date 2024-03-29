import Joi from 'joi';

export const LoginSchema = Joi.object({
  login: Joi.string().min(3).max(30).required(),

  password: Joi.string().min(3).max(30).required(),
});
