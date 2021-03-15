import { put, takeLatest, fork, call, all, StrictEffect } from 'redux-saga/effects';
import api from '../utils/api';
import { Action, appLoaded, loadConfigurations, loadUser, loadUsers, userAuthDone } from '../redux/actions';
import { CoreActionType, UserActionType } from '../redux/types';
import { push, RouterState } from 'connected-react-router';

function* callRegisterUser(action: Action<any>) {
  try {
    const { payload } = action;

    yield call(api.callUserRegister, payload, { 'content-type': 'multipart/form-data' });

    yield put(push('/signin'));
  } catch (error) {
    yield put({ type: 'SIGNUP_ERROR'});
  }
}

function* callLoginUser(action: Action<any>): Generator<StrictEffect, void> {
  try {
    const { payload } = action;
    const request = {
      email: payload.get('email'),
      password: payload.get('password'),
    };

    const response: any = yield call(api.callUserLogin, request);
    const { accessToken, userId } = response.data || {};

    window.sessionStorage.setItem('accessToken', accessToken);

    yield put(userAuthDone(accessToken));
    yield put(push(`/profile/${userId}`));
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR'});
  }
}

function* callUpdateConfiguration(action: Action<any>) {
  try {
    const { payload } = action;

    yield call(api.callConfigurationUpdate, 1, payload);
  } catch (error) {
    yield put({ type: 'UPDATE_CONFIGURATIONS_ERROR'});
  }
}

function* callFetchConfigurations(): Generator<StrictEffect, void> {
  try {
    const response: any = yield call(api.callGetConfigurations);
    yield put(loadConfigurations(response.data));
  } catch (error) {
    yield put({ type: 'FETCH_CONFIGURATIONS_ERROR'});
  }
}

function* callFetchUsers(): Generator<StrictEffect, void> {
  try {
    const response: any = yield call(api.callGetUsers);
    yield put(loadUsers(response.data));
  } catch (error) {
    yield put({ type: 'FETCH_USERS_ERROR'});
  }
}

function* callFetchUser(action: Action<any>): Generator<StrictEffect, void> {
  try {
    const response: any = yield call(api.callGetUserProfile, action.payload);
    yield put(loadUser(response.data));
  } catch (error) {
    yield put({ type: 'FETCH_USER_ERROR', error });
  }
}

function* doLogout() {
  window.sessionStorage.removeItem('accessToken');
}

function* callFetchLoggedUserInfo(): Generator<StrictEffect, void, RouterState> {
  try {
    const response: any = yield call(api.callGetLoggedUser);
    yield put(loadUser(response.data));

    const { is_admin: isAdmin, sessionHasExpired = false } = response.data || {};

    if (sessionHasExpired) {
      window.sessionStorage.removeItem('accessToken');
    } else {
      const accessToken = window.sessionStorage.getItem('accessToken');
      yield put(userAuthDone(accessToken));
    }

    if (isAdmin) {
      const response: any = yield call(api.callGetUsers);
      yield put(loadUsers(response.data));
    }

    yield put(appLoaded());
  } catch (error) {
    yield put({ type: 'FETCH_LOGGED_USER_ERROR', error })
  }
}

function* onLoggedUserInfoWatcher() {
  yield takeLatest(UserActionType.LOGGED_USER_INFO, callFetchLoggedUserInfo);
}

function* onLogoutWatcher() {
  yield takeLatest(UserActionType.LOGOUT_USER, doLogout);
}

function* onFetchUserWatcher() {
  yield takeLatest(UserActionType.FETCH_USER, callFetchUser);
}

function* onFetchUsersWatcher() {
  yield takeLatest(UserActionType.FETCH_ALL_USERS, callFetchUsers);
}

function* onFetchConfigurationsWatcher() {
  yield takeLatest(CoreActionType.FETCH_ALL_CONFIGURATIONS, callFetchConfigurations);
}

function* onConfigurationUpdateWatcher() {
  yield takeLatest(CoreActionType.UPDATE_CONFIGURATION, callUpdateConfiguration);
}

function* onLoginUserWatcher() {
  yield takeLatest(UserActionType.LOGIN_USER, callLoginUser);
}

function* onRegisterUserWatcher() {
  yield takeLatest(UserActionType.REGISTER_USER, callRegisterUser);
}

export default function* rootSagas() {
  yield all([
    fork(onLoginUserWatcher),
    fork(onRegisterUserWatcher),
    fork(onConfigurationUpdateWatcher),
    fork(onFetchConfigurationsWatcher),
    fork(onFetchUsersWatcher),
    fork(onFetchUserWatcher),
    fork(onLogoutWatcher),
    fork(onLoggedUserInfoWatcher),
  ]);
}
