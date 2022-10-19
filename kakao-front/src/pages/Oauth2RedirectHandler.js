import React from "react";
import RequestEndPage from "./RequestEndPage";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Oauth2RedirectHandler = () => {
    const query = useQuery()

    const token = query.get('token')
    const error = query.get('error')

    const {auth} = useSelector(({auth }) => ({
        auth: auth.auth
    }))

    console.log(token, error)
    console.log(auth)

    return (
        <>
            {!window.closed && <RequestEndPage/>}
        </>
    )
}

export default Oauth2RedirectHandler