import * as boardsRepo from './board.memory.repository';
import { Board } from '../../entities/Board';
import { Column } from './column.model';

export const getAll = async (): Promise<Board[]> => boardsRepo.getAll();

export const getById = (id: string): Promise<Board> => boardsRepo.getById(id);

export const create = (board: Board): Promise<Board> => {
  let { columns } = board;
  if (columns) {
    columns = columns.map((column) => new Column(column));
  }
  return boardsRepo.create({ ...board, ...{ columns } });
};

export const update = (id: string, data: Partial<Board>): Promise<Board> => {
  let { columns } = data;
  if (columns) {
    columns = columns.map((column) => new Column(column));
  }
  return boardsRepo.update(id, { ...data, ...{ columns } });
};

export const remove = async (id: string): Promise<void> =>
  boardsRepo.remove(id);
