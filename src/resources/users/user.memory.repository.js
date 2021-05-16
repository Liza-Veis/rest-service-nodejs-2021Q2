const DB = require('../../common/inMemoryDb');
const errors = require('../../errors');

const GROUP = 'users';

const getAll = async () => DB.getAllEntities(GROUP);

const getById = async (id) => {
  const user = await DB.getEntity(GROUP, { id });

  if (!user) throw new errors.NOT_FOUND(`User with id: ${id} not found`);

  return user;
};

const create = async (data) => {
  const user = await DB.createEntity(GROUP, data);

  if (!user) throw new errors.BAD_REQUEST(`User entity to create isn't valid`);

  return user;
};

const update = async (id, data) => {
  const user = await DB.updateEntity(GROUP, { id }, data);

  if (!user) throw new errors.BAD_REQUEST(`User entity to update isn't valid`);

  return user;
};

const remove = async (id) => {
  const isRemoved = await DB.removeEntity(GROUP, { id });

  if (!isRemoved) throw new errors.NOT_FOUND(`User with id: ${id} not found`);
};

module.exports = { getAll, getById, create, update, remove };
