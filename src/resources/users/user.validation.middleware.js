const errors = require('../../errors');

const userFields = ['id', 'name', 'login', 'password'];

const validateUser = (req, res, next) => {
  const action = req.method === 'POST' ? 'create' : 'update';
  const errorMessage = `User entity to ${action} isn't valid`;
  const props = Object.keys(req.body || []);

  if (!props.length) {
    throw new errors.BAD_REQUEST(errorMessage);
  }
  if (props.some((prop) => !userFields.includes(prop))) {
    throw new errors.BAD_REQUEST(errorMessage);
  }

  next();
};

module.exports = validateUser;
