const DB = require('../../common/inMemoryDb');
const errors = require('../../errors');

const GROUP = 'tasks';

const getAll = async (boardId) => {
  const tasks = await DB.getAllEntities(GROUP);

  return tasks.filter((task) => task.boardId === boardId);
};

const getById = async (boardId, id) => {
  const task = await DB.getEntity(GROUP, { boardId, id });

  if (!task) {
    throw new errors.NOT_FOUND(
      `Task with id: ${id} on board with id: ${boardId} not found`
    );
  }

  return task;
};

const getAllByUserId = async (userId) => {
  const tasks = await DB.getAllEntities(GROUP);

  return tasks.filter((task) => task.userId === userId);
};

const create = async (data) => {
  const task = await DB.createEntity(GROUP, data);

  if (!task) throw new errors.BAD_REQUEST(`Task entity to create isn't valid`);

  return task;
};

const update = async (boardId, id, data) => {
  const task = await DB.updateEntity(GROUP, { boardId, id }, data);

  if (!task) {
    throw new errors.BAD_REQUEST(`Task entity to update isn't valid`);
  }

  return task;
};

const remove = async (boardId, id) => {
  const isRemoved = await DB.removeEntity(GROUP, { boardId, id });

  if (!isRemoved) {
    throw new errors.NOT_FOUND(
      `Task with id: ${id} on board with id: ${boardId} not found`
    );
  }
};

module.exports = {
  getAll,
  getById,
  getAllByUserId,
  create,
  update,
  remove,
};
