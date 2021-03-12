import { CoreActionType, UserActionType } from './types';

export interface Action<T> {
  type: CoreActionType | UserActionType;
  payload: T;
}

const createAction = (type: UserActionType | CoreActionType) => () => ({ type });

const createActionWithPayload = (type: UserActionType | CoreActionType) => (payload: any) => ({
  type,
  payload,
});

export const registerUser = createActionWithPayload(UserActionType.REGISTER_USER);
export const loginUser = createActionWithPayload(UserActionType.LOGIN_USER);
export const loadUser = createActionWithPayload(UserActionType.LOAD_USER);
export const loadUsers = createActionWithPayload(UserActionType.LOAD_USERS);
export const userAuthDone = createActionWithPayload(UserActionType.USER_AUTH_DONE);
export const fetchUser = createActionWithPayload(UserActionType.FETCH_USER);
export const loadConfigurations = createActionWithPayload(CoreActionType.LOAD_CONFIGURATIONS);
export const updateConfiguration = createActionWithPayload(CoreActionType.UPDATE_CONFIGURATION);

export const fetchAllUsers = createAction(UserActionType.FETCH_ALL_USERS);
export const fetchAllConfigurations = createAction(CoreActionType.FETCH_ALL_CONFIGURATIONS);
export const logoutUser = createAction(UserActionType.LOGOUT_USER);
