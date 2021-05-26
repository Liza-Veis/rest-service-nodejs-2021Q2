const tasksRepo = require('./task.memory.repository');

const getAll = (boardId) => tasksRepo.getAll(boardId);

const getAllByUserId = (userId) => tasksRepo.getAllByUserId(userId);

const getById = (boardId, id) => tasksRepo.getById(boardId, id);

const create = (task) => tasksRepo.create(task);

const update = (boardId, id, data) => tasksRepo.update(boardId, id, data);

const remove = (boardId, id) => tasksRepo.remove(boardId, id);

module.exports = {
  getAll,
  getAllByUserId,
  getById,
  create,
  update,
  remove,
};
