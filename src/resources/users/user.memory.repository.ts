import * as DB from '../../common/inMemoryDb';
import { UserMessages } from '../../common/messages';
import * as errors from '../../errors';
import { User } from './user.model';

const GROUP = 'users';

export const getAll = async (): Promise<User[]> => DB.getAllEntities(GROUP)!;

export const getById = async (id: string): Promise<User> => {
  const user: User | null = await DB.getEntity(GROUP, { id });

  if (!user) throw new errors.NOT_FOUND(UserMessages.getNotFound(id));

  return user;
};

export const create = async (user: User): Promise<User> => {
  const createdUser = await DB.createEntity(GROUP, user);

  if (!createdUser) throw new errors.BAD_REQUEST(UserMessages.creationError);

  return createdUser;
};

export const update = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  const user = await DB.updateEntity(GROUP, { id }, data);

  if (!user) throw new errors.BAD_REQUEST(UserMessages.updateError);

  return user;
};

export const remove = async (id: string): Promise<void> => {
  const isRemoved = await DB.removeEntity(GROUP, { id });

  if (!isRemoved) throw new errors.NOT_FOUND(UserMessages.getNotFound(id));
};