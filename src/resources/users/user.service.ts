import * as usersRepo from './user.memory.repository';
import { User } from '../../entities/User';

export const getAll = (): Promise<User[]> => usersRepo.getAll();

export const getById = (id: string): Promise<User> => usersRepo.getById(id);

export const getByProps = (data: Partial<User>): Promise<User> =>
  usersRepo.getByProps(data);

export const create = (user: User): Promise<User> => usersRepo.create(user);

export const update = (id: string, data: Partial<User>): Promise<User> =>
  usersRepo.update(id, data);

export const remove = async (id: string): Promise<void> => usersRepo.remove(id);
