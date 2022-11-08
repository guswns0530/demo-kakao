import {createAction, handleActions} from 'redux-actions';
import {takeLatest} from 'redux-saga/effects'
import * as authAPI from '../lib/api/auth'
import {put, call} from 'redux-saga/effects'
import {finishLoading, startLoading} from "./loading";
import { initializeUser} from "./user";

export const LOGIN = 'auth/LOGIN'
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE'

export const SET_ACCESS_TOKEN = 'auth/SET_AUTH'
export const SET_ACCESS_TOKEN_FAILURE = 'auth/SET_AUTH_FAILURE'
export const LOGOUT = 'auth/LOGOUT'

export const AUTH_POPUP = 'auth/POPUP'

export const login = createAction(LOGIN, ({email, password}) => ({
    email, password
}))
export const logout = createAction(LOGOUT, () => {
})
export const setAccessToken = createAction(SET_ACCESS_TOKEN, (access_token) => (access_token))
export const setPopup = createAction(AUTH_POPUP, (popup) => (popup))

const loginSaga = function* ({type, payload}) {
    yield put(startLoading(type))

    try {
        const response = yield call(authAPI.login, payload)
        const data = response.data.data
        const {access_token} = data;

        yield put(setAccessToken(access_token))
        yield put({
            type: LOGIN_SUCCESS,
            payload: data
        })
    } catch (e) {
        if (e.response) {
            yield put({
                type: LOGIN_FAILURE,
                payload: e.response.data['error_description'],
                error: true
            })
        }
    }

    yield put(finishLoading(type))
}
const logoutSaga = function* ({type, payload}) {
    yield put(startLoading(type))

    yield put(initializeUser())

    yield put(finishLoading(type))
}

export function* authSaga() {
    yield takeLatest(LOGIN, loginSaga)
    yield takeLatest(LOGOUT, logoutSaga)
}

const initialState = {
    auth: null,
    authError: null,
    authPopup: null,
}

const auth = handleActions({
    [LOGIN_SUCCESS]: (state, {payload: auth}) => ({
        ...state, authError: null, auth
    }), [LOGIN_FAILURE]: (state, {payload: error}) => ({
        ...state, authError: error
    }), [LOGOUT]: () => ({
        ...initialState
    }), [AUTH_POPUP]: (state, {payload: popup}) => {
        return {
            ...state,
            authPopup: popup
        }
    }, [SET_ACCESS_TOKEN]: (state, {payload: access_token}) => {
        return {
            ...state,
            auth:  {
                access_token,
                token_type: 'Bearer'
            },
            authError: null
        }
    }, [SET_ACCESS_TOKEN_FAILURE]: (state, {payload: error}) => {
        return {
            ...state,
            auth: null,
            authError: error
        }
    }
}, initialState);

export default auth;
