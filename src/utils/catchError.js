/**
 * Catches an error in an async function
 * @param {Function} cb async function
 * @returns {*} Promise object represents an async function result
 */
const catchError = (cb) => async (req, res, next) => {
  try {
    return await cb(req, res, next);
  } catch (err) {
    return next(err);
  }
};

module.exports = catchError;
