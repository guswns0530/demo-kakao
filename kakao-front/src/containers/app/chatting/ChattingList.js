import React from "react";
import ChattingListComponent from "../../../component/app/chatting/ChattingList";
import {useQueries} from "react-query";
import {selectRoomList} from "../../../lib/api/room";
import ErrorHandler from "../../handler/ErrorHandler";
import {selectMe} from "../../../lib/api/user";

export const roomQueryName = "selectChattingList"
const userQueryName = "checkUser"


const ChattingList = () => {
    const [{data: roomData, isLoading: isRoomLoading, isError: isRoomError, error: roomError},
        {data: userData, isLoading: isUserLoading, isError: isUserError, error: userError}] = useQueries(
        [
            {
                queryKey: roomQueryName,
                queryFn: async () => selectRoomList(),
            },
            {
                queryKey: userQueryName,
                queryFn: async () => selectMe(),
            }
        ], {
        }
    )

    const isLoading = isRoomLoading || isUserLoading
    const isError = isRoomError || isUserError


    if (isLoading) {
        return <div></div>
    }

    if (isError) {
        if (isRoomError) {
            return <ErrorHandler error={roomError} path={"/logout"}/>
        }
        if (isUserError) {
            return <ErrorHandler error={userError} path={"/logout"}/>
        }
    }

    const data = roomData.data.data
    const user = userData.data.data

    return <ChattingListComponent data={data} user={user}/>
}

export default ChattingList