const DB = {
  users: [],
  boards: [],
  tasks: [],
};

/**
 * In memory database module
 * @module InMemoryDatabase
 */

/**
 * Returns an array of all entities
 * @param {string} group group name
 * @returns {Array<Object|null>} Array of entities or null
 */
const getAllEntities = (group) => DB[group] || null;

/**
 * Returns an entity by data
 * @param {string} group group name
 * @param {Object} data entity data
 * @returns {Object|null} Entity or null
 */
const getEntity = (group, data) =>
  DB[group]?.find((entity) =>
    Object.entries(data).every(([key, value]) => entity[key] === value)
  ) || null;

/**
 * Creates an entity
 * @param {string} group group name
 * @param {Object} entity config to create an entity
 * @returns {Object|null} Created entity or null
 */
const createEntity = (group, entity) => {
  if (DB[group]) {
    DB[group].push(entity);

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
const updateEntity = (group, entityData, dataToUpdate) => {
  const entity = getEntity(group, entityData);

  if (entity) {
    Object.entries(dataToUpdate).forEach(([key, value]) => {
      entity[key] = value;
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
const removeEntity = (group, data) => {
  const entity = getEntity(group, data);

  if (entity) {
    const index = DB[group].indexOf(entity);

    DB[group].splice(index, 1);

    return true;
  }

  return false;
};

module.exports = {
  getAllEntities,
  getEntity,
  createEntity,
  updateEntity,
  removeEntity,
};
