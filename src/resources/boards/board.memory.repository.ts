import * as DB from '../../common/inMemoryDb';
import { BoardMessages } from '../../common/messages';
import * as errors from '../../errors';
import { Board } from './board.model';
import { Column } from './column.model';

const GROUP = 'boards';

export const getAll = async (): Promise<Board[]> => DB.getAllEntities(GROUP);

export const getById = async (id: string): Promise<Board> => {
  const board = await DB.getEntity(GROUP, { id });

  if (!board) throw new errors.NOT_FOUND(BoardMessages.getNotFound(id));

  return board;
};

export const create = async (board: Board): Promise<Board> => {
  const createdBoard = await DB.createEntity(GROUP, board);

  if (!createdBoard) throw new errors.BAD_REQUEST(BoardMessages.creationError);

  return createdBoard;
};

export const update = async (
  id: string,
  data: Partial<Board>
): Promise<Board> => {
  const columns = data.columns?.map((column) => new Column(column));
  const dataToUpdate = columns ? { ...data, columns } : data;
  const board = await DB.updateEntity(GROUP, { id }, dataToUpdate);

  if (!board) throw new errors.BAD_REQUEST(BoardMessages.updateError);

  return board;
};

export const remove = async (id: string): Promise<void> => {
  const isRemoved = await DB.removeEntity(GROUP, { id });

  if (!isRemoved) throw new errors.NOT_FOUND(BoardMessages.getNotFound(id));
};
