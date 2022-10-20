import {createAction, handleActions} from "redux-actions";
import {takeLatest} from 'redux-saga/effects'
import createRequestSaga from "../services/createRequestSaga";
import * as userApi from '../lib/api/user'

export const CHECK = 'user/CHECK'
const CHECK_SUCCESS = 'user/CHECK_SUCCESS'
const CHECK_FAILURE = 'user/CHECK_FAILURE'

const INITIALIZE_USER = 'user/INITIALIZE_USER'

export const check = createAction(CHECK)
export const initializeUser = createAction(INITIALIZE_USER)

const checkSaga = createRequestSaga(CHECK, userApi.selectMe)
export function* userSaga() {
    yield takeLatest(CHECK, checkSaga)
}

const initialState = {
    user: null,
    checkError: null
}

export default handleActions(
    {
        [CHECK_SUCCESS]: (state, {payload: user}) => ({
            ...state,
            user,
            checkError: null
        }),
        [CHECK_FAILURE]: (state, {payload: error}) => ({
            ...state,
            user:null,
            checkError: error
        }),
        [INITIALIZE_USER]: (state) => ({
            ...initialState
        })
    },
    initialState
)