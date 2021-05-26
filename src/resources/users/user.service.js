const tasksService = require('../tasks/task.service');
const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const create = (user) => usersRepo.create(user);

const update = (id, data) => usersRepo.update(id, data);

const remove = async (id) => {
  const tasks = await tasksService.getAllByUserId(id);

  tasks.forEach((task) => {
    tasksService.update(task.boardId, task.id, { userId: null });
  });

  usersRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
