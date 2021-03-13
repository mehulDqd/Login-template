import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import createReducer from './createReducer';
import { CoreActionType, UserActionType } from './types';
import { Action } from './actions';
import { User } from '../utils/types';

export interface UserStateInterface {
  accessToken: string;
  currentUser: User;
  users: any;
}

export interface ConfigurationsStateInterface {
  configurations: any;
}

export interface RootState {
  user: UserStateInterface;
  core: ConfigurationsStateInterface;
}

const defaultState: RootState = {
  user: {
    accessToken: '',
    currentUser: {},
    users: [],
  },
  core: {
    configurations: {},
  },
};

export interface ReduxState {
  state: RootState;
}

export const reducer = createReducer<RootState>(defaultState, {
  [UserActionType.LOAD_USER](state: RootState, action: Action<User>): RootState {
	  return {
      ...state,
      user: {
        ...state.user,
        currentUser: action.payload,
      },
	  };
	},
  [UserActionType.LOAD_USERS](state: RootState, action: Action<any>): RootState {
	  return {
      ...state,
      user: {
        ...state.user,
        users: action.payload,
      },
	  };
	},
  [UserActionType.USER_AUTH_DONE](state: RootState, action: Action<any>): RootState {
	  return {
      ...state,
      user: {
        ...state.user,
        accessToken: action.payload,
      },
	  };
	},
  [CoreActionType.LOAD_CONFIGURATIONS](state: RootState, action: Action<any>): RootState {
	  return {
      ...state,
      core: {
        configurations: action.payload,
      },
	  };
	},
  [UserActionType.LOGOUT_USER](state: RootState, action: Action<any>): RootState {
	  return {
      ...state,
      user: {
        ...state.user,
        accessToken: '',
      }
	  };
	},
});

export default (history: History) => combineReducers({
	state: reducer,
	router: connectRouter(history),
});
