import { User } from '../resources/users/user.model';
import { Task } from '../resources/tasks/task.model';
import { Board } from '../resources/boards/board.model';

type Entity = {
  users: User;
  boards: Board;
  tasks: Task;
};

type Group = keyof Entity;

type DataBase = {
  [group in Group]: Entity[group][];
};

const DB: DataBase = {
  users: [],
  boards: [],
  tasks: [],
};

export const getAllEntities = <T extends Group>(group: T): DataBase[T] =>
  DB[group];

export const getEntity = <T extends Group>(
  group: T,
  data: Partial<Entity[T]>
): Entity[T] | null =>
  (DB[group] as Entity[T][])?.find((entity) =>
    Object.entries(data).every(
      ([key, value]) => entity[key as keyof Entity[T]] === value
    )
  ) || null;

export const createEntity = <T extends Group>(
  group: T,
  entity: Entity[T]
): Entity[T] | null => {
  if (DB[group]) {
    (DB[group] as Entity[T][]).push(entity);

    return entity;
  }

  return null;
};

export const updateEntity = <T extends Group>(
  group: T,
  entityData: Partial<Entity[T]>,
  dataToUpdate: Partial<Entity[T]>
): Entity[T] | null => {
  const entity = getEntity(group, entityData);

  if (entity) {
    Object.entries(dataToUpdate).forEach(([key, value]) => {
      entity[key as keyof Entity[T]] = value;
    });
  }

  return entity || null;
};

export const removeEntity = <T extends Group>(
  group: T,
  data: Partial<Entity[T]>
): boolean => {
  const entity: Entity[T] | null = getEntity(group, data);

  if (entity) {
    const index = (DB[group] as Entity[T][]).indexOf(entity);

    DB[group].splice(index, 1);

    return true;
  }

  return false;
};
