import {createAction, handleActions} from 'redux-actions';

export const CHAT = 'chat/'
export const CHAT_SET_READER = CHAT + "SET_READER"
export const CHAT_SET_ROOM = CHAT + "SET_ROOM"
export const CHAT_ADD_CHAT = CHAT + "ADD_CHAT"
export const INITIALIZE_CHAT = CHAT + "INITIALIZE"

export const initializeChat = createAction(INITIALIZE_CHAT)
export const setReader = createAction(CHAT_SET_READER, (payload) => payload)
export const setRoom = createAction(CHAT_SET_ROOM, (payload) => payload)
export const addChat = createAction(CHAT_ADD_CHAT, (payload) => payload)

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
        [CHAT_ADD_CHAT]: (state, {payload: chats}) => {
            const chatsArr = [...state.chats, ...chats]

            return {
                ...state,
                chats: chatsArr.reduce(function (acc, current) {
                    if (acc.findIndex(({chat_id}) => chat_id === current.chat_id) === -1) {
                        acc.push(current);
                    }
                    return acc;
                }, [])
            }
        },
        [INITIALIZE_CHAT]: (state) => ({
            ...initialState
        })
    },
    initialState
)

