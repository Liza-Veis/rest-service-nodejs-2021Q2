import * as DB from '../../common/inMemoryDb';
import { TaskMessages } from '../../common/messages';
import * as errors from '../../errors';
import { Task } from './task.model';

const GROUP = 'tasks';

export const getAll = async (boardId: string): Promise<Task[]> => {
  const tasks = await DB.getAllEntities(GROUP)!;

  return tasks.filter((task) => task.boardId === boardId);
};

export const getAllByUserId = async (userId: string): Promise<Task[]> => {
  const tasks = await DB.getAllEntities(GROUP)!;

  return tasks.filter((task) => task.userId === userId);
};

export const getById = async (boardId: string, id: string): Promise<Task> => {
  const task = await DB.getEntity(GROUP, { boardId, id });

  if (!task) throw new errors.NOT_FOUND(TaskMessages.getNotFound(id, boardId));

  return task;
};

export const create = async (task: Task): Promise<Task> => {
  const createdTask = await DB.createEntity(GROUP, task);

  if (!createdTask) throw new errors.BAD_REQUEST(TaskMessages.creationError);

  return createdTask;
};

export const update = async (
  boardId: string,
  id: string,
  data: Partial<Task>
): Promise<Task> => {
  const task = await DB.updateEntity(GROUP, { boardId, id }, data);

  if (!task) throw new errors.BAD_REQUEST(TaskMessages.updateError);

  return task;
};

export const remove = async (boardId: string, id: string): Promise<void> => {
  const isRemoved = await DB.removeEntity(GROUP, { boardId, id });

  if (!isRemoved) {
    throw new errors.NOT_FOUND(TaskMessages.getNotFound(id, boardId));
  }
};
