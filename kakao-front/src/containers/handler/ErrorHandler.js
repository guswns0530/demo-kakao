import React from "react";
import {Navigate} from "react-router-dom";
import {toast} from "react-toastify";

const ErrorHandler = ({error, resetErrorBoundary}) => {
    const {response: {data: {error_description: info}}} = error
    toast(info)
    return (
        <>
            <div> {info} </div>
            <button onClick={resetErrorBoundary}>재실행</button>
        </>
    )
    // return <Navigate to={"/logout"}/>
}

export default ErrorHandler;