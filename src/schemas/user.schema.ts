import Joi from 'joi';

export const UserSchema = Joi.object({
  id: Joi.string().guid(),

  name: Joi.string().min(3),

  login: Joi.string().min(3).required(),

  password: Joi.string().min(3).required(),
});
