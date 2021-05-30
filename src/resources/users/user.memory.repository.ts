import * as DB from '../../common/inMemoryDb';
import * as errors from '../../errors';
import { User } from './user.model';

/**
 * Users repository module
 * @module UsersRepository
 */

const GROUP = 'users';

/**
 * Returns an array of all users
 * @returns {Promise<Array<User>>} Promise object represents an array of users
 */
export const getAll = async (): Promise<User[]> => DB.getAllEntities(GROUP)!;

/**
 * Returns a user by id
 * @param {string} id user id
 * @returns {Promise<User>} Promise object represents a user
 */
export const getById = async (id: string): Promise<User> => {
  const user: User | null = await DB.getEntity(GROUP, { id });

  if (!user) throw new errors.NOT_FOUND(`User with id: ${id} not found`);

  return user;
};

/**
 * Creates a user
 * @param {User} user user object
 * @returns {Promise<User>} Promise object represents a created user
 */
export const create = async (user: User): Promise<User> => {
  const createdUser = await DB.createEntity(GROUP, user);

  if (!createdUser)
    throw new errors.BAD_REQUEST(`User entity to create isn't valid`);

  return createdUser;
};

/**
 * Updates a user
 * @param {string} id user id
 * @param {Object} data data to update
 * @returns {Promise<User>} Promise object represents an updated user
 */
export const update = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  const user = await DB.updateEntity(GROUP, { id }, data);

  if (!user) throw new errors.BAD_REQUEST(`User entity to update isn't valid`);

  return user;
};

/**
 * Removes a user
 * @param {string} id user id
 * @returns {Promise<void>} Promise object
 */
export const remove = async (id: string): Promise<void> => {
  const isRemoved = await DB.removeEntity(GROUP, { id });

  if (!isRemoved) throw new errors.NOT_FOUND(`User with id: ${id} not found`);
};
