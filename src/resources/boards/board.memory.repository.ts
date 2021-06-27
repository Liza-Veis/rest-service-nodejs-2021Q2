import { getRepository } from 'typeorm';
import { BoardMessages } from '../../common/messages';
import * as errors from '../../errors';
import { Board } from '../../entities/Board';

export const getAll = async (): Promise<Board[]> => {
  const boardRepository = getRepository(Board);
  return boardRepository.find();
};

export const getById = async (id: string): Promise<Board> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(id).catch(() => {
    throw new errors.NOT_FOUND(BoardMessages.getNotFound(id));
  });

  if (!board) throw new errors.NOT_FOUND(BoardMessages.getNotFound(id));

  return board;
};

export const create = async (board: Board): Promise<Board> => {
  const boardRepository = getRepository(Board);

  const createdBoard = await boardRepository.save(
    boardRepository.create(board)
  );

  if (!createdBoard) throw new errors.BAD_REQUEST(BoardMessages.creationError);

  return createdBoard;
};

export const update = async (
  id: string,
  data: Partial<Board>
): Promise<Board> => {
  const boardRepository = getRepository(Board);
  const result = await boardRepository.update(id, data).catch(() => {
    throw new errors.BAD_REQUEST(BoardMessages.updateError);
  });

  if (!result.affected) {
    throw new errors.NOT_FOUND(BoardMessages.getNotFound(id));
  }

  return getById(id);
};

export const remove = async (id: string): Promise<void> => {
  const boardRepository = getRepository(Board);
  const result = await boardRepository.delete(id).catch(() => {
    throw new errors.BAD_REQUEST(BoardMessages.deletionError);
  });

  if (!result.affected) {
    throw new errors.NOT_FOUND(BoardMessages.getNotFound(id));
  }
};
