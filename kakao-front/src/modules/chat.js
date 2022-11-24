import {createAction, handleActions} from 'redux-actions';
import produce from "immer";
import Chat from "../constants/Chat";

export const CHAT = 'chat/'
export const CHAT_SET_READER = CHAT + "SET_READER"
export const CHAT_SET_ROOM = CHAT + "SET_ROOM"
export const CHAT_ADD_CHAT = CHAT + "ADD_CHAT"
export const INITIALIZE_CHAT = CHAT + "INITIALIZE"
export const REMOVE_CHAT = CHAT + "REMOVE"

export const initializeChat = createAction(INITIALIZE_CHAT)
export const setReader = createAction(CHAT_SET_READER, (payload) => payload)
export const setRoom = createAction(CHAT_SET_ROOM, (payload) => payload)
export const addChat = createAction(CHAT_ADD_CHAT, (payload) => payload)
export const removeChat = createAction(REMOVE_CHAT, (payload) => payload)

const initialState = {
    room: null,
    reader: null,
    chats: [],
}

export default handleActions({
        [CHAT_SET_ROOM]: (state, {payload: room}) => ({
            ...state,
            room
        }),
        [CHAT_SET_READER]: (state, {payload: reader}) => ({
            ...state,
            reader
        }),
        [CHAT_ADD_CHAT]: (state, {payload: chats}) => produce(state, (draft) => {

            draft.chats.push(...chats)
            draft.chats = draft.chats.reduce(function (acc, current) {
                if (acc.findIndex(({chat_id}) => chat_id === current.chat_id) === -1) {
                    acc.push(current);
                }

                return acc
            }, [])
            draft.chats.sort((a, b) => b.chat_id - a.chat_id);
        }),
        [REMOVE_CHAT]: (state, {payload: chatId}) => produce(state, (draft) => {
            draft.chats.map((chat) => {
                if(chat.chat_id === chatId) {
                    chat.chat_status = Chat.status.REMOVE
                }
                return chat
            })
        }),
        [INITIALIZE_CHAT]: (state) => ({
            ...initialState
        })
    },
    initialState
)

