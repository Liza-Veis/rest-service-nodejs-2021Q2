import { v4 } from 'uuid';

/**
 * User class
 * @property {string} id User id
 * @property {string} name User name
 * @property {string} login User login
 * @property {string} password User password
 */
export class User {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * @param {Object} config Config to create a user
   */
  constructor({
    id = v4(),
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
  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
