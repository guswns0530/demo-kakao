import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../modules/auth";
import RequestEndPage from "./RequestEndPage";

const Logout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {auth} = useSelector(({auth}) => ({
        auth: auth.auth
    }))

    useEffect(() => {
        if(auth) {
            dispatch(logout())
            return
        }

        navigate('/')
    }, [dispatch, auth, navigate]);


    return <RequestEndPage/>
}

export default Logout