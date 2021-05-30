import { User } from '../resources/users/user.model';
import { Task } from '../resources/tasks/task.model';
import { Board } from '../resources/boards/board.model';

/**
 * In memory database module
 * @module InMemoryDatabase
 */

export type TGroup = 'users' | 'boards' | 'tasks';
type TEntity = {
  users: User;
  boards: Board;
  tasks: Task;
};
type TDB = {
  users: TEntity['users'][];
  boards: TEntity['boards'][];
  tasks: TEntity['tasks'][];
};

const DB: TDB = {
  users: [],
  boards: [],
  tasks: [],
};

/**
 * Returns an array of all entities
 * @param {string} group group name
 * @returns {Array<Object>} Array of entities or null
 */
export const getAllEntities = <T extends TGroup>(group: T): TDB[T] => DB[group];

/**
 * Returns an entity by data
 * @param {string} group group name
 * @param {Object} data entity data
 * @returns {Object|null} Entity or null
 */
export const getEntity = <T extends TGroup>(
  group: T,
  data: Partial<TEntity[T]>
): TEntity[T] | null =>
  (DB[group] as TEntity[T][])?.find((entity) =>
    Object.entries(data).every(
      ([key, value]) => entity[key as keyof TEntity[T]] === value
    )
  ) || null;

/**
 * Creates an entity
 * @param {string} group group name
 * @param {Object} entity config to create an entity
 * @returns {Object|null} Created entity or null
 */
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

/**
 * Updates an entity
 * @param {string} group group name
 * @param {Object} entityData entity data
 * @param {Object} dataToUpdate data to update
 * @returns {Object|null} Updated entity or null
 */
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

/**
 * Removes an entity
 * @param {string} group group name
 * @param {Object} data entity data
 * @returns {boolean} Is operation success
 */
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
