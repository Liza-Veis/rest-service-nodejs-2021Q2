const errors = require('../../errors');

const boardFields = ['id', 'title', 'columns'];

const validateBoard = (req, res, next) => {
  const action = req.method === 'POST' ? 'create' : 'update';
  const errorMessage = `Task entity to ${action} isn't valid`;
  const props = Object.keys(req.body || []);

  if (!props.length) {
    throw new errors.BAD_REQUEST(errorMessage);
  }
  if (props.some((prop) => !boardFields.includes(prop))) {
    throw new errors.BAD_REQUEST(errorMessage);
  }
  if (req.body?.columns && !Array.isArray(req.body.columns)) {
    throw new errors.BAD_REQUEST(errorMessage);
  }

  next();
};

module.exports = validateBoard;
