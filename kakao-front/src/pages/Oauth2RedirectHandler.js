import React, {useEffect} from "react";
import RequestEndPage from "./RequestEndPage";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {accessToken} from "../modules/auth";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Oauth2RedirectHandler = () => {
    const query = useQuery()
    const dispatch = useDispatch()

    const token = query.get('token')
    const error = query.get('error')

    useEffect(() => {
        if(token) {
            dispatch(accessToken(token))

            window.close()
        } else {
            console.log(error)
        }
    }, [dispatch, token, error])

    return (
        <>
            {!window.closed && <RequestEndPage/>}
        </>
    )
}

export default Oauth2RedirectHandler