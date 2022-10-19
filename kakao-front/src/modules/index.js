import { combineReducers } from 'redux';
import {all} from 'redux-saga/effects'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth, {authSaga, LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS} from './auth';
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
  blacklist: ['auth']
}
const authConfig = {
  key: 'auth',
  storage,
  blacklist: ['authError']
}

// 동기화하는 리듀서
export const syncConfig = {
  whitelist: [LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT],
}
const rootReducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  loading,
  user,
  form
});

export default persistReducer(persistConfig, rootReducer)
