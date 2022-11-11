import React from "react";

import MyInfoComponent from "../../../component/app/friend/Profile";
import {useQuery} from "react-query";
import {selectMe} from "../../../lib/api/user";
import LoadingProfile from "../../../component/app/friend/LoadingProfile";
import {useDispatch} from "react-redux";
import {CHECK_SUCCESS} from "../../../modules/user";
import ErrorHandler from "../../handler/ErrorHandler";

const queryName = "checkUser"

const MyInfo = () => {
    const dispatch = useDispatch()
    const {data, isLoading, isError, error} = useQuery(queryName, async () => selectMe(), {
        retry: false,
        cacheTime: 0,
        onSuccess: (data) => {
            if (data) {
                dispatch({
                    type: CHECK_SUCCESS,
                    payload: data.data.data
                })
            }
        }
    })

    if (isLoading) {
        return <LoadingProfile/>
    }

    if (isError) {
        if (error.response.status === 401 || error.response.status === 400) {
            return <ErrorHandler error={error} path={"/logout"}/>
        }

        return <ErrorHandler error={error} path={"/app"}/>
    }

    return (
        <MyInfoComponent user={data.data.data}/>
    )
}

export default MyInfo