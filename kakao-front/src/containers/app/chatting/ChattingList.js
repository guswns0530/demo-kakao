import React from "react";
import ChattingListComponent from "../../../component/app/chatting/ChattingList";
import {useQuery} from "react-query";
import {selectRoomList} from "../../../lib/api/room";
import ErrorHandler from "../../handler/ErrorHandler";

const queryName = "selectChattingList"

const ChattingList = () => {
    const {data, isLoading, isError, error} = useQuery(queryName, (async () => selectRoomList()))

    if(isLoading) {
        return <div></div>
    }

    if(isError) {
        return <ErrorHandler error={error} path={"/logout"}/>
    }

    const resource = data.data.data

    console.log(resource)

    return <ChattingListComponent data={resource}/>
}

export default ChattingList