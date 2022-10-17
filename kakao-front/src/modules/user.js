import {createAction, handleActions} from "redux-actions";
import {takeLatest} from 'redux-saga/effects'
import createRequestSaga from "../lib/createRequestSaga";
import * as userApi from '../lib/api/user'

const CHECK = 'user/CHECK'
const CHECK_SUCCESS = 'user/CHECK_SUCCESS'
const CHECK_FAILURE = 'user/CHECK_FAILURE'

export const check = createAction(CHECK)

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
            user
        }),
        [CHECK_FAILURE]: (state, {payload: error}) => ({
            ...state,
            user:null,
            checkError: error
        })
    },
    initialState
)