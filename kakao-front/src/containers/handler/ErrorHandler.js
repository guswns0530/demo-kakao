import React from "react";
import {Navigate} from "react-router-dom";
import {initRefreshSubscriber} from "../../services/setUpInterceptors";

const ErrorHandler = () => {
    initRefreshSubscriber()
    return <Navigate to={"/logout"}/>
}

export default ErrorHandler;