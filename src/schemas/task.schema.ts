import Joi from 'joi';

export const TaskSchema = Joi.object({
  id: Joi.string().guid(),

  title: Joi.string(),

  description: Joi.string(),

  order: Joi.number().min(0),

  boardId: Joi.string().guid().allow(null),

  userId: Joi.string().guid().allow(null),

  columnId: Joi.string().guid().allow(null),
});
