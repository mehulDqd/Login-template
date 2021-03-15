import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
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

export interface CoreStateInterface {
  configurations: any;
  loaded: boolean;
}

export interface RootState {
  user: UserStateInterface;
  core: CoreStateInterface;
}

const defaultState: RootState = {
  user: {
    accessToken: '',
    currentUser: {},
    users: [],
  },
  core: {
    configurations: {},
    loaded: false,
  },
};

export interface ReduxState {
  state: RootState;
  router: RouterState;
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
        ...state.core,
        configurations: action.payload,
      },
	  };
	},
  [CoreActionType.APP_LOADED](state: RootState, action: Action<any>): RootState {
	  return {
      ...state,
      core: {
        ...state.core,
        loaded: true,
      },
	  };
	},
  [UserActionType.LOGOUT_USER](state: RootState, action: Action<any>): RootState {
	  return {
      ...state,
      user: {
        ...state.user,
        accessToken: '',
        currentUser: {},
      }
	  };
	},
});

const rootReducer = (history: History) => combineReducers({
	state: reducer,
	router: connectRouter(history),
});

export default rootReducer;
