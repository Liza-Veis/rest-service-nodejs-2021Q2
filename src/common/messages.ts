export const BoardMessages = {
  getNotFound: (id: string) => `Board with id: ${id} not found`,
  creationError: "Board entity to create isn't valid",
  updateError: "Board entity to update isn't valid",
};

export const UserMessages = {
  getNotFound: (id: string) => `User with id: ${id} not found`,
  creationError: "User entity to create isn't valid",
  updateError: "User entity to update isn't valid",
};

export const TaskMessages = {
  getNotFound: (id: string, boardId: string) =>
    `Task with id: ${id} on board with id: ${boardId} not found`,
  creationError: "Task entity to create isn't valid",
  updateError: "Task entity to update isn't valid",
};
