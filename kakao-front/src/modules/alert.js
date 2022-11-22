import {createAction, handleActions} from 'redux-actions';

export const ALERT = "alert/ALERT_"
export const ADD_ALERT = ALERT + "ADD"
export const REMOVE_ALERT = ALERT + "REMOVE"

export const addAlert = createAction(ADD_ALERT, payload => payload)
export const removeAlert = createAction(REMOVE_ALERT, payload => payload)

const initialState = []

const alert = handleActions({
    [ADD_ALERT]: (state, {payload: chat}) => (
        [...state, chat]
    ),
    [REMOVE_ALERT]: (state, {payload: chatId}) => (
        state.filter(state => state.chat_id !== chatId)
    )
}, initialState)

export default alert