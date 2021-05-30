import { User } from '../resources/users/user.model';
import { Task } from '../resources/tasks/task.model';
import { Board } from '../resources/boards/board.model';

type TEntity = {
  users: User;
  boards: Board;
  tasks: Task;
};

type TGroup = keyof TEntity;

type TDataBase = {
  [group in TGroup]: TEntity[group][];
};

const DB: TDataBase = {
  users: [],
  boards: [],
  tasks: [],
};

export const getAllEntities = <T extends TGroup>(group: T): TDataBase[T] =>
  DB[group];

export const getEntity = <T extends TGroup>(
  group: T,
  data: Partial<TEntity[T]>
): TEntity[T] | null =>
  (DB[group] as TEntity[T][])?.find((entity) =>
    Object.entries(data).every(
      ([key, value]) => entity[key as keyof TEntity[T]] === value
    )
  ) || null;

export const createEntity = <T extends TGroup>(
  group: T,
  entity: TEntity[T]
): TEntity[T] | null => {
  if (DB[group]) {
    (DB[group] as TEntity[T][]).push(entity);

    return entity;
  }

  return null;
};

export const updateEntity = <T extends TGroup>(
  group: T,
  entityData: Partial<TEntity[T]>,
  dataToUpdate: Partial<TEntity[T]>
): TEntity[T] | null => {
  const entity = getEntity(group, entityData);

  if (entity) {
    Object.entries(dataToUpdate).forEach(([key, value]) => {
      entity[key as keyof TEntity[T]] = value;
    });
  }

  return entity || null;
};

export const removeEntity = <T extends TGroup>(
  group: T,
  data: Partial<TEntity[T]>
): boolean => {
  const entity: TEntity[T] | null = getEntity(group, data);

  if (entity) {
    const index = (DB[group] as TEntity[T][]).indexOf(entity);

    DB[group].splice(index, 1);

    return true;
  }

  return false;
};
