import React, {useEffect} from "react";
import RequestEndPage from "./RequestEndPage";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAccessToken, setPopup} from "../modules/auth";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Oauth2RedirectHandler = () => {
    const query = useQuery()
    const dispatch = useDispatch()
    const {auth} = useSelector(({auth}) => ({
        auth: auth.auth
    }))

    const token = query.get('token')
    const error = query.get('error')

    useEffect(() => {
        if(auth) {
            window.close();
            return
        }

        if(token) {
            dispatch(setAccessToken(token))
            dispatch(setPopup(null))

            window.close()
        } else {
            console.log(error)
        }
    }, [dispatch, token, error, auth])

    return (
        <>
            {!window.closed && <RequestEndPage/>}
        </>
    )
}

export default Oauth2RedirectHandler