import { getRepository } from 'typeorm';
import { UserMessage } from '../../common/messages';
import { errors } from '../../errors';
import { User } from '../../entities/User';

export const getAll = async (): Promise<User[]> => {
  const userRepository = getRepository(User);
  return userRepository.find();
};

export const getById = async (id: string): Promise<User> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id).catch(() => {
    throw new errors.NOT_FOUND(UserMessage.getNotFound(id));
  });

  if (!user) throw new errors.NOT_FOUND(UserMessage.getNotFound(id));

  return user;
};

export const getByProps = async (data: Partial<User>): Promise<User> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(data).catch(() => {
    throw new errors.NOT_FOUND(UserMessage.getNotFoundWithProps(data));
  });

  if (!user) throw new errors.NOT_FOUND(UserMessage.getNotFoundWithProps(data));

  return user;
};

export const create = async (user: User): Promise<User> => {
  const userRepository = getRepository(User);
  const createdUser = await userRepository.save(userRepository.create(user));

  if (!createdUser) throw new errors.BAD_REQUEST(UserMessage.creationError);

  return createdUser;
};

export const update = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  const userRepository = getRepository(User);
  const user = await getById(id);

  Object.entries(data).forEach(([prop, value]) => {
    user[prop as keyof User] = value;
  });

  const updatedUser = await userRepository.save(user).catch(() => {
    throw new errors.BAD_REQUEST(UserMessage.updateError);
  });

  return updatedUser;
};

export const remove = async (id: string): Promise<void> => {
  const userRepository = getRepository(User);
  const result = await userRepository.delete(id).catch(() => {
    throw new errors.BAD_REQUEST(UserMessage.deletionError);
  });

  if (!result.affected) {
    throw new errors.NOT_FOUND(UserMessage.getNotFound(id));
  }
};
