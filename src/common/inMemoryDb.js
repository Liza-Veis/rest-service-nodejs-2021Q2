const DB = {
  users: [],
  boards: [],
  tasks: [],
};

const getAllEntities = (group) => DB[group] || null;

const getEntity = (group, data) =>
  DB[group]?.find((entity) =>
    Object.entries(data).every(([key, value]) => entity[key] === value)
  ) || null;

const createEntity = (group, entity) => {
  if (DB[group]) {
    DB[group].push(entity);

    return entity;
  }

  return null;
};

const updateEntity = (group, entityData, dataToUpdate) => {
  const entity = getEntity(group, entityData);

  if (entity) {
    Object.entries(dataToUpdate).forEach(([key, value]) => {
      entity[key] = value;
    });
  }

  return entity || null;
};

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
