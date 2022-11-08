import React, {
    useEffect
} from "react";
import RequestEndPage from "./RequestEndPage";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {LOGIN_FAILURE, SET_ACCESS_TOKEN_FAILURE, setAccessToken, setPopup} from "../modules/auth";
import {selectMe} from "../lib/api/user";

function useQuery() {
    const {search} = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Oauth2RedirectHandler = () => {
    const query = useQuery()
    const dispatch = useDispatch()

    const token = query.get('token')
    const error = query.get('error')

    useEffect(() => {
        (async () => {

            if (token) {
                try {
                    await selectMe(token)

                    dispatch(setAccessToken(token))
                    dispatch(setPopup(null))
                } catch (err) {
                    const {response: {data: {error_description}}} = err

                    dispatch({
                        type: SET_ACCESS_TOKEN_FAILURE,
                        payload: error_description
                    })
                    dispatch({
                        type: LOGIN_FAILURE, payload: error_description, error: true
                    })
                }
            } else if (error) {
                const {errorDescription} = JSON.parse(error)

                dispatch({
                    type: LOGIN_FAILURE, payload: errorDescription, error: true
                })
                dispatch({
                    type: SET_ACCESS_TOKEN_FAILURE,
                    payload: errorDescription
                })
            }

            window.close()
        })();
    }, [dispatch, token, error])

    return (<>
        {!window.closed && <RequestEndPage/>}
    </>)
}

export default Oauth2RedirectHandler