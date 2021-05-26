const DB = require('../../common/inMemoryDb');
const errors = require('../../errors');
const Column = require('./column.model');

const GROUP = 'boards';

const getAll = async () => DB.getAllEntities(GROUP);

const getById = async (id) => {
  const board = await DB.getEntity(GROUP, { id });

  if (!board) throw new errors.NOT_FOUND(`Board with id: ${id} not found`);

  return board;
};

const create = async (data) => {
  const board = await DB.createEntity(GROUP, data);

  if (!board) {
    throw new errors.BAD_REQUEST(`Board entity to create isn't valid`);
  }

  return board;
};

const update = async (id, data) => {
  const columns = data.columns?.map((column) => new Column(column));
  const dataToUpdate = columns ? { ...data, columns } : data;
  const board = await DB.updateEntity(GROUP, { id }, dataToUpdate);

  if (!board) {
    throw new errors.BAD_REQUEST(`Board entity to update isn't valid`);
  }

  return board;
};

const remove = async (id) => {
  const isRemoved = await DB.removeEntity(GROUP, { id });

  if (!isRemoved) throw new errors.NOT_FOUND(`Board with id: ${id} not found`);
};

module.exports = { getAll, getById, create, update, remove };
