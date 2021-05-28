const errors = require('../../errors');

const userFields = ['id', 'name', 'login', 'password'];

/**
 * Users validation middleware module
 * @module UsersValidation
 */

/**
 * Validates a request body when creating and updating a user
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Object} next Express next middleware function
 * @returns {void}
 */
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
