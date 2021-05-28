const uuid = require('uuid');

/**
 * User class
 * @property {string} id User id
 * @property {string} name User name
 * @property {string} login User login
 * @property {string} password User password
 */
class User {
  /**
   * @param {Object} config Config to create a user
   */
  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Returns user object without password
   * @static
   * @param {User} user User object
   * @returns {Object} User object without password
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
