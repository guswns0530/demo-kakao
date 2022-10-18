import {createAction, handleActions} from 'redux-actions';
import produce from 'immer'
import {takeLatest} from 'redux-saga/effects'
import createRequestSaga from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth'
import {setAuthorization} from "../lib/api/client";

const CHANGE_FIELD = 'auth/CHANGE_FIELD'
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'

const REGISTER = 'auth/REGISTER'
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS'
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE'

const LOGIN = 'auth/LOGIN'
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE'

export const changeField = createAction(CHANGE_FIELD, ({form, key, value}) => ({
    form, key, value
}))
export const initializeForm = createAction(INITIALIZE_FORM, form => form)
export const register = createAction(REGISTER, ({email, password}) => ({
    email, password
}))
export const login = createAction(LOGIN, ({email, password}) => ({
    email, password
}))
export const loginFailure = createAction(LOGIN_FAILURE, (error) => {
    return error
})

const registerSaga = createRequestSaga(REGISTER, authAPI.register, (data) => {

})
const loginSaga = createRequestSaga(LOGIN, authAPI.login, setAuthorization)

export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga)
    yield takeLatest(LOGIN, loginSaga)
}

const initialState = {
    register: {
        email: '', password: '', name: '', passwordConfirm: ''
    }, login: {
        email: '', password: ''
    }, auth: null, authError: null
}

const auth = handleActions({
    [CHANGE_FIELD]: (state, {payload: {form, key, value}}) => {
        return produce(state, draft => {
            draft[form][key] = value
        })
    }, [INITIALIZE_FORM]: (state, {payload: form}) => ({
        ...state, [form]: initialState[form]
    }), [REGISTER_SUCCESS]: (state, {payload: auth}) => ({
        ...state, authError: null, auth
    }), [REGISTER_FAILURE]: (state, {payload: error}) => ({
        ...state, authError: error
    }), [LOGIN_SUCCESS]: (state, {payload: auth}) => ({
        ...state, authError: null, auth
    }), [LOGIN_FAILURE]: (state, {payload: error}) => ({
        ...state, authError: error
    })
}, initialState,);

export default auth;
