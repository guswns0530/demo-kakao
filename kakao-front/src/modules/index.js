import { combineReducers } from 'redux';
import {all} from 'redux-saga/effects'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth, {SET_ACCESS_TOKEN, authSaga, LOGIN_SUCCESS, LOGOUT, LOGIN_FAILURE} from './auth';
import loading from "./loading";
import user, {userSaga} from './user'
import form from './form'


export function* rootSaga() {
  yield all([authSaga(), userSaga()])
}

// 동기화하는 데이터
const persistConfig = {
  key: "root",
  storage,
  whitelist: ['auth'],
  blacklist: ['auth', 'loading', 'form']
}
const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['auth'],
  blacklist: ['authError', 'authPopup']
}

// 동기화하는 리듀서
export const syncConfig = {
  whitelist: [LOGIN_SUCCESS, LOGOUT, SET_ACCESS_TOKEN, LOGIN_FAILURE],
}
const rootReducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  loading,
  user,
  form
});

export default persistReducer(persistConfig, rootReducer)
