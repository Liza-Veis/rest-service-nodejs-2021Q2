import { getRepository } from 'typeorm';
import { BoardMessage } from '../../common/messages';
import { errors } from '../../errors';
import { Board } from '../../entities/Board';

export const getAll = async (): Promise<Board[]> => {
  const boardRepository = getRepository(Board);
  return boardRepository.find();
};

export const getById = async (id: string): Promise<Board> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(id).catch(() => {
    throw new errors.NOT_FOUND(BoardMessage.getNotFound(id));
  });

  if (!board) throw new errors.NOT_FOUND(BoardMessage.getNotFound(id));

  return board;
};

export const create = async (board: Board): Promise<Board> => {
  const boardRepository = getRepository(Board);

  const createdBoard = await boardRepository.save(
    boardRepository.create(board)
  );

  if (!createdBoard) throw new errors.BAD_REQUEST(BoardMessage.creationError);

  return createdBoard;
};

export const update = async (
  id: string,
  data: Partial<Board>
): Promise<Board> => {
  const boardRepository = getRepository(Board);
  const result = await boardRepository.update(id, data).catch(() => {
    throw new errors.BAD_REQUEST(BoardMessage.updateError);
  });

  if (!result.affected) {
    throw new errors.NOT_FOUND(BoardMessage.getNotFound(id));
  }

  return getById(id);
};

export const remove = async (id: string): Promise<void> => {
  const boardRepository = getRepository(Board);
  const result = await boardRepository.delete(id).catch(() => {
    throw new errors.BAD_REQUEST(BoardMessage.deletionError);
  });

  if (!result.affected) {
    throw new errors.NOT_FOUND(BoardMessage.getNotFound(id));
  }
};
