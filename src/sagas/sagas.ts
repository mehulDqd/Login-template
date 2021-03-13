import { put, takeLatest, fork, call, all, StrictEffect } from 'redux-saga/effects';
import api from '../utils/api';
import { Action, loadConfigurations, loadUser, loadUsers, userAuthDone } from '../redux/actions';
import { CoreActionType, UserActionType } from '../redux/types';
import { push } from 'connected-react-router';

function* callRegisterUser(action: Action<any>) {
  try {
    const { payload } = action;

    yield call(api.callUserRegister, payload, { 'content-type': 'multipart/form-data' });

    yield put(push('/signin'));
  } catch (error) {
    yield put({ type: 'ERROR'});
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

    yield put(userAuthDone(accessToken));
    yield put(push(`/profile/${userId}`));
  } catch (error) {
    yield put({ type: 'ERROR'});
  }
}

function* callUpdateConfiguration(action: Action<any>) {
  try {
    const { payload } = action;

    yield call(api.callConfigurationUpdate, 1, payload);
  } catch (error) {
    yield put({ type: 'ERROR'});
  }
}

function* callFetchConfigurations(): Generator<StrictEffect, void> {
  try {
    const response: any = yield call(api.callGetConfigurations);
    yield put(loadConfigurations(response.data));
  } catch (error) {
    yield put({ type: 'ERROR'});
  }
}

function* callFetchUsers(): Generator<StrictEffect, void> {
  try {
    const response: any = yield call(api.callGetUsers);
    yield put(loadUsers(response.data));
  } catch (error) {
    yield put({ type: 'ERROR'});
  }
}

function* callFetchUser(action: Action<any>): Generator<StrictEffect, void> {
  try {
    const response: any = yield call(api.callGetUserProfile, action.payload);
    yield put(loadUser(response.data));
  } catch (error) {
    yield put({ type: 'ERROR'});
  }
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
  ]);
}
