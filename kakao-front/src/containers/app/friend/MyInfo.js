import React, {Suspense, useEffect} from "react";

import MyInfoComponent from "../../../component/app/friend/Profile";
import {useQuery} from "react-query";
import {selectMe} from "../../../lib/api/user";
import LoadingProfile from "../../../component/app/friend/LoadingProfile";
import {useDispatch} from "react-redux";
import {CHECK_SUCCESS} from "../../../modules/user";
import {ErrorBoundary} from "react-error-boundary";
import ErrorHandler from "../../handler/ErrorHandler";

const MyInfoFetch = () => {
    const dispatch = useDispatch()
    const {data} = useQuery(["checkUser"], async () => selectMe(), {
        suspense: true,
        useErrorBoundary: true,
    })

    useEffect(() => {
        if (data) {
            dispatch({
                type: CHECK_SUCCESS,
                payload: data.data.data
            })
        }
    }, [dispatch, data]);


    return (
        <MyInfoComponent user={data.data.data}/>
    )
}

const MyInfo = () => {
    return (
        <Suspense fallback={<LoadingProfile/>}>
            <ErrorBoundary FallbackComponent={ErrorHandler}>
                <MyInfoFetch/>
            </ErrorBoundary>
        </Suspense>
    )
}

export default MyInfo