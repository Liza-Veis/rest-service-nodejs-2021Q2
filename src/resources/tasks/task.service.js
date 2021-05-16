const tasksRepo = require('./task.memory.repository');

const getBoardTasks = (boardId) => tasksRepo.getBoardTasks(boardId);

const getUserTasks = (userId) => tasksRepo.getUserTasks(userId);

const getById = (boardId, id) => tasksRepo.getById(boardId, id);

const create = (task) => tasksRepo.create(task);

const update = (boardId, id, data) => tasksRepo.update(boardId, id, data);

const remove = (boardId, id) => tasksRepo.remove(boardId, id);

module.exports = {
  getBoardTasks,
  getUserTasks,
  getById,
  create,
  update,
  remove,
};
