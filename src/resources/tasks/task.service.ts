import * as tasksRepo from './task.memory.repository';
import { Task } from './task.model';

export const getAll = (boardId: string): Promise<Task[]> =>
  tasksRepo.getAll(boardId);

export const getAllByUserId = (userId: string): Promise<Task[]> =>
  tasksRepo.getAllByUserId(userId);

export const getById = (boardId: string, id: string): Promise<Task> =>
  tasksRepo.getById(boardId, id);

export const create = (task: Task): Promise<Task> => tasksRepo.create(task);

export const update = (
  boardId: string,
  id: string,
  data: Partial<Task>
): Promise<Task> => tasksRepo.update(boardId, id, data);

export const remove = (boardId: string, id: string): Promise<void> =>
  tasksRepo.remove(boardId, id);
