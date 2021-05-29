const DB = require('../../common/inMemoryDb');
const errors = require('../../errors');
const User = require('./user.model'); // eslint-disable-line no-unused-vars

/**
 * Users repository module
 * @module UsersRepository
 */

const GROUP = 'users';

/**
 * Returns an array of all users
 * @returns {Promise<Array<User>>} Promise object represents an array of users
 */
const getAll = async () => DB.getAllEntities(GROUP);

/**
 * Returns a user by id
 * @param {string} id user id
 * @returns {Promise<User>} Promise object represents a user
 */
const getById = async (id) => {
  const user = await DB.getEntity(GROUP, { id });

  if (!user) throw new errors.NOT_FOUND(`User with id: ${id} not found`);

  return user;
};

/**
 * Creates a user
 * @param {User} user user object
 * @returns {Promise<User>} Promise object represents a created user
 */
const create = async (user) => {
  const createdUser = await DB.createEntity(GROUP, user);

  if (!createdUser) {
    throw new errors.BAD_REQUEST(`User entity to create isn't valid`);
  }

  return createdUser;
};

/**
 * Updates a user
 * @param {string} id user id
 * @param {Object} data data to update
 * @returns {Promise<User>} Promise object represents an updated user
 */
const update = async (id, data) => {
  const user = await DB.updateEntity(GROUP, { id }, data);

  if (!user) throw new errors.BAD_REQUEST(`User entity to update isn't valid`);

  return user;
};

/**
 * Removes a user
 * @param {string} id user id
 * @returns {Promise<void>} Promise object
 */
const remove = async (id) => {
  const isRemoved = await DB.removeEntity(GROUP, { id });

  if (!isRemoved) throw new errors.NOT_FOUND(`User with id: ${id} not found`);
};

module.exports = { getAll, getById, create, update, remove };
