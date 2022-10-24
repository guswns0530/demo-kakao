import {createAction, handleActions} from "redux-actions";
import produce from 'immer'

export const CHANGE_FIELD = 'auth/CHANGE_FIELD'
export const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'
export const SET_FIELD_ERROR = 'auth/SET_FIELD_ERROR'

export const changeField = createAction(CHANGE_FIELD, ({form, key, value}) => ({
    form, key, value
}))
export const setFieldError = createAction(SET_FIELD_ERROR, ({form, key, error}) => ({
    form, key, error
}))
export const initializeForm = createAction(INITIALIZE_FORM, form => form)

const initialState = {
    register: {
        email: {
            value: '',
            error: ''
        },
        verifyCode: {
            value: '',
            error: ''
        }, password: {
            value: '',
            error: '',
        }, passwordConfirm: {
            value: '',
            error: ''
        }, name: {
            value: '',
            error: ''
        }
    }, login: {
        email: {
            value: '',
            error: ''
        },
        password: {
            value: '',
            error: ''
        }
    }
}
const form = handleActions({
        [CHANGE_FIELD]: (state, {payload: {form, key, value}}) => {
            return produce(state, draft => {
                draft[form][key]["value"] = value
            })
        }, [INITIALIZE_FORM]: (state, {payload: form}) => ({
            ...state, [form]: initialState[form]
        }), [SET_FIELD_ERROR]: ((state, {payload: {form, key, error}}) => {
            return produce(state, draft => {
                draft[form][key]["error"] = error
            })
        })
    },
    initialState
)

export default form