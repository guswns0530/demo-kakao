import {createAction, handleActions} from 'redux-actions';
import produce from 'immer'

export const ROOMS = "room/ROOMS"
export const ROOMS_ADD = ROOMS + "_ADD"
export const ROOMS_UPDATE = ROOMS + "_UPDATE"
export const ROOMS_DELETE = ROOMS + "_DELETE"
export const INITIALIZE_ROOMS = ROOMS + "_INITIALIZE"

export const rooms = createAction(ROOMS, (payload) => payload)
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
        [ROOMS_ADD]: (state, {payload: room}) => produce(state, (draft) => {
            return draft.push(room)
        }),
        [ROOMS_UPDATE]: (state, {payload: room}) => ({

        }),
        [ROOMS_DELETE]: (state, {payload: roomId}) => ({

        }),
        [INITIALIZE_ROOMS]: (state) => ({
            ...initialState
        })
    },
    initialState
)