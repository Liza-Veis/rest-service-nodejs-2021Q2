import * as tasksService from '../tasks/task.service';
import * as boardsRepo from './board.memory.repository';
import { Board } from './board.model';

export const getAll = async (): Promise<Board[]> => boardsRepo.getAll();

export const getById = (id: string): Promise<Board> => boardsRepo.getById(id);

export const create = (board: Board): Promise<Board> =>
  boardsRepo.create(board);

export const update = (id: string, data: Partial<Board>): Promise<Board> =>
  boardsRepo.update(id, data);

export const remove = async (id: string): Promise<void> => {
  const tasks = await tasksService.getAll(id);

  tasks.forEach((task) => {
    tasksService.remove(id, task.id);
  });

  boardsRepo.remove(id);
};
