import {createAction, handleActions} from 'redux-actions';
import {takeLatest} from 'redux-saga/effects'
import createRequestSaga from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth'
import {setAuthorization} from "../lib/api/client";

export const REGISTER = 'auth/REGISTER'
export const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'auth/REGISTER_FAILURE'

export const LOGIN = 'auth/LOGIN'
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE'

export const LOGOUT = 'auth/LOGOUT'

export const register = createAction(REGISTER, ({email, password}) => ({
    email, password
}))
export const login = createAction(LOGIN, ({email, password}) => ({
    email, password
}))
export const loginFailure = createAction(LOGIN_FAILURE, (error) => {
    return error
})
export const logout = createAction(LOGOUT)

const registerSaga = createRequestSaga(REGISTER, authAPI.register, (data) => {

})
const loginSaga = createRequestSaga(LOGIN, authAPI.login, setAuthorization)

export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga)
    yield takeLatest(LOGIN, loginSaga)
}

const initialState = {
    auth: null,
    authError: null
}

const auth = handleActions({
    [REGISTER_SUCCESS]: (state, {payload: auth}) => ({
        ...state, authError: null, auth
    }), [REGISTER_FAILURE]: (state, {payload: error}) => ({
        ...state, authError: error
    }), [LOGIN_SUCCESS]: (state, {payload: auth}) => ({
        ...state, authError: null, auth
    }), [LOGIN_FAILURE]: (state, {payload: error}) => ({
        ...state, authError: error
    }), [LOGOUT]: (state) => ({
        ...initialState
    })
}, initialState,);

export default auth;
