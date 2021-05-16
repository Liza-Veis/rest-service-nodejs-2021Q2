const tasksService = require('../tasks/task.service');
const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = (id) => boardsRepo.getById(id);

const create = (board) => boardsRepo.create(board);

const update = (id, data) => boardsRepo.update(id, data);

const remove = async (id) => {
  const tasks = await tasksService.getBoardTasks(id);

  tasks.forEach((task) => {
    tasksService.remove(id, task.id);
  });

  boardsRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
