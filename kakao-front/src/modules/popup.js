import {createAction, handleActions} from "redux-actions";

const OPEN_POPUP = "popup/OPEN_POPUP"
const CLOSE_POPUP = "popup/CLOSE_POPUP"

export const oepnPopup = createAction(
    OPEN_POPUP,
    ({element, submit}) => ({element, submit})
)
export const closePopup = createAction(
    CLOSE_POPUP,
    () => {}
)

const initialState = {
    isOpen: false,
    element: null,
    submit: () => {}
}

const popup = handleActions(
    {
        [OPEN_POPUP]: (state, {payload}) => ({
            isOpen: true,
            element: payload.element,
            submit: payload.submit

        }),
        [CLOSE_POPUP]: (state, action) => ({
            ...initialState
        })
    },
    initialState
)

export default popup