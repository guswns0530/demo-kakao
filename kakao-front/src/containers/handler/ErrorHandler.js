import React, {useEffect} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {toast} from "react-toastify";

const ErrorHandler = ({error, path}) => {
    const location = useLocation()

    useEffect(() => {
        if(error) {
            toast.error(error.response.data.error_description)
        }
    }, [error]);

    if(location) {
        return <Navigate to={path} state={1}/>
    }

    return <Navigate to={path}/>
}

export default ErrorHandler;