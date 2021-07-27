import Joi from 'joi';

export const BoardSchema = Joi.object({
  id: Joi.string().guid(),

  title: Joi.string(),

  columns: Joi.array().items(
    Joi.object({
      id: Joi.string().guid(),

      title: Joi.string(),

      order: Joi.number().min(0),
    })
  ),
});
