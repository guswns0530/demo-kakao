import {createAction, handleActions} from 'redux-actions';
import produce from 'immer'

export const CHAT = 'chat'
export const CHAT_SET_READER = CHAT + "_SET_READER"
export const CHAT_SET_ROOM = CHAT + "_SET_ROOM"
export const CHAT_ADD_CHAT = CHAT + "_ADD_CHAT"

const initialState = {
    room: null,
    reader: null,
    chats: [],
}

export default handleActions({
        [CHAT_SET_ROOM]: (state, {payload: room}) => ({
            initialState,
            room
        }),
        [CHAT_SET_READER]: (state, {payload: reader}) => ({
            initialState,
            reader
        }),
        [CHAT_ADD_CHAT]: (state, {payload: chats}) => ({
            chats: ([...chats, ...state.chats]).sort().reverse()
        })
    },
    initialState
)