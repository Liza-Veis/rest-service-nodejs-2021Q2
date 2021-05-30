import * as tasksService from '../tasks/task.service';
import * as usersRepo from './user.memory.repository';
import { User } from './user.model';
import { Task } from '../tasks/task.model';

export const getAll = (): Promise<User[]> => usersRepo.getAll();

export const getById = (id: string): Promise<User> => usersRepo.getById(id);

export const create = (user: User): Promise<User> => usersRepo.create(user);

export const update = (id: string, data: Partial<User>): Promise<User> =>
  usersRepo.update(id, data);

export const remove = async (id: string): Promise<void> => {
  const tasks = await tasksService.getAllByUserId(id);

  tasks.forEach((task: Task) => {
    if (task.boardId) {
      tasksService.update(task.boardId, task.id, { userId: null });
    }
  });

  usersRepo.remove(id);
};
