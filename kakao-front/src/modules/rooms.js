import {createAction, handleActions} from 'redux-actions';
import produce from 'immer'

export const ROOMS = "room/ROOMS"
export const ROOMS_UPDATE = ROOMS + "_UPDATE"
export const ROOMS_DELETE = ROOMS + "_DELETE"
export const INITIALIZE_ROOMS = ROOMS + "_INITIALIZE"

export const rooms = createAction(ROOMS, (payload) => payload)
export const roomsUpdate = createAction(ROOMS_UPDATE, (payload) => payload)
export const deleteRoom = createAction(ROOMS_DELETE, (payload) => payload)
export const initializeRooms = createAction(INITIALIZE_ROOMS)

const initialState = {
    rooms: [],
    roomError: null,
}

export default handleActions(
    {
        [ROOMS]: (state, {payload: rooms}) => ({
            rooms
        }),
        [ROOMS_UPDATE]: (state, {payload: room}) => produce(state, (draft) => {
            draft.rooms = draft.rooms.filter(({room_id}) => room.room_id !== room_id)
            draft.rooms.push(room)
            draft.rooms.sort((a, b) => new Date(b.chat_create_at).getTime() - new Date(a.chat_create_at).getTime())
        }),
        [ROOMS_DELETE]: (state, {payload: roomId}) => produce(state, (draft) => {
            draft.rooms = draft.rooms.filter(({room_id}) => room_id !== roomId)
        }),
        [INITIALIZE_ROOMS]: (state) => ({
            ...initialState
        })
    },
    initialState
)