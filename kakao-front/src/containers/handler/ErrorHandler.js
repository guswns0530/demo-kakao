import React, {useEffect} from "react";
import {Navigate} from "react-router-dom";
import {toast} from "react-toastify";

const ErrorHandler = ({error, path}) => {

    useEffect(() => {
        if(error) {
            toast.error(error.response.data.error_description)
        }
    }, [error]);

    return <Navigate to={path}/>
}

export default ErrorHandler;