import React, {useEffect} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {toast} from "react-toastify";

const ErrorHandler = ({error, path}) => {
    useEffect(() => {
        if(error) {
            toast.error(error.response.data.error_description)
        }
    }, [error]);

    return <Navigate to={path} state={1}/>
}

export default ErrorHandler;