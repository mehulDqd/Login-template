export enum UserActionType {
  REGISTER_USER = 'action/REGISTER_USER',
  LOGIN_USER = 'action/LOGIN_USER',
  FETCH_USER = 'action/FETCH_USER',
  FETCH_ALL_USERS = 'action/FETCH_ALL_USERS',
  LOAD_USER = 'action/LOAD_USER',
  LOAD_USERS = 'action/LOAD_USERS',
  USER_AUTH_DONE = 'action/USER_AUTH_DONE',
  LOGOUT_USER = 'action/LOGOUT_USER',
}

export enum CoreActionType {
  UPDATE_CONFIGURATION = 'action/UPDATE_CONFIGURATION',
  FETCH_ALL_CONFIGURATIONS = 'action/FETCH_ALL_CONFIGURATIONS',
  LOAD_CONFIGURATIONS = 'action/LOAD_CONFIGURATIONS',
}