import { getRepository } from 'typeorm';
import { TaskMessages } from '../../common/messages';
import * as errors from '../../errors';
import { Task } from '../../entities/Task';

export const getAll = async (boardId: string): Promise<Task[]> => {
  const tasksRepository = getRepository(Task);
  return tasksRepository.find({ where: { boardId } });
};

export const getById = async (boardId: string, id: string): Promise<Task> => {
  const tasksRepository = getRepository(Task);
  const task = await tasksRepository
    .findOne({ where: { boardId, id } })
    .catch(() => {
      throw new errors.NOT_FOUND(TaskMessages.getNotFound(boardId, id));
    });

  if (!task) throw new errors.NOT_FOUND(TaskMessages.getNotFound(boardId, id));

  return task;
};

export const create = async (task: Task): Promise<Task> => {
  const tasksRepository = getRepository(Task);
  const createdTask = await tasksRepository.save(tasksRepository.create(task));

  if (!createdTask) throw new errors.BAD_REQUEST(TaskMessages.creationError);

  return createdTask;
};

export const update = async (
  boardId: string,
  id: string,
  data: Partial<Task>
): Promise<Task> => {
  const tasksRepository = getRepository(Task);
  const result = await tasksRepository.update(id, data).catch(() => {
    throw new errors.BAD_REQUEST(TaskMessages.updateError);
  });

  if (!result.affected) {
    throw new errors.NOT_FOUND(TaskMessages.getNotFound(boardId, id));
  }

  return getById(boardId, id);
};

export const remove = async (boardId: string, id: string): Promise<void> => {
  const tasksRepository = getRepository(Task);
  const result = await tasksRepository.delete({ boardId, id }).catch(() => {
    throw new errors.BAD_REQUEST(TaskMessages.deletionError);
  });

  if (!result.affected) {
    throw new errors.NOT_FOUND(TaskMessages.getNotFound(boardId, id));
  }
};
