import { User } from '../entities/User';

export const BoardMessage = {
  getNotFound: (id: string): string => `Board with id:"${id}" not found`,
  creationError: "Board entity to create isn't valid",
  updateError: "Board entity to update isn't valid",
  deletionError: 'Failed to delete board entity',
};

export const UserMessage = {
  getNotFound: (id: string): string => `User with id:"${id}" not found`,
  getNotFoundWithProps: (props: Partial<User>): string =>
    `User with properties:"${JSON.stringify(props)}" not found`,
  creationError: "User entity to create isn't valid",
  updateError: "User entity to update isn't valid",
  deletionError: 'Failed to delete user entity',
};

export const TaskMessage = {
  getNotFound: (boardId: string, id: string): string =>
    `Task with id:"${id}" on board with id:"${boardId}" not found`,
  creationError: "Task entity to create isn't valid",
  updateError: "Task entity to update isn't valid",
  deletionError: 'Failed to delete task entity',
};

export const LoginMessage = {
  validationError: 'Invalid login data',
  loginError: 'Wrong login/password combination',
};

export const RouteMessage = {
  getNonExistent: (method: string, route: string): string =>
    `Cannot ${method}:${route}`,
};
